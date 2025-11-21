"use client";

import React, { useState, useEffect } from 'react';
import type { TradingConfig } from '@/lib/trading/types';

interface CompactStrategyConfigProps {
  config: TradingConfig;
  onConfigChange: (config: TradingConfig) => void;
  showPresets?: boolean;
}

interface BinanceSymbol {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
}

export default function CompactStrategyConfig({
  config,
  onConfigChange,
  showPresets = true
}: CompactStrategyConfigProps) {
  const [expanded, setExpanded] = useState(false);
  const [symbols, setSymbols] = useState<BinanceSymbol[]>([]);
  const [loadingSymbols, setLoadingSymbols] = useState(false);

  // Fetch symbols from Binance
  useEffect(() => {
    const fetchSymbols = async () => {
      setLoadingSymbols(true);
      try {
        const response = await fetch('/api/trading/symbols');
        if (response.ok) {
          const data = await response.json();
          // Use popular symbols if available, otherwise all symbols
          setSymbols(data.popular && data.popular.length > 0 ? data.popular : data.all || []);
        }
      } catch (error) {
        console.error('Failed to fetch symbols:', error);
        // Fallback to default symbols - forex + crypto
        setSymbols([
          { symbol: 'XAUUSDT', baseAsset: 'XAU', quoteAsset: 'USDT' },
          { symbol: 'EURUSD', baseAsset: 'EUR', quoteAsset: 'USD' },
          { symbol: 'GBPUSD', baseAsset: 'GBP', quoteAsset: 'USD' },
          { symbol: 'USDJPY', baseAsset: 'USD', quoteAsset: 'JPY' },
          { symbol: 'BTCUSDT', baseAsset: 'BTC', quoteAsset: 'USDT' },
          { symbol: 'ETHUSDT', baseAsset: 'ETH', quoteAsset: 'USDT' },
          { symbol: 'BNBUSDT', baseAsset: 'BNB', quoteAsset: 'USDT' },
          { symbol: 'SOLUSDT', baseAsset: 'SOL', quoteAsset: 'USDT' },
          { symbol: 'ADAUSDT', baseAsset: 'ADA', quoteAsset: 'USDT' },
        ]);
      } finally {
        setLoadingSymbols(false);
      }
    };

    fetchSymbols();
  }, []);

  const updateConfig = (path: string[], value: any) => {
    const newConfig = { ...config };
    let current: any = newConfig;

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }

    current[path[path.length - 1]] = value;
    onConfigChange(newConfig);
  };

  // 预设配置 - 回调策略 (Pullback Strategy, 1.75 Profit Factor)
  const presets = {
    conservative: {
      aggressiveness: 1 as 1 | 2 | 3,
      trailingActivation: 2.0,  // 2R激活（更保守）
      trailingDistance: 1.5,     // 1.5 ATR距离
      stopLossMultiple: 2.5,     // 更宽的止损
      takeProfitLevels: [2.5, 5.0, 8.0],  // 保守目标
      maxDailyLoss: 300,
      maxDrawdown: 0.08,
      positionSize: 10, // USDT
      leverage: 5,
    },
    moderate: {
      aggressiveness: 3 as 1 | 2 | 3,  // 回调策略推荐激进度=3
      trailingActivation: 1.5,  // 1.5R激活（验证通过）
      trailingDistance: 1.0,     // 1 ATR距离（验证通过）
      stopLossMultiple: 2.0,     // 2 ATR止损（验证通过）
      takeProfitLevels: [3.0, 6.0, 9.0],  // 3R/6R/9R（验证通过，1.75盈亏比）
      maxDailyLoss: 500,
      maxDrawdown: 0.10,
      positionSize: 10, // USDT
      leverage: 10,
    },
    aggressive: {
      aggressiveness: 3 as 1 | 2 | 3,
      trailingActivation: 1.2,  // 1.2R激活（更激进）
      trailingDistance: 0.8,     // 0.8 ATR距离（更紧）
      stopLossMultiple: 1.8,     // 更紧的止损
      takeProfitLevels: [3.5, 7.0, 10.0],  // 更高目标
      maxDailyLoss: 800,
      maxDrawdown: 0.15,
      positionSize: 10, // USDT
      leverage: 20,
    },
  };

  const applyPreset = (preset: 'conservative' | 'moderate' | 'aggressive') => {
    const p = presets[preset];
    onConfigChange({
      ...config,
      strategy: {
        ...config.strategy,
        aggressiveness: p.aggressiveness,
        trailingActivation: p.trailingActivation,
        trailingDistance: p.trailingDistance,
      },
      risk: {
        ...config.risk,
        maxDailyLoss: p.maxDailyLoss,
        maxDrawdown: p.maxDrawdown,
        positionSize: p.positionSize,
        leverage: p.leverage,
        stopLossMultiple: p.stopLossMultiple,           // 添加回调策略止损参数
        takeProfitLevels: p.takeProfitLevels,           // 添加回调策略止盈参数
      },
    });
  };

  // 检测当前配置匹配哪个预设
  const getCurrentPreset = (): 'conservative' | 'moderate' | 'aggressive' | null => {
    const { aggressiveness } = config.strategy;
    const { leverage } = config.risk;

    if (aggressiveness === 1 && leverage === 5) return 'conservative';
    if (aggressiveness === 2 && leverage === 10) return 'moderate';
    if (aggressiveness === 3 && leverage === 20) return 'aggressive';
    return null;
  };

  const currentPreset = getCurrentPreset();

  return (
    <div className="bg-[#0a0a0a] border-2 border-gray-800">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-[#0a0a0a] transition-colors"
      >
        <h3 className="text-lg font-bold text-white">策略配置</h3>
        <svg
          className={`w-5 h-5 text-white transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Content */}
      {expanded && (
        <div className="px-6 pb-6 border-t-2 border-gray-300 dark:border-gray-700">
          {/* Presets */}
          {showPresets && (
            <div className="pt-6 pb-4 mb-4 border-b-2 border-gray-300 dark:border-gray-700">
              <p className="text-sm font-bold text-white mb-3">快速预设</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => applyPreset('conservative')}
                  className={`px-3 py-2 text-sm font-bold border-2 transition-colors ${
                    currentPreset === 'conservative'
                      ? 'bg-black dark:bg-white text-white dark:text-black border-gray-800'
                      : 'bg-black border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white text-white'
                  }`}
                >
                  保守 (5x)
                </button>
                <button
                  onClick={() => applyPreset('moderate')}
                  className={`px-3 py-2 text-sm font-bold border-2 transition-colors ${
                    currentPreset === 'moderate'
                      ? 'bg-black dark:bg-white text-white dark:text-black border-gray-800'
                      : 'bg-black border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white text-white'
                  }`}
                >
                  适中 (10x)
                </button>
                <button
                  onClick={() => applyPreset('aggressive')}
                  className={`px-3 py-2 text-sm font-bold border-2 transition-colors ${
                    currentPreset === 'aggressive'
                      ? 'bg-black dark:bg-white text-white dark:text-black border-gray-800'
                      : 'bg-black border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white text-white'
                  }`}
                >
                  激进 (20x)
                </button>
              </div>
            </div>
          )}

          {/* Basic Settings */}
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-white mb-1">交易对</label>
                <select
                  value={config.symbol}
                  onChange={(e) => updateConfig(['symbol'], e.target.value)}
                  disabled={loadingSymbols}
                  className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none disabled:opacity-50"
                >
                  {loadingSymbols ? (
                    <option>加载中...</option>
                  ) : symbols.length > 0 ? (
                    symbols.map((s) => (
                      <option key={s.symbol} value={s.symbol}>
                        {s.symbol} ({s.baseAsset})
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="XAUUSDT">XAUUSDT (黄金)</option>
                      <option value="EURUSD">EURUSD (欧元/美元)</option>
                      <option value="GBPUSD">GBPUSD (英镑/美元)</option>
                      <option value="USDJPY">USDJPY (美元/日元)</option>
                      <option value="BTCUSDT">BTCUSDT (比特币)</option>
                      <option value="ETHUSDT">ETHUSDT (以太坊)</option>
                      <option value="BNBUSDT">BNBUSDT (BNB)</option>
                      <option value="SOLUSDT">SOLUSDT (Solana)</option>
                      <option value="ADAUSDT">ADAUSDT (Cardano)</option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-1">时间周期</label>
                <select
                  value={config.interval}
                  onChange={(e) => updateConfig(['interval'], e.target.value)}
                  className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                >
                  <option value="1m">1分钟</option>
                  <option value="5m">5分钟</option>
                  <option value="15m">15分钟</option>
                  <option value="1h">1小时</option>
                  <option value="4h">4小时</option>
                  <option value="1d">1天</option>
                </select>
              </div>
            </div>

            {/* Strategy & Risk Settings */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-bold text-white mb-1">激进度</label>
                <select
                  value={config.strategy.aggressiveness}
                  onChange={(e) => updateConfig(['strategy', 'aggressiveness'], Number(e.target.value) as 1 | 2 | 3)}
                  className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                >
                  <option value={1}>保守</option>
                  <option value={2}>适中</option>
                  <option value={3}>激进</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-1">仓位 (USDT)</label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={config.risk.positionSize || 10}
                  onChange={(e) => updateConfig(['risk', 'positionSize'], Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-1">杠杆 (x)</label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="125"
                  value={config.risk.leverage || 10}
                  onChange={(e) => updateConfig(['risk', 'leverage'], Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-1">日最大亏损</label>
                <input
                  type="number"
                  value={config.risk.maxDailyLoss}
                  onChange={(e) => updateConfig(['risk', 'maxDailyLoss'], Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                />
              </div>
            </div>

            {/* Advanced Settings */}
            <details className="border-t-2 border-gray-300 dark:border-gray-700 pt-4">
              <summary className="text-sm font-bold text-white cursor-pointer mb-3">
                ⚠️ 高级设置 (修改指标参数存在风险，建议保持默认值)
              </summary>

              <div className="space-y-4 mt-4">
                {/* Strategy Advanced */}
                <div className="pb-4 border-b-2 border-gray-300 dark:border-gray-700">
                  <h4 className="text-sm font-bold text-white mb-3">跟踪止损</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        激活 (R倍数)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={config.strategy.trailingActivation}
                        onChange={(e) => updateConfig(['strategy', 'trailingActivation'], Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        距离 (ATR)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={config.strategy.trailingDistance}
                        onChange={(e) => updateConfig(['strategy', 'trailingDistance'], Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Indicators */}
                <div className="pb-4 border-b-2 border-gray-300 dark:border-gray-700">
                  <h4 className="text-sm font-bold text-red-600 dark:text-red-400 mb-3">⚠️ 技术指标参数 (高风险区域)</h4>

                  {/* Keltner Channel */}
                  <div className="mb-4">
                    <p className="text-xs font-bold text-white mb-2">Keltner Channel</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">MA周期</label>
                        <input
                          type="number"
                          value={config.strategy.indicators.keltner.maPeriod}
                          onChange={(e) => updateConfig(['strategy', 'indicators', 'keltner', 'maPeriod'], Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">ATR周期</label>
                        <input
                          type="number"
                          value={config.strategy.indicators.keltner.atrPeriod}
                          onChange={(e) => updateConfig(['strategy', 'indicators', 'keltner', 'atrPeriod'], Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">ATR倍数</label>
                        <input
                          type="number"
                          step="0.1"
                          value={config.strategy.indicators.keltner.atrMultiple}
                          onChange={(e) => updateConfig(['strategy', 'indicators', 'keltner', 'atrMultiple'], Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bollinger & MACD */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-bold text-white mb-2">Bollinger Bands</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">周期</label>
                          <input
                            type="number"
                            value={config.strategy.indicators.bollinger.period}
                            onChange={(e) => updateConfig(['strategy', 'indicators', 'bollinger', 'period'], Number(e.target.value))}
                            className="w-full px-2 py-1 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">标准差</label>
                          <input
                            type="number"
                            step="0.1"
                            value={config.strategy.indicators.bollinger.deviation}
                            onChange={(e) => updateConfig(['strategy', 'indicators', 'bollinger', 'deviation'], Number(e.target.value))}
                            className="w-full px-2 py-1 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-white mb-2">MACD</p>
                      <div className="grid grid-cols-3 gap-1">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">快</label>
                          <input
                            type="number"
                            value={config.strategy.indicators.macd.fastPeriod}
                            onChange={(e) => updateConfig(['strategy', 'indicators', 'macd', 'fastPeriod'], Number(e.target.value))}
                            className="w-full px-2 py-1 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">慢</label>
                          <input
                            type="number"
                            value={config.strategy.indicators.macd.slowPeriod}
                            onChange={(e) => updateConfig(['strategy', 'indicators', 'macd', 'slowPeriod'], Number(e.target.value))}
                            className="w-full px-2 py-1 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">信号</label>
                          <input
                            type="number"
                            value={config.strategy.indicators.macd.signalPeriod}
                            onChange={(e) => updateConfig(['strategy', 'indicators', 'macd', 'signalPeriod'], Number(e.target.value))}
                            className="w-full px-2 py-1 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CCI & SuperTrend */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold text-white mb-2">CCI</p>
                      <label className="block text-xs text-gray-400 mb-1">周期</label>
                      <input
                        type="number"
                        value={config.strategy.indicators.cci.period}
                        onChange={(e) => updateConfig(['strategy', 'indicators', 'cci', 'period'], Number(e.target.value))}
                        className="w-full px-2 py-1 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-white mb-2">SuperTrend</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">周期</label>
                          <input
                            type="number"
                            value={config.strategy.indicators.supertrend.period}
                            onChange={(e) => updateConfig(['strategy', 'indicators', 'supertrend', 'period'], Number(e.target.value))}
                            className="w-full px-2 py-1 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">倍数</label>
                          <input
                            type="number"
                            step="0.1"
                            value={config.strategy.indicators.supertrend.multiplier}
                            onChange={(e) => updateConfig(['strategy', 'indicators', 'supertrend', 'multiplier'], Number(e.target.value))}
                            className="w-full px-2 py-1 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Management */}
                <div>
                  <h4 className="text-sm font-bold text-white mb-3">风险管理</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        最大回撤 (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={config.risk.maxDrawdown}
                        onChange={(e) => updateConfig(['risk', 'maxDrawdown'], Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-white mb-1">
                        止损倍数 (ATR)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={config.risk.stopLossMultiple}
                        onChange={(e) => updateConfig(['risk', 'stopLossMultiple'], Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}
