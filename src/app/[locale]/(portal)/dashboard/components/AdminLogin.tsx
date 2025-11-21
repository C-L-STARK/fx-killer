"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import BrandName from '@/components/custom/BrandName';

interface AdminLoginProps {
  onAuthenticate: () => void;
}

export default function AdminLogin({ onAuthenticate }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call backend API to verify password
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // Store authentication in localStorage for persistent login
        localStorage.setItem('dashboard_authenticated', 'true');
        onAuthenticate();
      } else {
        const data = await response.json();
        setError(data.error || t('login.error'));
        setPassword('');
      }
    } catch (err) {
      console.error('[AdminLogin] Error:', err);
      setError(t('login.error'));
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full mx-4">
        <div className="bg-[#0a0a0a] border border-white/10 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <BrandName />
              <span>{t('login.title')}</span>
            </h1>
            <p className="text-gray-400">
              {t('login.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                {t('login.password.label')}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 border border-white/10 focus:ring-0 focus:border-[#ff102a] bg-black text-white transition-all"
                placeholder={t('login.password.placeholder')}
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-[#ff102a] font-semibold">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#ff102a] text-white font-semibold border border-[#ff102a] hover:bg-[#eb383e] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('login.button')}
                </span>
              ) : (
                t('login.button')
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {t('login.back')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
