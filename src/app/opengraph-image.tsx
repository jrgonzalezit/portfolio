import { ImageResponse } from "next/og";
import { siteConfig } from "@config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #18181b 100%)",
          color: "#fafafa",
        }}
      >
        <div style={{ fontSize: 28, color: "#8b8b96", display: "flex" }}>
          {siteConfig.role}
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 20, display: "flex" }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 32, color: "#a1a1aa", marginTop: 28, display: "flex", maxWidth: 900 }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
