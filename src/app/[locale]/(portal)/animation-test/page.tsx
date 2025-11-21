"use client";

import { useState, useEffect } from 'react';
import ModernTextAnimation from '@/components/custom/ModernTextAnimation';

export default function AnimationShowcase() {
  const [keys, setKeys] = useState({
    typewriter: 0,
    gradient: 0,
    glitch: 0,
    neon: 0,
    scale: 0,
    split: 0,
  });

  // 每种动画独立循环
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    // 打字机效果：每6秒重播
    intervals.push(setInterval(() => {
      setKeys(prev => ({ ...prev, typewriter: prev.typewriter + 1 }));
    }, 6000));

    // 其他效果：每4秒重播
    ["gradient", "glitch", "neon", "scale", "split"].forEach((type) => {
      intervals.push(setInterval(() => {
        setKeys(prev => ({ ...prev, [type]: (prev as any)[type] + 1 }));
      }, 5000));
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-black dark:text-white mb-4">
            现代文字动画效果
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            6种不同风格 - 选择你喜欢的
          </p>
        </div>

        {/* 方案A：打字机效果 */}
        <div className="mb-32">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              方案A：打字机效果
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              专业、简洁、科技感
            </p>
          </div>
          <div className="min-h-[200px] border-2 border-black dark:border-white rounded-lg flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
            <ModernTextAnimation key={keys.typewriter} text="汇刃 FxKiller" type="typewriter" />
          </div>
        </div>

        {/* 方案B：渐变色流动 */}
        <div className="mb-32">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              方案B：渐变色流动
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              现代、活力、视觉冲击
            </p>
          </div>
          <div className="min-h-[200px] border-2 border-black dark:border-white rounded-lg flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
            <ModernTextAnimation key={keys.gradient} text="汇刃 FxKiller" type="gradient" />
          </div>
        </div>

        {/* 方案C：故障效果 */}
        <div className="mb-32">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              方案C：故障风格 (Glitch)
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              赛博朋克、酷炫、前卫
            </p>
          </div>
          <div className="min-h-[200px] border-2 border-black dark:border-white rounded-lg flex items-center justify-center p-8 bg-black dark:bg-gray-950">
            <ModernTextAnimation key={keys.glitch} text="汇刃 FxKiller" type="glitch" />
          </div>
        </div>

        {/* 方案D：霓虹灯效果 */}
        <div className="mb-32">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              方案D：霓虹灯效果
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              未来科技、发光、夜店风
            </p>
          </div>
          <div className="min-h-[200px] border-2 border-black dark:border-white rounded-lg flex items-center justify-center p-8 bg-black dark:bg-gray-950">
            <ModernTextAnimation key={keys.neon} text="汇刃 FxKiller" type="neon" />
          </div>
        </div>

        {/* 方案E：简单缩放 */}
        <div className="mb-32">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              方案E：弹性缩放
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              优雅、简洁、经典
            </p>
          </div>
          <div className="min-h-[200px] border-2 border-black dark:border-white rounded-lg flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
            <ModernTextAnimation key={keys.scale} text="汇刃 FxKiller" type="scale" />
          </div>
        </div>

        {/* 方案F：文字分裂 */}
        <div className="mb-32">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              方案F：文字分裂重组
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              动感、有趣、吸睛
            </p>
          </div>
          <div className="min-h-[200px] border-2 border-black dark:border-white rounded-lg flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
            <ModernTextAnimation key={keys.split} text="汇刃 FxKiller" type="split" />
          </div>
        </div>

        {/* 底部提示 */}
        <div className="text-center text-gray-600 dark:text-gray-400 mt-20">
          <p className="text-lg">
            💡 每个动画都会自动循环播放
          </p>
          <p className="text-sm mt-2">
            所有效果都支持暗黑模式，滚动页面查看所有方案
          </p>
        </div>
      </div>
    </div>
  );
}
