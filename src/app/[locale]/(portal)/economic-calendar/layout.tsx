import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { getBrandConfig } from '@/lib/brand-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();

  return generateBilingualMetadata(
    '经济日历 - 实时追踪全球重要经济事件丨汇刃丨职业交易员培训、日内交易员培训',
    'Economic Calendar - Track Global Economic Events丨FX Killer丨Professional Trader Training, Day Trader Training',
    '实时经济日历，追踪美联储会议、非农就业、CPI、GDP等重要经济数据发布。按重要性筛选，掌握市场波动机会，做出明智交易决策。职业交易员培训和日内交易员培训必备工具。',
    'Real-time economic calendar tracking Fed meetings, NFP, CPI, GDP and major economic data releases. Filter by importance, seize market opportunities, make informed trading decisions. Essential tool for professional trader training and day trader training.',
    '经济日历, 财经日历, 职业交易员培训, 日内交易员培训, 非农数据, CPI数据, GDP数据, 美联储会议, 央行决议, 经济指标, 市场事件, 外汇日历',
    'economic calendar, financial calendar, professional trader training, day trader training, NFP data, CPI data, GDP data, Fed meeting, central bank decision, economic indicators, market events, forex calendar',
    lang,
    brandConfig,
    {
      url: '/economic-calendar',
      type: 'website',
      section: 'Tools',
      author: 'FX Killer Team',
    }
  );
}

export default function EconomicCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
