-- Add broker field to existing trading_orders table
ALTER TABLE trading_orders ADD COLUMN IF NOT EXISTS broker TEXT;

-- Create index for broker field
CREATE INDEX IF NOT EXISTS idx_trading_orders_broker ON trading_orders(broker);

-- Update the view to include broker field
DROP VIEW IF EXISTS recent_trading_orders;
CREATE OR REPLACE VIEW recent_trading_orders AS
SELECT *
FROM trading_orders
WHERE open_time >= NOW() - INTERVAL '30 days'
ORDER BY open_time DESC;

COMMENT ON COLUMN trading_orders.broker IS 'Broker name from MT4/MT5 (e.g., Tickmill, EC Markets, FTMO)';
