"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogStyleHelperProps {
  onInsert: (html: string) => void;
}

export default function BlogStyleHelper({ onInsert }: BlogStyleHelperProps) {
  const { language } = useLanguage();
  const [showTemplates, setShowTemplates] = useState(false);

  const templates = {
    heading1: {
      name: language === 'zh' ? '主标题 (H1)' : 'Main Heading (H1)',
      html: '<h1 class="text-4xl font-bold text-center mb-8 text-white">标题文字</h1>',
    },
    heading2: {
      name: language === 'zh' ? '副标题 (H2)' : 'Sub Heading (H2)',
      html: '<h2 class="text-3xl font-bold text-center mb-4 text-white border-b-4 border-gray-800 inline-block pb-2 w-full">标题文字</h2>',
    },
    paragraph: {
      name: language === 'zh' ? '段落' : 'Paragraph',
      html: '<p class="text-base leading-relaxed mb-6 text-gray-300">段落文字内容</p>',
    },
    highlightBox: {
      name: language === 'zh' ? '高亮框' : 'Highlight Box',
      html: `<div class="bg-black dark:bg-white text-white dark:text-black p-8 mb-8 border-2 border-gray-800">
<p class="text-3xl font-bold mb-4 text-white dark:text-black text-center">重点标题</p>
<p class="text-lg text-center text-white dark:text-black">重点说明文字</p>
</div>`,
    },
    statsGrid: {
      name: language === 'zh' ? '数据卡片组 (4列)' : 'Stats Grid (4 cols)',
      html: `<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
<div class="bg-[#0a0a0a] p-6 border-2 border-gray-200 dark:border-gray-700">
<div class="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
<span class="text-2xl text-white dark:text-black font-bold">30</span>
</div>
<p class="text-xl font-bold mb-2 text-white">标题</p>
<p class="text-gray-400 leading-relaxed">说明文字</p>
</div>
<div class="bg-[#0a0a0a] p-6 border-2 border-gray-200 dark:border-gray-700">
<div class="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
<span class="text-2xl text-white dark:text-black font-bold">10</span>
</div>
<p class="text-xl font-bold mb-2 text-white">标题</p>
<p class="text-gray-400 leading-relaxed">说明文字</p>
</div>
<div class="bg-[#0a0a0a] p-6 border-2 border-gray-200 dark:border-gray-700">
<div class="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
<span class="text-2xl text-white dark:text-black font-bold">90</span>
</div>
<p class="text-xl font-bold mb-2 text-white">标题</p>
<p class="text-gray-400 leading-relaxed">说明文字</p>
</div>
<div class="bg-[#0a0a0a] p-6 border-2 border-gray-200 dark:border-gray-700">
<div class="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
<span class="text-2xl text-white dark:text-black font-bold">0</span>
</div>
<p class="text-xl font-bold mb-2 text-white">标题</p>
<p class="text-gray-400 leading-relaxed">说明文字</p>
</div>
</div>`,
    },
    contentGrid3: {
      name: language === 'zh' ? '内容卡片组 (3列)' : 'Content Grid (3 cols)',
      html: `<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<div class="bg-[#0a0a0a] p-6 border-2 border-gray-200 dark:border-gray-700">
<div class="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
<span class="text-2xl text-white dark:text-black font-bold">1</span>
</div>
<p class="text-xl font-bold mb-3 text-white">小标题</p>
<p class="text-gray-400 leading-relaxed mb-2">说明文字段落</p>
<ul class="space-y-2 mt-4">
<li class="text-gray-400 text-sm flex items-start gap-2"><span class="text-white font-bold">•</span><span>列表项1</span></li>
<li class="text-gray-400 text-sm flex items-start gap-2"><span class="text-white font-bold">•</span><span>列表项2</span></li>
<li class="text-gray-400 text-sm flex items-start gap-2"><span class="text-white font-bold">•</span><span>列表项3</span></li>
</ul>
</div>
<div class="bg-[#0a0a0a] p-6 border-2 border-gray-200 dark:border-gray-700">
<div class="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
<span class="text-2xl text-white dark:text-black font-bold">2</span>
</div>
<p class="text-xl font-bold mb-3 text-white">小标题</p>
<p class="text-gray-400 leading-relaxed mb-2">说明文字段落</p>
<ul class="space-y-2 mt-4">
<li class="text-gray-400 text-sm flex items-start gap-2"><span class="text-white font-bold">•</span><span>列表项1</span></li>
<li class="text-gray-400 text-sm flex items-start gap-2"><span class="text-white font-bold">•</span><span>列表项2</span></li>
<li class="text-gray-400 text-sm flex items-start gap-2"><span class="text-white font-bold">•</span><span>列表项3</span></li>
</ul>
</div>
<div class="bg-[#0a0a0a] p-6 border-2 border-gray-200 dark:border-gray-700">
<div class="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
<span class="text-2xl text-white dark:text-black font-bold">3</span>
</div>
<p class="text-xl font-bold mb-3 text-white">小标题</p>
<p class="text-gray-400 leading-relaxed mb-2">说明文字段落</p>
<ul class="space-y-2 mt-4">
<li class="text-gray-400 text-sm flex items-start gap-2"><span class="text-white font-bold">•</span><span>列表项1</span></li>
<li class="text-gray-400 text-sm flex items-start gap-2"><span class="text-white font-bold">•</span><span>列表项2</span></li>
<li class="text-gray-400 text-sm flex items-start gap-2"><span class="text-white font-bold">•</span><span>列表项3</span></li>
</ul>
</div>
</div>`,
    },
    bulletList: {
      name: language === 'zh' ? '无序列表' : 'Bullet List',
      html: `<ul class="space-y-2 mb-6">
<li class="text-gray-400 flex items-start gap-2"><span class="text-white font-bold">•</span><span>列表项1</span></li>
<li class="text-gray-400 flex items-start gap-2"><span class="text-white font-bold">•</span><span>列表项2</span></li>
<li class="text-gray-400 flex items-start gap-2"><span class="text-white font-bold">•</span><span>列表项3</span></li>
</ul>`,
    },
    quote: {
      name: language === 'zh' ? '引用块' : 'Quote Block',
      html: '<blockquote class="border-l-4 border-gray-800 pl-6 py-4 mb-6 bg-[#0a0a0a]">\n<p class="text-lg italic text-gray-300">引用内容文字</p>\n</blockquote>',
    },
    cta: {
      name: language === 'zh' ? '行动按钮' : 'CTA Button',
      html: '<div class="text-center mb-8">\n<a href="#" class="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold text-lg hover:opacity-80 transition-opacity">\n按钮文字\n</a>\n</div>',
    },
    divider: {
      name: language === 'zh' ? '分隔线' : 'Divider',
      html: '<hr class="border-t-2 border-gray-300 dark:border-gray-700 my-8" />',
    },
  };

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setShowTemplates(!showTemplates)}
        className="px-4 py-2 bg-gray-200 dark:bg-[#0a0a0a] text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        {showTemplates
          ? language === 'zh'
            ? '隐藏样式模板'
            : 'Hide Style Templates'
          : language === 'zh'
            ? '显示样式模板'
            : 'Show Style Templates'}
      </button>

      {showTemplates && (
        <div className="mt-4 p-4 bg-[#0a0a0a] border-2 border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-300 mb-3">
            {language === 'zh'
              ? '点击任意模板将其插入到编辑器中：'
              : 'Click any template to insert it into the editor:'}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {Object.entries(templates).map(([key, template]) => (
              <button
                key={key}
                type="button"
                onClick={() => onInsert(template.html)}
                className="px-3 py-2 bg-black text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#0a0a0a] transition-colors text-sm text-left"
              >
                {template.name}
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              {language === 'zh'
                ? '💡 提示：所有样式都支持深色模式，使用了 Tailwind CSS dark: 前缀'
                : '💡 Tip: All styles support dark mode using Tailwind CSS dark: prefix'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
