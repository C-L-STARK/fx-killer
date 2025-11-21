"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import PremiumCTA from '@/components/custom/PremiumCTA';
import EmailContactModal from '@/components/custom/EmailContactModal';

interface ExchangeRates {
  [key: string]: number;
}

export default function PipCalculatorPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Input states
  const [currencyPair, setCurrencyPair] = useState<string>('EURUSD');
  const [lotSize, setLotSize] = useState<string>('1.0');
  const [accountCurrency, setAccountCurrency] = useState<string>('USD');
  const [pips, setPips] = useState<string>('100');

  // Exchange rates
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [ratesLoading, setRatesLoading] = useState<boolean>(true);
  const [ratesError, setRatesError] = useState<string>('');

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setRatesLoading(true);
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) throw new Error('Failed to fetch rates');
        const data = await response.json();
        setExchangeRates(data.rates);
        setRatesLoading(false);
      } catch {
        setRatesError(isZh ? '无法获取实时汇率' : 'Cannot fetch real-time rates');
        setExchangeRates({
          EUR: 0.92,
          GBP: 0.79,
          AUD: 1.52,
          NZD: 1.65,
          JPY: 149.50,
          CHF: 0.88,
          CAD: 1.36,
          CNY: 7.24,
        });
        setRatesLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isZh]);

  // Get current price for currency pair
  const getCurrentPrice = (pair: string): number => {
    if (!exchangeRates || Object.keys(exchangeRates).length === 0) return 0;

    const base = pair.substring(0, 3);
    const quote = pair.substring(3, 6);

    if (base === 'USD') {
      return exchangeRates[quote] || 0;
    } else if (quote === 'USD') {
      return 1 / (exchangeRates[base] || 1);
    } else {
      const baseToUSD = 1 / (exchangeRates[base] || 1);
      const quoteToUSD = 1 / (exchangeRates[quote] || 1);
      return baseToUSD / quoteToUSD;
    }
  };

  // Calculate pip value
  const calculatePipValue = () => {
    const base = currencyPair.substring(0, 3);
    const quote = currencyPair.substring(3, 6);
    const lots = parseFloat(lotSize) || 0;
    const numPips = parseFloat(pips) || 0;

    if (lots <= 0 || numPips <= 0 || Object.keys(exchangeRates).length === 0) {
      return {
        pipValue: 0,
        totalValue: 0,
        currentPrice: 0,
        pipSize: 0,
      };
    }

    const contractSize = 100000;
    const pipSize = quote === 'JPY' ? 0.01 : 0.0001;
    const currentPrice = getCurrentPrice(currencyPair);

    // Calculate pip value in quote currency
    let pipValueInQuote = pipSize * contractSize * lots;

    // Convert to account currency
    let pipValueInAccount = pipValueInQuote;

    if (quote === accountCurrency) {
      pipValueInAccount = pipValueInQuote;
    } else if (quote === 'USD' && accountCurrency !== 'USD') {
      const usdToAccount = exchangeRates[accountCurrency] || 1;
      pipValueInAccount = pipValueInQuote * usdToAccount;
    } else if (quote !== 'USD' && accountCurrency === 'USD') {
      const quoteToUsd = 1 / (exchangeRates[quote] || 1);
      pipValueInAccount = pipValueInQuote * quoteToUsd;
    } else {
      const quoteToUsd = 1 / (exchangeRates[quote] || 1);
      const usdToAccount = exchangeRates[accountCurrency] || 1;
      pipValueInAccount = pipValueInQuote * quoteToUsd * usdToAccount;
    }

    const totalValue = pipValueInAccount * numPips;

    return {
      pipValue: Math.round(pipValueInAccount * 100) / 100,
      totalValue: Math.round(totalValue * 100) / 100,
      currentPrice: Math.round(currentPrice * 100000) / 100000,
      pipSize: pipSize,
    };
  };

  const results = calculatePipValue();

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            {isZh ? '点值计算器' : 'Pip Value Calculator'}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {isZh
              ? '基于实时汇率计算每点价值和盈亏金额，支持多种账户货币'
              : 'Calculate pip value and profit/loss based on real-time exchange rates'}
          </p>

          {/* Rate Status */}
          <div className="mt-4 text-sm">
            {ratesLoading ? (
              <span className="text-gray-500">{isZh ? '获取实时汇率...' : 'Fetching rates...'}</span>
            ) : ratesError ? (
              <span className="text-[#ff102a]">⚠ {ratesError}</span>
            ) : (
              <span className="text-green-500">
                ✓ {isZh ? '实时汇率已更新' : 'Rates updated'}
              </span>
            )}
          </div>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div className="bg-black p-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-800 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#ff102a]"></span>
              {isZh ? '输入参数' : 'Input Parameters'}
            </h2>

            <div className="space-y-6">
              {/* Currency Pair */}
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  {isZh ? '货币对' : 'Currency Pair'}
                </label>
                <select
                  value={currencyPair}
                  onChange={(e) => setCurrencyPair(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-800 bg-black text-white focus:border-[#ff102a] outline-none transition-colors"
                >
                  <option value="EURUSD">EUR/USD</option>
                  <option value="GBPUSD">GBP/USD</option>
                  <option value="AUDUSD">AUD/USD</option>
                  <option value="NZDUSD">NZD/USD</option>
                  <option value="USDJPY">USD/JPY</option>
                  <option value="USDCHF">USD/CHF</option>
                  <option value="USDCAD">USD/CAD</option>
                  <option value="EURJPY">EUR/JPY</option>
                  <option value="GBPJPY">GBP/JPY</option>
                  <option value="EURGBP">EUR/GBP</option>
                </select>
                {results.currentPrice > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {isZh ? '当前价格' : 'Current Price'}: {results.currentPrice.toFixed(5)}
                  </p>
                )}
              </div>

              {/* Lot Size */}
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  {isZh ? '手数' : 'Lot Size'}
                </label>
                <input
                  type="number"
                  value={lotSize}
                  onChange={(e) => setLotSize(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-800 bg-black text-white focus:border-[#ff102a] outline-none transition-colors"
                  placeholder="1.0"
                  step="0.01"
                  min="0.01"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {isZh ? '1手 = 100,000单位' : '1 lot = 100,000 units'}
                </p>
              </div>

              {/* Account Currency */}
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  {isZh ? '账户货币' : 'Account Currency'}
                </label>
                <select
                  value={accountCurrency}
                  onChange={(e) => setAccountCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-800 bg-black text-white focus:border-[#ff102a] outline-none transition-colors"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="AUD">AUD</option>
                  <option value="JPY">JPY</option>
                  <option value="CHF">CHF</option>
                  <option value="CAD">CAD</option>
                  <option value="CNY">CNY</option>
                </select>
              </div>

              {/* Number of Pips */}
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  {isZh ? '点数 (Pips)' : 'Number of Pips'}
                </label>
                <input
                  type="number"
                  value={pips}
                  onChange={(e) => setPips(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-800 bg-black text-white focus:border-[#ff102a] outline-none transition-colors"
                  placeholder="100"
                  step="1"
                  min="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {isZh ? '计算指定点数的总价值' : 'Calculate total value for specified pips'}
                </p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-black p-8 border border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff102a] blur-[100px] opacity-10 pointer-events-none"></div>
            <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-800 flex items-center gap-2 relative z-10">
              <span className="w-1 h-6 bg-[#ff102a]"></span>
              {isZh ? '计算结果' : 'Results'}
            </h2>

            <div className="space-y-6 relative z-10">
              {/* Pip Size */}
              <div className="bg-black/50 p-4 border border-gray-800">
                <p className="text-sm text-gray-400 mb-1">
                  {isZh ? 'Pip大小' : 'Pip Size'}
                </p>
                <p className="text-3xl font-bold text-white">
                  {results.pipSize.toFixed(4)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {currencyPair.includes('JPY')
                    ? (isZh ? '日元货币对' : 'JPY pairs')
                    : (isZh ? '标准货币对' : 'Standard pairs')}
                </p>
              </div>

              {/* Pip Value */}
              <div className="bg-black/50 p-4 border border-gray-800">
                <p className="text-sm text-gray-400 mb-1">
                  {isZh ? '每点价值' : 'Value Per Pip'}
                </p>
                <p className="text-4xl font-bold text-white">
                  {accountCurrency} ${results.pipValue.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isZh ? `基于${lotSize}手` : `Based on ${lotSize} lots`}
                </p>
              </div>

              {/* Total Value */}
              <div className="bg-black/50 p-4 border border-[#ff102a]/30 shadow-[0_0_20px_rgba(255,16,42,0.1)]">
                <p className="text-sm text-gray-400 mb-1">
                  {isZh ? `${pips}点总价值` : `Total Value for ${pips} Pips`}
                </p>
                <p className="text-4xl font-bold text-[#ff102a]">
                  {accountCurrency} ${results.totalValue.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isZh ? '盈利/亏损金额' : 'Profit/Loss amount'}
                </p>
              </div>

              {/* Quick Reference */}
              <div className="bg-black/50 p-4 border border-gray-800">
                <p className="text-sm font-bold text-white mb-3">
                  {isZh ? '快速参考' : 'Quick Reference'}
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>10 pips:</span>
                    <span className="font-bold text-white">${(results.pipValue * 10).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>25 pips:</span>
                    <span className="font-bold text-white">${(results.pipValue * 25).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>50 pips:</span>
                    <span className="font-bold text-white">${(results.pipValue * 50).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-800 pt-2">
                    <span>100 pips:</span>
                    <span className="font-bold text-white">${(results.pipValue * 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="bg-black/30 p-8 border border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#ff102a]"></span>
            {isZh ? 'Pip知识' : 'Understanding Pips'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                {isZh ? '什么是Pip？' : 'What is a Pip?'}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {isZh
                  ? 'Pip（Point in Percentage）是外汇市场价格变动的最小单位。对于大多数货币对，1 pip = 0.0001；对于日元货币对，1 pip = 0.01。'
                  : 'Pip (Point in Percentage) is the smallest price change unit in forex. For most pairs, 1 pip = 0.0001; for JPY pairs, 1 pip = 0.01.'}
              </p>
              <div className="bg-black p-4 border border-gray-800">
                <p className="text-sm text-gray-400 mb-2">
                  <span className="font-bold text-white">EUR/USD:</span> 1.0850 → 1.0851 = 1 pip
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-bold text-white">USD/JPY:</span> 149.50 → 149.51 = 1 pip
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                {isZh ? '为什么重要？' : 'Why It Matters?'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{isZh ? '计算交易盈亏的基础' : 'Foundation for calculating profit/loss'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{isZh ? '设置止损止盈的参考' : 'Reference for setting SL/TP'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{isZh ? '评估交易策略的有效性' : 'Evaluating strategy effectiveness'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{isZh ? '风险管理的重要指标' : 'Key metric for risk management'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Other Tools */}
        <div className="bg-black p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#ff102a]"></span>
            {isZh ? '其他工具' : 'Other Tools'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/tools/position-calculator"
              className="p-6 border border-gray-800 hover:border-[#ff102a] transition-colors group"
            >
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ff102a] transition-colors">
                {isZh ? '仓位计算器' : 'Position Size Calculator'}
              </h3>
              <p className="text-sm text-gray-400">
                {isZh ? '计算推荐的交易手数和保证金需求' : 'Calculate recommended lot size and margin requirement'}
              </p>
            </Link>

            <Link
              href="/tools/risk-reward-calculator"
              className="p-6 border border-gray-800 hover:border-[#ff102a] transition-colors group"
            >
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ff102a] transition-colors">
                {isZh ? '风险回报计算器' : 'Risk/Reward Calculator'}
              </h3>
              <p className="text-sm text-gray-400">
                {isZh ? '计算盈亏比和潜在盈利' : 'Calculate R/R ratio and potential profit'}
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Premium CTA - Full Width */}
      <PremiumCTA
        badge={{ zh: '专业工具', en: 'Professional Tools' }}
        title={{
          zh: '提升交易技能，成为职业交易员',
          en: 'Enhance Trading Skills, Become a Pro Trader'
        }}
        subtitle={{
          zh: '使用专业工具优化交易策略。加入我们的培训计划，获得真实资金配置。',
          en: 'Use professional tools to optimize trading strategies. Join our training program and get real funded accounts.'
        }}
        primaryButton={{
          text: { zh: '预约面试', en: 'Schedule Interview' },
          action: 'modal'
        }}
        secondaryButton={{
          text: { zh: '查看更多工具', en: 'More Tools' },
          action: 'link',
          link: `/${language}/tools`
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
