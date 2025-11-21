-- 创建智能upsert函数：根据status决定INSERT或UPDATE
-- 这个函数可以被EA直接通过Supabase RPC调用

CREATE OR REPLACE FUNCTION upsert_trading_order(order_data jsonb)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
    result_data jsonb;
    order_status text;
    order_ticket bigint;
BEGIN
    -- 提取status和ticket_id
    order_status := order_data->>'status';
    order_ticket := (order_data->>'ticket_id')::bigint;
    
    -- 如果status是CLOSED或CANCELLED，执行UPDATE
    IF order_status = 'CLOSED' OR order_status = 'CANCELLED' THEN
        UPDATE trading_orders
        SET
            platform = order_data->>'platform',
            account_number = order_data->>'account_number',
            broker = order_data->>'broker',
            symbol = order_data->>'symbol',
            order_type = order_data->>'order_type',
            lots = (order_data->>'lots')::numeric,
            open_price = (order_data->>'open_price')::numeric,
            stop_loss = (order_data->>'stop_loss')::numeric,
            take_profit = (order_data->>'take_profit')::numeric,
            open_time = (order_data->>'open_time')::timestamp,
            magic_number = (order_data->>'magic_number')::bigint,
            comment = order_data->>'comment',
            status = order_status,
            close_price = (order_data->>'close_price')::numeric,
            close_time = (order_data->>'close_time')::timestamp,
            commission = (order_data->>'commission')::numeric,
            swap = (order_data->>'swap')::numeric,
            profit = (order_data->>'profit')::numeric,
            updated_at = now()
        WHERE ticket_id = order_ticket
        RETURNING to_jsonb(trading_orders.*) INTO result_data;
        
        -- 如果没有找到记录，返回警告
        IF result_data IS NULL THEN
            RETURN jsonb_build_object(
                'success', false,
                'message', 'Order not found for closing - skipped',
                'ticket_id', order_ticket
            );
        END IF;
        
        RETURN jsonb_build_object('success', true, 'data', result_data);
        
    -- 如果status是OPEN，执行INSERT
    ELSE
        INSERT INTO trading_orders (
            platform, account_number, broker, ticket_id, symbol, order_type,
            lots, open_price, stop_loss, take_profit, open_time,
            magic_number, comment, status
        ) VALUES (
            order_data->>'platform',
            order_data->>'account_number',
            order_data->>'broker',
            order_ticket,
            order_data->>'symbol',
            order_data->>'order_type',
            (order_data->>'lots')::numeric,
            (order_data->>'open_price')::numeric,
            (order_data->>'stop_loss')::numeric,
            (order_data->>'take_profit')::numeric,
            (order_data->>'open_time')::timestamp,
            (order_data->>'magic_number')::bigint,
            order_data->>'comment',
            order_status
        )
        RETURNING to_jsonb(trading_orders.*) INTO result_data;
        
        RETURN jsonb_build_object('success', true, 'data', result_data);
    END IF;
    
EXCEPTION
    WHEN unique_violation THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'duplicate_key',
            'message', 'Order with this ticket_id already exists',
            'ticket_id', order_ticket
        );
    WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', SQLSTATE,
            'message', SQLERRM
        );
END;
$$;
