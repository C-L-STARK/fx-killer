'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FlashNews {
  id: string;
  content: string;
  time: string;
  detailUrl: string;
  relatedStocks: any[];
  isAutoTranslated: number;
  originLang: string;
}

export default function FlashNewsSidebar() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [news, setNews] = useState<FlashNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(30);

  // Fetch flash news from backend cache
  const fetchFlashNews = async () => {
    try {
      const lang = isZh ? 'zh' : 'en';
      const response = await fetch(`/api/news/flash?lang=${lang}`);
      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      if (data.success && data.news) {
        setNews(data.news.slice(0, 30)); // Keep all 30 items
        setError('');
        setCountdown(30); // Reset countdown
      }
    } catch (err) {
      console.error('Failed to fetch flash news:', err);
      setError(isZh ? '加载失败' : 'Load failed');
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount, when language changes, and auto-refresh every 30 seconds
  useEffect(() => {
    fetchFlashNews();
    const interval = setInterval(fetchFlashNews, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [language]);

  // Countdown timer - update every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 30; // Reset to 30 when reaching 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format timestamp to readable time
  const formatTime = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return isZh ? '刚刚' : 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}${isZh ? '分钟前' : 'm ago'}`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}${isZh ? '小时前' : 'h ago'}`;

    return date.toLocaleTimeString(isZh ? 'zh-CN' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 h-full flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-black dark:bg-white px-4 py-3 border-b-2 border-black dark:border-white z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-white dark:text-black">
            {isZh ? '实时快讯' : 'Flash News'}
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-white dark:text-black">
              {isZh ? '实时' : 'Live'}
            </span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center justify-center gap-2 pt-2 border-t border-white/20 dark:border-black/20">
          <span className="text-xs font-mono text-white dark:text-black">
            {isZh ? '下次刷新: ' : 'Next refresh: '}
            <span className="font-bold tabular-nums">{countdown}s</span>
          </span>
          {/* Progress Bar */}
          <div className="flex-1 h-1 bg-white/20 dark:bg-black/20 rounded-full overflow-hidden ml-2">
            <div
              className="h-full bg-white dark:bg-black transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 30) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-gray-500">
            {isZh ? '加载中...' : 'Loading...'}
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {news.map((item, index) => (
              <div
                key={item.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-200 dark:border-gray-700 last:border-b-2"
              >
                {/* Time and New Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTime(item.time)}
                  </span>
                  {index < 3 && (
                    <span className="text-xs px-2 py-0.5 bg-red-500 text-white font-bold">
                      {isZh ? '新' : 'NEW'}
                    </span>
                  )}
                </div>

                {/* Content */}
                <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
