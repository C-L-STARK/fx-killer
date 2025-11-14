import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl) {
  console.warn('NEXT_PUBLIC_SUPABASE_URL is not defined in environment variables');
}

if (!supabaseKey) {
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Type definitions for database tables
export interface LiveStream {
  id?: number;
  nickname: string;
  description: string;
  live_url: string;
  remark: string;
  created_at?: string;
}

export interface BlogPost {
  id?: number;
  title: string;
  title_en: string;
  content: string;
  content_en: string;
  author: string;
  remark: string;
  remark_en: string;
  tags: string;
  tags_en: string;
  rel_1: number | null;
  rel_2: number | null;
  rel_3: number | null;
  recommand: boolean;
  top: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Config {
  id?: number;
  key_name: string;
  key_content: string;
  key_remark: string;
  created_at?: string;
  updated_at?: string;
}

export interface TopTrader {
  id?: number;
  rank: number;
  trader_id: string;
  nickname: string;
  avatar?: string;
  country: string;
  country_code: string;
  monthly_return: number;
  total_return: number;
  win_rate: number;
  total_trades: number;
  profit_factor: number;
  max_drawdown: number;
  sharpe_ratio: number;
  trading_days: number;
  account_size: number;
  current_position: number;
  in_matrix: boolean;
  update_time: string;
  created_at?: string;
  updated_at?: string;
}
