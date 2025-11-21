"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';

interface BacktestProgressProps {
  isOpen: boolean;
  stage: 'fetching' | 'running' | 'complete';
  progress: number;
  message: string;
}

export default function BacktestProgress({ isOpen, stage, progress, message }: BacktestProgressProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const getStageIcon = () => {
    if (stage === 'fetching') return '📥';
    if (stage === 'running') return '⚙️';
    return '✅';
  };

  const getStageText = () => {
    if (stage === 'fetching') return '正在下载历史数据';
    if (stage === 'running') return '正在运行回测策略';
    return '回测完成';
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
            <h3 className="text-2xl font-bold text-center text-white mb-6">
              {getStageText()}
            </h3>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full h-4 bg-gray-200 dark:bg-[#0a0a0a] border-2 border-gray-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-black dark:bg-white"
                />
              </div>
              <p className="text-center text-sm font-bold text-white mt-2">
                {progress}%
              </p>
            </div>

            {/* Message */}
            <p className="text-center text-sm text-gray-400 mb-4">
              {message}
            </p>

            {/* Spinner (only show when not complete) */}
            {stage !== 'complete' && (
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin" />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
