"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShineLinkButton } from '@/components/custom/ShineButton';

export default function SplanFooter() {
  const { t, language } = useLanguage();

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
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.about')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.nav.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/splan/join-us" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.training')}
                </Link>
              </li>
              <li>
                <Link href="/splan/faq" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.faq')}
                </Link>
              </li>
              <li>
                <Link href="/splan/psychology-test" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.psychology')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.resources.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.dashboard')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'zh' ? '隐私政策' : 'Privacy Policy'}
                </Link>
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

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.contact.title')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{t('footer.contact.focus')}</li>
              <li>{t('footer.contact.cultivate')}</li>
              <li className="pt-2">
                <ShineLinkButton
                  href="/splan/join-us"
                  className="inline-block px-4 py-2 bg-black dark:bg-white text-white dark:text-black">
                  {t('footer.contact.apply')}
                </ShineLinkButton>
              </li>
            </ul>
          </div>
        </div>

        {/* Partners Section */}
        <div className="border-t border-gray-800 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Brokers */}
            <div className="bg-gray-900 dark:bg-gray-950 border border-gray-800 p-6 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <h5 className="font-bold text-white">{t('footer.partners.brokers')}</h5>
              </div>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://i.ecmarkets.com/api/client/pm/2/99R9C"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="font-medium">EC Markets</span>
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://my.tickmill.com?utm_campaign=ib_link&utm_content=IB47958600&utm_medium=Open+Account&utm_source=link&lp=https%3A%2F%2Fmy.tickmill.com%2Fzh%2Fsign-up%2F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="font-medium">TickMill</span>
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Prop Firms */}
            <div className="bg-gray-900 dark:bg-gray-950 border border-gray-800 p-6 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h5 className="font-bold text-white">{t('footer.partners.propfirms')}</h5>
              </div>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://ftmo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="font-medium">FTMO</span>
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://fundednext.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="font-medium">FundedNext</span>
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Platforms & Tools */}
            <div className="bg-gray-900 dark:bg-gray-950 border border-gray-800 p-6 hover:border-gray-700 transition-colors md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <h5 className="font-bold text-white">{t('footer.partners.platforms')}</h5>
              </div>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://metaapi.cloud/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-gray-400 hover:text-white transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">MetaAPI</span>
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <div className="text-xs mt-1 text-gray-500">{t('footer.partners.copytrading')}</div>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.metatrader4.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-gray-400 hover:text-white transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">MetaTrader 4/5</span>
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <div className="text-xs mt-1 text-gray-500">{t('footer.partners.tools')}</div>
                  </a>
                </li>
              </ul>
            </div>
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
    </footer>
  );
}
