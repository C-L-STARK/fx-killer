import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { rsiIndicatorContent } from '@/content/education/rsi-indicator.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    rsiIndicatorContent.zh.title,
    rsiIndicatorContent.en.title,
    rsiIndicatorContent.zh.description,
    rsiIndicatorContent.en.description,
    rsiIndicatorContent.zh.keywords,
    rsiIndicatorContent.en.keywords,
    lang
  );
}

export default async function RSIIndicatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = rsiIndicatorContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: What is RSI */}
      <section id="what-is-rsi" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '什么是RSI指标？' : 'What is RSI Indicator?'}
        </h2>
        <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? 'RSI（Relative Strength Index，相对强弱指标）由J. Welles Wilder于1978年创建，是衡量价格动能和识别超买超卖状态的经典振荡指标。RSI通过比较一定时期内价格上涨和下跌的幅度，生成0-100之间的数值，帮助交易者判断市场是否过度买入或卖出。'
              : 'RSI (Relative Strength Index) was created by J. Welles Wilder in 1978, a classic oscillator for measuring price momentum and identifying overbought/oversold conditions. RSI compares magnitude of recent gains to losses over a period, generating 0-100 value to help traders judge if market is excessively bought or sold.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? 'RSI的核心特点' : 'RSI Core Features'}</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '动能测量：' : 'Momentum measurement:'}</strong>{' '}
                {isZh
                  ? '量化价格上涨和下跌的速度与幅度'
                  : 'Quantifies speed and magnitude of price rises and falls'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '超买超卖识别：' : 'Overbought/oversold identification:'}</strong>{' '}
                {isZh
                  ? '70以上=超买，30以下=超卖（标准阈值）'
                  : 'Above 70 = overbought, below 30 = oversold (standard thresholds)'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '背离信号：' : 'Divergence signals:'}</strong>{' '}
                {isZh
                  ? '价格与RSI走势相反时，预示趋势可能反转'
                  : 'When price and RSI move opposite, signals potential trend reversal'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '趋势判断：' : 'Trend judgment:'}</strong>{' '}
                {isZh
                  ? 'RSI 50中线可作为牛熊分界线'
                  : 'RSI 50 midline acts as bull/bear dividing line'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? 'RSI数值解读' : 'RSI Value Interpretation'}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 bg-red-100 dark:bg-red-900/30 border-l-4 border-red-600">
                <span className="text-gray-300"><strong className="text-white">70 - 100:</strong> {isZh ? '超买区域' : 'Overbought zone'}</span>
                <span className="text-red-600 dark:text-red-400">{isZh ? '警惕回调' : 'Alert for pullback'}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-600">
                <span className="text-gray-300"><strong className="text-white">50 - 70:</strong> {isZh ? '强势区域' : 'Strong zone'}</span>
                <span className="text-yellow-600 dark:text-yellow-400">{isZh ? '上升趋势' : 'Uptrend'}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-100 dark:bg-[#0a0a0a] border-l-4 border-gray-600">
                <span className="text-gray-300"><strong className="text-white">50:</strong> {isZh ? '中线' : 'Midline'}</span>
                <span className="text-gray-600 dark:text-gray-400">{isZh ? '牛熊分界' : 'Bull/bear divide'}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-100 dark:bg-[#0a0a0a] border-l-4 border-[#ff102a]">
                <span className="text-gray-300"><strong className="text-white">30 - 50:</strong> {isZh ? '弱势区域' : 'Weak zone'}</span>
                <span className="text-blue-600 dark:text-blue-400">{isZh ? '下降趋势' : 'Downtrend'}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-100 dark:bg-green-900/30 border-l-4 border-green-600">
                <span className="text-gray-300"><strong className="text-white">0 - 30:</strong> {isZh ? '超卖区域' : 'Oversold zone'}</span>
                <span className="text-green-600 dark:text-green-400">{isZh ? '警惕反弹' : 'Alert for bounce'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Calculation */}
      <section id="calculation" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? 'RSI的计算与参数设置' : 'RSI Calculation and Parameter Settings'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '计算公式' : 'Calculation Formula'}</h3>
            <div className="space-y-3 font-mono text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 计算平均涨幅和平均跌幅：' : '1. Calculate Average Gain and Average Loss:'}</strong>
              </p>
              <p className="pl-4">
                {isZh ? '平均涨幅 = N周期内上涨日涨幅的平均值' : 'Average Gain = Average of gains over N periods'}
              </p>
              <p className="pl-4">
                {isZh ? '平均跌幅 = N周期内下跌日跌幅的平均值' : 'Average Loss = Average of losses over N periods'}
              </p>
              <p className="mt-3">
                <strong className="text-white">{isZh ? '2. 计算相对强度（RS）：' : '2. Calculate Relative Strength (RS):'}</strong>
              </p>
              <p className="pl-4">
                RS = {isZh ? '平均涨幅 ÷ 平均跌幅' : 'Average Gain ÷ Average Loss'}
              </p>
              <p className="mt-3">
                <strong className="text-white">{isZh ? '3. 计算RSI：' : '3. Calculate RSI:'}</strong>
              </p>
              <p className="pl-4">
                RSI = 100 - (100 ÷ (1 + RS))
              </p>
              <p className="mt-3 text-white/80 dark:text-gray-300/80">
                {isZh
                  ? '💡 简化理解：RSI衡量上涨力量在总体价格变动中的占比。RSI 70意味着70%的动能是上涨的。'
                  : '💡 Simplified: RSI measures proportion of upward momentum in total price movement. RSI 70 means 70% momentum is upward.'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '标准参数' : 'Standard Parameters'}
              </h3>
              <p className="mb-2 font-bold text-white">RSI(14)</p>
              <p className="text-sm mb-2">
                {isZh ? '超买/超卖：70/30' : 'Overbought/Oversold: 70/30'}
              </p>
              <p className="text-sm">
                {isZh
                  ? 'Wilder原创参数，适用于大多数市场，平衡灵敏度与可靠性'
                  : 'Wilder\'s original parameters, suitable for most markets, balances sensitivity and reliability'}
              </p>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '激进参数' : 'Aggressive Parameters'}
              </h3>
              <p className="mb-2 font-bold text-white">RSI(7-9)</p>
              <p className="text-sm mb-2">
                {isZh ? '超买/超卖：80/20' : 'Overbought/Oversold: 80/20'}
              </p>
              <p className="text-sm">
                {isZh
                  ? '更敏感，适合短线交易，信号更多但假信号也增加'
                  : 'More sensitive, suitable for short-term trading, more signals but also more false signals'}
              </p>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '保守参数' : 'Conservative Parameters'}
              </h3>
              <p className="mb-2 font-bold text-white">RSI(21-25)</p>
              <p className="text-sm mb-2">
                {isZh ? '超买/超卖：75/25' : 'Overbought/Oversold: 75/25'}
              </p>
              <p className="text-sm">
                {isZh
                  ? '更平滑，适合波段和长线交易，信号少但质量高'
                  : 'Smoother, suitable for swing and position trading, fewer but higher-quality signals'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-[#0a0a0a] border-l-4 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '⚠️ 参数调整建议' : '⚠️ Parameter Adjustment Recommendations'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '波动性高的货币对：' : 'High volatility pairs:'}</strong>{' '}
                {isZh ? '使用80/20阈值减少假信号' : 'Use 80/20 thresholds to reduce false signals'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '波动性低的货币对：' : 'Low volatility pairs:'}</strong>{' '}
                {isZh ? '使用70/30或65/35获取更多信号' : 'Use 70/30 or 65/35 for more signals'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '趋势市场：' : 'Trending markets:'}</strong>{' '}
                {isZh ? '考虑调整为75/25，因为趋势中经常超买超卖' : 'Consider 75/25 as trends often overbought/oversold'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '震荡市场：' : 'Ranging markets:'}</strong>{' '}
                {isZh ? '标准70/30效果最佳' : 'Standard 70/30 works best'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Interpretation */}
      <section id="interpretation" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '如何解读RSI信号' : 'How to Interpret RSI Signals'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '🔴 超买信号（RSI > 70）' : '🔴 Overbought Signal (RSI > 70)'}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  <strong className="text-white">{isZh ? '含义：' : 'Meaning:'}</strong>{' '}
                  {isZh ? '市场可能上涨过快，存在回调风险' : 'Market may have risen too fast, pullback risk exists'}
                </p>
                <p className="text-gray-300">
                  <strong className="text-white">{isZh ? '⚠️ 重要：' : '⚠️ Important:'}</strong>{' '}
                  {isZh ? '超买≠立即卖出！在强趋势中，RSI可长期超买' : 'Overbought ≠ sell immediately! In strong trends, RSI can stay overbought'}
                </p>
                <p className="text-gray-300">
                  <strong className="text-white">{isZh ? '正确做法：' : 'Correct approach:'}</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-gray-300">{isZh ? '上升趋势：超买是正常的，不要逆势做空' : 'Uptrend: overbought is normal, don\'t counter-trend short'}</li>
                  <li className="text-gray-300">{isZh ? '下降趋势：RSI超买+价格触阻力=做空机会' : 'Downtrend: RSI overbought + price at resistance = short opportunity'}</li>
                  <li className="text-gray-300">{isZh ? '等待RSI回落至70以下确认' : 'Wait for RSI to fall below 70 for confirmation'}</li>
                </ul>
              </div>
            </div>

            <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '🟢 超卖信号（RSI < 30）' : '🟢 Oversold Signal (RSI < 30)'}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  <strong className="text-white">{isZh ? '含义：' : 'Meaning:'}</strong>{' '}
                  {isZh ? '市场可能下跌过快，存在反弹机会' : 'Market may have fallen too fast, bounce opportunity exists'}
                </p>
                <p className="text-gray-300">
                  <strong className="text-white">{isZh ? '⚠️ 重要：' : '⚠️ Important:'}</strong>{' '}
                  {isZh ? '超卖≠立即买入！在强下跌中，RSI可长期超卖' : 'Oversold ≠ buy immediately! In strong declines, RSI can stay oversold'}
                </p>
                <p className="text-gray-300">
                  <strong className="text-white">{isZh ? '正确做法：' : 'Correct approach:'}</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-gray-300">{isZh ? '下降趋势：超卖是正常的，不要逆势做多' : 'Downtrend: oversold is normal, don\'t counter-trend long'}</li>
                  <li className="text-gray-300">{isZh ? '上升趋势：RSI超卖+价格触支撑=做多机会' : 'Uptrend: RSI oversold + price at support = long opportunity'}</li>
                  <li className="text-gray-300">{isZh ? '等待RSI上升至30以上确认' : 'Wait for RSI to rise above 30 for confirmation'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? 'RSI背离：最强反转信号' : 'RSI Divergence: Strongest Reversal Signal'}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold mb-2 text-white">{isZh ? '顶背离（Bearish Divergence）：' : 'Bearish Divergence:'}</p>
                <ul className="space-y-1 text-sm">
                  <li className="text-gray-300">✓ {isZh ? '价格创新高，RSI未创新高' : 'Price makes new high, RSI doesn\'t'}</li>
                  <li className="text-gray-300">✓ {isZh ? '表明上涨动能减弱' : 'Indicates weakening upward momentum'}</li>
                  <li className="text-gray-300">✓ {isZh ? '预示可能下跌反转' : 'Signals potential downward reversal'}</li>
                  <li className="text-gray-300">✓ {isZh ? '在超买区发生的背离最可靠' : 'Divergence in overbought zone most reliable'}</li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-2 text-white">{isZh ? '底背离（Bullish Divergence）：' : 'Bullish Divergence:'}</p>
                <ul className="space-y-1 text-sm">
                  <li className="text-gray-300">✓ {isZh ? '价格创新低，RSI未创新低' : 'Price makes new low, RSI doesn\'t'}</li>
                  <li className="text-gray-300">✓ {isZh ? '表明下跌动能减弱' : 'Indicates weakening downward momentum'}</li>
                  <li className="text-gray-300">✓ {isZh ? '预示可能上涨反转' : 'Signals potential upward reversal'}</li>
                  <li className="text-gray-300">✓ {isZh ? '在超卖区发生的背离最可靠' : 'Divergence in oversold zone most reliable'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? 'RSI 50中线的应用' : 'RSI 50 Midline Application'}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? 'RSI > 50：' : 'RSI > 50:'}</strong>{' '}
                {isZh ? '多头控制，上升趋势，优先做多' : 'Bulls in control, uptrend, prioritize longs'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? 'RSI < 50：' : 'RSI < 50:'}</strong>{' '}
                {isZh ? '空头控制，下降趋势，优先做空' : 'Bears in control, downtrend, prioritize shorts'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? 'RSI突破50：' : 'RSI breaks 50:'}</strong>{' '}
                {isZh ? '向上突破=趋势转多；向下突破=趋势转空' : 'Upward break = trend turns bullish; downward = bearish'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? 'RSI回踩50：' : 'RSI pullback to 50:'}</strong>{' '}
                {isZh ? '强趋势中，RSI回调至50附近是加仓点' : 'In strong trends, RSI pullback to ~50 is add-on point'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Trading Strategies */}
      <section id="trading-strategies" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '经典RSI交易策略' : 'Classic RSI Trading Strategies'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '策略1：RSI超买超卖反转交易' : 'Strategy 1: RSI Overbought/Oversold Reversal Trading'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '在震荡市场中，RSI到达极端区域后往往会均值回归，产生反转交易机会。'
                  : 'In ranging markets, RSI reaching extreme zones often mean-reverts, creating reversal trading opportunities.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '超卖反弹做多：' : 'Oversold Bounce Long:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '确认震荡市：价格在明显支撑阻力区间内波动' : 'Confirm range: Price oscillating within clear S/R zone'}</li>
                  <li className="text-gray-300">{isZh ? 'RSI跌至30以下进入超卖区' : 'RSI falls below 30 into oversold zone'}</li>
                  <li className="text-gray-300">{isZh ? '价格触及支撑位或前低' : 'Price touches support or previous low'}</li>
                  <li className="text-gray-300">{isZh ? '等待RSI回升至30以上（离开超卖区）' : 'Wait for RSI to rise above 30 (exit oversold)'}</li>
                  <li className="text-gray-300">{isZh ? '配合看涨K线形态（如锤子线）' : 'Combine with bullish patterns (e.g., hammer)'}</li>
                  <li className="text-gray-300">{isZh ? '入场：确认后开盘价' : 'Entry: Open after confirmation'}</li>
                  <li className="text-gray-300">{isZh ? '止损：支撑位下方20-30点' : 'Stop: 20-30 pips below support'}</li>
                  <li className="text-gray-300">{isZh ? '止盈：阻力位或RSI达到70' : 'Target: Resistance or RSI reaches 70'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '策略2：RSI背离反转交易' : 'Strategy 2: RSI Divergence Reversal Trading'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? 'RSI背离是趋势即将反转的最可靠早期信号之一，配合其他确认可获得高胜率交易。'
                  : 'RSI divergence is one of the most reliable early signals of impending trend reversal, combined with other confirmations yields high win-rate trades.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '顶背离做空：' : 'Bearish Divergence Short:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '识别：价格创新高（高点2 > 高点1），RSI未创新高（RSI2 < RSI1）' : 'Identify: Price new high (peak2 > peak1), RSI doesn\'t (RSI2 < RSI1)'}</li>
                  <li className="text-gray-300">{isZh ? 'RSI最好在超买区（>70）发生背离' : 'RSI preferably in overbought zone (>70) for divergence'}</li>
                  <li className="text-gray-300">{isZh ? '等待确认信号：' : 'Wait for confirmation signals:'}</li>
                  <li className="pl-6">{isZh ? '- RSI跌破50中线' : '- RSI breaks below 50 midline'}</li>
                  <li className="pl-6">{isZh ? '- 价格出现看跌反转K线（如流星线、看跌吞没）' : '- Price shows bearish reversal pattern (shooting star, bearish engulfing)'}</li>
                  <li className="pl-6">{isZh ? '- 价格跌破支撑位' : '- Price breaks below support'}</li>
                  <li className="text-gray-300">{isZh ? '入场：确认后的第一个反弹' : 'Entry: First bounce after confirmation'}</li>
                  <li className="text-gray-300">{isZh ? '止损：背离点高点上方' : 'Stop: Above divergence peak'}</li>
                  <li className="text-gray-300">{isZh ? '止盈：前低或RSI超卖区（<30）' : 'Target: Previous low or RSI oversold (<30)'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '策略3：RSI 50中线突破趋势跟踪' : 'Strategy 3: RSI 50 Midline Breakout Trend Following'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? 'RSI突破50中线表明市场动能转变，是趋势建立的早期信号，适合捕捉新趋势的开始。'
                  : 'RSI breaking 50 midline indicates momentum shift, early signal of trend establishment, suitable for catching trend beginnings.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? 'RSI向上突破50做多：' : 'RSI Breaks Above 50 Long:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? 'RSI从下方向上突破50中线' : 'RSI breaks above 50 midline from below'}</li>
                  <li className="text-gray-300">{isZh ? '配合价格突破下降趋势线或阻力位' : 'Combine with price breaking downtrend line or resistance'}</li>
                  <li className="text-gray-300">{isZh ? '成交量放大（可选）' : 'Volume increase (optional)'}</li>
                  <li className="text-gray-300">{isZh ? '入场：RSI确认站稳50上方（2-3根K线）' : 'Entry: RSI confirms above 50 (2-3 candles)'}</li>
                  <li className="text-gray-300">{isZh ? '止损：50线下方或突破点下方' : 'Stop: Below 50 line or breakout point'}</li>
                  <li className="text-gray-300">{isZh ? '止盈：RSI达到70或价格到达目标位' : 'Target: RSI reaches 70 or price hits target'}</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a] mt-3">
                <p className="font-bold mb-2 text-white">{isZh ? '进阶技巧：' : 'Advanced Technique:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '在上升趋势中，RSI回调至50-55区域是加仓点' : 'In uptrend, RSI pullback to 50-55 zone is add-on point'}</li>
                  <li className="text-gray-300">{isZh ? '只要RSI保持在50上方，趋势延续，持续持有' : 'As long as RSI stays above 50, trend continues, keep holding'}</li>
                  <li className="text-gray-300">{isZh ? 'RSI跌破50=趋势可能结束，减仓或平仓' : 'RSI breaks below 50 = trend may end, reduce or close position'}</li>
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
                {isZh ? 'RSI + 布林带（黄金组合）' : 'RSI + Bollinger Bands (Golden Combo)'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? '两者互补，大幅提高信号质量：'
                  : 'Complementary, significantly improves signal quality:'}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '双重确认做多：' : 'Double confirmation long:'}</strong>{' '}
                  {isZh ? '价格触BB下轨 + RSI<30' : 'Price at BB lower + RSI<30'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '双重确认做空：' : 'Double confirmation short:'}</strong>{' '}
                  {isZh ? '价格触BB上轨 + RSI>70' : 'Price at BB upper + RSI>70'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '假突破识别：' : 'False breakout identification:'}</strong>{' '}
                  {isZh ? '价格破BB但RSI未超买/卖=假突破' : 'Price breaks BB but RSI not overbought/sold = false breakout'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '趋势确认：' : 'Trend confirmation:'}</strong>{' '}
                  {isZh ? 'BB扩张 + RSI>50=强趋势' : 'BB expansion + RSI>50 = strong trend'}
                </li>
              </ul>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? 'RSI + MACD' : 'RSI + MACD'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? 'RSI看超买超卖，MACD看趋势：'
                  : 'RSI for overbought/oversold, MACD for trend:'}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? 'RSI从超卖上升 + MACD金叉 = 强做多' : 'RSI rising from oversold + MACD golden cross = strong long'}</li>
                <li className="text-gray-300">{isZh ? 'RSI从超买下降 + MACD死叉 = 强做空' : 'RSI falling from overbought + MACD death cross = strong short'}</li>
                <li className="text-gray-300">{isZh ? '两者同时背离 = 最强反转信号' : 'Both diverge simultaneously = strongest reversal'}</li>
                <li className="text-gray-300">{isZh ? 'RSI>50 + MACD零轴上金叉 = 确认上升趋势' : 'RSI>50 + MACD golden cross above zero = confirm uptrend'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? 'RSI + 支撑阻力' : 'RSI + Support/Resistance'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? '关键价位配合RSI信号：'
                  : 'Key levels with RSI signals:'}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? '价格在支撑 + RSI超卖 = 高胜率做多' : 'Price at support + RSI oversold = high win-rate long'}</li>
                <li className="text-gray-300">{isZh ? '价格在阻力 + RSI超买 = 高胜率做空' : 'Price at resistance + RSI overbought = high win-rate short'}</li>
                <li className="text-gray-300">{isZh ? '突破阻力 + RSI>50 = 有效突破确认' : 'Break resistance + RSI>50 = valid breakout confirmation'}</li>
                <li className="text-gray-300">{isZh ? '假突破：破位但RSI未配合 = 陷阱' : 'False breakout: break but RSI doesn\'t cooperate = trap'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '多周期RSI分析' : 'Multi-Timeframe RSI Analysis'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? '自上而下提高成功率：'
                  : 'Top-down improves success rate:'}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? '日线RSI：确定整体动能方向' : 'Daily RSI: Determine overall momentum direction'}</li>
                <li className="text-gray-300">{isZh ? '4小时RSI：寻找入场时机' : '4H RSI: Find entry timing'}</li>
                <li className="text-gray-300">{isZh ? '1小时RSI：精确入场点' : '1H RSI: Pinpoint entry'}</li>
                <li className="text-gray-300">{isZh ? '三个周期RSI同时超买/超卖 = 最强信号' : 'All three timeframes overbought/oversold = strongest signal'}</li>
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
              ❌ {isZh ? '错误1：看到超买就做空，看到超卖就做多' : 'Mistake 1: Shorting on Overbought, Longing on Oversold'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '这是新手最常犯的致命错误。在强趋势中，RSI可以长期处于超买或超卖状态。'
                : 'This is the deadliest beginner mistake. In strong trends, RSI can stay overbought or oversold for extended periods.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '先判断趋势！上升趋势中，RSI超买是正常的，等RSI超卖时做多；下降趋势中，RSI超卖是正常的，等RSI超买时做空。永远顺势而为。'
                : 'Judge trend first! In uptrend, RSI overbought is normal, wait for oversold to long; in downtrend, RSI oversold is normal, wait for overbought to short. Always trade with trend.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误2：忽视背离需要确认' : 'Mistake 2: Ignoring Divergence Needs Confirmation'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '一看到RSI背离就立即入场，不等待确认信号，经常被套在趋势延续中。'
                : 'Entering immediately on RSI divergence without confirmation, often trapped in trend continuation.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '背离只是预警！必须等待确认：RSI跌破/突破50中线、价格反转K线形态、支撑阻力位突破等。多重确认降低假信号。'
                : 'Divergence is only warning! Must wait for confirmation: RSI breaks 50, price reversal patterns, S/R breaks, etc. Multiple confirmations reduce false signals.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误3：单独使用RSI' : 'Mistake 3: Using RSI Alone'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '认为RSI万能，不结合其他指标或价格分析，信号质量低，胜率差。'
                : 'Believing RSI is all-powerful, not combining with other indicators or price analysis, low signal quality, poor win rate.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? 'RSI应与其他工具组合：布林带识别极端、MACD确认趋势、支撑阻力确认关键位。RSI+BB组合可将胜率提升至70%+。'
                : 'RSI should combine with other tools: BB for extremes, MACD for trend, S/R for key levels. RSI+BB combo can boost win rate to 70%+.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误4：忽视50中线的重要性' : 'Mistake 4: Ignoring 50 Midline Importance'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '只关注超买超卖区域70/30，忽视50中线的趋势判断功能。'
                : 'Only focusing on overbought/oversold zones 70/30, ignoring 50 midline\'s trend judgment function.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? 'RSI 50是牛熊分界线！上升趋势中在50-55区域做多，下降趋势中在45-50区域做空。50中线策略往往优于超买超卖策略。'
                : 'RSI 50 is bull/bear divide! In uptrend long at 50-55 zone, in downtrend short at 45-50 zone. 50-line strategy often outperforms overbought/oversold.'}
            </p>
          </div>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
