# MT4/MT5 实盘交易设置指南
# MT4/MT5 Live Trading Setup Guide

## 📋 前置要求 Prerequisites

1. **安装MetaTrader 5** Install MetaTrader 5
   - 下载MT5终端 Download MT5 terminal from your broker
   - 或使用MetaQuotes Demo账户 Or use MetaQuotes Demo account

2. **安装Python MT5库** Install Python MT5 Library
   ```bash
   pip install MetaTrader5
   ```

3. **开通账户** Open Account
   - 模拟账户 (推荐先测试) Demo Account (recommended for testing)
   - 或实盘账户 Or Live Account

---

## ⚙️ 配置步骤 Configuration Steps

### 1. 更新配置文件 Update Config File

编辑 `config/config_hybrid_level1.yaml`:

```yaml
mt4:
  enabled: true              # 启用实盘交易 Enable live trading
  account: 12345678          # 你的账号 Your account number
  password: "YourPassword"   # 你的密码 Your password
  server: "MetaQuotes-Demo"  # 经纪商服务器 Broker server
  magic_number: 12345        # 魔术号 (用于识别策略) Magic number
```

**⚠️ 重要提示 Important Notes:**
- 先使用模拟账户测试! Test with demo account first!
- 确保密码安全,不要上传到Git! Keep password secure, don't upload to Git!
- 建议创建只读权限的投资者密码 Use investor password if available

### 2. 启动MT5终端 Start MT5 Terminal

- Windows: 启动MT5应用 Launch MT5 application
- Mac: 使用Wine或虚拟机运行MT5 Use Wine or VM to run MT5
- Linux: 使用Wine运行 Run with Wine

**确保MT5保持开启状态!** Keep MT5 running!

### 3. 运行实盘交易 Run Live Trading

```bash
python run_live.py --config config/config_hybrid_level1.yaml
```

---

## 🛡️ 风险管理 Risk Management

### 初始测试 Initial Testing (1-2周 weeks)

1. **使用模拟账户** Use Demo Account
   - 测试所有功能 Test all features
   - 观察延迟和滑点 Monitor latency and slippage
   - 确保新闻日历正常工作 Verify news calendar works

2. **小仓位测试** Small Position Sizes
   ```yaml
   position_sizes:
     XAUUSD: 0.01  # 最小手数 Minimum lot size
   ```

3. **监控7-14天** Monitor for 7-14 Days
   - 记录所有交易 Record all trades
   - 对比回测结果 Compare with backtest results
   - 检查异常行为 Check for anomalies

### 实盘部署 Live Deployment

仅在满足以下条件后才使用实盘账户:
Only use live account after:

✅ 模拟账户测试通过 (1-2周) Demo testing passed (1-2 weeks)
✅ 盈利因子 > 1.5 Profit factor > 1.5
✅ 胜率 > 60% Win rate > 60%
✅ 没有明显异常 No significant anomalies
✅ 理解所有风险 Understand all risks

**推荐起始资金 Recommended Starting Capital:**
- 最少 $1,000 (XAUUSD 0.01手) Minimum $1,000 (0.01 lots)
- 推荐 $10,000 (XAUUSD 0.3手,配置默认值) Recommended $10,000 (0.3 lots, default config)

---

## 🔧 故障排除 Troubleshooting

### 问题1: 无法连接MT5
**Problem 1: Cannot connect to MT5**

**症状 Symptoms:**
```
MT5 initialization failed
MT5 login failed
```

**解决方案 Solutions:**
1. 确保MT5终端正在运行 Ensure MT5 terminal is running
2. 检查账号/密码/服务器是否正确 Check account/password/server
3. 在MT5中手动登录一次 Manually login in MT5 first
4. 检查防火墙设置 Check firewall settings

### 问题2: 交易失败
**Problem 2: Trade execution failed**

**症状 Symptoms:**
```
Order send failed
Order failed: 10006 - Request rejected
```

**解决方案 Solutions:**
1. 检查市场是否开放 Check if market is open
2. 确认手数符合券商要求 Verify lot size meets broker requirements
3. 检查账户余额是否足够 Check if account balance is sufficient
4. 检查杠杆设置 Check leverage settings

### 问题3: 新闻日历超时
**Problem 3: News calendar timeout**

**症状 Symptoms:**
```
Failed to fetch news calendar: timeout
```

**解决方案 Solutions:**
- 这不影响交易,仅跳过新闻过滤 This doesn't affect trading, just skips news filter
- 检查网络连接 Check internet connection
- 稍后会自动重试 Will auto-retry later

---

## 📊 监控指标 Monitoring Metrics

实盘运行时需要监控 Monitor during live trading:

### 每日检查 Daily Check
- 账户余额 Account balance
- 当日盈亏 Daily PnL
- 开仓数量 Open positions
- 成交滑点 Execution slippage

### 每周检查 Weekly Check
- 周收益率 Weekly return
- 胜率 Win rate
- 盈利因子 Profit factor
- 最大回撤 Max drawdown

**警告条件 Warning Conditions:**
- 单日亏损 > $500 Daily loss > $500
- 回撤 > 20% Drawdown > 20%
- 盈利因子 < 1.2 Profit factor < 1.2
- 连续亏损 > 5笔 Consecutive losses > 5

**⚠️ 遇到警告立即停止交易,分析原因!**
**Stop trading immediately when warnings occur, analyze the cause!**

---

## 🔐 安全建议 Security Recommendations

1. **不要在配置文件中硬编码密码** Don't hardcode password in config
   - 使用环境变量 Use environment variables
   - 或在运行时输入 Or input at runtime

2. **使用VPS运行** Use VPS for Running
   - 保证24/7运行 Ensure 24/7 operation
   - 低延迟连接 Low latency connection
   - 防止本地断电/断网 Prevent local power/network outage

3. **备份日志** Backup Logs
   - 所有交易日志保留30天 Keep trading logs for 30 days
   - 定期审查异常 Review anomalies regularly

4. **设置止损限制** Set Stop Loss Limits
   ```yaml
   risk:
     max_daily_loss: 500    # 单日最大亏损 $500
     max_drawdown: 0.20     # 最大回撤 20%
   ```

---

## 📞 支持 Support

**遇到问题?** Having issues?

1. 查看日志文件 Check log files: `logs/live_*.log`
2. 阅读策略文档 Read strategy docs: `README_CN.md`
3. 检查MT5终端日志 Check MT5 terminal logs
4. 确保所有依赖已安装 Ensure all dependencies installed

---

## ⚠️ 免责声明 Disclaimer

**本策略仅供学习研究使用。实盘交易存在风险,可能导致资金损失。**

**This strategy is for educational purposes only. Live trading involves risk and may result in financial loss.**

- 过去表现不代表未来收益 Past performance doesn't guarantee future results
- 请谨慎使用,自行承担风险 Use cautiously, at your own risk
- 建议仅用闲置资金测试 Only use funds you can afford to lose

---

**祝交易成功! Good luck with your trading! 🚀**
