import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import InvitationCard from "@/components/InvitationCard";
import MurtiCarousel from "@/components/MurtiCarousel";
import Timeline from "@/components/Timeline";
import Blessings from "@/components/Blessings";
import Location from "@/components/Location";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase-client";
import { supabaseAdmin } from "@/lib/supabase-admin";
import PaymentButton from "@/components/PaymentButton";
import { FestiveAudioAndBlessing } from "@/components/FestiveAudioAndBlessing";

// Generates a unique WhatsApp/social share preview per client — same slug pattern as the page below
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Production: pull mandalName + a chosen photo from Supabase using slug, same as below
  return {
    title: `${slug} — निमंत्रण`,
    openGraph: {
      title: `${slug} — निमंत्रण`,
      images: [`/api/og?slug=${slug}`], // dynamic OG image route, built once, reused for all 1000 clients
    },
  };
}

// This is the ONE page that serves all 1000 clients.
// [slug] comes from the URL — site.com/jai-shankar-ganesh-mandal
export default async function InvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Real fetch — RLS (see supabase/schema.sql) only allows reading rows with status = 'approved',
  // so a pending/rejected submission simply won't resolve here even if someone guesses the slug.
  const { data: row } = await supabase.from("mandals").select("*").eq("slug", slug).single();

  if (!row) {
    // Not visible to the public client — could be a genuinely wrong slug, OR a real
    // submission that just hasn't been paid/approved yet. Check via the admin client
    // (bypasses RLS) so we can tell these two cases apart and show the right message.
    const { data: pendingRow } = await supabaseAdmin
      .from("mandals")
      .select("slug, mandal_name, status, payment_status")
      .eq("slug", slug)
      .maybeSingle();

    if (!pendingRow) notFound(); // truly doesn't exist — real 404

    const isPaidButUnapproved = pendingRow.payment_status === "paid" && pendingRow.status !== "approved";

    return (
      <main className="relative min-h-screen overflow-hidden bg-[#1c0609] text-[#fef9eb]">
        {/* Ambient background glow, matches homepage brand system */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#e8a93b]/15 blur-[110px]" />
          <div className="absolute bottom-0 right-0 h-[320px] w-[320px] translate-x-1/4 translate-y-1/4 rounded-full bg-emerald-500/10 blur-[100px]" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
          {/* Status card */}
          <div className="w-full max-w-md rounded-3xl border border-[#e8a93b]/25 bg-[#24080c]/70 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-10">
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border ${
                isPaidButUnapproved
                  ? "border-emerald-400/30 bg-emerald-950/30"
                  : "border-[#e8a93b]/30 bg-[#e8a93b]/10"
              }`}
            >
              <span className="text-3xl">{isPaidButUnapproved ? "✅" : "⏳"}</span>
            </div>

            <h1 className="font-display mt-5 text-2xl font-bold tracking-tight text-[#f3d089] sm:text-3xl">
              {isPaidButUnapproved ? "मंजुरीची प्रतीक्षा आहे" : "Payment बाकी आहे"}
            </h1>

            {pendingRow.mandal_name && (
              <p className="mt-2 text-sm font-semibold text-[#e8a93b]">{pendingRow.mandal_name}</p>
            )}

            <div className="mx-auto my-5 h-px w-16 bg-[#e8a93b]/25" />

            <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#fef9eb]/75 sm:text-base">
              {isPaidButUnapproved
                ? "तुमचे payment झाले आहे. लवकरच तुमचे निमंत्रण live होईल — कृपया थोडा वेळ थांबा."
                : "हे निमंत्रण अजून live नाही. Payment पूर्ण करताच लगेच live होईल."}
            </p>

            {!isPaidButUnapproved && (
              <div className="mt-7">
                <PaymentButton slug={slug} />
              </div>
            )}

            {isPaidButUnapproved && (
              <p className="mt-6 text-xs text-[#fef9eb]/45">
                खूप वेळ थांबावे लागल्यास आमच्याशी WhatsApp वर संपर्क साधा.
              </p>
            )}
          </div>
        </div>
      </main>
    );
  }

  const client = {
    mandalName: row.mandal_name,
    inviteLine: "आपणास सस्नेह निमंत्रण!",
    inviteMessage: row.invite_message,
    establishedYear: row.established_year ?? "",
    murtiPhotos:
      (row.murti_photos as string[])?.length > 0
        ? (row.murti_photos as string[])
        : ((row.gallery as { url: string }[]) ?? []).slice(0, 3).map((g) => g.url),
    timelineEvents: (row.timeline as any[]) ?? [],
    address: row.address,
    contact: row.contact,
    mapEmbedUrl: row.map_embed_url ?? `https://maps.google.com/maps?q=${encodeURIComponent(row.address)}&output=embed`,
    mapsLink: row.maps_link ?? `https://maps.google.com/?q=${encodeURIComponent(row.address)}`,
    galleryPhotos: (row.gallery as { url: string; caption?: string }[]) ?? [],
    instagramUrl: row.instagram_url ?? undefined,
  };

  return (
    <main>
      <Hero mandalName={client.mandalName} inviteLine={client.inviteLine} />
      <InvitationCard mandalName={client.mandalName} message={client.inviteMessage} />
      <MurtiCarousel mandalName={client.mandalName} establishedYear={client.establishedYear} photos={client.murtiPhotos} />
      <Timeline events={client.timelineEvents} />
      <Location mandalName={client.mandalName} address={client.address} contact={client.contact} mapEmbedUrl={client.mapEmbedUrl} mapsLink={client.mapsLink} />
      <Blessings />
      <Gallery photos={client.galleryPhotos} />
      <Footer mandalName={client.mandalName} contact={client.contact} address={client.address} instagramUrl={client.instagramUrl} slug={slug} />
      <FestiveAudioAndBlessing />
    </main>
  );
}