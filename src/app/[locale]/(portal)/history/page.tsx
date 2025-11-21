"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import type { BacktestResult, Trade } from '@/lib/trading/types';
import TradingViewChart from '@/components/charts/TradingViewChart';
import ProfitChart from '../dashboard/components/ProfitChart';

export default function HistoryPage() {
  const [results, setResults] = useState<BacktestResult | null>(null);
  const [candles, setCandles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'wins' | 'losses'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'pnl' | 'duration'>('date');

  // Load most recent backtest results
  useEffect(() => {
    const savedResults = localStorage.getItem('latest_backtest_results');
    const savedCandles = localStorage.getItem('latest_backtest_candles');

    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
    if (savedCandles) {
      setCandles(JSON.parse(savedCandles));
    }
  }, []);

  const filteredTrades = results?.trades.filter(trade => {
    if (filter === 'wins') return (trade.pnl || 0) > 0;
    if (filter === 'losses') return (trade.pnl || 0) < 0;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'date') return b.entryTime - a.entryTime;
    if (sortBy === 'pnl') return (b.pnl || 0) - (a.pnl || 0);
    if (sortBy === 'duration') {
      const aDuration = (a.exitTime || 0) - a.entryTime;
      const bDuration = (b.exitTime || 0) - b.entryTime;
      return bDuration - aDuration;
    }
    return 0;
  }) || [];

  // Calculate additional statistics
  const calculateStreaks = (trades: Trade[]) => {
    let currentStreak = 0;
    let maxWinStreak = 0;
    let maxLossStreak = 0;
    let lastWasWin = false;

    trades.forEach(trade => {
      const isWin = (trade.pnl || 0) > 0;

      if (isWin === lastWasWin) {
        currentStreak++;
      } else {
        currentStreak = 1;
        lastWasWin = isWin;
      }

      if (isWin && currentStreak > maxWinStreak) {
        maxWinStreak = currentStreak;
      } else if (!isWin && currentStreak > maxLossStreak) {
        maxLossStreak = currentStreak;
      }
    });

    return { maxWinStreak, maxLossStreak };
  };

  const streaks = results ? calculateStreaks(results.trades) : { maxWinStreak: 0, maxLossStreak: 0 };

  // Calculate hourly performance
  const hourlyPerformance = results?.trades.reduce((acc, trade) => {
    const hour = new Date(trade.entryTime).getHours();
    if (!acc[hour]) {
      acc[hour] = { trades: 0, pnl: 0 };
    }
    acc[hour].trades++;
    acc[hour].pnl += trade.pnl || 0;
    return acc;
  }, {} as Record<number, { trades: number; pnl: number }>) || {};

  const bestHour = Object.entries(hourlyPerformance)
    .sort((a, b) => b[1].pnl - a[1].pnl)[0];

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            No backtest results available
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Run a backtest from the dashboard first
          </p>
          <a
            href="/dashboard"
            className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Trading History & Analytics
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive analysis of your trading performance
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Trades"
            value={results.totalTrades}
            subtitle={`${filteredTrades.length} filtered`}
            color="blue"
          />
          <StatCard
            title="Win Rate"
            value={`${results.winRate.toFixed(1)}%`}
            subtitle={`${results.winningTrades}W / ${results.losingTrades}L`}
            color="green"
          />
          <StatCard
            title="Profit Factor"
            value={results.profitFactor === Infinity ? '∞' : results.profitFactor.toFixed(2)}
            subtitle="Risk/Reward"
            color="purple"
          />
          <StatCard
            title="Total Return"
            value={`${results.totalPnlPercent >= 0 ? '+' : ''}${results.totalPnlPercent.toFixed(2)}%`}
            subtitle={`$${results.totalPnl.toFixed(2)}`}
            color={results.totalPnl >= 0 ? 'green' : 'red'}
          />
        </div>

        {/* TradingView Chart */}
        {candles.length > 0 && (
          <div className="bg-gray-50 dark:bg-[#0a0a0a] rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Price Chart with Trade Markers
            </h2>
            <TradingViewChart candles={candles} trades={results.trades} height={500} />
          </div>
        )}

        {/* Equity Curve */}
        <div className="bg-gray-50 dark:bg-[#0a0a0a] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Equity Curve
          </h2>
          <ProfitChart results={results} />
        </div>

        {/* Advanced Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Streaks */}
          <div className="bg-gray-50 dark:bg-[#0a0a0a] rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Win/Loss Streaks
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Max Win Streak</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {streaks.maxWinStreak}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Max Loss Streak</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {streaks.maxLossStreak}
                </p>
              </div>
            </div>
          </div>

          {/* Best/Worst Trades */}
          <div className="bg-gray-50 dark:bg-[#0a0a0a] rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Best & Worst
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Largest Win</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  +${results.largestWin.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Largest Loss</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  ${results.largestLoss.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Time Analysis */}
          <div className="bg-gray-50 dark:bg-[#0a0a0a] rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Time Analysis
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Trades/Day</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {results.tradesPerDay.toFixed(1)}
                </p>
              </div>
              {bestHour && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Best Hour</p>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {bestHour[0]}:00
                  </p>
                  <p className="text-xs text-gray-500">
                    ${bestHour[1].pnl.toFixed(2)} ({bestHour[1].trades} trades)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trade List */}
        <div className="bg-gray-50 dark:bg-[#0a0a0a] rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Trade History ({filteredTrades.length})
            </h2>
            <div className="flex gap-4">
              {/* Filter */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Trades</option>
                <option value="wins">Wins Only</option>
                <option value="losses">Losses Only</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="pnl">Sort by P&L</option>
                <option value="duration">Sort by Duration</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-[#0a0a0a]">
                <tr>
                  <th className="px-4 py-3 text-left">Entry Time</th>
                  <th className="px-4 py-3 text-left">Side</th>
                  <th className="px-4 py-3 text-right">Entry Price</th>
                  <th className="px-4 py-3 text-right">Exit Price</th>
                  <th className="px-4 py-3 text-right">Duration</th>
                  <th className="px-4 py-3 text-right">P&L</th>
                  <th className="px-4 py-3 text-right">P&L %</th>
                  <th className="px-4 py-3 text-left">Exit Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTrades.map((trade) => {
                  const duration = trade.exitTime
                    ? Math.floor((trade.exitTime - trade.entryTime) / 60000)
                    : 0;

                  return (
                    <tr key={trade.id} className="hover:bg-gray-50 dark:hover:bg-[#0a0a0a]/50">
                      <td className="px-4 py-3">
                        {new Date(trade.entryTime).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          trade.side === 'long'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {trade.side === 'long' ? 'LONG' : 'SHORT'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        ${trade.entryPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        ${trade.exitPrice?.toFixed(2) || '-'}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">
                        {duration}m
                      </td>
                      <td className={`px-4 py-3 text-right font-mono font-semibold ${
                        (trade.pnl || 0) >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {(trade.pnl || 0) >= 0 ? '+' : ''}${trade.pnl?.toFixed(2) || '0.00'}
                      </td>
                      <td className={`px-4 py-3 text-right font-mono ${
                        (trade.pnlPercent || 0) >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {(trade.pnlPercent || 0) >= 0 ? '+' : ''}{trade.pnlPercent?.toFixed(2) || '0.00'}%
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">
                        {trade.exitReason === 'stop_loss' && ' Stop Loss'}
                        {trade.exitReason === 'take_profit' && ' Take Profit'}
                        {trade.exitReason === 'trailing_stop' && ' Trailing Stop'}
                        {trade.exitReason === 'signal' && ' Opposite Signal'}
                        {trade.exitReason === 'daily_limit' && ' Daily Limit'}
                        {trade.exitReason === 'drawdown_limit' && ' Drawdown Limit'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color: 'blue' | 'green' | 'red' | 'purple';
}

function StatCard({ title, value, subtitle, color }: StatCardProps) {
  const colorClasses = {
    blue: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20',
    green: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
    red: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20',
    purple: 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20',
  };

  return (
    <div className={`border rounded-lg p-4 ${colorClasses[color]}`}>
      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      {subtitle && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
