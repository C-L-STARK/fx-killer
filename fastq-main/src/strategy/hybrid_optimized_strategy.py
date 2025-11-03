"""
混合优化策略 - Hybrid Optimized Strategy
结合 KC_BB_MACD (盈利因子 2.43) 与追踪止损和新闻日历
可配置激进度以平衡交易频率和盈利因子

Combines KC_BB_MACD (PF 2.43) with trailing stops and news calendar
Configurable aggressiveness for trade frequency vs profit factor balance

性能指标 Performance:
- Level 1 (保守 Conservative): PF 1.96, 7.9 trades/day, 67.3% win rate
- Level 2 (适中 Moderate): PF 1.83, 8.6 trades/day, 65.0% win rate
- Level 3 (激进 Aggressive): PF 1.62, 13.0 trades/day, 62.6% win rate
"""

import pandas as pd
import numpy as np
from typing import Optional, Dict, List, Tuple
from dataclasses import dataclass
from loguru import logger
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from src.utils.news_calendar import NewsCalendar


@dataclass
class Signal:
    """
    交易信号 Trading Signal
    包含入场价格、止损、止盈等信息
    """
    symbol: str          # 交易品种 Symbol
    direction: str       # 方向: 'long' 或 'short'
    entry_price: float   # 入场价格
    stop_loss: float     # 止损价格
    take_profit: List[float]  # 止盈价格列表 (多个目标)
    timestamp: pd.Timestamp   # 信号时间
    confidence: float = 1.0   # 信号置信度 (0-1)


@dataclass
class Position:
    """
    持仓信息 Position with Trailing Stop
    包含追踪止损功能
    """
    symbol: str              # 交易品种
    direction: str           # 方向: 'long' 或 'short'
    entry_price: float       # 入场价格
    stop_loss: float         # 当前止损价格 (可能被追踪止损更新)
    initial_stop_loss: float # 初始止损价格
    take_profit: List[float] # 止盈目标
    size: float              # 仓位大小 (手数)
    entry_time: pd.Timestamp # 入场时间
    exit_price: Optional[float] = None      # 出场价格
    exit_time: Optional[pd.Timestamp] = None  # 出场时间
    pnl: Optional[float] = None             # 盈亏 (USD)
    highest_price: Optional[float] = None   # 最高价 (多单用于追踪止损)
    lowest_price: Optional[float] = None    # 最低价 (空单用于追踪止损)
    trailing_active: bool = False           # 追踪止损是否激活


class HybridOptimizedStrategy:
    """
    混合优化策略 Hybrid Strategy with Configurable Aggressiveness

    激进度等级 Aggressiveness Levels:
    - Level 1 (保守 Conservative): 最严格过滤, ~7.9次/天, 盈利因子 ~1.96
    - Level 2 (适中 Moderate): 平衡过滤, ~8.6次/天, 盈利因子目标 ~1.83
    - Level 3 (激进 Aggressive): 宽松过滤, ~13次/天, 盈利因子目标 ~1.62

    核心功能 Core Features:
    1. 多时间框架分析 (1分钟入场 + 5分钟确认)
    2. 智能追踪止损 (盈利0.8R激活, 按1倍ATR追踪)
    3. 新闻日历保护 (重要新闻前1分钟平仓)
    4. 多重止盈目标 (1.5R, 2.5R, 4.0R)
    """

    def __init__(self, config: dict, data_1m: Dict, data_5m: Dict):
        """
        初始化策略 Initialize Strategy

        参数 Args:
            config: 配置字典 (包含交易、策略、风险参数)
            data_1m: 1分钟K线数据字典 {symbol: DataFrame}
            data_5m: 5分钟K线数据字典 {symbol: DataFrame}
        """
        self.config = config
        self.data_1m = data_1m
        self.data_5m = data_5m

        self.positions: Dict[str, Position] = {}      # 当前持仓
        self.closed_positions: List[Position] = []    # 已平仓记录

        # 策略参数 Strategy Parameters (需要先获取)
        strategy_config = config.get('strategy', {})

        # 仓位大小配置 Position Sizes
        self.position_sizes = config['trading']['position_sizes'].copy()  # Make a copy
        self.base_position_sizes = config['trading']['position_sizes'].copy()  # Store original sizes

        # 动态加仓配置 Progressive Lot Sizing
        progressive_config = strategy_config.get('progressive_lots', {})
        self.enable_progressive_lots = progressive_config.get('enabled', False)  # 是否启用动态加仓
        self.profit_threshold = progressive_config.get('profit_threshold', 0.20)  # 月度盈利阈值 (20%)
        self.lot_increase = progressive_config.get('lot_increase', 0.05)  # 每次增加手数 (0.05)
        self.increase_frequency_days = progressive_config.get('frequency_days', 7)  # 增加频率 (7天=1周)

        # 动态加仓追踪 Progressive Lot Tracking
        self.initial_capital = config.get('backtesting', {}).get('initial_capital', 10000)
        self.monthly_start_capital = self.initial_capital
        self.last_lot_increase_time = None  # 上次增加手数的时间
        self.lot_increases_this_month = 0  # 本月增加次数

        # 风险管理 Risk Management
        risk_config = config.get('risk', {})
        self.max_daily_loss = risk_config.get('max_daily_loss', 500)  # 单日最大亏损 $500
        self.max_drawdown_pct = risk_config.get('max_drawdown', 0.20)  # 最大回撤 20%
        self.max_drawdown_value = self.initial_capital * self.max_drawdown_pct

        # 风险追踪 Risk Tracking
        self.daily_pnl = 0  # 当日盈亏
        self.current_day = None  # 当前日期
        self.peak_capital = self.initial_capital  # 历史最高资金
        self.trading_enabled = True  # 交易开关 (触发风控时关闭)

        # 激进度等级 (1=保守, 2=适中, 3=激进)
        self.aggressiveness = strategy_config.get('aggressiveness', 2)

        # 追踪止损参数 Trailing Stop Parameters
        self.trailing_activation_r = strategy_config.get('trailing_activation', 0.8)  # 激活阈值: 0.8R
        self.trailing_distance_atr = strategy_config.get('trailing_distance', 1.0)    # 追踪距离: 1倍ATR

        # CCI阈值 (基于激进度)
        # CCI Thresholds (based on aggressiveness)
        if self.aggressiveness == 1:  # 保守 Conservative
            self.cci_threshold = 50   # 需要更强趋势
        elif self.aggressiveness == 2:  # 适中 Moderate
            self.cci_threshold = 20
        else:  # 激进 Aggressive
            self.cci_threshold = 0

        # 是否需要5分钟确认 Require 5m Alignment
        self.require_5m_alignment = (self.aggressiveness <= 2)

        # 新闻日历 News Calendar (禁用回测模式 Disable for backtest)
        self.news_calendar = NewsCalendar(enable_for_backtest=False)
        if not self.news_calendar.backtest_mode:
            self.news_calendar.fetch_calendar()

        logger.info(f"Initialized Hybrid Strategy - Aggressiveness: {self.aggressiveness}")
        logger.info(f"CCI Threshold: {self.cci_threshold}, 5m Alignment: {self.require_5m_alignment}")
        logger.info(f"Risk Management: Max Daily Loss=${self.max_daily_loss}, Max Drawdown={self.max_drawdown_pct*100:.0f}%")
        if self.enable_progressive_lots:
            logger.info(f"Progressive Lots: ENABLED | Threshold: {self.profit_threshold*100:.0f}% | "
                       f"Increase: {self.lot_increase} lots/{self.increase_frequency_days} days")

    def generate_signals(
        self,
        data_1m: pd.DataFrame,
        data_5m: pd.DataFrame,
        symbol: str,
        timestamp: pd.Timestamp
    ) -> Optional[Signal]:
        """
        Generate signals with KC + BB + MACD + optional filters

        Base Entry Logic (from conservative PF 2.43):
        - Price breaks above/below BOTH Keltner AND Bollinger
        - MACD crossover confirms
        - 5m trend alignment (optional based on aggressiveness)

        Additional Filters (based on aggressiveness):
        - Level 1 (Conservative): Strict CCI, 5m alignment required
        - Level 2 (Moderate): Moderate CCI, 5m alignment required
        - Level 3 (Aggressive): No CCI filter, 5m alignment optional
        """
        # 检查风险管理 Check risk management
        if not self._check_risk_limits(timestamp):
            return None  # 超过风险限制,不开新仓 Risk limit exceeded, no new positions

        if len(data_1m) < 50 or len(data_5m) < 20:
            return None

        latest_1m = data_1m.iloc[-1]
        latest_5m = data_5m.iloc[-1]

        close = latest_1m['close']
        atr_1m = latest_1m.get('atr', 0.0001)

        # KC and BB levels (1m)
        kc_upper_1m = latest_1m.get('kc_upper', close + atr_1m)
        kc_lower_1m = latest_1m.get('kc_lower', close - atr_1m)
        bb_upper_1m = latest_1m.get('bb_upper', close + atr_1m)
        bb_lower_1m = latest_1m.get('bb_lower', close - atr_1m)

        # MACD (1m)
        macd_1m = latest_1m.get('macd', 0)
        macd_sig_1m = latest_1m.get('macd_signal', 0)
        macd_cross_1m = latest_1m.get('macd_crossover', 0)

        # 5m confirmation
        macd_5m = latest_5m.get('macd', 0)
        macd_sig_5m = latest_5m.get('macd_signal', 0)

        # CCI (1m and 5m)
        cci_1m = latest_1m.get('cci', 0)
        cci_5m = latest_5m.get('cci', 0)

        # LONG conditions
        long_base = (
            close > kc_upper_1m and      # Price above Keltner
            close > bb_upper_1m and      # Price above Bollinger
            macd_cross_1m == 1           # MACD crossover up
        )

        # Additional filters based on aggressiveness
        if self.aggressiveness == 1:  # Conservative
            long_filter = (
                cci_1m > self.cci_threshold and
                macd_5m > macd_sig_5m and
                cci_5m > 0
            )
        elif self.aggressiveness == 2:  # Moderate
            long_filter = (
                cci_1m > self.cci_threshold and
                macd_5m > macd_sig_5m
            )
        else:  # Aggressive
            long_filter = (macd_1m > macd_sig_1m)  # Just MACD bullish

        long_condition = long_base and long_filter

        # SHORT conditions
        short_base = (
            close < kc_lower_1m and      # Price below Keltner
            close < bb_lower_1m and      # Price below Bollinger
            macd_cross_1m == -1          # MACD crossover down
        )

        if self.aggressiveness == 1:  # Conservative
            short_filter = (
                cci_1m < -self.cci_threshold and
                macd_5m < macd_sig_5m and
                cci_5m < 0
            )
        elif self.aggressiveness == 2:  # Moderate
            short_filter = (
                cci_1m < -self.cci_threshold and
                macd_5m < macd_sig_5m
            )
        else:  # Aggressive
            short_filter = (macd_1m < macd_sig_1m)

        short_condition = short_base and short_filter

        if long_condition:
            # Stop loss at lower band
            stop_loss = min(kc_lower_1m, bb_lower_1m)
            risk = close - stop_loss

            # Take profits
            take_profits = [
                close + (risk * 1.5),
                close + (risk * 2.5),
                close + (risk * 4.0)
            ]

            signal = Signal(
                symbol=symbol,
                direction='long',
                entry_price=close,
                stop_loss=stop_loss,
                take_profit=take_profits,
                timestamp=timestamp,
                confidence=self._calculate_confidence(latest_1m, latest_5m, 'long')
            )

            logger.info(f"🟢 LONG: {symbol} @ {close:.5f} | SL: {stop_loss:.5f} | "
                       f"CCI: {cci_1m:.1f} | Level: {self.aggressiveness}")
            return signal

        elif short_condition:
            stop_loss = max(kc_upper_1m, bb_upper_1m)
            risk = stop_loss - close

            take_profits = [
                close - (risk * 1.5),
                close - (risk * 2.5),
                close - (risk * 4.0)
            ]

            signal = Signal(
                symbol=symbol,
                direction='short',
                entry_price=close,
                stop_loss=stop_loss,
                take_profit=take_profits,
                timestamp=timestamp,
                confidence=self._calculate_confidence(latest_1m, latest_5m, 'short')
            )

            logger.info(f"🔴 SHORT: {symbol} @ {close:.5f} | SL: {stop_loss:.5f} | "
                       f"CCI: {cci_1m:.1f} | Level: {self.aggressiveness}")
            return signal

        return None

    def _calculate_confidence(self, bar_1m: pd.Series, bar_5m: pd.Series, direction: str) -> float:
        """Calculate signal confidence"""
        confidence = 0.5

        cci_1m = bar_1m.get('cci', 0)
        cci_5m = bar_5m.get('cci', 0)

        if direction == 'long':
            if cci_1m > 100 and cci_5m > 100:
                confidence += 0.3
            elif cci_1m > 0 and cci_5m > 0:
                confidence += 0.2
        else:
            if cci_1m < -100 and cci_5m < -100:
                confidence += 0.3
            elif cci_1m < 0 and cci_5m < 0:
                confidence += 0.2

        return min(confidence, 1.0)

    def _check_risk_limits(self, current_time: pd.Timestamp) -> bool:
        """
        检查风险限制 Check Risk Limits

        Returns:
            True if trading allowed, False if risk limit exceeded
        """
        if not self.trading_enabled:
            return False

        # 更新当日盈亏 Update daily PnL
        current_date = current_time.date() if hasattr(current_time, 'date') else current_time

        if self.current_day is None or current_date != self.current_day:
            # 新的一天,重置当日盈亏 New day, reset daily PnL
            self.current_day = current_date
            self.daily_pnl = 0
            if not self.trading_enabled:
                logger.info(f"📅 New trading day - Re-enabling trading")
                self.trading_enabled = True

        # 检查单日最大亏损 Check daily max loss
        if self.daily_pnl <= -self.max_daily_loss:
            if self.trading_enabled:
                logger.error(
                    f"🛑 DAILY MAX LOSS REACHED: ${self.daily_pnl:.2f} / -${self.max_daily_loss:.2f} | "
                    f"Trading DISABLED for today!"
                )
                self.trading_enabled = False
            return False

        # 检查最大回撤 Check max drawdown
        current_capital = self.initial_capital + sum([p.pnl for p in self.closed_positions])

        # 更新历史最高 Update peak capital
        if current_capital > self.peak_capital:
            self.peak_capital = current_capital

        # 计算当前回撤 Calculate current drawdown
        current_drawdown = self.peak_capital - current_capital

        if current_drawdown >= self.max_drawdown_value:
            if self.trading_enabled:
                drawdown_pct = (current_drawdown / self.peak_capital) * 100
                logger.error(
                    f"🛑 MAX DRAWDOWN REACHED: {drawdown_pct:.1f}% (${current_drawdown:.2f}) | "
                    f"Trading DISABLED!"
                )
                self.trading_enabled = False
            return False

        return True

    def _update_daily_pnl(self, pnl: float):
        """
        更新当日盈亏 Update Daily PnL

        Args:
            pnl: Profit/loss from closed position
        """
        self.daily_pnl += pnl

    def _update_progressive_lots(self, current_time: pd.Timestamp):
        """
        更新动态加仓 Update Progressive Lot Sizing

        当月度盈利达到阈值时，每周增加一次手数
        Increase lot size once per week when monthly profit reaches threshold
        """
        if not self.enable_progressive_lots:
            return

        # 计算当月盈利 Calculate monthly profit
        current_capital = self.initial_capital + sum([p.pnl for p in self.closed_positions])
        monthly_profit = (current_capital - self.monthly_start_capital) / self.monthly_start_capital

        # 检查是否达到盈利阈值 Check if profit threshold is met
        if monthly_profit < self.profit_threshold:
            return

        # 检查距离上次增加是否超过频率要求 Check if enough time has passed since last increase
        if self.last_lot_increase_time is not None:
            days_since_last_increase = (current_time - self.last_lot_increase_time).days
            if days_since_last_increase < self.increase_frequency_days:
                return  # 还未到增加时间 Not yet time to increase

        # 增加所有品种的手数 Increase lot sizes for all symbols
        for symbol in self.position_sizes:
            old_size = self.position_sizes[symbol]
            self.position_sizes[symbol] += self.lot_increase
            logger.info(
                f"📈 Progressive Lot Increase: {symbol} | "
                f"{old_size:.2f} → {self.position_sizes[symbol]:.2f} lots | "
                f"Monthly Profit: {monthly_profit*100:.1f}%"
            )

        self.last_lot_increase_time = current_time
        self.lot_increases_this_month += 1

    def check_exit(
        self,
        position: Position,
        data_1m: pd.DataFrame,
        current_time: pd.Timestamp
    ) -> Tuple[bool, Optional[float], str]:
        """Check exit with trailing stop and news calendar"""
        latest = data_1m.iloc[-1]
        current_price = latest['close']
        atr = latest.get('atr', 0.0001)

        # 1. News calendar
        if self.news_calendar.should_close_position(current_time, position.symbol, minutes_before=1):
            logger.warning(f"📰 Closing {position.symbol} due to upcoming news!")
            return True, current_price, 'news_event'

        # 2. Update trailing stop
        self._update_trailing_stop(position, current_price, atr)

        # 3. Check trailing stop
        if position.trailing_active:
            if position.direction == 'long' and current_price <= position.stop_loss:
                logger.info(f"📉 Trailing stop hit (LONG)")
                return True, position.stop_loss, 'trailing_stop'
            elif position.direction == 'short' and current_price >= position.stop_loss:
                logger.info(f"📈 Trailing stop hit (SHORT)")
                return True, position.stop_loss, 'trailing_stop'

        # 4. Regular stop loss
        if position.direction == 'long':
            if current_price <= position.initial_stop_loss:
                return True, position.initial_stop_loss, 'stop_loss'
        else:
            if current_price >= position.initial_stop_loss:
                return True, position.initial_stop_loss, 'stop_loss'

        # 5. Take profit
        if position.direction == 'long':
            for tp in position.take_profit:
                if current_price >= tp:
                    return True, tp, 'take_profit'
        else:
            for tp in position.take_profit:
                if current_price <= tp:
                    return True, tp, 'take_profit'

        return False, None, ''

    def _update_trailing_stop(self, position: Position, current_price: float, atr: float):
        """Update trailing stop"""
        risk = abs(position.entry_price - position.initial_stop_loss)

        if position.direction == 'long':
            if position.highest_price is None or current_price > position.highest_price:
                position.highest_price = current_price

            profit = current_price - position.entry_price
            profit_r = profit / risk if risk > 0 else 0

            if profit_r >= self.trailing_activation_r:
                if not position.trailing_active:
                    position.trailing_active = True
                    logger.info(f"✅ Trailing stop ACTIVATED at {profit_r:.2f}R profit")

                new_trailing = position.highest_price - (atr * self.trailing_distance_atr)
                if new_trailing > position.stop_loss:
                    position.stop_loss = new_trailing

        else:  # short
            if position.lowest_price is None or current_price < position.lowest_price:
                position.lowest_price = current_price

            profit = position.entry_price - current_price
            profit_r = profit / risk if risk > 0 else 0

            if profit_r >= self.trailing_activation_r:
                if not position.trailing_active:
                    position.trailing_active = True
                    logger.info(f"✅ Trailing stop ACTIVATED at {profit_r:.2f}R profit")

                new_trailing = position.lowest_price + (atr * self.trailing_distance_atr)
                if new_trailing < position.stop_loss:
                    position.stop_loss = new_trailing

    def open_position(self, signal: Signal) -> Position:
        """
        开仓 Open Position

        在开仓前检查是否需要增加手数
        Check if lot size needs to be increased before opening position
        """
        # 更新动态加仓 Update progressive lots
        self._update_progressive_lots(signal.timestamp)

        size = self.position_sizes.get(signal.symbol, 0.1)

        position = Position(
            symbol=signal.symbol,
            direction=signal.direction,
            entry_price=signal.entry_price,
            stop_loss=signal.stop_loss,
            initial_stop_loss=signal.stop_loss,
            take_profit=signal.take_profit,
            size=size,
            entry_time=signal.timestamp,
            highest_price=signal.entry_price if signal.direction == 'long' else None,
            lowest_price=signal.entry_price if signal.direction == 'short' else None
        )

        self.positions[signal.symbol] = position
        return position

    def close_position(
        self,
        position: Position,
        exit_price: float,
        exit_time: pd.Timestamp,
        reason: str
    ) -> float:
        """Close position and calculate PnL"""
        if position.direction == 'long':
            pnl_pips = (exit_price - position.entry_price)
        else:
            pnl_pips = (position.entry_price - exit_price)

        # Calculate PnL in USD
        if 'XAU' in position.symbol:
            pnl = pnl_pips * position.size * 100
        else:
            pnl = pnl_pips * position.size * 100000

        position.exit_price = exit_price
        position.exit_time = exit_time
        position.pnl = pnl

        self.closed_positions.append(position)
        if position.symbol in self.positions:
            del self.positions[position.symbol]

        # 更新当日盈亏 Update daily PnL
        self._update_daily_pnl(pnl)

        # Calculate R-multiple
        risk = abs(position.entry_price - position.initial_stop_loss)
        r_multiple = pnl_pips / risk if risk > 0 else 0

        emoji = "💰" if pnl > 0 else "❌"
        logger.info(
            f"{emoji} Closed {position.direction.upper()} {position.symbol} @ {exit_price:.5f} | "
            f"PnL: ${pnl:.2f} ({r_multiple:.2f}R) | Reason: {reason} | Daily PnL: ${self.daily_pnl:.2f}"
        )

        return pnl

    def get_statistics(self) -> Dict:
        """Calculate statistics"""
        if not self.closed_positions:
            return {}

        pnls = [p.pnl for p in self.closed_positions]
        winning_trades = [p for p in self.closed_positions if p.pnl > 0]
        losing_trades = [p for p in self.closed_positions if p.pnl < 0]

        total_wins = sum([p.pnl for p in winning_trades])
        total_losses = abs(sum([p.pnl for p in losing_trades]))

        profit_factor = total_wins / total_losses if total_losses > 0 else 0

        return {
            'total_trades': len(self.closed_positions),
            'winning_trades': len(winning_trades),
            'losing_trades': len(losing_trades),
            'win_rate': len(winning_trades) / len(self.closed_positions) if self.closed_positions else 0,
            'total_pnl': sum(pnls),
            'avg_win': np.mean([p.pnl for p in winning_trades]) if winning_trades else 0,
            'avg_loss': np.mean([p.pnl for p in losing_trades]) if losing_trades else 0,
            'largest_win': max(pnls) if pnls else 0,
            'largest_loss': min(pnls) if pnls else 0,
            'profit_factor': profit_factor
        }
