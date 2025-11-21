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
    <div className="bg-[#ff102a] border-2 border-[#ff102a] h-full flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-[#ff102a] px-4 py-3 border-b-2 border-white/20 z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-white">
            {isZh ? '实时快讯' : 'Flash News'}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider animate-pulse">
              {isZh ? 'LIVE' : 'LIVE'}
            </span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center justify-center gap-2 pt-2 border-t border-white/20">
          <span className="text-xs font-mono text-white">
            {isZh ? '下次刷新: ' : 'Next refresh: '}
            <span className="font-bold tabular-nums">{countdown}s</span>
          </span>
          {/* Progress Bar */}
          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden ml-2">
            <div
              className="h-full bg-white transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 30) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-white">
            {isZh ? '加载中...' : 'Loading...'}
          </div>
        ) : error ? (
          <div className="p-4 text-center text-white">{error}</div>
        ) : (
          <div className="divide-y divide-white/10">
            {news.map((item, index) => (
              <div
                key={item.id}
                className="p-4 hover:bg-red-600 transition-colors border-b border-white/10 last:border-b-2"
              >
                {/* Time and New Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/70">
                    {formatTime(item.time)}
                  </span>
                  {index < 3 && (
                    <span className="text-xs px-2 py-0.5 bg-white text-[#ff102a] font-bold">
                      {isZh ? '新' : 'NEW'}
                    </span>
                  )}
                </div>

                {/* Content */}
                <p className="text-sm text-white leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add breathing animation keyframes */}
      <style jsx>{`
        @keyframes breathing {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: breathing 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
