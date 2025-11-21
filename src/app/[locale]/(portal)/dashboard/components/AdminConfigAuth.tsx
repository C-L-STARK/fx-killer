"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdminConfigAuthProps {
  onAuthenticated: () => void;
}

export default function AdminConfigAuth({ onAuthenticated }: AdminConfigAuthProps) {
  const { language } = useLanguage();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        localStorage.setItem('config_authenticated', 'true');
        onAuthenticated();
      } else {
        const data = await response.json();
        setError(data.error || (language === 'zh' ? '密码错误' : 'Invalid password'));
        setPassword('');
      }
    } catch (err) {
      console.error('[AdminConfigAuth] Error:', err);
      setError(language === 'zh' ? '验证失败，请重试' : 'Authentication failed, please retry');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-md mx-auto">
        <div className="bg-[#0a0a0a] border-2 border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'zh' ? '管理权限验证' : 'Management Authorization'}
            </h2>
            <p className="text-gray-400">
              {language === 'zh' ? '此页面需要额外的管理权限，请输入密码' : 'This page requires additional authorization'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-config-password" className="block text-sm font-medium text-gray-300 mb-2">
                {language === 'zh' ? '管理密码' : 'Admin Password'}
              </label>
              <input
                type="password"
                id="admin-config-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 focus:ring-0 focus:border-black dark:focus:border-white dark:bg-[#0a0a0a] dark:text-white transition-all"
                placeholder={language === 'zh' ? '输入管理密码' : 'Enter admin password'}
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-semibold">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-black dark:bg-white text-white dark:text-black font-semibold border-2 border-gray-800 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === 'zh' ? '验证中...' : 'Verifying...'}
                </span>
              ) : (
                language === 'zh' ? '验证' : 'Verify'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
