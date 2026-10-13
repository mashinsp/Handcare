import { ImageResponse } from "next/og"

/**
 * Default 1200x630 share card, used by pageMetadata() for pages without a
 * page-specific image (home, catalogue, quote, legal pages).
 */
export const alt = "Handcare — Leather Gloves Manufacturer & Exporter, Sialkot, Pakistan"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b4f6c 0%, #0f766e 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: "-0.03em" }}>Handcare</div>
        <div style={{ fontSize: 44, marginTop: 24, opacity: 0.95 }}>
          Leather Gloves Manufacturer &amp; Exporter
        </div>
        <div style={{ fontSize: 30, marginTop: 40, opacity: 0.8 }}>
          ISO 9001:2015 · OEM &amp; Wholesale · Sialkot, Pakistan · 50+ countries
        </div>
      </div>
    ),
    size
  )
}
