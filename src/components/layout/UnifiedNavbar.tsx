"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import BrandName from '@/components/custom/BrandName';
import LocaleLink from '@/components/navigation/LocaleLink';

export default function UnifiedNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [switchingLanguage, setSwitchingLanguage] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    {
      name: t('nav.training'),
      link: "/splan/join-us",
    },
    {
      name: t('nav.propfirm'),
      link: "/propfirm",
    },
    {
      name: language === 'zh' ? '教育' : 'Education',
      link: "/education",
      hasDropdown: true,
      dropdownItems: [
        { name: language === 'zh' ? '基础知识' : 'Basics', link: '/education#basics' },
        { name: language === 'zh' ? '技术分析' : 'Technical Analysis', link: '/education#technical' },
        { name: language === 'zh' ? '交易策略' : 'Trading Strategies', link: '/education#strategies' },
        { name: language === 'zh' ? '风险管理' : 'Risk Management', link: '/education#risk' },
      ]
    },
    {
      name: language === 'zh' ? '新闻' : 'News',
      link: "/news",
    },
    {
      name: language === 'zh' ? '行情' : 'Market',
      link: "/market-analysis",
    },
    {
      name: t('nav.liveTrading'),
      link: "/live-trading",
    },
    {
      name: t('nav.blog'),
      link: "/splan/blog",
    },
    {
      name: t('nav.psychology'),
      link: "/splan/psychology-test",
    },
    {
      name: t('nav.dashboard'),
      link: "/dashboard",
    },
    {
      name: language === 'zh' ? '日历' : 'Calendar',
      link: "/economic-calendar",
    },
    {
      name: language === 'zh' ? '天梯' : 'Leaderboard',
      link: "/top-traders",
    },
    {
      name: t('nav.tradingTools'),
      link: "/tools/position-calculator",
      hasDropdown: true,
      dropdownItems: [
        { name: language === 'zh' ? '仓位计算器' : 'Position Calculator', link: '/tools/position-calculator' },
        { name: language === 'zh' ? '风险回报计算器' : 'Risk/Reward Calculator', link: '/tools/risk-reward-calculator' },
        { name: language === 'zh' ? '点值计算器' : 'Pip Calculator', link: '/tools/pip-calculator' },
      ]
    },
    {
      name: t('nav.faq'),
      link: "/splan/faq",
    },
    {
      name: t('nav.membership'),
      link: "/splan/donate",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50); // 滚动超过50px时显示导航栏
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 判断是否在首页
  const isHomePage = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    // 如果只有语言代码或者没有路径，说明是首页
    return pathSegments.length === 0 || (pathSegments.length === 1 && (pathSegments[0] === 'zh' || pathSegments[0] === 'en'));
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle language toggle with loading state
  const handleLanguageToggle = async () => {
    setSwitchingLanguage(true);
    try {
      await toggleLanguage();
      // Small delay to show loading animation
      await new Promise(resolve => setTimeout(resolve, 300));
    } finally {
      setSwitchingLanguage(false);
    }
  };

  const isActive = (link: string) => {
    // Extract path without locale prefix for comparison
    const pathSegments = pathname.split('/').filter(Boolean);
    const currentLocale = pathSegments[0] === 'en' || pathSegments[0] === 'zh' ? pathSegments[0] : 'zh';
    const pathWithoutLocale = '/' + pathSegments.slice(currentLocale === pathSegments[0] ? 1 : 0).join('/');

    if (link === '/') {
      return pathWithoutLocale === '/' || pathWithoutLocale === '';
    }
    return pathWithoutLocale.startsWith(link);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isHomePage() ? (scrolled ? 0 : -100) : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-white dark:bg-gray-900'
      } border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="max-w-[1400px] mx-auto px-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo - 靠左 */}
          <div className="flex items-center space-x-4">
            <LocaleLink href="/" className="flex items-center group">
              <span className="text-2xl"><BrandName inNavbar={true} /></span>
            </LocaleLink>

            {/* Desktop Navigation - 紧跟 Logo */}
            <div className="hidden md:flex items-center">
              {navItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => item.hasDropdown && setOpenDropdown(null)}
              >
                <LocaleLink
                  href={item.link}
                  className="relative px-2.5 py-2 text-sm font-medium transition-colors group flex items-center gap-1"
                >
                  <span
                    className={`relative z-10 ${
                      isActive(item.link)
                        ? 'text-black dark:text-white font-bold'
                        : 'text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white'
                    }`}
                  >
                    {item.name}
                  </span>
                  {item.hasDropdown && (
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      } ${
                        isActive(item.link)
                          ? 'text-black dark:text-white'
                          : 'text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  {isActive(item.link) && !item.hasDropdown && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </LocaleLink>

                {/* Dropdown Menu */}
                {item.hasDropdown && item.dropdownItems && (
                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg z-50"
                      >
                        {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                          <LocaleLink
                            key={dropdownIndex}
                            href={dropdownItem.link}
                            className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                          >
                            {dropdownItem.name}
                          </LocaleLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            </div>
          </div>

          {/* Right Side Actions (Desktop) - 靠右 */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={theme === 'light' ? (language === 'zh' ? '切换到深色模式' : 'Switch to Dark Mode') : (language === 'zh' ? '切换到浅色模式' : 'Switch to Light Mode')}
              aria-label={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? (
                // Moon icon
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                // Sun icon
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={handleLanguageToggle}
              disabled={switchingLanguage}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              title={language === 'zh' ? 'Switch to English' : '切换到中文'}
            >
              {switchingLanguage && (
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {language === 'zh' ? 'EN' : '中文'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                          isActive(item.link)
                            ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-bold'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span>{item.name}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === item.name ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openDropdown === item.name && item.dropdownItems && (
                        <div className="pl-4 mt-1 space-y-1">
                          {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                            <LocaleLink
                              key={dropdownIndex}
                              href={dropdownItem.link}
                              className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition-colors"
                            >
                              {dropdownItem.name}
                            </LocaleLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <LocaleLink
                      href={item.link}
                      className={`block px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(item.link)
                          ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-bold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.name}
                    </LocaleLink>
                  )}
                </div>
              ))}

              {/* Mobile Theme and Language Toggle */}
              <div className="px-4 pt-2 space-y-2">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  aria-label={theme === 'light' ? 'Dark mode' : 'Light mode'}
                >
                  {theme === 'light' ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      <span>{language === 'zh' ? '深色模式' : 'Dark Mode'}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span>{language === 'zh' ? '浅色模式' : 'Light Mode'}</span>
                    </>
                  )}
                </button>

                {/* Language Toggle */}
                <button
                  onClick={handleLanguageToggle}
                  disabled={switchingLanguage}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {switchingLanguage && (
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                  {language === 'zh' ? 'EN' : '中文'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
