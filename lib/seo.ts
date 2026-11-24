import type { Metadata } from "next"

export const SITE_URL = "https://www.handcare.co"
export const SITE_NAME = "Handcare"
export const DEFAULT_OG_IMAGE = "/opengraph-image"

interface PageMetadataInput {
  title: string
  description: string
  /** Path starting with "/", e.g. "/products/welding-gloves" */
  path: string
  /** Absolute URL or site-relative path. Defaults to the generated brand card. */
  image?: string
  imageAlt?: string
}

/**
 * Builds the full per-page metadata block: title, description, a
 * self-referencing canonical and matching Open Graph / Twitter tags.
 *
 * Next.js merges `openGraph` and `twitter` shallowly — a page that sets
 * `openGraph` replaces the layout's object entirely — so every page goes
 * through this helper instead of relying on layout-level defaults.
 *
 * The canonical is always the clean path, which collapses any query-string
 * variants (?variant=, ?product=, tracking params) onto one URL.
 */
export function pageMetadata({ title, description, path, image, imageAlt }: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`
  const images = [{ url: image ?? DEFAULT_OG_IMAGE, alt: imageAlt ?? title }]

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
  }
}
