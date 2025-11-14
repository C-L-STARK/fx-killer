import { getBrandConfig } from '@/lib/brand-config';
import { BrandProvider } from '@/contexts/BrandContext';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // 服务端加载品牌配置
  const brandConfig = await getBrandConfig();

  return (
    <BrandProvider config={brandConfig}>
      {children}
    </BrandProvider>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}
