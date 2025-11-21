"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import CompactStrategyConfig from './CompactStrategyConfig';
import type { TradingConfig, BacktestResult } from '@/lib/trading/types';

const ProfitChart = dynamic(() => import('./ProfitChart'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] flex items-center justify-center bg-black border-2 border-gray-300 dark:border-gray-700">加载图表中...</div>
});

// K线图已移除 - 不再需要

const BacktestProgress = dynamic(() => import('./BacktestProgress'), {
  ssr: false,
});

interface BacktestPanelProps {
  config: TradingConfig;
  onConfigChange?: (config: TradingConfig) => void;
}

export default function BacktestPanel({ config: initialConfig, onConfigChange }: BacktestPanelProps) {
  const [tradingConfig, setTradingConfig] = useState<TradingConfig>(initialConfig);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BacktestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Progress state
  const [showProgress, setShowProgress] = useState(false);
  const [progressStage, setProgressStage] = useState<'fetching' | 'running' | 'complete'>('fetching');
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');

  // Date range state
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [initialCapital, setInitialCapital] = useState(100000); // INCREASED: $100,000 for testing

  const handleConfigChange = (newConfig: TradingConfig) => {
    setTradingConfig(newConfig);
    if (onConfigChange) {
      onConfigChange(newConfig);
    }
  };

  const runBacktest = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    // Show progress modal
    setShowProgress(true);
    setProgressStage('fetching');
    setProgressPercent(0);
    setProgressMessage('正在获取历史K线数据...');

    try {
      // Simulate fetching progress
      setProgressPercent(10);
      await new Promise(resolve => setTimeout(resolve, 300));
      setProgressPercent(30);
      setProgressMessage('连接到数据源API...');

      const response = await fetch('/api/trading/backtest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: new Date(startDate).getTime(),
          endDate: new Date(endDate).getTime(),
          initialCapital,
          tradingConfig,
          useTestnet: true,
          useHistoricalData: false, // Always use real data from Binance
        }),
      });

      setProgressPercent(50);
      setProgressMessage('数据下载完成，开始运行回测策略...');
      setProgressStage('running');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Backtest failed');
      }

      setProgressPercent(75);
      setProgressMessage('正在计算交易信号...');

      const data: BacktestResult = await response.json();

      // CRITICAL DEBUG: Log received data
      console.log('[BacktestPanel] ===== BACKTEST RESULTS RECEIVED =====');
      console.log('[BacktestPanel] Total trades:', data.totalTrades);
      console.log('[BacktestPanel] Trades array length:', data.trades?.length || 0);
      console.log('[BacktestPanel] First 3 trades:', data.trades?.slice(0, 3));
      console.log('[BacktestPanel] Candles received:', data.candles?.length || 0);
      console.log('[BacktestPanel] Total candles:', data.totalCandles);
      console.log('[BacktestPanel] Data source:', data.dataSource);
      console.log('[BacktestPanel] ⚠️  CHART WILL SHOW:', !!(data.candles && data.candles.length > 0));
      console.log('[BacktestPanel] =====================================');

      setProgressPercent(90);
      setProgressMessage('正在生成统计报告...');

      setResults(data);

      // Save results to localStorage for history page
      localStorage.setItem('latest_backtest_results', JSON.stringify(data));
      localStorage.setItem('latest_backtest_timestamp', Date.now().toString());

      // Save candles if included in response
      if (data.candles) {
        localStorage.setItem('latest_backtest_candles', JSON.stringify(data.candles));
      }

      // Complete
      setProgressPercent(100);
      setProgressStage('complete');
      setProgressMessage('回测完成！');

      // Auto close after 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowProgress(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setShowProgress(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Strategy Config */}
      <CompactStrategyConfig
        config={tradingConfig}
        onConfigChange={handleConfigChange}
        showPresets={true}
      />

      {/* Controls */}
      <div className="bg-[#0a0a0a] p-8 border-2 border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b-2 border-gray-800">
          回测参数配置
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              开始日期
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-2">
              结束日期
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-2">
              初始资金 (USDT)
            </label>
            <input
              type="number"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
            />
          </div>
        </div>

        <div className="mb-6 p-4 bg-black border-2 border-gray-300 dark:border-gray-700">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-white mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-bold text-white">
                使用真实历史数据
              </p>
              <p className="text-xs text-gray-400 mt-1">
                外汇品种(XAUUSDT等)使用Twelve Data/Alpha Vantage真实数据，加密货币使用Binance真实数据，均无需API密钥
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={runBacktest}
          disabled={loading}
          className="w-full px-6 py-4 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-gray-800 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              运行中...
            </span>
          ) : '运行回测'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black border-2 border-red-600 dark:border-red-400 p-4"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-bold text-red-600 dark:text-red-400">错误</h3>
              <p className="text-sm text-white mt-1">{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Data Source Info */}
          {results.dataSource && (
            <div className="bg-black border-2 border-gray-300 dark:border-gray-700 p-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-bold text-white">
                  数据来源: {(() => {
                    switch (results.dataSource) {
                      case 'twelve-data':
                        return 'Twelve Data API (外汇真实数据)';
                      case 'alpha-vantage':
                        return 'Alpha Vantage API (外汇真实数据)';
                      case 'binance-public':
                        return 'Binance API (加密货币真实数据)';
                      case 'simulated-forex':
                        return '模拟外汇数据 (确定性生成)';
                      case 'simulated-crypto':
                        return '模拟加密货币数据 (确定性生成)';
                      case 'generated':
                        return '模拟历史数据 (确定性生成)';
                      default:
                        return results.dataSource || '未知数据源';
                    }
                  })()}
                </p>
              </div>
            </div>
          )}

          {/* Performance Overview */}
          <div className="bg-black dark:bg-white p-8 border-2 border-gray-800">
            <h3 className="text-2xl font-bold text-white dark:text-black mb-6 pb-3 border-b-2 border-white dark:border-black">核心表现指标</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                title="总交易次数"
                value={results.totalTrades.toString()}
                color="blue"
              />
              <MetricCard
                title="胜率"
                value={`${(results.winRate || 0).toFixed(1)}%`}
                color="green"
              />
              <MetricCard
                title="盈亏因子"
                value={(results.profitFactor || 0).toFixed(2)}
                color="purple"
              />
              <MetricCard
                title="总收益"
                value={`$${(results.totalPnl || 0).toFixed(2)}`}
                subtitle={`${(results.totalPnlPercent || 0) >= 0 ? '+' : ''}${(results.totalPnlPercent || 0).toFixed(2)}%`}
                color={(results.totalPnl || 0) >= 0 ? 'green' : 'red'}
              />
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="bg-[#0a0a0a] p-8 border-2 border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6 pb-3 border-b-2 border-gray-800">详细统计</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                title="最大回撤"
                value={`$${(results.maxDrawdown || 0).toFixed(2)}`}
                subtitle={`${(results.maxDrawdownPercent || 0).toFixed(2)}%`}
                color="red"
              />
              <MetricCard
                title="平均盈利"
                value={`$${(results.averageWin || 0).toFixed(2)}`}
                color="green"
              />
              <MetricCard
                title="平均亏损"
                value={`$${Math.abs(results.averageLoss || 0).toFixed(2)}`}
                color="red"
              />
              <MetricCard
                title="日均交易"
                value={(results.tradesPerDay || 0).toFixed(1)}
                color="blue"
              />
            </div>
          </div>

          {/* K线图已移除 - 不再需要 */}

          {/* Equity Curve Chart */}
          <div className="bg-[#0a0a0a] p-8 border-2 border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6 pb-3 border-b-2 border-gray-800">
              资金曲线
            </h3>
            <ProfitChart results={results} />
          </div>

          {/* Trade List */}
          <div className="bg-[#0a0a0a] p-8 border-2 border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6 pb-3 border-b-2 border-gray-800">
              交易记录 ({results.trades.length})
            </h3>
            <div className="overflow-x-auto border-2 border-gray-300 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead className="bg-black border-b-2 border-gray-300 dark:border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-white">时间</th>
                    <th className="px-4 py-3 text-left font-bold text-white">方向</th>
                    <th className="px-4 py-3 text-right font-bold text-white">入场价</th>
                    <th className="px-4 py-3 text-right font-bold text-white">出场价</th>
                    <th className="px-4 py-3 text-right font-bold text-white">盈亏</th>
                    <th className="px-4 py-3 text-left font-bold text-white">退出原因</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
                  {results.trades.slice(0, 50).map((trade) => (
                    <tr key={trade.id} className="hover:bg-gray-100 dark:hover:bg-[#0a0a0a] transition-colors">
                      <td className="px-4 py-3 text-white">
                        {new Date(trade.entryTime).toLocaleString('zh-CN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-3 py-1 text-xs font-bold border-2 ${
                          trade.side === 'long'
                            ? 'bg-green-100 text-green-800 border-green-600 dark:bg-black dark:text-green-400 dark:border-green-400'
                            : 'bg-red-100 text-red-800 border-red-600 dark:bg-black dark:text-red-400 dark:border-red-400'
                        }`}>
                          {trade.side === 'long' ? '做多' : '做空'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-white">
                        ${trade.entryPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-white">
                        ${trade.exitPrice?.toFixed(2) || '-'}
                      </td>
                      <td className={`px-4 py-3 text-right font-mono font-bold ${
                        (trade.pnl || 0) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {(trade.pnl || 0) >= 0 ? '+' : ''}${trade.pnl?.toFixed(2) || '0.00'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-bold border-2 ${getExitReasonStyle(trade.exitReason)}`}>
                          {getExitReasonText(trade.exitReason)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {results.trades.length > 50 && (
                <div className="bg-black px-4 py-3 text-center border-t-2 border-gray-300 dark:border-gray-700">
                  <p className="text-sm text-gray-400">
                    仅显示前 50 笔交易 (共 {results.trades.length} 笔)
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Progress Modal */}
      <BacktestProgress
        isOpen={showProgress}
        stage={progressStage}
        progress={progressPercent}
        message={progressMessage}
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color: 'blue' | 'green' | 'red' | 'purple';
}

function MetricCard({ title, value, subtitle, color }: MetricCardProps) {
  const textColorClasses = {
    blue: 'text-white',
    green: 'text-green-600 dark:text-green-400',
    red: 'text-red-600 dark:text-red-400',
    purple: 'text-white',
  };

  return (
    <div className="bg-black p-4 border-2 border-gray-300 dark:border-gray-700">
      <p className="text-xs font-bold text-gray-400 uppercase mb-2">{title}</p>
      <p className={`text-2xl font-bold ${textColorClasses[color]}`}>{value}</p>
      {subtitle && (
        <p className="text-sm font-bold text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

function getExitReasonText(reason?: string): string {
  const reasons: Record<string, string> = {
    'stop_loss': '止损',
    'take_profit': '止盈',
    'trailing_stop': '跟踪止损',
    'signal': '反向信号',
    'daily_limit': '日限额',
    'drawdown_limit': '回撤限制',
  };
  return reasons[reason || ''] || '未知';
}

function getExitReasonStyle(reason?: string): string {
  const styles: Record<string, string> = {
    'stop_loss': 'bg-red-100 text-red-800 border-red-600 dark:bg-black dark:text-red-300 dark:border-red-400',
    'take_profit': 'bg-green-100 text-green-800 border-green-600 dark:bg-black dark:text-green-300 dark:border-green-400',
    'trailing_stop': 'bg-white text-black border-gray-300 dark:bg-black dark:text-white dark:border-gray-700',
    'signal': 'bg-white text-black border-gray-300 dark:bg-black dark:text-white dark:border-gray-700',
    'daily_limit': 'bg-white text-black border-gray-300 dark:bg-black dark:text-white dark:border-gray-700',
    'drawdown_limit': 'bg-white text-black border-gray-300 dark:bg-black dark:text-white dark:border-gray-700',
  };
  return styles[reason || ''] || 'bg-white text-black border-gray-300 dark:bg-black dark:text-white dark:border-gray-700';
}
