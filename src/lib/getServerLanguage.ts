import { BrandConfig } from './brand-config';

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
 * Generate metadata for both languages with brand configuration
 * Supports using brand SEO templates or custom titles/descriptions
 */
export function generateBilingualMetadata(
  zhTitle: string,
  enTitle: string,
  zhDescription: string,
  enDescription: string,
  zhKeywords: string,
  enKeywords: string,
  language: Language,
  brandConfig: BrandConfig,
  options?: {
    url?: string;
    image?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    useTemplate?: boolean; // 新增：是否使用品牌 SEO 模板
  }
) {
  // 如果启用模板且品牌配置中有 SEO 配置，则使用模板
  let title = language === 'zh' ? zhTitle : enTitle;
  let description = language === 'zh' ? zhDescription : enDescription;

  if (options?.useTemplate !== false && brandConfig?.seo) {
    // 使用品牌 SEO 模板和配置
    title = language === 'zh' ? zhTitle : enTitle;
    description = brandConfig.seo.description[language] || description;
  }

  const keywords = language === 'zh' ? zhKeywords : enKeywords;
  const baseUrl = `https://${brandConfig?.domain || 'fxkiller.com'}`;
  const locale = language === 'zh' ? 'zh' : 'en';
  const url = options?.url || '';
  const siteName = brandConfig?.brandName
    ? `${brandConfig.brandName.en} | ${brandConfig.brandName.zh}`
    : 'FX Killer | 汇刃';
  const creator = brandConfig?.brandName?.[language] || (language === 'zh' ? '汇刃' : 'FX Killer');
  const ogImage = options?.image || brandConfig?.seo?.ogImage || '/og-image.jpg';

  // Extract Twitter handle from URL if available
  const twitterHandle = brandConfig?.social?.twitter
    ? brandConfig.social.twitter.replace('https://twitter.com/', '@').replace('https://x.com/', '@')
    : undefined;

  return {
    title,
    description,
    keywords: keywords.split(',').map(k => k.trim()),
    authors: options?.author
      ? [{ name: options.author }]
      : [{ name: `${brandConfig?.brandName?.[language] || (language === 'zh' ? '汇刃' : 'FX Killer')} Team` }],
    creator,
    publisher: creator,
    category: options?.section || 'education',
    alternates: url ? {
      canonical: `${baseUrl}/${locale}${url}`,
      languages: {
        'zh-CN': `${baseUrl}/zh${url}`,
        'en-US': `${baseUrl}/en${url}`,
      },
    } : undefined,
    openGraph: {
      title,
      description,
      type: (options?.type || 'website') as 'website' | 'article',
      locale: language === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: language === 'zh' ? ['en_US'] : ['zh_CN'],
      url: url ? `${baseUrl}/${locale}${url}` : undefined,
      siteName,
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      }],
      ...(options?.type === 'article' && {
        publishedTime: options.publishedTime,
        modifiedTime: options.modifiedTime,
        section: options.section,
        authors: options?.author
          ? [options.author]
          : [`${brandConfig?.brandName?.[language] || (language === 'zh' ? '汇刃' : 'FX Killer')} Team`],
      }),
    },
    twitter: {
      card: 'summary_large_image' as const,
      site: twitterHandle,
      creator: twitterHandle,
      title,
      description,
      images: [ogImage],
    },
  };
}
