"use client";

import InvitationPreview, { InvitationData } from "@/components/InvitationPreview";

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
    <div className="fixed inset-0 z-40 overflow-y-auto bg-black">
      {/* Floating action bar — z-[100] so it always stays above the intro-door
          animation inside Hero (which uses z-50 internally) */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between gap-3 bg-black/80 backdrop-blur-md px-4 py-3">
        <button
          onClick={onBack}
          className="text-amber-100 text-sm px-4 py-2 rounded-full border border-amber-400/40"
        >
          ← संपादित करा
        </button>
        <button
          onClick={onConfirm}
          disabled={confirming}
          className="bg-orange-500 text-white text-sm font-medium px-5 py-2 rounded-full disabled:opacity-50"
        >
          {confirming ? "..." : confirmLabel}
        </button>
      </div>

      <InvitationPreview data={data} />
    </div>
  );
}