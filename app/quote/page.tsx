import type { Metadata } from "next"
import QuoteForm from "./QuoteForm"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Request a Wholesale Glove Quote | OEM & Bulk Orders | Handcare",
  description:
    "Request bulk or private-label pricing for leather work, welding, mechanic, riding and boxing gloves. Quotes within 24 hours from Handcare, Sialkot, Pakistan.",
  path: "/quote",
})

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function QuotePage({ searchParams }: { searchParams: SearchParams }) {
  const { product } = await searchParams
  return <QuoteForm productParam={typeof product === "string" ? product : undefined} />
}
