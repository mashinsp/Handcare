import type { Metadata } from "next"
import HomePage from "@/components/home-page"
import { pageMetadata } from "@/lib/seo"
import { faqSchema } from "@/lib/structured-data"
import { HOME_FAQS } from "@/lib/faqs"

export const metadata: Metadata = pageMetadata({
  title: "Leather Gloves Manufacturer & Exporter, Sialkot | Handcare",
  description:
    "ISO 9001:2015 certified leather glove manufacturer in Sialkot, Pakistan. OEM and custom industrial gloves, wholesale export to 50+ countries.",
  path: "/",
})

export default function Page() {
  return (
    <>
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(HOME_FAQS)) }}
      />
      <HomePage />
    </>
  )
}
