import { ImageResponse } from "next/og";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#222720",
        color: "#f8f7f3",
        fontSize: 154,
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      r<span style={{ color: "#c55331", fontSize: 100 }}>.</span>
    </div>,
    size,
  );
}
