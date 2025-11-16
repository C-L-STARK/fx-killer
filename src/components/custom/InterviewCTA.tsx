"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import EmailContactModal from './EmailContactModal';
import ShineButton from './ShineButton';

export default function InterviewCTA() {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const content = {
    zh: {
      badge: "开始您的交易员之路",
      title: "准备好改变人生了吗？",
      subtitle: "立即预约面试，开启您的职业交易员生涯",
      description: "我们正在寻找有潜力的交易员候选人。完全免费的30天培训，通过考核即可获得资金支持。",
      button: "立即预约面试",
      features: [
        { icon: "✓", text: "完全免费培训" },
        { icon: "✓", text: "30天系统学习" },
        { icon: "✓", text: "通过即获资金" },
        { icon: "✓", text: "60-90%高分成" }
      ],
      note: "注意：每人只有一次机会，请确保符合条件后再申请"
    },
    en: {
      badge: "Start Your Trader Journey",
      title: "Ready to Change Your Life?",
      subtitle: "Book Your Interview Now and Start Your Professional Trading Career",
      description: "We are looking for potential trader candidates. Completely free 30-day training with funding support upon passing.",
      button: "Book Interview Now",
      features: [
        { icon: "✓", text: "Completely Free" },
        { icon: "✓", text: "30-Day Training" },
        { icon: "✓", text: "Get Funding" },
        { icon: "✓", text: "60-90% Share" }
      ],
      note: "Note: Only one opportunity per person. Please ensure you meet requirements before applying"
    }
  };

  const currentContent = language === 'zh' ? content.zh : content.en;

  return (
    <>
      <section className="relative py-24 overflow-hidden bg-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 z-[5]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, currentColor 50px, currentColor 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, currentColor 50px, currentColor 51px)',
            color: 'white'
          }} />
        </div>

        {/* Animated Border */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-0 right-0 h-1 bg-[#dadafa] origin-left"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-[#dadafa] origin-right"
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="inline-block px-8 py-3 bg-[#131318] text-white text-base font-bold tracking-wider border-2 border-[#dadafa]">
              {currentContent.badge.toUpperCase()}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-center mb-4 text-white"
          >
            {currentContent.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-center mb-6 text-[#dadafa]"
          >
            {currentContent.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12 text-[#b0b0b0] max-w-3xl mx-auto"
          >
            {currentContent.description}
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {currentContent.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="bg-[#0a0a0a] backdrop-blur-sm border-2 border-[#dadafa]/30 p-6 text-center hover:border-[#ff102a] transition-colors"
              >
                <div className="text-3xl mb-2 text-white">{feature.icon}</div>
                <div className="text-base font-bold text-white">{feature.text}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-10"
          >
            <ShineButton
              onClick={() => setIsModalOpen(true)}
              className="inline-block px-16 py-6 bg-[#ff102a] text-white text-2xl font-bold border-4 border-[#ff102a] hover:bg-[#eb383e] hover:text-white shadow-2xl"
            >
              {currentContent.button}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block ml-2"
              >
                →
              </motion.span>
            </ShineButton>
          </motion.div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center text-sm text-[#b0b0b0] italic"
          >
            {currentContent.note}
          </motion.p>
        </div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-24 h-24 border-4 border-[#dadafa]/10"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 right-10 w-36 h-36 border-4 border-[#dadafa]/10"
        />
      </section>

      {/* Email Modal */}
      <EmailContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={language === 'zh' ? '职业交易员面试预约' : 'Professional Trader Interview'}
      />
    </>
  );
}
