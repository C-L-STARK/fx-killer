"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TopTrader } from '@/types/top-traders';
import { convertDbTraderToDisplay } from '@/lib/topTradersMigration';
import type { TopTrader as DbTrader } from '@/lib/supabase';
import { LeaderboardPeriod } from '@/types/top-traders';
import { motion } from 'motion/react';
import EmailContactModal from '@/components/custom/EmailContactModal';
import ShineButton from '@/components/custom/ShineButton';
import PremiumCTA from '@/components/custom/PremiumCTA';

export default function TopTradersPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [traders, setTraders] = useState<TopTrader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch traders from API
  useEffect(() => {
    const fetchTraders = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/top-traders');

        if (!response.ok) {
          throw new Error('Failed to fetch traders');
        }

        const dbTraders: DbTrader[] = await response.json();
        const displayTraders = dbTraders.map(convertDbTraderToDisplay);
        setTraders(displayTraders);
      } catch (err) {
        console.error('Error fetching traders:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTraders();
  }, []);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  const formatNumber = (num: number, decimals: number = 1) => {
    return num.toFixed(decimals);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getReturnColor = (value: number) => {
    if (value >= 30) return 'text-green-600 dark:text-green-400';
    if (value >= 20) return 'text-gray-400';
    return 'text-gray-900 dark:text-white';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin w-12 h-12 border-4 border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full mb-4"></div>
          <p className="text-lg font-bold text-black dark:text-white">
            {isZh ? '加载中...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">
            {isZh ? '加载失败' : 'Failed to load'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (traders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <p className="text-lg font-bold text-gray-500 dark:text-gray-400">
          {isZh ? '暂无数据' : 'No data available'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Hero Section */}
      <div className="relative bg-black text-white border-b-2 border-[#ff102a] overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff102a] blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff102a] blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-[#ff102a]/10 border border-[#ff102a] backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider text-[#ff102a]">
              {isZh ? '交易员排行榜' : 'Trader Leaderboard'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="font-black">
              {isZh ? '天梯' : 'Leaderboard'}
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '顶尖交易员季度排名，见证卓越交易表现'
              : 'Top traders quarterly ranking, witness excellent trading performance'}
          </p>
          <p className="text-sm text-gray-400 mt-4">
            {isZh ? '数据每季度更新一次' : 'Data updated quarterly'}
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">{traders.length}</span> {isZh ? '位交易员' : 'Traders'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">
                {formatNumber(traders.reduce((sum, t) => sum + t.monthlyReturn, 0) / traders.length)}%
              </span> {isZh ? '平均月收益' : 'Avg Monthly Return'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">
                {formatNumber(traders.reduce((sum, t) => sum + t.winRate, 0) / traders.length)}%
              </span> {isZh ? '平均胜率' : 'Avg Win Rate'}
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {traders.slice(0, 3).map((trader, index) => (
            <motion.div
              key={trader.traderId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-black border-2 p-6 relative overflow-hidden group ${trader.rank === 1
                ? 'border-yellow-500 order-first md:order-2 shadow-[0_0_30px_rgba(234,179,8,0.15)]'
                : trader.rank === 2
                  ? 'border-gray-400 order-2 md:order-first'
                  : 'border-orange-600 order-3'
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
              <div className="text-center relative z-10">
                <div className="text-4xl mb-2">{getRankBadge(trader.rank)}</div>
                <h3 className="text-xl font-black text-white mb-1">
                  {trader.nickname}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {trader.country}
                </p>
                <div className={`text-3xl font-black mb-2 ${getReturnColor(trader.monthlyReturn)}`}>
                  +{formatNumber(trader.monthlyReturn)}%
                </div>
                <div className="text-xs text-gray-500 mb-4">
                  {isZh ? '月收益率' : 'Monthly Return'}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-800 pt-4">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">{isZh ? '胜率' : 'Win Rate'}</p>
                    <p className="font-bold text-white">{formatNumber(trader.winRate)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">{isZh ? '交易数' : 'Trades'}</p>
                    <p className="font-bold text-white">{trader.totalTrades}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <div className="bg-black border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black text-white border-b border-gray-800">
                  <th className="px-4 py-4 text-left font-bold text-sm text-gray-400 uppercase tracking-wider">
                    {isZh ? '排名' : 'Rank'}
                  </th>
                  <th className="px-4 py-4 text-left font-bold text-sm text-gray-400 uppercase tracking-wider">
                    {isZh ? '交易员' : 'Trader'}
                  </th>
                  <th className="px-4 py-4 text-right font-bold text-sm text-gray-400 uppercase tracking-wider">
                    {isZh ? '月收益%' : 'Monthly %'}
                  </th>
                  <th className="px-4 py-4 text-right font-bold text-sm text-gray-400 uppercase tracking-wider">
                    {isZh ? '总收益%' : 'Total %'}
                  </th>
                  <th className="px-4 py-4 text-right font-bold text-sm text-gray-400 uppercase tracking-wider">
                    {isZh ? '胜率%' : 'Win Rate %'}
                  </th>
                  <th className="px-4 py-4 text-right font-bold text-sm text-gray-400 uppercase tracking-wider">
                    {isZh ? '盈利因子' : 'Profit Factor'}
                  </th>
                  <th className="px-4 py-4 text-right font-bold text-sm text-gray-400 uppercase tracking-wider">
                    {isZh ? '最大回撤%' : 'Max DD %'}
                  </th>
                  <th className="px-4 py-4 text-right font-bold text-sm text-gray-400 uppercase tracking-wider">
                    {isZh ? '夏普比率' : 'Sharpe'}
                  </th>
                  <th className="px-4 py-4 text-right font-bold text-sm text-gray-400 uppercase tracking-wider">
                    {isZh ? '账户规模' : 'Account'}
                  </th>
                  <th className="px-4 py-4 text-right font-bold text-sm text-gray-400 uppercase tracking-wider">
                    {isZh ? '当前仓位' : 'Position'}
                  </th>
                  <th className="px-4 py-4 text-center font-bold text-sm text-gray-400 uppercase tracking-wider">
                    {isZh ? '矩阵' : 'Matrix'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {traders.map((trader, index) => (
                  <motion.tr
                    key={trader.traderId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-black/50 transition-colors group"
                  >
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-black font-bold text-sm text-white border border-gray-800 rounded">
                        {getRankBadge(trader.rank)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-bold text-white group-hover:text-[#ff102a] transition-colors">
                        {trader.nickname}
                      </div>
                      <div className="text-xs text-gray-500">
                        {trader.country} • {trader.tradingDays} {isZh ? '天' : 'days'}
                      </div>
                    </td>
                    <td className={`px-4 py-4 text-right font-bold ${getReturnColor(trader.monthlyReturn)}`}>
                      +{formatNumber(trader.monthlyReturn)}%
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-white">
                      +{formatNumber(trader.totalReturn)}%
                    </td>
                    <td className="px-4 py-4 text-right text-gray-400">
                      {formatNumber(trader.winRate)}%
                    </td>
                    <td className="px-4 py-4 text-right text-gray-400">
                      {formatNumber(trader.profitFactor)}
                    </td>
                    <td className="px-4 py-4 text-right text-[#ff102a]">
                      -{formatNumber(trader.maxDrawdown)}%
                    </td>
                    <td className="px-4 py-4 text-right text-gray-400">
                      {formatNumber(trader.sharpeRatio)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-gray-500">
                      {formatCurrency(trader.accountSize)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-gray-500">
                      {formatCurrency(trader.currentPosition)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {trader.inMatrix ? (
                        <span className="inline-block w-5 h-5 text-green-500">✓</span>
                      ) : (
                        <span className="inline-block w-5 h-5 text-gray-600">-</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Metrics Legend */}
        <div className="mt-6 p-4 bg-black border border-gray-800">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#ff102a]"></span>
            {isZh ? '指标说明' : 'Metrics Explanation'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-gray-300">{isZh ? '月收益率：' : 'Monthly Return: '}</strong>
              <span className="text-gray-500">
                {isZh ? '当月账户增长百分比' : 'Account growth percentage for the month'}
              </span>
            </div>
            <div>
              <strong className="text-gray-300">{isZh ? '胜率：' : 'Win Rate: '}</strong>
              <span className="text-gray-500">
                {isZh ? '盈利交易占比' : 'Percentage of profitable trades'}
              </span>
            </div>
            <div>
              <strong className="text-gray-300">{isZh ? '盈利因子：' : 'Profit Factor: '}</strong>
              <span className="text-gray-500">
                {isZh ? '总盈利/总亏损' : 'Total profit / Total loss'}
              </span>
            </div>
            <div>
              <strong className="text-gray-300">{isZh ? '夏普比率：' : 'Sharpe Ratio: '}</strong>
              <span className="text-gray-500">
                {isZh ? '风险调整后收益' : 'Risk-adjusted returns'}
              </span>
            </div>
            <div>
              <strong className="text-gray-300">{isZh ? '当前仓位：' : 'Current Position: '}</strong>
              <span className="text-gray-500">
                {isZh ? '当前持仓规模' : 'Current position size'}
              </span>
            </div>
            <div>
              <strong className="text-gray-300">{isZh ? '矩阵：' : 'Matrix: '}</strong>
              <span className="text-gray-500">
                {isZh ? '是否在交易矩阵中' : 'Whether in trading matrix'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PremiumCTA */}
      <PremiumCTA
        badge={{ zh: '顶尖交易员跟单', en: 'Top Trader Copy Trading' }}
        title={{
          zh: '跟随高手，稳健盈利',
          en: 'Follow Experts, Steady Profits'
        }}
        subtitle={{
          zh: '跟单天梯排行榜中的顶尖交易员。实时跟单，风控保护，透明报告。',
          en: 'Copy trade top traders from the leaderboard. Real-time copy, risk protection, transparent reports.'
        }}
        primaryButton={{
          text: { zh: '立即申请跟单', en: 'Apply for Copy Trading' },
          action: 'modal'
        }}
        secondaryButton={{
          text: { zh: '了解培训计划', en: 'Training Program' },
          action: 'link',
          link: `/${language}/splan/join-us`
        }}
        note={{
          zh: '注：跟单服务最低起步金额为15万美金',
          en: 'Note: Minimum starting capital is $150,000 USD'
        }}
        showStats={false}
        customStats={[
          {
            value: isZh ? '15万美金起' : '$150K Min',
            label: { zh: '起步门槛', en: 'Starting Capital' }
          },
          {
            value: isZh ? '实时跟单' : 'Real-time',
            label: { zh: '毫秒级同步', en: 'Millisecond Sync' }
          },
          {
            value: isZh ? '风控保护' : 'Protected',
            label: { zh: '智能止损', en: 'Smart Stop Loss' }
          },
          {
            value: isZh ? '透明报告' : 'Transparent',
            label: { zh: '每日推送', en: 'Daily Updates' }
          },
          {
            value: '✓',
            label: { zh: '精选交易员', en: 'Vetted Traders' }
          },
          {
            value: '✓',
            label: { zh: '资金安全', en: 'Capital Security' }
          },
          {
            value: '✓',
            label: { zh: '灵活配置', en: 'Flexible Settings' }
          },
          {
            value: '✓',
            label: { zh: '专业团队', en: 'Professional Team' }
          }
        ]}
        onModalOpen={() => setIsModalOpen(true)}
      />

      {/* Email Modal */}
      <EmailContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isZh ? '申请跟单服务' : 'Apply for Copy Trading'}
        emailSubject={isZh ? '跟单咨询' : 'Copy Trading Inquiry'}
        formType="copy-trading"
      />
    </div>
  );
}
