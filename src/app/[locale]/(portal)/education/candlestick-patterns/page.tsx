import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { candlestickPatternsContent } from '@/content/education/candlestick-patterns.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    candlestickPatternsContent.zh.title,
    candlestickPatternsContent.en.title,
    candlestickPatternsContent.zh.description,
    candlestickPatternsContent.en.description,
    candlestickPatternsContent.zh.keywords,
    candlestickPatternsContent.en.keywords,
    lang
  );
}

export default async function CandlestickPatternsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = candlestickPatternsContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: Candlestick Basics */}
      <section id="candlestick-basics" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? 'K线基础与解读' : 'Candlestick Basics & Reading'}
        </h2>
        <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? 'K线（蜡烛图，Candlestick）是技术分析的基石，由日本米商本间宗久在18世纪发明，用于记录米价波动。每根K线包含四个关键价格信息：开盘价（Open）、最高价（High）、最低价（Low）、收盘价（Close），简称OHLC。相比传统的线形图，K线能直观展示价格运动的强度、方向和市场参与者的情绪。'
              : 'Candlesticks are the foundation of technical analysis, invented by Japanese rice trader Homma Munehisa in the 18th century to record rice price movements. Each candle contains four key price points: Open, High, Low, Close (OHLC). Compared to traditional line charts, candlesticks intuitively display price movement strength, direction, and market sentiment.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? 'K线结构解析' : 'Candlestick Structure'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 实体（Body）：' : '1. Body:'}</strong>{' '}
                {isZh
                  ? '开盘价与收盘价之间的矩形区域。阳线（Bullish）实体为白色或绿色（收盘价>开盘价），阴线（Bearish）实体为黑色或红色（收盘价<开盘价）。实体越大，买卖力量越强。'
                  : 'Rectangular area between open and close. Bullish candles are white/green (close > open), bearish candles are black/red (close < open). Larger body indicates stronger buying/selling force.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 上影线（Upper Shadow/Wick）：' : '2. Upper Shadow/Wick:'}</strong>{' '}
                {isZh
                  ? '实体上方延伸至最高价的细线。上影线长表示价格曾触及高位但被打压回落，显示上方卖压强或买盘弱。'
                  : 'Thin line extending from body top to high. Long upper shadow shows price reached high but was pushed down, indicating selling pressure or weak buying.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 下影线（Lower Shadow/Wick）：' : '3. Lower Shadow/Wick:'}</strong>{' '}
                {isZh
                  ? '实体下方延伸至最低价的细线。下影线长表示价格曾触及低位但被拉升，显示下方支撑强或买盘强劲。'
                  : 'Thin line extending from body bottom to low. Long lower shadow shows price reached low but was lifted, indicating support or strong buying.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 开盘价与收盘价：' : '4. Open & Close:'}</strong>{' '}
                {isZh
                  ? '开盘价是该时间段的第一笔成交价，收盘价是最后一笔成交价。收盘价最重要，代表该周期内多空博弈的最终结果。'
                  : 'Open is first trade price of period, close is last. Close most important, represents final outcome of bull-bear battle.'}
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '看涨K线特征' : 'Bullish Candle Characteristics'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '实体较大且为阳线（绿色/白色）' : 'Large body, bullish (green/white)'}</li>
                <li className="text-gray-300">{isZh ? '上影线短或无上影线（买盘强劲，无压力）' : 'Short/no upper shadow (strong buying, no resistance)'}</li>
                <li className="text-gray-300">{isZh ? '下影线长（曾被打压但强力反弹）' : 'Long lower shadow (was pushed down but bounced strongly)'}</li>
                <li className="text-gray-300">{isZh ? '收盘价接近最高价（多头控盘）' : 'Close near high (bulls in control)'}</li>
                <li className="text-gray-300">{isZh ? '例如：Hammer锤子线、Marubozu光头光脚阳线' : 'Examples: Hammer, Marubozu bullish'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '看跌K线特征' : 'Bearish Candle Characteristics'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '实体较大且为阴线（红色/黑色）' : 'Large body, bearish (red/black)'}</li>
                <li className="text-gray-300">{isZh ? '下影线短或无下影线（卖盘强劲，无支撑）' : 'Short/no lower shadow (strong selling, no support)'}</li>
                <li className="text-gray-300">{isZh ? '上影线长（曾反弹但被打压回落）' : 'Long upper shadow (bounced but pushed back down)'}</li>
                <li className="text-gray-300">{isZh ? '收盘价接近最低价（空头控盘）' : 'Close near low (bears in control)'}</li>
                <li className="text-gray-300">{isZh ? '例如：Shooting Star流星线、Marubozu光头光脚阴线' : 'Examples: Shooting Star, Marubozu bearish'}</li>
              </ul>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? 'K线大小与市场含义' : 'Candle Size & Market Meaning'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '大实体K线（Big Body）：' : 'Big Body:'}</strong>{' '}
                {isZh ? '开盘价与收盘价差距大（50点以上），代表强烈的买入或卖出力量，趋势可能延续。' : 'Large open-close gap (50+ pips), strong buying/selling force, trend may continue.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '小实体K线（Small Body）：' : 'Small Body:'}</strong>{' '}
                {isZh ? '开盘价与收盘价接近（10-20点），代表买卖力量均衡，市场犹豫不决，可能盘整或反转。' : 'Open-close close together (10-20 pips), balanced forces, market indecision, may consolidate or reverse.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '十字星K线（Doji）：' : 'Doji:'}</strong>{' '}
                {isZh ? '开盘价与收盘价几乎相同（实体极小），代表多空博弈激烈但无明确胜者，是关键的转折信号。' : 'Open-close almost same (tiny body), fierce bull-bear battle but no clear winner, key reversal signal.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '长影线K线（Long Shadow）：' : 'Long Shadow:'}</strong>{' '}
                {isZh ? '影线长度超过实体2-3倍，代表价格曾被强力拒绝（上影线=卖压，下影线=买盘），是反转信号。' : 'Shadow 2-3x longer than body, price was strongly rejected (upper shadow=selling, lower shadow=buying), reversal signal.'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '重要提示：K线必须结合背景' : 'Important: Candles Must Combine with Context'}
            </h3>
            <p className="text-gray-300">
              {isZh
                ? '单根K线本身意义有限，必须结合市场背景解读：1) 位置（出现在支撑/阻力位 vs 无关紧要的位置）；2) 趋势（顺势 vs 逆势）；3) 前后K线（前面是什么K线，后面如何确认）；4) 成交量（大量 vs 小量）。例如，同样的锤子线，出现在下降趋势的关键支撑位（看涨）与出现在上升趋势中段（中性）含义完全不同。学习K线形态的核心是学会"在正确的位置识别正确的形态"。'
                : 'Single candle has limited meaning, must interpret with market context: 1) Location (at support/resistance vs irrelevant position); 2) Trend (with trend vs counter-trend); 3) Surrounding candles (what preceded, how confirmed); 4) Volume (high vs low). E.g., same hammer at key support in downtrend (bullish) vs mid-uptrend (neutral) means completely different. Core of learning candlestick patterns is "recognizing right patterns at right locations".'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Reversal Patterns */}
      <section id="reversal-patterns" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '反转形态深度分析' : 'Reversal Patterns Analysis'}
        </h2>
        <div className="space-y-6">
          <p className="text-gray-300 dark:text-gray-300">
            {isZh
              ? '反转形态（Reversal Patterns）预示趋势可能改变方向，是交易者捕捉顶部和底部的重要工具。但需要注意：反转形态的胜率取决于出现的位置和确认条件，不是所有反转形态都会导致真正的趋势反转，很多时候只是短期回调。'
              : 'Reversal patterns signal potential trend direction change, important tools for catching tops and bottoms. Note: reversal pattern win rate depends on location and confirmation conditions, not all reversal patterns lead to true trend reversal, often just short-term pullbacks.'}
          </p>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '1. Doji十字星 - 多空博弈的转折点' : '1. Doji - Bull-Bear Battle Turning Point'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '形态特征：' : 'Pattern Characteristics:'}</strong>{' '}
                {isZh
                  ? '开盘价与收盘价几乎相同（实体极小或无实体），形成十字形态。上下影线可长可短，但必须有影线（完全无影线是"四价合一"，极少见）。'
                  : 'Open and close almost same (tiny/no body), forming cross shape. Upper/lower shadows can be long or short, but must have shadows (no shadows is "four price one", extremely rare).'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? 'Doji类型与含义：' : 'Doji Types & Meanings:'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'Long-Legged Doji（长腿十字星）：' : 'Long-Legged Doji:'}</strong>{' '}
                    {isZh ? '上下影线都很长，代表价格剧烈波动但最终回到原点，买卖力量极度不平衡，高度不确定性。' : 'Both shadows very long, price fluctuates wildly but returns to origin, extreme buying/selling imbalance, high uncertainty.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'Dragonfly Doji（蜻蜓十字星）：' : 'Dragonfly Doji:'}</strong>{' '}
                    {isZh ? '只有下影线，无上影线。价格跌至低点后强力反弹至开盘价，看涨信号（在下降趋势底部）。' : 'Only lower shadow, no upper shadow. Price fell to low then strongly bounced to open, bullish signal (at downtrend bottom).'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'Gravestone Doji（墓碑十字星）：' : 'Gravestone Doji:'}</strong>{' '}
                    {isZh ? '只有上影线，无下影线。价格涨至高点后被打压回开盘价，看跌信号（在上升趋势顶部）。' : 'Only upper shadow, no lower shadow. Price rose to high then pushed back to open, bearish signal (at uptrend top).'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'Standard Doji（标准十字星）：' : 'Standard Doji:'}</strong>{' '}
                    {isZh ? '上下影线长度相近，开盘价/收盘价在中间位置，中性信号，需等待下一根K线确认方向。' : 'Similar length shadows, open/close at middle, neutral signal, wait for next candle confirmation.'}
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600 mt-3">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '⚠️ 交易要点：' : '⚠️ Trading Points:'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? 'Doji本身不是交易信号，必须满足：1) 出现在明确趋势的关键位置（前高低、支撑阻力）；2) 下一根K线确认（Doji后看涨K线=做多）；3) 更大时间框架趋势支持。单独的Doji胜率仅50%，结合位置和确认后可达65-70%。'
                    : 'Doji itself not trading signal, must meet: 1) At key location in clear trend (previous highs/lows, S/R); 2) Next candle confirms (bullish candle after Doji = long); 3) Larger timeframe trend support. Doji alone 50% win rate, with location and confirmation can reach 65-70%.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '2. Hammer/Hanging Man - 锤子线与上吊线' : '2. Hammer/Hanging Man'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '形态特征：' : 'Pattern Characteristics:'}</strong>{' '}
                {isZh
                  ? '小实体（阳线或阴线），长下影线（至少是实体的2倍），几乎无上影线或上影线很短。形状像锤子，下影线是"锤柄"。'
                  : 'Small body (bullish or bearish), long lower shadow (at least 2x body), no/short upper shadow. Shape like hammer, lower shadow is "handle".'}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? 'Hammer（锤子线）- 看涨' : 'Hammer - Bullish'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '出现在下降趋势底部或支撑位' : 'Appears at downtrend bottom or support'}</li>
                    <li className="text-gray-300">{isZh ? '价格跌至低点后被强力拉升' : 'Price fell to low then strongly lifted'}</li>
                    <li className="text-gray-300">{isZh ? '显示卖盘耗尽，买盘介入' : 'Shows selling exhausted, buying entered'}</li>
                    <li className="text-gray-300">{isZh ? '下一根阳线确认后做多' : 'Long after next bullish candle confirms'}</li>
                    <li className="text-gray-300">{isZh ? '止损：Hammer低点下方10-15点' : 'Stop: 10-15 pips below Hammer low'}</li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? 'Hanging Man（上吊线）- 看跌' : 'Hanging Man - Bearish'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '出现在上升趋势顶部或阻力位' : 'Appears at uptrend top or resistance'}</li>
                    <li className="text-gray-300">{isZh ? '价格涨至高点后出现卖压' : 'Selling pressure after price reached high'}</li>
                    <li className="text-gray-300">{isZh ? '警告上涨动能减弱' : 'Warns upward momentum weakening'}</li>
                    <li className="text-gray-300">{isZh ? '下一根阴线确认后做空' : 'Short after next bearish candle confirms'}</li>
                    <li className="text-gray-300">{isZh ? '止损：Hanging Man高点上方10-15点' : 'Stop: 10-15 pips above Hanging Man high'}</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm">
                <strong className="text-white">{isZh ? '⚡ 提高胜率技巧：' : '⚡ Improving Win Rate:'}</strong>{' '}
                {isZh
                  ? '1) 下影线越长越好（至少是实体的3倍）；2) 实体颜色与趋势相反更强（下降趋势中Hammer是阳线）；3) 成交量放大；4) 出现在关键整数关口（如1.1000）；5) 等待下一根K线完全确认（不提前入场）。满足这些条件，Hammer胜率可达70-75%。'
                  : '1) Longer lower shadow better (at least 3x body); 2) Body color opposite trend stronger (Hammer is bullish in downtrend); 3) Volume increases; 4) At key round numbers (like 1.1000); 5) Wait for next candle full confirmation (don\'t enter early). Meeting these conditions, Hammer win rate can reach 70-75%.'}
              </p>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '3. Engulfing吞没形态 - 强烈反转信号' : '3. Engulfing - Strong Reversal Signal'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '形态特征：' : 'Pattern Characteristics:'}</strong>{' '}
                {isZh
                  ? '两根K线组合，第二根K线的实体完全"吞没"第一根K线的实体（高点更高，低点更低）。显示市场情绪急剧反转。'
                  : 'Two-candle pattern, second candle body completely "engulfs" first candle body (higher high, lower low). Shows sharp market sentiment reversal.'}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? 'Bullish Engulfing（看涨吞没）' : 'Bullish Engulfing'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '出现在下降趋势，第一根是阴线' : 'In downtrend, first candle bearish'}</li>
                    <li className="text-gray-300">{isZh ? '第二根大阳线完全吞没前一根阴线' : 'Second large bullish candle engulfs previous bearish'}</li>
                    <li className="text-gray-300">{isZh ? '显示买盘力量压倒卖盘' : 'Shows buying force overwhelms selling'}</li>
                    <li className="text-gray-300">{isZh ? '入场：第二根K线收盘后或回测低点' : 'Entry: after second candle close or retest low'}</li>
                    <li className="text-gray-300">{isZh ? '止损：吞没形态低点下方' : 'Stop: below engulfing pattern low'}</li>
                    <li className="text-gray-300">{isZh ? '胜率：65-70%（关键位置）' : 'Win rate: 65-70% (at key levels)'}</li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? 'Bearish Engulfing（看跌吞没）' : 'Bearish Engulfing'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '出现在上升趋势，第一根是阳线' : 'In uptrend, first candle bullish'}</li>
                    <li className="text-gray-300">{isZh ? '第二根大阴线完全吞没前一根阳线' : 'Second large bearish candle engulfs previous bullish'}</li>
                    <li className="text-gray-300">{isZh ? '显示卖盘力量压倒买盘' : 'Shows selling force overwhelms buying'}</li>
                    <li className="text-gray-300">{isZh ? '入场：第二根K线收盘后或回测高点' : 'Entry: after second candle close or retest high'}</li>
                    <li className="text-gray-300">{isZh ? '止损：吞没形态高点上方' : 'Stop: above engulfing pattern high'}</li>
                    <li className="text-gray-300">{isZh ? '胜率：65-70%（关键位置）' : 'Win rate: 65-70% (at key levels)'}</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-gray-900 text-gray-300 mt-3">
                <p className="font-bold mb-2 text-white">{isZh ? '完美吞没形态标准：' : 'Perfect Engulfing Criteria:'}</p>
                <ul className="space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '1. 吞没K线实体是被吞没K线的1.5-2倍以上（力量悬殊）' : '1. Engulfing body 1.5-2x+ swallowed candle (power disparity)'}</li>
                  <li className="text-gray-300">{isZh ? '2. 出现在关键支撑/阻力位（前高低、整数关口、EMA）' : '2. At key S/R (previous highs/lows, round numbers, EMA)'}</li>
                  <li className="text-gray-300">{isZh ? '3. 前期有明确的趋势（至少3-5根同向K线）' : '3. Prior clear trend (at least 3-5 same-direction candles)'}</li>
                  <li className="text-gray-300">{isZh ? '4. 成交量明显放大（如有数据）' : '4. Volume significantly increases (if available)'}</li>
                  <li className="text-gray-300">{isZh ? '5. 吞没后价格不回测或小幅回测后继续' : '5. After engulfing, price doesn\'t retest or small retest then continues'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '4. Morning Star/Evening Star - 晨星与夜星' : '4. Morning Star/Evening Star'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '形态特征：' : 'Pattern Characteristics:'}</strong>{' '}
                {isZh
                  ? '三根K线组合，是最可靠的反转形态之一（胜率65-70%）。中间K线是十字星或小实体，像天空中的"星星"，两侧是大实体K线。'
                  : 'Three-candle pattern, one of most reliable reversals (65-70% win rate). Middle candle is doji or small body, like "star" in sky, flanked by large bodies.'}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? 'Morning Star（晨星）- 看涨' : 'Morning Star - Bullish'}</p>
                  <p className="text-sm mb-2">{isZh ? '结构：大阴线 + 星线（小实体/Doji）+ 大阳线' : 'Structure: Large bearish + star (small body/doji) + large bullish'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '第1根：大阴线，下降趋势延续' : 'Candle 1: Large bearish, downtrend continues'}</li>
                    <li className="text-gray-300">{isZh ? '第2根：小实体或Doji，向下跳空，卖盘减弱' : 'Candle 2: Small body/doji, gaps down, selling weakens'}</li>
                    <li className="text-gray-300">{isZh ? '第3根：大阳线，向上突破，吞没星线，买盘强劲' : 'Candle 3: Large bullish, breaks up, engulfs star, strong buying'}</li>
                    <li className="text-gray-300">{isZh ? '入场：第3根K线收盘后' : 'Entry: after 3rd candle closes'}</li>
                    <li className="text-gray-300">{isZh ? '止损：形态最低点下方' : 'Stop: below pattern low'}</li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? 'Evening Star（夜星）- 看跌' : 'Evening Star - Bearish'}</p>
                  <p className="text-sm mb-2">{isZh ? '结构：大阳线 + 星线（小实体/Doji）+ 大阴线' : 'Structure: Large bullish + star (small body/doji) + large bearish'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '第1根：大阳线，上升趋势延续' : 'Candle 1: Large bullish, uptrend continues'}</li>
                    <li className="text-gray-300">{isZh ? '第2根：小实体或Doji，向上跳空，买盘减弱' : 'Candle 2: Small body/doji, gaps up, buying weakens'}</li>
                    <li className="text-gray-300">{isZh ? '第3根：大阴线，向下突破，吞没星线，卖盘强劲' : 'Candle 3: Large bearish, breaks down, engulfs star, strong selling'}</li>
                    <li className="text-gray-300">{isZh ? '入场：第3根K线收盘后' : 'Entry: after 3rd candle closes'}</li>
                    <li className="text-gray-300">{isZh ? '止损：形态最高点上方' : 'Stop: above pattern high'}</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm">
                <strong className="text-white">{isZh ? '⚡ 注意事项：' : '⚡ Notes:'}</strong>{' '}
                {isZh
                  ? '1) Star形态的跳空在外汇市场不常见（24小时交易），重点看实体大小对比；2) 第3根K线必须"深入"第1根K线实体（至少吞没50%）；3) 出现频率低但可靠性高，值得耐心等待；4) 在D1图表最有效，H4其次，H1以下不建议使用。'
                  : '1) Star pattern gaps uncommon in forex (24hr trading), focus on body size contrast; 2) 3rd candle must "penetrate" 1st candle body (at least 50% engulfing); 3) Low frequency but high reliability, worth patient wait; 4) Most effective on D1 chart, H4 next, not recommended below H1.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Continuation Patterns */}
      <section id="continuation-patterns" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '持续形态识别' : 'Continuation Pattern Recognition'}
        </h2>
        <div className="space-y-6">
          <p className="text-gray-300 dark:text-gray-300">
            {isZh
              ? '持续形态（Continuation Patterns）预示当前趋势将延续，是趋势交易者的重要工具。这些形态通常出现在趋势中段，代表市场的"休息"和"蓄力"，而非反转。相比反转形态，持续形态的胜率更高（70-75%），因为"趋势延续"比"趋势反转"更常见。'
              : 'Continuation patterns signal current trend will persist, important tools for trend traders. These patterns typically appear mid-trend, representing market "rest" and "consolidation", not reversal. Compared to reversal patterns, continuation patterns have higher win rate (70-75%) as "trend continuation" more common than "trend reversal".'}
          </p>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '1. Three White Soldiers / Three Black Crows - 三白兵与三黑鸦' : '1. Three White Soldiers / Three Black Crows'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '形态特征：' : 'Pattern Characteristics:'}</strong>{' '}
                {isZh
                  ? '连续三根大实体同向K线，逐步推高或推低价格，显示强劲的单边力量。这是最可靠的持续形态之一（胜率75%）。'
                  : 'Three consecutive large same-direction candles, progressively pushing price higher or lower, showing strong one-sided force. One of most reliable continuation patterns (75% win rate).'}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? 'Three White Soldiers（三白兵）' : 'Three White Soldiers'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '三根连续大阳线，实体大小相近' : 'Three consecutive large bullish candles, similar body sizes'}</li>
                    <li className="text-gray-300">{isZh ? '每根K线开盘价在前一根实体中部或上方' : 'Each candle opens at/above mid-body of previous'}</li>
                    <li className="text-gray-300">{isZh ? '每根K线收盘价创新高' : 'Each candle close makes new high'}</li>
                    <li className="text-gray-300">{isZh ? '上影线短或无，显示买盘强劲无阻力' : 'Short/no upper shadows, strong buying no resistance'}</li>
                    <li className="text-gray-300">{isZh ? '出现在上升趋势初期或中期' : 'Appears in early/mid uptrend'}</li>
                    <li className="text-gray-300">{isZh ? '交易：第三根K线收盘后做多' : 'Trade: long after 3rd candle closes'}</li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? 'Three Black Crows（三黑鸦）' : 'Three Black Crows'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '三根连续大阴线，实体大小相近' : 'Three consecutive large bearish candles, similar body sizes'}</li>
                    <li className="text-gray-300">{isZh ? '每根K线开盘价在前一根实体中部或下方' : 'Each candle opens at/below mid-body of previous'}</li>
                    <li className="text-gray-300">{isZh ? '每根K线收盘价创新低' : 'Each candle close makes new low'}</li>
                    <li className="text-gray-300">{isZh ? '下影线短或无，显示卖盘强劲无支撑' : 'Short/no lower shadows, strong selling no support'}</li>
                    <li className="text-gray-300">{isZh ? '出现在下降趋势初期或中期' : 'Appears in early/mid downtrend'}</li>
                    <li className="text-gray-300">{isZh ? '交易：第三根K线收盘后做空' : 'Trade: short after 3rd candle closes'}</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600 mt-3">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '⚠️ 避免假信号：' : '⚠️ Avoid False Signals:'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '并非所有三根同向K线都是有效信号。有效三白兵/三黑鸦必须满足：1) 每根K线实体大（至少30-50点）；2) 实体大小递增或相近（不能递减）；3) 影线短（实体占K线总长的70%以上）；4) 出现在趋势初期或关键突破后。如果出现在趋势末端（如已上涨300点），可能是"衰竭信号"而非持续。'
                    : 'Not all three same-direction candles are valid signals. Valid Three Soldiers/Crows must meet: 1) Each candle has large body (at least 30-50 pips); 2) Body sizes increasing or similar (not decreasing); 3) Short shadows (body occupies 70%+ of total candle length); 4) Appears in early trend or after key breakout. If appears at trend end (e.g., after 300 pip rise), may be "exhaustion signal" not continuation.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '2. Harami - 孕线（母子线）' : '2. Harami (Inside Bar)'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '形态特征：' : 'Pattern Characteristics:'}</strong>{' '}
                {isZh
                  ? '两根K线组合，第二根K线的实体完全包含在第一根K线的实体内（高点更低，低点更高），像"怀孕"。显示市场在犹豫，但通常延续前期趋势。'
                  : 'Two-candle pattern, second candle body completely inside first candle body (lower high, higher low), like "pregnancy". Shows market hesitation but usually continues prior trend.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? 'Harami结构：' : 'Harami Structure:'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'Bullish Harami（看涨孕线）：' : 'Bullish Harami:'}</strong>{' '}
                    {isZh ? '第一根大阴线 + 第二根小阳线（包含在阴线内）。出现在下降趋势，暗示卖盘减弱，可能反弹。' : 'First large bearish + second small bullish (inside bearish). In downtrend, hints selling weakening, may bounce.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'Bearish Harami（看跌孕线）：' : 'Bearish Harami:'}</strong>{' '}
                    {isZh ? '第一根大阳线 + 第二根小阴线（包含在阳线内）。出现在上升趋势，暗示买盘减弱，可能回调。' : 'First large bullish + second small bearish (inside bullish). In uptrend, hints buying weakening, may pullback.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'Harami Cross：' : 'Harami Cross:'}</strong>{' '}
                    {isZh ? '第二根是Doji十字星（更强烈的犹豫信号），可靠性更高。' : 'Second candle is doji (stronger hesitation signal), higher reliability.'}
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-gray-900 text-gray-300 mt-3">
                <p className="font-bold mb-2 text-white">{isZh ? 'Harami交易策略：' : 'Harami Trading Strategy:'}</p>
                <ul className="space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '1. 反转交易（低胜率55%）：' : '1. Reversal Trading (Low 55% Win Rate):'}</strong>{' '}
                    {isZh ? 'Harami后价格反转，需等待第三根K线确认。风险大，不推荐新手。' : 'Price reverses after Harami, need 3rd candle confirmation. High risk, not recommended for beginners.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '2. 持续交易（高胜率70%，推荐）：' : '2. Continuation Trading (High 70% Win Rate, Recommended):'}</strong>{' '}
                    {isZh ? '将Harami视为"盘整"，突破母线（第一根K线）高低点后顺势交易。例如，上升趋势中出现Harami，价格突破母线高点后做多。' : 'View Harami as "consolidation", trade with trend after breaking mother candle high/low. E.g., in uptrend, Harami appears, long after breaking mother candle high.'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '止损：' : 'Stop-Loss:'}</strong>{' '}
                    {isZh ? '突破方向的另一端（突破向上做多，止损母线低点下方）。' : 'Opposite end of breakout direction (break up long, stop below mother candle low).'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '3. Rising/Falling Three Methods - 上升/下降三法' : '3. Rising/Falling Three Methods'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '形态特征：' : 'Pattern Characteristics:'}</strong>{' '}
                {isZh
                  ? '五根K线组合：大实体 + 三根小实体回调 + 大实体突破。显示趋势中的短暂盘整后继续，是经典的持续形态。'
                  : 'Five-candle pattern: large body + three small body pullbacks + large body breakout. Shows brief consolidation in trend then continues, classic continuation pattern.'}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? 'Rising Three Methods（上升三法）' : 'Rising Three Methods'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '第1根：大阳线，上升趋势延续' : 'Candle 1: Large bullish, uptrend continues'}</li>
                    <li className="text-gray-300">{isZh ? '第2-4根：三根小阴线或小阳线，回调但不破第1根低点' : 'Candles 2-4: Three small bearish/bullish, pullback but don\'t break candle 1 low'}</li>
                    <li className="text-gray-300">{isZh ? '第5根：大阳线，突破第1根高点，趋势恢复' : 'Candle 5: Large bullish, breaks candle 1 high, trend resumes'}</li>
                    <li className="text-gray-300">{isZh ? '交易：第5根K线收盘后做多' : 'Trade: long after 5th candle closes'}</li>
                    <li className="text-gray-300">{isZh ? '止损：形态最低点下方' : 'Stop: below pattern low'}</li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
                  <p className="font-bold mb-2 text-white">{isZh ? 'Falling Three Methods（下降三法）' : 'Falling Three Methods'}</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '第1根：大阴线，下降趋势延续' : 'Candle 1: Large bearish, downtrend continues'}</li>
                    <li className="text-gray-300">{isZh ? '第2-4根：三根小阳线或小阴线，反弹但不破第1根高点' : 'Candles 2-4: Three small bullish/bearish, bounce but don\'t break candle 1 high'}</li>
                    <li className="text-gray-300">{isZh ? '第5根：大阴线，跌破第1根低点，趋势恢复' : 'Candle 5: Large bearish, breaks candle 1 low, trend resumes'}</li>
                    <li className="text-gray-300">{isZh ? '交易：第5根K线收盘后做空' : 'Trade: short after 5th candle closes'}</li>
                    <li className="text-gray-300">{isZh ? '止损：形态最高点上方' : 'Stop: above pattern high'}</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm">
                <strong className="text-white">{isZh ? '⚡ 实战要点：' : '⚡ Practical Points:'}</strong>{' '}
                {isZh
                  ? 'Rising/Falling Three Methods出现频率低但胜率高（70-75%）。关键判断标准：1) 中间三根小K线必须在第一根K线范围内（不能完全突破）；2) 第五根K线必须强势突破第一根K线；3) 最适合H4/D1图表，M15/H1不明显。如果看到类似结构，即使不完全符合"三根"（2根或4根也可以），核心是"盘整后突破"的逻辑。'
                  : 'Rising/Falling Three Methods low frequency but high win rate (70-75%). Key criteria: 1) Middle three small candles must stay within first candle range (can\'t fully break); 2) Fifth candle must strongly break first candle; 3) Best suited for H4/D1 charts, not obvious on M15/H1. If see similar structure, even if not exactly "three" (2 or 4 candles also work), core is "consolidation then breakout" logic.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Pattern Reliability */}
      <section id="pattern-reliability" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '形态可靠性评估' : 'Pattern Reliability Assessment'}
        </h2>
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-800">
              <thead>
                <tr className="bg-gray-900 text-gray-300">
                  <th className="border border-gray-800 p-3 text-left">
                    {isZh ? 'K线形态' : 'Pattern'}
                  </th>
                  <th className="border border-gray-800 p-3 text-left">
                    {isZh ? '基础胜率' : 'Base Win Rate'}
                  </th>
                  <th className="border border-gray-800 p-3 text-left">
                    {isZh ? '优化后胜率' : 'Optimized Win Rate'}
                  </th>
                  <th className="border border-gray-800 p-3 text-left">
                    {isZh ? '最佳时间框架' : 'Best Timeframe'}
                  </th>
                  <th className="border border-gray-800 p-3 text-left">
                    {isZh ? '难度等级' : 'Difficulty'}
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-300">
                <tr className="border border-gray-800">
                  <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">Engulfing</td>
                  <td className="border border-gray-800 p-3 text-gray-300">60%</td>
                  <td className="border border-gray-800 p-3 text-green-600 dark:text-green-400">70-75%</td>
                  <td className="border border-gray-800 p-3 text-gray-300">H1/H4/D1</td>
                  <td className="border border-gray-800 p-3 text-gray-300">{isZh ? '⭐ 简单' : '⭐ Easy'}</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-800">
                  <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">Pin Bar</td>
                  <td className="border border-gray-800 p-3 text-gray-300">55%</td>
                  <td className="border border-gray-800 p-3 text-green-600 dark:text-green-400">70-75%</td>
                  <td className="border border-gray-800 p-3 text-gray-300">H1/H4</td>
                  <td className="border border-gray-800 p-3 text-gray-300">{isZh ? '⭐⭐ 中等' : '⭐⭐ Medium'}</td>
                </tr>
                <tr className="border border-gray-800">
                  <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">Morning/Evening Star</td>
                  <td className="border border-gray-800 p-3 text-gray-300">60%</td>
                  <td className="border border-gray-800 p-3 text-green-600 dark:text-green-400">70-75%</td>
                  <td className="border border-gray-800 p-3 text-gray-300">H4/D1</td>
                  <td className="border border-gray-800 p-3 text-gray-300">{isZh ? '⭐⭐ 中等' : '⭐⭐ Medium'}</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-800">
                  <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">Three White Soldiers/Black Crows</td>
                  <td className="border border-gray-800 p-3 text-gray-300">65%</td>
                  <td className="border border-gray-800 p-3 text-green-600 dark:text-green-400">75-80%</td>
                  <td className="border border-gray-800 p-3 text-gray-300">H1/H4</td>
                  <td className="border border-gray-800 p-3 text-gray-300">{isZh ? '⭐ 简单' : '⭐ Easy'}</td>
                </tr>
                <tr className="border border-gray-800">
                  <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">Inside Bar (Harami)</td>
                  <td className="border border-gray-800 p-3 text-gray-300">55%</td>
                  <td className="border border-gray-800 p-3 text-green-600 dark:text-green-400">70%</td>
                  <td className="border border-gray-800 p-3 text-gray-300">H1/H4</td>
                  <td className="border border-gray-800 p-3 text-gray-300">{isZh ? '⭐⭐⭐ 高级' : '⭐⭐⭐ Advanced'}</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-800">
                  <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">Doji</td>
                  <td className="border border-gray-800 p-3 text-gray-300">50%</td>
                  <td className="border border-gray-800 p-3 text-yellow-600 dark:text-yellow-400">65%</td>
                  <td className="border border-gray-800 p-3 text-gray-300">H1/H4/D1</td>
                  <td className="border border-gray-800 p-3 text-gray-300">{isZh ? '⭐⭐⭐ 高级' : '⭐⭐⭐ Advanced'}</td>
                </tr>
                <tr className="border border-gray-800">
                  <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">Hammer/Hanging Man</td>
                  <td className="border border-gray-800 p-3 text-gray-300">55%</td>
                  <td className="border border-gray-800 p-3 text-green-600 dark:text-green-400">70%</td>
                  <td className="border border-gray-800 p-3 text-gray-300">H1/H4</td>
                  <td className="border border-gray-800 p-3 text-gray-300">{isZh ? '⭐⭐ 中等' : '⭐⭐ Medium'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '提升K线形态胜率的6个关键因素' : '6 Key Factors to Improve Pattern Win Rate'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 位置（最重要，权重40%）：' : '1. Location (Most Important, 40% Weight):'}</strong>{' '}
                {isZh
                  ? '形态必须出现在关键位置：前高低、整数关口（1.1000）、斐波那契回撤位（38.2%, 61.8%）、日/周/月开盘价、主要支撑阻力区。同样的Hammer，在关键支撑位胜率75%，在无关位置胜率仅50%。'
                  : 'Pattern must appear at key locations: previous highs/lows, round numbers (1.1000), Fibonacci retracements (38.2%, 61.8%), daily/weekly/monthly opens, major S/R zones. Same Hammer, 75% win rate at key support, only 50% at irrelevant position.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 趋势（权重30%）：' : '2. Trend (30% Weight):'}</strong>{' '}
                {isZh
                  ? '顺势形态胜率显著高于逆势。在上升趋势中交易看涨形态（Bullish Engulfing），在下降趋势中交易看跌形态（Bearish Engulfing）。使用H4/D1图表判断主趋势。逆势交易成功率低于40%。'
                  : 'With-trend patterns significantly higher win rate than counter-trend. In uptrend trade bullish patterns (Bullish Engulfing), in downtrend trade bearish patterns (Bearish Engulfing). Use H4/D1 to judge main trend. Counter-trend trading success rate below 40%.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 确认（权重15%）：' : '3. Confirmation (15% Weight):'}</strong>{' '}
                {isZh
                  ? '形态收盘后等待下一根K线确认方向，或等待价格突破形态高低点。例如，Hammer后等待阳线确认，或价格突破Hammer高点。提前入场容易遭遇假信号。确认后入场胜率提升10-15%，虽然牺牲部分利润空间。'
                  : 'After pattern closes, wait for next candle to confirm direction, or wait for price to break pattern high/low. E.g., after Hammer wait for bullish confirmation, or price breaks Hammer high. Early entry easily encounters false signals. Confirmed entry improves win rate 10-15%, though sacrifices some profit potential.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 多时间框架一致性（权重10%）：' : '4. Multiple Timeframe Alignment (10% Weight):'}</strong>{' '}
                {isZh
                  ? '最佳情况：H1出现看涨Engulfing，H4也在同一位置出现看涨信号（如价格反弹自20EMA），D1处于上升趋势。多时间框架一致时，胜率可达80%+。'
                  : 'Best case: H1 shows bullish Engulfing, H4 also shows bullish signal at same location (like price bouncing from 20EMA), D1 in uptrend. When multiple timeframes align, win rate can reach 80%+.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '5. 成交量（权重3%）：' : '5. Volume (3% Weight):'}</strong>{' '}
                {isZh
                  ? '外汇现货交易没有真实成交量，但期货成交量或Tick Volume可作为参考。形态伴随量增（看涨形态）或量减（看跌形态）时更可靠。非必需条件。'
                  : 'Forex spot has no true volume, but futures volume or Tick Volume can reference. Pattern with volume increase (bullish) or decrease (bearish) more reliable. Not essential condition.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '6. 市场情绪（权重2%）：' : '6. Market Sentiment (2% Weight):'}</strong>{' '}
                {isZh
                  ? '避免在重大新闻前后交易形态（NFP、央行决议），波动性大导致形态失效。选择在欧美交易时段（高流动性）交易形态。'
                  : 'Avoid trading patterns around major news (NFP, central bank decisions), high volatility causes pattern failure. Choose to trade patterns during EU/US sessions (high liquidity).'}
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '✅ 高胜率形态特征' : '✅ High Win Rate Pattern Characteristics'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '出现在日线D1或4小时H4关键支撑/阻力位' : 'At daily D1 or 4-hour H4 key S/R levels'}</li>
                <li className="text-gray-300">{isZh ? '顺应H4/D1主趋势方向' : 'Aligns with H4/D1 main trend direction'}</li>
                <li className="text-gray-300">{isZh ? '形态本身标准（大实体、长影线、明显吞没）' : 'Pattern itself standard (large body, long shadow, clear engulfing)'}</li>
                <li className="text-gray-300">{isZh ? '收盘后有下一根K线确认' : 'Next candle confirms after close'}</li>
                <li className="text-gray-300">{isZh ? '多个时间框架同时出现相同信号' : 'Multiple timeframes show same signal simultaneously'}</li>
                <li className="text-gray-300">{isZh ? '出现在整数关口或斐波那契位' : 'At round numbers or Fibonacci levels'}</li>
                <li className="text-gray-300">{isZh ? '形态前有明确的趋势（至少5根K线）' : 'Clear trend precedes pattern (at least 5 candles)'}</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '❌ 低胜率形态特征（避免交易）' : '❌ Low Win Rate Pattern Characteristics (Avoid)'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">{isZh ? '出现在无关紧要的位置（价格中段）' : 'At irrelevant positions (mid-price range)'}</li>
                <li className="text-gray-300">{isZh ? '逆势交易（在上升趋势中做空看跌形态）' : 'Counter-trend trading (shorting bearish pattern in uptrend)'}</li>
                <li className="text-gray-300">{isZh ? '形态不标准（实体小、影线短、吞没不完全）' : 'Pattern not standard (small body, short shadow, incomplete engulfing)'}</li>
                <li className="text-gray-300">{isZh ? '仅在M5/M15小时间框架出现' : 'Only appears on M5/M15 small timeframes'}</li>
                <li className="text-gray-300">{isZh ? '没有确认就提前入场' : 'Enter early without confirmation'}</li>
                <li className="text-gray-300">{isZh ? '出现在新闻发布前后' : 'Around news releases'}</li>
                <li className="text-gray-300">{isZh ? '横盘震荡市场中的形态' : 'Patterns in ranging sideways market'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: False Signals */}
      <section id="false-signals" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '假信号识别与规避' : 'False Signal Identification & Avoidance'}
        </h2>
        <div className="space-y-6">
          <p className="text-gray-300 dark:text-gray-300">
            {isZh
              ? 'K线形态的最大挑战是假信号（False Signals）：形态看起来完美，但价格随后朝相反方向运行。假信号导致新手亏损的主要原因，掌握识别和规避假信号的技巧至关重要。'
              : 'Biggest challenge of candlestick patterns is false signals: pattern looks perfect, but price subsequently moves in opposite direction. False signals are main cause of beginner losses, mastering identification and avoidance techniques crucial.'}
          </p>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '假信号的5大成因' : '5 Major Causes of False Signals'}
            </h3>
            <ul className="space-y-3 text-gray-300 dark:text-gray-300">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 市场噪音（Market Noise）：' : '1. Market Noise:'}</strong>{' '}
                {isZh
                  ? '在M5/M15等超短周期图表上，价格波动包含大量随机噪音，K线形态可能是市场随机波动而非真实信号。解决方法：使用H1以上时间框架，噪音更少。'
                  : 'On ultra-short timeframes like M5/M15, price movements contain significant random noise, candlestick patterns may be random market fluctuation not real signal. Solution: Use H1+ timeframes, less noise.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 流动性陷阱（Liquidity Trap）：' : '2. Liquidity Trap:'}</strong>{' '}
                {isZh
                  ? '大型机构故意制造假突破或假反转，诱骗散户入场，然后反向操作收割止损单。常见于整数关口（如1.1000）附近。解决方法：等待形态收盘确认，不追逐价格。'
                  : 'Large institutions deliberately create false breakouts or reversals to lure retail traders, then reverse to harvest stop-loss orders. Common near round numbers (like 1.1000). Solution: Wait for pattern close confirmation, don\'t chase price.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 新闻冲击（News Impact）：' : '3. News Impact:'}</strong>{' '}
                {isZh
                  ? '重大新闻（NFP、央行决议）发布前后，市场剧烈波动，K线形态失去意义。价格可能快速反转多次。解决方法：新闻前后1小时避免交易，使用经济日历追踪。'
                  : 'Around major news (NFP, central bank decisions), market violently fluctuates, candlestick patterns lose meaning. Price may quickly reverse multiple times. Solution: Avoid trading 1 hour around news, track with economic calendar.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 趋势强度不足（Weak Trend）：' : '4. Weak Trend:'}</strong>{' '}
                {isZh
                  ? '反转形态需要前期有明确的趋势，如果趋势太弱（如只运行50点）或横盘震荡，反转形态容易失败。解决方法：只在强劲趋势（至少100-200点）后交易反转形态。'
                  : 'Reversal patterns need clear prior trend, if trend too weak (only 50 pips) or sideways ranging, reversal patterns easily fail. Solution: Only trade reversal patterns after strong trends (at least 100-200 pips).'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '5. 过度解读（Over-interpretation）：' : '5. Over-interpretation:'}</strong>{' '}
                {isZh
                  ? '交易者"强行"看出形态，实际形态不标准（实体太小、影线不够长、吞没不完全）。解决方法：建立明确的形态识别标准，不符合标准不交易。'
                  : 'Traders "force" pattern recognition, actual pattern not standard (body too small, shadow not long enough, incomplete engulfing). Solution: Establish clear pattern recognition criteria, don\'t trade if not meeting standards.'}
              </li>
            </ul>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '假信号识别清单' : 'False Signal Identification Checklist'}
            </h3>
            <div className="space-y-4 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                {isZh
                  ? '在交易K线形态前，使用以下清单过滤假信号。如果有3个以上"危险信号"，跳过这次交易机会：'
                  : 'Before trading candlestick pattern, use following checklist to filter false signals. If 3+ "danger signs", skip this trading opportunity:'}
              </p>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
                <ul className="space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '⚠️ 危险信号1：' : '⚠️ Danger Sign 1:'}</strong>{' '}
                    {isZh ? '形态出现在横盘震荡市场（价格在50点范围内来回波动）' : 'Pattern appears in ranging sideways market (price oscillates within 50 pip range)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '⚠️ 危险信号2：' : '⚠️ Danger Sign 2:'}</strong>{' '}
                    {isZh ? '形态出现在低流动性时段（亚洲午间12:00-14:00，周五晚间）' : 'Pattern appears during low liquidity periods (Asian afternoon 12:00-14:00, Friday evening)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '⚠️ 危险信号3：' : '⚠️ Danger Sign 3:'}</strong>{' '}
                    {isZh ? '形态不标准（实体太小、影线不够长、吞没比例<1.5倍）' : 'Pattern not standard (body too small, shadow not long enough, engulfing ratio <1.5x)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '⚠️ 危险信号4：' : '⚠️ Danger Sign 4:'}</strong>{' '}
                    {isZh ? '仅在M5/M15小时间框架出现，H1/H4无对应信号' : 'Only appears on M5/M15 small timeframes, no corresponding signal on H1/H4'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '⚠️ 危险信号5：' : '⚠️ Danger Sign 5:'}</strong>{' '}
                    {isZh ? '逆势交易（在上升趋势做空看跌形态）' : 'Counter-trend trading (shorting bearish pattern in uptrend)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '⚠️ 危险信号6：' : '⚠️ Danger Sign 6:'}</strong>{' '}
                    {isZh ? '形态出现在无关紧要位置（距离关键支撑阻力50点以上）' : 'Pattern at irrelevant position (50+ pips from key S/R)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '⚠️ 危险信号7：' : '⚠️ Danger Sign 7:'}</strong>{' '}
                    {isZh ? '重大新闻发布前后1小时内' : 'Within 1 hour of major news release'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '⚠️ 危险信号8：' : '⚠️ Danger Sign 8:'}</strong>{' '}
                    {isZh ? '连续出现多个相同形态（如连续3个Doji），市场极度不确定' : 'Multiple same patterns consecutively (like 3 Dojis in row), extreme market uncertainty'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '规避假信号的5个实战技巧' : '5 Practical Tips to Avoid False Signals'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 等待收盘确认：' : '1. Wait for Close Confirmation:'}</strong>{' '}
                {isZh
                  ? '形态未收盘前不要入场。例如，H1图表上看到Hammer，等该小时结束并收盘确认后再考虑入场。提前入场容易被"假形态"欺骗（收盘后形态改变）。'
                  : 'Don\'t enter before pattern closes. E.g., see Hammer on H1 chart, wait for hour to end and close confirmation before considering entry. Early entry easily deceived by "fake patterns" (pattern changes after close).'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 要求下一根K线确认：' : '2. Require Next Candle Confirmation:'}</strong>{' '}
                {isZh
                  ? '更保守的做法：形态收盘后，等待下一根K线朝预期方向运行。例如，看涨Engulfing收盘后，等下一根阳线出现再做多。虽然牺牲部分利润，但胜率提升15%。'
                  : 'More conservative approach: after pattern closes, wait for next candle to move in expected direction. E.g., after bullish Engulfing closes, wait for next bullish candle before long. Though sacrifices some profit, win rate improves 15%.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 多时间框架交叉验证：' : '3. Multiple Timeframe Cross-Validation:'}</strong>{' '}
                {isZh
                  ? '在交易H1形态前，检查H4是否也出现类似信号。如果H1看涨Engulfing但H4是大阴线，谨慎交易。多时间框架一致时假信号概率降低70%。'
                  : 'Before trading H1 pattern, check if H4 also shows similar signal. If H1 bullish Engulfing but H4 is large bearish candle, trade cautiously. When multiple timeframes align, false signal probability reduces 70%.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 严格止损保护：' : '4. Strict Stop-Loss Protection:'}</strong>{' '}
                {isZh
                  ? '即使形态看起来完美，仍设置止损（形态高低点外10-15点）。假信号无法完全避免，止损是最后防线。不要因为"形态完美"就扩大止损或不设止损。'
                  : 'Even if pattern looks perfect, still set stop-loss (10-15 pips beyond pattern high/low). False signals can\'t be completely avoided, stop-loss is last line of defense. Don\'t widen stops or skip stops because "pattern is perfect".'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '5. 记录和复盘：' : '5. Record and Review:'}</strong>{' '}
                {isZh
                  ? '记录每次形态交易（截图、形态类型、入场理由、结果）。定期复盘，分析哪些类型的形态在你的交易中成功率高，哪些容易失败。逐步建立个人的"高胜率形态库"。'
                  : 'Record each pattern trade (screenshot, pattern type, entry reason, result). Regular review, analyze which pattern types have high success rate in your trading, which easily fail. Gradually build personal "high win rate pattern library".'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Practical Cases */}
      <section id="practical-cases" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '实战案例分析' : 'Practical Case Studies'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '案例1：EUR/USD完美看涨吞没（H4图）' : 'Case 1: EUR/USD Perfect Bullish Engulfing (H4 Chart)'}
            </h3>
            <div className="space-y-2 text-gray-300 dark:text-gray-300 text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '市场背景：' : 'Market Context:'}</strong>{' '}
                {isZh
                  ? '2024年1月18日，EUR/USD在H4图表经历3天下跌（从1.0950跌至1.0850），触及1.0850关键支撑位（前低+整数关口）。'
                  : 'Jan 18, 2024, EUR/USD on H4 chart experienced 3-day decline (1.0950 to 1.0850), touched 1.0850 key support (previous low + round number).'}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '形态分析：' : 'Pattern Analysis:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? 'H4出现标准看涨吞没：第一根阴线（1.0855-1.0850），第二根大阳线（1.0848-1.0895）' : 'H4 standard bullish engulfing: first bearish (1.0855-1.0850), second large bullish (1.0848-1.0895)'}</li>
                <li className="text-gray-300">{isZh ? '吞没比例：阳线47点 vs 阴线5点，比例9:1（极强）' : 'Engulfing ratio: bullish 47 pips vs bearish 5 pips, ratio 9:1 (extremely strong)'}</li>
                <li className="text-gray-300">{isZh ? '位置完美：在关键支撑1.0850，D1图也显示该位是前低' : 'Perfect location: at key support 1.0850, D1 also shows this is previous low'}</li>
                <li className="text-gray-300">{isZh ? 'D1趋势：上升趋势（价格在50EMA上方），短期回调' : 'D1 trend: uptrend (price above 50EMA), short-term pullback'}</li>
                <li className="text-gray-300">{isZh ? '下一根H4：阳线收盘1.0910，确认反转' : 'Next H4: bullish candle closes 1.0910, confirms reversal'}</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '交易执行：' : 'Trade Execution:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? '入场：1.0895（吞没K线收盘后，或等待下一根阳线确认后1.0910）' : 'Entry: 1.0895 (after engulfing closes, or wait for next bullish confirmation 1.0910)'}</li>
                <li className="text-gray-300">{isZh ? '止损：1.0835（吞没形态低点1.0848下方15点，风险60点）' : 'Stop: 1.0835 (15 pips below engulfing low 1.0848, risk 60 pips)'}</li>
                <li className="text-gray-300">{isZh ? '止盈：1.1015（前高阻力，目标120点，1:2风险回报比）' : 'Target: 1.1015 (previous high resistance, target 120 pips, 1:2 risk-reward)'}</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '交易结果：' : 'Trade Result:'}</strong>{' '}
                {isZh
                  ? '价格反弹至1.1010触及止盈，盈利115点。持仓2天（6根H4 K线）。风险60点，收益115点，风险回报比1:1.92。'
                  : 'Price bounced to 1.1010 hitting target, profit 115 pips. Held 2 days (6 H4 candles). Risk 60 pips, reward 115 pips, 1:1.92 risk-reward.'}
              </p>
              <p className="text-green-600 dark:text-green-400 font-bold mt-2">
                {isZh ? '✅ 成功因素：关键支撑位 + 标准吞没（比例9:1） + 顺应D1趋势 + 下一根K线确认' : '✅ Success Factors: Key support + Standard engulfing (9:1 ratio) + Aligns with D1 trend + Next candle confirmation'}
              </p>
            </div>
          </div>

          <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '案例2：GBP/USD Pin Bar反转（H1图）' : 'Case 2: GBP/USD Pin Bar Reversal (H1 Chart)'}
            </h3>
            <div className="space-y-2 text-gray-300 dark:text-gray-300 text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '市场背景：' : 'Market Context:'}</strong>{' '}
                {isZh
                  ? '2024年1月20日，GBP/USD在H1图表上涨至1.2750阻力位（前高），随后出现看跌Pin Bar（Shooting Star）。'
                  : 'Jan 20, 2024, GBP/USD on H1 chart rose to 1.2750 resistance (previous high), then bearish Pin Bar (Shooting Star) appeared.'}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '形态分析：' : 'Pattern Analysis:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? 'Pin Bar特征：小实体（5点），长上影线（35点），几乎无下影线' : 'Pin Bar characteristics: small body (5 pips), long upper shadow (35 pips), almost no lower shadow'}</li>
                <li className="text-gray-300">{isZh ? '影线与实体比例：35:5 = 7:1（标准Pin Bar要求≥2:1）' : 'Shadow to body ratio: 35:5 = 7:1 (standard Pin Bar requires ≥2:1)'}</li>
                <li className="text-gray-300">{isZh ? '位置：精确触及1.2750前高阻力' : 'Location: exactly touched 1.2750 previous high resistance'}</li>
                <li className="text-gray-300">{isZh ? 'H4趋势：无明确趋势，横盘1.2650-1.2750两天' : 'H4 trend: no clear trend, ranging 1.2650-1.2750 for two days'}</li>
                <li className="text-gray-300">{isZh ? '下一根H1：阴线收盘1.2735，确认拒绝' : 'Next H1: bearish candle closes 1.2735, confirms rejection'}</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '交易执行：' : 'Trade Execution:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? '入场：1.2740（Pin Bar收盘）或1.2735（下一根阴线确认后）' : 'Entry: 1.2740 (Pin Bar close) or 1.2735 (after next bearish confirmation)'}</li>
                <li className="text-gray-300">{isZh ? '止损：1.2760（Pin Bar高点上方10点，风险25点）' : 'Stop: 1.2760 (10 pips above Pin Bar high, risk 25 pips)'}</li>
                <li className="text-gray-300">{isZh ? '止盈：1.2690（区间下沿支撑，目标50点，1:2风险回报比）' : 'Target: 1.2690 (range bottom support, target 50 pips, 1:2 risk-reward)'}</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '交易结果：' : 'Trade Result:'}</strong>{' '}
                {isZh
                  ? '价格下跌至1.2692，接近止盈。手动平仓获利48点。持仓5小时。风险25点，收益48点，风险回报比1:1.92。'
                  : 'Price fell to 1.2692, near target. Manually closed profit 48 pips. Held 5 hours. Risk 25 pips, reward 48 pips, 1:1.92 risk-reward.'}
              </p>
              <p className="text-green-600 dark:text-green-400 font-bold mt-2">
                {isZh ? '✅ 成功因素：在前高阻力 + 标准Pin Bar（7:1比例） + 下一根K线确认拒绝' : '✅ Success Factors: At previous high resistance + Standard Pin Bar (7:1 ratio) + Next candle confirms rejection'}
              </p>
            </div>
          </div>

          <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '案例3：USD/JPY假吞没失败教训（M15图）' : 'Case 3: USD/JPY False Engulfing Failure Lesson (M15 Chart)'}
            </h3>
            <div className="space-y-2 text-gray-300 dark:text-gray-300 text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '市场背景：' : 'Market Context:'}</strong>{' '}
                {isZh
                  ? '2024年1月22日，USD/JPY在M15图表上涨至148.50，出现看跌吞没形态。交易者认为是顶部反转信号，做空入场。'
                  : 'Jan 22, 2024, USD/JPY on M15 chart rose to 148.50, bearish engulfing appeared. Trader thought it was top reversal signal, shorted.'}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '错误分析：' : 'Error Analysis:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? '形态：看跌吞没（第一根小阳线10点，第二根阴线18点，比例1.8:1）' : 'Pattern: bearish engulfing (first small bullish 10 pips, second bearish 18 pips, ratio 1.8:1)'}</li>
                <li className="text-gray-300">{isZh ? '位置：148.50无关紧要位置（前高在149.00，距离50点）' : 'Location: 148.50 irrelevant position (previous high at 149.00, 50 pips away)'}</li>
                <li className="text-gray-300">{isZh ? 'H1趋势：强劲上升趋势（从147.50涨至148.50，持续上涨）' : 'H1 trend: strong uptrend (147.50 to 148.50, continuous rise)'}</li>
                <li className="text-gray-300">{isZh ? 'H4趋势：也是上升趋势，价格在20EMA上方30点' : 'H4 trend: also uptrend, price 30 pips above 20EMA'}</li>
                <li className="text-gray-300">{isZh ? '时间框架：仅在M15出现，H1无对应看跌信号' : 'Timeframe: only on M15, no corresponding bearish signal on H1'}</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '交易执行：' : 'Trade Execution:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? '入场：148.48（吞没收盘后立即做空）' : 'Entry: 148.48 (immediately shorted after engulfing close)'}</li>
                <li className="text-gray-300">{isZh ? '止损：148.68（吞没高点上方，风险20点）' : 'Stop: 148.68 (above engulfing high, risk 20 pips)'}</li>
                <li className="text-gray-300">{isZh ? '止盈目标：148.08（预期40点，1:2风险回报比）' : 'Target: 148.08 (expected 40 pips, 1:2 risk-reward)'}</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '交易结果：' : 'Trade Result:'}</strong>{' '}
                {isZh
                  ? '价格短暂下跌至148.40后立即反弹，触发止损148.68，亏损20点。随后价格继续上涨至148.90（如果做多可盈利42点）。'
                  : 'Price briefly fell to 148.40 then immediately bounced, hit stop 148.68, loss 20 pips. Price then continued rising to 148.90 (could have profited 42 pips if long).'}
              </p>
              <p className="text-red-600 dark:text-red-400 font-bold mt-2">
                {isZh ? '❌ 失败原因：' : '❌ Failure Reasons:'}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? '逆势交易（在H1/H4上升趋势中做空）' : 'Counter-trend trading (shorting in H1/H4 uptrend)'}</li>
                <li className="text-gray-300">{isZh ? '位置错误（148.50非关键阻力，距离前高149.00还有50点）' : 'Wrong location (148.50 not key resistance, still 50 pips from previous high 149.00)'}</li>
                <li className="text-gray-300">{isZh ? '仅依赖M15小时间框架，忽视H1/H4趋势' : 'Only relied on M15 small timeframe, ignored H1/H4 trend)'}</li>
                <li className="text-gray-300">{isZh ? '吞没比例不够强（1.8:1，建议≥2:1）' : 'Engulfing ratio not strong enough (1.8:1, recommended ≥2:1)'}</li>
                <li className="text-gray-300">{isZh ? '没有等待H1确认信号' : 'Didn\'t wait for H1 confirmation signal'}</li>
              </ul>
              <p className="text-yellow-600 dark:text-yellow-400 font-bold mt-2">
                {isZh ? '📚 教训：永远不要逆势交易M15形态，必须H1/H4趋势支持' : '📚 Lesson: Never counter-trend trade M15 patterns, must have H1/H4 trend support'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
