import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { getBrandConfig } from '@/lib/brand-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();

  return generateBilingualMetadata(
    'FX Killer 博客 - 外汇交易知识与市场洞察丨汇刃丨外汇交易员培训、全职交易员培训',
    'FX Killer Blog - Forex Trading Insights & Market Analysis丨FX Killer丨Forex Trader Training, Full-Time Trader Training',
    '探索外汇交易的专业知识、市场分析、交易心理、职业交易员经验分享。涵盖外汇、黄金、数字货币等多个交易领域的深度文章。外汇交易员培训和全职交易员培训资源库。',
    'Explore professional forex trading knowledge, market analysis, trading psychology, and professional trader insights. In-depth articles covering forex, gold, crypto, and more. Resource hub for forex trader training and full-time trader training.',
    '外汇博客, 交易知识, 外汇交易员培训, 全职交易员培训, 市场分析, 交易心理, 职业交易员, 外汇交易技巧, 黄金交易, 数字货币交易, 交易策略分享, 市场洞察',
    'forex blog, trading knowledge, forex trader training, full-time trader training, market analysis, trading psychology, professional trader, forex trading tips, gold trading, crypto trading, trading strategy, market insights',
    lang,
    brandConfig,
    {
      url: '/splan/blog',
      type: 'website',
      section: 'Blog',
      author: 'FX Killer Team',
    }
  );
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
