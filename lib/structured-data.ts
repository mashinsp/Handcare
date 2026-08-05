/**
 * Structured data (JSON-LD) for Handcare.
 *
 * WHERE TO USE:
 * 1. `organizationSchema` -> render once in app/layout.tsx (applies site-wide)
 * 2. `glovesCatalogSchema` -> render on app/products/page.tsx
 * 3. `productSchema(slug)` -> render on each app/products/[slug]/page.tsx (or the
 *    7 static product pages), passing the matching product data
 *
 * HOW TO RENDER:
 * import Script from 'next/script'
 *
 * <Script
 *   id="organization-schema"
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
 * />
 */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.handcare.co/#organization',
  name: 'Handcare',
  url: 'https://www.handcare.co/',
  logo: 'https://www.handcare.co/handcarelogo.png',
  description:
    'Handcare is a leading manufacturer of high-quality industrial and safety gloves based in Sialkot, Pakistan, ISO 9001:2015 certified, exporting to 50+ countries.',
  foundingLocation: 'Sialkot, Pakistan',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Industrial Area',
    addressLocality: 'Sialkot',
    postalCode: '51310',
    addressRegion: 'Punjab',
    addressCountry: 'PK',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+92-301-426-4385',
      contactType: 'sales',
      email: 'handcare514@gmail.com',
      areaServed: 'Worldwide',
    },
  ],
  sameAs: ['https://www.instagram.com/hand_care14'],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'ISO 9001:2015 Certification',
  },
}

// Render on /products
export const glovesCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.handcare.co/products#collection',
  name: 'Handcare Product Range',
  description:
    'Comprehensive range of protective gloves for industrial, safety, sports and outdoor use, manufactured in Sialkot, Pakistan.',
  url: 'https://www.handcare.co/products',
  isPartOf: { '@id': 'https://www.handcare.co/#organization' },
}

export interface ProductSchemaInput {
  slug: string
  name: string
  description: string
  material: string
  image: string
  standards: string[]
}

export const productList: ProductSchemaInput[] = [
  {
    slug: 'working-gloves',
    name: 'Working Gloves',
    description: 'Heavy-duty protection for construction and general work. Cut-resistant, level 3.',
    material: 'Premium leather and synthetic blend',
    image: 'https://www.handcare.co/workingglove1.png',
    standards: ['EN 388', 'ANSI/ISEA 105'],
  },
  {
    slug: 'welding-gloves',
    name: 'Welding Gloves',
    description: 'Heat and flame-resistant gloves for welding operations, rated up to 500°C.',
    material: 'Heat-resistant leather',
    image: 'https://www.handcare.co/weldinggloves1.png',
    standards: ['EN 407', 'CE Marking'],
  },
  {
    slug: 'mechanical-gloves',
    name: 'Mechanical Gloves',
    description: 'Precision grip and cut resistance (Level 5) for mechanical work.',
    material: 'HPPE and synthetic blend',
    image: 'https://www.handcare.co/mechanicalglove1.png',
    standards: ['EN 388', 'ANSI/ISEA 105'],
  },
  {
    slug: 'gardening-gloves',
    name: 'Gardening Gloves',
    description: 'Comfortable, puncture resistant, waterproof protection for gardening and landscaping.',
    material: 'Nitrile coating on cotton',
    image: 'https://www.handcare.co/gardening1.png',
    standards: ['EN 388'],
  },
  {
    slug: 'riding-gloves',
    name: 'Riding Gloves',
    description: 'Flexible and durable gloves for equestrian activities.',
    material: 'Premium leather',
    image: 'https://www.handcare.co/riding1.png',
    standards: ['CE Marking'],
  },
  {
    slug: 'canadian-gloves',
    name: 'Canadian Gloves',
    description: 'Cold weather protection with superior insulation, rated to -40°C.',
    material: 'Insulated leather and synthetic',
    image: 'https://www.handcare.co/canadianglove1.png',
    standards: ['EN 388', 'CE Marking'],
  },
  {
    slug: 'boxing-gloves',
    name: 'Boxing Gloves',
    description: 'Professional-grade boxing gloves for training and competition.',
    material: 'Premium leather and synthetic',
    image: 'https://www.handcare.co/boxing1.png',
    standards: ['CE Marking'],
  },
]

export function productSchema(p: ProductSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: p.image,
    material: p.material,
    brand: { '@type': 'Brand', name: 'Handcare' },
    manufacturer: { '@id': 'https://www.handcare.co/#organization' },
    additionalProperty: p.standards.map((s) => ({
      '@type': 'PropertyValue',
      name: 'Safety Standard',
      value: s,
    })),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: 'Bulk/wholesale pricing available on request',
      },
      url: `https://www.handcare.co/products/${p.slug}`,
    },
  }
}