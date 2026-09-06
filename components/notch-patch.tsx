import { cn } from "@/lib/utils";

/**
 * Paints the section background over a card's corner to produce the notch used
 * across the design (case studies, industries, testimonials, final CTA),
 * leaving a gap for a badge, caption or button row.
 *
 * Drawn as a background-coloured patch rather than clipping the card, so the
 * notch keeps its exact pixel size and corner radii while the card itself is
 * free to scale with the container.
 *
 * Corners: the card's own edges get r=10 fillets and the re-entrant corner
 * r=20, matching the Figma boolean-subtract shape.
 *
 * The patch bleeds 1px past the card on its two outer edges. Without it,
 * antialiasing along the clip boundary lets a hairline of the image show at
 * the card's edge, which reads as a stray dark line under the notch.
 */
const R = 10; // fillet on the card's own edges
const RI = 20; // re-entrant (concave) corner
const B = 1; // outward bleed

/** Outer box the patch occupies, so callers can size a wrapper around it. */
export const notchBoxSize = (width: number, height: number) => ({
  width: width + R + B,
  height: height + R + B,
});

export function NotchPatch({
  width,
  height,
  corner = "top-left",
  className,
}: {
  width: number;
  height: number;
  /** Testimonial cards notch the bottom-left instead of the top-left. */
  corner?: "top-left" | "bottom-left";
  className?: string;
}) {
  const w = width + R;
  const h = height + R;
  const boxW = w + B;
  const boxH = h + B;

  const d =
    corner === "top-left"
      ? [
          `M ${w + B},${B}`,
          `A ${R},${R} 0 0 0 ${width + B},${R + B}`,
          `L ${width + B},${height - RI + B}`,
          `A ${RI},${RI} 0 0 1 ${width - RI + B},${height + B}`,
          `L ${R + B},${height + B}`,
          `A ${R},${R} 0 0 0 ${B},${h + B}`,
          `L 0,${h + B}`,
          `L 0,0`,
          `L ${w + B},0`,
          "Z",
        ].join(" ")
      : [
          `M ${w + B},${h}`,
          `A ${R},${R} 0 0 1 ${width + B},${h - R}`,
          `L ${width + B},${R + RI}`,
          `A ${RI},${RI} 0 0 0 ${width - RI + B},${R}`,
          `L ${R + B},${R}`,
          `A ${R},${R} 0 0 1 ${B},0`,
          `L 0,0`,
          `L 0,${h + B}`,
          `L ${w + B},${h + B}`,
          "Z",
        ].join(" ");

  return (
    <div
      aria-hidden
      style={{
        width: boxW,
        height: boxH,
        clipPath: `path('${d}')`,
        left: -B,
        [corner === "top-left" ? "top" : "bottom"]: -B,
      }}
      className={cn("pointer-events-none absolute z-10 bg-background", className)}
    />
  );
}
