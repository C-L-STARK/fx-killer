"""
多品种综合回测 Multi-Symbol Comprehensive Backtest
测试 EURUSD, XAUUSD, USDJPY, NZDUSD - 15天和30天
Test EURUSD, XAUUSD, USDJPY, NZDUSD - 15 and 30 days
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


def prepare_data(symbol: str, timeframe: str = '5m', days: int = 15):
    """准备数据 Prepare Data"""
    fetcher = DataFetcher(source='yfinance')
    end_date = datetime.now()

    # yfinance limits: 1m=7days, 5m=60days
    if timeframe == '1m':
        start_date = end_date - timedelta(days=min(days, 7))
        start_date_5m = end_date - timedelta(days=min(days, 30))
    else:  # 5m
        start_date = end_date - timedelta(days=min(days, 60))
        start_date_5m = start_date

    print(f"  Fetching {symbol} data...")
    data_main = fetcher.get_historical_data(symbol, timeframe, start_date=start_date, end_date=end_date)
    data_5m = fetcher.get_historical_data(symbol, '5m', start_date=start_date_5m, end_date=end_date)

    if data_main is None or data_5m is None or data_main.empty or data_5m.empty:
        logger.error(f"Failed to load data for {symbol}")
        return None, None

    print(f"  ✓ Got {len(data_main)} bars ({timeframe}), {len(data_5m)} bars (5m)")

    # Calculate indicators
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


def get_position_size(symbol: str) -> float:
    """获取品种的手数 Get position size for symbol"""
    sizes = {
        'XAUUSD': 0.3,
        'EURUSD': 0.9,
        'USDJPY': 0.9,
        'NZDUSD': 0.9
    }
    return sizes.get(symbol, 0.5)


def run_backtest(symbol: str, days: int = 15, timeframe: str = '5m'):
    """运行回测 Run Backtest"""

    data_main, data_5m = prepare_data(symbol, timeframe, days)
    if data_main is None:
        return None

    # Get actual days from data
    actual_days = (data_main.index[-1] - data_main.index[0]).days

    config = {
        'trading': {
            'position_sizes': {
                'XAUUSD': 0.3,
                'EURUSD': 0.9,
                'USDJPY': 0.9,
                'NZDUSD': 0.9
            }
        },
        'strategy': {
            'aggressiveness': 1,
            'trailing_activation': 0.8,
            'trailing_distance': 1.0
        },
        'backtesting': {
            'initial_capital': 10000,
            'commission': 0.0001,
            'slippage': 0.00005
        },
        'risk': {
            'max_daily_loss': 1000,
            'max_drawdown': 0.25
        }
    }

    strategy = HybridOptimizedStrategy(
        config=config,
        data_1m={symbol: data_main},
        data_5m={symbol: data_5m}
    )

    data_5m_resampled = data_5m.reindex(data_main.index, method='ffill')
    equity_curve = [10000]

    # Track daily stats
    daily_stats = []
    last_date = None

    for i in range(50, len(data_main)):
        current_time = data_main.index[i]
        current_date = current_time.date()

        # Track daily equity
        if last_date is None:
            last_date = current_date
        if current_date != last_date:
            daily_stats.append({
                'date': last_date,
                'equity': equity_curve[-1]
            })
            last_date = current_date

        # Check exit
        if symbol in strategy.positions:
            position = strategy.positions[symbol]
            should_exit, exit_price, reason = strategy.check_exit(
                position,
                data_main.iloc[:i+1],
                current_time
            )
            if should_exit:
                pnl = strategy.close_position(position, exit_price, current_time, reason)
                equity_curve.append(equity_curve[-1] + pnl)

        # Check entry
        if symbol not in strategy.positions:
            signal = strategy.generate_signals(
                data_main.iloc[:i+1],
                data_5m_resampled.iloc[:i+1],
                symbol,
                current_time
            )
            if signal:
                strategy.open_position(signal)

        if len(equity_curve) <= i - 49:
            equity_curve.append(equity_curve[-1])

    stats = strategy.get_statistics()
    if not stats:
        return None

    # Calculate additional metrics
    equity_array = np.array(equity_curve)
    returns = np.diff(equity_array) / equity_array[:-1]

    # Max drawdown
    peak = np.maximum.accumulate(equity_array)
    drawdown = (equity_array - peak) / peak
    max_dd = abs(drawdown.min()) * 100

    # Sharpe ratio (simplified, annualized)
    if len(returns) > 1 and returns.std() > 0:
        sharpe = (returns.mean() / returns.std()) * np.sqrt(252 * (1440 / (len(data_main) / actual_days)))
    else:
        sharpe = 0

    stats.update({
        'symbol': symbol,
        'timeframe': timeframe,
        'requested_days': days,
        'actual_days': actual_days,
        'trades_per_day': stats['total_trades'] / actual_days if actual_days > 0 else 0,
        'equity_curve': equity_curve,
        'max_drawdown_pct': max_dd,
        'sharpe_ratio': sharpe,
        'final_equity': equity_curve[-1],
        'return_pct': ((equity_curve[-1] - 10000) / 10000) * 100
    })

    return stats


def generate_report_table(results: list):
    """生成报告表格 Generate Report Table"""

    print("\n" + "="*120)
    print("📊 COMPREHENSIVE BACKTEST RESULTS")
    print("="*120)

    # Group by days
    results_15d = [r for r in results if r and r['requested_days'] == 15]
    results_30d = [r for r in results if r and r['requested_days'] == 30]

    for period, res_list in [("15 DAYS", results_15d), ("30 DAYS", results_30d)]:
        if not res_list:
            continue

        print(f"\n{'─'*120}")
        print(f"📅 {period} BACKTEST RESULTS")
        print(f"{'─'*120}")

        # Header
        print(f"{'Symbol':<10} {'Days':<6} {'Trades':<8} {'T/Day':<8} {'Win%':<8} "
              f"{'PF':<8} {'Return':<10} {'MaxDD':<10} {'Sharpe':<8} {'Status':<15}")
        print("─"*120)

        # Data rows
        for r in res_list:
            symbol = r['symbol']
            days = r['actual_days']
            trades = r['total_trades']
            tpd = r['trades_per_day']
            win_rate = r['win_rate'] * 100
            pf = r['profit_factor']
            return_pct = r['return_pct']
            max_dd = r['max_drawdown_pct']
            sharpe = r['sharpe_ratio']

            # Status
            if pf >= 1.5 and win_rate >= 55:
                status = "✅ EXCELLENT"
            elif pf >= 1.2 and win_rate >= 50:
                status = "⭐ GOOD"
            elif pf >= 1.0:
                status = "⚠️  MARGINAL"
            else:
                status = "❌ LOSING"

            print(f"{symbol:<10} {days:<6} {trades:<8} {tpd:<8.1f} {win_rate:<8.1f} "
                  f"{pf:<8.2f} {return_pct:<10.1f}% {max_dd:<10.1f}% {sharpe:<8.2f} {status:<15}")

    print("="*120)


def generate_summary_recommendations(results: list):
    """生成总结和建议 Generate Summary and Recommendations"""

    print("\n" + "="*120)
    print("💡 TRADING RECOMMENDATIONS")
    print("="*120 + "\n")

    # Analyze each symbol
    symbols = set([r['symbol'] for r in results if r])

    for symbol in sorted(symbols):
        symbol_results = [r for r in results if r and r['symbol'] == symbol]

        # Average metrics
        avg_pf = np.mean([r['profit_factor'] for r in symbol_results])
        avg_wr = np.mean([r['win_rate'] for r in symbol_results]) * 100
        avg_return = np.mean([r['return_pct'] for r in symbol_results])

        print(f"📈 {symbol}:")
        print(f"   Average Profit Factor: {avg_pf:.2f}")
        print(f"   Average Win Rate: {avg_wr:.1f}%")
        print(f"   Average Return: {avg_return:.1f}%")

        # Recommendation
        if avg_pf >= 1.5 and avg_wr >= 55:
            print(f"   ✅ RECOMMENDATION: STRONGLY RECOMMENDED")
            print(f"      - Consistent profitability")
            print(f"      - High win rate")
            print(f"      - Use default settings")
        elif avg_pf >= 1.2 and avg_wr >= 50:
            print(f"   ⭐ RECOMMENDATION: RECOMMENDED")
            print(f"      - Acceptable performance")
            print(f"      - Monitor closely")
            print(f"      - Consider smaller position size")
        elif avg_pf >= 1.0:
            print(f"   ⚠️  RECOMMENDATION: USE WITH CAUTION")
            print(f"      - Marginal profitability")
            print(f"      - Reduce position size by 50%")
            print(f"      - Test on demo first")
        else:
            print(f"   ❌ RECOMMENDATION: DO NOT TRADE")
            print(f"      - Strategy loses money on this pair")
            print(f"      - Not suitable for Level 1 settings")
        print()

    print("="*120)


def generate_visual_report(results: list, filename='results/multi_symbol_backtest.png'):
    """生成可视化报告 Generate Visual Report"""

    if not results:
        return

    # Filter valid results
    valid_results = [r for r in results if r and r['total_trades'] > 0]
    if not valid_results:
        return

    fig = plt.figure(figsize=(20, 12))

    # 1. Profit Factor Comparison
    ax1 = plt.subplot(2, 3, 1)
    symbols = [r['symbol'] for r in valid_results]
    pfs = [r['profit_factor'] for r in valid_results]
    days = [f"{r['requested_days']}d" for r in valid_results]
    labels = [f"{s}\n{d}" for s, d in zip(symbols, days)]

    colors = ['green' if pf >= 1.5 else 'orange' if pf >= 1.0 else 'red' for pf in pfs]
    ax1.bar(range(len(labels)), pfs, color=colors, alpha=0.7)
    ax1.axhline(y=1.5, color='green', linestyle='--', label='Target (1.5)')
    ax1.axhline(y=1.0, color='red', linestyle='--', label='Break-even')
    ax1.set_xticks(range(len(labels)))
    ax1.set_xticklabels(labels, rotation=45)
    ax1.set_ylabel('Profit Factor')
    ax1.set_title('Profit Factor Comparison')
    ax1.legend()
    ax1.grid(True, alpha=0.3)

    # 2. Win Rate Comparison
    ax2 = plt.subplot(2, 3, 2)
    win_rates = [r['win_rate'] * 100 for r in valid_results]
    colors = ['green' if wr >= 60 else 'orange' if wr >= 50 else 'red' for wr in win_rates]
    ax2.bar(range(len(labels)), win_rates, color=colors, alpha=0.7)
    ax2.axhline(y=60, color='green', linestyle='--', label='Good (60%)')
    ax2.axhline(y=50, color='orange', linestyle='--', label='Acceptable (50%)')
    ax2.set_xticks(range(len(labels)))
    ax2.set_xticklabels(labels, rotation=45)
    ax2.set_ylabel('Win Rate (%)')
    ax2.set_title('Win Rate Comparison')
    ax2.legend()
    ax2.grid(True, alpha=0.3)

    # 3. Return Comparison
    ax3 = plt.subplot(2, 3, 3)
    returns = [r['return_pct'] for r in valid_results]
    colors = ['green' if ret > 0 else 'red' for ret in returns]
    ax3.bar(range(len(labels)), returns, color=colors, alpha=0.7)
    ax3.axhline(y=0, color='black', linestyle='-', linewidth=0.5)
    ax3.set_xticks(range(len(labels)))
    ax3.set_xticklabels(labels, rotation=45)
    ax3.set_ylabel('Return (%)')
    ax3.set_title('Return Comparison')
    ax3.grid(True, alpha=0.3)

    # 4. Max Drawdown
    ax4 = plt.subplot(2, 3, 4)
    dds = [r['max_drawdown_pct'] for r in valid_results]
    colors = ['green' if dd < 15 else 'orange' if dd < 25 else 'red' for dd in dds]
    ax4.bar(range(len(labels)), dds, color=colors, alpha=0.7)
    ax4.axhline(y=25, color='red', linestyle='--', label='Max Limit (25%)')
    ax4.set_xticks(range(len(labels)))
    ax4.set_xticklabels(labels, rotation=45)
    ax4.set_ylabel('Max Drawdown (%)')
    ax4.set_title('Maximum Drawdown')
    ax4.legend()
    ax4.grid(True, alpha=0.3)

    # 5. Sharpe Ratio
    ax5 = plt.subplot(2, 3, 5)
    sharpes = [r['sharpe_ratio'] for r in valid_results]
    colors = ['green' if s > 1 else 'orange' if s > 0 else 'red' for s in sharpes]
    ax5.bar(range(len(labels)), sharpes, color=colors, alpha=0.7)
    ax5.axhline(y=1, color='green', linestyle='--', label='Good (>1)')
    ax5.axhline(y=0, color='red', linestyle='--', label='Break-even')
    ax5.set_xticks(range(len(labels)))
    ax5.set_xticklabels(labels, rotation=45)
    ax5.set_ylabel('Sharpe Ratio')
    ax5.set_title('Risk-Adjusted Return (Sharpe)')
    ax5.legend()
    ax5.grid(True, alpha=0.3)

    # 6. Trades per Day
    ax6 = plt.subplot(2, 3, 6)
    tpds = [r['trades_per_day'] for r in valid_results]
    ax6.bar(range(len(labels)), tpds, color='steelblue', alpha=0.7)
    ax6.set_xticks(range(len(labels)))
    ax6.set_xticklabels(labels, rotation=45)
    ax6.set_ylabel('Trades per Day')
    ax6.set_title('Trading Frequency')
    ax6.grid(True, alpha=0.3)

    plt.suptitle('Multi-Symbol Backtest Analysis (15 & 30 Days)', fontsize=16, fontweight='bold')
    plt.tight_layout()
    plt.savefig(filename, dpi=150, bbox_inches='tight')
    print(f"\n✅ Visual report saved: {filename}")
    plt.close()


def main():
    """主函数 Main Function"""
    logger.remove()
    logger.add(sys.stdout, level='WARNING')

    print("\n" + "="*120)
    print("🚀 MULTI-SYMBOL COMPREHENSIVE BACKTEST")
    print("="*120)
    print("\nTesting 4 currency pairs: EURUSD, XAUUSD, USDJPY, NZDUSD")
    print("Periods: 15 days and 30 days")
    print("Timeframe: 5-minute (yfinance 1-minute data limited to 7 days)")
    print("\n" + "="*120 + "\n")

    symbols = ['XAUUSD', 'EURUSD', 'USDJPY', 'NZDUSD']
    periods = [15, 30]

    results = []
    total_tests = len(symbols) * len(periods)
    current_test = 0

    for period in periods:
        for symbol in symbols:
            current_test += 1
            print(f"\n{'='*120}")
            print(f"📊 Test {current_test}/{total_tests}: {symbol} - {period} days")
            print(f"{'='*120}")

            try:
                result = run_backtest(symbol, days=period, timeframe='5m')
                if result:
                    results.append(result)
                    print(f"\n✅ {symbol} ({period}d): Trades={result['total_trades']} | "
                          f"PF={result['profit_factor']:.2f} | WR={result['win_rate']*100:.1f}% | "
                          f"Return={result['return_pct']:.1f}%")
                else:
                    print(f"\n⚠️  {symbol} ({period}d): No trades generated")
            except Exception as e:
                print(f"\n❌ {symbol} ({period}d): Error - {e}")
                logger.error(f"Error backtesting {symbol} {period}d: {e}")

    # Generate reports
    print("\n" + "="*120)
    print("📊 GENERATING REPORTS...")
    print("="*120)

    # Table report
    generate_report_table(results)

    # Recommendations
    generate_summary_recommendations(results)

    # Visual report
    generate_visual_report(results)

    # Save JSON
    json_results = []
    for r in results:
        if r:
            r_copy = r.copy()
            r_copy.pop('equity_curve', None)
            json_results.append(r_copy)

    with open('results/multi_symbol_backtest.json', 'w', encoding='utf-8') as f:
        json.dump(json_results, f, indent=2, ensure_ascii=False)

    print("\n✅ JSON results saved: results/multi_symbol_backtest.json")

    print("\n" + "="*120)
    print("✅ ALL BACKTESTS COMPLETED!")
    print("="*120 + "\n")


if __name__ == '__main__':
    main()
