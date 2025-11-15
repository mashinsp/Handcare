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
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
          >
            Request a Quote
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-gray-600 text-base sm:text-lg"
          >
            Get competitive pricing for bulk orders. Our team will respond within 24 hours with a detailed quote tailored to your requirements.
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Submitted!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your interest. Our team will contact you within 24 hours with a detailed quote.
              </p>
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
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
              className="bg-white border border-gray-200 rounded-2xl p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-900 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-900 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-900 mb-2">
                    Estimated Quantity *
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="e.g., 1000 pairs, 5000 pairs"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                    Additional Requirements or Questions
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                    className="w-full px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Quote Request'}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to be contacted by Handcare regarding your quote request.
                </p>
              </form>
            </motion.div>
          )}

          {/* Contact Info */}
          <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Prefer to Contact Directly?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Phone</p>
                <p className="text-gray-600">+92 3024002921</p>
                <p className="text-gray-600">+92 3014264385</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Email</p>
                <p className="text-gray-600">handcare514@gmail.com</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Address</p>
                <p className="text-gray-600">Industrial Area, Sialkot 51310<br />Punjab, Pakistan</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Business Hours</p>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM<br />PKT (Pakistan Standard Time)</p>
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <QuoteForm />
    </Suspense>
  )
}

