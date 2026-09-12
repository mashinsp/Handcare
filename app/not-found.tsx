import Link from "next/link"

export const metadata = {
  title: "Page Not Found | Handcare",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative px-4"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.99 0.002 100) 0%, oklch(0.98 0.005 95) 50%, oklch(0.99 0.002 100) 100%)",
      }}
    >
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, oklch(0.50 0.15 220 / 0.12) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="text-center relative z-10 max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient-primary">
          Page Not Found
        </h1>
        <p className="mb-8" style={{ color: "oklch(0.40 0.01 240)" }}>
          We couldn&apos;t find the page you were looking for. It may have
          moved, or the link may be out of date.
        </p>

        <div
          className="rounded-2xl p-6 text-left"
          style={{
            background: "linear-gradient(to bottom, oklch(1 0 0), oklch(0.99 0.002 100))",
            border: "1px solid oklch(0.90 0.008 100)",
            boxShadow: "0 1px 3px 0 oklch(0.45 0.15 220 / 0.05)",
          }}
        >
          <h2
            className="text-sm font-semibold mb-3 uppercase tracking-wide"
            style={{ color: "oklch(0.40 0.01 240)" }}
          >
            Where to look next
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="transition-colors hover:text-[oklch(0.50_0.15_220)]" style={{ color: "oklch(0.45 0.15 220)" }}>
                Homepage
              </Link>
            </li>
            <li>
              <Link href="/products" className="transition-colors hover:text-[oklch(0.50_0.15_220)]" style={{ color: "oklch(0.45 0.15 220)" }}>
                All products
              </Link>
            </li>
            <li>
              <Link href="/quote" className="transition-colors hover:text-[oklch(0.50_0.15_220)]" style={{ color: "oklch(0.45 0.15 220)" }}>
                Request a quote
              </Link>
            </li>
            <li>
              <a href="/sitemap.xml" className="transition-colors hover:text-[oklch(0.50_0.15_220)]" style={{ color: "oklch(0.45 0.15 220)" }}>
                Sitemap
              </a>
            </li>
            <li>
              <a href="/llms.txt" className="transition-colors hover:text-[oklch(0.50_0.15_220)]" style={{ color: "oklch(0.45 0.15 220)" }}>
                llms.txt (for AI agents)
              </a>
            </li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 text-white rounded-full font-medium transition-all duration-200 btn-gradient"
          style={{ background: "linear-gradient(135deg, oklch(0.51 0.18 65), oklch(0.56 0.15 40))" }}
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  )
}
