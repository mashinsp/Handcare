"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const products = [
  { 
    id: "working-gloves",
    name: "Working Gloves", 
    img: "workingglove1.png", 
    desc: "Heavy-duty protection for construction and general work",
    images: ["workingglove1.png", "workingglove2.png", "workingglove3.png", "workingglove4.png"],
    features: ["Cut-resistant materials", "Enhanced grip", "Durable construction", "Comfortable fit"],
    applications: ["Construction", "General maintenance", "Warehouse operations", "Material handling"]
  },
  { 
    id: "welding-gloves",
    name: "Welding Gloves", 
    img: "weldinggloves1.png", 
    desc: "Heat and flame-resistant gloves for welding operations",
    images: ["weldinggloves1.png", "weldinggloves2.png", "weldinggloves3.png", "weldinggloves4.png"],
    features: ["Heat resistance up to 500°C", "Flame retardant", "Heavy-duty leather", "Extended cuff protection"],
    applications: ["Welding operations", "Foundry work", "Metal fabrication", "High-temperature environments"]
  },
  { 
    id: "mechanical-gloves",
    name: "Mechanical Gloves", 
    img: "mechanicalglove1.png", 
    desc: "Precision grip and cut resistance for mechanical work",
    images: ["mechanicalglove1.png", "mechanicalglove2.png", "mechanicalglove3.png", "mechanicalglove4.png"],
    features: ["Cut level 5 protection", "Precision touch", "Oil and water resistant", "Breathable design"],
    applications: ["Automotive repair", "Machinery maintenance", "Assembly work", "Precision tasks"]
  },
  { 
    id: "gardening-gloves",
    name: "Gardening Gloves", 
    img: "gardening1.png", 
    desc: "Comfortable protection for gardening and landscaping",
    images: ["gardening1.png", "gardening2.png", "gardening3.png", "gardening4.png"],
    features: ["Puncture resistant", "Waterproof coating", "Breathable fabric", "Flexible design"],
    applications: ["Gardening", "Landscaping", "Agriculture", "Outdoor maintenance"]
  },
  { 
    id: "riding-gloves",
    name: "Riding Gloves", 
    img: "riding1.png", 
    desc: "Flexible and durable gloves for equestrian activities",
    images: ["riding1.png", "riding2.png", "riding3.png", "riding4.png"],
    features: ["Enhanced grip", "Weather protection", "Flexible fit", "Durable leather"],
    applications: ["Equestrian sports", "Horseback riding", "Stable work", "Outdoor activities"]
  },
  { 
    id: "canadian-gloves",
    name: "Canadian Gloves", 
    img: "canadianglove1.png", 
    desc: "Cold weather protection with superior insulation",
    images: ["canadianglove1.png", "canadianglove2.png", "canadianglove3.png", "canadianglove4.png"],
    features: ["Thermal insulation", "Waterproof exterior", "Wind resistant", "Extended wrist coverage"],
    applications: ["Cold weather work", "Outdoor construction", "Winter maintenance", "Arctic operations"]
  },
  { 
    id: "boxing-gloves",
    name: "Boxing Gloves", 
    img: "boxing1.png", 
    desc: "Professional-grade boxing gloves for training and competition",
    images: ["boxing1.png", "boxing2.png", "boxing3.png", "boxing4.png"],
    features: ["Impact protection", "Secure wrist support", "Breathable design", "Durable construction"],
    applications: ["Boxing training", "Martial arts", "Fitness workouts", "Competition"]
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen relative"
         style={{
           background: 'linear-gradient(180deg, oklch(0.99 0.002 100) 0%, oklch(0.98 0.005 95) 50%, oklch(0.99 0.002 100) 100%)'
         }}>
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0"
           style={{
             backgroundImage: 'radial-gradient(circle at 1px 1px, oklch(0.50 0.15 220 / 0.12) 1px, transparent 0)',
             backgroundSize: '28px 28px'
           }}></div>
      
      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-20 px-4 sm:px-6 relative z-10 bg-gradient-warm pattern-dots">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gradient-primary"
          >
            Our Product Range
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: 'oklch(0.40 0.01 240)' }}
          >
            Explore our comprehensive collection of premium hand protection solutions. Each product is engineered for specific applications and tested to meet international safety standards.
          </motion.p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10"
               style={{
                 background: 'oklch(0.98 0.008 85)'
               }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col group hover:shadow-primary-lg"
                     style={{
                       background: 'linear-gradient(to bottom, oklch(1 0 0), oklch(0.99 0.002 100))',
                       border: '1px solid oklch(0.90 0.008 100)',
                       boxShadow: '0 1px 3px 0 oklch(0.45 0.15 220 / 0.05)'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.borderColor = 'oklch(0.50 0.15 220)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.borderColor = 'oklch(0.90 0.008 100)';
                     }}>
                  <Link
                    href={`/products/${product.id}`}
                    className="flex flex-col flex-grow cursor-pointer"
                  >
                    <div className="h-64 flex items-center justify-center p-4 relative overflow-hidden transition-all duration-300"
                         style={{
                           background: 'linear-gradient(135deg, oklch(0.99 0.002 100) 0%, oklch(0.97 0.008 220) 100%)'
                         }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                           style={{
                             background: 'linear-gradient(135deg, oklch(0.50 0.15 220 / 0.05) 0%, oklch(0.65 0.18 65 / 0.05) 100%)'
                           }}></div>
                      <img 
                        src={`/${product.img}`} 
                        alt={product.name}
                        className="max-w-full max-h-full object-contain relative z-10"
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col relative z-10">
                      <h3 className="text-lg font-bold mb-2 text-gradient-primary group-hover:text-[oklch(0.45_0.15_220)] transition-colors"
                          style={{ color: 'oklch(0.25 0.01 240)' }}>{product.name}</h3>
                      <p className="text-sm mb-4 flex-grow"
                         style={{ color: 'oklch(0.40 0.01 240)' }}>{product.desc}</p>
                      <span className="text-sm font-medium inline-flex items-center gap-1 transition-all duration-300 group-hover:gap-2"
                             style={{ color: 'oklch(0.50 0.15 220)' }}>View Details →</span>
                    </div>
                  </Link>
                  <div className="px-6 pb-6 relative z-10">
                    <Link 
                      href={`/quote?product=${product.id}`}
                      className="text-sm font-medium transition-colors hover:text-[oklch(0.50_0.15_220)]"
                      style={{ color: 'oklch(0.40 0.01 240)' }}
                    >
                      Request Quote
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Product Gallery - All 24 Images */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10"
               style={{
                 background: 'oklch(0.98 0.008 85)'
               }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gradient-primary">Complete Product Gallery</h2>
            <p className="max-w-2xl mx-auto"
               style={{ color: 'oklch(0.40 0.01 240)' }}>
              Browse through all product variants across our categories. Each product is available in multiple variants to suit different requirements.
            </p>
          </motion.div>

          <div className="space-y-16">
            {products.map((product, categoryIndex) => (
              <div key={product.id}>
                <h3 className="text-2xl font-bold mb-6 text-gradient-primary">{product.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {product.images.map((img, imgIndex) => (
                    <Link key={imgIndex} href={`/products/${product.id}?variant=${imgIndex + 1}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (imgIndex * 0.05) }}
                        viewport={{ once: true }}
                      >
                        <div className="rounded-xl p-4 hover:shadow-primary transition-all duration-300 cursor-pointer group"
                             style={{
                               background: 'linear-gradient(to bottom, oklch(1 0 0), oklch(0.99 0.002 100))',
                               border: '1px solid oklch(0.90 0.008 100)',
                               boxShadow: '0 1px 3px 0 oklch(0.45 0.15 220 / 0.05)'
                             }}
                             onMouseEnter={(e) => {
                               e.currentTarget.style.borderColor = 'oklch(0.50 0.15 220)';
                             }}
                             onMouseLeave={(e) => {
                               e.currentTarget.style.borderColor = 'oklch(0.90 0.008 100)';
                             }}>
                          <div className="h-48 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden transition-all duration-300"
                               style={{
                                 background: 'linear-gradient(135deg, oklch(0.99 0.002 100) 0%, oklch(0.97 0.008 220) 100%)'
                               }}>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                 style={{
                                   background: 'linear-gradient(135deg, oklch(0.50 0.15 220 / 0.05) 0%, oklch(0.65 0.18 65 / 0.05) 100%)'
                                 }}></div>
                            <img 
                              src={`/${img}`}
                              alt={`${product.name} - Variant ${imgIndex + 1}`}
                              className="max-w-full max-h-full object-contain relative z-10"
                            />
                          </div>
                          <p className="text-sm font-medium text-center transition-colors group-hover:text-[oklch(0.50_0.15_220)]"
                             style={{ color: 'oklch(0.25 0.01 240)' }}>
                            {product.name} - Variant {imgIndex + 1}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10"
               style={{
                 background: 'oklch(0.98 0.008 85)'
               }}>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gradient-primary">Need Help Choosing?</h2>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base"
             style={{ color: 'oklch(0.40 0.01 240)' }}>
            Our team is here to help you find the perfect hand protection solution for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/quote"
              className="px-8 py-3 text-white text-sm rounded-full transition-all duration-300 btn-gradient glow-accent-hover relative overflow-hidden font-medium"
              style={{
                background: 'linear-gradient(135deg, oklch(0.65 0.18 65), oklch(0.70 0.15 40))'
              }}
            >
              Request a Quote
            </Link>
            <Link 
              href="/#contact"
              className="px-8 py-3 border-2 text-sm rounded-full font-medium transition-all duration-300 glow-primary-hover"
              style={{
                borderColor: 'oklch(0.45 0.15 220)',
                color: 'oklch(0.45 0.15 220)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, oklch(0.45 0.15 220), oklch(0.55 0.15 160))';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'oklch(0.45 0.15 220)';
                e.currentTarget.style.borderColor = 'oklch(0.45 0.15 220)';
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

