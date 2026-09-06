"use client"

import Link from "next/link"
import ScrollExpand from "./ScrollExpand"

/**
 * First section on the homepage: the merged factory footage opens from a
 * centred card into a full-bleed frame as the page scrolls. Closed state
 * shows the wordmark; open state hands over to the real hero copy.
 */
export default function HeroScrollExpand() {
  return (
    <ScrollExpand
      useWindowScroll
      mediaType="video"
      src="/handcare-factory.mp4"
      poster="/handcare-factory-poster.jpg"
      alt="Inside the Handcare glove factory in Sialkot, Pakistan"
      title="Handcare"
      scrollHint={
        <>
          <span>Scroll</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </>
      }
      startWidth={44}
      startHeight={62}
      mobileStartWidth={80}
      mobileStartHeight={48}
      endWidth={92}
      endHeight={84}
      mobileEndWidth={92}
      mobileEndHeight={78}
      startRadius={28}
      endRadius={28}
      mediaZoom={1.3}
      scrollDistance={1.25}
      holdDistance={0.45}
      overlayScrim={1}
      className="relative z-20"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 sm:gap-7">

        <h1 className="font-display text-[clamp(1.9rem,5.4vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-white text-balance">
          Premium Hand Protection
          <span className="block font-normal text-white/85">Solutions from Sialkot, Pakistan</span>
        </h1>

        <p className="max-w-xl text-pretty text-sm leading-relaxed text-white/85 sm:text-base">
          Two decades of glove making cut, stitched and finished under one roof, and
          shipped to professionals in more than 50 countries.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/products"
            className="inline-block rounded-full bg-white px-7 py-3 text-sm font-medium text-neutral-900 transition-transform duration-300 hover:scale-[1.03] hover:bg-white/90"
          >
            Explore Our Products
          </Link>
          <a
            href="/handcare_catalogue.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block overflow-hidden rounded-full border border-white/40 px-7 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:border-transparent"
          >
            {/* Same gradient as the navbar's Request Quote button. */}
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(135deg, oklch(0.45 0.15 220) 0%, oklch(0.55 0.15 160) 100%)',
              }}
            />
            <span className="relative z-10">View Catalogue</span>
          </a>
        </div>
      </div>
    </ScrollExpand>
  )
}
