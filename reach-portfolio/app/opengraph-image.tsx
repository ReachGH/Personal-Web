import { ImageResponse } from "next/og";

export const alt =
  "Reach — Software Developer. A little curiosity. A lot of building.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "65px 75px",
        background: "#f8f7f3",
        color: "#222720",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 44, fontWeight: 700 }}>
          reach<span style={{ color: "#c55331" }}>.</span>
        </span>
        <span style={{ fontSize: 17, letterSpacing: 2 }}>
          SOFTWARE DEVELOPER / GOLD COAST, AUSTRALIA
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 90,
          fontSize: 88,
          lineHeight: 1.07,
          letterSpacing: -4,
          fontWeight: 700,
        }}
      >
        <span>A little curiosity.</span>
        <span>
          A lot of <span style={{ color: "#c55331" }}>building.</span>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          borderTop: "1px solid #d6d7cd",
          paddingTop: 22,
          fontSize: 20,
        }}
      >
        Sovanreach In · Web, mobile & the systems underneath
      </div>
    </div>,
    { ...size },
  );
}
