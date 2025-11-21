"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TopTrader as DbTrader } from '@/lib/supabase';
import type { TopTrader as DisplayTrader } from '@/types/top-traders';
import { convertDbTraderToDisplay } from '@/lib/topTradersMigration';
import AdminConfigAuth from './AdminConfigAuth';

export default function TopTradersManager() {
  const { language } = useLanguage();
  const [traders, setTraders] = useState<DbTrader[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTrader, setEditingTrader] = useState<DbTrader | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [formData, setFormData] = useState<Omit<DbTrader, 'id' | 'created_at' | 'updated_at'>>({
    rank: 1,
    trader_id: '',
    nickname: '',
    avatar: undefined,
    country: '',
    country_code: '',
    monthly_return: 0,
    total_return: 0,
    win_rate: 0,
    total_trades: 0,
    profit_factor: 0,
    max_drawdown: 0,
    sharpe_ratio: 0,
    trading_days: 0,
    account_size: 0,
    current_position: 0,
    in_matrix: false,
    update_time: new Date().toISOString(),
  });

  // Fetch traders (defined before useEffect)
  const fetchTraders = async (forceRefresh = false) => {
    setLoading(true);
    try {
      const url = forceRefresh ? '/api/top-traders?refresh=true' : '/api/top-traders';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTraders(data);
      }
    } catch (error) {
      console.error('Failed to fetch traders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status
  useEffect(() => {
    const authenticated = localStorage.getItem('config_authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
      fetchTraders();
    } else {
      setLoading(false);
    }
  }, []);

  // Show auth modal if not authenticated
  if (!isAuthenticated) {
    return <AdminConfigAuth onAuthenticated={() => {
      setIsAuthenticated(true);
      fetchTraders();
    }} />;
  }

  // Handle cache clearing
  const handleClearCache = async () => {
    if (!confirm(language === 'zh' ? '确定要清除缓存并刷新数据吗？' : 'Clear cache and refresh data?')) {
      return;
    }

    await fetchTraders(true);
    alert(language === 'zh' ? '缓存已清除，数据已刷新' : 'Cache cleared and data refreshed');
  };

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = '/api/top-traders';
      const method = editingTrader ? 'PUT' : 'POST';
      const body = editingTrader ? { ...formData, id: editingTrader.id } : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await fetchTraders();
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save trader:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm(language === 'zh' ? '确定要删除吗？' : 'Are you sure to delete?')) {
      return;
    }

    try {
      const response = await fetch(`/api/top-traders?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchTraders();
      }
    } catch (error) {
      console.error('Failed to delete trader:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      rank: 1,
      trader_id: '',
      nickname: '',
      avatar: undefined,
      country: '',
      country_code: '',
      monthly_return: 0,
      total_return: 0,
      win_rate: 0,
      total_trades: 0,
      profit_factor: 0,
      max_drawdown: 0,
      sharpe_ratio: 0,
      trading_days: 0,
      account_size: 0,
      current_position: 0,
      in_matrix: false,
      update_time: new Date().toISOString(),
    });
    setEditingTrader(null);
    setShowForm(false);
  };

  const startEdit = (trader: DbTrader) => {
    setFormData({
      rank: trader.rank,
      trader_id: trader.trader_id,
      nickname: trader.nickname,
      avatar: trader.avatar,
      country: trader.country,
      country_code: trader.country_code,
      monthly_return: trader.monthly_return,
      total_return: trader.total_return,
      win_rate: trader.win_rate,
      total_trades: trader.total_trades,
      profit_factor: trader.profit_factor,
      max_drawdown: trader.max_drawdown,
      sharpe_ratio: trader.sharpe_ratio,
      trading_days: trader.trading_days,
      account_size: trader.account_size,
      current_position: trader.current_position,
      in_matrix: trader.in_matrix,
      update_time: trader.update_time,
    });
    setEditingTrader(trader);
    setShowForm(true);
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-black text-white">
          {language === 'zh' ? '交易员排行榜管理' : 'Top Traders Management'}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleClearCache}
            className="px-6 py-3 bg-gray-600 dark:bg-gray-500 text-white font-bold hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {language === 'zh' ? '清除缓存' : 'Clear Cache'}
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-80 transition-opacity"
          >
            {showForm ? (language === 'zh' ? '取消' : 'Cancel') : (language === 'zh' ? '添加交易员' : 'Add Trader')}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-[#0a0a0a] border-2 border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingTrader ? (language === 'zh' ? '编辑交易员' : 'Edit Trader') : (language === 'zh' ? '添加交易员' : 'Add Trader')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '排名' : 'Rank'}
                </label>
                <input
                  type="number"
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '交易员ID' : 'Trader ID'}
                </label>
                <input
                  type="text"
                  value={formData.trader_id}
                  onChange={(e) => setFormData({ ...formData, trader_id: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '昵称' : 'Nickname'}
                </label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '国家' : 'Country'}
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '国家代码' : 'Country Code'}
                </label>
                <input
                  type="text"
                  value={formData.country_code}
                  onChange={(e) => setFormData({ ...formData, country_code: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                  maxLength={2}
                  placeholder="e.g., CN, US, GB"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '月收益率 (%)' : 'Monthly Return (%)'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.monthly_return}
                  onChange={(e) => setFormData({ ...formData, monthly_return: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '总收益率 (%)' : 'Total Return (%)'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.total_return}
                  onChange={(e) => setFormData({ ...formData, total_return: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '胜率 (%)' : 'Win Rate (%)'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.win_rate}
                  onChange={(e) => setFormData({ ...formData, win_rate: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '总交易次数' : 'Total Trades'}
                </label>
                <input
                  type="number"
                  value={formData.total_trades}
                  onChange={(e) => setFormData({ ...formData, total_trades: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '盈利因子' : 'Profit Factor'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.profit_factor}
                  onChange={(e) => setFormData({ ...formData, profit_factor: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '最大回撤 (%)' : 'Max Drawdown (%)'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.max_drawdown}
                  onChange={(e) => setFormData({ ...formData, max_drawdown: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '夏普比率' : 'Sharpe Ratio'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.sharpe_ratio}
                  onChange={(e) => setFormData({ ...formData, sharpe_ratio: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '交易天数' : 'Trading Days'}
                </label>
                <input
                  type="number"
                  value={formData.trading_days}
                  onChange={(e) => setFormData({ ...formData, trading_days: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '账户规模 ($)' : 'Account Size ($)'}
                </label>
                <input
                  type="number"
                  value={formData.account_size}
                  onChange={(e) => setFormData({ ...formData, account_size: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '当前持仓 ($)' : 'Current Position ($)'}
                </label>
                <input
                  type="number"
                  value={formData.current_position}
                  onChange={(e) => setFormData({ ...formData, current_position: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'zh' ? '更新时间' : 'Update Time'}
                </label>
                <input
                  type="datetime-local"
                  value={formData.update_time.slice(0, 16)}
                  onChange={(e) => setFormData({ ...formData, update_time: new Date(e.target.value).toISOString() })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-black text-white"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.in_matrix}
                onChange={(e) => setFormData({ ...formData, in_matrix: e.target.checked })}
                className="w-5 h-5"
              />
              <label className="text-sm text-gray-300">
                {language === 'zh' ? '在交易矩阵中' : 'In Trading Matrix'}
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-80"
              >
                {editingTrader ? (language === 'zh' ? '更新' : 'Update') : (language === 'zh' ? '创建' : 'Create')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-300 hover:bg-gray-100 dark:hover:bg-[#0a0a0a]"
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
        <div className="bg-[#0a0a0a] border-2 border-gray-200 dark:border-gray-700">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-sm font-bold text-white">{language === 'zh' ? '排名' : 'Rank'}</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">{language === 'zh' ? '交易员ID' : 'Trader ID'}</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">{language === 'zh' ? '昵称' : 'Nickname'}</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">{language === 'zh' ? '国家' : 'Country'}</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-white">{language === 'zh' ? '月收益率' : 'Monthly Return'}</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-white">{language === 'zh' ? '胜率' : 'Win Rate'}</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-white">{language === 'zh' ? '矩阵' : 'Matrix'}</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-white">{language === 'zh' ? '操作' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {traders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    {language === 'zh' ? '暂无数据' : 'No data'}
                  </td>
                </tr>
              ) : (
                traders.map((trader) => (
                  <tr key={trader.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{trader.rank}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{trader.trader_id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{trader.nickname}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{trader.country}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900 dark:text-gray-100">{trader.monthly_return.toFixed(1)}%</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900 dark:text-gray-100">{trader.win_rate.toFixed(1)}%</td>
                    <td className="px-6 py-4 text-center">
                      {trader.in_matrix && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => startEdit(trader)}
                        className="text-blue-600 dark:text-blue-400 hover:underline mr-4"
                      >
                        {language === 'zh' ? '编辑' : 'Edit'}
                      </button>
                      <button
                        onClick={() => trader.id && handleDelete(trader.id)}
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
