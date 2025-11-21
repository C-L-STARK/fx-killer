"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

export default function CandidateRequirements() {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';
  const [hoveredZone, setHoveredZone] = useState<'rejection' | 'selection' | null>(null);

  const rejectionCriteria = [
    { key: 'fragility', icon: '⚠️' },
    { key: 'gambler', icon: '🎲' },
    { key: 'stagnation', icon: '🛑' },
    { key: 'impulse', icon: '⚡' }
  ];

  const selectionCriteria = [
    { key: 'discipline', icon: '🛡️' },
    { key: 'resilience', icon: '💎' },
    { key: 'precision', icon: '🎯' },
    { key: 'evolution', icon: '🧬' }
  ];

  const metrics = [
    { key: 'cognitive', value: 92 },
    { key: 'pattern', value: 88 },
    { key: 'tactical', value: 95 },
    { key: 'psych', value: 90 },
    { key: 'mission', value: 98 }
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header: System Protocol */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase glich-text">
            {isZh ? (
              <>交易员 <span className="text-[#ff102a]">DNA</span> 分析</>
            ) : (
              <>Trader <span className="text-[#ff102a]">DNA</span> Analysis</>
            )}
          </h2>
          <p className="text-gray-400 font-mono text-sm md:text-base max-w-2xl mx-auto">
            {t('req.system.scanning')}
          </p>
        </motion.div>

        {/* Main Grid: Rejection vs Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

          {/* Left: Rejection Zone (Fatal Flaws) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onHoverStart={() => setHoveredZone('rejection')}
            onHoverEnd={() => setHoveredZone(null)}
            className={`relative group border border-red-900/30 bg-red-950/5 p-8 transition-all duration-500 ${hoveredZone === 'rejection' ? 'border-red-600 bg-red-950/10' : ''}`}
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 border-b border-red-900/30 pb-4">
              <h3 className="text-xl font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
                <span className="text-2xl">🚫</span>
                {t('req.rejection.title')}
              </h3>
              <span className="text-xs font-mono text-red-400 bg-red-950/30 px-2 py-1">
                {t('req.system.fatal_err')}
              </span>
            </div>

            {/* List */}
            <div className="space-y-6">
              {rejectionCriteria.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 group/item"
                >
                  <div className="w-12 h-12 bg-red-950/20 border border-red-900/30 flex items-center justify-center text-2xl group-hover/item:border-red-600 transition-colors shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-red-400 group-hover/item:text-red-300 transition-colors uppercase">
                      {t(`req.rejection.${item.key}`)}
                    </h4>
                    <p className="text-sm text-gray-400 group-hover/item:text-gray-300 transition-colors font-mono mt-1 leading-relaxed">
                      {t(`req.rejection.${item.key}.desc`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scanning Line Animation */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-red-600/50 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Right: Selection Zone (Elite Traits) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onHoverStart={() => setHoveredZone('selection')}
            onHoverEnd={() => setHoveredZone(null)}
            className={`relative group border border-green-900/30 bg-green-950/5 p-8 transition-all duration-500 ${hoveredZone === 'selection' ? 'border-green-500 bg-green-950/10' : ''}`}
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 border-b border-green-900/30 pb-4">
              <h3 className="text-xl font-bold text-green-500 uppercase tracking-wider flex items-center gap-2">
                <span className="text-2xl">✅</span>
                {t('req.selection.title')}
              </h3>
              <span className="text-xs font-mono text-green-400 bg-green-950/30 px-2 py-1">
                {t('req.system.match_confirmed')}
              </span>
            </div>

            {/* List */}
            <div className="space-y-6">
              {selectionCriteria.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 group/item"
                >
                  <div className="w-12 h-12 bg-green-950/20 border border-green-900/30 flex items-center justify-center text-2xl group-hover/item:border-green-500 transition-colors shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-green-400 group-hover/item:text-green-300 transition-colors uppercase">
                      {t(`req.selection.${item.key}`)}
                    </h4>
                    <p className="text-sm text-gray-400 group-hover/item:text-gray-300 transition-colors font-mono mt-1 leading-relaxed">
                      {t(`req.selection.${item.key}.desc`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scanning Line Animation */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
              animate={{ top: ['100%', '0%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        {/* Footer: Metrics Readout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-gray-900 pt-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              {t('req.assessment.title')} // {t('req.system.data_stream')}
            </h3>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-2 h-2 bg-gray-800 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {metrics.map((metric, i) => (
              <div key={metric.key} className="bg-[#0a0a0a] border border-gray-800 p-4 relative overflow-hidden group hover:border-gray-600 transition-colors">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-xs font-mono text-gray-500 mb-2 uppercase">
                  {t(`req.metric.${metric.key}`)}
                </div>
                <div className="text-2xl font-bold text-white font-mono flex items-end gap-1">
                  {metric.value}<span className="text-xs text-gray-600 mb-1">%</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-1 bg-gray-900 mt-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className="h-full bg-gray-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
