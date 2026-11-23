import Link from "next/link"
import { NAV_INSET_FLAT, NAV_INSET_PILL } from "./navGeometry"

const OFFER_TEXT = "Limited time offer: HandCare is giving you up to 10% off on leather gloves"
/** Enough copies that one half of the track always overfills the widest viewport. */
const COPIES_PER_HALF = 3

interface OfferStripProps {
  /**
   * Mirrors the navbar: false at the top of the page (flat, full-width, flush
   * under the bar), true once scrolled (inset to the pill's width and rounded).
   */
  condensed: boolean
  /**
   * True once the page is scrolled past the threshold. The strip then slides up
   * behind the nav pill and shrinks slightly, without fading, and goes inert.
   */
  tucked: boolean
}

function OfferItems({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {Array.from({ length: COPIES_PER_HALF }, (_, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span>{OFFER_TEXT}</span>
          <span aria-hidden="true" className="px-[1.3rem] text-[1.15em] leading-none">
            ✱
          </span>
        </span>
      ))}
    </div>
  )
}

/**
 * Sits directly under the nav pill, behind it in the stacking order (the pill
 * is z-10). Tucking it translates it up until it is fully covered by the
 * (opaque) pill; the offset is the pill's half height + the gap + half the
 * strip's own height, so the strip ends centred behind the pill.
 */
export default function OfferStrip({ condensed, tucked }: OfferStripProps) {
  return (
    <div
      role={tucked ? undefined : "region"}
      aria-label={tucked ? undefined : "Current offer"}
      aria-hidden={tucked || undefined}
      className={`offer-strip-wrap relative z-0 w-full ${
        condensed ? `${NAV_INSET_PILL} pt-2` : `${NAV_INSET_FLAT} pt-0`
      } ${
        tucked
          ? "pointer-events-none -translate-y-[calc(var(--nav-h)/2+0.5rem+0.875rem)] scale-[0.975]"
          : "translate-y-0 scale-100"
      }`}
      {...(tucked ? { inert: true } : {})}
    >
      <Link
        href="/quote"
        className={`offer-marquee offer-strip-link flex h-7 items-center overflow-hidden bg-black font-mono text-[0.72rem] font-medium uppercase leading-none text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white ${
          condensed ? "rounded-lg" : "rounded-none"
        }`}
      >
        <div className="offer-track flex w-max">
          <OfferItems />
          <OfferItems hidden />
        </div>
      </Link>
    </div>
  )
}
