"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function TiantiPanel() {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [countdown, setCountdown] = useState(60);

  const imageUrl = 'https://qingwuwei.github.io/tianti/images/tianti.png';

  // Auto refresh logic
  useEffect(() => {
    if (!autoRefresh) {
      setCountdown(60);
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setRefreshKey((k) => k + 1);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleManualRefresh = () => {
    setRefreshKey((k) => k + 1);
    setCountdown(60);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-[#0a0a0a] p-8 border-2 border-gray-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 pb-3 border-b-2 border-gray-800">
              天梯趋势指示器
            </h2>
            <p className="text-sm text-gray-400 mt-3">
              实时量化趋势分析数据
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Auto Refresh Toggle */}
            <label className="flex items-center gap-3 cursor-pointer bg-black px-4 py-3 border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-5 h-5 border-2 border-gray-300 dark:border-gray-700 focus:ring-0"
              />
              <span className="text-sm font-bold text-white">
                自动刷新
              </span>
            </label>

            {/* Manual Refresh Button */}
            <button
              onClick={handleManualRefresh}
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-gray-800 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
            >
              手动刷新
            </button>

            {/* Countdown Display */}
            {autoRefresh && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-6 py-3 bg-black border-2 border-gray-300 dark:border-gray-700 text-white font-mono font-bold"
              >
                {countdown}s
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Image Display */}
      <div className="bg-[#0a0a0a] p-8 border-2 border-gray-800">
        <div className="relative w-full overflow-auto">
          <img
            key={refreshKey}
            src={`${imageUrl}?t=${refreshKey}`}
            alt="天梯趋势指示器"
            className="w-full h-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="800" height="600" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%239ca3af"%3E加载失败%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        <div className="mt-6 text-center text-sm text-gray-400 pt-6 border-t-2 border-gray-300 dark:border-gray-700">
          <span className="font-bold">最后刷新时间:</span> {new Date().toLocaleTimeString('zh-CN')}
        </div>
      </div>
    </div>
  );
}
