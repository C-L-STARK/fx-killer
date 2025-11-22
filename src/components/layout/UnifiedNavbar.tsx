"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
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
      name: language === 'zh' ? '主页' : 'Home',
      link: "/",
    },
    {
      name: t('nav.training'),
      link: "/splan/join-us",
    },
    {
      name: t('nav.dna'),
      link: "/dna",
    },
    {
      name: t('nav.propfirm'),
      link: "/propfirm",
    },

    {
      name: t('nav.liveTrading'),
      link: "/live-trading",
    },
    {
      name: t('nav.psychology'),
      link: "/splan/psychology-test",
    },
    {
      name: language === 'zh' ? '天梯' : 'Leaderboard',
      link: "/top-traders",
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
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black ${scrolled
        ? 'shadow-lg border-b border-white/10'
        : 'border-b border-white/5'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              {navItems.map((item, index) => (
                <LocaleLink
                  key={index}
                  href={item.link}
                  className="relative px-2.5 py-2 text-sm font-medium transition-colors group"
                >
                  <span
                    className={`relative z-10 ${isActive(item.link)
                      ? 'text-white font-bold'
                      : 'text-gray-400 group-hover:text-white'
                      }`}
                  >
                    {item.name}
                  </span>
                  {isActive(item.link) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </LocaleLink>
              ))}
            </div>
          </div>

          {/* Right Side Actions (Desktop) - 靠右 */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={handleLanguageToggle}
              disabled={switchingLanguage}
              className="px-3 py-2 border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="md:hidden p-2 border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
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
            className="md:hidden border-t border-white/10 bg-black"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <LocaleLink
                  key={index}
                  href={item.link}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${isActive(item.link)
                    ? 'bg-white/10 text-white font-bold'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  {item.name}
                </LocaleLink>
              ))}

              {/* Mobile Language Toggle */}
              <div className="px-4 pt-2 space-y-2">
                <button
                  onClick={handleLanguageToggle}
                  disabled={switchingLanguage}
                  className="w-full px-4 py-3 border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
