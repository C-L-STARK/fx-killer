import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { getBrandConfig } from '@/lib/brand-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();

  // 使用品牌配置的 SEO 标题模板和描述
  const brandNameZh = brandConfig.brandName.zh;
  const brandNameEn = brandConfig.brandName.en;
  const seoKeywordsZh = brandConfig.seo.keywords.zh.slice(0, 2).join('、');
  const seoKeywordsEn = brandConfig.seo.keywords.en.slice(0, 2).join(', ');

  // 构建标题
  const zhTitle = `职业交易员培训平台丨${brandNameZh}丨${seoKeywordsZh}`;
  const enTitle = `Professional Trader Training Platform丨${brandNameEn}丨${seoKeywordsEn}`;

  // 使用品牌配置的描述
  const zhDescription = brandConfig.seo.description.zh;
  const enDescription = brandConfig.seo.description.en;

  // 使用品牌配置的关键词
  const zhKeywords = brandConfig.seo.keywords.zh.join(', ');
  const enKeywords = brandConfig.seo.keywords.en.join(', ');

  return generateBilingualMetadata(
    zhTitle,
    enTitle,
    zhDescription,
    enDescription,
    zhKeywords,
    enKeywords,
    lang,
    brandConfig,
    {
      url: '/',
      type: 'website',
      section: 'Home',
      author: `${brandConfig.brandName[lang]} Team`,
      useTemplate: true, // 启用品牌 SEO 模板
    }
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData />
      {children}
    </>
  );
}
