"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogAIGeneratorProps {
  onGenerated: (data: {
    title: string;
    title_en: string;
    content: string;
    content_en: string;
    tags: string;
    tags_en: string;
    remark: string;
    remark_en: string;
    author: string;
  }) => void;
  onClose: () => void;
}

export default function BlogAIGenerator({ onGenerated, onClose }: BlogAIGeneratorProps) {
  const { language } = useLanguage();
  const [userInput, setUserInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [streamContent, setStreamContent] = useState('');
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      setError(language === 'zh' ? '请输入文章核心内容' : 'Please enter article content');
      return;
    }

    setGenerating(true);
    setError('');
    setStreamContent('');
    setProgress(0);

    try {
      const response = await fetch('/api/blogs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Generation failed');
        } else {
          // API returned HTML or other non-JSON response (likely an error page)
          const errorText = await response.text();
          console.error('[BlogAI] Non-JSON error response:', errorText.substring(0, 500));
          throw new Error(
            language === 'zh'
              ? '服务器配置错误。请检查 OpenAI API 配置是否正确（OPENAI_URL, OPENAI_KEY, OPENAI_BLOG_MODEL）'
              : 'Server configuration error. Please check OpenAI API configuration (OPENAI_URL, OPENAI_KEY, OPENAI_BLOG_MODEL)'
          );
        }
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let fullContent = '';
      let buffer = ''; // Buffer for incomplete SSE messages

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk; // Append to buffer

        // Process complete SSE messages (separated by double newline)
        const messages = buffer.split('\n\n');
        // Keep the last potentially incomplete message in buffer
        buffer = messages.pop() || '';

        for (const message of messages) {
          if (!message.trim()) continue;

          // Extract data from SSE format: "data: {...}"
          const lines = message.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const jsonStr = line.slice(6).trim();
                if (!jsonStr) continue;

                console.log('[BlogAI] Parsing JSON:', jsonStr.substring(0, 200));
                const data = JSON.parse(jsonStr);

                if (data.type === 'content') {
                  fullContent += data.data;
                  setStreamContent(fullContent);
                  const estimatedTotal = 5000;
                  setProgress(Math.min(90, (fullContent.length / estimatedTotal) * 100));
                } else if (data.type === 'complete') {
                  console.log('[BlogAI] Complete event received:', {
                    hasTitle: !!data.data?.title,
                    hasContent: !!data.data?.content,
                    contentLength: data.data?.content?.length
                  });
                  setProgress(100);
                  onGenerated({ ...data.data, author: 'FX Killer Team' });
                } else if (data.type === 'error') {
                  throw new Error(data.data);
                }
              } catch (e) {
                const error = e as Error;
                console.error('[BlogAI] JSON parse error:', error.message);
                console.error('[BlogAI] Failed line:', line.substring(0, 500));
              }
            }
          }
        }
      }

      // Process any remaining data in buffer
      if (buffer.trim()) {
        const lines = buffer.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonStr = line.slice(6).trim();
              if (!jsonStr) continue;

              console.log('[BlogAI] Processing final buffer:', jsonStr.substring(0, 200));
              const data = JSON.parse(jsonStr);

              if (data.type === 'complete') {
                console.log('[BlogAI] Complete event from buffer');
                setProgress(100);
                onGenerated({ ...data.data, author: 'FX Killer Team' });
              }
            } catch (e) {
              console.error('[BlogAI] Error processing final buffer:', e);
            }
          }
        }
      }
    } catch (err: any) {
      setError(err.message || (language === 'zh' ? '生成失败，请重试' : 'Generation failed, please try again'));
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-black w-full max-w-3xl mx-4 border-2 border-gray-200 dark:border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b-2 border-gray-200 dark:border-gray-700 flex justify-between items-center bg-black dark:bg-white">
          <h2 className="text-2xl font-black text-white dark:text-black">
            {language === 'zh' ? 'AI 博客生成器' : 'AI Blog Generator'}
          </h2>
          <button
            onClick={onClose}
            className="text-white dark:text-black hover:opacity-70 transition-opacity"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-300 mb-3">
              {language === 'zh' ? '文章核心内容' : 'Article Core Content'}
            </label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={generating}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-[#0a0a0a] text-white rounded-none focus:border-black dark:focus:border-white focus:outline-none transition-colors disabled:opacity-50"
              rows={12}
              placeholder={
                language === 'zh'
                  ? '请输入文章的核心内容、要点、目标受众等信息...\n\n示例：\n主题：外汇交易中的风险管理\n要点：\n1. 止损的重要性\n2. 仓位管理策略\n3. 情绪控制技巧\n目标：帮助新手交易员建立风险意识'
                  : 'Enter the core content, key points, target audience, etc...\n\nExample:\nTopic: Risk Management in Forex Trading\nKey Points:\n1. Importance of stop-loss\n2. Position sizing strategies\n3. Emotional control techniques\nGoal: Help beginner traders develop risk awareness'
              }
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {language === 'zh'
                ? '💡 提示：提供的信息越详细，生成的文章质量越高。AI 会自动应用预设的样式模板和添加合适的内部链接。'
                : '💡 Tip: The more detailed information you provide, the higher quality article will be generated. AI will automatically apply preset style templates and add appropriate internal links.'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Progress Bar */}
          {generating && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-white">
                  {language === 'zh' ? 'AI 生成进度' : 'AI Generation Progress'}
                </span>
                <span className="text-sm font-bold text-white">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-600">
                <div
                  className="h-full bg-black dark:bg-white transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Streaming Content Preview */}
          {generating && streamContent && (
            <div className="mb-6 p-4 bg-[#0a0a0a] border-2 border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase">
                {language === 'zh' ? '实时生成内容' : 'Live Content Stream'}
              </p>
              <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">
                {streamContent.length > 500 ? streamContent.slice(-500) + '...' : streamContent}
              </pre>
            </div>
          )}

          {/* Info Box */}
          <div className="mb-6 p-4 bg-[#0a0a0a] border-2 border-gray-200 dark:border-gray-700">
            <p className="text-sm font-bold text-white mb-2">
              {language === 'zh' ? 'AI 将自动生成：' : 'AI will automatically generate:'}
            </p>
            <ul className="space-y-1">
              <li className="text-sm text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">•</span>
                <span>{language === 'zh' ? '中英文双语标题和内容' : 'Bilingual titles and content (Chinese & English)'}</span>
              </li>
              <li className="text-sm text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">•</span>
                <span>{language === 'zh' ? '符合汇刃品牌风格的HTML样式' : 'FX Killer brand-style HTML formatting'}</span>
              </li>
              <li className="text-sm text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">•</span>
                <span>{language === 'zh' ? '智能选择的内部和外部链接' : 'Intelligently selected internal and external links'}</span>
              </li>
              <li className="text-sm text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">•</span>
                <span>{language === 'zh' ? '相关标签和预计阅读时间' : 'Relevant tags and estimated reading time'}</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="flex-1 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold border-2 border-gray-800 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === 'zh' ? 'AI 生成中...' : 'AI Generating...'}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {language === 'zh' ? '生成博客文章' : 'Generate Blog Post'}
                </>
              )}
            </button>
            <button
              onClick={onClose}
              disabled={generating}
              className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-300 hover:bg-gray-100 dark:hover:bg-[#0a0a0a] transition-colors disabled:opacity-50"
            >
              {language === 'zh' ? '取消' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
