"use client";
import { Code, Flex, Text } from "@radix-ui/themes";
import { LinkPreview } from "@/components/ui/link-preview";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { SparklesCore } from "@/components/ui/sparkles";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EmailContactModal from '@/components/custom/EmailContactModal';
import BrandName from '@/components/custom/BrandName';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const DummyContent = () => {
  const router = useRouter();
  const { t } = useLanguage();
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
    <div className="w-full pt-20">{/* Added pt-20 for fixed navbar */}
      <BackgroundBeamsWithCollision>
        <div className="relative flex items-center justify-center" style={{ minHeight: 'calc(100vh - 10rem)' }}>
          <div className="w-full">
            <Flex width="100%" align="center" justify="center" direction="column">
              <div className="mb-4 flex justify-center">
                <span className="px-4 py-2 bg-black text-white text-sm font-semibold border border-gray-800">
                  {t('hero.title')}
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-extrabold text-center text-gray-900 dark:text-white mb-8 tracking-tight">
                <BrandName />
              </h1>
              <p className="text-2xl md:text-3xl text-center text-gray-700 dark:text-gray-200 mb-12 font-semibold">
                {t('hero.subtitle')}
              </p>
            </Flex>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <button
                onClick={() => router.push('/splan/join-us')}
                className="px-10 py-5 bg-black text-white text-lg font-bold border-2 border-black hover:bg-white hover:text-black transition-colors"
              >
                {t('hero.cta.learn')}
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-10 py-5 bg-white text-black text-lg font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                {t('hero.cta.dashboard')}
              </button>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      {/* 为什么选择 FX Killer - 增强版 */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-black dark:text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">
          {t('why.title')}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          {t('why.subtitle')}
        </p>

        {/* 核心优势 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <div className="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
              <span className="text-2xl text-white dark:text-black font-bold">1</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">{t('advantage.selection.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('advantage.selection.desc')}
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <div className="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
              <span className="text-2xl text-white dark:text-black font-bold">2</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">{t('advantage.growth.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('advantage.growth.desc')}
            </p>
          </div>
          <div className="p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <div className="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
              <span className="text-2xl text-white dark:text-black font-bold">3</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">{t('advantage.commission.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('advantage.commission.desc')}
            </p>
          </div>
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
                <span className="text-2xl">✓</span> {t('comparison.fxkiller')}
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
                <span className="text-2xl">✗</span> {t('comparison.traditional')}
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
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-black dark:text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">
          {t('req.title')}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          {t('req.subtitle')}
        </p>

        {/* 条件卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 人群画像 */}
          <div className="bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-200 p-8 border-2 border-black dark:border-white">
            <div className="text-white dark:text-black">
              <div className="text-5xl mb-4">👤</div>
              <h3 className="text-2xl font-bold mb-6">{t('req.profile.title')}</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-white dark:border-black pl-4">
                  <p className="font-bold text-lg">{t('req.profile.education')}</p>
                  <p className="text-sm text-gray-300 dark:text-gray-700">{t('req.profile.education.desc')}</p>
                </div>
                <div className="border-l-4 border-white dark:border-black pl-4">
                  <p className="font-bold text-lg">{t('req.profile.psychology')}</p>
                  <p className="text-sm text-gray-300 dark:text-gray-700">{t('req.profile.psychology.desc')}</p>
                </div>
                <div className="border-l-4 border-white dark:border-black pl-4">
                  <p className="font-bold text-lg">{t('req.profile.character')}</p>
                  <p className="text-sm text-gray-300 dark:text-gray-700">{t('req.profile.character.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 时间与环境 */}
          <div className="bg-white dark:bg-gray-800 p-8 border-2 border-gray-300 dark:border-gray-600">
            <div className="text-5xl mb-4">⏰</div>
            <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">{t('req.time.title')}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white flex items-center justify-center">
                  <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{t('req.time.commitment')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('req.time.commitment.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white flex items-center justify-center">
                  <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{t('req.time.equipment')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('req.time.equipment.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white flex items-center justify-center">
                  <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{t('req.time.environment')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('req.time.environment.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 在线时间 */}
          <div className="bg-white dark:bg-gray-800 p-8 border-2 border-gray-300 dark:border-gray-600">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">{t('req.online.title')}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white flex items-center justify-center">
                  <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{t('req.online.hours')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('req.online.hours.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white flex items-center justify-center">
                  <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{t('req.online.debrief')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('req.online.debrief.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 重要提示 */}
        <div className="bg-black dark:bg-white text-white dark:text-black p-8 border-2 border-black dark:border-white">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-white dark:bg-black flex items-center justify-center">
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
                  <div className="text-6xl mb-4">🎬</div>
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
                  <div className="text-6xl mb-4">🎬</div>
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
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-black dark:text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">
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
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('showcase.screenshots.note')}
            </p>
          </div>
        </div>
      </div>

      {/* CTA - 优化版 */}
      <div className="bg-black dark:bg-gray-950 py-20 w-full border-y-2 border-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
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
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#000"
        />
      </div>
      <DummyContent />
    </div>
  );
}
