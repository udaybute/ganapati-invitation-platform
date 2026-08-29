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
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-amber-50">
        <p className="text-4xl mb-3">⏳</p>
        <h1 className="text-2xl font-bold text-amber-900">
          {isPaidButUnapproved ? "मंजुरीची प्रतीक्षा आहे" : "Payment बाकी आहे"}
        </h1>
        {pendingRow.mandal_name && (
          <p className="text-amber-700 mt-1 font-medium">{pendingRow.mandal_name}</p>
        )}
        <p className="text-amber-700 mt-2 max-w-sm">
          {isPaidButUnapproved
            ? "तुमचे payment झाले आहे. लवकरच तुमचे निमंत्रण live होईल — कृपया थोडा वेळ थांबा."
            : "हे निमंत्रण अजून live नाही. Payment पूर्ण करताच लगेच live होईल."}
        </p>
        {!isPaidButUnapproved && (
          <div className="mt-6">
            <PaymentButton slug={slug} />
          </div>
        )}
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