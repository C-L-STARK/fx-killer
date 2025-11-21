"use client";

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WelcomeModalTriggerProps {
  onOpen: () => void;
}

export default function WelcomeModalTrigger({ onOpen }: WelcomeModalTriggerProps) {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <button
      onClick={onOpen}
      className="fixed right-6 bottom-32 z-40 bg-gradient-to-br from-[#ff102a] to-black text-white p-3 border-2 border-[#ff102a] shadow-2xl hover:scale-110 transition-transform"
      aria-label={isZh ? '重看介绍视频' : 'Rewatch Intro Video'}
      title={isZh ? '重看介绍视频' : 'Rewatch Intro Video'}
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
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
}
