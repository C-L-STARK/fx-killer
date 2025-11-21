# FXKiller Trading Data Sync - Setup Guide

## 📋 Overview

This guide will help you set up the MT4/MT5 Expert Advisor to automatically sync your trading data to Supabase.

## 🗄️ Step 1: Set Up Supabase Database

### 1.1 Create the Table

1. Log in to your **Supabase Dashboard**
2. Navigate to **SQL Editor**
3. Copy the entire content from `supabase-trading-schema.sql`
4. Paste and execute it in the SQL Editor
5. Verify the table was created successfully

### 1.2 Get Your API Keys

1. In Supabase Dashboard, go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://wlksiulicosdnerzhkdl.supabase.co`
   - **Service Role Key** (secret): Keep this secure!

> ⚠️ **Important**: Use the **service_role** key, NOT the anon key, as the EA needs full access to create/update orders.

## 🤖 Step 2: Install the Expert Advisor

### For MT4:

1. Open **MetaEditor** in MT4
2. In Navigator, right-click **Experts** → **New** → **Expert Advisor (template)**
3. Name it `FXKiller_DataSync`
4. Replace all code with content from `mt4-ea/FXKiller_DataSync.mq4`
5. Click **Compile** (F7)
6. Fix any errors if they appear
7. Close MetaEditor

### For MT5:

1. Open **MetaEditor** in MT5
2. Same steps as MT4, but use `mt4-ea/FXKiller_DataSync.mq5` file
3. Compile and verify no errors

## ⚙️ Step 3: Configure the EA

### 3.1 Add Supabase URL to Allowed List

**This is critical! The EA won't work without this step.**

1. In MT4/MT5, go to **Tools** → **Options**
2. Click the **Expert Advisors** tab
3. Check ☑️ **Allow WebRequest for listed URL**
4. Click **Add** and enter: `https://wlksiulicosdnerzhkdl.supabase.co`
5. Click **OK**

### 3.2 Attach EA to Chart

1. In Navigator panel, find **Expert Advisors** → **FXKiller_DataSync**
2. Drag it onto any chart
3. In the settings dialog, configure:

   **Inputs Tab:**
   ```
   SupabaseURL = https://wlksiulicosdnerzhkdl.supabase.co
   SupabaseKey = YOUR_SERVICE_ROLE_KEY_HERE (paste from Step 1.2)
   APIEndpoint = /rest/v1/trading_orders
   MagicNumber = 0 (0 = track all orders, or specific magic number)
   EnableLogging = true (for debugging)
   ```

   **Common Tab:**
   - ☑️ Allow live trading
   - ☑️ Allow DLL imports (if needed)
   - ☑️ Allow WebRequest

4. Click **OK**

### 3.3 Verify EA is Running

Check the **Experts** tab in Terminal:
- You should see: `FXKiller DataSync EA Started`
- If you have open positions, they will be synced immediately

## 🧪 Step 4: Test the Setup

### 4.1 Test with a Demo Order

1. Open a small demo order (e.g., 0.01 lots)
2. Check the **Experts** tab for log messages:
   ```
   Sending OPEN order: [ticket_number]
   Request sent successfully. Response code: 201
   ```
3. Verify in Supabase:
   - Go to **Table Editor** → **trading_orders**
   - You should see your order there!

### 4.2 Test Close Order

1. Close the demo order
2. Check logs again:
   ```
   Sending CLOSE order: [ticket_number]
   Request sent successfully. Response code: 204
   ```
3. Verify the order status changed to `CLOSED` with profit/loss data

## 🔍 Troubleshooting

### Error: WebRequest Error: 4060

**Solution**: Supabase URL not in allowed list
- Go back to Step 3.1 and add the URL
- Restart MT4/MT5

### Error: WebRequest Error: 5203

**Solution**: Export library required
- In EA settings → Common tab
- Check ☑️ **Allow DLL imports**

### Error: Response code: 401

**Solution**: Invalid API key
- Verify you're using the **service_role** key
- Check for extra spaces when copy/pasting

### No orders appearing in Supabase

1. Check EA is running (shows smiley face in chart corner)
2. Enable logging: `EnableLogging = true`
3. Check Terminal → Experts tab for errors
4. Verify internet connection
5. Check Supabase project is not paused

### Orders sync on open but not on close

- MT4: Verify EA is still running when you close
- MT5: Check the `OnTrade()` event is triggering
- Look for errors in Experts log

## 📊 Data Fields Explained

| Field | Description |
|-------|-------------|
| `platform` | MT4 or MT5 |
| `account_number` | Your trading account number |
| `ticket_id` | Unique order ID from MT4/MT5 |
| `symbol` | Currency pair (e.g., EURUSD) |
| `order_type` | BUY, SELL, etc. |
| `lots` | Position size |
| `open_price` | Entry price |
| `close_price` | Exit price (when closed) |
| `stop_loss` | SL level |
| `take_profit` | TP level |
| `commission` | Broker commission |
| `swap` | Overnight swap |
| `profit` | Net profit/loss |
| `status` | OPEN or CLOSED |

## 🔒 Security Best Practices

1. **Never share your service_role key** - it has full database access
2. Keep EA parameters secure - don't screenshot with keys visible
3. Use RLS policies in Supabase for additional security
4. Consider rotating API keys periodically
5. Monitor your Supabase logs for suspicious activity

## 📱 Next Steps

After setup is complete:
1. Frontend display component will show your orders on the live trading page
2. Dashboard admin panel will allow CRUD operations
3. All orders are stored with full history

## 🆘 Support

If you encounter issues:
1. Check the Experts tab logs
2. Verify all setup steps were completed
3. Test with a fresh EA restart
4. Check Supabase logs for API errors

---

**Version**: 1.0  
**Last Updated**: 2024-11-21  
**Compatibility**: MT4 Build 1380+, MT5 Build 3800+
