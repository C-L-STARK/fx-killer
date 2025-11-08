import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '天梯榜 - 顶尖交易员实时排名 | FX Killer',
    'Top Traders - Real-Time Leaderboard | FX Killer',
    'FX Killer交易员天梯榜，实时追踪顶尖交易员表现。查看月收益率、胜率、盈利因子、夏普比率等核心指标，见证卓越交易表现。',
    'FX Killer trader leaderboard, track top trader performance in real-time. View monthly returns, win rates, profit factors, Sharpe ratios and key metrics. Witness excellent trading performance.',
    '交易员排行榜, 天梯榜, 顶尖交易员, 交易员排名, 月收益率, 胜率排名, 盈利因子, 夏普比率, 交易表现',
    'trader leaderboard, top traders, trader ranking, monthly returns, win rate ranking, profit factor, sharpe ratio, trading performance',
    lang,
    {
      url: '/top-traders',
      type: 'website',
      section: 'Community',
      author: 'FX Killer Team',
    }
  );
}

export default function TopTradersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
