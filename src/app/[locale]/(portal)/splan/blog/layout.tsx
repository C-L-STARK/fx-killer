import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    'FX Killer 博客 - 外汇交易知识与市场洞察 | 汇刃',
    'FX Killer Blog - Forex Trading Insights & Market Analysis',
    '探索外汇交易的专业知识、市场分析、交易心理、职业交易员经验分享。涵盖外汇、黄金、数字货币等多个交易领域的深度文章。',
    'Explore professional forex trading knowledge, market analysis, trading psychology, and professional trader insights. In-depth articles covering forex, gold, crypto, and more.',
    '外汇博客, 交易知识, 市场分析, 交易心理, 职业交易员, 外汇交易技巧, 黄金交易, 数字货币交易, 交易策略分享, 市场洞察',
    'forex blog, trading knowledge, market analysis, trading psychology, professional trader, forex trading tips, gold trading, crypto trading, trading strategy, market insights',
    lang,
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
