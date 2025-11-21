"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, ArrowLeft, Clock, Activity } from 'lucide-react';
import InterviewCTA from '@/components/custom/InterviewCTA';
import TradingViewWidget from '@/components/market/TradingViewWidget';

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

interface MarketDetailClientProps {
  analysis: AnalysisData;
  language: 'zh' | 'en';
}

export default function MarketDetailClient({ analysis, language }: MarketDetailClientProps) {
  const isZh = language === 'zh';
  const change = parseFloat(analysis.price.change);
  const isPositive = change >= 0;

  const analysisContent = isZh ? analysis.analysis.zh : analysis.analysis.en;

  const getRSIStatus = (rsi?: number) => {
    if (!rsi) return { text: 'N/A', color: 'bg-gray-500', textColor: 'text-gray-700 dark:text-gray-300' };
    if (rsi >= 70) return { text: isZh ? '超买' : 'Overbought', color: 'bg-red-500', textColor: 'text-red-700 dark:text-red-300' };
    if (rsi <= 30) return { text: isZh ? '超卖' : 'Oversold', color: 'bg-green-500', textColor: 'text-green-700 dark:text-green-300' };
    return { text: isZh ? '中性' : 'Neutral', color: 'bg-gray-500', textColor: 'text-gray-300' };
  };

  const rsiStatus = getRSIStatus(analysis.indicators.rsi);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-[#0a0a0a] border-b-2 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link
            href={`/${language}/market-analysis`}
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {isZh ? '返回市场分析' : 'Back to Market Analysis'}
          </Link>

          <div className="mb-4">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {analysis.symbol}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {isZh ? analysis.nameCn : analysis.name}
            </p>
          </div>

          {/* Price Info */}
          <div className="flex flex-wrap items-end gap-6">
            <div>
              <div className="text-5xl font-bold text-gray-900 dark:text-white">
                {parseFloat(analysis.price.close).toFixed(analysis.symbol.includes('JPY') ? 2 : 5)}
              </div>
              <div className={`flex items-center gap-2 text-lg font-semibold mt-2 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                <span>{isPositive ? '+' : ''}{change.toFixed(2)}%</span>
              </div>
            </div>

            <div className="flex gap-6 text-sm">
              <div>
                <div className="text-gray-600 dark:text-gray-400">{isZh ? '开盘' : 'Open'}</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {parseFloat(analysis.price.open).toFixed(analysis.symbol.includes('JPY') ? 2 : 5)}
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">{isZh ? '高点' : 'High'}</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {parseFloat(analysis.price.high).toFixed(analysis.symbol.includes('JPY') ? 2 : 5)}
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">{isZh ? '低点' : 'Low'}</div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {parseFloat(analysis.price.low).toFixed(analysis.symbol.includes('JPY') ? 2 : 5)}
                </div>
              </div>
            </div>
          </div>

          {/* Update Time */}
          <div className="mt-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>
              {isZh ? '更新时间: ' : 'Updated: '}
              {new Date(analysis.timestamp).toLocaleString(isZh ? 'zh-CN' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Technical Indicators */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-200 dark:border-gray-800 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                {isZh ? '技术指标' : 'Technical Indicators'}
              </h2>

              <div className="space-y-6">
                {/* RSI */}
                {typeof analysis.indicators.rsi === 'number' && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">RSI (14)</span>
                      <span className="font-bold text-gray-900 dark:text-white text-lg">
                        {analysis.indicators.rsi.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-[#0a0a0a] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${rsiStatus.color}`}
                          style={{ width: `${analysis.indicators.rsi}%` }}
                        />
                      </div>
                      <span className={`text-xs font-semibold ${rsiStatus.textColor}`}>
                        {rsiStatus.text}
                      </span>
                    </div>
                  </div>
                )}

                {/* MACD */}
                {typeof analysis.indicators.macd === 'number' && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">MACD</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {analysis.indicators.macd.toFixed(5)}
                      </span>
                    </div>
                    {typeof analysis.indicators.macd_signal === 'number' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Signal</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {analysis.indicators.macd_signal.toFixed(5)}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* SMA */}
                {typeof analysis.indicators.sma20 === 'number' && (
                  <div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">SMA (20)</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {analysis.indicators.sma20.toFixed(analysis.symbol.includes('JPY') ? 2 : 5)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Analysis */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-200 dark:border-gray-800 p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {analysisContent.title}
              </h2>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                {analysisContent.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>{isZh ? '免责声明：' : 'Disclaimer: '}</strong>
                  {isZh
                    ? '本分析仅供参考，不构成投资建议。外汇交易存在风险，请谨慎决策。'
                    : 'This analysis is for reference only and does not constitute investment advice. Forex trading involves risks; please make decisions carefully.'}
                </p>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-8 text-center">
              <Link
                href={`/${language}/market-analysis`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-[#0a0a0a] dark:hover:bg-gray-200 transition-colors border-2 border-black dark:border-white"
              >
                <ArrowLeft className="w-5 h-5" />
                {isZh ? '返回市场分析列表' : 'Back to Market Analysis'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* TradingView Chart - Full Width */}
      <div className="w-full bg-gray-50 dark:bg-[#0a0a0a] border-y-2 border-gray-200 dark:border-gray-800" style={{ width: '100vw', height: '100vh' }}>
        <TradingViewWidget symbol={analysis.symbol.replace('/', '')} />
      </div>

      {/* Interview CTA Section */}
      <InterviewCTA />
    </div>
  );
}
