"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';

interface LiveTradingConnectionProps {
  isOpen: boolean;
  stage: 'connecting' | 'authenticating' | 'connected' | 'error';
  message: string;
  onClose?: () => void;
}

export default function LiveTradingConnection({
  isOpen,
  stage,
  message,
  onClose
}: LiveTradingConnectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getStageIcon = () => {
    if (stage === 'connecting') return '🔌';
    if (stage === 'authenticating') return '🔐';
    if (stage === 'connected') return '✅';
    return '❌';
  };

  const getStageText = () => {
    if (stage === 'connecting') return '正在连接到Binance API';
    if (stage === 'authenticating') return '正在验证API密钥';
    if (stage === 'connected') return '连接成功';
    return '连接失败';
  };

  const getStageColor = () => {
    if (stage === 'error') return 'text-red-600 dark:text-red-400';
    if (stage === 'connected') return 'text-green-600 dark:text-green-400';
    return 'text-white';
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, margin: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#0a0a0a] border-4 border-gray-800 p-8 max-w-md w-full mx-4"
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <span className="text-6xl">{getStageIcon()}</span>
            </div>

            {/* Stage Text */}
            <h3 className={`text-2xl font-bold text-center mb-6 ${getStageColor()}`}>
              {getStageText()}
            </h3>

            {/* Message */}
            <p className="text-center text-sm text-gray-400 mb-4">
              {message}
            </p>

            {/* Connection Status Details */}
            {stage === 'connected' && (
              <div className="bg-gray-100 dark:bg-black border-2 border-gray-300 dark:border-gray-700 p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">网络状态</span>
                  <span className="text-sm text-green-600 dark:text-green-400 font-bold">正常</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">策略状态</span>
                  <span className="text-sm text-green-600 dark:text-green-400 font-bold">运行中</span>
                </div>
              </div>
            )}

            {/* Spinner (only show when not complete) */}
            {(stage === 'connecting' || stage === 'authenticating') && (
              <div className="flex justify-center mb-4">
                <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin" />
              </div>
            )}

            {/* Close/Retry Button */}
            {(stage === 'connected' || stage === 'error') && onClose && (
              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-gray-800 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
              >
                {stage === 'connected' ? '开始交易' : '重试'}
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
