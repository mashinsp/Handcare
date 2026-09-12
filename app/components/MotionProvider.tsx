"use client"

import type { ReactNode } from "react"
import { MotionConfig } from "framer-motion"

/**
 * Honours the operating system's Reduce Motion setting for every Framer Motion
 * animation in the tree.
 *
 * Framer Motion does not consult `prefers-reduced-motion` on its own — each
 * component has to ask. The homepage alone runs sixteen scroll-triggered
 * entrance animations, so opting in per component was never going to hold.
 * `reducedMotion="user"` disables transform and layout animation when the
 * setting is on while leaving opacity alone, so content still fades in and
 * nothing becomes invisible: motion is reduced, not feedback.
 *
 * This lives in its own client component because the root layout is a server
 * component and MotionConfig relies on context.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
