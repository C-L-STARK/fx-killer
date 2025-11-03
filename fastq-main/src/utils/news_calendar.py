"""
Forex News Calendar Integration
Closes positions 1 minute before high-impact news (>=3 stars)
Uses ForexFactory calendar
"""

import pandas as pd
import requests
from datetime import datetime, timedelta
from typing import List, Dict
from loguru import logger
import xml.etree.ElementTree as ET


class NewsCalendar:
    """Fetch and manage forex news calendar"""

    def __init__(self, enable_for_backtest: bool = False):
        """
        Initialize news calendar

        Args:
            enable_for_backtest: If False, disables news calendar during backtesting
                                (since ForexFactory only provides current/future news)
        """
        self.calendar_url = "https://nfs.faireconomy.media/ff_calendar_thisweek.xml"
        self.news_events = []
        self.last_fetch = None
        self.enable_for_backtest = enable_for_backtest
        self.backtest_mode = not enable_for_backtest  # Assume backtest if disabled

    def fetch_calendar(self, timeout: int = 5) -> bool:
        """Fetch news calendar from ForexFactory"""
        try:
            logger.info("Fetching forex news calendar...")
            response = requests.get(self.calendar_url, timeout=timeout)

            if response.status_code == 200:
                root = ET.fromstring(response.content)
                events = []

                for event in root.findall('.//event'):
                    title = event.find('title').text if event.find('title') is not None else ""
                    country = event.find('country').text if event.find('country') is not None else ""
                    date_str = event.find('date').text if event.find('date') is not None else ""
                    time_str = event.find('time').text if event.find('time') is not None else ""
                    impact = event.find('impact').text if event.find('impact') is not None else ""

                    # Parse datetime
                    try:
                        event_datetime = datetime.strptime(f"{date_str} {time_str}", "%m-%d-%Y %I:%M%p")
                    except:
                        continue

                    # Only high impact events (3 stars = "High")
                    if impact == "High":
                        events.append({
                            'title': title,
                            'country': country,
                            'datetime': event_datetime,
                            'impact': impact
                        })

                self.news_events = events
                self.last_fetch = datetime.now()
                logger.info(f"Fetched {len(events)} high-impact news events")
                return True

        except Exception as e:
            logger.error(f"Failed to fetch news calendar: {e}")
            return False

        return False

    def should_close_position(self, current_time: datetime, symbol: str, minutes_before: int = 1) -> bool:
        """
        Check if we should close position due to upcoming news

        Args:
            current_time: Current timestamp
            symbol: Trading symbol (EURUSD, XAUUSD, etc.)
            minutes_before: Close N minutes before news (default: 1)

        Returns:
            True if should close, False otherwise
        """
        # Skip news calendar in backtest mode (historical data)
        if self.backtest_mode:
            return False

        # Refresh calendar if needed (once per week for live trading)
        if self.last_fetch is None or (datetime.now() - self.last_fetch).days >= 7:
            try:
                self.fetch_calendar(timeout=3)
            except:
                pass  # Skip news calendar if fetch fails

        if not self.news_events:
            return False

        # Map symbol to currency/countries to watch
        watch_currencies = self._get_watched_currencies(symbol)

        # Convert current_time to naive datetime if it has timezone
        if hasattr(current_time, 'tz') and current_time.tz is not None:
            current_time = current_time.replace(tzinfo=None)

        # Check upcoming news in next N minutes
        for event in self.news_events:
            time_until_event = (event['datetime'] - current_time).total_seconds() / 60

            # If news is in 0 to N minutes and affects our symbol
            if 0 <= time_until_event <= minutes_before:
                if event['country'] in watch_currencies:
                    logger.warning(
                        f"⚠️ High-impact news in {time_until_event:.1f}min: "
                        f"{event['country']} - {event['title']}"
                    )
                    return True

        return False

    def _get_watched_currencies(self, symbol: str) -> List[str]:
        """Get list of currencies/countries to watch for a symbol"""
        # Mapping of symbols to relevant countries
        currency_map = {
            'EURUSD': ['EUR', 'USD', 'Germany', 'United States'],
            'GBPUSD': ['GBP', 'USD', 'United Kingdom', 'United States'],
            'USDJPY': ['USD', 'JPY', 'United States', 'Japan'],
            'AUDUSD': ['AUD', 'USD', 'Australia', 'United States'],
            'USDCAD': ['USD', 'CAD', 'United States', 'Canada'],
            'XAUUSD': ['USD', 'United States'],  # Gold affected by USD news
            'XAGUSD': ['USD', 'United States'],  # Silver affected by USD news
        }

        return currency_map.get(symbol, ['USD', 'United States'])

    def get_upcoming_news(self, hours_ahead: int = 24) -> List[Dict]:
        """Get upcoming high-impact news in next N hours"""
        if not self.news_events:
            self.fetch_calendar()

        now = datetime.now()
        upcoming = []

        for event in self.news_events:
            hours_until = (event['datetime'] - now).total_seconds() / 3600

            if 0 <= hours_until <= hours_ahead:
                upcoming.append(event)

        return sorted(upcoming, key=lambda x: x['datetime'])

    def print_upcoming_news(self, hours_ahead: int = 24):
        """Print upcoming high-impact news"""
        upcoming = self.get_upcoming_news(hours_ahead)

        if not upcoming:
            print(f"\nNo high-impact news in next {hours_ahead} hours")
            return

        print(f"\n{'='*80}")
        print(f"HIGH-IMPACT NEWS (Next {hours_ahead} hours)")
        print(f"{'='*80}")

        for event in upcoming:
            hours_until = (event['datetime'] - datetime.now()).total_seconds() / 3600
            print(f"{event['datetime'].strftime('%Y-%m-%d %H:%M')} "
                  f"({hours_until:.1f}h) - {event['country']}: {event['title']}")

        print(f"{'='*80}\n")


# Example usage
if __name__ == "__main__":
    calendar = NewsCalendar()
    calendar.fetch_calendar()
    calendar.print_upcoming_news(24)

    # Test: Should we close EURUSD position now?
    now = datetime.now()
    if calendar.should_close_position(now, 'EURUSD', minutes_before=1):
        print("⚠️ Close EURUSD position - high-impact news incoming!")
    else:
        print("✅ No imminent news - safe to trade")
