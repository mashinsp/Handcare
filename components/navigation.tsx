"use client"

import { Button } from "@/components/ui/button"

interface NavigationProps {
  isScrolled: boolean
}

export default function Navigation({ isScrolled }: NavigationProps) {
  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">B</span>
          </div>
          <span className="font-bold text-xl">Business Name</span>
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="#product" className="text-foreground hover:text-primary transition-colors">
            Product
          </a>
          <a href="#resources" className="text-foreground hover:text-primary transition-colors">
            Resources
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </div>

        {/* CTA Button */}
        <Button className="rounded-full">Get Started</Button>
      </div>
    </nav>
  )
}
