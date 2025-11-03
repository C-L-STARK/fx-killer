"""
快速回测XAUUSD Quick Backtest for XAUUSD Only
仅测试XAUUSD以节省时间 Only test XAUUSD to save time
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

    logger.info(f"✅ Data loaded: {symbol} - {len(data_main)} bars ({timeframe}), {len(data_5m)} bars (5m)")

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


def run_backtest(symbol: str, aggressiveness: int = 1, timeframe: str = '1m', days: int = 7):
    """运行回测 Run Backtest"""
    logger.info(f"\n{'='*80}")
    logger.info(f"📊 Backtesting: {symbol} | Level {aggressiveness} | {days} days | {timeframe}")
    logger.info(f"{'='*80}")

    data_main, data_5m = prepare_data(symbol, timeframe, days)
    if data_main is None:
        return None

    config = {
        'trading': {'position_sizes': {'XAUUSD': 0.3}},
        'strategy': {'aggressiveness': aggressiveness, 'trailing_activation': 0.8, 'trailing_distance': 1.0},
        'backtesting': {'initial_capital': 10000, 'commission': 0.0001, 'slippage': 0.00005}
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
        logger.warning("⚠️ No trades generated!")
        return None

    stats['symbol'] = symbol
    stats['aggressiveness'] = aggressiveness
    stats['timeframe'] = timeframe
    stats['days'] = days
    stats['trades_per_day'] = stats['total_trades'] / days
    stats['equity_curve'] = equity_curve
    stats['closed_positions'] = strategy.closed_positions

    print(f"\n{'='*80}")
    print(f"📈 BACKTEST RESULTS - {symbol}")
    print(f"{'='*80}")
    print(f"Period: {days} days ({timeframe})")
    print(f"Level: {aggressiveness}")
    print(f"Total Trades: {stats['total_trades']}")
    print(f"Trades/Day: {stats['trades_per_day']:.1f}")
    print(f"Win Rate: {stats['win_rate']*100:.1f}%")
    print(f"Profit Factor: {stats['profit_factor']:.2f}")
    print(f"Total PnL: ${stats['total_pnl']:.2f}")
    print(f"Return: {(stats['total_pnl'] / 10000) * 100:.2f}%")
    print(f"{'='*80}\n")

    return stats


def generate_report_image(results_list, filename='results/backtest_report_xauusd.png'):
    """生成XAUUSD报告 Generate XAUUSD Report"""
    if not results_list:
        logger.error("No results to plot")
        return

    fig = plt.figure(figsize=(16, 12))
    gs = fig.add_gridspec(3, 2, hspace=0.3, wspace=0.3, height_ratios=[1, 1, 0.6])

    for idx, result in enumerate(results_list):
        if result is None or idx >= 2:
            continue

        symbol = result['symbol']
        days = result['days']

        # Equity curve
        ax1 = fig.add_subplot(gs[idx, 0])
        equity = result['equity_curve']
        ax1.plot(equity, linewidth=2, color='#2E86DE' if result['total_pnl'] > 0 else '#EE5A6F')
        ax1.axhline(y=10000, color='gray', linestyle='--', alpha=0.5)
        ax1.set_title(f'{symbol} {days}天资金曲线 Equity Curve', fontsize=12, fontweight='bold')
        ax1.set_xlabel('交易序号 Trade Number')
        ax1.set_ylabel('资金 Capital ($)')
        ax1.grid(True, alpha=0.3)

        textstr = f'盈利因子 PF: {result["profit_factor"]:.2f}\n'
        textstr += f'胜率 Win Rate: {result["win_rate"]*100:.1f}%\n'
        textstr += f'总收益 Total PnL: ${result["total_pnl"]:.0f}\n'
        textstr += f'交易次数 Trades: {result["total_trades"]}'
        ax1.text(0.02, 0.98, textstr, transform=ax1.transAxes, fontsize=10,
                verticalalignment='top', bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))

        # PnL Distribution
        ax2 = fig.add_subplot(gs[idx, 1])
        pnls = [p.pnl for p in result['closed_positions']]
        colors = ['green' if p > 0 else 'red' for p in pnls]
        ax2.bar(range(len(pnls)), pnls, color=colors, alpha=0.6)
        ax2.axhline(y=0, color='black', linestyle='-', linewidth=0.5)
        ax2.set_title(f'{symbol} {days}天 盈亏分布 PnL Distribution', fontsize=12, fontweight='bold')
        ax2.set_xlabel('交易序号 Trade Number')
        ax2.set_ylabel('盈亏 PnL ($)')
        ax2.grid(True, alpha=0.3, axis='y')

    # Comparison table
    ax3 = fig.add_subplot(gs[2, :])
    ax3.axis('off')

    table_data = [['品种\nSymbol', '天数\nDays', '交易次数\nTrades', '每日交易\nTrades/Day',
                   '胜率\nWin Rate', '盈利因子\nPF', '总盈亏\nTotal PnL', '收益率\nReturn']]

    for result in results_list:
        if result is None:
            continue
        table_data.append([
            result['symbol'],
            f"{result['days']}",
            f"{result['total_trades']}",
            f"{result['trades_per_day']:.1f}",
            f"{result['win_rate']*100:.1f}%",
            f"{result['profit_factor']:.2f}",
            f"${result['total_pnl']:.0f}",
            f"{(result['total_pnl']/10000)*100:.1f}%"
        ])

    table = ax3.table(cellText=table_data, cellLoc='center', loc='center',
                     colWidths=[0.1, 0.08, 0.1, 0.12, 0.1, 0.12, 0.12, 0.1])
    table.auto_set_font_size(False)
    table.set_fontsize(10)
    table.scale(1, 2)

    for i in range(len(table_data[0])):
        table[(0, i)].set_facecolor('#4ECDC4')
        table[(0, i)].set_text_props(weight='bold')

    for i in range(1, len(table_data)):
        for j in range(len(table_data[0])):
            if j == 5:
                pf = float(table_data[i][j])
                if pf >= 1.5:
                    table[(i, j)].set_facecolor('#A8E6CF')
                else:
                    table[(i, j)].set_facecolor('#FFB6B9')

    plt.suptitle('XAUUSD 回测报告 Backtest Report', fontsize=16, fontweight='bold', y=0.98)

    plt.savefig(filename, dpi=150, bbox_inches='tight')
    logger.info(f"✅ Report saved: {filename}")
    plt.close()


def main():
    """主函数 Main Function"""
    logger.remove()
    logger.add(sys.stdout, level='WARNING')

    print("\n" + "="*80)
    print("🚀 XAUUSD快速回测 Quick XAUUSD Backtest")
    print("="*80 + "\n")

    results = []

    # Test 1: XAUUSD 7 days (1m)
    print("📊 Test 1/2: XAUUSD 7天 7 days (1m)...")
    result1 = run_backtest('XAUUSD', aggressiveness=1, timeframe='1m', days=7)
    results.append(result1)

    # Test 2: XAUUSD 15 days (5m)
    print("\n📊 Test 2/2: XAUUSD 15天 15 days (5m)...")
    result2 = run_backtest('XAUUSD', aggressiveness=1, timeframe='5m', days=15)
    results.append(result2)

    # Generate report
    print("\n📊 Generating report image...")
    generate_report_image(results, 'results/backtest_report_xauusd.png')

    # Save JSON
    json_data = []
    for r in results:
        if r:
            r_copy = r.copy()
            r_copy.pop('equity_curve', None)
            r_copy.pop('closed_positions', None)
            json_data.append(r_copy)

    with open('results/backtest_results_xauusd.json', 'w', encoding='utf-8') as f:
        json.dump(json_data, f, indent=2, ensure_ascii=False)

    print("\n" + "="*80)
    print("✅ Backtesting completed!")
    print("📊 Report: results/backtest_report_xauusd.png")
    print("📄 JSON: results/backtest_results_xauusd.json")
    print("="*80 + "\n")


if __name__ == '__main__':
    main()
