"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const isZh = language === 'zh';

  // 双倍数组用于无缝循环
  const doubledLogos = [...logos, ...logos];

  const partners = [
    {
      name: 'EC Markets',
      code: '99R9C',
      link: 'https://i.ecmarkets.com/api/client/pm/2/99R9C',
      benefit: isZh ? '超低点差 + 全额返佣' : 'Ultra-low spreads + Full rebate'
    },
    {
      name: 'TickMill',
      code: 'IB47958600',
      link: 'https://my.tickmill.com?utm_campaign=ib_link&utm_content=IB47958600&utm_medium=Open+Account&utm_source=link&lp=https%3A%2F%2Fmy.tickmill.com%2Fzh%2Fsign-up%2F',
      benefit: isZh ? '超低点差 + 全额返佣' : 'Ultra-low spreads + Full rebate'
    },
    {
      name: 'Binance',
      code: 'YYSTARK',
      link: 'https://www.maxweb.red/join?ref=YYSTARK',
      benefit: isZh ? '最低手续费 + 最高返佣' : 'Lowest fees + Maximum rebate'
    },
    {
      name: 'FTMO',
      code: null,
      link: 'https://trader.ftmo.com/?affiliates=UUdNjacFYttdgsZcEozt',
      benefit: isZh ? '专属优惠 + 立减折扣' : 'Exclusive offers + Instant discount'
    },
    {
      name: 'FundedNext',
      code: 'REFQKEAYK',
      link: 'https://fundednext.com/',
      benefit: isZh ? '专属优惠 + 立减折扣' : 'Exclusive offers + Instant discount'
    }
  ];

  return (
    <section className="relative py-16 bg-black overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#ff102a] mb-4">
            {isZh ? '官方合作伙伴' : 'Official Partners'}
          </h2>
          <p className="text-[#dadafa] max-w-2xl mx-auto">
            {isZh
              ? '与全球领先的金融机构和平台建立战略合作伙伴关系'
              : 'Strategic partnerships with leading global financial institutions and platforms'}
          </p>
        </motion.div>

        {/* Logos Auto Scroll */}
        <div className="relative overflow-hidden">
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
                  className="object-contain hover:scale-110 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
