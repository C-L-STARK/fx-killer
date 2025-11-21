import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { priceActionContent } from '@/content/education/price-action.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    priceActionContent.zh.title,
    priceActionContent.en.title,
    priceActionContent.zh.description,
    priceActionContent.en.description,
    priceActionContent.zh.keywords,
    priceActionContent.en.keywords,
    lang
  );
}

export default async function PriceActionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = priceActionContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: Price Action Philosophy */}
      <section id="price-action-philosophy" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '价格行为交易理念' : 'Price Action Trading Philosophy'}
        </h2>
        <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '价格行为交易（Price Action Trading）是一种完全基于价格走势本身的交易方法，不依赖任何技术指标（如MACD、RSI、布林带等）。价格行为交易者相信"价格包含一切信息"：所有基本面因素、市场情绪、供需关系，最终都反映在价格和K线形态上。相比指标交易，价格行为交易更"原始"、更"直接"，也更"高效"，因为它直接读取市场的"语言"而非经过计算的"翻译"。'
              : 'Price Action Trading is a trading method entirely based on price movement itself, not relying on any technical indicators (like MACD, RSI, Bollinger Bands). Price action traders believe "price contains all information": all fundamental factors, market sentiment, supply/demand relationships are ultimately reflected in price and candlestick patterns. Compared to indicator trading, price action is more "primitive", more "direct", and more "efficient", as it directly reads market "language" rather than calculated "translations".'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '价格行为交易的核心理念' : 'Core Philosophy of Price Action'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 价格优先于一切（Price is King）：' : '1. Price is King:'}</strong>{' '}
                {isZh
                  ? '所有技术指标都是价格的衍生物（基于历史价格计算），存在滞后性。价格是"因"，指标是"果"。与其看指标判断价格，不如直接看价格本身。价格行为交易者的图表只有K线、支撑阻力位、趋势线，没有任何指标。'
                  : 'All technical indicators are derivatives of price (calculated from historical prices), with lag. Price is "cause", indicators are "effect". Rather than looking at indicators to judge price, directly look at price itself. Price action trader\'s chart only has candlesticks, S/R levels, trendlines, no indicators.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 简单即完美（Less is More）：' : '2. Less is More:'}</strong>{' '}
                {isZh
                  ? '新手倾向于在图表上堆砌10+个指标（MACD + RSI + Stochastic + MA + BB...），结果陷入"分析瘫痪"（信号冲突，无法决策）。价格行为交易追求极简：一张干净的K线图 + 关键支撑阻力 = 足够。简单的系统更容易执行，更少受情绪干扰。'
                  : 'Beginners tend to pile 10+ indicators on chart (MACD + RSI + Stochastic + MA + BB...), resulting in "analysis paralysis" (conflicting signals, unable to decide). Price action pursues minimalism: clean candlestick chart + key S/R = enough. Simple system easier to execute, less emotional interference.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 关键位置决定一切（Location, Location, Location）：' : '3. Location Determines Everything:'}</strong>{' '}
                {isZh
                  ? '价格行为交易的核心不是"看到什么K线形态"，而是"形态出现在哪里"。同样的Pin Bar，出现在前高阻力位（有效）vs 出现在价格中段（无效）。80%的交易成功取决于"位置选择"，20%取决于"形态识别"。'
                  : 'Core of price action trading is not "what candlestick pattern appears", but "where pattern appears". Same Pin Bar, at previous high resistance (valid) vs mid-price range (invalid). 80% trading success depends on "location selection", 20% on "pattern recognition".'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 市场结构主导交易（Market Structure is Boss）：' : '4. Market Structure is Boss:'}</strong>{' '}
                {isZh
                  ? '价格行为交易者首先识别市场结构：上升趋势（Higher Highs + Higher Lows）、下降趋势（Lower Highs + Lower Lows）、横盘震荡（Range）。市场结构决定交易方向：上升趋势只做多，下降趋势只做空，横盘区间高抛低吸。'
                  : 'Price action traders first identify market structure: uptrend (Higher Highs + Higher Lows), downtrend (Lower Highs + Lower Lows), ranging (Range). Market structure determines trading direction: uptrend only long, downtrend only short, range buy low sell high.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '5. 风险管理是生存之本（Risk First, Profit Second）：' : '5. Risk Management is Survival:'}</strong>{' '}
                {isZh
                  ? '价格行为交易不是"暴富系统"，而是"概率游戏"。单笔交易胜率60-70%，通过严格的风险管理（止损、仓位、风险回报比）确保长期盈利。宁可错过10个机会，也不能冒险1次重仓赌博。'
                  : 'Price action trading is not "get-rich system", but "probability game". Single trade win rate 60-70%, through strict risk management (stop-loss, position sizing, risk-reward) ensure long-term profit. Rather miss 10 opportunities than risk 1 heavy position gamble.'}
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '价格行为交易的优势' : 'Advantages of Price Action Trading'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '图表清晰简洁，无指标干扰，专注价格本身' : 'Clean chart, no indicator interference, focus on price'}</li>
                <li className="text-gray-300">{isZh ? '实时反应市场变化，无滞后性（指标滞后1-5根K线）' : 'Real-time reflects market, no lag (indicators lag 1-5 candles)'}</li>
                <li className="text-gray-300">{isZh ? '适用所有市场（外汇、股票、期货、加密货币）和所有时间框架' : 'Works in all markets (forex, stocks, futures, crypto) and timeframes'}</li>
                <li className="text-gray-300">{isZh ? '降低过度交易风险（只在高概率位置交易）' : 'Reduces overtrading risk (only trade high-probability locations)'}</li>
                <li className="text-gray-300">{isZh ? '培养对市场的"感觉"和"直觉"，长期受益' : 'Develops market "feel" and "intuition", long-term benefit'}</li>
                <li className="text-gray-300">{isZh ? '无需学习复杂指标公式，新手友好' : 'No need to learn complex indicator formulas, beginner-friendly'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '价格行为交易的挑战' : 'Challenges of Price Action Trading'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '需要时间练习和经验积累（至少3-6个月）' : 'Needs time to practice and accumulate experience (at least 3-6 months)'}</li>
                <li className="text-gray-300">{isZh ? '主观性强，不同交易者对同一形态理解不同' : 'Highly subjective, different traders interpret same pattern differently'}</li>
                <li className="text-gray-300">{isZh ? '初期容易"看不懂"市场（习惯依赖指标的交易者）' : 'Initially hard to "read" market (traders used to relying on indicators)'}</li>
                <li className="text-gray-300">{isZh ? '需要严格纪律，不能"强行交易"（无信号时不交易很难）' : 'Requires strict discipline, can\'t "force trades" (hard not to trade with no signal)'}</li>
                <li className="text-gray-300">{isZh ? '在横盘震荡市场信号频繁但质量低' : 'In ranging markets, signals frequent but quality low'}</li>
                <li className="text-gray-300">{isZh ? '无法量化回测（K线形态识别难以编程）' : 'Can\'t quantitatively backtest (candlestick pattern recognition hard to program)'}</li>
              </ul>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '价格行为 vs 指标交易：哪个更好？' : 'Price Action vs Indicator Trading: Which is Better?'}
            </h3>
            <p className="mb-3">
              {isZh
                ? '两者没有绝对优劣，取决于个人风格。但统计显示，长期盈利的交易者中，70%以价格行为为主（可能保留1-2个MA辅助），30%以指标为主。原因：价格行为更"纯粹"，减少过度分析，提高决策速度。'
                : 'Neither is absolutely better, depends on personal style. But statistics show among long-term profitable traders, 70% primarily use price action (may keep 1-2 MAs as aid), 30% primarily indicators. Reason: price action more "pure", reduces over-analysis, improves decision speed.'}
            </p>
            <p className="text-sm">
              <strong className="text-white">{isZh ? '建议：' : 'Recommendation:'}</strong>{' '}
              {isZh
                ? '新手可从"混合模式"开始：裸K图表 + 20/50 EMA辅助判断趋势 + 支撑阻力位。经过3-6个月练习后，逐步移除MA，过渡到纯裸K交易。记住：工具越少，决策越快，执行越坚决。'
                : 'Beginners can start with "hybrid mode": naked chart + 20/50 EMA to aid trend judgment + S/R levels. After 3-6 months practice, gradually remove MAs, transition to pure naked trading. Remember: fewer tools, faster decisions, more decisive execution.'}
            </p>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '价格行为交易适合谁？' : 'Who is Price Action Trading Suitable For?'}
            </h3>
            <p className="text-gray-300">
              {isZh
                ? '价格行为交易适合：1) 喜欢简洁图表、讨厌指标堆砌的交易者；2) 有耐心等待高质量信号的交易者；3) 能接受主观判断、不追求"完美系统"的交易者；4) 愿意投入时间学习和练习的交易者。不适合：1) 需要"确定性"和"量化规则"的交易者；2) 无法忍受主观判断的交易者；3) 追求高频交易、大量交易机会的交易者（价格行为信号质量优于数量）。'
                : 'Price action suits: 1) Traders who prefer clean charts, dislike indicator clutter; 2) Traders with patience to wait for quality signals; 3) Traders accepting subjective judgment, not pursuing "perfect system"; 4) Traders willing to invest time learning and practicing. Not suitable for: 1) Traders needing "certainty" and "quantified rules"; 2) Traders unable to tolerate subjective judgment; 3) Traders pursuing high-frequency trading, abundant opportunities (price action prioritizes quality over quantity).'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Core Patterns */}
      <section id="core-patterns" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '核心形态详解' : 'Core Patterns Explained'}
        </h2>
        <div className="space-y-6">
          <p className="text-gray-300 dark:text-gray-300">
            {isZh
              ? '价格行为交易有三个核心形态：Pin Bar（针形线）、Inside Bar（母子线）、Outside Bar（包容线）。这三个形态简单、清晰、有效，是价格行为交易的"核武器"。掌握这三个形态，足以在市场中长期盈利。'
              : 'Price action trading has three core patterns: Pin Bar, Inside Bar, Outside Bar. These three patterns are simple, clear, effective, the "nuclear weapons" of price action trading. Master these three, sufficient for long-term profit in markets.'}
          </p>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '1. Pin Bar（针形线）- 价格拒绝信号' : '1. Pin Bar - Price Rejection Signal'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '形态特征：' : 'Pattern Characteristics:'}</strong>{' '}
                {isZh
                  ? 'Pin Bar由小实体 + 长影线（至少是实体的2-3倍）+ 短或无相反方向影线组成。Pin Bar显示价格尝试某个方向后被强力拒绝，市场参与者不接受该价格，随即反向。Pin Bar的"针"（长影线）指向被拒绝的方向，交易方向与针相反。'
                  : 'Pin Bar consists of small body + long shadow (at least 2-3x body) + short/no opposite shadow. Pin Bar shows price attempted direction then strongly rejected, market participants don\'t accept that price, immediately reverses. Pin Bar\'s "pin" (long shadow) points to rejected direction, trade opposite to pin.'}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? '看涨Pin Bar（Bullish Pin Bar）' : 'Bullish Pin Bar'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '长下影线（针向下），短或无上影线' : 'Long lower shadow (pin down), short/no upper shadow'}</li>
                    <li className="text-gray-300">{isZh ? '小实体（可以是阳线或阴线）' : 'Small body (can be bullish or bearish)'}</li>
                    <li className="text-gray-300">{isZh ? '收盘价接近K线高点（上1/3区域）' : 'Close near candle high (upper 1/3 zone)'}</li>
                    <li className="text-gray-300">{isZh ? '出现在下降趋势底部或支撑位' : 'Appears at downtrend bottom or support'}</li>
                    <li className="text-gray-300">{isZh ? '含义：价格跌至低点后被强力拉升，卖盘耗尽' : 'Meaning: price fell to low then strongly lifted, selling exhausted'}</li>
                    <li className="text-gray-300">{isZh ? '交易：做多，止损针（下影线）下方' : 'Trade: long, stop below pin (lower shadow)'}</li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? '看跌Pin Bar（Bearish Pin Bar / Shooting Star）' : 'Bearish Pin Bar (Shooting Star)'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '长上影线（针向上），短或无下影线' : 'Long upper shadow (pin up), short/no lower shadow'}</li>
                    <li className="text-gray-300">{isZh ? '小实体（可以是阳线或阴线）' : 'Small body (can be bullish or bearish)'}</li>
                    <li className="text-gray-300">{isZh ? '收盘价接近K线低点（下1/3区域）' : 'Close near candle low (lower 1/3 zone)'}</li>
                    <li className="text-gray-300">{isZh ? '出现在上升趋势顶部或阻力位' : 'Appears at uptrend top or resistance'}</li>
                    <li className="text-gray-300">{isZh ? '含义：价格涨至高点后被强力打压，买盘耗尽' : 'Meaning: price rose to high then strongly pushed down, buying exhausted'}</li>
                    <li className="text-gray-300">{isZh ? '交易：做空，止损针（上影线）上方' : 'Trade: short, stop above pin (upper shadow)'}</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-gray-900 text-gray-300 mt-3">
                <p className="font-bold mb-2 text-white">{isZh ? '完美Pin Bar的5个标准：' : 'Perfect Pin Bar 5 Criteria:'}</p>
                <ul className="space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '1. 影线比例：' : '1. Shadow Ratio:'}</strong>{' '}
                    {isZh ? '针（影线）长度至少是实体的2-3倍。比例越大（如5:1），信号越强。' : 'Pin (shadow) length at least 2-3x body. Larger ratio (like 5:1), stronger signal.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '2. 收盘位置：' : '2. Close Position:'}</strong>{' '}
                    {isZh ? '收盘价必须在K线的上1/3（看涨Pin）或下1/3（看跌Pin）区域，显示拒绝力量强劲。' : 'Close must be in upper 1/3 (bullish Pin) or lower 1/3 (bearish Pin) of candle, shows strong rejection force.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '3. 位置关键：' : '3. Critical Location:'}</strong>{' '}
                    {isZh ? '必须出现在关键支撑阻力位（前高低、整数关口、趋势线）。无关位置的Pin Bar无效。' : 'Must appear at key S/R (previous highs/lows, round numbers, trendlines). Pin Bar at irrelevant location invalid.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '4. 针的方向：' : '4. Pin Direction:'}</strong>{' '}
                    {isZh ? '针指向趋势相反方向更有效。下降趋势中看涨Pin Bar针向下（测试支撑被拒绝）。' : 'Pin pointing opposite to trend more effective. In downtrend, bullish Pin Bar pin points down (tested support, rejected).'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '5. 孤立性：' : '5. Isolation:'}</strong>{' '}
                    {isZh ? 'Pin Bar前后几根K线应与Pin明显不同（前面大阴线，Pin Bar看涨，后面阳线确认）。连续多个Pin Bar效果递减。' : 'Candles before/after Pin should differ significantly (preceding large bearish, bullish Pin Bar, following bullish confirms). Consecutive Pin Bars less effective.'}
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600 mt-3">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '⚠️ Pin Bar常见错误：' : '⚠️ Common Pin Bar Mistakes:'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '1) 在无关位置交易Pin Bar（价格中段，无支撑阻力）；2) 针比例不足（影线仅1.5倍实体）；3) 收盘价在K线中部（未明确拒绝）；4) 逆势交易（上升趋势做空看跌Pin）；5) 未等待下一根K线确认。记住：Pin Bar不是"独立"信号，必须结合位置、趋势、确认。'
                    : '1) Trading Pin Bar at irrelevant location (mid-price, no S/R); 2) Insufficient pin ratio (shadow only 1.5x body); 3) Close at candle middle (no clear rejection); 4) Counter-trend trading (shorting bearish Pin in uptrend); 5) Not waiting for next candle confirmation. Remember: Pin Bar is not "independent" signal, must combine location, trend, confirmation.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '2. Inside Bar（母子线）- 盘整突破信号' : '2. Inside Bar - Consolidation Breakout Signal'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '形态特征：' : 'Pattern Characteristics:'}</strong>{' '}
                {isZh
                  ? 'Inside Bar由两根K线组成：母线（Mother Bar）和子线（Inside Bar）。子线的高低点完全在母线高低点范围内（像怀孕）。Inside Bar显示市场在盘整、犹豫、决策，通常出现在趋势中段或关键位置，预示即将突破。'
                  : 'Inside Bar consists of two candles: Mother Bar and Inside Bar. Inside Bar\'s high/low completely within Mother Bar\'s high/low range (like pregnancy). Inside Bar shows market consolidating, hesitating, deciding, usually appears mid-trend or at key location, indicates imminent breakout.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? 'Inside Bar交易策略：' : 'Inside Bar Trading Strategy:'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '策略1：双向挂单（推荐）' : 'Strategy 1: Two-Way Pending Orders (Recommended)'}</strong>
                    <br />
                    {isZh
                      ? '在母线高点上方挂买单（Buy Stop），母线低点下方挂卖单（Sell Stop）。突破哪个方向，触发相应订单，同时取消另一个订单。这是最安全的Inside Bar交易方式（不预测方向）。'
                      : 'Place buy stop above Mother Bar high, sell stop below Mother Bar low. Whichever direction breaks, triggers corresponding order, cancel other order simultaneously. Safest Inside Bar trading method (don\'t predict direction).'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '策略2：等待突破确认后入场' : 'Strategy 2: Enter After Breakout Confirmation'}</strong>
                    <br />
                    {isZh
                      ? '等待价格收盘价明确突破母线高点或低点（至少10-15点），下一根K线开盘入场。更保守，避免假突破。'
                      : 'Wait for close price to clearly break Mother Bar high or low (at least 10-15 pips), enter at next candle open. More conservative, avoids false breakouts.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '策略3：趋势方向单边交易' : 'Strategy 3: One-Way with-Trend Trading'}</strong>
                    <br />
                    {isZh
                      ? '如果Inside Bar出现在明确趋势中（如上升趋势），只交易顺势方向（只在母线高点突破时做多，忽略向下突破）。提高胜率至75%。'
                      : 'If Inside Bar appears in clear trend (like uptrend), only trade with-trend direction (only long when breaks Mother Bar high, ignore downward break). Improves win rate to 75%.'}
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-gray-900 text-gray-300 mt-3">
                <p className="font-bold mb-2 text-white">{isZh ? 'Inside Bar止损与止盈设置：' : 'Inside Bar Stop-Loss & Take-Profit:'}</p>
                <ul className="space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '止损（Stop-Loss）：' : 'Stop-Loss:'}</strong>{' '}
                    {isZh
                      ? '向上突破做多，止损母线低点下方10-15点；向下突破做空，止损母线高点上方10-15点。母线范围就是"战场边界"，突破失败立即撤退。'
                      : 'Upward break long, stop 10-15 pips below Mother Bar low; downward break short, stop 10-15 pips above Mother Bar high. Mother Bar range is "battlefield boundary", breakout fails immediately retreat.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '止盈（Take-Profit）：' : 'Take-Profit:'}</strong>{' '}
                    {isZh
                      ? '目标至少是母线高度的1-2倍。例如，母线高度30点（高低点差距），目标至少30-60点。或目标前一个显著高低点。'
                      : 'Target at least 1-2x Mother Bar height. E.g., Mother Bar height 30 pips (high-low difference), target at least 30-60 pips. Or target previous significant high/low.'}
                  </li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-3">
                <div className="p-4 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? 'Inside Bar有效环境：' : 'Inside Bar Valid Environments:'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '明确趋势中段（盘整后延续）' : 'Clear mid-trend (consolidation then continuation)'}</li>
                    <li className="text-gray-300">{isZh ? '关键支撑阻力位（决策时刻）' : 'Key S/R levels (decision moment)'}</li>
                    <li className="text-gray-300">{isZh ? '大周期图表H4/D1（信号可靠）' : 'Large timeframe H4/D1 (reliable signal)'}</li>
                    <li className="text-gray-300">{isZh ? '母线明显大于子线（至少2倍）' : 'Mother Bar clearly larger than Inside Bar (at least 2x)'}</li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? 'Inside Bar无效环境：' : 'Inside Bar Invalid Environments:'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '横盘震荡市场（假突破频繁）' : 'Ranging sideways market (frequent false breakouts)'}</li>
                    <li className="text-gray-300">{isZh ? '趋势末端（可能反转而非持续）' : 'Trend end (may reverse not continue)'}</li>
                    <li className="text-gray-300">{isZh ? '小周期图表M5/M15（噪音多）' : 'Small timeframe M5/M15 (too noisy)'}</li>
                    <li className="text-gray-300">{isZh ? '母线与子线大小接近（力量不明显）' : 'Mother Bar and Inside Bar similar size (force not obvious)'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '3. Outside Bar（包容线）- 强力吞没信号' : '3. Outside Bar - Strong Engulfing Signal'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '形态特征：' : 'Pattern Characteristics:'}</strong>{' '}
                {isZh
                  ? 'Outside Bar与Inside Bar相反：第二根K线完全"包容"第一根K线（高点更高，低点更低）。Outside Bar显示市场出现强力反转或加速，买卖双方激烈博弈后一方完胜。Outside Bar相当于加强版的Engulfing吞没形态。'
                  : 'Outside Bar is opposite of Inside Bar: second candle completely "engulfs" first candle (higher high, lower low). Outside Bar shows powerful reversal or acceleration, after fierce bull-bear battle one side wins. Outside Bar equivalent to enhanced Engulfing pattern.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? 'Outside Bar交易策略：' : 'Outside Bar Trading Strategy:'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '看涨Outside Bar（Bullish Outside Bar）：' : 'Bullish Outside Bar:'}</strong>{' '}
                    {isZh
                      ? '第二根阳线高点突破第一根高点，低点跌破第一根低点，但收盘价明确在第一根K线上方。显示价格先下探测试支撑，然后强力反弹突破前高，买盘强劲。'
                      : 'Second bullish candle high breaks first high, low breaks first low, but close clearly above first candle. Shows price first probed down testing support, then strongly bounced breaking previous high, strong buying.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '看跌Outside Bar（Bearish Outside Bar）：' : 'Bearish Outside Bar:'}</strong>{' '}
                    {isZh
                      ? '第二根阴线低点跌破第一根低点，高点突破第一根高点，但收盘价明确在第一根K线下方。显示价格先上探测试阻力，然后强力回落跌破前低，卖盘强劲。'
                      : 'Second bearish candle low breaks first low, high breaks first high, but close clearly below first candle. Shows price first probed up testing resistance, then strongly fell breaking previous low, strong selling.'}
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-gray-900 text-gray-300 mt-3">
                <p className="font-bold mb-2 text-white">{isZh ? 'Outside Bar vs Engulfing的区别：' : 'Outside Bar vs Engulfing Difference:'}</p>
                <ul className="space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'Engulfing（吞没）：' : 'Engulfing:'}</strong>{' '}
                    {isZh
                      ? '只要求实体吞没前一根实体（高点可能更低，低点可能更高）。如第一根1.0900-1.0920，第二根1.0905-1.0935（实体吞没但影线未包容）。'
                      : 'Only requires body engulfs previous body (high may be lower, low may be higher). E.g., first 1.0900-1.0920, second 1.0905-1.0935 (body engulfs but shadows not contained).'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'Outside Bar（包容）：' : 'Outside Bar:'}</strong>{' '}
                    {isZh
                      ? '要求完全包容（高点更高，低点更低）。如第一根1.0900-1.0920，第二根1.0895-1.0935（完全包容）。Outside Bar更强，但出现频率更低。'
                      : 'Requires complete engulfing (higher high, lower low). E.g., first 1.0900-1.0920, second 1.0895-1.0935 (complete engulfing). Outside Bar stronger, but lower frequency.'}
                  </li>
                </ul>
              </div>
              <p className="text-sm mt-3">
                <strong className="text-white">{isZh ? '交易要点：' : 'Trading Points:'}</strong>{' '}
                {isZh
                  ? 'Outside Bar交易方式与Engulfing相同：等待收盘确认，入场价Outside Bar收盘价，止损Outside Bar高低点外，止盈前一个显著高低点或1:2风险回报。Outside Bar胜率略高于Engulfing（70% vs 65%），但出现频率低30%。'
                  : 'Outside Bar trading same as Engulfing: wait for close confirmation, entry at Outside Bar close, stop beyond Outside Bar high/low, target previous significant high/low or 1:2 risk-reward. Outside Bar win rate slightly higher than Engulfing (70% vs 65%), but 30% lower frequency.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Supply Demand Zones */}
      <section id="supply-demand-zones" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '供需区域识别' : 'Supply/Demand Zone Identification'}
        </h2>
        <div className="space-y-6">
          <p className="text-gray-300 dark:text-gray-300">
            {isZh
              ? '供需区域（Supply and Demand Zones）是价格行为交易的进阶概念，由Sam Seiden推广。供需区域不是简单的"支撑阻力位"，而是机构交易者（银行、对冲基金）大量建仓的价格区域。当价格回到这些区域时，机构会继续增仓或平仓，制造强力的支撑或阻力。相比传统支撑阻力，供需区域更"领先"、更"精准"，首次触及胜率可达70-80%。'
              : 'Supply and Demand Zones are advanced price action concept, popularized by Sam Seiden. S/D zones are not simple "S/R levels", but price zones where institutional traders (banks, hedge funds) heavily positioned. When price returns to these zones, institutions continue adding or closing positions, creating powerful support or resistance. Compared to traditional S/R, S/D zones more "leading", more "precise", first touch win rate can reach 70-80%.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '供需区域的核心原理' : 'Core Principle of S/D Zones'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 需求区域（Demand Zone / 买盘区）：' : '1. Demand Zone (Buying Zone):'}</strong>{' '}
                {isZh
                  ? '价格在该区域快速上涨离开（大阳线或连续阳线），说明该区域有强力买盘（机构吸筹）。当价格回到该区域时，买盘再次介入（机构增仓），价格获得支撑反弹。需求区域是"买家的地盘"。'
                  : 'Price quickly rises leaving this zone (large bullish or consecutive bullish candles), indicates strong buying (institutional accumulation). When price returns to this zone, buyers re-enter (institutions add positions), price gets support and bounces. Demand zone is "buyers\' territory".'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 供给区域（Supply Zone / 卖盘区）：' : '2. Supply Zone (Selling Zone):'}</strong>{' '}
                {isZh
                  ? '价格在该区域快速下跌离开（大阴线或连续阴线），说明该区域有强力卖盘（机构出货）。当价格回到该区域时，卖盘再次介入（机构继续出货），价格遇到阻力回落。供给区域是"卖家的地盘"。'
                  : 'Price quickly falls leaving this zone (large bearish or consecutive bearish candles), indicates strong selling (institutional distribution). When price returns to this zone, sellers re-enter (institutions continue distribution), price meets resistance and falls. Supply zone is "sellers\' territory".'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 新鲜度（Freshness）：' : '3. Freshness:'}</strong>{' '}
                {isZh
                  ? '供需区域有"新鲜度"，首次回测最有效（胜率70-80%），第二次回测效果降低（胜率60%），第三次以上基本失效（胜率<50%）。原因：机构订单被逐步消化。最佳策略：只交易"新鲜"的供需区域（未被回测或仅回测1次）。'
                  : 'S/D zones have "freshness", first retest most effective (70-80% win rate), second retest less effective (60% win rate), third+ basically invalid (<50% win rate). Reason: institutional orders gradually absorbed. Best strategy: only trade "fresh" S/D zones (never retested or only 1 retest).'}
              </li>
            </ul>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '如何识别供需区域（5步法）' : 'How to Identify S/D Zones (5-Step Method)'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <ul className="space-y-3 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤1：找到强劲走势（Explosive Move）' : 'Step 1: Find Explosive Move'}</strong>
                    <br />
                    {isZh
                      ? '在H4/D1图表上，找到价格快速离开的区域（大阳线/大阴线，或2-3根连续同向K线）。走势越强劲（如50-100点），供需区域越有效。'
                      : 'On H4/D1 chart, find zone where price quickly left (large bullish/bearish candle, or 2-3 consecutive same-direction candles). Stronger move (like 50-100 pips), more effective S/D zone.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤2：标记起源区域（Base / Origin）' : 'Step 2: Mark Origin Zone (Base)'}</strong>
                    <br />
                    {isZh
                      ? '强劲走势前的"盘整区域"就是供需区域。通常是1-3根小K线横盘。例如，价格在1.0900-1.0910盘整3根H4 K线，然后大阳线拉升至1.0980，供需区域就是1.0900-1.0910。'
                      : 'The "consolidation zone" before explosive move is S/D zone. Usually 1-3 small candles ranging. E.g., price ranging 1.0900-1.0910 for 3 H4 candles, then large bullish pulls to 1.0980, S/D zone is 1.0900-1.0910.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤3：确认区域厚度' : 'Step 3: Confirm Zone Thickness'}</strong>
                    <br />
                    {isZh
                      ? '供需区域厚度通常15-50点（H4图），不应太厚（>80点，说明盘整太久，效果差）。画出矩形区域，上沿是盘整高点，下沿是盘整低点。'
                      : 'S/D zone thickness usually 15-50 pips (H4 chart), shouldn\'t be too thick (>80 pips, indicates too long consolidation, less effective). Draw rectangle zone, top is consolidation high, bottom is consolidation low.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤4：验证强劲离开' : 'Step 4: Verify Strong Exit'}</strong>
                    <br />
                    {isZh
                      ? '离开区域后价格至少运行50-100点，且未回测该区域（或仅小幅回测后继续）。如果离开后立即回落，说明该区域不是真正的供需区域。'
                      : 'After leaving zone, price runs at least 50-100 pips, and doesn\'t retest that zone (or only small retest then continues). If falls back immediately after leaving, indicates zone not true S/D zone.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤5：标记新鲜度' : 'Step 5: Mark Freshness'}</strong>
                    <br />
                    {isZh
                      ? '标记该供需区域的回测次数（0次=全新，1次=半新，2次以上=失效）。只交易0-1次回测的"新鲜"区域，删除失效区域。'
                      : 'Mark S/D zone retest count (0 times=brand new, 1 time=semi-fresh, 2+ times=invalid). Only trade "fresh" zones with 0-1 retests, remove invalid zones.'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '需求区域（Demand Zone）交易' : 'Demand Zone Trading'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '识别：价格从某区域快速上涨（大阳线）' : 'Identify: price quickly rises from zone (large bullish)'}</li>
                <li className="text-gray-300">{isZh ? '等待回测：价格回落至该需求区域' : 'Wait for retest: price falls back to that demand zone'}</li>
                <li className="text-gray-300">{isZh ? '入场信号：在需求区域出现看涨Pin Bar或Engulfing' : 'Entry signal: bullish Pin Bar or Engulfing appears in demand zone'}</li>
                <li className="text-gray-300">{isZh ? '入场：信号收盘后，或价格突破需求区域上沿' : 'Entry: after signal closes, or price breaks demand zone top'}</li>
                <li className="text-gray-300">{isZh ? '止损：需求区域下沿下方10-20点' : 'Stop: 10-20 pips below demand zone bottom'}</li>
                <li className="text-gray-300">{isZh ? '止盈：前高阻力或1:2风险回报' : 'Target: previous high resistance or 1:2 risk-reward'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '供给区域（Supply Zone）交易' : 'Supply Zone Trading'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '识别：价格从某区域快速下跌（大阴线）' : 'Identify: price quickly falls from zone (large bearish)'}</li>
                <li className="text-gray-300">{isZh ? '等待回测：价格反弹至该供给区域' : 'Wait for retest: price bounces to that supply zone'}</li>
                <li className="text-gray-300">{isZh ? '入场信号：在供给区域出现看跌Pin Bar或Engulfing' : 'Entry signal: bearish Pin Bar or Engulfing appears in supply zone'}</li>
                <li className="text-gray-300">{isZh ? '入场：信号收盘后，或价格跌破供给区域下沿' : 'Entry: after signal closes, or price breaks supply zone bottom'}</li>
                <li className="text-gray-300">{isZh ? '止损：供给区域上沿上方10-20点' : 'Stop: 10-20 pips above supply zone top'}</li>
                <li className="text-gray-300">{isZh ? '止盈：前低支撑或1:2风险回报' : 'Target: previous low support or 1:2 risk-reward'}</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '供需区域 vs 传统支撑阻力的区别' : 'S/D Zones vs Traditional S/R Difference'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-yellow-600 text-white">
                    <th className="border border-yellow-600 p-2 text-left">{isZh ? '特征' : 'Feature'}</th>
                    <th className="border border-yellow-600 p-2 text-left">{isZh ? '传统支撑阻力' : 'Traditional S/R'}</th>
                    <th className="border border-yellow-600 p-2 text-left">{isZh ? '供需区域' : 'S/D Zones'}</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300 dark:text-gray-300">
                  <tr>
                    <td className="border border-yellow-600 p-2 font-bold text-white">{isZh ? '识别方式' : 'Identification'}</td>
                    <td className="border border-yellow-600 p-2">{isZh ? '历史高低点' : 'Historical highs/lows'}</td>
                    <td className="border border-yellow-600 p-2">{isZh ? '强劲走势起源区域' : 'Explosive move origin zone'}</td>
                  </tr>
                  <tr className="bg-yellow-100 dark:bg-yellow-900/20">
                    <td className="border border-yellow-600 p-2 font-bold text-white">{isZh ? '位置' : 'Location'}</td>
                    <td className="border border-yellow-600 p-2">{isZh ? '单一价格线' : 'Single price line'}</td>
                    <td className="border border-yellow-600 p-2">{isZh ? '价格区域（15-50点）' : 'Price zone (15-50 pips)'}</td>
                  </tr>
                  <tr>
                    <td className="border border-yellow-600 p-2 font-bold text-white">{isZh ? '有效性' : 'Effectiveness'}</td>
                    <td className="border border-yellow-600 p-2">{isZh ? '被触及越多越强' : 'Stronger with more touches'}</td>
                    <td className="border border-yellow-600 p-2">{isZh ? '首次触及最强，多次触及失效' : 'Strongest on first touch, loses effect with multiple touches'}</td>
                  </tr>
                  <tr className="bg-yellow-100 dark:bg-yellow-900/20">
                    <td className="border border-yellow-600 p-2 font-bold text-white">{isZh ? '理论基础' : 'Theory'}</td>
                    <td className="border border-yellow-600 p-2">{isZh ? '市场记忆' : 'Market memory'}</td>
                    <td className="border border-yellow-600 p-2">{isZh ? '机构订单流' : 'Institutional order flow'}</td>
                  </tr>
                  <tr>
                    <td className="border border-yellow-600 p-2 font-bold text-white">{isZh ? '首次胜率' : 'First Touch Win Rate'}</td>
                    <td className="border border-yellow-600 p-2">60-65%</td>
                    <td className="border border-yellow-600 p-2">70-80%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Entry Exit Timing */}
      <section id="entry-exit-timing" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '入场与出场时机' : 'Entry & Exit Timing'}
        </h2>
        <div className="space-y-6">
          <p className="text-gray-300 dark:text-gray-300">
            {isZh
              ? '价格行为交易的核心是"等待高概率设置"，而非频繁交易。入场时机决定了风险回报比和胜率，出场时机决定了最终盈利。专业价格行为交易者可能一周只交易2-5次，但每次都是高质量信号，单笔交易风险回报比1:3以上。'
              : 'Core of price action trading is "waiting for high-probability setups", not frequent trading. Entry timing determines risk-reward ratio and win rate, exit timing determines final profit. Professional price action traders may only trade 2-5 times weekly, but each is high-quality signal with 1:3+ risk-reward per trade.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '完美入场的4个条件（必须全部满足）' : 'Perfect Entry 4 Conditions (Must All Be Met)'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 位置正确（Location）：' : '1. Correct Location:'}</strong>{' '}
                {isZh
                  ? '价格必须在关键位置：前高低、整数关口、趋势线、供需区域、斐波那契回撤位（38.2%, 50%, 61.8%）。无关位置的信号全部跳过。记住：80%成功取决于"在哪里交易"。'
                  : 'Price must be at key location: previous highs/lows, round numbers, trendlines, S/D zones, Fibonacci retracements (38.2%, 50%, 61.8%). Skip all signals at irrelevant locations. Remember: 80% success depends on "where you trade".'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 趋势一致（Trend Alignment）：' : '2. Trend Alignment:'}</strong>{' '}
                {isZh
                  ? '交易方向必须与H4/D1主趋势一致。上升趋势只找做多机会（在支撑位、回调时），下降趋势只找做空机会（在阻力位、反弹时）。逆势交易胜率<40%，果断放弃。'
                  : 'Trading direction must align with H4/D1 main trend. In uptrend only seek long opportunities (at support, on pullbacks), in downtrend only seek short opportunities (at resistance, on bounces). Counter-trend win rate <40%, decisively abandon.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 信号清晰（Clear Signal）：' : '3. Clear Signal:'}</strong>{' '}
                {isZh
                  ? '必须出现明确的价格行为信号：Pin Bar（影线≥2倍实体）、Inside Bar、Engulfing（吞没比例≥1.5倍）、供需区域反转。如果信号"模棱两可"（看起来像Pin但比例不够），不交易。'
                  : 'Must have clear price action signal: Pin Bar (shadow ≥2x body), Inside Bar, Engulfing (ratio ≥1.5x), S/D zone reversal. If signal "ambiguous" (looks like Pin but ratio insufficient), don\'t trade.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 确认到位（Confirmation）：' : '4. Confirmation Present:'}</strong>{' '}
                {isZh
                  ? '等待信号K线收盘确认，或下一根K线朝预期方向运行。例如，Pin Bar收盘后，下一根阳线确认看涨方向。提前入场容易被假信号欺骗。宁可错过，不可抢跑。'
                  : 'Wait for signal candle close confirmation, or next candle moves in expected direction. E.g., after Pin Bar closes, next bullish candle confirms bullish direction. Early entry easily deceived by false signals. Rather miss than jump the gun.'}
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '入场方式1：信号收盘后立即入场（激进）' : 'Entry Method 1: Immediately After Signal Close (Aggressive)'}
              </h3>
              <div className="space-y-2 text-sm text-gray-300 dark:text-gray-300">
                <p className="text-gray-300"><strong className="text-white">{isZh ? '执行：' : 'Execution:'}</strong> {isZh ? '价格行为信号K线收盘后，下一根K线开盘价立即入场。' : 'After price action signal candle closes, immediately enter at next candle open.'}</p>
                <p className="text-gray-300"><strong className="text-white">{isZh ? '优点：' : 'Advantages:'}</strong> {isZh ? '入场价最优，利润空间最大，无需等待。' : 'Best entry price, maximum profit potential, no waiting needed.'}</p>
                <p className="text-gray-300"><strong className="text-white">{isZh ? '缺点：' : 'Disadvantages:'}</strong> {isZh ? '可能遇到假信号，胜率略低（65%）。' : 'May encounter false signals, slightly lower win rate (65%).'}</p>
                <p className="text-gray-300"><strong className="text-white">{isZh ? '适合：' : 'Suitable For:'}</strong> {isZh ? '经验丰富的交易者，信号识别能力强。' : 'Experienced traders with strong signal recognition ability.'}</p>
              </div>
            </div>

            <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '入场方式2：等待下一根K线确认后入场（保守）' : 'Entry Method 2: Wait for Next Candle Confirmation (Conservative)'}
              </h3>
              <div className="space-y-2 text-sm text-gray-300 dark:text-gray-300">
                <p className="text-gray-300"><strong className="text-white">{isZh ? '执行：' : 'Execution:'}</strong> {isZh ? '信号收盘后，等待下一根K线朝预期方向运行并收盘，第三根K线开盘入场。' : 'After signal closes, wait for next candle to move in expected direction and close, enter at third candle open.'}</p>
                <p className="text-gray-300"><strong className="text-white">{isZh ? '优点：' : 'Advantages:'}</strong> {isZh ? '胜率更高（75%），过滤掉假信号，心理压力小。' : 'Higher win rate (75%), filters false signals, less psychological pressure.'}</p>
                <p className="text-gray-300"><strong className="text-white">{isZh ? '缺点：' : 'Disadvantages:'}</strong> {isZh ? '入场价较高，牺牲部分利润空间（约10-20点）。' : 'Higher entry price, sacrifices some profit potential (about 10-20 pips).'}</p>
                <p className="text-gray-300"><strong className="text-white">{isZh ? '适合：' : 'Suitable For:'}</strong> {isZh ? '新手交易者，追求稳定胜率。' : 'Beginner traders pursuing stable win rate.'}</p>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '出场策略：保护利润 vs 让利润奔跑' : 'Exit Strategies: Protect Profits vs Let Profits Run'}
            </h3>
            <div className="space-y-4 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                {isZh
                  ? '价格行为交易的出场策略分为两大流派："固定目标"（适合新手，胜率高）和"动态追踪"（适合老手，利润大）。'
                  : 'Price action exit strategies divided into two schools: "fixed targets" (suits beginners, high win rate) and "dynamic trailing" (suits veterans, larger profits).'}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-[#ff102a] bg-gray-50 dark:bg-[#0a0a0a]">
                  <p className="font-bold mb-2 text-white">{isZh ? '流派1：固定目标止盈（推荐新手）' : 'School 1: Fixed Target (Recommended for Beginners)'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '提前设定止盈位：前高低、1:2风险回报、整数关口' : 'Pre-set target: previous highs/lows, 1:2 risk-reward, round numbers'}</li>
                    <li className="text-gray-300">{isZh ? '触及目标立即平仓，不贪婪' : 'Close immediately on target, no greed'}</li>
                    <li className="text-gray-300">{isZh ? '优点：纪律性强，心理压力小，胜率高' : 'Advantages: strong discipline, less psychological pressure, high win rate'}</li>
                    <li className="text-gray-300">{isZh ? '缺点：可能过早离场，错失大行情' : 'Disadvantages: may exit too early, miss big moves'}</li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-[#ff102a] bg-gray-50 dark:bg-[#0a0a0a]">
                  <p className="font-bold mb-2 text-white">{isZh ? '流派2：追踪止损（适合老手）' : 'School 2: Trailing Stop (Suits Veterans)'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '盈利后不设固定目标，使用追踪止损' : 'After profit don\'t set fixed target, use trailing stop'}</li>
                    <li className="text-gray-300">{isZh ? '盈利30点后，止损移至盈亏平衡点（保本）' : 'After 30 pip profit, move stop to breakeven (protect capital)'}</li>
                    <li className="text-gray-300">{isZh ? '继续盈利，每20-30点移动止损一次' : 'Continue profit, move stop every 20-30 pips'}</li>
                    <li className="text-gray-300">{isZh ? '优点：利润空间大（可能赚50-150点）' : 'Advantages: larger profit potential (may earn 50-150 pips)'}</li>
                    <li className="text-gray-300">{isZh ? '缺点：需要经验和耐心，胜率略低' : 'Disadvantages: needs experience and patience, slightly lower win rate'}</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a] border-l-4 border-gray-800 mt-3">
                <p className="font-bold mb-2 text-white">{isZh ? '混合策略（最佳）：' : 'Hybrid Strategy (Best):'}</p>
                <p className="text-sm">
                  {isZh
                    ? '达到第一目标（如1:1.5风险回报）后平仓50%，锁定部分利润。剩余50%继续持有，使用追踪止损，止损移至盈亏平衡点。这样既保证了"稳定小赚"，又给"大赚"留下机会。平衡胜率和盈亏比。'
                    : 'After reaching first target (like 1:1.5 risk-reward) close 50%, lock in partial profits. Remaining 50% continues holding, use trailing stop, move stop to breakeven. This ensures both "stable small profit" and leaves opportunity for "big profit". Balances win rate and profit ratio.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '常见入场错误 - 一定要避免' : 'Common Entry Mistakes - Must Avoid'}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 dark:text-gray-300">
              <li className="text-gray-300"><strong className="text-white">{isZh ? '错误1：' : 'Mistake 1:'}</strong> {isZh ? 'FOMO（害怕错过）- 价格已经离开关键位置20-30点后才追入，结果在高位被套。正确：错过就错过，等下一个机会。' : 'FOMO (Fear of Missing Out) - chasing 20-30 pips after price left key location, trapped at high. Correct: miss is miss, wait for next opportunity.'}</li>
              <li className="text-gray-300"><strong className="text-white">{isZh ? '错误2：' : 'Mistake 2:'}</strong> {isZh ? '信号未确认就入场 - Pin Bar未收盘就入场，结果收盘价回到实体中部，不是真正Pin Bar。正确：永远等收盘。' : 'Entering before signal confirmation - entering before Pin Bar closes, close ends up at body middle, not true Pin Bar. Correct: always wait for close.'}</li>
              <li className="text-gray-300"><strong className="text-white">{isZh ? '错误3：' : 'Mistake 3:'}</strong> {isZh ? '在横盘市场频繁交易 - 横盘时信号多但质量低，假突破频繁。正确：只在明确趋势市场交易。' : 'Frequent trading in ranging market - many signals during ranging but low quality, frequent false breakouts. Correct: only trade in clear trending markets.'}</li>
              <li className="text-gray-300"><strong className="text-white">{isZh ? '错误4：' : 'Mistake 4:'}</strong> {isZh ? '逆势交易 - 在下降趋势中看到一个看涨Pin Bar就做多。正确：只交易顺势信号。' : 'Counter-trend trading - longing at bullish Pin Bar in downtrend. Correct: only trade with-trend signals.'}</li>
              <li className="text-gray-300"><strong className="text-white">{isZh ? '错误5：' : 'Mistake 5:'}</strong> {isZh ? '不设止损 - 认为"信号完美"不会亏损。正确：每笔交易必须设止损，价格行为不是100%胜率。' : 'No stop-loss - thinking "perfect signal" won\'t lose. Correct: every trade must have stop-loss, price action is not 100% win rate.'}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: Naked Chart Trading */}
      <section id="naked-chart-trading" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '裸K图表交易' : 'Naked Chart Trading'}
        </h2>
        <div className="space-y-6">
          <p className="text-gray-300 dark:text-gray-300">
            {isZh
              ? '裸K交易（Naked Chart Trading）是价格行为交易的"终极形态"：图表上只有K线，没有任何指标（包括MA），仅手动画出关键支撑阻力位和趋势线。裸K交易追求极简主义，相信"价格本身足够"。虽然学习曲线陡峭（需要6-12个月练习），但一旦掌握，交易决策速度快、图表清晰、心理压力小，是许多长期盈利交易者的最终选择。'
              : 'Naked Chart Trading is "ultimate form" of price action trading: chart only has candlesticks, no indicators (including MAs), only manually drawn key S/R levels and trendlines. Naked trading pursues minimalism, believes "price itself is enough". Though steep learning curve (needs 6-12 months practice), once mastered, fast trading decisions, clear charts, less psychological pressure, final choice of many long-term profitable traders.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '裸K图表设置（5分钟完成）' : 'Naked Chart Setup (5-Minute Complete)'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '步骤1：清空所有指标' : 'Step 1: Clear All Indicators'}</strong>{' '}
                {isZh
                  ? '- 删除图表上所有指标（MACD, RSI, Stochastic, BB, MA等），只保留K线。如果不舍得删除MA，最多保留1条（如50 EMA），但最终目标是完全移除。'
                  : ' - Remove all indicators from chart (MACD, RSI, Stochastic, BB, MA etc.), keep only candlesticks. If reluctant to remove MAs, keep at most 1 (like 50 EMA), but ultimate goal is complete removal.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '步骤2：切换到日线D1' : 'Step 2: Switch to Daily D1'}</strong>{' '}
                {isZh ? '- 从D1图表开始，识别市场结构（上升趋势、下降趋势、横盘）和关键位置。' : ' - Start from D1 chart, identify market structure (uptrend, downtrend, ranging) and key locations.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '步骤3：手动画关键位置' : 'Step 3: Manually Draw Key Levels'}</strong>{' '}
                {isZh
                  ? '- 在D1图表标记5-8个最重要的水平支撑阻力区域（前高低、整数关口）。使用矩形工具画出15-30点厚度的区域，而非单线。'
                  : ' - On D1 chart mark 5-8 most important horizontal S/R zones (previous highs/lows, round numbers). Use rectangle tool to draw 15-30 pip thickness zones, not single lines.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '步骤4：画趋势线（可选）' : 'Step 4: Draw Trendlines (Optional)'}</strong>{' '}
                {isZh ? '- 如果市场处于明确趋势，画出上升/下降趋势线（连接至少3个低点/高点）。横盘市场无需趋势线。' : ' - If market in clear trend, draw up/down trendlines (connect at least 3 lows/highs). Ranging market no trendlines needed.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '步骤5：切换到交易时间框架' : 'Step 5: Switch to Trading Timeframe'}</strong>{' '}
                {isZh
                  ? '- 切换到H4或H1（日内交易者使用H1，波段交易者使用H4）。D1的关键位置会自动显示在H1/H4上。'
                  : ' - Switch to H4 or H1 (day traders use H1, swing traders use H4). D1 key levels automatically display on H1/H4.'}
              </li>
            </ul>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '裸K交易的每日工作流程' : 'Naked Trading Daily Workflow'}
            </h3>
            <div className="space-y-4 text-gray-300 dark:text-gray-300">
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '早晨复盘（10分钟）：' : 'Morning Review (10 minutes):'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '打开D1图表，识别市场结构：上升、下降、横盘？' : 'Open D1 chart, identify market structure: uptrend, downtrend, ranging?'}</li>
                  <li className="text-gray-300">{isZh ? '更新关键支撑阻力位（新增/删除失效位置）' : 'Update key S/R levels (add/remove invalid levels)'}</li>
                  <li className="text-gray-300">{isZh ? '标记供需区域（寻找新形成的新鲜区域）' : 'Mark S/D zones (find newly formed fresh zones)'}</li>
                  <li className="text-gray-300">{isZh ? '判断今日交易偏好：做多、做空、还是观望' : 'Determine today\'s trading bias: long, short, or sidelines'}</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '交易时段（盯盘）：' : 'Trading Session (Monitoring):'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '切换到H1/H4交易图表，等待价格接近关键位置' : 'Switch to H1/H4 trading chart, wait for price to approach key levels'}</li>
                  <li className="text-gray-300">{isZh ? '价格进入关键区域后，寻找价格行为信号（Pin Bar, Inside Bar等）' : 'After price enters key zone, look for price action signals (Pin Bar, Inside Bar etc.)'}</li>
                  <li className="text-gray-300">{isZh ? '信号出现后，等待收盘确认' : 'After signal appears, wait for close confirmation'}</li>
                  <li className="text-gray-300">{isZh ? '确认后，计算止损、仓位大小、止盈目标，入场' : 'After confirmation, calculate stop-loss, position size, target, enter'}</li>
                  <li className="text-gray-300">{isZh ? '入场后设置止损单，记录交易理由（截图+文字）' : 'After entry set stop-loss order, record trade reason (screenshot + text)'}</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '晚间复盘（5分钟）：' : 'Evening Review (5 minutes):'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '检查持仓，是否需要移动止损（盈利后移至盈亏平衡）' : 'Check positions, need to move stops (move to breakeven after profit)'}</li>
                  <li className="text-gray-300">{isZh ? '记录当日交易结果（盈利/亏损、执行情况、情绪状态）' : 'Record daily trade results (profit/loss, execution, emotional state)'}</li>
                  <li className="text-gray-300">{isZh ? '如果无交易机会，记录"为什么没有交易"（缺乏信号、位置不对等）' : 'If no trading opportunities, record "why no trades" (lack signals, wrong location etc.)'}</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '周末总结（30分钟）：' : 'Weekend Summary (30 minutes):'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '复盘本周所有交易，分析成功和失败原因' : 'Review all weekly trades, analyze success and failure reasons'}</li>
                  <li className="text-gray-300">{isZh ? '统计胜率、平均盈亏比、最大回撤' : 'Calculate win rate, average profit/loss ratio, max drawdown'}</li>
                  <li className="text-gray-300">{isZh ? '识别重复出现的错误（如逆势交易、提前入场）' : 'Identify recurring mistakes (like counter-trend, early entry)'}</li>
                  <li className="text-gray-300">{isZh ? '制定下周改进计划（如"只交易H4信号"、"不再逆势"）' : 'Make next week improvement plan (like "only trade H4 signals", "no more counter-trend")'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '裸K交易的优势' : 'Naked Trading Advantages'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '图表极简，决策速度快（3秒判断是否交易）' : 'Extremely simple charts, fast decisions (3 seconds judge whether to trade)'}</li>
                <li className="text-gray-300">{isZh ? '无指标滞后，实时反应市场变化' : 'No indicator lag, real-time reflects market changes'}</li>
                <li className="text-gray-300">{isZh ? '培养对价格的"感觉"，长期受益' : 'Develops price "feel", long-term benefit'}</li>
                <li className="text-gray-300">{isZh ? '减少过度分析，避免"分析瘫痪"' : 'Reduces over-analysis, avoids "analysis paralysis"'}</li>
                <li className="text-gray-300">{isZh ? '心理压力小（无指标冲突，信号清晰）' : 'Less psychological pressure (no indicator conflicts, clear signals)'}</li>
                <li className="text-gray-300">{isZh ? '适用所有市场和时间框架' : 'Works in all markets and timeframes'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '裸K交易的挑战' : 'Naked Trading Challenges'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '学习曲线陡峭（需要6-12个月练习）' : 'Steep learning curve (needs 6-12 months practice)'}</li>
                <li className="text-gray-300">{isZh ? '初期缺乏"安全感"（习惯依赖指标）' : 'Initially lacks "security" (used to relying on indicators)'}</li>
                <li className="text-gray-300">{isZh ? '主观性强，需要经验积累' : 'Highly subjective, needs experience accumulation'}</li>
                <li className="text-gray-300">{isZh ? '无法量化回测（难以编程）' : 'Can\'t quantitatively backtest (hard to program)'}</li>
                <li className="text-gray-300">{isZh ? '需要严格纪律（无信号时不交易）' : 'Requires strict discipline (don\'t trade with no signal)'}</li>
                <li className="text-gray-300">{isZh ? '初期胜率可能低于指标交易' : 'Initial win rate may be lower than indicator trading'}</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '从指标交易过渡到裸K交易的路线图' : 'Roadmap from Indicator to Naked Trading'}
            </h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-300">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '阶段1（第1-2个月）：' : 'Stage 1 (Months 1-2):'}</strong>{' '}
                {isZh ? '保留2-3个指标（如20/50 EMA + MACD），同时学习价格行为信号（Pin Bar, Engulfing）。主要依赖指标，价格行为作为辅助确认。' : 'Keep 2-3 indicators (like 20/50 EMA + MACD), simultaneously learn price action signals (Pin Bar, Engulfing). Mainly rely on indicators, price action as auxiliary confirmation.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '阶段2（第3-4个月）：' : 'Stage 2 (Months 3-4):'}</strong>{' '}
                {isZh ? '减少至1个指标（50 EMA），主要依赖价格行为信号+关键支撑阻力位交易。EMA仅用于判断趋势方向。' : 'Reduce to 1 indicator (50 EMA), mainly rely on price action signals + key S/R trading. EMA only for trend direction judgment.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '阶段3（第5-6个月）：' : 'Stage 3 (Months 5-6):'}</strong>{' '}
                {isZh ? '移除所有指标，完全依赖裸K+支撑阻力+趋势线。初期可能不适应（缺乏安全感），坚持1-2个月。' : 'Remove all indicators, completely rely on naked + S/R + trendlines. Initially may not adapt (lack security), persist 1-2 months.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '阶段4（第7-12个月）：' : 'Stage 4 (Months 7-12):'}</strong>{' '}
                {isZh ? '熟练使用裸K交易，培养对价格的"直觉"。开始学习供需区域等进阶概念。交易质量提升，频率降低。' : 'Proficiently use naked trading, develop price "intuition". Start learning advanced concepts like S/D zones. Trading quality improves, frequency reduces.'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Advanced Techniques */}
      <section id="advanced-techniques" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '进阶技巧' : 'Advanced Techniques'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '技巧1：复合信号（Confluence） - 多重确认提升胜率' : 'Technique 1: Confluence - Multiple Confirmations Improve Win Rate'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '复合信号（Confluence）是指多个技术因素同时指向同一交易机会。当2-3个以上因素重合时，该位置的可靠性显著提升（胜率从60%提升至75-80%）。专业交易者只交易"复合信号"区域。'
                  : 'Confluence is when multiple technical factors simultaneously point to same trading opportunity. When 2-3+ factors coincide, that location\'s reliability significantly improves (win rate from 60% to 75-80%). Professional traders only trade "confluence" zones.'}
              </p>
              <div className="p-4 bg-gray-900 text-gray-300 border-2 border-gray-800">
                <p className="font-bold mb-2 text-white">{isZh ? '高复合度位置示例：' : 'High Confluence Location Example:'}</p>
                <ul className="space-y-2 text-sm">
                  <li className="text-gray-300">{isZh ? 'EUR/USD在1.1000位置（整数关口）' : 'EUR/USD at 1.1000 (round number)'}</li>
                  <li className="text-gray-300">{isZh ? '+ D1前高阻力位' : '+ D1 previous high resistance'}</li>
                  <li className="text-gray-300">{isZh ? '+ 50 EMA动态阻力' : '+ 50 EMA dynamic resistance'}</li>
                  <li className="text-gray-300">{isZh ? '+ 61.8%斐波那契回撤位' : '+ 61.8% Fibonacci retracement'}</li>
                  <li className="text-gray-300">{isZh ? '+ 新鲜供给区域' : '+ Fresh supply zone'}</li>
                  <li className="text-gray-300">{isZh ? '+ 出现看跌Pin Bar' : '+ Bearish Pin Bar appears'}</li>
                  <li className="font-bold text-yellow-300 dark:text-yellow-600 mt-2">
                    {isZh ? '→ 6个因素重合！胜率80%+，风险回报比1:3，这是"梦幻交易机会"' : '→ 6 factors coincide! Win rate 80%+, risk-reward 1:3, this is "dream trading opportunity"'}
                  </li>
                </ul>
              </div>
              <p className="text-sm mt-3">
                <strong className="text-white">{isZh ? '实战应用：' : 'Practical Application:'}</strong>{' '}
                {isZh
                  ? '在每日复盘时，标记图表上的"复合区域"（至少3个因素重合）。整个交易周，只交易这些"高复合度"位置，忽略其他机会。虽然交易频率降低（每周1-3次），但胜率和盈亏比大幅提升。'
                  : 'During daily review, mark "confluence zones" on chart (at least 3 factors coincide). Throughout trading week, only trade these "high confluence" locations, ignore other opportunities. Though trading frequency reduces (1-3 times weekly), win rate and profit ratio significantly improve.'}
              </p>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '技巧2：市场结构分析（Market Structure） - 识别Higher Highs/Lower Lows' : 'Technique 2: Market Structure Analysis - Identify Higher Highs/Lower Lows'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '价格行为交易的核心是"跟随市场结构"。市场结构分为三种：上升趋势（Higher Highs + Higher Lows）、下降趋势（Lower Highs + Lower Lows）、横盘震荡（无明确HH/LL）。只在明确结构中交易，避免横盘市场。'
                  : 'Core of price action is "follow market structure". Market structure has three types: uptrend (Higher Highs + Higher Lows), downtrend (Lower Highs + Lower Lows), ranging (no clear HH/LL). Only trade in clear structure, avoid ranging markets.'}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? '上升趋势交易法则：' : 'Uptrend Trading Rules:'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '识别：每个高点更高，每个低点更高（HH + HL）' : 'Identify: each high higher, each low higher (HH + HL)'}</li>
                    <li className="text-gray-300">{isZh ? '只做多，不做空（即使出现看跌信号）' : 'Only long, no short (even if bearish signal appears)'}</li>
                    <li className="text-gray-300">{isZh ? '在Higher Low位置寻找做多机会（回调至支撑）' : 'Find long opportunities at Higher Low locations (pullback to support)'}</li>
                    <li className="text-gray-300">{isZh ? '止损设在Lower Low下方（如果跌破LL，趋势可能反转）' : 'Stop below Lower Low (if breaks LL, trend may reverse)'}</li>
                    <li className="text-gray-300">{isZh ? '目标：下一个Higher High或使用追踪止损' : 'Target: next Higher High or use trailing stop'}</li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? '下降趋势交易法则：' : 'Downtrend Trading Rules:'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '识别：每个高点更低，每个低点更低（LH + LL）' : 'Identify: each high lower, each low lower (LH + LL)'}</li>
                    <li className="text-gray-300">{isZh ? '只做空，不做多（即使出现看涨信号）' : 'Only short, no long (even if bullish signal appears)'}</li>
                    <li className="text-gray-300">{isZh ? '在Lower High位置寻找做空机会（反弹至阻力）' : 'Find short opportunities at Lower High locations (bounce to resistance)'}</li>
                    <li className="text-gray-300">{isZh ? '止损设在Higher High上方（如果突破HH，趋势可能反转）' : 'Stop above Higher High (if breaks HH, trend may reverse)'}</li>
                    <li className="text-gray-300">{isZh ? '目标：下一个Lower Low或使用追踪止损' : 'Target: next Lower Low or use trailing stop'}</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600 mt-3">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '⚠️ 趋势反转信号（Break of Structure）：' : '⚠️ Trend Reversal Signal (Break of Structure):'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '上升趋势中，如果价格跌破前一个Higher Low（BOS，Break of Structure），趋势可能反转为下降。此时平仓所有多单，等待新趋势确认后考虑做空。同理，下降趋势中突破前一个Lower High，趋势可能反转为上升。'
                    : 'In uptrend, if price breaks below previous Higher Low (BOS, Break of Structure), trend may reverse to downtrend. Close all long positions, wait for new trend confirmation before considering shorts. Similarly, in downtrend breaking above previous Lower High, trend may reverse to uptrend.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '技巧3：时间框架协同（Multi-Timeframe Synergy）' : 'Technique 3: Multi-Timeframe Synergy'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '不要只盯一个时间框架。使用"三重时间框架法"：D1判断大趋势 → H4寻找回调/反弹位置 → H1寻找具体入场信号。多时间框架一致时，胜率提升至80%+。'
                  : 'Don\'t only watch one timeframe. Use "triple timeframe method": D1 judge major trend → H4 find pullback/bounce locations → H1 find specific entry signals. When multiple timeframes align, win rate improves to 80%+.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '三重时间框架实战案例：' : 'Triple Timeframe Practical Example:'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'D1图表（趋势判断）：' : 'D1 Chart (Trend Judgment):'}</strong>{' '}
                    {isZh ? 'EUR/USD处于上升趋势，价格在50 EMA上方，过去2周创造HH+HL。交易偏好：只做多。' : 'EUR/USD in uptrend, price above 50 EMA, past 2 weeks made HH+HL. Trading bias: only long.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'H4图表（位置识别）：' : 'H4 Chart (Location Identification):'}</strong>{' '}
                    {isZh ? '价格从1.1100回调至1.0950关键支撑位（前低+61.8%斐波那契）。等待该位置出现看涨信号。' : 'Price pulls back from 1.1100 to 1.0950 key support (previous low + 61.8% Fib). Wait for bullish signal at this location.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'H1图表（入场执行）：' : 'H1 Chart (Entry Execution):'}</strong>{' '}
                    {isZh ? '在1.0950支撑位出现看涨Pin Bar，下一根阳线确认。入场1.0955，止损1.0935，目标1.1050（1:4.75风险回报比）。' : 'Bullish Pin Bar appears at 1.0950 support, next bullish candle confirms. Entry 1.0955, stop 1.0935, target 1.1050 (1:4.75 risk-reward).'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '技巧4：关键时段选择（Session Trading）' : 'Technique 4: Key Session Selection (Session Trading)'}</h3>
            <p className="mb-3">
              {isZh
                ? '不是所有时段都适合价格行为交易。选择高流动性、高波动性的时段，信号更可靠，盈利空间更大。'
                : 'Not all sessions suit price action trading. Choose high liquidity, high volatility sessions, signals more reliable, larger profit potential.'}
            </p>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '最佳时段（推荐）：' : 'Best Sessions (Recommended):'}</strong>{' '}
                {isZh
                  ? '欧洲开盘（北京时间15:00-18:00），欧美重叠（20:00-24:00），美国开盘（21:00-次日1:00）。这些时段流动性最高，价格行为信号最有效。'
                  : 'European open (15:00-18:00 Beijing), EU-US overlap (20:00-24:00), US open (21:00-01:00). These sessions have highest liquidity, price action signals most effective.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '避免时段：' : 'Avoid Sessions:'}</strong>{' '}
                {isZh
                  ? '亚洲午间（12:00-14:00，流动性枯竭），周五晚间（22:00后，欧美交易者离场），重大新闻前后30分钟（剧烈波动，价格行为失效）。'
                  : 'Asian afternoon (12:00-14:00, liquidity dries up), Friday evening (after 22:00, EU/US traders exit), 30 minutes around major news (violent fluctuations, price action fails).'}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
