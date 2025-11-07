"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CalendlyWidget() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 动态加载 Calendly 脚本
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // 清理：移除脚本和样式
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

  const openCalendly = () => {
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/x-stark-dylan/5min?hide_event_type_details=1&hide_gdpr_banner=1'
      });
    }
  };

  return (
    <button
      onClick={openCalendly}
      className="fixed right-8 bottom-56 z-40 bg-gradient-to-r from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white text-white dark:text-black p-4 border-2 border-black dark:border-white shadow-2xl hover:scale-110 transition-transform"
      aria-label={language === 'zh' ? '预约咨询' : 'Schedule Appointment'}
      title={language === 'zh' ? '预约咨询' : 'Schedule Appointment'}
    >
      {/* 日历图标 */}
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </button>
  );
}
