import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { getBrandConfig } from '@/lib/brand-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();

  return generateBilingualMetadata(
    '盈亏比计算器丨汇刃丨职业交易员培训、外汇交易员培训',
    'Risk Reward Calculator丨FX Killer丨Professional Trader Training, Forex Trader Training',
    '外汇盈亏比计算器，快速评估交易质量。输入入场价、止损价、止盈价，自动计算风险回报比。职业交易员培训和外汇交易员培训必备工具，提升交易决策质量。',
    'Forex risk-reward calculator for quick trade quality evaluation. Enter entry, stop loss and take profit to auto-calculate ratio. Essential tool for professional trader training and forex trader training to improve trading decisions.',
    '盈亏比计算器, 风险回报比, 职业交易员培训, 外汇交易员培训, 职业交易员, 交易工具',
    'risk reward calculator, risk reward ratio, professional trader training, forex trader training, professional trader, trading tool',
    lang,
    brandConfig,
    {
      url: '/tools/risk-reward-calculator',
      type: 'website',
      section: 'Tools',
      author: 'FX Killer Team',
    }
  );
}

export default function RiskRewardCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
