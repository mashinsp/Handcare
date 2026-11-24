import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductDetail from "./ProductDetail"
import { getProduct, products } from "@/lib/products"
import { productList, productSchema, breadcrumbSchema } from "@/lib/structured-data"
import { pageMetadata, SITE_URL } from "@/lib/seo"

type Params = Promise<{ id: string }>

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(products).map((id) => ({ id }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)
  if (!product) return {}

  return pageMetadata({
    title: product.seoTitle,
    description: product.metaDescription,
    path: `/products/${id}`,
    image: `/${product.img}`,
    imageAlt: `Handcare ${product.name}`,
  })
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  const schemaData = productList.find((p) => p.slug === id)
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Products", url: `${SITE_URL}/products` },
    { name: product.name, url: `${SITE_URL}/products/${id}` },
  ])

  return (
    <>
      {/* Plain <script> tags, not next/script — see app/layout.tsx. */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema(schemaData)) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <ProductDetail productId={id} />
    </>
  )
}
