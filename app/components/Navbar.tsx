"use client"

import React, { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <img 
            src="/handcarelogo.png" 
            alt="Handcare Logo" 
            className="h-6 sm:h-8 w-auto"
          />
          <span className="font-medium text-gray-900 text-sm sm:text-base">Handcare</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <a href="/#about" className="text-sm text-gray-700 hover:text-gray-900">About</a>
          <Link href="/products" className="text-sm text-gray-700 hover:text-gray-900">Products</Link>
          <a href="/#resources" className="text-sm text-gray-700 hover:text-gray-900">Categories</a>
          <a href="/#contact" className="text-sm text-gray-700 hover:text-gray-900">Contact</a>
          <Link href="/quote" className="px-4 xl:px-6 py-2 xl:py-2.5 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap">
            Request Quote
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
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
        <nav className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <a 
              href="/#about" 
              className="block text-sm text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <Link 
              href="/products" 
              className="block text-sm text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <a 
              href="/#resources" 
              className="block text-sm text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </a>
            <a 
              href="/#contact" 
              className="block text-sm text-gray-700 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Link 
              href="/quote" 
              className="block px-4 py-2.5 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-colors text-center"
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

