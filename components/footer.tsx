export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Community
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background border-opacity-20 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2025 Business Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
