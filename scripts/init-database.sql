-- ============================================
-- FX Killer 品牌化配置数据库初始化脚本
-- ============================================

-- 1. 品牌配置表（单例表）
CREATE TABLE IF NOT EXISTS brand_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- ============ 品牌信息 ============
  brand_name_zh VARCHAR(100) NOT NULL DEFAULT '汇刃',
  brand_name_en VARCHAR(100) NOT NULL DEFAULT 'FX Killer',
  brand_domain VARCHAR(255) NOT NULL DEFAULT 'fxkiller.com',

  -- Logo 文件 URL（Supabase Storage 路径）
  logo_url TEXT DEFAULT '/brand/logo.svg',
  logo_dark_url TEXT DEFAULT '/brand/logo-dark.svg',
  favicon_url TEXT DEFAULT '/brand/favicon.ico',

  -- ============ 全局邮箱配置 ============
  contact_email VARCHAR(255) NOT NULL DEFAULT 'x.stark.dylan@gmail.com',

  -- ============ Footer 联系方式配置 ============
  -- 联系方式 JSON 数组（通用结构，支持动态添加）
  -- 每个联系方式包含：
  --   icon: { type: 'builtin'|'emoji'|'url', value, url_light?, url_dark? }
  --   name_zh: 中文名称
  --   name_en: 英文名称
  --   value: 联系方式值（邮箱/URL/ID等）
  --   action: 'modal'|'newtab'|'link' (弹窗|新窗口|本窗口跳转)
  --   modal_content: 弹窗内容（微信二维码URL等）
  --   enabled: 是否启用
  --   sort_order: 排序顺序
  contact_methods JSONB DEFAULT '[
    {
      "icon": {"type": "builtin", "value": "mail"},
      "name_zh": "邮箱",
      "name_en": "Email",
      "value": "",
      "action": "modal",
      "enabled": true,
      "sort_order": 1
    },
    {
      "icon": {"type": "builtin", "value": "message-circle"},
      "name_zh": "微信",
      "name_en": "WeChat",
      "value": "fx_killer_wechat",
      "action": "modal",
      "modal_content": "",
      "enabled": false,
      "sort_order": 2
    }
  ]',

  -- 社交媒体链接
  social_twitter VARCHAR(255),
  social_youtube VARCHAR(255),
  social_discord VARCHAR(255),

  -- ============ Footer 推荐码配置 ============
  referral_codes JSONB DEFAULT '[
    {
      "name_zh": "Binance",
      "name_en": "Binance",
      "code": "71591417",
      "benefit_zh": "5%优惠",
      "benefit_en": "5% discount",
      "url": "https://www.binance.com/zh-CN/register?ref=71591417"
    },
    {
      "name_zh": "FundedNext",
      "name_en": "FundedNext",
      "code": "fx_killer",
      "benefit_zh": "5%优惠",
      "benefit_en": "5% discount",
      "url": "https://fundednext.com/?ref=fx_killer"
    },
    {
      "name_zh": "EC Markets",
      "name_en": "EC Markets",
      "code": "99R9C",
      "benefit_zh": "全返",
      "benefit_en": "Full Refund",
      "url": "https://www.ecmarkets.com"
    },
    {
      "name_zh": "TickMill",
      "name_en": "TickMill",
      "code": "IB47958600",
      "benefit_zh": "全返",
      "benefit_en": "Full Refund",
      "url": "https://www.tickmill.com"
    }
  ]',

  -- ============ Footer 合作经纪商配置 ============
  partner_brokers JSONB DEFAULT '[]',

  -- ============ Footer 自营交易公司配置 ============
  prop_firms JSONB DEFAULT '[]',

  -- ============ Footer 推广横幅配置 ============
  footer_banners JSONB DEFAULT '[
    {
      "name": "FTMO",
      "image_url": "https://cdn.ftmo.com/ed1811ad91444ae687a19020a9997a86",
      "link_url": "https://ftmo.com/?affiliates=UUdNjacFYttdgsZcEozt"
    },
    {
      "name": "TickMill",
      "image_url": "https://cdn.tickmill.com/prod/promotional/3/referral-materials/banner/static/IB_Loyalty_-_CN-728x90-Chinese.jpg",
      "link_url": "https://my.tickmill.com?utm_campaign=ib_link&utm_content=IB47958600&utm_medium=IB+Loyalty&utm_source=link&lp=https%3A%2F%2Fwww.tickmill.com%2Fpartners%2Fib-loyalty"
    }
  ]',

  -- 是否显示底部推广横幅
  show_footer_banners BOOLEAN DEFAULT true,

  -- ============ SEO 配置 ============
  seo_title_template_zh VARCHAR(200) DEFAULT '{title}丨汇刃丨{keywords}',
  seo_title_template_en VARCHAR(200) DEFAULT '{title}丨FX Killer丨{keywords}',
  seo_description_zh TEXT DEFAULT '专注于外汇交易的职业交易员培训平台，用专业的方法筛选和培养真正适合外汇市场的交易人才。',
  seo_description_en TEXT DEFAULT 'Professional forex trader training platform focused on selecting and cultivating truly suited trading talent.',
  seo_keywords_zh TEXT[] DEFAULT ARRAY['职业交易员培训', '外汇交易员培训', '日内交易员培训', '全职交易员培训'],
  seo_keywords_en TEXT[] DEFAULT ARRAY['Professional Trader Training', 'Forex Trader Training', 'Day Trader Training', 'Full-Time Trader Training'],
  seo_og_image_url TEXT DEFAULT '/brand/og-image.png',

  -- ============ 时间戳 ============
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 确保只有一行配置
CREATE UNIQUE INDEX IF NOT EXISTS single_brand_config ON brand_config ((id IS NOT NULL));

-- 插入默认配置（汇刃/FX Killer 的配置）
INSERT INTO brand_config (contact_email)
VALUES ('x.stark.dylan@gmail.com')
ON CONFLICT DO NOTHING;

-- 自动更新 updated_at 触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_brand_config_updated_at ON brand_config;
CREATE TRIGGER update_brand_config_updated_at
  BEFORE UPDATE ON brand_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 2. 品牌预设表（用于快速切换品牌 - 测试用）
-- ============================================
CREATE TABLE IF NOT EXISTS brand_presets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  preset_name VARCHAR(100) UNIQUE NOT NULL,
  preset_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 插入默认预设：汇刃/FX Killer
INSERT INTO brand_presets (preset_name, preset_data)
VALUES ('fxkiller', jsonb_build_object(
  'brand_name_zh', '汇刃',
  'brand_name_en', 'FX Killer',
  'brand_domain', 'fxkiller.com',
  'contact_email', 'x.stark.dylan@gmail.com',
  'logo_url', '/brand/logo.svg',
  'logo_dark_url', '/brand/logo-dark.svg',
  'favicon_url', '/brand/favicon.ico',
  'seo_title_template_zh', '{title}丨汇刃丨{keywords}',
  'seo_title_template_en', '{title}丨FX Killer丨{keywords}',
  'seo_description_zh', '专注于外汇交易的职业交易员培训平台，用专业的方法筛选和培养真正适合外汇市场的交易人才。',
  'seo_description_en', 'Professional forex trader training platform focused on selecting and cultivating truly suited trading talent.'
))
ON CONFLICT (preset_name) DO NOTHING;

-- 插入测试预设：测试品牌
INSERT INTO brand_presets (preset_name, preset_data)
VALUES ('testbrand', jsonb_build_object(
  'brand_name_zh', '测试品牌',
  'brand_name_en', 'Test Brand',
  'brand_domain', 'testbrand.com',
  'contact_email', 'hello@testbrand.com',
  'logo_url', '/brand/logo.svg',
  'logo_dark_url', '/brand/logo-dark.svg',
  'favicon_url', '/brand/favicon.ico',
  'seo_title_template_zh', '{title}丨测试品牌丨{keywords}',
  'seo_title_template_en', '{title}丨Test Brand丨{keywords}',
  'seo_description_zh', '这是一个测试品牌，用于验证配置系统是否正常工作。',
  'seo_description_en', 'This is a test brand to verify the configuration system works properly.'
))
ON CONFLICT (preset_name) DO NOTHING;

-- ============================================
-- 3. Storage Bucket 创建
-- ============================================
-- 注意：这部分需要在 Supabase Dashboard 的 Storage 中手动创建
-- Bucket Name: brand-assets
-- Public: true

-- 如果使用 SQL 创建（需要 service_role 权限）：
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('brand-assets', 'brand-assets', true)
-- ON CONFLICT DO NOTHING;

-- Storage 策略
-- CREATE POLICY "Public Read Access"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'brand-assets');

-- CREATE POLICY "Public Upload"
-- ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'brand-assets');

-- CREATE POLICY "Public Delete"
-- ON storage.objects FOR DELETE
-- USING (bucket_id = 'brand-assets');
