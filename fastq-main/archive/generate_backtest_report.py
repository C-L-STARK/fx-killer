"""
综合回测报告生成器
Comprehensive Backtest Report Generator

功能 Features:
1. 测试EURUSD和XAUUSD
2. 生成15天和30天回测报告
3. 创建可视化图表
4. 输出详细统计信息
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')  # 非交互式后端 Non-interactive backend
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

# 设置中文字体 Set Chinese font
plt.rcParams['font.sans-serif'] = ['Arial Unicode MS', 'SimHei', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False


def prepare_data(symbol: str, timeframe: str = '1m', days: int = 7):
    """
    准备数据和指标 Prepare Data and Indicators

    参数 Args:
        symbol: 交易品种 EURUSD/XAUUSD
        timeframe: 时间框架 1m/5m
        days: 天数 Number of days
    """
    fetcher = DataFetcher(source='yfinance')
    end_date = datetime.now()

    # yfinance数据限制 yfinance data limits
    if timeframe == '1m':
        start_date = end_date - timedelta(days=min(days, 5))
        start_date_5m = end_date - timedelta(days=min(days, 30))
    else:
        start_date = end_date - timedelta(days=min(days, 60))
        start_date_5m = start_date

    # 加载数据 Load data
    data_main = fetcher.get_historical_data(
        symbol, timeframe,
        start_date=start_date,
        end_date=end_date
    )

    data_5m = fetcher.get_historical_data(
        symbol, '5m',
        start_date=start_date_5m,
        end_date=end_date
    )

    if data_main is None or data_5m is None or data_main.empty or data_5m.empty:
        logger.error(f"无法加载数据 Failed to load data for {symbol}")
        return None, None

    logger.info(f"✅ 数据加载完成 Data loaded: {symbol} - {len(data_main)} bars ({timeframe}), {len(data_5m)} bars (5m)")

    # 计算指标 Calculate indicators
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
    """
    运行回测 Run Backtest

    参数 Args:
        symbol: EURUSD 或 XAUUSD
        aggressiveness: 激进度 1/2/3
        timeframe: 时间框架
        days: 测试天数
    """
    logger.info(f"\n{'='*80}")
    logger.info(f"📊 回测测试 Backtesting: {symbol} | Level {aggressiveness} | {days} days | {timeframe}")
    logger.info(f"{'='*80}")

    # 准备数据 Prepare data
    data_main, data_5m = prepare_data(symbol, timeframe, days)
    if data_main is None:
        return None

    # 配置 Configuration
    config = {
        'trading': {
            'position_sizes': {
                'XAUUSD': 0.3,
                'EURUSD': 0.9
            }
        },
        'strategy': {
            'aggressiveness': aggressiveness,
            'trailing_activation': 0.8,
            'trailing_distance': 1.0
        },
        'backtesting': {
            'initial_capital': 10000,
            'commission': 0.0001,
            'slippage': 0.00005
        }
    }

    # 初始化策略 Initialize strategy
    strategy = HybridOptimizedStrategy(
        config=config,
        data_1m={symbol: data_main},
        data_5m={symbol: data_5m}
    )

    # 重采样5分钟数据 Resample 5m data
    data_5m_resampled = data_5m.reindex(data_main.index, method='ffill')

    # 运行回测 Run backtest
    equity_curve = [10000]  # 资金曲线 Equity curve

    for i in range(50, len(data_main)):
        current_time = data_main.index[i]

        # 检查现有持仓 Check existing positions
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

        # 检查新信号 Check for new signals
        if symbol not in strategy.positions:
            signal = strategy.generate_signals(
                data_main.iloc[:i+1],
                data_5m_resampled.iloc[:i+1],
                symbol,
                current_time
            )
            if signal:
                strategy.open_position(signal)

        # 更新资金曲线 Update equity curve
        if len(equity_curve) <= i - 49:
            equity_curve.append(equity_curve[-1])

    # 获取统计信息 Get statistics
    stats = strategy.get_statistics()
    if not stats:
        logger.warning("⚠️ 没有生成交易 No trades generated!")
        return None

    # 添加元数据 Add metadata
    stats['symbol'] = symbol
    stats['aggressiveness'] = aggressiveness
    stats['timeframe'] = timeframe
    stats['days'] = days
    stats['trades_per_day'] = stats['total_trades'] / days
    stats['equity_curve'] = equity_curve
    stats['closed_positions'] = strategy.closed_positions

    # 打印结果 Print results
    print(f"\n{'='*80}")
    print(f"📈 回测结果 BACKTEST RESULTS - {symbol}")
    print(f"{'='*80}")
    print(f"测试周期 Period: {days} days ({timeframe})")
    print(f"激进度 Level: {aggressiveness}")
    print(f"总交易 Total Trades: {stats['total_trades']}")
    print(f"每日交易 Trades/Day: {stats['trades_per_day']:.1f}")
    print(f"胜率 Win Rate: {stats['win_rate']*100:.1f}%")
    print(f"盈利因子 Profit Factor: {stats['profit_factor']:.2f}")
    print(f"总盈亏 Total PnL: ${stats['total_pnl']:.2f}")
    print(f"收益率 Return: {(stats['total_pnl'] / 10000) * 100:.2f}%")
    print(f"平均盈利 Avg Win: ${stats['avg_win']:.2f}")
    print(f"平均亏损 Avg Loss: ${stats['avg_loss']:.2f}")
    print(f"最大盈利 Largest Win: ${stats['largest_win']:.2f}")
    print(f"最大亏损 Largest Loss: ${stats['largest_loss']:.2f}")
    print(f"{'='*80}\n")

    return stats


def generate_report_image(results_list, filename='backtest_report.png'):
    """
    生成可视化报告 Generate Visual Report

    参数 Args:
        results_list: 回测结果列表
        filename: 输出文件名
    """
    if not results_list:
        logger.error("无结果可绘制 No results to plot")
        return

    fig = plt.figure(figsize=(16, 18))

    # 子图布局 Subplot layout (4 rows for 4 tests + 1 row for comparison table)
    gs = fig.add_gridspec(5, 2, hspace=0.3, wspace=0.3, height_ratios=[1, 1, 1, 1, 0.6])

    for idx, result in enumerate(results_list):
        if result is None:
            continue

        symbol = result['symbol']
        days = result['days']

        # 资金曲线 Equity curve
        ax1 = fig.add_subplot(gs[idx, 0])
        equity = result['equity_curve']
        ax1.plot(equity, linewidth=2, color='#2E86DE' if result['total_pnl'] > 0 else '#EE5A6F')
        ax1.axhline(y=10000, color='gray', linestyle='--', alpha=0.5)
        ax1.set_title(f'{symbol} {days}天资金曲线 Equity Curve', fontsize=12, fontweight='bold')
        ax1.set_xlabel('交易序号 Trade Number')
        ax1.set_ylabel('资金 Capital ($)')
        ax1.grid(True, alpha=0.3)

        # 添加统计信息 Add statistics
        textstr = f'盈利因子 PF: {result["profit_factor"]:.2f}\n'
        textstr += f'胜率 Win Rate: {result["win_rate"]*100:.1f}%\n'
        textstr += f'总收益 Total PnL: ${result["total_pnl"]:.0f}\n'
        textstr += f'交易次数 Trades: {result["total_trades"]}'
        ax1.text(0.02, 0.98, textstr, transform=ax1.transAxes, fontsize=10,
                verticalalignment='top', bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))

        # 盈亏分布 PnL Distribution
        ax2 = fig.add_subplot(gs[idx, 1])
        pnls = [p.pnl for p in result['closed_positions']]
        colors = ['green' if p > 0 else 'red' for p in pnls]
        ax2.bar(range(len(pnls)), pnls, color=colors, alpha=0.6)
        ax2.axhline(y=0, color='black', linestyle='-', linewidth=0.5)
        ax2.set_title(f'{symbol} {days}天 盈亏分布 PnL Distribution', fontsize=12, fontweight='bold')
        ax2.set_xlabel('交易序号 Trade Number')
        ax2.set_ylabel('盈亏 PnL ($)')
        ax2.grid(True, alpha=0.3, axis='y')

    # 总体统计对比 Overall comparison
    ax3 = fig.add_subplot(gs[4, :])
    ax3.axis('off')

    # 创建对比表格 Create comparison table
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

    # 标题行样式 Header row styling
    for i in range(len(table_data[0])):
        table[(0, i)].set_facecolor('#4ECDC4')
        table[(0, i)].set_text_props(weight='bold')

    # 数据行样式 Data row styling
    for i in range(1, len(table_data)):
        for j in range(len(table_data[0])):
            if j == 5:  # PF column
                pf = float(table_data[i][j])
                if pf >= 1.5:
                    table[(i, j)].set_facecolor('#A8E6CF')  # Green
                else:
                    table[(i, j)].set_facecolor('#FFB6B9')  # Red

    plt.suptitle('量化交易回测报告 Quantitative Trading Backtest Report',
                 fontsize=16, fontweight='bold', y=0.98)

    # 保存图片 Save image
    plt.savefig(filename, dpi=150, bbox_inches='tight')
    logger.info(f"✅ 报告已保存 Report saved: {filename}")
    plt.close()


def main():
    """主函数 Main Function"""
    logger.remove()
    logger.add(sys.stdout, level='WARNING')  # 只显示警告 Only show warnings

    print("\n" + "="*80)
    print("🚀 综合回测报告生成器 Comprehensive Backtest Report Generator")
    print("="*80 + "\n")

    results = []

    # 测试1: XAUUSD 7天 (1m)
    print("📊 测试 Test 1/4: XAUUSD 7天 7 days (1m)...")
    result1 = run_backtest('XAUUSD', aggressiveness=1, timeframe='1m', days=7)
    results.append(result1)

    # 测试2: EURUSD 7天 (1m)
    print("\n📊 测试 Test 2/4: EURUSD 7天 7 days (1m)...")
    result2 = run_backtest('EURUSD', aggressiveness=1, timeframe='1m', days=7)
    results.append(result2)

    # 测试3: XAUUSD 15天 (5m - yfinance限制)
    print("\n📊 测试 Test 3/4: XAUUSD 15天 15 days (5m)...")
    result3 = run_backtest('XAUUSD', aggressiveness=1, timeframe='5m', days=15)
    results.append(result3)

    # 测试4: EURUSD 15天 (5m)
    print("\n📊 测试 Test 4/4: EURUSD 15天 15 days (5m)...")
    result4 = run_backtest('EURUSD', aggressiveness=1, timeframe='5m', days=15)
    results.append(result4)

    # 生成报告图片 Generate report image
    print("\n📊 生成报告图片 Generating report image...")
    generate_report_image(results, 'results/backtest_report_15days.png')

    # 保存JSON结果 Save JSON results
    json_data = []
    for r in results:
        if r:
            r_copy = r.copy()
            r_copy.pop('equity_curve', None)
            r_copy.pop('closed_positions', None)
            json_data.append(r_copy)

    with open('results/backtest_results.json', 'w', encoding='utf-8') as f:
        json.dump(json_data, f, indent=2, ensure_ascii=False)

    print("\n" + "="*80)
    print("✅ 回测完成 Backtesting completed!")
    print("📊 报告图片 Report image: results/backtest_report_15days.png")
    print("📄 JSON结果 JSON results: results/backtest_results.json")
    print("="*80 + "\n")


if __name__ == '__main__':
    main()
