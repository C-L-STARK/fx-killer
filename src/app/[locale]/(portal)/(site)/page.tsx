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

      {/* 2. VALUE PROPOSITION - NEW SECTION */}
      <div className="relative py-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
              {language === 'zh' ? '为什么选择我们' : 'Why Choose Us'}
            </h2>
            <div className="w-24 h-1 bg-[#ff102a] mx-auto mb-6"></div>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              {language === 'zh' ? '行业领先的外汇交易员培养计划，专注于培养真正盈利的专业交易员' : 'Industry-leading forex trader development program focused on cultivating genuinely profitable professional traders'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                stat: "80%",
                title: language === 'zh' ? '利润分成' : 'Profit Share',
                desc: language === 'zh' ? '业界最高的利润分成比例，您的努力直接转化为收入' : 'Highest profit share in the industry, your effort directly converts to income'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                stat: "100%",
                title: language === 'zh' ? '资金支持' : 'Funded Capital',
                desc: language === 'zh' ? '通过考核后，我们提供全额交易资金，零风险' : 'After passing evaluation, we provide full trading capital with zero risk'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                stat: "1-3",
                title: language === 'zh' ? '月培养周期' : 'Month Training',
                desc: language === 'zh' ? '快速高效的培养体系，1-3个月成为专业交易员' : 'Fast and efficient development system, become professional in 1-3 months'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-black border border-white/10 p-8 hover:border-[#ff102a]/50 transition-all duration-300 group hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#ff102a]/10 border border-[#ff102a]/30 flex items-center justify-center text-[#ff102a] group-hover:bg-[#ff102a] group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="text-5xl font-black text-white">{item.stat}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION DIVIDER */}
      <div className="relative h-32 bg-black overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#ff102a] rotate-45 border-2 border-black"></div>
      </div>

      {/* 3. THE PROBLEM VS SOLUTION - COMPARISON (3-WAY) */}
      <div className="relative py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white uppercase tracking-tight">
              {t('why.title')}
            </h2>
            <div className="w-24 h-1 bg-[#ff102a] mx-auto mb-6"></div>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              {t('why.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 overflow-hidden">
            {/* Traditional Training */}
            <div className="bg-[#0a0a0a] p-8 border-r border-white/10 grayscale opacity-60 hover:opacity-100 transition-all duration-500 relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-900/30"></div>
              <h4 className="text-2xl font-black mb-8 text-gray-500 flex items-center gap-3 uppercase">
                <span className="flex items-center justify-center w-8 h-8 border border-gray-700 text-gray-400 text-lg">×</span>
                {t('comparison.traditional')}
              </h4>
              <ul className="space-y-4 text-gray-500">
                {[
                  t('comparison.highfee'),
                  t('comparison.theory'),
                  t('comparison.acceptall'),
                  t('comparison.selffunded'),
                  t('comparison.nosupport'),
                  t('comparison.noplan'),
                  t('comparison.loose')
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base font-mono">
                    <span className="font-bold mt-0.5 text-red-900/50">×</span>
                    <span className="text-sm leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Indicator Scam Teams */}
            <div className="bg-[#0a0a0a] p-8 border-r border-white/10 grayscale opacity-60 hover:opacity-100 transition-all duration-500 relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-900/30"></div>
              <h4 className="text-2xl font-black mb-8 text-gray-500 flex items-center gap-3 uppercase">
                <span className="flex items-center justify-center w-8 h-8 border border-gray-700 text-gray-400 text-lg">×</span>
                {language === 'zh' ? '贩卖指标团队' : 'Indicator Scam Teams'}
              </h4>
              <ul className="space-y-4 text-gray-500">
                {[
                  language === 'zh' ? '出售"圣杯"指标 - 承诺必胜策略' : 'Sell "Holy Grail" indicators - Promise guaranteed wins',
                  language === 'zh' ? '虚假回测数据 - 精心挑选的历史行情' : 'Fake backtest data - Cherry-picked historical data',
                  language === 'zh' ? '付费社群 - 月费/年费持续收割' : 'Paid communities - Monthly/yearly recurring fees',
                  language === 'zh' ? '无实盘验证 - 纸上谈兵' : 'No live trading proof - All talk no action',
                  language === 'zh' ? '跑路常态 - 收钱后消失' : 'Exit scams - Disappear after taking money',
                  language === 'zh' ? '收徒割韭菜 - 层层分销' : 'Recruit followers - Multi-level marketing',
                  language === 'zh' ? '包装术语 - 故弄玄虚' : 'Fancy jargon - Mystify to confuse'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base font-mono">
                    <span className="font-bold mt-0.5 text-red-900/50">×</span>
                    <span className="text-sm leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FX Killer - Sharp & Bold */}
            <div className="bg-black p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#ff102a] shadow-[0_0_20px_rgba(255,16,42,0.8)]"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff102a]/10 blur-3xl group-hover:bg-[#ff102a]/20 transition-colors"></div>
              <h4 className="text-2xl font-black mb-8 text-white flex items-center gap-3 uppercase">
                <span className="flex items-center justify-center w-8 h-8 bg-[#ff102a] text-white text-lg shadow-[0_0_15px_rgba(255,16,42,0.5)]">✓</span>
                {t('comparison.fxkiller')}
              </h4>
              <ul className="space-y-4 text-gray-200">
                {[
                  t('comparison.free'),
                  t('comparison.practical'),
                  t('comparison.selection'),
                  t('comparison.funding'),
                  t('comparison.share'),
                  t('comparison.career'),
                  t('comparison.discipline')
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base font-mono">
                    <span className="text-[#ff102a] font-bold mt-0.5">✓</span>
                    <span className="font-medium text-sm leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION DIVIDER */}
      <div className="relative py-1 bg-gradient-to-r from-transparent via-[#ff102a] to-transparent opacity-50"></div>

      {/* 4. THE PATH - CAREER ROADMAP */}
      <div className="relative py-12 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-2">
                {language === 'zh' ? '职业晋升之路' : 'Career Path'}
              </h2>
              <p className="text-[#ff102a] text-lg font-bold tracking-widest uppercase">
                The Road to Professional
              </p>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-gray-500 font-mono text-sm">ESTIMATED TIME</div>
              <div className="text-white font-mono text-xl">1-3 MONTHS</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                days: t('career.stage1.days'),
                title: t('career.stage1.title'),
                desc: t('career.stage1.desc'),
                color: 'text-gray-400',
                border: 'border-white/10'
              },
              {
                step: '02',
                days: t('career.stage2.days'),
                title: t('career.stage2.title'),
                desc: t('career.stage2.desc'),
                color: 'text-white',
                border: 'border-white/30'
              },
              {
                step: '03',
                days: t('career.stage3.days'),
                title: t('career.stage3.title'),
                desc: t('career.stage3.desc'),
                color: 'text-[#ff102a]',
                border: 'border-[#ff102a]/50'
              },
              {
                step: '04',
                days: t('career.stage4.path'),
                title: t('career.stage4.title'),
                desc: t('career.stage4.desc'),
                color: 'text-[#ff102a]',
                border: 'border-[#ff102a]',
                glow: true
              }
            ].map((stage, index) => (
              <FadeInSlide key={index} direction="up" delay={index * 0.1}>
                <div className={`relative h-full bg-[#0a0a0a] border ${stage.border} p-8 hover:bg-[#111] transition-all duration-300 group ${stage.glow ? 'shadow-[0_0_30px_rgba(255,16,42,0.1)] hover:shadow-[0_0_50px_rgba(255,16,42,0.2)]' : ''}`}>
                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 ${stage.border} opacity-50 group-hover:opacity-100 transition-opacity`}></div>

                  <div className="flex justify-between items-start mb-8">
                    <div className={`text-4xl font-black opacity-30 ${stage.color}`}>{stage.step}</div>
                    <div className={`px-2 py-1 text-[10px] font-bold uppercase border ${stage.border} ${stage.color}`}>
                      {stage.days}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold mb-4 uppercase ${stage.color === 'text-gray-400' ? 'text-white' : stage.color}`}>{stage.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm font-mono">
                    {stage.desc}
                  </p>

                  {/* Bottom Progress Line */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#ff102a] to-transparent w-0 group-hover:w-full transition-all duration-500"></div>
                </div>
              </FadeInSlide>
            ))}
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

