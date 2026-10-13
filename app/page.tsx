import type { Metadata } from "next"
import HomePage from "@/components/home-page"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Handcare - Leather Gloves Manufacturer & Exporter | Sialkot, Pakistan",
  description:
    "ISO 9001:2015 certified leather gloves manufacturer and industrial glove exporter in Sialkot, Pakistan. OEM/custom glove manufacturing, wholesale supply to 50+ countries.",
  path: "/",
})

export default function Page() {
  return <HomePage />
}
