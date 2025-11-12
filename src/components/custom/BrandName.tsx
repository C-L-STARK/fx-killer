"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BrandNameProps {
  inNavbar?: boolean; // 是否在导航栏中使用
}

export default function BrandName({ inNavbar = false }: BrandNameProps) {
  const { language } = useLanguage();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // 标记动画已播放，避免切换语言时重复播放
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const text = language === 'zh' ? '汇刃' : 'FXKiller';
  const chars = text.split('');

  return (
    <>
      {chars.map((char, index) => {
        const isSecondPart = language === 'zh' ? index >= 1 : index >= 2;

        return (
          <motion.span
            key={`${language}-${index}`}
            className={inNavbar
              ? (isSecondPart ? 'font-normal text-gray-600 dark:text-gray-400' : 'font-black text-black dark:text-white')
              : (isSecondPart ? 'font-normal text-gray-400' : 'font-black text-white')
            }
            initial={hasAnimated ? false : {
              x: (index % 2 === 0 ? -1 : 1) * 150,
              y: (index % 3 === 0 ? -1 : 1) * 80,
              opacity: 0,
              rotate: (index % 2 === 0 ? -1 : 1) * 45,
              scale: 0.5,
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 12,
              delay: hasAnimated ? 0 : index * 0.08,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </>
  );
}
