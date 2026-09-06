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

// Card height at lg; the sticky offset is derived from it so the card parks
// in the middle of the viewport rather than under the navbar.
const STICKY_CARD_H = 620
const stickyTopOffset = (viewportHeight: number) =>
  Math.max(96, Math.round(viewportHeight / 2 - STICKY_CARD_H / 2))

// Sticky Center Div with Scroll Reveal Effect
function StickyCenterDiv() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const productImages = [
    { src: "/workingglove1.png", alt: "Working Gloves" },
    { src: "/weldinggloves1.png", alt: "Welding Gloves" },
    { src: "/mechanicalglove1.png", alt: "Mechanical Gloves" },
    { src: "/gardening1.png", alt: "Gardening Gloves" },
    { src: "/boxing1.png", alt: "Boxing Gloves" },
    // { src: "/riding1.png", alt: "Riding Gloves" },
    { src: "/riding2.png", alt: "Riding Gloves" },
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
      
      // Must track the CSS `top` the card actually sticks at, so image
      // switching begins exactly when the card pins mid-screen.
      const stickyOffset = stickyTopOffset(viewportHeight)
      const stickyStartPoint = sectionTop - stickyOffset
      
      // Image switching starts only after sticky element becomes active
      // Calculate the scroll range while sticky (from when it becomes sticky until section ends)
      // Using 70% of the range to make switching faster (images change more frequently)
      const imageSwitchStart = stickyStartPoint
      const imageSwitchEnd = sectionTop + sectionHeight - stickyOffset - 200
      const totalSwitchRange = (imageSwitchEnd - imageSwitchStart) * 0.7

      // Before sticky starts, show first image
      if (scrollPosition < imageSwitchStart) {
        setScrollProgress(0)
        setCurrentImageIndex(0)
      } else if (scrollPosition > imageSwitchEnd) {
        // After switching range, show last image
        setScrollProgress(1)
        setCurrentImageIndex(productImages.length - 1)
      } else {
        // Calculate progress within the switching range (0 to 1)
        const progress = (scrollPosition - imageSwitchStart) / totalSwitchRange
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
    <div className="hidden lg:block sticky top-[max(6rem,calc(50vh-310px))]">
      <div className="relative h-[620px] flex items-start justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full lg:w-[420px] xl:w-[460px] h-[620px]
                     rounded-3xl shadow-primary-lg overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, oklch(0.98 0.01 220) 0%, oklch(0.96 0.012 220) 50%, oklch(0.97 0.01 200) 100%)',
            border: '1px solid oklch(0.90 0.015 220)'
          }}
        >
          {/* Colored backdrop decorative elements */}
          <div className="absolute bottom-8 right-8 w-32 h-32 rounded-full blur-xl opacity-40"
               style={{ background: 'radial-gradient(circle, oklch(0.65 0.18 65 / 0.3) 0%, transparent 70%)' }} />
          <div className="absolute top-12 left-12 w-24 h-24 rounded-full blur-lg opacity-35"
               style={{ background: 'radial-gradient(circle, oklch(0.50 0.15 220 / 0.3) 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl opacity-20"
               style={{ background: 'radial-gradient(circle, oklch(0.55 0.15 160 / 0.2) 0%, transparent 70%)' }} />
          
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
                    transition={{ duration: 0.5 }}
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

          {/* Colored progress indicator dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {productImages.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
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

const heroVisionMobileImages = [
  { src: "/workingglove3.png", alt: "Premium working gloves" },
  { src: "/mechanicalglove3.png", alt: "Mechanical gloves" },
  { src: "/boxing2.png", alt: "Boxing gloves" },
  { src: "/gardening1.png", alt: "Gardening gloves" },
]

// Mobile Carousel Component
function MobileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isLooping, setIsLooping] = useState(false)
  const prevIndexRef = useRef(0)

  const minSwipeDistance = 50
  const autoSlideInterval = 3000 // 3 seconds

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % heroVisionMobileImages.length
        // Detect if looping from last to first
        if (prev === heroVisionMobileImages.length - 1 && next === 0) {
          setIsLooping(true)
          setTimeout(() => setIsLooping(false), 100) // Reset after transition
        }
        prevIndexRef.current = prev
        return next
      })
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, heroVisionMobileImages.length])

  // Resume auto-play after user interaction
  const pauseAndResume = () => {
    setIsAutoPlaying(false)
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, autoSlideInterval * 2) // Resume after 2x the interval
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
    pauseAndResume()
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentIndex < heroVisionMobileImages.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % heroVisionMobileImages.length
      // Detect if looping from last to first
      if (prev === heroVisionMobileImages.length - 1 && next === 0) {
        setIsLooping(true)
        setTimeout(() => setIsLooping(false), 100)
      }
      prevIndexRef.current = prev
      return next
    })
    pauseAndResume()
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + heroVisionMobileImages.length) % heroVisionMobileImages.length
      // Detect if looping from first to last
      if (prev === 0 && next === heroVisionMobileImages.length - 1) {
        setIsLooping(true)
        setTimeout(() => setIsLooping(false), 100)
      }
      prevIndexRef.current = prev
      return next
    })
    pauseAndResume()
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    pauseAndResume()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative w-full max-w-xl mx-auto h-[280px] sm:h-[300px] flex items-center justify-center"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'oklch(1 0 0)',
          color: 'oklch(0.45 0.15 220)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'oklch(1 0 0)',
          color: 'oklch(0.45 0.15 220)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Carousel Cards */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {heroVisionMobileImages.map((img, index) => {
          const distance = Math.abs(index - currentIndex)
          const isActive = index === currentIndex
          const isVisible = distance <= 1

          if (!isVisible) return null

          const position = index - currentIndex
          const scale = isActive ? 1 : 0.75
          const opacity = isActive ? 1 : 0.5
          const translateX = position * 80

          return (
            <motion.div
              key={img.src}
              className="absolute flex items-center justify-center"
              initial={false}
              animate={{
                x: translateX,
                scale,
                opacity,
                zIndex: isActive ? 10 : 5 - distance,
              }}
              transition={isLooping ? {
                duration: 0,
              } : {
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{
                width: isActive ? '85%' : '70%',
                height: isActive ? '100%' : '80%',
              }}
            >
              <div
                className="w-full h-full rounded-3xl shadow-primary-lg flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, oklch(0.96 0.012 220) 0%, oklch(0.97 0.01 200) 100%)'
                    : 'linear-gradient(135deg, oklch(0.96 0.012 220 / 0.6) 0%, oklch(0.97 0.01 200 / 0.6) 100%)',
                  border: isActive
                    ? '1px solid oklch(0.88 0.015 220)'
                    : '1px solid oklch(0.88 0.015 220 / 0.5)',
                  boxShadow: isActive
                    ? '0 12px 30px -18px oklch(0.45 0.15 220 / 0.8)'
                    : '0 8px 20px -12px oklch(0.45 0.15 220 / 0.5)',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="max-w-full max-h-full object-contain drop-shadow-xl"
                  loading={index <= 1 ? 'eager' : 'lazy'}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {heroVisionMobileImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              width: index === currentIndex ? '32px' : '8px',
              height: '8px',
              background: index === currentIndex
                ? 'oklch(1 0 0)'
                : 'oklch(1 0 0 / 0.4)',
              boxShadow: index === currentIndex
                ? '0 2px 8px rgba(0,0,0,0.2)'
                : 'none',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  )
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
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
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
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            required
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
          />
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-gradient glow-accent-hover relative overflow-hidden font-medium"
            style={{
              background: isSubmitting ? 'oklch(0.70 0.01 240)' : 'linear-gradient(135deg, oklch(0.65 0.18 65), oklch(0.70 0.15 40))'
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
<section id="hero-vision" className="relative -mt-[14vh] px-4 pt-[14vh] pb-28 sm:px-6 lg:pb-40 z-10"
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
    className="max-w-7xl mx-auto grid
               grid-cols-1
               lg:grid-cols-[minmax(0,1fr)_minmax(420px,470px)_minmax(0,1fr)]
               xl:grid-cols-[minmax(0,1fr)_minmax(460px,520px)_minmax(0,1fr)]
               /* ↓ reduced pre- and post-runway heights ↓ */
               lg:grid-rows-[500px_minmax(120px,28vh)_auto_minmax(340px,42vh)]
               gap-y-8 lg:gap-x-16 lg:gap-y-12">

    {/* ROW 1: SHAPES STAGE */}
    <div className="hidden lg:block row-start-1 col-start-1 col-span-3 relative h-[500px]">
      {/* Left Side Shape with Glove Image */} 
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        viewport={{ once: true, amount: 0.2 }}
        className="absolute top-[220px] left-1/2 -ml-[496px] w-[300px] h-[220px]
                   rounded-3xl opacity-90 overflow-hidden shadow-primary hover:shadow-primary-lg transition-shadow duration-300"
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
        className="absolute top-[80px] left-1/2 ml-[78px] w-[280px] h-[220px]
                   rounded-3xl opacity-90 z-10 overflow-hidden shadow-primary hover:shadow-primary-lg transition-shadow duration-300"
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
    <div className="row-start-1 row-span-4 lg:col-start-2">
      <StickyCenterDiv />
    </div>

    {/* ROW 2: PRE-RUNWAY (shortened) */}
    <div className="row-start-2 col-start-1 col-span-3" aria-hidden />

    {/* ROW 3: VISION */}
    <div className="row-start-3 col-span-3 lg:col-start-1 lg:col-span-1 z-10 mb-6 lg:mb-0">
      {/* Mobile carousel */}
      <div className="lg:hidden">
        <MobileCarousel />
      </div>

      {/* Desktop static image */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        className="hidden lg:flex w-full max-w-xl mx-auto lg:mx-0 h-[200px] sm:h-[240px] lg:h-[260px] rounded-3xl items-center justify-center p-4 shadow-primary hover:shadow-primary-lg transition-shadow duration-300"
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

    <div className="row-start-4 col-span-3 lg:row-start-3 lg:col-start-3 lg:col-span-1 z-10" id="about">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-none lg:mx-0 lg:px-0 lg:w-full"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6 text-center text-gradient-primary">Our Vision</h2>
        <p className="leading-relaxed text-base sm:text-lg text-center lg:text-left"
           style={{ color: 'oklch(0.40 0.01 240)' }}>
          To become the global leader in hand protection solutions by combining traditional craftsmanship from Sialkot with modern manufacturing excellence. We envision a world where every worker has access to reliable, high-quality gloves that ensure safety and productivity.
        </p>
      </motion.div>
    </div>

    {/* ROW 4: POST-RUNWAY (shortened) */}
    <div className="row-start-4 col-start-1 col-span-3" aria-hidden />
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gradient-primary">About Handcare</h2>
              <p className="max-w-xl text-sm sm:text-base"
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gradient-primary">Inside Our Facility</h2>
              <p className="max-w-xl text-sm sm:text-base"
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
                transition={{ duration: 0.5, delay: i * 0.05 }}
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gradient-primary">Our Product Range</h2>
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
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
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
              className="inline-block px-8 py-3 border-2 text-sm rounded-full font-medium transition-all duration-300 glow-primary-hover"
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
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 sm:mb-16 text-center text-gradient-primary"
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
            className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-gradient-primary"
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
              >
                <div className="rounded-2xl p-6 hover:shadow-primary transition-all duration-300"
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
                  <p className="text-sm mb-6"
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gradient-primary">Get in touch</h2>
            <p className="mb-8 leading-relaxed"
               style={{ color: 'oklch(0.40 0.01 240)' }}>
              Ready to find the perfect hand protection solution for your needs? Contact our team in Sialkot, Pakistan. We&apos;re here to help you choose the right gloves and provide competitive pricing for bulk orders. Let&apos;s discuss how Handcare can meet your requirements.
            </p>
            <div className="space-y-3 text-sm"
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gradient-primary">Ready to Partner with Handcare?</h2>
          <p className="mb-8 leading-relaxed"
             style={{ color: 'oklch(0.40 0.01 240)' }}>
            Join hundreds of satisfied customers worldwide who trust Handcare for their hand protection needs. Request a quote today and discover why we&apos;re the preferred choice for quality gloves from Sialkot, Pakistan.
          </p>
          <Link 
            href="/quote" 
            className="px-8 py-3 text-white text-sm rounded-full transition-all duration-300 btn-gradient glow-accent-hover inline-block relative overflow-hidden font-medium"
            style={{
              background: 'linear-gradient(135deg, oklch(0.65 0.18 65), oklch(0.70 0.15 40))'
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
