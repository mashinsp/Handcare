import { describe, expect, it } from "vitest"

// Requires a running instance: `npm run build && npm run start` then
//   TEST_BASE_URL=http://localhost:3000 npx vitest run tests/integration.test.ts
const TEST_BASE_URL = process.env.TEST_BASE_URL

const describeIfServer = TEST_BASE_URL ? describe : describe.skip

describeIfServer("Fix #1 — agent-friendly 404s", () => {
  it("returns a real HTTP 404 for a nonexistent path", async () => {
    const res = await fetch(`${TEST_BASE_URL}/this-page-does-not-exist-xyz123`)
    expect(res.status).toBe(404)
  })

  it("gives the 404 a short markdown body with recovery links when negotiated", async () => {
    const res = await fetch(`${TEST_BASE_URL}/this-page-does-not-exist-xyz123`, {
      headers: { Accept: "text/markdown" },
    })
    expect(res.status).toBe(404)
    expect(res.headers.get("content-type")).toMatch(/text\/markdown/)
    const body = await res.text()
    expect(body).toMatch(/llms\.txt/)
    expect(body).toMatch(/sitemap/i)
  })
})

describeIfServer("Fix #2 — markdown content negotiation", () => {
  it("serves text/markdown when Accept: text/markdown is sent", async () => {
    const res = await fetch(`${TEST_BASE_URL}/`, { headers: { Accept: "text/markdown" } })
    expect(res.status).toBe(200)
    expect(res.headers.get("content-type")).toMatch(/text\/markdown/)
  })

  it("still serves text/html by default (no regression)", async () => {
    const res = await fetch(`${TEST_BASE_URL}/`, { headers: { Accept: "text/html" } })
    expect(res.status).toBe(200)
    expect(res.headers.get("content-type")).toMatch(/text\/html/)
  })

  it("includes Accept in the Vary header on both variants", async () => {
    const html = await fetch(`${TEST_BASE_URL}/`, { headers: { Accept: "text/html" } })
    const md = await fetch(`${TEST_BASE_URL}/`, { headers: { Accept: "text/markdown" } })
    expect(html.headers.get("vary")?.toLowerCase()).toContain("accept")
    expect(md.headers.get("vary")?.toLowerCase()).toContain("accept")
  })

  it("negotiates markdown on a product detail page", async () => {
    const res = await fetch(`${TEST_BASE_URL}/products/working-gloves`, {
      headers: { Accept: "text/markdown" },
    })
    expect(res.status).toBe(200)
    expect(res.headers.get("content-type")).toMatch(/text\/markdown/)
    const body = await res.text()
    expect(body).toMatch(/Working Gloves/)
  })

  it("does not negotiate on API routes (excluded prefix)", async () => {
    const res = await fetch(`${TEST_BASE_URL}/api/quote`, {
      method: "GET",
      headers: { Accept: "text/markdown" },
    })
    const contentType = res.headers.get("content-type")
    expect(contentType ?? "").not.toMatch(/text\/markdown/)
  })
})

describeIfServer("Fix #4 — JSON-LD structured data", () => {
  it("includes an Organization JSON-LD block on the homepage", async () => {
    const res = await fetch(`${TEST_BASE_URL}/`, { headers: { Accept: "text/html" } })
    const html = await res.text()
    const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    expect(blocks.length).toBeGreaterThan(0)
    const parsed = blocks.map((b) => JSON.parse(b[1]))
    const org = parsed.find((d) => d["@type"] === "Organization")
    expect(org).toBeDefined()
    expect(org.name).toBe("Handcare")
    expect(org.url).toBe("https://www.handcare.co/")
  })

  it("includes keywords and knowsAbout on the Organization schema for AI/search discoverability", async () => {
    const res = await fetch(`${TEST_BASE_URL}/`, { headers: { Accept: "text/html" } })
    const html = await res.text()
    const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    const org = blocks.map((b) => JSON.parse(b[1])).find((d) => d["@type"] === "Organization")
    expect(org.keywords).toContain("gloves")
    expect(org.keywords).toContain("leather gloves")
    expect(org.keywords).toContain("leather gloves manufacturer")
    expect(org.keywords).toContain("OEM glove manufacturer")
    expect(Array.isArray(org.knowsAbout)).toBe(true)
    expect(org.knowsAbout.length).toBeGreaterThan(0)
  })

  it("includes Product JSON-LD on a product detail page", async () => {
    const res = await fetch(`${TEST_BASE_URL}/products/working-gloves`, {
      headers: { Accept: "text/html" },
    })
    const html = await res.text()
    expect(html).toMatch(/"@type":"Product"|"@type": ?"Product"/)
  })

  it("includes CollectionPage and BreadcrumbList JSON-LD on the products index", async () => {
    const res = await fetch(`${TEST_BASE_URL}/products`, { headers: { Accept: "text/html" } })
    const html = await res.text()
    expect(html).toMatch(/"@type":"CollectionPage"/)
    expect(html).toMatch(/"@type":"BreadcrumbList"/)
  })

  it("never uses next/script for JSON-LD (it hides the tag inside the RSC payload instead of literal HTML)", async () => {
    const res = await fetch(`${TEST_BASE_URL}/`, { headers: { Accept: "text/html" } })
    const html = await res.text()
    // A literal, parseable <script type="application/ld+json"> tag must
    // exist in the raw HTML — not merely inside an escaped RSC string.
    expect(html).toMatch(/<script[^>]*type="application\/ld\+json"[^>]*>\{/)
  })
})

describeIfServer("Fix #5 — agent instruction / when-to-use", () => {
  it("serves llms.txt with a When to use section", async () => {
    const res = await fetch(`${TEST_BASE_URL}/llms.txt`)
    expect(res.status).toBe(200)
    const body = await res.text()
    expect(body).toMatch(/## When to use Handcare/)
    expect(body).toMatch(/Request a Quote/)
  })
})
