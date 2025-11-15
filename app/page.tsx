"use client"

import React, { useState, useEffect } from "react"
import { motion, type Variants } from "framer-motion"
import Link from "next/link"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

// Sticky Center Div with Scroll Reveal Effect
function StickyCenterDiv() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const productImages = [
    { src: "/workingglove1.png", alt: "Working Gloves" },
    { src: "/weldinggloves1.png", alt: "Welding Gloves" },
    { src: "/mechanicalglove1.png", alt: "Mechanical Gloves" },
    { src: "/gardening1.png", alt: "Gardening Gloves" },
    { src: "/riding1.png", alt: "Riding Gloves" },
    { src: "/canadianglove1.png", alt: "Canadian Gloves" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const heroVisionSection = document.getElementById('hero-vision')
      if (!heroVisionSection) return

      const rect = heroVisionSection.getBoundingClientRect()
      const sectionTop = rect.top + window.scrollY
      const sectionHeight = rect.height
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight

      // Calculate progress from when section enters viewport to when it exits
      const startPoint = sectionTop - viewportHeight + 300
      const endPoint = sectionTop + sectionHeight - viewportHeight - 200
      const totalScroll = endPoint - startPoint

      if (scrollPosition < startPoint) {
        setScrollProgress(0)
        setCurrentImageIndex(0)
      } else if (scrollPosition > endPoint) {
        setScrollProgress(1)
        setCurrentImageIndex(productImages.length - 1)
      } else {
        const progress = (scrollPosition - startPoint) / totalScroll
        setScrollProgress(Math.min(Math.max(progress, 0), 1))
        
        // Change image based on scroll progress
        const imageIndex = Math.floor(progress * (productImages.length - 1))
        setCurrentImageIndex(Math.min(imageIndex, productImages.length - 1))
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    return () => window.removeEventListener('scroll', handleScroll)
  }, [productImages.length])

  return (
    <div className="sticky top-20 sm:top-28">
      <div className="relative h-[400px] sm:h-[480px] lg:h-[560px] flex items-start justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full max-w-[320px] sm:max-w-[360px] lg:w-[380px] h-[360px] sm:h-[440px] lg:h-[500px]
                     bg-linear-to-br from-gray-50 via-gray-100 to-gray-50
                     rounded-3xl opacity-70 shadow-lg overflow-hidden relative"
        >
          {/* Background decorative elements */}
          <div className="absolute bottom-8 right-8 w-32 h-32 bg-white/40 rounded-full blur-xl" />
          <div className="absolute top-12 left-12 w-24 h-24 bg-purple-200/30 rounded-full blur-lg" />
          
          {/* Scroll-revealing image container */}
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="relative w-full h-full">
              {/* Only show current image */}
              {productImages.map((img, index) => {
                const isActive = index === currentImageIndex
                
                if (!isActive) return null
                
                return (
                  <motion.div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img 
                        src={img.src}
                        alt={img.alt}
                        className="max-w-full max-h-full object-contain drop-shadow-2xl"
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Progress indicator dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {productImages.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'w-8 bg-white/90'
                    : index < currentImageIndex
                    ? 'w-2 bg-white/60'
                    : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const fade: Variants = {
  hidden: { opacity: 0 },
  show:  { opacity: 1, transition: { duration: 0.6 } },
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="space-y-4"
    >
      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-800 font-medium">Thank you! Your message has been sent successfully.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      )}
    </motion.div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[520px] pt-28 sm:pt-32 pb-10">
      {/* <div className="pointer-events-none absolute inset-0 z-0">
    <div className="h-full w-full 
                    bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:18px_18px]" />
    <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white via-white/80 to-transparent" />
  </div> */}
        <div className="relative px-4 sm:px-6">
          <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
                Premium Hand Protection Solutions from Sialkot, Pakistan
              </h1>
              <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed px-2">
                Handcare is a leading manufacturer of high-quality industrial and safety gloves, proudly based in Sialkot, Pakistan. With decades of expertise, we deliver superior hand protection solutions trusted by professionals worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <Link href="/products" className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-gray-900 text-gray-900 text-sm rounded-full hover:bg-gray-900 hover:text-white transition-colors">
                  Explore Our Products
                </Link>
                <a 
                  href="/handcare_catalogue.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
                >
                  View Catalogue
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero-Vision combined section with sticky center */}
{/* DECORATIVE SHAPES + VISION (center starts between side shapes) */}
{/* DECORATIVE SHAPES + PRE-RUNWAY + VISION (+ optional post-runway) */}
<section id="hero-vision" className="relative px-4 sm:px-6">
<div className="pointer-events-none absolute inset-0 z-0">
    <div className="h-full w-full 
                    bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-size-[18px_18px]" />
    <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-white via-white/80 to-transparent" />
  </div>
  <div
    className="max-w-7xl mx-auto grid
               grid-cols-1
               lg:grid-cols-[1fr_minmax(420px,560px)_1fr]
               /* ↓ reduced pre- and post-runway heights ↓ */
               lg:grid-rows-[500px_minmax(120px,28vh)_auto_minmax(100px,18vh)]
               gap-x-6 lg:gap-x-12 gap-y-8 lg:gap-y-12">

    {/* ROW 1: SHAPES STAGE */}
    <div className="hidden lg:block row-start-1 col-span-3 relative h-[500px]">
      {/* Left Side Shape with Glove Image */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        viewport={{ once: true, amount: 0.2 }}
        className="absolute top-[220px] right-[220%] w-[300px] h-[220px]
                   bg-linear-to-br from-gray-50 via-gray-100 to-gray-50
                   rounded-3xl opacity-80 overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <img 
            src="/weldinggloves2.png" 
            alt="Welding Gloves"
            className="max-w-full max-h-full object-contain opacity-90"
          />
        </div>
        <div className="absolute top-4 left-4 w-16 h-16 bg-white/60 rounded-full blur-sm" />
      </motion.div>
      
      {/* Right Side Shape with Glove Image */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        viewport={{ once: true, amount: 0.2 }}
        className="absolute top-[80px] right-[74%] w-[280px] h-[220px]
                   bg-linear-to-br from-gray-50 via-gray-100 to-gray-50
                   rounded-3xl opacity-80 shadow-md z-10 overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <img 
            src="/mechanicalglove3.png" 
            alt="Mechanical Gloves"
            className="max-w-full max-h-full object-contain opacity-90"
          />
        </div>
        <div className="absolute top-6 right-6 w-20 h-20 bg-white/50 rounded-full" />
      </motion.div>
    </div>

    {/* CENTER STICKY with Scroll Reveal Effect */}
    <div className="row-start-1 row-span-4 lg:col-start-2">
      <StickyCenterDiv />
    </div>

    {/* ROW 2: PRE-RUNWAY (shortened) */}
    <div className="row-start-2 col-span-3" aria-hidden />

    {/* ROW 3: VISION */}
    <div className="row-start-3 lg:col-start-1 z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-xl h-[200px] sm:h-[240px] lg:h-[260px] bg-gray-100 rounded-3xl flex items-center justify-center p-4"
      >
        <img 
          src="/workingglove3.png" 
          alt="Handcare Quality Gloves"
          className="max-w-full max-h-full object-contain"
        />
      </motion.div>
    </div>

    <div className="row-start-3 lg:col-start-3 z-10" id="about">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-xl lg:ml-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Vision</h2>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          To become the global leader in hand protection solutions by combining traditional craftsmanship from Sialkot with modern manufacturing excellence. We envision a world where every worker has access to reliable, high-quality gloves that ensure safety and productivity.
        </p>
      </motion.div>
    </div>

    {/* ROW 4: POST-RUNWAY (shortened) */}
    <div className="row-start-4 col-span-3" aria-hidden />
  </div>
</section>




      {/* About / KPIs */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">About Handcare</h2>
            <p className="text-gray-600 mb-8 sm:mb-12 max-w-2xl text-sm sm:text-base">
              Established in the heart of Sialkot, Pakistan—the world&apos;s largest manufacturing hub for sports and safety goods—Handcare has been producing premium quality gloves for over two decades. Our state-of-the-art facility combines traditional craftsmanship with modern technology to deliver products that meet international quality standards. We are ISO 9001:2015 certified and comply with CE, ANSI, and EN standards, ensuring our gloves provide superior protection across various industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-8 mb-8">
            {[
              { n: "25+", desc: "Years of Excellence" },
              { n: "50+", desc: "Countries Served" },
              { n: "500K+", desc: "Pairs Produced Annually" },
              { n: "ISO", desc: "9001:2015 Certified" },
            ].map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <p className="text-4xl font-bold text-gray-900 mb-2">{kpi.n}</p>
                <p className="text-sm text-gray-600">
                  {kpi.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product */}
      <section className="py-12 sm:py-20 px-4 sm:px-6" id="product">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Product Range</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Handcare offers a comprehensive range of protective gloves designed for various industries and applications. Each product is engineered with precision and tested for durability, comfort, and maximum protection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: "working-gloves", name: "Working Gloves", img: "workingglove1.png", desc: "Heavy-duty protection for construction and general work" },
              { id: "welding-gloves", name: "Welding Gloves", img: "weldinggloves1.png", desc: "Heat and flame-resistant gloves for welding operations" },
              { id: "mechanical-gloves", name: "Mechanical Gloves", img: "mechanicalglove1.png", desc: "Precision grip and cut resistance for mechanical work" },
              { id: "gardening-gloves", name: "Gardening Gloves", img: "gardening1.png", desc: "Comfortable protection for gardening and landscaping" },
              { id: "riding-gloves", name: "Riding Gloves", img: "riding1.png", desc: "Flexible and durable gloves for equestrian activities" },
              { id: "canadian-gloves", name: "Canadian Gloves", img: "canadianglove1.png", desc: "Cold weather protection with superior insulation" },
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="h-64 bg-gray-100 flex items-center justify-center p-4">
                    <img 
                      src={`/${product.img}`} 
                      alt={product.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{product.desc}</p>
                    <span className="text-sm text-gray-900 font-medium hover:text-gray-700">
                      View Details →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/products"
              className="inline-block px-8 py-3 border-2 border-gray-900 text-gray-900 text-sm rounded-full hover:bg-gray-900 hover:text-white transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Resources / Categories */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50" id="resources">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 text-center"
          >
            Product Categories
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Industrial Safety", 
                img: "workingglove2.png",
                desc: "Comprehensive protection for industrial workers with cut-resistant and impact protection features." 
              },
              { 
                title: "Specialized Protection", 
                img: "weldinggloves2.png",
                desc: "Heat-resistant and flame-retardant gloves for specialized applications in welding and foundries." 
              },
              { 
                title: "Outdoor & Sports", 
                img: "riding2.png",
                desc: "Durable gloves designed for outdoor activities, sports, and recreational use with weather protection." 
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true, amount: 0.25 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                  <img 
                    src={`/${item.img}`} 
                    alt={item.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12"
          >
            Testimonials
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Handcare gloves have been our go-to supplier for over 5 years. The quality is consistently excellent, and their delivery times are always reliable. Our workers trust these gloves for their daily operations.",
                name: "Ahmed Hassan",
                company: "Industrial Safety Solutions, UAE"
              },
              {
                quote: "We've tried many suppliers, but Handcare stands out for their attention to detail and commitment to meeting international standards. Their welding gloves have significantly reduced workplace injuries in our facility.",
                name: "Sarah Johnson",
                company: "Global Manufacturing Co., USA"
              },
              {
                quote: "As a distributor, I appreciate Handcare's competitive pricing and consistent quality. Their products meet all our certification requirements, and our customers are always satisfied with the durability and comfort.",
                name: "Michael Chen",
                company: "Safety Equipment Distributors, Singapore"
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true, amount: 0.25 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <p className="text-sm text-gray-600 mb-6">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 sm:py-20 px-4 sm:px-6" id="contact">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Get in touch</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Ready to find the perfect hand protection solution for your needs? Contact our team in Sialkot, Pakistan. We&apos;re here to help you choose the right gloves and provide competitive pricing for bulk orders. Let&apos;s discuss how Handcare can meet your requirements.
            </p>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <p className="font-medium text-gray-900 mb-1">Phone:</p>
                <a href="tel:+923014264385" className="text-gray-600 hover:text-gray-900 transition-colors">+92 301 426 4385</a>
                <br />
                <a href="tel:+923024002921" className="text-gray-600 hover:text-gray-900 transition-colors">+92 302 400 2921</a>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Email:</p>
                <a href="mailto:handcare514@gmail.com" className="text-gray-600 hover:text-gray-900 transition-colors">handcare514@gmail.com</a>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Follow Us:</p>
                <a 
                  href="https://www.instagram.com/hand_care14?igsh=MXRwb2VxdHZ1aGdobw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1"
                >
                  Instagram
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <div className="mt-4">
                <p className="font-medium text-gray-900 mb-1">Address:</p>
                <p>Industrial Area, Sialkot 51310<br />Punjab, Pakistan</p>
              </div>
            </div>
          </motion.div>

          <ContactForm />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Ready to Partner with Handcare?</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Join hundreds of satisfied customers worldwide who trust Handcare for their hand protection needs. Request a quote today and discover why we&apos;re the preferred choice for quality gloves from Sialkot, Pakistan.
          </p>
          <Link href="/quote" className="px-8 py-3 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-colors inline-block">
            Request a Quote
          </Link>
        </motion.div>
      </section>

    </div>
  )
}

export default App
