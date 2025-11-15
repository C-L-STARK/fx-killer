import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { getBrandConfig } from '@/lib/brand-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();

  return generateBilingualMetadata(
    '点值计算器丨汇刃丨外汇交易员培训、职业交易员培训',
    'Pip Calculator丨FX Killer丨Forex Trader Training, Professional Trader Training',
    '免费在线外汇点值计算器，支持所有主要货币对。精准计算每点价值，帮助职业交易员和日内交易员科学管理风险，提升交易精度。外汇交易员培训和职业交易员培训必备工具。',
    'Free online forex pip value calculator for all major currency pairs. Accurately calculate pip value to help professional traders and day traders manage risk scientifically. Essential tool for forex trader training and professional trader training.',
    '点值计算器, pip计算器, 外汇点值, 外汇交易员培训, 职业交易员培训, 外汇交易员, 职业交易员, 交易工具',
    'pip calculator, pip value, forex trader training, professional trader training, forex trader, professional trader, trading tool',
    lang,
    brandConfig,
    {
      url: '/tools/pip-calculator',
      type: 'website',
      section: 'Tools',
      author: 'FX Killer Team',
    }
  );
}

export default function PipCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
