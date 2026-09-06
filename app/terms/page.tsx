import type { Metadata } from "next"
import LegalPage, { type LegalSection } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Terms of Use | Handcare",
  description:
    "The terms that govern use of handcare.co, including quotations, product information, intellectual property and liability.",
  alternates: { canonical: "https://www.handcare.co/terms" },
}

const sections: LegalSection[] = [
  {
    heading: "1. About these terms",
    body: [
      "These terms govern your use of www.handcare.co, operated by Handcare, Industrial Area, Sialkot 51310, Punjab, Pakistan. By browsing the site or submitting an enquiry you accept them. If you do not accept them, please do not use the site.",
    ],
  },
  {
    heading: "2. What this website is",
    body: [
      "This site presents Handcare's product range and lets you request a quotation. It is an information and enquiry platform for business customers — it is not an online shop. No prices are published, no order can be placed here, and nothing on this site is an offer capable of acceptance.",
    ],
  },
  {
    heading: "3. Quotations and orders",
    body: [
      "A quotation request submitted through this site is an invitation for us to quote. A binding contract is formed only when Handcare issues a written quotation or proforma invoice and you confirm it in writing.",
      "Quotations are valid for the period stated on them. Prices, lead times, minimum order quantities and specifications are confirmed at the point of quotation and may change before then.",
    ],
  },
  {
    heading: "4. Product information and standards",
    body: [
      "Product descriptions, materials, sizes, images and referenced standards (such as CE, EN 388, EN 407 and ANSI/ISEA 105) are provided in good faith as a general guide. Because gloves are made from natural leather and are produced in batches, colour, grain and finish can vary between units and from the images shown.",
      "Certification and compliance claims apply to the specific product variants for which they were issued. Where compliance with a particular standard matters to you, confirm it in writing with us for the exact article and specification you intend to order before placing an order.",
      "It remains your responsibility to select the correct protective equipment for your application and to comply with the health and safety law that applies to you.",
    ],
  },
  {
    heading: "5. Downloadable catalogue",
    body: [
      "The product catalogue offered for download is provided for reference. It may not reflect current stock, current specifications or current pricing. In the event of any conflict, a written quotation from Handcare prevails over the catalogue and over this website.",
    ],
  },
  {
    heading: "6. Acceptable use",
    body: [
      { list: [
        "Do not use this site for any unlawful or fraudulent purpose.",
        "Do not submit false information, or another person's details, through our forms.",
        "Do not attempt to gain unauthorised access to the site, its servers or any connected system.",
        "Do not scrape, mirror or systematically extract the site's content for commercial reuse without our written permission.",
        "Do not introduce malware or otherwise interfere with the site's operation or availability.",
      ] },
    ],
  },
  {
    heading: "7. Intellectual property",
    body: [
      "The Handcare name and logo, and the text, product photography, catalogue and design of this site, are owned by Handcare or used under licence. You may view, download and print pages for the purpose of evaluating our products and doing business with us. Any other copying, republication, resale or commercial use requires our prior written permission.",
    ],
  },
  {
    heading: "8. External links",
    body: [
      "The site may link to third-party websites and social media profiles. We do not control them and are not responsible for their content, products or privacy practices. A link is not an endorsement.",
    ],
  },
  {
    heading: "9. Availability",
    body: [
      "We aim to keep the site available but do not guarantee uninterrupted access. We may change, suspend or withdraw any part of the site, including product listings and the catalogue, at any time and without notice.",
    ],
  },
  {
    heading: "10. Limitation of liability",
    body: [
      "The site and its content are provided 'as is'. To the fullest extent permitted by law, Handcare is not liable for any indirect or consequential loss, or for loss of profit, business, contracts or data, arising from your use of, or inability to use, this site or from reliance on information published on it.",
      "Nothing in these terms limits any liability that cannot be limited under applicable law, including liability for death or personal injury caused by negligence, or for fraud. Liability arising from goods we supply is governed by the terms of the relevant quotation, sales contract and applicable product safety law, not by these website terms.",
    ],
  },
  {
    heading: "11. Privacy",
    body: [
      "Information you submit through this site is handled in line with our Privacy Policy, which forms part of these terms.",
    ],
  },
  {
    heading: "12. Changes to these terms",
    body: [
      "We may revise these terms from time to time. The version published on this page at the time you use the site is the version that applies to that use.",
    ],
  },
  {
    heading: "13. Governing law",
    body: [
      "These terms and any dispute arising out of them or the use of this site are governed by the laws of Pakistan, and the courts of Sialkot, Punjab shall have jurisdiction, without prejudice to any mandatory consumer protection rights available to you locally.",
    ],
  },
]

export default function TermsOfUsePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      intro="The ground rules for using this website and for the quotations it leads to."
      updated="6 September 2026"
      sections={sections}
    />
  )
}
