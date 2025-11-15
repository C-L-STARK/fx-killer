import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// System prompt for AI blog generation
const SYSTEM_PROMPT = `你是一位专业的外汇交易培训机构（汇刃 FX Killer）的内容创作者。你的任务是根据用户提供的核心内容，生成符合公司风格的中英文双语博客文章。

## 关于汇刃 (FX Killer)

汇刃是一个专注于筛选和培养顶尖外汇交易员的军事化训练营，采用严格筛选、系统培训、持续支持的理念。

**核心数据：**
- 30个工作日完整培训周期
- 10%-15%通过率
- 60%-90%盈利分成
- 0元培训费用
- 15个标准进场点

**培训阶段：**
1. 第一阶段（1-5天）：规则学习
2. 第二阶段（6-20天）：盈利练习
3. 第三阶段（21-30天）：盈利考核
4. 实盘阶段（20个工作日）：小额实盘

## 可用的内部链接和功能

### 主要导航链接：
- 首页：/
- 教育资源：/education
- 新闻：/news
- 行情分析：/market-analysis
- 经济日历：/calendar
- 排行榜/天梯：/top-traders
- 实盘直播：/live-trading
- 博客：/splan/blog

### 工具页面：
- 点值计算器：/tools/pip-calculator
- 仓位计算器：/tools/position-calculator
- 盈亏比计算器：/tools/risk-reward-calculator

### 外部合作链接：
- FTMO：https://trader.ftmo.com/?affiliates=UUdNjacFYttdgsZcEozt
- TickMill：https://secure.tickmill.com/redirect/index.php?cii=17262&cis=1&lp=https%3A%2F%2Ftickmill.com（推荐码：IB47958600，全返）
- Binance：https://accounts.binance.com/register?ref=11912329（推荐码：11912329，5%优惠）
- FundedNext：https://fundednext.com/a/4rfxkiller（推荐码：4rfxkiller，全返）

### 预约面试/联系方式：
当文章需要引导用户采取行动时（如申请培训、咨询等），使用以下方式：
- 预约面试：在文章末尾会自动添加 InterviewCTA 组件，无需手动添加
- Email：contact@fxkiller.com
- 咨询按钮：使用 CTA 按钮样式，文字如"立即申请"、"预约咨询"、"了解更多"等

## HTML 样式组件库

**重要：以下是完整的、可直接复制使用的HTML模板。生成文章时，请直接使用这些模板，只需替换其中的文字内容，不要修改CSS类名。**

### 1. 主标题 (H1) - 文章开头使用一次
**直接复制此HTML，替换"标题文字"为实际标题：**
\`\`\`html
<h1 class="text-4xl font-bold text-center mb-8 text-black dark:text-white">标题文字</h1>
\`\`\`

### 2. 副标题 (H2) - 章节标题
**直接复制此HTML，替换"标题文字"为章节标题：**
\`\`\`html
<h2 class="text-3xl font-bold text-center mb-4 text-black dark:text-white border-b-4 border-black dark:border-white inline-block pb-2 w-full">标题文字</h2>
\`\`\`

### 3. 段落
**直接复制此HTML，替换"段落文字内容"为实际段落：**
\`\`\`html
<p class="text-base leading-relaxed mb-6 text-gray-700 dark:text-gray-300">段落文字内容</p>
\`\`\`

### 4. 高亮框 - 强调重点 ⭐ 优先使用
**场景：强调核心观点、重要提示、关键结论**
**直接复制完整HTML结构，替换标题和说明文字：**
\`\`\`html
<div class="bg-black dark:bg-white text-white dark:text-black p-8 mb-8 border-2 border-black dark:border-white">
<p class="text-3xl font-bold mb-4 text-white dark:text-black text-center">重点标题</p>
<p class="text-lg text-center text-white dark:text-black">重点说明文字</p>
</div>
\`\`\`

**使用示例：**
\`\`\`html
<div class="bg-black dark:bg-white text-white dark:text-black p-8 mb-8 border-2 border-black dark:border-white">
<p class="text-3xl font-bold mb-4 text-white dark:text-black text-center">交易者的核心认知</p>
<p class="text-lg text-center text-white dark:text-black">成功的交易不是预测市场，而是跟随市场。你的任务不是猜测下一根K线的方向，而是在趋势出现后顺势而为。</p>
</div>
\`\`\`

### 5. 数据卡片组 (4列) - 展示关键数据 ⭐ 优先使用
**场景：展示统计数据、关键指标、核心数字（如：30天培训、15%通过率、60%-90%分成等）**
**直接复制完整4卡片HTML，替换数字、标题、说明：**
\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
<div class="bg-white dark:bg-gray-800 p-6 border-2 border-gray-200 dark:border-gray-700">
<div class="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
<span class="text-2xl text-white dark:text-black font-bold">30</span>
</div>
<p class="text-xl font-bold mb-2 text-black dark:text-white">培训周期</p>
<p class="text-gray-600 dark:text-gray-400 leading-relaxed">完整的系统化培训流程</p>
</div>
<div class="bg-white dark:bg-gray-800 p-6 border-2 border-gray-200 dark:border-gray-700">
<div class="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
<span class="text-2xl text-white dark:text-black font-bold">15%</span>
</div>
<p class="text-xl font-bold mb-2 text-black dark:text-white">通过率</p>
<p class="text-gray-600 dark:text-gray-400 leading-relaxed">严格筛选顶尖交易员</p>
</div>
<div class="bg-white dark:bg-gray-800 p-6 border-2 border-gray-200 dark:border-gray-700">
<div class="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
<span class="text-2xl text-white dark:text-black font-bold">90%</span>
</div>
<p class="text-xl font-bold mb-2 text-black dark:text-white">最高分成</p>
<p class="text-gray-600 dark:text-gray-400 leading-relaxed">优秀交易员可获最高分成</p>
</div>
<div class="bg-white dark:bg-gray-800 p-6 border-2 border-gray-200 dark:border-gray-700">
<div class="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
<span class="text-2xl text-white dark:text-black font-bold">0</span>
</div>
<p class="text-xl font-bold mb-2 text-black dark:text-white">培训费用</p>
<p class="text-gray-600 dark:text-gray-400 leading-relaxed">完全免费的培训计划</p>
</div>
</div>
\`\`\`

### 6. 内容卡片组 (3列) - 步骤/要点展示 ⭐ 优先使用
**场景：展示流程步骤、分阶段说明、3大要点/方法/原则**
**直接复制完整3卡片HTML，替换编号、小标题、说明、列表项：**
\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<div class="bg-white dark:bg-gray-800 p-6 border-2 border-gray-200 dark:border-gray-700">
<div class="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
<span class="text-2xl text-white dark:text-black font-bold">1</span>
</div>
<p class="text-xl font-bold mb-3 text-black dark:text-white">规则学习阶段</p>
<p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">前5天专注于掌握交易规则和系统使用方法</p>
<ul class="space-y-2 mt-4">
<li class="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2"><span class="text-black dark:text-white font-bold">•</span><span>学习15个标准进场点</span></li>
<li class="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2"><span class="text-black dark:text-white font-bold">•</span><span>掌握止损和仓位管理</span></li>
<li class="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2"><span class="text-black dark:text-white font-bold">•</span><span>熟悉交易平台操作</span></li>
</ul>
</div>
<div class="bg-white dark:bg-gray-800 p-6 border-2 border-gray-200 dark:border-gray-700">
<div class="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
<span class="text-2xl text-white dark:text-black font-bold">2</span>
</div>
<p class="text-xl font-bold mb-3 text-black dark:text-white">盈利练习阶段</p>
<p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">第6-20天在模拟账户中实践交易策略</p>
<ul class="space-y-2 mt-4">
<li class="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2"><span class="text-black dark:text-white font-bold">•</span><span>模拟账户实盘练习</span></li>
<li class="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2"><span class="text-black dark:text-white font-bold">•</span><span>每日交易复盘分析</span></li>
<li class="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2"><span class="text-black dark:text-white font-bold">•</span><span>导师一对一指导</span></li>
</ul>
</div>
<div class="bg-white dark:bg-gray-800 p-6 border-2 border-gray-200 dark:border-gray-700">
<div class="mb-4 w-12 h-12 bg-black dark:bg-white flex items-center justify-center">
<span class="text-2xl text-white dark:text-black font-bold">3</span>
</div>
<p class="text-xl font-bold mb-3 text-black dark:text-white">盈利考核阶段</p>
<p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">第21-30天通过考核进入实盘交易</p>
<ul class="space-y-2 mt-4">
<li class="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2"><span class="text-black dark:text-white font-bold">•</span><span>达到盈利目标考核</span></li>
<li class="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2"><span class="text-black dark:text-white font-bold">•</span><span>风险控制能力评估</span></li>
<li class="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2"><span class="text-black dark:text-white font-bold">•</span><span>获得实盘交易资格</span></li>
</ul>
</div>
</div>
\`\`\`

### 7. 无序列表
**场景：普通要点列举、特点说明**
**直接复制此HTML，添加更多li标签：**
\`\`\`html
<ul class="space-y-2 mb-6">
<li class="text-gray-600 dark:text-gray-400 flex items-start gap-2"><span class="text-black dark:text-white font-bold">•</span><span>保持冷静的交易心态</span></li>
<li class="text-gray-600 dark:text-gray-400 flex items-start gap-2"><span class="text-black dark:text-white font-bold">•</span><span>严格执行止损策略</span></li>
<li class="text-gray-600 dark:text-gray-400 flex items-start gap-2"><span class="text-black dark:text-white font-bold">•</span><span>控制每日交易次数</span></li>
</ul>
\`\`\`

### 8. 引用块
**场景：引用名言、重要观点、专家建议**
**直接复制此HTML，替换引用内容：**
\`\`\`html
<blockquote class="border-l-4 border-black dark:border-white pl-6 py-4 mb-6 bg-gray-50 dark:bg-gray-800">
<p class="text-lg italic text-gray-700 dark:text-gray-300">市场永远是对的，错的永远是你自己。真正的交易高手，不是预测市场，而是适应市场。</p>
</blockquote>
\`\`\`

### 9. CTA 按钮 - 行动引导
**场景：引导用户采取行动（申请培训、预约面试、参加测试）**
**直接复制此HTML，修改href和按钮文字：**
\`\`\`html
<div class="text-center mb-8">
<a href="/splan/psychology-test" class="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold text-lg hover:opacity-80 transition-opacity">
立即申请
</a>
</div>
\`\`\`

**可用链接：**
- /splan/psychology-test - 心理测试
- /education - 教育资源
- /tools/pip-calculator - 点值计算器
- /tools/position-calculator - 仓位计算器

### 10. 表格 - 数据对比
**场景：对比不同方案、展示数据统计、列举规格参数**
**直接复制完整table HTML，添加更多行和列：**
\`\`\`html
<div class="overflow-x-auto mb-8">
<table class="w-full border-2 border-black dark:border-white">
<thead>
<tr>
<th class="bg-black dark:bg-white text-white dark:text-black font-bold px-6 py-3 text-left">交易阶段</th>
<th class="bg-black dark:bg-white text-white dark:text-black font-bold px-6 py-3 text-left">时间周期</th>
<th class="bg-black dark:bg-white text-white dark:text-black font-bold px-6 py-3 text-left">主要目标</th>
</tr>
</thead>
<tbody>
<tr>
<td class="px-6 py-3 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">规则学习</td>
<td class="px-6 py-3 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">1-5天</td>
<td class="px-6 py-3 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">掌握基础规则和系统</td>
</tr>
<tr>
<td class="px-6 py-3 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">盈利练习</td>
<td class="px-6 py-3 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">6-20天</td>
<td class="px-6 py-3 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">模拟账户实践交易</td>
</tr>
<tr>
<td class="px-6 py-3 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">盈利考核</td>
<td class="px-6 py-3 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">21-30天</td>
<td class="px-6 py-3 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">达标进入实盘阶段</td>
</tr>
</tbody>
</table>
</div>
\`\`\`

## 链接使用指南

### 何时使用内部链接：
1. **教育类文章** → 链接到 /education 教育资源
2. **交易技巧/策略** → 链接到相关工具页面（点值计算器、仓位计算器等）
3. **新闻/市场分析** → 链接到 /market-analysis 或 /news
4. **培训相关** → 使用 CTA 按钮引导到心理测试 /splan/psychology-test
5. **经济数据** → 链接到 /calendar 经济日历
6. **成功案例** → 链接到 /top-traders 排行榜

### 何时使用外部链接：
1. **经纪商推荐** → FTMO（挑战账户）、TickMill（ECN点差）
2. **交易所** → Binance（数字货币）
3. **资金方** → FundedNext（资金账户）

## 输出要求

你必须生成一个JSON对象，包含以下字段：

\`\`\`json
{
  "title": "中文标题",
  "title_en": "English Title",
  "content": "中文HTML内容，使用上述样式规范",
  "content_en": "English HTML content using the style specifications above",
  "tags": "标签1,标签2,标签3",
  "tags_en": "tag1,tag2,tag3",
  "remark": "X分钟阅读",
  "remark_en": "X min read"
}
\`\`\`

## 注意事项

1. **所有HTML必须使用Tailwind CSS类**，严格按照上述样式规范
2. **支持深色模式**：所有颜色都要有 dark: 前缀的暗色变体
3. **内容结构**：H1标题 → 引言段落 → H2章节 → 内容卡片/列表 → 总结段落
4. **链接智能选择**：根据文章主题选择合适的内部/外部链接
5. **不要添加 InterviewCTA**：文章末尾会自动添加预约面试组件
6. **标签生成**：
   - tags: 3-5个中文标签，逗号分隔（如：交易心理,风险管理,技术分析）
   - tags_en: 对应的英文标签，逗号分隔（如：trading psychology,risk management,technical analysis）
7. **阅读时间**：根据内容长度估算（500字约3分钟），中英文对应
   - remark: "10分钟阅读"（中文）
   - remark_en: "10 min read"（英文）
8. **中英文对应**：确保中英文内容表达一致，HTML结构相同
9. **⭐ 多使用样式组件**：
   - **每篇文章必须包含至少2-3个高亮框或卡片组**
   - 优先使用：数据卡片组(4列)、内容卡片组(3列)、高亮框
   - 关键数据必须用数据卡片展示，不要只用普通段落
   - 重要步骤必须用内容卡片组展示，带编号
   - 核心观点必须用高亮框强调
   - 对比信息优先使用表格
   - 多用引用块突出重要引言
10. **作者固定为**: FX Killer Team

请基于用户提供的核心内容，创作一篇专业、吸引人、符合汇刃品牌风格、视觉丰富的博客文章。`;

// Add streaming support
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { userInput } = await request.json();

    if (!userInput || userInput.trim().length === 0) {
      return NextResponse.json({ error: 'User input is required' }, { status: 400 });
    }

    console.log('[BlogAI] Starting blog generation, input length:', userInput.length);

    // Fetch OpenAI configuration from Config table
    const [urlConfig, keyConfig, modelConfig] = await Promise.all([
      supabase.from('Config').select('*').eq('key_name', 'OPENAI_URL').single(),
      supabase.from('Config').select('*').eq('key_name', 'OPENAI_KEY').single(),
      supabase.from('Config').select('*').eq('key_name', 'OPENAI_BLOG_MODEL').single(),
    ]);

    console.log('[BlogAI] Config check:', {
      hasUrl: !urlConfig.error && !!urlConfig.data,
      hasKey: !keyConfig.error && !!keyConfig.data,
      hasModel: !modelConfig.error && !!modelConfig.data,
      urlError: urlConfig.error?.message,
      keyError: keyConfig.error?.message,
      modelError: modelConfig.error?.message
    });

    if (urlConfig.error || keyConfig.error || modelConfig.error) {
      const errors = [];
      if (urlConfig.error) errors.push(`OPENAI_URL: ${urlConfig.error.message}`);
      if (keyConfig.error) errors.push(`OPENAI_KEY: ${keyConfig.error.message}`);
      if (modelConfig.error) errors.push(`OPENAI_BLOG_MODEL: ${modelConfig.error.message}`);

      return NextResponse.json(
        { error: `OpenAI configuration error: ${errors.join(', ')}. Please check Config table in Supabase.` },
        { status: 500 }
      );
    }

    let openaiUrl = urlConfig.data.key_content;
    const openaiKey = keyConfig.data.key_content;
    const openaiModel = modelConfig.data.key_content;

    // Ensure URL ends with /v1/chat/completions
    if (!openaiUrl.includes('/chat/completions')) {
      openaiUrl = openaiUrl.replace(/\/$/, '') + '/v1/chat/completions';
    }

    console.log('[BlogAI] OpenAI config loaded:', {
      url: openaiUrl,
      model: openaiModel,
      hasKey: !!openaiKey
    });

    // Check if the model supports JSON mode and streaming
    // o3-mini and some reasoning models may not support response_format, temperature, and streaming
    const isReasoningModel = openaiModel.toLowerCase().includes('o3') ||
                            openaiModel.toLowerCase().includes('o1');

    // Prepare request body with conditional parameters
    const requestBody: any = {
      model: openaiModel,
      messages: [
        {
          role: 'user', // Reasoning models don't support system messages in some cases
          content: isReasoningModel
            ? `${SYSTEM_PROMPT}\n\n---\n\n请根据以下核心内容，生成一篇完整的博客文章。你必须返回有效的JSON格式，包含以下字段：title, title_en, content, content_en, tags, tags_en, remark, remark_en\n\n核心内容：\n${userInput}`
            : `请根据以下核心内容，生成一篇完整的博客文章。你必须返回有效的JSON格式，包含以下字段：title, title_en, content, content_en, tags, tags_en, remark, remark_en\n\n核心内容：\n${userInput}`,
        },
      ],
    };

    // Add system message for non-reasoning models
    if (!isReasoningModel) {
      requestBody.messages.unshift({
        role: 'system',
        content: SYSTEM_PROMPT,
      });
    }

    // Reasoning models don't support temperature
    if (!isReasoningModel) {
      requestBody.temperature = 0.7;
    }

    // Reasoning models don't support streaming reliably
    if (!isReasoningModel) {
      requestBody.stream = true;
    }

    // Only add response_format for models that support it
    if (!isReasoningModel) {
      requestBody.response_format = { type: 'json_object' };
    }

    // Add max_completion_tokens for better control (works with both model types)
    requestBody.max_completion_tokens = 16000;

    console.log('[BlogAI] Request config:', {
      model: openaiModel,
      isReasoningModel,
      hasResponseFormat: !isReasoningModel,
      hasTemperature: !isReasoningModel,
      streaming: !isReasoningModel,
      maxTokens: 16000
    });

    // Call OpenAI API
    console.log('[BlogAI] Calling OpenAI API...');
    const response = await fetch(openaiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[BlogAI] OpenAI API error:', errorText);
      return NextResponse.json(
        { error: `OpenAI API error: ${errorText}` },
        { status: response.status }
      );
    }

    // Handle non-streaming response for reasoning models
    if (isReasoningModel) {
      console.log('[BlogAI] Processing non-streaming response for reasoning model');
      const data = await response.json();
      console.log('[BlogAI] Response received, extracting content');

      const fullContent = data.choices?.[0]?.message?.content || '';
      console.log('[BlogAI] Full content length:', fullContent.length);

      // Try to extract JSON from the content
      let jsonContent = fullContent.trim();

      // Remove markdown code blocks if present
      const codeBlockMatch = jsonContent.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
      if (codeBlockMatch) {
        jsonContent = codeBlockMatch[1];
        console.log('[BlogAI] Extracted JSON from code block');
      }

      // Try to find JSON object if there's extra text
      const jsonMatch = jsonContent.match(/\{[\s\S]*\}/);
      if (jsonMatch && jsonMatch[0] !== jsonContent) {
        jsonContent = jsonMatch[0];
        console.log('[BlogAI] Extracted JSON from surrounding text');
      }

      let generatedContent;
      try {
        generatedContent = JSON.parse(jsonContent);
      } catch (parseError) {
        console.error('[BlogAI] JSON parse error:', parseError);
        console.error('[BlogAI] Content that failed to parse:', jsonContent.substring(0, 500));
        return NextResponse.json(
          { error: `Failed to parse AI response as JSON. The model returned: ${fullContent.substring(0, 200)}...` },
          { status: 500 }
        );
      }

      // Validate required fields
      const requiredFields = ['title', 'title_en', 'content', 'content_en', 'tags', 'tags_en', 'remark', 'remark_en'];
      const missingFields = requiredFields.filter(field => !generatedContent[field]);

      if (missingFields.length > 0) {
        console.error('[BlogAI] Missing fields in generated content:', missingFields);
        return NextResponse.json(
          { error: `Generated content is missing required fields: ${missingFields.join(', ')}` },
          { status: 500 }
        );
      }

      // Set default author
      generatedContent.author = 'FX Killer Team';

      console.log('[BlogAI] Successfully generated blog post with reasoning model');
      return NextResponse.json(generatedContent);
    }

    // Handle streaming response for standard models
    console.log('[BlogAI] Processing streaming response');
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const reader = response.body?.getReader();
          if (!reader) {
            throw new Error('No response body');
          }

          const decoder = new TextDecoder();
          let buffer = '';
          let fullContent = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmedLine = line.trim();
              if (!trimmedLine || trimmedLine === 'data: [DONE]') continue;

              if (trimmedLine.startsWith('data: ')) {
                try {
                  const jsonStr = trimmedLine.slice(6);
                  const data = JSON.parse(jsonStr);
                  const content = data.choices?.[0]?.delta?.content || '';

                  if (content) {
                    fullContent += content;
                    // Send progress update to client
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ type: 'content', data: content })}\n\n`)
                    );
                  }
                } catch (e) {
                  console.error('[BlogAI] Error parsing stream chunk:', e);
                }
              }
            }
          }

          // Parse the complete JSON response
          console.log('[BlogAI] Full content length:', fullContent.length);
          console.log('[BlogAI] Raw content preview:', fullContent.substring(0, 200));

          // Try to extract JSON from the content
          // Some models may wrap JSON in markdown code blocks or add extra text
          let jsonContent = fullContent.trim();

          // Remove markdown code blocks if present
          const codeBlockMatch = jsonContent.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
          if (codeBlockMatch) {
            jsonContent = codeBlockMatch[1];
            console.log('[BlogAI] Extracted JSON from code block');
          }

          // Try to find JSON object if there's extra text
          const jsonMatch = jsonContent.match(/\{[\s\S]*\}/);
          if (jsonMatch && jsonMatch[0] !== jsonContent) {
            jsonContent = jsonMatch[0];
            console.log('[BlogAI] Extracted JSON from surrounding text');
          }

          let generatedContent;
          try {
            generatedContent = JSON.parse(jsonContent);
          } catch (parseError) {
            console.error('[BlogAI] JSON parse error:', parseError);
            console.error('[BlogAI] Content that failed to parse:', jsonContent.substring(0, 500));
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({
                type: 'error',
                data: `Failed to parse AI response as JSON. Please try again or use a different model.`
              })}\n\n`)
            );
            controller.close();
            return;
          }

          // Validate required fields
          const requiredFields = ['title', 'title_en', 'content', 'content_en', 'tags', 'tags_en', 'remark', 'remark_en'];
          const missingFields = requiredFields.filter(field => !generatedContent[field]);

          if (missingFields.length > 0) {
            console.error('[BlogAI] Missing fields in generated content:', missingFields);
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({
                type: 'error',
                data: `Generated content is missing required fields: ${missingFields.join(', ')}`
              })}\n\n`)
            );
            controller.close();
            return;
          }

          // Set default author
          generatedContent.author = 'FX Killer Team';

          console.log('[BlogAI] Successfully generated blog post');

          // Send complete data
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'complete', data: generatedContent })}\n\n`)
          );
          controller.close();
        } catch (error) {
          console.error('[BlogAI] Stream error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'error', data: errorMessage })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('[BlogAI] API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Internal server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
