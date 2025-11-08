"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockTopTraders } from '@/data/mockTopTraders';
import { LeaderboardPeriod } from '@/types/top-traders';
import { motion } from 'motion/react';

export default function TopTradersPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

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
    if (value >= 20) return 'text-blue-600 dark:text-blue-400';
    return 'text-gray-900 dark:text-white';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white border-b-2 border-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider">
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
              <span className="text-white font-bold">{mockTopTraders.length}</span> {isZh ? '位交易员' : 'Traders'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">
                {formatNumber(mockTopTraders.reduce((sum, t) => sum + t.monthlyReturn, 0) / mockTopTraders.length)}%
              </span> {isZh ? '平均月收益' : 'Avg Monthly Return'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">
                {formatNumber(mockTopTraders.reduce((sum, t) => sum + t.winRate, 0) / mockTopTraders.length)}%
              </span> {isZh ? '平均胜率' : 'Avg Win Rate'}
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mockTopTraders.slice(0, 3).map((trader, index) => (
            <motion.div
              key={trader.traderId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-900 border-2 p-6 ${
                trader.rank === 1
                  ? 'border-yellow-500 order-first md:order-2'
                  : trader.rank === 2
                  ? 'border-gray-400 order-2 md:order-first'
                  : 'border-orange-600 order-3'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">{getRankBadge(trader.rank)}</div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">
                  {trader.nickname}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {trader.country}
                </p>
                <div className={`text-3xl font-black mb-2 ${getReturnColor(trader.monthlyReturn)}`}>
                  +{formatNumber(trader.monthlyReturn)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  {isZh ? '月收益率' : 'Monthly Return'}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{isZh ? '胜率' : 'Win Rate'}</p>
                    <p className="font-bold text-gray-900 dark:text-white">{formatNumber(trader.winRate)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{isZh ? '交易数' : 'Trades'}</p>
                    <p className="font-bold text-gray-900 dark:text-white">{trader.totalTrades}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black dark:bg-white text-white dark:text-black border-b-2 border-gray-200 dark:border-gray-800">
                  <th className="px-4 py-3 text-left font-bold text-sm">
                    {isZh ? '排名' : 'Rank'}
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-sm">
                    {isZh ? '交易员' : 'Trader'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '月收益%' : 'Monthly %'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '总收益%' : 'Total %'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '胜率%' : 'Win Rate %'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '盈利因子' : 'Profit Factor'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '最大回撤%' : 'Max DD %'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '夏普比率' : 'Sharpe'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '账户规模' : 'Account'}
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-sm">
                    {isZh ? '当前仓位' : 'Position'}
                  </th>
                  <th className="px-4 py-3 text-center font-bold text-sm">
                    {isZh ? '矩阵' : 'Matrix'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockTopTraders.map((trader, index) => (
                  <motion.tr
                    key={trader.traderId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 font-bold text-sm">
                        {getRankBadge(trader.rank)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {trader.nickname}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {trader.country} • {trader.tradingDays} {isZh ? '天' : 'days'}
                      </div>
                    </td>
                    <td className={`px-4 py-4 text-right font-bold ${getReturnColor(trader.monthlyReturn)}`}>
                      +{formatNumber(trader.monthlyReturn)}%
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-gray-900 dark:text-white">
                      +{formatNumber(trader.totalReturn)}%
                    </td>
                    <td className="px-4 py-4 text-right text-gray-700 dark:text-gray-300">
                      {formatNumber(trader.winRate)}%
                    </td>
                    <td className="px-4 py-4 text-right text-gray-700 dark:text-gray-300">
                      {formatNumber(trader.profitFactor)}
                    </td>
                    <td className="px-4 py-4 text-right text-red-600 dark:text-red-400">
                      -{formatNumber(trader.maxDrawdown)}%
                    </td>
                    <td className="px-4 py-4 text-right text-gray-700 dark:text-gray-300">
                      {formatNumber(trader.sharpeRatio)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-gray-600 dark:text-gray-400">
                      {formatCurrency(trader.accountSize)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-gray-600 dark:text-gray-400">
                      {formatCurrency(trader.currentPosition)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {trader.inMatrix ? (
                        <span className="inline-block w-5 h-5 text-green-600 dark:text-green-400">✓</span>
                      ) : (
                        <span className="inline-block w-5 h-5 text-gray-400">-</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Metrics Legend */}
        <div className="mt-6 p-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
            {isZh ? '指标说明' : 'Metrics Explanation'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-gray-900 dark:text-white">{isZh ? '月收益率：' : 'Monthly Return: '}</strong>
              <span className="text-gray-700 dark:text-gray-300">
                {isZh ? '当月账户增长百分比' : 'Account growth percentage for the month'}
              </span>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">{isZh ? '胜率：' : 'Win Rate: '}</strong>
              <span className="text-gray-700 dark:text-gray-300">
                {isZh ? '盈利交易占比' : 'Percentage of profitable trades'}
              </span>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">{isZh ? '盈利因子：' : 'Profit Factor: '}</strong>
              <span className="text-gray-700 dark:text-gray-300">
                {isZh ? '总盈利/总亏损' : 'Total profit / Total loss'}
              </span>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">{isZh ? '夏普比率：' : 'Sharpe Ratio: '}</strong>
              <span className="text-gray-700 dark:text-gray-300">
                {isZh ? '风险调整后收益' : 'Risk-adjusted returns'}
              </span>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">{isZh ? '当前仓位：' : 'Current Position: '}</strong>
              <span className="text-gray-700 dark:text-gray-300">
                {isZh ? '当前持仓规模' : 'Current position size'}
              </span>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">{isZh ? '矩阵：' : 'Matrix: '}</strong>
              <span className="text-gray-700 dark:text-gray-300">
                {isZh ? '是否在交易矩阵中' : 'Whether in trading matrix'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
