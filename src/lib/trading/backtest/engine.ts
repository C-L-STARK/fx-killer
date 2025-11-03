import type { Candle, Trade, BacktestResult, TradingConfig, Signal } from '../types';
import { XAUUSDStrategy } from '../strategies/xauusd-strategy';
import { RiskManager } from './risk-manager';
import { v4 as uuidv4 } from 'uuid';

export interface BacktestConfig {
  startDate: number;
  endDate: number;
  initialCapital: number;
  tradingConfig: TradingConfig;
}

/**
 * Backtest Engine
 *
 * Simulates trading strategy on historical data and generates performance metrics
 */
export class BacktestEngine {
  private config: BacktestConfig;
  private strategy: XAUUSDStrategy;
  private riskManager: RiskManager;
  private trades: Trade[] = [];
  private capital: number;
  private equityCurve: { timestamp: number; equity: number }[] = [];

  constructor(config: BacktestConfig) {
    this.config = config;
    this.capital = config.initialCapital;
    this.strategy = new XAUUSDStrategy(config.tradingConfig);

    // CRITICAL FIX: Use VERY relaxed risk limits for backtesting
    // We want to see the full strategy performance without artificial daily limits
    const backtestRiskConfig = {
      ...config.tradingConfig.risk,
      // EXTREME: Increase daily loss limit to 90% of capital
      // This allows the strategy to fully execute without being blocked
      maxDailyLoss: config.initialCapital * 0.9,
      // EXTREME: Allow 50% max drawdown for testing
      maxDrawdown: 0.5,
      // Keep other settings
      maxPositions: config.tradingConfig.risk.maxPositions,
      positionSize: config.tradingConfig.risk.positionSize,
    };

    console.log(`[Engine] ⚙️  Backtest Configuration:`);
    console.log(`[Engine]   - Initial capital: $${config.initialCapital.toLocaleString()}`);
    console.log(`[Engine]   - Position size: ${backtestRiskConfig.positionSize} USDT`);
    console.log(`[Engine]   - Daily loss limit: $${backtestRiskConfig.maxDailyLoss.toLocaleString()} (${(backtestRiskConfig.maxDailyLoss / config.initialCapital * 100).toFixed(0)}%)`);
    console.log(`[Engine]   - Max drawdown: ${(backtestRiskConfig.maxDrawdown * 100).toFixed(0)}%`);
    console.log(`[Engine]   - Max positions: ${backtestRiskConfig.maxPositions}`);

    this.riskManager = new RiskManager(
      backtestRiskConfig,
      config.initialCapital
    );
  }

  /**
   * Run backtest on historical candle data with optional 5m confirmation
   * CRITICAL FIX: Now supports dual timeframe (1m + 5m) like Python implementation
   */
  public async runBacktest(candles1m: Candle[], candles5m?: Candle[]): Promise<BacktestResult> {
    // Reset state
    this.trades = [];
    this.capital = this.config.initialCapital;
    this.equityCurve = [];
    this.riskManager.reset(this.config.initialCapital);

    // Filter candles by date range
    const filteredCandles1m = candles1m.filter(
      c =>
        c.closeTime >= this.config.startDate &&
        c.closeTime <= this.config.endDate
    );

    if (filteredCandles1m.length === 0) {
      throw new Error('No candles in specified date range');
    }

    // Filter 5m candles if provided
    let filteredCandles5m: Candle[] | undefined;
    if (candles5m) {
      filteredCandles5m = candles5m.filter(
        c =>
          c.closeTime >= this.config.startDate &&
          c.closeTime <= this.config.endDate
      );
      console.log(`[Engine] Using dual timeframe: ${filteredCandles1m.length} x 1m candles, ${filteredCandles5m.length} x 5m candles`);
    } else {
      console.log(`[Engine] Using single timeframe: ${filteredCandles1m.length} x 1m candles (no 5m confirmation)`);
    }

    // Need sufficient warmup period for indicators
    const warmupPeriod = 100; // Should cover all indicator periods
    let openTrades: Trade[] = [];

    // Process each candle
    for (let i = warmupPeriod; i < filteredCandles1m.length; i++) {
      const currentCandle = filteredCandles1m[i];
      const historicalCandles1m = filteredCandles1m.slice(0, i + 1);

      // Get aligned 5m candles up to current time
      let historicalCandles5m: Candle[] | undefined;
      if (filteredCandles5m) {
        historicalCandles5m = filteredCandles5m.filter(c => c.closeTime <= currentCandle.closeTime);
      }

      // Update equity curve
      this.equityCurve.push({
        timestamp: currentCandle.closeTime,
        equity: this.capital,
      });

      // Check if we can open new trades
      const canTrade = this.riskManager.canOpenNewTrade(
        openTrades.length,
        this.capital,
        currentCandle.closeTime
      );

      // Process open trades (check exits)
      for (let j = openTrades.length - 1; j >= 0; j--) {
        const trade = openTrades[j];
        const exitResult = this.checkExit(trade, currentCandle, historicalCandles1m);

        if (exitResult.shouldExit) {
          // Close trade
          trade.exitTime = currentCandle.closeTime;
          trade.exitPrice = exitResult.exitPrice;
          trade.exitReason = exitResult.reason;
          trade.status = 'closed';

          // Calculate P&L
          const pnl = this.calculatePnL(trade);
          trade.pnl = pnl;
          trade.pnlPercent = (pnl / this.capital) * 100;

          // Update capital
          this.capital += pnl;

          // Update risk manager
          this.riskManager.updateDailyPnL(trade);
          this.riskManager.updatePeakCapital(this.capital);

          // LOG TRADE CLOSE
          const pnlSign = pnl >= 0 ? '✅' : '❌';
          console.log(`[Engine] ${pnlSign} Trade #${this.trades.length + 1} CLOSED at candle ${i}/${filteredCandles1m.length}: ${trade.side.toUpperCase()} exit @ $${trade.exitPrice.toFixed(2)}, Reason: ${exitResult.reason}, P&L: ${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)} (${trade.pnlPercent?.toFixed(2)}%), Capital: $${this.capital.toFixed(2)}`);

          // Move to closed trades
          this.trades.push(trade);
          openTrades.splice(j, 1);
        } else {
          // Update trailing stop if applicable
          const signal = this.strategy.generateSignal(historicalCandles1m, historicalCandles5m);
          const indicators = signal.indicators;
          if (indicators) {
            const trailingResult = this.strategy.calculateTrailingStop(
              trade.entryPrice,
              currentCandle.close,
              trade.highestPrice,
              trade.lowestPrice,
              trade.initialStopLoss,
              trade.side,
              indicators.atr
            );

            // Update trade with new trailing stop data
            if (trailingResult.active) {
              if (
                trade.trailingStop === undefined ||
                (trade.side === 'long' && trailingResult.trailingStop! > trade.trailingStop) ||
                (trade.side === 'short' && trailingResult.trailingStop! < trade.trailingStop)
              ) {
                trade.trailingStop = trailingResult.trailingStop!;
              }
            }
            // Always update highest/lowest prices
            trade.highestPrice = trailingResult.highestPrice;
            trade.lowestPrice = trailingResult.lowestPrice;
          }
        }
      }

      // Generate new signal if no open positions and trading allowed
      if (canTrade.allowed && openTrades.length === 0) {
        // CRITICAL FIX: Pass both 1m and 5m candles
        const signal = this.strategy.generateSignal(historicalCandles1m, historicalCandles5m);

        if (signal.type === 'long' || signal.type === 'short') {
          const newTrade = this.openTrade(signal, currentCandle);
          if (newTrade) {
            openTrades.push(newTrade);
            console.log(`[Engine] 📈 Trade #${this.trades.length + openTrades.length} opened at candle ${i}/${filteredCandles1m.length}: ${newTrade.side.toUpperCase()} @ $${newTrade.entryPrice.toFixed(2)}, SL: $${newTrade.stopLoss.toFixed(2)}, TP: $${newTrade.takeProfit?.toFixed(2)}`);
          }
        }
      } else if (!canTrade.allowed) {
        // Debug why trades are blocked - show more frequently
        if (i === warmupPeriod || i % 500 === 0) {
          console.log(`[Engine] ⚠️  Trading blocked at candle ${i}/${filteredCandles1m.length}: ${canTrade.reason}`);
        }
      } else if (openTrades.length > 0) {
        // Already has open trade
        if (i % 1000 === 0) {
          console.log(`[Engine] 💼 Open position exists at candle ${i}/${filteredCandles1m.length}: ${openTrades[0].side.toUpperCase()} @ $${openTrades[0].entryPrice.toFixed(2)}`);
        }
      }
    }

    // Close any remaining open trades at the last candle
    const lastCandle = filteredCandles1m[filteredCandles1m.length - 1];
    for (const trade of openTrades) {
      trade.exitTime = lastCandle.closeTime;
      trade.exitPrice = lastCandle.close;
      trade.exitReason = 'signal';
      trade.status = 'closed';
      trade.pnl = this.calculatePnL(trade);
      trade.pnlPercent = (trade.pnl / this.capital) * 100;
      this.capital += trade.pnl;
      this.trades.push(trade);
    }

    // Debug: Print backtest summary
    console.log('\n========== BACKTEST SUMMARY ==========');
    console.log(`Total candles processed: ${filteredCandles1m.length} (1m)` + (filteredCandles5m ? ` + ${filteredCandles5m.length} (5m)` : ''));
    console.log(`Candles after warmup: ${filteredCandles1m.length - warmupPeriod}`);
    console.log(`Total trades executed: ${this.trades.length}`);
    console.log(`Strategy: Pullback Strategy (validated 1.75 PF)`);
    console.log(`Aggressiveness: ${this.config.tradingConfig.strategy.aggressiveness}`);
    console.log(`Timeframe: ${this.config.tradingConfig.interval}` + (filteredCandles5m ? ' + 5m confirmation' : ' (no 5m)'));

    if (this.trades.length > 0) {
      console.log(`\nTrade breakdown:`);
      console.log(`  - Winning trades: ${this.trades.filter(t => (t.pnl || 0) > 0).length}`);
      console.log(`  - Losing trades: ${this.trades.filter(t => (t.pnl || 0) < 0).length}`);
      console.log(`  - First trade: ${this.trades[0].side} @ $${this.trades[0].entryPrice}`);
      console.log(`  - Last trade: ${this.trades[this.trades.length - 1].side} @ $${this.trades[this.trades.length - 1].entryPrice}`);
    }
    console.log('======================================\n');

    // Calculate final metrics
    return this.calculateResults();
  }

  /**
   * Open a new trade based on signal
   */
  private openTrade(signal: Signal, candle: Candle): Trade | null {
    if (!signal.indicators) return null;

    const side = signal.type === 'long' ? 'long' : 'short';
    const entryPrice = candle.close;
    const stopLoss = this.strategy.calculateStopLoss(
      entryPrice,
      side,
      signal.indicators  // FIXED: Pass full indicators, not just atr
    );

    const takeProfitLevels = this.strategy.calculateTakeProfitLevels(
      entryPrice,
      stopLoss,
      side
    );

    const trade: Trade = {
      id: uuidv4(),
      symbol: this.config.tradingConfig.symbol,
      side,
      entryTime: candle.closeTime,
      entryPrice,
      positionSize: this.riskManager.getPositionSize(),
      stopLoss,
      initialStopLoss: stopLoss, // FIXED: Track initial stop loss for R calculation
      takeProfit: takeProfitLevels[0], // Use first TP level
      highestPrice: side === 'long' ? entryPrice : undefined, // FIXED: Track for trailing stop
      lowestPrice: side === 'short' ? entryPrice : undefined, // FIXED: Track for trailing stop
      status: 'open',
    };

    return trade;
  }

  /**
   * Check if trade should be exited
   */
  private checkExit(
    trade: Trade,
    candle: Candle,
    historicalCandles: Candle[]
  ): { shouldExit: boolean; exitPrice: number; reason: Trade['exitReason'] } {
    // Check stop loss
    if (trade.side === 'long' && candle.low <= trade.stopLoss) {
      return { shouldExit: true, exitPrice: trade.stopLoss, reason: 'stop_loss' };
    }
    if (trade.side === 'short' && candle.high >= trade.stopLoss) {
      return { shouldExit: true, exitPrice: trade.stopLoss, reason: 'stop_loss' };
    }

    // Check trailing stop
    if (trade.trailingStop !== undefined) {
      if (trade.side === 'long' && candle.low <= trade.trailingStop) {
        return { shouldExit: true, exitPrice: trade.trailingStop, reason: 'trailing_stop' };
      }
      if (trade.side === 'short' && candle.high >= trade.trailingStop) {
        return { shouldExit: true, exitPrice: trade.trailingStop, reason: 'trailing_stop' };
      }
    }

    // Check take profit
    if (trade.takeProfit !== undefined) {
      if (trade.side === 'long' && candle.high >= trade.takeProfit) {
        return { shouldExit: true, exitPrice: trade.takeProfit, reason: 'take_profit' };
      }
      if (trade.side === 'short' && candle.low <= trade.takeProfit) {
        return { shouldExit: true, exitPrice: trade.takeProfit, reason: 'take_profit' };
      }
    }

    // Check opposite signal
    const signal = this.strategy.generateSignal(historicalCandles);
    if (
      (trade.side === 'long' && signal.type === 'short') ||
      (trade.side === 'short' && signal.type === 'long')
    ) {
      return { shouldExit: true, exitPrice: candle.close, reason: 'signal' };
    }

    return { shouldExit: false, exitPrice: 0, reason: undefined };
  }

  /**
   * Calculate P&L for a trade
   */
  private calculatePnL(trade: Trade): number {
    if (!trade.exitPrice || !trade.positionSize) return 0;

    const priceDiff =
      trade.side === 'long'
        ? trade.exitPrice - trade.entryPrice
        : trade.entryPrice - trade.exitPrice;

    // Contract size depends on symbol
    // Crypto: 1 contract = 1 coin (BTCUSDT, ETHUSDT, etc.)
    // Gold: 1 lot = 100 oz (XAUUSD)
    const contractSize = trade.symbol.includes('XAU') ? 100 : 1;

    // P&L = price difference × position size × contract size × leverage
    // leverage is already factored into positionSize, so we don't multiply again
    return priceDiff * trade.positionSize * contractSize;
  }

  /**
   * Calculate backtest results and metrics
   */
  private calculateResults(): BacktestResult {
    const winningTrades = this.trades.filter(t => (t.pnl || 0) > 0);
    const losingTrades = this.trades.filter(t => (t.pnl || 0) < 0);

    const totalWins = winningTrades.reduce((sum, t) => sum + (t.pnl || 0), 0);
    const totalLosses = Math.abs(
      losingTrades.reduce((sum, t) => sum + (t.pnl || 0), 0)
    );

    const winRate =
      this.trades.length > 0 ? (winningTrades.length / this.trades.length) * 100 : 0;

    const profitFactor = totalLosses > 0 ? totalWins / totalLosses : totalWins > 0 ? Infinity : 0;

    const totalPnl = this.capital - this.config.initialCapital;
    const totalPnlPercent = (totalPnl / this.config.initialCapital) * 100;

    // Calculate max drawdown
    let maxDrawdown = 0;
    let maxDrawdownPercent = 0;
    let peak = this.config.initialCapital;

    for (const point of this.equityCurve) {
      if (point.equity > peak) {
        peak = point.equity;
      }
      const drawdown = peak - point.equity;
      const drawdownPercent = (drawdown / peak) * 100;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
        maxDrawdownPercent = drawdownPercent;
      }
    }

    // Calculate average win/loss
    const averageWin =
      winningTrades.length > 0
        ? winningTrades.reduce((sum, t) => sum + (t.pnl || 0), 0) / winningTrades.length
        : 0;
    const averageLoss =
      losingTrades.length > 0
        ? losingTrades.reduce((sum, t) => sum + (t.pnl || 0), 0) / losingTrades.length
        : 0;

    // Calculate largest win/loss
    const largestWin =
      winningTrades.length > 0 ? Math.max(...winningTrades.map(t => t.pnl || 0)) : 0;
    const largestLoss =
      losingTrades.length > 0 ? Math.min(...losingTrades.map(t => t.pnl || 0)) : 0;

    // Calculate trades per day
    const tradingDays =
      (this.config.endDate - this.config.startDate) / (1000 * 60 * 60 * 24);
    const tradesPerDay = tradingDays > 0 ? this.trades.length / tradingDays : 0;

    return {
      trades: this.trades,
      totalTrades: this.trades.length,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      winRate,
      profitFactor,
      totalPnl,
      totalPnlPercent,
      maxDrawdown,
      maxDrawdownPercent,
      averageWin,
      averageLoss,
      largestWin,
      largestLoss,
      tradesPerDay,
      startCapital: this.config.initialCapital,
      endCapital: this.capital,
      startDate: this.config.startDate,
      endDate: this.config.endDate,
      equityCurve: this.equityCurve,
    };
  }
}
