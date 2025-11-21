import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { supportResistanceContent } from '@/content/education/support-resistance.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    supportResistanceContent.zh.title,
    supportResistanceContent.en.title,
    supportResistanceContent.zh.description,
    supportResistanceContent.en.description,
    supportResistanceContent.zh.keywords,
    supportResistanceContent.en.keywords,
    lang
  );
}

export default async function SupportResistancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = supportResistanceContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: Support Resistance Fundamentals */}
      <section id="support-resistance-fundamentals" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '支撑阻力基本概念' : 'Support Resistance Fundamental Concepts'}
        </h2>
        <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '支撑与阻力（Support and Resistance）是技术分析中最重要、最基础的概念。支撑位是价格下跌过程中遇到买盘支撑而停止下跌或反弹的价格区域；阻力位是价格上涨过程中遇到卖盘阻力而停止上涨或回落的价格区域。简单说：支撑是"地板"（价格难以跌破），阻力是"天花板"（价格难以突破）。'
              : 'Support and Resistance are the most important and fundamental concepts in technical analysis. Support is price area where decline stops or bounces due to buying support; resistance is price area where rise stops or pulls back due to selling resistance. Simply: support is "floor" (price hard to break below), resistance is "ceiling" (price hard to break above).'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '支撑阻力的心理学原理' : 'Psychology Behind S/R'}</h3>
            <p className="mb-3">
              {isZh
                ? '支撑阻力之所以有效，源于市场参与者的集体记忆和心理预期：'
                : 'Support and resistance work due to collective memory and psychological expectations of market participants:'}
            </p>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 市场记忆（Memory）：' : '1. Market Memory:'}</strong>{' '}
                {isZh
                  ? '交易者记得价格曾在某个位置（如1.1000）反弹或回落，当价格再次接近时，会预期相同情况发生，从而采取相同行动（在支撑买入，在阻力卖出），形成自我实现预言。'
                  : 'Traders remember price bounced or fell at certain level (like 1.1000), when price approaches again, expect same scenario, take same actions (buy at support, sell at resistance), creating self-fulfilling prophecy.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 套牢盘（Trapped Traders）：' : '2. Trapped Traders:'}</strong>{' '}
                {isZh
                  ? '在阻力位买入的交易者被套牢（如在1.2000买入EUR/USD后价格下跌），当价格反弹至1.2000时，套牢者急于解套离场（卖出），制造阻力。同理，在支撑位做空被套，价格回落时会平仓（买入），制造支撑。'
                  : 'Traders who bought at resistance are trapped (e.g., bought EUR/USD at 1.2000 then price fell), when price bounces back to 1.2000, trapped traders rush to exit (sell), creating resistance. Similarly, shorts trapped at support will close (buy) when price returns, creating support.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 止损单集中（Stop-Loss Clusters）：' : '3. Stop-Loss Clusters:'}</strong>{' '}
                {isZh
                  ? '大量交易者将止损单放在关键支撑阻力位外（支撑下方、阻力上方）。当价格触及这些止损单，会引发连锁反应：突破阻力后触发空头止损（买入），加速上涨；跌破支撑后触发多头止损（卖出），加速下跌。'
                  : 'Many traders place stop-loss orders beyond key S/R (below support, above resistance). When price triggers these stops, causes chain reaction: breaking resistance triggers short stops (buying), accelerates rise; breaking support triggers long stops (selling), accelerates decline.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 机构参与（Institutional Orders）：' : '4. Institutional Orders:'}</strong>{' '}
                {isZh
                  ? '大型机构（银行、对冲基金）在关键价格位置布置大量订单。例如，银行在1.1000整数关口设置买单（支撑），在1.2000设置卖单（阻力），这些大额订单强化了支撑阻力效果。'
                  : 'Large institutions (banks, hedge funds) place large orders at key price levels. E.g., banks set buy orders at 1.1000 round number (support), sell orders at 1.2000 (resistance), these large orders reinforce S/R effect.'}
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '支撑位（Support）特征' : 'Support Characteristics'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '价格下跌至该位置后停止下跌或反弹' : 'Price stops declining or bounces after reaching this level'}</li>
                <li className="text-gray-300">{isZh ? '买盘力量强于卖盘（需求 > 供给）' : 'Buying force stronger than selling (demand > supply)'}</li>
                <li className="text-gray-300">{isZh ? '常见位置：前低点、整数关口下方、移动平均线' : 'Common locations: previous lows, below round numbers, moving averages'}</li>
                <li className="text-gray-300">{isZh ? '被触及次数越多，支撑越强' : 'More times touched, stronger the support'}</li>
                <li className="text-gray-300">{isZh ? '跌破后转变为阻力（角色互换）' : 'After breaking, becomes resistance (role reversal)'}</li>
                <li className="text-gray-300">{isZh ? '交易策略：在支撑位附近买入（做多）' : 'Trading strategy: buy (long) near support'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '阻力位（Resistance）特征' : 'Resistance Characteristics'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '价格上涨至该位置后停止上涨或回落' : 'Price stops rising or pulls back after reaching this level'}</li>
                <li className="text-gray-300">{isZh ? '卖盘力量强于买盘（供给 > 需求）' : 'Selling force stronger than buying (supply > demand)'}</li>
                <li className="text-gray-300">{isZh ? '常见位置：前高点、整数关口上方、移动平均线' : 'Common locations: previous highs, above round numbers, moving averages'}</li>
                <li className="text-gray-300">{isZh ? '被触及次数越多，阻力越强' : 'More times touched, stronger the resistance'}</li>
                <li className="text-gray-300">{isZh ? '突破后转变为支撑（角色互换）' : 'After breaking, becomes support (role reversal)'}</li>
                <li className="text-gray-300">{isZh ? '交易策略：在阻力位附近卖出（做空）' : 'Trading strategy: sell (short) near resistance'}</li>
              </ul>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '支撑阻力的强度等级' : 'S/R Strength Levels'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '弱支撑阻力（Weak S/R）：' : 'Weak S/R:'}</strong>{' '}
                {isZh ? '仅被触及1-2次，最近形成（1-2天），仅在小时间框架显著（M15/H1），容易被突破。' : 'Only touched 1-2 times, recently formed (1-2 days), only significant on small timeframes (M15/H1), easily broken.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '中等支撑阻力（Medium S/R）：' : 'Medium S/R:'}</strong>{' '}
                {isZh ? '被触及3-4次，形成于一周前，在H4图表显著，需要较强力量突破。' : 'Touched 3-4 times, formed week ago, significant on H4 chart, needs stronger force to break.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '强支撑阻力（Strong S/R）：' : 'Strong S/R:'}</strong>{' '}
                {isZh ? '被触及5次以上，历史悠久（数周或数月），在D1/W1图表显著，整数关口（1.1000），极难突破。突破后动能强劲。' : 'Touched 5+ times, historical (weeks or months), significant on D1/W1 chart, round number (1.1000), extremely hard to break. Strong momentum after break.'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '支撑阻力是"区域"而非"线"' : 'S/R are "Zones" not "Lines"'}
            </h3>
            <p className="text-gray-300">
              {isZh
                ? '初学者常犯的错误是将支撑阻力画成精确的"线"（如1.1000），期待价格精确触及该点位。实际上，由于市场噪音、点差、滑点和不同交易者看法差异，价格很少精确触及某个点位。正确做法是将支撑阻力画成"区域"（如1.0980-1.1000，厚度15-30点）。只要价格进入区域并出现反转信号（如Pin Bar、吞没），即可入场，无需等待精确触及。这样既能捕捉机会，又能过滤噪音。'
                : 'Beginner mistake is drawing S/R as precise "lines" (like 1.1000), expecting price to exactly touch that point. Actually, due to market noise, spread, slippage, and different trader views, price rarely touches exact point. Correct approach is drawing S/R as "zones" (like 1.0980-1.1000, thickness 15-30 pips). As long as price enters zone and shows reversal signal (like Pin Bar, engulfing), can enter, no need to wait for exact touch. This captures opportunities while filtering noise.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Identification Methods */}
      <section id="identification-methods" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '识别方法与技巧' : 'Identification Methods & Tips'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '方法1：水平支撑阻力（Horizontal S/R）' : 'Method 1: Horizontal Support Resistance'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '识别原理：' : 'Identification Principle:'}</strong>{' '}
                {isZh
                  ? '水平支撑阻力是最常见、最可靠的类型，基于历史价格的高点和低点。市场有"记忆"，曾经的高低点往往再次成为关键位置。'
                  : 'Horizontal S/R is most common and reliable type, based on historical price highs and lows. Market has "memory", past highs/lows often become key levels again.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '识别步骤：' : 'Identification Steps:'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤1：切换到D1图表' : 'Step 1: Switch to D1 Chart'}</strong>{' '}
                    {isZh ? '- 先从更大时间框架开始，识别最重要的支撑阻力。D1图表噪音少，显示的高低点最可靠。' : ' - Start from larger timeframe, identify most important S/R. D1 chart has less noise, shows most reliable highs/lows.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤2：标记显著高点' : 'Step 2: Mark Significant Highs'}</strong>{' '}
                    {isZh ? '- 找到至少3-5根K线包围的"山峰"（左右两侧K线都低于该点）。在该高点画一条水平线，向右延伸，作为阻力位。' : ' - Find "peaks" surrounded by at least 3-5 candles (candles on both sides lower). Draw horizontal line at that high, extend right, as resistance.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤3：标记显著低点' : 'Step 3: Mark Significant Lows'}</strong>{' '}
                    {isZh ? '- 找到至少3-5根K线包围的"山谷"（左右两侧K线都高于该点）。在该低点画一条水平线，向右延伸，作为支撑位。' : ' - Find "valleys" surrounded by at least 3-5 candles (candles on both sides higher). Draw horizontal line at that low, extend right, as support.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤4：过滤次要位置' : 'Step 4: Filter Minor Levels'}</strong>{' '}
                    {isZh ? '- 删除被触及少于2次的位置，保留被多次测试的关键位置（3次以上）。图表上保留5-8条主要支撑阻力线即可，不要过多。' : ' - Remove levels touched less than 2 times, keep key levels tested multiple times (3+). Keep 5-8 main S/R lines on chart, not too many.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤5：转换为区域' : 'Step 5: Convert to Zones'}</strong>{' '}
                    {isZh ? '- 将线条转换为15-30点的区域。例如，前高1.1050，画成区域1.1030-1.1050。' : ' - Convert lines to 15-30 pip zones. E.g., previous high 1.1050, draw zone 1.1030-1.1050.'}
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-gray-900 text-gray-300 mt-3">
                <p className="font-bold mb-2 text-white">{isZh ? '特殊类型的水平支撑阻力：' : 'Special Types of Horizontal S/R:'}</p>
                <ul className="space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '1. 整数关口（Round Numbers）：' : '1. Round Numbers:'}</strong>{' '}
                    {isZh ? '1.1000、1.2000、150.00等整数价格天然吸引关注，机构订单集中，形成强支撑阻力。' : '1.1000, 1.2000, 150.00 etc. round numbers naturally attract attention, institutional orders cluster, form strong S/R.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '2. 历史极值（Historical Extremes）：' : '2. Historical Extremes:'}</strong>{' '}
                    {isZh ? '年度高低点、月度高低点具有极强的心理意义，是超强支撑阻力。' : 'Yearly/monthly highs/lows have extreme psychological significance, are super-strong S/R.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '3. 前一日开盘价/收盘价：' : '3. Previous Day Open/Close:'}</strong>{' '}
                    {isZh ? '日线开盘价和收盘价常成为当日的支撑阻力，尤其在外汇市场（24小时交易，开盘价是0:00 GMT）。' : 'Daily open/close often become intraday S/R, especially in forex (24hr trading, open is 0:00 GMT).'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '方法2：多次触及的区域（Multiple Touch Zones）' : 'Method 2: Multiple Touch Zones'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '如果价格多次在同一区域反弹或回落（3次以上），说明该区域是关键支撑阻力。触及次数越多，可靠性越高，但也意味着突破后动能更强（"弹簧"效应）。'
                  : 'If price bounces or falls at same zone multiple times (3+), indicates that zone is key S/R. More touches, higher reliability, but also means stronger momentum after break ("spring" effect).'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '识别技巧：' : 'Identification Tips:'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">{isZh ? '在H4/D1图表上向左回溯至少50-100根K线（2-3个月历史）' : 'On H4/D1 chart look back at least 50-100 candles (2-3 months history)'}</li>
                  <li className="text-gray-300">{isZh ? '寻找价格多次"反弹"的区域（至少3次触及）' : 'Find zones where price "bounced" multiple times (at least 3 touches)'}</li>
                  <li className="text-gray-300">{isZh ? '触及时出现长影线或反转K线（Pin Bar、Hammer）' : 'Touches show long shadows or reversal candles (Pin Bar, Hammer)'}</li>
                  <li className="text-gray-300">{isZh ? '触及间隔至少几天或几周（不是连续触及）' : 'Touches spaced at least days or weeks apart (not consecutive touches)'}</li>
                  <li className="text-gray-300">{isZh ? '第一次触及最重要，后续触及可靠性递减' : 'First touch most important, subsequent touches decrease in reliability'}</li>
                </ul>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600 mt-3">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '⚠️ 注意"假触及"：' : '⚠️ Beware "False Touches":'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '不是所有触及都有效。有效触及特征：1) K线影线明确触及区域；2) 触及后价格明显反弹（至少20-30点）；3) 触及时伴随反转形态。无效触及：影线仅略微穿透区域（1-2点），价格未反弹，或仅在M5等小周期触及。'
                    : 'Not all touches are valid. Valid touch characteristics: 1) Candle shadow clearly touches zone; 2) Price bounces significantly after touch (at least 20-30 pips); 3) Touch accompanied by reversal pattern. Invalid touch: shadow barely penetrates zone (1-2 pips), price doesn\'t bounce, or only touched on M5 small timeframe.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '方法3：角色互换（Role Reversal）' : 'Method 3: Role Reversal'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '支撑被跌破后转变为阻力，阻力被突破后转变为支撑。这是最可靠的交易机会之一（胜率70-75%），因为该位置已被市场"验证"两次（一次作为原始支撑/阻力，一次作为突破后的新角色）。'
                  : 'Support becomes resistance after breaking, resistance becomes support after breaking. This is one of most reliable trading opportunities (70-75% win rate), as this level is "validated" by market twice (once as original S/R, once as new role after break).'}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? '阻力→支撑（向上突破）' : 'Resistance→Support (Upward Break)'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '价格向上突破阻力位（如1.1000）' : 'Price breaks above resistance (e.g., 1.1000)'}</li>
                    <li className="text-gray-300">{isZh ? '突破后价格上涨20-50点' : 'After break, price rises 20-50 pips'}</li>
                    <li className="text-gray-300">{isZh ? '价格回测至原阻力（现在是支撑）' : 'Price retests original resistance (now support)'}</li>
                    <li className="text-gray-300">{isZh ? '在原阻力附近出现看涨信号（Pin Bar）' : 'Bullish signal appears near original resistance (Pin Bar)'}</li>
                    <li className="text-gray-300">{isZh ? '做多入场，止损原阻力下方' : 'Long entry, stop below original resistance'}</li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? '支撑→阻力（向下突破）' : 'Support→Resistance (Downward Break)'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '价格向下跌破支撑位（如1.0900）' : 'Price breaks below support (e.g., 1.0900)'}</li>
                    <li className="text-gray-300">{isZh ? '突破后价格下跌20-50点' : 'After break, price falls 20-50 pips'}</li>
                    <li className="text-gray-300">{isZh ? '价格反弹至原支撑（现在是阻力）' : 'Price bounces to original support (now resistance)'}</li>
                    <li className="text-gray-300">{isZh ? '在原支撑附近出现看跌信号（Shooting Star）' : 'Bearish signal appears near original support (Shooting Star)'}</li>
                    <li className="text-gray-300">{isZh ? '做空入场，止损原支撑上方' : 'Short entry, stop above original support'}</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm mt-3">
                <strong className="text-white">{isZh ? '⚡ 交易要点：' : '⚡ Trading Points:'}</strong>{' '}
                {isZh
                  ? '角色互换交易的关键是"等待回测"。不要在突破时立即追入（容易遭遇假突破），而是等待价格回测原支撑/阻力位并出现反转信号后再入场。这样既确认了突破的有效性，又能以更好的价格入场，提高风险回报比。'
                  : 'Key to role reversal trading is "wait for retest". Don\'t chase immediately on break (easily encounter false breakout), wait for price to retest original S/R and show reversal signal before entry. This confirms breakout validity and allows better entry price, improving risk-reward ratio.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Trendline Drawing */}
      <section id="trendline-drawing" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '趋势线的正确画法' : 'Correct Trendline Drawing'}
        </h2>
        <div className="space-y-6">
          <p className="text-gray-300 dark:text-gray-300">
            {isZh
              ? '趋势线（Trendlines）是连接价格高点或低点的斜线，用于识别趋势方向和动态支撑阻力。趋势线是水平支撑阻力的延伸，区别在于趋势线是"动态"的（斜向），随着时间变化而移动。正确画趋势线是技术分析的核心技能之一。'
              : 'Trendlines are diagonal lines connecting price highs or lows, used to identify trend direction and dynamic support/resistance. Trendlines are extension of horizontal S/R, difference is trendlines are "dynamic" (diagonal), moving with time. Correct trendline drawing is one of core technical analysis skills.'}
          </p>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '上升趋势线（Uptrend Line）画法' : 'Uptrend Line Drawing'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '定义：' : 'Definition:'}</strong>{' '}
                {isZh
                  ? '连接两个或多个上升的低点（Higher Lows），画出向右上方倾斜的直线。上升趋势线是动态支撑，价格触及后通常反弹。'
                  : 'Connect two or more rising lows (Higher Lows), draw straight line sloping upward right. Uptrend line is dynamic support, price usually bounces after touch.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '画法步骤：' : 'Drawing Steps:'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤1：识别上升趋势' : 'Step 1: Identify Uptrend'}</strong>{' '}
                    {isZh ? '- 确认价格创造Higher Highs和Higher Lows（后一个高点比前一个高，后一个低点比前一个高）。' : ' - Confirm price making Higher Highs and Higher Lows (each high higher than previous, each low higher than previous).'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤2：找到起点' : 'Step 2: Find Starting Point'}</strong>{' '}
                    {isZh ? '- 找到趋势的"起始低点"（第一个显著低点），作为趋势线的起点。' : ' - Find trend\'s "starting low" (first significant low), as trendline starting point.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤3：连接第二个低点' : 'Step 3: Connect Second Low'}</strong>{' '}
                    {isZh ? '- 找到下一个更高的低点（Higher Low），连接这两个低点，画出初步趋势线。' : ' - Find next higher low (Higher Low), connect these two lows, draw preliminary trendline.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤4：验证第三个触及' : 'Step 4: Validate Third Touch'}</strong>{' '}
                    {isZh ? '- 趋势线至少需要3次触及才有效。等待第三次低点触及或接近趋势线，确认趋势线有效。' : ' - Trendline needs at least 3 touches to be valid. Wait for third low to touch or approach trendline, confirm trendline validity.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤5：调整角度' : 'Step 5: Adjust Angle'}</strong>{' '}
                    {isZh ? '- 如果第三个低点未能触及趋势线，微调趋势线角度，使其连接最多的低点（允许1-2根K线略微穿透）。' : ' - If third low doesn\'t touch trendline, fine-tune trendline angle to connect most lows (allow 1-2 candles slight penetration).'}
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-600 mt-3">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '上升趋势线交易策略：' : 'Uptrend Line Trading Strategy:'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '在价格回调至上升趋势线附近时买入（做多）：1) 等待价格触及趋势线（允许1-2根K线穿透）；2) 出现看涨反转信号（Hammer, Pin Bar）；3) 入场做多，止损趋势线下方20-30点；4) 止盈前高或使用追踪止损。上升趋势线被跌破（收盘价明确跌破）时，趋势反转，平仓离场。'
                    : 'Buy (long) when price pulls back near uptrend line: 1) Wait for price to touch trendline (allow 1-2 candles penetration); 2) Bullish reversal signal appears (Hammer, Pin Bar); 3) Enter long, stop 20-30 pips below trendline; 4) Target previous high or use trailing stop. When uptrend line breaks (close clearly below), trend reverses, exit position.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '下降趋势线（Downtrend Line）画法' : 'Downtrend Line Drawing'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '定义：' : 'Definition:'}</strong>{' '}
                {isZh
                  ? '连接两个或多个下降的高点（Lower Highs），画出向右下方倾斜的直线。下降趋势线是动态阻力，价格触及后通常回落。'
                  : 'Connect two or more declining highs (Lower Highs), draw straight line sloping downward right. Downtrend line is dynamic resistance, price usually falls after touch.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '画法步骤：' : 'Drawing Steps:'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤1：识别下降趋势' : 'Step 1: Identify Downtrend'}</strong>{' '}
                    {isZh ? '- 确认价格创造Lower Lows和Lower Highs（后一个高点比前一个低，后一个低点比前一个低）。' : ' - Confirm price making Lower Lows and Lower Highs (each high lower than previous, each low lower than previous).'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤2：找到起点' : 'Step 2: Find Starting Point'}</strong>{' '}
                    {isZh ? '- 找到趋势的"起始高点"（第一个显著高点），作为趋势线的起点。' : ' - Find trend\'s "starting high" (first significant high), as trendline starting point.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤3：连接第二个高点' : 'Step 3: Connect Second High'}</strong>{' '}
                    {isZh ? '- 找到下一个更低的高点（Lower High），连接这两个高点，画出初步趋势线。' : ' - Find next lower high (Lower High), connect these two highs, draw preliminary trendline.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤4：验证第三个触及' : 'Step 4: Validate Third Touch'}</strong>{' '}
                    {isZh ? '- 等待第三次高点触及或接近趋势线，确认趋势线有效。' : ' - Wait for third high to touch or approach trendline, confirm trendline validity.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '步骤5：调整角度' : 'Step 5: Adjust Angle'}</strong>{' '}
                    {isZh ? '- 微调趋势线角度，使其连接最多的高点（允许1-2根K线略微穿透）。' : ' - Fine-tune trendline angle to connect most highs (allow 1-2 candles slight penetration).'}
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-600 mt-3">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '下降趋势线交易策略：' : 'Downtrend Line Trading Strategy:'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '在价格反弹至下降趋势线附近时卖出（做空）：1) 等待价格触及趋势线（允许1-2根K线穿透）；2) 出现看跌反转信号（Shooting Star, Bearish Engulfing）；3) 入场做空，止损趋势线上方20-30点；4) 止盈前低或使用追踪止损。下降趋势线被突破（收盘价明确突破）时，趋势反转，平仓离场。'
                    : 'Sell (short) when price bounces near downtrend line: 1) Wait for price to touch trendline (allow 1-2 candles penetration); 2) Bearish reversal signal appears (Shooting Star, Bearish Engulfing); 3) Enter short, stop 20-30 pips above trendline; 4) Target previous low or use trailing stop. When downtrend line breaks (close clearly above), trend reverses, exit position.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '趋势线画法的8个黄金法则' : '8 Golden Rules for Trendline Drawing'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 优先连接实体：' : '1. Priority Connect Bodies:'}</strong>{' '}
                {isZh ? '趋势线应连接K线实体（收盘价）而非影线，实体代表市场共识，更可靠。' : 'Trendlines should connect candle bodies (close prices) not wicks, bodies represent market consensus, more reliable.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 至少3次触及：' : '2. Minimum 3 Touches:'}</strong>{' '}
                {isZh ? '2次触及只能画出"候选"趋势线，3次以上触及才确认为有效趋势线。' : 'Two touches only draw "candidate" trendline, 3+ touches confirm as valid trendline.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 允许小幅穿透：' : '3. Allow Minor Penetration:'}</strong>{' '}
                {isZh ? '1-2根K线略微穿透趋势线（5-10点）是正常的，不必过分追求完美贴合。' : '1-2 candles slightly penetrating trendline (5-10 pips) is normal, don\'t pursue perfect fit excessively.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 角度适中：' : '4. Moderate Angle:'}</strong>{' '}
                {isZh ? '趋势线角度在30-60度之间最佳。太陡（>60度）不可持续，太平（<30度）趋势弱。' : 'Trendline angle best between 30-60 degrees. Too steep (>60°) unsustainable, too flat (<30°) weak trend.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '5. 不要强求：' : '5. Don\'t Force:'}</strong>{' '}
                {isZh ? '如果找不到明确的连接点，说明趋势不清晰或处于横盘，不要强行画趋势线。' : 'If can\'t find clear connection points, trend unclear or ranging, don\'t force trendline drawing.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '6. 定期更新：' : '6. Regular Updates:'}</strong>{' '}
                {isZh ? '随着新K线形成，趋势线可能需要调整。每周复盘时更新趋势线。' : 'As new candles form, trendlines may need adjustment. Update trendlines during weekly review.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '7. 大周期优先：' : '7. Larger Timeframe Priority:'}</strong>{' '}
                {isZh ? 'D1/W1图表的趋势线最可靠，H4其次，H1/M15不建议使用（噪音多）。' : 'D1/W1 chart trendlines most reliable, H4 next, H1/M15 not recommended (too noisy).'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '8. 突破确认：' : '8. Breakout Confirmation:'}</strong>{' '}
                {isZh ? '趋势线突破需要收盘价明确突破（至少10-15点），单根影线穿透不算突破。' : 'Trendline break needs close clearly breaks (at least 10-15 pips), single wick penetration doesn\'t count as break.'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Dynamic Support Resistance */}
      <section id="dynamic-support-resistance" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '动态支撑阻力（移动平均线）' : 'Dynamic Support Resistance (Moving Averages)'}
        </h2>
        <div className="space-y-6">
          <p className="text-gray-300 dark:text-gray-300">
            {isZh
              ? '动态支撑阻力（Dynamic S/R）是指随着价格变化而移动的支撑阻力位，最常见的是移动平均线（Moving Averages, MA）。相比水平支撑阻力和趋势线，动态支撑阻力的优势是"自动调整"，无需手动画线，实时反映市场状态。'
              : 'Dynamic Support Resistance refers to S/R levels that move with price changes, most commonly Moving Averages (MA). Compared to horizontal S/R and trendlines, dynamic S/R advantage is "auto-adjustment", no manual line drawing needed, real-time reflects market state.'}
          </p>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '移动平均线作为动态支撑阻力' : 'Moving Averages as Dynamic S/R'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '移动平均线代表一段时间内的平均价格，在趋势市场中，价格倾向于围绕MA波动：上升趋势中价格在MA上方运行，回调至MA时获得支撑；下降趋势中价格在MA下方运行，反弹至MA时遇到阻力。'
                  : 'Moving Average represents average price over period, in trending markets, price tends to fluctuate around MA: in uptrend price runs above MA, gets support when pulling back to MA; in downtrend price runs below MA, meets resistance when bouncing to MA.'}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-2 border-gray-800">
                  <thead>
                    <tr className="bg-gray-900 text-gray-300">
                      <th className="border border-gray-800 p-3 text-left">
                        {isZh ? '移动平均线' : 'Moving Average'}
                      </th>
                      <th className="border border-gray-800 p-3 text-left">
                        {isZh ? '时间周期' : 'Period'}
                      </th>
                      <th className="border border-gray-800 p-3 text-left">
                        {isZh ? '功能' : 'Function'}
                      </th>
                      <th className="border border-gray-800 p-3 text-left">
                        {isZh ? '适用时间框架' : 'Best Timeframe'}
                      </th>
                      <th className="border border-gray-800 p-3 text-left">
                        {isZh ? '可靠性' : 'Reliability'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-300">
                    <tr className="border border-gray-800">
                      <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">20 EMA</td>
                      <td className="border border-gray-800 p-3 text-gray-300">20{isZh ? '周期' : ' periods'}</td>
                      <td className="border border-gray-800 p-3 text-gray-300">
                        {isZh ? '短期趋势，日内交易支撑阻力' : 'Short-term trend, intraday S/R'}
                      </td>
                      <td className="border border-gray-800 p-3 text-gray-300">M15/H1/H4</td>
                      <td className="border border-gray-800 p-3 text-gray-300">{isZh ? '⭐⭐⭐ 高' : '⭐⭐⭐ High'}</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-800">
                      <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">50 EMA</td>
                      <td className="border border-gray-800 p-3 text-gray-300">50{isZh ? '周期' : ' periods'}</td>
                      <td className="border border-gray-800 p-3 text-gray-300">
                        {isZh ? '中期趋势，波段交易支撑阻力' : 'Medium-term trend, swing trading S/R'}
                      </td>
                      <td className="border border-gray-800 p-3 text-gray-300">H1/H4/D1</td>
                      <td className="border border-gray-800 p-3 text-gray-300">{isZh ? '⭐⭐⭐⭐ 极高' : '⭐⭐⭐⭐ Very High'}</td>
                    </tr>
                    <tr className="border border-gray-800">
                      <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">200 EMA</td>
                      <td className="border border-gray-800 p-3 text-gray-300">200{isZh ? '周期' : ' periods'}</td>
                      <td className="border border-gray-800 p-3 text-gray-300">
                        {isZh ? '长期趋势，主要趋势判断' : 'Long-term trend, major trend judgment'}
                      </td>
                      <td className="border border-gray-800 p-3 text-gray-300">H4/D1/W1</td>
                      <td className="border border-gray-800 p-3 text-gray-300">{isZh ? '⭐⭐⭐⭐⭐ 最高' : '⭐⭐⭐⭐⭐ Highest'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '上升趋势中的MA动态支撑' : 'MA Dynamic Support in Uptrend'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '价格在20/50 EMA上方运行（确认上升趋势）' : 'Price running above 20/50 EMA (confirms uptrend)'}</li>
                <li className="text-gray-300">{isZh ? '价格回调至20 EMA时获得支撑反弹' : 'Price gets support and bounces when pulling back to 20 EMA'}</li>
                <li className="text-gray-300">{isZh ? '如果跌破20 EMA，回调至50 EMA获得支撑' : 'If breaks 20 EMA, pulls back to 50 EMA gets support'}</li>
                <li className="text-gray-300">{isZh ? '交易策略：价格触及20/50 EMA + 看涨信号→做多' : 'Trading: price touches 20/50 EMA + bullish signal → long'}</li>
                <li className="text-gray-300">{isZh ? '止损：EMA下方20-30点' : 'Stop: 20-30 pips below EMA'}</li>
                <li className="text-gray-300">{isZh ? '止盈：前高或使用追踪止损' : 'Target: previous high or trailing stop'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '下降趋势中的MA动态阻力' : 'MA Dynamic Resistance in Downtrend'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '价格在20/50 EMA下方运行（确认下降趋势）' : 'Price running below 20/50 EMA (confirms downtrend)'}</li>
                <li className="text-gray-300">{isZh ? '价格反弹至20 EMA时遇到阻力回落' : 'Price meets resistance and falls when bouncing to 20 EMA'}</li>
                <li className="text-gray-300">{isZh ? '如果突破20 EMA，反弹至50 EMA遇到阻力' : 'If breaks 20 EMA, bounces to 50 EMA meets resistance'}</li>
                <li className="text-gray-300">{isZh ? '交易策略：价格触及20/50 EMA + 看跌信号→做空' : 'Trading: price touches 20/50 EMA + bearish signal → short'}</li>
                <li className="text-gray-300">{isZh ? '止损：EMA上方20-30点' : 'Stop: 20-30 pips above EMA'}</li>
                <li className="text-gray-300">{isZh ? '止盈：前低或使用追踪止损' : 'Target: previous low or trailing stop'}</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '动态支撑阻力交易的5个实战技巧' : '5 Practical Tips for Dynamic S/R Trading'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 多MA确认：' : '1. Multiple MA Confirmation:'}</strong>{' '}
                {isZh
                  ? '同时使用20 EMA和50 EMA。当价格回调至20 EMA但未反弹，等待回调至50 EMA（更强支撑）。20/50 EMA同时提供支撑时，胜率最高（75%+）。'
                  : 'Use both 20 EMA and 50 EMA. When price pulls back to 20 EMA but doesn\'t bounce, wait for pullback to 50 EMA (stronger support). When 20/50 EMA both provide support, highest win rate (75%+).'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 结合水平支撑阻力：' : '2. Combine with Horizontal S/R:'}</strong>{' '}
                {isZh
                  ? '最佳入场点是MA与水平支撑阻力重合的位置。例如，价格回调至20 EMA，而20 EMA恰好位于前低支撑1.0900附近，这是"双重支撑"，胜率极高。'
                  : 'Best entry point is where MA overlaps with horizontal S/R. E.g., price pulls back to 20 EMA, and 20 EMA happens to be near previous low support 1.0900, this is "double support", extremely high win rate.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 等待反转信号：' : '3. Wait for Reversal Signal:'}</strong>{' '}
                {isZh
                  ? '不要在价格触及MA时盲目入场，等待K线反转信号（Pin Bar, Hammer）确认支撑/阻力有效。无信号不交易。'
                  : 'Don\'t blindly enter when price touches MA, wait for candlestick reversal signal (Pin Bar, Hammer) to confirm S/R validity. No signal, no trade.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 趋势中期最有效：' : '4. Most Effective Mid-Trend:'}</strong>{' '}
                {isZh
                  ? 'MA动态支撑阻力在趋势初期和中期最有效（趋势运行50-200点）。趋势末期（已运行300点+）或横盘市场，MA效果差，价格频繁穿越MA。'
                  : 'MA dynamic S/R most effective in early/mid trend (trend running 50-200 pips). Late trend (already run 300+ pips) or ranging market, MA less effective, price frequently crosses MA.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '5. 突破MA转变趋势：' : '5. MA Break Changes Trend:'}</strong>{' '}
                {isZh
                  ? '当价格收盘价明确突破50 EMA（上升趋势中跌破，下降趋势中突破），趋势可能反转。此时平仓原有持仓，等待新趋势确认后反向交易。'
                  : 'When price close clearly breaks 50 EMA (breaks below in uptrend, above in downtrend), trend may reverse. Close existing positions, wait for new trend confirmation before trading opposite direction.'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: Breakout Strategies */}
      <section id="breakout-strategies" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '突破交易策略' : 'Breakout Trading Strategies'}
        </h2>
        <div className="space-y-6">
          <p className="text-gray-300 dark:text-gray-300">
            {isZh
              ? '突破交易（Breakout Trading）是指在价格突破关键支撑阻力位后入场，捕捉突破后的强劲走势。突破是技术分析中最有利可图的交易机会之一（成功突破后通常运行50-150点），但也是最容易遭遇假信号的策略（假突破率30-40%）。关键是识别"真突破"和"假突破"。'
              : 'Breakout Trading means entering after price breaks key S/R levels, capturing strong move after breakout. Breakouts are among most profitable trading opportunities in technical analysis (successful breakout usually runs 50-150 pips), but also easiest strategy to encounter false signals (false breakout rate 30-40%). Key is identifying "true breakout" vs "false breakout".'}
          </p>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '向上突破交易（Resistance Breakout）' : 'Upward Breakout Trading (Resistance Breakout)'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '定义：' : 'Definition:'}</strong>{' '}
                {isZh
                  ? '价格向上突破关键阻力位（前高、整数关口、趋势线），预示上涨动能增强，新的上升趋势可能开始。'
                  : 'Price breaks above key resistance (previous high, round number, trendline), indicates rising momentum strengthens, new uptrend may begin.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '向上突破入场策略（3种）：' : 'Upward Breakout Entry Strategies (3 Types):'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '策略1：突破K线收盘后入场（推荐）' : 'Strategy 1: Enter After Breakout Candle Closes (Recommended)'}</strong>
                    <br />
                    {isZh ? '等待突破K线收盘价明确突破阻力（至少10-15点），下一根K线开盘价入场。优点：确认突破有效性，避免假突破；缺点：牺牲部分利润（入场价较高）。胜率70%。' : 'Wait for breakout candle close clearly above resistance (at least 10-15 pips), enter at next candle open. Advantage: confirms breakout validity, avoids false breakout; Disadvantage: sacrifices some profit (higher entry). 70% win rate.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '策略2：回测突破点后入场（最安全）' : 'Strategy 2: Enter After Retest (Safest)'}</strong>
                    <br />
                    {isZh ? '突破后不立即入场，等待价格回测原阻力位（现在是支撑），在回测时出现看涨信号（Pin Bar）后入场。优点：双重确认（突破+回测），胜率最高75%+；缺点：不是所有突破都会回测，可能错过机会（30%不回测）。' : 'After breakout don\'t enter immediately, wait for price to retest original resistance (now support), enter when bullish signal (Pin Bar) appears on retest. Advantage: double confirmation (breakout + retest), highest win rate 75%+; Disadvantage: not all breakouts retest, may miss opportunities (30% no retest).'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '策略3：激进突破追入（高风险）' : 'Strategy 3: Aggressive Chase (High Risk)'}</strong>
                    <br />
                    {isZh ? '在突破K线形成过程中或突破瞬间入场。优点：入场价最优，利润空间最大；缺点：容易遭遇假突破（突破K线收盘前价格回落），胜率低55%。不推荐新手。' : 'Enter during breakout candle formation or breakout moment. Advantage: best entry price, maximum profit potential; Disadvantage: easily encounter false breakout (price falls back before candle closes), low 55% win rate. Not recommended for beginners.'}
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-600 mt-3">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '向上突破完整交易示例：' : 'Complete Upward Breakout Trade Example:'}
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '识别：EUR/USD H4前高阻力1.1000（3次触及）' : 'Identify: EUR/USD H4 previous high resistance 1.1000 (3 touches)'}</li>
                  <li className="text-gray-300">{isZh ? '突破：H4大阳线收盘1.1018，突破阻力18点' : 'Breakout: H4 large bullish closes 1.1018, breaks resistance 18 pips'}</li>
                  <li className="text-gray-300">{isZh ? '入场：下一根H4开盘价1.1020（策略1）' : 'Entry: next H4 open 1.1020 (strategy 1)'}</li>
                  <li className="text-gray-300">{isZh ? '或：等待回测1.1000-1.0995，出现Pin Bar后1.1005入场（策略2）' : 'Or: wait for retest 1.1000-1.0995, after Pin Bar enter 1.1005 (strategy 2)'}</li>
                  <li className="text-gray-300">{isZh ? '止损：突破点下方1.0985（35点风险）' : 'Stop: 1.0985 below breakout (35 pip risk)'}</li>
                  <li className="text-gray-300">{isZh ? '止盈：前高阻力1.1100或1:2风险回报（1.1090）' : 'Target: previous high resistance 1.1100 or 1:2 risk-reward (1.1090)'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '向下突破交易（Support Breakout）' : 'Downward Breakout Trading (Support Breakout)'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '定义：' : 'Definition:'}</strong>{' '}
                {isZh
                  ? '价格向下跌破关键支撑位（前低、整数关口、趋势线），预示下跌动能增强，新的下降趋势可能开始。'
                  : 'Price breaks below key support (previous low, round number, trendline), indicates falling momentum strengthens, new downtrend may begin.'}
              </p>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '向下突破完整交易示例：' : 'Complete Downward Breakout Trade Example:'}
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '识别：GBP/USD H4前低支撑1.2650（2次触及）' : 'Identify: GBP/USD H4 previous low support 1.2650 (2 touches)'}</li>
                  <li className="text-gray-300">{isZh ? '突破：H4大阴线收盘1.2632，跌破支撑18点' : 'Breakout: H4 large bearish closes 1.2632, breaks support 18 pips'}</li>
                  <li className="text-gray-300">{isZh ? '入场：下一根H4开盘价1.2630（策略1）' : 'Entry: next H4 open 1.2630 (strategy 1)'}</li>
                  <li className="text-gray-300">{isZh ? '或：等待反弹至1.2650-1.2655，出现Shooting Star后1.2645入场（策略2）' : 'Or: wait for bounce to 1.2650-1.2655, after Shooting Star enter 1.2645 (strategy 2)'}</li>
                  <li className="text-gray-300">{isZh ? '止损：突破点上方1.2665（35点风险）' : 'Stop: 1.2665 above breakout (35 pip risk)'}</li>
                  <li className="text-gray-300">{isZh ? '止盈：前低支撑1.2550或1:2风险回报（1.2560）' : 'Target: previous low support 1.2550 or 1:2 risk-reward (1.2560)'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '提升突破交易胜率的6个关键条件' : '6 Key Conditions to Improve Breakout Win Rate'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 突破前盘整：' : '1. Consolidation Before Break:'}</strong>{' '}
                {isZh
                  ? '最佳突破发生在价格长时间盘整（至少6-12小时H1或2-3天D1）后。盘整积蓄能量，突破更有力。避免突破刚形成的支撑阻力（仅2-3小时前）。'
                  : 'Best breakouts occur after price consolidates for long time (at least 6-12 hours H1 or 2-3 days D1). Consolidation accumulates energy, breakout more powerful. Avoid breaking newly formed S/R (only 2-3 hours ago).'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 突破K线力度：' : '2. Breakout Candle Strength:'}</strong>{' '}
                {isZh
                  ? '有效突破需要大实体K线（至少30-50点），几乎无相反方向影线（向上突破无下影线，向下突破无上影线），收盘价远离突破点。小实体K线突破容易失败。'
                  : 'Valid breakout needs large body candle (at least 30-50 pips), almost no opposite direction shadow (upward break no lower shadow, downward break no upper shadow), close far from breakout point. Small body candle breakout easily fails.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 成交量配合：' : '3. Volume Confirmation:'}</strong>{' '}
                {isZh
                  ? '真突破伴随成交量显著放大（如有Tick Volume数据）。无量突破容易失败。外汇现货无真实成交量，可参考期货成交量。'
                  : 'True breakout accompanied by significantly increased volume (if Tick Volume data available). No-volume breakout easily fails. Forex spot has no true volume, can reference futures volume.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 多时间框架一致：' : '4. Multiple Timeframe Alignment:'}</strong>{' '}
                {isZh
                  ? 'H1突破时，H4也应显示类似信号（如H4 K线也接近突破）。单一时间框架突破可靠性低。'
                  : 'When H1 breaks, H4 should also show similar signal (like H4 candle also near break). Single timeframe breakout less reliable.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '5. 顺应更大趋势：' : '5. Align with Larger Trend:'}</strong>{' '}
                {isZh
                  ? '向上突破在D1上升趋势中胜率75%+，在D1下降趋势中仅50%。顺势突破可靠，逆势突破警惕。'
                  : 'Upward breakout in D1 uptrend 75%+ win rate, in D1 downtrend only 50%. With-trend breakout reliable, counter-trend breakout caution.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '6. 避开新闻时段：' : '6. Avoid News Periods:'}</strong>{' '}
                {isZh
                  ? '新闻前后的突破80%是假突破（价格剧烈波动后回归）。使用经济日历，新闻前后1小时避免交易突破。'
                  : 'Breakouts around news 80% are false (price violently fluctuates then reverts). Use economic calendar, avoid trading breakouts 1 hour around news.'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: False Breakout */}
      <section id="false-breakout" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '假突破识别与应对' : 'False Breakout Identification & Response'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '什么是假突破（False Breakout）？' : 'What is False Breakout?'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-3">
              {isZh
                ? '假突破是指价格短暂突破关键支撑阻力位后，快速回落至支撑阻力内部，未能延续突破方向。假突破是突破交易者的最大敌人，导致30-40%的突破交易失败。假突破的成因：机构"扫止损"（故意制造假突破诱骗散户，然后反向操作）、市场流动性不足、新闻冲击、技术性回测。'
                : 'False breakout is when price briefly breaks key S/R level, then quickly falls back within S/R, failing to continue breakout direction. False breakouts are breakout traders\' biggest enemy, causing 30-40% breakout trades to fail. Causes: institutional "stop hunting" (deliberately create false breakout to trap retail, then reverse), insufficient liquidity, news impact, technical retest.'}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '假突破特征：' : 'False Breakout Characteristics:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-300 dark:text-gray-300">
                  <li className="text-gray-300">{isZh ? '小实体K线突破，带长上影线/下影线' : 'Small body candle breaks, with long upper/lower shadow'}</li>
                  <li className="text-gray-300">{isZh ? '收盘价未能站稳突破位（仅突破5-10点）' : 'Close fails to hold above break (only breaks 5-10 pips)'}</li>
                  <li className="text-gray-300">{isZh ? '无成交量配合（Tick Volume无放大）' : 'No volume confirmation (Tick Volume no increase)'}</li>
                  <li className="text-gray-300">{isZh ? '突破后立即反转（1-2根K线内）' : 'Reverses immediately after break (within 1-2 candles)'}</li>
                  <li className="text-gray-300">{isZh ? '仅在小时间框架突破，大周期未确认' : 'Only breaks on small timeframe, not confirmed on large'}</li>
                  <li className="text-gray-300">{isZh ? '发生在新闻前后或低流动性时段' : 'Occurs around news or low liquidity periods'}</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '真突破特征：' : 'True Breakout Characteristics:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-300 dark:text-gray-300">
                  <li className="text-gray-300">{isZh ? '大实体K线突破（30点以上），无长反向影线' : 'Large body candle breaks (30+ pips), no long opposite shadow'}</li>
                  <li className="text-gray-300">{isZh ? '收盘价明确站稳突破位（至少15-20点）' : 'Close clearly holds above break (at least 15-20 pips)'}</li>
                  <li className="text-gray-300">{isZh ? '成交量明显放大' : 'Volume significantly increases'}</li>
                  <li className="text-gray-300">{isZh ? '突破后持续运行（至少5-10根K线）' : 'Continues after break (at least 5-10 candles)'}</li>
                  <li className="text-gray-300">{isZh ? '多个时间框架同时确认突破' : 'Multiple timeframes simultaneously confirm break'}</li>
                  <li className="text-gray-300">{isZh ? '突破前有明显盘整或多次测试' : 'Clear consolidation or multiple tests before break'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '应对假突破的4个策略' : '4 Strategies to Handle False Breakouts'}
            </h3>
            <div className="space-y-4 text-gray-300 dark:text-gray-300">
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '策略1：等待收盘确认（最重要）' : 'Strategy 1: Wait for Close Confirmation (Most Important)'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '绝不在突破K线形成过程中入场，必须等待该K线收盘并确认收盘价明确突破（至少10-15点）。这样过滤掉80%的假突破。虽然入场价略高，但安全性大幅提升。'
                    : 'Never enter during breakout candle formation, must wait for candle close and confirm close clearly breaks (at least 10-15 pips). This filters 80% false breakouts. Though entry price slightly higher, safety significantly improves.'}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '策略2：等待回测后入场（最安全）' : 'Strategy 2: Wait for Retest Entry (Safest)'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '突破后不立即入场，等待价格回测原支撑阻力位。如果回测时价格在原支撑阻力附近反弹（出现Pin Bar等信号），确认角色互换成功，此时入场胜率75%+。缺点：30%突破不回测，会错过机会。'
                    : 'After breakout don\'t enter immediately, wait for price to retest original S/R. If price bounces near original S/R on retest (Pin Bar signal appears), confirms role reversal successful, entering now 75%+ win rate. Disadvantage: 30% breakouts don\'t retest, miss opportunities.'}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '策略3：使用更大时间框架确认' : 'Strategy 3: Use Larger Timeframe Confirmation'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '如果H1图表突破，检查H4是否也接近突破或已确认突破。只交易多时间框架一致的突破（H1+H4同时突破），避免单一小周期的假突破。'
                    : 'If H1 chart breaks, check if H4 also near break or already confirmed. Only trade multi-timeframe aligned breakouts (H1+H4 both break), avoid single small timeframe false breakouts.'}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '策略4：严格止损+快速认错' : 'Strategy 4: Strict Stop-Loss + Quick Admit Mistake'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '即使等待确认，仍可能遇到假突破。设置止损（突破点另一侧10-20点），如果价格回落至突破点内部，立即止损离场，不要"再给一次机会"。假突破止损后，考虑反向交易（假突破向上，反向做空）。'
                    : 'Even with confirmation, may still encounter false breakout. Set stop-loss (10-20 pips on other side of break), if price falls back within break point, immediately stop out, don\'t "give one more chance". After false breakout stops, consider reverse trading (false breakout up, reverse short).'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '假突破反向交易（Fade the Fake）' : 'False Breakout Reverse Trading (Fade the Fake)'}</h3>
            <p className="mb-3">
              {isZh
                ? '假突破不仅是风险，也是机会。假突破后价格通常反向运行（假向上突破后下跌，假向下突破后上涨）。这是因为假突破触发了大量止损单和套牢盘，反向力量强劲。'
                : 'False breakout is not only risk, but opportunity. After false breakout price usually moves opposite direction (false upward break then falls, false downward break then rises). This is because false breakout triggers many stop-loss orders and trapped traders, opposite force strong.'}
            </p>
            <div className="p-4 bg-[#0a0a0a] dark:bg-gray-900 text-gray-300">
              <p className="font-bold mb-2 text-white">{isZh ? '假突破反向交易步骤：' : 'False Breakout Reverse Trading Steps:'}</p>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '步骤1：识别假突破' : 'Step 1: Identify False Breakout'}</strong>{' '}
                  {isZh ? '- 价格突破阻力1.1000，但收盘价回落至1.0998（假突破特征）。' : ' - Price breaks resistance 1.1000, but close falls to 1.0998 (false breakout characteristic).'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '步骤2：等待确认' : 'Step 2: Wait for Confirmation'}</strong>{' '}
                  {isZh ? '- 下一根K线明确收盘在支撑阻力内部（1.0990），确认假突破。' : ' - Next candle clearly closes within S/R (1.0990), confirms false breakout.'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '步骤3：反向入场' : 'Step 3: Enter Opposite Direction'}</strong>{' '}
                  {isZh ? '- 做空入场（假向上突破，反向做空），入场价1.0990。' : ' - Enter short (false upward break, reverse short), entry 1.0990.'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '步骤4：止损' : 'Step 4: Stop-Loss'}</strong>{' '}
                  {isZh ? '- 假突破高点上方（1.1020），风险30点。' : ' - Above false breakout high (1.1020), risk 30 pips.'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '步骤5：止盈' : 'Step 5: Take-Profit'}</strong>{' '}
                  {isZh ? '- 支撑区域下沿或1:2风险回报（1.0930），目标60点。' : ' - Support zone bottom or 1:2 risk-reward (1.0930), target 60 pips.'}
                </li>
              </ul>
            </div>
            <p className="text-sm mt-3">
              <strong className="text-white">{isZh ? '⚠️ 注意：' : '⚠️ Note:'}</strong>{' '}
              {isZh
                ? '假突破反向交易是高级策略，需要快速反应和严格纪律。新手建议先掌握基础突破交易，有经验后再尝试假突破反向交易。'
                : 'False breakout reverse trading is advanced strategy, requires quick reaction and strict discipline. Beginners recommended to master basic breakout trading first, try false breakout reverse after gaining experience.'}
            </p>
          </div>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
