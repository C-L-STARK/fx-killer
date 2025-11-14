# 环境变量配置说明

## 必需的环境变量

请在 `.env.local` 文件中配置以下环境变量：

```bash
# Supabase 配置（必需）
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 管理员密码（用于 Dashboard 登录）
ADMIN_PASSWORD=your_admin_password
```

## 获取 Supabase 凭据

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择你的项目
3. 点击左侧菜单的 **Settings** → **API**
4. 复制以下信息：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 示例配置

```bash
# .env.local 示例
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ADMIN_PASSWORD=your_secure_password_here
```

## 注意事项

⚠️ **重要**:
- 环境变量名必须是 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- 这些是公开的客户端密钥，可以安全地在前端使用
- **不要提交** `.env.local` 文件到 Git
- `.env.local` 已经在 `.gitignore` 中

## 验证配置

配置完成后，启动开发服务器：

```bash
pnpm dev
```

如果配置正确，你应该：
- ✅ 不会看到 Supabase 警告信息
- ✅ 能正常加载品牌配置
- ✅ 能访问 Dashboard 并看到配置

如果看到警告信息，请检查：
1. 环境变量名是否正确（包括 `NEXT_PUBLIC_` 前缀）
2. 值是否正确复制（没有多余空格）
3. `.env.local` 文件是否在项目根目录
4. 重启开发服务器以加载新的环境变量
