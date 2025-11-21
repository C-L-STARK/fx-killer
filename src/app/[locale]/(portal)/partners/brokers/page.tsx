"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function PartnerBrokersPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  // Partner broker data - real FX Killer partners
  const brokers = [
    {
      id: 'ec-markets',
      name: 'EC Markets',
      regulation: isZh ? 'ASIC & CySEC 双重监管' : 'ASIC & CySEC Dual Regulated',
      regulationNumber: isZh ? 'ASIC 648 / CySEC 258/14' : 'ASIC 648 / CySEC 258/14',
      features: [
        isZh ? '点差: EUR/USD 0.0起 + $3佣金' : 'Spread: EUR/USD from 0.0 + $3 commission',
        isZh ? '杠杆: 最高1:500' : 'Leverage: Up to 1:500',
        isZh ? '最低入金: $200' : 'Min Deposit: $200',
        isZh ? 'ECN账户超低点差' : 'ECN accounts with ultra-low spreads',
      ],
      suitableFor: isZh ? '专业交易者、剥头皮策略、EA交易' : 'Professional Traders, Scalpers, EA Trading',
      description: isZh
        ? 'EC Markets受澳大利亚ASIC和塞浦路斯CySEC双重监管，提供真实ECN账户，点差从0.0起。执行速度快，支持剥头皮和EA交易，适合专业交易者和高频策略。'
        : 'EC Markets is dual regulated by Australian ASIC and Cyprus CySEC, offering true ECN accounts with spreads from 0.0. Fast execution, supports scalping and EA trading, suitable for professional traders and high-frequency strategies.',
      link: 'https://i.ecmarkets.com/api/client/pm/2/99R9C',
    },
    {
      id: 'tickmill',
      name: 'TickMill',
      regulation: isZh ? 'FCA & CySEC & FSCA 监管' : 'FCA & CySEC & FSCA Regulated',
      regulationNumber: isZh ? 'FCA 717270 / CySEC 278/15' : 'FCA 717270 / CySEC 278/15',
      features: [
        isZh ? '点差: EUR/USD 0.1起' : 'Spread: EUR/USD from 0.1',
        isZh ? '杠杆: 最高1:500' : 'Leverage: Up to 1:500',
        isZh ? '负余额保护' : 'Negative balance protection',
        isZh ? '多种账户类型' : 'Multiple account types',
      ],
      suitableFor: isZh ? '所有级别交易者、多元化需求' : 'All Level Traders, Diverse Needs',
      description: isZh
        ? 'TickMill受英国FCA、塞浦路斯CySEC及南非FSCA三重监管，提供多种账户类型满足不同需求。点差低至0.1点，负余额保护，资金安全有保障，适合各级别交易者。'
        : 'TickMill is triple regulated by UK FCA, Cyprus CySEC and South Africa FSCA, offering multiple account types for different needs. Spreads as low as 0.1 pips, negative balance protection, fund security guaranteed, suitable for all level traders.',
      link: 'https://my.tickmill.com?utm_campaign=ib_link&utm_content=IB47958600&utm_medium=Open+Account&utm_source=link&lp=https%3A%2F%2Fmy.tickmill.com%2Fzh%2Fsign-up%2F',
    },
  ];

  const selectionCriteria = [
    {
      icon: '🛡️',
      title: isZh ? '严格监管' : 'Strict Regulation',
      description: isZh
        ? '仅推荐受FCA、ASIC、NFA、CySEC等顶级监管机构监管的经纪商，确保资金安全和交易透明。'
        : 'Only recommend brokers regulated by top-tier authorities like FCA, ASIC, NFA, CySEC, ensuring fund security and trading transparency.',
    },
    {
      icon: '💰',
      title: isZh ? '合理成本' : 'Reasonable Costs',
      description: isZh
        ? '综合评估点差、佣金、隔夜利息等总体交易成本，为您筛选性价比最高的平台。'
        : 'Comprehensive evaluation of spreads, commissions, swaps and total trading costs, selecting best value platforms.',
    },
    {
      icon: '⚡',
      title: isZh ? '优质执行' : 'Quality Execution',
      description: isZh
        ? '订单执行速度快，滑点控制良好，无频繁拒绝成交，确保交易策略得以有效实施。'
        : 'Fast order execution, good slippage control, no frequent rejections, ensuring effective strategy implementation.',
    },
    {
      icon: '🔄',
      title: isZh ? '出金保障' : 'Withdrawal Protection',
      description: isZh
        ? '出金流程透明快捷，无隐藏门槛，客户评价良好，保障您的盈利能够顺利提取。'
        : 'Transparent and fast withdrawal process, no hidden barriers, good customer reviews, ensuring smooth profit withdrawal.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Hero Section */}
      <section className="bg-black dark:bg-white text-white dark:text-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-gray-50 dark:bg-black text-black dark:text-white text-xs font-bold mb-6 border-2 border-white dark:border-black">
              {isZh ? 'FX KILLER 合作伙伴' : 'FX KILLER PARTNERS'}
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              {isZh ? 'FX Killer 合作经纪商' : 'FX Killer Partner Brokers'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 dark:text-gray-700">
              {isZh
                ? '经过严格筛选的可信赖外汇经纪商'
                : 'Carefully Vetted and Trustworthy Forex Brokers'}
            </p>
          </div>
        </div>
      </section>

      {/* Selection Criteria */}
      <section className="py-20 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              {isZh ? '我们的筛选标准' : 'Our Selection Criteria'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {isZh
                ? 'FX Killer只推荐满足以下所有标准的经纪商，为您的交易安全保驾护航'
                : 'FX Killer only recommends brokers meeting all the following criteria, safeguarding your trading security'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {selectionCriteria.map((criterion, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-black p-8 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group"
              >
                <div className="text-5xl mb-6">{criterion.icon}</div>
                <h3 className="text-2xl font-black mb-4 text-black dark:text-white group-hover:text-white dark:group-hover:text-black">
                  {criterion.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-600">
                  {criterion.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Broker Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              {isZh ? '推荐经纪商' : 'Recommended Brokers'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {isZh
                ? '以下经纪商均经过FX Killer团队严格审核，符合我们的所有筛选标准'
                : 'All brokers below have been rigorously vetted by the FX Killer team and meet all our selection criteria'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {brokers.map((broker) => (
              <div
                key={broker.id}
                className="bg-gray-50 dark:bg-[#0a0a0a] border-2 border-black dark:border-white p-8"
              >
                {/* Broker Header */}
                <div className="mb-6 pb-6 border-b-2 border-black dark:border-white">
                  <h3 className="text-3xl font-black text-black dark:text-white mb-3">
                    {broker.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-bold border border-green-600">
                      {broker.regulation}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                    {broker.regulationNumber}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-black dark:text-white mb-4">
                    {isZh ? '主要特点' : 'Key Features'}
                  </h4>
                  <ul className="space-y-2">
                    {broker.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-black dark:text-white font-bold mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suitable For */}
                <div className="mb-6 p-4 bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700">
                  <p className="text-sm font-bold text-black dark:text-white mb-2">
                    {isZh ? '适合人群：' : 'Suitable For:'}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{broker.suitableFor}</p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {broker.description}
                </p>

                {/* CTA Button */}
                <a
                  href={broker.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-4 bg-black dark:bg-white text-white dark:text-black text-center font-bold text-lg border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all"
                >
                  {isZh ? '访问官网 →' : 'Visit Website →'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 bg-yellow-50 dark:bg-yellow-900/20 border-y-2 border-yellow-600">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-start gap-4">
            <span className="text-4xl">⚠️</span>
            <div>
              <h3 className="text-2xl font-black text-black dark:text-white mb-4">
                {isZh ? '重要提示' : 'Important Notice'}
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">•</span>
                  <span>
                    {isZh
                      ? '外汇交易存在风险，过往表现不代表未来结果。请根据自身情况谨慎选择。'
                      : 'Forex trading involves risk. Past performance does not guarantee future results. Choose carefully based on your situation.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">•</span>
                  <span>
                    {isZh
                      ? '推荐经纪商并非投资建议。我们鼓励您独立研究并验证监管信息。'
                      : 'Recommended brokers are not investment advice. We encourage independent research and regulation verification.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">•</span>
                  <span>
                    {isZh
                      ? 'FX Killer可能从部分推荐链接中获得佣金，但这不影响我们的筛选标准。'
                      : 'FX Killer may receive commission from some referral links, but this does not affect our selection criteria.'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-black dark:bg-white text-white dark:text-black p-12 border-2 border-black dark:border-white text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              {isZh ? '还不确定如何选择？' : 'Still Unsure How to Choose?'}
            </h2>
            <p className="text-xl mb-8 text-gray-300 dark:text-gray-700">
              {isZh
                ? '阅读我们的详细指南，了解选择经纪商的所有关键因素'
                : 'Read our comprehensive guide to learn all key factors in broker selection'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/education/broker-selection-guide"
                className="px-10 py-4 bg-gray-50 dark:bg-black text-black dark:text-white font-bold text-lg border-2 border-white dark:border-black hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:hover:text-black transition-all"
              >
                {isZh ? '经纪商选择指南' : 'Broker Selection Guide'}
              </Link>
              <Link
                href="/splan/psychology-test"
                className="px-10 py-4 bg-transparent text-white dark:text-black font-bold text-lg border-2 border-white dark:border-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all"
              >
                {isZh ? '免费心理测评' : 'Free Psychology Test'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
