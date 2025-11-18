"use client"

import React, { useState, Suspense } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const products = {
  "working-gloves": "Working Gloves",
  "welding-gloves": "Welding Gloves",
  "mechanical-gloves": "Mechanical Gloves",
  "gardening-gloves": "Gardening Gloves",
  "riding-gloves": "Riding Gloves",
  "canadian-gloves": "Canadian Gloves",
}

function QuoteForm() {
  const searchParams = useSearchParams()
  const productParam = searchParams.get('product')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    product: productParam || "",
    quantity: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send quote request')
      }

      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        product: productParam || "",
        quantity: "",
        message: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gradient-primary"
          >
            Request a Quote
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-base sm:text-lg"
            style={{ color: 'oklch(0.40 0.01 240)' }}
          >
            Get competitive pricing for bulk orders. Our team will respond within 24 hours with a detailed quote tailored to your requirements.
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10"
               style={{
                 background: 'oklch(0.98 0.008 85)'
               }}>
        <div className="max-w-3xl mx-auto relative z-10">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-8 text-center shadow-primary-lg"
              style={{
                background: 'linear-gradient(135deg, oklch(0.96 0.01 140) 0%, oklch(0.97 0.01 120) 100%)',
                border: '1px solid oklch(0.70 0.12 140)'
              }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-primary"
                   style={{
                     background: 'linear-gradient(135deg, oklch(0.70 0.12 140), oklch(0.75 0.12 120))'
                   }}>
                <svg className="w-8 h-8"
                     style={{ color: 'oklch(0.50 0.15 220)' }}
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gradient-primary">Quote Request Submitted!</h2>
              <p className="mb-6"
                 style={{ color: 'oklch(0.40 0.01 240)' }}>
                Thank you for your interest. Our team will contact you within 24 hours with a detailed quote.
              </p>
              <Link
                href="/products"
                className="inline-block px-6 py-3 text-white rounded-full transition-all duration-300 btn-gradient glow-accent-hover relative overflow-hidden font-medium"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.65 0.18 65), oklch(0.70 0.15 40))'
                }}
              >
                Browse More Products
              </Link>
            </motion.div>
          ) : (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="rounded-2xl p-8 shadow-primary border"
              style={{
                background: 'linear-gradient(to bottom, oklch(1 0 0), oklch(0.99 0.002 100))',
                border: '1px solid oklch(0.90 0.008 100)',
                boxShadow: '0 4px 20px -5px oklch(0.45 0.15 220 / 0.1)'
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2"
                           style={{ color: 'oklch(0.25 0.01 240)' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{
                        border: '1px solid oklch(0.90 0.008 100)',
                        backgroundColor: 'oklch(0.99 0.002 100)',
                        color: 'oklch(0.25 0.01 240)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'oklch(0.50 0.15 220)';
                        e.currentTarget.style.boxShadow = '0 0 0 2px oklch(0.50 0.15 220 / 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'oklch(0.90 0.008 100)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2"
                           style={{ color: 'oklch(0.25 0.01 240)' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{
                        border: '1px solid oklch(0.90 0.008 100)',
                        backgroundColor: 'oklch(0.99 0.002 100)',
                        color: 'oklch(0.25 0.01 240)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'oklch(0.50 0.15 220)';
                        e.currentTarget.style.boxShadow = '0 0 0 2px oklch(0.50 0.15 220 / 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'oklch(0.90 0.008 100)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2"
                           style={{ color: 'oklch(0.25 0.01 240)' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{
                        border: '1px solid oklch(0.90 0.008 100)',
                        backgroundColor: 'oklch(0.99 0.002 100)',
                        color: 'oklch(0.25 0.01 240)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'oklch(0.50 0.15 220)';
                        e.currentTarget.style.boxShadow = '0 0 0 2px oklch(0.50 0.15 220 / 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'oklch(0.90 0.008 100)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2"
                           style={{ color: 'oklch(0.25 0.01 240)' }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{
                        border: '1px solid oklch(0.90 0.008 100)',
                        backgroundColor: 'oklch(0.99 0.002 100)',
                        color: 'oklch(0.25 0.01 240)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'oklch(0.50 0.15 220)';
                        e.currentTarget.style.boxShadow = '0 0 0 2px oklch(0.50 0.15 220 / 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'oklch(0.90 0.008 100)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-2"
                           style={{ color: 'oklch(0.25 0.01 240)' }}>
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{
                        border: '1px solid oklch(0.90 0.008 100)',
                        backgroundColor: 'oklch(0.99 0.002 100)',
                        color: 'oklch(0.25 0.01 240)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'oklch(0.50 0.15 220)';
                        e.currentTarget.style.boxShadow = '0 0 0 2px oklch(0.50 0.15 220 / 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'oklch(0.90 0.008 100)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="United States"
                    />
                  </div>
                  <div>
                    <label htmlFor="product" className="block text-sm font-medium text-gray-900 mb-2">
                      Product of Interest *
                    </label>
                    <select
                      id="product"
                      name="product"
                      required
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{
                        border: '1px solid oklch(0.90 0.008 100)',
                        backgroundColor: 'oklch(0.99 0.002 100)',
                        color: 'oklch(0.25 0.01 240)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'oklch(0.50 0.15 220)';
                        e.currentTarget.style.boxShadow = '0 0 0 2px oklch(0.50 0.15 220 / 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'oklch(0.90 0.008 100)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <option value="">Select a product</option>
                      {Object.entries(products).map(([id, name]) => (
                        <option key={id} value={id}>{name}</option>
                      ))}
                      <option value="multiple">Multiple Products</option>
                      <option value="custom">Custom Requirements</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium mb-2"
                         style={{ color: 'oklch(0.25 0.01 240)' }}>
                    Estimated Quantity *
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{
                      border: '1px solid oklch(0.90 0.008 100)',
                      backgroundColor: 'oklch(0.99 0.002 100)',
                      color: 'oklch(0.25 0.01 240)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'oklch(0.50 0.15 220)';
                      e.currentTarget.style.boxShadow = '0 0 0 2px oklch(0.50 0.15 220 / 0.2)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'oklch(0.90 0.008 100)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    placeholder="e.g., 1000 pairs, 5000 pairs"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2"
                         style={{ color: 'oklch(0.25 0.01 240)' }}>
                    Additional Requirements or Questions
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{
                      border: '1px solid oklch(0.90 0.008 100)',
                      backgroundColor: 'oklch(0.99 0.002 100)',
                      color: 'oklch(0.25 0.01 240)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'oklch(0.50 0.15 220)';
                      e.currentTarget.style.boxShadow = '0 0 0 2px oklch(0.50 0.15 220 / 0.2)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'oklch(0.90 0.008 100)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    placeholder="Please provide any specific requirements, customization needs, or questions..."
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 text-white rounded-full transition-all duration-300 btn-gradient glow-accent-hover relative overflow-hidden font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: isSubmitting ? 'oklch(0.70 0.01 240)' : 'linear-gradient(135deg, oklch(0.65 0.18 65), oklch(0.70 0.15 40))'
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Quote Request'}
                  </button>
                </div>

                <p className="text-xs text-center"
                   style={{ color: 'oklch(0.45 0.01 240)' }}>
                  By submitting this form, you agree to be contacted by Handcare regarding your quote request.
                </p>
              </form>
            </motion.div>
          )}

          {/* Contact Info */}
          <div className="mt-12 p-8 rounded-2xl shadow-primary border"
               style={{
                 background: 'linear-gradient(135deg, oklch(0.98 0.01 220) 0%, oklch(0.97 0.008 220) 100%)',
                 border: '1px solid oklch(0.90 0.008 100)'
               }}>
            <h3 className="text-xl font-bold mb-4 text-gradient-primary">Prefer to Contact Directly?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium mb-2"
                   style={{ color: 'oklch(0.25 0.01 240)' }}>Phone</p>
                <p className="transition-colors hover:text-[oklch(0.50_0.15_220)]"
                   style={{ color: 'oklch(0.40 0.01 240)' }}>+92 3024002921</p>
                <p className="transition-colors hover:text-[oklch(0.50_0.15_220)]"
                   style={{ color: 'oklch(0.40 0.01 240)' }}>+92 3014264385</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2"
                   style={{ color: 'oklch(0.25 0.01 240)' }}>Email</p>
                <p className="transition-colors hover:text-[oklch(0.50_0.15_220)]"
                   style={{ color: 'oklch(0.40 0.01 240)' }}>handcare514@gmail.com</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2"
                   style={{ color: 'oklch(0.25 0.01 240)' }}>Address</p>
                <p style={{ color: 'oklch(0.40 0.01 240)' }}>Industrial Area, Sialkot 51310<br />Punjab, Pakistan</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2"
                   style={{ color: 'oklch(0.25 0.01 240)' }}>Business Hours</p>
                <p style={{ color: 'oklch(0.40 0.01 240)' }}>Monday - Friday: 9:00 AM - 6:00 PM<br />PKT (Pakistan Standard Time)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center relative"
           style={{
             background: 'linear-gradient(180deg, oklch(0.99 0.002 100) 0%, oklch(0.98 0.005 95) 50%, oklch(0.99 0.002 100) 100%)'
           }}>
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
               style={{
                 borderColor: 'oklch(0.45 0.15 220)',
                 borderTopColor: 'transparent'
               }}></div>
          <p style={{ color: 'oklch(0.40 0.01 240)' }}>Loading...</p>
        </div>
      </div>
    }>
      <QuoteForm />
    </Suspense>
  )
}

