"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export default function BrandName() {
  const { language } = useLanguage();

  if (language === 'zh') {
    return (
      <>
        <span className="font-black">汇</span>
        <span className="font-normal text-gray-600 dark:text-gray-400">刃</span>
      </>
    );
  }

  return (
    <>
      <span className="font-black">FX</span>
      <span className="font-normal text-gray-600 dark:text-gray-400">Killer</span>
    </>
  );
}
