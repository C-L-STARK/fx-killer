"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import PremiumCTA from '@/components/custom/PremiumCTA';
import EmailContactModal from '@/components/custom/EmailContactModal';

export default function RiskRewardCalculatorPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Input states
  const [entryPrice, setEntryPrice] = useState<string>('1.0850');
  const [stopLoss, setStopLoss] = useState<string>('1.0800');
  const [takeProfit, setTakeProfit] = useState<string>('1.0950');
  const [accountBalance, setAccountBalance] = useState<string>('10000');
  const [riskPercentage, setRiskPercentage] = useState<string>('2');
  const [lotSize, setLotSize] = useState<string>('1.0');
  const [currencyPair, setCurrencyPair] = useState<string>('EURUSD');

  // Calculate results
  const calculateResults = () => {
    const entry = parseFloat(entryPrice) || 0;
    const sl = parseFloat(stopLoss) || 0;
    const tp = parseFloat(takeProfit) || 0;
    const balance = parseFloat(accountBalance) || 0;
    const risk = parseFloat(riskPercentage) || 0;
    const lots = parseFloat(lotSize) || 0;

    if (entry <= 0 || sl <= 0 || tp <= 0 || balance <= 0 || risk <= 0 || lots <= 0) {
      return {
        stopLossPips: 0,
        takeProfitPips: 0,
        riskRewardRatio: 0,
        riskAmount: 0,
        potentialProfit: 0,
        pipValue: 0,
        tradeValid: false,
      };
    }

    // Determine if long or short
    const isLong = tp > entry;
    const pipSize = currencyPair.includes('JPY') ? 0.01 : 0.0001;

    // Calculate pips
    const stopLossPips = Math.abs(entry - sl) / pipSize;
    const takeProfitPips = Math.abs(tp - entry) / pipSize;

    // Calculate risk/reward ratio
    const riskRewardRatio = takeProfitPips / stopLossPips;

    // Calculate monetary amounts
    const riskAmount = balance * (risk / 100);
    const pipValue = riskAmount / stopLossPips;
    const potentialProfit = pipValue * takeProfitPips;

    // Validate trade direction
    const tradeValid = isLong ? (sl < entry && tp > entry) : (sl > entry && tp < entry);

    return {
      stopLossPips: Math.round(stopLossPips * 10) / 10,
      takeProfitPips: Math.round(takeProfitPips * 10) / 10,
      riskRewardRatio: Math.round(riskRewardRatio * 100) / 100,
      riskAmount: Math.round(riskAmount * 100) / 100,
      potentialProfit: Math.round(potentialProfit * 100) / 100,
      pipValue: Math.round(pipValue * 100) / 100,
      tradeValid,
      isLong,
    };
  };

  const results = calculateResults();

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            {isZh ? '风险回报计算器' : 'Risk/Reward Calculator'}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {isZh
              ? '精确计算交易的风险回报比、止损止盈点数，优化交易决策'
              : 'Calculate risk/reward ratio, stop loss and take profit pips to optimize trading decisions'}
          </p>
        </div>

        {/* Trade Direction Warning */}
        {!results.tradeValid && parseFloat(entryPrice) > 0 && (
          <div className="mb-8 bg-red-900/20 border border-red-500/50 p-4 text-center">
            <p className="text-red-400 font-bold">
              {isZh
                ? '⚠️ 警告：止损/止盈位置设置错误！请检查交易方向。'
                : '⚠️ Warning: Invalid SL/TP placement! Please check trade direction.'}
            </p>
          </div>
        )}

        {/* Main Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div className="bg-black p-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-800 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#ff102a]"></span>
              {isZh ? '交易参数' : 'Trade Parameters'}
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
                </select>
              </div>

              {/* Entry Price */}
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  {isZh ? '入场价格' : 'Entry Price'}
                </label>
                <input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-800 bg-black text-white focus:border-[#ff102a] outline-none transition-colors"
                  placeholder="1.0850"
                  step="0.0001"
                />
              </div>

              {/* Stop Loss */}
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  {isZh ? '止损价格' : 'Stop Loss Price'}
                </label>
                <input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  className="w-full px-4 py-3 border border-red-900/50 bg-black text-white focus:border-red-500 outline-none transition-colors"
                  placeholder="1.0800"
                  step="0.0001"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {isZh ? '红色边框表示止损' : 'Red border indicates stop loss'}
                </p>
              </div>

              {/* Take Profit */}
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  {isZh ? '止盈价格' : 'Take Profit Price'}
                </label>
                <input
                  type="number"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  className="w-full px-4 py-3 border border-green-900/50 bg-black text-white focus:border-green-500 outline-none transition-colors"
                  placeholder="1.0950"
                  step="0.0001"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {isZh ? '绿色边框表示止盈' : 'Green border indicates take profit'}
                </p>
              </div>

              {/* Account Balance */}
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  {isZh ? '账户余额 ($)' : 'Account Balance ($)'}
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
              {/* Trade Direction */}
              {results.tradeValid && (
                <div className="bg-black/50 p-4 border border-gray-800">
                  <p className="text-sm text-gray-400 mb-1">
                    {isZh ? '交易方向' : 'Trade Direction'}
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {results.isLong ? (isZh ? '做多 ↑' : 'LONG ↑') : (isZh ? '做空 ↓' : 'SHORT ↓')}
                  </p>
                </div>
              )}

              {/* Risk/Reward Ratio */}
              <div className={`bg-black/50 p-4 border ${results.riskRewardRatio >= 2
                ? 'border-green-500/30'
                : results.riskRewardRatio >= 1.5
                  ? 'border-yellow-500/30'
                  : 'border-red-500/30'
                } `}>
                <p className="text-sm text-gray-400 mb-1">
                  {isZh ? '盈亏比' : 'Risk/Reward Ratio'}
                </p>
                <p className={`text-4xl font-bold ${results.riskRewardRatio >= 2
                  ? 'text-green-500'
                  : results.riskRewardRatio >= 1.5
                    ? 'text-yellow-500'
                    : 'text-red-500'
                  } `}>
                  1:{results.riskRewardRatio.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {results.riskRewardRatio >= 2
                    ? (isZh ? '✓ 优秀的风险回报比' : '✓ Excellent ratio')
                    : results.riskRewardRatio >= 1.5
                      ? (isZh ? '⚠ 可接受的风险回报比' : '⚠ Acceptable ratio')
                      : (isZh ? '✗ 风险回报比过低' : '✗ Poor ratio')
                  }
                </p>
              </div>

              {/* Stop Loss Pips */}
              <div className="bg-black/50 p-4 border border-red-500/30">
                <p className="text-sm text-gray-400 mb-1">
                  {isZh ? '止损点数' : 'Stop Loss (Pips)'}
                </p>
                <p className="text-3xl font-bold text-red-500">
                  {results.stopLossPips.toFixed(1)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isZh ? '风险控制' : 'Risk control'}
                </p>
              </div>

              {/* Take Profit Pips */}
              <div className="bg-black/50 p-4 border border-green-500/30">
                <p className="text-sm text-gray-400 mb-1">
                  {isZh ? '止盈点数' : 'Take Profit (Pips)'}
                </p>
                <p className="text-3xl font-bold text-green-500">
                  {results.takeProfitPips.toFixed(1)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isZh ? '盈利目标' : 'Profit target'}
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
                  {isZh ? '达到止盈时' : 'If TP is hit'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-black/30 p-8 border border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#ff102a]"></span>
            {isZh ? '风险回报比指南' : 'Risk/Reward Ratio Guidelines'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-900/10 p-6 border border-green-500/30">
              <h3 className="text-lg font-bold text-green-400 mb-3">
                {isZh ? '✓ 优秀 (≥ 1:2)' : '✓ Excellent (≥ 1:2)'}
              </h3>
              <p className="text-sm text-gray-400">
                {isZh
                  ? '即使胜率只有40%，长期仍能盈利。这是专业交易员的标准。'
                  : 'Even with 40% win rate, you profit long-term. Professional trader standard.'}
              </p>
            </div>

            <div className="bg-yellow-900/10 p-6 border border-yellow-500/30">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                {isZh ? '⚠ 可接受 (1:1.5 - 1:2)' : '⚠ Acceptable (1:1.5 - 1:2)'}
              </h3>
              <p className="text-sm text-gray-400">
                {isZh
                  ? '需要50%以上胜率才能盈利。适合高胜率策略。'
                  : 'Requires 50%+ win rate for profitability. Suitable for high-accuracy strategies.'}
              </p>
            </div>

            <div className="bg-red-900/10 p-6 border border-red-500/30">
              <h3 className="text-lg font-bold text-red-400 mb-3">
                {isZh ? '✗ 不建议 (< 1:1.5)' : '✗ Not Recommended (< 1:1.5)'}
              </h3>
              <p className="text-sm text-gray-400">
                {isZh
                  ? '需要60%以上胜率，难以长期盈利。建议重新规划交易。'
                  : 'Requires 60%+ win rate. Difficult to profit long-term. Reconsider trade.'}
              </p>
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
              href="/tools/pip-calculator"
              className="p-6 border border-gray-800 hover:border-[#ff102a] transition-colors group"
            >
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ff102a] transition-colors">
                {isZh ? '点值计算器' : 'Pip Value Calculator'}
              </h3>
              <p className="text-sm text-gray-400">
                {isZh ? '计算每点价值和货币换算' : 'Calculate pip value and currency conversion'}
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
          link: `/ ${language}/tools`
        }}
        showStats={true}
        onModalOpen={() => setIsEmailModalOpen(true)}
      />

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div >
  );
}
