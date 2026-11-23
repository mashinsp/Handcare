/**
 * Timing shared by the homepage scroll-expand hero and the navbar's offer strip.
 *
 * The hero's progress is scrollY / (viewport height * HERO_SCROLL_DISTANCE),
 * running 0 -> 1. The strip stays visible until the hero has reached
 * STRIP_TUCK_PROGRESS: at that point the card is almost fully open and the hero
 * copy has only just begun to fade in.
 */
export const HERO_SCROLL_DISTANCE = 1.25
export const STRIP_TUCK_PROGRESS = 0.65

/** Scroll offset (px) at which the strip tucks away on the homepage. */
export function heroStripTuckOffset(viewportHeight: number): number {
  return viewportHeight * HERO_SCROLL_DISTANCE * STRIP_TUCK_PROGRESS
}
