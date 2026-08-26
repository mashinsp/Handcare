import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { organizationSchema } from '@/lib/structured-data'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Handcare - Leather Gloves Manufacturer & Exporter | Sialkot, Pakistan',
  description: 'ISO 9001:2015 certified leather gloves manufacturer and industrial glove exporter in Sialkot, Pakistan. OEM/custom glove manufacturing, wholesale supply to 50+ countries.',
  generator: 'Handcare',
  icons: [
    { rel: 'icon', url: '/handcarelogo-faviconn.png' },
    { rel: 'shortcut icon', url: '/handcarelogo-faviconn.png' },
  ],
  other: [
    { name: 'msvalidate.01', content: '0D7CE10BE6BEDCE395834D6A6E8A286C' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {/*
          A plain <script> tag, not next/script — next/script's tag gets
          embedded inside Next's RSC hydration payload rather than emitted
          as literal HTML, so non-JS-executing crawlers/agents (and this
          very audit's own evidence gathering) never see it. Confirmed by
          testing: the JSON-LD was completely absent from a raw HTML fetch
          of the homepage when this used next/script.
        */}
        <script
          id="organization-schema"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
