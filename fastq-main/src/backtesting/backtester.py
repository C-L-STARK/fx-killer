"""
Backtesting Engine
Simulates trading strategy with historical data and risk management
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Optional
from datetime import datetime
from loguru import logger
import matplotlib.pyplot as plt
import seaborn as sns

from src.strategy.strategy import TradingStrategy, Position
from src.indicators.indicators import Indicators


class Backtester:
    """
    Backtesting engine with risk management
    """

    def __init__(self, config: dict):
        """
        Initialize backtester
        Args:
            config: Configuration dict
        """
        self.config = config
        self.initial_capital = config['backtesting']['initial_capital']
        self.capital = self.initial_capital
        self.leverage = config['trading']['leverage']
        self.commission = config['backtesting']['commission']
        self.slippage = config['backtesting']['slippage']

        self.position_sizes = config['trading']['position_sizes']
        self.max_daily_loss = config['risk']['max_daily_loss']
        self.max_drawdown = config['risk']['max_drawdown']
        self.max_positions = config['risk']['max_positions']

        self.strategy = TradingStrategy(config)
        self.equity_curve = []
        self.daily_pnl = []
        self.peak_equity = self.initial_capital
        self.current_drawdown = 0

    def run(self, data_dict: Dict[str, pd.DataFrame]) -> Dict:
        """
        Run backtest on multiple symbols
        Args:
            data_dict: Dictionary of {symbol: dataframe with indicators}
        Returns:
            Results dictionary
        """
        logger.info(f"Starting backtest with ${self.initial_capital} capital")

        # Combine all data into a unified timeline
        all_timestamps = set()
        for df in data_dict.values():
            all_timestamps.update(df.index)

        timestamps = sorted(list(all_timestamps))

        daily_start_capital = self.capital
        current_date = None

        # Iterate through each timestamp
        for timestamp in timestamps:
            # Check for new day (reset daily loss tracking)
            if current_date != timestamp.date():
                current_date = timestamp.date()
                daily_start_capital = self.capital

            # Check risk limits
            if not self._check_risk_limits(daily_start_capital):
                logger.warning(f"Risk limits breached at {timestamp}, stopping backtest")
                break

            # Check exits for existing positions
            for symbol in list(self.strategy.positions.keys()):
                if symbol not in data_dict:
                    continue

                df = data_dict[symbol]
                if timestamp not in df.index:
                    continue

                current_data = df.loc[:timestamp]
                position = self.strategy.positions[symbol]

                should_exit, exit_price, reason = self.strategy.check_exit(position, current_data)

                if should_exit:
                    # Apply slippage
                    if position.direction == 'long':
                        exit_price -= self.slippage
                    else:
                        exit_price += self.slippage

                    # Close position
                    pnl = self.strategy.close_position(position, exit_price, timestamp, reason)

                    # Apply commission
                    commission_cost = self._calculate_commission(position.size, symbol)
                    pnl -= commission_cost

                    # Update capital
                    self.capital += pnl

            # Check for new entry signals
            if len(self.strategy.positions) < self.max_positions:
                for symbol, df in data_dict.items():
                    if timestamp not in df.index:
                        continue

                    # Skip if already have position in this symbol
                    if symbol in self.strategy.positions:
                        continue

                    current_data = df.loc[:timestamp]

                    # Generate signal
                    signal = self.strategy.generate_signals(current_data, symbol)

                    if signal and self._validate_position_size(symbol):
                        # Open position
                        size = self.position_sizes.get(symbol, 0.1)
                        position = self.strategy.open_position(signal, size)

                        # Apply commission
                        commission_cost = self._calculate_commission(size, symbol)
                        self.capital -= commission_cost

            # Record equity
            open_pnl = self._calculate_open_pnl(data_dict, timestamp)
            current_equity = self.capital + open_pnl

            self.equity_curve.append({
                'timestamp': timestamp,
                'equity': current_equity,
                'cash': self.capital,
                'open_pnl': open_pnl,
                'positions': len(self.strategy.positions)
            })

            # Update peak and drawdown
            if current_equity > self.peak_equity:
                self.peak_equity = current_equity
            self.current_drawdown = (self.peak_equity - current_equity) / self.peak_equity

        # Close any remaining positions
        self._close_all_positions(data_dict)

        # Calculate results
        results = self._calculate_results()

        logger.info(f"Backtest completed. Final equity: ${self.capital:.2f}")

        return results

    def _check_risk_limits(self, daily_start_capital: float) -> bool:
        """
        Check if risk limits are breached
        Returns: True if within limits, False otherwise
        """
        # Check daily loss limit
        daily_loss = daily_start_capital - self.capital
        if daily_loss > self.max_daily_loss:
            logger.warning(f"Daily loss limit breached: ${daily_loss:.2f}")
            return False

        # Check max drawdown
        if self.current_drawdown > self.max_drawdown:
            logger.warning(f"Max drawdown breached: {self.current_drawdown:.2%}")
            return False

        return True

    def _validate_position_size(self, symbol: str) -> bool:
        """
        Validate if we have enough capital for position
        """
        size = self.position_sizes.get(symbol, 0.1)

        # Calculate required margin (simplified)
        if 'XAU' in symbol:
            contract_size = 100  # 100 oz
            price = 2000  # approximate gold price
        else:
            contract_size = 100000  # standard lot
            price = 1.0  # approximate forex price

        required_margin = (size * contract_size * price) / self.leverage

        if required_margin > self.capital * 0.5:  # Don't use more than 50% margin
            logger.warning(f"Insufficient capital for {symbol} position")
            return False

        return True

    def _calculate_commission(self, size: float, symbol: str) -> float:
        """Calculate trading commission"""
        if 'XAU' in symbol:
            contract_size = 100
            price = 2000
        else:
            contract_size = 100000
            price = 1.0

        trade_value = size * contract_size * price
        commission = trade_value * self.commission

        return commission

    def _calculate_open_pnl(self, data_dict: Dict[str, pd.DataFrame], timestamp: pd.Timestamp) -> float:
        """Calculate unrealized PnL for open positions"""
        total_pnl = 0

        for symbol, position in self.strategy.positions.items():
            if symbol not in data_dict:
                continue

            df = data_dict[symbol]
            if timestamp not in df.index:
                continue

            current_price = df.loc[timestamp, 'close']

            if position.direction == 'long':
                pnl_pips = current_price - position.entry_price
            else:
                pnl_pips = position.entry_price - current_price

            # Convert to currency
            if 'XAU' in symbol:
                pnl = pnl_pips * position.size * 100
            else:
                pnl = pnl_pips * position.size * 100000

            total_pnl += pnl

        return total_pnl

    def _close_all_positions(self, data_dict: Dict[str, pd.DataFrame]):
        """Close all remaining open positions"""
        for symbol, position in list(self.strategy.positions.items()):
            if symbol not in data_dict:
                continue

            df = data_dict[symbol]
            exit_price = df.iloc[-1]['close']
            exit_time = df.index[-1]

            pnl = self.strategy.close_position(position, exit_price, exit_time, 'end_of_backtest')
            self.capital += pnl

    def _calculate_results(self) -> Dict:
        """Calculate backtest results and metrics"""
        equity_df = pd.DataFrame(self.equity_curve)

        if equity_df.empty:
            return {}

        equity_df.set_index('timestamp', inplace=True)

        # Calculate returns
        equity_df['returns'] = equity_df['equity'].pct_change()
        equity_df['cumulative_returns'] = (1 + equity_df['returns']).cumprod()

        # Strategy statistics
        strategy_stats = self.strategy.get_statistics()

        # Performance metrics
        total_return = (self.capital - self.initial_capital) / self.initial_capital

        # Calculate max drawdown
        cumulative = equity_df['equity']
        running_max = cumulative.cummax()
        drawdown = (cumulative - running_max) / running_max
        max_drawdown = drawdown.min()

        # Sharpe ratio (annualized)
        returns = equity_df['returns'].dropna()
        if len(returns) > 0 and returns.std() > 0:
            sharpe_ratio = (returns.mean() / returns.std()) * np.sqrt(252 * 24 * 60)  # 1m bars
        else:
            sharpe_ratio = 0

        # Sortino ratio
        downside_returns = returns[returns < 0]
        if len(downside_returns) > 0 and downside_returns.std() > 0:
            sortino_ratio = (returns.mean() / downside_returns.std()) * np.sqrt(252 * 24 * 60)
        else:
            sortino_ratio = 0

        results = {
            'initial_capital': self.initial_capital,
            'final_capital': self.capital,
            'total_return': total_return,
            'total_return_pct': total_return * 100,
            'max_drawdown': max_drawdown,
            'max_drawdown_pct': max_drawdown * 100,
            'sharpe_ratio': sharpe_ratio,
            'sortino_ratio': sortino_ratio,
            'total_trades': strategy_stats.get('total_trades', 0),
            'winning_trades': strategy_stats.get('winning_trades', 0),
            'losing_trades': strategy_stats.get('losing_trades', 0),
            'win_rate': strategy_stats.get('win_rate', 0),
            'win_rate_pct': strategy_stats.get('win_rate', 0) * 100,
            'avg_win': strategy_stats.get('avg_win', 0),
            'avg_loss': strategy_stats.get('avg_loss', 0),
            'largest_win': strategy_stats.get('largest_win', 0),
            'largest_loss': strategy_stats.get('largest_loss', 0),
            'profit_factor': strategy_stats.get('profit_factor', 0),
            'equity_curve': equity_df
        }

        return results

    def plot_results(self, results: Dict, save_path: Optional[str] = None):
        """Plot backtest results"""
        if not results or results['equity_curve'].empty:
            logger.warning("No results to plot")
            return

        equity_df = results['equity_curve']

        fig, axes = plt.subplots(3, 1, figsize=(15, 12))

        # Equity curve
        axes[0].plot(equity_df.index, equity_df['equity'], label='Equity', linewidth=2)
        axes[0].axhline(y=self.initial_capital, color='gray', linestyle='--', label='Initial Capital')
        axes[0].set_title('Equity Curve', fontsize=14, fontweight='bold')
        axes[0].set_ylabel('Equity ($)')
        axes[0].legend()
        axes[0].grid(True, alpha=0.3)

        # Drawdown
        cumulative = equity_df['equity']
        running_max = cumulative.cummax()
        drawdown = (cumulative - running_max) / running_max * 100

        axes[1].fill_between(drawdown.index, drawdown, 0, alpha=0.3, color='red')
        axes[1].plot(drawdown.index, drawdown, color='red', linewidth=1)
        axes[1].set_title('Drawdown', fontsize=14, fontweight='bold')
        axes[1].set_ylabel('Drawdown (%)')
        axes[1].grid(True, alpha=0.3)

        # Open positions
        axes[2].plot(equity_df.index, equity_df['positions'], linewidth=2, color='green')
        axes[2].set_title('Open Positions Over Time', fontsize=14, fontweight='bold')
        axes[2].set_ylabel('Number of Positions')
        axes[2].set_xlabel('Time')
        axes[2].grid(True, alpha=0.3)

        plt.tight_layout()

        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            logger.info(f"Results plot saved to {save_path}")

        plt.close()

    def print_results(self, results: Dict):
        """Print formatted results"""
        if not results:
            logger.warning("No results to print")
            return

        print("\n" + "=" * 60)
        print("BACKTEST RESULTS")
        print("=" * 60)
        print(f"Initial Capital:      ${results['initial_capital']:,.2f}")
        print(f"Final Capital:        ${results['final_capital']:,.2f}")
        print(f"Total Return:         ${results['final_capital'] - results['initial_capital']:,.2f} ({results['total_return_pct']:.2f}%)")
        print(f"Max Drawdown:         {results['max_drawdown_pct']:.2f}%")
        print(f"Sharpe Ratio:         {results['sharpe_ratio']:.2f}")
        print(f"Sortino Ratio:        {results['sortino_ratio']:.2f}")
        print("\n" + "-" * 60)
        print("TRADE STATISTICS")
        print("-" * 60)
        print(f"Total Trades:         {results['total_trades']}")
        print(f"Winning Trades:       {results['winning_trades']}")
        print(f"Losing Trades:        {results['losing_trades']}")
        print(f"Win Rate:             {results['win_rate_pct']:.2f}%")
        print(f"Average Win:          ${results['avg_win']:.2f}")
        print(f"Average Loss:         ${results['avg_loss']:.2f}")
        print(f"Largest Win:          ${results['largest_win']:.2f}")
        print(f"Largest Loss:         ${results['largest_loss']:.2f}")
        print(f"Profit Factor:        {results['profit_factor']:.2f}")
        print("=" * 60 + "\n")
