"use client";

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

// AnimatedCounter Component (embedded)
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

interface ButtonConfig {
    text: {
        zh: string;
        en: string;
    };
    action: 'modal' | 'link';
    link?: string;
    onClick?: () => void;
}

interface PremiumCTAProps {
    badge?: {
        zh: string;
        en: string;
    };
    title: {
        zh: string;
        en: string;
    };
    subtitle?: {
        zh: string;
        en: string;
    };
    primaryButton: ButtonConfig;
    secondaryButton?: ButtonConfig;
    note?: {
        zh: string;
        en: string;
    };
    showStats?: boolean;
    customStats?: Array<{
        value: string | React.ReactNode;
        label: {
            zh: string;
            en: string;
        };
    }>;
    className?: string;
    onModalOpen?: () => void;
}

export default function PremiumCTA({
    badge,
    title,
    subtitle,
    primaryButton,
    secondaryButton,
    note,
    showStats = true,
    customStats,
    className = '',
    onModalOpen,
}: PremiumCTAProps) {
    const router = useRouter();
    const { language } = useLanguage();

    const handlePrimaryClick = () => {
        if (primaryButton.action === 'modal' && onModalOpen) {
            onModalOpen();
        } else if (primaryButton.action === 'link' && primaryButton.link) {
            router.push(primaryButton.link);
        } else if (primaryButton.onClick) {
            primaryButton.onClick();
        }
    };

    const handleSecondaryClick = () => {
        if (!secondaryButton) return;

        if (secondaryButton.action === 'modal' && onModalOpen) {
            onModalOpen();
        } else if (secondaryButton.action === 'link' && secondaryButton.link) {
            router.push(secondaryButton.link);
        } else if (secondaryButton.onClick) {
            secondaryButton.onClick();
        }
    };

    return (
        <div className={`relative w-full bg-black py-40 overflow-hidden flex flex-col items-center justify-center min-h-[700px] ${className}`}>
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
                {badge && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mb-6"
                    >
                        <div className="inline-block px-6 py-2 border border-[#ff102a] text-[#ff102a] text-sm font-bold tracking-widest uppercase mb-8 bg-[#ff102a]/5 animate-border-flow">
                            {language === 'zh' ? badge.zh : badge.en}
                        </div>
                    </motion.div>
                )}

                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-500 tracking-tighter mb-8 leading-tight"
                >
                    {language === 'zh' ? title.zh : title.en}
                </motion.h2>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed font-mono mb-12"
                    >
                        {language === 'zh' ? subtitle.zh : subtitle.en}
                    </motion.p>
                )}

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <button
                        onClick={handlePrimaryClick}
                        className="group relative px-16 py-6 bg-[#ff102a] text-white text-xl font-black uppercase tracking-widest overflow-hidden transition-all hover:scale-105 duration-300 border-2 border-[#ff102a]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <span className="relative z-10 flex items-center gap-3">
                            {language === 'zh' ? primaryButton.text.zh : primaryButton.text.en}
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 shadow-[0_0_40px_rgba(255,16,42,0.6)] group-hover:shadow-[0_0_60px_rgba(255,16,42,0.8)] transition-shadow"></div>
                    </button>

                    {secondaryButton && (
                        <button
                            onClick={handleSecondaryClick}
                            className="px-12 py-6 bg-transparent text-white text-xl font-black uppercase tracking-widest border-2 border-white/30 hover:bg-white hover:text-black transition-all hover:scale-105 duration-300"
                        >
                            {language === 'zh' ? secondaryButton.text.zh : secondaryButton.text.en}
                        </button>
                    )}
                </motion.div>

                {note && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="mt-8 text-sm text-gray-600 font-mono uppercase tracking-widest"
                    >
                        {language === 'zh' ? note.zh : note.en}
                    </motion.p>
                )}

                {/* Stats Display */}
                {(showStats || customStats) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        viewport={{ once: true }}
                        className="mt-12 pt-8 border-t border-white/10"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
                            {customStats ? (
                                customStats.map((stat, index) => (
                                    <div key={index} className="text-center group hover:scale-105 transition-transform">
                                        <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider leading-tight">
                                            {language === 'zh' ? stat.label.zh : stat.label.en}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
