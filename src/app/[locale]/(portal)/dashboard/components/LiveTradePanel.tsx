"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import CompactStrategyConfig from './CompactStrategyConfig';
import LiveTradingConnection from './LiveTradingConnection';
import type { TradingConfig, Signal } from '@/lib/trading/types';

const LiveTradingChart = dynamic(() => import('./LiveTradingChart'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] flex items-center justify-center bg-black border-2 border-gray-300 dark:border-gray-700">加载实时图表中...</div>
});

interface LiveTradePanelProps {
  tradingConfig: TradingConfig;
  onConfigChange?: (config: TradingConfig) => void;
}

export default function LiveTradePanel({ tradingConfig: initialConfig, onConfigChange }: LiveTradePanelProps) {
  const [tradingConfig, setTradingConfig] = useState<TradingConfig>(initialConfig);
  const [signal, setSignal] = useState<Signal | null>(null);
  const [position, setPosition] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Binance连接状态和配置
  const [binanceConnected, setBinanceConnected] = useState<boolean>(false);
  const [binanceStatus, setBinanceStatus] = useState<string>('未连接');
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string>('');

  // Trading state
  const [isTradingActive, setIsTradingActive] = useState(false);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [connectionStage, setConnectionStage] = useState<'connecting' | 'authenticating' | 'connected' | 'error'>('connecting');
  const [connectionMessage, setConnectionMessage] = useState('');

  const handleConfigChange = (newConfig: TradingConfig) => {
    setTradingConfig(newConfig);
    if (onConfigChange) {
      onConfigChange(newConfig);
    }
  };

  // 开始/停止交易
  const toggleTrading = async () => {
    if (isTradingActive) {
      // 停止交易
      setIsTradingActive(false);
      setBinanceConnected(false);
      setBinanceStatus('已停止');
      setAutoRefresh(false);
      return;
    }

    // 开始交易 - 显示连接modal
    if (!apiKey || !apiSecret) {
      setConnectionError('请先配置API密钥');
      setShowApiConfig(true);
      return;
    }

    setShowConnectionModal(true);
    setConnectionStage('connecting');
    setConnectionMessage('正在连接到Binance期货服务器...');

    try {
      // Stage 1: Connecting
      await new Promise(resolve => setTimeout(resolve, 800));

      setConnectionStage('authenticating');
      setConnectionMessage('正在验证API密钥...');

      // Stage 2: Authenticating
      const response = await fetch('/api/trading/binance-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, apiSecret }),
      });

      const data = await response.json();

      if (response.ok && data.connected) {
        // Stage 3: Connected
        setConnectionStage('connected');
        setConnectionMessage(`连接成功！账户余额: $${data.balance?.toFixed(2) || '0.00'}`);
        setBinanceConnected(true);
        setBinanceStatus(`运行中 (余额: $${data.balance?.toFixed(2) || '0.00'})`);
        setConnectionError('');

        // Auto-close modal after 2 seconds and start trading
        await new Promise(resolve => setTimeout(resolve, 2000));
        setShowConnectionModal(false);
        setIsTradingActive(true);
        setAutoRefresh(true);
      } else {
        setConnectionStage('error');
        setConnectionMessage(data.error || '无法连接到Binance服务器，请检查API密钥');
        setBinanceConnected(false);
        setBinanceStatus('连接失败');
        setConnectionError(data.error || '连接失败');
      }
    } catch (err) {
      setConnectionStage('error');
      setConnectionMessage(err instanceof Error ? err.message : '网络错误，请检查网络连接');
      setBinanceConnected(false);
      setBinanceStatus('连接错误');
      setConnectionError(err instanceof Error ? err.message : '网络错误');
      console.error('Error connecting to Binance:', err);
    }
  };

  // Handle connection modal close
  const handleConnectionModalClose = () => {
    setShowConnectionModal(false);
    if (connectionStage === 'connected') {
      setIsTradingActive(true);
      setAutoRefresh(true);
    }
  };

  // 保存API配置
  const saveApiConfig = () => {
    localStorage.setItem('binance_api_key', apiKey);
    localStorage.setItem('binance_api_secret', apiSecret);
    setShowApiConfig(false);
  };

  // 加载保存的API配置
  useEffect(() => {
    const savedKey = localStorage.getItem('binance_api_key');
    const savedSecret = localStorage.getItem('binance_api_secret');
    if (savedKey) setApiKey(savedKey);
    if (savedSecret) setApiSecret(savedSecret);
  }, []);

  const fetchCurrentSignal = async () => {
    try {
      const response = await fetch(
        `/api/trading/live?symbol=${tradingConfig.symbol}&interval=${tradingConfig.interval}`
      );
      if (response.ok) {
        const data = await response.json();
        setSignal(data.signal);
      }
    } catch (err) {
      console.error('Error fetching signal:', err);
    }
  };

  const fetchPosition = async () => {
    try {
      const response = await fetch(`/api/trading/positions?symbol=${tradingConfig.symbol}`);
      if (response.ok) {
        const data = await response.json();
        setPosition(data.position);
        setBalance(data.balance);
      }
    } catch (err) {
      console.error('Error fetching position:', err);
    }
  };

  const executeSignal = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/trading/live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'execute_signal',
          tradingConfig,
          symbol: tradingConfig.symbol,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to execute signal');
      }

      const data = await response.json();
      alert(`交易执行成功!\n类型: ${data.signal.type}\n价格: $${data.signal.price}`);
      await fetchPosition();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const closePosition = async () => {
    if (!confirm('确定要平仓吗？')) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/trading/live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'close_position',
          symbol: tradingConfig.symbol,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to close position');
      }

      const data = await response.json();
      alert(data.message);
      await fetchPosition();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentSignal();
    fetchPosition();

    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchCurrentSignal();
        fetchPosition();
      }, 5000); // Refresh every 5 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh, tradingConfig]);

  return (
    <div className="space-y-6">
      {/* Strategy Config */}
      <CompactStrategyConfig
        config={tradingConfig}
        onConfigChange={handleConfigChange}
        showPresets={true}
      />

      {/* Binance Connection Status */}
      <div className={`p-6 border-2 ${
        binanceConnected
          ? 'bg-black border-green-600 dark:border-green-400'
          : isConnecting
          ? 'bg-black border-gray-300 dark:border-gray-700'
          : 'bg-black border-red-600 dark:border-red-400'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 ${
              binanceConnected
                ? 'bg-green-600 dark:bg-green-400'
                : isConnecting
                ? 'bg-gray-400'
                : 'bg-red-600 dark:bg-red-400'
            }`} />
            <div>
              <h3 className={`text-sm font-bold ${
                binanceConnected
                  ? 'text-green-600 dark:text-green-400'
                  : isConnecting
                  ? 'text-white'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                Binance 期货连接状态: {binanceStatus}
              </h3>
              {connectionError && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  {connectionError}
                </p>
              )}
              {!binanceConnected && !isConnecting && !connectionError && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  请配置Binance期货API密钥以启用实时交易功能
                </p>
              )}
              {isConnecting && (
                <p className="text-xs text-white mt-1">
                  正在测试连接，请稍候...
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleTrading}
              disabled={!apiKey || !apiSecret}
              className={`px-4 py-2 text-sm font-bold border-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isTradingActive
                  ? 'bg-red-600 dark:bg-red-500 text-white border-red-600 dark:border-red-500 hover:bg-red-700 dark:hover:bg-red-600'
                  : 'bg-black dark:bg-white text-white dark:text-black border-gray-800 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white'
              }`}
            >
              {isTradingActive ? '停止交易' : '开始交易'}
            </button>
            <button
              onClick={() => setShowApiConfig(!showApiConfig)}
              className="px-4 py-2 text-sm bg-black text-white font-bold border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors"
            >
              配置
            </button>
          </div>
        </div>

        {/* API Configuration Panel */}
        {showApiConfig && (
          <div className="mt-4 pt-4 border-t-2 border-gray-300 dark:border-gray-700">
            <h4 className="text-sm font-bold text-white mb-3">
              Binance 期货 API 配置
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  API Key
                </label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none font-mono"
                  placeholder="输入您的Binance API Key"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  API Secret
                </label>
                <input
                  type="password"
                  value={apiSecret}
                  onChange={(e) => setApiSecret(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-black text-white focus:border-black dark:focus:border-white outline-none font-mono"
                  placeholder="输入您的Binance API Secret"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={saveApiConfig}
                  className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-gray-800 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
                >
                  保存并测试连接
                </button>
                <button
                  onClick={() => setShowApiConfig(false)}
                  className="px-6 py-3 bg-black text-white font-bold border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors"
                >
                  取消
                </button>
              </div>
              <p className="text-xs text-gray-400">
                提示: API密钥将保存在浏览器本地存储中。请确保您的API密钥具有期货交易权限，且在Binance后台启用了期货功能。
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Live Trading Chart */}
      <div className="bg-[#0a0a0a] p-8 border-2 border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b-2 border-gray-800">
          实时行情图表
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          图表已加载以下策略指标：布林带(BB)、移动平均线(MA)、MACD、CCI、ATR
        </p>
        <LiveTradingChart
          symbol={tradingConfig.symbol}
          interval={tradingConfig.interval}
          config={tradingConfig}
        />
      </div>

      {/* Auto Refresh Toggle */}
      <div className="bg-[#0a0a0a] p-6 border-2 border-gray-800 flex items-center justify-between">
        <span className="text-sm font-bold text-white">
          自动刷新 (5秒)
        </span>
        <button
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={`relative inline-flex h-8 w-16 items-center border-2 ${
            autoRefresh
              ? 'bg-black dark:bg-white border-gray-800'
              : 'bg-black border-gray-300 dark:border-gray-700'
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform border-2 ${
              autoRefresh
                ? 'translate-x-8 bg-black border-white dark:border-black'
                : 'translate-x-0 bg-black dark:bg-white border-gray-800'
            }`}
          />
        </button>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black border-2 border-red-600 dark:border-red-400 p-4"
        >
          <p className="text-red-600 dark:text-red-400 font-bold">错误: {error}</p>
        </motion.div>
      )}

      {/* Current Signal */}
      <div className="bg-[#0a0a0a] p-8 border-2 border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b-2 border-gray-800">
          当前信号
        </h2>
        {signal ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className={`px-6 py-3 text-lg font-bold border-2 ${
                  signal.type === 'long'
                    ? 'bg-green-100 text-green-800 border-green-600 dark:bg-black dark:text-green-400 dark:border-green-400'
                    : signal.type === 'short'
                    ? 'bg-red-100 text-red-800 border-red-600 dark:bg-black dark:text-red-400 dark:border-red-400'
                    : 'bg-white text-black border-gray-300 dark:bg-black dark:text-white dark:border-gray-700'
                }`}>
                  {signal.type === 'long' && '做多'}
                  {signal.type === 'short' && '做空'}
                  {signal.type === 'none' && '无信号'}
                  {signal.type === 'close' && '平仓'}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">当前价格</p>
                <p className="text-2xl font-bold text-white">
                  ${signal.price.toFixed(2)}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              <span className="font-bold">原因:</span> {signal.reason}
            </p>

            {signal.indicators && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-4 border-t-2 border-gray-300 dark:border-gray-700">
                <div>
                  <p className="text-xs text-gray-400 font-bold">ATR</p>
                  <p className="text-sm font-bold text-white">
                    {signal.indicators.atr.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold">CCI</p>
                  <p className="text-sm font-bold text-white">
                    {signal.indicators.cci.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold">SuperTrend</p>
                  <p className={`text-sm font-bold ${
                    signal.indicators.supertrend.trend === 'up'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {signal.indicators.supertrend.trend === 'up' ? '上升' : '下降'}
                  </p>
                </div>
              </div>
            )}

            {signal.type !== 'none' && !position && (
              <button
                onClick={executeSignal}
                disabled={loading}
                className="w-full mt-4 px-6 py-4 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-gray-800 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '执行中...' : '执行交易'}
              </button>
            )}
          </div>
        ) : (
          <p className="text-gray-400">加载中...</p>
        )}
      </div>

      {/* Current Position */}
      <div className="bg-[#0a0a0a] p-8 border-2 border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b-2 border-gray-800">
          当前仓位
        </h2>
        {position ? (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-400 font-bold">持仓量</p>
                <p className="text-lg font-bold text-white">
                  {Math.abs(position.positionAmount).toFixed(3)} 手
                </p>
                <p className={`text-xs font-bold ${
                  position.positionAmount > 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {position.positionAmount > 0 ? '多头' : '空头'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold">入场价</p>
                <p className="text-lg font-bold text-white">
                  ${position.entryPrice.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold">未实现盈亏</p>
                <p className={`text-lg font-bold ${
                  position.unrealizedProfit >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {position.unrealizedProfit >= 0 ? '+' : ''}${position.unrealizedProfit.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={closePosition}
              disabled={loading}
              className="w-full px-6 py-4 bg-red-600 dark:bg-red-400 text-white dark:text-black font-bold border-2 border-red-600 dark:border-red-400 hover:bg-white hover:text-red-600 dark:hover:bg-black dark:hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '平仓中...' : '平仓'}
            </button>
          </div>
        ) : (
          <p className="text-gray-400">无持仓</p>
        )}
      </div>

      {/* Account Balance */}
      {balance && (
        <div className="bg-[#0a0a0a] p-8 border-2 border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b-2 border-gray-800">
            账户余额
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-400 font-bold">总余额</p>
              <p className="text-lg font-bold text-white">
                ${balance.totalBalance.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold">可用余额</p>
              <p className="text-lg font-bold text-white">
                ${balance.availableBalance.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold">未实现盈亏</p>
              <p className={`text-lg font-bold ${
                balance.totalUnrealizedProfit >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {balance.totalUnrealizedProfit >= 0 ? '+' : ''}${balance.totalUnrealizedProfit.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Live Trading Connection Modal */}
      <LiveTradingConnection
        isOpen={showConnectionModal}
        stage={connectionStage}
        message={connectionMessage}
        onClose={handleConnectionModalClose}
      />
    </div>
  );
}
