"use client"

import React, { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const products = {
  "working-gloves": {
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
}

function ProductDetailContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const productId = params.id as string
  const product = products[productId as keyof typeof products]
  const variantParam = searchParams.get('variant')
  
  // Initialize with variant from URL or first image
  const getInitialImage = () => {
    if (variantParam && product) {
      const variantIndex = parseInt(variantParam) - 1
      if (variantIndex >= 0 && variantIndex < product.images.length) {
        return product.images[variantIndex]
      }
    }
    return product?.images[0] || product?.img
  }
  
  const [selectedImage, setSelectedImage] = useState(getInitialImage())

  // Update selected image when variant param changes
  useEffect(() => {
    if (variantParam && product) {
      const variantIndex = parseInt(variantParam) - 1
      if (variantIndex >= 0 && variantIndex < product.images.length) {
        setSelectedImage(product.images[variantIndex])
      }
    }
  }, [variantParam, product])

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-gray-600 hover:text-gray-900">
            ← Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="pt-28 sm:pt-36 pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-900">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div>
              <div className="mb-4 bg-gray-100 rounded-2xl p-4 sm:p-8 flex items-center justify-center h-[300px] sm:h-[400px] lg:h-[500px]">
                <img 
                  src={`/${selectedImage}`}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <Link
                    key={i}
                    href={`/products/${productId}?variant=${i + 1}`}
                    className={`bg-gray-100 rounded-lg p-2 h-24 flex items-center justify-center border-2 transition-all hover:scale-105 ${
                      selectedImage === img ? 'border-gray-900 shadow-md' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={`/${img}`}
                      alt={`${product.name} variant ${i + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </Link>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">Click thumbnails to view different variants</p>
            </div>

            {/* Product Info */}
            <div>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              >
                {product.name}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8"
              >
                {product.desc}
              </motion.p>

              {/* Features */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Specifications */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mb-8 p-6 bg-gray-50 rounded-xl"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Specifications</h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">{key}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Applications */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {app}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/quote?product=${productId}`}
                  className="flex-1 px-6 py-3 bg-gray-900 text-white text-center rounded-full hover:bg-gray-800 transition-colors"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/#contact"
                  className="flex-1 px-6 py-3 border-2 border-gray-900 text-gray-900 text-center rounded-full hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(products)
              .filter(([id]) => id !== productId)
              .slice(0, 3)
              .map(([id, prod]) => (
                <Link key={id} href={`/products/${id}`}>
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                      <img 
                        src={`/${prod.img}`}
                        alt={prod.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{prod.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{prod.desc}</p>
                      <span className="text-sm text-gray-900 font-medium">View Details →</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ProductDetailContent />
    </Suspense>
  )
}

