"use client";

import React from 'react';
import LocaleLink from '@/components/navigation/LocaleLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShineLinkButton } from '@/components/custom/ShineButton';

export default function SplanFooter() {
  const { t, language } = useLanguage();
  const [showWechatModal, setShowWechatModal] = React.useState(false);

  return (
    <footer className="bg-black dark:bg-gray-950 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-black text-white">
                {language === 'zh' ? '汇' : 'FX'}
              </span>
              <span className="text-xl font-normal text-gray-400 ml-1">
                {language === 'zh' ? '刃' : 'Killer'}
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {t('footer.about')}
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {/* Telegram */}
              <a
                href="https://t.me/binance_cashcontrol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                title="Telegram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/RealFXkiller"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                title="X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@FX-Killer-Trader"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                title="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* WeChat */}
              <button
                onClick={() => setShowWechatModal(true)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="WeChat: DerrenX"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 6.025-1.31-.452-3.79-4.214-6.876-8.768-6.876zm-2.924 5.232a.72.72 0 0 1 .717-.72.72.72 0 0 1 .718.72.72.72 0 0 1-.718.72.72.72 0 0 1-.717-.72zm5.674 0a.72.72 0 0 1 .717-.72.72.72 0 0 1 .717.72.72.72 0 0 1-.717.72.72.72 0 0 1-.717-.72zm7.735 4.55c0-3.564-3.51-6.446-7.835-6.446-4.325 0-7.835 2.882-7.835 6.446 0 1.948 1.03 3.703 2.646 4.895a.52.52 0 0 1 .188.586l-.344 1.304a.488.488 0 0 0-.042.188c0 .144.115.26.255.26a.289.289 0 0 0 .148-.047l1.677-.982a.762.762 0 0 1 .632-.086c.784.19 1.61.295 2.475.295 4.325 0 7.835-2.882 7.835-6.446zm-9.606-1.31a.635.635 0 0 1-.633-.634c0-.35.283-.633.633-.633.35 0 .634.283.634.633a.635.635 0 0 1-.634.633zm3.81 0a.635.635 0 0 1-.633-.634c0-.35.283-.633.633-.633.35 0 .634.283.634.633a.635.635 0 0 1-.634.633z"/>
                </svg>
              </button>

              {/* Email */}
              <a
                href="mailto:x.stark.dylan@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
                title="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links - Navigation */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.nav.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <LocaleLink href="/" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.home')}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/splan/join-us" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.training')}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/education" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'zh' ? '教育中心' : 'Education'}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/splan/blog" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.blog')}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/splan/psychology-test" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.psychology')}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.dashboard')}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/splan/faq" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.faq')}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/splan/donate" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.membership')}
                </LocaleLink>
              </li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="font-bold mb-4">{language === 'zh' ? '交易工具' : 'Trading Tools'}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <LocaleLink href="/tools/position-calculator" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'zh' ? '仓位计算器' : 'Position Calculator'}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/tools/risk-reward-calculator" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'zh' ? '风险回报计算器' : 'Risk/Reward Calculator'}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/tools/pip-calculator" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'zh' ? '点值计算器' : 'Pip Calculator'}
                </LocaleLink>
              </li>
            </ul>

            <h4 className="font-bold mb-4 mt-6">{language === 'zh' ? '其他资源' : 'Resources'}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <LocaleLink href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'zh' ? '隐私政策' : 'Privacy Policy'}
                </LocaleLink>
              </li>
              <li>
                <a href="https://www.bilibili.com/video/BV19a411X7eY" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors">
                  {t('video.doc1.title')}
                </a>
              </li>
              <li>
                <a href="https://www.bilibili.com/video/BV1FZ4y1o734" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors">
                  {t('video.doc2.title')}
                </a>
              </li>
            </ul>
          </div>

          {/* Partners - Brokers */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.partners.brokers')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://i.ecmarkets.com/api/client/pm/2/99R9C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  EC Markets
                </a>
              </li>
              <li>
                <a
                  href="https://my.tickmill.com?utm_campaign=ib_link&utm_content=IB47958600&utm_medium=Open+Account&utm_source=link&lp=https%3A%2F%2Fmy.tickmill.com%2Fzh%2Fsign-up%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  TickMill
                </a>
              </li>
              <li>
                <div className="space-y-1">
                  <a
                    href="https://www.maxweb.red/join?ref=YYSTARK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors block"
                  >
                    Binance
                  </a>
                  <div className="flex items-center gap-2 pl-2">
                    <span className="text-xs text-gray-500">{language === 'zh' ? '邀请码' : 'Code'}:</span>
                    <code className="text-xs bg-gray-800 px-2 py-0.5 text-gray-400 font-mono">YYSTARK</code>
                    <span className="text-xs text-gray-500">{language === 'zh' ? '(全返)' : '(Full refund)'}</span>
                  </div>
                </div>
              </li>
            </ul>

            <h4 className="font-bold mb-4 mt-6">{t('footer.partners.propfirms')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://ftmo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FTMO
                </a>
              </li>
              <li>
                <div className="space-y-1">
                  <a
                    href="https://fundednext.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors block"
                  >
                    FundedNext
                  </a>
                  <div className="flex items-center gap-2 pl-2">
                    <span className="text-xs text-green-400">{language === 'zh' ? '邀请码' : 'Code'}:</span>
                    <code className="text-xs bg-gray-800 px-2 py-0.5 text-green-400 font-mono">REFQKEAYK</code>
                    <span className="text-xs text-gray-500">{language === 'zh' ? '(5%优惠)' : '(5% off)'}</span>
                  </div>
                </div>
              </li>
            </ul>

            <h4 className="font-bold mb-4 mt-6">{t('footer.partners.platforms')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://metaapi.cloud/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  MetaAPI
                </a>
              </li>
              <li>
                <a
                  href="https://www.metatrader4.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  MetaTrader 4/5
                </a>
              </li>
              <li>
                <a
                  href="https://metacopier.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  MetaCopier
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>2024-2025 {t('footer.copyright')}</p>
          <p className="mt-2 text-xs">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>

      {/* WeChat Modal */}
      {showWechatModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowWechatModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 p-8 border-2 border-black dark:border-white max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-black dark:text-white">
                {language === 'zh' ? '微信联系方式' : 'WeChat Contact'}
              </h3>
              <button
                onClick={() => setShowWechatModal(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="text-center">
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 p-6 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {language === 'zh' ? '微信号' : 'WeChat ID'}
                </p>
                <p className="text-3xl font-bold text-black dark:text-white mb-4">
                  DerrenX
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {language === 'zh' ? '复制微信号，在微信中添加好友' : 'Copy WeChat ID and add as friend in WeChat'}
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText('DerrenX');
                  alert(language === 'zh' ? '微信号已复制！' : 'WeChat ID copied!');
                }}
                className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                {language === 'zh' ? '复制微信号' : 'Copy WeChat ID'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
