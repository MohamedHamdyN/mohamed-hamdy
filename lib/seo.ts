import { db } from '@/lib/db'
import { Metadata } from 'next'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

export async function getDynamicMetadata(): Promise<{
  title: string
  description: string
  ogImage: string
  siteUrl: string
}> {
  try {
    const result = await db.query`
      SELECT key, value FROM site_settings
      WHERE key IN ('site_title', 'site_description', 'og_image', 'site_url')
    `

    const settings: Record<string, string> = {}

    result.forEach((row: any) => {
      settings[row.key] = row.value
    })

    return {
      title: settings['site_title'] || 'Portfolio',
      description: settings['site_description'] || 'Professional portfolio',
      ogImage: settings['og_image'] || '/og-image.png',
      siteUrl: settings['site_url'] || 'https://yourwebsite.com',
    }
  } catch (error) {
    console.error('Error fetching dynamic metadata:', error)
    return {
      title: 'Portfolio',
      description: 'Professional portfolio',
      ogImage: '/og-image.png',
      siteUrl: 'https://yourwebsite.com',
    }
  }
}

export async function generateDynamicMetadata(pageTitle?: string): Promise<Metadata> {
  const siteMetadata = await getDynamicMetadata()

  const title = pageTitle ? `${pageTitle} | ${siteMetadata.title}` : siteMetadata.title

  return {
    title,
    description: siteMetadata.description,
    metadataBase: new URL(siteMetadata.siteUrl),
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteMetadata.siteUrl,
      title,
      description: siteMetadata.description,
      siteName: siteMetadata.title,
      images: [
        {
          url: siteMetadata.ogImage,
          width: 1200,
          height: 630,
          alt: siteMetadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: siteMetadata.description,
      images: [siteMetadata.ogImage],
    },
  }
}
