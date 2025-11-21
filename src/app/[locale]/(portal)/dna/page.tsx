"use client";

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import {
    ArrowRight, Calendar, Check, X, ChevronRight, Terminal,
    Activity, Zap, Shield, Target, Crosshair, Lock,
    BarChart2, Layers, Cpu, Globe, Fingerprint, Brain
} from 'lucide-react';
import EmailContactModal from '@/components/custom/EmailContactModal';
import { useLanguage } from '@/contexts/LanguageContext';

// --- Premium Components ---

const SectionHeading = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase ${className}`}
        >
            {children}
        </motion.h2>
    );
};

const RevealText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
    return (
        <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className="inline-block"
        >
            {text}
        </motion.span>
    );
};

const NoiseOverlay = () => (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}>
    </div>
);

const GlowingButton = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="relative group px-10 py-5 bg-[#ff102a] text-white font-black text-lg uppercase tracking-widest overflow-hidden"
        >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out skew-y-12" />
            <span className="relative flex items-center gap-3 z-10">
                {children}
            </span>
        </motion.button>
    );
};

export default function DNAPage() {
    const { language } = useLanguage();
    const isZh = language === 'zh';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef(null);

    // --- Content Data ---
    const coreModules = [
        { id: "01", zh: "货币对选择与交易计划", en: "Currency Pair Selection & Game Plan" },
        { id: "02", zh: "一笔好交易的七大基本原则", en: "7 Fundamentals of One Good Trade" },
        { id: "03", zh: "风险管理", en: "Risk Management" },
        { id: "04", zh: "FX Killer 交易手册", en: "The FX Killer PlayBook" },
        { id: "05", zh: "交易复盘", en: "Trade Review" },
        { id: "06", zh: "最佳交易策略开发", en: "Best Trades To Develop" },
        { id: "07", zh: "价格行为分析", en: "Price Action Analysis" },
        { id: "08", zh: "交易心理学", en: "Trading Psychology" },
        { id: "09", zh: "PlayBook 实战交易", en: "PlayBook Trades" },
        { id: "10", zh: "交易成绩单", en: "The Report Card" },
        { id: "11", zh: "交易一致性", en: "Trading Consistency" },
        { id: "12", zh: "仓位管理", en: "Position Sizing" },
        { id: "13", zh: "实盘交易", en: "Trading a Live Account" },
        { id: "14", zh: "盘面解读实例", en: "Reading the Tape Examples" },
    ];

    const strategies = [
        { name: isZh ? "突破交易" : "Breakout Trade", type: "MOMENTUM" },
        { name: isZh ? "开盘驱动" : "Opening Drive", type: "TIMING" },
        { name: isZh ? "多时间框架" : "Multi-Timeframe", type: "STRUCTURE" },
        { name: isZh ? "剥头皮" : "Scalp Trade", type: "SPEED" },
        { name: isZh ? "技术分析" : "Technical Analysis", type: "CORE" },
        { name: isZh ? "新闻交易" : "Breaking News", type: "CATALYST" },
        { name: isZh ? "回撤交易" : "Return Pullback", type: "REVERSAL" },
        { name: isZh ? "缺口交易" : "Gap and Go", type: "MOMENTUM" },
        { name: isZh ? "VWAP策略" : "VWAP Strategy", type: "INSTITUTIONAL" },
        { name: isZh ? "市场联动" : "Market Play", type: "CORRELATION" },
        { name: isZh ? "低流通量" : "Low Float", type: "SPECIALTY" },
        { name: isZh ? "反弹交易" : "Bounce Trades", type: "REVERSAL" },
        { name: isZh ? "趋势交易" : "Trend Trade", type: "DIRECTION" },
        { name: isZh ? "区间交易" : "Range Trade", type: "STRUCTURE" },
        { name: isZh ? "反转交易" : "Reversal Trade", type: "REVERSAL" },
        { name: isZh ? "动能交易" : "Momentum Trade", type: "MOMENTUM" },
        { name: isZh ? "支撑阻力" : "Support/Resist", type: "LEVELS" },
        { name: isZh ? "斐波那契" : "Fibonacci", type: "MATH" },
        { name: isZh ? "均线交叉" : "MA Crossover", type: "TREND" },
        { name: isZh ? "成交量分布" : "Volume Profile", type: "VOLUME" },
    ];

    return (
        <div ref={containerRef} className="bg-black min-h-screen text-white selection:bg-[#ff102a] selection:text-white overflow-x-hidden">
            <NoiseOverlay />

            {/* --- HERO SECTION --- */}
            <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff102a] opacity-[0.08] blur-[150px] rounded-full animate-pulse" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
                </div>

                <div className="relative z-10 text-center space-y-8 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-[1px] w-12 bg-[#ff102a]" />
                            <span className="text-[#ff102a] font-mono text-sm tracking-[0.3em] uppercase">
                                {isZh ? '精英交易员计划' : 'ELITE TRADER PROGRAM'}
                            </span>
                            <div className="h-[1px] w-12 bg-[#ff102a]" />
                        </div>

                        <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 select-none">
                            DNA
                        </h1>
                        <p className="text-2xl md:text-4xl font-light text-gray-400 mt-6 tracking-wide">
                            {isZh ? '重塑您的交易基因' : 'REWRITE YOUR TRADING GENOME'}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12"
                    >
                        <div className="flex flex-col items-center md:items-end border-r-0 md:border-r border-gray-800 pr-0 md:pr-8">
                            <span className="text-5xl font-black text-white">$40,000</span>
                        </div>
                        <div className="flex flex-col items-center md:items-start pl-0 md:pl-8">
                            <GlowingButton onClick={() => setIsModalOpen(true)}>
                                {isZh ? '申请面试' : 'APPLY FOR INTERVIEW'}
                                <ArrowRight className="w-5 h-5" />
                            </GlowingButton>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="flex justify-center mt-6"
                    >
                        <span className="text-[10px] text-[#ff102a] uppercase tracking-widest flex items-center gap-2 border border-[#ff102a]/30 px-4 py-2 bg-[#ff102a]/5">
                            <Lock className="w-3 h-3" />
                            {isZh ? '仅限受邀' : 'INVITATION ONLY'}
                        </span>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
                </motion.div>
            </section>

            {/* --- PHILOSOPHY SECTION --- */}
            < section className="py-32 px-6 border-t border-white/10 bg-[#050505]" >
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <SectionHeading className="mb-12">
                            {isZh ? '非复制' : 'NOT A COPY'}
                            <br />
                            <span className="text-[#ff102a]">{isZh ? '而是进化' : 'BUT EVOLUTION'}</span>
                        </SectionHeading>
                        <div className="space-y-8 text-lg text-gray-400 leading-relaxed font-light">
                            <p>
                                <strong className="text-white font-bold">{isZh ? '我们不卖信号。' : 'We don\'t sell signals.'}</strong> {isZh
                                    ? '市面上有无数的"喊单群"，但DNA不同。这是一个旨在将您彻底重塑为机构级交易员的系统工程。'
                                    : 'There are countless signal groups. DNA is different. It is a systematic engineering project designed to completely rebuild you into an institutional-grade trader.'}
                            </p>
                            <p>
                                {isZh
                                    ? '通过14个核心模块和20+种经过实战验证的策略，您将构建属于自己的 PlayBook。这不是关于模仿，而是关于理解市场底层的流动性逻辑。'
                                    : 'Through 14 core modules and 20+ battle-tested strategies, you will build your own PlayBook. This is not about imitation, but about understanding the underlying liquidity logic of the market.'}
                            </p>
                            <div className="flex items-center gap-4 pt-4">
                                <div className="px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest text-white">
                                    {isZh ? '职业导师' : 'PRO MENTORSHIP'}
                                </div>
                                <div className="px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest text-white">
                                    {isZh ? '技能精通' : 'SKILL MASTERY'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#ff102a] blur-[100px] opacity-10" />
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            {[
                                { icon: Target, label: isZh ? "每日辅导" : "Mentoring", val: "Daily" },
                                { icon: Zap, label: isZh ? "实战演练" : "Live Trade", val: "Real" },
                                { icon: Shield, label: isZh ? "复盘指导" : "Review", val: "1-on-1" },
                                { icon: Brain, label: isZh ? "职业规划" : "Career", val: "Pro" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
                                    className="p-8 border border-white/10 bg-black/50 backdrop-blur-sm flex flex-col items-start justify-between h-48 group transition-colors"
                                >
                                    <item.icon className="w-8 h-8 text-gray-600 group-hover:text-[#ff102a] transition-colors" />
                                    <div>
                                        <div className="text-3xl font-black text-white mb-1">{item.val}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest">{item.label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section >

            {/* --- THE SYSTEM (Modules) --- */}
            < section className="py-32 bg-black relative overflow-hidden" >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-10">
                        <SectionHeading>
                            {isZh ? '核心系统' : 'THE CORE'}
                            <span className="text-2xl md:text-3xl block mt-2 font-light text-gray-500 tracking-normal normal-case">
                                {isZh ? '14个模块构建完整交易体系' : '14 Modules to Build a Complete System'}
                            </span>
                        </SectionHeading>
                        <Fingerprint className="w-24 h-24 text-[#ff102a] opacity-20 hidden md:block" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {coreModules.map((module, idx) => (
                            <motion.div
                                key={module.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative pl-8 border-l border-gray-800 hover:border-[#ff102a] transition-colors duration-300"
                            >
                                <span className="absolute -left-[9px] top-0 w-[17px] h-[1px] bg-[#ff102a] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="text-xs font-mono text-[#ff102a] mb-2 opacity-50 group-hover:opacity-100">
                                    MODULE {module.id}
                                </div>
                                <h3 className="text-xl font-bold text-white group-hover:text-[#ff102a] transition-colors">
                                    {isZh ? module.zh : module.en}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* --- ARSENAL (Strategies) --- */}
            < section className="py-32 bg-[#080808] border-y border-white/5" >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-20 text-center">
                        <span className="text-[#ff102a] font-mono text-sm tracking-[0.5em] uppercase mb-4 block">
                            {isZh ? '武器库' : 'ARSENAL'}
                        </span>
                        <SectionHeading className="text-center">
                            {isZh ? '20+ 顶级策略' : '20+ ELITE SETUPS'}
                        </SectionHeading>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1">
                        {strategies.map((strategy, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.02 }}
                                className="relative group h-32 bg-black border border-white/5 p-4 flex flex-col justify-between hover:bg-[#ff102a] transition-colors duration-300"
                            >
                                <div className="flex justify-between items-start">
                                    <Crosshair className="w-4 h-4 text-gray-700 group-hover:text-white transition-colors" />
                                    <span className="text-[9px] font-mono text-gray-600 group-hover:text-white/80 uppercase">
                                        {strategy.type}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white leading-tight">
                                        {strategy.name}
                                    </h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* --- INTERVIEW / CTA --- */}
            < section className="relative py-40 px-6 overflow-hidden flex items-center justify-center" >
                <div className="absolute inset-0 bg-[#ff102a] opacity-[0.02]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff102a]/10 border border-[#ff102a] text-[#ff102a] text-xs font-bold uppercase tracking-widest mb-8">
                        <Lock className="w-3 h-3" />
                        {isZh ? '严格筛选' : 'STRICT SELECTION'}
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                        {isZh
                            ? '这不是给所有人的'
                            : 'THIS IS NOT FOR EVERYONE'}
                    </h2>

                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
                        {isZh
                            ? '为了保证教学质量和圈层纯度，我们设立了严格的面试门槛。$40,000 不仅仅是学费，更是决心的证明。'
                            : 'To ensure quality and community purity, we maintain a strict interview process. The $40,000 is not just tuition, it is proof of resolve.'}
                    </p>

                    <div className="flex flex-col items-center gap-6">
                        <GlowingButton onClick={() => setIsModalOpen(true)}>
                            {isZh ? '立即预约面试' : 'SCHEDULE INTERVIEW NOW'}
                        </GlowingButton>
                    </div>
                </div>
            </section >

            <EmailContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formType="dna-interview"
            />
        </div >
    );
}
