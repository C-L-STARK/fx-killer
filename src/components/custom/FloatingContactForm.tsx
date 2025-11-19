"use client";

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import UnifiedFormModal from './UnifiedFormModal';

export default function FloatingContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-6 bottom-20 z-40 bg-black dark:bg-white text-white dark:text-black p-3 border-2 border-black dark:border-white shadow-2xl hover:scale-110 transition-transform"
          aria-label={isZh ? '联系我们' : 'Contact Us'}
          title={isZh ? '快速联系我们' : 'Quick Contact'}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </button>
      )}

      {/* Form Modal */}
      <UnifiedFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        formType="contact"
      />
    </>
  );
}
