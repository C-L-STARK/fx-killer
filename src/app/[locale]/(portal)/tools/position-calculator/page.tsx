"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PremiumCTA from '@/components/custom/PremiumCTA';
import EmailContactModal from '@/components/custom/EmailContactModal';

interface ExchangeRates {
  [key: string]: number;
}

export default function PositionCalculatorPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Input states
  const [accountBalance, setAccountBalance] = useState<string>('10000');
  const [riskPercentage, setRiskPercentage] = useState<string>('2');
  const [stopLossPips, setStopLossPips] = useState<string>('50');
  const [currencyPair, setCurrencyPair] = useState<string>('EURUSD');
  const [accountCurrency, setAccountCurrency] = useState<string>('USD');
  const [takeProfitPips, setTakeProfitPips] = useState<string>('100');
  const [leverage, setLeverage] = useState<string>('100');

  // Exchange rates state
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [goldPrice, setGoldPrice] = useState<number>(0);
  const [ratesLoading, setRatesLoading] = useState<boolean>(true);
  const [ratesError, setRatesError] = useState<string>('');

  // Calculated results
  const [results, setResults] = useState({
    lotSize: 0,
    riskAmount: 0,
    pipValue: 0,
    potentialProfit: 0,
    riskRewardRatio: 0,
    marginRequired: 0,
    currentPrice: 0,
  });

  // Fetch real-time exchange rates and gold price
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setRatesLoading(true);
        setRatesError('');

        // Fetch forex rates from ExchangeRate-API
        const forexResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

        if (!forexResponse.ok) {
          throw new Error('Failed to fetch forex rates');
        }

        const forexData = await forexResponse.json();
        setExchangeRates(forexData.rates);

        // Fetch gold price from Coinbase public API (no key required)
        try {
          const goldResponse = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=XAU');
          if (goldResponse.ok) {
            const goldData = await goldResponse.json();
            // Coinbase returns 1 XAU = X USD, we need to invert
            const xauToUsd = parseFloat(goldData.data?.rates?.USD || '0');
            if (xauToUsd > 0) {
              // Coinbase gives troy ounce price
              setGoldPrice(xauToUsd);
            } else {
              setGoldPrice(2650); // Fallback
            }
          } else {
            setGoldPrice(2650);
          }
        } catch {
          // Fallback to approximate current gold price if fetch fails
          setGoldPrice(2650);
        }

        setRatesLoading(false);
      } catch {
        setRatesError(isZh ? '无法获取实时汇率，使用默认值' : 'Cannot fetch real-time rates, using defaults');
        setRatesLoading(false);

        // Fallback to approximate rates
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
        setGoldPrice(2650);
      }
    };

    fetchRates();
    // Refresh rates every 5 minutes
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isZh]);

  // Get current price for currency pair
  const getCurrentPrice = useCallback((pair: string): number => {
    // Special handling for gold
    if (pair === 'XAUUSD') {
      return goldPrice;
    }

    if (!exchangeRates || Object.keys(exchangeRates).length === 0) return 0;

    const base = pair.substring(0, 3);
    const quote = pair.substring(3, 6);

    // Calculate pair price from USD-based rates
    if (base === 'USD') {
      // USD/XXX - direct from rates
      return exchangeRates[quote] || 0;
    } else if (quote === 'USD') {
      // XXX/USD - inverse
      return 1 / (exchangeRates[base] || 1);
    } else {
      // Cross pairs: XXX/YYY
      // XXX/USD ÷ YYY/USD = XXX/YYY
      const baseToUSD = 1 / (exchangeRates[base] || 1);
      const quoteToUSD = 1 / (exchangeRates[quote] || 1);
      return baseToUSD / quoteToUSD;
    }
  }, [exchangeRates, goldPrice]);

  // Calculate pip value correctly based on currency pair and lot size
  const calculatePipValue = useCallback((pair: string, lotSize: number, accountCurr: string): number => {
    // Special handling for gold (XAU/USD)
    if (pair === 'XAUUSD') {
      // For gold: 1 standard lot = 100 oz, 1 pip = $0.01
      // Pip value = 100 oz × $0.01 = $1 per pip per lot
      const pipValueInUSD = 1 * lotSize;

      // Convert to account currency if needed
      if (accountCurr === 'USD') {
        return pipValueInUSD;
      } else {
        const usdToAccount = exchangeRates[accountCurr] || 1;
        return pipValueInUSD * usdToAccount;
      }
    }

    const base = pair.substring(0, 3);
    const quote = pair.substring(3, 6);
    const contractSize = 100000; // Standard lot

    // Determine pip size (0.01 for JPY pairs, 0.0001 for others)
    const pipSize = quote === 'JPY' ? 0.01 : 0.0001;

    // Calculate pip value in quote currency
    // Pip value = pip size × contract size × lot size
    let pipValueInQuote = pipSize * contractSize * lotSize;

    // Convert pip value from quote currency to account currency
    if (quote === accountCurr) {
      // Quote currency is same as account currency - no conversion needed
      return pipValueInQuote;
    } else if (quote === 'USD' && accountCurr !== 'USD') {
      // Quote is USD, account is not USD
      // Need to convert USD to account currency
      const usdToAccount = exchangeRates[accountCurr] || 1;
      return pipValueInQuote * usdToAccount;
    } else if (quote !== 'USD' && accountCurr === 'USD') {
      // Quote is not USD, account is USD
      // Need to convert quote currency to USD
      const quoteToUsd = 1 / (exchangeRates[quote] || 1);
      return pipValueInQuote * quoteToUsd;
    } else {
      // Both quote and account are not USD - convert via USD
      const quoteToUsd = 1 / (exchangeRates[quote] || 1);
      const usdToAccount = exchangeRates[accountCurr] || 1;
      return pipValueInQuote * quoteToUsd * usdToAccount;
    }
  }, [exchangeRates]);

  // Calculate position with useCallback to avoid dependency issues
  const calculatePosition = useCallback(() => {
    const balance = parseFloat(accountBalance) || 0;
    const risk = parseFloat(riskPercentage) || 0;
    const slPips = parseFloat(stopLossPips) || 0;
    const tpPips = parseFloat(takeProfitPips) || 0;
    const lev = parseFloat(leverage) || 1;

    if (balance <= 0 || risk <= 0 || slPips <= 0 || lev <= 0) {
      setResults({
        lotSize: 0,
        riskAmount: 0,
        pipValue: 0,
        potentialProfit: 0,
        riskRewardRatio: 0,
        marginRequired: 0,
        currentPrice: 0,
      });
      return;
    }

    const riskAmount = balance * (risk / 100);
    const currentPrice = getCurrentPrice(currencyPair);

    // Step 1: Calculate pip value for 1 standard lot
    const pipValuePerLot = calculatePipValue(currencyPair, 1, accountCurrency);

    // Step 2: Calculate required lot size based on risk
    // Formula: Lot Size = Risk Amount / (Stop Loss Pips × Pip Value per Lot)
    const lotSize = riskAmount / (slPips * pipValuePerLot);

    // Step 3: Calculate actual pip value for the calculated lot size
    const actualPipValue = calculatePipValue(currencyPair, lotSize, accountCurrency);

    // Step 4: Calculate potential profit
    const potentialProfit = actualPipValue * tpPips;

    // Step 5: Calculate risk/reward ratio
    const riskRewardRatio = tpPips / slPips;

    // Step 6: Calculate margin required
    let contractSize: number;
    if (currencyPair === 'XAUUSD') {
      contractSize = 100; // 100 oz for gold
    } else {
      contractSize = 100000; // Standard forex lot
    }

    const positionValue = lotSize * contractSize * currentPrice;
    const marginRequired = positionValue / lev;

    setResults({
      lotSize: Math.round(lotSize * 100) / 100,
      riskAmount: Math.round(riskAmount * 100) / 100,
      pipValue: Math.round(actualPipValue * 100) / 100,
      potentialProfit: Math.round(potentialProfit * 100) / 100,
      riskRewardRatio: Math.round(riskRewardRatio * 100) / 100,
      marginRequired: Math.round(marginRequired * 100) / 100,
      currentPrice: Math.round(currentPrice * 100000) / 100000,
    });
  }, [accountBalance, riskPercentage, stopLossPips, currencyPair, takeProfitPips, leverage, accountCurrency, getCurrentPrice, calculatePipValue]);

  // Real-time calculation
  useEffect(() => {
    if (!ratesLoading && Object.keys(exchangeRates).length > 0) {
      calculatePosition();
    }
  }, [calculatePosition, ratesLoading, exchangeRates]);

  // Check if enough margin
  const hasEnoughMargin = parseFloat(accountBalance) >= results.marginRequired;

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            {isZh ? '外汇仓位计算器' : 'Forex Position Size Calculator'}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {isZh
              ? '基于实时汇率和黄金价格，精确计算推荐的交易手数、保证金需求和风险收益比'
              : 'Calculate recommended lot size, margin requirement, and risk/reward ratio based on real-time forex and gold prices'}
          </p>

          {/* Exchange Rate Status */}
          <div className="mt-4 text-sm">
            {ratesLoading ? (
              <span className="text-gray-500">
                {isZh ? '正在获取实时价格...' : 'Fetching real-time prices...'}
              </span>
            ) : ratesError ? (
              <span className="text-[#ff102a]">⚠ {ratesError}</span>
            ) : (
              <span className="text-green-500">
                ✓ {isZh ? '实时价格已更新' : 'Real-time prices updated'}
              </span>
            )}
          </div>
        </div>

        {/* Main Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div className="bg-black p-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-800 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#ff102a]"></span>
              {isZh ? '输入参数' : 'Input Parameters'}
            </h2>

            <div className="space-y-6">
              {/* Account Balance */}
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  {isZh ? '账户余额' : 'Account Balance'} ({accountCurrency})
                </label>
                <input
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-800 bg-black text-white focus:border-[#ff102a] outline-none transition-colors"
                  placeholder="10000"
                />
              </div>

              {/* Risk Percentage */}
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  {isZh ? '风险百分比 (%)' : 'Risk Percentage (%)'}
                </label>
                <input
                  type="number"
                  value={riskPercentage}
                  onChange={(e) => setRiskPercentage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-800 bg-black text-white focus:border-[#ff102a] outline-none transition-colors"
                  placeholder="2"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {isZh ? '推荐：1-2%' : 'Recommended: 1-2%'}
                </p>
              </div>

              {/* Leverage */}
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  {isZh ? '杠杆倍数' : 'Leverage'}
                </label>
                <select
                  value={leverage}
                  onChange={(e) => setLeverage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-800 bg-black text-white focus:border-[#ff102a] outline-none transition-colors"
                >
                  <option value="1">1:1</option>
                  <option value="10">1:10</option>
                  <option value="20">1:20</option>
                  <option value="50">1:50</option>
                  <option value="100">1:100</option>
                  <option value="200">1:200</option>
                  <option value="400">1:400</option>
                  <option value="500">1:500</option>
                  <option value="1000">1:1000</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {isZh ? '杠杆越高，所需保证金越低' : 'Higher leverage requires less margin'}
                </p>
              </div>

              {/* Stop Loss Pips */}
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  {isZh ? '止损点数 (Pips)' : 'Stop Loss (Pips)'}
                </label>
                <input
                  type="number"
                  value={stopLossPips}
                  onChange={(e) => setStopLossPips(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-800 bg-black text-white focus:border-[#ff102a] outline-none transition-colors"
                  placeholder="50"
                />
              </div>

              {/* Take Profit Pips */}
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  {isZh ? '止盈点数 (Pips)' : 'Take Profit (Pips)'}
                </label>
                <input
                  type="number"
                  value={takeProfitPips}
                  onChange={(e) => setTakeProfitPips(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-800 bg-black text-white focus:border-[#ff102a] outline-none transition-colors"
                  placeholder="100"
                />
              </div>

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
                  <option value="XAUUSD">XAU/USD (Gold)</option>
                </select>
                {results.currentPrice > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {isZh ? '当前价格' : 'Current Price'}: {currencyPair === 'XAUUSD' ? `$${results.currentPrice.toFixed(2)}` : results.currentPrice.toFixed(5)}
                  </p>
                )}
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
                  <option value="CNY">CNY</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-black p-8 border border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff102a] blur-[100px] opacity-10 pointer-events-none"></div>
            <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-800 flex items-center gap-2 relative z-10">
              <span className="w-1 h-6 bg-[#ff102a]"></span>
              {isZh ? '计算结果' : 'Calculation Results'}
            </h2>

            <div className="space-y-6 relative z-10">
              {/* Lot Size */}
              <div className="bg-black/50 p-4 border border-[#ff102a]/30 shadow-[0_0_20px_rgba(255,16,42,0.1)]">
                <p className="text-sm text-gray-400 mb-1">
                  {isZh ? '推荐手数' : 'Recommended Lot Size'}
                </p>
                <p className="text-3xl font-bold text-white">
                  {results.lotSize.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isZh ? '标准手' : 'Standard Lots'}
                </p>
              </div>

              {/* Margin Required */}
              <div className={`bg-black/50 p-4 border ${hasEnoughMargin
                ? 'border-green-500/30'
                : 'border-red-500/30'
                }`}>
                <p className="text-sm text-gray-400 mb-1">
                  {isZh ? '所需保证金' : 'Margin Required'}
                </p>
                <p className={`text-3xl font-bold ${hasEnoughMargin
                  ? 'text-green-500'
                  : 'text-red-500'
                  }`}>
                  ${results.marginRequired.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {hasEnoughMargin
                    ? (isZh ? '✓ 保证金充足' : '✓ Sufficient margin')
                    : (isZh ? '✗ 保证金不足' : '✗ Insufficient margin')
                  }
                </p>
              </div>

              {/* Risk Amount */}
              <div className="bg-black/50 p-4 border border-gray-800">
                <p className="text-sm text-gray-400 mb-1">
                  {isZh ? '风险金额' : 'Risk Amount'}
                </p>
                <p className="text-3xl font-bold text-white">
                  ${results.riskAmount.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {riskPercentage}% {isZh ? '的账户余额' : 'of account balance'}
                </p>
              </div>

              {/* Potential Profit */}
              <div className="bg-black/50 p-4 border border-gray-800">
                <p className="text-sm text-gray-400 mb-1">
                  {isZh ? '潜在盈利' : 'Potential Profit'}
                </p>
                <p className="text-3xl font-bold text-green-500">
                  ${results.potentialProfit.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isZh ? '如果达到止盈' : 'If take profit is hit'}
                </p>
              </div>

              {/* Risk Reward Ratio */}
              <div className="bg-black/50 p-4 border border-gray-800">
                <p className="text-sm text-gray-400 mb-1">
                  {isZh ? '盈亏比' : 'Risk/Reward Ratio'}
                </p>
                <p className="text-3xl font-bold text-white">
                  1:{results.riskRewardRatio.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {results.riskRewardRatio >= 2
                    ? (isZh ? '✓ 优秀' : '✓ Excellent')
                    : results.riskRewardRatio >= 1.5
                      ? (isZh ? '⚠ 可接受' : '⚠ Acceptable')
                      : (isZh ? '✗ 过低' : '✗ Too Low')
                  }
                </p>
              </div>

              {/* Pip Value */}
              <div className="bg-black/50 p-4 border border-gray-800">
                <p className="text-sm text-gray-400 mb-1">
                  {isZh ? '每点价值' : 'Pip Value'}
                </p>
                <p className="text-2xl font-bold text-white">
                  ${results.pipValue.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isZh ? '基于实时价格' : 'Based on real-time prices'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guide */}
        <div className="bg-black/30 p-8 border border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#ff102a]"></span>
            {isZh ? '使用说明' : 'How to Use'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                {isZh ? '📝 计算公式' : '📝 Formula'}
              </h3>
              <div className="bg-black p-4 border border-gray-800">
                <p className="text-sm text-gray-400 mb-2 font-mono">
                  {isZh
                    ? '手数 = 风险金额 ÷ (止损点数 × 每点价值)'
                    : 'Lot Size = Risk Amount ÷ (SL Pips × Pip Value)'}
                </p>
                <p className="text-sm text-gray-400 mb-2 font-mono">
                  {isZh
                    ? '保证金 = (手数 × 合约大小 × 价格) ÷ 杠杆'
                    : 'Margin = (Lots × Contract Size × Price) ÷ Leverage'}
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  {isZh
                    ? '外汇：100,000单位/手；黄金：100盎司/手'
                    : 'Forex: 100,000 units/lot; Gold: 100 oz/lot'}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                {isZh ? '⚠️ 重要提示' : '⚠️ Important Notes'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{isZh ? '确保账户有足够保证金' : 'Ensure sufficient margin in account'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{isZh ? '建议单笔风险不超过2%' : 'Recommended risk per trade: max 2%'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{isZh ? '盈亏比建议至少1:2' : 'Risk/Reward ratio: minimum 1:2'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{isZh ? '高杠杆增加风险，谨慎使用' : 'High leverage increases risk, use cautiously'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{isZh ? '价格每5分钟自动更新' : 'Prices auto-update every 5 minutes'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Example */}
        <div className="bg-black p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#ff102a]"></span>
            {isZh ? '实战案例' : 'Real Example'}
          </h2>

          <div className="space-y-4 text-gray-400">
            <p className="font-bold text-white">
              {isZh ? '场景：' : 'Scenario:'}
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">•</span>
                <span>{isZh ? '账户余额：$10,000（USD）' : 'Account Balance: $10,000 (USD)'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">•</span>
                <span>{isZh ? '风险百分比：2%' : 'Risk Percentage: 2%'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">•</span>
                <span>{isZh ? '杠杆：1:100' : 'Leverage: 1:100'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">•</span>
                <span>{isZh ? '止损：50点' : 'Stop Loss: 50 pips'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">•</span>
                <span>{isZh ? '止盈：100点' : 'Take Profit: 100 pips'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">•</span>
                <span>{isZh ? '货币对：EUR/USD @ 1.0850' : 'Currency Pair: EUR/USD @ 1.0850'}</span>
              </li>
            </ul>

            <p className="font-bold text-white mt-6">
              {isZh ? '计算过程：' : 'Calculation:'}
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">1.</span>
                <span>{isZh ? '风险金额 = $10,000 × 2% = $200' : 'Risk Amount = $10,000 × 2% = $200'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">2.</span>
                <span>{isZh ? '每点价值 = $10（EUR/USD标准）' : 'Pip Value = $10 (EUR/USD standard)'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">3.</span>
                <span>{isZh ? '手数 = $200 ÷ (50 × $10) = 0.4手' : 'Lot Size = $200 ÷ (50 × $10) = 0.4 lots'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">4.</span>
                <span>{isZh ? '保证金 = (0.4 × 100,000 × 1.0850) ÷ 100 = $434' : 'Margin = (0.4 × 100,000 × 1.0850) ÷ 100 = $434'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">5.</span>
                <span>{isZh ? '潜在盈利 = 0.4 × 100 × $10 = $400' : 'Potential Profit = 0.4 × 100 × $10 = $400'}</span>
              </li>
            </ul>

            <div className="bg-black/50 text-white p-4 mt-6 border border-[#ff102a]">
              <p className="font-bold mb-2">
                {isZh ? '💡 关键洞察：' : '💡 Key Insight:'}
              </p>
              <p className="text-sm text-gray-300">
                {isZh
                  ? '正确的仓位计算确保：风险固定在$200（2%），盈亏比1:2，保证金占用仅$434（4.34%），账户可同时持有多个仓位而不会被强平。'
                  : 'Correct position sizing ensures: Fixed risk at $200 (2%), 1:2 risk/reward ratio, margin usage only $434 (4.34%), allowing multiple positions without margin call.'}
              </p>
            </div>
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
