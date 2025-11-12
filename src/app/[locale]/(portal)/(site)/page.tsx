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
import StatsSection from '@/components/custom/StatsSection';
import InterviewCTA from '@/components/custom/InterviewCTA';
import PartnersLogos from '@/components/custom/PartnersLogos';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import ShineButton from '@/components/custom/ShineButton';
import { CosmicPortal } from '@/components/ui/cosmic-portal';
import { NeuralBackground } from '@/components/ui/neural-background';

const DummyContent = () => {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 收益图片列表 (1-15)
  const profitImages = [
    '/profits/1.png',
    '/profits/2.png',
    '/profits/3.png',
    '/profits/4.png',
    '/profits/5.png',
    '/profits/6.png',
    '/profits/7.png',
    '/profits/8.png',
    '/profits/9.png',
    '/profits/10.png',
    '/profits/11.png',
    '/profits/12.jpg',
    '/profits/13.png',
    '/profits/14.png',
    '/profits/15.png',
  ];

  // 自动滚动图片 - 每次显示3张
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const nextIndex = prev + 3;
        // 如果超出范围，回到开头
        return nextIndex >= profitImages.length ? 0 : nextIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [profitImages.length]);

  return (
    <div className="w-full">
      {/* Neural Background - Full Page - Always Dark */}
      <div className="fixed inset-0 w-full h-full -z-10 bg-black">
        <NeuralBackground
          hue={200}
          saturation={0.5}
          chroma={0.4}
          isDark={true}
        />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden h-screen">
        {/* Content Overlay - Centered in viewport */}
        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl flex flex-col space-y-10">
            {/* Main Title */}
            <ScaleFadeIn delay={0.2}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tight leading-none">
                <BrandName />
              </h1>
            </ScaleFadeIn>

            {/* Subtitle */}
            <FadeInSlide direction="right" delay={0.4}>
              <div className="text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight space-y-2">
                {language === 'zh' ? (
                  <>
                    <p>精准、专业、高效</p>
                    <p>
                      <span className="inline-block bg-white text-black px-3 py-1 animate-pulse">免费培养</span>真正的外汇交易专家
                    </p>
                  </>
                ) : (
                  <>
                    <p>Precise, Professional, Efficient</p>
                    <p>
                      <span className="inline-block bg-white text-black px-3 py-1 animate-pulse whitespace-nowrap">Free Training</span>{' '}
                      for True Forex Trading&nbsp;Experts
                    </p>
                  </>
                )}
              </div>
            </FadeInSlide>

            {/* CTAs */}
            <FadeInSlide direction="right" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-6">
                <PulseButton>
                  <ShineButton
                    onClick={() => router.push(`/${language}/splan/join-us`)}
                    className="px-12 py-6 bg-white text-black text-xl font-black border-2 border-white hover:bg-black hover:text-white transition-all shadow-lg"
                  >
                    {t('hero.cta.learn')}
                  </ShineButton>
                </PulseButton>
                <button
                  onClick={() => router.push(`/${language}/dashboard`)}
                  className="px-12 py-6 bg-white dark:bg-black text-black dark:text-white text-xl font-black border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                >
                  {t('hero.cta.dashboard')}
                </button>
              </div>
            </FadeInSlide>
            </div>
          </div>
        </div>
      </div>

      {/* 为什么选择 FX Killer - 增强版 */}
      <div className="relative bg-white w-full">
        <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-black">
            {t('why.title')}
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            {t('why.subtitle')}
          </p>
        </div>

        {/* 核心优势 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FadeInSlide direction="up" delay={0.1}>
            <HoverCard className="h-full">
              <div className="p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 h-full hover:border-black dark:hover:border-white transition-colors">
                <div className="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
                  <span className="text-2xl text-white dark:text-black font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{t('advantage.selection.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('advantage.selection.desc')}
                </p>
              </div>
            </HoverCard>
          </FadeInSlide>

          <FadeInSlide direction="up" delay={0.2}>
            <HoverCard className="h-full">
              <div className="p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 h-full hover:border-black dark:hover:border-white transition-colors">
                <div className="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
                  <span className="text-2xl text-white dark:text-black font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{t('advantage.growth.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('advantage.growth.desc')}
                </p>
              </div>
            </HoverCard>
          </FadeInSlide>

          <FadeInSlide direction="up" delay={0.3}>
            <HoverCard className="h-full">
              <div className="p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 h-full hover:border-black dark:hover:border-white transition-colors">
                <div className="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
                  <span className="text-2xl text-white dark:text-black font-bold">3</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{t('advantage.commission.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('advantage.commission.desc')}
                </p>
              </div>
            </HoverCard>
          </FadeInSlide>
        </div>

        {/* 与传统培训对比 */}
        <div className="bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-black dark:text-white">
            <span className="bg-black dark:bg-white text-white dark:text-black px-4 py-2">{t('comparison.vs')}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FX Killer */}
            <div className="bg-white dark:bg-gray-800 p-6 border-l-4 border-black dark:border-white">
              <h4 className="text-xl font-bold mb-4 text-black dark:text-white flex items-center gap-2">
                <span className="text-2xl"></span> {t('comparison.fxkiller')}
              </h4>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span>{t('comparison.free')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span>{t('comparison.practical')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span>{t('comparison.selection')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span>{t('comparison.funding')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span>{t('comparison.share')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span>{t('comparison.career')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black dark:text-white font-bold">•</span>
                  <span>{t('comparison.discipline')}</span>
                </li>
              </ul>
            </div>

            {/* 传统培训 */}
            <div className="bg-gray-100 dark:bg-gray-700 p-6 border-l-4 border-gray-400">
              <h4 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <span className="text-2xl"></span> {t('comparison.traditional')}
              </h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('comparison.highfee')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('comparison.theory')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('comparison.acceptall')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('comparison.selffunded')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('comparison.nosupport')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('comparison.noplan')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('comparison.loose')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-black dark:bg-gray-950 text-white p-6 text-center">
            <p className="text-lg font-semibold">
              {t('comparison.emphasis')}
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* 职业发展路径 - 全新设计 */}
      <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-20 border-y-2 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-black dark:text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">
            {t('career.title')}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 text-lg">
            {t('career.subtitle')}
          </p>

          {/* 发展阶梯 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {/* 阶段 1 */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-black dark:bg-white border-2 border-black dark:border-white flex items-center justify-center">
                  <span className="text-white dark:text-black font-black text-2xl">1</span>
                </div>
                <div className="mt-4">
                  <div className="inline-block px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold mb-3">
                    {t('career.stage1.days')}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{t('career.stage1.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {t('career.stage1.desc')}
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 border-l-2 border-gray-400">
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      {t('career.stage1.warning')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 阶段 2 */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-700 dark:border-gray-400 p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gray-700 dark:bg-gray-400 border-2 border-gray-700 dark:border-gray-400 flex items-center justify-center">
                  <span className="text-white dark:text-black font-black text-2xl">2</span>
                </div>
                <div className="mt-4">
                  <div className="inline-block px-3 py-1 bg-gray-700 dark:bg-gray-400 text-white dark:text-black text-xs font-bold mb-3">
                    {t('career.stage2.days')}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{t('career.stage2.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {t('career.stage2.desc')}
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 border-l-2 border-gray-600">
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      {t('career.stage2.tip')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 阶段 3 */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-800 dark:border-gray-300 p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gray-800 dark:bg-gray-300 border-2 border-gray-800 dark:border-gray-300 flex items-center justify-center">
                  <span className="text-white dark:text-black font-black text-2xl">3</span>
                </div>
                <div className="mt-4">
                  <div className="inline-block px-3 py-1 bg-gray-800 dark:bg-gray-300 text-white dark:text-black text-xs font-bold mb-3">
                    {t('career.stage3.days')}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{t('career.stage3.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {t('career.stage3.desc')}
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 border-l-2 border-gray-700">
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      {t('career.stage3.success')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 阶段 4 */}
            <div className="relative">
              <div className="bg-black dark:bg-white border-2 border-black dark:border-white p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-black dark:bg-white border-2 border-black dark:border-white flex items-center justify-center">
                  <span className="text-white dark:text-black font-black text-2xl">★</span>
                </div>
                <div className="mt-4">
                  <div className="inline-block px-3 py-1 bg-white dark:bg-black text-black dark:text-white text-xs font-bold mb-3">
                    {t('career.stage4.path')}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white dark:text-black">{t('career.stage4.title')}</h3>
                  <p className="text-sm text-gray-300 dark:text-gray-700 mb-4">
                    {t('career.stage4.desc')}
                  </p>
                  <div className="bg-gray-800 dark:bg-gray-200 p-3 border-l-2 border-white dark:border-black">
                    <p className="text-xs text-white dark:text-black font-semibold">
                      {t('career.stage4.goal')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 你是否符合基本条件 - 全新设计 */}
      <div className="relative bg-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-black">
            {t('req.title')}
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            {t('req.subtitle')}
          </p>
        </div>

        {/* 条件卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 人群画像 */}
          <div className="bg-gradient-to-br from-gray-900 to-black dark:from-gray-100 dark:to-white p-8 border-2 border-black dark:border-white shadow-lg hover:shadow-2xl transition-shadow">
            <div className="text-white dark:text-black">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white dark:bg-black flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-2xl font-bold">{t('req.profile.title')}</h3>
              </div>
              <div className="space-y-5">
                <div className="border-l-4 border-white dark:border-black pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg mb-1">{t('req.profile.education')}</p>
                  <p className="text-sm text-gray-300 dark:text-gray-600">{t('req.profile.education.desc')}</p>
                </div>
                <div className="border-l-4 border-white dark:border-black pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg mb-1">{t('req.profile.psychology')}</p>
                  <p className="text-sm text-gray-300 dark:text-gray-600">{t('req.profile.psychology.desc')}</p>
                </div>
                <div className="border-l-4 border-white dark:border-black pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg mb-1">{t('req.profile.character')}</p>
                  <p className="text-sm text-gray-300 dark:text-gray-600">{t('req.profile.character.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 时间与环境 */}
          <div className="bg-white dark:bg-gray-900 p-8 border-2 border-black dark:border-white shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white">{t('req.time.title')}</h3>
            </div>
            <div className="space-y-5">
              <div className="flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-3 -m-3 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-1">{t('req.time.commitment')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('req.time.commitment.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-3 -m-3 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-1">{t('req.time.equipment')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('req.time.equipment.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-3 -m-3 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-1">{t('req.time.environment')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('req.time.environment.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 在线时间 */}
          <div className="bg-gradient-to-br from-gray-900 to-black dark:from-gray-100 dark:to-white p-8 border-2 border-black dark:border-white shadow-lg hover:shadow-2xl transition-shadow">
            <div className="text-white dark:text-black">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white dark:bg-black flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="text-2xl font-bold">{t('req.online.title')}</h3>
              </div>
              <div className="space-y-5">
                <div className="border-l-4 border-white dark:border-black pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg mb-1">{t('req.online.hours')}</p>
                  <p className="text-sm text-gray-300 dark:text-gray-600">{t('req.online.hours.desc')}</p>
                </div>
                <div className="border-l-4 border-white dark:border-black pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg mb-1">{t('req.online.debrief')}</p>
                  <p className="text-sm text-gray-300 dark:text-gray-600">{t('req.online.debrief.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 适合与否 */}
          <div className="bg-white dark:bg-gray-900 p-8 border-2 border-black dark:border-white shadow-lg hover:shadow-2xl transition-shadow">
            <div className="text-black dark:text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="text-2xl font-bold">{t('unsuitable.title')}</h3>
              </div>
              <div className="space-y-5">
                <div className="border-l-4 border-black dark:border-white pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg flex items-center gap-2 mb-1">
                    <span className="text-red-600 dark:text-red-400">✗</span>
                    {t('unsuitable.gambler')}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">{t('unsuitable.gambler.desc')}</p>
                </div>
                <div className="border-l-4 border-black dark:border-white pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg flex items-center gap-2 mb-1">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    {t('expectations.mindset')}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">{t('expectations.mindset.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 重要提示 */}
        <div className="mt-8 bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-white text-white dark:text-black p-8 border-2 border-black dark:border-white shadow-xl">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-white dark:bg-black flex items-center justify-center rounded-full">
              <svg className="w-8 h-8 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold mb-3">{t('req.notice.title')}</h4>
              <p className="text-lg leading-relaxed mb-4">
                {t('req.notice.once')}{t('req.notice.desc')}
              </p>
              <p className="text-gray-300 dark:text-gray-700">
                {t('req.notice.philosophy')}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* 视频介绍板块 */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20 border-y-2 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-black dark:text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">
            {t('video.title')}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
            {t('video.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 视频 1 */}
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 overflow-hidden group hover:border-black dark:hover:border-white transition-all">
              <div className="relative h-64 bg-black dark:bg-gray-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4"></div>
                  <p className="text-lg font-semibold">{t('video.doc1.title')}</p>
                  <p className="text-sm text-gray-400">{t('video.doc1.rating')}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{t('video.doc1.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  {t('video.doc1.desc')}
                </p>
                <a
                  href="https://www.bilibili.com/video/BV19a411X7eY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
                >
                  {t('video.doc1.cta')}
                </a>
              </div>
            </div>

            {/* 视频 2 */}
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 overflow-hidden group hover:border-black dark:hover:border-white transition-all">
              <div className="relative h-64 bg-black dark:bg-gray-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4"></div>
                  <p className="text-lg font-semibold">{t('video.doc2.title')}</p>
                  <p className="text-sm text-gray-400">{t('video.doc2.rating')}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{t('video.doc2.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  {t('video.doc2.desc')}
                </p>
                <a
                  href="https://www.bilibili.com/video/BV1FZ4y1o734"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
                >
                  {t('video.doc2.cta')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 学员展示 - 收益滚动 */}
      <div className="relative bg-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-black border-b-4 border-black inline-block pb-2 w-full">
          {t('showcase.title')}
        </h2>

        {/* 收益统计 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 border-2 border-gray-200 dark:border-gray-700 text-center">
            <div className="text-4xl font-black text-black dark:text-white mb-2">{t('showcase.junior')}</div>
            <p className="text-2xl font-bold text-black dark:text-white">¥10,000 - ¥30,000</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{t('showcase.income.range')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white text-center">
            <div className="text-4xl font-black text-black dark:text-white mb-2">{t('showcase.intermediate')}</div>
            <p className="text-2xl font-bold text-black dark:text-white">¥30,000 - ¥60,000</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{t('showcase.income.range')}</p>
          </div>
          <div className="bg-black dark:bg-white p-6 border-2 border-black dark:border-white text-center">
            <div className="text-4xl font-black text-white dark:text-black mb-2">{t('showcase.senior')}</div>
            <p className="text-2xl font-bold text-white dark:text-black">¥60,000 - ¥100,000+</p>
            <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">{t('showcase.income.range')}</p>
          </div>
        </div>

        {/* 收益图片滚动展示 - 每次显示3张 */}
        <div className="bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
            {t('showcase.screenshots.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((offset) => {
              const imageIndex = currentImageIndex + offset;
              const image = profitImages[imageIndex < profitImages.length ? imageIndex : imageIndex - profitImages.length];
              return (
                <div key={offset} className="relative h-80 overflow-hidden bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600">
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <img
                      src={image}
                      alt={`学员收益 ${imageIndex + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t('showcase.screenshots.note')}
            </p>
          </div>
        </div>
      </div>
      </div>

      {/* CTA - 优化版 */}
      <div className="relative bg-black dark:bg-gray-950 py-20 w-full border-y-2 border-gray-800 overflow-hidden">
        {/* Neural Background - Light mode (白色神经网络) */}
        <div className="dark:hidden">
          <NeuralBackground
            hue={200}
            saturation={0.5}
            chroma={0.4}
            isDark={false}
          />
        </div>

        {/* Neural Background - Dark mode (黑色神经网络) */}
        <div className="hidden dark:block">
          <NeuralBackground
            hue={200}
            saturation={0.5}
            chroma={0.4}
            isDark={true}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            {t('cta.subtitle')}
          </p>

          {/* 通过率警告 - 重新设计 */}
          <div className="relative max-w-3xl mx-auto mb-12">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-red-500/20 to-yellow-500/20 blur-xl"></div>

            <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500/50 p-8 shadow-2xl">
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-yellow-500 flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-yellow-500 mb-2">{t('cta.notice.title')}</h3>
                <div className="h-1 w-24 bg-yellow-500"></div>
              </div>

              <div className="text-center mb-8">
                <p className="text-sm text-gray-400 mb-3">{t('cta.passrate')}</p>
                <p className="text-6xl font-black text-white mb-2">
                  <span className="text-yellow-500">10</span>-<span className="text-yellow-500">15</span><span className="text-4xl">%</span>
                </p>
                <p className="text-gray-300 text-lg">
                  {t('cta.passrate.desc')}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-black/50 backdrop-blur-sm p-4 border border-red-500/30">
                  <p className="text-xs text-gray-500 mb-2">{t('cta.elimination')}</p>
                  <p className="text-sm text-white font-bold">{t('cta.elimination.reason')}</p>
                </div>
                <div className="bg-black/50 backdrop-blur-sm p-4 border border-red-500/30">
                  <p className="text-xs text-gray-500 mb-2">{t('cta.opportunity')}</p>
                  <p className="text-sm text-white font-bold">{t('cta.opportunity.value')}</p>
                </div>
                <div className="bg-black/50 backdrop-blur-sm p-4 border border-red-500/30">
                  <p className="text-xs text-gray-500 mb-2">{t('cta.time.cost')}</p>
                  <p className="text-sm text-white font-bold">{t('cta.time.value')}</p>
                </div>
                <div className="bg-black/50 backdrop-blur-sm p-4 border border-green-500/30">
                  <p className="text-xs text-gray-500 mb-2">{t('cta.money.cost')}</p>
                  <p className="text-sm text-green-400 font-bold">{t('cta.money.value')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="px-10 py-5 bg-white text-black font-bold text-lg border-2 border-white hover:bg-black hover:text-white transition-colors animate-shake"
            >
              {t('cta.button.interview')}
            </button>
            <p className="text-sm text-gray-500">
              {t('cta.button.note')}
            </p>
          </div>
        </div>
      </div>

      {/* Email Contact Modal */}
      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Partners Logos */}
      <PartnersLogos />

      {/* Interview CTA */}
      <InterviewCTA />

      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title="职业交易员面试"
      />
    </div>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full">
      <DummyContent />
    </div>
  );
}
