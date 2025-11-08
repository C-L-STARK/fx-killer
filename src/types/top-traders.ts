// Top Trader Types

export interface TopTrader {
  rank: number;
  traderId: string;
  nickname: string;
  avatar?: string;
  country: string;
  countryCode: string; // ISO 2-letter code

  // Performance metrics
  monthlyReturn: number;     // Monthly return %
  totalReturn: number;       // Total return %

  // Trading stats
  winRate: number;           // Win rate %
  totalTrades: number;       // Total number of trades
  profitFactor: number;      // Profit factor

  // Risk metrics
  maxDrawdown: number;       // Maximum drawdown %
  sharpeRatio: number;       // Sharpe ratio

  // Other
  tradingDays: number;       // Trading days
  accountSize: number;       // Account size in USD
  currentPosition: number;   // Current position size in USD
  inMatrix: boolean;         // Whether trader is in trading matrix
  updateTime: string;        // Last update time
}

export type LeaderboardPeriod = 'current-month' | 'last-month' | 'all-time';
