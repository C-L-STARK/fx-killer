import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { dayTradingContent } from '@/content/education/day-trading.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    dayTradingContent.zh.title,
    dayTradingContent.en.title,
    dayTradingContent.zh.description,
    dayTradingContent.en.description,
    dayTradingContent.zh.keywords,
    dayTradingContent.en.keywords,
    lang
  );
}

export default async function DayTradingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = dayTradingContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: What is Day Trading */}
      <section id="what-is-day-trading" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '什么是日内交易？' : 'What is Day Trading?'}
        </h2>
        <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '日内交易（Day Trading），又称即日交易或当日冲销，是指在同一个交易日内完成买入和卖出操作，不持仓过夜的交易方式。日内交易者通过捕捉市场的短期波动获利，通常持仓时间从几分钟到几小时不等，目标是利用日内价格波动赚取小幅但频繁的利润。'
              : 'Day Trading, also known as intraday trading, refers to buying and selling within the same trading day without holding positions overnight. Day traders profit from short-term market movements, typically holding positions from minutes to hours, aiming to capture small but frequent profits from intraday price fluctuations.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '日内交易的核心特征' : 'Core Characteristics of Day Trading'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 当日平仓：' : '1. Close Within Day:'}</strong>{' '}
                {isZh
                  ? '所有仓位必须在交易日结束前平仓，避免隔夜风险（跳空、利息成本）'
                  : 'All positions must close before trading day ends, avoiding overnight risks (gaps, swap charges)'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 短期持仓：' : '2. Short Holding Period:'}</strong>{' '}
                {isZh
                  ? '持仓时间通常1-8小时，最长不超过一个交易日'
                  : 'Holding period typically 1-8 hours, maximum one trading day'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 高频交易：' : '3. High Frequency:'}</strong>{' '}
                {isZh
                  ? '日内交易者每天可能执行1-10笔交易，追求累积小幅盈利'
                  : 'Day traders may execute 1-10 trades daily, pursuing cumulative small profits'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 技术主导：' : '4. Technical Focus:'}</strong>{' '}
                {isZh
                  ? '主要依赖技术分析（图表、指标），较少关注基本面因素'
                  : 'Primarily relies on technical analysis (charts, indicators), less focus on fundamentals'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '5. 严格纪律：' : '5. Strict Discipline:'}</strong>{' '}
                {isZh
                  ? '需要严格的止损、止盈规则和仓位管理，情绪控制至关重要'
                  : 'Requires strict stop-loss, take-profit rules and position management, emotional control crucial'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '日内交易的优势' : 'Advantages of Day Trading'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '无隔夜风险：' : 'No overnight risk:'}</strong>{' '}
                {isZh ? '避免市场跳空、重大新闻事件和隔夜利息成本' : 'Avoid market gaps, major news events, and swap charges'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '机会丰富：' : 'Abundant opportunities:'}</strong>{' '}
                {isZh ? '每个交易日都有多次交易机会，可快速积累经验' : 'Multiple trading opportunities each day, rapidly accumulate experience'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '快速反馈：' : 'Quick feedback:'}</strong>{' '}
                {isZh ? '交易结果当天就能看到，有利于快速调整策略' : 'Trade results visible same day, facilitates quick strategy adjustments'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '资金利用率高：' : 'High capital efficiency:'}</strong>{' '}
                {isZh ? '可以重复使用同一笔资金进行多次交易，提高收益率' : 'Can reuse same capital for multiple trades, improving returns'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '时间灵活：' : 'Time flexibility:'}</strong>{' '}
                {isZh ? '可以选择特定时段交易（如欧美盘重叠期），无需全天盯盘' : 'Can choose specific sessions (e.g., EU-US overlap), no need to watch all day'}
              </li>
            </ul>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '日内交易的挑战' : 'Challenges of Day Trading'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '心理压力大：' : 'High psychological pressure:'}</strong>{' '}
                {isZh ? '需要长时间盯盘，快速决策，容易产生焦虑和疲劳' : 'Requires long screen time, quick decisions, easily causes anxiety and fatigue'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '交易成本高：' : 'High trading costs:'}</strong>{' '}
                {isZh ? '频繁交易导致点差和手续费累积，需要更高胜率覆盖成本' : 'Frequent trading accumulates spreads and commissions, needs higher win rate to cover costs'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '噪音干扰多：' : 'More noise interference:'}</strong>{' '}
                {isZh ? '短周期图表包含大量市场噪音，容易产生假信号' : 'Short timeframe charts contain significant market noise, easily produce false signals'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '技能要求高：' : 'High skill requirement:'}</strong>{' '}
                {isZh ? '需要扎实的技术分析功底、快速的反应能力和严格的纪律' : 'Requires solid technical analysis skills, quick response ability, strict discipline'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '时间投入多：' : 'High time commitment:'}</strong>{' '}
                {isZh ? '需要每天投入2-6小时盯盘时间，不适合兼职交易者' : 'Needs 2-6 hours daily screen time, unsuitable for part-time traders'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '日内交易适合谁？' : 'Who is Day Trading Suitable For?'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300">
              {isZh
                ? '日内交易适合：1) 有充足时间盯盘的全职交易者；2) 情绪稳定、能快速决策的交易者；3) 喜欢短期收益、不愿承担隔夜风险的交易者；4) 有一定技术分析基础的中级交易者。不适合：1) 时间有限的兼职交易者；2) 情绪波动大、易冲动的交易者；3) 缺乏纪律和耐心的新手；4) 追求一夜暴富的赌徒心态者。'
                : 'Day trading suits: 1) Full-time traders with sufficient screen time; 2) Emotionally stable traders capable of quick decisions; 3) Traders preferring short-term gains without overnight risk; 4) Intermediate traders with technical analysis foundation. Not suitable for: 1) Part-time traders with limited time; 2) Emotionally volatile, impulsive traders; 3) Beginners lacking discipline and patience; 4) Gamblers seeking overnight riches.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Timeframes */}
      <section id="timeframes" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '日内交易时间框架选择' : 'Day Trading Timeframe Selection'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '时间框架的选择直接影响交易频率、持仓时间和心理压力。日内交易者通常使用M5、M15、H1三种时间框架，配合H4或D1图表确认趋势方向。'
              : 'Timeframe selection directly affects trading frequency, holding period, and psychological pressure. Day traders typically use M5, M15, H1 timeframes, combined with H4 or D1 charts to confirm trend direction.'}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-800">
              <thead>
                <tr className="bg-gray-900 text-gray-300">
                  <th className="border border-gray-800 p-3 text-left">
                    {isZh ? '时间框架' : 'Timeframe'}
                  </th>
                  <th className="border border-gray-800 p-3 text-left">
                    {isZh ? '持仓时间' : 'Holding Period'}
                  </th>
                  <th className="border border-gray-800 p-3 text-left">
                    {isZh ? '目标利润' : 'Target Profit'}
                  </th>
                  <th className="border border-gray-800 p-3 text-left">
                    {isZh ? '止损设置' : 'Stop-Loss'}
                  </th>
                  <th className="border border-gray-800 p-3 text-left">
                    {isZh ? '适合交易者' : 'Suitable For'}
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-300">
                <tr className="border border-gray-800">
                  <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">M5 (5分钟)</td>
                  <td className="border border-gray-800 p-3 text-gray-300">
                    {isZh ? '15-60分钟' : '15-60 minutes'}
                  </td>
                  <td className="border border-gray-800 p-3 text-gray-300">
                    {isZh ? '10-20点' : '10-20 pips'}
                  </td>
                  <td className="border border-gray-800 p-3 text-gray-300">
                    {isZh ? '10-15点' : '10-15 pips'}
                  </td>
                  <td className="border border-gray-800 p-3 text-gray-300">
                    {isZh ? '激进型，快速反应' : 'Aggressive, quick response'}
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-800">
                  <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">M15 (15分钟)</td>
                  <td className="border border-gray-800 p-3 text-gray-300">
                    {isZh ? '1-3小时' : '1-3 hours'}
                  </td>
                  <td className="border border-gray-800 p-3 text-gray-300">
                    {isZh ? '20-40点' : '20-40 pips'}
                  </td>
                  <td className="border border-gray-800 p-3 text-gray-300">
                    {isZh ? '20-30点' : '20-30 pips'}
                  </td>
                  <td className="border border-gray-800 p-3 text-gray-300">
                    {isZh ? '平衡型，最常用' : 'Balanced, most common'}
                  </td>
                </tr>
                <tr className="border border-gray-800">
                  <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">H1 (1小时)</td>
                  <td className="border border-gray-800 p-3 text-gray-300">
                    {isZh ? '2-8小时' : '2-8 hours'}
                  </td>
                  <td className="border border-gray-800 p-3 text-gray-300">
                    {isZh ? '40-80点' : '40-80 pips'}
                  </td>
                  <td className="border border-gray-800 p-3 text-gray-300">
                    {isZh ? '30-50点' : '30-50 pips'}
                  </td>
                  <td className="border border-gray-800 p-3 text-gray-300">
                    {isZh ? '保守型，信号可靠' : 'Conservative, reliable signals'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '多时间框架分析法' : 'Multiple Timeframe Analysis'}</h3>
            <p className="mb-3">
              {isZh
                ? '专业日内交易者通常使用"三重时间框架"方法：'
                : 'Professional day traders typically use "triple timeframe" method:'}
            </p>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 趋势框架（H4/D1）：' : '1. Trend Timeframe (H4/D1):'}</strong>{' '}
                {isZh
                  ? '确认市场主趋势方向，只顺势交易。例如，H4上升趋势中只找做多机会。'
                  : 'Confirm main market trend direction, trade only with trend. E.g., in H4 uptrend only look for long opportunities.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 信号框架（M15/H1）：' : '2. Signal Timeframe (M15/H1):'}</strong>{' '}
                {isZh
                  ? '在趋势方向上寻找具体入场信号（如突破、反弹、指标交叉）。'
                  : 'Find specific entry signals in trend direction (breakouts, bounces, indicator crosses).'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 执行框架（M5）：' : '3. Execution Timeframe (M5):'}</strong>{' '}
                {isZh
                  ? '精确入场点，降低滑点和风险。在M15出现信号后，切换到M5寻找最佳入场时机。'
                  : 'Precise entry point, reduce slippage and risk. After M15 signal, switch to M5 for optimal entry timing.'}
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? 'M5图表优缺点' : 'M5 Chart Pros & Cons'}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-green-600 dark:text-green-400">
                  <strong className="text-white">{isZh ? '✅ 优势：' : '✅ Advantages:'}</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-gray-300">{isZh ? '交易机会最多，每天可执行5-10笔交易' : 'Most opportunities, 5-10 trades daily'}</li>
                  <li className="text-gray-300">{isZh ? '精确入场，可最小化滑点' : 'Precise entry, minimize slippage'}</li>
                  <li className="text-gray-300">{isZh ? '快速止损，单笔风险小' : 'Quick stops, small per-trade risk'}</li>
                </ul>
                <p className="text-red-600 dark:text-red-400 mt-3">
                  <strong className="text-white">{isZh ? '❌ 劣势：' : '❌ Disadvantages:'}</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-gray-300">{isZh ? '市场噪音最大，假信号频繁' : 'Most market noise, frequent false signals'}</li>
                  <li className="text-gray-300">{isZh ? '心理压力极大，需高度专注' : 'Extreme psychological pressure, high focus needed'}</li>
                  <li className="text-gray-300">{isZh ? '点差成本占比高' : 'High spread cost proportion'}</li>
                </ul>
              </div>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? 'H1图表优缺点' : 'H1 Chart Pros & Cons'}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-green-600 dark:text-green-400">
                  <strong className="text-white">{isZh ? '✅ 优势：' : '✅ Advantages:'}</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-gray-300">{isZh ? '信号更可靠，假信号少' : 'More reliable signals, fewer fakes'}</li>
                  <li className="text-gray-300">{isZh ? '心理压力小，无需持续盯盘' : 'Less psychological pressure, no constant monitoring'}</li>
                  <li className="text-gray-300">{isZh ? '单笔利润空间大（40-80点）' : 'Larger profit potential (40-80 pips)'}</li>
                </ul>
                <p className="text-red-600 dark:text-red-400 mt-3">
                  <strong className="text-white">{isZh ? '❌ 劣势：' : '❌ Disadvantages:'}</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-gray-300">{isZh ? '交易机会少，每天1-3笔' : 'Fewer opportunities, 1-3 trades daily'}</li>
                  <li className="text-gray-300">{isZh ? '止损较大（30-50点）' : 'Larger stops (30-50 pips)'}</li>
                  <li className="text-gray-300">{isZh ? '持仓时间长，可能接近波段交易' : 'Longer holding period, approaching swing trading'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-[#0a0a0a] border-l-4 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '新手建议' : 'Beginner Recommendation'}
            </h3>
            <p className="text-gray-300">
              {isZh
                ? '建议新手从H1图表开始学习日内交易。H1图表提供更清晰的趋势信号，市场噪音较少，给予足够时间思考和决策。经过3-6个月实践后，如果能保持稳定盈利，再考虑过渡到M15或M5图表。记住：使用更短的时间框架并不能让你赚得更快，反而可能因为假信号和过度交易导致亏损。'
                : 'Recommend beginners start with H1 charts for day trading. H1 charts provide clearer trend signals, less market noise, sufficient time for thinking and decision-making. After 3-6 months practice, if maintaining consistent profits, consider transitioning to M15 or M5 charts. Remember: using shorter timeframes won\'t make you profit faster, may actually cause losses due to false signals and overtrading.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Entry and Exit Strategies */}
      <section id="entry-exit" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '入场与出场策略' : 'Entry and Exit Strategies'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '策略1：趋势跟踪入场' : 'Strategy 1: Trend Following Entry'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '在明确趋势中，等待价格回调至关键支撑/阻力位或移动平均线后入场，顺势而为。这是日内交易最安全、胜率最高的策略。'
                  : 'In clear trends, wait for price to pull back to key support/resistance or moving averages before entry, trading with trend. This is the safest, highest win rate day trading strategy.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '上升趋势做多设置：' : 'Uptrend Long Setup:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? 'H4/D1确认上升趋势（价格在20/50 EMA上方）' : 'H4/D1 confirm uptrend (price above 20/50 EMA)'}</li>
                  <li className="text-gray-300">{isZh ? 'H1图表价格回调至20 EMA或前高支撑位' : 'H1 chart price pulls back to 20 EMA or previous high support'}</li>
                  <li className="text-gray-300">{isZh ? '出现看涨反转信号（锤子线、Pin Bar、MACD金叉）' : 'Bullish reversal signal appears (hammer, pin bar, MACD golden cross)'}</li>
                  <li className="text-gray-300">{isZh ? 'M15确认价格开始反弹（收出看涨K线）' : 'M15 confirms price starting to bounce (bullish candle closes)'}</li>
                  <li className="text-gray-300">{isZh ? '入场：下一根M15开盘价或突破前高' : 'Entry: next M15 open or break above previous high'}</li>
                  <li className="text-gray-300">{isZh ? '止损：支撑位下方20-30点或EMA下方' : 'Stop: 20-30 pips below support or below EMA'}</li>
                  <li className="text-gray-300">{isZh ? '止盈：前高阻力位或风险回报比1:2' : 'Target: previous high resistance or 1:2 risk-reward'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '策略2：突破交易' : 'Strategy 2: Breakout Trading'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '价格突破关键阻力/支撑位、趋势线或区间边界后，通常会延续突破方向运行一段时间，这是捕捉强劲走势的机会。'
                  : 'After price breaks key resistance/support, trendlines, or range boundaries, typically continues in breakout direction, opportunity to catch strong moves.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '向上突破做多：' : 'Upward Breakout Long:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '识别关键阻力位（前高、整数关口、趋势线）' : 'Identify key resistance (previous high, round number, trendline)'}</li>
                  <li className="text-gray-300">{isZh ? '价格以强势K线突破阻力，收盘价在阻力上方' : 'Price breaks resistance with strong candle, close above resistance'}</li>
                  <li className="text-gray-300">{isZh ? '成交量放大（如有数据）或波动性增加' : 'Volume increases (if available) or volatility rises'}</li>
                  <li className="text-gray-300">{isZh ? '等待回测突破点（pullback）或直接追入' : 'Wait for retest of breakout (pullback) or chase entry'}</li>
                  <li className="text-gray-300">{isZh ? '入场：回测突破点反弹时，或突破后第一次小回调' : 'Entry: on bounce from retest, or first minor pullback after breakout'}</li>
                  <li className="text-gray-300">{isZh ? '止损：突破点下方或最近低点下方' : 'Stop: below breakout point or recent low'}</li>
                  <li className="text-gray-300">{isZh ? '止盈：突破空间的1-2倍或下一个阻力位' : 'Target: 1-2x breakout range or next resistance level'}</li>
                </ul>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600 mt-3">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '⚠️ 假突破识别：' : '⚠️ False Breakout Identification:'}
                </p>
                <p className="text-sm text-gray-300 dark:text-gray-300">
                  {isZh
                    ? '假突破的特征：1) K线实体小，带有长上影线；2) 收盘价未能站稳突破位；3) 无成交量配合；4) 在新闻发布时段突破。避免假突破：等待突破K线收盘确认，或等待回测突破点后再入场。'
                    : 'False breakout characteristics: 1) Small candle body with long upper shadow; 2) Close fails to hold above breakout; 3) No volume confirmation; 4) Breakout during news release. Avoid false breakouts: wait for breakout candle close confirmation, or wait for retest before entry.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '策略3：区间震荡交易' : 'Strategy 3: Range Trading'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '当市场无明确趋势时，价格在支撑和阻力之间来回波动。在区间下沿买入，上沿卖出，低买高卖。'
                  : 'When market has no clear trend, price oscillates between support and resistance. Buy at range bottom, sell at range top, buy low sell high.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '区间做多设置：' : 'Range Long Setup:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '识别明显的横盘区间（至少2次触及上下沿）' : 'Identify clear horizontal range (at least 2 touches of boundaries)'}</li>
                  <li className="text-gray-300">{isZh ? '价格触及区间下沿支撑位' : 'Price touches range bottom support'}</li>
                  <li className="text-gray-300">{isZh ? '出现看涨反转K线（锤子线、看涨吞没）' : 'Bullish reversal candle appears (hammer, bullish engulfing)'}</li>
                  <li className="text-gray-300">{isZh ? 'RSI超卖（<30）或布林带触及下轨' : 'RSI oversold (<30) or price at BB lower band'}</li>
                  <li className="text-gray-300">{isZh ? '入场：下一根K线开盘价' : 'Entry: next candle open'}</li>
                  <li className="text-gray-300">{isZh ? '止损：支撑位下方20点或区间下沿外' : 'Stop: 20 pips below support or outside range bottom'}</li>
                  <li className="text-gray-300">{isZh ? '止盈：区间上沿阻力位或中轴' : 'Target: range top resistance or middle'}</li>
                </ul>
              </div>
              <p className="text-sm mt-3">
                <strong className="text-white">{isZh ? '⚡ 快速提示：' : '⚡ Quick Tip:'}</strong>{' '}
                {isZh
                  ? '区间交易最适合亚洲交易时段（北京时间8:00-15:00），此时欧美市场休市，波动性低，横盘概率高。避免在欧美盘开盘时段（15:00后）进行区间交易，容易遭遇突破。'
                  : 'Range trading best suited for Asian session (08:00-15:00 Beijing time) when EU/US markets closed, low volatility, high probability of ranging. Avoid range trading during EU/US open (after 15:00), easily encounter breakouts.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '出场策略：比入场更重要' : 'Exit Strategies: More Important Than Entry'}</h3>
            <p className="mb-3">
              {isZh
                ? '很多交易者过度关注入场点，却忽视了出场策略。实际上，出场时机决定了最终盈亏。'
                : 'Many traders overly focus on entry points while neglecting exit strategies. In reality, exit timing determines final profit/loss.'}
            </p>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 固定止盈：' : '1. Fixed Take-Profit:'}</strong>{' '}
                {isZh
                  ? '提前设定目标利润（如30点、50点），触及后自动平仓。优点：纪律性强；缺点：可能过早离场。'
                  : 'Pre-set target profit (e.g., 30 pips, 50 pips), auto-close on touch. Advantage: disciplined; Disadvantage: may exit too early.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 技术止盈：' : '2. Technical Take-Profit:'}</strong>{' '}
                {isZh
                  ? '在关键阻力/支撑位平仓（前高低、整数关口、EMA）。优点：符合市场结构；缺点：需要主观判断。'
                  : 'Close at key resistance/support (previous highs/lows, round numbers, EMA). Advantage: aligns with market structure; Disadvantage: requires subjective judgment.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 追踪止损：' : '3. Trailing Stop:'}</strong>{' '}
                {isZh
                  ? '盈利后将止损逐步移至盈亏平衡点或更高，让利润奔跑。适合趋势行情。'
                  : 'After profit, gradually move stop to breakeven or higher, let profits run. Suitable for trending markets.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 分批出场：' : '4. Partial Exits:'}</strong>{' '}
                {isZh
                  ? '达到第一目标后平仓50%，剩余50%继续持有并移动止损。平衡风险和收益。'
                  : 'Close 50% at first target, hold remaining 50% and move stop. Balance risk and reward.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '5. 时间止盈：' : '5. Time-Based Exit:'}</strong>{' '}
                {isZh
                  ? '日内交易者在收盘前1小时强制平仓所有持仓，避免隔夜风险。'
                  : 'Day traders force-close all positions 1 hour before market close, avoid overnight risk.'}
              </li>
            </ul>
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
              {isZh ? '案例1：EUR/USD趋势回调做多（H1图）' : 'Case 1: EUR/USD Trend Pullback Long (H1 Chart)'}
            </h3>
            <div className="space-y-2 text-gray-300 dark:text-gray-300 text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '市场背景：' : 'Market Context:'}</strong>{' '}
                {isZh
                  ? '2024年1月10日，欧洲时段，EUR/USD处于明确上升趋势，H4图显示价格持续在20EMA上方运行。'
                  : 'Jan 10, 2024, European session, EUR/USD in clear uptrend, H4 chart shows price consistently above 20EMA.'}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '入场分析：' : 'Entry Analysis:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? 'H4确认上升趋势，价格从1.0850上涨至1.0950' : 'H4 confirms uptrend, price rising from 1.0850 to 1.0950'}</li>
                <li className="text-gray-300">{isZh ? 'H1价格回调至20EMA（1.0920）和前高支撑' : 'H1 price pulls back to 20EMA (1.0920) and previous high support'}</li>
                <li className="text-gray-300">{isZh ? '出现锤子线反转信号，MACD金叉' : 'Hammer reversal candle appears, MACD golden cross'}</li>
                <li className="text-gray-300">{isZh ? 'M15确认价格开始反弹，收出两根看涨K线' : 'M15 confirms price starting to bounce, two bullish candles close'}</li>
                <li className="text-gray-300">{isZh ? '入场：1.0925（M15开盘价）' : 'Entry: 1.0925 (M15 open)'}</li>
                <li className="text-gray-300">{isZh ? '止损：1.0895（支撑下方30点）' : 'Stop: 1.0895 (30 pips below support)'}</li>
                <li className="text-gray-300">{isZh ? '止盈：1.0985（前高+60点，1:2风险回报比）' : 'Target: 1.0985 (previous high +60 pips, 1:2 risk-reward)'}</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '交易结果：' : 'Trade Result:'}</strong>{' '}
                {isZh
                  ? '价格反弹至1.0980触及止盈，盈利55点。持仓4小时，风险30点，收益55点，风险回报比1:1.83。'
                  : 'Price bounced to 1.0980 hitting target, profit 55 pips. Held 4 hours, risk 30 pips, reward 55 pips, 1:1.83 risk-reward.'}
              </p>
              <p className="text-green-600 dark:text-green-400 font-bold mt-2">
                {isZh ? '✅ 关键成功因素：顺势交易 + 等待回调 + 多重时间框架确认' : '✅ Key Success Factors: Trading with trend + Waiting for pullback + Multiple timeframe confirmation'}
              </p>
            </div>
          </div>

          <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '案例2：GBP/USD突破交易（M15图）' : 'Case 2: GBP/USD Breakout Trade (M15 Chart)'}
            </h3>
            <div className="space-y-2 text-gray-300 dark:text-gray-300 text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '市场背景：' : 'Market Context:'}</strong>{' '}
                {isZh
                  ? '2024年1月12日，美洲时段，GBP/USD在1.2700-1.2750区间震荡3小时后，突破上沿阻力。'
                  : 'Jan 12, 2024, American session, GBP/USD ranging 1.2700-1.2750 for 3 hours, breaks above resistance.'}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '入场分析：' : 'Entry Analysis:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? 'M15识别横盘区间1.2700-1.2750，持续3小时' : 'M15 identifies range 1.2700-1.2750, lasting 3 hours'}</li>
                <li className="text-gray-300">{isZh ? '价格以大阳线突破1.2750阻力，收盘1.2758' : 'Price breaks 1.2750 resistance with large bullish candle, closes 1.2758'}</li>
                <li className="text-gray-300">{isZh ? '突破K线实体大，无长上影线，显示买盘强劲' : 'Breakout candle has large body, no long upper shadow, shows strong buying'}</li>
                <li className="text-gray-300">{isZh ? '等待回测1.2750突破点，价格反弹' : 'Wait for retest of 1.2750 breakout, price bounces'}</li>
                <li className="text-gray-300">{isZh ? '入场：1.2753（回测后反弹）' : 'Entry: 1.2753 (bounce after retest)'}</li>
                <li className="text-gray-300">{isZh ? '止损：1.2735（突破点下方18点）' : 'Stop: 1.2735 (18 pips below breakout)'}</li>
                <li className="text-gray-300">{isZh ? '止盈：1.2800（区间高度50点的1倍）' : 'Target: 1.2800 (1x range height 50 pips)'}</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '交易结果：' : 'Trade Result:'}</strong>{' '}
                {isZh
                  ? '价格快速上涨至1.2795，手动平仓，盈利42点。持仓1.5小时，风险18点，收益42点，风险回报比1:2.33。'
                  : 'Price quickly rose to 1.2795, manually closed, profit 42 pips. Held 1.5 hours, risk 18 pips, reward 42 pips, 1:2.33 risk-reward.'}
              </p>
              <p className="text-green-600 dark:text-green-400 font-bold mt-2">
                {isZh ? '✅ 关键成功因素：识别突破 + 等待回测 + 强势K线确认' : '✅ Key Success Factors: Breakout identification + Waiting for retest + Strong candle confirmation'}
              </p>
            </div>
          </div>

          <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '案例3：USD/JPY逆势交易失败教训（M5图）' : 'Case 3: USD/JPY Counter-Trend Failure Lesson (M5 Chart)'}
            </h3>
            <div className="space-y-2 text-gray-300 dark:text-gray-300 text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '市场背景：' : 'Market Context:'}</strong>{' '}
                {isZh
                  ? '2024年1月15日，亚洲时段，USD/JPY处于强劲下降趋势，从148.50跌至147.80。'
                  : 'Jan 15, 2024, Asian session, USD/JPY in strong downtrend, falling from 148.50 to 147.80.'}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '错误入场：' : 'Wrong Entry:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? 'H4/H1均显示下降趋势，但交易者忽视了' : 'H4/H1 both show downtrend, but trader ignored'}</li>
                <li className="text-gray-300">{isZh ? 'M5价格短暂触及147.80整数关口，出现小反弹' : 'M5 price briefly touched 147.80 round number, small bounce'}</li>
                <li className="text-gray-300">{isZh ? '交易者认为"超卖"，尝试抄底做多' : 'Trader thought "oversold", tried to bottom-fish long'}</li>
                <li className="text-gray-300">{isZh ? '入场：147.85' : 'Entry: 147.85'}</li>
                <li className="text-gray-300">{isZh ? '止损：147.70（15点）' : 'Stop: 147.70 (15 pips)'}</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '交易结果：' : 'Trade Result:'}</strong>{' '}
                {isZh
                  ? '价格小幅反弹至147.90后继续下跌，触发止损147.70，亏损15点。之后价格跌至147.20，如果顺势做空可盈利65点。'
                  : 'Price briefly bounced to 147.90 then continued falling, hit stop 147.70, loss 15 pips. Price later fell to 147.20, could have profited 65 pips if shorted with trend.'}
              </p>
              <p className="text-red-600 dark:text-red-400 font-bold mt-2">
                {isZh ? '❌ 错误分析：' : '❌ Error Analysis:'}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? '逆势交易：无视H4/H1下降趋势，试图抄底' : 'Counter-trend trading: ignored H4/H1 downtrend, tried to catch falling knife'}</li>
                <li className="text-gray-300">{isZh ? '依赖单一时间框架（M5），缺乏多时间框架分析' : 'Relied on single timeframe (M5), lacked multiple timeframe analysis'}</li>
                <li className="text-gray-300">{isZh ? '主观判断"超卖"，没有等待明确的反转信号' : 'Subjectively judged "oversold", didn\'t wait for clear reversal signal'}</li>
                <li className="text-gray-300">{isZh ? '正确做法：顺势做空，或等待H1反转确认后再考虑做多' : 'Correct approach: short with trend, or wait for H1 reversal confirmation before considering long'}</li>
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
              ❌ {isZh ? '错误1：过度交易（Overtrading）' : 'Mistake 1: Overtrading'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '看到价格波动就想交易，一天执行10-20笔交易，大部分都是低质量信号，导致点差成本高、胜率低、心理疲劳。'
                : 'Trading on every price move, executing 10-20 trades daily, mostly low-quality signals, leading to high spread costs, low win rate, psychological fatigue.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '质量优于数量。每天限制交易次数（新手1-3笔，熟练交易者3-5笔），只在高概率设置时入场。制定明确的入场规则（如必须符合3个以上条件），避免冲动交易。宁可错过机会，也不要随意开仓。'
                : 'Quality over quantity. Limit daily trades (beginners 1-3, experienced 3-5), only enter on high-probability setups. Establish clear entry rules (must meet 3+ conditions), avoid impulsive trading. Better to miss opportunities than open random positions.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误2：在错误时段交易' : 'Mistake 2: Trading at Wrong Times'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '在低流动性时段（如亚洲午间）或新闻发布前后交易，导致点差扩大、滑点严重、价格剧烈波动无规律。'
                : 'Trading during low liquidity periods (Asian afternoon) or around news releases, causing spread widening, significant slippage, erratic price movements.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '选择最佳交易时段：欧洲开盘（北京时间15:00-18:00）、欧美重叠（20:00-24:00）、美国开盘（21:00-次日1:00）。避免：亚洲午间（12:00-14:00）、重大新闻前后30分钟、周五晚间（流动性枯竭）。使用经济日历追踪新闻时间。'
                : 'Choose optimal trading sessions: European open (15:00-18:00 Beijing), EU-US overlap (20:00-24:00), US open (21:00-01:00). Avoid: Asian afternoon (12:00-14:00), 30 minutes around major news, Friday evening (liquidity dries up). Use economic calendar to track news times.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误3：移动止损追求完美入场' : 'Mistake 3: Moving Stops to Avoid Loss'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '价格接近止损时，交易者害怕亏损，将止损移至更远位置，"给价格多一点空间"。最终导致小亏变大亏。'
                : 'When price approaches stop, trader fears loss, moves stop further, "giving price more room". Eventually small loss becomes large loss.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '止损一旦设定，绝不移动（除非朝盈利方向移动）。止损被触发意味着入场判断错误，应果断接受亏损并退出。记住：止损是保护你的盔甲，而非障碍。如果经常被止损，问题不在止损太小，而在入场时机不对，应改进入场策略而非扩大止损。'
                : 'Once stop is set, never move it (unless moving toward profit). Stop hit means entry judgment wrong, decisively accept loss and exit. Remember: stop-loss is your protective armor, not an obstacle. If frequently stopped out, problem isn\'t stop too tight, but wrong entry timing - improve entry strategy rather than widening stops.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误4：盈利后立即加大仓位' : 'Mistake 4: Increasing Position After Wins'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '连续盈利几笔后，交易者过度自信，大幅增加仓位（从1%增至5%或10%），一旦亏损，前期利润全部回吐。'
                : 'After several winning trades, trader becomes overconfident, dramatically increases position (1% to 5% or 10%), one loss wipes out all previous profits.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '保持固定仓位管理，每笔交易风险控制在账户的1-2%。无论盈利或亏损，仓位大小不变。如果想增加仓位，只能随着账户净值增长自然增加（如账户从$10,000增至$12,000，单笔风险从$100增至$120），而非主观增加风险百分比。记住：稳定盈利来自一致性，而非孤注一掷。'
                : 'Maintain fixed position management, control each trade risk at 1-2% of account. Regardless of wins or losses, position size stays constant. To increase position, only naturally increase with account growth (e.g., account grows $10,000 to $12,000, per-trade risk increases $100 to $120), not subjectively increase risk percentage. Remember: consistent profits come from consistency, not all-in bets.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误5：忽视交易成本' : 'Mistake 5: Ignoring Trading Costs'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '只关注盈亏点数，忽视点差和手续费成本。在M5图表上频繁交易，点差可能吃掉30-50%的利润。'
                : 'Only focusing on profit/loss pips, ignoring spread and commission costs. Frequent M5 trading, spread may consume 30-50% of profits.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '计算"真实盈亏" = 毛利润 - 点差/手续费。选择低点差经纪商（主流货币对点差<1点），避免在点差扩大时段交易（新闻、开盘）。如果使用M5/M15图表，目标利润应至少是点差的5-10倍（点差2点，目标至少10-20点）。考虑使用ECN账户降低成本。'
                : 'Calculate "true profit/loss" = gross profit - spread/commission. Choose low-spread brokers (major pairs <1 pip), avoid trading during spread-widening periods (news, market open). If using M5/M15 charts, target profit should be at least 5-10x spread (2 pip spread, target minimum 10-20 pips). Consider using ECN account to reduce costs.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Risk Management */}
      <section id="risk-management" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '风险管理要点' : 'Risk Management Essentials'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '日内交易风险管理黄金法则' : 'Day Trading Risk Management Golden Rules'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 单笔风险不超过账户的1-2%：' : '1. Single Trade Risk Max 1-2% of Account:'}</strong>{' '}
                {isZh
                  ? '$10,000账户，单笔最大亏损$100-200。这样连续10次止损也只亏损10-20%，有足够回旋余地。'
                  : '$10,000 account, maximum single loss $100-200. This way 10 consecutive stops only lose 10-20%, sufficient recovery room.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 每日最大亏损限额：' : '2. Daily Maximum Loss Limit:'}</strong>{' '}
                {isZh
                  ? '设定每日最大亏损（如3-5%），达到后立即停止交易。避免"报复性交易"扩大亏损。'
                  : 'Set daily maximum loss (e.g., 3-5%), stop trading immediately when hit. Avoid "revenge trading" expanding losses.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 风险回报比至少1:1.5：' : '3. Risk-Reward Ratio Minimum 1:1.5:'}</strong>{' '}
                {isZh
                  ? '止损30点，目标利润应至少45点。这样胜率50%就能盈利。'
                  : '30 pip stop, target profit minimum 45 pips. This way 50% win rate still profits.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 使用止损单，绝不裸奔：' : '4. Use Stop-Loss Orders, Never Naked:'}</strong>{' '}
                {isZh
                  ? '每笔交易开仓同时设置止损单，不依赖手动平仓。防止网络故障或情绪失控。'
                  : 'Set stop-loss order when opening position, don\'t rely on manual close. Prevent network failure or emotional loss of control.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '5. 盈利后移动止损至盈亏平衡：' : '5. Move Stop to Breakeven After Profit:'}</strong>{' '}
                {isZh
                  ? '当价格朝盈利方向运行达到风险的1倍时（如止损30点，盈利30点时），将止损移至开仓价，锁定无风险交易。'
                  : 'When price moves in profitable direction by 1x risk (e.g., 30 pip stop, 30 pip profit), move stop to entry price, lock in risk-free trade.'}
              </li>
            </ul>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '仓位计算公式' : 'Position Sizing Formula'}
            </h3>
            <div className="space-y-3">
              <p className="font-mono text-sm bg-gray-100 dark:bg-[#0a0a0a] p-3">
                {isZh
                  ? '手数 = (账户余额 × 风险百分比) / (止损点数 × 每点价值)'
                  : 'Lot Size = (Account Balance × Risk %) / (Stop Pips × Pip Value)'}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '示例：' : 'Example:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? '账户余额：$10,000' : 'Account Balance: $10,000'}</li>
                <li className="text-gray-300">{isZh ? '单笔风险：2% = $200' : 'Single Trade Risk: 2% = $200'}</li>
                <li className="text-gray-300">{isZh ? '止损：30点' : 'Stop-Loss: 30 pips'}</li>
                <li className="text-gray-300">{isZh ? '交易EUR/USD（每标准手每点=$10）' : 'Trading EUR/USD (standard lot pip value=$10)'}</li>
                <li className="font-bold text-white">
                  {isZh
                    ? '手数 = ($10,000 × 2%) / (30 × $10) = $200 / $300 = 0.67标准手'
                    : 'Lot Size = ($10,000 × 2%) / (30 × $10) = $200 / $300 = 0.67 standard lots'}
                </li>
              </ul>
              <p className="text-sm mt-2">
                {isZh
                  ? '实际交易中可开0.6或0.7标准手，或使用FX Killer仓位计算器自动计算。'
                  : 'In actual trading open 0.6 or 0.7 standard lots, or use FX Killer position calculator for automatic calculation.'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '情绪管理技巧' : 'Emotional Management Tips'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '设定每日交易时间上限（如4小时），避免过度疲劳' : 'Set daily trading time limit (e.g., 4 hours), avoid excessive fatigue'}</li>
                <li className="text-gray-300">{isZh ? '连续2次止损后休息15-30分钟，避免情绪化交易' : 'After 2 consecutive stops, rest 15-30 minutes, avoid emotional trading'}</li>
                <li className="text-gray-300">{isZh ? '写交易日志，记录每笔交易的入场理由和情绪状态' : 'Write trading journal, record entry reasons and emotional state for each trade'}</li>
                <li className="text-gray-300">{isZh ? '达到每日盈利目标后停止交易，保护利润' : 'Stop trading after reaching daily profit target, protect profits'}</li>
                <li className="text-gray-300">{isZh ? '定期复盘，分析失败交易的共同特征' : 'Regular review, analyze common characteristics of losing trades'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '资金管理建议' : 'Money Management Recommendations'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '使用专门的交易账户，与生活资金分开' : 'Use dedicated trading account, separate from living funds'}</li>
                <li className="text-gray-300">{isZh ? '只用闲置资金交易，亏损不影响正常生活' : 'Only trade with idle funds, losses don\'t affect normal life'}</li>
                <li className="text-gray-300">{isZh ? '定期提取利润（如每月提取50%利润）' : 'Regular profit withdrawal (e.g., withdraw 50% profit monthly)'}</li>
                <li className="text-gray-300">{isZh ? '账户增长30%后，可小幅增加仓位（如1%→1.5%）' : 'After 30% account growth, slightly increase position (1%→1.5%)'}</li>
                <li className="text-gray-300">{isZh ? '账户回撤超过20%时，减少仓位并重新评估策略' : 'If account drawdown exceeds 20%, reduce position and re-evaluate strategy'}</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '致新手的忠告' : 'Advice for Beginners'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300">
              {isZh
                ? '日内交易不是快速致富的捷径，而是一项需要技能、纪律和耐心的职业。大多数新手在前6-12个月会亏损，这是正常的学习成本。建议：1) 从模拟账户开始，至少练习3个月；2) 初期使用小仓位（0.01手），积累经验；3) 专注于一种策略和2-3个货币对，不要贪多；4) 每天复盘，持续改进；5) 加入交易社区，向经验丰富的交易者学习。记住：在交易中生存下来比暴富更重要。'
                : 'Day trading is not a shortcut to quick riches, but a profession requiring skills, discipline, and patience. Most beginners will lose in first 6-12 months - this is normal learning cost. Recommendations: 1) Start with demo account, practice at least 3 months; 2) Initially use small positions (0.01 lot), accumulate experience; 3) Focus on one strategy and 2-3 currency pairs, don\'t be greedy; 4) Daily review, continuous improvement; 5) Join trading community, learn from experienced traders. Remember: surviving in trading is more important than getting rich quick.'}
            </p>
          </div>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
