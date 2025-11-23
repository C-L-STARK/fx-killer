"use client";
import { Code, Flex, Text } from "@radix-ui/themes";
import { LinkPreview } from "@/components/ui/link-preview";
import { SparklesCore } from "@/components/ui/sparkles";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EmailContactModal from '@/components/custom/EmailContactModal';
import BrandName from '@/components/custom/BrandName';
import BrandSlogans from '@/components/custom/BrandSlogans';
import { FadeInSlide, ScaleFadeIn, HoverCard, PulseButton, FloatingBadge, StaggeredFadeIn } from '@/components/custom/AnimatedSection';
import Testimonials from '@/components/custom/Testimonials';
import Image from 'next/image';
import StatsSection from '@/components/custom/StatsSection';
import InterviewCTA from '@/components/custom/InterviewCTA';
import PartnersLogos from '@/components/custom/PartnersLogos';
import { useLanguage } from '@/contexts/LanguageContext';
import ShineButton from '@/components/custom/ShineButton';
import { CosmicPortal } from '@/components/ui/cosmic-portal';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { HeroBackground } from '@/components/ui/hero-background';
import Hyperspeed, { hyperspeedPresets } from '@/components/effects/Hyperspeed';
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import DynamicUpdatesFeed from '@/components/custom/DynamicUpdatesFeed';

import { motion } from "motion/react";

// Decrypted Text Effect
const DecryptedText = ({ text, className }: { text: string, className?: string }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }: { end: number, duration?: number, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const DummyContent = () => {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  return (
    <div className="w-full -mt-16 bg-black text-white selection:bg-[#ff102a] selection:text-white font-sans overflow-hidden">

      {/* 1. HERO SECTION - LEFT/RIGHT LAYOUT */}
      <div className="relative overflow-hidden min-h-screen bg-black flex items-center">
        {/* Hero Background - Floating Lines */}
        <div className="absolute inset-0 w-full h-full z-0">
          <HeroBackground />
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}>
        </div>

        <div key={language} className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-12">
          {/* LEFT: Content */}
          <div className="flex flex-col space-y-8">
            <ScaleFadeIn delay={0.2}>
              <div className="inline-block px-4 py-1 border border-[#ff102a] text-[#ff102a] text-sm font-bold tracking-widest uppercase mb-4 bg-[#ff102a]/5 animate-border-flow">
                Elite Trader Program
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none mb-2">
                <BrandName inHero={false} />
              </h1>
              <div className="h-2 w-32 bg-[#ff102a] shadow-[0_0_20px_rgba(255,16,42,0.5)]"></div>
            </ScaleFadeIn>

            <FadeInSlide direction="right" delay={0.4}>
              <div className="text-2xl md:text-3xl text-gray-300 font-bold leading-tight space-y-2">
                {language === 'zh' ? (
                  <>
                    <p className="flex items-center gap-3">
                      <span className="text-[#ff102a]">►</span>
                      <DecryptedText text="精准 · 专业 · 高效" />
                    </p>
                    <p className="text-white">
                      <span className="bg-[#ff102a] text-white px-2 py-0.5">免费培养</span> 真正的外汇交易专家
                    </p>
                  </>
                ) : (
                  <>
                    <p className="flex items-center gap-3">
                      <span className="text-[#ff102a]">►</span>
                      <DecryptedText text="Precise · Professional · Efficient" />
                    </p>
                    <p className="text-white">
                      <span className="bg-[#ff102a] text-white px-2 py-0.5">Free Training</span> for True Forex Experts
                    </p>
                  </>
                )}
              </div>
            </FadeInSlide>

            <FadeInSlide direction="right" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <PulseButton className="w-full sm:w-auto">
                  <ShineButton
                    onClick={() => router.push(`/${language}/splan/join-us`)}
                    className="w-full sm:w-auto px-12 py-5 bg-[#ff102a] text-white text-xl font-black border border-[#ff102a] hover:bg-[#eb383e] hover:border-[#eb383e] transition-all animate-glow-pulse uppercase tracking-wider"
                  >
                    {t('hero.cta.learn')}
                  </ShineButton>
                </PulseButton>
                <button
                  onClick={() => router.push(`/${language}/dashboard`)}
                  className="w-full sm:w-auto px-12 py-5 bg-transparent text-white text-xl font-black border border-white/30 hover:bg-white hover:text-black transition-all uppercase tracking-wider backdrop-blur-sm hover:scale-105 duration-300"
                >
                  {t('hero.cta.dashboard')}
                </button>
              </div>
            </FadeInSlide>
          </div>

          {/* RIGHT: Logo Display */}
          <div className="hidden lg:flex items-center justify-center">
            <ScaleFadeIn delay={0.3}>
              <motion.div
                initial={{ rotate: 0, scale: 1 }}
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <Image
                  src="https://wlksiulicosdnerzhkdl.supabase.co/storage/v1/object/public/fxkiller/fxkiller.png"
                  alt="FX Killer Logo"
                  width={512}
                  height={512}
                  className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 drop-shadow-[0_0_50px_rgba(255,16,42,0.3)]"
                  priority
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#ff102a]/10 blur-3xl rounded-full -z-10 animate-pulse"></div>
              </motion.div>
            </ScaleFadeIn>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-2 animate-bounce">
          <div className="text-xs text-gray-500 uppercase tracking-widest">Scroll to Explore</div>
          <svg className="w-6 h-6 text-[#ff102a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* SECTION DIVIDER */}
      <div className="relative py-1 bg-gradient-to-r from-transparent via-[#ff102a] to-transparent opacity-50"></div>

      {/* 2. COMPARISON TABLE */}
      <div className="relative py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
              {language === 'zh' ? '全方位对比' : 'Comprehensive Comparison'}
            </h2>
            <div className="w-24 h-1 bg-[#ff102a] mx-auto mb-6"></div>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              {language === 'zh' ? '汇刃 vs 市场上的其他选择，一目了然的优势对比' : 'FX Killer vs Other Market Options - Clear Advantages at a Glance'}
            </p>
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-black/80">
                    <th className="px-2 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {language === 'zh' ? '对比项目' : 'Comparison'}
                    </th>
                    <th className="px-2 py-4 text-center text-xs font-bold uppercase tracking-wider border-l-2 border-[#ff102a] bg-[#ff102a]/5">
                      <span className="text-[#ff102a] text-sm">
                        {language === 'zh' ? '汇刃' : 'FX Killer'}
                      </span>
                    </th>
                    <th className="px-2 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider border-l border-white/10">
                      {language === 'zh' ? '自营机构' : 'Prop Firms'}
                    </th>
                    <th className="px-2 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider border-l border-white/10">
                      {language === 'zh' ? '传统机构' : 'Traditional'}
                    </th>
                    <th className="px-2 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider border-l border-white/10">
                      {language === 'zh' ? '卖指标' : 'Indicator'}
                    </th>
                    <th className="px-2 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider border-l border-white/10">
                      {language === 'zh' ? '个人工作室' : 'Personal Studio'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1: Training Cost */}
                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-2 py-5 text-white font-medium text-sm text-center">
                      {language === 'zh' ? '培训费用' : 'Training Cost'}
                    </td>
                    <td className="px-2 py-5 text-center border-l-2 border-[#ff102a] bg-[#ff102a]/5">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xl font-black text-[#ff102a]">
                          {language === 'zh' ? '完全免费' : '100% FREE'}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {language === 'zh' ? '无学费' : 'No Tuition'}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-5 text-center border-l border-white/10">
                      <span className="text-sm text-gray-400">{language === 'zh' ? '考核费' : 'Challenge Fee'}</span>
                    </td>
                    <td className="px-2 py-5 text-center border-l border-white/10">
                      <span className="text-sm text-gray-400 line-through">{language === 'zh' ? '高额学费' : 'Expensive'}</span>
                    </td>
                    <td className="px-2 py-5 text-center border-l border-white/10">
                      <span className="text-sm text-gray-400">{language === 'zh' ? '购买费' : 'Purchase Fee'}</span>
                    </td>
                    <td className="px-2 py-5 text-center border-l border-white/10">
                      <span className="text-sm text-gray-400">{language === 'zh' ? '加盟费' : 'Franchise Fee'}</span>
                    </td>
                  </motion.tr>

                  {/* Row 2: Training Model */}
                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    viewport={{ once: true }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-2 py-5 text-white font-medium text-sm text-center">
                      {language === 'zh' ? '培养模式' : 'Training Model'}
                    </td>
                    <td className="px-2 py-5 text-center border-l-2 border-[#ff102a] bg-[#ff102a]/5">
                      <span className="text-base font-semibold text-[#ff102a]">
                        {language === 'zh' ? '小团队孵化' : 'Team Incubation'}
                      </span>
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '无培训' : 'No Training'}
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '大班课' : 'Large Class'}
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '无指导' : 'None'}
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '师徒制' : 'Mentorship'}
                    </td>
                  </motion.tr>

                  {/* Row 3: Community Support */}
                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-2 py-5 text-white font-medium text-sm text-center">
                      {language === 'zh' ? '社群支持' : 'Community'}
                    </td>
                    <td className="px-2 py-5 text-center border-l-2 border-[#ff102a] bg-[#ff102a]/5">
                      <span className="text-base font-semibold text-[#ff102a]">24/7</span>
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '论坛' : 'Forum'}
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '有限时段' : 'Limited'}
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-500 border-l border-white/10">N/A</td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '小群组' : 'Small Group'}
                    </td>
                  </motion.tr>

                  {/* Row 4: Profit Share */}
                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    viewport={{ once: true }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-2 py-5 text-white font-medium text-sm text-center">
                      {language === 'zh' ? '利润分成' : 'Profit Share'}
                    </td>
                    <td className="px-2 py-5 text-center border-l-2 border-[#ff102a] bg-[#ff102a]/5">
                      <span className="text-lg font-bold text-[#ff102a]">60-90%</span>
                    </td>
                    <td className="px-2 py-5 text-center border-l border-white/10">
                      <span className="text-base font-bold text-gray-300">60-90%</span>
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-500 border-l border-white/10">N/A</td>
                    <td className="px-2 py-5 text-center text-sm text-gray-500 border-l border-white/10">N/A</td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '按协议' : 'By Agreement'}
                    </td>
                  </motion.tr>

                  {/* Row 5: Real Capital Scale */}
                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-2 py-5 text-white font-medium text-sm text-center">
                      {language === 'zh' ? '资金规模' : 'Capital'}
                    </td>
                    <td className="px-2 py-5 text-center border-l-2 border-[#ff102a] bg-[#ff102a]/5">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-sm font-bold text-[#ff102a]">$100K-$2M</span>
                        <span className="text-xl text-green-500">✓</span>
                      </div>
                    </td>
                    <td className="px-2 py-5 text-center border-l border-white/10">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-xs font-bold text-gray-300">$10K-$200K</span>
                        <span className="text-lg text-green-500">✓</span>
                      </div>
                    </td>
                    <td className="px-2 py-5 text-center text-red-500 text-xl border-l border-white/10">✗</td>
                    <td className="px-2 py-5 text-center text-red-500 text-xl border-l border-white/10">✗</td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '看情况' : 'Varies'}
                    </td>
                  </motion.tr>

                  {/* Row 6: Training Duration */}
                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    viewport={{ once: true }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-2 py-5 text-white font-medium text-sm text-center">
                      {language === 'zh' ? '培养周期' : 'Duration'}
                    </td>
                    <td className="px-2 py-5 text-center border-l-2 border-[#ff102a] bg-[#ff102a]/5">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-base font-semibold text-[#ff102a]">
                          {language === 'zh' ? '30-60天' : '30-60 Days'}
                        </span>
                        <span className="text-[10px] text-gray-400">{language === 'zh' ? '5阶段' : '5 Stages'}</span>
                      </div>
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '1-3月' : '1-3 Mon'}
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '6-12月' : '6-12 Mon'}
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-500 border-l border-white/10">N/A</td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '不确定' : 'Uncertain'}
                    </td>
                  </motion.tr>

                  {/* Row 7: Assessment Standards */}
                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-2 py-5 text-white font-medium text-sm text-center">
                      {language === 'zh' ? '考核标准' : 'Assessment'}
                    </td>
                    <td className="px-2 py-5 text-center border-l-2 border-[#ff102a] bg-[#ff102a]/5">
                      <span className="text-base font-semibold text-[#ff102a]">
                        {language === 'zh' ? '稳定盈利' : 'Consistent'}
                      </span>
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '严格规则' : 'Strict'}
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '模糊' : 'Vague'}
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-500 border-l border-white/10">N/A</td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '自定义' : 'Custom'}
                    </td>
                  </motion.tr>

                  {/* Row 8: Live Trading Experience */}
                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 }}
                    viewport={{ once: true }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-2 py-5 text-white font-medium text-sm text-center">
                      {language === 'zh' ? '实盘经验' : 'Live Trading'}
                    </td>
                    <td className="px-2 py-5 text-center border-l-2 border-[#ff102a] bg-[#ff102a]/5">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-xl text-green-500">✓</span>
                        <span className="text-[10px] text-gray-400">{language === 'zh' ? '100%实战' : '100%'}</span>
                      </div>
                    </td>
                    <td className="px-2 py-5 text-center border-l border-white/10">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-lg text-yellow-500">△</span>
                        <span className="text-[10px] text-gray-400">{language === 'zh' ? '规则多' : 'Rules'}</span>
                      </div>
                    </td>
                    <td className="px-2 py-5 text-center text-yellow-500 text-lg border-l border-white/10">△</td>
                    <td className="px-2 py-5 text-center text-red-500 text-xl border-l border-white/10">✗</td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '看水平' : 'Varies'}
                    </td>
                  </motion.tr>

                  {/* Row 9: Income Potential */}
                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-2 py-5 text-white font-medium text-sm text-center">
                      {language === 'zh' ? '收入潜力' : 'Income'}
                    </td>
                    <td className="px-2 py-5 text-center border-l-2 border-[#ff102a] bg-[#ff102a]/5">
                      <span className="text-base font-semibold text-[#ff102a]">
                        {language === 'zh' ? '无上限' : 'Unlimited'}
                      </span>
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '有上限' : 'Limited'}
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '有限' : 'Limited'}
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '靠运气' : 'Luck-Based'}
                    </td>
                    <td className="px-2 py-5 text-center text-sm text-gray-400 border-l border-white/10">
                      {language === 'zh' ? '不稳定' : 'Unstable'}
                    </td>
                  </motion.tr>
                </tbody>
              </table>
            </div>
          </motion.div>

        </div>
      </div>



      {/* 4. THE PATH - CAREER ROADMAP */}
      <div className="relative py-24 bg-[#020202] overflow-hidden border-y border-white/5">
        <style jsx global>{`
          @keyframes flow-x {
            0% { background-position: 100% 0; }
            100% { background-position: -100% 0; }
          }
          @keyframes flow-y {
            0% { background-position: 0 100%; }
            100% { background-position: 0 -100%; }
          }
          @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .animate-flow-x {
            background-size: 200% 100%;
            animation: flow-x 3s linear infinite;
          }
          .animate-flow-y {
            background-size: 100% 200%;
            animation: flow-y 3s linear infinite;
          }
          .animate-scan {
            animation: scan 4s ease-in-out infinite;
          }
        `}</style>

        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#ff102a]/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
              {language === 'zh' ? '职业晋升之路' : 'Career Roadmap'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#ff102a] to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              {language === 'zh' ? '从新手到顶级交易员的完整培养体系' : 'Complete Training System from Beginner to Elite Trader'}
            </p>
          </div>

          {/* SNAKE GRID LAYOUT (Desktop: 3x3, Mobile: Vertical) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-y-20 relative">

            {/* Connecting Lines (Desktop Only) - FLOWING ANIMATION */}
            <div className="hidden md:block absolute inset-0 pointer-events-none">
              {/* Row 1 Horizontal (L -> R) */}
              <div className="absolute top-[15%] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-[#ff102a]/10 via-[#ff102a] to-[#ff102a]/10 animate-flow-x"></div>
              {/* Row 2 Horizontal (R -> L) */}
              <div className="absolute top-[50%] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-purple-600/10 via-purple-600 to-purple-600/10 animate-flow-x" style={{ animationDirection: 'reverse' }}></div>
              {/* Row 3 Horizontal (L -> R) */}
              <div className="absolute bottom-[15%] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-600/10 via-blue-600 to-blue-600/10 animate-flow-x"></div>

              {/* Vertical Connectors */}
              {/* 3 -> 4 (Right Side) */}
              <div className="absolute top-[15%] right-[16.5%] bottom-[50%] w-0.5 bg-gradient-to-b from-[#ff102a] via-purple-600 to-purple-600 animate-flow-y"></div>
              {/* 6 -> 7 (Left Side) */}
              <div className="absolute top-[50%] left-[16.5%] bottom-[15%] w-0.5 bg-gradient-to-b from-purple-600 via-blue-600 to-blue-600 animate-flow-y"></div>
            </div>

            {/* STAGE 1: 3 Days */}
            <div className="md:col-start-1 md:row-start-1 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#ff102a] to-transparent opacity-20 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-[#0a0a0a] border border-white/10 p-6 h-full hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                {/* Scan Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff102a]/10 to-transparent animate-scan opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-10 h-10 bg-[#ff102a]/10 flex items-center justify-center border border-[#ff102a]/30 text-[#ff102a] font-black">01</div>
                  <div className="text-xs font-bold text-gray-500 uppercase border border-white/10 px-2 py-1">{language === 'zh' ? '3天' : '3 Days'}</div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2 relative z-10">{language === 'zh' ? '规则学习' : 'Rules Learning'}</h3>
                <p className="text-gray-400 text-xs leading-relaxed relative z-10">
                  {language === 'zh' ? '姿势标准化，军事化管理，基础规则掌握' : 'Standardized posture, military discipline, basic rules.'}
                </p>
              </div>
            </div>

            {/* STAGE 2: 15 Days */}
            <div className="md:col-start-2 md:row-start-1 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#ff102a] to-transparent opacity-20 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-[#0a0a0a] border border-white/10 p-6 h-full hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff102a]/10 to-transparent animate-scan opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-10 h-10 bg-[#ff102a]/10 flex items-center justify-center border border-[#ff102a]/30 text-[#ff102a] font-black">02</div>
                  <div className="text-xs font-bold text-gray-500 uppercase border border-white/10 px-2 py-1">{language === 'zh' ? '15天' : '15 Days'}</div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2 relative z-10">{language === 'zh' ? '盈利练习' : 'Profit Practice'}</h3>
                <p className="text-gray-400 text-xs leading-relaxed relative z-10">
                  {language === 'zh' ? '心态稳定训练，灵动性强化，领悟力提升' : 'Mental stability, flexibility enhancement, comprehension.'}
                </p>
              </div>
            </div>

            {/* STAGE 3: 10 Days (Assessment) */}
            <div className="md:col-start-3 md:row-start-1 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-500 to-transparent opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-[#0a0a0a] border border-yellow-500/30 p-6 h-full hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/10 to-transparent animate-scan opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-10 h-10 bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30 text-yellow-500 font-black">03</div>
                  <div className="text-xs font-bold text-yellow-500 uppercase border border-yellow-500/30 px-2 py-1">{language === 'zh' ? '10天' : '10 Days'}</div>
                </div>
                <h3 className="text-yellow-500 font-bold text-lg mb-2 relative z-10">{language === 'zh' ? '盈利考核' : 'Assessment'}</h3>
                <p className="text-gray-400 text-xs leading-relaxed relative z-10">
                  {language === 'zh' ? '不漏单，不错单，不亏损。严格考核。' : 'No missed trades, no wrong trades, no losses.'}
                </p>
              </div>
            </div>

            {/* STAGE 4: 20 Days (Live Trading) */}
            <div className="md:col-start-3 md:row-start-2 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#ff102a] to-transparent opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-[#0a0a0a] border border-[#ff102a]/30 p-6 h-full hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff102a]/10 to-transparent animate-scan opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-10 h-10 bg-[#ff102a]/10 flex items-center justify-center border border-[#ff102a]/30 text-[#ff102a] font-black">04</div>
                  <div className="text-xs font-bold text-[#ff102a] uppercase border border-[#ff102a]/30 px-2 py-1">{language === 'zh' ? '20天' : '20 Days'}</div>
                </div>
                <h3 className="text-[#ff102a] font-bold text-lg mb-2 relative z-10">{language === 'zh' ? '小额实盘' : 'Live Trading'}</h3>
                <p className="text-gray-400 text-xs leading-relaxed relative z-10">
                  {language === 'zh' ? '日回撤≤5%，总回撤≤10%，系统固化。' : 'Daily DD ≤5%, Total DD ≤10%, system solidification.'}
                </p>
              </div>
            </div>

            {/* STAGE 5: CAPITAL MATRIX (CENTER HUB) */}
            <div className="md:col-start-2 md:row-start-2 relative group z-20">
              {/* Dynamic Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ff102a] via-purple-600 to-[#ff102a] opacity-50 group-hover:opacity-100 transition duration-500 animate-flow-x"></div>

              <div className="relative bg-black border-2 border-[#ff102a] p-8 h-full transform scale-105 shadow-[0_0_50px_rgba(255,16,42,0.2)]">
                {/* Background Tech Grid */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#ff102a 1px, transparent 1px), linear-gradient(90deg, #ff102a 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff102a] text-white px-4 py-1 text-xs font-bold uppercase tracking-wider shadow-lg whitespace-nowrap z-20">
                  {language === 'zh' ? '生涯开启' : 'Career Begins'}
                </div>

                <div className="text-center mb-4 mt-2 relative z-10">
                  <div className="w-16 h-16 bg-[#ff102a] flex items-center justify-center text-white font-black text-3xl mx-auto mb-4 shadow-[0_0_20px_rgba(255,16,42,0.5)] animate-pulse">05</div>
                  <h3 className="text-2xl font-black text-white uppercase">{language === 'zh' ? '大额矩阵' : 'Capital Matrix'}</h3>
                  <p className="text-[#ff102a] font-mono text-sm mt-1">{language === 'zh' ? '无限扩展' : 'Unlimited Scaling'}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center relative z-10">
                  <div className="bg-white/5 p-2 border border-white/10 hover:bg-white/10 transition">
                    <div className="text-[10px] text-gray-500 uppercase">{language === 'zh' ? '资金' : 'Capital'}</div>
                    <div className="text-white font-bold text-sm">$2M+</div>
                  </div>
                  <div className="bg-white/5 p-2 border border-white/10 hover:bg-white/10 transition">
                    <div className="text-[10px] text-gray-500 uppercase">{language === 'zh' ? '分成' : 'Share'}</div>
                    <div className="text-[#ff102a] font-bold text-sm">60% - 90%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* STAGE 6: 3 Months */}
            <div className="md:col-start-1 md:row-start-2 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-600 to-transparent opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-[#0a0a0a] border border-purple-600/30 p-6 h-full hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/10 to-transparent animate-scan opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-10 h-10 bg-purple-600/10 flex items-center justify-center border border-purple-600/30 text-purple-500 font-black">06</div>
                  <div className="text-xs font-bold text-purple-500 uppercase border border-purple-600/30 px-2 py-1">{language === 'zh' ? '3个月' : '3 Months'}</div>
                </div>
                <h3 className="text-purple-500 font-bold text-lg mb-2 relative z-10">{language === 'zh' ? '5分钟级别' : '5-Min Level'}</h3>
                <p className="text-gray-400 text-xs leading-relaxed relative z-10">
                  {language === 'zh' ? '单向交易，级别升级。' : 'One-directional trading, level up.'}
                </p>
              </div>
            </div>

            {/* STAGE 7: 6 Months */}
            <div className="md:col-start-1 md:row-start-3 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-600 to-transparent opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-[#0a0a0a] border border-blue-600/30 p-6 h-full hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/10 to-transparent animate-scan opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-10 h-10 bg-blue-600/10 flex items-center justify-center border border-blue-600/30 text-blue-500 font-black">07</div>
                  <div className="text-xs font-bold text-blue-500 uppercase border border-blue-600/30 px-2 py-1">{language === 'zh' ? '6个月' : '6 Months'}</div>
                </div>
                <h3 className="text-blue-500 font-bold text-lg mb-2 relative z-10">{language === 'zh' ? '15分钟级别' : '15-Min Level'}</h3>
                <p className="text-gray-400 text-xs leading-relaxed relative z-10">
                  {language === 'zh' ? '多空双向交易。' : 'Bi-directional trading.'}
                </p>
              </div>
            </div>

            {/* STAGE 8: 1 Year */}
            <div className="md:col-start-2 md:row-start-3 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500 to-transparent opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-[#0a0a0a] border border-cyan-500/30 p-6 h-full hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-10 h-10 bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 text-cyan-400 font-black">08</div>
                  <div className="text-xs font-bold text-cyan-400 uppercase border border-cyan-500/30 px-2 py-1">{language === 'zh' ? '1年' : '1 Year'}</div>
                </div>
                <h3 className="text-cyan-400 font-bold text-lg mb-2 relative z-10">{language === 'zh' ? '1小时级别' : '1-Hour Level'}</h3>
                <p className="text-gray-400 text-xs leading-relaxed relative z-10">
                  {language === 'zh' ? '多空双向交易，技术大成。' : 'Bi-directional trading, mastery.'}
                </p>
              </div>
            </div>

            {/* STAGE 9: 2 Years */}
            <div className="md:col-start-3 md:row-start-3 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500 to-transparent opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-[#0a0a0a] border border-green-500/30 p-6 h-full hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent animate-scan opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-10 h-10 bg-green-500/10 flex items-center justify-center border border-green-500/30 text-green-400 font-black">09</div>
                  <div className="text-xs font-bold text-green-400 uppercase border border-green-500/30 px-2 py-1">{language === 'zh' ? '2年' : '2 Years'}</div>
                </div>
                <h3 className="text-green-400 font-bold text-lg mb-2 relative z-10">{language === 'zh' ? '4H/日级别' : '4H/Daily Level'}</h3>
                <p className="text-gray-400 text-xs leading-relaxed relative z-10">
                  {language === 'zh' ? '顶级交易员，财富自由。' : 'Elite trader status, financial freedom.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 5. THE REQUIREMENTS - TRADER DNA PROTOCOL */}


      {/* SECTION DIVIDER */}
      <div className="relative py-1 bg-gradient-to-r from-transparent via-[#ff102a] to-transparent opacity-50"></div>

      {/* 6. TESTIMONIALS WITH PROFIT IMAGES */}
      <div className="relative py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <Testimonials />
        </div>
      </div>

      {/* SECTION DIVIDER */}
      <div className="relative py-1 bg-gradient-to-r from-transparent via-[#ff102a] to-transparent opacity-50"></div>

      {/* 7. PARTNERS LOGOS */}
      <PartnersLogos />

      {/* SECTION DIVIDER */}
      <div className="relative py-1 bg-gradient-to-r from-transparent via-[#ff102a] to-transparent opacity-50"></div>

      {/* 8. FINAL CTA WITH STATS - PREMIUM DESIGN */}
      <div className="relative w-full bg-black py-40 overflow-hidden flex flex-col items-center justify-center min-h-[700px]">
        {/* Animated Spotlight Effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-black rounded-[100%] blur-[120px] animate-spotlight"></div>
          <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[50%] h-[300px] bg-[#ff102a]/30 rounded-[100%] blur-[100px] animate-spotlight" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-[-100px] left-1/4 w-[30%] h-[200px] bg-purple-900/20 rounded-[100%] blur-[80px] animate-spotlight" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="inline-block px-6 py-2 border border-[#ff102a] text-[#ff102a] text-sm font-bold tracking-widest uppercase mb-8 bg-[#ff102a]/5 animate-border-flow">
              {language === 'zh' ? '立即开启交易员职业生涯' : 'Start Your Trading Career Now'}
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-500 tracking-tighter mb-8 leading-tight"
          >
            {t('cta.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed font-mono mb-12"
          >
            {t('cta.subtitle')}
          </motion.p>

          {/* Key Features Highlights - NEW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
          >
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                textZh: '完全免费培训',
                textEn: 'Fully Free Training'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                textZh: '30天系统学习',
                textEn: '30-Day System'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                textZh: '通过即获资金',
                textEn: 'Pass & Get Funded'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                textZh: '60-90%高分成',
                textEn: '60-90% Profit Share'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-black/40 border border-white/10 p-6 hover:border-[#ff102a] hover:bg-black/60 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-[#ff102a]/10 border border-[#ff102a]/30 flex items-center justify-center text-[#ff102a] group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div className="text-sm font-bold text-white uppercase tracking-wider leading-tight">
                    {language === 'zh' ? feature.textZh : feature.textEn}
                  </div>
                </div>
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-[#ff102a]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="group relative px-16 py-6 bg-[#ff102a] text-white text-xl font-black uppercase tracking-widest overflow-hidden transition-all hover:scale-105 duration-300 border-2 border-[#ff102a]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center gap-3">
                {t('cta.button.interview')}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 shadow-[0_0_40px_rgba(255,16,42,0.6)] group-hover:shadow-[0_0_60px_rgba(255,16,42,0.8)] transition-shadow"></div>
            </button>

            <button
              onClick={() => router.push(`/${language}/splan/psychology-test`)}
              className="px-12 py-6 bg-transparent text-white text-xl font-black uppercase tracking-widest border-2 border-white/30 hover:bg-white hover:text-black transition-all hover:scale-105 duration-300"
            >
              {language === 'zh' ? '立即心理测试' : 'Psychology Test'}
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-8 text-sm text-gray-600 font-mono uppercase tracking-widest"
          >
            {t('cta.button.note')}
          </motion.p>

          {/* MINIMALIST STATS DISPLAY - ALL 8 STATS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="text-2xl font-black text-white mb-1"><AnimatedCounter end={2500} suffix="+" /></div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider leading-tight">{language === 'zh' ? '已培训学员' : 'Students Trained'}</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="text-2xl font-black text-white mb-1"><AnimatedCounter end={12} suffix="%" /></div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider leading-tight">{language === 'zh' ? '通过率' : 'Pass Rate'}</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="text-2xl font-black text-white mb-1"><AnimatedCounter end={30} /></div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider leading-tight">{language === 'zh' ? '平均培训周期（天）' : 'Avg Training (Days)'}</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="text-2xl font-black text-white mb-1">$<AnimatedCounter end={50} suffix="K+" /></div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider leading-tight">{language === 'zh' ? '最高月收益' : 'Max Monthly Profit'}</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="text-2xl font-black text-white mb-1"><AnimatedCounter end={2} /></div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider leading-tight">{language === 'zh' ? '合作经纪商' : 'Partner Brokers'}</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="text-2xl font-black text-white mb-1"><AnimatedCounter end={2} /></div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider leading-tight">{language === 'zh' ? '自营交易公司' : 'Prop Firms'}</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="text-2xl font-black text-white mb-1">60-90%</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider leading-tight">{language === 'zh' ? '分成比例' : 'Profit Share'}</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="text-2xl font-black text-white mb-1"><AnimatedCounter end={45} /></div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider leading-tight">{language === 'zh' ? '试用期（天）' : 'Trial Period (Days)'}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* STATS SECTION - MOVED TO FOOTER */}

      </div>

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title="职业交易员面试"
      />
    </div >
  );
};

import DonateSection from '@/components/custom/DonateSection';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full">
      <DummyContent />
      <DonateSection />
    </div>
  );
}

