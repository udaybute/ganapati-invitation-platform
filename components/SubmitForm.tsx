"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";
import { getUniqueSlug } from "@/lib/slug";
import { uploadPhotos } from "@/lib/photo-upload";
import { track } from "@vercel/analytics";
import PreviewModal from "@/components/PreviewModal";
import { InvitationData } from "@/components/InvitationPreview";

type FormLanguage = "mr" | "en";

type TimelineDraft = {
  id: string;
  title: string;
  summary: string;
  date: string;
  time: string;
  morningTime?: string; // आरतीसाठी
  eveningTime?: string; // आरतीसाठी
  presetKey?: string;
};

type GalleryDraft = {
  file: File;
  caption: string;
  preview: string;
};

const PRESET_EVENTS_I18N: Record<
  FormLanguage,
  { key: string; title: string; summary: string }[]
> = {
  mr: [
    { key: "sthapana", title: "श्रींची स्थापना", summary: "गणरायाचे आगमन आणि मंगलमय स्थापना सोहळा" },
    { key: "aarti", title: "दैनिक आरती", summary: "दररोजची सकाळ व संध्याकाळ मंगलमय आरती" },
    { key: "satyanarayan", title: "सत्यनारायण महापूजा", summary: "श्री सत्यनारायण महाराजांची पूजा आणि कथा" },
    { key: "mahaprasad", title: "महाप्रसाद", summary: "महाप्रसादाचा नैवेद्य आणि भाविकांसाठी भोजन वितरण" },
    { key: "dhol", title: "सांस्कृतिक कार्यक्रम / स्पर्धा", summary: "भजन, स्पर्धा आणि मनोरंजनात्मक कार्यक्रम" },
    { key: "visarjan", title: "विसर्जन सोहळा", summary: "गणरायाच्या निरोपाचा भावपूर्ण विसर्जन सोहळा" },
  ],
  en: [
    { key: "sthapana", title: "Ganpati Sthapana", summary: "Arrival & sacred installation ceremony of Bappa" },
    { key: "aarti", title: "Daily Aarti", summary: "Daily morning and evening sacred Aarti" },
    { key: "satyanarayan", title: "Satyanarayan Mahapooja", summary: "Shree Satyanarayan Pooja & Katha" },
    { key: "mahaprasad", title: "Mahaprasad", summary: "Mahaprasad offering and community feast" },
    { key: "dhol", title: "Cultural Events & Contests", summary: "Bhajan, contests, and celebration activities" },
    { key: "visarjan", title: "Visarjan Ceremony", summary: "Heartfelt farewell & immersion procession" },
  ],
};

const INVITE_EXAMPLES: Record<string, string> = {
  mr: "गणरायाच्या आगमनाने आपले घर आणि मन प्रसन्नतेने भरून जावो. आमच्या गणेशोत्सवाच्या मंगल सोहळ्यात सहभागी होण्यासाठी आपणास व आपल्या परिवारास सस्नेह निमंत्रण. आपल्या उपस्थितीने आमचा उत्सव अधिक आनंददायी होईल.",
  hi: "भगवान श्री गणेश के पावन आगमन पर आप सभी को हार्दिक शुभकामनाएं। हमारे श्री गणेशोत्सव के शुभ अवसर पर आप सपरिवार सादर आमंत्रित हैं। आपकी गरिमामयी उपस्थिति हमारे उत्सव की शोभा बढ़ाएगी।",
  en: "May the divine blessings of Lord Ganesha bring happiness, peace, and prosperity to your home. We cordially invite you and your family to join us in our auspicious Ganeshotsav celebrations. Your presence will add immense joy to the festivity.",
};

const safeTrack = (name: string) => {
  try {
    track(name);
  } catch {
    // silently bypass in non-production environments
  }
};

const UI_TEXT = {
  mr: {
    sacredHeader: "॥ श्री गणेशाय नमः ॥",
    title: "डिजिटल निमंत्रण तयार करा",
    subtitle: "अवघ्या ३ मिनिटांत तुमची माहिती भरा आणि सुंदर digital invitation तयार करा.",
    editNotice: "✨ काळजी नको! फॉर्म भरल्यानंतरही तुम्ही तुमची माहिती (वेळ, पत्ता, फोटो) कधीही बदलू शकता.",
    editNoticeShort: "माहिती नंतरही बदलता येते",
    steps: ["माहिती", "वेळापत्रक", "फोटो", "पूर्वावलोकन"],
    stepProgress: (current: number, total: number) => `पायरी ${current} / ${total}`,
    
    // Step 1
    step1Title: "मूलभूत माहिती",
    step1Subtitle: "तुमच्या मंडळाची किंवा घरगुती गणपतीची माहिती द्या.",
    typeMandal: "सार्वजनिक मंडळ",
    typeHome: "घरगुती गणपती",
    mandalNameLabel: "मंडळाचे / कुटुंबाचे नाव *",
    mandalNamePlaceholder: "उदा. श्री सिद्धिविनायक गणेश मंडळ किंवा जोशी परिवार",
    languageSelectLabel: "निमंत्रणाची मुख्य भाषा",
    inviteMsgLabel: "निमंत्रण संदेश *",
    inviteMsgPlaceholder: "उदा. गणपती बाप्पांच्या आगमनानिमित्त आपणास सस्नेह निमंत्रण...",
    useExample: "उदाहरणाचा संदेश वापरा",
    yearLabel: "स्थापना वर्ष (ऐच्छिक)",
    yearPlaceholder: "उदा. २०१५",
    contactLabel: "संपर्क क्रमांक (WhatsApp) *",
    contactPlaceholder: "उदा. +91 98765 43210",
    addressLabel: "पत्ता (Venue / Address) *",
    addressPlaceholder: "उदा. गणेश चौक, शिवाजी नगर, पुणे",
    mapsLabel: "Google Maps लिंक (ऐच्छिक)",
    mapsPlaceholder: "https://maps.app.goo.gl/...",
    mapsHint: "Google Maps मध्ये ठिकाण उघडा → Share → 'Copy link' करून इथे पेस्ट करा.",
    instaLabel: "Instagram / सोशल मीडिया लिंक (ऐच्छिक)",
    instaPlaceholder: "https://instagram.com/...",

    // Step 2
    step2Title: "आरती व कार्यक्रमांचे वेळापत्रक",
    step2Subtitle: "खालीलपैकी कोणते कार्यक्रम असतील ते निवडा — तारीख व वेळ भरा.",
    selectEventsHelp: "लागू होणारे कार्यक्रम निवडा (शीर्षक आपोआप भरले जाईल):",
    selectedEventsTitle: "निवडलेले कार्यक्रम — तारीख व वेळ भरा:",
    morningAarti: "सकाळची आरती वेळ",
    eveningAarti: "संध्याकाळची आरती वेळ",
    dateLabel: "दिनांक",
    timeLabel: "वेळ",
    eventTitlePlaceholder: "कार्यक्रमाचे नाव (उदा. चित्रकला स्पर्धा)",
    eventDescPlaceholder: "थोडक्यात माहिती",
    addCustomEvent: "+ वेगळा / खास कार्यक्रम जोडा",
    removeBtn: "काढा",

    // Step 3
    step3Title: "गणपती बाप्पांचे फोटो",
    step3Subtitle: "किमान १ आणि कमाल १० फोटो निवडा (बाप्पांची मूर्ती, मंडप, देखावा).",
    photosCount: (count: number) => `निवडलेले फोटो: ${count}/10 (किमान १ आवश्यक)`,
    uploadBtnText: "फोटो निवडा किंवा Drag & Drop करा",
    uploadFormatHint: "JPG, PNG किंवा WEBP • जास्तीत जास्त १० फोटो",
    noPhotosYet: "अजून कोणताही फोटो निवडलेला नाही. कृपया किमान १ फोटो निवडा.",
    captionPlaceholder: "फोटोबद्दल माहिती (उदा. बाप्पांचे मुख्य रूप)",
    
    // Step 4
    step4Title: "तुमचे निमंत्रण तयार आहे!",
    step4Subtitle: "Submit करण्यापूर्वी संपूर्ण animated निमंत्रण बघा — जसे live दिसेल अगदी तसेच.",
    viewPreviewBtn: "👁️ पूर्ण निमंत्रण पहा (Live Preview)",
    confirmSubmitBtn: "✓ पुष्टी करा, Submit करा",
    canEditTip: "💡 सबमिट केल्यानंतर तुम्हाला एक खास Edit Link मिळेल, ज्यामुळे तुम्ही कधीही पत्ता, वेळ किंवा फोटो बदलू शकता.",

    // Buttons & Navigation
    next: "पुढे चला →",
    back: "← मागे",
    previewBtn: "पूर्वावलोकन पहा (Preview) →",
    submitting: "जतन होत आहे...",
    fillRequired: "कृपया लाल रंगाने दर्शवलेली सर्व आवश्यक (*) माहिती भरा.",
    needPhoto: "कृपया किमान १ फोटो अपलोड करा.",
    homeBtn: "मुख्य पान",
    fieldRequired: "हे भरणे आवश्यक आहे",
  },
  en: {
    sacredHeader: "॥ Shree Ganeshay Namah ॥",
    title: "Create Digital Ganpati Invitation",
    subtitle: "Fill in your details in 3 easy minutes and generate a beautiful animated digital invitation.",
    editNotice: "✨ Don't worry! You can easily edit or update your invitation details anytime even after submitting.",
    editNoticeShort: "Can be edited anytime later",
    steps: ["Details", "Schedule", "Photos", "Preview"],
    stepProgress: (current: number, total: number) => `Step ${current} of ${total}`,

    // Step 1
    step1Title: "Basic Information",
    step1Subtitle: "Provide details about your Mandal or Family Ganpati celebrations.",
    typeMandal: "Public Mandal",
    typeHome: "Home Ganpati",
    mandalNameLabel: "Mandal / Family Name *",
    mandalNamePlaceholder: "e.g. Shree Siddhivinayak Ganesh Mandal or Joshi Family",
    languageSelectLabel: "Invitation Language",
    inviteMsgLabel: "Invitation Message *",
    inviteMsgPlaceholder: "e.g. You and your family are warmly invited to celebrate...",
    useExample: "Use Sample Message",
    yearLabel: "Established Year (Optional)",
    yearPlaceholder: "e.g. 2015",
    contactLabel: "WhatsApp / Contact Number *",
    contactPlaceholder: "e.g. +91 98765 43210",
    addressLabel: "Address / Venue *",
    addressPlaceholder: "e.g. Ganesh Chowk, Shivaji Nagar, Pune",
    mapsLabel: "Google Maps Link (Optional)",
    mapsPlaceholder: "https://maps.app.goo.gl/...",
    mapsHint: "Open your location in Google Maps → Tap Share → 'Copy link' and paste here.",
    instaLabel: "Instagram / Social Profile Link (Optional)",
    instaPlaceholder: "https://instagram.com/...",

    // Step 2
    step2Title: "Aarti & Event Schedule",
    step2Subtitle: "Select applicable events below and set dates & timings.",
    selectEventsHelp: "Select events that apply (titles come pre-filled):",
    selectedEventsTitle: "Selected Events — Set date & time:",
    morningAarti: "Morning Aarti Time",
    eveningAarti: "Evening Aarti Time",
    dateLabel: "Date",
    timeLabel: "Time",
    eventTitlePlaceholder: "Event Title (e.g. Blood Donation Camp)",
    eventDescPlaceholder: "Brief description",
    addCustomEvent: "+ Add Custom Event",
    removeBtn: "Remove",

    // Step 3
    step3Title: "Ganpati Bappa Photos",
    step3Subtitle: "Upload at least 1 and up to 10 photos of Bappa, decoration, or past celebrations.",
    photosCount: (count: number) => `Selected Photos: ${count}/10 (Min 1 required)`,
    uploadBtnText: "Choose Photos or Drag & Drop",
    uploadFormatHint: "JPG, PNG or WEBP • Up to 10 photos",
    noPhotosYet: "No photos selected yet. Please upload at least 1 photo.",
    captionPlaceholder: "Photo caption (e.g. Bappa's Idol)",

    // Step 4
    step4Title: "Your Invitation is Ready!",
    step4Subtitle: "Preview the complete animated invitation before final submission.",
    viewPreviewBtn: "👁️ View Full Live Preview",
    confirmSubmitBtn: "✓ Confirm & Submit",
    canEditTip: "💡 You will receive a private Edit Link after submitting, allowing you to update details, address, or photos anytime.",

    // Buttons & Navigation
    next: "Continue →",
    back: "← Back",
    previewBtn: "Check Preview →",
    submitting: "Saving...",
    fillRequired: "Please fill all required (*) fields highlighted in red.",
    needPhoto: "Please upload at least 1 photo.",
    homeBtn: "Home",
    fieldRequired: "This field is required",
  },
};

const makeId = () => Math.random().toString(36).slice(2, 10);

const emptyEvent = (): TimelineDraft => ({
  id: makeId(),
  title: "",
  summary: "",
  date: "",
  time: "",
});

function parseTime12(value: string) {
  const match = value?.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (match) {
    return { hour: String(parseInt(match[1], 10)), minute: match[2], period: match[3].toUpperCase() };
  }
  return { hour: "7", minute: "00", period: "AM" };
}

function TimePicker12({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const parsed = parseTime12(value);

  const setPart = (part: "hour" | "minute" | "period", v: string) => {
    const next = { ...parsed, [part]: v };
    onChange(`${next.hour.padStart(2, "0")}:${next.minute} ${next.period}`);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      <select
        className="w-full rounded-xl border border-[#e8a93b]/40 bg-[#170306] px-2 py-3 text-center text-sm sm:text-base font-semibold text-[#fef9eb] shadow-inner outline-none transition-all focus:border-[#e8a93b] focus:ring-2 focus:ring-[#e8a93b]/30 cursor-pointer"
        value={parsed.hour}
        onChange={(e) => setPart("hour", e.target.value)}
      >
        {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((h) => (
          <option key={h} value={h} className="bg-[#1f0609] text-[#fef9eb] py-2">
            {h}
          </option>
        ))}
      </select>
      <select
        className="w-full rounded-xl border border-[#e8a93b]/40 bg-[#170306] px-2 py-3 text-center text-sm sm:text-base font-semibold text-[#fef9eb] shadow-inner outline-none transition-all focus:border-[#e8a93b] focus:ring-2 focus:ring-[#e8a93b]/30 cursor-pointer"
        value={parsed.minute}
        onChange={(e) => setPart("minute", e.target.value)}
      >
        {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")).map((m) => (
          <option key={m} value={m} className="bg-[#1f0609] text-[#fef9eb] py-2">
            {m}
          </option>
        ))}
      </select>
      <select
        className="w-full rounded-xl border border-[#e8a93b]/40 bg-[#170306] px-2 py-3 text-center text-sm sm:text-base font-bold text-[#f3d089] shadow-inner outline-none transition-all focus:border-[#e8a93b] focus:ring-2 focus:ring-[#e8a93b]/30 cursor-pointer"
        value={parsed.period}
        onChange={(e) => setPart("period", e.target.value)}
      >
        <option value="AM" className="bg-[#1f0609] text-[#f3d089] font-bold py-2">AM</option>
        <option value="PM" className="bg-[#1f0609] text-[#f3d089] font-bold py-2">PM</option>
      </select>
    </div>
  );
}

export default function SubmitForm() {
  const router = useRouter();

  // UI Language toggle (Marathi / English)
  const [formLang, setFormLang] = useState<FormLanguage>("mr");

  const t = UI_TEXT[formLang];

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [attemptedStep1, setAttemptedStep1] = useState(false);
  const [sampleUsedToast, setSampleUsedToast] = useState(false);

  // Business logic state (100% matched to existing database schema)
  const [mandalName, setMandalName] = useState("");
  const [language, setLanguage] = useState<"mr" | "hi" | "en">("mr");
  const [inviteMessage, setInviteMessage] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [mapsLink, setMapsLink] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

  const [events, setEvents] = useState<TimelineDraft[]>([]);
  const [gallery, setGallery] = useState<GalleryDraft[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);

  const fillSampleData = () => {
    if (language === "en" || formLang === "en") {
      setMandalName("Shree Siddhivinayak Ganesh Mandal");
      setInviteMessage(INVITE_EXAMPLES.en);
      setEstablishedYear("2015");
      setContact("+91 98765 43210");
      setAddress("Ganesh Chowk, FC Road, Shivaji Nagar, Pune - 411005");
      setMapsLink("https://maps.google.com/?q=Pune");
    } else if (language === "hi") {
      setMandalName("श्री सिद्धिविनायक गणेश उत्सव मंडल");
      setInviteMessage(INVITE_EXAMPLES.hi);
      setEstablishedYear("2015");
      setContact("+91 98765 43210");
      setAddress("गणेश चौक, एफसी रोड, शिवाजी नगर, पुणे - 411005");
      setMapsLink("https://maps.google.com/?q=Pune");
    } else {
      setMandalName("श्री सिद्धिविनायक गणेश उत्सव मंडळ");
      setInviteMessage(INVITE_EXAMPLES.mr);
      setEstablishedYear("2015");
      setContact("+91 98765 43210");
      setAddress("गणेश चौक, एफसी रोड, शिवाजी नगर, पुणे - ४११००५");
      setMapsLink("https://maps.google.com/?q=Pune");
    }

    // Also populate default timeline events if empty
    if (events.length === 0) {
      setEvents([
        {
          id: makeId(),
          title: formLang === "mr" ? "श्रींची स्थापना व प्रतिष्ठापना" : "Ganesh Sthapana Puja",
          summary: formLang === "mr" ? "सकाळी शुभ मुहूर्तावर प्रतिष्ठापना" : "Morning auspicious ritual",
          date: "2026-09-14",
          time: "10:00 AM",
          presetKey: "sthapana",
        },
        {
          id: makeId(),
          title: formLang === "mr" ? "दैनिक महाआरती" : "Daily Maha Aarti",
          summary: formLang === "mr" ? "सकाळी व सायंकाळी आरती" : "Morning & Evening prayers",
          date: "",
          time: "",
          morningTime: "08:00 AM",
          eveningTime: "07:30 PM",
          presetKey: "aarti",
        },
      ]);
    }

    setSampleUsedToast(true);
    setTimeout(() => setSampleUsedToast(false), 3000);
    setError("");
  };

  const handleStep1Next = () => {
    setAttemptedStep1(true);
    if (validateStep1()) {
      setError("");
      safeTrack("form_step1_complete");
      setStep(2);
      window.scrollTo({ top: 80, behavior: "smooth" });
    } else {
      setError(t.fillRequired);
      // Auto-scroll to first invalid element
      if (!mandalName.trim()) {
        const el = document.getElementById("mandal-name-input");
        el?.focus();
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (!inviteMessage.trim()) {
        const el = document.getElementById("invite-msg-input");
        el?.focus();
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (!contact.trim()) {
        const el = document.getElementById("contact-input");
        el?.focus();
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (!address.trim()) {
        const el = document.getElementById("address-input");
        el?.focus();
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const updateEvent = (id: string, field: keyof TimelineDraft, value: string) => {
    setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, [field]: value } : ev)));
  };

  const addCustomEvent = () => {
    if (events.length < 10) {
      setEvents((p) => [...p, emptyEvent()]);
    }
  };

  const removeEvent = (id: string) => {
    setEvents((p) => p.filter((ev) => ev.id !== id));
  };

  const togglePreset = (preset: { key: string; title: string; summary: string }) => {
    setEvents((prev) => {
      const exists = prev.find((ev) => ev.presetKey === preset.key);
      if (exists) return prev.filter((ev) => ev.presetKey !== preset.key);
      if (prev.length >= 10) return prev;
      return [
        ...prev,
        {
          id: makeId(),
          title: preset.title,
          summary: preset.summary,
          date: "",
          time: "",
          presetKey: preset.key,
        },
      ];
    });
  };

  const isPresetSelected = (key: string) => events.some((ev) => ev.presetKey === key);

  const handlePhotos = (files: FileList | null) => {
    if (!files) return;
    const selected = Array.from(files).slice(0, 10 - gallery.length);
    const drafts = selected.map((file) => ({
      file,
      caption: "",
      preview: URL.createObjectURL(file),
    }));
    setGallery((prev) => [...prev, ...drafts].slice(0, 10));
  };

  const updateCaption = (i: number, caption: string) => {
    setGallery((prev) => prev.map((g, idx) => (idx === i ? { ...g, caption } : g)));
  };

  const removePhoto = (i: number) => {
    setGallery((prev) => prev.filter((_, idx) => idx !== i));
  };

  const validateStep1 = () =>
    mandalName.trim().length > 0 &&
    inviteMessage.trim().length > 0 &&
    contact.trim().length > 0 &&
    address.trim().length > 0;

  const validateStep3 = () => gallery.length >= 1;

  const buildFinalTimeline = () =>
    events
      .filter((e) => e.title.trim())
      .map((e) => {
        if (e.presetKey === "aarti") {
          const parts: string[] = [];
          if (e.morningTime) parts.push(`सकाळी ${e.morningTime}`);
          if (e.eveningTime) parts.push(`सायंकाळी ${e.eveningTime}`);
          return { title: e.title, summary: e.summary, time: parts.join(" व ") };
        }
        return { title: e.title, summary: e.summary, date: e.date, time: e.time };
      });

  const buildPreviewData = (): InvitationData => ({
    mandalName: mandalName || "तुमच्या मंडळाचे नाव",
    inviteLine: "आपणास सस्नेह निमंत्रण!",
    inviteMessage: inviteMessage || "तुमचा निमंत्रण संदेश इथे दिसेल",
    establishedYear,
    murtiPhotos: gallery.slice(0, 3).map((g) => g.preview),
    timelineEvents: buildFinalTimeline(),
    address,
    contact,
    mapEmbedUrl: mapsLink
      ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
      : `https://maps.google.com/maps?q=${encodeURIComponent(address || "India")}&output=embed`,
    mapsLink: mapsLink || `https://maps.google.com/?q=${encodeURIComponent(address || "India")}`,
    galleryPhotos: gallery.map((g) => ({ url: g.preview, caption: g.caption })),
    instagramUrl: instagramUrl || undefined,
  });

  const handleSubmit = async () => {
    setError("");
    if (gallery.length < 1) {
      setError(t.needPhoto);
      return;
    }

    setSubmitting(true);

    try {
      const slug = await getUniqueSlug(mandalName);
      const editToken = crypto.randomUUID();

      setProgress(formLang === "mr" ? "फोटो अपलोड होत आहेत..." : "Uploading photos...");

      const galleryUrls = await uploadPhotos(
        gallery.map((g) => g.file),
        slug,
        (done, total) =>
          setProgress(
            formLang === "mr"
              ? `फोटो अपलोड होत आहेत... (${done}/${total})`
              : `Uploading photos... (${done}/${total})`
          )
      );

      const galleryData = galleryUrls.map((url, i) => ({
        url,
        caption: gallery[i].caption,
      }));

      setProgress(formLang === "mr" ? "माहिती सेव्ह होत आहे..." : "Saving your invitation details...");

      const finalTimeline = buildFinalTimeline();

      const { error: insertError } = await supabase.from("mandals").insert({
        slug,
        edit_token: editToken,
        mandal_name: mandalName,
        language,
        invite_message: inviteMessage,
        established_year: establishedYear,
        contact,
        address,
        maps_link: mapsLink,
        instagram_url: instagramUrl || null,
        timeline: finalTimeline,
        gallery: galleryData,
        status: "pending",
      });

      if (insertError) throw insertError;

      safeTrack("form_submitted");
      router.push(`/submit/thank-you?slug=${slug}&editToken=${editToken}`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "काहीतरी चूक झाली, कृपया पुन्हा प्रयत्न करा.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#1c0609] text-[#fef9eb] selection:bg-[#e8a93b] selection:text-black">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-[#d96a2b]/15 blur-[140px]" />
        <div className="absolute top-1/3 -right-32 h-[350px] w-[350px] rounded-full bg-[#e8a93b]/10 blur-[130px]" />
        <div className="absolute bottom-10 -left-32 h-[400px] w-[400px] rounded-full bg-[#6b1e23]/25 blur-[140px]" />
      </div>

      {/* =====================================================
          TOP NAVIGATION & LANGUAGE SWITCH BAR
      ====================================================== */}
      <header className="sticky top-0 z-30 border-b border-[#e8a93b]/25 bg-[#24070b]/90 backdrop-blur-md px-4 py-2.5">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#f3d089] hover:text-white transition-colors"
          >
            <span>←</span>
            <span>{t.homeBtn}</span>
          </Link>

          <span className="hidden sm:inline-block text-xs font-semibold text-[#f3d089]/90 tracking-wide">
            {t.sacredHeader}
          </span>

      {/* Language Switcher Pill */}
          <div className="flex items-center rounded-xl border border-[#e8a93b]/40 bg-black/70 p-1 shadow-inner">
            <button
              type="button"
              onClick={() => {
                setFormLang("mr");
              }}
              className={`cursor-pointer rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-bold transition-all ${
                formLang === "mr"
                  ? "bg-gradient-to-r from-[#e8a93b] to-[#d96a2b] text-[#1c0609] shadow-md ring-1 ring-amber-300 scale-105"
                  : "text-[#f3d089]/80 hover:text-white hover:bg-white/10"
              }`}
            >
              मराठी
            </button>
            <button
              type="button"
              onClick={() => {
                setFormLang("en");
              }}
              className={`cursor-pointer rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-bold transition-all ${
                formLang === "en"
                  ? "bg-gradient-to-r from-[#e8a93b] to-[#d96a2b] text-[#1c0609] shadow-md ring-1 ring-amber-300 scale-105"
                  : "text-[#f3d089]/80 hover:text-white hover:bg-white/10"
              }`}
            >
              English
            </button>
          </div>

        </div>
      </header>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        
        {/* Sacred Mantra & Headline */}
        <div className="text-center mb-6">
          <p className="text-xs font-semibold tracking-wider text-[#e8a93b] sm:hidden mb-1">
            {t.sacredHeader}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#f3d089]">
            {t.title}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#fef9eb]/75 max-w-lg mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          {/* EDIT NOTICE / REASSURANCE BADGE */}
          <div className="mt-3.5 mx-auto max-w-md rounded-xl border border-amber-400/30 bg-amber-950/30 px-3.5 py-2 text-center backdrop-blur-sm">
            <p className="text-xs font-medium text-[#fce4a6] leading-snug">
              {t.editNotice}
            </p>
          </div>
        </div>

        {/* =====================================================
            PROGRESS STEPPER
        ====================================================== */}
        <div className="mb-6 rounded-2xl border border-[#e8a93b]/20 bg-[#28090e]/70 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between relative">
            {[1, 2, 3, 4].map((sIndex, idx) => {
              const isCompleted = step > sIndex;
              const isCurrent = step === sIndex;
              return (
                <div key={sIndex} className="flex flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (sIndex < step) setStep(sIndex);
                    }}
                    disabled={sIndex > step}
                    className="flex flex-col items-center mx-auto text-center focus:outline-none cursor-pointer"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all ${
                        isCompleted
                          ? "bg-emerald-500 text-white shadow-md"
                          : isCurrent
                          ? "bg-gradient-to-r from-[#e8a93b] to-[#d96a2b] text-[#200608] ring-2 ring-[#e8a93b]/50 shadow-md scale-105"
                          : "border border-[#e8a93b]/25 bg-black/40 text-white/40"
                      }`}
                    >
                      {isCompleted ? "✓" : sIndex}
                    </div>
                    <span
                      className={`mt-1.5 text-[11px] font-semibold transition-colors ${
                        isCurrent
                          ? "text-[#f3d089]"
                          : isCompleted
                          ? "text-emerald-400"
                          : "text-white/40"
                      }`}
                    >
                      {t.steps[idx]}
                    </span>
                  </button>
                  {idx < 3 && (
                    <div
                      className={`h-0.5 flex-1 mx-1 rounded-full transition-colors ${
                        step > sIndex ? "bg-emerald-500/70" : "bg-[#e8a93b]/20"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-[#fef9eb]/60 border-t border-[#e8a93b]/15 pt-2">
            <span>{t.stepProgress(step, 4)}</span>
            <span className="text-[#f3d089]/90 font-medium">✓ {t.editNoticeShort}</span>
          </div>
        </div>

        {/* =====================================================
            MINI LIVE PREVIEW STRIP (WHEN DATA EXISTS)
        ====================================================== */}
        {step < 4 && (mandalName || gallery.length > 0) && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#e8a93b]/30 bg-black/40 p-2.5 backdrop-blur-sm">
            {gallery[0] ? (
              <img
                src={gallery[0].preview}
                alt="Preview thumbnail"
                className="h-10 w-10 rounded-lg object-cover border border-[#e8a93b]/40"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8a93b]/20 text-lg">
                🪔
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#e8a93b]/70">
                Live Preview
              </p>
              <p className="truncate text-xs sm:text-sm font-bold text-[#fef9eb]">
                {mandalName || (formLang === "mr" ? "तुमच्या मंडळाचे नाव" : "Your Mandal Name")}
              </p>
            </div>
            {gallery.length > 0 && (
              <span className="rounded-md bg-[#e8a93b]/20 px-2 py-0.5 text-[10px] font-semibold text-[#f3d089]">
                {gallery.length} {formLang === "mr" ? "फोटो" : "Photos"}
              </span>
            )}
          </div>
        )}

        {/* =====================================================
            FORM CARD
        ====================================================== */}
        <div className="rounded-3xl border border-[#e8a93b]/25 bg-gradient-to-b from-[#2a090e]/90 to-[#1b0508]/95 p-5 sm:p-7 shadow-2xl backdrop-blur-xl">

          {/* =================================================
              STEP 1: BASIC INFORMATION
          ================================================== */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e8a93b]/20 pb-3">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[#f3d089]">
                    {t.step1Title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#fef9eb]/70 mt-1">
                    {t.step1Subtitle}
                  </p>
                </div>
                {/* One-click demo autofill button */}
                <button
                  type="button"
                  onClick={fillSampleData}
                  className="self-start sm:self-center inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-950/40 hover:bg-amber-900/60 px-3 py-1.5 text-xs font-bold text-[#fce4a6] shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>✨</span>
                  <span>{formLang === "mr" ? "डेमो माहिती भरा" : "Auto-fill Demo"}</span>
                </button>
              </div>

              {/* Mandal / Family Name */}
              <div className="space-y-1.5">
                <label htmlFor="mandal-name-input" className="block text-sm sm:text-base font-semibold text-[#f3d089]">
                  {t.mandalNameLabel}
                </label>
                <input
                  id="mandal-name-input"
                  type="text"
                  value={mandalName}
                  onChange={(e) => {
                    setMandalName(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder={t.mandalNamePlaceholder}
                  className={`w-full rounded-2xl border bg-[#170306] px-4 py-3.5 text-base sm:text-lg text-[#fef9eb] placeholder:text-[#fef9eb]/40 shadow-inner outline-none transition-all focus:border-[#e8a93b] focus:bg-[#220509] focus:ring-2 focus:ring-[#e8a93b]/30 ${
                    attemptedStep1 && !mandalName.trim() ? "border-rose-500 ring-2 ring-rose-500/30" : "border-[#e8a93b]/35"
                  }`}
                />
                {attemptedStep1 && !mandalName.trim() && (
                  <p className="text-xs sm:text-sm text-rose-400 font-semibold">⚠️ {t.fieldRequired}</p>
                )}
              </div>

              {/* Language Selection inside the invitation */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-[#f3d089]">
                  {t.languageSelectLabel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setLanguage("mr")}
                    className={`rounded-xl py-2.5 px-2 text-center text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                      language === "mr"
                        ? "border-[#e8a93b] bg-gradient-to-r from-[#e8a93b] to-[#d96a2b] text-[#1c0609] shadow-md"
                        : "border-[#e8a93b]/30 bg-[#170306] text-[#fef9eb]/75 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    मराठी (Marathi)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("hi")}
                    className={`rounded-xl py-2.5 px-2 text-center text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                      language === "hi"
                        ? "border-[#e8a93b] bg-gradient-to-r from-[#e8a93b] to-[#d96a2b] text-[#1c0609] shadow-md"
                        : "border-[#e8a93b]/30 bg-[#170306] text-[#fef9eb]/75 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    हिंदी (Hindi)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`rounded-xl py-2.5 px-2 text-center text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                      language === "en"
                        ? "border-[#e8a93b] bg-gradient-to-r from-[#e8a93b] to-[#d96a2b] text-[#1c0609] shadow-md"
                        : "border-[#e8a93b]/30 bg-[#170306] text-[#fef9eb]/75 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Invitation Message */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="invite-msg-input" className="block text-sm sm:text-base font-semibold text-[#f3d089]">
                    {t.inviteMsgLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const sample = INVITE_EXAMPLES[language] || INVITE_EXAMPLES[formLang] || INVITE_EXAMPLES.mr;
                      setInviteMessage(sample);
                      setSampleUsedToast(true);
                      setTimeout(() => setSampleUsedToast(false), 3000);
                      if (error) setError("");
                    }}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#e8a93b] hover:text-[#fef9eb] bg-[#e8a93b]/15 hover:bg-[#e8a93b]/30 px-3 py-1.5 rounded-xl border border-[#e8a93b]/40 transition-all cursor-pointer active:scale-95 shadow-sm"
                  >
                    <span>✨ {t.useExample}</span>
                    {sampleUsedToast && (
                      <span className="text-emerald-300 font-bold ml-1 animate-pulse">✓ {formLang === "mr" ? "जोडला!" : "Applied!"}</span>
                    )}
                  </button>
                </div>
                <textarea
                  id="invite-msg-input"
                  rows={4}
                  value={inviteMessage}
                  onChange={(e) => {
                    setInviteMessage(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder={t.inviteMsgPlaceholder}
                  className={`w-full rounded-2xl border bg-[#170306] px-4 py-3.5 text-base sm:text-lg text-[#fef9eb] placeholder:text-[#fef9eb]/40 shadow-inner outline-none transition-all focus:border-[#e8a93b] focus:bg-[#220509] focus:ring-2 focus:ring-[#e8a93b]/30 resize-none leading-relaxed ${
                    attemptedStep1 && !inviteMessage.trim() ? "border-rose-500 ring-2 ring-rose-500/30" : "border-[#e8a93b]/35"
                  }`}
                />
                {attemptedStep1 && !inviteMessage.trim() && (
                  <p className="text-xs sm:text-sm text-rose-400 font-semibold">⚠️ {t.fieldRequired}</p>
                )}
              </div>

              {/* Year & Contact in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm sm:text-base font-semibold text-[#f3d089]">
                    {t.yearLabel}
                  </label>
                  <input
                    type="text"
                    value={establishedYear}
                    onChange={(e) => setEstablishedYear(e.target.value)}
                    placeholder={t.yearPlaceholder}
                    className="w-full rounded-2xl border border-[#e8a93b]/35 bg-[#170306] px-4 py-3.5 text-base sm:text-lg text-[#fef9eb] placeholder:text-[#fef9eb]/40 shadow-inner outline-none transition-all focus:border-[#e8a93b] focus:bg-[#220509] focus:ring-2 focus:ring-[#e8a93b]/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-input" className="block text-sm sm:text-base font-semibold text-[#f3d089]">
                    {t.contactLabel}
                  </label>
                  <input
                    id="contact-input"
                    type="tel"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder={t.contactPlaceholder}
                    className={`w-full rounded-2xl border bg-[#170306] px-4 py-3.5 text-base sm:text-lg text-[#fef9eb] placeholder:text-[#fef9eb]/40 shadow-inner outline-none transition-all focus:border-[#e8a93b] focus:bg-[#220509] focus:ring-2 focus:ring-[#e8a93b]/30 ${
                      attemptedStep1 && !contact.trim() ? "border-rose-500 ring-2 ring-rose-500/30" : "border-[#e8a93b]/35"
                    }`}
                  />
                  {attemptedStep1 && !contact.trim() && (
                    <p className="text-xs sm:text-sm text-rose-400 font-semibold">⚠️ {t.fieldRequired}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label htmlFor="address-input" className="block text-sm sm:text-base font-semibold text-[#f3d089]">
                  {t.addressLabel}
                </label>
                <input
                  id="address-input"
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder={t.addressPlaceholder}
                  className={`w-full rounded-2xl border bg-[#170306] px-4 py-3.5 text-base sm:text-lg text-[#fef9eb] placeholder:text-[#fef9eb]/40 shadow-inner outline-none transition-all focus:border-[#e8a93b] focus:bg-[#220509] focus:ring-2 focus:ring-[#e8a93b]/30 ${
                    attemptedStep1 && !address.trim() ? "border-rose-500 ring-2 ring-rose-500/30" : "border-[#e8a93b]/35"
                  }`}
                />
                {attemptedStep1 && !address.trim() && (
                  <p className="text-xs sm:text-sm text-rose-400 font-semibold">⚠️ {t.fieldRequired}</p>
                )}
              </div>

              {/* Google Maps Link */}
              <div className="space-y-1.5">
                <label className="block text-sm sm:text-base font-semibold text-[#f3d089]">
                  {t.mapsLabel}
                </label>
                <input
                  type="url"
                  value={mapsLink}
                  onChange={(e) => setMapsLink(e.target.value)}
                  placeholder={t.mapsPlaceholder}
                  className="w-full rounded-2xl border border-[#e8a93b]/35 bg-[#170306] px-4 py-3.5 text-base sm:text-lg text-[#fef9eb] placeholder:text-[#fef9eb]/40 shadow-inner outline-none transition-all focus:border-[#e8a93b] focus:bg-[#220509] focus:ring-2 focus:ring-[#e8a93b]/30"
                />
                <p className="text-xs sm:text-sm text-[#fef9eb]/60 leading-normal">
                  💡 {t.mapsHint}
                </p>
              </div>

              {/* Instagram URL */}
              <div className="space-y-1.5">
                <label className="block text-sm sm:text-base font-semibold text-[#f3d089]">
                  {t.instaLabel}
                </label>
                <input
                  type="url"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  placeholder={t.instaPlaceholder}
                  className="w-full rounded-2xl border border-[#e8a93b]/35 bg-[#170306] px-4 py-3.5 text-base sm:text-lg text-[#fef9eb] placeholder:text-[#fef9eb]/40 shadow-inner outline-none transition-all focus:border-[#e8a93b] focus:bg-[#220509] focus:ring-2 focus:ring-[#e8a93b]/30"
                />
              </div>

              {/* Step 1 Submit Button with warning notice if invalid */}
              <div className="pt-3 space-y-2">
                {attemptedStep1 && !validateStep1() && (
                  <div className="rounded-xl border border-rose-500/50 bg-rose-950/60 p-3 text-center text-xs sm:text-sm font-bold text-rose-200 shadow-md">
                    ⚠️ {t.fillRequired}
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleStep1Next}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e8a93b] to-[#d96a2b] px-6 py-4 text-base sm:text-lg font-bold text-[#1c0609] shadow-lg shadow-amber-900/30 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>{t.next}</span>
                </button>
              </div>

            </div>
          )}

          {/* =================================================
              STEP 2: TIMETABLE & EVENTS
          ================================================== */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              
              <div className="border-b border-[#e8a93b]/20 pb-3">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#f3d089]">
                  {t.step2Title}
                </h2>
                <p className="text-xs sm:text-sm text-[#fef9eb]/70 mt-1">
                  {t.step2Subtitle}
                </p>
              </div>

              {/* Preset Checkbox Grid */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#f3d089]">
                  {t.selectEventsHelp}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PRESET_EVENTS_I18N[formLang].map((preset) => {
                    const checked = isPresetSelected(preset.key);
                    return (
                      <label
                        key={preset.key}
                        className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition-all ${
                          checked
                            ? "border-[#e8a93b] bg-[#e8a93b]/15 shadow-[0_0_15px_rgba(232,169,59,0.15)]"
                            : "border-[#e8a93b]/20 bg-black/30 hover:border-[#e8a93b]/40 hover:bg-black/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => togglePreset(preset)}
                          className="mt-0.5 h-4 w-4 rounded accent-[#e8a93b]"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="block text-xs sm:text-sm font-bold text-[#fef9eb]">
                            {preset.title}
                          </span>
                          <span className="block text-[11px] text-[#fef9eb]/60 mt-0.5 leading-snug">
                            {preset.summary}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Selected Events Date / Time Input Cards */}
              {events.length > 0 && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs sm:text-sm font-bold text-[#f3d089]">
                    {t.selectedEventsTitle}
                  </p>

                  {events.map((ev, i) => (
                    <div
                      key={ev.id}
                      className="rounded-2xl border border-[#e8a93b]/25 bg-black/40 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8a93b] text-xs font-bold text-[#200608]">
                            {i + 1}
                          </span>
                          <span className="text-sm font-bold text-[#f3d089]">
                            {ev.title || `Event ${i + 1}`}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeEvent(ev.id)}
                          className="text-xs font-medium text-rose-400 hover:text-rose-300 rounded-lg bg-rose-950/30 px-2.5 py-1 border border-rose-500/20"
                        >
                          {t.removeBtn}
                        </button>
                      </div>

                      {/* Custom Event fields if not preset */}
                      {!ev.presetKey && (
                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder={t.eventTitlePlaceholder}
                            value={ev.title}
                            onChange={(e) => updateEvent(ev.id, "title", e.target.value)}
                            className="w-full rounded-xl border border-[#e8a93b]/35 bg-[#170306] px-3.5 py-2.5 text-sm sm:text-base font-semibold text-[#fef9eb] placeholder:text-[#fef9eb]/40 shadow-inner outline-none transition-all focus:border-[#e8a93b]"
                          />
                          <input
                            type="text"
                            placeholder={t.eventDescPlaceholder}
                            value={ev.summary}
                            onChange={(e) => updateEvent(ev.id, "summary", e.target.value)}
                            className="w-full rounded-xl border border-[#e8a93b]/35 bg-[#170306] px-3.5 py-2.5 text-xs sm:text-sm text-[#fef9eb] placeholder:text-[#fef9eb]/40 shadow-inner outline-none transition-all focus:border-[#e8a93b]"
                          />
                        </div>
                      )}

                      {/* Specific Aarti Timing Pickers vs Standard Date/Time */}
                      {ev.presetKey === "aarti" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1">
                            <label className="block text-[11px] font-semibold text-[#f3d089]">
                              🌅 {t.morningAarti}
                            </label>
                            <TimePicker12
                              value={ev.morningTime || ""}
                              onChange={(v) => updateEvent(ev.id, "morningTime", v)}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[11px] font-semibold text-[#f3d089]">
                              🌇 {t.eveningAarti}
                            </label>
                            <TimePicker12
                              value={ev.eveningTime || ""}
                              onChange={(v) => updateEvent(ev.id, "eveningTime", v)}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1">
                            <label className="block text-[11px] font-semibold text-[#f3d089]">
                              📅 {t.dateLabel}
                            </label>
                            <input
                              type="date"
                              value={ev.date}
                              onChange={(e) => updateEvent(ev.id, "date", e.target.value)}
                              className="w-full rounded-xl border border-[#e8a93b]/35 bg-[#170306] px-3.5 py-2.5 text-sm sm:text-base text-[#fef9eb] shadow-inner outline-none transition-all focus:border-[#e8a93b]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[11px] font-semibold text-[#f3d089]">
                              ⏰ {t.timeLabel}
                            </label>
                            <TimePicker12
                              value={ev.time}
                              onChange={(v) => updateEvent(ev.id, "time", v)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Add Custom Event Button */}
              {events.length < 10 && (
                <button
                  type="button"
                  onClick={addCustomEvent}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#e8a93b]/40 bg-black/20 p-3.5 text-xs sm:text-sm font-semibold text-[#f3d089] hover:border-[#e8a93b] hover:bg-[#e8a93b]/10 transition-all"
                >
                  <span>{t.addCustomEvent}</span>
                </button>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 flex items-center justify-center rounded-2xl border border-[#e8a93b]/35 bg-black/40 px-4 py-3.5 text-sm sm:text-base font-semibold text-[#f3d089] hover:bg-[#e8a93b]/10 hover:text-white transition-all cursor-pointer"
                >
                  {t.back}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    safeTrack("form_step2_complete");
                    setStep(3);
                    window.scrollTo({ top: 80, behavior: "smooth" });
                  }}
                  className="flex-[2] flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e8a93b] to-[#d96a2b] px-6 py-3.5 text-sm sm:text-base font-bold text-[#1c0609] shadow-lg shadow-amber-900/30 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                >
                  {t.next}
                </button>
              </div>

            </div>
          )}

          {/* =================================================
              STEP 3: PHOTOS UPLOAD
          ================================================== */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              
              <div className="border-b border-[#e8a93b]/20 pb-3">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#f3d089]">
                  {t.step3Title}
                </h2>
                <p className="text-xs sm:text-sm text-[#fef9eb]/70 mt-1">
                  {t.step3Subtitle}
                </p>
              </div>

              {/* Upload Dropzone */}
              <label className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#e8a93b]/40 bg-black/30 p-6 text-center cursor-pointer hover:border-[#e8a93b] hover:bg-[#e8a93b]/5 transition-all">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handlePhotos(e.target.files)}
                  className="hidden"
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8a93b]/15 text-2xl text-[#e8a93b] mb-2">
                  📸
                </div>
                <p className="text-sm font-bold text-[#f3d089]">
                  {t.uploadBtnText}
                </p>
                <p className="text-xs text-[#fef9eb]/60 mt-1">
                  {t.uploadFormatHint}
                </p>
                <span className="mt-3 inline-block rounded-full bg-[#e8a93b]/15 border border-[#e8a93b]/30 px-3 py-1 text-xs font-semibold text-[#f3d089]">
                  {t.photosCount(gallery.length)}
                </span>
              </label>

              {/* Photo Previews Grid */}
              {gallery.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gallery.map((g, i) => (
                    <div
                      key={i}
                      className="group relative rounded-2xl border border-[#e8a93b]/25 bg-black/40 p-2 space-y-1.5 overflow-hidden"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-xl bg-black">
                        <img
                          src={g.preview}
                          alt={`Uploaded photo ${i + 1}`}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          className="absolute top-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm font-bold text-rose-300 hover:bg-rose-600 hover:text-white transition-colors backdrop-blur-sm"
                        >
                          ×
                        </button>
                        <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white/90 backdrop-blur-sm">
                          #{i + 1}
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder={t.captionPlaceholder}
                        value={g.caption}
                        onChange={(e) => updateCaption(i, e.target.value)}
                        className="w-full rounded-lg border border-[#e8a93b]/20 bg-black/50 px-2 py-1 text-xs text-[#fef9eb] placeholder:text-white/30 focus:border-[#e8a93b] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-[#e8a93b]/15 bg-black/20 p-4 text-center">
                  <p className="text-xs text-[#fef9eb]/60">
                    {t.noPhotosYet}
                  </p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 flex items-center justify-center rounded-2xl border border-[#e8a93b]/35 bg-black/40 px-4 py-3.5 text-sm sm:text-base font-semibold text-[#f3d089] hover:bg-[#e8a93b]/10 hover:text-white transition-all cursor-pointer"
                >
                  {t.back}
                </button>
                <button
                  type="button"
                  disabled={!validateStep3()}
                  onClick={() => {
                    if (validateStep3()) {
                      setError("");
                      setStep(4);
                    } else {
                      setError(t.needPhoto);
                    }
                  }}
                  className="flex-[2] flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e8a93b] to-[#d96a2b] px-6 py-3.5 text-sm sm:text-base font-bold text-[#1c0609] shadow-lg shadow-amber-900/30 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.previewBtn}
                </button>
              </div>

            </div>
          )}

          {/* =================================================
              STEP 4: REVIEW & CONFIRM
          ================================================== */}
          {step === 4 && (
            <div className="space-y-6 text-center animate-fadeIn py-2">
              
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e8a93b]/20 border border-[#e8a93b]/40 text-3xl shadow-[0_0_30px_rgba(232,169,59,0.3)]">
                🚩
              </div>

              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f3d089]">
                  {t.step4Title}
                </h2>
                <p className="text-xs sm:text-sm text-[#fef9eb]/75 mt-1.5 max-w-md mx-auto">
                  {t.step4Subtitle}
                </p>
              </div>

              {/* REASSURANCE CALLOUT */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/25 p-4 text-left backdrop-blur-sm">
                <p className="text-xs sm:text-sm font-medium text-emerald-200 leading-relaxed">
                  {t.canEditTip}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e8a93b] to-[#d96a2b] px-6 py-4 text-base sm:text-lg font-bold text-[#1c0609] shadow-lg shadow-amber-900/30 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>{t.viewPreviewBtn}</span>
                </button>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 flex items-center justify-center rounded-2xl border border-[#e8a93b]/35 bg-black/40 px-4 py-3.5 text-sm sm:text-base font-semibold text-[#f3d089] hover:bg-[#e8a93b]/10 hover:text-white transition-all cursor-pointer"
                  >
                    {t.back}
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Global Error Banner */}
          {error && (
            <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-950/40 p-3 text-center text-xs font-semibold text-rose-200">
              ⚠️ {error}
            </div>
          )}

          {/* Global Progress Banner */}
          {progress && (
            <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#e8a93b]/30 bg-black/40 p-3 text-center text-xs font-bold text-[#f3d089]">
              <span className="h-2 w-2 rounded-full bg-[#e8a93b] animate-ping" />
              <span>{progress}</span>
            </div>
          )}

        </div>

      </div>

      {/* =====================================================
          PREVIEW MODAL (INVITATION INTERFACE)
      ====================================================== */}
      {previewOpen && (
        <PreviewModal
          data={buildPreviewData()}
          onBack={() => setPreviewOpen(false)}
          onConfirm={handleSubmit}
          confirming={submitting}
          confirmLabel={submitting ? t.submitting : t.confirmSubmitBtn}
        />
      )}

    </main>
  );
}
