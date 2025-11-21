# 🔄 重启Next.js开发服务器

## 问题
API代码已修改，但Next.js开发服务器缓存了旧代码，导致EA仍收到409错误。

## 解决方案

### 方法1：重启开发服务器（推荐）

1. **停止当前服务器**：
   ```bash
   # 在运行 npm run dev 的终端中按 Ctrl+C
   ```

2. **重新启动**：
   ```bash
   npm run dev
   ```

### 方法2：强制杀死进程并重启

```bash
# 停止所有Node进程
kill -9 $(lsof -ti:3000)

# 重新启动
npm run dev
```

## 验证

重启后，EA应该正常工作：

- **开仓** → `Response code: 201` ✅
- **平仓** → `Response code: 200` ✅（不再409）

## 当前API逻辑（已修改）

```typescript
// status=OPEN → INSERT
// status=CLOSED → UPDATE (找不到就跳过)
```

**立即重启服务器，然后重新测试EA！**
