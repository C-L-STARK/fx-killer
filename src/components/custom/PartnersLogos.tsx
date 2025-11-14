"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBrand } from '@/contexts/BrandContext';

const logos = [
  { id: 1, src: '/logos/1.png', alt: 'Partner 1' },
  { id: 2, src: '/logos/2.png', alt: 'Partner 2' },
  { id: 3, src: '/logos/3.png', alt: 'Partner 3' },
  { id: 4, src: '/logos/4.png', alt: 'Partner 4' },
  { id: 5, src: '/logos/5.png', alt: 'Partner 5' },
  { id: 6, src: '/logos/6.png', alt: 'Partner 6' },
  { id: 7, src: '/logos/7.png', alt: 'Partner 7' },
  { id: 8, src: '/logos/8.png', alt: 'Partner 8' },
  { id: 9, src: '/logos/9.png', alt: 'Partner 9' },
  { id: 10, src: '/logos/10.png', alt: 'Partner 10' },
];

export default function PartnersLogos() {
  const { language } = useLanguage();
  const brand = useBrand();
  const isZh = language === 'zh';

  // 双倍数组用于无缝循环
  const doubledLogos = [...logos, ...logos];

  // 从配置读取合作伙伴数据：包括推荐码、经纪商和自营公司
  const allPartners = [
    ...brand.referralCodes.map(p => ({
      name: isZh ? p.name_zh : p.name_en,
      code: p.code,
      link: p.url,
      benefit: isZh ? p.benefit_zh : p.benefit_en
    })),
    ...brand.partnerBrokers.map(p => ({
      name: isZh ? p.name_zh : p.name_en,
      code: p.code || null,
      link: p.url,
      benefit: isZh ? p.benefit_zh : p.benefit_en
    })),
    ...brand.propFirms.map(p => ({
      name: isZh ? p.name_zh : p.name_en,
      code: p.code || null,
      link: p.url,
      benefit: isZh ? p.benefit_zh : p.benefit_en
    })),
  ];

  // 提取品牌名称用于显示
  const partnerNames = allPartners.map(p => p.name).filter(Boolean);
  const partnerNamesText = partnerNames.length > 0
    ? partnerNames.slice(0, -1).join('、') + (partnerNames.length > 1 ? (isZh ? '、' : ', ') : '') + partnerNames[partnerNames.length - 1]
    : '';

  // 如果没有配置合作伙伴，则不显示该板块
  if (allPartners.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
            {isZh ? '合作伙伴' : 'Our Partners'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {isZh
              ? '与全球领先的金融机构和平台建立战略合作伙伴关系'
              : 'Strategic partnerships with leading global financial institutions and platforms'}
          </p>
        </motion.div>

        {/* Logos Auto Scroll */}
        <div className="relative mb-12 overflow-hidden">
          <motion.div
            className="flex gap-12"
            animate={{
              x: [0, -(160 + 48) * logos.length], // 160px width + 48px gap
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {doubledLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 w-40 h-20 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Partnership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-900 border-2 border-black dark:border-white p-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left: Description */}
            <div className="text-center md:text-left">
              <p className="text-base md:text-lg text-black dark:text-white">
                {isZh ? (
                  <>
                    {brand.brandName.zh} 是 {partnerNames.map((name, idx) => (
                      <React.Fragment key={name}>
                        {idx > 0 && '、'}
                        <span className="font-bold">{name}</span>
                      </React.Fragment>
                    ))} 的<span className="font-black text-xl underline decoration-2 underline-offset-4">官方合作伙伴</span>
                  </>
                ) : (
                  <>
                    {brand.brandName.en} is an <span className="font-black text-xl underline decoration-2 underline-offset-4">official partner</span> of {partnerNames.map((name, idx) => (
                      <React.Fragment key={name}>
                        {idx > 0 && (idx === partnerNames.length - 1 ? ' and ' : ', ')}
                        <span className="font-bold">{name}</span>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </p>
              <p className="text-sm text-black dark:text-white mt-2">
                {isZh ? (
                  <>
                    使用专属链接注册，享受<span className="font-black bg-black dark:bg-white text-white dark:text-black px-2 py-0.5">平台最高自动返佣</span>、<span className="font-bold underline">超低点差</span>、<span className="font-bold underline">手续费</span>等优惠
                  </>
                ) : (
                  <>
                    Register with exclusive links for <span className="font-black bg-black dark:bg-white text-white dark:text-black px-2 py-0.5">maximum auto-rebates</span>, <span className="font-bold underline">ultra-low spreads & fees</span>
                  </>
                )}
              </p>
            </div>

            {/* Right: Partner Links */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {allPartners.map((partner, index) => (
                <motion.a
                  key={`${partner.name}-${index}`}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white transition-all px-4 py-2 flex items-center gap-2">
                    <span className="font-bold text-black dark:text-white text-sm group-hover:underline">
                      {partner.name}
                    </span>
                    {partner.code && (
                      <>
                        <span className="text-gray-400">|</span>
                        <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-black dark:text-white font-mono">
                          {partner.code}
                        </code>
                      </>
                    )}
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
