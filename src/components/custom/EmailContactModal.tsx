"use client";

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmailContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function EmailContactModal({ isOpen, onClose, title }: EmailContactModalProps) {
  const { t } = useLanguage();
  const emailAddress = "x.stark.dylan@gmail.com";

  const displayTitle = title || t('email.default.title');
  const emailSubject = t('email.subject');

  const handleSendEmail = () => {
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    alert(t('email.copied'));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-900 max-w-md w-full p-6 border-2 border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{displayTitle}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              {t('email.description')}
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('email.address.label')}</p>
              <div className="flex items-center justify-between gap-2">
                <code className="text-black dark:text-white font-mono text-sm flex-1">
                  {emailAddress}
                </code>
                <button
                  onClick={handleCopyEmail}
                  className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 text-sm font-semibold whitespace-nowrap"
                >
                  {t('email.copy')}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('email.subject.label')}</p>
              <code className="text-gray-900 dark:text-white font-mono text-sm">
                {emailSubject}
              </code>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <strong>{t('email.tip')}</strong>{t('email.tip.text')}
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSendEmail}
                className="flex-1 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
              >
                {t('email.send')}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                {t('email.close')}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
