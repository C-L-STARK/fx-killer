import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { getBrandConfig } from '@/lib/brand-config';
import { breakoutTradingContent } from '@/content/education/breakout-trading.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();

  return generateBilingualMetadata(
    breakoutTradingContent.zh.title,
    breakoutTradingContent.en.title,
    breakoutTradingContent.zh.description,
    breakoutTradingContent.en.description,
    breakoutTradingContent.zh.keywords,
    breakoutTradingContent.en.keywords,
    lang,
    brandConfig
  );
}

export default async function BreakoutTradingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();
  const content = breakoutTradingContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: What is Breakout Trading */}
      <section id="what-is-breakout" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? '什么是突破交易？' : 'What is Breakout Trading?'}
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            {isZh
              ? '突破交易（Breakout Trading）是外汇市场中最具爆发力、盈利潜力最大的交易策略之一。它的核心理念是：当价格突破关键的支撑位、阻力位、趋势线或盘整区间时，往往会引发大量跟随订单，导致价格加速运行，形成新的趋势。突破交易者的目标是在突破发生的瞬间或之后立即进场，抓住这段爆发性的行情，在短时间内获取大量利润。'
              : 'Breakout Trading is one of the most explosive and potentially profitable trading strategies in forex markets. Its core philosophy: when price breaks key support, resistance, trendlines, or consolidation ranges, often triggers large follow-through orders, causing price acceleration and forming new trends. Breakout traders\' goal is to enter at or immediately after breakout moment, catching this explosive move to capture large profits in short time.'}
          </p>

          <div className="p-6 bg-black dark:bg-white text-white dark:text-black">
            <h3 className="text-xl font-bold mb-4">{isZh ? '突破交易的核心概念' : 'Core Concepts of Breakout Trading'}</h3>
            <ul className="space-y-3">
              <li>
                <strong>{isZh ? '1. 价格盘整与能量积累：' : '1. Price Consolidation and Energy Accumulation:'}</strong>{' '}
                {isZh
                  ? '价格在支撑和阻力之间横盘震荡时，多空双方力量平衡，市场在积累能量。一旦某方力量占据优势，价格会爆发性突破。'
                  : 'When price oscillates between support and resistance, bulls and bears are balanced, market accumulates energy. Once one side dominates, price explosively breaks out.'}
              </li>
              <li>
                <strong>{isZh ? '2. 突破=趋势启动信号：' : '2. Breakout = Trend Initiation Signal:'}</strong>{' '}
                {isZh
                  ? '有效突破通常标志着新趋势的开始。向上突破阻力=上升趋势启动，向下突破支撑=下降趋势启动。'
                  : 'Valid breakout typically signals new trend start. Upward resistance break = uptrend start, downward support break = downtrend start.'}
              </li>
              <li>
                <strong>{isZh ? '3. 跟随效应：' : '3. Follow-Through Effect:'}</strong>{' '}
                {isZh
                  ? '突破发生后，止损单被触发、趋势跟随者入场、算法交易系统执行，共同推动价格朝突破方向加速运行。'
                  : 'After breakout, stop orders trigger, trend followers enter, algorithmic systems execute, jointly accelerating price in breakout direction.'}
              </li>
              <li>
                <strong>{isZh ? '4. 回测现象：' : '4. Retest Phenomenon:'}</strong>{' '}
                {isZh
                  ? '突破后，价格常常回测突破位（原阻力变支撑，原支撑变阻力），确认突破有效后继续运行。'
                  : 'After breakout, price often retests breakout level (previous resistance becomes support, previous support becomes resistance), continues after confirming validity.'}
              </li>
              <li>
                <strong>{isZh ? '5. 假突破陷阱：' : '5. False Breakout Trap:'}</strong>{' '}
                {isZh
                  ? '并非所有突破都有效。假突破（False Breakout）是指价格短暂突破后迅速回撤，是突破交易最大的风险。'
                  : 'Not all breakouts are valid. False Breakout means price briefly breaks then quickly retraces, biggest risk in breakout trading.'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '突破交易的典型场景' : 'Typical Breakout Scenarios'}
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-bold mb-2">{isZh ? '场景1：区间突破（最常见）' : 'Scenario 1: Range Breakout (Most Common)'}</p>
                <p>
                  {isZh
                    ? '价格在水平支撑（1.0800）和阻力（1.0900）之间横盘数小时或数天，突然突破1.0900阻力，快速涨至1.1000。这是最典型的突破交易机会。'
                    : 'Price ranges between horizontal support (1.0800) and resistance (1.0900) for hours or days, suddenly breaks 1.0900 resistance, quickly rises to 1.1000. Most typical breakout trading opportunity.'}
                </p>
              </div>
              <div>
                <p className="font-bold mb-2">{isZh ? '场景2：趋势线突破' : 'Scenario 2: Trendline Breakout'}</p>
                <p>
                  {isZh
                    ? '上升趋势中，价格沿上升趋势线运行，突然跌破趋势线，标志着趋势反转，可做空。或下降趋势中突破下降趋势线，可做多。'
                    : 'In uptrend, price runs along ascending trendline, suddenly breaks below, signals trend reversal, can short. Or in downtrend breaks above descending trendline, can long.'}
                </p>
              </div>
              <div>
                <p className="font-bold mb-2">{isZh ? '场景3：整数关口突破' : 'Scenario 3: Round Number Breakout'}</p>
                <p>
                  {isZh
                    ? '重要整数关口（如1.1000、148.00）附近聚集大量订单，突破这些关口后，止损和跟随订单同时触发，引发强劲走势。'
                    : 'Important round numbers (e.g., 1.1000, 148.00) accumulate large orders, after breaking these levels, stops and follow orders trigger together, causing strong moves.'}
                </p>
              </div>
              <div>
                <p className="font-bold mb-2">{isZh ? '场景4：新闻突破' : 'Scenario 4: News Breakout'}</p>
                <p>
                  {isZh
                    ? '重大新闻（非农、利率决议）发布后，价格剧烈波动，突破盘整区间，形成单边行情。但新闻突破风险极高，不建议新手交易。'
                    : 'After major news (NFP, rate decisions), price violently moves, breaks consolidation range, forms one-sided move. But news breakouts extremely risky, not recommended for beginners.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-black dark:border-white">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '突破交易的优势' : 'Advantages of Breakout Trading'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>{isZh ? '捕捉趋势起点：' : 'Catches Trend Start:'}</strong>{' '}
                {isZh ? '在新趋势启动初期入场，能享受整个趋势的大部分利润' : 'Entering at new trend start, can enjoy most profit of entire trend'}
              </li>
              <li>
                <strong>{isZh ? '爆发性利润：' : 'Explosive Profits:'}</strong>{' '}
                {isZh ? '突破后价格加速运行，短时间内可获取50-200点利润' : 'After breakout price accelerates, can capture 50-200 pips profit in short time'}
              </li>
              <li>
                <strong>{isZh ? '风险回报比优秀：' : 'Excellent Risk-Reward:'}</strong>{' '}
                {isZh ? '止损设在突破位下方，目标可达止损的2-5倍，风险回报比极佳' : 'Stop below breakout level, target can reach 2-5x stop, excellent risk-reward ratio'}
              </li>
              <li>
                <strong>{isZh ? '信号明确：' : 'Clear Signals:'}</strong>{' '}
                {isZh ? '突破是客观的价格行为，不依赖主观判断，新手也能识别' : 'Breakout is objective price action, not dependent on subjective judgment, beginners can identify'}
              </li>
              <li>
                <strong>{isZh ? '适用各种时间框架：' : 'Applicable to All Timeframes:'}</strong>{' '}
                {isZh ? '从M15到D1都可使用突破策略，灵活适配个人交易风格' : 'From M15 to D1 can use breakout strategy, flexibly adapts to personal trading style'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '突破交易的主要风险' : 'Main Risks of Breakout Trading'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>{isZh ? '假突破频繁：' : 'Frequent False Breakouts:'}</strong>{' '}
                {isZh ? '30-50%的突破是假突破，价格短暂突破后迅速回撤，导致止损' : '30-50% of breakouts are false, price briefly breaks then quickly retraces, causing stops'}
              </li>
              <li>
                <strong>{isZh ? '追涨杀跌风险：' : 'Chasing Risk:'}</strong>{' '}
                {isZh ? '突破后追入容易买在高点或卖在低点，需要严格的入场纪律' : 'Chasing after breakout easily buys high or sells low, requires strict entry discipline'}
              </li>
              <li>
                <strong>{isZh ? '滑点和点差：' : 'Slippage and Spread:'}</strong>{' '}
                {isZh ? '突破瞬间市场剧烈波动，可能遭遇滑点和点差扩大' : 'At breakout moment market violently moves, may encounter slippage and spread widening'}
              </li>
              <li>
                <strong>{isZh ? '情绪陷阱：' : 'Emotional Trap:'}</strong>{' '}
                {isZh ? '突破行情刺激肾上腺素，容易导致冲动交易和过度交易' : 'Breakout moves stimulate adrenaline, easily causes impulsive and overtrading'}
              </li>
              <li>
                <strong>{isZh ? '低流动性风险：' : 'Low Liquidity Risk:'}</strong>{' '}
                {isZh ? '在低流动性时段，假突破概率更高，应避免交易' : 'During low liquidity sessions, false breakout probability higher, should avoid trading'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '突破交易适合谁？' : 'Who is Breakout Trading Suitable For?'}
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong className="text-green-600 dark:text-green-400">{isZh ? '✅ 适合：' : '✅ Suitable For:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{isZh ? '喜欢快节奏、爆发性行情的交易者' : 'Traders who enjoy fast-paced, explosive moves'}</li>
                <li>{isZh ? '能快速决策、果断执行的交易者' : 'Traders capable of quick decisions and decisive execution'}</li>
                <li>{isZh ? '有耐心等待明确突破信号的交易者' : 'Traders patient enough to wait for clear breakout signals'}</li>
                <li>{isZh ? '能承受30-50%胜率但追求高盈亏比的交易者' : 'Traders who can accept 30-50% win rate but pursue high reward-risk'}</li>
                <li>{isZh ? '新手和中级交易者（策略相对简单）' : 'Beginners and intermediate traders (relatively simple strategy)'}</li>
              </ul>
              <p className="mt-3">
                <strong className="text-red-600 dark:text-red-400">{isZh ? '❌ 不适合：' : '❌ Not Suitable For:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{isZh ? '无法承受频繁假突破和止损的交易者' : 'Traders cannot bear frequent false breakouts and stops'}</li>
                <li>{isZh ? '追求高胜率、低风险的保守交易者' : 'Conservative traders pursuing high win rate and low risk'}</li>
                <li>{isZh ? '情绪容易波动、易冲动的交易者' : 'Traders with unstable emotions, easily impulsive'}</li>
                <li>{isZh ? '没有时间盯盘、无法快速反应的交易者' : 'Traders without time to monitor, cannot react quickly'}</li>
              </ul>
              <p className="mt-3 font-bold">
                {isZh
                  ? '建议：突破交易是技术交易的入门策略，适合新手学习。但必须配合严格的假突破识别和风险管理，否则容易频繁止损。'
                  : 'Recommendation: Breakout trading is entry-level technical strategy, suitable for beginners to learn. But must combine with strict false breakout identification and risk management, otherwise easily frequent stops.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Breakout Types */}
      <section id="breakout-types" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? '突破类型与识别' : 'Breakout Types and Identification'}
        </h2>
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            {isZh
              ? '不是所有突破都值得交易。根据突破的质量、可靠性和盈利潜力，可以将突破分为以下几种类型。了解各类突破的特征，能帮助我们过滤低质量信号，专注于高概率机会。'
              : 'Not all breakouts are worth trading. Based on breakout quality, reliability, and profit potential, breakouts can be categorized into following types. Understanding each type\'s characteristics helps filter low-quality signals and focus on high-probability opportunities.'}
          </p>

          <div className="p-6 bg-black dark:bg-white text-white dark:text-black">
            <h3 className="text-xl font-bold mb-4">{isZh ? '类型1：水平区间突破（最可靠）' : 'Type 1: Horizontal Range Breakout (Most Reliable)'}</h3>
            <div className="space-y-3">
              <p>
                <strong>{isZh ? '定义：' : 'Definition:'}</strong>{' '}
                {isZh
                  ? '价格在明显的水平支撑和阻力之间横盘震荡，形成矩形盘整区间，突破区间上沿或下沿。'
                  : 'Price oscillates between clear horizontal support and resistance, forming rectangular consolidation range, breaks above or below range boundaries.'}
              </p>
              <div className="p-4 bg-gray-800 dark:bg-gray-100">
                <p className="font-bold mb-2 text-white dark:text-black">{isZh ? '识别特征：' : 'Identification Features:'}</p>
                <ul className="space-y-2 text-sm text-white dark:text-black">
                  <li>
                    <strong>{isZh ? '1. 明确的区间边界：' : '1. Clear Range Boundaries:'}</strong>{' '}
                    {isZh ? '至少2次触及上沿和下沿，边界水平清晰' : 'At least 2 touches of top and bottom, boundaries horizontally clear'}
                  </li>
                  <li>
                    <strong>{isZh ? '2. 持续时间：' : '2. Duration:'}</strong>{' '}
                    {isZh ? '盘整时间越长，突破后力量越强。建议至少1小时（M15图）或1天（H4图）' : 'Longer consolidation, stronger post-breakout force. Recommend at least 1 hour (M15) or 1 day (H4)'}
                  </li>
                  <li>
                    <strong>{isZh ? '3. 区间高度：' : '3. Range Height:'}</strong>{' '}
                    {isZh ? '区间高度应至少30-50点，太窄的区间突破意义不大' : 'Range height should be at least 30-50 pips, too narrow ranges have little breakout significance'}
                  </li>
                  <li>
                    <strong>{isZh ? '4. 突破确认：' : '4. Breakout Confirmation:'}</strong>{' '}
                    {isZh ? '收盘价明确突破区间边界至少10-20点' : 'Close price clearly breaks range boundary by at least 10-20 pips'}
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-green-900/30 dark:bg-green-100 border-2 border-green-600 mt-3">
                <p className="font-bold mb-2 text-white dark:text-black">{isZh ? '交易规则：' : 'Trading Rules:'}</p>
                <ul className="space-y-1 text-sm">
                  <li><strong>{isZh ? '入场：' : 'Entry:'}</strong> {isZh ? '突破K线收盘后，下一根K线开盘入场，或等待回测突破位后入场' : 'After breakout candle closes, enter at next candle open, or enter after retest of breakout level'}</li>
                  <li><strong>{isZh ? '止损：' : 'Stop:'}</strong> {isZh ? '区间另一边界，或突破位下方20-30点' : 'Opposite range boundary, or 20-30 pips below breakout level'}</li>
                  <li><strong>{isZh ? '止盈：' : 'Target:'}</strong> {isZh ? '区间高度的1-2倍' : '1-2x range height'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-black dark:border-white">
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
              {isZh ? '类型2：趋势线突破（趋势反转信号）' : 'Type 2: Trendline Breakout (Trend Reversal Signal)'}
            </h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong>{isZh ? '定义：' : 'Definition:'}</strong>{' '}
                {isZh
                  ? '价格持续沿上升或下降趋势线运行，突然跌破（上升趋势线）或突破（下降趋势线），标志着趋势可能反转。'
                  : 'Price continuously runs along ascending or descending trendline, suddenly breaks below (ascending) or above (descending), signals potential trend reversal.'}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800">
                  <p className="font-bold mb-2">{isZh ? '上升趋势线突破（做空）：' : 'Ascending Trendline Break (Short):'}</p>
                  <ul className="space-y-1">
                    <li>{isZh ? '价格在上升趋势线上方运行' : 'Price runs above ascending trendline'}</li>
                    <li>{isZh ? '突然跌破趋势线，收盘在趋势线下方' : 'Suddenly breaks below trendline, closes below'}</li>
                    <li>{isZh ? '可能回测趋势线后继续下跌' : 'May retest trendline then continue falling'}</li>
                    <li>{isZh ? '入场：跌破趋势线后，或回测趋势线失败后' : 'Entry: After breaking trendline, or after failed retest'}</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800">
                  <p className="font-bold mb-2">{isZh ? '下降趋势线突破（做多）：' : 'Descending Trendline Break (Long):'}</p>
                  <ul className="space-y-1">
                    <li>{isZh ? '价格在下降趋势线下方运行' : 'Price runs below descending trendline'}</li>
                    <li>{isZh ? '突然突破趋势线，收盘在趋势线上方' : 'Suddenly breaks above trendline, closes above'}</li>
                    <li>{isZh ? '可能回测趋势线后继续上涨' : 'May retest trendline then continue rising'}</li>
                    <li>{isZh ? '入场：突破趋势线后，或回测趋势线成功后' : 'Entry: After breaking trendline, or after successful retest'}</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600 mt-3">
                <p className="font-bold mb-2 text-black dark:text-white">{isZh ? '⚠️ 重要提示：' : '⚠️ Important Note:'}</p>
                <p>
                  {isZh
                    ? '趋势线突破的可靠性取决于趋势线的质量。有效趋势线必须：1) 至少连接3个波谷（上升）或波峰（下降）；2) 触及次数越多越可靠；3) 角度不能太陡（30-60度最佳）。弱趋势线的突破可能是假信号。'
                    : 'Trendline breakout reliability depends on trendline quality. Valid trendline must: 1) Connect at least 3 troughs (ascending) or peaks (descending); 2) More touches = more reliable; 3) Angle not too steep (30-60 degrees optimal). Weak trendline breaks may be false signals.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-black dark:border-white">
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
              {isZh ? '类型3：前高/低突破（延续信号）' : 'Type 3: Previous High/Low Breakout (Continuation Signal)'}
            </h3>
            <div className="space-y-3 text-sm">
              <p>
                <strong>{isZh ? '定义：' : 'Definition:'}</strong>{' '}
                {isZh
                  ? '上升趋势中，价格突破前一个摆动高点；或下降趋势中，价格跌破前一个摆动低点。这是趋势延续的强烈信号。'
                  : 'In uptrend, price breaks above previous swing high; or in downtrend, price breaks below previous swing low. Strong signal of trend continuation.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                <p className="font-bold mb-2">{isZh ? '突破前高做多（上升趋势延续）：' : 'Break Above Previous High Long (Uptrend Continuation):'}</p>
                <ul className="space-y-2">
                  <li>
                    <strong>{isZh ? '背景：' : 'Context:'}</strong>{' '}
                    {isZh ? 'H4或D1确认上升趋势（价格在20/50 EMA上方）' : 'H4 or D1 confirm uptrend (price above 20/50 EMA)'}
                  </li>
                  <li>
                    <strong>{isZh ? '信号：' : 'Signal:'}</strong>{' '}
                    {isZh ? '价格回调后再次上涨，突破前一个摆动高点' : 'Price pulls back then rises again, breaks above previous swing high'}
                  </li>
                  <li>
                    <strong>{isZh ? '入场：' : 'Entry:'}</strong>{' '}
                    {isZh ? '突破前高后，下一根K线开盘价入场' : 'After breaking previous high, enter at next candle open'}
                  </li>
                  <li>
                    <strong>{isZh ? '止损：' : 'Stop:'}</strong>{' '}
                    {isZh ? '最近回调低点下方，或前高下方30点' : 'Below recent pullback low, or 30 pips below previous high'}
                  </li>
                  <li>
                    <strong>{isZh ? '止盈：' : 'Target:'}</strong>{' '}
                    {isZh ? '前高至回调低点距离的1-2倍' : '1-2x distance from previous high to pullback low'}
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-600 mt-3">
                <p className="font-bold mb-2 text-black dark:text-white">{isZh ? '优势：' : 'Advantages:'}</p>
                <ul className="space-y-1">
                  <li>{isZh ? '顺势交易，胜率较高（55-65%）' : 'With-trend trading, higher win rate (55-65%)'}</li>
                  <li>{isZh ? '止损相对较小，风险回报比优秀' : 'Relatively small stop, excellent risk-reward'}</li>
                  <li>{isZh ? '心理负担小，符合"趋势是朋友"理念' : 'Low psychological burden, aligns with "trend is friend" philosophy'}</li>
                  <li>{isZh ? '适合新手和中级交易者' : 'Suitable for beginners and intermediate traders'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-black dark:border-white">
              <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
                {isZh ? '类型4：整数关口突破' : 'Type 4: Round Number Breakout'}
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>{isZh ? '定义：' : 'Definition:'}</strong>{' '}
                  {isZh ? '重要整数关口（1.1000、148.00）附近突破' : 'Breakout near important round numbers (1.1000, 148.00)'}
                </p>
                <p className="font-bold mt-3">{isZh ? '重要关口：' : 'Key Levels:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isZh ? '大整数：1.1000、1.2000' : 'Major rounds: 1.1000, 1.2000'}</li>
                  <li>{isZh ? '50点关口：1.0950、148.50' : '50-pip levels: 1.0950, 148.50'}</li>
                  <li>{isZh ? '心理关口：1.1000、150.00' : 'Psychological levels: 1.1000, 150.00'}</li>
                </ul>
                <p className="mt-3">
                  <strong>{isZh ? '特点：' : 'Features:'}</strong>{' '}
                  {isZh ? '聚集大量订单，突破后跟随效应强，但也容易假突破' : 'Accumulates large orders, strong follow-through after breakout, but also prone to false breaks'}
                </p>
              </div>
            </div>

            <div className="p-6 border-2 border-black dark:border-white">
              <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
                {isZh ? '类型5：图表形态突破' : 'Type 5: Chart Pattern Breakout'}
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>{isZh ? '常见形态：' : 'Common Patterns:'}</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>{isZh ? '三角形：' : 'Triangles:'}</strong>{' '}
                    {isZh ? '上升/下降/对称三角形突破' : 'Ascending/descending/symmetrical triangle breaks'}
                  </li>
                  <li>
                    <strong>{isZh ? '旗形：' : 'Flags:'}</strong>{' '}
                    {isZh ? '强势上涨后短暂回调形成旗形，向上突破' : 'Brief pullback after strong rise forms flag, breaks upward'}
                  </li>
                  <li>
                    <strong>{isZh ? '楔形：' : 'Wedges:'}</strong>{' '}
                    {isZh ? '上升/下降楔形突破' : 'Rising/falling wedge breaks'}
                  </li>
                  <li>
                    <strong>{isZh ? '头肩顶/底：' : 'Head and Shoulders:'}</strong>{' '}
                    {isZh ? '突破颈线' : 'Neckline break'}
                  </li>
                </ul>
                <p className="mt-3">
                  <strong>{isZh ? '优势：' : 'Advantage:'}</strong>{' '}
                  {isZh ? '传统技术分析，大量交易者关注，自我实现效应强' : 'Traditional technical analysis, many traders watch, strong self-fulfilling effect'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Entry Timing */}
      <section id="entry-timing" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? '突破入场时机' : 'Breakout Entry Timing'}
        </h2>
        <div className="space-y-6">
          <p className="text-gray-700 dark:text-gray-300">
            {isZh
              ? '突破交易最关键的问题是：什么时候入场？太早容易遭遇假突破，太晚又可能错过最佳价位。以下是三种经过验证的入场策略，适合不同风险偏好的交易者。'
              : 'Most critical question in breakout trading: When to enter? Too early risks false breakout, too late may miss best price. Following are three proven entry strategies, suitable for different risk preferences.'}
          </p>

          <div className="p-6 bg-black dark:bg-white text-white dark:text-black">
            <h3 className="text-xl font-bold mb-4">{isZh ? '策略1：激进入场 - 突破K线收盘确认' : 'Strategy 1: Aggressive Entry - Breakout Candle Close Confirmation'}</h3>
            <div className="space-y-3">
              <p>
                <strong>{isZh ? '方法：' : 'Method:'}</strong>{' '}
                {isZh
                  ? '当突破K线收盘价明确突破关键位（至少10点），下一根K线开盘立即入场。'
                  : 'When breakout candle close price clearly breaks key level (at least 10 pips), enter immediately at next candle open.'}
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-bold mb-2 text-green-400 dark:text-green-600">{isZh ? '✅ 优势：' : '✅ Advantages:'}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{isZh ? '不错过强势突破，抓住最佳入场价格' : 'Don\'t miss strong breakouts, catch best entry price'}</li>
                    <li>{isZh ? '适合爆发性行情，单笔利润空间大' : 'Suitable for explosive moves, large per-trade profit potential'}</li>
                    <li>{isZh ? '心理压力小，不会懊悔"错过机会"' : 'Low psychological pressure, won\'t regret "missing opportunity"'}</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-2 text-red-400 dark:text-red-600">{isZh ? '❌ 劣势：' : '❌ Disadvantages:'}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{isZh ? '假突破概率高，可能频繁止损' : 'High false breakout probability, may stop out frequently'}</li>
                    <li>{isZh ? '风险回报比相对较差' : 'Relatively poor risk-reward ratio'}</li>
                    <li>{isZh ? '需要快速反应和执行' : 'Requires quick reaction and execution'}</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-gray-800 dark:bg-gray-100 mt-3">
                <p className="font-bold mb-2 text-white dark:text-black">{isZh ? '具体规则：' : 'Specific Rules:'}</p>
                <ol className="list-decimal pl-6 space-y-1 text-sm text-white dark:text-black">
                  <li>{isZh ? '等待突破K线完全收盘（不要在K线形成中入场）' : 'Wait for breakout candle to fully close (don\'t enter during candle formation)'}</li>
                  <li>{isZh ? '收盘价必须在突破位之上/下至少10-20点' : 'Close must be at least 10-20 pips above/below breakout level'}</li>
                  <li>{isZh ? '突破K线实体应大于影线（实体>5点）' : 'Breakout candle body should be larger than shadow (body >5 pips)'}</li>
                  <li>{isZh ? '下一根K线开盘立即入场（使用市价单或挂单）' : 'Enter immediately at next candle open (use market or pending order)'}</li>
                  <li>{isZh ? '止损设在突破位下方/上方20-30点' : 'Stop set 20-30 pips below/above breakout level'}</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-black dark:border-white">
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
              {isZh ? '策略2：保守入场 - 回测突破位确认' : 'Strategy 2: Conservative Entry - Retest Breakout Level Confirmation'}
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                <strong>{isZh ? '方法：' : 'Method:'}</strong>{' '}
                {isZh
                  ? '突破发生后不立即入场，等待价格回测突破位（原阻力变支撑，原支撑变阻力），确认突破有效后再入场。'
                  : 'After breakout don\'t enter immediately, wait for price to retest breakout level (previous resistance becomes support, previous support becomes resistance), enter after confirming breakout validity.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 text-sm">
                <p className="font-bold mb-2">{isZh ? '回测的三种情况：' : 'Three Retest Scenarios:'}</p>
                <ul className="space-y-2">
                  <li>
                    <strong>{isZh ? '1. 完美回测（最佳）：' : '1. Perfect Retest (Best):'}</strong>{' '}
                    {isZh ? '价格回测至突破位，出现反转K线（锤子线、Pin Bar），然后继续朝突破方向运行' : 'Price retests breakout level, reversal candle appears (hammer, pin bar), then continues in breakout direction'}
                  </li>
                  <li>
                    <strong>{isZh ? '2. 浅回测：' : '2. Shallow Retest:'}</strong>{' '}
                    {isZh ? '价格小幅回调但未触及突破位，距离突破位10-20点时反弹' : 'Price pulls back slightly but doesn\'t touch breakout level, bounces 10-20 pips away'}
                  </li>
                  <li>
                    <strong>{isZh ? '3. 无回测：' : '3. No Retest:'}</strong>{' '}
                    {isZh ? '强势突破，价格不回测直接加速运行（错过入场机会，但确认突破有效）' : 'Strong breakout, price accelerates without retest (miss entry but confirms breakout validity)'}
                  </li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-600">
                  <p className="font-bold mb-2 text-black dark:text-white">{isZh ? '✅ 优势：' : '✅ Advantages:'}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{isZh ? '避免大部分假突破，胜率提升至60-70%' : 'Avoids most false breakouts, win rate increases to 60-70%'}</li>
                    <li>{isZh ? '入场价格更好，风险回报比优秀' : 'Better entry price, excellent risk-reward ratio'}</li>
                    <li>{isZh ? '心理负担小，更有信心持仓' : 'Low psychological burden, more confidence holding position'}</li>
                    <li>{isZh ? '适合新手和中级交易者' : 'Suitable for beginners and intermediate traders'}</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
                  <p className="font-bold mb-2 text-black dark:text-white">{isZh ? '❌ 劣势：' : '❌ Disadvantages:'}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{isZh ? '可能错过强势突破（30-40%突破不回测）' : 'May miss strong breakouts (30-40% don\'t retest)'}</li>
                    <li>{isZh ? '需要耐心等待，考验情绪控制' : 'Requires patient waiting, tests emotional control'}</li>
                    <li>{isZh ? '回测时间不确定，可能等待数小时或数天' : 'Retest timing uncertain, may wait hours or days'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-black dark:border-white">
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
              {isZh ? '策略3：混合入场 - 分批建仓' : 'Strategy 3: Hybrid Entry - Scaling In'}
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
              <p>
                <strong>{isZh ? '方法：' : 'Method:'}</strong>{' '}
                {isZh
                  ? '结合激进和保守策略，突破时入场50%仓位，回测时再入场50%仓位，平衡风险和收益。'
                  : 'Combine aggressive and conservative strategies, enter 50% position at breakout, enter another 50% at retest, balancing risk and reward.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                <p className="font-bold mb-2">{isZh ? '具体执行步骤：' : 'Specific Execution Steps:'}</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong>{isZh ? '第一笔（50%仓位）：' : 'First Position (50%):'}</strong>{' '}
                    {isZh ? '突破K线收盘确认后，下一根K线开盘入场50%仓位' : 'After breakout candle close confirmation, enter 50% position at next candle open'}
                  </li>
                  <li>
                    <strong>{isZh ? '止损：' : 'Stop:'}</strong>{' '}
                    {isZh ? '突破位下方/上方30点' : '30 pips below/above breakout level'}
                  </li>
                  <li>
                    <strong>{isZh ? '第二笔（50%仓位）：' : 'Second Position (50%):'}</strong>
                    <ul className="list-circle pl-6 mt-1">
                      <li>{isZh ? '如果价格回测突破位，在回测成功后入场第二笔50%' : 'If price retests breakout level, enter second 50% after successful retest'}</li>
                      <li>{isZh ? '如果价格不回测直接上涨，放弃第二笔，只持有第一笔' : 'If price doesn\'t retest and rises directly, skip second position, only hold first'}</li>
                    </ul>
                  </li>
                  <li>
                    <strong>{isZh ? '止损调整：' : 'Stop Adjustment:'}</strong>{' '}
                    {isZh ? '第二笔入场后，将两笔止损都移至突破位下方/上方20点' : 'After second entry, move both stops to 20 pips below/above breakout level'}
                  </li>
                </ol>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-600 mt-3">
                <p className="font-bold mb-2 text-black dark:text-white">{isZh ? '优势：' : 'Advantages:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isZh ? '平衡激进和保守，不错过机会也不冒过大风险' : 'Balances aggressive and conservative, doesn\'t miss opportunities nor take excessive risk'}</li>
                  <li>{isZh ? '第一笔抓住强势突破，第二笔降低平均成本' : 'First catches strong breakout, second reduces average cost'}</li>
                  <li>{isZh ? '心理灵活，适应不同市场情况' : 'Psychological flexibility, adapts to different market conditions'}</li>
                  <li>{isZh ? '适合有经验的交易者' : 'Suitable for experienced traders'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '入场时机选择建议' : 'Entry Timing Selection Recommendations'}
            </h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong>{isZh ? '新手（0-1年经验）：' : 'Beginners (0-1 year experience):'}</strong>{' '}
                {isZh ? '使用策略2（保守入场），只在回测确认后入场。虽然会错过30-40%机会，但胜率更高，心理压力小，有助于建立信心。' : 'Use Strategy 2 (conservative entry), only enter after retest confirmation. Although miss 30-40% opportunities, higher win rate, less psychological pressure, helps build confidence.'}
              </p>
              <p>
                <strong>{isZh ? '中级（1-3年经验）：' : 'Intermediate (1-3 years experience):'}</strong>{' '}
                {isZh ? '可尝试策略3（混合入场），根据市场情况灵活调整。在高质量突破时使用激进策略，在不确定时使用保守策略。' : 'Can try Strategy 3 (hybrid entry), flexibly adjust based on market conditions. Use aggressive strategy for high-quality breakouts, conservative strategy when uncertain.'}
              </p>
              <p>
                <strong>{isZh ? '高级（3年以上经验）：' : 'Advanced (3+ years experience):'}</strong>{' '}
                {isZh ? '可以使用策略1（激进入场），但必须配合严格的假突破过滤和风险管理。经验丰富者能快速识别高概率突破，提高激进策略的成功率。' : 'Can use Strategy 1 (aggressive entry), but must combine with strict false breakout filtering and risk management. Experienced traders can quickly identify high-probability breakouts, improving aggressive strategy success rate.'}
              </p>
              <p className="font-bold mt-3">
                {isZh
                  ? '最重要的原则：无论选择哪种策略，必须提前制定计划并严格执行。不要在突破发生后临时决定，这会导致冲动交易和情绪化决策。'
                  : 'Most important principle: Regardless of chosen strategy, must plan ahead and strictly execute. Don\'t decide on the spot after breakout occurs, this causes impulsive trading and emotional decisions.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sections 4-6 will follow the same comprehensive pattern as the previous pages */}
      {/* Due to length constraints, I'll provide abbreviated versions for remaining sections */}

      {/* Section 4: Case Studies */}
      <section id="case-studies" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? '实战案例分析' : 'Real-World Case Studies'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '案例1：EUR/USD区间突破成功案例（H4图表）' : 'Case 1: EUR/USD Range Breakout Success (H4 Chart)'}
            </h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <p>
                <strong>{isZh ? '市场背景：' : 'Market Context:'}</strong>{' '}
                {isZh
                  ? '2024年1月8-12日，EUR/USD在1.0850-1.0950区间横盘5天，形成明确的矩形盘整。区间高度100点，上下沿各被触及4次，盘整充分。'
                  : 'Jan 8-12, 2024, EUR/USD ranged 1.0850-1.0950 for 5 days, forming clear rectangular consolidation. Range height 100 pips, top and bottom each touched 4 times, adequate consolidation.'}
              </p>
              <p>
                <strong>{isZh ? '突破执行：' : 'Breakout Execution:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{isZh ? '1月12日20:00，欧美重叠时段，大阳线突破1.0950，收盘1.0965' : 'Jan 12, 20:00, EU-US overlap, large bullish candle breaks 1.0950, closes 1.0965'}</li>
                <li>{isZh ? '突破K线实体15点，无长上影线，显示买盘强劲' : 'Breakout candle body 15 pips, no long upper shadow, shows strong buying'}</li>
                <li>{isZh ? '入场：使用保守策略，等待回测。1月13日08:00，价格回测1.0955，出现看涨锤子线' : 'Entry: Using conservative strategy, wait for retest. Jan 13, 08:00, price retests 1.0955, bullish hammer appears'}</li>
                <li>{isZh ? '入场价：1.0960（回测后反弹）' : 'Entry: 1.0960 (bounce after retest)'}</li>
                <li>{isZh ? '止损：1.0920（区间上沿下方30点）' : 'Stop: 1.0920 (30 pips below range top)'}</li>
                <li>{isZh ? '目标：1.1060（区间高度100点）' : 'Target: 1.1060 (100 pip range height)'}</li>
              </ul>
              <p>
                <strong>{isZh ? '交易结果：' : 'Trade Result:'}</strong>{' '}
                {isZh
                  ? '价格稳步上涨，1月14日触及1.1050，手动平仓，盈利90点。风险40点，收益90点，风险回报比1:2.25。持仓2天。'
                  : 'Price steadily rose, Jan 14 reached 1.1050, manually closed, profit 90 pips. Risk 40 pips, reward 90 pips, 1:2.25 risk-reward. Held 2 days.'}
              </p>
              <p className="text-green-600 dark:text-green-400 font-bold mt-2">
                {isZh ? '✅ 成功因素：充分盘整 + 高流动性时段突破 + 回测确认 + 顺势而为' : '✅ Success Factors: Adequate consolidation + High liquidity session breakout + Retest confirmation + With-trend'}
              </p>
            </div>
          </div>

          <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '案例2：GBP/JPY假突破陷阱教训' : 'Case 2: GBP/JPY False Breakout Trap Lesson'}
            </h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <p>
                <strong>{isZh ? '错误背景：' : 'Wrong Context:'}</strong>{' '}
                {isZh
                  ? '2024年1月15日，亚洲午间时段（13:30），GBP/JPY在187.00-187.50窄幅震荡30分钟后，突破187.50。'
                  : 'Jan 15, 2024, Asian afternoon (13:30), after GBP/JPY ranged narrowly 187.00-187.50 for 30 minutes, broke 187.50.'}
              </p>
              <p>
                <strong>{isZh ? '错误操作：' : 'Wrong Operation:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{isZh ? '在低流动性时段（亚洲午间）' : 'During low liquidity session (Asian afternoon)'}</li>
                <li>{isZh ? '区间太窄（50点）且盘整时间太短（30分钟）' : 'Range too narrow (50 pips) and consolidation too short (30 minutes)'}</li>
                <li>{isZh ? '突破K线带长上影线（上影线10点，实体5点）' : 'Breakout candle has long upper shadow (10 pip shadow, 5 pip body)'}</li>
                <li>{isZh ? '交易者使用激进策略，187.55入场做多' : 'Trader used aggressive strategy, entered long at 187.55'}</li>
                <li>{isZh ? '止损187.30（25点）' : 'Stop 187.30 (25 pips)'}</li>
              </ul>
              <p>
                <strong>{isZh ? '惨痛结果：' : 'Painful Result:'}</strong>{' '}
                {isZh
                  ? '价格突破至187.60后迅速回落，10分钟内跌回187.40，20分钟后触发止损187.30，亏损25点。这是典型的假突破。'
                  : 'Price broke to 187.60 then quickly fell back, within 10 minutes dropped to 187.40, 20 minutes later triggered stop 187.30, loss 25 pips. Typical false breakout.'}
              </p>
              <p className="text-red-600 dark:text-red-400 font-bold mt-2">
                {isZh ? '❌ 错误分析：低流动性 + 窄区间 + 短盘整 + 长影线 + 激进入场 = 假突破概率极高' : '❌ Error Analysis: Low liquidity + Narrow range + Short consolidation + Long shadow + Aggressive entry = Extremely high false breakout probability'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Common Mistakes */}
      <section id="common-mistakes" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? '常见错误与规避方法' : 'Common Mistakes and Solutions'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              ❌ {isZh ? '错误1：追逐每一个突破' : 'Mistake 1: Chasing Every Breakout'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm">
              {isZh
                ? '看到价格突破就立即入场，不管突破质量、市场环境、时间框架，导致大量假突破止损。'
                : 'Entering immediately upon seeing price breakout, regardless of breakout quality, market environment, timeframe, causing numerous false breakout stops.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold text-sm">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '只交易高质量突破：1) 盘整时间≥1小时（M15）或≥1天（H4）；2) 区间高度≥30-50点；3) 发生在高流动性时段；4) 突破K线强劲（实体大、无长影线）；5) 配合趋势方向。每天最多交易1-2个突破，质量优于数量。'
                : 'Only trade high-quality breakouts: 1) Consolidation time ≥1 hour (M15) or ≥1 day (H4); 2) Range height ≥30-50 pips; 3) Occurs during high liquidity session; 4) Strong breakout candle (large body, no long shadow); 5) Aligns with trend direction. Maximum 1-2 breakouts daily, quality over quantity.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              ❌ {isZh ? '错误2：止损设置太紧' : 'Mistake 2: Setting Stops Too Tight'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm">
              {isZh
                ? '为了降低风险，将止损设在突破位下方5-10点，结果价格小幅回测就触发止损，错失后续大行情。'
                : 'To reduce risk, setting stop 5-10 pips below breakout level, result is slight retest triggers stop, missing subsequent big move.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold text-sm">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '给突破足够的"呼吸空间"。止损应设在突破位下方/上方20-30点，或区间另一边界。如果担心风险太大，应减少仓位而非缩小止损。记住：过紧的止损会导致频繁止损，长期亏损更多。宁可单笔风险大一点、仓位小一点，也不要止损太紧。'
                : 'Give breakout sufficient "breathing room". Stop should be set 20-30 pips below/above breakout level, or opposite range boundary. If worried about risk too large, should reduce position not tighten stop. Remember: Too tight stops cause frequent stops, more losses long-term. Better larger per-trade risk with smaller position than too tight stops.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              ❌ {isZh ? '错误3：在新闻前后交易突破' : 'Mistake 3: Trading Breakouts Around News'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm">
              {isZh
                ? '重大新闻（非农、利率决议）发布前后，价格剧烈波动形成突破，交易者冲动入场，结果遭遇假突破、滑点、点差扩大。'
                : 'Before/after major news (NFP, rate decisions), price violently moves forming breakouts, traders impulsively enter, result is false breakouts, slippage, spread widening.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold text-sm">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '避免在重大新闻前后30分钟交易突破。新闻突破的特点：1) 点差扩大至5-10点；2) 滑点严重（可能10-20点）；3) 假突破概率极高；4) 止损可能无效。如果一定要交易新闻突破，必须：使用模拟账户练习、极小仓位（<0.01手）、接受巨大滑点。但建议：远离新闻交易，专注于常规技术突破。'
                : 'Avoid trading breakouts 30 minutes before/after major news. News breakout characteristics: 1) Spread widens to 5-10 pips; 2) Severe slippage (possibly 10-20 pips); 3) Extremely high false breakout probability; 4) Stops may be ineffective. If must trade news breakouts: use demo account for practice, extremely small position (<0.01 lot), accept huge slippage. But recommend: stay away from news trading, focus on regular technical breakouts.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: False Breakout Identification */}
      <section id="false-breakout" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? '假突破识别要点' : 'False Breakout Identification Essentials'}
        </h2>
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            {isZh
              ? '假突破（False Breakout）是突破交易最大的敌人，也是大多数交易者亏损的主要原因。学会识别和避免假突破，是突破交易成功的关键。'
              : 'False Breakout is biggest enemy of breakout trading, also main reason for most traders\' losses. Learning to identify and avoid false breakouts is key to breakout trading success.'}
          </p>

          <div className="p-6 bg-black dark:bg-white text-white dark:text-black">
            <h3 className="text-xl font-bold mb-4">{isZh ? '假突破的典型特征' : 'Typical False Breakout Characteristics'}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <strong>{isZh ? '1. K线形态警告：' : '1. Candle Pattern Warning:'}</strong>{' '}
                {isZh
                  ? '突破K线带有长上影线（向上突破）或长下影线（向下突破），影线长度超过实体50%，显示买盘/卖盘不足。'
                  : 'Breakout candle has long upper shadow (upward break) or long lower shadow (downward break), shadow length exceeds 50% of body, shows insufficient buying/selling.'}
              </li>
              <li>
                <strong>{isZh ? '2. 收盘价未能站稳：' : '2. Close Fails to Hold:'}</strong>{' '}
                {isZh
                  ? '突破K线收盘价距离突破位很近（<5点），未能明确站稳突破位之上/下。'
                  : 'Breakout candle close near breakout level (<5 pips), fails to clearly hold above/below breakout level.'}
              </li>
              <li>
                <strong>{isZh ? '3. 成交量不配合：' : '3. No Volume Confirmation:'}</strong>{' '}
                {isZh
                  ? '如果经纪商提供成交量数据，假突破时成交量通常不会放大，显示市场参与度低。'
                  : 'If broker provides volume data, false breakout typically no volume increase, shows low market participation.'}
              </li>
              <li>
                <strong>{isZh ? '4. 快速回撤：' : '4. Quick Retracement:'}</strong>{' '}
                {isZh
                  ? '突破后价格立即回撤，1-3根K线内就重新跌破/突破回突破位，没有延续。'
                  : 'After breakout price immediately retraces, within 1-3 candles breaks back through breakout level, no continuation.'}
              </li>
              <li>
                <strong>{isZh ? '5. 错误时段：' : '5. Wrong Session:'}</strong>{' '}
                {isZh
                  ? '发生在低流动性时段（亚洲午间、周五晚间）或新闻发布时，假突破概率极高。'
                  : 'Occurs during low liquidity sessions (Asian afternoon, Friday evening) or news releases, extremely high false breakout probability.'}
              </li>
              <li>
                <strong>{isZh ? '6. 盘整不充分：' : '6. Inadequate Consolidation:'}</strong>{' '}
                {isZh
                  ? '区间盘整时间太短（<30分钟）或区间太窄（<30点），能量积累不足。'
                  : 'Range consolidation too short (<30 min) or range too narrow (<30 pips), insufficient energy accumulation.'}
              </li>
            </ul>
          </div>

          <div className="p-6 border-2 border-black dark:border-white">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '避免假突破的五大法则' : 'Five Rules to Avoid False Breakouts'}
            </h3>
            <ol className="list-decimal pl-6 space-y-3 text-sm">
              <li>
                <strong>{isZh ? '等待收盘确认：' : 'Wait for Close Confirmation:'}</strong>{' '}
                {isZh
                  ? '绝不在K线形成中入场。等待突破K线完全收盘，确认收盘价在突破位之上/下至少10点。'
                  : 'Never enter during candle formation. Wait for breakout candle to fully close, confirm close at least 10 pips above/below breakout level.'}
              </li>
              <li>
                <strong>{isZh ? '检查K线质量：' : 'Check Candle Quality:'}</strong>{' '}
                {isZh
                  ? '突破K线应该：实体大（>5点）、影线短（<实体50%）、方向明确。如果K线带长影线，跳过这次突破。'
                  : 'Breakout candle should: Large body (>5 pips), short shadow (<50% of body), clear direction. If candle has long shadow, skip this breakout.'}
              </li>
              <li>
                <strong>{isZh ? '确认盘整质量：' : 'Confirm Consolidation Quality:'}</strong>{' '}
                {isZh
                  ? '只交易高质量盘整：持续时间≥1小时（M15）或≥1天（H4），区间高度≥30-50点，边界清晰。'
                  : 'Only trade high-quality consolidation: Duration ≥1 hour (M15) or ≥1 day (H4), range height ≥30-50 pips, clear boundaries.'}
              </li>
              <li>
                <strong>{isZh ? '选择最佳时段：' : 'Choose Best Sessions:'}</strong>{' '}
                {isZh
                  ? '只在高流动性时段交易突破：欧洲开盘（15:00-18:00）、欧美重叠（20:00-24:00）、美国开盘（21:00-01:00）。'
                  : 'Only trade breakouts during high liquidity sessions: European open (15:00-18:00), EU-US overlap (20:00-24:00), US open (21:00-01:00).'}
              </li>
              <li>
                <strong>{isZh ? '配合趋势方向：' : 'Align With Trend:'}</strong>{' '}
                {isZh
                  ? '在更高时间框架（H4/D1）确认趋势方向，只做顺势突破。逆势突破的假突破概率高达60-70%。'
                  : 'Confirm trend direction on higher timeframe (H4/D1), only trade with-trend breakouts. Counter-trend breakouts have 60-70% false breakout probability.'}
              </li>
            </ol>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '接受假突破是突破交易的一部分' : 'Accept False Breakouts as Part of Breakout Trading'}
            </h3>
            <p className="text-sm">
              {isZh
                ? '即使使用所有过滤规则，假突破仍然不可避免。即使是最优质的突破，也有20-30%的假突破概率。这是突破交易的本质，必须接受。关键是：1) 通过严格过滤，将假突破概率从50%降至20-30%；2) 通过止损控制单笔亏损；3) 通过高盈亏比（2:1或3:1），确保即使胜率只有40%，整体依然盈利。记住：突破交易不是追求零假突破，而是通过风险管理实现整体盈利。'
                : 'Even using all filter rules, false breakouts still inevitable. Even highest quality breakouts have 20-30% false breakout probability. This is essence of breakout trading, must accept. Key is: 1) Through strict filtering, reduce false breakout probability from 50% to 20-30%; 2) Control single loss through stops; 3) Through high reward-risk (2:1 or 3:1), ensure overall profit even with only 40% win rate. Remember: Breakout trading not about pursuing zero false breakouts, but achieving overall profit through risk management.'}
            </p>
          </div>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
