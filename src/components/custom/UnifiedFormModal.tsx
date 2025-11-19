"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';

interface PlanData {
  size: string;
  usdPrice: number;
  cnyPrice: number;
}

interface UnifiedFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: 'interview' | 'contact' | 'propfirm' | 'membership';
  title?: string;
  planData?: PlanData;
}

export default function UnifiedFormModal({
  isOpen,
  onClose,
  formType,
  title,
  planData,
}: UnifiedFormModalProps) {
  const { language } = useLanguage();
  const router = useRouter();
  const isZh = language === 'zh';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    paymentMethod: 'wechat',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Get default title based on form type
  const getDefaultTitle = () => {
    switch (formType) {
      case 'interview':
        return isZh ? '预约面试' : 'Schedule Interview';
      case 'contact':
        return isZh ? '快速联系' : 'Quick Contact';
      case 'propfirm':
        return isZh ? `选择计划: ${planData?.size || ''}` : `Selected Plan: ${planData?.size || ''}`;
      case 'membership':
        return isZh ? '申请成为会员' : 'Apply for Membership';
      default:
        return isZh ? '联系我们' : 'Contact Us';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const submitData: Record<string, any> = {
        formType,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        language,
      };

      // Add propfirm specific data
      if (formType === 'propfirm' && planData) {
        submitData.plan = planData.size;
        submitData.priceUsd = `$${planData.usdPrice}`;
        submitData.priceCny = `¥${planData.cnyPrice}`;
        submitData.paymentMethod = formData.paymentMethod;
      }

      const response = await fetch('/api/form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Close modal first, then redirect
      onClose();

      // Redirect to thank you page
      router.push(`/${language}/thank-you`);
    } catch (err) {
      setError(isZh ? '提交失败，请稍后重试' : 'Submission failed, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-900 w-full max-w-md max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-black dark:bg-white text-white dark:text-black px-6 py-4 flex items-center justify-between sticky top-0">
            <h3 className="text-lg font-bold">
              {title || getDefaultTitle()}
            </h3>
            <button
              onClick={onClose}
              className="hover:scale-110 transition-transform"
              aria-label={isZh ? '关闭' : 'Close'}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Plan Info for propfirm */}
            {formType === 'propfirm' && planData && (
              <div className="bg-gray-100 dark:bg-gray-800 p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-black dark:text-white">{planData.size}</span>
                  <span className="text-black dark:text-white font-bold">
                    ¥{planData.cnyPrice.toLocaleString()} / ${planData.usdPrice}
                  </span>
                </div>
              </div>
            )}

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold mb-2 text-black dark:text-white"
              >
                {isZh ? '姓名 *' : 'Name *'}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-black dark:focus:border-white outline-none transition-colors"
                placeholder={isZh ? '请输入您的姓名' : 'Enter your name'}
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold mb-2 text-black dark:text-white"
              >
                {isZh ? '邮箱 *' : 'Email *'}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-black dark:focus:border-white outline-none transition-colors"
                placeholder={isZh ? '请输入您的邮箱' : 'Enter your email'}
              />
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-bold mb-2 text-black dark:text-white"
              >
                {isZh ? '手机号码 *' : 'Phone Number *'}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-black dark:focus:border-white outline-none transition-colors"
                placeholder={isZh ? '请输入您的手机号码' : 'Enter your phone number'}
              />
            </div>

            {/* Payment Method for propfirm */}
            {formType === 'propfirm' && (
              <div>
                <label
                  htmlFor="paymentMethod"
                  className="block text-sm font-bold mb-2 text-black dark:text-white"
                >
                  {isZh ? '支付方式 *' : 'Payment Method *'}
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  required
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-black dark:focus:border-white outline-none transition-colors"
                >
                  <option value="wechat">{isZh ? '微信支付' : 'WeChat Pay'}</option>
                  <option value="alipay">{isZh ? '支付宝' : 'Alipay'}</option>
                  <option value="usdt">USDT</option>
                </select>
              </div>
            )}

            {/* Message Field - optional for some form types */}
            {(formType === 'contact' || formType === 'membership') && (
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold mb-2 text-black dark:text-white"
                >
                  {isZh ? '留言' : 'Message'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-black dark:focus:border-white outline-none transition-colors resize-none"
                  placeholder={isZh ? '请告诉我们您的需求...' : 'Tell us your needs...'}
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {isZh ? '提交中...' : 'Submitting...'}
                </>
              ) : (
                isZh ? '提交' : 'Submit'
              )}
            </button>

            {/* Privacy Note */}
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              {isZh
                ? '我们重视您的隐私，不会分享您的信息'
                : 'We value your privacy and will not share your information'}
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
