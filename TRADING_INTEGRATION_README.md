# MT4/MT5 Trading Data Integration - Quick Start

## 📚 Complete Implementation

已完成的功能模块：

### ✅ 后端 (Backend)
- ✅ Supabase数据库表结构 (`supabase-trading-schema.sql`)
- ✅ API路由 - 完整的CRUD操作
  - `/api/trading-orders` - 创建、查询、更新订单
  - `/api/trading-orders/[id]` - 单订单操作
- ✅ 数据库辅助函数 (`src/lib/supabase-trading.ts`)

### ✅ MT4/MT5 Expert Advisors
- ✅ `mt4-ea/FXKiller_DataSync.mq4` - MT4版本
- ✅ `mt4-ea/FXKiller_DataSync.mq5` - MT5版本
- ✅ 详细设置指南 (`mt4-ea/SETUP_GUIDE.md`)

### ✅ 前端 (Frontend)
- ✅ 实盘页面订单展示组件
- ✅ Dashboard管理面板
  - 完整的CRUD操作
  - 数据筛选和搜索
  - 实时统计数据

## 🚀 快速开始

### 步骤 1: 配置Supabase数据库

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 打开SQL Editor
3. 复制粘贴 `supabase-trading-schema.sql` 的全部内容
4. 点击"Run"执行
5. 验证表格创建成功

### 步骤 2: 配置环境变量

创建/编辑 `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://wlksiulicosdnerzhkdl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

获取方式：Supabase Dashboard → Settings → API

### 步骤 3: 安装和配置EA

1. 参考 `mt4-ea/SETUP_GUIDE.md` 详细指南
2. 将 `FXKiller_DataSync.mq4` (或.mq5) 导入MetaEditor
3. 编译EA
4. 在EA参数中配置Supabase URL和Service Role Key
5. 将EA附加到任意图表

### 步骤 4: 测试

1. 在MT4/MT5中开启一个demo订单
2. 检查Terminal → Experts日志，确认成功推送
3. 访问网站查看数据：
   - 实盘页面: `http://localhost:3000/live-trading`
   - Dashboard: `http://localhost:3000/dashboard/trading-orders`

## 📁 文件结构

```
fx-killer/
├── supabase-trading-schema.sql         # 数据库表结构
├── mt4-ea/
│   ├── FXKiller_DataSync.mq4           # MT4 EA
│   ├── FXKiller_DataSync.mq5           # MT5 EA
│   └── SETUP_GUIDE.md                  # EA设置指南
├── src/
│   ├── app/api/trading-orders/         # API路由
│   ├── app/[locale]/(portal)/
│   │   ├── live-trading/              # 实盘页面
│   │   └── dashboard/trading-orders/   # Dashboard管理
│   ├── components/trading/
│   │   └── LiveOrdersDisplay.tsx       # 订单展示组件
│   └── lib/supabase-trading.ts         # 数据库辅助函数
└── ENV_SETUP.md                        # 环境变量配置
```

## 🔧 主要功能

### EA功能
- ✅ 自动追踪所有订单（或指定magic number）
- ✅ 开仓时自动创建记录
- ✅ 平仓时自动更新记录
- ✅ 支持MT4和MT5
- ✅ 可配置Supabase URL和API Key
- ✅ 详细的日志记录

### 前端展示
- ✅ 实时订单显示（30秒自动刷新）
- ✅ 按状态、品种筛选
- ✅ 关键统计数据（胜率、盈亏等）
- ✅ 移动端响应式设计

### Dashboard管理
- ✅ 完整CRUD操作
- ✅ 高级筛选（状态、平台、品种）
- ✅ 订单号搜索
- ✅ 编辑订单数据
- ✅ 删除订单

## 📊 数据库字段

| 字段 | 类型 | 说明 |
|------|------|------|
| platform | TEXT | MT4/MT5 |
| account_number | TEXT | 交易账户 |
| ticket_id | BIGINT | 订单号(唯一) |
| symbol | TEXT | 交易品种 |
| order_type | TEXT | 订单类型 |
| lots | DECIMAL | 手数 |
| open_price | DECIMAL | 开仓价 |
| close_price | DECIMAL | 平仓价 |
| stop_loss | DECIMAL | 止损 |
| take_profit | DECIMAL | 止盈 |
| profit | DECIMAL | 盈亏 |
| status | TEXT | OPEN/CLOSED |

## 🔐 安全提示

1. ⚠️ 永远不要泄露Service Role Key
2. ⚠️ 确保`.env.local`在`.gitignore`中
3. ⚠️ EA参数中的API Key不要截图分享
4. ✅ 使用RLS策略保护数据
5. ✅ 定期更换API密钥

## ❓ 故障排除

### EA无法连接
- 检查Supabase URL是否在MT4/MT5允许列表中
- 验证Service Role Key是否正确
- 查看Experts日志获取错误信息

### 订单未显示
- 确认环境变量配置正确
- 重启开发服务器
- 检查浏览器控制台错误

### API错误
- 验证Supabase表格存在
- 检查RLS策略配置
- 确认API密钥权限

## 📞 支持

遇到问题？
1. 查看 `mt4-ea/SETUP_GUIDE.md` 详细指南
2. 检查EA日志和浏览器控制台
3. 验证所有配置步骤

---

**版本**: 1.0  
**最后更新**: 2024-11-21
