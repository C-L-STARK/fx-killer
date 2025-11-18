export type Language = 'zh' | 'en';

/**
 * Get language from locale param (for Server Components with [locale] routing)
 * @param locale - The locale from URL params
 * @returns Language type
 */
export function getLanguageFromLocale(locale: string): Language {
  return locale === 'en' ? 'en' : 'zh';
}

/**
 * Legacy function for backward compatibility
 * Now just returns 'zh' as default since we use URL-based routing
 * @deprecated Use getLanguageFromLocale with params instead
 */
export async function getServerLanguage(): Promise<Language> {
  return 'zh';
}

/**
 * Generate metadata for both languages
 */
export function generateBilingualMetadata(
  zhTitle: string,
  enTitle: string,
  zhDescription: string,
  enDescription: string,
  zhKeywords: string,
  enKeywords: string,
  language: Language,
  options?: {
    url?: string;
    image?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  }
) {
  const title = language === 'zh' ? zhTitle : enTitle;
  const description = language === 'zh' ? zhDescription : enDescription;
  const keywords = language === 'zh' ? zhKeywords : enKeywords;
  const baseUrl = 'https://fxkiller.com';
  const locale = language === 'zh' ? 'zh' : 'en';
  const url = options?.url || '';

  return {
    title,
    description,
    keywords: keywords.split(',').map(k => k.trim()),
    authors: options?.author ? [{ name: options.author }] : [{ name: 'FX Killer Team' }],
    creator: 'FX Killer',
    publisher: 'FX Killer',
    category: options?.section || 'education',
    alternates: url ? {
      canonical: `${baseUrl}/${locale}${url}`,
      languages: {
        'zh-CN': `${baseUrl}/zh${url}`,
        'en-US': `${baseUrl}/en${url}`,
        'x-default': `${baseUrl}/zh${url}`,
      },
    } : undefined,
    openGraph: {
      title,
      description,
      type: (options?.type || 'website') as 'website' | 'article',
      locale: language === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: language === 'zh' ? ['en_US'] : ['zh_CN'],
      url: url ? `${baseUrl}/${locale}${url}` : undefined,
      siteName: 'FX Killer | 汇刃',
      images: options?.image ? [{
        url: options.image,
        width: 1200,
        height: 630,
        alt: title,
      }] : [{
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FX Killer - Professional FX Trader Training Platform',
      }],
      ...(options?.type === 'article' && {
        publishedTime: options.publishedTime,
        modifiedTime: options.modifiedTime,
        section: options.section,
        authors: options?.author ? [options.author] : ['FX Killer Team'],
      }),
    },
    twitter: {
      card: 'summary_large_image' as const,
      site: '@RealFXkiller',
      creator: '@RealFXkiller',
      title,
      description,
      images: options?.image ? [options.image] : ['/og-image.jpg'],
    },
  };
}
