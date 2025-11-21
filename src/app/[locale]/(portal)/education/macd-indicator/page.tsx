import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { macdIndicatorContent } from '@/content/education/macd-indicator.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    macdIndicatorContent.zh.title,
    macdIndicatorContent.en.title,
    macdIndicatorContent.zh.description,
    macdIndicatorContent.en.description,
    macdIndicatorContent.zh.keywords,
    macdIndicatorContent.en.keywords,
    lang
  );
}

export default async function MACDIndicatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = macdIndicatorContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: What is MACD */}
      <section id="what-is-macd" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '什么是MACD指标？' : 'What is MACD Indicator?'}
        </h2>
        <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? 'MACD（Moving Average Convergence Divergence，指数平滑异同移动平均线）由Gerald Appel在1970年代创建，是技术分析中最经典和最广泛使用的趋势动能指标之一。它通过计算不同周期EMA之间的关系来揭示价格趋势的方向、强度和转折点。'
              : 'MACD (Moving Average Convergence Divergence) was created by Gerald Appel in the 1970s, one of the most classic and widely used trend-momentum indicators in technical analysis. It reveals price trend direction, strength, and turning points by calculating relationships between different period EMAs.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? 'MACD的三个组成部分' : 'MACD Three Components'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. DIF线（快线、MACD线）：' : '1. DIF Line (Fast Line, MACD Line):'}</strong>{' '}
                {isZh
                  ? '12周期EMA减去26周期EMA的差值，反映短期与长期趋势的差异'
                  : '12-period EMA minus 26-period EMA, reflects difference between short and long-term trends'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. DEA线（慢线、信号线）：' : '2. DEA Line (Slow Line, Signal Line):'}</strong>{' '}
                {isZh
                  ? 'DIF的9周期EMA，对DIF进行平滑处理'
                  : '9-period EMA of DIF, smooths the DIF line'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. MACD柱状图（Histogram）：' : '3. MACD Histogram:'}</strong>{' '}
                {isZh
                  ? 'DIF减去DEA，直观显示两线的距离，反映趋势强度变化'
                  : 'DIF minus DEA, visually shows distance between lines, reflects trend strength changes'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? 'MACD的核心优势' : 'MACD Core Advantages'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '趋势与动能结合：' : 'Combines trend and momentum:'}</strong>{' '}
                {isZh ? '同时揭示趋势方向和动能强度' : 'Reveals both trend direction and momentum strength'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '简单易读：' : 'Simple to read:'}</strong>{' '}
                {isZh ? '金叉死叉信号清晰直观' : 'Golden/death cross signals clear and intuitive'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '多重应用：' : 'Multiple applications:'}</strong>{' '}
                {isZh ? '可用于趋势确认、背离识别、动能分析' : 'Used for trend confirmation, divergence identification, momentum analysis'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '适用性广：' : 'Wide applicability:'}</strong>{' '}
                {isZh ? '适合所有市场和时间框架' : 'Suitable for all markets and timeframes'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: Calculation */}
      <section id="calculation" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? 'MACD的计算与参数设置' : 'MACD Calculation and Parameter Settings'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '计算公式' : 'Calculation Formulas'}</h3>
            <div className="space-y-3 font-mono text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 计算快速EMA和慢速EMA：' : '1. Calculate Fast and Slow EMA:'}</strong>
              </p>
              <p className="pl-4">
                {isZh ? '快速EMA = EMA(收盘价, 12)' : 'Fast EMA = EMA(Close, 12)'}
              </p>
              <p className="pl-4">
                {isZh ? '慢速EMA = EMA(收盘价, 26)' : 'Slow EMA = EMA(Close, 26)'}
              </p>
              <p className="mt-3">
                <strong className="text-white">{isZh ? '2. 计算DIF（MACD线）：' : '2. Calculate DIF (MACD Line):'}</strong>
              </p>
              <p className="pl-4">
                {isZh ? 'DIF = 快速EMA - 慢速EMA' : 'DIF = Fast EMA - Slow EMA'}
              </p>
              <p className="mt-3">
                <strong className="text-white">{isZh ? '3. 计算DEA（信号线）：' : '3. Calculate DEA (Signal Line):'}</strong>
              </p>
              <p className="pl-4">
                {isZh ? 'DEA = EMA(DIF, 9)' : 'DEA = EMA(DIF, 9)'}
              </p>
              <p className="mt-3">
                <strong className="text-white">{isZh ? '4. 计算MACD柱状图：' : '4. Calculate MACD Histogram:'}</strong>
              </p>
              <p className="pl-4">
                {isZh ? 'MACD柱 = DIF - DEA' : 'MACD Histogram = DIF - DEA'}
              </p>
              <p className="mt-3 text-white/80 dark:text-gray-300/80">
                {isZh ? '* 标准参数：(12, 26, 9)' : '* Standard parameters: (12, 26, 9)'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '标准参数' : 'Standard Parameters'}
              </h3>
              <p className="mb-2 font-bold text-white">(12, 26, 9)</p>
              <p className="text-sm">
                {isZh
                  ? 'Gerald Appel原创参数，适用于大多数市场和周期，平衡灵敏度与可靠性'
                  : 'Gerald Appel\'s original parameters, suitable for most markets and periods, balances sensitivity and reliability'}
              </p>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '快速参数' : 'Fast Parameters'}
              </h3>
              <p className="mb-2 font-bold text-white">(5, 13, 5) {isZh ? '或' : 'or'} (6, 19, 9)</p>
              <p className="text-sm">
                {isZh
                  ? '更敏感，适合短线交易和波动大的市场，信号更快但假信号增加'
                  : 'More sensitive, suitable for short-term trading and volatile markets, faster signals but more false signals'}
              </p>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '慢速参数' : 'Slow Parameters'}
              </h3>
              <p className="mb-2 font-bold text-white">(19, 39, 9) {isZh ? '或' : 'or'} (26, 52, 18)</p>
              <p className="text-sm">
                {isZh
                  ? '更平滑，适合长线交易和趋势明显的市场，信号慢但可靠性高'
                  : 'Smoother, suitable for long-term trading and clear trending markets, slower but more reliable signals'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-[#0a0a0a] border-l-4 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '⚠️ 参数调整建议' : '⚠️ Parameter Adjustment Recommendations'}
            </h3>
            <p className="mb-2">
              {isZh
                ? '虽然可以调整MACD参数，但建议保持谨慎。标准参数(12, 26, 9)经过数十年市场验证，已被全球交易员广泛采用。'
                : 'While MACD parameters can be adjusted, recommend caution. Standard (12, 26, 9) validated by decades of market testing, widely adopted by traders globally.'}
            </p>
            <p className="text-sm">
              {isZh
                ? '如果要修改参数，务必在充足的历史数据上回测验证，避免"曲线拟合"。记住：更好的策略往往来自于如何使用指标，而非修改参数。'
                : 'If modifying parameters, must backtest on sufficient historical data to avoid "curve fitting." Remember: better strategies often come from how you use the indicator, not parameter tweaking.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Interpretation */}
      <section id="interpretation" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '如何解读MACD信号' : 'How to Interpret MACD Signals'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '✅ 金叉（Golden Cross）' : '✅ Golden Cross'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? 'DIF从下方向上穿越DEA，看涨信号'
                  : 'DIF crosses above DEA from below, bullish signal'}
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  <strong className="text-white">{isZh ? '零轴上方金叉：' : 'Above Zero Golden Cross:'}</strong>{' '}
                  {isZh ? '强烈买入信号，趋势延续' : 'Strong buy signal, trend continuation'}
                </p>
                <p className="text-gray-300">
                  <strong className="text-white">{isZh ? '零轴下方金叉：' : 'Below Zero Golden Cross:'}</strong>{' '}
                  {isZh ? '弱买入信号，可能是反弹而非反转' : 'Weak buy signal, may be bounce not reversal'}
                </p>
                <p className="text-gray-300">
                  <strong className="text-white">{isZh ? '最佳入场：' : 'Best entry:'}</strong>{' '}
                  {isZh ? '金叉确认后的第一个回调' : 'First pullback after golden cross confirmation'}
                </p>
              </div>
            </div>

            <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '❌ 死叉（Death Cross）' : '❌ Death Cross'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? 'DIF从上方向下穿越DEA，看跌信号'
                  : 'DIF crosses below DEA from above, bearish signal'}
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  <strong className="text-white">{isZh ? '零轴下方死叉：' : 'Below Zero Death Cross:'}</strong>{' '}
                  {isZh ? '强烈卖出信号，下降趋势延续' : 'Strong sell signal, downtrend continuation'}
                </p>
                <p className="text-gray-300">
                  <strong className="text-white">{isZh ? '零轴上方死叉：' : 'Above Zero Death Cross:'}</strong>{' '}
                  {isZh ? '弱卖出信号，可能是回调而非反转' : 'Weak sell signal, may be pullback not reversal'}
                </p>
                <p className="text-gray-300">
                  <strong className="text-white">{isZh ? '最佳入场：' : 'Best entry:'}</strong>{' '}
                  {isZh ? '死叉确认后的第一个反弹' : 'First bounce after death cross confirmation'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? 'MACD零轴的重要意义' : 'MACD Zero Line Significance'}</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? 'MACD在零轴上方：' : 'MACD above zero:'}</strong>{' '}
                {isZh
                  ? '12EMA > 26EMA，市场处于上升趋势，优先考虑做多'
                  : '12EMA > 26EMA, market in uptrend, prioritize long positions'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? 'MACD在零轴下方：' : 'MACD below zero:'}</strong>{' '}
                {isZh
                  ? '12EMA < 26EMA，市场处于下降趋势，优先考虑做空'
                  : '12EMA < 26EMA, market in downtrend, prioritize short positions'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? 'MACD穿越零轴：' : 'MACD crosses zero:'}</strong>{' '}
                {isZh
                  ? '向上穿越=趋势转多；向下穿越=趋势转空，是重要的中期趋势信号'
                  : 'Upward cross = trend turns bullish; downward cross = trend turns bearish, important medium-term signal'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? 'MACD距离零轴的距离：' : 'MACD distance from zero:'}</strong>{' '}
                {isZh
                  ? '距离越远，趋势越强；距离越近，趋势越弱或即将反转'
                  : 'Greater distance = stronger trend; closer distance = weaker trend or reversal approaching'}
              </li>
            </ul>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '📊 MACD柱状图解读' : '📊 MACD Histogram Interpretation'}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '柱状图由负转正：' : 'Histogram negative to positive:'}</strong>{' '}
                {isZh ? '等同于金叉，买入信号' : 'Equivalent to golden cross, buy signal'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '柱状图由正转负：' : 'Histogram positive to negative:'}</strong>{' '}
                {isZh ? '等同于死叉，卖出信号' : 'Equivalent to death cross, sell signal'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '柱状图扩大：' : 'Histogram expanding:'}</strong>{' '}
                {isZh ? '趋势加速，动能增强' : 'Trend accelerating, momentum strengthening'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '柱状图缩小：' : 'Histogram contracting:'}</strong>{' '}
                {isZh ? '趋势减速，动能减弱，可能反转' : 'Trend decelerating, momentum weakening, possible reversal'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '柱状图背离：' : 'Histogram divergence:'}</strong>{' '}
                {isZh ? '价格创新高但柱状图未创新高=最早期的趋势衰竭警告' : 'Price new high but histogram doesn\'t = earliest trend exhaustion warning'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Trading Strategies */}
      <section id="trading-strategies" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '经典MACD交易策略' : 'Classic MACD Trading Strategies'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '策略1：零轴上方金叉做多' : 'Strategy 1: Golden Cross Above Zero Long'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '在上升趋势中（MACD在零轴上方），金叉是强烈的趋势延续信号，胜率高。'
                  : 'In uptrend (MACD above zero), golden cross is strong trend continuation signal, high win rate.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '入场条件：' : 'Entry Conditions:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? 'MACD（DIF和DEA）均在零轴上方' : 'MACD (both DIF and DEA) above zero line'}</li>
                  <li className="text-gray-300">{isZh ? 'DIF向上穿越DEA形成金叉' : 'DIF crosses above DEA forming golden cross'}</li>
                  <li className="text-gray-300">{isZh ? '价格在主要移动平均线（如55EMA）上方' : 'Price above major moving average (e.g., 55EMA)'}</li>
                  <li className="text-gray-300">{isZh ? '入场：金叉确认后开盘价' : 'Entry: Open price after golden cross confirmation'}</li>
                  <li className="text-gray-300">{isZh ? '止损：最近低点下方或零轴附近' : 'Stop: Below recent low or near zero line'}</li>
                  <li className="text-gray-300">{isZh ? '止盈：风险回报比1:2或1:3' : 'Target: Risk-reward ratio 1:2 or 1:3'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '策略2：MACD背离反转交易' : 'Strategy 2: MACD Divergence Reversal Trading'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? 'MACD背离是趋势即将反转的强烈信号，特别是在超买超卖区域。'
                  : 'MACD divergence is strong signal of impending trend reversal, especially in overbought/oversold zones.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '顶背离做空：' : 'Bearish Divergence Short:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '价格创新高，但MACD（DIF或柱状图）未创新高' : 'Price makes new high, but MACD (DIF or histogram) doesn\'t'}</li>
                  <li className="text-gray-300">{isZh ? '至少识别2个明显的高点' : 'Identify at least 2 clear peaks'}</li>
                  <li className="text-gray-300">{isZh ? '等待MACD死叉确认' : 'Wait for MACD death cross confirmation'}</li>
                  <li className="text-gray-300">{isZh ? '配合价格反转K线形态（如Pin Bar）' : 'Combine with price reversal patterns (e.g., Pin Bar)'}</li>
                  <li className="text-gray-300">{isZh ? '入场：确认后的第一个反弹' : 'Entry: First bounce after confirmation'}</li>
                  <li className="text-gray-300">{isZh ? '止损：背离点高点上方' : 'Stop: Above divergence peak'}</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a] mt-3">
                <p className="font-bold mb-2 text-white">{isZh ? '底背离做多：' : 'Bullish Divergence Long:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '价格创新低，但MACD（DIF或柱状图）未创新低' : 'Price makes new low, but MACD (DIF or histogram) doesn\'t'}</li>
                  <li className="text-gray-300">{isZh ? '至少识别2个明显的低点' : 'Identify at least 2 clear troughs'}</li>
                  <li className="text-gray-300">{isZh ? '等待MACD金叉确认' : 'Wait for MACD golden cross confirmation'}</li>
                  <li className="text-gray-300">{isZh ? '配合价格反转K线形态' : 'Combine with price reversal patterns'}</li>
                  <li className="text-gray-300">{isZh ? '入场：确认后的第一个回调' : 'Entry: First pullback after confirmation'}</li>
                  <li className="text-gray-300">{isZh ? '止损：背离点低点下方' : 'Stop: Below divergence trough'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '策略3：MACD柱状图动能交易' : 'Strategy 3: MACD Histogram Momentum Trading'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '柱状图的扩张和收缩直观显示趋势强度变化，可用于判断最佳入场和出场时机。'
                  : 'Histogram expansion and contraction visually shows trend strength changes, useful for optimal entry and exit timing.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '柱状图加速入场：' : 'Histogram Acceleration Entry:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '柱状图由负转正（或由正转负）' : 'Histogram turns from negative to positive (or vice versa)'}</li>
                  <li className="text-gray-300">{isZh ? '连续2-3根柱状图扩大' : '2-3 consecutive expanding histogram bars'}</li>
                  <li className="text-gray-300">{isZh ? '配合价格突破关键阻力/支撑' : 'Combine with price breaking key resistance/support'}</li>
                  <li className="text-gray-300">{isZh ? '入场：柱状图加速扩大时' : 'Entry: When histogram accelerates expansion'}</li>
                  <li className="text-gray-300">{isZh ? '止损：柱状图转向反方向' : 'Stop: When histogram turns opposite direction'}</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a] mt-3">
                <p className="font-bold mb-2 text-white">{isZh ? '柱状图减速出场：' : 'Histogram Deceleration Exit:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '持仓中，观察柱状图变化' : 'In position, observe histogram changes'}</li>
                  <li className="text-gray-300">{isZh ? '柱状图连续缩小=趋势减速预警' : 'Consecutive shrinking bars = trend deceleration warning'}</li>
                  <li className="text-gray-300">{isZh ? '柱状图缩小50%=减仓50%' : 'Histogram shrinks 50% = reduce position 50%'}</li>
                  <li className="text-gray-300">{isZh ? '柱状图转向反方向=全部平仓' : 'Histogram turns opposite = close all positions'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Advanced Techniques */}
      <section id="advanced-techniques" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '进阶技巧与组合应用' : 'Advanced Techniques and Combinations'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? 'MACD + 移动均线' : 'MACD + Moving Averages'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? 'MACD确认动能，均线确认趋势：'
                  : 'MACD confirms momentum, MAs confirm trend:'}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? '价格在200EMA上方 + MACD金叉 = 强做多' : 'Price above 200EMA + MACD golden cross = strong long'}</li>
                <li className="text-gray-300">{isZh ? '价格回调至21EMA + MACD柱状图转正 = 加仓点' : 'Price pullback to 21EMA + MACD histogram turns positive = add-on'}</li>
                <li className="text-gray-300">{isZh ? '均线死叉 + MACD背离 = 强反转信号' : 'MA death cross + MACD divergence = strong reversal'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? 'MACD + RSI' : 'MACD + RSI'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? 'MACD看趋势，RSI看超买超卖：'
                  : 'MACD for trend, RSI for overbought/oversold:'}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? 'MACD金叉 + RSI从超卖区上升 = 高质量做多' : 'MACD golden cross + RSI rising from oversold = high-quality long'}</li>
                <li className="text-gray-300">{isZh ? 'MACD死叉 + RSI从超买区下降 = 高质量做空' : 'MACD death cross + RSI falling from overbought = high-quality short'}</li>
                <li className="text-gray-300">{isZh ? '两者同时背离 = 极强反转信号' : 'Both diverge simultaneously = extremely strong reversal'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? 'MACD + 支撑阻力' : 'MACD + Support/Resistance'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? '关键位置的MACD信号更可靠：'
                  : 'MACD signals at key levels more reliable:'}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? '价格在支撑位 + MACD金叉 = 强支撑反弹' : 'Price at support + MACD golden cross = strong support bounce'}</li>
                <li className="text-gray-300">{isZh ? '价格在阻力位 + MACD死叉 = 强阻力回落' : 'Price at resistance + MACD death cross = strong resistance pullback'}</li>
                <li className="text-gray-300">{isZh ? '突破阻力 + MACD加速 = 有效突破确认' : 'Break resistance + MACD acceleration = valid breakout confirmation'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '多周期MACD共振' : 'Multi-Timeframe MACD Confluence'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? '提高信号质量的最佳方法：'
                  : 'Best method to improve signal quality:'}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? '日线MACD确定主趋势方向' : 'Daily MACD determines main trend direction'}</li>
                <li className="text-gray-300">{isZh ? '4小时MACD寻找入场时机' : '4H MACD finds entry timing'}</li>
                <li className="text-gray-300">{isZh ? '1小时MACD精确入场点' : '1H MACD pinpoints entry'}</li>
                <li className="text-gray-300">{isZh ? '三个周期同时金叉/死叉 = 最高质量信号' : 'All three timeframes golden/death cross = highest quality signal'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Common Mistakes */}
      <section id="common-mistakes" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '常见错误与规避方法' : 'Common Mistakes and Solutions'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误1：盲目追随所有金叉死叉' : 'Mistake 1: Blindly Following All Crosses'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '看到金叉就做多，看到死叉就做空，不考虑市场环境和趋势方向。'
                : 'Going long on every golden cross, short on every death cross, ignoring market context and trend direction.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '区分零轴上下方的信号质量。上升趋势只做金叉多单，下降趋势只做死叉空单。顺势而为。'
                : 'Distinguish signal quality above/below zero line. In uptrend only long on golden cross, in downtrend only short on death cross. Trade with trend.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误2：忽视背离信号需要确认' : 'Mistake 2: Ignoring Divergence Needs Confirmation'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '一看到背离就立即入场，没有等待实际反转信号，经常被套在趋势延续中。'
                : 'Entering immediately upon spotting divergence without waiting for actual reversal signal, often trapped in trend continuation.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '背离只是预警信号。必须等待MACD金叉/死叉或价格反转K线形态确认后再入场。'
                : 'Divergence is only warning signal. Must wait for MACD cross or price reversal pattern confirmation before entry.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误3：在震荡市中频繁交易' : 'Mistake 3: Overtrading in Range Markets'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? 'MACD在零轴附近反复交叉，频繁进出，累积交易成本，整体亏损。'
                : 'MACD repeatedly crossing near zero line, frequent entries/exits, accumulating trading costs, overall losses.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '识别市场环境。MACD在零轴附近频繁交叉=震荡市，暂时观望或使用其他策略（如支撑阻力反转）。'
                : 'Identify market environment. MACD frequently crossing near zero = range market, stay aside or use other strategies (like S/R reversals).'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误4：单独依赖MACD' : 'Mistake 4: Relying Solely on MACD'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '认为MACD是万能指标，不结合其他技术分析工具，信号质量低。'
                : 'Believing MACD is all-powerful, not combining with other technical tools, low signal quality.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? 'MACD应与其他指标组合使用：均线确认趋势、RSI确认超买超卖、支撑阻力确认关键位置。多重确认提高胜率。'
                : 'MACD should combine with other indicators: MAs confirm trend, RSI confirms overbought/oversold, S/R confirms key levels. Multiple confirmations improve win rate.'}
            </p>
          </div>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
