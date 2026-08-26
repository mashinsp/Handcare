import { NextRequest, NextResponse } from "next/server"

/**
 * Request proxy for acceptmarkdown.com compliance (Next.js 16+ convention —
 * this file was named `middleware.ts` prior to Next 16; the API is
 * otherwise unchanged, only the file name and exported function name are
 * different: `proxy.ts` / `export function proxy`).
 *
 * When a client sends `Accept: text/markdown` with a q-value at least as
 * high as text/html's, we rewrite the request internally to a parallel
 * markdown-serving route tree under /md/*. (Not /_md — Next.js treats any
 * app/ folder prefixed with `_` as a private folder excluded from
 * routing entirely, so that route would silently never register.) That
 * route tree returns
 * `text/markdown` (200) for known pages, or a short markdown 404 body
 * with recovery links for unknown ones — this is what completes finding
 * #1 (agent-friendly 404s) beyond the status-code fix that was already
 * in place.
 *
 * Every response this middleware touches gets `Accept` appended to its
 * Vary header (not replacing whatever else may already be set there),
 * so a CDN can't serve a cached HTML response to an agent that asked for
 * markdown, or vice versa.
 */

const EXCLUDED_PREFIXES = [
  "/_next",
  "/md",
  "/api",
  "/llms.txt",
  "/sitemap.xml",
  "/robots.txt",
  "/handcare_catalogue.pdf",
  "/handcare_catalogue_del.pdf",
  "/BingSiteAuth.xml",
]

const STATIC_ASSET_RE =
  /\.(png|jpe?g|svg|gif|webp|ico|css|js|map|woff2?|ttf|pdf|txt|xml|json)$/i

interface AcceptEntry {
  type: string
  q: number
}

function parseAccept(acceptHeader: string): AcceptEntry[] {
  return acceptHeader
    .split(",")
    .map((part) => {
      const [rawType, ...params] = part.trim().split(";")
      const qParam = params.map((p) => p.trim()).find((p) => p.startsWith("q="))
      const q = qParam ? parseFloat(qParam.slice(2)) : 1
      return { type: rawType.trim().toLowerCase(), q: isNaN(q) ? 1 : q }
    })
    .filter((entry) => entry.type.length > 0)
}

/**
 * True when the client's Accept header prefers text/markdown over
 * text/html (or accepts markdown and doesn't mention html at all).
 * Exported for unit testing independent of the request/response cycle.
 */
export function prefersMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false

  const entries = parseAccept(acceptHeader)
  const markdown = entries.find((e) => e.type === "text/markdown" || e.type === "text/*")
  if (!markdown || markdown.q <= 0) return false

  const html = entries.find((e) => e.type === "text/html" || e.type === "*/*")
  if (!html) return true

  return markdown.q >= html.q
}

function isExcluded(pathname: string): boolean {
  return (
    EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    STATIC_ASSET_RE.test(pathname)
  )
}

function addVary(response: NextResponse): NextResponse {
  const existing = response.headers.get("vary")
  const values = new Set(
    (existing ? existing.split(",") : []).map((v) => v.trim()).filter(Boolean)
  )
  values.add("Accept")
  values.add("Accept-Encoding")
  response.headers.set("vary", Array.from(values).join(", "))
  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isExcluded(pathname)) {
    return NextResponse.next()
  }

  const accept = request.headers.get("accept")
  const response = prefersMarkdown(accept)
    ? NextResponse.rewrite(new URL(`/md${pathname}`, request.url))
    : NextResponse.next()

  return addVary(response)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
}
