import { productList, type ProductSchemaInput } from "./structured-data"

/**
 * Markdown variants for content negotiation (acceptmarkdown.com compliance).
 *
 * Reuses `productList` from lib/structured-data.ts as the base (it's
 * already the canonical source used for JSON-LD) rather than adding a
 * fourth copy of the product data — this codebase already has the same
 * product facts duplicated across app/products/page.tsx and
 * app/products/[id]/page.tsx; this file deliberately does not add a
 * fifth copy of the richer fields (applications, features, sizes) to
 * avoid making that worse. If you consolidate the product data sources
 * later, only this SUPPLEMENT map needs to move with it.
 */

const SUPPLEMENT: Record<string, { sizes: string; colors?: string }> = {
  "working-gloves": { sizes: "S, M, L, XL", colors: "Brown, Black" },
  "welding-gloves": { sizes: "M, L, XL", colors: "Brown" },
  "mechanical-gloves": { sizes: "S, M, L, XL", colors: "Gray, Blue" },
  "gardening-gloves": { sizes: "S, M, L, XL", colors: "Green, Brown" },
  "riding-gloves": { sizes: "S, M, L, XL", colors: "Brown, Black, Tan" },
  "canadian-gloves": { sizes: "M, L, XL", colors: "Black, Brown" },
  "boxing-gloves": { sizes: "S, M, L, XL", colors: "Red, Blue, Black" },
}

function productToMarkdown(p: ProductSchemaInput): string {
  const supplement = SUPPLEMENT[p.slug]
  const lines = [`# ${p.name}`, "", p.description, "", "## Specifications", ""]
  lines.push(`- Material: ${p.material}`)
  if (supplement?.sizes) lines.push(`- Sizes: ${supplement.sizes}`)
  lines.push(`- Standards: ${p.standards.join(", ")}`)
  if (supplement?.colors) lines.push(`- Colors: ${supplement.colors}`)
  lines.push(
    "",
    `[Request a quote for ${p.name}](https://www.handcare.co/quote?product=${p.slug})`,
    `[Back to all products](https://www.handcare.co/products)`
  )
  return lines.join("\n")
}

const HOME_MARKDOWN = `# Handcare — Leather Gloves Manufacturer & Exporter, Sialkot, Pakistan

Handcare is a manufacturer and exporter of premium industrial and safety
gloves based in Sialkot, Pakistan. ISO 9001:2015 certified, exporting to
50+ countries, producing 500,000+ pairs annually, with 25+ years of
manufacturing experience.

## About

Handcare combines traditional Sialkot leather craftsmanship with modern
manufacturing to produce hand protection for industrial, safety, sports,
and outdoor use. Products comply with CE, ANSI/ISEA 105, and EN (388, 407)
international safety standards.

## Product range

${productList.map((p) => `- [${p.name}](https://www.handcare.co/products/${p.slug}): ${p.description}`).join("\n")}

## Contact

- Email: handcare514@gmail.com
- Phone: +92 301 426 4385 / +92 302 400 2921
- Address: Industrial Area, Sialkot 51310, Punjab, Pakistan

[Full product catalogue](https://www.handcare.co/products) ·
[Request a quote](https://www.handcare.co/quote) ·
[llms.txt](https://www.handcare.co/llms.txt)
`

const PRODUCTS_INDEX_MARKDOWN = `# Our Product Range

Comprehensive collection of premium hand protection solutions manufactured
in Sialkot, Pakistan, tested to EN 388, ANSI/ISEA 105, and CE standards.

${productList.map((p) => `- [${p.name}](https://www.handcare.co/products/${p.slug}): ${p.description}`).join("\n")}

[Request a custom / OEM quote](https://www.handcare.co/quote)
`

const QUOTE_MARKDOWN = `# Request a Quote

Handcare is a B2B wholesale manufacturer — pricing is quote-based and
volume-dependent, not listed per unit.

To request a quote, submit the form at https://www.handcare.co/quote or
email handcare514@gmail.com / call +92 301 426 4385, including:

- Product category (e.g. "welding gloves")
- Required standard (EN 388, EN 407, ANSI/ISEA 105, or CE)
- Approximate order volume

[Back to homepage](https://www.handcare.co/)
`

const PRIVACY_MARKDOWN = `# Privacy Policy

Handcare (Industrial Area, Sialkot 51310, Punjab, Pakistan) collects only
what you type into the quote or contact form: name, email, phone, country,
product of interest and quantity, plus optional company name and message.
Submissions are emailed to our sales inbox; they are not stored in a
database on this site.

Analytics are cookieless (Vercel Analytics). We set no advertising,
profiling or third-party tracking cookies, so there is no consent banner.
We never sell or trade your information.

To request a copy, correction or deletion of your data, email
handcare514@gmail.com.

[Full policy](https://www.handcare.co/privacy) ·
[Terms of Use](https://www.handcare.co/terms) ·
[Homepage](https://www.handcare.co/)
`

const TERMS_MARKDOWN = `# Terms of Use

www.handcare.co is an information and enquiry site for business customers,
not an online shop. No prices are published and no order can be placed here.

A quotation request is an invitation for Handcare to quote. A binding
contract exists only once Handcare issues a written quotation or proforma
invoice and you confirm it in writing.

Product descriptions, images and standards references (CE, EN 388, EN 407,
ANSI/ISEA 105) are a general guide; leather varies between batches. Confirm
compliance in writing for the exact article before ordering. The downloadable
catalogue is for reference — a written quotation prevails over it.

Site content is owned by Handcare; commercial reuse requires written
permission. Governed by the laws of Pakistan.

[Full terms](https://www.handcare.co/terms) ·
[Privacy Policy](https://www.handcare.co/privacy) ·
[Homepage](https://www.handcare.co/)
`

const REGISTRY: Record<string, string> = {
  "/": HOME_MARKDOWN,
  "/products": PRODUCTS_INDEX_MARKDOWN,
  "/quote": QUOTE_MARKDOWN,
  "/privacy": PRIVACY_MARKDOWN,
  "/terms": TERMS_MARKDOWN,
}

for (const p of productList) {
  REGISTRY[`/products/${p.slug}`] = productToMarkdown(p)
}

export function getMarkdownForPath(pathname: string): string | undefined {
  const normalized = pathname.replace(/\/+$/, "") || "/"
  return REGISTRY[normalized]
}

export function getAllMarkdownPaths(): string[] {
  return Object.keys(REGISTRY)
}
