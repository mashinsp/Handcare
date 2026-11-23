export interface Faq {
  question: string
  /** Plain text. Rendered as-is and reused verbatim in the FAQPage JSON-LD. */
  answer: string
}

/**
 * Home-page FAQ. Every claim here is already published elsewhere on the site
 * (llms.txt, structured data, footer). Pricing, MOQ and lead time are
 * deliberately not stated: they are quote-based and vary by order.
 */
export const HOME_FAQS: readonly Faq[] = [
  {
    question: "Where is Handcare based and what do you manufacture?",
    answer:
      "Handcare is a leather glove manufacturer and exporter based in Sialkot, Pakistan, with over 25 years of experience. We make industrial, safety, sports and outdoor gloves, including working, mechanical, gardening, riding, Canadian, boxing and driving gloves.",
  },
  {
    question: "Is Handcare ISO certified, and which standards do your gloves meet?",
    answer:
      "Yes. Handcare is ISO 9001:2015 certified. Depending on the glove, our products are made to CE marking, EN 388 (mechanical risks), EN 407 (heat resistance) and ANSI/ISEA 105 requirements.",
  },
  {
    question: "Do you offer OEM, ODM and private-label glove manufacturing?",
    answer:
      "Yes. We produce custom and private-label gloves to your specification. Leather options include cow hide, goat skin, sheep skin and deer skin. Send us your design, material and standard requirements through the quote form.",
  },
  {
    question: "What is your minimum order quantity and how is pricing set?",
    answer:
      "Pricing and minimum order quantity depend on the glove style, leather, finish, certification and order volume, so we quote each enquiry individually. Tell us the product category, the required standard and your approximate volume, and we will reply with pricing and order terms.",
  },
  {
    question: "Which countries do you export to?",
    answer:
      "We supply wholesale and bulk orders to buyers in more than 50 countries, including the Middle East and GCC, Europe and North America. Our output exceeds 500,000 pairs of gloves a year.",
  },
  {
    question: "Do you sell single pairs to individual customers?",
    answer:
      "No. Handcare is a B2B manufacturer, exporter and wholesale supplier, not a retail store. Our products are sold to distributors, importers, brands and industrial buyers in bulk.",
  },
  {
    question: "Can I get a catalogue or samples before placing an order?",
    answer:
      "You can download our product catalogue as a PDF from the website. For samples, mention the styles you are interested in when you contact us and we will discuss the options with you.",
  },
  {
    question: "How do I request a quote?",
    answer:
      "Use the Request Quote page on this website, or contact us directly at handcare514@gmail.com or +92 301 426 4385. Include the glove type, the standard you need (such as EN 388 or CE), your quantity and your destination country.",
  },
]
