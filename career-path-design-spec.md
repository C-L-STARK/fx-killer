职业晋升之路 - Premium 设计方案

## 设计要点：
1. 使用垂直时间轴布局 + 中央发光连接线
2. 三个阶段用不同的圆形节点标记（01-04, 05, 06-09）
3. 每个卡片都有外发光效果（blur + opacity transition）
4. Hover时发光效果增强
5. 渐变背景 + 圆形模糊光源
6. 阶段5（大额矩阵）使用更大的卡片 + animate-pulse
7. 级别升级使用彩色主题（purple/blue/cyan/green）

## 关键CSS类：
- 外发光：`absolute -inset-0.5 bg-gradient-to-r from-[color] to-[color] rounded-lg blur opacity-X group-hover:opacity-Y`
- 中央线：`absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#ff102a] to-transparent`
- 节点：`w-16 h-16 bg-gradient-to-br from-[#ff102a] to-[#cc0c21] rounded-full shadow-[0_0_30px_rgba(255,16,42,0.6)]`
- 背景模糊光：`absolute top-0 left-1/4 w-96 h-96 bg-[#ff102a] rounded-full blur-[120px]`

这个设计会让整个section看起来非常高端和现代化！
