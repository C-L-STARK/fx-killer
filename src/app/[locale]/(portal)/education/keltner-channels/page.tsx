import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { keltnerChannelsContent } from '@/content/education/keltner-channels.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    keltnerChannelsContent.zh.title,
    keltnerChannelsContent.en.title,
    keltnerChannelsContent.zh.description,
    keltnerChannelsContent.en.description,
    keltnerChannelsContent.zh.keywords,
    keltnerChannelsContent.en.keywords,
    lang
  );
}

export default async function KeltnerChannelsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = keltnerChannelsContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: What is Keltner Channels */}
      <section id="what-is-kc" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '什么是肯特纳通道？' : 'What is Keltner Channels?'}
        </h2>
        <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '肯特纳通道（Keltner Channels，简称KC）是一种基于平均真实波幅（ATR）的技术指标，由Chester W. Keltner在1960年代创建，后由Linda Bradford Raschke改进。它通过在移动平均线上下各加减一定倍数的ATR来形成通道，用于识别趋势、波动性和潜在的突破点。'
              : 'Keltner Channels (KC) is a technical indicator based on Average True Range (ATR), created by Chester W. Keltner in the 1960s and later refined by Linda Bradford Raschke. It forms channels by adding and subtracting multiples of ATR from a moving average, used to identify trends, volatility, and potential breakout points.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? 'KC的核心特点' : 'KC Core Features'}</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '基于真实波动性：' : 'Based on true volatility:'}</strong>{' '}
                {isZh
                  ? '使用ATR而非标准差，更能反映市场的实际波动范围'
                  : 'Uses ATR instead of standard deviation, better reflects actual market volatility'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '趋势跟踪性强：' : 'Strong trend following:'}</strong>{' '}
                {isZh
                  ? '通道随价格移动平均线调整，能有效跟踪趋势变化'
                  : 'Channels adjust with moving average, effectively tracks trend changes'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '噪音过滤：' : 'Noise filtering:'}</strong>{' '}
                {isZh
                  ? 'ATR自然过滤掉短期价格噪音，信号质量较高'
                  : 'ATR naturally filters short-term price noise, higher signal quality'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '动态调整：' : 'Dynamic adjustment:'}</strong>{' '}
                {isZh
                  ? '通道宽度随市场波动性自动调整，波动大时通道宽，波动小时通道窄'
                  : 'Channel width automatically adjusts with market volatility, wider when volatile, narrower when calm'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? 'KC的三条线组成' : 'KC Three-Line Composition'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '中轨（Middle Line）：' : 'Middle Line:'}</strong>{' '}
                {isZh ? '通常使用20周期EMA' : 'Typically 20-period EMA'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '上轨（Upper Band）：' : 'Upper Band:'}</strong>{' '}
                {isZh ? '中轨 + (2 × ATR)' : 'Middle Line + (2 × ATR)'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '下轨（Lower Band）：' : 'Lower Band:'}</strong>{' '}
                {isZh ? '中轨 - (2 × ATR)' : 'Middle Line - (2 × ATR)'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: Calculation */}
      <section id="calculation" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? 'KC的计算与参数设置' : 'KC Calculation and Parameter Settings'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '计算公式' : 'Calculation Formulas'}</h3>
            <div className="space-y-3 font-mono text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 计算中轨（EMA）：' : '1. Calculate Middle Line (EMA):'}</strong>
              </p>
              <p className="pl-4">
                {isZh ? '中轨 = EMA(收盘价, N)' : 'Middle = EMA(Close, N)'}
              </p>
              <p className="mt-3">
                <strong className="text-white">{isZh ? '2. 计算ATR：' : '2. Calculate ATR:'}</strong>
              </p>
              <p className="pl-4">
                {isZh ? '真实波幅TR = Max(最高价-最低价, |最高价-昨收|, |最低价-昨收|)' : 'True Range TR = Max(High-Low, |High-PrevClose|, |Low-PrevClose|)'}
              </p>
              <p className="pl-4">
                {isZh ? 'ATR = EMA(TR, N)' : 'ATR = EMA(TR, N)'}
              </p>
              <p className="mt-3">
                <strong className="text-white">{isZh ? '3. 计算上下轨：' : '3. Calculate Upper/Lower Bands:'}</strong>
              </p>
              <p className="pl-4">
                {isZh ? '上轨 = 中轨 + (M × ATR)' : 'Upper Band = Middle + (M × ATR)'}
              </p>
              <p className="pl-4">
                {isZh ? '下轨 = 中轨 - (M × ATR)' : 'Lower Band = Middle - (M × ATR)'}
              </p>
              <p className="mt-3 text-white/80 dark:text-gray-300/80">
                {isZh ? '* 其中N通常为20，M通常为2' : '* Where N typically = 20, M typically = 2'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '标准参数' : 'Standard Parameters'}
              </h3>
              <p className="mb-2 font-bold text-white">EMA: 20, ATR: 20, {isZh ? '倍数' : 'Multiplier'}: 2</p>
              <p className="text-sm">
                {isZh
                  ? '适用于大多数市场和时间框架，平衡灵敏度与可靠性'
                  : 'Suitable for most markets and timeframes, balances sensitivity and reliability'}
              </p>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '短线参数' : 'Short-term Parameters'}
              </h3>
              <p className="mb-2 font-bold text-white">EMA: 10, ATR: 10, {isZh ? '倍数' : 'Multiplier'}: 1.5</p>
              <p className="text-sm">
                {isZh
                  ? '更敏感，适合日内交易，信号更多但假信号也增加'
                  : 'More sensitive, suitable for day trading, more signals but also more false signals'}
              </p>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '长线参数' : 'Long-term Parameters'}
              </h3>
              <p className="mb-2 font-bold text-white">EMA: 50, ATR: 50, {isZh ? '倍数' : 'Multiplier'}: 3</p>
              <p className="text-sm">
                {isZh
                  ? '更平滑，适合波段和长线交易，信号少但质量高'
                  : 'Smoother, suitable for swing and position trading, fewer but higher-quality signals'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: KC vs Bollinger Bands */}
      <section id="vs-bollinger" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? 'KC与布林带的区别' : 'KC vs Bollinger Bands'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '虽然肯特纳通道和布林带看起来相似，都是包络线指标，但两者的计算方法和应用场景有重要区别：'
              : 'While Keltner Channels and Bollinger Bands look similar as envelope indicators, they have important differences in calculation and application:'}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-800">
              <thead>
                <tr className="bg-gray-900 text-gray-300">
                  <th className="border-2 border-gray-800 p-3 text-left">
                    {isZh ? '特征' : 'Feature'}
                  </th>
                  <th className="border-2 border-gray-800 p-3 text-left">
                    {isZh ? '肯特纳通道 (KC)' : 'Keltner Channels (KC)'}
                  </th>
                  <th className="border-2 border-gray-800 p-3 text-left">
                    {isZh ? '布林带 (BB)' : 'Bollinger Bands (BB)'}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-300 dark:text-gray-300">
                <tr>
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">
                    {isZh ? '计算基础' : 'Calculation Basis'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '平均真实波幅 (ATR)' : 'Average True Range (ATR)'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '标准差 (Standard Deviation)' : 'Standard Deviation'}
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">
                    {isZh ? '中轨' : 'Middle Line'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? 'EMA（更敏感）' : 'EMA (more responsive)'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? 'SMA（更平滑）' : 'SMA (smoother)'}
                  </td>
                </tr>
                <tr>
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">
                    {isZh ? '波动性衡量' : 'Volatility Measure'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '真实价格范围' : 'True price range'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '价格偏离度' : 'Price deviation'}
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">
                    {isZh ? '最佳应用' : 'Best Application'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '趋势市场、突破交易' : 'Trending markets, breakout trading'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '震荡市场、反转交易' : 'Ranging markets, reversal trading'}
                  </td>
                </tr>
                <tr>
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">
                    {isZh ? '通道宽度' : 'Channel Width'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '较稳定，变化平缓' : 'More stable, gradual changes'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '较动态，快速收缩扩张' : 'More dynamic, rapid contraction/expansion'}
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">
                    {isZh ? '假信号' : 'False Signals'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '相对较少' : 'Relatively fewer'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '趋势市中较多' : 'More in trending markets'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-[#0a0a0a] border-l-4 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '💡 使用建议' : '💡 Usage Recommendations'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-300">
                {isZh
                  ? '在明显的趋势市场中，KC通常优于BB，因为其基于ATR的设计更能适应持续的单向运动'
                  : 'In clear trending markets, KC typically outperforms BB due to ATR-based design better adapting to sustained directional movement'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '在震荡盘整市场中，BB的标准差计算可能提供更精确的超买超卖信号'
                  : 'In ranging consolidation markets, BB\'s standard deviation may provide more precise overbought/oversold signals'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '最佳实践：在图表上同时显示KC和BB，两者共同确认的信号质量最高'
                  : 'Best practice: Display both KC and BB on chart, signals confirmed by both have highest quality'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Trading Strategies */}
      <section id="trading-strategies" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '经典KC交易策略' : 'Classic KC Trading Strategies'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '策略1：通道突破交易' : 'Strategy 1: Channel Breakout Trading'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '价格突破KC上轨或下轨，通常意味着趋势加速，是追踪趋势的良好时机。'
                  : 'Price breaking above upper or below lower KC band typically signals trend acceleration, good for trend following.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '做多信号：' : 'Long Signal:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '收盘价突破KC上轨' : 'Close breaks above upper KC band'}</li>
                  <li className="text-gray-300">{isZh ? '成交量放大（可选）' : 'Volume increase (optional)'}</li>
                  <li className="text-gray-300">{isZh ? '入场：下一根K线开盘' : 'Entry: Next candle open'}</li>
                  <li className="text-gray-300">{isZh ? '止损：KC中轨或下轨下方' : 'Stop: Below KC middle or lower band'}</li>
                  <li className="text-gray-300">{isZh ? '止盈：2-3倍通道宽度' : 'Target: 2-3x channel width'}</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a] mt-3">
                <p className="font-bold mb-2 text-white">{isZh ? '做空信号：' : 'Short Signal:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '收盘价跌破KC下轨' : 'Close breaks below lower KC band'}</li>
                  <li className="text-gray-300">{isZh ? '成交量放大（可选）' : 'Volume increase (optional)'}</li>
                  <li className="text-gray-300">{isZh ? '入场：下一根K线开盘' : 'Entry: Next candle open'}</li>
                  <li className="text-gray-300">{isZh ? '止损：KC中轨或上轨上方' : 'Stop: Above KC middle or upper band'}</li>
                  <li className="text-gray-300">{isZh ? '止盈：2-3倍通道宽度' : 'Target: 2-3x channel width'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '策略2：中轨趋势跟踪' : 'Strategy 2: Middle Line Trend Following'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '在强趋势中，价格回调至KC中轨（EMA）时往往是加仓或入场的好时机。'
                  : 'In strong trends, price pullbacks to KC middle line (EMA) often provide good add-on or entry opportunities.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '上升趋势操作：' : 'Uptrend Operation:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '确认上升趋势：价格持续在KC中轨上方' : 'Confirm uptrend: Price consistently above KC middle'}</li>
                  <li className="text-gray-300">{isZh ? '等待回调：价格回落至中轨附近' : 'Wait for pullback: Price retreats to middle line'}</li>
                  <li className="text-gray-300">{isZh ? '入场：价格触及中轨后反弹' : 'Entry: Price bounces from middle line'}</li>
                  <li className="text-gray-300">{isZh ? '止损：中轨下方20-30点' : 'Stop: 20-30 pips below middle line'}</li>
                  <li className="text-gray-300">{isZh ? '止盈：KC上轨或更高' : 'Target: KC upper band or higher'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '策略3：通道挤压突破' : 'Strategy 3: Channel Squeeze Breakout'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? 'KC通道收窄表明波动性降低，市场盘整。突破通道后往往会出现显著的方向性运动。'
                  : 'KC channel narrowing indicates decreasing volatility and consolidation. Breakouts often lead to significant directional moves.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '操作步骤：' : 'Operation Steps:'}</p>
                <ol className="list-decimal pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '识别通道收窄：KC上下轨距离明显缩小' : 'Identify narrowing: KC bands visibly contracting'}</li>
                  <li className="text-gray-300">{isZh ? '观察价格形态：三角形、旗形等' : 'Observe price patterns: triangles, flags, etc.'}</li>
                  <li className="text-gray-300">{isZh ? '等待突破：收盘价突破上轨或下轨' : 'Wait for breakout: Close beyond upper or lower band'}</li>
                  <li className="text-gray-300">{isZh ? '确认：突破后2-3根K线持续在通道外' : 'Confirm: 2-3 candles stay outside channel after breakout'}</li>
                  <li className="text-gray-300">{isZh ? '入场：确认后的第一个回调' : 'Entry: First pullback after confirmation'}</li>
                  <li className="text-gray-300">{isZh ? '止损：通道另一侧' : 'Stop: Opposite side of channel'}</li>
                </ol>
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
                {isZh ? 'KC + 价格行为' : 'KC + Price Action'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? '在KC通道关键位置寻找价格形态：'
                  : 'Look for price patterns at KC key levels:'}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? '中轨附近的Pin Bar = 强反转信号' : 'Pin Bar near middle = strong reversal'}</li>
                <li className="text-gray-300">{isZh ? '上轨的看跌吞没 = 趋势减速警告' : 'Bearish engulfing at upper = trend slowing'}</li>
                <li className="text-gray-300">{isZh ? '下轨的看涨吞没 = 反弹机会' : 'Bullish engulfing at lower = bounce opportunity'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? 'KC + MACD' : 'KC + MACD'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? 'KC确定趋势，MACD确认动能：'
                  : 'KC determines trend, MACD confirms momentum:'}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? '价格突破KC上轨 + MACD金叉 = 强烈做多' : 'Price breaks upper KC + MACD golden cross = strong long'}</li>
                <li className="text-gray-300">{isZh ? 'KC收窄 + MACD柱状图收缩 = 大行情前兆' : 'KC squeeze + MACD histogram contraction = big move ahead'}</li>
                <li className="text-gray-300">{isZh ? '价格在KC上轨 + MACD背离 = 趋势衰竭' : 'Price at upper KC + MACD divergence = trend exhaustion'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? 'KC + 支撑阻力' : 'KC + Support/Resistance'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? '关键价位与KC通道共振：'
                  : 'Key levels confluence with KC:'}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? 'KC上轨与阻力位重合 = 强阻力区' : 'KC upper + resistance = strong resistance zone'}</li>
                <li className="text-gray-300">{isZh ? 'KC下轨与支撑位重合 = 强支撑区' : 'KC lower + support = strong support zone'}</li>
                <li className="text-gray-300">{isZh ? '突破双重确认点 = 高概率交易' : 'Breakout of both = high-probability trade'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '多周期KC分析' : 'Multi-Timeframe KC Analysis'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? '提高信号可靠性的关键方法：'
                  : 'Key method to improve signal reliability:'}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? '日线KC确定主趋势方向' : 'Daily KC determines main trend direction'}</li>
                <li className="text-gray-300">{isZh ? '4小时KC寻找入场时机' : '4H KC finds entry timing'}</li>
                <li className="text-gray-300">{isZh ? '1小时KC精确入场点' : '1H KC pinpoints entry'}</li>
                <li className="text-gray-300">{isZh ? '多周期共振信号质量最高' : 'Multi-timeframe confluence = highest quality'}</li>
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
              ❌ {isZh ? '错误1：盲目追逐突破' : 'Mistake 1: Blindly Chasing Breakouts'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '看到价格突破KC就立即入场，不等待确认，容易被假突破套牢。'
                : 'Entering immediately on KC breakout without confirmation, easily trapped by false breakouts.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '等待收盘价确认突破，并观察2-3根K线是否持续在通道外。最好等待回踩确认后再入场。'
                : 'Wait for closing price confirmation and observe 2-3 candles staying outside. Best to wait for pullback confirmation.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误2：忽视整体趋势' : 'Mistake 2: Ignoring Overall Trend'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '在下降趋势中看到价格触及KC下轨就做多，逆势交易风险极高。'
                : 'Going long when price touches lower KC in downtrend, counter-trend trading extremely risky.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '始终在更大周期确认趋势方向，只做顺势交易。上升趋势做多，下降趋势做空。'
                : 'Always confirm trend direction on larger timeframe, only trade with trend. Long in uptrends, short in downtrends.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误3：参数过度优化' : 'Mistake 3: Over-Optimizing Parameters'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '不断调整KC参数以适应历史数据，导致"曲线拟合"，实盘效果差。'
                : 'Constantly adjusting KC parameters to fit historical data, causing "curve fitting," poor live performance.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '使用标准参数(20, 2)或少数经过验证的变体。重点应放在交易策略和风险管理上。'
                : 'Use standard parameters (20, 2) or few validated variants. Focus should be on trading strategy and risk management.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误4：没有设置止损' : 'Mistake 4: Not Setting Stop Loss'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '认为KC突破信号很可靠，不设止损，遇到假突破损失惨重。'
                : 'Believing KC breakout signals are very reliable, not setting stops, heavy losses on false breakouts.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '每笔交易都必须设置止损。突破交易的止损通常设在通道中轨或对侧通道外。'
                : 'Every trade must have stop loss. Breakout trade stops typically at middle line or beyond opposite band.'}
            </p>
          </div>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
