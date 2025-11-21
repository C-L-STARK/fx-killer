"use client";

import { useState, useEffect } from 'react';
import ParticleText from '@/components/custom/ParticleText';
import StrokeTextAnimation from '@/components/custom/StrokeTextAnimation';
import AnimatedText from '@/components/custom/AnimatedText';

export default function ParticleTestPage() {
  const [key, setKey] = useState(0);

  // 循环播放动画
  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prev => prev + 1);
    }, 4000); // 每4秒重新播放

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center justify-center gap-20 p-8">
      {/* 标题 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
          文字动画测试
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          三种动画方案对比
        </p>
      </div>

      {/* 方案1：3D 翻转 + 拆分动画（新推荐） */}
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
          方案1：3D 翻转 + 字符拆分（新推荐）
        </h2>
        <div className="w-full min-h-[250px] border-2 border-black dark:border-white flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
          <AnimatedText key={key} loop={false} />
        </div>
        <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
          <p>✨ "汇"字整体翻转，"刃"字拆分为点+刀</p>
          <p>✨ "X"为两条斜线交叉，"Killer"逐字弹入</p>
          <p>✨ 3D 效果，流畅自然，性能优秀</p>
        </div>
      </div>

      <div className="w-full border-t-2 border-gray-300 dark:border-gray-700"></div>

      {/* 方案2：SVG 笔画动画 */}
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
          方案2：SVG 笔画动画
        </h2>
        <div className="w-full min-h-[200px] border-2 border-black dark:border-white flex items-center justify-center p-8 bg-gray-50 dark:bg-black">
          <StrokeTextAnimation loop={true} />
        </div>
        <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
          <p>✨ 笔画逐个绘制</p>
          <p>⚠️ 简化的线条，不够真实</p>
        </div>
      </div>

      <div className="w-full border-t-2 border-gray-300 dark:border-gray-700"></div>

      {/* 方案3：粒子动画 */}
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
          方案3：粒子动画
        </h2>

        {/* 汇刃动画 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-center mb-4 text-black dark:text-white">
            汇刃
          </h3>
          <div className="w-full h-40 border-2 border-black dark:border-white bg-gray-50 dark:bg-black">
            <ParticleText
              text="汇刃"
              fontSize={100}
              color="#000000"
              particleCount={3000}
              animationDuration={2500}
            />
          </div>
        </div>

        {/* FxKiller 动画 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-center mb-4 text-black dark:text-white">
            FxKiller
          </h3>
          <div className="w-full h-40 border-2 border-black dark:border-white bg-gray-50 dark:bg-black">
            <ParticleText
              text="FxKiller"
              fontSize={80}
              color="#000000"
              particleCount={3000}
              animationDuration={2500}
            />
          </div>
        </div>

        <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
          <p>✨ 粒子汇聚效果</p>
          <p>⚠️ 性能消耗大</p>
        </div>
      </div>
    </div>
  );
}
