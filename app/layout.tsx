import type { Metadata } from 'next'
import { DM_Sans, Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MotionProvider from './components/MotionProvider'
import { organizationSchema } from '@/lib/structured-data'
import './globals.css'

/**
 * Type pairing for the whole site.
 *
 * Sora — display face, for anything structural or numeric: headings, stat
 * figures, the wordmark. Needs 400/600/700/800.
 * DM Sans — text face and the body default, for labels, nav items, table
 * content, names and emails, buttons, form fields and captions. Needs
 * 400/500/600/700 plus 400 italic.
 *
 * Both are loaded as variable fonts (no `weight` list) rather than as static
 * instances. Google serves Sora across 100-800 and DM Sans across 100-1000, so
 * one file per style covers every weight above — three files in total, where
 * naming the weights explicitly would fetch nine (next/font cannot scope a
 * style to a single weight, so `italic` would be pulled at all four).
 */
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display-family",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-sans-body",
  display: "swap",
});

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
    <html lang="en" className={`${sora.variable} ${dmSans.variable}`}>
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
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  )
}
