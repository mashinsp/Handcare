"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled 
          ? 'linear-gradient(135deg, oklch(1 0 0 / 0.85) 0%, oklch(0.99 0.002 100 / 0.9) 100%)'
          : 'linear-gradient(135deg, oklch(1 0 0 / 0.75) 0%, oklch(0.99 0.002 100 / 0.8) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: scrolled 
          ? '1px solid oklch(0.90 0.008 100 / 0.6)' 
          : '1px solid oklch(0.90 0.008 100 / 0.3)',
        boxShadow: scrolled 
          ? '0 8px 32px -8px oklch(0.45 0.15 220 / 0.15), 0 2px 16px -4px oklch(0.50 0.15 220 / 0.1)'
          : '0 2px 16px -4px oklch(0.45 0.15 220 / 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <img 
            src="/handcarelogo.png" 
            alt="Handcare Logo" 
            className="h-6 sm:h-8 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-red-500 font-semibold text-sm sm:text-base  transition-all duration-300">
            Handcare
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <a 
            href="/#about" 
            className="text-sm font-medium transition-all duration-300 relative group"
            style={{ 
              color: 'oklch(0.40 0.01 240)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'oklch(0.45 0.15 220)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'oklch(0.40 0.01 240)'
            }}
          >
            About
            <span 
              className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
              style={{ background: 'linear-gradient(90deg, oklch(0.45 0.15 220), oklch(0.55 0.15 160))' }}
            />
          </a>
          <Link 
            href="/products" 
            className="text-sm font-medium transition-all duration-300 relative group"
            style={{ 
              color: 'oklch(0.40 0.01 240)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'oklch(0.45 0.15 220)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'oklch(0.40 0.01 240)'
            }}
          >
            Products
            <span 
              className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
              style={{ background: 'linear-gradient(90deg, oklch(0.45 0.15 220), oklch(0.55 0.15 160))' }}
            />
          </Link>
          <a 
            href="/#resources" 
            className="text-sm font-medium transition-all duration-300 relative group"
            style={{ 
              color: 'oklch(0.40 0.01 240)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'oklch(0.45 0.15 220)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'oklch(0.40 0.01 240)'
            }}
          >
            Categories
            <span 
              className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
              style={{ background: 'linear-gradient(90deg, oklch(0.45 0.15 220), oklch(0.55 0.15 160))' }}
            />
          </a>
          <a 
            href="/#contact" 
            className="text-sm font-medium transition-all duration-300 relative group"
            style={{ 
              color: 'oklch(0.40 0.01 240)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'oklch(0.45 0.15 220)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'oklch(0.40 0.01 240)'
            }}
          >
            Contact
            <span 
              className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
              style={{ background: 'linear-gradient(90deg, oklch(0.45 0.15 220), oklch(0.55 0.15 160))' }}
            />
          </a>
          <Link 
            href="/quote" 
            className="px-4 xl:px-6 py-2 xl:py-2.5 text-sm rounded-full whitespace-nowrap font-medium transition-all duration-300 relative overflow-hidden group glow-primary-hover"
            style={{
              background: 'linear-gradient(135deg, oklch(0.45 0.15 220) 0%, oklch(0.55 0.15 160) 100%)',
              color: 'white',
              boxShadow: '0 4px 16px -4px oklch(0.45 0.15 220 / 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 6px 20px -4px oklch(0.45 0.15 220 / 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 16px -4px oklch(0.45 0.15 220 / 0.4)'
            }}
          >
            <span className="relative z-10">Request Quote</span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, oklch(0.50 0.16 220) 0%, oklch(0.60 0.16 160) 100%)'
              }}
            />
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg transition-all duration-300"
          style={{ 
            color: 'oklch(0.40 0.01 240)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'oklch(0.96 0.005 90 / 0.6)'
            e.currentTarget.style.color = 'oklch(0.45 0.15 220)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = 'oklch(0.40 0.01 240)'
          }}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav 
          className="lg:hidden transition-all duration-300"
          style={{
            borderTop: '1px solid oklch(0.90 0.008 100 / 0.5)',
            background: 'linear-gradient(180deg, oklch(1 0 0 / 0.95) 0%, oklch(0.99 0.002 100 / 0.98) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 32px -8px oklch(0.45 0.15 220 / 0.1)'
          }}
        >
          <div className="px-4 py-4 space-y-2">
            <a 
              href="/#about" 
              className="block text-sm font-medium py-2.5 px-3 rounded-lg transition-all duration-300"
              style={{ 
                color: 'oklch(0.40 0.01 240)'
              }}
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'oklch(0.96 0.005 90 / 0.6)'
                e.currentTarget.style.color = 'oklch(0.45 0.15 220)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'oklch(0.40 0.01 240)'
              }}
            >
              About
            </a>
            <Link 
              href="/products" 
              className="block text-sm font-medium py-2.5 px-3 rounded-lg transition-all duration-300"
              style={{ 
                color: 'oklch(0.40 0.01 240)'
              }}
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'oklch(0.96 0.005 90 / 0.6)'
                e.currentTarget.style.color = 'oklch(0.45 0.15 220)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'oklch(0.40 0.01 240)'
              }}
            >
              Products
            </Link>
            <a 
              href="/#resources" 
              className="block text-sm font-medium py-2.5 px-3 rounded-lg transition-all duration-300"
              style={{ 
                color: 'oklch(0.40 0.01 240)'
              }}
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'oklch(0.96 0.005 90 / 0.6)'
                e.currentTarget.style.color = 'oklch(0.45 0.15 220)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'oklch(0.40 0.01 240)'
              }}
            >
              Categories
            </a>
            <a 
              href="/#contact" 
              className="block text-sm font-medium py-2.5 px-3 rounded-lg transition-all duration-300"
              style={{ 
                color: 'oklch(0.40 0.01 240)'
              }}
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'oklch(0.96 0.005 90 / 0.6)'
                e.currentTarget.style.color = 'oklch(0.45 0.15 220)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'oklch(0.40 0.01 240)'
              }}
            >
              Contact
            </a>
            <Link 
              href="/quote" 
              className="block px-4 py-2.5 text-sm rounded-full text-center font-medium transition-all duration-300 relative overflow-hidden mt-2 glow-primary-hover"
              style={{
                background: 'linear-gradient(135deg, oklch(0.45 0.15 220) 0%, oklch(0.55 0.15 160) 100%)',
                color: 'white',
                boxShadow: '0 4px 16px -4px oklch(0.45 0.15 220 / 0.4)'
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Request Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

