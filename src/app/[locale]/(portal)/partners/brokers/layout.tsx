import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { getBrandConfig } from '@/lib/brand-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();

  return generateBilingualMetadata(
    '合作经纪商丨汇刃丨日内交易员培训、全职交易员培训',
    'Partner Brokers丨FX Killer丨Day Trader Training, Full-Time Trader Training',
    '汇刃官方合作经纪商：EC Markets、TickMill、Binance、FTMO、FundedNext。为外汇交易员提供平台最高返佣、超低点差和独家优惠。支持日内交易员培训和全职交易员培训学员。',
    'FX Killer official partner brokers: EC Markets, TickMill, Binance, FTMO, FundedNext. Providing forex traders with highest rebates, ultra-low spreads and exclusive offers. Supporting day trader training and full-time trader training students.',
    '外汇经纪商, 交易平台, 日内交易员培训, 全职交易员培训, 职业交易员, 外汇交易员, 经纪商返佣',
    'forex brokers, trading platform, day trader training, full-time trader training, professional trader, forex trader, broker rebates',
    lang,
    brandConfig,
    {
      url: '/partners/brokers',
      type: 'website',
      section: 'Partners',
      author: 'FX Killer Team',
    }
  );
}

export default function BrokersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
