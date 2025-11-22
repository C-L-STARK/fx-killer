"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { HeroBackground } from '@/components/ui/hero-background';
import Testimonials from '@/components/custom/Testimonials';
import EmailContactModal from '@/components/custom/EmailContactModal';
import { LampContainer } from '@/components/ui/lamp';

// --- Components ---

const SectionDivider = () => (
  <div className="relative py-1 bg-gradient-to-r from-transparent via-[#ff102a] to-transparent opacity-30"></div>
);

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-white/10">
      <button
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-[#ff102a]' : 'text-white group-hover:text-[#ff102a]'}`}>
          {question}
        </span>
        <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-[#ff102a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function LandingPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const openContact = () => setIsEmailModalOpen(true);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ff102a] selection:text-white font-sans overflow-hidden">

      {/* 1. HERO SECTION - HARDCORE INCUBATOR */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <HeroBackground />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 border border-[#ff102a] text-[#ff102a] text-sm font-bold tracking-widest uppercase mb-6 bg-[#ff102a]/5 animate-pulse">
              {isZh ? '汇刃 | 职业交易员孵化' : 'FX KILLER | PRO TRADER INCUBATION'}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-tight mb-8">
              {isZh ? (
                <>
                  我们不招聘<span className="text-gray-500 line-through decoration-[#ff102a] decoration-4">专家</span><br />
                  只筛选<span className="text-[#ff102a]">幸存者</span>
                </>
              ) : (
                <>
                  WE DON'T HIRE <span className="text-gray-500 line-through decoration-[#ff102a] decoration-4">EXPERTS</span><br />
                  WE SCREEN <span className="text-[#ff102a]">SURVIVORS</span>
                </>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              {isZh
                ? '30个工作日，一张白纸，层层滤网。决定你是否属于那 1% 的顶尖猎手。'
                : '30 working days. A blank sheet. Strict filters. Decide if you belong to the top 1% hunters.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openContact}
                className="px-12 py-5 bg-[#ff102a] text-white text-xl font-black uppercase tracking-widest border border-[#ff102a] hover:bg-[#eb383e] shadow-[0_0_30px_rgba(255,16,42,0.4)] hover:shadow-[0_0_50px_rgba(255,16,42,0.6)] transition-all"
              >
                {isZh ? '申请进入汇刃' : 'ENTER FX KILLER'}
              </motion.button>
              <p className="text-sm text-gray-500 font-mono uppercase tracking-widest">
                {isZh ? '通过率 < 18%' : 'PASS RATE < 18%'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#ff102a]"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      <SectionDivider />

      {/* 2. THE REALITY CHECK (MANIFESTO) - NEW */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-5"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase leading-tight">
                {isZh ? '你的样子' : 'WHO ARE YOU?'}
              </h2>
              <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                <p>
                  {isZh
                    ? '在交易的世界里，有些人天生不适合。他们急于求成，却不知自己真正追求什么；他们只瞥一眼表象，便止步不前。'
                    : 'In the trading world, some are naturally unfit. They rush for success without knowing what they truly seek; they stop at the surface.'}
                </p>
                <p>
                  {isZh
                    ? '或者，他们压根就该选择那些“稳定”的岗位——当一天和尚，敲一天钟，过着可预测的日子。这不是贬低，而是现实。'
                    : 'Or, they should choose "stable" jobs—ringing the bell like a monk, living predictable lives. This isn\'t an insult, it\'s reality.'}
                </p>
                <p className="text-white font-bold text-xl border-l-4 border-[#ff102a] pl-6">
                  {isZh
                    ? '交易如战场，需要冷静、洞察与韧性。如果你属于前者，请离开。'
                    : 'Trading is a battlefield requiring calm, insight, and resilience. If you are the former, please leave.'}
                </p>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-[#ff102a] blur-[100px] opacity-20"></div>
              <div className="relative bg-[#0a0a0a] border border-white/10 p-8 md:p-12">
                <h3 className="text-2xl font-bold text-[#ff102a] mb-6 uppercase">
                  {isZh ? '残酷的真相' : 'THE BRUTAL TRUTH'}
                </h3>
                <ul className="space-y-4">
                  {[
                    isZh ? '任何盈利导向的企业，都不会做亏本买卖。' : 'No profit-driven business makes losing deals.',
                    isZh ? '你的收入，永远小于你创造的价值。' : 'Your income is always less than the value you create.',
                    isZh ? '在我们这个极简行业，所有价值都源于二级市场的买卖差价。' : 'In this industry, all value comes from market spreads.',
                    isZh ? '在你证明盈利能力之前，我们不会投入一分钱。' : 'We won\'t invest a cent until you prove profitability.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-[#ff102a] font-bold text-xl">!</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 3. TALENT PHILOSOPHY - NEW */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase">
            {isZh ? '选拔哲学' : 'SELECTION PHILOSOPHY'}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {isZh ? '这是一场长期、严苛的“万里挑一”。匹配度决定一切。' : 'A long, rigorous "one in a million" selection. Fit is everything.'}
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10">
          {/* The Old Way */}
          <div className="p-12 bg-[#0a0a0a] border-r border-white/10 grayscale opacity-60 hover:opacity-100 transition-all duration-500">
            <h3 className="text-3xl font-black text-gray-500 mb-8 uppercase flex items-center gap-4">
              <span className="w-10 h-10 border border-gray-600 flex items-center justify-center text-xl">×</span>
              {isZh ? '所谓的“专家”' : 'THE "EXPERTS"'}
            </h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              {isZh
                ? '有人质疑我们对年龄的偏好。迷信银行、证券背景才是专家。但国内多数“经验丰富”的中年交易员，往往是失败者：不良习惯缠身，或在不上不下的泥沼中挣扎。'
                : 'People question our age preference. But most "experienced" middle-aged traders are failures: plagued by bad habits, struggling in mediocrity.'}
            </p>
            <div className="text-gray-600 font-mono text-sm uppercase tracking-widest">
              {isZh ? '经验有时是枷锁' : 'EXPERIENCE IS A SHACKLE'}
            </div>
          </div>

          {/* The New Way */}
          <div className="p-12 bg-black relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff102a]/10 blur-3xl group-hover:bg-[#ff102a]/20 transition-colors"></div>
            <h3 className="text-3xl font-black text-white mb-8 uppercase flex items-center gap-4">
              <span className="w-10 h-10 bg-[#ff102a] flex items-center justify-center text-xl text-white">✓</span>
              {isZh ? '一张白纸' : 'BLANK SHEET'}
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              {isZh
                ? '真正适配的是20-35岁的年轻人：学习迅捷、适应力强，能直面市场风暴。我们科学避开错误定式、糟粕习惯——一张白纸，好作画。'
                : 'We want 20-35 year olds: fast learners, adaptable. We scientifically avoid bad habits. A blank sheet is best for painting.'}
            </p>
            <div className="text-[#ff102a] font-mono text-sm uppercase tracking-widest font-bold">
              {isZh ? '最佳入行时机：越早越好' : 'START EARLY'}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 4. MISSION (SCREENING & TRAINING) */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase">
              {isZh ? '我们的使命' : 'OUR MISSION'}
            </h2>
            <div className="w-20 h-1 bg-[#ff102a] mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              {isZh
                ? '我们致力于用最短的时间，从大量人群中筛选出少数适合做交易的人才，并进行培养和资金支持。'
                : 'We aim to screen out the few suitable talents from the masses in the shortest time, providing training and capital support.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: isZh ? '严苛筛选' : 'Strict Screening',
                desc: isZh ? '30个工作日内，判断匹配度。若不适，我们诚恳建议转行——这行不适合所有人，仅少数人天生契合。' : 'Within 30 days, we judge the fit. If not suitable, we sincerely suggest changing careers. This is for the few.',
                icon: 'M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8M9 10a2 2 0 012-2h2a2 2 0 012 2'
              },
              {
                title: isZh ? '军事化训练' : 'Military Training',
                desc: isZh ? '这是一所交易员的“黄埔军校”。我们科学避开错误定式，让你直达专家10-20年的盈利高度。' : 'This is the "West Point" for traders. We scientifically avoid common pitfalls, fast-tracking you to the profitability level of a 10-20 year expert.',
                icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
              },
              {
                title: isZh ? '利益共同体' : 'Shared Destiny',
                desc: isZh ? '通过考核后，我们是战友。你负责前线作战（交易），我们提供枪支弹药（资金）。战利品（利润）你拿大头，最高90%。' : 'After passing, we are comrades. You fight on the front line (trade), we provide ammo (capital). You keep the lion\'s share of the loot (profit), up to 90%.',
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#111] border border-white/5 p-8 hover:border-[#ff102a] transition-all group hover:-translate-y-2 duration-300">
                <div className="w-16 h-16 bg-[#ff102a]/10 flex items-center justify-center mb-6 group-hover:bg-[#ff102a] transition-colors">
                  <svg className="w-8 h-8 text-[#ff102a] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 5. 30-DAY COMBAT PLAN (CURRICULUM) - EXPANDED */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">
                {isZh ? '30天作战计划' : '30-DAY COMBAT PLAN'}
              </h2>
              <p className="text-[#ff102a] text-lg font-bold tracking-widest uppercase">
                FROM ZERO TO HERO
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {/* Week 1 */}
            <div className="relative pl-12 border-l-2 border-white/10">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-[#ff102a] rounded-full"></div>
              <div className="mb-2 text-[#ff102a] font-mono font-bold tracking-widest uppercase">{isZh ? '第 1-3 天' : 'DAY 1-3'}</div>
              <h3 className="text-3xl font-black text-white mb-4">{isZh ? '规则内化' : 'RULES INTERNALIZATION'}</h3>
              <p className="text-gray-400 max-w-2xl mb-6">
                {isZh
                  ? '完成规则练习，尽快熟悉交易系统的基本规则。15个标准进场点不出错。'
                  : 'Complete rule practice. Master basic system rules. 15 standard entry points without error.'}
              </p>
              <div className="inline-block bg-[#ff102a]/10 text-[#ff102a] px-4 py-2 font-bold text-sm border border-[#ff102a]/30">
                {isZh ? '⚠️ 3天不能完成规则考核，劝退处理' : '⚠️ Fail in 3 days = Dismissal'}
              </div>
            </div>

            {/* Week 2 */}
            <div className="relative pl-12 border-l-2 border-white/10">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white rounded-full"></div>
              <div className="mb-2 text-white font-mono font-bold tracking-widest uppercase">{isZh ? '第 3-10 天' : 'DAY 3-10'}</div>
              <h3 className="text-3xl font-black text-white mb-4">{isZh ? '寻找武器' : 'FIND YOUR WEAPON'}</h3>
              <p className="text-gray-400 max-w-2xl mb-6">
                {isZh
                  ? '找到适合自己的品种（先找4-6个观察，稳定到2个）。观察品种的周期、空间、回撤力度。'
                  : 'Find your pairs (start with 4-6, narrow to 2). Observe cycles, space, and drawdown intensity.'}
              </p>
            </div>

            {/* Week 3-4 */}
            <div className="relative pl-12 border-l-2 border-white/10">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white rounded-full"></div>
              <div className="mb-2 text-white font-mono font-bold tracking-widest uppercase">{isZh ? '第 10-20 天' : 'DAY 10-20'}</div>
              <h3 className="text-3xl font-black text-white mb-4">{isZh ? '盈利考核' : 'PROFIT ASSESSMENT'}</h3>
              <p className="text-gray-400 max-w-2xl mb-6">
                {isZh
                  ? '把每一天都当做考核。务必不能犯低级错误（入场、出场、止损）。做到操作一致性。'
                  : 'Treat every day as assessment. No low-level errors. Achieve operational consistency.'}
              </p>
              <div className="bg-[#111] p-6 border border-white/10 max-w-2xl">
                <h4 className="text-white font-bold mb-2 uppercase">{isZh ? '考核要求' : 'REQUIREMENTS'}</h4>
                <p className="text-gray-400 text-sm">
                  {isZh
                    ? '连续 10 个工作日，每天做到所选交易品种（2 个最佳）不错单、不漏单、不亏损。'
                    : '10 consecutive working days: No errors, no missed trades, no losses on selected pairs.'}
                </p>
              </div>
            </div>

            {/* Phase 2: Live */}
            <div className="relative pl-12 border-l-2 border-[#ff102a]">
              <div className="absolute -left-[11px] top-0 w-6 h-6 bg-[#ff102a] shadow-[0_0_20px_rgba(255,16,42,0.5)] rounded-full flex items-center justify-center text-black font-bold text-xs">!</div>
              <div className="mb-2 text-[#ff102a] font-mono font-bold tracking-widest uppercase">{isZh ? '下一阶段' : 'NEXT PHASE'}</div>
              <h3 className="text-3xl font-black text-white mb-4">{isZh ? '小额实盘 (20天)' : 'SMALL LIVE (20 DAYS)'}</h3>
              <p className="text-gray-400 max-w-2xl mb-6">
                {isZh
                  ? '只有一次机会。日回撤不超过20%，周总回撤不超过30%。证明你在真实金钱压力下的生存能力。'
                  : 'One chance only. Daily drawdown <20%, Weekly <30%. Prove survival under real money pressure.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 6. CAREER EVOLUTION - NEW */}
      <section className="py-32 bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase">
              {isZh ? '职业进化' : 'CAREER EVOLUTION'}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {isZh ? '从单兵作战到指挥千军万马' : 'From Solo Soldier to Army Commander'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Soldier */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black transform -skew-y-3"></div>
              <div className="relative p-10 border border-white/10 bg-black/50 backdrop-blur-sm hover:border-white/30 transition-all">
                <div className="text-6xl mb-6 opacity-20 font-black text-white">01</div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase">{isZh ? '交易员 (士兵)' : 'TRADER (SOLDIER)'}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {isZh
                    ? '30个工作日内，密集训练，穿越筛网。通过考核，正式入队，开启分成生涯。你是一名战场勇者：杀手、雇佣兵、孤狼。'
                    : 'Intensive training. Pass the screen. Join the team. Start profit sharing. You are a battlefield hero: killer, mercenary, lone wolf.'}
                </p>
                <ul className="space-y-2 text-sm text-gray-500 font-mono">
                  <li>• {isZh ? '独立思考' : 'Independent Thinking'}</li>
                  <li>• {isZh ? '勇敢直面' : 'Face the Market'}</li>
                  <li>• {isZh ? '与团队长共享收益' : 'Share Profit with Leader'}</li>
                </ul>
              </div>
            </div>

            {/* Commander */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-l from-[#ff102a]/10 to-black transform skew-y-3"></div>
              <div className="relative p-10 border border-[#ff102a]/30 bg-black/50 backdrop-blur-sm hover:border-[#ff102a] transition-all">
                <div className="text-6xl mb-6 opacity-20 font-black text-[#ff102a]">02</div>
                <h3 className="text-3xl font-black text-[#ff102a] mb-4 uppercase">{isZh ? '团队长 (军官)' : 'LEADER (COMMANDER)'}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {isZh
                    ? '前线历练后，若心动，组建团队。训新兵、述战史，你退居指挥所：分配资金、策略，监视、分享剩余价值。'
                    : 'After the frontline, build a team. Train recruits. Retreat to command: allocate capital, strategy. Share surplus value.'}
                </p>
                <ul className="space-y-2 text-sm text-[#ff102a] font-mono font-bold">
                  <li>• {isZh ? '财务自由' : 'Financial Freedom'}</li>
                  <li>• {isZh ? '被动收入' : 'Passive Income'}</li>
                  <li>• {isZh ? '指挥作战' : 'Command Operations'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 7. IRON RULES (DISCIPLINE) */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#ff102a]/5 skew-x-12"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="text-4xl md:text-5xl font-black text-[#ff102a] mb-6 uppercase">
                {isZh ? '交易铁律' : 'IRON RULES'}
              </h2>
              <p className="text-xl text-white font-bold mb-6">
                {isZh ? '触碰一次即刻劝退' : 'One Strike, You\'re Out'}
              </p>
              <p className="text-gray-400 leading-relaxed">
                {isZh
                  ? '交易纪律就像法律，触碰红线就再也无法进入矩阵团队。交易就像做手术，务必严肃，容不得任何不遵守规则的人。'
                  : 'Trading discipline is law. Touch the red line and you are out forever. Trading is like surgery; it requires absolute seriousness.'}
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                isZh ? '硬止损线不能移动' : 'Never Move Hard Stop Loss',
                isZh ? '仅限标准/激进进场' : 'Standard/Aggressive Entries Only',
                isZh ? '严禁跨越红折线持仓' : 'No Holding Across Red Line',
                isZh ? '5倍以上利润才可止盈' : 'Min 5x Profit for Take Profit',
                isZh ? '止损/出场必须满足条件' : 'Strict Exit Conditions',
                isZh ? '学员间不得私下联系' : 'No Private Contact Between Students'
              ].map((rule, i) => (
                <div key={i} className="flex items-center gap-4 bg-black p-6 border-l-4 border-[#ff102a]">
                  <div className="w-2 h-2 bg-[#ff102a] rounded-full animate-pulse"></div>
                  <span className="text-white font-bold text-lg">{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. QUALIFICATION */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase">
              {isZh ? '准入条件' : 'QUALIFICATION'}
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              {isZh ? '我们寻找的是精英，而非赌徒。' : 'We look for elites, not gamblers.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Required */}
            <div className="bg-[#0a0a0a] p-10 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-[#ff102a]">►</span> {isZh ? '基本要求' : 'Requirements'}
              </h3>
              <ul className="space-y-6">
                {[
                  { label: isZh ? '年龄' : 'Age', val: isZh ? '20 - 35 岁 (学习能力强)' : '20 - 35 Years Old' },
                  { label: isZh ? '学历' : 'Education', val: isZh ? '大专及以上' : 'College Degree+' },
                  { label: isZh ? '设备' : 'Equipment', val: isZh ? 'Windows 电脑 + 独立环境' : 'Windows PC + Private Room' },
                  { label: isZh ? '时间' : 'Time', val: isZh ? '周一至周五 13:30 - 21:30 在线' : 'Mon-Fri 13:30 - 21:30 Online' },
                  { label: isZh ? '特质' : 'Traits', val: isZh ? '认真、细心、耐心、心理健康' : 'Serious, Careful, Patient, Stable' }
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="text-white font-bold">{item.val}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Suitable */}
            <div className="bg-[#0a0a0a] p-10 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
              <h3 className="text-2xl font-bold text-gray-500 mb-8 flex items-center gap-3">
                <span className="text-gray-700">×</span> {isZh ? '不适合人群' : 'Not Suitable For'}
              </h3>
              <ul className="space-y-4">
                {[
                  isZh ? '急于求成，想一夜暴富' : 'Get rich quick mentality',
                  isZh ? '无法接受任何亏损' : 'Cannot accept losses',
                  isZh ? '借贷资金进行交易' : 'Trading with debt',
                  isZh ? '抱着赌博心态' : 'Gambling mindset',
                  isZh ? '自以为是的“老手”' : 'Arrogant "Experts"',
                  isZh ? '没有耐心，三天打鱼两天晒网' : 'Inconsistent effort'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-500">
                    <span className="text-gray-700 font-bold">×</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SOCIAL PROOF (INCOME SCREENSHOTS) */}
      <Testimonials />

      {/* 10. FAQ */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase">
              {isZh ? '灵魂拷问' : 'FAQ'}
            </h2>
          </div>

          <div className="space-y-2">
            {[
              {
                q: isZh ? '为什么是免费的？' : 'Why is it free?',
                a: isZh ? '因为我们不是卖课的。我们是寻找战友。通过考核后，我们是合作共赢关系。你用我们的资金赚来的战利品，我们分一小部分，你拿大头。我们比你更希望你盈利。' : 'We don\'t sell courses. We look for comrades. We split the profits you make with our capital. We want you to win.'
              },
              {
                q: isZh ? '收入和社保怎么算？' : 'What about income & insurance?',
                a: isZh ? '在证明你的生产力之前，问这些没必要。你的实际收入，绝不会超过你在“战场”上缴获的“战利品”。任何盈利导向的企业都不会做亏本买卖。' : 'Don\'t ask before you prove your worth. Your income equals your war booty. No profit, no pay.'
              },
              {
                q: isZh ? '为什么不招有经验的？' : 'Why no experienced traders?',
                a: isZh ? '国内多数“经验丰富”的中年交易员往往是失败者，不良习惯缠身。我们更喜欢一张白纸，好作画。经验有时是枷锁，而非利剑。' : 'Experienced traders often have bad habits. We prefer a blank sheet. Experience can be a shackle.'
              },
              {
                q: isZh ? '真的会给我资金吗？' : 'Will you really fund me?',
                a: isZh ? '你已是能稳定带回战果的士兵，我们会抛弃你吗？没有一个将军希望牺牲自己辛苦训练出来的战士。' : 'You are a soldier bringing back loot. Why would we abandon you? No general sacrifices a trained soldier.'
              }
            ].map((item, i) => (
              <FAQItem
                key={i}
                question={item.q}
                answer={item.a}
                isOpen={openFAQIndex === i}
                onClick={() => toggleFAQ(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA - THE NARROW GATE */}
      <LampContainer className="min-h-screen">
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center tracking-tight text-transparent md:text-7xl text-4xl font-black"
        >
          {isZh ? '通往卓越，注定是窄门' : 'THE NARROW GATE'}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 text-xl text-gray-400 max-w-2xl mx-auto text-center font-light"
        >
          {isZh ? '留下极少数，劝返大多数。只有 1% 的人能通过这道门。' : 'We keep the few, dismiss the many. Only 1% pass through this gate.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <button
            onClick={openContact}
            className="px-20 py-8 bg-[#ff102a] text-white text-2xl font-black uppercase tracking-widest hover:bg-[#eb383e] shadow-[0_0_60px_rgba(255,16,42,0.5)] hover:shadow-[0_0_100px_rgba(255,16,42,0.8)] transition-all transform hover:scale-105 duration-300 rounded-none"
          >
            {isZh ? '接受挑战' : 'ACCEPT CHALLENGE'}
          </button>

          <div className="flex items-center gap-4 text-gray-500 text-sm uppercase tracking-widest">
            <span>{isZh ? '如果你准备好了' : 'IF YOU ARE READY'}</span>
          </div>
        </motion.div>
      </LampContainer>

      {/* Email Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title={isZh ? "申请进入汇刃" : "Apply for FX Killer"}
      />
    </div>
  );
}
