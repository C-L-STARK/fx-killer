"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

interface StatItem {
  id: string;
  value: string;
  label: {
    zh: string;
    en: string;
  };
  icon: React.ReactNode;
  suffix?: string;
}

const stats: StatItem[] = [
  {
    id: 'students',
    value: '500',
    suffix: '+',
    label: {
      zh: '已培训学员',
      en: 'Students Trained'
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: 'passRate',
    value: '12',
    suffix: '%',
    label: {
      zh: '通过率',
      en: 'Pass Rate'
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'avgCycle',
    value: '30',
    suffix: '',
    label: {
      zh: '平均培训周期（天）',
      en: 'Avg Training (Days)'
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'maxProfit',
    value: '50K',
    suffix: '+',
    label: {
      zh: '最高月收益',
      en: 'Max Monthly Profit'
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    id: 'brokers',
    value: '2',
    suffix: '',
    label: {
      zh: '合作经纪商',
      en: 'Partner Brokers'
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'propFirms',
    value: '2',
    suffix: '',
    label: {
      zh: '自营交易公司',
      en: 'Prop Firms'
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    id: 'profitShare',
    value: '60-90',
    suffix: '%',
    label: {
      zh: '分成比例',
      en: 'Profit Share'
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'trainingDays',
    value: '45',
    suffix: '',
    label: {
      zh: '试用期（天）',
      en: 'Trial Period (Days)'
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

// 数字动画 Hook
function useCountUp(end: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
}

export default function StatsSection() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => setIsVisible(true)}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#ff102a]">
            {language === 'zh' ? '平台数据' : 'Platform Statistics'}
          </h2>
          <p className="text-[#dadafa] max-w-2xl mx-auto">
            {language === 'zh'
              ? '真实数据展示我们的培训成果和合作网络'
              : 'Real data showcasing our training results and partnership network'}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={index}
              language={language}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index, language, isVisible }: { stat: StatItem; index: number; language: string; isVisible: boolean }) {
  // 处理数字动画
  const getNumericValue = (value: string) => {
    const match = value.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const numericValue = getNumericValue(stat.value);
  const animatedValue = useCountUp(numericValue, 2000, isVisible);

  // 格式化显示值
  const formatValue = (value: string, animatedNum: number) => {
    if (value.includes('-')) {
      return value; // 范围值不做动画
    }
    if (value.includes('K')) {
      return `${animatedNum}K`;
    }
    return animatedNum.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-[#0a0a0a] border-2 border-[#dadafa]/30 p-6 hover:border-[#ff102a] transition-colors group"
    >
      {/* Icon */}
      <div className="text-[#dadafa] mb-4 group-hover:scale-110 group-hover:text-[#ff102a] transition-all">
        {stat.icon}
      </div>

      {/* Value */}
      <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
        {formatValue(stat.value, animatedValue)}
        {stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
      </div>

      {/* Label */}
      <div className="text-sm text-[#b0b0b0] font-medium">
        {language === 'zh' ? stat.label.zh : stat.label.en}
      </div>
    </motion.div>
  );
}
