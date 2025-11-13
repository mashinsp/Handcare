"use client"

import { useEffect, useRef, useState } from "react"

interface FeatureItem {
  id: number
  title: string
  color: string
}

const features: FeatureItem[] = [
  { id: 1, title: "Feature One", color: "bg-gradient-to-br from-amber-100 to-amber-50" },
  { id: 2, title: "Feature Two", color: "bg-gradient-to-br from-blue-100 to-blue-50" },
  { id: 3, title: "Feature Three", color: "bg-gradient-to-br from-purple-100 to-purple-50" },
]

export default function FeaturesGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number.parseInt(entry.target.getAttribute("data-id") || "0")
            setVisibleItems((prev) => new Set([...prev, id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    const items = containerRef.current?.querySelectorAll("[data-id]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              data-id={feature.id}
              className={`${feature.color} rounded-2xl aspect-square flex items-center justify-center transition-all duration-700 transform hover:scale-105 ${
                visibleItems.has(feature.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{
                transitionDelay: visibleItems.has(feature.id) ? `${(feature.id - 1) * 100}ms` : "0ms",
              }}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white bg-opacity-70 mx-auto mb-4" />
                <p className="font-semibold text-foreground">{feature.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
