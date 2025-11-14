# 品牌配置系统 - 完整测试清单

## 🎯 测试前准备

### 1. 环境变量配置

确保 `.env.local` 包含以下内容：

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ADMIN_PASSWORD=your_admin_password
```

### 2. 数据库初始化

在 Supabase SQL Editor 中执行：

```sql
-- 执行 /scripts/init-database.sql 中的所有内容
```

验证表是否创建成功：
- ✅ `brand_config` 表存在且有默认数据
- ✅ `brand_presets` 表存在且有 `fxkiller` 和 `testbrand` 预设

### 3. 启动开发服务器

```bash
pnpm dev
```

---

## 📋 完整测试流程

### 测试 1: 品牌配置加载

**访问**: `http://localhost:3000` (中文) 或 `http://localhost:3000/en` (英文)

**检查项目**:
- [ ] 导航栏显示品牌名称 "汇刃" / "FX Killer"
- [ ] Footer 显示品牌名称、域名 (fxkiller.com)
- [ ] 页面标题包含品牌名称（查看浏览器标签）
- [ ] 无控制台错误

---

### 测试 2: 全局邮箱配置

**2.1 EmailContactModal**
1. 在首页点击导航栏的邮箱图标
2. **验证**: 弹窗显示的邮箱地址是 `x.stark.dylan@gmail.com`
3. **验证**: 点击"复制邮箱"功能正常

**2.2 FloatingContactForm**
1. 点击右下角的浮动联系表单图标
2. 查看表单的 `action` 属性（开发者工具）
3. **验证**: `action="https://formsubmit.co/x.stark.dylan@gmail.com"`

**2.3 WelcomeModal**
1. 清除 localStorage: `localStorage.removeItem('fxkiller_welcome_shown')`
2. 刷新页面
3. 在欢迎弹窗中填写表单
4. **验证**: 表单提交到正确的邮箱地址

**2.4 Privacy Page**
1. 访问 `http://localhost:3000/privacy`
2. 滚动到"联系我们"部分
3. **验证**: 显示的邮箱是 `x.stark.dylan@gmail.com`

---

### 测试 3: Footer 配置驱动

**访问**: 任意页面的 Footer

**3.1 联系方式**
- [ ] 显示邮箱图标（默认启用）
- [ ] 点击邮箱图标打开面试预约弹窗
- [ ] 如果配置了微信，点击显示微信弹窗

**3.2 社交媒体**
- [ ] 显示配置的社交媒体图标
- [ ] 链接正确指向配置的 URL

**3.3 推荐码**
- [ ] 显示所有配置的推荐码
- [ ] 推荐码格式正确（代码 + 优惠信息）

**3.4 Footer 横幅**
- [ ] 显示 FTMO 和 TickMill 横幅
- [ ] 横幅链接正确

---

### 测试 4: SEO 品牌化

**4.1 查看页面元数据**

在浏览器中查看源代码 (View Page Source)：

```html
<!-- 验证以下标签 -->
<title>职业交易员培训平台丨汇刃丨职业交易员培训、外汇交易员培训</title>
<meta property="og:site_name" content="FX Killer | 汇刃" />
<meta property="og:url" content="https://fxkiller.com/zh/" />
<link rel="canonical" href="https://fxkiller.com/zh/" />
```

**4.2 验证项目**
- [ ] 标题包含品牌名称
- [ ] OG 标签包含品牌信息
- [ ] Canonical URL 使用配置的域名
- [ ] Twitter Card 使用配置的信息

---

### 测试 5: Admin Dashboard 品牌配置管理

**5.1 登录 Dashboard**
1. 访问 `http://localhost:3000/dashboard`
2. 输入管理员密码登录

**5.2 查看品牌配置**
1. 点击侧边栏 "🎨 品牌配置"
2. **验证**:
   - [ ] 显示当前品牌名称（中英文）
   - [ ] 显示域名 `fxkiller.com`
   - [ ] 显示全局邮箱 `x.stark.dylan@gmail.com`
   - [ ] 显示所有联系方式配置
   - [ ] 显示社交媒体链接
   - [ ] 显示推荐码列表
   - [ ] 显示 SEO 配置

**5.3 品牌预设切换（仅开发模式）**
1. 在品牌配置页面找到"品牌预设切换"
2. 点击 "testbrand" 按钮
3. **验证**: 页面自动刷新
4. **验证**: 所有品牌信息已更新为 testbrand

**切换回 FX Killer**:
1. 重新进入品牌配置页面
2. 点击 "fxkiller" 按钮
3. **验证**: 恢复到原始配置

---

### 测试 6: 品牌切换完整性

**6.1 切换到 testbrand**

在 Dashboard 中切换到 `testbrand` 后，验证以下内容：

- [ ] 导航栏品牌名称已更新
- [ ] Footer 品牌名称已更新
- [ ] SEO metadata 已更新（查看页面源代码）
- [ ] 全局邮箱已更新（检查表单）
- [ ] Footer 联系方式已更新
- [ ] 社交媒体链接已更新

**6.2 切换回 fxkiller**

重复上述验证，确保能正确切换回来。

---

### 测试 7: 缓存机制

**7.1 测试缓存**
1. 记录当前配置
2. 在 Supabase 中修改 `brand_config` 表的某个字段
3. 刷新页面
4. **验证**: 5 分钟内仍显示旧配置（缓存生效）

**7.2 测试缓存清除**
1. 通过 API 切换品牌预设
2. **验证**: 立即生效（缓存已清除）

---

### 测试 8: 在 Supabase 中修改配置

**8.1 修改品牌名称**
1. 打开 Supabase Table Editor
2. 找到 `brand_config` 表
3. 修改 `brand_name_zh` 为 "测试品牌"
4. 修改 `brand_name_en` 为 "Test Brand"
5. 保存

**8.2 验证更改**
1. 等待 5 分钟或重启服务器
2. 刷新页面
3. **验证**: 所有地方的品牌名称都已更新

**8.3 恢复原始值**
1. 改回 "汇刃" 和 "FX Killer"
2. 保存

---

### 测试 9: 错误处理

**9.1 Supabase 连接失败**
1. 临时修改 `.env.local` 中的 Supabase URL 为错误值
2. 重启服务器
3. **验证**: 页面仍能加载（使用默认配置）
4. **验证**: 控制台显示警告信息
5. 恢复正确的 URL

**9.2 品牌预设不存在**
1. 尝试切换到不存在的预设（通过 API）:
```bash
curl -X POST http://localhost:3000/api/brand/switch \
  -H "Content-Type: application/json" \
  -d '{"presetName":"nonexistent"}'
```
2. **验证**: 返回错误信息
3. **验证**: 原配置未改变

---

## ✅ 最终验证清单

完成所有测试后，确认以下功能：

### 核心功能
- [ ] 品牌配置从 Supabase 正确加载
- [ ] 5 分钟缓存机制正常工作
- [ ] 品牌预设切换功能正常
- [ ] Supabase 连接失败时有降级处理

### UI 组件
- [ ] BrandName 组件显示正确品牌名
- [ ] Footer 完全由配置驱动
- [ ] EmailContactModal 使用全局邮箱
- [ ] FloatingContactForm 使用全局邮箱
- [ ] WelcomeModal 使用全局邮箱
- [ ] Privacy 页面显示正确邮箱

### SEO
- [ ] 页面标题使用品牌配置
- [ ] OG 标签使用品牌配置
- [ ] Canonical URL 使用配置域名
- [ ] Twitter Card 使用品牌信息

### Dashboard
- [ ] 品牌配置页面正确显示所有配置
- [ ] 品牌预设切换功能正常
- [ ] 配置详情完整展示

### 文档
- [ ] `/scripts/init-database.sql` 可以成功执行
- [ ] `/BRAND_TESTING.md` 说明清晰
- [ ] 配置修改步骤明确

---

## 🐛 常见问题排查

### 问题: 品牌名称未更新
**解决方案**:
1. 检查 Supabase 连接
2. 等待 5 分钟缓存过期
3. 或使用品牌切换功能清除缓存

### 问题: 邮箱地址错误
**解决方案**:
1. 检查 `brand_config.contact_email` 字段
2. 验证组件是否正确导入 `useBrand()` hook

### 问题: SEO 标签未更新
**解决方案**:
1. 检查 `generateBilingualMetadata` 是否接收 `brandConfig` 参数
2. 清除浏览器缓存
3. 查看页面源代码（不是检查元素）

### 问题: 品牌切换 API 返回 403
**解决方案**:
- 确认 `NODE_ENV=development`
- 生产环境下品牌切换功能会被禁用

---

## 📝 测试完成后

完成所有测试后：

1. ✅ 在此文档中标记所有测试项
2. ✅ 记录发现的任何问题
3. ✅ 验证所有问题已修复
4. ✅ 准备提交代码到远程仓库

---

## 🎉 测试成功标准

所有以下条件都满足即表示测试成功：

1. ✅ 所有品牌信息正确显示
2. ✅ 品牌切换功能正常工作
3. ✅ 全局邮箱在所有组件中一致
4. ✅ SEO 元数据包含品牌信息
5. ✅ Dashboard 品牌配置页面功能完整
6. ✅ 无控制台错误
7. ✅ 在 Supabase 中修改配置能生效
8. ✅ 错误处理机制正常

**如果所有测试通过，品牌配置系统已完成并可以投入使用！** 🚀
