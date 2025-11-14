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
    `加入${brandNameZh} - 30天成为职业外汇交易员丨${brandNameZh}丨${seoKeywordsZh}`,
    `Join ${brandNameEn} - Become a Professional Forex Trader in 30 Days丨${brandNameEn}丨${seoKeywordsEn}`,
    `${brandNameZh}职业交易员培训计划：30天系统化培训，通过考核获得真实资金交易权限，分润高达90%。专业导师指导，实战训练，风险管理，助你成为盈利的职业交易员。完整的职业交易员培训和外汇交易员培训体系。`,
    `${brandNameEn} professional trader training program: 30-day systematic training, pass evaluation to get real funded trading account, up to 90% profit split. Expert mentorship, practical training, risk management - become a profitable professional trader. Complete professional trader training and forex trader training system.`,
    brandConfig.seo.keywords.zh.join(', ') + ', 外汇交易员, 职业交易员, 交易员招募, 资金管理, 外汇培训计划, 交易员考核, 盈利分成, 专业交易培训',
    brandConfig.seo.keywords.en.join(', ') + ', forex trader, professional trader, trader recruitment, funded account, forex training program, trader evaluation, profit split, professional trading education',
    lang,
    brandConfig,
    {
      url: '/splan/join-us',
      type: 'website',
      section: 'Recruitment',
      author: `${brandConfig.brandName[lang]} Team`,
      useTemplate: true,
    }
  );
}

export default function JoinUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
