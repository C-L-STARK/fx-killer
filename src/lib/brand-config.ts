import { supabase } from '@/lib/supabase';

// ============ 类型定义 ============

// 联系方式图标配置
export interface ContactMethodIcon {
  type: 'builtin' | 'emoji' | 'url';
  value?: string;          // builtin图标名称 或 emoji字符
  url_light?: string;      // 亮色主题图片URL
  url_dark?: string;       // 暗色主题图片URL
}

// 联系方式配置（新的通用结构）
export interface ContactMethod {
  icon: ContactMethodIcon;
  name_zh: string;         // 中文名称
  name_en: string;         // 英文名称
  value: string;           // 联系方式值（邮箱/URL/ID等）
  action: 'modal' | 'newtab' | 'link';  // 弹窗 | 新窗口 | 本窗口跳转
  modal_content?: string;  // 弹窗内容（微信二维码URL等）
  enabled: boolean;        // 是否启用
  sort_order: number;      // 排序顺序
}

export interface ReferralCode {
  name_zh: string;
  name_en: string;
  code: string;
  benefit_zh?: string;
  benefit_en?: string;
  url: string;
}

export interface PartnerBroker {
  name_zh: string;
  name_en: string;
  url: string;
  code?: string;
  benefit_zh?: string;
  benefit_en?: string;
}

export interface PropFirm {
  name_zh: string;
  name_en: string;
  url: string;
  code?: string;
  benefit_zh?: string;
  benefit_en?: string;
}

export interface FooterBanner {
  name: string;
  image_url: string;
  link_url: string;
}

export interface BrandConfig {
  // 品牌信息
  brandName: {
    zh: string;
    en: string;
  };
  domain: string;

  // Logo
  logo: {
    light: string;
    dark: string;
  };
  favicon: string;

  // 全局邮箱
  globalEmail: string;

  // Footer 联系方式
  contactMethods: ContactMethod[];

  // 社交媒体
  social: {
    twitter?: string;
    youtube?: string;
    discord?: string;
  };

  // Footer 推荐码
  referralCodes: ReferralCode[];

  // Footer 合作经纪商
  partnerBrokers: PartnerBroker[];

  // Footer 自营交易公司
  propFirms: PropFirm[];

  // Footer 横幅
  footerBanners: FooterBanner[];
  showFooterBanners: boolean;

  // SEO 配置
  seo: {
    titleTemplate: {
      zh: string;
      en: string;
    };
    description: {
      zh: string;
      en: string;
    };
    keywords: {
      zh: string[];
      en: string[];
    };
    ogImage: string;
  };
}

// ============ 缓存机制 ============
let cachedConfig: BrandConfig | null = null;
let cacheExpires = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 分钟缓存

// ============ 加载配置 ============
export async function getBrandConfig(): Promise<BrandConfig> {
  // 检查缓存
  if (cachedConfig && cacheExpires > Date.now()) {
    return cachedConfig;
  }

  // 从 Supabase 加载
  const { data, error } = await supabase
    .from('brand_config')
    .select('*')
    .single();

  if (error || !data) {
    console.error('Failed to load brand config:', error);

    // 返回默认配置（降级处理）
    return getDefaultConfig();
  }

  // 转换数据格式
  const config: BrandConfig = {
    brandName: {
      zh: data.brand_name_zh || '汇刃',
      en: data.brand_name_en || 'FX Killer',
    },
    domain: data.brand_domain || 'fxkiller.com',
    logo: {
      light: data.logo_url || '/brand/logo.svg',
      dark: data.logo_dark_url || '/brand/logo-dark.svg',
    },
    favicon: data.favicon_url || '/brand/favicon.ico',
    globalEmail: data.contact_email || 'x.stark.dylan@gmail.com',
    contactMethods: data.contact_methods || [],
    social: {
      twitter: data.social_twitter || undefined,
      youtube: data.social_youtube || undefined,
      discord: data.social_discord || undefined,
    },
    referralCodes: data.referral_codes || [],
    partnerBrokers: data.partner_brokers || [],
    propFirms: data.prop_firms || [],
    footerBanners: data.footer_banners || [],
    showFooterBanners: data.show_footer_banners ?? true,
    seo: {
      titleTemplate: {
        zh: data.seo_title_template_zh || '{title}丨汇刃丨{keywords}',
        en: data.seo_title_template_en || '{title}丨FX Killer丨{keywords}',
      },
      description: {
        zh: data.seo_description_zh || '专注于外汇交易的职业交易员培训平台',
        en: data.seo_description_en || 'Professional forex trader training platform',
      },
      keywords: {
        zh: data.seo_keywords_zh || ['职业交易员培训', '外汇交易员培训'],
        en: data.seo_keywords_en || ['Professional Trader Training', 'Forex Trader Training'],
      },
      ogImage: data.seo_og_image_url || '/brand/og-image.png',
    },
  };

  // 更新缓存
  cachedConfig = config;
  cacheExpires = Date.now() + CACHE_TTL;

  return config;
}

// ============ 默认配置（降级处理）============
function getDefaultConfig(): BrandConfig {
  return {
    brandName: { zh: '汇刃', en: 'FX Killer' },
    domain: 'fxkiller.com',
    logo: { light: '/brand/logo.svg', dark: '/brand/logo-dark.svg' },
    favicon: '/brand/favicon.ico',
    globalEmail: 'x.stark.dylan@gmail.com',
    contactMethods: [
      {
        icon: { type: 'builtin', value: 'mail' },
        name_zh: '邮箱',
        name_en: 'Email',
        value: '',
        enabled: true,
        action: 'modal',
        sort_order: 1,
      },
    ],
    social: {},
    referralCodes: [],
    partnerBrokers: [],
    propFirms: [],
    footerBanners: [],
    showFooterBanners: false,
    seo: {
      titleTemplate: {
        zh: '{title}丨汇刃丨{keywords}',
        en: '{title}丨FX Killer丨{keywords}',
      },
      description: {
        zh: '专注于外汇交易的职业交易员培训平台',
        en: 'Professional forex trader training platform',
      },
      keywords: {
        zh: ['职业交易员培训', '外汇交易员培训'],
        en: ['Professional Trader Training', 'Forex Trader Training'],
      },
      ogImage: '/brand/og-image.png',
    },
  };
}

// ============ 清除缓存 ============
export function clearBrandConfigCache() {
  cachedConfig = null;
  cacheExpires = 0;
}

// ============ 切换品牌预设（测试用）============
export async function switchBrandPreset(presetName: string): Promise<boolean> {
  // 1. 获取预设数据
  const { data: preset, error: presetError } = await supabase
    .from('brand_presets')
    .select('preset_data')
    .eq('preset_name', presetName)
    .single();

  if (presetError || !preset) {
    console.error('Preset not found:', presetName);
    return false;
  }

  // 2. 更新 brand_config 表
  const { error: updateError } = await supabase
    .from('brand_config')
    .update(preset.preset_data)
    .eq('id', (await supabase.from('brand_config').select('id').single()).data?.id);

  if (updateError) {
    console.error('Failed to switch preset:', updateError);
    return false;
  }

  // 3. 清除缓存
  clearBrandConfigCache();

  return true;
}

// ============ 获取所有预设列表（测试用）============
export async function getBrandPresets(): Promise<string[]> {
  const { data, error } = await supabase
    .from('brand_presets')
    .select('preset_name')
    .order('preset_name');

  if (error || !data) {
    return [];
  }

  return data.map(p => p.preset_name);
}

// ============ SEO 标题生成器 ============
export function generateSEOTitle(
  pageTitle: string,
  keywords: string[],
  locale: 'zh' | 'en',
  config: BrandConfig
): string {
  const template = config.seo.titleTemplate[locale];
  const keywordStr = keywords.slice(0, 2).join('、'); // 最多取2个关键词

  return template
    .replace('{title}', pageTitle)
    .replace('{keywords}', keywordStr);
}
