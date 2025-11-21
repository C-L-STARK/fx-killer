-- FX Killer Trading Orders Table Schema
-- This schema should be executed in your Supabase SQL Editor

-- Drop table if exists (use with caution in production)
-- DROP TABLE IF EXISTS trading_orders CASCADE;

-- Create trading_orders table
CREATE TABLE IF NOT EXISTS trading_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- Trading Platform Info
  platform TEXT NOT NULL CHECK (platform IN ('MT4', 'MT5')),
  account_number TEXT NOT NULL,
  ticket_id BIGINT NOT NULL UNIQUE,
  
  -- Order Details
  symbol TEXT NOT NULL,
  order_type TEXT NOT NULL CHECK (order_type IN ('BUY', 'SELL', 'BUY_LIMIT', 'SELL_LIMIT', 'BUY_STOP', 'SELL_STOP')),
  lots DECIMAL(10, 2) NOT NULL,
  
  -- Price Information
  open_price DECIMAL(20, 5) NOT NULL,
  close_price DECIMAL(20, 5),
  stop_loss DECIMAL(20, 5),
  take_profit DECIMAL(20, 5),
  
  -- Time Information
  open_time TIMESTAMP WITH TIME ZONE NOT NULL,
  close_time TIMESTAMP WITH TIME ZONE,
  
  -- Financial Info
  commission DECIMAL(20, 2) DEFAULT 0,
  swap DECIMAL(20, 2) DEFAULT 0,
  profit DECIMAL(20, 2),
  
  -- Status
  status TEXT NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLOSED', 'CANCELLED')),
  
  -- Additional Info
  comment TEXT,
  magic_number INTEGER
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_trading_orders_ticket ON trading_orders(ticket_id);
CREATE INDEX IF NOT EXISTS idx_trading_orders_account ON trading_orders(account_number);
CREATE INDEX IF NOT EXISTS idx_trading_orders_status ON trading_orders(status);
CREATE INDEX IF NOT EXISTS idx_trading_orders_open_time ON trading_orders(open_time DESC);
CREATE INDEX IF NOT EXISTS idx_trading_orders_close_time ON trading_orders(close_time DESC);
CREATE INDEX IF NOT EXISTS idx_trading_orders_platform ON trading_orders(platform);
CREATE INDEX IF NOT EXISTS idx_trading_orders_symbol ON trading_orders(symbol);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_trading_orders_updated_at ON trading_orders;
CREATE TRIGGER update_trading_orders_updated_at
  BEFORE UPDATE ON trading_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE trading_orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Enable all for service role" ON trading_orders;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON trading_orders;

-- Create policy for service role (EA will use this)
CREATE POLICY "Enable all for service role" ON trading_orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy for authenticated users (dashboard access)
CREATE POLICY "Enable read for authenticated users" ON trading_orders
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Create a view for recent orders (last 30 days)
CREATE OR REPLACE VIEW recent_trading_orders AS
SELECT *
FROM trading_orders
WHERE open_time >= NOW() - INTERVAL '30 days'
ORDER BY open_time DESC;

-- Grant permissions
GRANT SELECT ON recent_trading_orders TO authenticated;
GRANT ALL ON trading_orders TO service_role;

-- Sample query to verify setup
-- SELECT * FROM trading_orders LIMIT 10;
-- SELECT * FROM recent_trading_orders LIMIT 10;

COMMENT ON TABLE trading_orders IS 'Stores MT4/MT5 trading orders synced from Expert Advisors';
COMMENT ON COLUMN trading_orders.ticket_id IS 'Unique order ticket from MT4/MT5';
COMMENT ON COLUMN trading_orders.platform IS 'Trading platform: MT4 or MT5';
COMMENT ON COLUMN trading_orders.status IS 'Order status: OPEN, CLOSED, or CANCELLED';
