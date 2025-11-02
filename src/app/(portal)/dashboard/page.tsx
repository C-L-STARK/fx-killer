"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import BacktestPanel from './components/BacktestPanel';
import LiveTradePanel from './components/LiveTradePanel';
import StrategyConfig from './components/StrategyConfig';
import TiantiPanel from './components/TiantiPanel';
import AdminLogin from './components/AdminLogin';
import { useLanguage } from '@/contexts/LanguageContext';
import BrandName from '@/components/custom/BrandName';
import type { TradingConfig } from '@/lib/trading/types';

const defaultConfig: TradingConfig = {
  symbol: 'XAUUSDT',
  interval: '1m',
  strategy: {
    aggressiveness: 2,
    trailingActivation: 0.8,
    trailingDistance: 1.0,
    indicators: {
      keltner: {
        maPeriod: 15,
        atrPeriod: 10,
        atrMultiple: 0.5,
      },
      bollinger: {
        period: 15,
        deviation: 1.0,
      },
      macd: {
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9,
      },
      cci: {
        period: 20,
      },
      supertrend: {
        period: 10,
        multiplier: 3.0,
      },
    },
  },
  risk: {
    maxDailyLoss: 500, // 5% of $10,000 initial capital
    maxDrawdown: 0.10, // 10% total drawdown
    maxPositions: 1,
    positionSize: 0.3,
    stopLossMultiple: 1.5,
    takeProfitLevels: [1.5, 2.5, 4.0],
  },
};

export default function TradingDashboard() {
  const [tradingConfig, setTradingConfig] = useState<TradingConfig>(defaultConfig);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user is already authenticated (use localStorage for persistent login)
    const authenticated = localStorage.getItem('dashboard_authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }

    // Load saved trading config from localStorage
    const savedConfig = localStorage.getItem('trading_config');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setTradingConfig(parsedConfig);
      } catch (error) {
        console.error('Failed to load saved config:', error);
      }
    }
  }, []);

  // Save config to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('trading_config', JSON.stringify(tradingConfig));
  }, [tradingConfig]);

  const handleLogout = () => {
    localStorage.removeItem('dashboard_authenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              <BrandName /> {t('dashboard.title')}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('dashboard.subtitle')}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            {t('dashboard.logout')}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="backtest" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="backtest">
              {t('dashboard.tab.backtest')}
            </TabsTrigger>
            <TabsTrigger value="live">
              {t('dashboard.tab.live')}
            </TabsTrigger>
            <TabsTrigger value="tianti">
              {t('dashboard.tab.tianti')}
            </TabsTrigger>
            <TabsTrigger value="config">
              {t('dashboard.tab.config')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="backtest" className="space-y-6">
            <BacktestPanel tradingConfig={tradingConfig} />
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            <LiveTradePanel tradingConfig={tradingConfig} />
          </TabsContent>

          <TabsContent value="tianti" className="space-y-6">
            <TiantiPanel />
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <StrategyConfig
              config={tradingConfig}
              onConfigChange={setTradingConfig}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="font-semibold text-gray-900 dark:text-white">{t('dashboard.footer.warning')}</p>
          <p className="mt-1">{t('dashboard.footer.copyright')}</p>
        </div>
      </div>
    </div>
  );
}
