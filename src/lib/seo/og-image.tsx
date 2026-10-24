import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = "image/png";

export function renderOgImage({ title, subtitle }: { title: string; subtitle?: string }) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#09090b",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>{siteConfig.name}</div>
      <div
        style={{
          display: "flex",
          fontSize: 64,
          fontWeight: 700,
          marginTop: 24,
          lineHeight: 1.15,
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div style={{ display: "flex", fontSize: 30, color: "#a1a1aa", marginTop: 24 }}>
          {subtitle}
        </div>
      ) : null}
    </div>,
    { ...OG_IMAGE_SIZE },
  );
}
