import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") || "Prana Studio";
  const tagline = searchParams.get("tagline") || "Yoga & Wellness";
  const logoUrl = searchParams.get("logo") || "";
  const color = `#${searchParams.get("color") || "8B7355"}`;
  const bgColor = `#${searchParams.get("bg") || "1A1714"}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: bgColor,
        padding: 64,
        position: "relative",
      }}
    >
      {/* Subtle top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: color,
        }}
      />

      {/* Logo image or fallback icon */}
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          style={{ height: 72, marginBottom: 32, objectFit: "contain" }}
          alt=""
        />
      ) : (
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: color,
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      )}

      {/* Tagline */}
      <div
        style={{
          color,
          fontSize: 14,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginBottom: 20,
          fontFamily: "sans-serif",
          fontWeight: 400,
        }}
      >
        {tagline}
      </div>

      {/* Main title */}
      <div
        style={{
          color: "#FAF8F5",
          fontSize: title.length > 30 ? 52 : 68,
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.1,
          maxWidth: 900,
          fontFamily: "serif",
        }}
      >
        {title}
      </div>

      {/* Accent divider */}
      <div
        style={{
          width: 48,
          height: 2,
          backgroundColor: color,
          marginTop: 32,
          opacity: 0.8,
        }}
      />

      {/* Koriva watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 32,
          color: "rgba(255,255,255,0.2)",
          fontSize: 11,
          letterSpacing: "0.2em",
          fontFamily: "sans-serif",
          textTransform: "uppercase",
        }}
      >
        Powered by Koriva
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
