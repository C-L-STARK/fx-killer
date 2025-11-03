"""
MT5 Connection Test (Cross-Platform)
Tests if MT5 can be connected, with platform-specific guidance
"""

import sys
import platform
from pathlib import Path

def check_platform():
    """Check if platform supports MT5"""
    os_name = platform.system()

    print("\n" + "="*80)
    print("🔌 MT5 Platform Check")
    print("="*80 + "\n")

    print(f"Operating System: {os_name}")
    print(f"Python Version: {sys.version.split()[0]}")
    print()

    if os_name == "Windows":
        print("✅ Windows detected - MT5 is supported")
        return True
    elif os_name == "Darwin":  # macOS
        print("⚠️  macOS detected - MT5 is NOT natively supported")
        print()
        print("Options for macOS users:")
        print("  1. Use Windows VM (Parallels, VMware)")
        print("  2. Use Wine/PlayOnMac to run MT5")
        print("  3. Use remote Windows VPS for trading")
        print("  4. Backtest only (no live trading)")
        print()
        print("Recommended: Use a Windows VPS for live trading")
        print("  - Low latency")
        print("  - 24/7 operation")
        print("  - Professional trading environment")
        return False
    elif os_name == "Linux":
        print("⚠️  Linux detected - MT5 requires Wine")
        print()
        print("To install MT5 on Linux:")
        print("  1. Install Wine: sudo apt-get install wine")
        print("  2. Download MT5 from broker")
        print("  3. Run with Wine")
        print()
        print("Or use Windows VPS for easier setup")
        return False
    else:
        print(f"❌ Unsupported platform: {os_name}")
        return False


def test_mt5_import():
    """Try to import MT5"""
    print("\n" + "="*80)
    print("📦 Testing MT5 Import")
    print("="*80 + "\n")

    try:
        import MetaTrader5 as mt5
        print("✅ MetaTrader5 library is installed")

        # Try to initialize
        if mt5.initialize():
            print("✅ MT5 terminal connection successful")

            # Get version
            terminal_info = mt5.terminal_info()
            if terminal_info:
                print(f"   MT5 Build: {terminal_info.build}")
                print(f"   Company: {terminal_info.company}")

            mt5.shutdown()
            return True
        else:
            print("❌ MT5 terminal not running or not found")
            print()
            print("Please:")
            print("  1. Start MT5 terminal")
            print("  2. Login to your account")
            print("  3. Try again")
            return False

    except ImportError:
        print("❌ MetaTrader5 library not installed")
        print()
        print("To install (Windows only):")
        print("  pip install MetaTrader5")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False


def main():
    """Main test function"""

    # Check platform
    platform_ok = check_platform()

    if not platform_ok:
        print("\n" + "="*80)
        print("⚠️  CANNOT TEST MT5 ON THIS PLATFORM")
        print("="*80)
        print()
        print("For live trading, you need:")
        print("  - Windows computer or VPS")
        print("  - MT5 terminal installed")
        print("  - MetaTrader5 Python library")
        print()
        print("Current platform does not support MT5.")
        print("You can still run backtests!")
        print()
        print("To backtest:")
        print("  python final_backtest_7days.py")
        print()
        return

    # Try to import and test
    test_mt5_import()

    print("\n" + "="*80)
    print("Test completed")
    print("="*80 + "\n")


if __name__ == "__main__":
    main()
