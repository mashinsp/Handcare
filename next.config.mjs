/** @type {import('next').NextConfig} */

// Baseline security headers. A Content-Security-Policy is deliberately not
// set yet: the layout uses inline JSON-LD and Vercel Analytics, so a CSP
// needs nonces or hashes and should be rolled out in report-only mode first.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
]

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
}

export default nextConfig
