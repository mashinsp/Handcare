"use client"

import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react"

import "./ScrollExpand.css"

/**
 * The geometry pass reads layout and writes styles, so it has to run before
 * paint or the frame flashes at its CSS default for a frame. `useLayoutEffect`
 * is a no-op warning on the server, hence the guard.
 */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v)

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1)
  return t * t * (3 - 2 * t)
}

/** Matches the `640px` Tailwind `sm` breakpoint the overrides in the CSS use. */
const NARROW_QUERY = "(max-width: 639.98px)"

export type ScrollExpandProps = {
  src?: string
  mediaType?: "image" | "video"
  poster?: string
  alt?: string
  title?: React.ReactNode
  scrollHint?: React.ReactNode
  /**
   * Bounding box of the closed frame, in % of the stage. The frame itself is
   * the largest box with the media's own aspect ratio that fits inside it, so
   * the closed state shows the whole frame of a landscape video uncropped.
   */
  startWidth?: number
  startHeight?: number
  /** Closed bounds below 640px, where a 44%-wide frame reads as a postage stamp. */
  mobileStartWidth?: number
  mobileStartHeight?: number
  /** Frame size at full expansion. Below 100 the video keeps a margin. */
  endWidth?: number
  endHeight?: number
  mobileEndWidth?: number
  mobileEndHeight?: number
  startRadius?: number
  endRadius?: number
  /**
   * Intrinsic aspect ratio (w / h) of the media, used before it reports its
   * own. Corrected automatically once metadata arrives.
   */
  mediaAspect?: number
  /** Extra zoom on top of "cover" once the frame is fully open. */
  endZoom?: number
  scrollDistance?: number
  holdDistance?: number
  smoothing?: number
  overlayScrim?: number
  useWindowScroll?: boolean
  enabled?: boolean
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "children" | "style" | "className">

const ScrollExpand = ({
  src = "",
  mediaType = "image",
  poster = "",
  alt = "",
  title = "",
  scrollHint = "",
  startWidth = 44,
  startHeight = 62,
  mobileStartWidth,
  mobileStartHeight,
  endWidth = 100,
  endHeight = 100,
  mobileEndWidth,
  mobileEndHeight,
  startRadius = 24,
  endRadius = 0,
  mediaAspect = 16 / 9,
  endZoom = 1,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  children,
  className = "",
  style,
  ...rest
}: ScrollExpandProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLVideoElement & HTMLImageElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)

  const propsRef = useRef({
    startWidth,
    startHeight,
    mobileStartWidth,
    mobileStartHeight,
    endWidth,
    endHeight,
    mobileEndWidth,
    mobileEndHeight,
    startRadius,
    endRadius,
    endZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    enabled,
  })
  propsRef.current = {
    startWidth,
    startHeight,
    mobileStartWidth,
    mobileStartHeight,
    endWidth,
    endHeight,
    mobileEndWidth,
    mobileEndHeight,
    startRadius,
    endRadius,
    endZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    enabled,
  }

  /** Aspect ratio actually in play — the prop until the media reports its own. */
  const mediaArRef = useRef(mediaAspect)

  /**
   * Frame geometry for the two ends of the animation, recomputed on resize.
   * Sizes are % of the stage; `startScale` is the media scale at which the
   * whole frame lands exactly inside the closed box.
   */
  const geomRef = useRef({ startW: 0, startH: 0, endW: 0, endH: 0, startScale: 1 })

  const applyProgress = useCallback((p: number) => {
    const frame = frameRef.current
    const media = mediaRef.current
    if (!frame || !media) return
    const c = propsRef.current
    const g = geomRef.current

    const e = smoothstep(0, 1, p)

    const w = g.startW + (g.endW - g.startW) * e
    const h = g.startH + (g.endH - g.startH) * e
    const ix = Math.max(0, (100 - w) / 2)
    const iy = Math.max(0, (100 - h) / 2)
    const r = c.startRadius + (c.endRadius - c.startRadius) * e
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`

    // Both the frame and the scale are linear in `e` and meet exactly at e = 0,
    // so the media covers the frame for every value in between: the video fits
    // the closed card whole, then zooms in just enough to keep filling it.
    const s = g.startScale + (c.endZoom - g.startScale) * e
    media.style.transform = `translate(-50%, -50%) scale(${s})`

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`

    if (titleRef.current) {
      const out = smoothstep(0.28, 0.58, p)
      titleRef.current.style.opacity = `${1 - out}`
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p)
      hintRef.current.style.opacity = `${1 - gone}`
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.6, 0.88, p)
      overlayRef.current.style.opacity = `${inn}`
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`
      // Buttons in the overlay must not be clickable while it is invisible.
      overlayRef.current.style.pointerEvents = inn > 0.5 ? "auto" : "none"
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    const stage = stageRef.current
    const media = mediaRef.current
    if (!root || !track || !stage || !media) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const narrowQuery = window.matchMedia(NARROW_QUERY)

    let raf = 0
    let current = 0
    let target = 0
    let stageW = 0
    let stageH = 0
    let running = false

    const measure = () => {
      const c = propsRef.current
      const g = geomRef.current
      const narrow = narrowQuery.matches

      // In window-scroll mode the stage is sized by CSS (`100svh`) so that a
      // mobile browser collapsing its toolbar does not resize the track and
      // jump the scroll position mid-animation.
      if (!useWindowScroll) stage.style.height = `${root.clientHeight}px`
      stageW = stage.clientWidth
      stageH = stage.clientHeight
      if (stageW <= 0 || stageH <= 0) return

      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`
      stage.style.setProperty("--se-title-size", `${clamp(stageW * (narrow ? 0.1 : 0.075), 20, 84)}px`)

      // The media element is sized to the "cover" box of the stage and centred,
      // so scale 1 fills the stage edge to edge with nothing letterboxed.
      const ar = mediaArRef.current
      const coverW = ar >= stageW / stageH ? stageH * ar : stageW
      const coverH = coverW / ar
      media.style.width = `${coverW}px`
      media.style.height = `${coverH}px`

      // Closed frame: the largest box of the media's aspect that fits the bounds.
      const boundW = (stageW * (narrow ? (c.mobileStartWidth ?? c.startWidth) : c.startWidth)) / 100
      const boundH = (stageH * (narrow ? (c.mobileStartHeight ?? c.startHeight) : c.startHeight)) / 100
      const frameW = Math.min(boundW, boundH * ar)
      const frameH = frameW / ar

      g.startW = (frameW / stageW) * 100
      g.startH = (frameH / stageH) * 100
      g.endW = narrow ? (c.mobileEndWidth ?? c.endWidth) : c.endWidth
      g.endH = narrow ? (c.mobileEndHeight ?? c.endHeight) : c.endHeight
      g.startScale = frameW / coverW
    }

    const readProgress = () => {
      const c = propsRef.current
      if (!c.enabled) return 1
      const span = stageH * Math.max(0.01, c.scrollDistance)
      if (useWindowScroll) {
        const top = track.getBoundingClientRect().top
        return clamp(-top / span, 0, 1)
      }
      return clamp(root.scrollTop / span, 0, 1)
    }

    const tick = () => {
      const c = propsRef.current
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing))
      current += (target - current) * k
      if (Math.abs(target - current) < 0.0004) {
        current = target
        running = false
      }
      applyProgress(current)
      raf = running ? requestAnimationFrame(tick) : 0
    }

    const kick = () => {
      if (running) return
      running = true
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      target = readProgress()
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target
        applyProgress(current)
        return
      }
      kick()
    }

    /** Full re-measure; snaps to the new geometry without animating to it. */
    const refresh = () => {
      measure()
      target = readProgress()
      current = target
      applyProgress(current)
    }

    let lastW = 0
    let lastH = 0
    const onResize = () => {
      // iOS fires `resize` whenever the URL bar slides; with a `svh` stage
      // nothing has actually changed, so skip the work and the reflow.
      if (stage.clientWidth === lastW && stage.clientHeight === lastH) return
      lastW = stage.clientWidth
      lastH = stage.clientHeight
      refresh()
    }

    /** Swap in the media's real aspect ratio as soon as it is known. */
    const onMediaReady = () => {
      const w = media.videoWidth || media.naturalWidth || 0
      const h = media.videoHeight || media.naturalHeight || 0
      if (w <= 0 || h <= 0) return
      const ar = w / h
      if (Math.abs(ar - mediaArRef.current) < 0.001) return
      mediaArRef.current = ar
      refresh()
    }

    refresh()
    lastW = stage.clientWidth
    lastH = stage.clientHeight
    onMediaReady()

    const scroller: Window | HTMLDivElement = useWindowScroll ? window : root
    scroller.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    window.addEventListener("orientationchange", refresh)
    media.addEventListener("loadedmetadata", onMediaReady)
    media.addEventListener("load", onMediaReady)
    const ro = new ResizeObserver(onResize)
    ro.observe(root)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      scroller.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("orientationchange", refresh)
      media.removeEventListener("loadedmetadata", onMediaReady)
      media.removeEventListener("load", onMediaReady)
      ro.disconnect()
    }
  }, [applyProgress, useWindowScroll])

  const media =
    mediaType === "video" ? (
      <video
        ref={mediaRef}
        className="scroll-expand__media"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt || undefined}
      />
    ) : (
      <img ref={mediaRef} className="scroll-expand__media" src={src} alt={alt} draggable={false} />
    )

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? "scroll-expand--window" : "scroll-expand--scroller"} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            {media}
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {children ? (
              <div ref={overlayRef} className="scroll-expand__overlay">
                {children}
              </div>
            ) : null}
          </div>
          {title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ScrollExpand
