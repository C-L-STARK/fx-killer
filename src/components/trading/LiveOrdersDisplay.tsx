'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface TradingOrder {
    id: string;
    platform: 'MT4' | 'MT5';
    account_number: string;
    broker?: string | null;
    ticket_id: number;
    symbol: string;
    order_type: string;
    lots: number;
    open_price: number;
    close_price?: number;
    stop_loss?: number;
    take_profit?: number;
    open_time: string;
    close_time?: string;
    commission?: number;
    swap?: number;
    profit?: number;
    status: 'OPEN' | 'CLOSED' | 'CANCELLED';
    comment?: string;
    magic_number?: number;
}

interface Stats {
    total_orders: number;
    open_orders: number;
    closed_orders: number;
    total_profit: number;
    total_loss: number;
    net_profit: number;
    win_rate: number;
    profit_factor: number;
}

export default function LiveOrdersDisplay() {
    const { language } = useLanguage();
    const [orders, setOrders] = useState<TradingOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [stats, setStats] = useState<Stats>({
        total_orders: 0,
        open_orders: 0,
        closed_orders: 0,
        total_profit: 0,
        total_loss: 0,
        net_profit: 0,
        win_rate: 0,
        profit_factor: 0
    });
    const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
    const [timeZoneOffset, setTimeZoneOffset] = useState(-16); // Default to GMT+0 (Based on GMT+8 = -8)

    const timeZones = [
        { label: 'GMT+2 (Server)', value: -14 },
        { label: 'GMT+8 (China)', value: -8 },
        { label: 'GMT+0 (UTC)', value: -16 },
        { label: 'GMT-4 (NY)', value: -20 },
    ];

    const fetchOrders = async () => {
        try {
            const url = '/api/trading-orders?days=30&limit=50';
            const response = await fetch(url);
            const result = await response.json();

            setOrders(result.data || []);
            calculateStats(result.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            setLoading(false);
        }
    };

    const calculateStats = (orderData: TradingOrder[]) => {
        const closedOrders = orderData.filter(o => o.status === 'CLOSED');
        const totalProfit = closedOrders.reduce((sum, o) => sum + Math.max(o.profit || 0, 0), 0);
        const totalLoss = closedOrders.reduce((sum, o) => sum + Math.abs(Math.min(o.profit || 0, 0)), 0);
        const winningOrders = closedOrders.filter(o => (o.profit || 0) > 0).length;

        // Calculate Profit Factor: Total Profit / Total Loss
        // If Total Loss is 0, use Total Profit as Profit Factor if Profit > 0, else 0
        let profitFactor = 0;
        if (totalLoss > 0) {
            profitFactor = totalProfit / totalLoss;
        } else if (totalProfit > 0) {
            profitFactor = totalProfit; // Infinite profit factor technically, but showing profit makes sense
        }

        setStats({
            total_orders: orderData.length,
            open_orders: orderData.filter(o => o.status === 'OPEN').length,
            closed_orders: closedOrders.length,
            total_profit: totalProfit,
            total_loss: totalLoss,
            net_profit: totalProfit - totalLoss,
            win_rate: closedOrders.length > 0 ? (winningOrders / closedOrders.length) * 100 : 0,
            profit_factor: profitFactor
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        // Adjust time based on selected timezone offset
        const adjustedDate = new Date(date.getTime() + (timeZoneOffset * 60 * 60 * 1000));

        return adjustedDate.toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getBrokerLink = (broker: string | null | undefined) => {
        if (!broker) return null;

        const brokerLower = broker.toLowerCase();

        if (brokerLower.includes('tickmill')) {
            return 'https://secure.tickmill.com/redirect/index.php?cii=17748&cis=1&lp=https%3A%2F%2Ftickmill.com%2Fpromotions%2Fwelcome-account%2F%3Futm_source%3Dib%26utm_medium%3D17748';
        }
        if (brokerLower.includes('ec') && brokerLower.includes('market')) {
            return 'https://client.ecmarkets.com/register?referral=IB01796857';
        }
        if (brokerLower.includes('ftmo')) {
            return 'https://trader.ftmo.com/en/?affiliates=NTA3NTc5OmZoYWo6MzI5OQ';
        }

        return null;
    };

    const formatCountdown = () => {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleManualRefresh = async () => {
        setRefreshing(true);
        await fetchOrders();
        setCountdown(300); // Reset countdown
        setRefreshing(false);
    };

    useEffect(() => {
        fetchOrders();

        const refreshInterval = setInterval(() => {
            fetchOrders();
            setCountdown(300);
        }, 300000);

        const countdownInterval = setInterval(() => {
            setCountdown(prev => (prev <= 1 ? 300 : prev - 1));
        }, 1000);

        return () => {
            clearInterval(refreshInterval);
            clearInterval(countdownInterval);
        };
    }, []);

    if (loading) {
        return (
            <div className="bg-black border border-white/10 p-8">
                <div className="flex items-center justify-center">
                    <div className="text-gray-400">{language === 'zh' ? '加载中...' : 'Loading...'}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header with Countdown */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-white">
                    {language === 'zh' ? '实盘交易数据' : 'Live Trading Data'}
                </h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 text-white/60 text-sm">
                        <span>{language === 'zh' ? '下次刷新' : 'Next refresh'}:</span>
                        <div className="font-mono text-[#ff102a] font-bold text-lg">
                            {formatCountdown()}
                        </div>
                    </div>

                    {/* Timezone Selector */}
                    <select
                        value={timeZoneOffset}
                        onChange={(e) => setTimeZoneOffset(Number(e.target.value))}
                        className="bg-[#0a0a0a] border border-white/20 text-white text-xs px-2 py-2 outline-none focus:border-[#ff102a]"
                    >
                        {timeZones.map((tz) => (
                            <option key={tz.label} value={tz.value}>
                                {tz.label}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleManualRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-2 px-4 py-2 bg-[#ff102a] hover:bg-[#ff102a]/80 disabled:bg-gray-600 text-white text-sm font-bold transition-all disabled:cursor-not-allowed"
                    >
                        <svg
                            className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        {refreshing
                            ? (language === 'zh' ? '刷新中...' : 'Refreshing...')
                            : (language === 'zh' ? '刷新' : 'Refresh')}
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <motion.div
                    className="bg-white/5 border border-white/10 p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="text-white/60 text-sm mb-1">
                        {language === 'zh' ? '总订单' : 'Total Orders'}
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.total_orders}</div>
                </motion.div>

                <motion.div
                    className="bg-white/5 border border-white/10 p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="text-white/60 text-sm mb-1">
                        {language === 'zh' ? '持仓中' : 'Open Positions'}
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.open_orders}</div>
                </motion.div>

                <motion.div
                    className="bg-white/5 border border-white/10 p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="text-white/60 text-sm mb-1">
                        {language === 'zh' ? '胜率' : 'Win Rate'}
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.win_rate.toFixed(1)}%</div>
                </motion.div>

                <motion.div
                    className="bg-white/5 border border-white/10 p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="text-white/60 text-sm mb-1">
                        {language === 'zh' ? '净利润' : 'Net Profit'}
                    </div>
                    <div className={`text-2xl font-bold ${stats.net_profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stats.net_profit >= 0 ? '+' : ''}${stats.net_profit.toFixed(2)}
                    </div>
                </motion.div>

                {/* Profit Factor Card */}
                <motion.div
                    className="bg-white/5 border border-white/10 p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="text-white/60 text-sm mb-1">
                        {language === 'zh' ? '盈利因子' : 'Profit Factor'}
                    </div>
                    <div className="text-2xl font-bold text-white">
                        {stats.profit_factor.toFixed(2)}
                    </div>
                </motion.div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
                <div className="min-w-[900px]">
                    {/* Header */}
                    <div className="grid grid-cols-11 gap-4 bg-[#0a0a0a] border border-white/10 p-4 font-bold text-xs uppercase tracking-wider text-gray-400">
                        <div>{language === 'zh' ? '订单号' : 'Ticket'}</div>
                        <div>{language === 'zh' ? '经纪商' : 'Broker'}</div>
                        <div>{language === 'zh' ? '品种' : 'Symbol'}</div>
                        <div>{language === 'zh' ? '类型' : 'Type'}</div>
                        <div>{language === 'zh' ? '手数' : 'Lots'}</div>
                        <div>{language === 'zh' ? '开仓价' : 'Open'}</div>
                        <div>{language === 'zh' ? '平仓价' : 'Close'}</div>
                        <div>{language === 'zh' ? '时间' : 'Time'}</div>
                        <div>{language === 'zh' ? '盈亏' : 'P/L'}</div>
                        <div>{language === 'zh' ? '备注' : 'Comment'}</div>
                        <div>{language === 'zh' ? '状态' : 'Status'}</div>
                    </div>

                    {/* Rows */}
                    {loading ? (
                        <div className="text-center py-12 text-gray-500">
                            {language === 'zh' ? '加载中...' : 'Loading...'}
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="border border-white/10 border-t-0 p-8 text-center text-gray-400">
                            {language === 'zh' ? '暂无交易记录' : 'No trading records found'}
                        </div>
                    ) : (
                        orders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="grid grid-cols-11 gap-4 border border-white/10 border-t-0 p-4 font-mono text-sm hover:bg-white/5 transition-colors"
                            >
                                <div className="text-gray-400">#{order.ticket_id}</div>
                                <div>
                                    {(() => {
                                        const link = getBrokerLink(order.broker);
                                        return link ? (
                                            <a
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#ff102a] hover:text-[#ff102a]/80 underline cursor-pointer"
                                            >
                                                {order.broker || '-'}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">{order.broker || '-'}</span>
                                        );
                                    })()}
                                </div>
                                <div className="font-bold text-white">{order.symbol}</div>
                                <div className={order.order_type.includes('BUY') ? 'text-green-500' : 'text-red-500'}>
                                    {order.order_type}
                                </div>
                                <div className="text-white">{order.lots.toFixed(2)}</div>
                                <div className="text-white">{order.open_price.toFixed(5)}</div>
                                <div className="text-white">{order.close_price?.toFixed(5) || '-'}</div>
                                <div className="text-gray-400 text-xs">{formatDate(order.open_time)}</div>
                                <div className={`font-bold ${!order.profit ? 'text-gray-400' :
                                    order.profit >= 0 ? 'text-green-500' : 'text-red-500'
                                    }`}>
                                    {order.profit !== null && order.profit !== undefined
                                        ? `${order.profit >= 0 ? '+' : ''}$${order.profit.toFixed(2)}`
                                        : '-'}
                                </div>
                                <div className="text-white/60 text-xs truncate max-w-[100px]" title={order.comment || ''}>
                                    {order.comment || '-'}
                                </div>
                                <div>
                                    <span className={`px-2 py-1 text-xs font-bold ${order.status === 'OPEN'
                                        ? 'bg-[#ff102a]/20 text-[#ff102a] border border-[#ff102a]/50'
                                        : order.status === 'CANCELLED'
                                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                                            : 'bg-gray-800 text-gray-400 border border-gray-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Footer Note */}
            <div className="mt-6 text-center text-xs text-gray-500 font-mono">
                {language === 'zh' ? '显示最近30天的交易记录 · 每5分钟自动刷新' : 'Showing last 30 days · Auto-refresh every 5min'}
            </div>
        </div>
    );
}
