# ⚠️ SECURITY WARNING

**Your MT5 credentials are now stored in:**
`config/config_hybrid_level1.yaml`

## 🔒 Important Security Notes

1. **DO NOT commit this file to Git with credentials**
   - The `.gitignore` has been updated to exclude credential files
   - But be careful when committing changes

2. **This is a DEMO account**
   - Current credentials: Tickmill Demo Account #25244631
   - Demo accounts are safe to use for testing
   - No real money at risk

3. **For Live Trading:**
   - **NEVER** hardcode live account credentials in config files
   - Use environment variables instead:
     ```bash
     export MT5_ACCOUNT="your_account"
     export MT5_PASSWORD="your_password"
     export MT5_SERVER="your_server"
     ```
   - Or create a separate `config_credentials.yaml` (already in .gitignore)

## 🧪 Testing the Connection

Before starting live trading, test your MT5 connection:

```bash
# 1. Make sure MT5 terminal is running
# 2. Run the connection test
python test_mt5_connection.py
```

**Expected output:**
```
✅ Connection successful!
📊 Account Information:
  Login: 25244631
  Balance: $10,000.00
  ...
```

## 🚀 Starting Live Trading

Once connection test passes:

```bash
python run_live.py --config config/config_hybrid_level1.yaml
```

**What you'll see:**

```
====================================================================================================
                                    📊 LIVE TRADING STATUS
====================================================================================================
Time: 2025-10-02 14:30:45 | Tick: 1
----------------------------------------------------------------------------------------------------
💰 Account: Balance=$10,000.00 | Equity=$10,000.00 | 🟢 P&L=$0.00 | Margin Level=0.0%
📅 Today: 🟢 $0.00 | Max Loss: $1,000 | Remaining: $1,000.00
✅ Risk Status: TRADING ENABLED
----------------------------------------------------------------------------------------------------
📭 No open positions
----------------------------------------------------------------------------------------------------
📊 Statistics: No trades yet
====================================================================================================
⏱️  Next update in 60 seconds... (Press Ctrl+C to stop)
====================================================================================================
```

When a position opens, you'll see:

```
📈 OPEN POSITIONS (1):
Symbol     Dir    Size     Entry        Current      P&L          SL           TP
----------------------------------------------------------------------------------------------------
XAUUSD     🔼LONG  0.30     2650.50000   2651.20000   🟢$+21.00    2649.00000   2653.50000
```

## 📊 Real-time Display Features

The CLI will show every minute:

1. **Account Status**
   - Balance, Equity, Current P&L
   - Margin Level

2. **Daily Risk Tracking**
   - Today's P&L
   - Remaining loss allowance
   - Risk status (enabled/disabled)

3. **Open Positions**
   - Symbol, Direction, Size
   - Entry and Current Price
   - Real-time P&L
   - Stop Loss and Take Profit levels

4. **Trading Statistics**
   - Total trades
   - Win/Loss count
   - Win rate percentage
   - Profit Factor
   - Total P&L

## ⚠️ Risk Reminders

**Daily Max Loss Protection:**
- If today's loss reaches -$1,000, you'll see:
  ```
  🛑 Risk Status: TRADING DISABLED (Risk limit reached)
  ```
- Trading auto-resumes next day

**Max Drawdown Protection:**
- If drawdown reaches 25% from peak, trading stops completely
- Requires manual intervention to resume

## 🛑 Stopping Live Trading

Press `Ctrl+C` to stop:

```
====================================================================================================
⚠️  STOPPING LIVE TRADING...
====================================================================================================
```

All open positions remain open (not auto-closed).
Check MT5 terminal to manage them manually.

---

**Questions?** Check:
- `MT4_SETUP_GUIDE.md` for detailed setup
- `README.md` for strategy documentation
- `README_CN.md` for Chinese documentation
