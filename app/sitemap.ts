import type { MetadataRoute } from "next"
import { products } from "@/lib/products"
import { SITE_URL } from "@/lib/seo"

/**
 * Replaces the hand-maintained public/sitemap.xml. Product URLs come from
 * lib/products.ts, so a new category is listed automatically.
 *
 * Only real documents are listed: in-page anchors like /#about are not
 * separate URLs and don't belong here. Google ignores changefreq and
 * priority, so they're omitted.
 *
 * Bump the matching date when a page's content actually changes — an
 * accurate lastmod is what makes Google trust it.
 */
const SITE_UPDATED = "2026-10-13"
const LEGAL_UPDATED = "2026-10-13"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: SITE_UPDATED },
    { url: `${SITE_URL}/products`, lastModified: SITE_UPDATED },
    ...Object.keys(products).map((id) => ({
      url: `${SITE_URL}/products/${id}`,
      lastModified: SITE_UPDATED,
    })),
    { url: `${SITE_URL}/quote`, lastModified: SITE_UPDATED },
    { url: `${SITE_URL}/privacy`, lastModified: LEGAL_UPDATED },
    { url: `${SITE_URL}/terms`, lastModified: LEGAL_UPDATED },
  ]
}
