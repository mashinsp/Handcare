/**
 * Product catalogue data shared by the product detail route (server page
 * for metadata, client component for the UI). Kept outside any
 * "use client" module so server code can read the values directly.
 */

export interface ProductSpecs {
  [label: string]: string
}

export interface Product {
  seoTitle: string
  metaDescription: string
  name: string
  img: string
  desc: string
  images: string[]
  features: string[]
  applications: string[]
  specifications: ProductSpecs
}

export const products: Record<string, Product> = {
  "working-gloves": {
    seoTitle: "Leather Work Gloves Manufacturer | EN 388 Cut Level 3 | Handcare",
    metaDescription: "Heavy-duty leather work gloves for construction and warehouse use. EN 388 / ANSI cut level 3, S–XL. OEM and wholesale supply from Sialkot, Pakistan.",
    name: "Working Gloves",
    img: "workingglove1.png",
    desc: "Heavy-duty protection for construction and general work",
    images: ["workingglove1.png", "workingglove2.png", "workingglove3.png", "workingglove4.png"],
    features: ["Cut-resistant materials", "Enhanced grip", "Durable construction", "Comfortable fit", "Reinforced palm", "Breathable design"],
    applications: ["Construction", "General maintenance", "Warehouse operations", "Material handling", "Loading/unloading"],
    specifications: {
      "Material": "Premium leather and synthetic blend",
      "Cut Level": "Level 3",
      "Sizes": "S, M, L, XL",
      "Standards": "EN 388, ANSI/ISEA 105",
      "Color": "Brown, Black",
    }
  },
  "welding-gloves": {
    seoTitle: "Leather Welding Gloves Manufacturer | EN 407, 500°C | Handcare",
    metaDescription: "Heat and flame-resistant leather welding gloves rated to 500°C with extended cuffs. EN 407 / CE certified. OEM and bulk export from Sialkot, Pakistan.",
    name: "Welding Gloves",
    img: "weldinggloves1.png",
    desc: "Heat and flame-resistant gloves for welding operations",
    images: ["weldinggloves1.png", "weldinggloves2.png", "weldinggloves3.png", "weldinggloves4.png"],
    features: ["Heat resistance up to 500°C", "Flame retardant", "Heavy-duty leather", "Extended cuff protection", "Reinforced stitching", "Heat reflective lining"],
    applications: ["Welding operations", "Foundry work", "Metal fabrication", "High-temperature environments", "Forging"],
    specifications: {
      "Material": "Heat-resistant leather",
      "Temperature Rating": "Up to 500°C",
      "Sizes": "M, L, XL",
      "Standards": "EN 407, CE Marking",
      "Color": "Brown",
    }
  },
  "mechanical-gloves": {
    seoTitle: "Mechanic Gloves Manufacturer | Cut Level 5, Oil Resistant | Handcare",
    metaDescription: "Precision-grip mechanic gloves with cut level 5 protection, oil and water resistance. EN 388 / ANSI certified. Wholesale and private label from Pakistan.",
    name: "Mechanical Gloves",
    img: "mechanicalglove1.png",
    desc: "Precision grip and cut resistance for mechanical work",
    images: ["mechanicalglove1.png", "mechanicalglove2.png", "mechanicalglove3.png", "mechanicalglove4.png"],
    features: ["Cut level 5 protection", "Precision touch", "Oil and water resistant", "Breathable design", "Enhanced dexterity", "Puncture resistant"],
    applications: ["Automotive repair", "Machinery maintenance", "Assembly work", "Precision tasks", "Equipment handling"],
    specifications: {
      "Material": "HPPE and synthetic blend",
      "Cut Level": "Level 5",
      "Sizes": "S, M, L, XL",
      "Standards": "EN 388, ANSI/ISEA 105",
      "Color": "Gray, Blue",
    }
  },
  "gardening-gloves": {
    seoTitle: "Gardening Gloves Manufacturer | Waterproof, EN 388 | Handcare",
    metaDescription: "Puncture-resistant, waterproof nitrile-coated gardening gloves for landscaping and agriculture. EN 388. Wholesale and OEM supply from Sialkot, Pakistan.",
    name: "Gardening Gloves",
    img: "gardening1.png",
    desc: "Comfortable protection for gardening and landscaping",
    images: ["gardening1.png", "gardening2.png", "gardening3.png", "gardening4.png"],
    features: ["Puncture resistant", "Waterproof coating", "Breathable fabric", "Flexible design", "Extended wrist", "Easy to clean"],
    applications: ["Gardening", "Landscaping", "Agriculture", "Outdoor maintenance", "Planting"],
    specifications: {
      "Material": "Nitrile coating on cotton",
      "Waterproof": "Yes",
      "Sizes": "S, M, L, XL",
      "Standards": "EN 388",
      "Color": "Green, Brown",
    }
  },
  "riding-gloves": {
    seoTitle: "Leather Horse Riding Gloves Manufacturer | Handcare Pakistan",
    metaDescription: "Premium leather equestrian riding gloves with enhanced grip and weather protection, in brown, black and tan. CE marked. OEM and wholesale from Sialkot.",
    name: "Riding Gloves",
    img: "riding1.png",
    desc: "Flexible and durable gloves for equestrian activities",
    images: ["riding1.png", "riding2.png", "riding3.png", "riding4.png"],
    features: ["Enhanced grip", "Weather protection", "Flexible fit", "Durable leather", "Reinforced palm", "Ventilation"],
    applications: ["Equestrian sports", "Horseback riding", "Stable work", "Outdoor activities", "Ranch work"],
    specifications: {
      "Material": "Premium leather",
      "Sizes": "S, M, L, XL",
      "Standards": "CE Marking",
      "Color": "Brown, Black, Tan",
    }
  },
  "canadian-gloves": {
    seoTitle: "Insulated Winter Work Gloves Manufacturer | -40°C | Handcare",
    metaDescription: "Insulated Canadian-style winter work gloves rated to -40°C, waterproof and wind resistant. EN 388 / CE. Bulk and private-label export from Pakistan.",
    name: "Canadian Gloves",
    img: "canadianglove1.png",
    desc: "Cold weather protection with superior insulation",
    images: ["canadianglove1.png", "canadianglove2.png", "canadianglove3.png", "canadianglove4.png"],
    features: ["Thermal insulation", "Waterproof exterior", "Wind resistant", "Extended wrist coverage", "Reinforced palm", "Reflective strips"],
    applications: ["Cold weather work", "Outdoor construction", "Winter maintenance", "Arctic operations", "Ice work"],
    specifications: {
      "Material": "Insulated leather and synthetic",
      "Temperature Rating": "Down to -40°C",
      "Sizes": "M, L, XL",
      "Standards": "EN 388, CE Marking",
      "Color": "Black, Brown",
    }
  },
  "boxing-gloves": {
    seoTitle: "Leather Boxing Gloves Manufacturer | 12–16oz OEM | Handcare",
    metaDescription: "Professional leather boxing gloves for training and competition in 12, 14 and 16oz. Custom branding and private label from Sialkot, Pakistan.",
    name: "Boxing Gloves",
    img: "boxing1.png",
    desc: "Professional-grade boxing gloves for training and competition",
    images: ["boxing1.png", "boxing2.png", "boxing3.png", "boxing4.png"],
    features: ["Impact protection", "Secure wrist support", "Breathable design", "Durable construction", "Ergonomic fit", "Shock absorption"],
    applications: ["Boxing training", "Martial arts", "Fitness workouts", "Competition", "Sparring"],
    specifications: {
      "Material": "Premium leather and synthetic",
      "Weight": "12oz, 14oz, 16oz",
      "Sizes": "S, M, L, XL",
      "Standards": "CE Marking",
      "Color": "Red, Blue, Black",
    }
  },
  "driving-gloves": {
    seoTitle: "Leather Driving Gloves Manufacturer | Goatskin & Cowhide | Handcare",
    metaDescription: "Unlined soft-grain goatskin and cowhide driving gloves with secure wrist closure, in four colours. CE marked. OEM and wholesale export from Sialkot.",
    name: "Driving Gloves",
    img: "driving1.png",
    desc: "Soft grain leather gloves for precise steering feel and all-day comfort",
    images: ["driving1.png", "driving2.png", "driving3.png", "driving4.png"],
    features: ["Soft grain leather", "Close-fitting dexterity", "Breathable back", "Secure wrist closure", "Reinforced palm", "Unlined for feel"],
    applications: ["Driving", "Chauffeur and fleet use", "Motorsport", "Classic and vintage motoring", "Delivery driving"],
    specifications: {
      "Material": "Soft grain goatskin and cowhide",
      "Sizes": "S, M, L, XL",
      "Standards": "CE Marking",
      "Color": "White, Red, Tan, Black",
    }
  },
}


export function getProduct(id: string): Product | undefined {
  return Object.prototype.hasOwnProperty.call(products, id) ? products[id] : undefined
}
