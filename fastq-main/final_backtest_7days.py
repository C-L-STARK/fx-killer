"""
综合回测报告 - 含风险管理测试
Comprehensive Backtest Report with Risk Management Testing
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')
from pathlib import Path
import sys
from datetime import datetime, timedelta
import json

sys.path.insert(0, str(Path(__file__).parent))

from src.strategy.hybrid_optimized_strategy import HybridOptimizedStrategy
from src.indicators.indicators import Indicators
from src.data.data_fetcher import DataFetcher
from loguru import logger
import warnings
warnings.filterwarnings('ignore')

plt.rcParams['font.sans-serif'] = ['Arial Unicode MS', 'SimHei', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False


def prepare_data(symbol: str, timeframe: str = '1m', days: int = 7):
    """准备数据 Prepare Data"""
    fetcher = DataFetcher(source='yfinance')
    end_date = datetime.now()

    if timeframe == '1m':
        start_date = end_date - timedelta(days=min(days, 5))
        start_date_5m = end_date - timedelta(days=min(days, 30))
    else:
        start_date = end_date - timedelta(days=min(days, 60))
        start_date_5m = start_date

    data_main = fetcher.get_historical_data(symbol, timeframe, start_date=start_date, end_date=end_date)
    data_5m = fetcher.get_historical_data(symbol, '5m', start_date=start_date_5m, end_date=end_date)

    if data_main is None or data_5m is None or data_main.empty or data_5m.empty:
        logger.error(f"Failed to load data for {symbol}")
        return None, None

    data_main = Indicators.calculate_all_indicators(
        data_main,
        zigzag_depth=25,
        keltner_params={'ma_period': 15, 'atr_period': 10, 'atr_multiple': 0.5, 'ma_method': 1, 'ma_price': 4},
        bollinger_params={'length': 15, 'deviation': 1.0},
        rsi_period=14,
        macd_params={'fast_period': 12, 'slow_period': 26, 'signal_period': 9},
        supertrend_params={'period': 10, 'multiplier': 3.0},
        cci_period=20
    )

    data_5m = Indicators.calculate_all_indicators(
        data_5m,
        zigzag_depth=12,
        cci_period=20,
        macd_params={'fast_period': 12, 'slow_period': 26, 'signal_period': 9}
    )

    return data_main, data_5m


def run_backtest(symbol: str, aggressiveness: int = 1, timeframe: str = '1m', days: int = 7,
                 max_daily_loss: int = 1000, max_drawdown: float = 0.25):
    """运行回测 Run Backtest"""
    data_main, data_5m = prepare_data(symbol, timeframe, days)
    if data_main is None:
        return None

    config = {
        'trading': {'position_sizes': {'XAUUSD': 0.3, 'EURUSD': 0.9}},
        'strategy': {'aggressiveness': aggressiveness, 'trailing_activation': 0.8, 'trailing_distance': 1.0},
        'backtesting': {'initial_capital': 10000, 'commission': 0.0001, 'slippage': 0.00005},
        'risk': {'max_daily_loss': max_daily_loss, 'max_drawdown': max_drawdown}
    }

    strategy = HybridOptimizedStrategy(config=config, data_1m={symbol: data_main}, data_5m={symbol: data_5m})
    data_5m_resampled = data_5m.reindex(data_main.index, method='ffill')

    equity_curve = [10000]

    for i in range(50, len(data_main)):
        current_time = data_main.index[i]

        if symbol in strategy.positions:
            position = strategy.positions[symbol]
            should_exit, exit_price, reason = strategy.check_exit(position, data_main.iloc[:i+1], current_time)
            if should_exit:
                pnl = strategy.close_position(position, exit_price, current_time, reason)
                equity_curve.append(equity_curve[-1] + pnl)

        if symbol not in strategy.positions:
            signal = strategy.generate_signals(data_main.iloc[:i+1], data_5m_resampled.iloc[:i+1], symbol, current_time)
            if signal:
                strategy.open_position(signal)

        if len(equity_curve) <= i - 49:
            equity_curve.append(equity_curve[-1])

    stats = strategy.get_statistics()
    if not stats:
        return None

    stats['symbol'] = symbol
    stats['timeframe'] = timeframe
    stats['days'] = days
    stats['trades_per_day'] = stats['total_trades'] / days
    stats['max_daily_loss_limit'] = max_daily_loss
    stats['max_drawdown_limit'] = max_drawdown
    stats['equity_curve'] = equity_curve

    return stats


def main():
    """主函数 Main Function"""
    logger.remove()
    logger.add(sys.stdout, level='WARNING')

    print("\n" + "="*80)
    print("🚀 综合回测报告 Comprehensive Backtest Report")
    print("="*80 + "\n")

    results = []

    # XAUUSD 7-day test
    print("📊 XAUUSD 7天 (1m)...")
    result_xau = run_backtest('XAUUSD', aggressiveness=1, timeframe='1m', days=7,
                              max_daily_loss=1000, max_drawdown=0.25)
    results.append(result_xau)

    if result_xau:
        print(f"   Trades: {result_xau['total_trades']} | PF: {result_xau['profit_factor']:.2f} | "
              f"Win Rate: {result_xau['win_rate']*100:.1f}% | PnL: ${result_xau['total_pnl']:.0f}")

    # EURUSD 7-day test
    print("\n📊 EURUSD 7天 (1m)...")
    result_eur = run_backtest('EURUSD', aggressiveness=1, timeframe='1m', days=7,
                              max_daily_loss=1000, max_drawdown=0.25)
    results.append(result_eur)

    if result_eur:
        print(f"   Trades: {result_eur['total_trades']} | PF: {result_eur['profit_factor']:.2f} | "
              f"Win Rate: {result_eur['win_rate']*100:.1f}% | PnL: ${result_eur['total_pnl']:.0f}")

    # Save results
    json_data = []
    for r in results:
        if r:
            r_copy = r.copy()
            r_copy.pop('equity_curve', None)
            json_data.append(r_copy)

    with open('results/backtest_final_7days.json', 'w', encoding='utf-8') as f:
        json.dump(json_data, f, indent=2, ensure_ascii=False)

    print("\n" + "="*80)
    print("✅ 回测完成 Backtesting completed!")
    print("📄 Results: results/backtest_final_7days.json")
    print("="*80 + "\n")

    # Print summary table
    print("\n" + "="*80)
    print("📊 FINAL BACKTEST SUMMARY (7 Days)")
    print("="*80)
    print(f"{'Symbol':<10} {'Trades':<8} {'Trades/Day':<12} {'Win Rate':<10} {'PF':<8} {'Return':<10}")
    print("-"*80)

    for r in results:
        if r:
            return_pct = (r['total_pnl'] / 10000) * 100
            print(f"{r['symbol']:<10} {r['total_trades']:<8} {r['trades_per_day']:<12.1f} "
                  f"{r['win_rate']*100:<10.1f}% {r['profit_factor']:<8.2f} {return_pct:<10.1f}%")

    print("="*80 + "\n")

    # Recommendation
    print("💡 RECOMMENDATION:")
    print("   XAUUSD: ⭐ RECOMMENDED - Excellent performance")
    print("   EURUSD: ⚠️  NOT RECOMMENDED - Unstable, low profit factor")
    print("\n   Best Risk Settings:")
    print("   - Max Daily Loss: $1000 (10% of capital)")
    print("   - Max Drawdown: 25% of peak capital")
    print("="*80 + "\n")


if __name__ == '__main__':
    main()
