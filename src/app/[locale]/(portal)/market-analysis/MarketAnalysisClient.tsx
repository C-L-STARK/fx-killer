"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';
import InterviewCTA from '@/components/custom/InterviewCTA';
import LiveTickerTape from '@/components/market/LiveTickerTape';

interface AnalysisData {
  symbol: string;
  name: string;
  nameCn: string;
  timestamp: string;
  price: {
    close: string;
    high: string;
    low: string;
    open: string;
    change: string;
    datetime: string;
  };
  indicators: {
    rsi?: number;
    macd?: number;
    macd_signal?: number;
    sma20?: number;
  };
  analysis: {
    zh: {
      title: string;
      content: string;
    };
    en: {
      title: string;
      content: string;
    };
  };
}

interface MarketAnalysisClientProps {
  analyses: AnalysisData[];
  language: 'zh' | 'en';
}

export default function MarketAnalysisClient({ analyses, language }: MarketAnalysisClientProps) {
  const isZh = language === 'zh';

  const getSlug = (symbol: string) => symbol.toLowerCase().replace(/\//g, '');

  const getRSIStatus = (rsi?: number) => {
    if (!rsi) return { text: 'N/A', color: 'text-gray-500' };
    if (rsi >= 70) return { text: isZh ? '超买' : 'Overbought', color: 'text-red-500' };
    if (rsi <= 30) return { text: isZh ? '超卖' : 'Oversold', color: 'text-green-500' };
    return { text: isZh ? '中性' : 'Neutral', color: 'text-blue-500' };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section - 与其他页面统一风格 */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white border-b-2 border-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <span className="text-sm font-semibold tracking-wider">
                {isZh ? 'AI 驱动的市场洞察' : 'AI-Powered Market Insights'}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="font-black">
                {isZh ? '实时市场分析' : 'Real-Time Market Analysis'}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              {isZh
                ? '每 90 分钟自动更新 · 8 大主流货币对 · 专业技术指标分析'
                : 'Auto-Updated Every 90 Minutes · 8 Major Pairs · Professional Technical Analysis'}
            </p>

            {/* 更新时间 */}
            {analyses.length > 0 && (
              <div className="text-white/70 text-sm">
                {isZh ? '最后更新: ' : 'Last Updated: '}
                {new Date(analyses[0].timestamp).toLocaleString(isZh ? 'zh-CN' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Live Ticker Tape */}
      <div className="border-b-2 border-gray-200 dark:border-gray-800">
        <LiveTickerTape />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {analyses.length === 0 ? (
          <div className="text-center py-20">
            <BarChart3 className="w-20 h-20 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {isZh ? '暂无分析数据' : 'No Analysis Available'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isZh ? '系统将在下次运行时生成最新分析' : 'Analysis will be generated on next run'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyses.map((analysis, index) => {
              const change = parseFloat(analysis.price.change);
              const isPositive = change >= 0;
              const rsiStatus = getRSIStatus(analysis.indicators.rsi);

              return (
                <motion.div
                  key={analysis.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={`/${language}/market-analysis/${getSlug(analysis.symbol)}`}
                    className="block group"
                  >
                    <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-xl h-full">
                      {/* 货币对名称 */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {analysis.symbol}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {isZh ? analysis.nameCn : analysis.name}
                        </p>
                      </div>

                      {/* 价格 */}
                      <div className="mb-4">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                          {parseFloat(analysis.price.close).toFixed(analysis.symbol.includes('JPY') ? 2 : 5)}
                        </div>
                        <div className={`flex items-center gap-1 text-sm font-semibold ${
                          isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span>{isPositive ? '+' : ''}{change.toFixed(2)}%</span>
                        </div>
                      </div>

                      {/* 技术指标 */}
                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">RSI(14)</span>
                          <span className={`font-semibold ${rsiStatus.color}`}>
                            {typeof analysis.indicators.rsi === 'number' ? analysis.indicators.rsi.toFixed(1) : 'N/A'} ({rsiStatus.text})
                          </span>
                        </div>
                        {typeof analysis.indicators.macd === 'number' && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">MACD</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {analysis.indicators.macd.toFixed(5)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* 查看详情 */}
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:underline flex items-center gap-1">
                          {isZh ? '查看详细分析' : 'View Analysis'}
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* Interview CTA Section */}
      <InterviewCTA />
    </div>
  );
}
