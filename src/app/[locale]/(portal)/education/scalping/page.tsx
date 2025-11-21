import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { scalpingContent } from '@/content/education/scalping.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    scalpingContent.zh.title,
    scalpingContent.en.title,
    scalpingContent.zh.description,
    scalpingContent.en.description,
    scalpingContent.zh.keywords,
    scalpingContent.en.keywords,
    lang
  );
}

export default async function ScalpingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = scalpingContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: What is Scalping */}
      <section id="what-is-scalping" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '什么是剥头皮交易？' : 'What is Scalping?'}
        </h2>
        <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '剥头皮交易（Scalping），又称超短线交易或快速交易，是外汇交易中最激进、最快速的交易方式。剥头皮交易者（Scalper）通过捕捉市场极短期的微小波动获利，持仓时间通常只有几秒到几分钟，单笔目标利润只有5-15点，但通过高频交易累积利润。这种交易方式要求交易者具备极快的反应速度、严格的纪律、稳定的心理素质，以及低点差、快速执行的交易环境。'
              : 'Scalping, also known as ultra-short-term trading or fast trading, is the most aggressive and fastest trading style in forex. Scalpers profit from capturing extremely short-term tiny price movements, holding positions typically only seconds to minutes, targeting just 5-15 pips per trade, but accumulating profits through high-frequency trading. This style requires extremely fast reactions, strict discipline, stable psychology, and a low-spread, fast-execution trading environment.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '剥头皮交易的核心特征' : 'Core Characteristics of Scalping'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 极短持仓：' : '1. Ultra-Short Holding:'}</strong>{' '}
                {isZh
                  ? '持仓时间从几秒到15分钟不等，绝大多数在5分钟内完成，不会持仓超过30分钟'
                  : 'Holding period ranges from seconds to 15 minutes, majority completed within 5 minutes, never held beyond 30 minutes'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 微小目标：' : '2. Tiny Targets:'}</strong>{' '}
                {isZh
                  ? '单笔目标利润5-15点，有时甚至只有3-5点，依靠高频交易累积收益'
                  : 'Single trade profit target 5-15 pips, sometimes only 3-5 pips, relies on high frequency to accumulate returns'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 超高频率：' : '3. Ultra-High Frequency:'}</strong>{' '}
                {isZh
                  ? '每天可能执行10-50笔甚至更多交易，交易频率远超日内交易'
                  : 'May execute 10-50 or more trades daily, trading frequency far exceeds day trading'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 快速决策：' : '4. Quick Decisions:'}</strong>{' '}
                {isZh
                  ? '从发现信号到执行交易通常只有数秒，需要瞬间判断和毫不犹豫的执行'
                  : 'From signal detection to trade execution typically only seconds, requires instant judgment and unhesitating execution'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '5. 低点差依赖：' : '5. Low-Spread Dependent:'}</strong>{' '}
                {isZh
                  ? '必须使用ECN/STP账户，点差0.0-0.5点，否则交易成本会吃掉大部分利润'
                  : 'Must use ECN/STP accounts, spread 0.0-0.5 pips, otherwise trading costs consume most profits'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '6. 持续盯盘：' : '6. Constant Monitoring:'}</strong>{' '}
                {isZh
                  ? '需要全程盯着屏幕，不能离开，精神高度集中，适合全职交易者'
                  : 'Requires constant screen watching, cannot leave, high mental concentration, suitable for full-time traders'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '剥头皮 vs 日内交易对比' : 'Scalping vs Day Trading Comparison'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                    <th className="p-2 text-left">{isZh ? '特征' : 'Feature'}</th>
                    <th className="p-2 text-left">{isZh ? '剥头皮交易' : 'Scalping'}</th>
                    <th className="p-2 text-left">{isZh ? '日内交易' : 'Day Trading'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800 dark:border-gray-700">
                    <td className="p-2 font-bold text-white">{isZh ? '持仓时间' : 'Holding Period'}</td>
                    <td className="p-2">{isZh ? '几秒-15分钟' : 'Seconds-15 min'}</td>
                    <td className="p-2">{isZh ? '1-8小时' : '1-8 hours'}</td>
                  </tr>
                  <tr className="border-b border-gray-800 dark:border-gray-700">
                    <td className="p-2 font-bold text-white">{isZh ? '时间框架' : 'Timeframe'}</td>
                    <td className="p-2">M1, M5</td>
                    <td className="p-2">M15, H1</td>
                  </tr>
                  <tr className="border-b border-gray-800 dark:border-gray-700">
                    <td className="p-2 font-bold text-white">{isZh ? '目标利润' : 'Target Profit'}</td>
                    <td className="p-2">{isZh ? '5-15点' : '5-15 pips'}</td>
                    <td className="p-2">{isZh ? '20-80点' : '20-80 pips'}</td>
                  </tr>
                  <tr className="border-b border-gray-800 dark:border-gray-700">
                    <td className="p-2 font-bold text-white">{isZh ? '交易频率' : 'Trade Frequency'}</td>
                    <td className="p-2">{isZh ? '10-50笔/天' : '10-50/day'}</td>
                    <td className="p-2">{isZh ? '1-5笔/天' : '1-5/day'}</td>
                  </tr>
                  <tr className="border-b border-gray-800 dark:border-gray-700">
                    <td className="p-2 font-bold text-white">{isZh ? '点差要求' : 'Spread Requirement'}</td>
                    <td className="p-2">{isZh ? '0.0-0.5点（ECN必须）' : '0.0-0.5 pips (ECN required)'}</td>
                    <td className="p-2">{isZh ? '1-2点（可接受）' : '1-2 pips (acceptable)'}</td>
                  </tr>
                  <tr className="border-b border-gray-800 dark:border-gray-700">
                    <td className="p-2 font-bold text-white">{isZh ? '心理压力' : 'Psychological Stress'}</td>
                    <td className="p-2">{isZh ? '极高' : 'Extreme'}</td>
                    <td className="p-2">{isZh ? '高' : 'High'}</td>
                  </tr>
                  <tr className="border-b border-gray-800 dark:border-gray-700">
                    <td className="p-2 font-bold text-white">{isZh ? '适合人群' : 'Suitable For'}</td>
                    <td className="p-2">{isZh ? '经验丰富的全职交易者' : 'Experienced full-time traders'}</td>
                    <td className="p-2">{isZh ? '全职或兼职交易者' : 'Full-time or part-time traders'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '剥头皮交易的优势' : 'Advantages of Scalping'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '机会极多：' : 'Abundant opportunities:'}</strong>{' '}
                {isZh ? 'M1/M5图表每分钟都有新的交易机会，不用等待' : 'M1/M5 charts offer new opportunities every minute, no waiting'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '单笔风险小：' : 'Small per-trade risk:'}</strong>{' '}
                {isZh ? '止损通常只有5-10点，单笔亏损金额小' : 'Stops typically only 5-10 pips, small per-trade loss amount'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '无隔夜风险：' : 'No overnight risk:'}</strong>{' '}
                {isZh ? '所有仓位在几分钟内平仓，完全避免隔夜跳空' : 'All positions closed within minutes, completely avoid overnight gaps'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '快速反馈：' : 'Quick feedback:'}</strong>{' '}
                {isZh ? '每笔交易几分钟就有结果，可快速验证策略有效性' : 'Each trade has result in minutes, quickly validates strategy effectiveness'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '复利效应：' : 'Compound effect:'}</strong>{' '}
                {isZh ? '每天多笔盈利累积，账户增长速度快（如果做得好）' : 'Multiple daily profits accumulate, fast account growth (if done well)'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '剥头皮交易的严峻挑战' : 'Serious Challenges of Scalping'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '交易成本极高：' : 'Extremely high costs:'}</strong>{' '}
                {isZh ? '即使点差0.5点，50笔交易的成本就达25点，可能吃掉30-50%利润' : 'Even 0.5 pip spread, 50 trades costs 25 pips, may consume 30-50% profits'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '心理压力巨大：' : 'Enormous psychological stress:'}</strong>{' '}
                {isZh ? '持续盯盘、快速决策、频繁交易，极易疲劳和情绪失控' : 'Constant monitoring, quick decisions, frequent trading, easily causes fatigue and emotional loss'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '市场噪音极大：' : 'Extreme market noise:'}</strong>{' '}
                {isZh ? 'M1/M5充满随机波动和假信号，胜率难以提高' : 'M1/M5 full of random fluctuations and false signals, hard to improve win rate'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '技术要求苛刻：' : 'Demanding technical requirements:'}</strong>{' '}
                {isZh ? '需要VPS服务器、超低延迟、ECN账户，初始投入大' : 'Requires VPS server, ultra-low latency, ECN account, large initial investment'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '时间投入大：' : 'High time commitment:'}</strong>{' '}
                {isZh ? '每天需要4-8小时全神贯注盯盘，无法兼职或分心' : 'Daily 4-8 hours of full concentration required, cannot part-time or multitask'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '失败率极高：' : 'Extremely high failure rate:'}</strong>{' '}
                {isZh ? '据统计，99%的剥头皮交易者最终亏损或放弃' : 'Statistics show 99% of scalpers eventually lose or quit'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '剥头皮交易适合你吗？' : 'Is Scalping Suitable For You?'}
            </h3>
            <p className="mb-3 text-gray-300 dark:text-gray-300">
              <strong className="text-white">{isZh ? '满足以下所有条件才考虑：' : 'Consider only if ALL conditions met:'}</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 dark:text-gray-300">
              <li className="text-gray-300">{isZh ? '至少2-3年交易经验，在日内或波段交易中已稳定盈利' : 'At least 2-3 years trading experience, already consistently profitable in day or swing trading'}</li>
              <li className="text-gray-300">{isZh ? '能够全职投入，每天有4-8小时完整交易时间' : 'Can commit full-time, 4-8 hours daily complete trading time'}</li>
              <li className="text-gray-300">{isZh ? '心理素质极佳，能承受高频交易的巨大压力和挫败感' : 'Excellent psychological quality, can handle enormous stress and frustration of high-frequency trading'}</li>
              <li className="text-gray-300">{isZh ? '有足够资金（至少$5000-10000）和技术设备（VPS、低延迟网络）' : 'Sufficient capital (minimum $5000-10000) and technical equipment (VPS, low-latency network)'}</li>
              <li className="text-gray-300">{isZh ? '理解并接受剥头皮的高成本和低胜率特性' : 'Understand and accept high costs and low win rate characteristics of scalping'}</li>
              <li className="text-gray-300">{isZh ? '反应速度快，决策果断，绝不犹豫或后悔' : 'Fast reactions, decisive decision-making, never hesitate or regret'}</li>
            </ul>
            <p className="mt-3 text-gray-300 dark:text-gray-300 font-bold">
              {isZh
                ? '⚠️ 强烈建议：如果你是新手或中级交易者，请先从波段或日内交易开始，积累足够经验后再考虑剥头皮。盲目尝试剥头皮可能导致快速爆仓。'
                : '⚠️ Strong Recommendation: If you\'re a beginner or intermediate trader, start with swing or day trading first, consider scalping only after accumulating sufficient experience. Blind scalping attempts may lead to quick account blow-up.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Core Principles */}
      <section id="core-principles" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '剥头皮交易核心原理' : 'Core Scalping Principles'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '成功的剥头皮交易建立在三大核心原理之上：流动性选择、点差成本控制、执行速度优化。只有深刻理解并严格执行这些原理，才有可能在剥头皮交易中生存并盈利。'
              : 'Successful scalping is built on three core principles: liquidity selection, spread cost control, execution speed optimization. Only by deeply understanding and strictly executing these principles can one survive and profit in scalping.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '核心原理1：选择最佳流动性时段' : 'Core Principle 1: Choose Best Liquidity Sessions'}</h3>
            <p className="mb-3">
              {isZh
                ? '剥头皮交易必须在高流动性时段进行，否则点差扩大、滑点严重、执行速度慢，无法盈利。'
                : 'Scalping must be done during high liquidity sessions, otherwise spread widens, slippage serious, execution slow, cannot profit.'}
            </p>
            <div className="space-y-3">
              <div>
                <p className="font-bold mb-2 text-white">{isZh ? '✅ 最佳时段（推荐）：' : '✅ Best Sessions (Recommended):'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '欧洲开盘（北京15:00-18:00）：' : 'European Open (15:00-18:00 Beijing):'}</strong>{' '}
                    {isZh ? '伦敦市场开盘，流动性暴增，点差最低，波动性适中' : 'London market opens, liquidity surges, lowest spreads, moderate volatility'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '欧美重叠（北京20:00-24:00）：' : 'EU-US Overlap (20:00-24:00 Beijing):'}</strong>{' '}
                    {isZh ? '全球流动性巅峰，EUR/USD、GBP/USD最活跃，最适合剥头皮' : 'Global liquidity peak, EUR/USD, GBP/USD most active, best for scalping'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '美国开盘（北京21:00-次日1:00）：' : 'US Open (21:00-01:00 Beijing):'}</strong>{' '}
                    {isZh ? '纽约市场开盘，美元货币对波动大，机会多' : 'New York market opens, USD pairs volatile, many opportunities'}
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-2 text-white">{isZh ? '❌ 避免时段（禁止交易）：' : '❌ Avoid Sessions (No Trading):'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '亚洲午间（北京12:00-14:00）：' : 'Asian Afternoon (12:00-14:00 Beijing):'}</strong>{' '}
                    {isZh ? '流动性极低，点差可能扩大到2-5点，滑点严重' : 'Extremely low liquidity, spread may widen to 2-5 pips, severe slippage'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '新闻发布前后30分钟：' : '30 Minutes Around News:'}</strong>{' '}
                    {isZh ? '点差暴增（可达5-10点），滑点不可控，止损可能无效' : 'Spread explodes (up to 5-10 pips), uncontrollable slippage, stops may fail'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '周五晚间（北京次日2:00后）：' : 'Friday Evening (After 02:00 Beijing):'}</strong>{' '}
                    {isZh ? '流动性枯竭，交易商准备周末，不适合交易' : 'Liquidity dries up, dealers preparing for weekend, unsuitable for trading'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '市场开盘/收盘时刻：' : 'Market Open/Close Moments:'}</strong>{' '}
                    {isZh ? '价格跳空、订单簿薄弱，风险极高' : 'Price gaps, thin order book, extremely high risk'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '核心原理2：严格控制交易成本' : 'Core Principle 2: Strictly Control Trading Costs'}
            </h3>
            <p className="mb-3">
              {isZh
                ? '剥头皮交易的最大敌人不是市场，而是交易成本。必须精确计算每笔交易的真实成本，并将其控制在可接受范围内。'
                : 'The biggest enemy of scalping is not the market, but trading costs. Must precisely calculate true cost of each trade and control it within acceptable range.'}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-800 text-sm">
                <thead>
                  <tr className="bg-gray-900 text-gray-300">
                    <th className="border border-gray-800 p-2 text-left">{isZh ? '成本类型' : 'Cost Type'}</th>
                    <th className="border border-gray-800 p-2 text-left">{isZh ? '典型值' : 'Typical Value'}</th>
                    <th className="border border-gray-800 p-2 text-left">{isZh ? '年度影响' : 'Annual Impact'}</th>
                    <th className="border border-gray-800 p-2 text-left">{isZh ? '优化方法' : 'Optimization'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-gray-800">
                    <td className="border border-gray-800 p-2 font-bold text-white">{isZh ? '点差' : 'Spread'}</td>
                    <td className="border border-gray-800 p-2">{isZh ? '0.0-0.5点' : '0.0-0.5 pips'}</td>
                    <td className="border border-gray-800 p-2">{isZh ? '10-25点/天' : '10-25 pips/day'}</td>
                    <td className="border border-gray-800 p-2">{isZh ? '选择ECN经纪商' : 'Choose ECN broker'}</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-800">
                    <td className="border border-gray-800 p-2 font-bold text-white">{isZh ? '手续费' : 'Commission'}</td>
                    <td className="border border-gray-800 p-2">{isZh ? '$3-7/标准手' : '$3-7/lot'}</td>
                    <td className="border border-gray-800 p-2">{isZh ? '显著' : 'Significant'}</td>
                    <td className="border border-gray-800 p-2">{isZh ? '对比多家经纪商' : 'Compare brokers'}</td>
                  </tr>
                  <tr className="border border-gray-800">
                    <td className="border border-gray-800 p-2 font-bold text-white">{isZh ? '滑点' : 'Slippage'}</td>
                    <td className="border border-gray-800 p-2">{isZh ? '0.1-0.5点' : '0.1-0.5 pips'}</td>
                    <td className="border border-gray-800 p-2">{isZh ? '5-10点/天' : '5-10 pips/day'}</td>
                    <td className="border border-gray-800 p-2">{isZh ? '使用限价单、避免新闻' : 'Use limit orders, avoid news'}</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-800">
                    <td className="border border-gray-800 p-2 font-bold text-white">{isZh ? '网络延迟' : 'Latency'}</td>
                    <td className="border border-gray-800 p-2">{isZh ? '10-100毫秒' : '10-100ms'}</td>
                    <td className="border border-gray-800 p-2">{isZh ? '间接' : 'Indirect'}</td>
                    <td className="border border-gray-800 p-2">{isZh ? '使用VPS服务器' : 'Use VPS server'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-gray-100 dark:bg-[#0a0a0a]">
              <p className="font-bold mb-2 text-white">{isZh ? '成本计算示例（0.1标准手，EUR/USD）：' : 'Cost Calculation Example (0.1 lot, EUR/USD):'}</p>
              <ul className="space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? '点差：0.5点 × $1 = $0.50' : 'Spread: 0.5 pips × $1 = $0.50'}</li>
                <li className="text-gray-300">{isZh ? '手续费：$3.50/手 × 0.1 = $0.35' : 'Commission: $3.50/lot × 0.1 = $0.35'}</li>
                <li className="text-gray-300">{isZh ? '滑点：平均0.3点 × $1 = $0.30' : 'Slippage: avg 0.3 pips × $1 = $0.30'}</li>
                <li className="font-bold pt-2 border-t border-gray-600 text-white">
                  {isZh ? '单笔总成本：$1.15（相当于11.5点）' : 'Total per-trade cost: $1.15 (equivalent to 11.5 pips)'}
                </li>
                <li className="text-red-600 dark:text-red-400 font-bold">
                  {isZh ? '如果目标利润是10点（$1），成本占比115%！' : 'If target profit is 10 pips ($1), cost ratio 115%!'}
                </li>
              </ul>
              <p className="mt-3 text-sm">
                <strong className="text-white">{isZh ? '结论：' : 'Conclusion:'}</strong>{' '}
                {isZh
                  ? '目标利润必须至少是总成本的2-3倍（20-30点），且胜率需达60%以上才能盈利。'
                  : 'Target profit must be at least 2-3x total cost (20-30 pips), and win rate must reach 60%+ to profit.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '核心原理3：优化执行速度' : 'Core Principle 3: Optimize Execution Speed'}</h3>
            <p className="mb-3">
              {isZh
                ? '在剥头皮交易中，"时间就是金钱"不是比喻，而是事实。延迟1秒可能导致价格变化2-5点，直接决定盈亏。'
                : 'In scalping, "time is money" is not a metaphor, but fact. 1 second delay may cause 2-5 pip price change, directly determining profit/loss.'}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-bold mb-2 text-white">{isZh ? '技术优化：' : 'Technical Optimization:'}</p>
                <ul className="space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'VPS服务器：' : 'VPS Server:'}</strong>{' '}
                    {isZh ? '租用靠近经纪商服务器的VPS（如伦敦、纽约），延迟可降至5-20毫秒' : 'Rent VPS near broker server (e.g., London, New York), latency reduces to 5-20ms'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '高速网络：' : 'High-Speed Internet:'}</strong>{' '}
                    {isZh ? '使用光纤网络，避免WiFi，确保稳定连接' : 'Use fiber internet, avoid WiFi, ensure stable connection'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '交易平台：' : 'Trading Platform:'}</strong>{' '}
                    {isZh ? '使用MT4/MT5或cTrader，避免网页版平台' : 'Use MT4/MT5 or cTrader, avoid web-based platforms'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '一键交易：' : 'One-Click Trading:'}</strong>{' '}
                    {isZh ? '启用一键交易功能，减少确认步骤' : 'Enable one-click trading, reduce confirmation steps'}
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-2 text-white">{isZh ? '策略优化：' : 'Strategy Optimization:'}</p>
                <ul className="space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '预设订单：' : 'Pre-Set Orders:'}</strong>{' '}
                    {isZh ? '提前设置挂单（Limit Order），在关键价位自动触发' : 'Set pending orders (Limit Order) in advance, auto-trigger at key levels'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '同时设置止损止盈：' : 'Set SL/TP Together:'}</strong>{' '}
                    {isZh ? '开仓瞬间同时设置SL和TP，避免手动操作' : 'Set SL and TP at opening instant, avoid manual operation'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '快捷键交易：' : 'Hotkey Trading:'}</strong>{' '}
                    {isZh ? '配置快捷键快速开平仓（如F1做多、F2做空）' : 'Configure hotkeys for quick open/close (e.g., F1 long, F2 short)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'EA辅助：' : 'EA Assistance:'}</strong>{' '}
                    {isZh ? '使用EA（智能交易系统）自动执行简单策略' : 'Use EA (Expert Advisor) to auto-execute simple strategies'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '货币对选择原则' : 'Currency Pair Selection Principles'}
            </h3>
            <p className="mb-3">
              {isZh
                ? '不是所有货币对都适合剥头皮交易。必须选择点差最低、流动性最好、波动性适中的货币对。'
                : 'Not all currency pairs are suitable for scalping. Must choose pairs with lowest spread, best liquidity, moderate volatility.'}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-[#0a0a0a]">
                    <th className="border p-2 text-left">{isZh ? '货币对' : 'Pair'}</th>
                    <th className="border p-2 text-left">{isZh ? '点差' : 'Spread'}</th>
                    <th className="border p-2 text-left">{isZh ? '流动性' : 'Liquidity'}</th>
                    <th className="border p-2 text-left">{isZh ? '剥头皮适合度' : 'Scalping Suitability'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border">
                    <td className="border p-2 font-bold text-white">EUR/USD</td>
                    <td className="border p-2 text-green-600 dark:text-green-400">0.0-0.3点</td>
                    <td className="border p-2 text-green-600 dark:text-green-400">{isZh ? '极高' : 'Extreme'}</td>
                    <td className="border p-2 text-green-600 dark:text-green-400 font-bold text-white">★★★★★ {isZh ? '最佳' : 'Best'}</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-[#0a0a0a] border">
                    <td className="border p-2 font-bold text-white">GBP/USD</td>
                    <td className="border p-2 text-green-600 dark:text-green-400">0.3-0.8点</td>
                    <td className="border p-2 text-green-600 dark:text-green-400">{isZh ? '很高' : 'Very High'}</td>
                    <td className="border p-2 text-green-600 dark:text-green-400 font-bold text-white">★★★★★ {isZh ? '最佳' : 'Best'}</td>
                  </tr>
                  <tr className="border">
                    <td className="border p-2 font-bold text-white">USD/JPY</td>
                    <td className="border p-2 text-green-600 dark:text-green-400">0.2-0.5点</td>
                    <td className="border p-2 text-green-600 dark:text-green-400">{isZh ? '很高' : 'Very High'}</td>
                    <td className="border p-2 text-green-600 dark:text-green-400 font-bold text-white">★★★★☆ {isZh ? '优秀' : 'Excellent'}</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-[#0a0a0a] border">
                    <td className="border p-2 font-bold text-white">AUD/USD</td>
                    <td className="border p-2 text-yellow-600 dark:text-yellow-400">0.5-1.0点</td>
                    <td className="border p-2 text-yellow-600 dark:text-yellow-400">{isZh ? '中等' : 'Medium'}</td>
                    <td className="border p-2 text-yellow-600 dark:text-yellow-400">★★★☆☆ {isZh ? '可接受' : 'Acceptable'}</td>
                  </tr>
                  <tr className="border">
                    <td className="border p-2 font-bold text-white">EUR/GBP</td>
                    <td className="border p-2 text-red-600 dark:text-red-400">1.0-2.0点</td>
                    <td className="border p-2 text-yellow-600 dark:text-yellow-400">{isZh ? '中等' : 'Medium'}</td>
                    <td className="border p-2 text-red-600 dark:text-red-400">★★☆☆☆ {isZh ? '不推荐' : 'Not Recommended'}</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-[#0a0a0a] border">
                    <td className="border p-2 font-bold text-white">GBP/JPY</td>
                    <td className="border p-2 text-red-600 dark:text-red-400">1.5-3.0点</td>
                    <td className="border p-2 text-yellow-600 dark:text-yellow-400">{isZh ? '中等' : 'Medium'}</td>
                    <td className="border p-2 text-red-600 dark:text-red-400">★☆☆☆☆ {isZh ? '避免' : 'Avoid'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm">
              <strong className="text-white">{isZh ? '建议：' : 'Recommendation:'}</strong>{' '}
              {isZh
                ? '新手剥头皮交易者应专注于EUR/USD，等熟练后再考虑GBP/USD或USD/JPY。避免交叉盘和点差>1点的货币对。'
                : 'Beginner scalpers should focus on EUR/USD, consider GBP/USD or USD/JPY only after proficiency. Avoid cross pairs and pairs with spread >1 pip.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Execution Strategies */}
      <section id="execution-strategies" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '快速执行策略' : 'Fast Execution Strategies'}
        </h2>
        <div className="space-y-6">
          <p className="text-gray-300 dark:text-gray-300">
            {isZh
              ? '剥头皮交易的策略必须极其简单、清晰、可快速执行。复杂的多指标系统在M1/M5图表上完全不适用。以下是三种经过实战验证、最适合剥头皮的执行策略。'
              : 'Scalping strategies must be extremely simple, clear, quickly executable. Complex multi-indicator systems completely unsuitable on M1/M5 charts. Following are three battle-tested strategies best suited for scalping.'}
          </p>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '策略1：EMA快速反弹剥头皮' : 'Strategy 1: EMA Quick Bounce Scalping'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '在明确趋势中，价格短暂触及快速EMA后立即反弹，是最安全的剥头皮入场点。'
                  : 'In clear trend, price briefly touches fast EMA then immediately bounces, safest scalping entry point.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '设置与规则：' : 'Setup and Rules:'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '时间框架：' : 'Timeframe:'}</strong> M5
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '指标：' : 'Indicators:'}</strong> 8 EMA, 21 EMA
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '趋势确认：' : 'Trend Confirmation:'}</strong>{' '}
                    {isZh ? 'M15或H1确认趋势方向（价格在21 EMA上方=上升趋势）' : 'M15 or H1 confirm trend direction (price above 21 EMA = uptrend)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '做多入场：' : 'Long Entry:'}</strong>
                    <ul className="list-circle pl-6 mt-1 space-y-1">
                      <li className="text-gray-300">{isZh ? 'M15/H1确认上升趋势' : 'M15/H1 confirm uptrend'}</li>
                      <li className="text-gray-300">{isZh ? 'M5价格回调至8 EMA或21 EMA' : 'M5 price pulls back to 8 EMA or 21 EMA'}</li>
                      <li className="text-gray-300">{isZh ? '价格触及EMA后收出看涨K线（实体>3点）' : 'Price touches EMA then closes bullish candle (body >3 pips)'}</li>
                      <li className="text-gray-300">{isZh ? '下一根K线开盘价立即入场' : 'Enter at next candle open immediately'}</li>
                    </ul>
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '止损：' : 'Stop-Loss:'}</strong>{' '}
                    {isZh ? 'EMA下方5-8点，或最近低点下方3点' : '5-8 pips below EMA, or 3 pips below recent low'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '止盈：' : 'Take-Profit:'}</strong>{' '}
                    {isZh ? '固定10-15点，或2:1风险回报比' : 'Fixed 10-15 pips, or 2:1 risk-reward'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '持仓时间：' : 'Holding Time:'}</strong>{' '}
                    {isZh ? '通常5-15分钟，最多30分钟' : 'Typically 5-15 minutes, maximum 30 minutes'}
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-600">
                <p className="font-bold mb-2 text-white">{isZh ? '实战案例：' : 'Real Example:'}</p>
                <p className="text-sm text-gray-300 dark:text-gray-300">
                  {isZh
                    ? 'EUR/USD，欧洲时段（16:30），M15显示上升趋势，价格在20 EMA上方。M5图表价格从1.0950回调至8 EMA（1.0942），收出看涨Pin Bar。下一根K线1.0943入场，止损1.0935（8点），止盈1.0958（15点，1.875:1风险回报比）。持仓12分钟，价格触及1.0957，手动平仓，盈利14点。'
                    : 'EUR/USD, European session (16:30), M15 shows uptrend, price above 20 EMA. M5 chart price pulls back from 1.0950 to 8 EMA (1.0942), closes bullish Pin Bar. Next candle enters 1.0943, stop 1.0935 (8 pips), target 1.0958 (15 pips, 1.875:1 risk-reward). Held 12 minutes, price touched 1.0957, manually closed, profit 14 pips.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '策略2：支撑阻力反弹剥头皮' : 'Strategy 2: Support/Resistance Bounce Scalping'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '价格触及明显的支撑或阻力位后快速反弹，利用"碰撞反弹"效应剥头皮。'
                  : 'Price touches clear support or resistance then quickly bounces, exploiting "collision bounce" effect for scalping.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '设置与规则：' : 'Setup and Rules:'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '时间框架：' : 'Timeframe:'}</strong> M5 (M1 {isZh ? '辅助' : 'assist'})
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '关键位识别：' : 'Key Level Identification:'}</strong>{' '}
                    {isZh ? '在H1/H4图表标记明显的支撑/阻力位（至少2次触及）' : 'Mark clear support/resistance on H1/H4 charts (at least 2 touches)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '做多入场（支撑反弹）：' : 'Long Entry (Support Bounce):'}</strong>
                    <ul className="list-circle pl-6 mt-1 space-y-1">
                      <li className="text-gray-300">{isZh ? 'M5价格触及支撑位（误差不超过3点）' : 'M5 price touches support (tolerance within 3 pips)'}</li>
                      <li className="text-gray-300">{isZh ? '出现看涨反转K线（锤子线、Pin Bar、看涨吞没）' : 'Bullish reversal candle appears (hammer, pin bar, bullish engulfing)'}</li>
                      <li className="text-gray-300">{isZh ? 'M1确认价格开始反弹（2根看涨K线）' : 'M1 confirms price starting to bounce (2 bullish candles)'}</li>
                      <li className="text-gray-300">{isZh ? '立即入场' : 'Enter immediately'}</li>
                    </ul>
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '止损：' : 'Stop-Loss:'}</strong>{' '}
                    {isZh ? '支撑位下方5-10点' : '5-10 pips below support'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '止盈：' : 'Take-Profit:'}</strong>{' '}
                    {isZh ? '10-20点，或下一个阻力位' : '10-20 pips, or next resistance level'}
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '⚠️ 重要提示：' : '⚠️ Important Note:'}
                </p>
                <p className="text-sm text-gray-300 dark:text-gray-300">
                  {isZh
                    ? '支撑阻力剥头皮的成功率取决于关键位的质量。只选择"强支撑/阻力"：1) 至少被触及3次以上；2) 在H1或更高时间框架可见；3) 位于整数关口（如1.1000、148.00）；4) 与其他技术结构重合（趋势线、EMA）。弱支撑/阻力容易被突破，导致止损。'
                    : 'Success rate of support/resistance scalping depends on key level quality. Only choose "strong support/resistance": 1) Touched at least 3+ times; 2) Visible on H1 or higher timeframe; 3) At round numbers (e.g., 1.1000, 148.00); 4) Coincides with other technical structures (trendlines, EMA). Weak support/resistance easily breaks, causing stop-out.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '策略3：突破加速剥头皮' : 'Strategy 3: Breakout Acceleration Scalping'}</h3>
            <div className="space-y-3">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '价格突破短期盘整区间后，往往会加速运行一段距离，抓住这个瞬间可以快速获利。'
                  : 'After price breaks short-term consolidation range, often accelerates for a distance, catching this moment can quickly profit.'}
              </p>
              <div className="p-4 bg-[#0a0a0a] dark:bg-gray-900">
                <p className="font-bold mb-2 text-gray-300">{isZh ? '设置与规则：' : 'Setup and Rules:'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '时间框架：' : 'Timeframe:'}</strong> M5
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '盘整识别：' : 'Consolidation Identification:'}</strong>{' '}
                    {isZh ? '价格在M5形成明显横盘区间，持续至少30分钟-1小时，区间高度15-30点' : 'Price forms clear horizontal range on M5, lasting at least 30min-1hr, range height 15-30 pips'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '向上突破做多：' : 'Upward Breakout Long:'}</strong>
                    <ul className="list-circle pl-6 mt-1 space-y-1">
                      <li className="text-gray-300">{isZh ? '价格以强势K线（实体>5点）突破区间上沿' : 'Price breaks range top with strong candle (body >5 pips)'}</li>
                      <li className="text-gray-300">{isZh ? '突破K线收盘价在区间上沿之上至少3点' : 'Breakout candle close at least 3 pips above range top'}</li>
                      <li className="text-gray-300">{isZh ? '下一根K线开盘立即追入，或等待回测不破后入场' : 'Enter at next candle open immediately, or enter after retest holds'}</li>
                    </ul>
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '止损：' : 'Stop-Loss:'}</strong>{' '}
                    {isZh ? '区间上沿下方5点，或突破K线最低点下方' : '5 pips below range top, or below breakout candle low'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '止盈：' : 'Take-Profit:'}</strong>{' '}
                    {isZh ? '区间高度的1-1.5倍（例如区间20点，目标20-30点）' : '1-1.5x range height (e.g., 20 pip range, target 20-30 pips)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '持仓时间：' : 'Holding Time:'}</strong>{' '}
                    {isZh ? '10-30分钟，突破后通常快速达到目标' : '10-30 minutes, after breakout usually quickly reaches target'}
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-red-900/30 dark:bg-red-900/20 border-2 border-red-600 mt-3">
                <p className="font-bold mb-2 text-white">{isZh ? '❌ 避免假突破：' : '❌ Avoid False Breakouts:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '突破发生在新闻时段或低流动性时段→跳过' : 'Breakout during news or low liquidity → skip'}</li>
                  <li className="text-gray-300">{isZh ? '突破K线带长上影线（超过实体50%）→假突破概率高' : 'Breakout candle has long upper shadow (>50% of body) → high false breakout probability'}</li>
                  <li className="text-gray-300">{isZh ? '区间太窄（<15点）或持续时间太短（<30分钟）→不可靠' : 'Range too narrow (<15 pips) or duration too short (<30 min) → unreliable'}</li>
                  <li className="text-gray-300">{isZh ? '连续多次假突破后的再次突破→市场可能在诱多/诱空' : 'Breakout after multiple false breakouts → market may be trapping'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Case Studies */}
      <section id="case-studies" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '实战案例分析' : 'Real-World Case Studies'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '案例1：EUR/USD EMA反弹剥头皮（M5图）' : 'Case 1: EUR/USD EMA Bounce Scalping (M5 Chart)'}
            </h3>
            <div className="space-y-2 text-gray-300 dark:text-gray-300 text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '市场背景：' : 'Market Context:'}</strong>{' '}
                {isZh
                  ? '2024年1月10日，欧美重叠时段（北京时间21:15），EUR/USD处于明确上升趋势，H1图显示价格持续在20 EMA上方运行。'
                  : 'Jan 10, 2024, EU-US overlap (21:15 Beijing), EUR/USD in clear uptrend, H1 chart shows price consistently above 20 EMA.'}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '入场分析：' : 'Entry Analysis:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? 'H1确认上升趋势，价格从1.0900持续上涨至1.0945' : 'H1 confirms uptrend, price continuously rising from 1.0900 to 1.0945'}</li>
                <li className="text-gray-300">{isZh ? 'M5价格从1.0945回调至8 EMA（1.0938）' : 'M5 price pulls back from 1.0945 to 8 EMA (1.0938)'}</li>
                <li className="text-gray-300">{isZh ? '出现看涨锤子线，下影线长，实体位于K线上方' : 'Bullish hammer appears, long lower shadow, body at top'}</li>
                <li className="text-gray-300">{isZh ? '下一根M5开盘价1.0939入场' : 'Next M5 open 1.0939 entry'}</li>
                <li className="text-gray-300">{isZh ? '止损：1.0931（8 EMA下方8点）' : 'Stop: 1.0931 (8 pips below 8 EMA)'}</li>
                <li className="text-gray-300">{isZh ? '止盈：1.0951（12点目标）' : 'Target: 1.0951 (12 pips target)'}</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '交易结果：' : 'Trade Result:'}</strong>{' '}
                {isZh
                  ? '价格快速反弹，8分钟后触及止盈1.0951，盈利12点。风险8点，收益12点，风险回报比1:1.5。'
                  : 'Price quickly bounced, 8 minutes later hit target 1.0951, profit 12 pips. Risk 8 pips, reward 12 pips, 1:1.5 risk-reward.'}
              </p>
              <p className="text-green-600 dark:text-green-400 font-bold mt-2">
                {isZh ? '✅ 成功因素：顺势交易 + 强支撑（8 EMA） + 明确反转信号 + 快速执行' : '✅ Success Factors: With-trend trading + Strong support (8 EMA) + Clear reversal signal + Fast execution'}
              </p>
            </div>
          </div>

          <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '案例2：GBP/USD突破加速剥头皮（M5图）' : 'Case 2: GBP/USD Breakout Acceleration Scalping (M5 Chart)'}
            </h3>
            <div className="space-y-2 text-gray-300 dark:text-gray-300 text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '市场背景：' : 'Market Context:'}</strong>{' '}
                {isZh
                  ? '2024年1月12日，伦敦开盘时段（北京16:05），GBP/USD在1.2680-1.2700区间横盘45分钟。'
                  : 'Jan 12, 2024, London open (16:05 Beijing), GBP/USD ranging 1.2680-1.2700 for 45 minutes.'}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '入场分析：' : 'Entry Analysis:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? 'M5识别明确横盘区间：1.2680-1.2700（20点高度），持续45分钟' : 'M5 identifies clear range: 1.2680-1.2700 (20 pip height), lasting 45 minutes'}</li>
                <li className="text-gray-300">{isZh ? '价格以大阳线突破1.2700，实体8点，收盘1.2708' : 'Price breaks 1.2700 with large bullish candle, 8 pip body, close 1.2708'}</li>
                <li className="text-gray-300">{isZh ? '下一根K线开盘1.2709追入' : 'Next candle open 1.2709 chase entry'}</li>
                <li className="text-gray-300">{isZh ? '止损：1.2695（区间上沿下方5点）' : 'Stop: 1.2695 (5 pips below range top)'}</li>
                <li className="text-gray-300">{isZh ? '止盈：1.2730（区间高度1倍=20点）' : 'Target: 1.2730 (1x range height = 20 pips)'}</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '交易结果：' : 'Trade Result:'}</strong>{' '}
                {isZh
                  ? '价格加速上涨，15分钟后触及1.2728，手动平仓，盈利19点。风险14点，收益19点，风险回报比1:1.36。'
                  : 'Price accelerated up, 15 minutes later reached 1.2728, manually closed, profit 19 pips. Risk 14 pips, reward 19 pips, 1:1.36 risk-reward.'}
              </p>
              <p className="text-green-600 dark:text-green-400 font-bold mt-2">
                {isZh ? '✅ 成功因素：充分盘整 + 强势突破 + 伦敦开盘高流动性 + 快速止盈' : '✅ Success Factors: Adequate consolidation + Strong breakout + London open high liquidity + Quick profit-taking'}
              </p>
            </div>
          </div>

          <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '案例3：USD/JPY过度交易失败教训（M1图）' : 'Case 3: USD/JPY Overtrading Failure Lesson (M1 Chart)'}
            </h3>
            <div className="space-y-2 text-gray-300 dark:text-gray-300 text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '市场背景：' : 'Market Context:'}</strong>{' '}
                {isZh
                  ? '2024年1月15日，亚洲午间时段（北京13:30），USD/JPY在147.50-147.70窄幅震荡，交易者试图频繁剥头皮。'
                  : 'Jan 15, 2024, Asian afternoon (13:30 Beijing), USD/JPY ranging narrowly 147.50-147.70, trader attempted frequent scalping.'}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '错误操作：' : 'Wrong Operations:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? '在低流动性时段交易（亚洲午间）' : 'Trading during low liquidity session (Asian afternoon)'}</li>
                <li className="text-gray-300">{isZh ? '使用M1图表，市场噪音极大，信号混乱' : 'Using M1 chart, extreme market noise, confused signals'}</li>
                <li className="text-gray-300">{isZh ? '2小时内执行15笔交易，胜7笔亏8笔' : '15 trades in 2 hours, 7 wins 8 losses'}</li>
                <li className="text-gray-300">{isZh ? '每笔盈利平均5点，每笔亏损平均6点' : 'Average profit 5 pips, average loss 6 pips'}</li>
                <li className="text-gray-300">{isZh ? '点差0.5点 × 15笔 = 7.5点成本' : 'Spread 0.5 pips × 15 trades = 7.5 pips cost'}</li>
                <li className="text-gray-300">{isZh ? '手续费$3.5/手 × 0.1手 × 15笔 = $5.25' : 'Commission $3.5/lot × 0.1 lot × 15 trades = $5.25'}</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '最终结果：' : 'Final Result:'}</strong>{' '}
                {isZh
                  ? '毛利润：7×5 - 8×6 = 35 - 48 = -13点；扣除成本：-13 - 7.5 = -20.5点；金额：-$20.50 - $5.25 = -$25.75。2小时亏损$25.75，心理疲惫，情绪失控。'
                  : 'Gross profit: 7×5 - 8×6 = 35 - 48 = -13 pips; After costs: -13 - 7.5 = -20.5 pips; Amount: -$20.50 - $5.25 = -$25.75. 2 hours loss $25.75, psychological exhaustion, emotional loss of control.'}
              </p>
              <p className="text-red-600 dark:text-red-400 font-bold mt-2">
                {isZh ? '❌ 错误分析：' : '❌ Error Analysis:'}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? '错误时段：在亚洲午间低流动性时段交易' : 'Wrong session: trading during Asian afternoon low liquidity'}</li>
                <li className="text-gray-300">{isZh ? '过度交易：2小时15笔交易，完全失去纪律和策略' : 'Overtrading: 15 trades in 2 hours, completely lost discipline and strategy'}</li>
                <li className="text-gray-300">{isZh ? '成本失控：交易成本占总亏损的37%' : 'Cost out of control: trading costs account for 37% of total loss'}</li>
                <li className="text-gray-300">{isZh ? '使用M1图表：噪音太大，假信号频繁，不适合人工剥头皮' : 'Using M1 chart: too much noise, frequent false signals, unsuitable for manual scalping'}</li>
                <li className="text-gray-300">{isZh ? '正确做法：等待欧洲或美国开盘，使用M5图表，限制每天最多5-10笔交易' : 'Correct approach: wait for Europe or US open, use M5 chart, limit to maximum 5-10 trades daily'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Common Mistakes */}
      <section id="common-mistakes" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '常见错误与规避方法' : 'Common Mistakes and Solutions'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误1：在错误经纪商处剥头皮' : 'Mistake 1: Scalping with Wrong Broker'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '使用做市商（Market Maker）或点差>1点的经纪商进行剥头皮交易，导致每笔交易成本过高，即使胜率60%也可能亏损。'
                : 'Scalping with Market Maker or brokers with spread >1 pip, causing excessive per-trade cost, may lose even with 60% win rate.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '必须选择ECN/STP经纪商，主要特征：1) EUR/USD点差0.0-0.5点；2) 执行速度<50毫秒；3) 明确允许剥头皮交易（部分经纪商禁止）；4) 无重新报价（No Re-quote）；5) 手续费透明（通常$3-7/标准手往返）。推荐使用VPS服务器部署在经纪商服务器附近（伦敦、纽约），降低网络延迟至10-20毫秒。'
                : 'Must choose ECN/STP broker with main features: 1) EUR/USD spread 0.0-0.5 pips; 2) Execution speed <50ms; 3) Explicitly allows scalping (some brokers prohibit); 4) No re-quotes; 5) Transparent commission (typically $3-7/lot round-turn). Recommend using VPS server deployed near broker server (London, New York), reduce network latency to 10-20ms.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误2：追求过小的目标利润' : 'Mistake 2: Pursuing Too Small Target Profits'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '设定3-5点的目标利润，但忽略了点差、手续费、滑点的总成本可能达到1-2点，实际净利润只有1-3点，风险回报比极差。'
                : 'Setting 3-5 pip target profits, but ignoring that spread, commission, slippage total cost may reach 1-2 pips, actual net profit only 1-3 pips, extremely poor risk-reward ratio.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '目标利润必须至少是总交易成本的3-5倍。假设总成本1.5点（点差0.5+手续费0.7+滑点0.3），目标利润应至少5-8点，加上5-8点止损，风险回报比才能达到1:1或更好。永远记住：剥头皮不是赚取1-2点的游戏，而是通过频繁交易累积10-20点利润的策略。单笔目标太小，成本会吃光所有利润。'
                : 'Target profit must be at least 3-5x total trading cost. Assuming total cost 1.5 pips (spread 0.5+commission 0.7+slippage 0.3), target profit should be at least 5-8 pips, plus 5-8 pip stop, to achieve 1:1 or better risk-reward ratio. Always remember: scalping is not a game of making 1-2 pips, but a strategy of accumulating 10-20 pip profits through frequent trading. Target too small, costs consume all profits.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误3：情绪化连续交易' : 'Mistake 3: Emotional Continuous Trading'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '连续止损2-3次后，交易者试图"赚回来"，开始频繁开仓、增加仓位、忽略信号质量，最终导致更大亏损和心理崩溃。'
                : 'After 2-3 consecutive stops, trader tries to "win it back", starts frequent opening, increasing positions, ignoring signal quality, eventually causing larger losses and psychological breakdown.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '设定严格的"熔断规则"：1) 连续2次止损后，休息15-30分钟，离开屏幕；2) 单日亏损达到账户3%，立即停止交易，当天不再开仓；3) 连续3天亏损，休息2-3天，重新评估策略；4) 永远不要增加仓位试图"扳回来"，这是赌徒行为。剥头皮交易的成功来自一致性和纪律，而非孤注一掷。记住：保护本金比赚钱更重要，活下来才有机会盈利。'
                : 'Set strict "circuit breaker rules": 1) After 2 consecutive stops, rest 15-30 minutes, leave screen; 2) Daily loss reaches 3% of account, stop trading immediately, no more positions today; 3) After 3 consecutive losing days, rest 2-3 days, re-evaluate strategy; 4) Never increase position trying to "win back", this is gambling behavior. Scalping success comes from consistency and discipline, not all-in bets. Remember: protecting capital more important than making money, survival creates opportunity for profit.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误4：持仓时间过长' : 'Mistake 4: Holding Positions Too Long'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '价格朝盈利方向运行，接近止盈目标，但交易者贪婪地想"多赚一点"，结果价格反转，盈利变亏损。或者持仓超过30分钟，变成日内交易。'
                : 'Price moves in profit direction, approaches target, but trader greedily wants "a bit more", result is price reverses, profit becomes loss. Or holding beyond 30 minutes, becomes day trading.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '剥头皮交易的黄金法则：见好就收，绝不贪婪。具体执行：1) 达到止盈目标（10-15点）立即平仓，不要犹豫；2) 设定最大持仓时间（如20分钟），超时无论盈亏都平仓；3) 价格朝盈利方向运行50%后（如目标10点，盈利5点时），将止损移至盈亏平衡点，锁定无风险交易；4) 使用"时间止损"：如果10分钟内价格没有明显朝目标运行，平仓退出，可能是信号错误。剥头皮不是趋势跟踪，不要幻想"让利润奔跑"，快进快出才是核心。'
                : 'Golden rule of scalping: quit while ahead, never be greedy. Specific execution: 1) Upon reaching profit target (10-15 pips), close immediately, no hesitation; 2) Set maximum holding time (e.g., 20 minutes), close position regardless of profit/loss when time expires; 3) After price moves 50% toward profit (e.g., 10 pip target, at 5 pip profit), move stop to breakeven, lock risk-free trade; 4) Use "time stop": if price doesn\'t clearly move toward target within 10 minutes, close and exit, may be wrong signal. Scalping is not trend following, don\'t fantasize "letting profits run", quick in-and-out is the core.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Cost Management */}
      <section id="cost-management" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '成本控制要点' : 'Cost Control Essentials'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '剥头皮交易成本控制三大原则' : 'Three Cost Control Principles for Scalping'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 降低单笔成本：' : '1. Reduce Per-Trade Cost:'}</strong>{' '}
                {isZh
                  ? '选择最低点差经纪商（ECN，0.0-0.3点），协商更低手续费（大客户可降至$2-3/手），使用限价单减少滑点。'
                  : 'Choose lowest spread broker (ECN, 0.0-0.3 pips), negotiate lower commission (large clients can reduce to $2-3/lot), use limit orders to reduce slippage.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 提高单笔盈利：' : '2. Increase Per-Trade Profit:'}</strong>{' '}
                {isZh
                  ? '目标利润至少10-15点，覆盖成本后仍有净利润5-10点。避免追求3-5点的"蚊子肉"利润。'
                  : 'Target profit minimum 10-15 pips, after covering costs still net profit 5-10 pips. Avoid chasing 3-5 pip "mosquito meat" profits.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 减少无效交易：' : '3. Reduce Invalid Trades:'}</strong>{' '}
                {isZh
                  ? '质量优于数量。每天5-10笔高质量交易，胜率60%，远好于20-30笔低质量交易，胜率40%。'
                  : 'Quality over quantity. Daily 5-10 high-quality trades with 60% win rate far better than 20-30 low-quality trades with 40% win rate.'}
              </li>
            </ul>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '剥头皮交易盈亏平衡计算' : 'Scalping Break-Even Calculation'}
            </h3>
            <div className="space-y-3">
              <p className="font-bold text-white">{isZh ? '假设条件：' : 'Assumptions:'}</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? '交易EUR/USD，0.1标准手' : 'Trading EUR/USD, 0.1 standard lot'}</li>
                <li className="text-gray-300">{isZh ? '点差：0.5点 = $0.50' : 'Spread: 0.5 pips = $0.50'}</li>
                <li className="text-gray-300">{isZh ? '手续费：$3.5/标准手往返 = $0.35' : 'Commission: $3.5/lot round-turn = $0.35'}</li>
                <li className="text-gray-300">{isZh ? '平均滑点：0.3点 = $0.30' : 'Average slippage: 0.3 pips = $0.30'}</li>
                <li className="text-gray-300">{isZh ? '单笔总成本：$1.15' : 'Total per-trade cost: $1.15'}</li>
                <li className="text-gray-300">{isZh ? '目标利润：10点 = $10' : 'Target profit: 10 pips = $10'}</li>
                <li className="text-gray-300">{isZh ? '止损：8点 = $8' : 'Stop-loss: 8 pips = $8'}</li>
              </ul>
              <div className="p-4 bg-gray-100 dark:bg-[#0a0a0a] mt-3">
                <p className="font-bold mb-2 text-white">{isZh ? '盈亏平衡胜率计算：' : 'Break-Even Win Rate Calculation:'}</p>
                <p className="font-mono text-sm">
                  {isZh
                    ? '每笔盈利：$10 - $1.15 = $8.85（净利润）'
                    : 'Per winning trade: $10 - $1.15 = $8.85 (net profit)'}
                </p>
                <p className="font-mono text-sm">
                  {isZh
                    ? '每笔亏损：$8 + $1.15 = $9.15（净亏损）'
                    : 'Per losing trade: $8 + $1.15 = $9.15 (net loss)'}
                </p>
                <p className="font-mono text-sm font-bold mt-2 text-white">
                  {isZh
                    ? '盈亏平衡胜率 = $9.15 / ($8.85 + $9.15) = 50.8%'
                    : 'Break-even win rate = $9.15 / ($8.85 + $9.15) = 50.8%'}
                </p>
                <p className="mt-3 text-sm">
                  <strong className="text-white">{isZh ? '结论：' : 'Conclusion:'}</strong>{' '}
                  {isZh
                    ? '在这个成本结构下，胜率必须超过51%才能开始盈利。如果胜率只有50%，长期将亏损。要实现10%的月收益率，胜率需达到60-65%。'
                    : 'Under this cost structure, win rate must exceed 51% to start profiting. If win rate only 50%, long-term will lose. To achieve 10% monthly return, win rate needs to reach 60-65%.'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '降低成本的实用方法' : 'Practical Cost Reduction Methods'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '对比至少3家ECN经纪商，选择点差和手续费最低的' : 'Compare at least 3 ECN brokers, choose lowest spread and commission'}</li>
                <li className="text-gray-300">{isZh ? '增加交易量可协商更低手续费（如月成交50手以上）' : 'Higher volume can negotiate lower commission (e.g., 50+ lots monthly)'}</li>
                <li className="text-gray-300">{isZh ? '使用限价单而非市价单，避免滑点' : 'Use limit orders not market orders, avoid slippage'}</li>
                <li className="text-gray-300">{isZh ? '避免在点差扩大时段交易（新闻、开盘）' : 'Avoid trading during spread-widening periods (news, open)'}</li>
                <li className="text-gray-300">{isZh ? '专注于点差最低的货币对（EUR/USD、GBP/USD）' : 'Focus on lowest spread pairs (EUR/USD, GBP/USD)'}</li>
                <li className="text-gray-300">{isZh ? '使用返佣（Cashback）计划，降低实际成本' : 'Use cashback programs to reduce actual costs'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '提高胜率的关键方法' : 'Key Methods to Improve Win Rate'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '只在最佳时段交易（欧美重叠期）' : 'Trade only during best sessions (EU-US overlap)'}</li>
                <li className="text-gray-300">{isZh ? '只做顺势交易，避免逆势抄底/摸顶' : 'Only trade with trend, avoid counter-trend catching knives'}</li>
                <li className="text-gray-300">{isZh ? '等待高质量信号，不要冲动开仓' : 'Wait for high-quality signals, don\'t open impulsively'}</li>
                <li className="text-gray-300">{isZh ? '使用多时间框架确认（H1趋势 + M5入场）' : 'Use multiple timeframe confirmation (H1 trend + M5 entry)'}</li>
                <li className="text-gray-300">{isZh ? '记录交易日志，分析成功/失败交易的共同特征' : 'Keep trading journal, analyze common characteristics of winning/losing trades'}</li>
                <li className="text-gray-300">{isZh ? '限制每天交易次数（5-10笔），避免过度交易' : 'Limit daily trades (5-10), avoid overtrading'}</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '给剥头皮新手的最后忠告' : 'Final Advice for Scalping Beginners'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                {isZh
                  ? '剥头皮交易是外汇市场中最困难、失败率最高的交易方式。据统计，95-99%的剥头皮交易者最终亏损或放弃。不是因为策略不好，而是因为：1) 交易成本太高，吃掉大部分利润；2) 心理压力巨大，难以长期承受；3) 市场噪音太大，假信号频繁；4) 过度交易和情绪失控是常态。'
                  : 'Scalping is the most difficult, highest failure rate trading style in forex. Statistics show 95-99% of scalpers eventually lose or quit. Not because strategies are bad, but because: 1) Trading costs too high, consume most profits; 2) Enormous psychological pressure, hard to sustain long-term; 3) Too much market noise, frequent false signals; 4) Overtrading and emotional loss of control are the norm.'}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '建议：' : 'Recommendation:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-gray-300">{isZh ? '如果你是新手（<1年经验），完全不要尝试剥头皮，从波段或日内交易开始' : 'If beginner (<1 year experience), absolutely don\'t attempt scalping, start with swing or day trading'}</li>
                <li className="text-gray-300">{isZh ? '如果你是中级交易者（1-3年），先在模拟账户中测试至少3个月，确保胜率>60%后再用实盘小仓位尝试' : 'If intermediate trader (1-3 years), test in demo account at least 3 months, ensure win rate >60% before trying real account with small position'}</li>
                <li className="text-gray-300">{isZh ? '如果你已经在日内交易中稳定盈利，可以尝试剥头皮，但初期仓位不要超过日内交易的50%' : 'If already consistently profitable in day trading, can try scalping, but initial position not exceeding 50% of day trading'}</li>
                <li className="text-gray-300">{isZh ? '永远记住：剥头皮不是快速致富的捷径，而是一条充满荆棘、失败率极高的道路。只有极少数交易者能在剥头皮中生存并盈利' : 'Always remember: scalping is not a shortcut to quick riches, but a path full of thorns with extremely high failure rate. Only very few traders can survive and profit in scalping'}</li>
              </ul>
              <p className="font-bold mt-3 text-white">
                {isZh
                  ? '最后：如果你在模拟账户中无法持续盈利，就不要用真钱尝试。保护本金永远是第一要务。'
                  : 'Finally: if you cannot consistently profit in demo account, don\'t try with real money. Protecting capital is always the first priority.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
