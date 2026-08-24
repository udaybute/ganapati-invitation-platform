"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import { getUniqueSlug } from "@/lib/slug";
import { uploadPhotos } from "@/lib/photo-upload";

type TimelineDraft = {
  title: string;
  summary: string;
  date: string;
  time: string;
  place: string;
};

type GalleryDraft = {
  file: File;
  caption: string;
  preview: string;
};

const emptyEvent = (): TimelineDraft => ({
  title: "",
  summary: "",
  date: "",
  time: "",
  place: "",
});

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

  const updateEvent = (
    i: number,
    field: keyof TimelineDraft,
    value: string
  ) => {
    setEvents((prev) =>
      prev.map((ev, idx) =>
        idx === i ? { ...ev, [field]: value } : ev
      )
    );
  };

  const addEvent = () =>
    events.length < 10 &&
    setEvents((p) => [...p, emptyEvent()]);

  const removeEvent = (i: number) =>
    setEvents((p) => p.filter((_, idx) => idx !== i));

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
    setGallery((prev) =>
      prev.map((g, idx) =>
        idx === i ? { ...g, caption } : g
      )
    );
  };

  const removePhoto = (i: number) =>
    setGallery((prev) => prev.filter((_, idx) => idx !== i));

  const validateStep1 = () =>
    mandalName.trim() &&
    inviteMessage.trim() &&
    contact.trim() &&
    address.trim();

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
        (done, total) =>
          setProgress(
            `Photos upload ho rahi hain... (${done}/${total})`
          )
      );

      const galleryData = galleryUrls.map((url, i) => ({
        url,
        caption: gallery[i].caption,
      }));

      setProgress("Details save ho rahi hain...");

      const { error: insertError } = await supabase
        .from("mandals")
        .insert({
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
      setError(
        e.message || "Kuch galat ho gaya, dobara try karo."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#3e1016]">

      {/* =====================================================
          RESPONSIVE BACKGROUND
      ====================================================== */}

      {/* Mobile Background */}
      <div className="fixed inset-0 z-0 md:hidden">
        <img
          src="/images/backgrounds/invitation-mobile-bg.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Desktop Background */}
      <div className="fixed inset-0 z-0 hidden md:block">
        <img
          src="/images/backgrounds/invitation-desktop-bg.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* =====================================================
          BACKGROUND OVERLAY
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-[1] bg-[#3e1016]/10" />

      {/* Soft center glow */}
      <div className="pointer-events-none fixed left-1/2 top-1/2 z-[1] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/[0.04] blur-[120px]" />

      {/* =====================================================
          FLOATING DECORATIVE LIGHTS
      ====================================================== */}

      <span className="form-particle form-particle-1" />
      <span className="form-particle form-particle-2" />
      <span className="form-particle form-particle-3" />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto flex h-screen w-full max-w-3xl items-start justify-center overflow-hidden px-4 py-5 sm:px-6 sm:py-7 md:items-center md:px-8 md:py-10">

        <div className="form-card flex h-full w-full flex-col overflow-hidden">

          {/* =================================================
              HEADER
          ================================================== */}

          <div className="mb-6 text-center animate-form-fade-down sm:mb-8">

            <p className="mb-2 text-[10px] font-medium tracking-[0.3em] text-amber-300/80 sm:text-xs">
              ॥ श्री गणेशाय नमः ॥
            </p>

            <h1 className="font-display text-2xl font-bold leading-tight text-amber-100 sm:text-3xl md:text-4xl">
              तुमच्या मंडळाचे
              <br />
              निमंत्रण बनवा
            </h1>

            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-white/65 sm:text-sm">
              तुमची माहिती भरा आणि सुंदर digital Ganpati
              invitation तयार करा.
            </p>
          </div>

          {/* =================================================
              STEP INDICATOR
          ================================================== */}

          <div className="mb-6 animate-form-fade-up sm:mb-8">

            <div className="mx-auto flex max-w-md items-center justify-center">

              {[1, 2, 3].map((item, index) => (
                <div
                  key={item}
                  className="flex flex-1 items-center"
                >
                  <div className="flex w-full flex-col items-center">

                    <div
                      className={`step-circle ${
                        step >= item
                          ? "step-circle-active"
                          : "step-circle-inactive"
                      }`}
                    >
                      {step > item ? "✓" : item}
                    </div>

                    <span
                      className={`mt-2 text-[10px] sm:text-xs ${
                        step >= item
                          ? "text-amber-200"
                          : "text-white/40"
                      }`}
                    >
                      {item === 1
                        ? "माहिती"
                        : item === 2
                        ? "कार्यक्रम"
                        : "फोटो"}
                    </span>
                  </div>

                  {index < 2 && (
                    <div
                      className={`step-line ${
                        step > item
                          ? "step-line-active"
                          : ""
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <p className="mt-3 text-center text-[11px] text-white/50">
              Step {step} / 3
            </p>
          </div>

          {/* =================================================
              FORM PANEL
          ================================================== */}

          <div
  key={step}
  className="form-scroll-area animate-step-enter"
>

            {/* =================================================
                STEP 1
            ================================================== */}

            {step === 1 && (
              <div className="form-panel">

                <div className="mb-5">
                  <h2 className="section-title">
                    मंडळाची माहिती
                  </h2>

                  <p className="section-subtitle">
                    तुमच्या मंडळाबद्दल basic माहिती द्या.
                  </p>
                </div>

                <div className="flex flex-col gap-4">

                  <Field label="मंडळाचे नाव *">
                    <input
                      value={mandalName}
                      onChange={(e) =>
                        setMandalName(e.target.value)
                      }
                      className="input"
                      placeholder="जय शंकर गणेश मंडळ"
                    />
                  </Field>

                  <Field label="भाषा">
                    <select
                      value={language}
                      onChange={(e) =>
                        setLanguage(
                          e.target.value as
                            | "mr"
                            | "hi"
                            | "en"
                        )
                      }
                      className="input"
                    >
                      <option value="mr">मराठी</option>
                      <option value="hi">हिंदी</option>
                      <option value="en">English</option>
                    </select>
                  </Field>

                  <Field label="निमंत्रण संदेश *">
                    <textarea
                      value={inviteMessage}
                      onChange={(e) =>
                        setInviteMessage(e.target.value)
                      }
                      className="input resize-none"
                      rows={4}
                      placeholder="गणपती बाप्पांच्या आगमनानिमित्त..."
                    />
                  </Field>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <Field label="स्थापना वर्ष">
                      <input
                        value={establishedYear}
                        onChange={(e) =>
                          setEstablishedYear(e.target.value)
                        }
                        className="input"
                        placeholder="१९६९"
                      />
                    </Field>

                    <Field label="संपर्क क्रमांक *">
                      <input
                        value={contact}
                        onChange={(e) =>
                          setContact(e.target.value)
                        }
                        className="input"
                        placeholder="+91 90000 00000"
                      />
                    </Field>

                  </div>

                  <Field label="पत्ता *">
                    <input
                      value={address}
                      onChange={(e) =>
                        setAddress(e.target.value)
                      }
                      className="input"
                      placeholder="मंडळाचा पूर्ण पत्ता"
                    />
                  </Field>

                  <Field label="Google Maps लिंक">
                    <input
                      value={mapsLink}
                      onChange={(e) =>
                        setMapsLink(e.target.value)
                      }
                      className="input"
                      placeholder="https://maps.google.com/..."
                    />
                  </Field>

                  <Field label="Instagram लिंक (optional)">
                    <input
                      value={instagramUrl}
                      onChange={(e) =>
                        setInstagramUrl(e.target.value)
                      }
                      className="input"
                      placeholder="https://instagram.com/..."
                    />
                  </Field>

                  <NextButton
                    onClick={() =>
                      validateStep1() && setStep(2)
                    }
                  />

                </div>
              </div>
            )}

            {/* =================================================
                STEP 2
            ================================================== */}

            {step === 2 && (
              <div className="form-panel">

                <div className="mb-5">
                  <h2 className="section-title">
                    कार्यक्रमाची माहिती
                  </h2>

                  <p className="section-subtitle">
                    मंडळातील कार्यक्रम आणि त्यांची माहिती भरा.
                  </p>
                </div>

                <div className="flex flex-col gap-4">

                  {events.map((ev, i) => (
                    <div
                      key={i}
                      className="event-card animate-card-enter"
                      style={{
                        animationDelay: `${i * 70}ms`,
                      }}
                    >

                      <div className="mb-3 flex items-center justify-between">

                        <div className="flex items-center gap-2">
                          <span className="event-number">
                            {i + 1}
                          </span>

                          <span className="font-semibold text-amber-100">
                            कार्यक्रम {i + 1}
                          </span>
                        </div>

                        {events.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeEvent(i)
                            }
                            className="remove-button"
                          >
                            काढा
                          </button>
                        )}

                      </div>

                      <div className="flex flex-col gap-3">

                        <input
                          placeholder="शीर्षक (उदा. स्थापना)"
                          value={ev.title}
                          onChange={(e) =>
                            updateEvent(
                              i,
                              "title",
                              e.target.value
                            )
                          }
                          className="input"
                        />

                        <input
                          placeholder="थोडक्यात माहिती"
                          value={ev.summary}
                          onChange={(e) =>
                            updateEvent(
                              i,
                              "summary",
                              e.target.value
                            )
                          }
                          className="input"
                        />

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                          <input
                            placeholder="दिनांक"
                            value={ev.date}
                            onChange={(e) =>
                              updateEvent(
                                i,
                                "date",
                                e.target.value
                              )
                            }
                            className="input"
                          />

                          <input
                            placeholder="वेळ"
                            value={ev.time}
                            onChange={(e) =>
                              updateEvent(
                                i,
                                "time",
                                e.target.value
                              )
                            }
                            className="input"
                          />

                        </div>

                        <input
                          placeholder="स्थळ"
                          value={ev.place}
                          onChange={(e) =>
                            updateEvent(
                              i,
                              "place",
                              e.target.value
                            )
                          }
                          className="input"
                        />

                      </div>
                    </div>
                  ))}

                  {events.length < 10 && (
                    <button
                      type="button"
                      onClick={addEvent}
                      className="add-event-button"
                    >
                      <span className="text-lg">+</span>
                      आणखी कार्यक्रम जोडा
                    </button>
                  )}

                  <div className="mt-2 flex gap-3">
                    <BackButton
                      onClick={() => setStep(1)}
                    />

                    <NextButton
                      onClick={() => setStep(3)}
                    />
                  </div>

                </div>
              </div>
            )}

            {/* =================================================
                STEP 3
            ================================================== */}

            {step === 3 && (
              <div className="form-panel">

                <div className="mb-5">
                  <h2 className="section-title">
                    मंडळाचे फोटो
                  </h2>

                  <p className="section-subtitle">
                    किमान ६ आणि कमाल १० फोटो upload करा.
                  </p>
                </div>

                <div className="flex flex-col gap-5">

                  <Field
                    label={`छायाचित्रे *  — ${gallery.length}/10`}
                  >
                    <label className="upload-box">

                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          handlePhotos(e.target.files)
                        }
                        className="hidden"
                      />

                      <div className="upload-icon">
                        ↑
                      </div>

                      <p className="mt-2 text-sm font-semibold text-amber-100">
                        फोटो निवडा
                      </p>

                      <p className="mt-1 text-[11px] text-white/45">
                        JPG, PNG किंवा WEBP
                      </p>

                    </label>
                  </Field>

                  {gallery.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                      {gallery.map((g, i) => (
                        <div
                          key={i}
                          className="gallery-card animate-card-enter"
                          style={{
                            animationDelay: `${i * 60}ms`,
                          }}
                        >

                          <div className="relative aspect-square overflow-hidden rounded-xl">

                            <img
                              src={g.preview}
                              alt={`Gallery ${i + 1}`}
                              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                removePhoto(i)
                              }
                              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/65 text-sm text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-red-500"
                            >
                              ×
                            </button>

                            <div className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-1 text-[9px] text-white backdrop-blur-sm">
                              Photo {i + 1}
                            </div>

                          </div>

                          <input
                            placeholder="Caption"
                            value={g.caption}
                            onChange={(e) =>
                              updateCaption(
                                i,
                                e.target.value
                              )
                            }
                            className="caption-input"
                          />

                        </div>
                      ))}

                    </div>
                  )}

                  {gallery.length === 0 && (
                    <div className="rounded-xl border border-dashed border-amber-300/20 bg-black/10 px-4 py-5 text-center">
                      <p className="text-xs text-white/45">
                        अजून कोणतेही फोटो निवडलेले नाहीत.
                      </p>
                    </div>
                  )}

                  {error && (
                    <div className="status-error">
                      {error}
                    </div>
                  )}

                  {progress && (
                    <div className="status-progress">
                      <span className="loading-dot" />
                      {progress}
                    </div>
                  )}

                  <div className="mt-1 flex gap-3">

                    <BackButton
                      onClick={() => setStep(2)}
                    />

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={
                        submitting || !validateStep3()
                      }
                      className="submit-button"
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="button-spinner" />
                          Submit होत आहे...
                        </span>
                      ) : (
                        "निमंत्रण सबमिट करा →"
                      )}
                    </button>

                  </div>

                </div>
              </div>
            )}

          </div>

          {/* =================================================
              FOOTER
          ================================================== */}

          <p className="mt-6 text-center text-[9px] tracking-[0.15em] text-white/25 sm:mt-8">
            POWERED BY ELVATRIXA
          </p>

        </div>
      </div>

      {/* =====================================================
          STYLES
      ====================================================== */}

      <style jsx global>{`

        /* ===================================================
           FORM CARD
        =================================================== */

        .form-card {
          animation: formFadeIn 0.8s ease-out both;
        }

        .form-panel {
          border: 1px solid rgba(251, 191, 36, 0.16);
          border-radius: 24px;
          padding: 22px;
          background:
            linear-gradient(
              145deg,
              rgba(63, 18, 22, 0.82),
              rgba(35, 8, 12, 0.76)
            );
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow:
            0 25px 80px rgba(0, 0, 0, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        @media (min-width: 640px) {
          .form-panel {
            padding: 30px;
          }
        }

        @media (min-width: 768px) {
          .form-panel {
            border-radius: 28px;
            padding: 34px;
          }
        }

        /* ===================================================
           TITLES
        =================================================== */

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #fef3c7;
        }

        .section-subtitle {
          margin-top: 4px;
          font-size: 12px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.48);
        }

        @media (min-width: 640px) {
          .section-title {
            font-size: 22px;
          }

          .section-subtitle {
            font-size: 13px;
          }
        }

        /* ===================================================
           INPUTS
        =================================================== */

        .input {
          width: 100%;
          min-height: 46px;
          border: 1px solid rgba(252, 211, 77, 0.2);
          border-radius: 13px;
          padding: 11px 14px;
          font-size: 14px;
          color: #fff7ed;
          background: rgba(20, 5, 8, 0.3);
          outline: none;
          transition:
            border-color 250ms ease,
            box-shadow 250ms ease,
            background 250ms ease,
            transform 200ms ease;
        }

        .input::placeholder {
          color: rgba(255, 255, 255, 0.32);
        }

        .input:hover {
          border-color: rgba(252, 211, 77, 0.35);
          background: rgba(20, 5, 8, 0.4);
        }

        .input:focus {
          border-color: rgba(251, 191, 36, 0.75);
          background: rgba(20, 5, 8, 0.5);
          box-shadow:
            0 0 0 3px rgba(251, 191, 36, 0.08),
            0 8px 25px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }

        select.input {
          color-scheme: dark;
        }

        select.input option {
          background: #351015;
          color: white;
        }

        /* ===================================================
           LABELS
        =================================================== */

        label > span {
          color: rgba(255, 243, 199, 0.78);
        }

        /* ===================================================
           STEP INDICATOR
        =================================================== */

        .step-circle {
          display: flex;
          width: 30px;
          height: 30px;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          transition: all 350ms ease;
        }

        .step-circle-active {
          color: #451a03;
          background: linear-gradient(
            135deg,
            #fcd34d,
            #f59e0b
          );
          box-shadow:
            0 5px 20px rgba(245, 158, 11, 0.25);
        }

        .step-circle-inactive {
          color: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(251, 191, 36, 0.2);
          background: rgba(0, 0, 0, 0.15);
        }

        .step-line {
          height: 1px;
          flex: 1;
          margin: 0 7px;
          background: rgba(251, 191, 36, 0.15);
          transition: background 400ms ease;
        }

        .step-line-active {
          background: rgba(251, 191, 36, 0.65);
        }

        /* ===================================================
           BUTTONS
        =================================================== */

        .next-button,
        .submit-button {
          min-height: 48px;
          flex: 1;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
          color: #451a03;
          background: linear-gradient(
            135deg,
            #fcd34d,
            #f59e0b
          );
          box-shadow:
            0 10px 30px rgba(245, 158, 11, 0.18);
          transition:
            transform 250ms ease,
            box-shadow 250ms ease,
            filter 250ms ease;
        }

        .next-button:hover,
        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          filter: brightness(1.05);
          box-shadow:
            0 14px 35px rgba(245, 158, 11, 0.28);
        }

        .next-button:active,
        .submit-button:active:not(:disabled) {
          transform: scale(0.98);
        }

        .submit-button:disabled {
          cursor: not-allowed;
          opacity: 0.45;
          box-shadow: none;
        }

        .back-button {
          min-height: 48px;
          flex: 0 0 34%;
          border: 1px solid rgba(251, 191, 36, 0.28);
          border-radius: 999px;
          color: rgba(255, 243, 199, 0.85);
          background: rgba(0, 0, 0, 0.13);
          transition: all 250ms ease;
        }

        .back-button:hover {
          border-color: rgba(251, 191, 36, 0.55);
          background: rgba(0, 0, 0, 0.25);
          transform: translateY(-1px);
        }

        /* ===================================================
           EVENT CARDS
        =================================================== */

        .event-card {
          border: 1px solid rgba(251, 191, 36, 0.14);
          border-radius: 18px;
          padding: 16px;
          background: rgba(0, 0, 0, 0.12);
          transition:
            border-color 250ms ease,
            background 250ms ease,
            transform 250ms ease;
        }

        .event-card:hover {
          border-color: rgba(251, 191, 36, 0.3);
          background: rgba(0, 0, 0, 0.18);
          transform: translateY(-1px);
        }

        .event-number {
          display: flex;
          width: 25px;
          height: 25px;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          color: #451a03;
          background: #fbbf24;
          font-size: 11px;
          font-weight: 700;
        }

        .remove-button {
          border-radius: 999px;
          padding: 5px 10px;
          font-size: 11px;
          color: #fca5a5;
          background: rgba(127, 29, 29, 0.15);
          transition: all 200ms ease;
        }

        .remove-button:hover {
          background: rgba(127, 29, 29, 0.3);
          color: #fecaca;
        }

        .add-event-button {
          display: flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 1px dashed rgba(251, 191, 36, 0.3);
          border-radius: 15px;
          color: rgba(253, 230, 138, 0.8);
          background: rgba(0, 0, 0, 0.08);
          transition: all 250ms ease;
        }

        .add-event-button:hover {
          border-color: rgba(251, 191, 36, 0.6);
          background: rgba(251, 191, 36, 0.05);
          transform: translateY(-1px);
        }

        /* ===================================================
           PHOTO UPLOAD
        =================================================== */

        .upload-box {
          display: flex;
          min-height: 150px;
          cursor: pointer;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px dashed rgba(251, 191, 36, 0.35);
          border-radius: 18px;
          background: rgba(0, 0, 0, 0.12);
          transition:
            border-color 250ms ease,
            background 250ms ease,
            transform 250ms ease;
        }

        .upload-box:hover {
          border-color: rgba(251, 191, 36, 0.7);
          background: rgba(251, 191, 36, 0.05);
          transform: translateY(-2px);
        }

        .upload-icon {
          display: flex;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(251, 191, 36, 0.25);
          border-radius: 999px;
          color: #fcd34d;
          background: rgba(251, 191, 36, 0.08);
          font-size: 20px;
        }

        .gallery-card {
          overflow: hidden;
          border: 1px solid rgba(251, 191, 36, 0.13);
          border-radius: 14px;
          padding: 5px;
          background: rgba(0, 0, 0, 0.12);
        }

        .caption-input {
          width: 100%;
          margin-top: 5px;
          border: 0;
          border-radius: 8px;
          padding: 7px 8px;
          outline: none;
          color: #fff7ed;
          background: rgba(0, 0, 0, 0.2);
          font-size: 11px;
        }

        .caption-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .caption-input:focus {
          box-shadow: 0 0 0 1px rgba(251, 191, 36, 0.35);
        }

        /* ===================================================
           STATUS
        =================================================== */

        .status-error {
          border: 1px solid rgba(248, 113, 113, 0.2);
          border-radius: 12px;
          padding: 10px 12px;
          text-align: center;
          color: #fecaca;
          background: rgba(127, 29, 29, 0.15);
          font-size: 12px;
        }

        .status-progress {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: rgba(253, 230, 138, 0.8);
          font-size: 12px;
        }

        .loading-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #fbbf24;
          animation: loadingPulse 1s ease-in-out infinite;
        }

        .button-spinner {
          width: 15px;
          height: 15px;
          border: 2px solid rgba(69, 26, 3, 0.25);
          border-top-color: #451a03;
          border-radius: 999px;
          animation: spin 700ms linear infinite;
        }

        /* ===================================================
           PAGE ANIMATIONS
        =================================================== */

        @keyframes formFadeIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.99);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes formFadeDown {
          from {
            opacity: 0;
            transform: translateY(-18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes formFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes stepEnter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cardEnter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loadingPulse {
          0%,
          100% {
            transform: scale(0.7);
            opacity: 0.45;
          }

          50% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes particleFloat {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.15;
          }

          50% {
            transform: translateY(-20px);
            opacity: 0.6;
          }
        }

        .animate-form-fade-down {
          animation: formFadeDown 800ms ease-out both;
        }

        .animate-form-fade-up {
          animation: formFadeUp 800ms ease-out 150ms both;
        }

        .animate-step-enter {
          animation: stepEnter 500ms ease-out both;
        }

        .animate-card-enter {
          animation: cardEnter 500ms ease-out both;
        }

        .form-particle {
          position: fixed;
          z-index: 2;
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: rgba(252, 211, 77, 0.45);
          pointer-events: none;
          animation: particleFloat 4s ease-in-out infinite;
        }

        .form-particle-1 {
          left: 12%;
          top: 30%;
        }

        .form-particle-2 {
          right: 14%;
          top: 45%;
          width: 4px;
          height: 4px;
          animation-delay: 1s;
        }

        .form-particle-3 {
          left: 78%;
          top: 72%;
          width: 3px;
          height: 3px;
          animation-delay: 2s;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }

        @media (max-width: 480px) {
          .form-panel {
            padding: 17px;
            border-radius: 20px;
          }

          .input {
            min-height: 44px;
            padding: 10px 12px;
            font-size: 13px;
          }

          .back-button,
          .next-button,
          .submit-button {
            min-height: 46px;
            font-size: 13px;
          }

          .upload-box {
            min-height: 135px;
          }
        }
      `}</style>
    </main>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">
        {label}
      </span>

      {children}
    </label>
  );
}

/* =========================================================
   NEXT BUTTON
========================================================= */

function NextButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="next-button mt-2 w-full"
    >
      पुढे →
    </button>
  );
}

/* =========================================================
   BACK BUTTON
========================================================= */

function BackButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="back-button"
    >
      ← मागे
    </button>
  );
}