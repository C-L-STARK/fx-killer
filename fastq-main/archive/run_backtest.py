"""
Backtesting Script
Run historical backtests on trading strategy
"""

import yaml
import sys
from pathlib import Path
from datetime import datetime, timedelta
from loguru import logger

# Add src to path
sys.path.insert(0, str(Path(__file__).parent))

from src.data.data_fetcher import DataFetcher
from src.indicators.indicators import Indicators
from src.backtesting.backtester import Backtester


def load_config(config_path: str = "config/config.yaml") -> dict:
    """Load configuration from YAML file"""
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    return config


def main():
    """Main backtesting function"""

    # Setup logging
    logger.add(
        "logs/backtest_{time}.log",
        rotation="1 day",
        retention="30 days",
        level="INFO"
    )

    logger.info("=" * 60)
    logger.info("STARTING BACKTEST")
    logger.info("=" * 60)

    # Load configuration
    config = load_config()

    # Initialize data fetcher
    data_source = config['data']['source']
    fetcher = DataFetcher(source=data_source)

    # Fetch historical data for all symbols
    symbols = config['trading']['symbols']
    timeframe = config['trading']['timeframe']

    # Set date range for backtest
    end_date = datetime.now()

    # For 1m data, limit to recent days due to data availability
    if timeframe == '1m':
        start_date = end_date - timedelta(days=5)
    else:
        start_date = end_date - timedelta(days=365)

    logger.info(f"Fetching data from {start_date} to {end_date}")

    data_dict = {}
    for symbol in symbols:
        logger.info(f"Fetching {symbol} data...")
        df = fetcher.get_historical_data(
            symbol=symbol,
            timeframe=timeframe,
            start_date=start_date,
            end_date=end_date
        )

        if df.empty:
            logger.warning(f"No data for {symbol}, skipping...")
            continue

        # Calculate indicators
        logger.info(f"Calculating indicators for {symbol}...")
        df = Indicators.calculate_all_indicators(
            df,
            zigzag_depth=config['strategy']['zigzag']['depth'],
            keltner_params=config['strategy']['keltner'],
            bollinger_params=config['strategy']['bollinger'],
            rsi_period=config['strategy']['rsi']['period']
        )

        # Drop NaN values
        df = df.dropna()

        data_dict[symbol] = df
        logger.info(f"{symbol}: {len(df)} bars loaded")

    fetcher.close()

    if not data_dict:
        logger.error("No data available for backtesting")
        return

    # Run backtest
    logger.info("\nRunning backtest...")
    backtester = Backtester(config)
    results = backtester.run(data_dict)

    # Print results
    backtester.print_results(results)

    # Save plot
    plot_path = f"results/backtest_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
    backtester.plot_results(results, save_path=plot_path)

    # Save detailed results
    results_path = f"results/results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    if 'equity_curve' in results and not results['equity_curve'].empty:
        results['equity_curve'].to_csv(results_path)
        logger.info(f"Detailed results saved to {results_path}")

    logger.info("=" * 60)
    logger.info("BACKTEST COMPLETED")
    logger.info("=" * 60)


if __name__ == "__main__":
    main()
