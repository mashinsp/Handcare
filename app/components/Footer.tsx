import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 sm:gap-12 mb-8 sm:mb-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/handcarelogo.png"
              alt="Handcare Logo"
              className="h-6 w-auto"
            />
            <span className="font-medium">Handcare</span>
          </div>
          <p className="text-sm text-gray-400">
            Leading manufacturer of premium quality industrial and safety gloves from Sialkot, Pakistan. ISO 9001:2015 certified with over 25 years of excellence in hand protection solutions.
          </p>
        </div>

        <div className="col-span-1">
          <h3 className="font-medium mb-4">About</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/#about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="font-medium mb-4">Policy</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="font-medium mb-4">Social</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="https://twitter.com" className="hover:text-white transition-colors">Twitter</Link></li>
            <li><Link href="https://linkedin.com" className="hover:text-white transition-colors">LinkedIn</Link></li>
            <li><Link href="https://instagram.com" className="hover:text-white transition-colors">Instagram</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
        <p>© 2025 Handcare. All rights reserved. | Industrial Area, Sialkot 51310, Pakistan</p>
      </div>
    </footer>
  )
}
