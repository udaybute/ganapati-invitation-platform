import { ImageResponse } from "next/og";
import { supabase } from "@/lib/supabase-client";

export const runtime = "edge";

// Generates a unique share-preview image per client on the fly —
// site.com/api/og?slug=jai-shankar-mandal — used by generateMetadata in app/[slug]/page.tsx
// One route, works for all 1000 clients, no manual image design needed per client.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") ?? "";

  const { data: row } = await supabase
    .from("mandals")
    .select("mandal_name, gallery")
    .eq("slug", slug)
    .single();

  const mandalName = row?.mandal_name ?? "गणेश मंडळ";
  const photoUrl = (row?.gallery as { url: string }[] | null)?.[0]?.url;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6B1E23 0%, #4A1418 100%)",
          position: "relative",
        }}
      >
        {photoUrl && (
          <img
            src={photoUrl}
            width={1200}
            height={630}
            style={{ position: "absolute", inset: 0, objectFit: "cover", opacity: 0.35 }}
          />
        )}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "60px 80px",
            border: "3px solid #E8A93B",
            borderRadius: "24px",
            background: "rgba(74,20,24,0.55)",
          }}
        >
          <div style={{ color: "#E8A93B", fontSize: 28, letterSpacing: 4 }}>॥ श्री गणेशाय नमः ॥</div>
          <div style={{ color: "#FBF3E3", fontSize: 56, fontWeight: 700, marginTop: 20, textAlign: "center" }}>
            {mandalName}
          </div>
          <div style={{ color: "#F3D089", fontSize: 30, marginTop: 18 }}>आपणास सस्नेह निमंत्रण</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
