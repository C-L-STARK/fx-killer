-- Create TopTraders table in Supabase
-- This table stores the leaderboard data for top traders

CREATE TABLE IF NOT EXISTS "TopTraders" (
  id SERIAL PRIMARY KEY,
  rank INTEGER NOT NULL,
  trader_id VARCHAR(50) NOT NULL UNIQUE,
  nickname VARCHAR(100) NOT NULL,
  avatar VARCHAR(500),
  country VARCHAR(100) NOT NULL,
  country_code VARCHAR(2) NOT NULL,
  monthly_return DECIMAL(10, 2) NOT NULL,
  total_return DECIMAL(10, 2) NOT NULL,
  win_rate DECIMAL(5, 2) NOT NULL,
  total_trades INTEGER NOT NULL,
  profit_factor DECIMAL(5, 2) NOT NULL,
  max_drawdown DECIMAL(5, 2) NOT NULL,
  sharpe_ratio DECIMAL(5, 2) NOT NULL,
  trading_days INTEGER NOT NULL,
  account_size INTEGER NOT NULL,
  current_position INTEGER NOT NULL,
  in_matrix BOOLEAN NOT NULL DEFAULT FALSE,
  update_time TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on rank for faster sorting
CREATE INDEX IF NOT EXISTS idx_toptraders_rank ON "TopTraders" (rank);

-- Create index on trader_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_toptraders_trader_id ON "TopTraders" (trader_id);

-- Create index on in_matrix for filtering matrix members
CREATE INDEX IF NOT EXISTS idx_toptraders_in_matrix ON "TopTraders" (in_matrix);

-- Enable Row Level Security (RLS)
ALTER TABLE "TopTraders" ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON "TopTraders"
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert/update/delete
-- Note: You may want to restrict this to specific admin users
CREATE POLICY "Allow authenticated users to modify" ON "TopTraders"
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_toptraders_updated_at
  BEFORE UPDATE ON "TopTraders"
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
