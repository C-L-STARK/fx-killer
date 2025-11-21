"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import EmailContactModal from '@/components/custom/EmailContactModal';
import { useLanguage } from '@/contexts/LanguageContext';
import LocaleLink from '@/components/navigation/LocaleLink';

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState(0);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [copied, setCopied] = useState(false);
  const { t, language } = useLanguage();

  // Calculate donation amount
  useEffect(() => {
    const startDate = new Date('2025-10-01T00:00:00');
    const today = new Date();
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const currentAmount = 999 + (daysPassed * 5);
    setDonationAmount(Math.max(999, currentAmount));
  }, []);

  // Fetch wallet address
  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const response = await fetch('/api/config/COFFEE');
        if (response.ok) {
          const data = await response.json();
          setWalletAddress(data.key_content || '');
        }
      } catch (error) {
        console.error('Error fetching wallet address:', error);
      } finally {
        setLoadingAddress(false);
      }
    };
    fetchWalletAddress();
  }, []);

  const copyToClipboard = async () => {
    if (walletAddress) {
      try {
        await navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#ff102a] selection:text-white overflow-x-hidden">

      {/* 1. HERO: THE GATEWAY */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,16,42,0.15),transparent_70%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 text-center px-6"
        >
          <div className="mb-6 flex justify-center">
            <span className="px-4 py-1.5 border border-[#ff102a]/30 bg-[#ff102a]/10 text-[#ff102a] text-xs font-bold tracking-[0.3em] uppercase rounded-full backdrop-blur-md">
              {t('donate.hero.badge')}
            </span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-8">
            <span className="block text-white mix-blend-difference">{t('donate.hero.title1')}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#ff102a] to-[#8a000e]">
              {t('donate.hero.title2')}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed font-light">
            {t('donate.hero.desc')}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600">{t('donate.scroll_unlock')}</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#ff102a] to-transparent"></div>
        </motion.div>
      </section>


      {/* 2. VALUE: THE BENTO GRID */}
      <section className="py-32 px-6 bg-[#050505] relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
              {t('donate.benefits.title')}
            </h2>
            <div className="w-20 h-1 bg-[#ff102a] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
            {/* Large Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 bg-[#0a0a0a] border border-gray-900 p-10 rounded-2xl hover:border-[#ff102a]/50 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <span className="text-[#ff102a] font-bold text-sm tracking-wider uppercase mb-2 block">{t('donate.card.core_access')}</span>
                  <h3 className="text-3xl font-bold text-white mb-4">{t('donate.benefits.a.title')}</h3>
                  <p className="text-gray-400 leading-relaxed max-w-md">{t('donate.benefits.a.desc')}</p>
                </div>
                <div className="mt-8">
                  <span className="inline-flex items-center gap-2 text-white text-sm font-bold uppercase border-b border-[#ff102a] pb-1">
                    {t('donate.card.full_privileges')} <span className="text-[#ff102a]">&rarr;</span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Tall Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:row-span-2 bg-[#0a0a0a] border border-gray-900 p-10 rounded-2xl hover:border-[#ff102a]/50 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ff102a]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div>
                <span className="text-[#ff102a] font-bold text-sm tracking-wider uppercase mb-2 block">{t('donate.card.exclusive')}</span>
                <h3 className="text-3xl font-bold text-white mb-4">{t('donate.benefits.b.title')}</h3>
                <p className="text-gray-400 leading-relaxed">{t('donate.benefits.b.desc')}</p>
              </div>
              <div className="mt-12 pt-12 border-t border-gray-800">
                <div className="text-6xl font-black text-gray-800 group-hover:text-white transition-colors">S+</div>
              </div>
            </motion.div>

            {/* Medium Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#0a0a0a] border border-gray-900 p-10 rounded-2xl hover:border-[#ff102a]/50 transition-all duration-500 group"
            >
              <span className="text-[#ff102a] font-bold text-sm tracking-wider uppercase mb-2 block">{t('donate.card.community')}</span>
              <h3 className="text-2xl font-bold text-white mb-4">{t('donate.benefits.c.title')}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t('donate.benefits.c.desc')}</p>
            </motion.div>

            {/* Medium Card 4 (Rewards) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#ff102a] p-10 rounded-2xl text-white relative overflow-hidden group"
            >
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <span className="font-bold text-sm tracking-wider uppercase mb-2 block opacity-80">{t('donate.card.bonus_rewards')}</span>
              <h3 className="text-2xl font-black mb-4 uppercase">{t('donate.rewards.title')}</h3>
              <p className="text-white/90 text-sm leading-relaxed">{t('donate.rewards.desc')}</p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* 3. THE ACCESS PASS (PAYMENT) */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">

          <div className="text-center mb-16">
            <p className="text-[#ff102a] font-bold tracking-widest uppercase mb-4">{t('donate.membership.label')}</p>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase">{t('donate.membership.title')}</h2>
          </div>

          <motion.div
            initial={{ rotateX: 20, opacity: 0 }}
            whileInView={{ rotateX: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="perspective-1000"
          >
            <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-[#333] rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(255,16,42,0.15)] transition-shadow duration-500">

              {/* Card Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              {/* Card Header */}
              <div className="flex justify-between items-start mb-12">
                <div>
                  <div className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mb-1">{t('donate.price.label')}</div>
                  <div className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                    <span className="text-[#ff102a] text-3xl align-top mr-1">$</span>{donationAmount}
                  </div>
                  <div className="text-[#ff102a] text-xs font-bold mt-2">{t('donate.price.daily')}</div>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-[#ff102a] flex items-center justify-center">
                  <div className="w-8 h-8 bg-[#ff102a] rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Card Footer / Wallet */}
              <div className="space-y-6">
                <div>
                  <label className="text-gray-500 text-xs font-bold tracking-widest uppercase block mb-3">
                    {t('donate.wallet.label')}
                  </label>

                  {loadingAddress ? (
                    <div className="h-16 bg-[#0a0a0a] rounded-xl animate-pulse"></div>
                  ) : (
                    <div
                      onClick={copyToClipboard}
                      className="bg-[#050505] border border-gray-800 rounded-xl p-4 md:p-6 flex items-center justify-between cursor-pointer hover:border-[#ff102a] transition-colors group/wallet"
                    >
                      <code className="text-gray-300 font-mono text-sm md:text-lg truncate mr-4 group-hover/wallet:text-white transition-colors">
                        {walletAddress || t('donate.wallet.loading')}
                      </code>
                      <span className="text-[#ff102a] font-bold text-sm uppercase whitespace-nowrap opacity-0 group-hover/wallet:opacity-100 transition-opacity">
                        {copied ? t('donate.wallet.copied') : t('donate.wallet.copy')}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-center text-gray-600 text-xs">
                  {t('donate.amount.warning')}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>


      {/* 4. THE PROCESS: ACTIVATION */}
      <section className="py-24 bg-[#050505] border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: t('donate.how.step1.title'), desc: t('donate.how.step1.desc') },
              { step: '02', title: t('donate.how.step2.title'), desc: t('donate.how.step2.desc') },
              { step: '03', title: t('donate.how.step4.title'), desc: t('donate.how.step4.desc') },
            ].map((item, index) => (
              <div key={index} className="relative pl-8 md:pl-0 md:pt-8 border-l-2 md:border-l-0 md:border-t-2 border-gray-800 hover:border-[#ff102a] transition-colors group">
                <div className="absolute -left-[9px] top-0 md:left-0 md:-top-[9px] w-4 h-4 bg-black border-4 border-[#ff102a] rounded-full group-hover:scale-125 transition-transform"></div>
                <div className="text-4xl font-black text-gray-800 mb-4 group-hover:text-[#ff102a] transition-colors">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 flex justify-center gap-6">
            <LocaleLink
              href="/splan/psychology-test"
              className="px-8 py-4 border border-gray-700 text-white font-bold hover:border-[#ff102a] hover:text-[#ff102a] transition-all uppercase tracking-wide"
            >
              {t('donate.how.cta.test')}
            </LocaleLink>
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="px-8 py-4 bg-[#ff102a] text-white font-bold hover:bg-white hover:text-black transition-all uppercase tracking-wide shadow-[0_10px_30px_rgba(255,16,42,0.3)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.3)]"
            >
              {t('donate.how.cta.email')}
            </button>
          </div>
        </div>
      </section>


      {/* 5. IMPORTANT NOTICE: THE FOOTER */}
      <section className="py-20 bg-black relative border-t border-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header Strip - SHARP CORNERS */}
          <div className="bg-[#ff102a] px-6 py-4 flex items-center justify-between">
            <h3 className="text-black font-black uppercase tracking-widest text-sm md:text-base">
              {t('donate.notice.title')}
            </h3>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 bg-black"></div>
              <div className="w-1.5 h-1.5 bg-black"></div>
              <div className="w-1.5 h-1.5 bg-black"></div>
            </div>
          </div>

          {/* Content Box - SHARP CORNERS */}
          <div className="border-l border-r border-b border-[#ff102a]/30 bg-[#0a0a0a] p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                { id: '01', text: t('donate.notice.1') },
                { id: '02', text: t('donate.notice.2') },
                { id: '03', text: t('donate.notice.3') },
                { id: '04', text: t('donate.notice.4') },
              ].map((item) => (
                <div key={item.id} className="flex items-start gap-4 group">
                  <span className="text-[#ff102a] font-mono text-xs mt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                    {item.id} //
                  </span>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium group-hover:text-white transition-colors">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title={t('donate.modal.title')}
      />
    </div>
  );
}
