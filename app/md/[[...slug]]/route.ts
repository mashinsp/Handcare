import { NextRequest, NextResponse } from "next/server"
import { getAllMarkdownPaths, getMarkdownForPath } from "@/lib/markdown-content"

const RECOVERY_LINKS = [
  "",
  "---",
  "",
  "**Where to look next:**",
  "",
  "- [Sitemap](https://www.handcare.co/sitemap.xml)",
  "- [llms.txt](https://www.handcare.co/llms.txt)",
  "- [All products](https://www.handcare.co/products)",
  "- [Homepage](https://www.handcare.co/)",
  "",
].join("\n")

function markdownHeaders(): HeadersInit {
  return {
    "Content-Type": "text/markdown; charset=utf-8",
    Vary: "Accept, Accept-Encoding",
    "Cache-Control": "public, max-age=300",
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params
  const pathname = "/" + (slug?.join("/") ?? "")
  const markdown = getMarkdownForPath(pathname)

  if (!markdown) {
    const body = `# Page not found\n\nThere is no page at \`${pathname}\` on handcare.co.${RECOVERY_LINKS}`
    return new NextResponse(body, { status: 404, headers: markdownHeaders() })
  }

  return new NextResponse(markdown, { status: 200, headers: markdownHeaders() })
}

// Pre-render the markdown variant for every known page (including "/")
// at build time. An empty slug array matches the site root.
export function generateStaticParams() {
  return getAllMarkdownPaths().map((path) => ({
    slug: path.split("/").filter(Boolean),
  }))
}
