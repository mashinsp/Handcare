/**
 * Horizontal geometry shared by the navbar and the offer strip beneath it, so
 * the two always take the same width and morph together.
 *
 * At the top of the page both are flush, full-width and square. Once the page
 * scrolls they inset to the pill's width: 0.75rem (1.25rem from `sm`) from the
 * viewport edge, or centred at 80rem on wide screens. From `lg` the pill is
 * capped at 60rem (960px), about half a 1920px screen, to match sorasystems.tech. The inset is a padding
 * calc rather than a max-width so it can transition smoothly (`max-width: none`
 * is not animatable and used to snap on screens wider than 80rem).
 */
export const NAV_INSET_FLAT = "px-0"
export const NAV_INSET_PILL =
  "px-[max(0.75rem,calc((100%_-_80rem)/2))] sm:px-[max(1.25rem,calc((100%_-_80rem)/2))] lg:px-[max(1.25rem,calc((100%_-_60rem)/2))]"
