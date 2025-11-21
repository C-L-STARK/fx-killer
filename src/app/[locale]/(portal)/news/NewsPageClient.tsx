'use client';

import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LocaleLink from '@/components/navigation/LocaleLink';
import FlashNewsSidebar from '@/components/news/FlashNewsSidebar';
import PremiumCTA from '@/components/custom/PremiumCTA';
import EmailContactModal from '@/components/custom/EmailContactModal';

interface NewsItem {
  slug: string;
  title: string;
  date: string;
  description: string;
  source: string;
  category: string;
  keywords: string[];
}

interface NewsPageClientProps {
  initialNews: NewsItem[];
}

export default function NewsPageClient({ initialNews }: NewsPageClientProps) {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const itemsPerPage = 12;

  // 获取所有月份
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    initialNews.forEach(item => {
      const date = new Date(item.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months.add(monthKey);
    });
    return Array.from(months).sort().reverse();
  }, [initialNews]);

  // 获取所有tags
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    initialNews.forEach(item => {
      item.keywords?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [initialNews]);

  // 设置默认月份为当前月份
  useEffect(() => {
    if (availableMonths.length > 0 && !selectedMonth) {
      setSelectedMonth(availableMonths[0]);
    }
  }, [availableMonths, selectedMonth]);

  // 筛选新闻
  const filteredNews = useMemo(() => {
    return initialNews.filter(item => {
      const date = new Date(item.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      const monthMatch = !selectedMonth || selectedMonth === 'all' || monthKey === selectedMonth;
      const tagMatch = selectedTag === 'all' || item.keywords?.includes(selectedTag);

      return monthMatch && tagMatch;
    });
  }, [initialNews, selectedMonth, selectedTag]);

  // 重置筛选条件时回到第一页
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, selectedTag]);

  // 分页计算
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredNews.slice(startIndex, endIndex);
  }, [filteredNews, currentPage, itemsPerPage]);

  // 生成页码数组
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const showEllipsisThreshold = 7;

    if (totalPages <= showEllipsisThreshold) {
      // 页数少，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 页数多，显示省略号
      if (currentPage <= 3) {
        // 当前在前面
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 当前在后面
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        // 当前在中间
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  }, [totalPages, currentPage]);

  // 最近10条新闻用于侧边栏
  const recentNews = useMemo(() => {
    return initialNews.slice(0, 10);
  }, [initialNews]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Hero Section */}
      <div className="relative bg-black text-white border-b-2 border-[#ff102a] overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff102a] blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff102a] blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-[#ff102a]/10 border border-[#ff102a] backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider text-[#ff102a]">
              {isZh ? '实时财经资讯' : 'Real-Time Financial News'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="font-black">
              {isZh ? '外汇新闻' : 'Forex News'}
            </span>
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '每日更新全球外汇市场最新动态，助您把握交易机会'
              : 'Daily updates on global forex market news to help you seize trading opportunities'}
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-black border-b-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Month Filter */}
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-400 mb-2">
                {isZh ? '按月份筛选' : 'Filter by Month'}
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-2 bg-black border-2 border-gray-800 text-white font-semibold focus:outline-none focus:border-[#ff102a] transition-colors"
              >
                <option value="all">{isZh ? '所有月份' : 'All Months'}</option>
                {availableMonths.map(month => {
                  const [year, monthNum] = month.split('-');
                  const date = new Date(parseInt(year), parseInt(monthNum) - 1);
                  const monthName = date.toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
                    year: 'numeric',
                    month: 'long'
                  });
                  return (
                    <option key={month} value={month}>
                      {monthName}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Tag Filter */}
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-400 mb-2">
                {isZh ? '按标签筛选' : 'Filter by Tag'}
              </label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-4 py-2 bg-black border-2 border-gray-800 text-white font-semibold focus:outline-none focus:border-[#ff102a] transition-colors"
              >
                <option value="all">{isZh ? '所有标签' : 'All Tags'}</option>
                {availableTags.map(tag => (
                  <option key={tag} value={tag}>
                    #{tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm text-gray-400">
              {isZh ? '找到' : 'Found'} <span className="font-bold text-white">{filteredNews.length}</span> {isZh ? '篇文章' : 'articles'}
              {totalPages > 1 && (
                <>
                  {' · '}
                  {isZh ? `第 ${currentPage} / ${totalPages} 页` : `Page ${currentPage} of ${totalPages}`}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* News List with Flash News Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredNews.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-black border-2 border-gray-800">
              <p className="text-gray-400 text-lg">
                {isZh ? '没有找到符合条件的新闻' : 'No news found matching the filters'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar: Flash News - Only show on large screens */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-20 h-[calc(100vh-6rem)]">
                <FlashNewsSidebar />
              </div>
            </div>

            {/* Center: Main News List */}
            <div className="lg:col-span-2">
              <div className="grid gap-6">
                {paginatedNews.map((item) => (
                  <div
                    key={item.slug}
                    className="bg-black border border-gray-800 p-6 hover:border-[#ff102a] transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff102a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="flex items-center gap-4 mb-3 flex-wrap relative z-10">
                      <span className="px-3 py-1 bg-[#ff102a] text-white text-xs font-bold">
                        {item.source}
                      </span>
                      <span className="text-sm text-gray-400">
                        {new Date(item.date).toLocaleString(isZh ? 'zh-CN' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    <LocaleLink href={`/news/${item.slug}`}>
                      <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-[#ff102a] transition-colors relative z-10">
                        {item.title}
                      </h2>
                    </LocaleLink>

                    <p className="text-gray-400 mb-4 line-clamp-3 relative z-10">
                      {item.description}
                    </p>

                    {/* Tags */}
                    {item.keywords && item.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                        {item.keywords.slice(0, 4).map(tag => (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className="px-2 py-1 bg-black text-gray-400 text-xs hover:bg-[#0a0a0a] hover:text-white transition-colors border border-gray-800"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 relative z-10">
                      <LocaleLink
                        href={`/news/${item.slug}`}
                        className="text-sm font-bold text-[#ff102a] flex items-center gap-2 group-hover:tracking-wider transition-all"
                      >
                        {isZh ? '阅读原文' : 'Read More'}
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </LocaleLink>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-black border-2 border-gray-800 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#ff102a] transition-colors"
                    >
                      {isZh ? '上一页' : 'Previous'}
                    </button>

                    {/* Page Numbers */}
                    {pageNumbers.map((page, index) => (
                      page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page as number)}
                          className={`px-4 py-2 border-2 font-semibold transition-colors ${currentPage === page
                            ? 'bg-[#ff102a] text-white border-[#ff102a]'
                            : 'bg-black border-gray-800 text-white hover:border-[#ff102a]'
                            }`}
                        >
                          {page}
                        </button>
                      )
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-black border-2 border-gray-800 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#ff102a] transition-colors"
                    >
                      {isZh ? '下一页' : 'Next'}
                    </button>
                  </div>

                  {/* Page Info */}
                  <div className="text-sm text-gray-500">
                    {isZh
                      ? `显示第 ${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, filteredNews.length)} 条，共 ${filteredNews.length} 条`
                      : `Showing ${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, filteredNews.length)} of ${filteredNews.length} articles`
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Archive & Recent News */}
            <aside className="lg:col-span-1 shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Archive Links */}
                <div className="bg-black border border-gray-800 p-6">
                  <h3 className="text-lg font-bold text-white mb-4 pb-3 border-b border-gray-800">
                    {isZh ? '归档' : 'Archives'}
                  </h3>
                  <div className="space-y-3">
                    <LocaleLink
                      href="/news/archive"
                      className="block px-4 py-3 bg-black text-gray-300 font-semibold hover:bg-[#0a0a0a] hover:text-[#ff102a] transition-colors border border-gray-800 hover:border-[#ff102a]/30"
                    >
                      📅 {isZh ? '按月份归档' : 'By Month'}
                    </LocaleLink>
                    <LocaleLink
                      href="/news/tags"
                      className="block px-4 py-3 bg-black text-gray-300 font-semibold hover:bg-[#0a0a0a] hover:text-[#ff102a] transition-colors border border-gray-800 hover:border-[#ff102a]/30"
                    >
                      🏷️ {isZh ? '按标签归档' : 'By Tags'}
                    </LocaleLink>
                  </div>
                </div>

                {/* Recent News */}
                <div className="bg-black border border-gray-800 p-6">
                  <h3 className="text-lg font-bold text-white mb-4 pb-3 border-b border-gray-800">
                    {isZh ? '最新新闻' : 'Recent News'}
                  </h3>
                  <ul className="space-y-3">
                    {recentNews.map((item) => (
                      <li key={item.slug}>
                        <LocaleLink
                          href={`/news/${item.slug}`}
                          className="block group"
                        >
                          <div className="text-sm font-semibold text-gray-300 group-hover:text-[#ff102a] line-clamp-2 mb-1 transition-colors">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(item.date).toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </LocaleLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

          </div>
        )}
      </div>

      {/* Premium CTA */}
      <PremiumCTA
        badge={{ zh: '实时资讯', en: 'Real-Time News' }}
        title={{
          zh: '掌握市场，精准交易',
          en: 'Master Markets, Trade Precisely'
        }}
        subtitle={{
          zh: '每日更新全球外汇市场资讯。加入我们的培训计划，成为职业交易员。',
          en: 'Daily updates on global forex market news. Join our training program to become a professional trader.'
        }}
        primaryButton={{
          text: { zh: '预约面试', en: 'Schedule Interview' },
          action: 'modal'
        }}
        secondaryButton={{
          text: { zh: '查看教育中心', en: 'Education Center' },
          action: 'link',
          link: `/${language}/education`
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
