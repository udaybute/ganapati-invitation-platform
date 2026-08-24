"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import { getUniqueSlug } from "@/lib/slug";
import { uploadPhotos } from "@/lib/photo-upload";

type TimelineDraft = { title: string; summary: string; date: string; time: string; place: string };
type GalleryDraft = { file: File; caption: string; preview: string };

const emptyEvent = (): TimelineDraft => ({ title: "", summary: "", date: "", time: "", place: "" });

export default function SubmitForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  const [mandalName, setMandalName] = useState("");
  const [language, setLanguage] = useState<"mr" | "hi" | "en">("mr");
  const [inviteMessage, setInviteMessage] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [mapsLink, setMapsLink] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

  const [events, setEvents] = useState<TimelineDraft[]>([emptyEvent()]);
  const [gallery, setGallery] = useState<GalleryDraft[]>([]);

  const updateEvent = (i: number, field: keyof TimelineDraft, value: string) => {
    setEvents((prev) => prev.map((ev, idx) => (idx === i ? { ...ev, [field]: value } : ev)));
  };
  const addEvent = () => events.length < 10 && setEvents((p) => [...p, emptyEvent()]);
  const removeEvent = (i: number) => setEvents((p) => p.filter((_, idx) => idx !== i));

  const handlePhotos = (files: FileList | null) => {
    if (!files) return;
    const selected = Array.from(files).slice(0, 10 - gallery.length);
    const drafts = selected.map((file) => ({ file, caption: "", preview: URL.createObjectURL(file) }));
    setGallery((prev) => [...prev, ...drafts].slice(0, 10));
  };
  const updateCaption = (i: number, caption: string) => {
    setGallery((prev) => prev.map((g, idx) => (idx === i ? { ...g, caption } : g)));
  };
  const removePhoto = (i: number) => setGallery((prev) => prev.filter((_, idx) => idx !== i));

  const validateStep1 = () => mandalName.trim() && inviteMessage.trim() && contact.trim() && address.trim();
  const validateStep3 = () => gallery.length >= 6;

  const handleSubmit = async () => {
    setError("");
    if (gallery.length < 6) {
      setError("Kam se kam 6 photos chahiye.");
      return;
    }
    setSubmitting(true);
    try {
      const slug = await getUniqueSlug(mandalName);

      setProgress("Photos upload ho rahi hain...");
      const galleryUrls = await uploadPhotos(
        gallery.map((g) => g.file),
        slug,
        (done, total) => setProgress(`Photos upload ho rahi hain... (${done}/${total})`)
      );
      const galleryData = galleryUrls.map((url, i) => ({ url, caption: gallery[i].caption }));

      setProgress("Details save ho rahi hain...");
      const { error: insertError } = await supabase.from("mandals").insert({
        slug,
        mandal_name: mandalName,
        language,
        invite_message: inviteMessage,
        established_year: establishedYear,
        contact,
        address,
        maps_link: mapsLink,
        instagram_url: instagramUrl || null,
        timeline: events.filter((e) => e.title.trim()),
        gallery: galleryData,
        status: "pending",
      });
      if (insertError) throw insertError;

      router.push(`/submit/thank-you?slug=${slug}`);
    } catch (e: any) {
      setError(e.message || "Kuch galat ho gaya, dobara try karo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-amber-900 text-center">तुमच्या मंडळाचे निमंत्रण बनवा</h1>
      <p className="text-amber-700 text-sm text-center mt-1">Step {step} / 3</p>

      {/* STEP 1: BASIC DETAILS */}
      {step === 1 && (
        <div className="flex flex-col gap-4 mt-6">
          <Field label="मंडळाचे नाव *">
            <input value={mandalName} onChange={(e) => setMandalName(e.target.value)} className="input" placeholder="जय शंकर गणेश मंडळ" />
          </Field>
          <Field label="भाषा">
            <select value={language} onChange={(e) => setLanguage(e.target.value as any)} className="input">
              <option value="mr">मराठी</option>
              <option value="hi">हिंदी</option>
              <option value="en">English</option>
            </select>
          </Field>
          <Field label="निमंत्रण संदेश *">
            <textarea value={inviteMessage} onChange={(e) => setInviteMessage(e.target.value)} className="input" rows={3} />
          </Field>
          <Field label="स्थापना वर्ष">
            <input value={establishedYear} onChange={(e) => setEstablishedYear(e.target.value)} className="input" placeholder="१९६९" />
          </Field>
          <Field label="संपर्क क्रमांक *">
            <input value={contact} onChange={(e) => setContact(e.target.value)} className="input" placeholder="+91 90000 00000" />
          </Field>
          <Field label="पत्ता *">
            <input value={address} onChange={(e) => setAddress(e.target.value)} className="input" />
          </Field>
          <Field label="Google Maps लिंक">
            <input value={mapsLink} onChange={(e) => setMapsLink(e.target.value)} className="input" placeholder="https://maps.google.com/..." />
          </Field>
          <Field label="Instagram लिंक (optional)">
            <input value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} className="input" />
          </Field>
          <NextButton onClick={() => validateStep1() && setStep(2)} />
        </div>
      )}

      {/* STEP 2: TIMELINE */}
      {step === 2 && (
        <div className="flex flex-col gap-5 mt-6">
          {events.map((ev, i) => (
            <div key={i} className="border border-amber-300 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-amber-800">कार्यक्रम {i + 1}</span>
                {events.length > 1 && (
                  <button onClick={() => removeEvent(i)} className="text-red-500 text-sm">काढा</button>
                )}
              </div>
              <input placeholder="शीर्षक (उदा. स्थापना)" value={ev.title} onChange={(e) => updateEvent(i, "title", e.target.value)} className="input" />
              <input placeholder="थोडक्यात माहिती" value={ev.summary} onChange={(e) => updateEvent(i, "summary", e.target.value)} className="input" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="दिनांक" value={ev.date} onChange={(e) => updateEvent(i, "date", e.target.value)} className="input" />
                <input placeholder="वेळ" value={ev.time} onChange={(e) => updateEvent(i, "time", e.target.value)} className="input" />
              </div>
              <input placeholder="स्थळ" value={ev.place} onChange={(e) => updateEvent(i, "place", e.target.value)} className="input" />
            </div>
          ))}
          {events.length < 10 && (
            <button onClick={addEvent} className="text-amber-700 border border-dashed border-amber-400 rounded-xl py-3">
              + आणखी कार्यक्रम जोडा
            </button>
          )}
          <div className="flex gap-3">
            <BackButton onClick={() => setStep(1)} />
            <NextButton onClick={() => setStep(3)} />
          </div>
        </div>
      )}

      {/* STEP 3: PHOTOS */}
      {step === 3 && (
        <div className="flex flex-col gap-5 mt-6">
          <Field label={`छायाचित्रे * (किमान ६, कमाल १०) — ${gallery.length}/10`}>
            <input type="file" accept="image/*" multiple onChange={(e) => handlePhotos(e.target.files)} className="input" />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            {gallery.map((g, i) => (
              <div key={i} className="relative">
                <img src={g.preview} className="w-full aspect-square object-cover rounded-lg" />
                <button onClick={() => removePhoto(i)} className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full text-xs">×</button>
                <input
                  placeholder="Caption"
                  value={g.caption}
                  onChange={(e) => updateCaption(i, e.target.value)}
                  className="mt-1 w-full text-xs border border-amber-200 rounded px-1 py-1"
                />
              </div>
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {progress && <p className="text-amber-700 text-sm text-center">{progress}</p>}

          <div className="flex gap-3">
            <BackButton onClick={() => setStep(2)} />
            <button
              onClick={handleSubmit}
              disabled={submitting || !validateStep3()}
              className="flex-1 bg-orange-500 text-white rounded-full py-3 font-medium disabled:opacity-50"
            >
              {submitting ? "Submit होत आहे..." : "निमंत्रण सबमिट करा"}
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .input {
          border: 1px solid #fcd34d;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 14px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm text-amber-800">{label}</span>
      {children}
    </label>
  );
}
function NextButton({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick} className="w-full bg-orange-500 text-white rounded-full py-3 font-medium">पुढे</button>;
}
function BackButton({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick} className="flex-1 border border-amber-400 text-amber-800 rounded-full py-3">मागे</button>;
}
