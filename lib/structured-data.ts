/**
 * Structured data (JSON-LD) for Handcare.
 *
 * WHERE TO USE:
 * 1. `organizationSchema` -> render once in app/layout.tsx (applies site-wide)
 * 2. `glovesCatalogSchema` -> render on app/products/page.tsx
 * 3. `productSchema(p)` + `breadcrumbSchema(...)` -> render on app/products/[id]/page.tsx
 * 4. `websiteSchema` -> render once in app/layout.tsx
 *
 * HOW TO RENDER: a plain <script type="application/ld+json"> tag, not
 * next/script (see the comment in app/layout.tsx).
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
  email: 'handcare514@gmail.com',
  telephone: '+92-301-426-4385',
  areaServed: 'Worldwide',
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
    {
      '@type': 'ContactPoint',
      telephone: '+92-302-400-2921',
      contactType: 'sales',
      areaServed: 'Worldwide',
    },
  ],
  sameAs: ['https://www.instagram.com/hand_care14'],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'ISO 9001:2015 Certification',
  },
  // Real schema.org properties (not the dead HTML meta-keywords tag) that
  // help AI agents and search engines semantically match your niche.
  // Only terms that genuinely describe Handcare — broad single-word terms
  // like "Gloves" are too generic to claim on their own.
  keywords: [
    'gloves',
    'leather gloves',
    'leather gloves industry',
    'leather gloves manufacturer',
    'custom glove manufacturer',
    'gloves wholesale supplier',
    'gloves exporter',
    'OEM glove manufacturer',
    'industrial glove exporter',
    'genuine leather gloves',
    'premium gloves',
    'heavy-duty leather gloves',
    'premium cowhide leather gloves',
    'goat grain leather gloves',
  ].join(', '),
  knowsAbout: [
    'Leather glove manufacturing',
    'Industrial safety gloves',
    'OEM/ODM glove production',
    'Cowhide, goat, sheep, and deer leather processing',
    'EN 388, EN 407, ANSI/ISEA 105, and CE glove safety standards',
  ],
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
  {
    slug: 'driving-gloves',
    name: 'Driving Gloves',
    description: 'Soft grain leather driving gloves, unlined for precise steering feel, with a secure wrist closure.',
    material: 'Soft grain goatskin and cowhide',
    image: 'https://www.handcare.co/driving1.png',
    standards: ['CE Marking'],
  },
]

export function productSchema(p: ProductSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://www.handcare.co/products/${p.slug}#product`,
    name: p.name,
    url: `https://www.handcare.co/products/${p.slug}`,
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
    // No `offers`: pricing is quote-based, and an Offer without a price is
    // flagged invalid for product snippets / merchant listings. A Product
    // with no offers, review or aggregateRating is simply not eligible for
    // those rich results, which is the honest state for a B2B catalogue.
    // If indicative wholesale price ranges are ever published, add an
    // AggregateOffer with lowPrice, highPrice and priceCurrency here.
  }
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
  isPartOf: { '@id': 'https://www.handcare.co/#website' },
  publisher: { '@id': 'https://www.handcare.co/#organization' },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: productList.length,
    itemListElement: productList.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `https://www.handcare.co/products/${p.slug}`,
    })),
  },
}

// Render once in app/layout.tsx, as its own block next to the Organization.
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.handcare.co/#website',
  name: 'Handcare',
  url: 'https://www.handcare.co/',
  inLanguage: 'en',
  publisher: { '@id': 'https://www.handcare.co/#organization' },
}

export function faqSchema(faqs: readonly { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
