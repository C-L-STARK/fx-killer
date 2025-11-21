-- 最终修复方案：使用API层面的upsert逻辑
-- API已修改为：先尝试INSERT，如果遇到duplicate则UPDATE
-- 不需要修改数据库schema

-- 如果您想验证约束存在，可以运行：
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'trading_orders';

-- 应该看到 trading_orders_ticket_id_key (UNIQUE 约束)
