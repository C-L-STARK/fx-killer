"""
MetaTrader 4/5 Integration Module
For live trading execution
"""

import MetaTrader5 as mt5
from typing import Optional, Dict, List
from datetime import datetime
from loguru import logger
import time


class MT4Connector:
    """
    MetaTrader 4/5 connector for live trading
    Note: MT4 uses MT5 library in Python
    """

    def __init__(self, config: dict):
        """
        Initialize MT4/MT5 connector
        Args:
            config: MT4 configuration dict
        """
        self.config = config
        self.account = config['mt4']['account']
        self.password = config['mt4']['password']
        self.server = config['mt4']['server']
        self.magic_number = config['mt4']['magic_number']
        self.connected = False

    def connect(self) -> bool:
        """Connect to MT4/MT5 terminal"""
        try:
            # Initialize MT5
            if not mt5.initialize():
                logger.error(f"MT5 initialization failed: {mt5.last_error()}")
                return False

            # Login to account
            if self.account and self.password and self.server:
                authorized = mt5.login(
                    login=self.account,
                    password=self.password,
                    server=self.server
                )

                if not authorized:
                    logger.error(f"MT5 login failed: {mt5.last_error()}")
                    mt5.shutdown()
                    return False

            account_info = mt5.account_info()
            if account_info is None:
                logger.error("Failed to get account info")
                return False

            self.connected = True
            logger.info(f"Connected to MT5 | Account: {account_info.login} | Balance: ${account_info.balance:.2f}")

            return True

        except Exception as e:
            logger.error(f"Connection error: {e}")
            return False

    def disconnect(self):
        """Disconnect from MT5"""
        if self.connected:
            mt5.shutdown()
            self.connected = False
            logger.info("Disconnected from MT5")

    def get_account_info(self) -> Optional[Dict]:
        """Get account information"""
        if not self.connected:
            logger.warning("Not connected to MT5")
            return None

        try:
            account_info = mt5.account_info()
            if account_info is None:
                return None

            return {
                'login': account_info.login,
                'balance': account_info.balance,
                'equity': account_info.equity,
                'margin': account_info.margin,
                'free_margin': account_info.margin_free,
                'margin_level': account_info.margin_level,
                'profit': account_info.profit
            }

        except Exception as e:
            logger.error(f"Error getting account info: {e}")
            return None

    def open_position(
        self,
        symbol: str,
        direction: str,
        volume: float,
        stop_loss: float,
        take_profit: float,
        comment: str = ""
    ) -> Optional[int]:
        """
        Open a new position
        Args:
            symbol: Trading symbol
            direction: 'long' or 'short'
            volume: Lot size
            stop_loss: Stop loss price
            take_profit: Take profit price
            comment: Order comment
        Returns:
            Order ticket number or None
        """
        if not self.connected:
            logger.warning("Not connected to MT5")
            return None

        try:
            # Get symbol info
            symbol_info = mt5.symbol_info(symbol)
            if symbol_info is None:
                logger.error(f"Symbol {symbol} not found")
                return None

            if not symbol_info.visible:
                if not mt5.symbol_select(symbol, True):
                    logger.error(f"Failed to select symbol {symbol}")
                    return None

            # Get current price
            tick = mt5.symbol_info_tick(symbol)
            if tick is None:
                logger.error(f"Failed to get tick for {symbol}")
                return None

            # Determine order type and price
            if direction == 'long':
                order_type = mt5.ORDER_TYPE_BUY
                price = tick.ask
            else:  # short
                order_type = mt5.ORDER_TYPE_SELL
                price = tick.bid

            # Prepare request
            request = {
                "action": mt5.TRADE_ACTION_DEAL,
                "symbol": symbol,
                "volume": volume,
                "type": order_type,
                "price": price,
                "sl": stop_loss,
                "tp": take_profit,
                "deviation": 10,
                "magic": self.magic_number,
                "comment": comment,
                "type_time": mt5.ORDER_TIME_GTC,
                "type_filling": mt5.ORDER_FILLING_IOC,
            }

            # Send order
            result = mt5.order_send(request)

            if result is None:
                logger.error(f"Order send failed: {mt5.last_error()}")
                return None

            if result.retcode != mt5.TRADE_RETCODE_DONE:
                logger.error(f"Order failed: {result.retcode} - {result.comment}")
                return None

            logger.info(
                f"Position opened: {direction.upper()} {volume} {symbol} @ {price:.5f} | "
                f"SL: {stop_loss:.5f} | TP: {take_profit:.5f} | Ticket: {result.order}"
            )

            return result.order

        except Exception as e:
            logger.error(f"Error opening position: {e}")
            return None

    def close_position(self, ticket: int) -> bool:
        """
        Close an existing position
        Args:
            ticket: Position ticket number
        Returns:
            True if successful, False otherwise
        """
        if not self.connected:
            logger.warning("Not connected to MT5")
            return False

        try:
            # Get position info
            position = mt5.positions_get(ticket=ticket)
            if position is None or len(position) == 0:
                logger.error(f"Position {ticket} not found")
                return False

            position = position[0]

            # Get current price
            tick = mt5.symbol_info_tick(position.symbol)
            if tick is None:
                logger.error(f"Failed to get tick for {position.symbol}")
                return False

            # Determine close order type and price
            if position.type == mt5.ORDER_TYPE_BUY:
                order_type = mt5.ORDER_TYPE_SELL
                price = tick.bid
            else:
                order_type = mt5.ORDER_TYPE_BUY
                price = tick.ask

            # Prepare close request
            request = {
                "action": mt5.TRADE_ACTION_DEAL,
                "symbol": position.symbol,
                "volume": position.volume,
                "type": order_type,
                "position": ticket,
                "price": price,
                "deviation": 10,
                "magic": self.magic_number,
                "comment": "Close position",
                "type_time": mt5.ORDER_TIME_GTC,
                "type_filling": mt5.ORDER_FILLING_IOC,
            }

            # Send close order
            result = mt5.order_send(request)

            if result is None:
                logger.error(f"Close order send failed: {mt5.last_error()}")
                return False

            if result.retcode != mt5.TRADE_RETCODE_DONE:
                logger.error(f"Close order failed: {result.retcode} - {result.comment}")
                return False

            logger.info(f"Position closed: Ticket {ticket} @ {price:.5f}")

            return True

        except Exception as e:
            logger.error(f"Error closing position: {e}")
            return False

    def modify_position(
        self,
        ticket: int,
        stop_loss: Optional[float] = None,
        take_profit: Optional[float] = None
    ) -> bool:
        """
        Modify stop loss and take profit of existing position
        Args:
            ticket: Position ticket number
            stop_loss: New stop loss price (None to keep current)
            take_profit: New take profit price (None to keep current)
        Returns:
            True if successful, False otherwise
        """
        if not self.connected:
            logger.warning("Not connected to MT5")
            return False

        try:
            # Get position info
            position = mt5.positions_get(ticket=ticket)
            if position is None or len(position) == 0:
                logger.error(f"Position {ticket} not found")
                return False

            position = position[0]

            # Use current values if not specified
            if stop_loss is None:
                stop_loss = position.sl
            if take_profit is None:
                take_profit = position.tp

            # Prepare modify request
            request = {
                "action": mt5.TRADE_ACTION_SLTP,
                "symbol": position.symbol,
                "position": ticket,
                "sl": stop_loss,
                "tp": take_profit,
                "magic": self.magic_number,
            }

            # Send modify order
            result = mt5.order_send(request)

            if result is None:
                logger.error(f"Modify order send failed: {mt5.last_error()}")
                return False

            if result.retcode != mt5.TRADE_RETCODE_DONE:
                logger.error(f"Modify order failed: {result.retcode} - {result.comment}")
                return False

            logger.info(f"Position modified: Ticket {ticket} | SL: {stop_loss:.5f} | TP: {take_profit:.5f}")

            return True

        except Exception as e:
            logger.error(f"Error modifying position: {e}")
            return False

    def get_open_positions(self, symbol: Optional[str] = None) -> List[Dict]:
        """
        Get all open positions
        Args:
            symbol: Filter by symbol (None for all)
        Returns:
            List of position dictionaries
        """
        if not self.connected:
            logger.warning("Not connected to MT5")
            return []

        try:
            if symbol:
                positions = mt5.positions_get(symbol=symbol)
            else:
                positions = mt5.positions_get()

            if positions is None:
                return []

            result = []
            for pos in positions:
                # Filter by magic number
                if pos.magic != self.magic_number:
                    continue

                result.append({
                    'ticket': pos.ticket,
                    'symbol': pos.symbol,
                    'direction': 'long' if pos.type == mt5.ORDER_TYPE_BUY else 'short',
                    'volume': pos.volume,
                    'entry_price': pos.price_open,
                    'current_price': pos.price_current,
                    'stop_loss': pos.sl,
                    'take_profit': pos.tp,
                    'profit': pos.profit,
                    'time': datetime.fromtimestamp(pos.time)
                })

            return result

        except Exception as e:
            logger.error(f"Error getting positions: {e}")
            return []

    def close_all_positions(self, symbol: Optional[str] = None) -> int:
        """
        Close all open positions
        Args:
            symbol: Filter by symbol (None for all)
        Returns:
            Number of positions closed
        """
        positions = self.get_open_positions(symbol)
        closed_count = 0

        for pos in positions:
            if self.close_position(pos['ticket']):
                closed_count += 1
                time.sleep(0.1)  # Small delay between closes

        logger.info(f"Closed {closed_count} positions")
        return closed_count
