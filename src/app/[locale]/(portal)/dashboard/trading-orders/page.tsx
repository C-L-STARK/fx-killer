"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import type { TradingOrder } from '@/lib/supabase-trading';

interface OrderStats {
    total_orders: number;
    open_orders: number;
    closed_orders: number;
    total_profit: number;
    total_loss: number;
    net_profit: number;
    win_rate: number;
    total_lots: number;
}

export default function TradingOrdersDashboard() {
    const { language } = useLanguage();
    const isZh = language === 'zh';

    const [orders, setOrders] = useState<TradingOrder[]>([]);
    const [stats, setStats] = useState<OrderStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'ALL' | 'OPEN' | 'CLOSED'>('ALL');
    const [selectedSymbol, setSelectedSymbol] = useState('ALL');
    const [selectedPlatform, setSelectedPlatform] = useState<'ALL' | 'MT4' | 'MT5'>('ALL');
    const [searchTicket, setSearchTicket] = useState('');
    const [editingOrder, setEditingOrder] = useState<TradingOrder | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, [filter, selectedSymbol, selectedPlatform]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            let url = '/api/trading-orders?days=30&limit=200';
            if (filter !== 'ALL') url += `&status=${filter}`;
            if (selectedSymbol !== 'ALL') url += `&symbol=${selectedSymbol}`;
            if (selectedPlatform !== 'ALL') url += `&platform=${selectedPlatform}`;

            const response = await fetch(url);
            const result = await response.json();

            setOrders(result.data || []);
            fetchStats();
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/trading-orders?days=30&limit=1000');
            const result = await response.json();
            const orderData = result.data || [];

            const closedOrders = orderData.filter((o: TradingOrder) => o.status === 'CLOSED');
            const totalProfit = closedOrders.reduce((sum: number, o: TradingOrder) => sum + Math.max(o.profit || 0, 0), 0);
            const totalLoss = closedOrders.reduce((sum: number, o: TradingOrder) => sum + Math.abs(Math.min(o.profit || 0, 0)), 0);
            const winningOrders = closedOrders.filter((o: TradingOrder) => (o.profit || 0) > 0).length;

            setStats({
                total_orders: orderData.length,
                open_orders: orderData.filter((o: TradingOrder) => o.status === 'OPEN').length,
                closed_orders: closedOrders.length,
                total_profit: totalProfit,
                total_loss: totalLoss,
                net_profit: totalProfit - totalLoss,
                win_rate: closedOrders.length > 0 ? (winningOrders / closedOrders.length) * 100 : 0,
                total_lots: orderData.reduce((sum: number, o: TradingOrder) => sum + o.lots, 0)
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await fetch(`/api/trading-orders/${id}`, { method: 'DELETE' });
            fetchOrders();
            setShowDeleteConfirm(null);
        } catch (error) {
            console.error('Failed to delete order:', error);
            alert(isZh ? '删除失败' : 'Delete failed');
        }
    };

    const handleUpdate = async () => {
        if (!editingOrder) return;

        try {
            await fetch(`/api/trading-orders/${editingOrder.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingOrder)
            });
            fetchOrders();
            setEditingOrder(null);
        } catch (error) {
            console.error('Failed to update order:', error);
            alert(isZh ? '更新失败' : 'Update failed');
        }
    };

    const getUniqueSymbols = () => {
        const symbols = new Set(orders.map(o => o.symbol));
        return ['ALL', ...Array.from(symbols)];
    };

    const filteredOrders = orders.filter(order => {
        if (searchTicket && !order.ticket_id.toString().includes(searchTicket)) {
            return false;
        }
        return true;
    });

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleString(isZh ? 'zh-CN' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-black mb-2">
                        {isZh ? '交易订单管理' : 'Trading Orders Management'}
                    </h1>
                    <div className="h-1 w-32 bg-[#ff102a]"></div>
                </div>

                {/* Statistics */}
                {stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white/5 border border-white/10 p-6">
                            <div className="text-gray-400 text-sm mb-2">{isZh ? '总订单' : 'Total'}</div>
                            <div className="text-3xl font-black">{stats.total_orders}</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6">
                            <div className="text-gray-400 text-sm mb-2">{isZh ? '持仓中' : 'Open'}</div>
                            <div className="text-3xl font-black text-[#ff102a]">{stats.open_orders}</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6">
                            <div className="text-gray-400 text-sm mb-2">{isZh ? '胜率' : 'Win Rate'}</div>
                            <div className="text-3xl font-black">{stats.win_rate.toFixed(1)}%</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6">
                            <div className="text-gray-400 text-sm mb-2">{isZh ? '净利润' : 'Net P/L'}</div>
                            <div className={`text-3xl font-black ${stats.net_profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                ${stats.net_profit.toFixed(2)}
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="bg-white/5 border border-white/10 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">{isZh ? '状态' : 'Status'}</label>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value as 'ALL' | 'OPEN' | 'CLOSED')}
                                className="w-full bg-black border border-white/20 text-white px-4 py-2 focus:border-[#ff102a] outline-none"
                            >
                                <option value="ALL">ALL</option>
                                <option value="OPEN">OPEN</option>
                                <option value="CLOSED">CLOSED</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">{isZh ? '平台' : 'Platform'}</label>
                            <select
                                value={selectedPlatform}
                                onChange={(e) => setSelectedPlatform(e.target.value as 'ALL' | 'MT4' | 'MT5')}
                                className="w-full bg-black border border-white/20 text-white px-4 py-2 focus:border-[#ff102a] outline-none"
                            >
                                <option value="ALL">ALL</option>
                                <option value="MT4">MT4</option>
                                <option value="MT5">MT5</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">{isZh ? '品种' : 'Symbol'}</label>
                            <select
                                value={selectedSymbol}
                                onChange={(e) => setSelectedSymbol(e.target.value)}
                                className="w-full bg-black border border-white/20 text-white px-4 py-2 focus:border-[#ff102a] outline-none"
                            >
                                {getUniqueSymbols().map(symbol => (
                                    <option key={symbol} value={symbol}>{symbol}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">{isZh ? '搜索订单号' : 'Search Ticket'}</label>
                            <input
                                type="text"
                                value={searchTicket}
                                onChange={(e) => setSearchTicket(e.target.value)}
                                placeholder={isZh ? '输入订单号...' : 'Enter ticket...'}
                                className="w-full bg-black border border-white/20 text-white px-4 py-2 focus:border-[#ff102a] outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white/5 border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-black border-b border-white/10">
                                <tr className="text-left text-xs uppercase tracking-wider text-gray-400">
                                    <th className="p-4">{isZh ? '订单号' : 'Ticket'}</th>
                                    <th className="p-4">{isZh ? '平台' : 'Platform'}</th>
                                    <th className="p-4">{isZh ? '品种' : 'Symbol'}</th>
                                    <th className="p-4">{isZh ? '类型' : 'Type'}</th>
                                    <th className="p-4">{isZh ? '手数' : 'Lots'}</th>
                                    <th className="p-4">{isZh ? '开仓价' : 'Open'}</th>
                                    <th className="p-4">{isZh ? '平仓价' : 'Close'}</th>
                                    <th className="p-4">{isZh ? '盈亏' : 'P/L'}</th>
                                    <th className="p-4">{isZh ? '备注' : 'Comment'}</th>
                                    <th className="p-4">{isZh ? '状态' : 'Status'}</th>
                                    <th className="p-4">{isZh ? '操作' : 'Actions'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={11} className="p-8 text-center text-gray-400">
                                            {isZh ? '加载中...' : 'Loading...'}
                                        </td>
                                    </tr>
                                ) : filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={11} className="p-8 text-center text-gray-400">
                                            {isZh ? '暂无数据' : 'No data'}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                                            <td className="p-4 font-mono text-sm">#{order.ticket_id}</td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 bg-gray-800 text-xs">{order.platform}</span>
                                            </td>
                                            <td className="p-4 font-bold">{order.symbol}</td>
                                            <td className={`p-4 text-sm ${order.order_type.includes('BUY') ? 'text-green-500' : 'text-red-500'}`}>
                                                {order.order_type}
                                            </td>
                                            <td className="p-4">{order.lots.toFixed(2)}</td>
                                            <td className="p-4 font-mono text-sm">{order.open_price.toFixed(5)}</td>
                                            <td className="p-4 font-mono text-sm">{order.close_price?.toFixed(5) || '-'}</td>
                                            <td className={`p-4 font-bold ${!order.profit ? 'text-gray-400' :
                                                order.profit >= 0 ? 'text-green-500' : 'text-red-500'
                                                }`}>
                                                {order.profit ? `$${order.profit.toFixed(2)}` : '-'}
                                            </td>
                                            <td className="p-4 text-sm text-gray-400 max-w-[150px] truncate" title={order.comment || ''}>
                                                {order.comment || '-'}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 text-xs ${order.status === 'OPEN'
                                                    ? 'bg-[#ff102a]/20 text-[#ff102a]'
                                                    : 'bg-gray-800 text-gray-400'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setEditingOrder(order)}
                                                        className="text-blue-500 hover:text-blue-400 text-sm"
                                                    >
                                                        {isZh ? '编辑' : 'Edit'}
                                                    </button>
                                                    <button
                                                        onClick={() => setShowDeleteConfirm(order.id)}
                                                        className="text-red-500 hover:text-red-400 text-sm"
                                                    >
                                                        {isZh ? '删除' : 'Delete'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Edit Modal */}
                {editingOrder && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <div className="bg-[#0a0a0a] border border-white/20 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <h2 className="text-2xl font-black mb-6">{isZh ? '编辑订单' : 'Edit Order'}</h2>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="text-sm text-gray-400 block mb-2">{isZh ? '平仓价' : 'Close Price'}</label>
                                    <input
                                        type="number"
                                        step="0.00001"
                                        value={editingOrder.close_price || ''}
                                        onChange={(e) => setEditingOrder({ ...editingOrder, close_price: parseFloat(e.target.value) || null })}
                                        className="w-full bg-black border border-white/20 text-white px-4 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 block mb-2">{isZh ? '盈亏' : 'Profit'}</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={editingOrder.profit || ''}
                                        onChange={(e) => setEditingOrder({ ...editingOrder, profit: parseFloat(e.target.value) || null })}
                                        className="w-full bg-black border border-white/20 text-white px-4 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 block mb-2">{isZh ? '状态' : 'Status'}</label>
                                    <select
                                        value={editingOrder.status}
                                        onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value as any })}
                                        className="w-full bg-black border border-white/20 text-white px-4 py-2"
                                    >
                                        <option value="OPEN">OPEN</option>
                                        <option value="CLOSED">CLOSED</option>
                                        <option value="CANCELLED">CANCELLED</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 block mb-2">{isZh ? '备注' : 'Comment'}</label>
                                    <input
                                        type="text"
                                        value={editingOrder.comment || ''}
                                        onChange={(e) => setEditingOrder({ ...editingOrder, comment: e.target.value })}
                                        className="w-full bg-black border border-white/20 text-white px-4 py-2"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleUpdate}
                                    className="flex-1 bg-[#ff102a] text-white py-3 font-bold hover:bg-[#ff102a]/80"
                                >
                                    {isZh ? '保存' : 'Save'}
                                </button>
                                <button
                                    onClick={() => setEditingOrder(null)}
                                    className="flex-1 bg-gray-800 text-white py-3 font-bold hover:bg-gray-700"
                                >
                                    {isZh ? '取消' : 'Cancel'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <div className="bg-[#0a0a0a] border border-white/20 p-6 max-w-md w-full">
                            <h2 className="text-xl font-black mb-4">{isZh ? '确认删除' : 'Confirm Delete'}</h2>
                            <p className="text-gray-400 mb-6">
                                {isZh ? '确定要删除这条订单记录吗？' : 'Are you sure you want to delete this order?'}
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleDelete(showDeleteConfirm)}
                                    className="flex-1 bg-red-600 text-white py-3 font-bold hover:bg-red-700"
                                >
                                    {isZh ? '删除' : 'Delete'}
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(null)}
                                    className="flex-1 bg-gray-800 text-white py-3 font-bold hover:bg-gray-700"
                                >
                                    {isZh ? '取消' : 'Cancel'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
