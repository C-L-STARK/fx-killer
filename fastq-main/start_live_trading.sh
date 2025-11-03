#!/bin/bash

# Live Trading Quick Start Script
# Quickly start live trading with XAUUSD on MT5 demo account

echo "======================================================================================================"
echo "🚀 FOREX TRADING BOT - LIVE TRADING QUICK START"
echo "======================================================================================================"
echo ""

# Check if MT5 library is installed
echo "📦 Checking dependencies..."
python -c "import MetaTrader5" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "❌ MetaTrader5 library not installed"
    echo "📦 Installing MetaTrader5..."
    pip install MetaTrader5
    echo ""
fi

# Test MT5 connection
echo "🔌 Testing MT5 connection..."
python test_mt5_connection.py

if [ $? -eq 0 ]; then
    echo ""
    echo "======================================================================================================"
    echo "✅ Connection test passed!"
    echo "======================================================================================================"
    echo ""
    read -p "Start live trading now? (y/n): " -n 1 -r
    echo ""

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo "======================================================================================================"
        echo "🚀 STARTING LIVE TRADING..."
        echo "======================================================================================================"
        echo ""
        echo "⚠️  REMINDER:"
        echo "   - This is a DEMO account (no real money)"
        echo "   - Trading will stop if daily loss reaches \$1,000"
        echo "   - Trading will stop if drawdown reaches 25%"
        echo "   - Press Ctrl+C to stop anytime"
        echo ""
        echo "======================================================================================================"
        echo ""

        python run_live.py --config config/config_hybrid_level1.yaml
    else
        echo "👋 Canceled. Run 'python run_live.py --config config/config_hybrid_level1.yaml' to start manually."
    fi
else
    echo ""
    echo "======================================================================================================"
    echo "❌ Connection test failed!"
    echo "======================================================================================================"
    echo ""
    echo "Please check:"
    echo "  1. MT5 terminal is running"
    echo "  2. Account credentials are correct in config/config_hybrid_level1.yaml"
    echo "  3. You're connected to the internet"
    echo ""
    echo "See LIVE_TRADING_SETUP.md for detailed troubleshooting."
fi
