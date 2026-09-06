import type { Metadata } from "next"
import LegalPage, { type LegalSection } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy | Handcare",
  description:
    "How Handcare collects, uses and protects the information you submit through handcare.co, including quote and contact form data.",
  alternates: { canonical: "https://www.handcare.co/privacy" },
}

const sections: LegalSection[] = [
  {
    heading: "1. Who we are",
    body: [
      "Handcare is a manufacturer and exporter of industrial and safety gloves, based in Industrial Area, Sialkot 51310, Punjab, Pakistan. This policy explains what happens to information you give us through www.handcare.co.",
    ],
  },
  {
    heading: "2. Information you give us",
    body: [
      "We only collect information you type into a form yourself. There is no account system and no login on this site.",
      { list: [
        "Quote request form: your name, email address, phone number, country, product of interest and estimated quantity, plus your company name and message if you choose to add them.",
        "Contact form: your name, email address and your message.",
      ] },
      "Submitting either form sends the contents to our sales inbox by email. We do not store form submissions in a database on this website.",
    ],
  },
  {
    heading: "3. Information collected automatically",
    body: [
      "This site uses Vercel Analytics to count page views and understand which pages are useful. It is a privacy-friendly, cookieless service: it does not set tracking cookies, does not use device fingerprinting, and does not build a profile of you across other websites.",
      "Our hosting provider also keeps standard technical server logs (such as IP address, browser type and requested page) for security and reliability. These logs are not used to identify individual visitors.",
    ],
  },
  {
    heading: "4. Cookies",
    body: [
      "We do not use advertising, profiling or third-party tracking cookies, and we do not run a cookie consent banner because there is nothing non-essential to consent to. If that ever changes, this policy will be updated first and consent will be requested before any such cookie is set.",
    ],
  },
  {
    heading: "5. How we use your information",
    body: [
      { list: [
        "To prepare and send you a quotation, price list or catalogue you have asked for.",
        "To answer your enquiry and to follow up on it.",
        "To keep records of our business correspondence with you.",
        "To measure, in aggregate, how the website is used so we can improve it.",
      ] },
      "We do not sell, rent or trade your information, and we do not use it to send marketing you did not ask for.",
    ],
  },
  {
    heading: "6. Who we share it with",
    body: [
      "Your information is shared only with the service providers needed to operate this site and reply to you — our website host (Vercel), our analytics provider (Vercel Analytics) and our email provider, which delivers form submissions to our inbox. Each acts on our instructions. We may also disclose information where we are required to by law.",
    ],
  },
  {
    heading: "7. International transfers",
    body: [
      "Handcare operates from Pakistan and our providers operate globally, so information you submit may be processed outside your own country, including in countries whose data protection laws differ from yours. We take reasonable steps to ensure it stays protected in transit and at rest.",
    ],
  },
  {
    heading: "8. How long we keep it",
    body: [
      "Enquiry and quotation correspondence is kept for as long as needed for the business relationship and for our commercial and tax records. You can ask us to delete your correspondence at any time and we will do so unless we are legally required to retain it.",
    ],
  },
  {
    heading: "9. Your rights",
    body: [
      "Depending on where you live, you may have the right to ask for a copy of the information we hold about you, to have it corrected or deleted, or to object to how we use it. Email handcare514@gmail.com and we will respond within a reasonable period.",
    ],
  },
  {
    heading: "10. Security",
    body: [
      "This site is served over HTTPS and form submissions are transmitted over an encrypted connection. No method of transmission over the internet is completely secure, so please do not send sensitive personal or financial details through the website forms.",
    ],
  },
  {
    heading: "11. Children",
    body: [
      "This is a business-to-business website. It is not directed at children and we do not knowingly collect information from anyone under 16.",
    ],
  },
  {
    heading: "12. Changes to this policy",
    body: [
      "We may update this policy as our practices or the law change. The revised version will be posted on this page with a new 'last updated' date.",
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="We ask for as little as possible, use it only to answer you, and never sell it."
      updated="6 September 2026"
      sections={sections}
    />
  )
}
