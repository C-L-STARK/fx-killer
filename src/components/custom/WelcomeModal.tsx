"use client";

import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';


type ModalState = 'closed' | 'expanded' | 'minimized';

export interface WelcomeModalHandle {
  open: () => void;
  close: () => void;
  minimize: () => void;
}

const WelcomeModal = forwardRef<WelcomeModalHandle>((props, ref) => {
  const [modalState, setModalState] = useState<ModalState>('closed');

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { language } = useLanguage();

  const isZh = language === 'zh';

  // B站视频嵌入地址
  const bilibiliEmbedUrl = "//player.bilibili.com/player.html?isOutside=true&aid=258136585&bvid=BV19a411X7eY&cid=767139112&p=1";

  // 暂停视频
  const pauseVideo = () => {
    if (iframeRef.current) {
      // 通过重新设置 src 来停止视频播放
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = '';
      iframeRef.current.src = currentSrc;
    }
  };

  const handleClose = () => {
    pauseVideo();
    setModalState('closed');
  };

  const handleMinimize = () => {
    setModalState('minimized');
  };

  const handleExpand = () => {
    setModalState('expanded');
  };



  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    open: () => setModalState('expanded'),
    close: handleClose,
    minimize: handleMinimize,
  }));

  useEffect(() => {
    // 检查是否是首次访问
    const hasVisited = localStorage.getItem('fxkiller_welcome_shown');
    if (!hasVisited) {
      // 延迟 1 秒显示，让页面先加载
      setTimeout(() => {
        setModalState('expanded');
      }, 1000);
      localStorage.setItem('fxkiller_welcome_shown', 'true');
    }
  }, []);

  // 已关闭，不渲染任何内容
  if (modalState === 'closed') {
    return null;
  }

  const isMinimized = modalState === 'minimized';
  const isExpanded = modalState === 'expanded';

  const containerVariants = {
    expanded: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      x: '-50%',
      y: '-50%',
      width: 'calc(100% - 2rem)',
      maxWidth: '56rem',
      maxHeight: '90vh',
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 300,
      },
    },
    minimized: {
      top: 'auto',
      left: 'auto',
      right: '2rem',
      bottom: '10rem',
      x: 0,
      y: 0,
      width: '20rem',
      maxWidth: '20rem',
      maxHeight: 'auto',
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 300,
      },
    },
  };

  return (
    <>
      {/* 大弹窗背景遮罩 - 只在展开时显示 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              // 点击背景关闭
              if (e.target === e.currentTarget) {
                handleClose();
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* 统一的视频容器 - 通过 variants 控制位置和大小 */}
      <motion.div
        initial={false}
        animate={isExpanded ? 'expanded' : 'minimized'}
        variants={containerVariants}
        className="fixed z-50 bg-gray-50 dark:bg-black border-2 border-[#ff102a] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* 标题栏 - 根据状态显示不同内容 */}
        <div
          className={`text-white px-4 py-2 flex items-center justify-between ${isMinimized
            ? 'bg-[#ff102a]'
            : 'bg-[#ff102a] px-6 py-4 border-b-2 border-[#ff102a]/30'
            }`}
        >
          <div className="flex items-center gap-3">

            <div>
              <h2 className={isMinimized ? 'text-sm font-bold' : 'text-xl font-black'}>
                {isMinimized
                  ? isZh
                    ? '职业交易员介绍'
                    : 'Professional Trader Intro'
                  : isZh
                    ? '欢迎来到 汇刃'
                    : 'Welcome to FX Killer'}
              </h2>
              {isExpanded && (
                <p className="text-xs text-gray-300 dark:text-gray-700">
                  {isZh ? '了解职业交易员职位，开启你的交易生涯' : 'Learn about professional trading careers'}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isMinimized && (
              <button
                onClick={handleExpand}
                className="hover:scale-110 transition-transform"
                aria-label={isZh ? '展开' : 'Expand'}
                title={isZh ? '展开' : 'Expand'}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </button>
            )}
            {isExpanded && (
              <button
                onClick={handleMinimize}
                className="p-2 hover:bg-white/10 dark:hover:bg-black/10 transition-colors rounded"
                aria-label={isZh ? '最小化' : 'Minimize'}
                title={isZh ? '最小化' : 'Minimize'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
            )}
            <button
              onClick={handleClose}
              className={
                isMinimized
                  ? 'hover:scale-110 transition-transform'
                  : 'p-2 hover:bg-white/10 dark:hover:bg-black/10 transition-colors rounded'
              }
              aria-label={isZh ? '关闭' : 'Close'}
            >
              <svg className={isMinimized ? 'w-4 h-4' : 'w-5 h-5'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 视频容器 - 始终存在，不会重新挂载 */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            ref={iframeRef}
            src={bilibiliEmbedUrl}
            scrolling="no"
            frameBorder="0"
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>

        {/* 小窗口底部提示 */}
        {isMinimized && (
          <div className="p-3 bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              {isZh ? '点击展开查看完整内容' : 'Click expand to view full content'}
            </p>
          </div>
        )}

        {/* 大弹窗内容 - 只在展开时显示 */}

      </motion.div>
    </>
  );
});

WelcomeModal.displayName = 'WelcomeModal';

export default WelcomeModal;
