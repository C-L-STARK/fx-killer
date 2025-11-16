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
import { BackgroundBeams } from '@/components/ui/background-beams';
import Hyperspeed, { hyperspeedPresets } from '@/components/effects/Hyperspeed';

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
    <div className="w-full -mt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden h-screen bg-black">
        {/* Hyperspeed Background with Akira Preset */}
        <div className="absolute inset-0 w-full h-full">
          <Hyperspeed effectOptions={hyperspeedPresets.akira} />
        </div>

        {/* Content Overlay - Centered in viewport */}
        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl flex flex-col space-y-10">
            {/* Main Title */}
            <ScaleFadeIn delay={0.2}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tight leading-none">
                <BrandName inHero={true} />
              </h1>
            </ScaleFadeIn>

            {/* Subtitle */}
            <FadeInSlide direction="right" delay={0.4}>
              <div className="text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight space-y-2">
                {language === 'zh' ? (
                  <>
                    <p>精准、专业、高效</p>
                    <p>
                      <span className="inline-block bg-[#ff102a] text-white px-3 py-1 animate-pulse">免费培养</span>真正的外汇交易专家
                    </p>
                  </>
                ) : (
                  <>
                    <p>Precise, Professional, Efficient</p>
                    <p>
                      <span className="inline-block bg-[#ff102a] text-white px-3 py-1 animate-pulse whitespace-nowrap">Free Training</span>{' '}
                      for True Forex Trading&nbsp;Experts
                    </p>
                  </>
                )}
              </div>
            </FadeInSlide>

            {/* CTAs */}
            <FadeInSlide direction="right" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-6">
                <PulseButton className="w-full sm:w-auto">
                  <ShineButton
                    onClick={() => router.push(`/${language}/splan/join-us`)}
                    className="w-full px-12 py-6 bg-[#ff102a] text-white text-xl font-black border-2 border-[#ff102a] hover:bg-[#eb383e] hover:border-[#eb383e] transition-all shadow-lg"
                  >
                    {t('hero.cta.learn')}
                  </ShineButton>
                </PulseButton>
                <button
                  onClick={() => router.push(`/${language}/dashboard`)}
                  className="w-full sm:w-auto px-12 py-6 bg-transparent text-white text-xl font-black border-2 border-[#dadafa] hover:bg-[#dadafa] hover:text-black transition-all"
                >
                  {t('hero.cta.dashboard')}
                </button>
              </div>
            </FadeInSlide>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Black Background for All Sections (除了Hero和Footer) */}
      <div className="relative bg-black w-full overflow-hidden">

        {/* 为什么选择 FX Killer - Akira 风格 */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#ff102a]">
            {t('why.title')}
          </h2>
          <div className="w-24 h-1 bg-[#ff102a] mx-auto mb-4"></div>
          <p className="text-[#dadafa] text-lg">
            {t('why.subtitle')}
          </p>
        </div>

        {/* 核心优势 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FadeInSlide direction="up" delay={0.1}>
            <HoverCard className="h-full">
              <div className="p-8 bg-[#0a0a0a] border-2 border-[#dadafa]/30 h-full hover:border-[#ff102a] transition-colors group">
                <div className="mb-4 w-12 h-12 bg-[#ff102a] flex items-center justify-center group-hover:bg-[#eb383e] transition-colors">
                  <span className="text-2xl text-white font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{t('advantage.selection.title')}</h3>
                <p className="text-[#b0b0b0] leading-relaxed">
                  {t('advantage.selection.desc')}
                </p>
              </div>
            </HoverCard>
          </FadeInSlide>

          <FadeInSlide direction="up" delay={0.2}>
            <HoverCard className="h-full">
              <div className="p-8 bg-[#0a0a0a] border-2 border-[#dadafa]/30 h-full hover:border-[#ff102a] transition-colors group">
                <div className="mb-4 w-12 h-12 bg-[#ff102a] flex items-center justify-center group-hover:bg-[#eb383e] transition-colors">
                  <span className="text-2xl text-white font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{t('advantage.growth.title')}</h3>
                <p className="text-[#b0b0b0] leading-relaxed">
                  {t('advantage.growth.desc')}
                </p>
              </div>
            </HoverCard>
          </FadeInSlide>

          <FadeInSlide direction="up" delay={0.3}>
            <HoverCard className="h-full">
              <div className="p-8 bg-[#0a0a0a] border-2 border-[#dadafa]/30 h-full hover:border-[#ff102a] transition-colors group">
                <div className="mb-4 w-12 h-12 bg-[#ff102a] flex items-center justify-center group-hover:bg-[#eb383e] transition-colors">
                  <span className="text-2xl text-white font-bold">3</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{t('advantage.commission.title')}</h3>
                <p className="text-[#b0b0b0] leading-relaxed">
                  {t('advantage.commission.desc')}
                </p>
              </div>
            </HoverCard>
          </FadeInSlide>
        </div>

        {/* 与传统培训对比 */}
        <div className="bg-[#131318] border-2 border-[#dadafa]/20 p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            <span className="bg-[#ff102a] text-white px-4 py-2">{t('comparison.vs')}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FX Killer */}
            <div className="bg-[#0a0a0a] p-6 border-l-4 border-[#ff102a]">
              <h4 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <span className="text-2xl"></span> {t('comparison.fxkiller')}
              </h4>
              <ul className="space-y-3 text-[#e0e0e0]">
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{t('comparison.free')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{t('comparison.practical')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{t('comparison.selection')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{t('comparison.funding')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{t('comparison.share')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{t('comparison.career')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{t('comparison.discipline')}</span>
                </li>
              </ul>
            </div>

            {/* 传统培训 */}
            <div className="bg-[#1a1a1a] p-6 border-l-4 border-[#dadafa]/30">
              <h4 className="text-xl font-bold mb-4 text-[#dadafa] flex items-center gap-2">
                <span className="text-2xl"></span> {t('comparison.traditional')}
              </h4>
              <ul className="space-y-3 text-[#909090]">
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

          <div className="mt-8 bg-black border-2 border-[#ff102a] text-white p-6 text-center">
            <p className="text-lg font-semibold">
              {t('comparison.emphasis')}
            </p>
          </div>
        </div>

        {/* 职业发展阶梯 - 4 Stages */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 阶段 1 */}
          <div className="relative">
            <div className="bg-[#0a0a0a] border-2 border-[#ff102a] p-6 h-full">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#ff102a] border-2 border-[#ff102a] flex items-center justify-center">
                <span className="text-white font-black text-2xl">1</span>
              </div>
              <div className="mt-4">
                <div className="inline-block px-3 py-1 bg-[#ff102a] text-white text-xs font-bold mb-3">
                  {t('career.stage1.days')}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{t('career.stage1.title')}</h3>
                <p className="text-sm text-[#b0b0b0] mb-4">
                  {t('career.stage1.desc')}
                </p>
                <div className="bg-[#131318] p-3 border-l-2 border-[#eb383e]">
                  <p className="text-xs text-[#dadafa]">
                    {t('career.stage1.warning')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 阶段 2 */}
          <div className="relative">
            <div className="bg-[#0a0a0a] border-2 border-[#eb383e] p-6 h-full">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#eb383e] border-2 border-[#eb383e] flex items-center justify-center">
                <span className="text-white font-black text-2xl">2</span>
              </div>
              <div className="mt-4">
                <div className="inline-block px-3 py-1 bg-[#eb383e] text-white text-xs font-bold mb-3">
                  {t('career.stage2.days')}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{t('career.stage2.title')}</h3>
                <p className="text-sm text-[#b0b0b0] mb-4">
                  {t('career.stage2.desc')}
                </p>
                <div className="bg-[#131318] p-3 border-l-2 border-[#dadafa]/50">
                  <p className="text-xs text-[#dadafa]">
                    {t('career.stage2.tip')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 阶段 3 */}
          <div className="relative">
            <div className="bg-[#0a0a0a] border-2 border-[#dadafa]/50 p-6 h-full">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#dadafa] border-2 border-[#dadafa] flex items-center justify-center">
                <span className="text-black font-black text-2xl">3</span>
              </div>
              <div className="mt-4">
                <div className="inline-block px-3 py-1 bg-[#dadafa] text-black text-xs font-bold mb-3">
                  {t('career.stage3.days')}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{t('career.stage3.title')}</h3>
                <p className="text-sm text-[#b0b0b0] mb-4">
                  {t('career.stage3.desc')}
                </p>
                <div className="bg-[#131318] p-3 border-l-2 border-[#dadafa]">
                  <p className="text-xs text-[#dadafa]">
                    {t('career.stage3.success')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 阶段 4 */}
          <div className="relative">
            <div className="bg-[#ff102a] border-2 border-[#ff102a] p-6 h-full">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-white border-2 border-white flex items-center justify-center">
                <span className="text-[#ff102a] font-black text-2xl">★</span>
              </div>
              <div className="mt-4">
                <div className="inline-block px-3 py-1 bg-white text-[#ff102a] text-xs font-bold mb-3">
                  {t('career.stage4.path')}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{t('career.stage4.title')}</h3>
                <p className="text-sm text-white/90 mb-4">
                  {t('career.stage4.desc')}
                </p>
                <div className="bg-[#eb383e] p-3 border-l-2 border-white">
                  <p className="text-xs text-white font-semibold">
                    {t('career.stage4.goal')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* 你是否符合基本条件 - Akira 风格 */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#ff102a]">
            {t('req.title')}
          </h2>
          <div className="w-24 h-1 bg-[#ff102a] mx-auto mb-4"></div>
          <p className="text-[#dadafa] text-lg">
            {t('req.subtitle')}
          </p>
        </div>

        {/* 条件卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 人群画像 */}
          <div className="bg-[#0a0a0a] p-8 border-2 border-[#dadafa]/30 hover:border-[#ff102a] transition-colors group">
            <div className="text-white">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{t('req.profile.title')}</h3>
              </div>
              <div className="space-y-5">
                <div className="border-l-4 border-[#dadafa] pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg mb-1">{t('req.profile.education')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.profile.education.desc')}</p>
                </div>
                <div className="border-l-4 border-[#dadafa] pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg mb-1">{t('req.profile.psychology')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.profile.psychology.desc')}</p>
                </div>
                <div className="border-l-4 border-[#dadafa] pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg mb-1">{t('req.profile.character')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.profile.character.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 时间与环境 */}
          <div className="bg-[#0a0a0a] p-8 border-2 border-[#dadafa]/30 hover:border-[#ff102a] transition-colors group">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white">{t('req.time.title')}</h3>
            </div>
            <div className="space-y-5">
              <div className="flex items-start gap-3 hover:bg-[#131318] p-3 -m-3 transition-colors">
                <div>
                  <p className="font-bold text-white mb-1">{t('req.time.commitment')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.time.commitment.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 hover:bg-[#131318] p-3 -m-3 transition-colors">
                <div>
                  <p className="font-bold text-white mb-1">{t('req.time.equipment')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.time.equipment.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 hover:bg-[#131318] p-3 -m-3 transition-colors">
                <div>
                  <p className="font-bold text-white mb-1">{t('req.time.environment')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.time.environment.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 在线时间 */}
          <div className="bg-[#0a0a0a] p-8 border-2 border-[#dadafa]/30 hover:border-[#ff102a] transition-colors group">
            <div className="text-white">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{t('req.online.title')}</h3>
              </div>
              <div className="space-y-5">
                <div className="border-l-4 border-[#dadafa] pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg mb-1">{t('req.online.hours')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.online.hours.desc')}</p>
                </div>
                <div className="border-l-4 border-[#dadafa] pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg mb-1">{t('req.online.debrief')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.online.debrief.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 适合与否 */}
          <div className="bg-[#0a0a0a] p-8 border-2 border-[#dadafa]/30 hover:border-[#ff102a] transition-colors group">
            <div className="text-white">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{t('unsuitable.title')}</h3>
              </div>
              <div className="space-y-5">
                <div className="border-l-4 border-[#eb383e] pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg flex items-center gap-2 mb-1">
                    <span className="text-[#ff102a]">✗</span>
                    {t('unsuitable.gambler')}
                  </p>
                  <p className="text-sm text-[#b0b0b0]">{t('unsuitable.gambler.desc')}</p>
                </div>
                <div className="border-l-4 border-[#dadafa] pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg flex items-center gap-2 mb-1">
                    <span className="text-[#dadafa]">✓</span>
                    {t('expectations.mindset')}
                  </p>
                  <p className="text-sm text-[#b0b0b0]">{t('expectations.mindset.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 重要提示 */}
        <div className="mt-8 bg-[#131318] text-white p-8 border-2 border-[#ff102a]">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-[#ff102a] flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold mb-3">{t('req.notice.title')}</h4>
              <p className="text-lg leading-relaxed mb-4">
                {t('req.notice.once')}{t('req.notice.desc')}
              </p>
              <p className="text-[#dadafa]">
                {t('req.notice.philosophy')}
              </p>
            </div>
          </div>
          </div>
        </div>

        {/* 视频介绍板块 - Akira 风格 */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#ff102a] w-full">
            {t('video.title')}
          </h2>
          <p className="text-center text-[#dadafa] mb-12 text-lg">
            {t('video.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 视频 1 */}
            <div className="bg-[#0a0a0a] border-2 border-[#dadafa]/30 overflow-hidden group hover:border-[#ff102a] transition-all">
              <div className="relative h-64 bg-[#131318] flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4"></div>
                  <p className="text-lg font-semibold">{t('video.doc1.title')}</p>
                  <p className="text-sm text-[#dadafa]">{t('video.doc1.rating')}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">{t('video.doc1.title')}</h3>
                <p className="text-[#b0b0b0] mb-4 text-sm leading-relaxed">
                  {t('video.doc1.desc')}
                </p>
                <a
                  href="https://www.bilibili.com/video/BV19a411X7eY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#ff102a] text-white font-bold border-2 border-[#ff102a] hover:bg-[#eb383e] hover:border-[#eb383e] transition-colors"
                >
                  {t('video.doc1.cta')}
                </a>
              </div>
            </div>

            {/* 视频 2 */}
            <div className="bg-[#0a0a0a] border-2 border-[#dadafa]/30 overflow-hidden group hover:border-[#ff102a] transition-all">
              <div className="relative h-64 bg-[#131318] flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4"></div>
                  <p className="text-lg font-semibold">{t('video.doc2.title')}</p>
                  <p className="text-sm text-[#dadafa]">{t('video.doc2.rating')}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">{t('video.doc2.title')}</h3>
                <p className="text-[#b0b0b0] mb-4 text-sm leading-relaxed">
                  {t('video.doc2.desc')}
                </p>
                <a
                  href="https://www.bilibili.com/video/BV1FZ4y1o734"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#ff102a] text-white font-bold border-2 border-[#ff102a] hover:bg-[#eb383e] hover:border-[#eb383e] transition-colors"
                >
                  {t('video.doc2.cta')}
                </a>
              </div>
            </div>
          </div>

          {/* 学员收益展示 - Added to Video Section */}
          <div className="mt-16">
            {/* 收益统计 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-[#0a0a0a] p-6 border-2 border-[#dadafa]/30 text-center hover:border-[#ff102a] transition-colors">
                <div className="text-4xl font-black text-white mb-2">{t('showcase.junior')}</div>
                <p className="text-2xl font-bold text-[#dadafa]">¥10,000 - ¥30,000</p>
                <p className="text-sm text-[#b0b0b0] mt-2">{t('showcase.income.range')}</p>
              </div>
              <div className="bg-[#0a0a0a] p-6 border-2 border-[#ff102a] text-center">
                <div className="text-4xl font-black text-white mb-2">{t('showcase.intermediate')}</div>
                <p className="text-2xl font-bold text-[#eb383e]">¥30,000 - ¥60,000</p>
                <p className="text-sm text-[#b0b0b0] mt-2">{t('showcase.income.range')}</p>
              </div>
              <div className="bg-[#ff102a] p-6 border-2 border-[#ff102a] text-center">
                <div className="text-4xl font-black text-white mb-2">{t('showcase.senior')}</div>
                <p className="text-2xl font-bold text-white">¥60,000 - ¥100,000+</p>
                <p className="text-sm text-white/70 mt-2">{t('showcase.income.range')}</p>
              </div>
            </div>

            {/* 收益图片滚动展示 */}
            <div className="bg-[#131318] border-2 border-[#dadafa]/30 p-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-white">
                {t('showcase.screenshots.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[0, 1, 2].map((offset) => {
                  const imageIndex = currentImageIndex + offset;
                  const image = profitImages[imageIndex < profitImages.length ? imageIndex : imageIndex - profitImages.length];
                  return (
                    <div key={offset} className="relative h-80 overflow-hidden bg-[#0a0a0a] border-2 border-[#dadafa]/30">
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
                <p className="text-sm text-[#dadafa]">
                  {t('showcase.screenshots.note')}
                </p>
              </div>
            </div>
          </div>

        </div>


        {/* CTA - 全新设计 - 极简高端 */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
          {/* 主标题 */}
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none">
              {t('cta.title')}
            </h2>
            <div className="w-32 h-2 bg-[#ff102a] mx-auto mb-8"></div>
            <p className="text-2xl md:text-3xl text-[#dadafa] font-semibold">
              {t('cta.subtitle')}
            </p>
          </div>

          {/* 关键信息 - 横向排列 */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-20">
            <div className="text-center">
              <div className="text-7xl font-black text-[#ff102a] mb-2">10-15%</div>
              <p className="text-sm text-[#dadafa]">{t('cta.passrate')}</p>
            </div>
            <div className="text-6xl text-[#dadafa]/20">|</div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">{t('cta.elimination.title')}</div>
              <p className="text-sm text-[#dadafa]">{t('cta.elimination')}</p>
            </div>
            <div className="text-6xl text-[#dadafa]/20">|</div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">{t('cta.time.title')}</div>
              <p className="text-sm text-[#dadafa]">{t('cta.time.cost')}</p>
            </div>
            <div className="text-6xl text-[#dadafa]/20">|</div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">¥0</div>
              <p className="text-sm text-[#dadafa]">{t('cta.money.cost')}</p>
            </div>
          </div>

          {/* CTA按钮 */}
          <div className="text-center">
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="group relative inline-block px-24 py-8 bg-[#ff102a] text-white font-black text-4xl overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">{t('cta.button.interview')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff102a] via-[#eb383e] to-[#ff102a] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <p className="text-sm text-[#b0b0b0] mt-6">
              {t('cta.button.note')}
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <StatsSection />

        {/* Testimonials */}
        <Testimonials />

        {/* Partners Logos */}
        <PartnersLogos />

        {/* Interview CTA */}
        <InterviewCTA />
      </div>

      {/* Email Contact Modal */}
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
