# 品牌配置指南 / Brand Configuration Guide

本项目支持通过环境变量灵活配置品牌信息、联系方式、合作伙伴链接等。

This project supports flexible configuration of brand information, contact details, partner links, etc. via environment variables.

## 快速开始 / Quick Start

### 1. 创建环境变量文件 / Create Environment File

复制示例文件并根据需要修改：
Copy the example file and modify as needed:

```bash
cp .env.example .env.local
```

### 2. 配置环境变量 / Configure Environment Variables

编辑 `.env.local` 文件，修改以下配置：
Edit `.env.local` file and modify the following configurations:

```bash
# 品牌名称 / Brand Name
NEXT_PUBLIC_BRAND_NAME_ZH=汇刃
NEXT_PUBLIC_BRAND_NAME_EN=FX Killer

# 品牌口号 / Slogan
NEXT_PUBLIC_SLOGAN_ZH=掌握市场，成就财富
NEXT_PUBLIC_SLOGAN_EN=Master the Market, Build Your Wealth

# 域名 / Domain
NEXT_PUBLIC_DOMAIN=fxkiller.com
NEXT_PUBLIC_SITE_URL=https://fxkiller.com

# 联系邮箱 / Contact Email
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com

# 微信号 / WeChat ID
NEXT_PUBLIC_WECHAT_ID=YourWeChatID

# 社交媒体 / Social Media
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/your_channel
NEXT_PUBLIC_TWITTER_URL=https://x.com/YourTwitterHandle
NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/@YourChannel

# 经纪商链接 / Broker Links
NEXT_PUBLIC_EC_MARKETS_URL=https://your-ec-markets-affiliate-link
NEXT_PUBLIC_TICKMILL_URL=https://your-tickmill-affiliate-link

# ... 更多配置见 .env.example
```

### 3. 重启开发服务器 / Restart Development Server

修改环境变量后需要重启：
After modifying environment variables, restart:

```bash
npm run dev
```

## 配置项说明 / Configuration Options

### 品牌配置 / Brand Configuration

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `NEXT_PUBLIC_BRAND_NAME_ZH` | 中文品牌名 | 汇刃 |
| `NEXT_PUBLIC_BRAND_NAME_EN` | 英文品牌名 | FX Killer |
| `NEXT_PUBLIC_SLOGAN_ZH` | 中文口号 | 掌握市场，成就财富 |
| `NEXT_PUBLIC_SLOGAN_EN` | 英文口号 | Master the Market, Build Your Wealth |

### 站点信息 / Site Information

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `NEXT_PUBLIC_DOMAIN` | 域名 | fxkiller.com |
| `NEXT_PUBLIC_SITE_URL` | 完整网址 | https://fxkiller.com |

### 联系方式 / Contact Information

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `NEXT_PUBLIC_CONTACT_EMAIL` | 联系邮箱 | x.stark.dylan@gmail.com |
| `NEXT_PUBLIC_WECHAT_ID` | 微信号 | DerrenX |

### 社交媒体 / Social Media

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `NEXT_PUBLIC_TELEGRAM_URL` | Telegram链接 | https://t.me/binance_cashcontrol |
| `NEXT_PUBLIC_TWITTER_URL` | Twitter/X链接 | https://x.com/RealFXkiller |
| `NEXT_PUBLIC_YOUTUBE_URL` | YouTube链接 | https://www.youtube.com/@FX-Killer-Trader |

### 合作伙伴 / Partners

#### 经纪商 / Brokers

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `NEXT_PUBLIC_EC_MARKETS_URL` | EC Markets链接 | [默认链接] |
| `NEXT_PUBLIC_TICKMILL_URL` | TickMill链接 | [默认链接] |

#### 模拟资金公司 / Prop Firms

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `NEXT_PUBLIC_FTMO_URL` | FTMO链接 | https://ftmo.com/ |
| `NEXT_PUBLIC_FUNDEDNEXT_URL` | FundedNext链接 | https://fundednext.com/ |

#### 平台 / Platforms

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `NEXT_PUBLIC_METAAPI_URL` | MetaAPI链接 | https://metaapi.cloud/ |
| `NEXT_PUBLIC_METATRADER_URL` | MetaTrader链接 | https://www.metatrader4.com/ |

### 视频链接 / Video Links

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `NEXT_PUBLIC_VIDEO_DOC1_URL` | 纪录片1链接 | [B站链接] |
| `NEXT_PUBLIC_VIDEO_DOC2_URL` | 纪录片2链接 | [B站链接] |

## 代码中使用 / Usage in Code

### 导入配置 / Import Configuration

```typescript
import { config, getBrandName, getSlogan } from '@/lib/config';
```

### 使用示例 / Usage Examples

```typescript
// 获取品牌名称
const brandName = getBrandName(language); // language: 'zh' | 'en'

// 获取口号
const slogan = getSlogan(language);

// 获取联系邮箱
const email = config.contact.email;

// 获取社交媒体链接
const telegramUrl = config.social.telegram;

// 获取合作伙伴链接
const ecMarketsUrl = config.partners.brokers.ecMarkets;
```

### React组件中使用 / Use in React Components

```tsx
import { config, getBrandName } from '@/lib/config';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MyComponent() {
  const { language } = useLanguage();

  return (
    <div>
      <h1>{getBrandName(language)}</h1>
      <a href={config.social.telegram}>Telegram</a>
      <a href={`mailto:${config.contact.email}`}>Email</a>
    </div>
  );
}
```

## 注意事项 / Important Notes

### 环境变量前缀 / Environment Variable Prefix

所有客户端可访问的环境变量必须以 `NEXT_PUBLIC_` 开头。

All client-accessible environment variables must start with `NEXT_PUBLIC_`.

### 环境文件优先级 / Environment File Priority

Next.js 按以下顺序加载环境文件（优先级从高到低）：

Next.js loads environment files in the following order (highest to lowest priority):

1. `.env.local` - 本地开发配置（不提交到Git）/ Local development config (not committed to Git)
2. `.env.production` - 生产环境配置 / Production config
3. `.env` - 所有环境的默认配置 / Default config for all environments

### 安全性 / Security

- ⚠️ **不要**将 `.env.local` 文件提交到Git仓库
- ⚠️ **不要**在环境变量中存储敏感信息（如API密钥、密码等）
- ✅ 使用 `.env.example` 作为模板，提交到Git
- ✅ 在生产环境使用服务器环境变量或密钥管理服务

- ⚠️ **DO NOT** commit `.env.local` files to Git
- ⚠️ **DO NOT** store sensitive information in environment variables (like API keys, passwords)
- ✅ Use `.env.example` as a template and commit it to Git
- ✅ Use server environment variables or secret management services in production

## 部署配置 / Deployment Configuration

### Vercel

在 Vercel 项目设置中添加环境变量：
Add environment variables in Vercel project settings:

1. 进入项目设置 → Environment Variables
2. 添加所需的环境变量
3. 重新部署项目

### 其他平台 / Other Platforms

根据部署平台的文档配置环境变量。
Configure environment variables according to your deployment platform's documentation.

## 故障排除 / Troubleshooting

### 环境变量未生效 / Environment Variables Not Working

1. 确认环境变量名称正确（区分大小写）
2. 确认以 `NEXT_PUBLIC_` 开头（客户端使用）
3. 重启开发服务器
4. 清除 `.next` 缓存：`rm -rf .next`

### 获取默认值而非自定义值 / Getting Default Values Instead of Custom

1. 检查 `.env.local` 文件是否在项目根目录
2. 检查环境变量格式是否正确（无引号，无空格）
3. 确认没有语法错误

## 更多信息 / More Information

- [Next.js 环境变量文档](https://nextjs.org/docs/basic-features/environment-variables)
- [项目配置文件](./src/lib/config.ts)
- [环境变量示例](..env.example)
