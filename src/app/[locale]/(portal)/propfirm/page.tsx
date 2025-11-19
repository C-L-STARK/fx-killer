"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import LocaleLink from '@/components/navigation/LocaleLink';
import UnifiedFormModal from '@/components/custom/UnifiedFormModal';

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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff102a]/10 border border-[#ff102a]/30 rounded-full mb-8">
              <span className="w-2 h-2 bg-[#ff102a] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[#ff102a]">
                {language === 'zh' ? 'FTMO 官方合作伙伴' : 'Official FTMO Partner'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
              {language === 'zh' ? (
                <>
                  <span className="text-white">汇刃</span>
                  <span className="text-[#ff102a]"> × </span>
                  <span className="text-white">FTMO</span>
                </>
              ) : (
                <>
                  <span className="text-white">FX Killer</span>
                  <span className="text-[#ff102a]"> × </span>
                  <span className="text-white">FTMO</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {language === 'zh'
                ? '成为职业交易员，管理最高 $200,000 资金，享受最高 90% 利润分成'
                : 'Become a professional trader, manage up to $200,000, enjoy up to 90% profit split'}
            </p>

            {/* Key Points */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
              {[
                language === 'zh' ? '零本金风险' : 'Zero Capital Risk',
                language === 'zh' ? '最高90%分成' : 'Up to 90% Split',
                language === 'zh' ? '费用首次返还' : 'Fee Refunded',
                language === 'zh' ? '免费培训支持' : 'Free Training',
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#ff102a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="px-8 py-4 bg-[#ff102a] text-white font-bold text-lg hover:bg-[#eb383e] transition-colors"
              >
                {language === 'zh' ? '选择计划开始挑战' : 'Choose Plan & Start'}
              </a>
              <a
                href="#process"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-black transition-colors"
              >
                {language === 'zh' ? '了解考核流程' : 'Learn Process'}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {language === 'zh' ? '为什么通过汇刃参加 FTMO' : 'Why Join FTMO Through FX Killer'}
          </h2>
          <div className="w-24 h-1 bg-[#ff102a] mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: language === 'zh' ? 'FTMO 官方合作' : 'Official Partner',
                desc: language === 'zh' ? '正规渠道，享受 FTMO 所有权益' : 'Official channel, all FTMO benefits',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: language === 'zh' ? '免费专业培训' : 'Free Training',
                desc: language === 'zh' ? '配套汇刃交易培训，提高通过率' : 'FX Killer training to improve pass rate',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                ),
                title: language === 'zh' ? '中文全程支持' : 'Chinese Support',
                desc: language === 'zh' ? '中文客服、教程资料、社群支持' : 'Chinese service, tutorials, community',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ),
                title: language === 'zh' ? '本地支付方式' : 'Local Payment',
                desc: language === 'zh' ? '支持支付宝、微信、银行卡' : 'Alipay, WeChat, Bank Transfer',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-black border border-gray-800 hover:border-[#ff102a] transition-colors"
              >
                <div className="w-12 h-12 bg-[#ff102a]/10 flex items-center justify-center mb-4 text-[#ff102a]">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {language === 'zh' ? '选择你的挑战计划' : 'Choose Your Challenge'}
          </h2>
          <div className="w-24 h-1 bg-[#ff102a] mx-auto mb-8" />

          {/* Currency Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-900 p-1">
              <button
                onClick={() => setCurrency('CNY')}
                className={`px-6 py-2 text-sm font-medium transition-colors ${
                  currency === 'CNY'
                    ? 'bg-[#ff102a] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                CNY (¥)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-6 py-2 text-sm font-medium transition-colors ${
                  currency === 'USD'
                    ? 'bg-[#ff102a] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-6 border ${
                  plan.popular
                    ? 'bg-[#ff102a]/10 border-[#ff102a]'
                    : 'bg-gray-900 border-gray-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#ff102a] text-white text-xs font-bold">
                    {language === 'zh' ? '热门' : 'Popular'}
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.size}</h3>
                  <div className="text-3xl font-black text-[#ff102a]">
                    {currency === 'CNY' ? `¥${plan.cnyPrice.toLocaleString()}` : `$${plan.usdPrice}`}
                  </div>
                </div>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{language === 'zh' ? '阶段1目标' : 'Phase 1'}</span>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{language === 'zh' ? '阶段2目标' : 'Phase 2'}</span>
                    <span className="font-medium">5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{language === 'zh' ? '日亏损限制' : 'Daily Loss'}</span>
                    <span className="font-medium">5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{language === 'zh' ? '总亏损限制' : 'Max Loss'}</span>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{language === 'zh' ? '利润分成' : 'Profit Split'}</span>
                    <span className="font-medium text-[#ff102a]">80-90%</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3 font-bold transition-colors ${
                  plan.popular
                    ? 'bg-[#ff102a] text-white hover:bg-[#eb383e]'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}>
                  {language === 'zh' ? '选择此计划' : 'Select Plan'}
                </button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            {language === 'zh'
              ? '* 考核费将在首次出金时全额返还'
              : '* Challenge fee refunded with first payout'}
          </p>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {language === 'zh' ? '考核流程' : 'Evaluation Process'}
          </h2>
          <div className="w-24 h-1 bg-[#ff102a] mx-auto mb-12" />

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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative p-8 ${
                  phase.highlight
                    ? 'bg-[#ff102a] text-white'
                    : 'bg-black border border-gray-800'
                }`}
              >
                <div className={`text-6xl font-black mb-4 ${
                  phase.highlight ? 'text-white/20' : 'text-[#ff102a]/20'
                }`}>
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold mb-4">{phase.title}</h3>
                <div className="mb-4">
                  <span className={`text-sm ${phase.highlight ? 'text-white/70' : 'text-gray-400'}`}>
                    {language === 'zh' ? '时间：' : 'Time: '}
                  </span>
                  <span className="font-medium">{phase.duration}</span>
                </div>
                <div className="mb-6">
                  <span className={`text-sm ${phase.highlight ? 'text-white/70' : 'text-gray-400'}`}>
                    {language === 'zh' ? '目标：' : 'Target: '}
                  </span>
                  <span className="font-bold text-lg">{phase.target}</span>
                </div>
                <ul className="space-y-2">
                  {phase.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex} className="flex items-center gap-2 text-sm">
                      <svg className={`w-4 h-4 ${phase.highlight ? 'text-white' : 'text-[#ff102a]'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {rule}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Rules */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {language === 'zh' ? '交易规则' : 'Trading Rules'}
          </h2>
          <div className="w-24 h-1 bg-[#ff102a] mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Allowed */}
            <div className="p-8 bg-gray-900 border border-gray-800">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {language === 'zh' ? '允许的操作' : 'Allowed'}
              </h3>
              <ul className="space-y-4">
                {[
                  language === 'zh' ? 'EA / 自动化交易' : 'EA / Automated Trading',
                  language === 'zh' ? '新闻时段交易' : 'News Trading',
                  language === 'zh' ? '持仓过周末' : 'Weekend Holding',
                  language === 'zh' ? '任意交易风格' : 'Any Trading Style',
                  language === 'zh' ? '复制交易（自己账户间）' : 'Copy Trading (Own Accounts)',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <span className="text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Conditions */}
            <div className="p-8 bg-gray-900 border border-gray-800">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#ff102a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {language === 'zh' ? '交易条件' : 'Trading Conditions'}
              </h3>
              <ul className="space-y-4">
                {[
                  { label: language === 'zh' ? '杠杆' : 'Leverage', value: '1:100' },
                  { label: language === 'zh' ? '交易品种' : 'Instruments', value: language === 'zh' ? '外汇、黄金、指数、原油、加密货币' : 'Forex, Gold, Indices, Oil, Crypto' },
                  { label: language === 'zh' ? '交易平台' : 'Platforms', value: 'MT4 / MT5 / cTrader' },
                  { label: language === 'zh' ? '交易时间' : 'Trading Hours', value: language === 'zh' ? '无限制' : 'Unlimited' },
                ].map((item, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scaling Plan */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {language === 'zh' ? '资金扩展计划' : 'Scaling Plan'}
          </h2>
          <div className="w-24 h-1 bg-[#ff102a] mx-auto mb-8" />
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            {language === 'zh'
              ? '每4个月周期达成10%盈利，资金增加25%，分成提升至90%，最高可达 $2,000,000'
              : 'Achieve 10% profit every 4 months, get 25% capital increase, 90% profit split, up to $2,000,000'}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            {['$10K', '$25K', '$50K', '$100K', '$200K', '$400K', '...', '$2M'].map((amount, index) => (
              <React.Fragment key={index}>
                <div className={`px-4 py-2 ${
                  amount === '...'
                    ? 'text-gray-500'
                    : amount === '$2M'
                    ? 'bg-[#ff102a] text-white font-bold'
                    : 'bg-gray-800 text-white'
                }`}>
                  {amount}
                </div>
                {index < 7 && (
                  <svg className="w-4 h-4 text-[#ff102a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {language === 'zh' ? '常见问题' : 'FAQ'}
          </h2>
          <div className="w-24 h-1 bg-[#ff102a] mx-auto mb-12" />

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
                className="group bg-gray-900 border border-gray-800"
              >
                <summary className="flex justify-between items-center cursor-pointer p-6 font-medium">
                  {item.q}
                  <svg
                    className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-400">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#ff102a]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'zh' ? '准备好开始了吗？' : 'Ready to Start?'}
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            {language === 'zh'
              ? '选择你的挑战计划，开启职业交易员之路'
              : 'Choose your challenge plan and start your journey'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              className="px-8 py-4 bg-white text-[#ff102a] font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              {language === 'zh' ? '选择计划' : 'Choose Plan'}
            </a>
            <LocaleLink
              href="/splan/join-us"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-[#ff102a] transition-colors"
            >
              {language === 'zh' ? '先参加培训' : 'Join Training First'}
            </LocaleLink>
            <a
              href="https://trader.ftmo.com/?affiliates=UUdNjacFYttdgsZcEozt"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-[#ff102a] transition-colors"
            >
              {language === 'zh' ? '访问 FTMO' : 'Visit FTMO'}
            </a>
          </div>
        </div>
      </section>

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
