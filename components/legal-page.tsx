import Link from "next/link"

export type LegalSection = {
  heading: string
  /** Paragraphs and/or bullet lists, rendered in order. */
  body: (string | { list: string[] })[]
}

type LegalPageProps = {
  eyebrow: string
  title: string
  intro: string
  updated: string
  sections: LegalSection[]
}

/**
 * Shared shell for /privacy and /terms. Apple-flat: one white column on the
 * #f5f5f7 surface, display face for headings, generous measure on body copy.
 */
export default function LegalPage({ eyebrow, title, intro, updated, sections }: LegalPageProps) {
  return (
    <main className="min-h-screen surface-apple px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-3xl">
        <p
          className="mb-3 text-xs font-medium uppercase tracking-[0.18em]"
          style={{ color: "oklch(0.45 0.15 220)" }}
        >
          {eyebrow}
        </p>
        <h1
          className="font-display text-3xl font-semibold leading-[1.1] sm:text-5xl"
          style={{ color: "var(--apple-ink)" }}
        >
          {title}
        </h1>
        <p className="mt-5 text-base leading-relaxed sm:text-lg" style={{ color: "var(--apple-ink-muted)" }}>
          {intro}
        </p>
        <p className="mt-4 text-sm" style={{ color: "var(--apple-ink-faint)" }}>
          Last updated {updated}
        </p>

        <div className="card-apple mt-10 px-6 py-8 sm:px-10 sm:py-12">
          {sections.map((section, i) => (
            <section key={section.heading} className={i === 0 ? "" : "mt-10"}>
              <h2
                className="font-display text-lg font-semibold sm:text-xl"
                style={{ color: "var(--apple-ink)" }}
              >
                {section.heading}
              </h2>
              {section.body.map((block, j) =>
                typeof block === "string" ? (
                  <p
                    key={j}
                    className="mt-3 text-[0.95rem] leading-relaxed"
                    style={{ color: "var(--apple-ink-muted)" }}
                  >
                    {block}
                  </p>
                ) : (
                  <ul key={j} className="mt-3 space-y-2">
                    {block.list.map((item) => (
                      <li
                        key={item}
                        className="relative pl-5 text-[0.95rem] leading-relaxed"
                        style={{ color: "var(--apple-ink-muted)" }}
                      >
                        <span
                          className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full"
                          style={{ background: "var(--apple-ink-faint)" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              )}
            </section>
          ))}
        </div>

        <div
          className="mt-10 flex flex-col gap-3 border-t pt-8 text-sm sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--apple-hairline)", color: "var(--apple-ink-muted)" }}
        >
          <p>
            Questions? Email{" "}
            <a
              href="mailto:handcare514@gmail.com"
              className="underline underline-offset-4"
              style={{ color: "var(--apple-ink)" }}
            >
              handcare514@gmail.com
            </a>
          </p>
          <Link href="/" className="underline underline-offset-4" style={{ color: "var(--apple-ink)" }}>
            Back to homepage
          </Link>
        </div>
      </div>
    </main>
  )
}
