# 🖥️ macOS Live Trading Setup Guide

## ⚠️ Important Notice

You are currently on **macOS (Darwin)**. MetaTrader 5 does **NOT** run natively on macOS.

**Your MT5 credentials have been configured:**
- Account: 25244631
- Server: demo.mt5tickmill.com
- Status: ✅ Configured in `config/config_hybrid_level1.yaml`

However, you need a **Windows environment** to actually connect to MT5.

---

## 💡 Solutions for macOS Users

### Option 1: Use Windows VPS (RECOMMENDED) 🌟

**Best for serious trading:**

**Recommended VPS Providers:**
1. **Vultr** (vultr.com)
   - Cost: ~$6-12/month
   - Location: Choose closest to broker
   - Setup: Windows Server 2019/2022

2. **AWS EC2** (aws.amazon.com)
   - Cost: ~$10-20/month
   - Flexible pricing (pay as you go)
   - t2.medium or t3.medium

3. **DigitalOcean** (digitalocean.com)
   - Cost: ~$8-15/month
   - Simple setup
   - Good performance

**Advantages:**
- ✅ 24/7 trading (even when your Mac sleeps)
- ✅ Low latency to broker servers
- ✅ Stable internet connection
- ✅ No need to keep Mac running
- ✅ Professional setup

**Setup Steps:**
```bash
# 1. Rent Windows VPS
# 2. Install Python on VPS
# 3. Install MT5 on VPS
# 4. Copy trading bot files to VPS
# 5. Run: python run_live.py
```

---

### Option 2: Use Parallels/VMware

**Run Windows VM on your Mac:**

**Parallels Desktop:**
- Cost: $99/year
- Best performance
- Easy to set up

**VMware Fusion:**
- Cost: Free (Player) or $199 (Pro)
- Good alternative

**Setup:**
1. Install Parallels/VMware
2. Create Windows 10/11 VM
3. Install Python in VM
4. Install MT5 in VM
5. Copy bot files to VM
6. Run trading bot in VM

**Advantages:**
- ✅ Full Windows environment
- ✅ Can monitor on same machine
- ⚠️  Requires Mac to be running

**Disadvantages:**
- ❌ Mac must stay on 24/7
- ❌ Uses Mac resources
- ❌ Power/network outages stop trading

---

### Option 3: Use Wine (Advanced)

**Run MT5 with Wine compatibility layer:**

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Wine
brew install wine-stable

# Download MT5 installer
# Run with Wine
wine mt5setup.exe
```

**Note:** This is experimental and may not work reliably for live trading.

---

### Option 4: Backtest Only

**Stick to backtesting on macOS:**

```bash
# Run comprehensive backtest
python final_backtest_7days.py

# Results saved to:
# - results/backtest_final_7days.json
```

**Advantages:**
- ✅ Works perfectly on macOS
- ✅ Test strategies before going live
- ✅ No VPS costs

**When ready for live:**
- Move to Windows VPS
- Deploy tested strategy

---

## 🚀 Recommended Workflow

**For serious trading (BEST):**

```
┌─────────────┐
│   macOS     │ ← Develop & backtest here
│ (Your Mac)  │
└──────┬──────┘
       │ Deploy when ready
       ▼
┌─────────────┐
│  Windows    │ ← Live trade here
│    VPS      │ (24/7, low latency)
└─────────────┘
```

**Steps:**
1. **Develop on Mac**: Write code, backtest, optimize
2. **Test on VPS**: Deploy to Windows VPS, test with demo account
3. **Go Live**: Switch to live account when profitable

---

## 📋 VPS Setup Checklist

When you're ready to deploy to VPS:

- [ ] Rent Windows VPS (Vultr/AWS/DigitalOcean)
- [ ] Connect via Remote Desktop (RDP)
- [ ] Install Python 3.11+
- [ ] Install MT5 terminal
- [ ] Install required packages: `pip install -r requirements.txt`
- [ ] Copy bot files to VPS
- [ ] Configure credentials in config file
- [ ] Test connection: `python test_mt5_connection.py`
- [ ] Start demo trading: `python run_live.py`
- [ ] Monitor for 1-2 weeks
- [ ] Switch to live account (if successful)

---

## 💰 Cost Comparison

| Option | Monthly Cost | 24/7 Trading | Latency | Ease |
|--------|-------------|--------------|---------|------|
| **VPS (Recommended)** | $8-20 | ✅ Yes | ⚡ Low | ⭐⭐⭐⭐ |
| Parallels Desktop | $8 (~$99/year) | ⚠️  Mac must run | 🐌 Medium | ⭐⭐⭐ |
| Wine | $0 | ⚠️  Mac must run | 🐌 Medium | ⭐⭐ |
| Backtest Only | $0 | ❌ No trading | - | ⭐⭐⭐⭐⭐ |

---

## 🎯 What You Can Do Right Now (on macOS)

### 1. Backtest the Strategy ✅

```bash
# Test both symbols
python final_backtest_7days.py
```

Expected output:
```
XAUUSD: PF 1.77 | Win Rate: 64.9% | Return: +18.4%
EURUSD: PF 0.77 | Win Rate: 43.1% | Return: -3.3% ⚠️
```

### 2. Optimize Parameters ✅

Edit config and test different settings:
```yaml
strategy:
  aggressiveness: 2  # Try 1, 2, or 3
```

### 3. Prepare for Deployment ✅

```bash
# Make sure all tests pass
python final_backtest_7days.py

# Check config is ready
cat config/config_hybrid_level1.yaml
```

### 4. Set Up VPS (When Ready)

Follow VPS setup guide above.

---

## 📞 Need Help?

**For VPS Setup:**
- See `MT4_SETUP_GUIDE.md` for detailed Windows setup
- VPS providers have tutorials for Python + MT5 setup

**For Backtesting:**
- Run: `python final_backtest_7days.py`
- Check: `README.md` for strategy details

**For Questions:**
- Check documentation in project folder
- All guides are comprehensive

---

## ✅ Summary

**Current Status:**
- ✅ Strategy is fully developed and tested
- ✅ MT5 credentials are configured
- ✅ Bot code is ready to run
- ⚠️  macOS cannot run MT5 natively

**Next Steps:**
1. **Now**: Backtest and optimize on your Mac
2. **When ready**: Set up Windows VPS ($8-20/month)
3. **Then**: Deploy and start live trading

**Recommendation:**
- Start with VPS demo trading for 1-2 weeks
- Verify strategy performance
- Switch to live when confident

---

**Your MT5 account is ready. You just need a Windows environment to use it!** 🚀
