"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface BrandNameProps {
  inNavbar?: boolean; // 是否在导航栏中使用
  inHero?: boolean; // 是否在 Hero 中使用（黑色背景）
}

export default function BrandName({ inNavbar = false, inHero = false }: BrandNameProps) {
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
    <span className="flex items-center gap-4">
      {inHero && (
        <motion.div
          initial={hasAnimated ? false : { scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 12,
            delay: hasAnimated ? 0 : 0.3,
          }}
        >
          <Image
            src="/fxkiller-128px.png"
            alt="FX Killer Logo"
            width={80}
            height={80}
            className="w-16 h-16 md:w-20 md:h-20"
          />
        </motion.div>
      )}
      <span className="inline-flex">
        {chars.map((char, index) => {
          const isSecondPart = language === 'zh' ? index >= 1 : index >= 2;

          // 根据使用场景决定颜色
          let colorClass;
          if (inHero) {
            // Hero 中始终是白色（因为背景是黑色）
            colorClass = isSecondPart ? 'font-normal text-gray-400' : 'font-black text-white';
          } else if (inNavbar) {
            // 导航栏中根据主题切换
            colorClass = isSecondPart ? 'font-normal text-gray-600 dark:text-gray-400' : 'font-black text-black dark:text-white';
          } else {
            // 其他地方（如 Dashboard 登录页）根据主题切换
            colorClass = isSecondPart ? 'font-normal text-gray-600 dark:text-gray-400' : 'font-black text-black dark:text-white';
          }

          return (
            <motion.span
              key={`${language}-${index}`}
              className={colorClass}
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
      </span>
    </span>
  );
}
