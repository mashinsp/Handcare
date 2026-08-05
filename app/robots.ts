import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot', 'anthropic-ai', 'ClaudeBot', 'CCBot', 'Bytespider'],
        allow: '/',
      },
    ],
    sitemap: 'https://www.handcare.co/sitemap.xml',
  }
}
