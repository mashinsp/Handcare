"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated Title */}
        <div
          ref={titleRef}
          className={`mb-6 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-pretty">Add the Title Text Here</h1>
        </div>

        {/* Animated Description */}
        <div
          ref={descRef}
          className={`mb-8 transition-all duration-1000 transform delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            This is a space to welcome visitors to the site. Grab their attention with copy that clearly states what the
            site is about, and add an engaging image or video.
          </p>
        </div>

        {/* Animated Button */}
        <div
          ref={buttonRef}
          className={`transition-all duration-1000 transform delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Button size="lg" className="rounded-full px-8 py-6 text-base">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}
