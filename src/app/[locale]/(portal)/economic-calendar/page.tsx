"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { EconomicEvent, EventImportance } from '@/types/economic-calendar';
import { motion } from 'motion/react';

export default function EconomicCalendarPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const [events, setEvents] = useState<EconomicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedImportance, setSelectedImportance] = useState<EventImportance | 'all'>('all');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('all');

  // Fetch data from API
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const response = await fetch('/api/economic-calendar');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError(isZh ? '加载失败，请稍后重试' : 'Failed to load data');
        console.error('Error fetching calendar:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [isZh]);

  // Get unique currencies
  const currencies = useMemo(() => {
    return Array.from(new Set(events.map(e => e.currency)));
  }, [events]);

  // Get unique dates
  const dates = useMemo(() => {
    const uniqueDates = Array.from(new Set(events.map(e => e.date)));
    return uniqueDates.sort();
  }, [events]);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const dateMatch = event.date === selectedDate;
      const importanceMatch = selectedImportance === 'all' || event.importance === selectedImportance;
      const currencyMatch = selectedCurrency === 'all' || event.currency === selectedCurrency;
      return dateMatch && importanceMatch && currencyMatch;
    });
  }, [events, selectedDate, selectedImportance, selectedCurrency]);

  const getImportanceColor = (importance: EventImportance) => {
    switch (importance) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-yellow-500';
    }
  };

  const getImportanceText = (importance: EventImportance) => {
    if (isZh) {
      switch (importance) {
        case 'high': return '高';
        case 'medium': return '中';
        case 'low': return '低';
      }
    }
    return importance.charAt(0).toUpperCase() + importance.slice(1);
  };

  // Set initial date to first available date
  useEffect(() => {
    if (dates.length > 0 && !dates.includes(selectedDate)) {
      setSelectedDate(dates[0]);
    }
  }, [dates, selectedDate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white border-b-2 border-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider">
              {isZh ? '实时市场数据' : 'Real-Time Market Data'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="font-black">
              {isZh ? '经济日历' : 'Economic Calendar'}
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '追踪全球重要经济事件，把握市场波动机会'
              : 'Track global economic events and seize market opportunities'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Date Selector */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              {isZh ? '选择日期' : 'Select Date'}
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {dates.map((date) => {
                const dateObj = new Date(date);
                const eventsCount = events.filter(e => e.date === date).length;
                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`px-4 py-2 text-sm font-semibold border-2 whitespace-nowrap transition-colors ${
                      selectedDate === date
                        ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                        : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white'
                    }`}
                  >
                    <div>
                      {dateObj.toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    {eventsCount > 0 && (
                      <div className="text-xs opacity-70">{eventsCount} {isZh ? '事件' : 'events'}</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Importance & Currency Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Importance Filter */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                {isZh ? '重要性' : 'Importance'}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedImportance('all')}
                  className={`px-4 py-2 text-sm font-semibold border-2 transition-colors ${
                    selectedImportance === 'all'
                      ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                      : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                  }`}
                >
                  {isZh ? '全部' : 'All'}
                </button>
                {(['high', 'medium', 'low'] as EventImportance[]).map((imp) => (
                  <button
                    key={imp}
                    onClick={() => setSelectedImportance(imp)}
                    className={`px-4 py-2 text-sm font-semibold border-2 transition-colors ${
                      selectedImportance === imp
                        ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                        : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getImportanceColor(imp)}`}></span>
                    {getImportanceText(imp)}
                  </button>
                ))}
              </div>
            </div>

            {/* Currency Filter */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                {isZh ? '货币' : 'Currency'}
              </h3>
              <div className="flex gap-2 overflow-x-auto">
                <button
                  onClick={() => setSelectedCurrency('all')}
                  className={`px-4 py-2 text-sm font-semibold border-2 whitespace-nowrap transition-colors ${
                    selectedCurrency === 'all'
                      ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                      : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                  }`}
                >
                  {isZh ? '全部' : 'All'}
                </button>
                {currencies.map((cur) => (
                  <button
                    key={cur}
                    onClick={() => setSelectedCurrency(cur)}
                    className={`px-4 py-2 text-sm font-semibold border-2 whitespace-nowrap transition-colors ${
                      selectedCurrency === cur
                        ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                        : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block w-8 h-8 border-4 border-gray-300 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                {isZh ? '加载中...' : 'Loading...'}
              </p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                {isZh ? '暂无事件数据' : 'No events found'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-black dark:bg-white text-white dark:text-black border-b-2 border-gray-200 dark:border-gray-800">
                    <th className="px-4 py-3 text-left font-bold text-sm">
                      {isZh ? '时间' : 'Time'}
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-sm">
                      {isZh ? '货币' : 'Cur'}
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-sm">
                      {isZh ? '事件' : 'Event'}
                    </th>
                    <th className="px-4 py-3 text-center font-bold text-sm">
                      {isZh ? '重要性' : 'Imp'}
                    </th>
                    <th className="px-4 py-3 text-right font-bold text-sm">
                      {isZh ? '实际' : 'Actual'}
                    </th>
                    <th className="px-4 py-3 text-right font-bold text-sm">
                      {isZh ? '预测' : 'Forecast'}
                    </th>
                    <th className="px-4 py-3 text-right font-bold text-sm">
                      {isZh ? '前值' : 'Previous'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event, index) => (
                    <motion.tr
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {event.time}
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-xs font-bold">
                          {event.currency}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {event.event}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {event.country}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-block w-3 h-3 rounded-full ${getImportanceColor(event.importance)}`}></span>
                      </td>
                      <td className="px-4 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">
                        {event.actual || '-'}
                      </td>
                      <td className="px-4 py-4 text-right text-sm text-gray-600 dark:text-gray-400">
                        {event.forecast || '-'}
                      </td>
                      <td className="px-4 py-4 text-right text-sm text-gray-600 dark:text-gray-400">
                        {event.previous || '-'}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
            {isZh ? '重要性说明' : 'Importance Legend'}
          </h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
              <span className="text-gray-700 dark:text-gray-300">
                {isZh ? '高 - 重大市场影响' : 'High - Major market impact'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-orange-500"></span>
              <span className="text-gray-700 dark:text-gray-300">
                {isZh ? '中 - 中等市场影响' : 'Medium - Moderate market impact'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="text-gray-700 dark:text-gray-300">
                {isZh ? '低 - 较小市场影响' : 'Low - Minor market impact'}
              </span>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>{isZh ? '数据来源：' : 'Data Source:'}</strong>
            {isZh
              ? ' 本周经济日历数据来自 Forex Factory，每小时更新一次。'
              : ' This week\'s economic calendar data from Forex Factory, updated hourly.'}
          </p>
        </div>
      </div>
    </div>
  );
}
