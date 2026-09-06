"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion"

type Leather = {
  type: string
  icon: string
  description: string
  /** Which side of the centre line the icon sits on. */
  side: "left" | "right"
}

const LEATHERS: Leather[] = [
  {
    type: "Cow Hide",
    icon: "cow-face.png",
    description:
      "Most preferred type of leather. Readily available, thick, durable and easy to maintain. Cost-effective, and relatively soft.",
    side: "left",
  },
  {
    type: "Goat skin",
    icon: "goat.png",
    description:
      "Smooth and soft fine grain, easily available, strong yet flexible and water resistant. Light weight and resilient leather.",
    side: "right",
  },
  {
    type: "Sheep skin",
    icon: "sheep.png",
    description:
      "Thin and plush leather, extremely comfortable, soft and light-weight but delicate to use. Mostly used in garments and purses. Sheepskin shearlings can be used with wool inside and leather outside.",
    side: "left",
  },
  {
    type: "Deer skin",
    icon: "deer.png",
    description:
      "Highly resilient, abrasion resistant and naturally water friendly. It is stretchable and breathable. Very strong leather yet soft and supple.",
    side: "right",
  },
]

const RED = "oklch(0.55 0.20 15)"
const RED_HALO = "oklch(0.55 0.20 15 / 0.22)"

/** Children inherit these names from the row, so one state drives all of them. */
const rowVariants: Variants = {
  idle: {},
  active: { transition: { staggerChildren: 0.07 } },
}

const nodeVariants: Variants = {
  idle: { scale: 0.55, opacity: 0 },
  active: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
}

const haloVariants: Variants = {
  idle: { scale: 0.6, opacity: 0 },
  active: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
}

const asideVariants = (fromLeft: boolean): Variants => ({
  idle: { opacity: 0, x: fromLeft ? -28 : 28 },
  active: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
})

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

export default function LeatherTimeline() {
  const trackRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const reduceMotion = useReducedMotion()

  // Node centres and track height, in px relative to the track. The rows are
  // different heights (the descriptions vary), so even fractions of the track
  // would drift out of step with the nodes.
  const [trackH, setTrackH] = useState(0)
  const [centres, setCentres] = useState<number[]>([])

  useIsomorphicLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      setTrackH(track.offsetHeight)
      setCentres(rowRefs.current.map((el) => (el ? el.offsetTop + el.offsetHeight / 2 : 0)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 88%", "end 58%"],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const fill = useTransform(smooth, [0, 1], ["0%", "100%"])

  // How many rows the rail has swept past. Monotonic: the rail recedes when
  // you scroll back up, but revealed copy stays put rather than blinking out.
  const [reached, setReached] = useState(0)

  const syncReached = (p: number) => {
    if (!trackH || centres.length === 0) return
    const fillPx = p * trackH
    let count = 0
    for (let i = 0; i < centres.length; i++) {
      if (fillPx >= centres[i] - 12) count = i + 1
    }
    setReached((prev) => (count > prev ? count : prev))
  }

  useMotionValueEvent(smooth, "change", syncReached)
  // Covers a load that lands mid-section, where no change event ever fires.
  useEffect(() => {
    syncReached(scrollYProgress.get())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackH, centres])

  return (
    <div ref={trackRef} className="relative">
      {/* Centre rail. z-0 so it can never win against a row: a row animating
          its opacity/transform becomes its own stacking context, which traps
          the node's z-index inside it — with the rail above z-0 the rail would
          paint over every node until the entry animation finished. */}
      <div
        className="absolute left-1/2 top-0 bottom-0 z-0 hidden w-1 -translate-x-1/2 overflow-hidden md:block"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, ${RED} 5%, ${RED} 95%, transparent 100%)`,
            opacity: 0.16,
          }}
        />
        <motion.div
          className="absolute inset-x-0 top-0 origin-top"
          style={{
            height: reduceMotion ? "100%" : fill,
            background: `linear-gradient(to bottom, transparent 0%, ${RED} 6%, ${RED} 100%)`,
          }}
        />
      </div>

      <div className="space-y-12 sm:space-y-16">
        {LEATHERS.map((leather, i) => {
          const iconLeft = leather.side === "left"
          const active = reduceMotion || i < reached
          return (
            <motion.div
              key={leather.type}
              ref={(el) => {
                rowRefs.current[i] = el
              }}
              variants={rowVariants}
              initial="idle"
              animate={active ? "active" : "idle"}
              className="relative z-10 flex flex-col items-center gap-6 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8"
            >
              {/* Icon */}
              <motion.div
                variants={asideVariants(iconLeft)}
                className={`flex items-center justify-center ${
                  iconLeft ? "md:order-1 md:justify-end" : "md:order-3 md:justify-start"
                }`}
              >
                <div
                  className="flex h-[100px] w-[100px] items-center justify-center"
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
                >
                  <img
                    src={`/${leather.icon}`}
                    alt={leather.type}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </motion.div>

              {/* Node on the rail */}
              <motion.div
                variants={nodeVariants}
                className="relative flex h-[90px] w-[90px] min-w-[90px] shrink-0 items-center justify-center rounded-full md:order-2"
                style={{
                  background: RED,
                  border: "2px solid oklch(0.50 0.18 15)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                {/* Halo, so the node reads as the point the rail has reached. */}
                <motion.span
                  aria-hidden
                  variants={haloVariants}
                  className="absolute -inset-3 -z-10 rounded-full"
                  style={{ background: `radial-gradient(circle, ${RED_HALO} 40%, transparent 72%)` }}
                />
                <span
                  className="px-2 text-center text-xs font-bold uppercase tracking-wide text-white sm:text-sm"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
                >
                  {leather.type}
                </span>
              </motion.div>

              {/* Description */}
              <motion.div
                variants={asideVariants(!iconLeft)}
                className={`w-full max-w-[400px] flex-1 text-center ${
                  iconLeft ? "md:order-3 md:text-left" : "md:order-1 md:text-right"
                }`}
              >
                <p className="text-sm leading-relaxed sm:text-base" style={{ color: "oklch(0.40 0.01 240)" }}>
                  {leather.description}
                </p>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
