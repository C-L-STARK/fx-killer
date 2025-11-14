import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { getBrandConfig } from '@/lib/brand-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();

  // 使用品牌配置动态生成标题
  const brandNameZh = brandConfig.brandName.zh;
  const brandNameEn = brandConfig.brandName.en;
  const seoKeywordsZh = brandConfig.seo.keywords.zh.slice(0, 2).join('、');
  const seoKeywordsEn = brandConfig.seo.keywords.en.slice(0, 2).join(', ');

  return generateBilingualMetadata(
    `常见问题 - 外汇交易员培训FAQ丨${brandNameZh}丨${seoKeywordsZh}`,
    `FAQ - Forex Trader Training FAQ丨${brandNameEn}丨${seoKeywordsEn}`,
    `${brandNameZh} 外汇交易员培训常见问题解答：培训是否免费、基础条件要求、考核标准、收入分配、交易铁律、时间安排等。全面了解日内交易员培训和全职交易员培训的各个方面，解答您的疑问。`,
    `${brandNameEn} forex trader training FAQ: Is training free, basic requirements, assessment standards, income distribution, trading discipline, schedule, etc. Comprehensive understanding of day trader training and full-time trader training, answering your questions.`,
    brandConfig.seo.keywords.zh.join(', ') + ', 外汇交易FAQ, 培训问题, 考核要求, 收入分配, 交易纪律, 培训条件, 外汇交易员问答',
    brandConfig.seo.keywords.en.join(', ') + ', forex trading FAQ, training questions, assessment requirements, income distribution, trading discipline, training conditions, forex trader Q&A',
    lang,
    brandConfig,
    {
      url: '/splan/faq',
      type: 'website',
      section: 'FAQ',
      author: `${brandConfig.brandName[lang]} Team`,
      useTemplate: true,
    }
  );
}

export default function FAQLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
