import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role for full access
// Support both Vercel env vars and local NEXT_PUBLIC_ prefixed vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Type definitions
interface TradingOrder {
    platform: 'MT4' | 'MT5';
    account_number: string;
    ticket_id: number;
    symbol: string;
    order_type: 'BUY' | 'SELL' | 'BUY_LIMIT' | 'SELL_LIMIT' | 'BUY_STOP' | 'SELL_STOP';
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

// POST: Smart upsert based on order status
// - status=OPEN: INSERT new order
// - status=CLOSED: UPDATE existing order (skip if not found)
export async function POST(request: NextRequest) {
    try {
        const body: TradingOrder = await request.json();

        // Validate required fields
        if (!body.platform || !body.ticket_id || !body.symbol || !body.order_type) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // If status is CLOSED, this is an update (close order)
        if (body.status === 'CLOSED') {
            const { ticket_id, ...updateData } = body;

            const { data, error } = await supabase
                .from('trading_orders')
                .update(updateData)
                .eq('ticket_id', ticket_id)
                .select();

            if (error) {
                console.error('Supabase update error:', error);
                return NextResponse.json(
                    { error: error.message },
                    { status: 500 }
                );
            }

            // If no rows updated, order wasn't found - this is OK, just log it
            if (!data || data.length === 0) {
                console.warn(`Order ${ticket_id} not found for closing - skipping`);
                return NextResponse.json(
                    { message: 'Order not found, skipped' },
                    { status: 200 }
                );
            }

            return NextResponse.json(data, { status: 200 });
        }

        // If status is OPEN, this is an insert (new order)
        const { data, error } = await supabase
            .from('trading_orders')
            .insert([body])
            .select();

        if (error) {
            console.error('Supabase insert error:', error);

            // Handle duplicate ticket_id
            if (error.code === '23505') {
                return NextResponse.json(
                    { error: 'Order with this ticket_id already exists' },
                    { status: 409 }
                );
            }

            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PATCH: Update existing order (from EA on order close)
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { ticket_id, ...updateData } = body;

        if (!ticket_id) {
            return NextResponse.json(
                { error: 'ticket_id is required' },
                { status: 400 }
            );
        }

        // Update order
        const { data, error } = await supabase
            .from('trading_orders')
            .update(updateData)
            .eq('ticket_id', ticket_id)
            .select();

        if (error) {
            console.error('Supabase update error:', error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        if (!data || data.length === 0) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// GET: Retrieve orders with optional filters
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Parse query parameters
        const status = searchParams.get('status');
        const account = searchParams.get('account');
        const symbol = searchParams.get('symbol');
        const platform = searchParams.get('platform');
        const limit = parseInt(searchParams.get('limit') || '100');
        const offset = parseInt(searchParams.get('offset') || '0');
        const days = parseInt(searchParams.get('days') || '30');

        // Build query
        let query = supabase
            .from('trading_orders')
            .select('*', { count: 'exact' });

        // Apply filters
        if (status) {
            query = query.eq('status', status);
        }
        if (account) {
            query = query.eq('account_number', account);
        }
        if (symbol) {
            query = query.eq('symbol', symbol);
        }
        if (platform) {
            query = query.eq('platform', platform);
        }

        // Filter by date (last N days)
        const dateThreshold = new Date();
        dateThreshold.setDate(dateThreshold.getDate() - days);
        query = query.gte('open_time', dateThreshold.toISOString());

        // Apply pagination and ordering
        query = query
            .order('open_time', { ascending: false })
            .range(offset, offset + limit - 1);

        const { data, error, count } = await query;

        if (error) {
            console.error('Supabase query error:', error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            data,
            count,
            limit,
            offset
        });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE: Delete order (admin only)
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Order ID is required' },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from('trading_orders')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Supabase delete error:', error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Order deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
