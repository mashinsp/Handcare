"use client"

import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { NotchPatch, notchBoxSize } from "./notch-patch"

const TOP_W = 200
const TOP_H = 56
const BOT = 88
/**
 * Keeps the pill and badge clear of the card's own 24px corner radius, which
 * would otherwise shave a diagonal off whatever sits flush in the corner.
 */
const INSET = 8

const topBox = notchBoxSize(TOP_W, TOP_H)
const botBox = notchBoxSize(BOT, BOT)

/**
 * Photo card that grows two notches on hover — a tag dropping into the
 * top-left corner and a badge sliding out of the bottom-right corner into the
 * notch there. Both start parked outside the card and are hidden purely by
 * its overflow, so every entrance and exit is a plain translation.
 *
 * Each notch is a background-coloured NotchPatch riding inside a wrapper the
 * exact size of the patch, so translating the wrapper by 100% parks it just
 * outside the card where the card's own overflow clips it. That gives the
 * carve-out and its content a single shared slide, rather than animating the
 * clip-path (which cannot be interpolated smoothly). Nothing fades: the card's
 * overflow does the hiding, so the notch reads as carved rather than dissolved.
 *
 * NO DROP SHADOW, deliberately. A box-shadow traces the card's full un-notched
 * rectangle, so it cuts straight across the carve-out, redraws the corner arc
 * the notch is meant to remove, and darkens the background the patch is trying
 * to match. The notch only reads as a hole on a flat card.
 */
export default function NotchedPhoto({
  src,
  alt,
  tag,
  icon: Icon,
  /** Must match the surrounding section's background, or the notch shows. */
  patchClassName = "bg-[oklch(0.98_0.008_85)]",
  className,
  delay = 0,
}: {
  src: string
  alt: string
  tag: string
  icon: LucideIcon
  patchClassName?: string
  className?: string
  delay?: number
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.2 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl",
        // The card's own 24px corner antialiases the photo and the patch as
        // separate layers, so a sliver of image survives along the arc as a
        // faint curved line. Square off the notched side once the patches have
        // covered it — the patch supplies its own r=10 fillets from there.
        // Delay lives on the hover rule, not the base one. A transition reads
        // its timing from the state it is moving *to*, so entering waits 120ms
        // for the patches to cover the corner before squaring it, while
        // leaving reads delay-0 and rounds back immediately.
        "transition-[border-radius] duration-[220ms] delay-0 hover:delay-[120ms]",
        "hover:rounded-tl-none hover:rounded-br-none",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
      />

      {/* Top-left: tag drops in with its notch */}
      <div
        style={topBox}
        className="pointer-events-none absolute left-0 top-0 z-20 -translate-y-full
                   transition-transform duration-[340ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                   group-hover:translate-y-0"
      >
        <NotchPatch width={TOP_W} height={TOP_H} corner="top-left" className={patchClassName} />
        <span
          style={{
            left: INSET,
            top: INSET,
            width: TOP_W - INSET * 2,
            height: TOP_H - INSET * 2,
            color: "oklch(0.30 0.01 240)",
          }}
          className="absolute z-20 flex items-center justify-center rounded-full bg-white px-3
                     text-[0.6875rem] font-medium uppercase tracking-[0.12em] whitespace-nowrap"
        >
          {tag}
        </span>
      </div>

      {/* Bottom-right: the notch itself rises straight up. NotchPatch only
          draws left-hand corners, so the wrapper is pinned to the right edge
          and flipped — mirroring a flat colour block is exact, and keeps the
          component's r=10 / r=20 corner geometry untouched. */}
      <div
        style={botBox}
        className="pointer-events-none absolute bottom-0 right-0 z-20 -scale-x-100 translate-y-full
                   transition-transform duration-[340ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                   group-hover:translate-y-0"
      >
        <NotchPatch width={BOT} height={BOT} corner="bottom-left" className={patchClassName} />
      </div>

      {/* ...and the badge slides in separately, out of the card's bottom-right
          corner. It parks at (+92, +92) — clear of both the right and bottom
          edges, so the card's own overflow hides it at rest — and travels back
          along that same 45° corner diagonal, up and to the left. Pure
          translation, no scale and no fade: it slides into view rather than
          materialising over the photo, and the one transition carries it out
          along the identical path on mouse-out. Literal in the class because
          Tailwind cannot read runtime values. */}
      <span
        style={{
          right: INSET,
          bottom: INSET,
          width: BOT - INSET * 2,
          height: BOT - INSET * 2,
          background: "linear-gradient(135deg, oklch(0.45 0.15 220) 0%, oklch(0.55 0.15 160) 100%)",
        }}
        className="pointer-events-none absolute z-30 flex translate-x-[92px] translate-y-[92px]
                   items-center justify-center rounded-full text-white
                   transition-transform duration-[340ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                   group-hover:translate-x-0 group-hover:translate-y-0"
      >
        <Icon className="h-7 w-7" strokeWidth={1.6} aria-hidden />
      </span>
    </motion.figure>
  )
}
