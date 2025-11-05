/**
 * Brand and Site Configuration
 * 品牌和网站配置
 *
 * This file centralizes all brand-related configuration.
 * Values can be overridden via environment variables.
 * 此文件集中管理所有品牌相关配置。
 * 可通过环境变量覆盖默认值。
 */

export const config = {
  // Brand Names (品牌名称)
  brand: {
    name: {
      zh: process.env.NEXT_PUBLIC_BRAND_NAME_ZH || '汇刃',
      en: process.env.NEXT_PUBLIC_BRAND_NAME_EN || 'FX Killer',
    },
    slogan: {
      zh: process.env.NEXT_PUBLIC_SLOGAN_ZH || '掌握市场，成就财富',
      en: process.env.NEXT_PUBLIC_SLOGAN_EN || 'Master the Market, Build Your Wealth',
    },
  },

  // Site Information (站点信息)
  site: {
    domain: process.env.NEXT_PUBLIC_DOMAIN || 'fxkiller.com',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fxkiller.com',
  },

  // Contact Information (联系方式)
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'x.stark.dylan@gmail.com',
    wechatId: process.env.NEXT_PUBLIC_WECHAT_ID || 'DerrenX',
  },

  // Social Media (社交媒体)
  social: {
    telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/binance_cashcontrol',
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://x.com/RealFXkiller',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://www.youtube.com/@FX-Killer-Trader',
  },

  // Partner Links (合作伙伴链接)
  partners: {
    brokers: {
      ecMarkets: process.env.NEXT_PUBLIC_EC_MARKETS_URL || 'https://i.ecmarkets.com/api/client/pm/2/99R9C',
      tickmill: process.env.NEXT_PUBLIC_TICKMILL_URL || 'https://my.tickmill.com?utm_campaign=ib_link&utm_content=IB47958600&utm_medium=Open+Account&utm_source=link&lp=https%3A%2F%2Fmy.tickmill.com%2Fzh%2Fsign-up%2F',
    },
    propFirms: {
      ftmo: process.env.NEXT_PUBLIC_FTMO_URL || 'https://ftmo.com/',
      fundedNext: process.env.NEXT_PUBLIC_FUNDEDNEXT_URL || 'https://fundednext.com/',
    },
    platforms: {
      metaApi: process.env.NEXT_PUBLIC_METAAPI_URL || 'https://metaapi.cloud/',
      metaTrader: process.env.NEXT_PUBLIC_METATRADER_URL || 'https://www.metatrader4.com/',
    },
  },

  // Video Links (视频链接)
  videos: {
    doc1: process.env.NEXT_PUBLIC_VIDEO_DOC1_URL || 'https://www.bilibili.com/video/BV19a411X7eY',
    doc2: process.env.NEXT_PUBLIC_VIDEO_DOC2_URL || 'https://www.bilibili.com/video/BV1FZ4y1o734',
  },

  // SEO (搜索引擎优化)
  seo: {
    metaDescription: {
      zh: process.env.NEXT_PUBLIC_META_DESCRIPTION_ZH || '汇刃 - 专业外汇交易培训平台，提供系统化交易课程、心理测试和实战工具',
      en: process.env.NEXT_PUBLIC_META_DESCRIPTION_EN || 'FX Killer - Professional forex trading education platform with systematic courses, psychology tests, and practical tools',
    },
  },

  // Company Information (公司信息)
  company: {
    copyrightText: process.env.NEXT_PUBLIC_COPYRIGHT_TEXT || 'FX Killer. All rights reserved.',
    establishedYear: process.env.NEXT_PUBLIC_ESTABLISHED_YEAR || '2024',
  },
} as const;

// Helper function to get brand name based on language
export function getBrandName(language: 'zh' | 'en'): string {
  return config.brand.name[language];
}

// Helper function to get slogan based on language
export function getSlogan(language: 'zh' | 'en'): string {
  return config.brand.slogan[language];
}

// Helper function to get meta description based on language
export function getMetaDescription(language: 'zh' | 'en'): string {
  return config.seo.metaDescription[language];
}
