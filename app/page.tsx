"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, type Variants } from "framer-motion"
import Link from "next/link"
import { FlipCard } from "@/components/animate-ui/components/community/flip-card"
import HeroScrollExpand from "@/components/hero-scroll-expand"
import NotchedPhoto from "@/components/notched-photo"
import LeatherTimeline from "@/components/leather-timeline"
import { Hand, ShieldCheck } from "lucide-react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

const productImages = [
  { src: "/workingglove1.png", alt: "Working Gloves" },
  { src: "/weldinggloves1.png", alt: "Welding Gloves" },
  { src: "/mechanicalglove1.png", alt: "Mechanical Gloves" },
  { src: "/gardening1.png", alt: "Gardening Gloves" },
  { src: "/boxing1.png", alt: "Boxing Gloves" },
  // { src: "/riding1.png", alt: "Riding Gloves" },
  { src: "/riding2.png", alt: "Riding Gloves" },
]

// The last product is reached before the card unpins, so it holds on screen for
// the tail of the section instead of flashing past right at the end.
const IMAGE_SWEEP = 0.78

// Sticky Center Div with Scroll Reveal Effect
function StickyCenterDiv({ className = "" }: { className?: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const card = cardRef.current
    if (!track || !card) return

    let raf = 0

    const read = () => {
      raf = 0
      const t = track.getBoundingClientRect()
      const c = card.getBoundingClientRect()
      // How far the card has ridden down its runway: 0 before it pins, 1 once
      // it has been carried to the bottom. The browser already clamps a sticky
      // box to its container, so no viewport or offset arithmetic is needed —
      // and the same formula holds on phones, where the runway is the card's
      // own min-height rather than the grid's row span.
      const travel = t.height - c.height
      if (travel <= 0) return
      const progress = clamp01((c.top - t.top) / travel)
      const swept = clamp01(progress / IMAGE_SWEEP)
      const next = Math.min(Math.floor(swept * productImages.length), productImages.length - 1)
      setCurrentImageIndex((prev) => (prev === next ? prev : next))
    }

    // Scroll fires far more often than a frame; collapse the bursts onto one.
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    // Runway. From lg the grid's four-row span supplies the scroll the card is
    // pinned for; below it the card carries its own.
    <div ref={trackRef} className={`relative min-h-[calc(100svh_+_900px)] lg:min-h-0 ${className}`.trim()}>
      <div
        ref={cardRef}
        // Phones pin a full-viewport box and centre the card inside it, which
        // parks it mid-screen without having to know its height. From lg this
        // is the original fixed 620px sticky wrapper.
        className="sticky top-0 flex h-svh items-center justify-center
                   lg:top-[max(6rem,calc(50vh-310px))] lg:h-[620px] lg:items-start lg:px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          // Same card as the desktop one, kept to the same 420:620 proportions
          // and shrunk only as far as the narrower of the phone's width and
          // height demands — so it reads as the identical card, not a variant.
          className="relative w-[min(100%,420px,calc((100svh-9rem)*42/62))] aspect-[42/62]
                     overflow-hidden rounded-3xl shadow-primary-lg
                     lg:aspect-auto lg:h-[620px] lg:w-[420px] xl:w-[460px]"
          style={{
            background: 'linear-gradient(135deg, oklch(0.98 0.01 220) 0%, oklch(0.96 0.012 220) 50%, oklch(0.97 0.01 200) 100%)',
            border: '1px solid oklch(0.90 0.015 220)'
          }}
        >
          {/* Scroll-revealing image container. Every product stays mounted:
              the outgoing one is cut instantly, exactly as unmounting it used
              to look, while the incoming one plays the same 0.8 -> 1 scale and
              fade. Swapping the <img> per step forced a fresh decode, which is
              what made the sequence stutter on phones. */}
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="relative w-full h-full">
              {productImages.map((img, index) => {
                const isActive = index === currentImageIndex

                return (
                  <div
                    key={img.src}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-hidden={!isActive}
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: `scale(${isActive ? 1 : 0.8})`,
                      transition: isActive ? 'opacity 500ms ease-out, transform 500ms ease-out' : 'none',
                    }}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img 
                        src={img.src}
                        alt={img.alt}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="max-w-full max-h-full object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Colored progress indicator dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {productImages.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? 'w-8 shadow-lg'
                    : index < currentImageIndex
                    ? 'w-2 opacity-60'
                    : 'w-2 opacity-30'
                }`}
                style={{
                  background: index === currentImageIndex 
                    ? 'linear-gradient(90deg, oklch(0.65 0.18 65), oklch(0.50 0.15 220))'
                    : index < currentImageIndex
                    ? 'oklch(0.50 0.15 220)'
                    : 'oklch(0.50 0.15 220)'
                }}
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
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
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
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
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
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
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
          />
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed btn-gradient glow-accent-hover relative overflow-hidden font-medium"
            style={{
              background: isSubmitting ? 'oklch(0.70 0.01 240)' : 'linear-gradient(135deg, oklch(0.51 0.18 65), oklch(0.56 0.15 40))'
            }}
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
      
      {/* Scroll-expand video hero — merged factory footage, first section */}
      <HeroScrollExpand />

      {/* Hero-Vision combined section with sticky center */}
{/* DECORATIVE SHAPES + VISION (center starts between side shapes) */}
{/* DECORATIVE SHAPES + PRE-RUNWAY + VISION (+ optional post-runway) */}
<section id="hero-vision" className="relative -mt-[14vh] px-4 pt-[14vh] pb-12 sm:px-6 sm:pb-20 lg:pb-20 z-10"
         style={{
           /* Starts transparent so it dissolves out of the hero's ground
              instead of butting against it with a hard edge. */
           background: 'linear-gradient(180deg, transparent 0%, oklch(0.988 0.004 92) 14%, oklch(0.98 0.008 85) 34%, oklch(0.98 0.008 85) 100%)'
         }}>
<div className="pointer-events-none absolute inset-0 z-0">
    <div className="h-full w-full
                    bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-size-[18px_18px]"
         style={{
           WebkitMaskImage: 'linear-gradient(180deg, transparent 0, transparent 12vh, black 34vh, black calc(100% - 34vh), transparent calc(100% - 4vh))',
           maskImage: 'linear-gradient(180deg, transparent 0, transparent 12vh, black 34vh, black calc(100% - 34vh), transparent calc(100% - 4vh))',
         }} />
  </div>

  {/* Soft veil across the join: content rises out of the hero's ground
      rather than appearing at a cut line. */}
  <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[22vh]"
       style={{
         background: 'linear-gradient(180deg, oklch(0.99 0.002 100) 0%, oklch(0.99 0.002 100 / 0.85) 35%, transparent 100%)'
       }} />
  <div
    className="relative max-w-7xl mx-auto grid
               grid-cols-1
               lg:grid-cols-[minmax(0,1fr)_minmax(420px,470px)_minmax(0,1fr)]
               xl:grid-cols-[minmax(0,1fr)_minmax(460px,520px)_minmax(0,1fr)]
               /* ↓ reduced pre- and post-runway heights ↓ */
               lg:grid-rows-[500px_minmax(120px,28vh)_auto_minmax(340px,42vh)]
               gap-y-8 lg:gap-x-16 lg:gap-y-12">

    {/* ROW 1: SHAPES STAGE */}
    <div className="hidden lg:block relative h-[500px] lg:row-start-1 lg:col-start-1 lg:col-span-3">
      {/* Left Side Shape with Glove Image */} 
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        viewport={{ once: true, amount: 0.2 }}
        className="absolute top-[220px] left-1/2 -ml-[496px] w-[300px] h-[220px]
                   rounded-3xl opacity-90 overflow-hidden shadow-primary hover:shadow-primary-lg transition-shadow duration-200"
        style={{
          background: 'linear-gradient(135deg, oklch(0.98 0.01 220) 0%, oklch(0.96 0.012 220) 50%, oklch(0.97 0.01 200) 100%)',
          border: '1px solid oklch(0.88 0.015 220)'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <img 
            src="/boxing2.png" 
            alt="Boxing Gloves"
            className="max-w-full max-h-full object-contain opacity-90"
          />
        </div>
        <div className="absolute top-4 left-4 w-16 h-16 rounded-full blur-sm opacity-50"
             style={{ background: 'radial-gradient(circle, oklch(0.65 0.18 65 / 0.4) 0%, transparent 70%)' }} />
      </motion.div>
      
      {/* Right Side Shape with Glove Image */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        viewport={{ once: true, amount: 0.2 }}
        className="absolute top-[80px] left-1/2 ml-[128px] w-[280px] h-[220px]
                   rounded-3xl opacity-90 z-10 overflow-hidden shadow-primary hover:shadow-primary-lg transition-shadow duration-200"
        style={{
          background: 'linear-gradient(135deg, oklch(0.97 0.01 200) 0%, oklch(0.96 0.012 220) 50%, oklch(0.98 0.01 220) 100%)',
          border: '1px solid oklch(0.88 0.015 220)'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <img 
            src="/mechanicalglove3.png" 
            alt="Mechanical Gloves"
            className="max-w-full max-h-full object-contain opacity-90"
          />
        </div>
        <div className="absolute top-6 right-6 w-20 h-20 rounded-full opacity-40"
             style={{ background: 'radial-gradient(circle, oklch(0.50 0.15 220 / 0.4) 0%, transparent 70%)' }} />
      </motion.div>
    </div>

    {/* CENTER STICKY with Scroll Reveal Effect */}
    <StickyCenterDiv className="lg:row-start-1 lg:row-span-4 lg:col-start-2" />

    {/* ROW 2: PRE-RUNWAY (shortened) */}
    <div className="hidden lg:block lg:row-start-2 lg:col-start-1 lg:col-span-3" aria-hidden />

    {/* ROW 3: VISION */}
    <div className="hidden lg:block z-10 lg:row-start-3 lg:col-start-1 lg:col-span-1">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        className="hidden lg:flex w-full max-w-xl mx-auto lg:mx-0 h-[200px] sm:h-[240px] lg:h-[260px] rounded-3xl items-center justify-center p-4 shadow-primary hover:shadow-primary-lg transition-shadow duration-200"
        style={{
          background: 'linear-gradient(135deg, oklch(0.96 0.012 220) 0%, oklch(0.97 0.01 200) 100%)',
          border: '1px solid oklch(0.88 0.015 220)'
        }}
      >
        <img 
          src="/workingglove3.png" 
          alt="Handcare Quality Gloves"
          className="max-w-full max-h-full object-contain"
        />
      </motion.div>
    </div>

    <div className="z-10 lg:row-start-3 lg:col-start-3 lg:col-span-1" id="about">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-none lg:mx-0 lg:px-0 lg:w-full"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center text-heading">Our Vision</h2>
        <p className="leading-relaxed text-base sm:text-lg text-center lg:text-left"
           style={{ color: 'oklch(0.40 0.01 240)' }}>
          To become the global leader in hand protection solutions by combining traditional craftsmanship from Sialkot with modern manufacturing excellence. We envision a world where every worker has access to reliable, high-quality gloves that ensure safety and productivity.
        </p>
      </motion.div>
    </div>

    {/* ROW 4: POST-RUNWAY (shortened) */}
    <div className="hidden lg:block lg:row-start-4 lg:col-start-1 lg:col-span-3" aria-hidden />
  </div>
</section>




      {/* About / KPIs */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10"
               style={{
                 background: 'oklch(0.98 0.008 85)'
               }}>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Alternating rows: copy beside a photo, the photos staggered so
              the pair reads as a diagonal rather than a stacked column. */}
          <div className="grid items-center gap-x-10 gap-y-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-4">
            {/* Row 1 — copy left, photo right (photo pulled up) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:pr-4"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-heading">About Handcare</h2>
              <p className="max-w-xl text-base sm:text-lg"
                 style={{ color: 'oklch(0.40 0.01 240)' }}>
                Established in the heart of Sialkot, Pakistan&mdash;the world&apos;s largest manufacturing hub for sports and safety goods&mdash;Handcare has been producing premium quality gloves for over two decades, supplying professionals in more than 50 countries.
              </p>
            </motion.div>

            <NotchedPhoto
              src="/handcare-facility.jpg"
              alt="The Handcare manufacturing facility in Sialkot, Pakistan"
              tag="Our Facility"
              icon={ShieldCheck}
              className="lg:-mt-10"
            />

            {/* Row 2 — photo left (pushed down), copy right */}
            <NotchedPhoto
              src="/factory-floor.jpg"
              alt="Stitching floor inside the Handcare glove factory"
              tag="Production Floor"
              icon={Hand}
              className="order-2 lg:order-none lg:mt-10"
            />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 lg:order-none lg:pl-4"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-heading">Inside Our Facility</h2>
              <p className="max-w-xl text-base sm:text-lg"
                 style={{ color: 'oklch(0.40 0.01 240)' }}>
                Cutting, stitching and finishing all happen under one roof, where traditional craftsmanship works alongside modern machinery. We are ISO 9001:2015 certified and comply with CE, ANSI and EN standards, so every pair leaves the floor to the same specification.
              </p>
            </motion.div>
          </div>

          <div className="mt-16 sm:mt-20 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-8 mb-8">
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
                transition={{ duration: 0.5, delay: Math.min(i, 4) * 0.04 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <p className="font-display text-4xl font-bold mb-2 text-gradient-accent">{kpi.n}</p>
                <p className="text-sm"
                   style={{ color: 'oklch(0.40 0.01 240)' }}>
                  {kpi.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10" id="product"
               style={{
                 background: 'oklch(0.98 0.008 85)'
               }}>
        <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3, margin: "0px" }}
            style={{ willChange: "opacity, transform" }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-heading">Our Product Range</h2>
            <p className="max-w-2xl mx-auto leading-relaxed"
               style={{ color: 'oklch(0.40 0.01 240)' }}>
              Handcare offers a comprehensive range of protective gloves designed for various industries and applications. Each product is engineered with precision and tested for durability, comfort, and maximum protection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                id: "working-gloves", 
                name: "Working Gloves", 
                img: "workingglove1.png", 
                desc: "Heavy-duty protection for construction and general work",
                features: ["Cut-resistant materials", "Enhanced grip", "Durable construction", "Comfortable fit"],
                specifications: {
                  "Material": "Premium leather and synthetic blend",
                  "Cut Level": "Level 3",
                  "Sizes": "S, M, L, XL",
                  "Standards": "EN 388, ANSI/ISEA 105"
                }
              },
              { 
                id: "welding-gloves", 
                name: "Welding Gloves", 
                img: "weldinggloves1.png", 
                desc: "Heat and flame-resistant gloves for welding operations",
                features: ["Heat resistance up to 500°C", "Flame retardant", "Heavy-duty leather", "Extended cuff protection"],
                specifications: {
                  "Material": "Heat-resistant leather",
                  "Temperature Rating": "Up to 500°C",
                  "Sizes": "M, L, XL",
                  "Standards": "EN 407, CE Marking"
                }
              },
              { 
                id: "mechanical-gloves", 
                name: "Mechanical Gloves", 
                img: "mechanicalglove1.png", 
                desc: "Precision grip and cut resistance for mechanical work",
                features: ["Cut level 5 protection", "Precision touch", "Oil and water resistant", "Breathable design"],
                specifications: {
                  "Material": "HPPE and synthetic blend",
                  "Cut Level": "Level 5",
                  "Sizes": "S, M, L, XL",
                  "Standards": "EN 388, ANSI/ISEA 105"
                }
              },
              { 
                id: "gardening-gloves", 
                name: "Gardening Gloves", 
                img: "gardening1.png", 
                desc: "Comfortable protection for gardening and landscaping",
                features: ["Puncture resistant", "Waterproof coating", "Breathable fabric", "Flexible design"],
                specifications: {
                  "Material": "Nitrile coating on cotton",
                  "Waterproof": "Yes",
                  "Sizes": "S, M, L, XL",
                  "Standards": "EN 388"
                }
              },
              { 
                id: "riding-gloves", 
                name: "Riding Gloves", 
                img: "riding1.png", 
                desc: "Flexible and durable gloves for equestrian activities",
                features: ["Enhanced grip", "Weather protection", "Flexible fit", "Durable leather"],
                specifications: {
                  "Material": "Premium leather",
                  "Sizes": "S, M, L, XL",
                  "Standards": "CE Marking",
                  "Color": "Brown, Black, Tan"
                }
              },
              { 
                id: "canadian-gloves", 
                name: "Canadian Gloves", 
                img: "canadianglove1.png", 
                desc: "Cold weather protection with superior insulation",
                features: ["Thermal insulation", "Waterproof exterior", "Wind resistant", "Extended wrist coverage"],
                specifications: {
                  "Material": "Insulated leather and synthetic",
                  "Temperature Rating": "Down to -40°C",
                  "Sizes": "M, L, XL",
                  "Standards": "EN 388, CE Marking"
                }
              },
              { 
                id: "boxing-gloves", 
                name: "Boxing Gloves", 
                img: "boxing1.png", 
                desc: "Professional-grade boxing gloves for training and competition",
                features: ["Impact protection", "Secure wrist support", "Breathable design", "Durable construction"],
                specifications: {
                  "Material": "Premium leather and synthetic",
                  "Weight": "12oz, 14oz, 16oz",
                  "Sizes": "S, M, L, XL",
                  "Standards": "CE Marking"
                }
              },
              { 
                id: "driving-gloves", 
                name: "Driving Gloves", 
                img: "driving1.png", 
                desc: "Soft grain leather gloves for precise steering feel and all-day comfort",
                features: ["Soft grain leather", "Close-fitting dexterity", "Breathable back", "Secure wrist closure"],
                specifications: {
                  "Material": "Soft grain goatskin and cowhide",
                  "Sizes": "S, M, L, XL",
                  "Standards": "CE Marking",
                  "Color": "White, Red, Tan, Black"
                }
              },
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: Math.min(i, 4) * 0.04 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <FlipCard
                  data={{
                    name: product.name,
                    username: product.id.replace(/-/g, '_'),
                    image: `/${product.img}`,
                    bio: product.desc,
                    desc: product.desc,
                    features: product.features,
                    specifications: product.specifications as unknown as Record<string, string>,
                    stats: {
                      following: product.features.length,
                      followers: Math.floor(Math.random() * 1000) + 100,
                      posts: product.features.length
                    },
                    productId: product.id
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/products"
              className="inline-block px-8 py-3 border-2 text-sm rounded-full font-medium transition-all duration-200 glow-primary-hover"
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
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Resources / Leather Types Guide */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10" id="resources"
               style={{
                 background: 'oklch(0.98 0.008 85)'
               }}>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3, margin: "0px" }}
            className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-heading"
            style={{ 
              willChange: "opacity, transform"
            }}
          >
            Our Leather Selection
          </motion.h2>

          <LeatherTimeline />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10"
               style={{
                 background: 'oklch(0.98 0.008 85)'
               }}>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-heading"
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
                transition={{ duration: 0.5, delay: Math.min(i, 4) * 0.04 }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="rounded-2xl p-6 hover:shadow-primary transition-all duration-200"
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
                  <p className="text-base mb-6"
                     style={{ color: 'oklch(0.40 0.01 240)' }}>
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full"
                         style={{
                           background: 'linear-gradient(135deg, oklch(0.50 0.15 220), oklch(0.65 0.18 65))'
                         }}></div>
                    <div>
                      <p className="font-medium text-sm"
                         style={{ color: 'oklch(0.25 0.01 240)' }}>{testimonial.name}</p>
                      <p className="text-xs"
                         style={{ color: 'oklch(0.45 0.01 240)' }}>{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10" id="contact"
               style={{
                 background: 'oklch(0.98 0.008 85)'
               }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-heading">Get in touch</h2>
            <p className="mb-8 leading-relaxed"
               style={{ color: 'oklch(0.40 0.01 240)' }}>
              Ready to find the perfect hand protection solution for your needs? Contact our team in Sialkot, Pakistan. We&apos;re here to help you choose the right gloves and provide competitive pricing for bulk orders. Let&apos;s discuss how Handcare can meet your requirements.
            </p>
            <div className="space-y-3 text-base"
                 style={{ color: 'oklch(0.40 0.01 240)' }}>
              <div>
                <p className="font-medium mb-1"
                   style={{ color: 'oklch(0.25 0.01 240)' }}>Phone:</p>
                                   <a href="tel:+923024002921" 
                   className="transition-colors hover:text-[oklch(0.50_0.15_220)]"
                   style={{ color: 'oklch(0.40 0.01 240)' }}>+92 302 400 2921</a>
                    <br />

                <a href="tel:+923014264385" 
                   className="transition-colors hover:text-[oklch(0.50_0.15_220)]"
                   style={{ color: 'oklch(0.40 0.01 240)' }}>+92 301 426 4385</a>
               
              </div>
              <div>
                <p className="font-medium mb-1"
                   style={{ color: 'oklch(0.25 0.01 240)' }}>Email:</p>
                <a href="mailto:handcare514@gmail.com" 
                   className="transition-colors hover:text-[oklch(0.50_0.15_220)]"
                   style={{ color: 'oklch(0.40 0.01 240)' }}>handcare514@gmail.com</a>
              </div>
              <div>
                <p className="font-medium mb-1"
                   style={{ color: 'oklch(0.25 0.01 240)' }}>Follow Us:</p>
                <a 
                  href="https://www.instagram.com/hand_care14?igsh=MXRwb2VxdHZ1aGdobw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-colors inline-flex items-center gap-1 hover:text-[oklch(0.50_0.15_220)]"
                  style={{ color: 'oklch(0.40 0.01 240)' }}
                >
                  Instagram
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <div className="mt-4">
                <p className="font-medium mb-1"
                   style={{ color: 'oklch(0.25 0.01 240)' }}>Address:</p>
                <p>Industrial Area, Sialkot 51310<br />Punjab, Pakistan</p>
              </div>
            </div>
          </motion.div>

          <ContactForm />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10"
               style={{
                 background: 'oklch(0.98 0.008 85)'
               }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-heading">Ready to Partner with Handcare?</h2>
          <p className="mb-8 leading-relaxed"
             style={{ color: 'oklch(0.40 0.01 240)' }}>
            Join hundreds of satisfied customers worldwide who trust Handcare for their hand protection needs. Request a quote today and discover why we&apos;re the preferred choice for quality gloves from Sialkot, Pakistan.
          </p>
          <Link 
            href="/quote" 
            className="px-8 py-3 text-white text-sm rounded-full transition-all duration-200 btn-gradient glow-accent-hover inline-block relative overflow-hidden font-medium"
            style={{
              background: 'linear-gradient(135deg, oklch(0.51 0.18 65), oklch(0.56 0.15 40))'
            }}
          >
            Request a Quote
          </Link>
        </motion.div>
      </section>

    </div>
  )
}

export default App
