"use client";

import InvitationPreview, {
  InvitationData,
} from "@/components/InvitationPreview";

export default function PreviewModal({
  data,
  onBack,
  onConfirm,
  confirmLabel = "✓ पुष्टी करा, Submit करा",
  confirming = false,
}: {
  data: InvitationData;
  onBack: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  confirming?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-40 bg-[#120804] text-white overflow-y-auto">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute bottom-0 -right-32 h-80 w-80 rounded-full bg-red-500/5 blur-3xl" />
      </div>

      {/* Top action bar */}
      <header className="fixed inset-x-0 top-0 z-[100]">
        <div className="mx-auto max-w-6xl px-3 pt-3 sm:px-5">
          <div
            className="
              flex items-center justify-between gap-3
              rounded-2xl border border-white/10
              bg-[#1b0c07]/85 px-3 py-3
              shadow-2xl shadow-black/40
              backdrop-blur-xl
              sm:px-4
            "
          >
            {/* Back */}
            <button
              type="button"
              onClick={onBack}
              className="
                group flex items-center gap-2
                rounded-xl border border-white/10
                bg-white/[0.04]
                px-3 py-2
                text-sm font-medium text-amber-50
                transition-all duration-200
                hover:border-amber-400/30
                hover:bg-amber-400/10
                active:scale-95
              "
            >
              <span
                className="
                  flex h-7 w-7 items-center justify-center
                  rounded-lg bg-white/5
                  text-base
                  transition-transform duration-200
                  group-hover:-translate-x-0.5
                "
              >
                ←
              </span>

              <span className="hidden sm:inline">
                संपादित करा
              </span>

              <span className="sm:hidden">
                मागे
              </span>
            </button>

            {/* Center title */}
            <div className="absolute left-1/2 hidden -translate-x-1/2 text-center sm:block">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-amber-400/70">
                Invitation Preview
              </p>

              <p className="mt-0.5 text-sm font-semibold text-amber-50">
                आमंत्रण पूर्वदृश्य
              </p>
            </div>

            {/* Confirm */}
            <button
              type="button"
              onClick={onConfirm}
              disabled={confirming}
              className="
                relative overflow-hidden
                rounded-xl
                bg-gradient-to-r from-orange-500 to-amber-500
                px-4 py-2.5
                text-sm font-semibold text-white
                shadow-lg shadow-orange-950/30
                transition-all duration-200
                hover:scale-[1.02]
                hover:shadow-orange-500/20
                active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:px-5
              "
            >
              <span className="relative z-10 flex items-center gap-2">
                {confirming ? (
                  <>
                    <span
                      className="
                        h-4 w-4 animate-spin rounded-full
                        border-2 border-white/30
                        border-t-white
                      "
                    />
                    <span>सबमिट होत आहे...</span>
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    <span className="hidden sm:inline">
                      पुष्टी करा, Submit करा
                    </span>
                    <span className="sm:hidden">
                      पुष्टी करा
                    </span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Preview area */}
      <main
        className="
          relative z-10
          min-h-screen
          px-3 pb-10 pt-24
          sm:px-6 sm:pt-28
        "
      >
        {/* Small mobile title */}
        <div className="mb-5 text-center sm:hidden">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-amber-400/60">
            Invitation Preview
          </p>

          <h2 className="mt-1 text-base font-semibold text-amber-50">
            आमंत्रण पूर्वदृश्य
          </h2>
        </div>

        {/* Preview card */}
        <div className="mx-auto w-full max-w-5xl">
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border border-amber-300/10
              bg-[#1a0b06]/50
              p-1
              shadow-[0_30px_100px_rgba(0,0,0,0.55)]
              sm:rounded-3xl sm:p-2
            "
          >
            {/* Gold inner glow */}
            <div
              className="
                pointer-events-none absolute inset-0
                rounded-[inherit]
                ring-1 ring-inset ring-amber-300/5
              "
            />

            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
              <InvitationPreview data={data} />
            </div>
          </div>

          {/* Bottom hint */}
          <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-white/40">
            <span className="h-px w-8 bg-white/10" />
            <span>वरील आमंत्रण तपासा आणि पुष्टी करा</span>
            <span className="h-px w-8 bg-white/10" />
          </div>
        </div>
      </main>
    </div>
  );
}