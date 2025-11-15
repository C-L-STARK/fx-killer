import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { getBrandConfig } from '@/lib/brand-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();

  return generateBilingualMetadata(
    '天梯榜 - 顶尖交易员实时排名丨汇刃丨外汇交易员培训、全职交易员培训',
    'Top Traders - Real-Time Leaderboard丨FX Killer丨Forex Trader Training, Full-Time Trader Training',
    'FX Killer交易员天梯榜，实时追踪顶尖交易员表现。查看月收益率、胜率、盈利因子、夏普比率等核心指标，见证卓越交易表现。通过外汇交易员培训和全职交易员培训体系，加入精英交易员行列。',
    'FX Killer trader leaderboard, track top trader performance in real-time. View monthly returns, win rates, profit factors, Sharpe ratios and key metrics. Witness excellent trading performance. Join elite traders through forex trader training and full-time trader training system.',
    '交易员排行榜, 天梯榜, 顶尖交易员, 交易员排名, 外汇交易员培训, 全职交易员培训, 月收益率, 胜率排名, 盈利因子, 夏普比率, 交易表现',
    'trader leaderboard, top traders, trader ranking, forex trader training, full-time trader training, monthly returns, win rate ranking, profit factor, sharpe ratio, trading performance',
    lang,
    brandConfig,
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
