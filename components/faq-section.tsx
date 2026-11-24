"use client"

import { useState } from "react"
import Link from "next/link"
import { HOME_FAQS } from "@/lib/faqs"

/** Warm cream that replaces the near-white section background. */
const SECTION_BG = "#faf6ef"

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 6l4.5 4.5L12.5 6" />
    </svg>
  )
}

function QuoteLink() {
  return (
    <Link href="/quote" className="nav-cta">
      Ask us for a quote
      <span aria-hidden="true" className="nav-cta-arrow">
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
    </Link>
  )
}

/**
 * Accordion: one answer open at a time, the first by default.
 *
 * It is server-rendered like any client component, so every answer is in the
 * initial HTML for crawlers and AI agents. Collapsed panels are hidden with
 * `visibility`, so screen readers skip them, while the height animates through
 * the grid-template-rows 0fr -> 1fr trick (see `.faq-panel` in globals.css),
 * which is smooth in every browser and needs no measured heights.
 *
 * Phones get a centred title over a stack of rounded, numbered cards with a
 * chevron on the right; the open card takes a stronger border. From `lg` the
 * same cards sit in the right column beside a sticky intro.
 */
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative z-10 scroll-mt-24 px-4 py-12 sm:px-6 sm:py-20"
      style={{ background: SECTION_BG }}
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="text-center lg:sticky lg:top-28 lg:self-start lg:text-left">
          <p
            className="mb-3 hidden text-sm font-medium uppercase tracking-widest lg:block"
            style={{ color: "oklch(0.45 0.15 220)" }}
          >
            FAQ
          </p>
          <h2 id="faq-heading" className="text-3xl font-bold text-heading sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 hidden max-w-md text-base lg:block" style={{ color: "oklch(0.40 0.01 240)" }}>
            What buyers ask us most about ordering leather gloves from Sialkot. Can&apos;t find your answer?
          </p>
          {/* .nav-cta sets its own display, so visibility is handled by the wrapper. */}
          <div className="mt-6 hidden lg:block">
            <QuoteLink />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {HOME_FAQS.map((faq, i) => {
            const open = openIndex === i
            return (
              <div
                key={faq.question}
                data-open={open || undefined}
                className="faq-item rounded-3xl border bg-white transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] border-[oklch(0.90_0.008_100)] data-[open]:border-[oklch(0.25_0.01_240)] data-[open]:shadow-[0_8px_30px_-16px_rgba(0,40,60,0.25)]"
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={open}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full cursor-pointer items-start justify-between gap-4 rounded-3xl px-5 py-5 text-left text-base font-semibold text-heading sm:px-6 sm:text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.45_0.15_220)]"
                  >
                    <span>
                      <span aria-hidden="true" className="mr-1.5">
                        {i + 1}.
                      </span>
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-1 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "rotate-180" : ""}`}
                    >
                      <Chevron />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  data-open={open || undefined}
                  className="faq-panel"
                >
                  <div className="faq-panel-inner">
                    <p className="px-5 pb-6 text-base leading-relaxed sm:px-6" style={{ color: "oklch(0.45 0.01 240)" }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}

          <div className="mt-3 flex justify-center lg:hidden">
            <QuoteLink />
          </div>
        </div>
      </div>
    </section>
  )
}
