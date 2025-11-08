import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '经济日历 - 实时追踪全球重要经济事件 | FX Killer',
    'Economic Calendar - Track Global Economic Events | FX Killer',
    '实时经济日历，追踪美联储会议、非农就业、CPI、GDP等重要经济数据发布。按重要性筛选，掌握市场波动机会，做出明智交易决策。',
    'Real-time economic calendar tracking Fed meetings, NFP, CPI, GDP and major economic data releases. Filter by importance, seize market opportunities, make informed trading decisions.',
    '经济日历, 财经日历, 非农数据, CPI数据, GDP数据, 美联储会议, 央行决议, 经济指标, 市场事件, 外汇日历',
    'economic calendar, financial calendar, NFP data, CPI data, GDP data, Fed meeting, central bank decision, economic indicators, market events, forex calendar',
    lang,
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
