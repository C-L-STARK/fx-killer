// Trading data types and interfaces

export interface Candle {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: number;
}

export interface IndicatorConfig {
  keltner: {
    maPeriod: number;
    atrPeriod: number;
    atrMultiple: number;
  };
  bollinger: {
    period: number;
    deviation: number;
  };
  macd: {
    fastPeriod: number;
    slowPeriod: number;
    signalPeriod: number;
  };
  cci: {
    period: number;
  };
  supertrend: {
    period: number;
    multiplier: number;
  };
}

export interface StrategyConfig {
  aggressiveness: 1 | 2 | 3;
  trailingActivation: number; // R multiple to activate trailing stop
  trailingDistance: number; // ATR multiple for trailing distance
  indicators: IndicatorConfig;
}

export interface RiskConfig {
  maxDailyLoss: number; // in USD
  maxDrawdown: number; // percentage (0.25 = 25%)
  maxPositions: number;
  positionSize: number; // in USDT
  leverage: number; // leverage multiplier (1-125)
  stopLossMultiple: number; // ATR multiple
  takeProfitLevels: number[]; // R multiples
}

export interface TradingConfig {
  symbol: string;
  interval: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
  strategy: StrategyConfig;
  risk: RiskConfig;
}

export interface KeltnerChannelResult {
  upper: number;
  middle: number;
  lower: number;
}

export interface BollingerBandsResult {
  upper: number;
  middle: number;
  lower: number;
}

export interface MACDResult {
  macd: number;
  signal: number;
  histogram: number;
}

export interface SuperTrendResult {
  value: number;
  trend: 'up' | 'down';
}

export interface IndicatorValues {
  keltner: KeltnerChannelResult;
  bollinger: BollingerBandsResult;
  macd: MACDResult;
  cci: number;
  supertrend: SuperTrendResult;
  atr: number;
}

export interface Signal {
  type: 'long' | 'short' | 'close' | 'none';
  reason: string;
  timestamp: number;
  price: number;
  indicators?: IndicatorValues;
}

export interface Trade {
  id: string;
  symbol: string;
  side: 'long' | 'short';
  entryTime: number;
  entryPrice: number;
  exitTime?: number;
  exitPrice?: number;
  positionSize: number;
  stopLoss: number;
  initialStopLoss: number; // Original stop loss for R calculation
  takeProfit?: number;
  trailingStop?: number;
  highestPrice?: number; // For long trailing stop
  lowestPrice?: number; // For short trailing stop
  pnl?: number;
  pnlPercent?: number;
  exitReason?: 'stop_loss' | 'take_profit' | 'trailing_stop' | 'signal' | 'daily_limit' | 'drawdown_limit';
  status: 'open' | 'closed';
}

export interface BacktestResult {
  trades: Trade[];
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  profitFactor: number;
  totalPnl: number;
  totalPnlPercent: number;
  maxDrawdown: number;
  maxDrawdownPercent: number;
  averageWin: number;
  averageLoss: number;
  largestWin: number;
  largestLoss: number;
  tradesPerDay: number;
  startCapital: number;
  endCapital: number;
  startDate: number;
  endDate: number;
  equityCurve: { timestamp: number; equity: number }[];
  // Chart data (optional, returned from backtest API)
  candles?: Candle[];
  dataSource?: 'twelve-data' | 'alpha-vantage' | 'binance-public' | 'simulated-forex' | 'simulated-crypto' | 'generated';
  totalCandles?: number;
}

export interface Position {
  symbol: string;
  side: 'long' | 'short';
  positionSize: number;
  entryPrice: number;
  currentPrice: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
  stopLoss: number;
  takeProfit?: number;
  trailingStop?: number;
}

export interface BinanceCredentials {
  apiKey: string;
  apiSecret: string;
  testnet?: boolean;
}

export interface OrderResult {
  orderId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT' | 'STOP_MARKET';
  quantity: number;
  price?: number;
  status: 'NEW' | 'FILLED' | 'CANCELED' | 'REJECTED';
  executedQty: number;
  fills?: Array<{
    price: number;
    qty: number;
    commission: number;
    commissionAsset: string;
  }>;
}
