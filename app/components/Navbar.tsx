"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import OfferStrip from "./OfferStrip"
import { heroStripTuckOffset } from "@/lib/hero-scroll"
import { NAV_INSET_FLAT, NAV_INSET_PILL } from "./navGeometry"

interface NavItem {
  label: string
  href: string
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/#resources" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
]

/** Scroll distance after which the bar condenses into a floating pill. */
const CONDENSE_AFTER_PX = 24
/** Scroll distance after which the offer strip tucks away on pages without the hero (measured from osmo.supply). */
const TUCK_STRIP_AFTER_PX = 56

function Arrow() {
  return (
    <span aria-hidden="true" className="nav-cta-arrow">
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </span>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [menuOpen, setMenuOpen] = useState(false)
  const [condensed, setCondensed] = useState(false)
  const [stripTucked, setStripTucked] = useState(false)
  const ticking = useRef(false)

  useEffect(() => {
    const update = () => {
      setCondensed(window.scrollY > CONDENSE_AFTER_PX)
      // On the homepage the strip stays until the scroll-expand hero is ~65% open.
      const tuckAt = isHome ? heroStripTuckOffset(window.innerHeight) : TUCK_STRIP_AFTER_PX
      setStripTucked(window.scrollY > tuckAt)
      ticking.current = false
    }
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [isHome])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  /**
   * On the homepage a plain <Link href="/"> does nothing (same URL), so the logo
   * scrolls back to the top itself, and drops a leftover #hash from the address.
   * From any other page it falls through to a normal navigation to "/".
   */
  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false)
    if (pathname !== "/") return
    event.preventDefault()
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search)
    }
  }

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative w-full transition-[padding] duration-[650ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
          condensed ? `${NAV_INSET_PILL} pt-2.5` : `${NAV_INSET_FLAT} pt-0`
        }`}
      >
        <div
          className={`relative z-10 flex h-[var(--nav-h)] items-center justify-between gap-4 px-5 transition-[border-radius,background-color,border-color,box-shadow] duration-[650ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none sm:px-7 lg:px-9 ${
            condensed
              ? "rounded-[2.75rem] border border-black/[0.06] bg-white shadow-[0_10px_40px_-14px_rgba(0,60,90,0.3)]"
              : "rounded-none border border-transparent bg-white"
          }`}
        >
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex shrink-0 items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.45_0.15_220)]"
            aria-label="Handcare home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/handcarelogo.png" alt="" className="h-10 w-auto lg:h-10" />
            <span className="font-display text-[1.6rem] font-semibold leading-none tracking-tight text-gradient-primary lg:text-[1.65rem]">
              Handcare
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                data-active={isActive(item.href) || undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="nav-link relative whitespace-nowrap rounded-sm py-2 text-base text-[oklch(0.25_0.01_240)]/90 transition-[color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[oklch(0.45_0.15_220)] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(0.45_0.15_220)]"
              >
                {item.label}
                <span aria-hidden="true" className="nav-rule" />
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center lg:flex">
            <Link href="/quote" className="nav-cta">
              Request Quote
              <Arrow />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="relative grid size-12 place-items-center rounded-full text-[oklch(0.25_0.01_240)] transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/5 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.45_0.15_220)] lg:hidden"
          >
            <span aria-hidden="true" className="burger" data-open={menuOpen || undefined}>
              <span />
              <span />
            </span>
          </button>
        </div>

        {/*
          A sibling of the pill, not a child, and driven by plain CSS transitions.
          Two things used to make it flicker: a backdrop-filter on the pill (every
          animating descendant repaints each frame) and framer-motion's opacity
          animation, which drops to 0 for one frame when it hands over to the
          final style. It stays mounted so a transition can run in both directions.
        */}
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          aria-hidden={!menuOpen}
          data-open={menuOpen || undefined}
          {...(menuOpen ? {} : { inert: true })}
          className="mobile-menu absolute z-20 inset-x-3 top-full mt-2 rounded-[2rem] border border-black/[0.06] bg-white p-3 shadow-[0_24px_60px_-24px_rgba(0,60,90,0.4)] sm:inset-x-5 lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.label} className="mobile-menu-item" style={{ "--i": i } as React.CSSProperties}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-2xl px-4 py-3.5 text-[1.1rem] text-[oklch(0.25_0.01_240)] transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[oklch(0.96_0.01_220)] hover:text-[oklch(0.45_0.15_220)] active:scale-[0.98]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-item" style={{ "--i": NAV_ITEMS.length } as React.CSSProperties}>
            <Link href="/quote" onClick={() => setMenuOpen(false)} className="nav-cta mt-2 w-full justify-between">
              Request Quote
              <Arrow />
            </Link>
          </div>
        </nav>
      </div>

      <OfferStrip condensed={condensed} tucked={stripTucked || menuOpen} />
    </header>
  )
}
