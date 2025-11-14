'use client';

import { useState, useEffect } from 'react';

/**
 * Brand Switcher Component - FOR TESTING ONLY
 *
 * This component allows quick switching between brand presets for testing.
 * Only visible in development mode.
 *
 * Usage: Add to any page during local testing
 * <BrandSwitcher />
 */
export default function BrandSwitcher() {
  const [presets, setPresets] = useState<string[]>([]);
  const [currentPreset, setCurrentPreset] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  useEffect(() => {
    loadPresets();
  }, []);

  const loadPresets = async () => {
    try {
      const response = await fetch('/api/brand/presets');
      if (response.ok) {
        const data = await response.json();
        setPresets(data.presets || []);
      }
    } catch (error) {
      console.error('Failed to load presets:', error);
    }
  };

  const switchPreset = async (presetName: string) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/brand/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presetName }),
      });

      if (response.ok) {
        setCurrentPreset(presetName);
        setMessage(`已切换到品牌: ${presetName}`);

        // Reload the page to apply changes
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setMessage('切换失败');
      }
    } catch (error) {
      console.error('Failed to switch preset:', error);
      setMessage('切换失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors text-sm font-bold"
          title="品牌切换器（测试用）"
        >
          🎨 品牌切换
        </button>
      )}

      {/* Switcher Panel */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 bg-white dark:bg-gray-900 border-2 border-purple-600 shadow-2xl rounded-lg p-6 w-80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400">
              🎨 品牌切换器
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
            测试功能：快速切换不同品牌配置
          </p>

          <div className="space-y-2">
            {presets.length === 0 ? (
              <p className="text-sm text-gray-500">加载中...</p>
            ) : (
              presets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => switchPreset(preset)}
                  disabled={loading}
                  className={`w-full px-4 py-2 rounded border-2 transition-all text-left ${
                    currentPreset === preset
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700 hover:border-purple-600'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{preset}</span>
                    {currentPreset === preset && (
                      <span className="text-xs">✓</span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>

          {message && (
            <div className={`mt-4 p-3 rounded text-sm ${
              message.includes('失败')
                ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
            }`}>
              {message}
            </div>
          )}

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
            ⚠️ 切换后将自动刷新页面
          </p>
        </div>
      )}
    </>
  );
}
