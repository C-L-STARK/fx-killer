"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import LocaleLink from '@/components/navigation/LocaleLink';
import UnifiedFormModal from '@/components/custom/UnifiedFormModal';
import { SparklesCore } from '@/components/ui/sparkles';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { HoverCard, FadeInSlide } from '@/components/custom/AnimatedSection';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import ShineButton from '@/components/custom/ShineButton';

// 价格数据 (FTMO × 1.1)
const pricingPlans = [
  {
    size: '$10,000',
    eurPrice: 155,
    usdPrice: 187,
    cnyPrice: 1360,
    popular: false,
  },
  {
    size: '$25,000',
    eurPrice: 250,
    usdPrice: 302,
    cnyPrice: 2195,
    popular: false,
  },
  {
    size: '$50,000',
    eurPrice: 345,
    usdPrice: 417,
    cnyPrice: 3030,
    popular: true,
  },
  {
    size: '$100,000',
    eurPrice: 540,
    usdPrice: 653,
    cnyPrice: 4745,
    popular: true,
  },
  {
    size: '$200,000',
    eurPrice: 1080,
    usdPrice: 1306,
    cnyPrice: 9490,
    popular: false,
  },
];

export default function PropFirmPage() {
  const { language } = useLanguage();
  const [currency, setCurrency] = useState<'USD' | 'CNY'>('CNY');
  const [selectedPlan, setSelectedPlan] = useState<typeof pricingPlans[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPlan = (plan: typeof pricingPlans[0]) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const heroWords = language === 'zh' ? [
    { text: "汇刃", className: "text-white" },
    { text: "×", className: "text-[#ff102a]" },
    { text: "FTMO", className: "text-white" },
  ] : [
    { text: "FX Killer", className: "text-white" },
    { text: "×", className: "text-[#ff102a]" },
    { text: "FTMO", className: "text-white" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff102a]/10 border border-[#ff102a]/30 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-[#ff102a] animate-pulse" />
              <span className="text-sm font-medium text-[#ff102a] tracking-wide uppercase">
                {language === 'zh' ? 'FTMO 官方合作伙伴' : 'Official FTMO Partner'}
              </span>
            </div>

            {/* Title */}
            <div className="mb-8">
              <TypewriterEffect words={heroWords} className="text-5xl md:text-7xl lg:text-8xl font-black" cursorClassName="bg-[#ff102a]" />
            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {language === 'zh'
                ? '成为职业交易员，管理最高 $200,000 资金，享受最高 90% 利润分成'
                : 'Become a professional trader, manage up to $200,000, enjoy up to 90% profit split'}
            </p>

            {/* Key Points */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16">
              {[
                language === 'zh' ? '零本金风险' : 'Zero Capital Risk',
                language === 'zh' ? '最高90%分成' : 'Up to 90% Split',
                language === 'zh' ? '费用首次返还' : 'Fee Refunded',
                language === 'zh' ? '免费培训支持' : 'Free Training',
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/5 px-4 py-2 border border-white/10 backdrop-blur-sm">
                  <svg className="w-5 h-5 text-[#ff102a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-200 font-medium">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <ShineButton
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-[#ff102a] text-white font-bold text-lg hover:bg-[#eb383e] transition-all shadow-[0_0_20px_rgba(255,16,42,0.4)]"
              >
                {language === 'zh' ? '选择计划开始挑战' : 'Choose Plan & Start'}
              </ShineButton>
              <button
                onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-transparent border border-white/30 text-white font-bold text-lg hover:bg-white hover:text-black transition-all backdrop-blur-sm"
              >
                {language === 'zh' ? '了解考核流程' : 'Learn Process'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <BackgroundBeams className="opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              {language === 'zh' ? '为什么通过汇刃参加 FTMO' : 'Why Join FTMO Through FX Killer'}
            </h2>
            <div className="w-24 h-1.5 bg-[#ff102a] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: language === 'zh' ? 'FTMO 官方合作' : 'Official Partner',
                desc: language === 'zh' ? '正规渠道，享受 FTMO 所有权益' : 'Official channel, all FTMO benefits',
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: language === 'zh' ? '免费专业培训' : 'Free Training',
                desc: language === 'zh' ? '配套汇刃交易培训，提高通过率' : 'FX Killer training to improve pass rate',
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                ),
                title: language === 'zh' ? '中文全程支持' : 'Chinese Support',
                desc: language === 'zh' ? '中文客服、教程资料、社群支持' : 'Chinese service, tutorials, community',
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ),
                title: language === 'zh' ? '本地支付方式' : 'Local Payment',
                desc: language === 'zh' ? '支持支付宝、微信、银行卡' : 'Alipay, WeChat, Bank Transfer',
              },
            ].map((item, index) => (
              <FadeInSlide key={index} direction="up" delay={index * 0.1}>
                <HoverCard className="h-full">
                  <div className="p-8 bg-[#0a0a0a] border border-white/10 h-full hover:border-[#ff102a] transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff102a]/5 -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500" />
                    <div className="w-16 h-16 bg-[#ff102a]/10 flex items-center justify-center mb-6 text-[#ff102a] group-hover:bg-[#ff102a] group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </HoverCard>
              </FadeInSlide>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              {language === 'zh' ? '选择你的挑战计划' : 'Choose Your Challenge'}
            </h2>
            <div className="w-24 h-1.5 bg-[#ff102a] mx-auto mb-10" />

            {/* Currency Toggle */}
            <div className="inline-flex bg-black p-1.5 border border-gray-800">
              <button
                onClick={() => setCurrency('CNY')}
                className={`px-8 py-2.5 text-sm font-bold transition-all ${currency === 'CNY'
                    ? 'bg-[#ff102a] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                CNY (¥)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-8 py-2.5 text-sm font-bold transition-all ${currency === 'USD'
                    ? 'bg-[#ff102a] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                USD ($)
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col p-6 border transition-all duration-300 ${plan.popular
                    ? 'bg-[#ff102a]/5 border-[#ff102a] shadow-[0_0_30px_rgba(255,16,42,0.1)] scale-105 z-10'
                    : 'bg-[#0a0a0a] border-white/10 hover:border-white/30'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#ff102a] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    {language === 'zh' ? '热门选择' : 'Most Popular'}
                  </div>
                )}

                <div className="text-center mb-8 mt-2">
                  <h3 className="text-lg font-medium text-gray-400 mb-2">{plan.size}</h3>
                  <div className="text-3xl font-black text-white">
                    {currency === 'CNY' ? `¥${plan.cnyPrice.toLocaleString()}` : `$${plan.usdPrice}`}
                  </div>
                </div>

                <div className="space-y-4 text-sm mb-8 flex-grow">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400">{language === 'zh' ? '阶段1目标' : 'Phase 1'}</span>
                    <span className="font-bold text-white">10%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400">{language === 'zh' ? '阶段2目标' : 'Phase 2'}</span>
                    <span className="font-bold text-white">5%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400">{language === 'zh' ? '日亏损限制' : 'Daily Loss'}</span>
                    <span className="font-bold text-white">5%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400">{language === 'zh' ? '总亏损限制' : 'Max Loss'}</span>
                    <span className="font-bold text-white">10%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400">{language === 'zh' ? '利润分成' : 'Profit Split'}</span>
                    <span className="font-bold text-[#ff102a]">80-90%</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-4 font-bold text-sm uppercase tracking-wide transition-all ${plan.popular
                      ? 'bg-[#ff102a] text-white hover:bg-[#eb383e] shadow-lg hover:shadow-[#ff102a]/40'
                      : 'bg-white text-black hover:bg-gray-200'
                    }`}>
                  {language === 'zh' ? '选择此计划' : 'Select Plan'}
                </button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-12">
            {language === 'zh'
              ? '* 考核费将在首次出金时全额返还'
              : '* Challenge fee refunded with first payout'}
          </p>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              {language === 'zh' ? '考核流程' : 'Evaluation Process'}
            </h2>
            <div className="w-24 h-1.5 bg-[#ff102a] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: language === 'zh' ? 'FTMO 挑战赛' : 'FTMO Challenge',
                duration: language === 'zh' ? '无时间限制' : 'Unlimited',
                target: '10%',
                rules: [
                  language === 'zh' ? '日亏损 ≤ 5%' : 'Daily loss ≤ 5%',
                  language === 'zh' ? '总亏损 ≤ 10%' : 'Max loss ≤ 10%',
                  language === 'zh' ? '最少交易 4 天' : 'Min 4 trading days',
                ],
              },
              {
                step: '02',
                title: language === 'zh' ? '验证阶段' : 'Verification',
                duration: language === 'zh' ? '无时间限制' : 'Unlimited',
                target: '5%',
                rules: [
                  language === 'zh' ? '保持风控纪律' : 'Maintain risk discipline',
                  language === 'zh' ? '证明交易一致性' : 'Prove consistency',
                  language === 'zh' ? '最少交易 4 天' : 'Min 4 trading days',
                ],
              },
              {
                step: '03',
                title: language === 'zh' ? '正式交易员' : 'FTMO Trader',
                duration: language === 'zh' ? '持续' : 'Ongoing',
                target: language === 'zh' ? '无限制' : 'No limit',
                rules: [
                  language === 'zh' ? '80-90% 利润分成' : '80-90% profit split',
                  language === 'zh' ? '双周出金' : 'Bi-weekly payouts',
                  language === 'zh' ? '考核费返还' : 'Fee refunded',
                ],
                highlight: true,
              },
            ].map((phase, index) => (
              <FadeInSlide key={index} direction="up" delay={index * 0.2}>
                <div className={`relative p-10 h-full overflow-hidden transition-all duration-300 ${phase.highlight
                    ? 'bg-[#ff102a] text-white shadow-[0_10px_40px_rgba(255,16,42,0.3)]'
                    : 'bg-[#0a0a0a] border border-white/10 hover:border-white/30'
                  }`}>
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 opacity-10 font-black text-9xl -mr-4 -mt-8 pointer-events-none select-none">
                    {phase.step}
                  </div>

                  <div className="relative z-10">
                    <div className={`text-sm font-bold uppercase tracking-widest mb-2 ${phase.highlight ? 'text-white/80' : 'text-[#ff102a]'
                      }`}>
                      {language === 'zh' ? '阶段' : 'Step'} {phase.step}
                    </div>
                    <h3 className="text-2xl font-bold mb-8">{phase.title}</h3>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div>
                        <div className={`text-xs uppercase tracking-wider mb-1 ${phase.highlight ? 'text-white/70' : 'text-gray-500'}`}>
                          {language === 'zh' ? '时间' : 'Time'}
                        </div>
                        <div className="font-bold text-lg">{phase.duration}</div>
                      </div>
                      <div>
                        <div className={`text-xs uppercase tracking-wider mb-1 ${phase.highlight ? 'text-white/70' : 'text-gray-500'}`}>
                          {language === 'zh' ? '目标' : 'Target'}
                        </div>
                        <div className="font-bold text-lg">{phase.target}</div>
                      </div>
                    </div>

                    <div className={`h-px w-full mb-6 ${phase.highlight ? 'bg-white/20' : 'bg-white/10'}`} />

                    <ul className="space-y-3">
                      {phase.rules.map((rule, ruleIndex) => (
                        <li key={ruleIndex} className="flex items-center gap-3 text-sm font-medium">
                          <div className={`w-1.5 h-1.5 ${phase.highlight ? 'bg-white' : 'bg-[#ff102a]'}`} />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeInSlide>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Rules */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              {language === 'zh' ? '交易规则' : 'Trading Rules'}
            </h2>
            <div className="w-24 h-1.5 bg-[#ff102a] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Allowed */}
            <div className="p-10 bg-[#0a0a0a] border border-white/10">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-green-500">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {language === 'zh' ? '允许的操作' : 'Allowed'}
              </h3>
              <ul className="space-y-5">
                {[
                  language === 'zh' ? 'EA / 自动化交易' : 'EA / Automated Trading',
                  language === 'zh' ? '新闻时段交易' : 'News Trading',
                  language === 'zh' ? '持仓过周末' : 'Weekend Holding',
                  language === 'zh' ? '任意交易风格' : 'Any Trading Style',
                  language === 'zh' ? '复制交易（自己账户间）' : 'Copy Trading (Own Accounts)',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4 text-gray-300 text-lg">
                    <span className="w-6 h-6 bg-green-500/10 flex items-center justify-center text-green-500 text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Conditions */}
            <div className="p-10 bg-[#0a0a0a] border border-white/10">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[#ff102a]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {language === 'zh' ? '交易条件' : 'Trading Conditions'}
              </h3>
              <ul className="space-y-6">
                {[
                  { label: language === 'zh' ? '杠杆' : 'Leverage', value: '1:100' },
                  { label: language === 'zh' ? '交易品种' : 'Instruments', value: language === 'zh' ? '外汇、黄金、指数、原油、加密货币' : 'Forex, Gold, Indices, Oil, Crypto' },
                  { label: language === 'zh' ? '交易平台' : 'Platforms', value: 'MT4 / MT5 / cTrader' },
                  { label: language === 'zh' ? '交易时间' : 'Trading Hours', value: language === 'zh' ? '无限制' : 'Unlimited' },
                ].map((item, index) => (
                  <li key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-4 border-b border-white/5 last:border-0">
                    <span className="text-gray-400 font-medium">{item.label}</span>
                    <span className="text-white font-bold text-lg">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scaling Plan */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              {language === 'zh' ? '资金扩展计划' : 'Scaling Plan'}
            </h2>
            <div className="w-24 h-1.5 bg-[#ff102a] mx-auto mb-8" />
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {language === 'zh'
                ? '每4个月周期达成10%盈利，资金增加25%，分成提升至90%，最高可达 $2,000,000'
                : 'Achieve 10% profit every 4 months, get 25% capital increase, 90% profit split, up to $2,000,000'}
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-[#0a0a0a] -translate-y-1/2 hidden md:block" />

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 relative z-10">
              {['$10K', '$25K', '$50K', '$100K', '$200K', '$400K', '...', '$2M'].map((amount, index) => (
                <div key={index} className="flex flex-col items-center gap-4">
                  <div className={`w-4 h-4 border-4 hidden md:block ${amount === '$2M' ? 'border-[#ff102a] bg-black' : 'border-gray-800 bg-black'
                    }`} />
                  <div className={`px-4 py-3 font-bold w-full text-center transition-all ${amount === '...'
                      ? 'text-gray-500 bg-transparent'
                      : amount === '$2M'
                        ? 'bg-[#ff102a] text-white shadow-[0_0_20px_rgba(255,16,42,0.4)] scale-110'
                        : 'bg-[#1a1a1a] text-white border border-white/10'
                    }`}>
                    {amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              {language === 'zh' ? '常见问题' : 'FAQ'}
            </h2>
            <div className="w-24 h-1.5 bg-[#ff102a] mx-auto" />
          </div>

          <div className="space-y-4">
            {[
              {
                q: language === 'zh' ? '什么是 FTMO？' : 'What is FTMO?',
                a: language === 'zh'
                  ? 'FTMO 是全球领先的自营交易公司，为通过考核的交易员提供资金进行交易，交易员可获得高达90%的利润分成。'
                  : 'FTMO is a leading proprietary trading firm that provides funding to traders who pass their evaluation, with up to 90% profit split.',
              },
              {
                q: language === 'zh' ? '考核失败后怎么办？' : 'What if I fail the challenge?',
                a: language === 'zh'
                  ? '如果未能通过考核，您可以重新购买新的挑战计划。汇刃提供的培训可以帮助您提高通过率。'
                  : 'If you fail, you can purchase a new challenge. FX Killer training can help improve your pass rate.',
              },
              {
                q: language === 'zh' ? '如何提现利润？' : 'How do I withdraw profits?',
                a: language === 'zh'
                  ? '成为 FTMO 交易员后，您可以每两周申请一次出金。出金将在24-48小时内处理。'
                  : 'As an FTMO Trader, you can request withdrawals bi-weekly. Payouts are processed within 24-48 hours.',
              },
              {
                q: language === 'zh' ? '考核费什么时候返还？' : 'When is the fee refunded?',
                a: language === 'zh'
                  ? '考核费将在您首次成功出金时全额返还。'
                  : 'The challenge fee is fully refunded with your first successful payout.',
              },
              {
                q: language === 'zh' ? '通过汇刃和直接购买有什么区别？' : "What's the difference vs buying directly?",
                a: language === 'zh'
                  ? '通过汇刃购买可享受：免费交易培训、中文客服支持、本地支付方式（支付宝/微信）、中文社群支持。价格为 FTMO 官方价格的1.1倍（服务费）。'
                  : 'Through FX Killer: free trading training, Chinese support, local payment methods (Alipay/WeChat), Chinese community. Price is 1.1x FTMO official (service fee).',
              },
            ].map((item, index) => (
              <details
                key={index}
                className="group bg-[#0a0a0a] border border-white/10 overflow-hidden transition-all hover:border-white/30"
              >
                <summary className="flex justify-between items-center cursor-pointer p-6 font-bold text-lg select-none">
                  {item.q}
                  <svg
                    className="w-6 h-6 text-[#ff102a] group-open:rotate-180 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <BackgroundBeamsWithCollision className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            {language === 'zh' ? '准备好开始了吗？' : 'Ready to Start?'}
          </h2>
          <p className="text-white/80 mb-12 text-xl max-w-2xl mx-auto">
            {language === 'zh'
              ? '选择你的挑战计划，开启职业交易员之路'
              : 'Choose your challenge plan and start your journey'}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <ShineButton
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-5 bg-[#ff102a] text-white font-bold text-xl hover:bg-[#eb383e] transition-all shadow-[0_0_30px_rgba(255,16,42,0.4)]"
            >
              {language === 'zh' ? '选择计划' : 'Choose Plan'}
            </ShineButton>
            <LocaleLink
              href="/splan/join-us"
              className="px-12 py-5 bg-transparent border border-white/30 text-white font-bold text-xl hover:bg-white hover:text-black transition-all backdrop-blur-sm"
            >
              {language === 'zh' ? '先参加培训' : 'Join Training First'}
            </LocaleLink>
          </div>
          <div className="mt-12">
            <a
              href="https://trader.ftmo.com/?affiliates=UUdNjacFYttdgsZcEozt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors text-sm border-b border-gray-500 hover:border-white pb-0.5"
            >
              {language === 'zh' ? '访问 FTMO 官网' : 'Visit FTMO Official Site'}
            </a>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      {/* Plan Selection Modal */}
      <UnifiedFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formType="propfirm"
        planData={selectedPlan ? {
          size: selectedPlan.size,
          usdPrice: selectedPlan.usdPrice,
          cnyPrice: selectedPlan.cnyPrice,
        } : undefined}
      />
    </div>
  );
}
