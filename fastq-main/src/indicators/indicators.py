"""
Technical Indicators Module
Implements ZigZag, Keltner Channel, Bollinger Bands, and RSI
"""

import numpy as np
import pandas as pd
from typing import Tuple


class Indicators:
    """Technical indicators for trading strategy"""

    @staticmethod
    def zigzag(high: pd.Series, low: pd.Series, depth: int = 35) -> pd.Series:
        """
        ZigZag indicator to identify swing highs and lows
        Returns: 1 for uptrend, -1 for downtrend, 0 for no change
        """
        zigzag = pd.Series(0, index=high.index)
        last_pivot = None
        last_pivot_idx = 0
        last_pivot_type = None  # 'high' or 'low'
        trend = 0

        for i in range(depth, len(high)):
            # Check for swing high
            swing_high = high.iloc[i - depth:i + 1].max()
            swing_low = low.iloc[i - depth:i + 1].min()

            current_high = high.iloc[i]
            current_low = low.iloc[i]

            # Identify pivot points
            if current_high == swing_high:
                if last_pivot_type == 'low' or last_pivot is None:
                    if last_pivot is None or current_high > last_pivot:
                        last_pivot = current_high
                        last_pivot_idx = i
                        last_pivot_type = 'high'
                        trend = -1  # When pivot high is formed, trend is down (short)

            elif current_low == swing_low:
                if last_pivot_type == 'high' or last_pivot is None:
                    if last_pivot is None or current_low < last_pivot:
                        last_pivot = current_low
                        last_pivot_idx = i
                        last_pivot_type = 'low'
                        trend = 1  # When pivot low is formed, trend is up (long)

            zigzag.iloc[i] = trend

        return zigzag

    @staticmethod
    def keltner_channel(
        data: pd.DataFrame,
        ma_period: int = 20,
        atr_period: int = 10,
        atr_multiple: float = 0.5,
        ma_method: int = 1,
        ma_price: int = 4
    ) -> Tuple[pd.Series, pd.Series, pd.Series]:
        """
        Keltner Channel indicator
        ma_method: 1=EMA, 0=SMA
        ma_price: 4=Close, 0=Open, 1=High, 2=Low, 3=Median
        Returns: (middle, upper, lower)
        """
        # Select price
        price_map = {0: 'open', 1: 'high', 2: 'low', 3: 'close', 4: 'close'}
        if ma_price == 3:  # Median
            price = (data['high'] + data['low']) / 2
        else:
            price = data[price_map.get(ma_price, 'close')]

        # Calculate MA
        if ma_method == 1:  # EMA
            middle = price.ewm(span=ma_period, adjust=False).mean()
        else:  # SMA
            middle = price.rolling(window=ma_period).mean()

        # Calculate ATR
        atr = Indicators.atr(data, period=atr_period)

        # Calculate bands
        upper = middle + (atr * atr_multiple)
        lower = middle - (atr * atr_multiple)

        return middle, upper, lower

    @staticmethod
    def bollinger_bands(
        close: pd.Series,
        length: int = 34,
        deviation: float = 1.0
    ) -> Tuple[pd.Series, pd.Series, pd.Series]:
        """
        Bollinger Bands indicator
        Returns: (middle, upper, lower)
        """
        middle = close.rolling(window=length).mean()
        std = close.rolling(window=length).std()

        upper = middle + (std * deviation)
        lower = middle - (std * deviation)

        return middle, upper, lower

    @staticmethod
    def rsi(close: pd.Series, period: int = 14) -> pd.Series:
        """
        Relative Strength Index
        Returns: RSI values (0-100)
        """
        delta = close.diff()

        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()

        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))

        return rsi

    @staticmethod
    def rsi_crossover(rsi: pd.Series) -> pd.Series:
        """
        Detect RSI crossover from down to up
        Returns: 1 for bullish crossover, -1 for bearish, 0 for no crossover
        """
        rsi_diff = rsi.diff()
        crossover = pd.Series(0, index=rsi.index)

        # Bullish: RSI was going down and now going up
        crossover[rsi_diff > 0] = 1
        # Bearish: RSI was going up and now going down
        crossover[rsi_diff < 0] = -1

        return crossover

    @staticmethod
    def atr(data: pd.DataFrame, period: int = 14) -> pd.Series:
        """
        Average True Range
        """
        high = data['high']
        low = data['low']
        close = data['close']

        tr1 = high - low
        tr2 = abs(high - close.shift())
        tr3 = abs(low - close.shift())

        tr = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)
        atr = tr.rolling(window=period).mean()

        return atr

    @staticmethod
    def macd(
        close: pd.Series,
        fast_period: int = 12,
        slow_period: int = 26,
        signal_period: int = 9
    ) -> Tuple[pd.Series, pd.Series, pd.Series]:
        """
        MACD (Moving Average Convergence Divergence)
        Returns: (macd_line, signal_line, histogram)
        """
        # Calculate EMAs
        ema_fast = close.ewm(span=fast_period, adjust=False).mean()
        ema_slow = close.ewm(span=slow_period, adjust=False).mean()

        # MACD line
        macd_line = ema_fast - ema_slow

        # Signal line
        signal_line = macd_line.ewm(span=signal_period, adjust=False).mean()

        # Histogram
        histogram = macd_line - signal_line

        return macd_line, signal_line, histogram

    @staticmethod
    def macd_crossover(macd_line: pd.Series, signal_line: pd.Series) -> pd.Series:
        """
        Detect MACD crossover
        Returns: 1 for bullish crossover, -1 for bearish, 0 for no crossover
        """
        crossover = pd.Series(0, index=macd_line.index)

        # Bullish: MACD crosses above signal
        bullish = (macd_line > signal_line) & (macd_line.shift(1) <= signal_line.shift(1))
        crossover[bullish] = 1

        # Bearish: MACD crosses below signal
        bearish = (macd_line < signal_line) & (macd_line.shift(1) >= signal_line.shift(1))
        crossover[bearish] = -1

        return crossover

    @staticmethod
    def supertrend(
        data: pd.DataFrame,
        period: int = 10,
        multiplier: float = 3.0
    ) -> Tuple[pd.Series, pd.Series]:
        """
        SuperTrend indicator
        Returns: (supertrend_line, trend_direction)
        trend_direction: 1 for uptrend, -1 for downtrend
        """
        # Calculate ATR
        atr = Indicators.atr(data, period=period)

        high = data['high']
        low = data['low']
        close = data['close']

        # Calculate basic bands
        hl_avg = (high + low) / 2
        upper_band = hl_avg + (multiplier * atr)
        lower_band = hl_avg - (multiplier * atr)

        # Initialize
        supertrend = pd.Series(0.0, index=data.index)
        direction = pd.Series(1, index=data.index)

        for i in range(1, len(data)):
            # Adjust bands
            if close.iloc[i-1] <= upper_band.iloc[i-1]:
                upper_band.iloc[i] = min(upper_band.iloc[i], upper_band.iloc[i-1])

            if close.iloc[i-1] >= lower_band.iloc[i-1]:
                lower_band.iloc[i] = max(lower_band.iloc[i], lower_band.iloc[i-1])

            # Determine trend
            if close.iloc[i] <= upper_band.iloc[i]:
                direction.iloc[i] = -1  # Downtrend
                supertrend.iloc[i] = upper_band.iloc[i]
            else:
                direction.iloc[i] = 1   # Uptrend
                supertrend.iloc[i] = lower_band.iloc[i]

            # Check for trend change
            if direction.iloc[i] == 1 and direction.iloc[i-1] == -1:
                supertrend.iloc[i] = lower_band.iloc[i]
            elif direction.iloc[i] == -1 and direction.iloc[i-1] == 1:
                supertrend.iloc[i] = upper_band.iloc[i]

        return supertrend, direction

    @staticmethod
    def cci(
        data: pd.DataFrame,
        period: int = 20
    ) -> pd.Series:
        """
        Commodity Channel Index (CCI)
        Returns: CCI values (typically -100 to +100, but can exceed)
        """
        high = data['high']
        low = data['low']
        close = data['close']

        # Typical Price
        tp = (high + low + close) / 3

        # Simple Moving Average of TP
        sma_tp = tp.rolling(window=period).mean()

        # Mean Deviation
        mad = tp.rolling(window=period).apply(lambda x: np.abs(x - x.mean()).mean())

        # CCI calculation
        cci = (tp - sma_tp) / (0.015 * mad)

        return cci

    @staticmethod
    def calculate_all_indicators(
        data: pd.DataFrame,
        zigzag_depth: int = 35,
        keltner_params: dict = None,
        bollinger_params: dict = None,
        rsi_period: int = 14,
        macd_params: dict = None,
        supertrend_params: dict = None,
        cci_period: int = 20
    ) -> pd.DataFrame:
        """
        Calculate all indicators and add them to the dataframe
        """
        df = data.copy()

        # Default parameters
        if keltner_params is None:
            keltner_params = {
                'ma_period': 20,
                'atr_period': 10,
                'atr_multiple': 0.5,
                'ma_method': 1,
                'ma_price': 4
            }

        if bollinger_params is None:
            bollinger_params = {
                'length': 34,
                'deviation': 1.0
            }

        if macd_params is None:
            macd_params = {
                'fast_period': 12,
                'slow_period': 26,
                'signal_period': 9
            }

        if supertrend_params is None:
            supertrend_params = {
                'period': 10,
                'multiplier': 3.0
            }

        # ZigZag
        df['zigzag'] = Indicators.zigzag(df['high'], df['low'], depth=zigzag_depth)

        # Keltner Channel
        kc_mid, kc_upper, kc_lower = Indicators.keltner_channel(df, **keltner_params)
        df['kc_mid'] = kc_mid
        df['kc_upper'] = kc_upper
        df['kc_lower'] = kc_lower

        # Bollinger Bands
        bb_params_filtered = {k: v for k, v in bollinger_params.items() if k in ['length', 'deviation']}
        bb_mid, bb_upper, bb_lower = Indicators.bollinger_bands(df['close'], **bb_params_filtered)
        df['bb_mid'] = bb_mid
        df['bb_upper'] = bb_upper
        df['bb_lower'] = bb_lower

        # RSI
        df['rsi'] = Indicators.rsi(df['close'], period=rsi_period)
        df['rsi_crossover'] = Indicators.rsi_crossover(df['rsi'])

        # MACD
        macd_line, signal_line, histogram = Indicators.macd(df['close'], **macd_params)
        df['macd'] = macd_line
        df['macd_signal'] = signal_line
        df['macd_histogram'] = histogram
        df['macd_crossover'] = Indicators.macd_crossover(macd_line, signal_line)

        # SuperTrend
        supertrend_line, supertrend_direction = Indicators.supertrend(df, **supertrend_params)
        df['supertrend'] = supertrend_line
        df['supertrend_direction'] = supertrend_direction

        # CCI
        df['cci'] = Indicators.cci(df, period=cci_period)

        # ATR (for volatility filtering)
        df['atr'] = Indicators.atr(df, period=14)

        return df
