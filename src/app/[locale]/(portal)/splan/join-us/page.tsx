"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import EmailContactModal from '@/components/custom/EmailContactModal';
import { useLanguage } from '@/contexts/LanguageContext';
import PremiumCTA from '@/components/custom/PremiumCTA';

export default function JoinUsPage() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const { t, language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#ff102a] selection:text-white overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,16,42,0.15),transparent_70%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 text-center px-6"
        >
          <div className="mb-6 flex justify-center">
            <span className="px-4 py-1.5 border border-[#ff102a]/30 bg-[#ff102a]/10 text-[#ff102a] text-xs font-bold tracking-[0.3em] uppercase  backdrop-blur-md">
              {isZh ? '免费孵化器' : 'FREE INCUBATOR'}
            </span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-8">
            <span className="block text-white">{isZh ? '加入' : 'JOIN'}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#ff102a] to-[#8a000e]">
              {isZh ? '汇刃矩阵' : 'FX KILLER'}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed font-light">
            {isZh
              ? '成为职业交易员，获得真实资金配置。我们提供系统化培训，让你从零基础到稳定盈利。'
              : 'Become a professional trader and get real funded accounts. We provide systematic training from beginner to consistent profitability.'}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
            {isZh ? '向下滚动探索' : 'SCROLL TO EXPLORE'}
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#ff102a] to-transparent"></div>
        </motion.div>
      </section>

      {/* 2. PROGRAM OVERVIEW - BENTO GRID */}
      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
              {isZh ? '为什么选择我们' : 'WHY CHOOSE US'}
            </h2>
            <div className="w-20 h-1 bg-[#ff102a] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Card - Free Training */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 bg-[#0a0a0a] border border-gray-900 p-10  hover:border-[#ff102a]/50 transition-all duration-500 group"
            >
              <span className="text-[#ff102a] font-bold text-sm tracking-wider uppercase mb-2 block">
                {isZh ? '核心优势' : 'CORE ADVANTAGE'}
              </span>
              <h3 className="text-3xl font-bold text-white mb-4">
                {isZh ? '100% 免费培训' : '100% Free Training'}
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-md">
                {isZh
                  ? '无需任何前期费用，我们提供完整的系统化培训。只有当你成功盈利后，我们才从利润中分成。'
                  : 'No upfront costs required. We provide complete systematic training. We only take a share when you profit.'}
              </p>
            </motion.div>

            {/* Tall Card - Profit Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:row-span-2 bg-[#0a0a0a] border border-gray-900 p-10  hover:border-[#ff102a]/50 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <span className="text-[#ff102a] font-bold text-sm tracking-wider uppercase mb-2 block">
                  {isZh ? '高额分润' : 'HIGH PROFIT SHARE'}
                </span>
                <h3 className="text-5xl font-black text-white mb-4">60-90%</h3>
                <p className="text-gray-400 leading-relaxed">
                  {isZh
                    ? '行业领先的分润比例，你的努力获得最大回报。'
                    : 'Industry-leading profit share. Your efforts deserve maximum returns.'}
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800">
                <div className="text-sm text-gray-500 mb-2">{isZh ? '资金规模' : 'CAPITAL RANGE'}</div>
                <div className="text-2xl font-bold text-white">$100K - $2M</div>
              </div>
            </motion.div>

            {/* Regular Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#0a0a0a] border border-gray-900 p-8  hover:border-[#ff102a]/50 transition-all duration-500"
            >
              <div className="w-12 h-12 mb-4 flex items-center justify-center bg-[#ff102a]/10 border border-[#ff102a]/30">
                <svg className="w-6 h-6 text-[#ff102a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {isZh ? '真实资金配置' : 'Real Capital Access'}
              </h3>
              <p className="text-gray-400 text-sm">
                {isZh ? '通过考核后获得真实资金管理权限' : 'Get real capital management rights after passing assessment'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#0a0a0a] border border-gray-900 p-8  hover:border-[#ff102a]/50 transition-all duration-500"
            >
              <div className="w-12 h-12 mb-4 flex items-center justify-center bg-[#ff102a]/10 border border-[#ff102a]/30">
                <svg className="w-6 h-6 text-[#ff102a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {isZh ? '专业导师指导' : 'Professional Mentorship'}
              </h3>
              <p className="text-gray-400 text-sm">
                {isZh ? '经验丰富的交易员一对一指导' : 'One-on-one guidance from experienced traders'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-3 bg-[#0a0a0a] border border-gray-900 p-10  hover:border-[#ff102a]/50 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#ff102a]/10 border border-[#ff102a]/30">
                  <svg className="w-6 h-6 text-[#ff102a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {isZh ? '系统化培训体系' : 'Systematic Training System'}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {isZh
                      ? '从基础理论到实战操作，完整的培训路径，确保每个阶段都有明确的目标和考核标准。我们的培训体系涵盖技术分析、基本面分析、风险管理、交易心理学等核心模块，通过理论学习、模拟交易、实盘考核的渐进式培养，帮助你建立完整的交易系统。'
                      : 'From basic theory to live trading, complete training path with clear goals and assessment criteria at each stage. Our training system covers technical analysis, fundamental analysis, risk management, trading psychology and other core modules, helping you build a complete trading system through progressive cultivation of theoretical learning, demo trading, and live assessment.'}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-black/30 ">
                      <div className="text-2xl font-bold text-[#ff102a] mb-1">30+</div>
                      <div className="text-xs text-gray-500 uppercase">{isZh ? '课程模块' : 'Modules'}</div>
                    </div>
                    <div className="text-center p-4 bg-black/30 ">
                      <div className="text-2xl font-bold text-[#ff102a] mb-1">1:1</div>
                      <div className="text-xs text-gray-500 uppercase">{isZh ? '导师指导' : 'Mentorship'}</div>
                    </div>
                    <div className="text-center p-4 bg-black/30 ">
                      <div className="text-2xl font-bold text-[#ff102a] mb-1">24/7</div>
                      <div className="text-xs text-gray-500 uppercase">{isZh ? '社群支持' : 'Support'}</div>
                    </div>
                    <div className="text-center p-4 bg-black/30 ">
                      <div className="text-2xl font-bold text-[#ff102a] mb-1">100%</div>
                      <div className="text-xs text-gray-500 uppercase">{isZh ? '实战导向' : 'Practical'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TRAINING PHASES - TIMELINE */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
              {isZh ? '培训路径' : 'TRAINING PATH'}
            </h2>
            <div className="w-20 h-1 bg-[#ff102a] mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {isZh
                ? '30天系统化培训，5个阶段逐步晋升，从新手到职业交易员'
                : '30-day systematic training, 5 progressive stages from beginner to professional trader'}
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                phase: '01',
                days: isZh ? '第1-10天' : 'DAY 1-10',
                title: isZh ? '基础理论学习' : 'Basic Theory',
                desc: isZh ? '学习外汇市场基础知识、技术分析、风险管理等核心概念' : 'Learn forex basics, technical analysis, risk management and core concepts',
                color: 'border-gray-800'
              },
              {
                phase: '02',
                days: isZh ? '第11-20天' : 'DAY 11-20',
                title: isZh ? '模拟交易实践' : 'Demo Trading Practice',
                desc: isZh ? '在模拟账户中应用所学知识，培养交易纪律和策略执行能力' : 'Apply learned knowledge in demo accounts, develop trading discipline and strategy execution',
                color: 'border-gray-700'
              },
              {
                phase: '03',
                days: isZh ? '第21-30天' : 'DAY 21-30',
                title: isZh ? '盈利考核' : 'Profit Assessment',
                desc: isZh ? '在模拟账户中证明盈利能力，达到10%盈利目标，验证交易系统有效性' : 'Prove profitability in demo account, achieve 10% profit target, verify trading system effectiveness',
                color: 'border-gray-600'
              },
              {
                phase: '04',
                days: isZh ? '第31-60天' : 'DAY 31-60',
                title: isZh ? '小额实盘' : 'Small Live Account',
                desc: isZh ? '使用小额真实资金交易，固化交易系统，适应真实市场心理压力' : 'Trade with small real capital, solidify trading system, adapt to real market psychological pressure',
                color: 'border-[#ff102a]/30'
              },
              {
                phase: '05',
                days: isZh ? '通过后' : 'AFTER PASSING',
                title: isZh ? '获得资金配置' : 'Get Funded',
                desc: isZh ? '成功通过考核，获得真实资金管理权限，开始职业交易生涯' : 'Successfully pass assessment, get real capital management rights, start professional trading career',
                color: 'border-[#ff102a]'
              }
            ].map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-[#0a0a0a] border-2 ${item.color} p-8  hover:border-[#ff102a] transition-all duration-500 group`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex items-center gap-4 md:min-w-[200px]">
                    <div className="text-5xl font-black text-white/10 group-hover:text-[#ff102a]/20 transition-colors">
                      {item.phase}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">{isZh ? '阶段' : 'PHASE'}</div>
                      <div className="text-sm font-bold text-[#ff102a]">{item.days}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#ff102a] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REQUIREMENTS */}
      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
              {isZh ? '申请要求' : 'REQUIREMENTS'}
            </h2>
            <div className="w-20 h-1 bg-[#ff102a] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Who Should NOT Apply */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] border border-red-900/30 p-10 "
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center bg-red-500/10 border border-red-500/30">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-red-400 mb-6">
                {isZh ? '不适合的人群' : 'NOT SUITABLE FOR'}
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>{isZh ? '寻求快速致富的人' : 'Those seeking quick riches'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>{isZh ? '缺乏纪律性和执行力' : 'Lack of discipline and execution'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>{isZh ? '无法承受压力和挫折' : 'Cannot handle pressure and setbacks'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>{isZh ? '没有时间投入学习' : 'No time for learning'}</span>
                </li>
              </ul>
            </motion.div>

            {/* Who SHOULD Apply */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#0a0a0a] border border-green-900/30 p-10 "
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center bg-green-500/10 border border-green-500/30">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-6">
                {isZh ? '理想候选人' : 'IDEAL CANDIDATES'}
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{isZh ? '愿意投入时间系统学习' : 'Willing to invest time in systematic learning'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{isZh ? '具备良好的自律能力' : 'Good self-discipline'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{isZh ? '能够承受压力和挫折' : 'Can handle pressure and setbacks'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{isZh ? '追求长期稳定收益' : 'Seeking long-term stable returns'}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. VIDEO RESOURCES */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
              {isZh ? '必看视频' : 'ESSENTIAL VIDEOS'}
            </h2>
            <div className="w-20 h-1 bg-[#ff102a] mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {isZh
                ? '观看这些视频，深入了解我们的培训体系和交易理念'
                : 'Watch these videos to understand our training system and trading philosophy'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.a
              href="https://www.bilibili.com/video/BV19a411X7eY"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group block bg-[#0a0a0a] border-2 border-gray-800  overflow-hidden hover:border-[#ff102a]/50 transition-all duration-500"
            >
              <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
                <div className="w-16 h-16  border-2 border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>
              <div className="p-8">
                <div className="text-xs text-[#ff102a] font-bold uppercase tracking-wider mb-2">
                  {isZh ? '必看' : 'MUST WATCH'}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#ff102a] transition-colors">
                  {t('video.doc1.title')}
                </h3>
                <p className="text-gray-400 text-sm">
                  {isZh ? '了解外汇交易的本质和我们的培训理念' : 'Understand the essence of forex trading and our training philosophy'}
                </p>
              </div>
            </motion.a>

            <motion.a
              href="https://www.bilibili.com/video/BV1FZ4y1o734"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group block bg-[#0a0a0a] border border-gray-900  overflow-hidden hover:border-[#ff102a]/50 transition-all duration-500"
            >
              <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
                <div className="w-16 h-16  border-2 border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>
              <div className="p-8">
                <div className="text-xs text-[#ff102a] font-bold uppercase tracking-wider mb-2">
                  {isZh ? '必看' : 'MUST WATCH'}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#ff102a] transition-colors">
                  {t('video.doc2.title')}
                </h3>
                <p className="text-gray-400 text-sm">
                  {isZh ? '深入了解交易心理和风险管理' : 'Deep dive into trading psychology and risk management'}
                </p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <PremiumCTA
        title={{
          zh: '准备好开启你的交易员生涯了吗？',
          en: 'Ready to Start Your Trading Career?'
        }}
        subtitle={{
          zh: '时间是唯一成本，淘汰是最大风险。准备就绪？预约面试。',
          en: 'Time is the only cost, elimination is the greatest risk. Ready? Schedule interview.'
        }}
        primaryButton={{
          text: { zh: '预约面试', en: 'Schedule Interview' },
          action: 'modal'
        }}
        secondaryButton={{
          text: { zh: '心理测试', en: 'Psychology Test' },
          action: 'link',
          link: `/${language}/splan/psychology-test`
        }}
        note={{
          zh: '提示：每人仅有一次机会',
          en: 'Note: One chance per person'
        }}
        onModalOpen={() => setIsEmailModalOpen(true)}
      />

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title={isZh ? '外汇交易员面试' : 'Forex Trader Interview'}
      />
    </div>
  );
}
