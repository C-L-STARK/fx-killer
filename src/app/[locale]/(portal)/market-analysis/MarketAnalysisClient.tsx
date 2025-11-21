"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';
import PremiumCTA from '@/components/custom/PremiumCTA';
import LiveTickerTape from '@/components/market/LiveTickerTape';
import EmailContactModal from '@/components/custom/EmailContactModal';

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
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const getSlug = (symbol: string) => symbol.toLowerCase().replace(/\//g, '');

  const getRSIStatus = (rsi?: number) => {
    if (!rsi) return { text: 'N/A', color: 'text-gray-500' };
    if (rsi >= 70) return { text: isZh ? '超买' : 'Overbought', color: 'text-red-500' };
    if (rsi <= 30) return { text: isZh ? '超卖' : 'Oversold', color: 'text-green-500' };
    return { text: isZh ? '中性' : 'Neutral', color: 'text-gray-400' };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Hero Section - 与其他页面统一风格 */}
      <div className="relative bg-black text-white border-b-2 border-[#ff102a] overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff102a] blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff102a] blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-[#ff102a]/10 border border-[#ff102a] backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider text-[#ff102a]">
              {isZh ? '专业市场分析' : 'Professional Market Analysis'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="font-black">
              {isZh ? '市场分析' : 'Market Analysis'}
            </span>
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '专业交易员深度解析市场趋势，提高交易决策能力'
              : 'Professional traders deep dive market trends to enhance your trading decisions'}
          </p>
        </div>
      </div>

      {/* Live Ticker Tape */}
      <div>
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
                    <div className="bg-black border border-gray-800 p-6 hover:border-[#ff102a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,16,42,0.15)] h-full group relative overflow-hidden">
                      {/* Hover Gradient Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ff102a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                      {/* 货币对名称 */}
                      <div className="mb-4 relative z-10">
                        <h3 className="text-2xl font-black text-white mb-1">
                          {analysis.symbol}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {isZh ? analysis.nameCn : analysis.name}
                        </p>
                      </div>

                      {/* 价格 */}
                      <div className="mb-4 relative z-10">
                        <div className="text-3xl font-bold text-white mb-1">
                          {parseFloat(analysis.price.close).toFixed(analysis.symbol.includes('JPY') ? 2 : 5)}
                        </div>
                        <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-[#ff102a]' : 'text-green-500'
                          }`}>
                          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span>{isPositive ? '+' : ''}{change.toFixed(2)}%</span>
                        </div>
                      </div>

                      {/* 技术指标 */}
                      <div className="space-y-2 mb-4 text-sm relative z-10">
                        <div className="flex justify-between items-center p-2 bg-black/50 rounded border border-gray-800">
                          <span className="text-gray-400">RSI(14)</span>
                          <span className={`font-bold ${rsiStatus.color === 'text-red-500' ? 'text-[#ff102a]' :
                            rsiStatus.color === 'text-green-500' ? 'text-green-500' : 'text-gray-400'
                            }`}>
                            {typeof analysis.indicators.rsi === 'number' ? analysis.indicators.rsi.toFixed(1) : 'N/A'}
                            <span className="text-xs ml-1 opacity-80">({rsiStatus.text})</span>
                          </span>
                        </div>
                        {typeof analysis.indicators.macd === 'number' && (
                          <div className="flex justify-between items-center p-2 bg-black/50 rounded border border-gray-800">
                            <span className="text-gray-400">MACD</span>
                            <span className="font-bold text-white">
                              {analysis.indicators.macd.toFixed(5)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* 查看详情 */}
                      <div className="pt-4 border-t border-gray-800 relative z-10">
                        <span className="text-[#ff102a] font-bold group-hover:tracking-wider transition-all duration-300 flex items-center gap-2">
                          {isZh ? '查看详细分析' : 'View Analysis'}
                          <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

      {/* Premium CTA */}
      <PremiumCTA
        badge={{ zh: 'AI市场分析', en: 'AI Market Analysis' }}
        title={{
          zh: '专业分析助力交易决策',
          en: 'Professional Analysis for Better Trading'
        }}
        subtitle={{
          zh: '每90分钟自动更新市场分析。加入我们的培训计划，学习如何解读市场信号。',
          en: 'Auto-updated market analysis every 90 minutes. Join our training to learn how to interpret market signals.'
        }}
        primaryButton={{
          text: { zh: '预约面试', en: 'Schedule Interview' },
          action: 'modal'
        }}
        secondaryButton={{
          text: { zh: '查看教育中心', en: 'Education Center' },
          action: 'link',
          link: `/${language}/education`
        }}
        showStats={true}
        onModalOpen={() => setIsEmailModalOpen(true)}
      />

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}
