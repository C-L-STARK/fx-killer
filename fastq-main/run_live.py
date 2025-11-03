"""
实盘交易脚本 Live Trading Script
使用MT4/MT5执行实时交易 Execute trades in real-time using MT4/MT5
"""

import yaml
import sys
import time
import pandas as pd
from pathlib import Path
from datetime import datetime, timedelta
from loguru import logger

# Add src to path
sys.path.insert(0, str(Path(__file__).parent))

from src.data.data_fetcher import DataFetcher
from src.indicators.indicators import Indicators
from src.strategy.hybrid_optimized_strategy import HybridOptimizedStrategy
from src.mt4.mt4_connector import MT4Connector


def load_config(config_path: str = "config/config.yaml") -> dict:
    """Load configuration from YAML file"""
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    return config


class LiveTrader:
    """实盘交易机器人 Live Trading Bot"""

    def __init__(self, config: dict):
        """初始化实盘交易器 Initialize Live Trader"""
        self.config = config
        self.symbols = config['trading']['symbols']
        self.timeframe = config['trading']['timeframe']
        self.position_sizes = config['trading']['position_sizes']

        # 初始化组件 Initialize components
        self.data_fetcher = DataFetcher(source="mt5")
        self.mt4 = MT4Connector(config)

        # 初始化策略 (需要1m和5m数据) Initialize strategy (needs 1m and 5m data)
        self.strategy = None  # Will be initialized after first data fetch

        self.running = False
        self.tick_count = 0
        self.last_print_time = None  # 上次打印时间

    def start(self):
        """Start live trading"""

        # Connect to MT4/MT5
        if not self.mt4.connect():
            logger.error("Failed to connect to MT4/MT5")
            return

        self.running = True
        print("\n" + "="*80)
        print("🚀 LIVE TRADING STARTED")
        print("="*80)
        print(f"Symbol: {', '.join(self.symbols)}")
        print(f"Timeframe: {self.timeframe}")
        print("Press Ctrl+C to stop")
        print("="*80 + "\n")

        try:
            while self.running:
                self.tick_count += 1

                # Main trading loop
                self._process_tick()

                # Print status every tick (real-time)
                self._print_realtime_status()

                # Detailed log every 10 ticks
                if self.tick_count % 10 == 0:
                    self._log_status()

                # Sleep for timeframe interval
                time.sleep(60)  # 1 minute for 1m timeframe

        except KeyboardInterrupt:
            print("\n" + "="*80)
            print("⚠️  STOPPING LIVE TRADING...")
            print("="*80)
        except Exception as e:
            logger.error(f"Error in trading loop: {e}")
            print(f"\n❌ ERROR: {e}")
        finally:
            self.stop()

    def stop(self):
        """Stop live trading"""
        self.running = False

        # Close connections
        self.data_fetcher.close()
        self.mt4.disconnect()

        logger.info("Live trading stopped")

    def _process_tick(self):
        """处理每个时间点 Process Each Tick/Bar"""

        for symbol in self.symbols:
            try:
                # 获取最新数据 Fetch latest data (1m and 5m)
                data_1m = self.data_fetcher.get_historical_data(
                    symbol=symbol,
                    timeframe='1m',
                    bars=200
                )

                data_5m = self.data_fetcher.get_historical_data(
                    symbol=symbol,
                    timeframe='5m',
                    bars=200
                )

                if data_1m.empty or data_5m.empty:
                    logger.warning(f"No data for {symbol}")
                    continue

                # 计算指标 Calculate indicators
                data_1m = Indicators.calculate_all_indicators(
                    data_1m,
                    zigzag_depth=self.config['strategy']['zigzag']['depth_1m'],
                    keltner_params=self.config['strategy']['keltner'],
                    bollinger_params=self.config['strategy']['bollinger'],
                    rsi_period=self.config['strategy']['rsi']['period'],
                    macd_params=self.config['strategy']['macd'],
                    supertrend_params=self.config['strategy']['supertrend'],
                    cci_period=self.config['strategy']['cci']['period']
                )

                data_5m = Indicators.calculate_all_indicators(
                    data_5m,
                    zigzag_depth=self.config['strategy']['zigzag']['depth_5m'],
                    cci_period=self.config['strategy']['cci']['period'],
                    macd_params=self.config['strategy']['macd']
                )

                data_1m = data_1m.dropna()
                data_5m = data_5m.dropna()

                if data_1m.empty or data_5m.empty:
                    continue

                # 初始化策略 (首次) Initialize strategy (first time)
                if self.strategy is None:
                    self.strategy = HybridOptimizedStrategy(
                        config=self.config,
                        data_1m={symbol: data_1m},
                        data_5m={symbol: data_5m}
                    )

                # Resample 5m to 1m index
                data_5m_resampled = data_5m.reindex(data_1m.index, method='ffill')

                # 管理现有仓位 Check existing positions
                self._manage_positions(symbol, data_1m)

                # 检查新信号 Check for new signals
                if symbol not in self.strategy.positions:
                    self._check_entry_signals(symbol, data_1m, data_5m_resampled)

            except Exception as e:
                logger.error(f"Error processing {symbol}: {e}")

    def _manage_positions(self, symbol: str, data: pd.DataFrame):
        """管理现有仓位 Manage Existing Positions"""

        # 获取MT4持仓 Get MT4 positions
        mt4_positions = self.mt4.get_open_positions(symbol=symbol)

        # 检查策略是否有持仓 Check if we have strategy position
        if symbol in self.strategy.positions:
            strategy_pos = self.strategy.positions[symbol]

            # 检查出场条件 Check exit conditions
            should_exit, exit_price, reason = self.strategy.check_exit(
                strategy_pos,
                data,
                datetime.now()
            )

            if should_exit:
                # 查找对应的MT4仓位 Find corresponding MT4 position
                for mt4_pos in mt4_positions:
                    if mt4_pos['symbol'] == symbol:
                        # 平仓 Close position
                        if self.mt4.close_position(mt4_pos['ticket']):
                            # 在策略中记录 Record in strategy
                            self.strategy.close_position(
                                strategy_pos,
                                exit_price,
                                datetime.now(),
                                reason
                            )
                            logger.info(f"Position closed: {symbol} | Reason: {reason}")
                        break

            # 更新追踪止损 Update trailing stop if needed
            elif strategy_pos.trailing_active:
                # 修改MT4仓位的止损 Modify MT4 position stop loss
                for mt4_pos in mt4_positions:
                    if mt4_pos['symbol'] == symbol:
                        if mt4_pos['stop_loss'] != strategy_pos.stop_loss:
                            self.mt4.modify_position(
                                mt4_pos['ticket'],
                                stop_loss=strategy_pos.stop_loss
                            )
                        break

    def _check_entry_signals(self, symbol: str, data_1m: pd.DataFrame, data_5m: pd.DataFrame):
        """检查入场信号 Check for Entry Signals"""

        # 生成信号 Generate signal
        signal = self.strategy.generate_signals(
            data_1m,
            data_5m,
            symbol,
            datetime.now()
        )

        if signal:
            # 在MT4开仓 Open position on MT4
            size = self.position_sizes.get(symbol, 0.1)

            ticket = self.mt4.open_position(
                symbol=symbol,
                direction=signal.direction,
                volume=size,
                stop_loss=signal.stop_loss,
                take_profit=signal.take_profit[0],  # 使用第一个止盈位 Use first TP level
                comment=f"HybridStrategy_{signal.direction}"
            )

            if ticket:
                # 在策略中记录 Record in strategy
                self.strategy.open_position(signal)
                logger.info(f"Position opened: {symbol} {signal.direction} @ {signal.entry_price}")

    def _print_realtime_status(self):
        """实时打印状态 Print Real-time Status"""
        from datetime import datetime as dt

        current_time = dt.now()

        # Get account info
        account = self.mt4.get_account_info()
        if not account:
            return

        # Get positions
        positions = self.mt4.get_open_positions()

        # Get strategy stats
        stats = self.strategy.get_statistics() if self.strategy else {}

        # Clear previous lines (if supported)
        print("\033[H\033[J", end="")  # Clear screen

        # Print header
        print("="*100)
        print(f"{'📊 LIVE TRADING STATUS':^100}")
        print("="*100)
        print(f"Time: {current_time.strftime('%Y-%m-%d %H:%M:%S')} | Tick: {self.tick_count}")
        print("-"*100)

        # Account info
        balance = account['balance']
        equity = account['equity']
        profit = account['profit']
        margin_level = account.get('margin_level', 0)

        pnl_color = "🟢" if profit >= 0 else "🔴"
        print(f"💰 Account: Balance=${balance:,.2f} | Equity=${equity:,.2f} | "
              f"{pnl_color} P&L=${profit:+,.2f} | Margin Level={margin_level:.1f}%")

        # Daily stats (if available)
        if self.strategy:
            daily_pnl = self.strategy.daily_pnl
            daily_color = "🟢" if daily_pnl >= 0 else "🔴"
            max_loss = self.strategy.max_daily_loss
            remaining = max_loss + daily_pnl
            print(f"📅 Today: {daily_color} ${daily_pnl:+,.2f} | "
                  f"Max Loss: ${max_loss:,.0f} | Remaining: ${remaining:,.2f}")

            # Risk status
            if self.strategy.trading_enabled:
                print("✅ Risk Status: TRADING ENABLED")
            else:
                print("🛑 Risk Status: TRADING DISABLED (Risk limit reached)")

        print("-"*100)

        # Current positions
        if positions:
            print(f"📈 OPEN POSITIONS ({len(positions)}):")
            print(f"{'Symbol':<10} {'Dir':<6} {'Size':<8} {'Entry':<12} {'Current':<12} "
                  f"{'P&L':<12} {'SL':<12} {'TP':<12}")
            print("-"*100)

            for pos in positions:
                symbol = pos['symbol']
                direction = pos['direction'].upper()
                size = pos['volume']
                entry = pos['entry_price']
                current = pos['current_price']
                pnl = pos['profit']
                sl = pos['stop_loss']
                tp = pos['take_profit']

                pnl_emoji = "🟢" if pnl >= 0 else "🔴"
                dir_emoji = "🔼" if direction == "LONG" else "🔽"

                print(f"{symbol:<10} {dir_emoji}{direction:<5} {size:<8.2f} "
                      f"{entry:<12.5f} {current:<12.5f} "
                      f"{pnl_emoji}${pnl:+10.2f} {sl:<12.5f} {tp:<12.5f}")
        else:
            print("📭 No open positions")

        print("-"*100)

        # Trading statistics
        if stats and stats.get('total_trades', 0) > 0:
            total = stats['total_trades']
            wins = stats['winning_trades']
            losses = stats['losing_trades']
            win_rate = stats['win_rate'] * 100
            pf = stats['profit_factor']
            total_pnl = stats['total_pnl']

            print(f"📊 Statistics: Trades={total} | Wins={wins} | Losses={losses} | "
                  f"Win Rate={win_rate:.1f}% | PF={pf:.2f} | Total P&L=${total_pnl:+,.2f}")
        else:
            print("📊 Statistics: No trades yet")

        print("="*100)
        print(f"⏱️  Next update in 60 seconds... (Press Ctrl+C to stop)")
        print("="*100 + "\n")

    def _log_status(self):
        """Log current trading status (detailed logging every 10 ticks)"""

        # Get account info
        account = self.mt4.get_account_info()
        if account:
            logger.info(
                f"Status | Balance: ${account['balance']:.2f} | "
                f"Equity: ${account['equity']:.2f} | "
                f"Profit: ${account['profit']:.2f} | "
                f"Open Positions: {len(self.strategy.positions)}"
            )

        # Log strategy statistics
        stats = self.strategy.get_statistics()
        if stats:
            logger.info(
                f"Stats | Trades: {stats['total_trades']} | "
                f"Win Rate: {stats['win_rate']*100:.1f}% | "
                f"Total PnL: ${stats['total_pnl']:.2f}"
            )


def main():
    """Main live trading function"""

    # Setup logging
    logger.add(
        "logs/live_{time}.log",
        rotation="1 day",
        retention="30 days",
        level="INFO"
    )

    logger.info("=" * 60)
    logger.info("STARTING LIVE TRADING")
    logger.info("=" * 60)

    # Load configuration
    config = load_config()

    # Check if live trading is enabled
    if not config['mt4']['enabled']:
        logger.error("Live trading is not enabled in config. Set mt4.enabled to true.")
        return

    # Verify MT4 credentials
    if not config['mt4']['account'] or not config['mt4']['password']:
        logger.error("MT4 credentials not configured. Please update config.yaml")
        return

    # Create and start live trader
    trader = LiveTrader(config)
    trader.start()


if __name__ == "__main__":
    main()
