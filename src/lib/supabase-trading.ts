import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY!;

// Create Supabase client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

export interface TradingOrder {
    id: string;
    created_at: string;
    updated_at: string;
    platform: 'MT4' | 'MT5';
    account_number: string;
    broker?: string | null;
    ticket_id: number;
    symbol: string;
    order_type: 'BUY' | 'SELL' | 'BUY_LIMIT' | 'SELL_LIMIT' | 'BUY_STOP' | 'SELL_STOP';
    lots: number;
    open_price: number;
    close_price?: number | null;
    stop_loss?: number | null;
    take_profit?: number | null;
    open_time: string;
    close_time?: string | null;
    commission?: number | null;
    swap?: number | null;
    profit?: number | null;
    status: 'OPEN' | 'CLOSED' | 'CANCELLED';
    comment?: string | null;
    magic_number?: number | null;
}

export interface OrderFilters {
    status?: 'OPEN' | 'CLOSED' | 'CANCELLED';
    account?: string;
    symbol?: string;
    platform?: 'MT4' | 'MT5';
    days?: number;
    limit?: number;
    offset?: number;
}

export interface OrderStats {
    total_orders: number;
    open_orders: number;
    closed_orders: number;
    total_profit: number;
    total_loss: number;
    net_profit: number;
    win_rate: number;
    total_lots: number;
}

/**
 * Get trading orders with optional filters
 */
export async function getOrders(filters: OrderFilters = {}) {
    const {
        status,
        account,
        symbol,
        platform,
        days = 30,
        limit = 100,
        offset = 0
    } = filters;

    let query = supabaseAdmin
        .from('trading_orders')
        .select('*', { count: 'exact' });

    // Apply filters
    if (status) query = query.eq('status', status);
    if (account) query = query.eq('account_number', account);
    if (symbol) query = query.eq('symbol', symbol);
    if (platform) query = query.eq('platform', platform);

    // Date filter
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);
    query = query.gte('open_time', dateThreshold.toISOString());

    // Pagination and ordering
    query = query
        .order('open_time', { ascending: false })
        .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
        console.error('Get orders error:', error);
        throw error;
    }

    return { data: data as TradingOrder[], count: count || 0 };
}

/**
 * Get single order by ID
 */
export async function getOrderById(id: string) {
    const { data, error } = await supabaseAdmin
        .from('trading_orders')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data as TradingOrder;
}

/**
 * Create new trading order
 */
export async function createOrder(order: Partial<TradingOrder>) {
    const { data, error } = await supabaseAdmin
        .from('trading_orders')
        .insert([order])
        .select()
        .single();

    if (error) throw error;
    return data as TradingOrder;
}

/**
 * Update existing order
 */
export async function updateOrder(id: string, updates: Partial<TradingOrder>) {
    const { data, error } = await supabaseAdmin
        .from('trading_orders')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as TradingOrder;
}

/**
 * Update order by ticket_id (for EA updates)
 */
export async function updateOrderByTicket(ticket_id: number, updates: Partial<TradingOrder>) {
    const { data, error } = await supabaseAdmin
        .from('trading_orders')
        .update(updates)
        .eq('ticket_id', ticket_id)
        .select()
        .single();

    if (error) throw error;
    return data as TradingOrder;
}

/**
 * Delete order
 */
export async function deleteOrder(id: string) {
    const { error } = await supabaseAdmin
        .from('trading_orders')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

/**
 * Get order statistics
 */
export async function getOrderStats(filters: Omit<OrderFilters, 'limit' | 'offset'> = {}): Promise<OrderStats> {
    const { account, symbol, platform, days = 30 } = filters;

    let query = supabaseAdmin
        .from('trading_orders')
        .select('*');

    // Apply filters
    if (account) query = query.eq('account_number', account);
    if (symbol) query = query.eq('symbol', symbol);
    if (platform) query = query.eq('platform', platform);

    // Date filter
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);
    query = query.gte('open_time', dateThreshold.toISOString());

    const { data, error } = await query;

    if (error) {
        console.error('Get stats error:', error);
        throw error;
    }

    const orders = data as TradingOrder[];

    const stats: OrderStats = {
        total_orders: orders.length,
        open_orders: orders.filter(o => o.status === 'OPEN').length,
        closed_orders: orders.filter(o => o.status === 'CLOSED').length,
        total_profit: 0,
        total_loss: 0,
        net_profit: 0,
        win_rate: 0,
        total_lots: orders.reduce((sum, o) => sum + o.lots, 0)
    };

    const closedOrders = orders.filter(o => o.status === 'CLOSED' && o.profit !== null);

    closedOrders.forEach(order => {
        const profit = order.profit || 0;
        if (profit > 0) {
            stats.total_profit += profit;
        } else {
            stats.total_loss += Math.abs(profit);
        }
    });

    stats.net_profit = stats.total_profit - stats.total_loss;

    const winningOrders = closedOrders.filter(o => (o.profit || 0) > 0).length;
    stats.win_rate = closedOrders.length > 0
        ? (winningOrders / closedOrders.length) * 100
        : 0;

    return stats;
}

/**
 * Get recent orders (last 30 days by default)
 */
export async function getRecentOrders(days: number = 30, limit: number = 50) {
    return getOrders({ days, limit, offset: 0 });
}
