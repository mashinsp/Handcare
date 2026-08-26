import React from "react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { glovesCatalogSchema, productList } from "@/lib/structured-data"

// SEO Metadata for Google, AI Crawlers, and Social Sharing
export const metadata: Metadata = {
  title: "Leather Gloves Catalogue | Custom Glove Manufacturer — Handcare",
  description:
    "Genuine leather industrial and safety gloves — working, welding, mechanical, and more. Premium cowhide and goat-grain leather. OEM/wholesale glove supplier, EN 388/407 & CE certified, manufactured in Sialkot, Pakistan.",
  alternates: {
    canonical: "https://www.handcare.co/products",
  },
  openGraph: {
    title: "Leather Gloves Catalogue | Custom Glove Manufacturer — Handcare",
    description:
      "Genuine leather industrial and safety gloves, OEM/wholesale supply, manufactured in Sialkot, Pakistan.",
    url: "https://www.handcare.co/products",
    siteName: "Handcare",
    type: "website",
  },
}

// Catalog Breadcrumb Schema for AEO / Rich Snippets
const catalogBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.handcare.co",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Products",
      item: "https://www.handcare.co/products",
    },
  ],
}

const products = [
  {
    id: "working-gloves",
    name: "Working Gloves",
    img: "workingglove1.png",
    desc: "Heavy-duty protection for construction and general work",
    images: ["workingglove1.png", "workingglove2.png", "workingglove3.png", "workingglove4.png"],
    features: ["Cut-resistant materials", "Enhanced grip", "Durable construction", "Comfortable fit"],
    applications: ["Construction", "General maintenance", "Warehouse operations", "Material handling"],
  },
  {
    id: "welding-gloves",
    name: "Welding Gloves",
    img: "weldinggloves1.png",
    desc: "Heat and flame-resistant gloves for welding operations",
    images: ["weldinggloves1.png", "weldinggloves2.png", "weldinggloves3.png", "weldinggloves4.png"],
    features: ["Heat resistance up to 500°C", "Flame retardant", "Heavy-duty leather", "Extended cuff protection"],
    applications: ["Welding operations", "Foundry work", "Metal fabrication", "High-temperature environments"],
  },
  {
    id: "mechanical-gloves",
    name: "Mechanical Gloves",
    img: "mechanicalglove1.png",
    desc: "Precision grip and cut resistance for mechanical work",
    images: ["mechanicalglove1.png", "mechanicalglove2.png", "mechanicalglove3.png", "mechanicalglove4.png"],
    features: ["Cut level 5 protection", "Precision touch", "Oil and water resistant", "Breathable design"],
    applications: ["Automotive repair", "Machinery maintenance", "Assembly work", "Precision tasks"],
  },
  {
    id: "gardening-gloves",
    name: "Gardening Gloves",
    img: "gardening1.png",
    desc: "Comfortable protection for gardening and landscaping",
    images: ["gardening1.png", "gardening2.png", "gardening3.png", "gardening4.png"],
    features: ["Puncture resistant", "Waterproof coating", "Breathable fabric", "Flexible design"],
    applications: ["Gardening", "Landscaping", "Agriculture", "Outdoor maintenance"],
  },
  {
    id: "riding-gloves",
    name: "Riding Gloves",
    img: "riding1.png",
    desc: "Flexible and durable gloves for equestrian activities",
    images: ["riding1.png", "riding2.png", "riding3.png", "riding4.png"],
    features: ["Enhanced grip", "Weather protection", "Flexible fit", "Durable leather"],
    applications: ["Equestrian sports", "Horseback riding", "Stable work", "Outdoor activities"],
  },
  {
    id: "canadian-gloves",
    name: "Canadian Gloves",
    img: "canadianglove1.png",
    desc: "Cold weather protection with superior insulation",
    images: ["canadianglove1.png", "canadianglove2.png", "canadianglove3.png", "canadianglove4.png"],
    features: ["Thermal insulation", "Waterproof exterior", "Wind resistant", "Extended wrist coverage"],
    applications: ["Cold weather work", "Outdoor construction", "Winter maintenance", "Arctic operations"],
  },
  {
    id: "boxing-gloves",
    name: "Boxing Gloves",
    img: "boxing1.png",
    desc: "Professional-grade boxing gloves for training and competition",
    images: ["boxing1.png", "boxing2.png", "boxing3.png", "boxing4.png"],
    features: ["Impact protection", "Secure wrist support", "Breathable design", "Durable construction"],
    applications: ["Boxing training", "Martial arts", "Fitness workouts", "Competition"],
  },
]

export default function ProductsPage() {
  return (
    <>
      {/* Catalog JSON-LD — plain <script>, not next/script (see note in
          app/layout.tsx: next/script gets buried in the RSC hydration
          payload instead of appearing as literal HTML, so crawlers and
          agents that don't execute JS never see it). */}
      <script
        id="gloves-catalog-schema"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glovesCatalogSchema) }}
      />
      {/* Breadcrumb JSON-LD */}
      <script
        id="catalog-breadcrumb-schema"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogBreadcrumbSchema) }}
      />

      <div
        className="min-h-screen relative"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.99 0.002 100) 0%, oklch(0.98 0.005 95) 50%, oklch(0.99 0.002 100) 100%)",
        }}
      >
        {/* Subtle background overlay */}
        <div
          className="fixed inset-0 pointer-events-none opacity-20 z-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, oklch(0.50 0.15 220 / 0.12) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        ></div>

        {/* Hero Section */}
        <section className="pt-28 sm:pt-36 pb-12 sm:pb-20 px-4 sm:px-6 relative z-10 bg-gradient-warm pattern-dots">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gradient-primary">
              Our Product Range
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "oklch(0.40 0.01 240)" }}>
              Explore our comprehensive collection of premium hand protection solutions manufactured in Sialkot, Pakistan.
              Each product is engineered for specific applications and tested to meet international safety standards (EN 388, ANSI/ISEA, CE).
            </p>
          </div>
        </section>

        {/* Primary Categories Grid */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10" style={{ background: "oklch(0.98 0.008 85)" }}>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products.map((product) => {
                const schemaMatch = productList.find((p) => p.slug === product.id)
                return (
                  <div
                    key={product.id}
                    className="rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col group hover:shadow-primary-lg"
                    style={{
                      background: "linear-gradient(to bottom, oklch(1 0 0), oklch(0.99 0.002 100))",
                      border: "1px solid oklch(0.90 0.008 100)",
                      boxShadow: "0 1px 3px 0 oklch(0.45 0.15 220 / 0.05)",
                    }}
                  >
                    <Link href={`/products/${product.id}`} className="flex flex-col flex-grow cursor-pointer">
                      <div
                        className="h-64 flex items-center justify-center p-4 relative overflow-hidden transition-all duration-300"
                        style={{
                          background: "linear-gradient(135deg, oklch(0.99 0.002 100) 0%, oklch(0.97 0.008 220) 100%)",
                        }}
                      >
                        <Image
                          src={`/${product.img}`}
                          alt={`Handcare ${product.name} - Wholesale export standard safety glove`}
                          fill
                          className="object-contain p-4 relative z-10 transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6 flex-grow flex flex-col relative z-10">
                        <h2
                          className="text-lg font-bold mb-2 text-gradient-primary group-hover:text-[oklch(0.45_0.15_220)] transition-colors"
                          style={{ color: "oklch(0.25 0.01 240)" }}
                        >
                          {product.name}
                        </h2>
                        <p className="text-sm mb-3 flex-grow" style={{ color: "oklch(0.40 0.01 240)" }}>
                          {product.desc}
                        </p>

                        {/* Standard certifications tag for AEO visibility */}
                        {schemaMatch?.standards && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {schemaMatch.standards.map((std) => (
                              <span
                                key={std}
                                className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200"
                              >
                                {std}
                              </span>
                            ))}
                          </div>
                        )}

                        <span
                          className="text-sm font-medium inline-flex items-center gap-1 transition-all duration-300 group-hover:gap-2"
                          style={{ color: "oklch(0.50 0.15 220)" }}
                        >
                          View Specifications & Variants →
                        </span>
                      </div>
                    </Link>
                    <div className="px-6 pb-6 relative z-10">
                      <Link
                        href={`/quote?product=${product.id}`}
                        className="text-sm font-medium transition-colors hover:text-[oklch(0.50_0.15_220)]"
                        style={{ color: "oklch(0.40 0.01 240)" }}
                      >
                        Request Bulk Quote
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Complete Product Gallery */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10" style={{ background: "oklch(0.98 0.008 85)" }}>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gradient-primary">
                Complete Product Gallery
              </h2>
              <p className="max-w-2xl mx-auto" style={{ color: "oklch(0.40 0.01 240)" }}>
                Browse through all product variants across our manufacturing lines. Each model is fully customizable for OEM/ODM export requests.
              </p>
            </div>

            <div className="space-y-16">
              {products.map((product) => (
                <div key={product.id}>
                  <h3 className="text-2xl font-bold mb-6 text-gradient-primary">{product.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {product.images.map((img, imgIndex) => (
                      <Link key={imgIndex} href={`/products/${product.id}?variant=${imgIndex + 1}`}>
                        <div
                          className="rounded-xl p-4 hover:shadow-primary transition-all duration-300 cursor-pointer group"
                          style={{
                            background: "linear-gradient(to bottom, oklch(1 0 0), oklch(0.99 0.002 100))",
                            border: "1px solid oklch(0.90 0.008 100)",
                            boxShadow: "0 1px 3px 0 oklch(0.45 0.15 220 / 0.05)",
                          }}
                        >
                          <div
                            className="h-48 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden transition-all duration-300"
                            style={{
                              background: "linear-gradient(135deg, oklch(0.99 0.002 100) 0%, oklch(0.97 0.008 220) 100%)",
                            }}
                          >
                            <Image
                              src={`/${img}`}
                              alt={`Handcare ${product.name} Variant ${imgIndex + 1}`}
                              fill
                              className="object-contain p-2 relative z-10 transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                          <p
                            className="text-sm font-medium text-center transition-colors group-hover:text-[oklch(0.50_0.15_220)]"
                            style={{ color: "oklch(0.25 0.01 240)" }}
                          >
                            {product.name} - Variant {imgIndex + 1}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10" style={{ background: "oklch(0.98 0.008 85)" }}>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gradient-primary">
              Custom OEM / Wholesale Manufacturing
            </h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base" style={{ color: "oklch(0.40 0.01 240)" }}>
              Need custom branding, material specifications, or bulk container orders? Our Sialkot facility exports worldwide to over 50 countries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="px-8 py-3 text-white text-sm rounded-full transition-all duration-300 btn-gradient glow-accent-hover relative overflow-hidden font-medium"
                style={{
                  background: "linear-gradient(135deg, oklch(0.65 0.18 65), oklch(0.70 0.15 40))",
                }}
              >
                Request Custom Quote
              </Link>
              <Link
                href="/#contact"
                className="px-8 py-3 border-2 text-sm rounded-full font-medium transition-all duration-300 glow-primary-hover"
                style={{
                  borderColor: "oklch(0.45 0.15 220)",
                  color: "oklch(0.45 0.15 220)",
                }}
              >
                Contact Overseas Sales
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}