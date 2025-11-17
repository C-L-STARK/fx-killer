"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Config } from '@/lib/supabase';

export default function ConfigManager() {
  const { language } = useLanguage();
  const [configs, setConfigs] = useState<Config[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingConfig, setEditingConfig] = useState<Config | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Password authentication state
  const [isConfigAuthenticated, setIsConfigAuthenticated] = useState(false);
  const [configPassword, setConfigPassword] = useState('');
  const [configPasswordError, setConfigPasswordError] = useState('');
  const [configPasswordLoading, setConfigPasswordLoading] = useState(false);

  const [formData, setFormData] = useState<Config>({
    key_name: '',
    key_content: '',
    key_remark: '',
  });

  // Fetch configs
  const fetchConfigs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/config');
      if (response.ok) {
        const data = await response.json();
        setConfigs(data);
      }
    } catch (error) {
      console.error('Failed to fetch configs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if already authenticated from localStorage
    const authenticated = localStorage.getItem('config_authenticated');
    if (authenticated === 'true') {
      setIsConfigAuthenticated(true);
      fetchConfigs();
    } else {
      setLoading(false);
    }
  }, []);

  // Handle config password authentication
  const handleConfigPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfigPasswordLoading(true);
    setConfigPasswordError('');

    try {
      const response = await fetch('/api/auth/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: configPassword }),
      });

      if (response.ok) {
        localStorage.setItem('config_authenticated', 'true');
        setIsConfigAuthenticated(true);
        fetchConfigs();
      } else {
        const data = await response.json();
        setConfigPasswordError(data.error || (language === 'zh' ? '密码错误' : 'Invalid password'));
        setConfigPassword('');
      }
    } catch (err) {
      console.error('[ConfigManager] Auth error:', err);
      setConfigPasswordError(language === 'zh' ? '验证失败，请重试' : 'Authentication failed, please retry');
      setConfigPassword('');
    } finally {
      setConfigPasswordLoading(false);
    }
  };

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = '/api/config';
      const method = editingConfig ? 'PUT' : 'POST';
      const body = editingConfig ? { ...formData, id: editingConfig.id } : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await fetchConfigs();
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save config:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm(language === 'zh' ? '确定要删除吗？' : 'Are you sure to delete?')) {
      return;
    }

    try {
      const response = await fetch(`/api/config?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchConfigs();
      }
    } catch (error) {
      console.error('Failed to delete config:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      key_name: '',
      key_content: '',
      key_remark: '',
    });
    setEditingConfig(null);
    setShowForm(false);
  };

  const startEdit = (config: Config) => {
    setFormData(config);
    setEditingConfig(config);
    setShowForm(true);
  };

  // Predefined model options for OPENAI_BLOG_MODEL
  const BLOG_MODEL_OPTIONS = [
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini (推荐 - 性价比高，已验证可用)' },
    { value: 'o3-mini', label: 'O3 Mini (推理模型，已修复兼容性)' },
    { value: 'custom', label: '自定义模型 (输入其他模型名称)' },
  ];

  // Check if current config is OPENAI_BLOG_MODEL
  const isModelConfig = formData.key_name === 'OPENAI_BLOG_MODEL';

  // Check if user selected custom model (not in predefined list)
  const isCustomModel = isModelConfig &&
    formData.key_content !== '' &&
    !BLOG_MODEL_OPTIONS.some(opt => opt.value === formData.key_content) &&
    formData.key_content !== 'custom';

  // Show password authentication modal if not authenticated
  if (!isConfigAuthenticated) {
    return (
      <div className="p-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'zh' ? '配置管理 - 密码验证' : 'Config Management - Password Required'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'zh' ? '请输入配置管理密码以继续' : 'Enter the configuration password to continue'}
              </p>
            </div>

            <form onSubmit={handleConfigPasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="config-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'zh' ? '密码' : 'Password'}
                </label>
                <input
                  type="password"
                  id="config-password"
                  value={configPassword}
                  onChange={(e) => {
                    setConfigPassword(e.target.value);
                    setConfigPasswordError('');
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 focus:ring-0 focus:border-black dark:focus:border-white dark:bg-gray-700 dark:text-white transition-all"
                  placeholder={language === 'zh' ? '输入配置管理密码' : 'Enter config password'}
                  autoFocus
                />
                {configPasswordError && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-semibold">
                    {configPasswordError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={configPasswordLoading}
                className="w-full py-3 px-4 bg-black dark:bg-white text-white dark:text-black font-semibold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {configPasswordLoading ? (
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

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-black text-black dark:text-white">
          {language === 'zh' ? '配置管理' : 'Configuration Management'}
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-80 transition-opacity"
        >
          {showForm ? (language === 'zh' ? '取消' : 'Cancel') : (language === 'zh' ? '添加配置' : 'Add Config')}
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-bold text-black dark:text-white mb-4">
            {editingConfig ? (language === 'zh' ? '编辑配置' : 'Edit Config') : (language === 'zh' ? '添加配置' : 'Add Config')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'zh' ? '配置键名 (Key Name)' : 'Key Name'}
              </label>
              <input
                type="text"
                value={formData.key_name}
                onChange={(e) => setFormData({ ...formData, key_name: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
                required
                placeholder="OPENAI_URL, OPENAI_KEY, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'zh' ? '配置值 (Key Content)' : 'Key Content'}
              </label>
              {isModelConfig ? (
                <div className="space-y-3">
                  <select
                    value={isCustomModel ? 'custom' : formData.key_content}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setFormData({ ...formData, key_content: '' });
                      } else {
                        setFormData({ ...formData, key_content: e.target.value });
                      }
                    }}
                    className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
                    required={!isCustomModel}
                  >
                    <option value="">{language === 'zh' ? '选择模型...' : 'Select model...'}</option>
                    {BLOG_MODEL_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                    {isCustomModel && (
                      <option value="custom" selected>
                        {language === 'zh' ? '自定义: ' : 'Custom: '}{formData.key_content}
                      </option>
                    )}
                  </select>

                  {(isCustomModel || formData.key_content === 'custom' || formData.key_content === '') && (
                    <div>
                      <input
                        type="text"
                        value={formData.key_content === 'custom' ? '' : formData.key_content}
                        onChange={(e) => setFormData({ ...formData, key_content: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
                        placeholder={language === 'zh' ? '输入自定义模型名称 (如: gpt-4, claude-3-opus)' : 'Enter custom model name (e.g., gpt-4, claude-3-opus)'}
                        required
                      />
                    </div>
                  )}

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {language === 'zh'
                      ? '💡 推荐使用 gpt-4o-mini (已验证可用，性价比最高)'
                      : '💡 Recommended: gpt-4o-mini (verified working, best value)'}
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-500">
                    {language === 'zh'
                      ? '⚠️ 注意: 只有列表中的模型经过测试，其他模型可能不可用'
                      : '⚠️ Note: Only listed models are tested, others may not work'}
                  </p>
                </div>
              ) : (
                <textarea
                  value={formData.key_content}
                  onChange={(e) => setFormData({ ...formData, key_content: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
                  rows={4}
                  required
                  placeholder={language === 'zh' ? '配置的具体内容...' : 'Configuration value...'}
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'zh' ? '备注 (Remark)' : 'Remark'}
              </label>
              <input
                type="text"
                value={formData.key_remark}
                onChange={(e) => setFormData({ ...formData, key_remark: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
                placeholder={language === 'zh' ? '配置说明...' : 'Description...'}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-80"
              >
                {editingConfig ? (language === 'zh' ? '更新' : 'Update') : (language === 'zh' ? '创建' : 'Create')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {language === 'zh' ? '取消' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">{language === 'zh' ? '加载中...' : 'Loading...'}</div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-sm font-bold text-black dark:text-white">
                  {language === 'zh' ? '键名' : 'Key Name'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-black dark:text-white">
                  {language === 'zh' ? '配置值' : 'Content'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-black dark:text-white">
                  {language === 'zh' ? '备注' : 'Remark'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-black dark:text-white">
                  {language === 'zh' ? '操作' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody>
              {configs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    {language === 'zh' ? '暂无配置' : 'No configurations'}
                  </td>
                </tr>
              ) : (
                configs.map((config) => (
                  <tr key={config.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-6 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                      {config.key_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate">
                      {config.key_content.length > 50
                        ? config.key_content.substring(0, 50) + '...'
                        : config.key_content}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {config.key_remark}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => startEdit(config)}
                        className="text-blue-600 dark:text-blue-400 hover:underline mr-4"
                      >
                        {language === 'zh' ? '编辑' : 'Edit'}
                      </button>
                      <button
                        onClick={() => config.id && handleDelete(config.id)}
                        className="text-red-600 dark:text-red-400 hover:underline"
                      >
                        {language === 'zh' ? '删除' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
