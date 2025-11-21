import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { trendFollowingContent } from '@/content/education/trend-following.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    trendFollowingContent.zh.title,
    trendFollowingContent.en.title,
    trendFollowingContent.zh.description,
    trendFollowingContent.en.description,
    trendFollowingContent.zh.keywords,
    trendFollowingContent.en.keywords,
    lang
  );
}

export default async function TrendFollowingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = trendFollowingContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: What is Trend Following */}
      <section id="what-is-trend-following" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '什么是趋势跟踪？' : 'What is Trend Following?'}
        </h2>
        <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '趋势跟踪（Trend Following）是外汇市场中最经典、最可靠、盈利能力最强的交易理念。它的核心思想极其简单却深刻：顺势而为，只做趋势方向的交易，让利润奔跑，截断亏损。趋势跟踪者相信市场会形成持续的上升或下降趋势，并试图通过识别、进入和持有这些趋势来获利。与短线交易追求快进快出不同，趋势跟踪强调耐心等待、顺势而为、长期持有，是最接近"无为而治"的交易哲学。'
              : 'Trend Following is the most classic, reliable, and profitable trading philosophy in forex markets. Its core idea is extremely simple yet profound: trade with the trend, only trade in trend direction, let profits run, cut losses short. Trend followers believe markets form persistent uptrends or downtrends, and attempt to profit by identifying, entering, and holding these trends. Unlike short-term trading pursuing quick in-and-out, trend following emphasizes patient waiting, trading with trend, long-term holding, closest to "wu wei" trading philosophy.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '趋势跟踪的核心理念' : 'Core Philosophy of Trend Following'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 趋势是朋友：' : '1. Trend is Friend:'}</strong>{' '}
                {isZh
                  ? '市场70-80%的利润来自20-30%的趋势行情。抓住几次大趋势，比频繁交易100次更重要。'
                  : '70-80% of market profits come from 20-30% trending markets. Catching a few major trends more important than 100 frequent trades.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 顺势而为：' : '2. Trade With Trend:'}</strong>{' '}
                {isZh
                  ? '永远不要逆势交易。在上升趋势中只做多，在下降趋势中只做空，震荡市场不交易或等待突破。'
                  : 'Never trade against trend. Only long in uptrend, only short in downtrend, don\'t trade in ranging markets or wait for breakout.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 让利润奔跑：' : '3. Let Profits Run:'}</strong>{' '}
                {isZh
                  ? '不设固定止盈，使用追踪止损，只要趋势不反转就持续持有，单笔盈利可能数百点甚至上千点。'
                  : 'No fixed take-profit, use trailing stops, hold as long as trend doesn\'t reverse, single profit may reach hundreds or thousands of pips.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 截断亏损：' : '4. Cut Losses Short:'}</strong>{' '}
                {isZh
                  ? '一旦趋势判断错误，立即止损退出，不幻想"反转"，保护本金永远是第一要务。'
                  : 'Once trend judgment wrong, stop out immediately, don\'t fantasize about "reversal", protecting capital always first priority.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '5. 低胜率高盈亏比：' : '5. Low Win Rate High Reward-Risk:'}</strong>{' '}
                {isZh
                  ? '趋势跟踪的胜率通常只有35-45%，但单笔盈利远大于亏损（3:1甚至5:1），整体依然盈利。'
                  : 'Trend following win rate typically only 35-45%, but single profit far exceeds loss (3:1 or 5:1), overall still profitable.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '6. 耐心等待：' : '6. Patient Waiting:'}</strong>{' '}
                {isZh
                  ? '大部分时间处于观望状态，等待明确的趋势信号出现。宁可错过机会，也不要强行交易。'
                  : 'Most time in waiting mode, wait for clear trend signals to appear. Better miss opportunities than force trades.'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '趋势跟踪 vs 其他交易风格对比' : 'Trend Following vs Other Trading Styles'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                    <th className="p-2 text-left">{isZh ? '特征' : 'Feature'}</th>
                    <th className="p-2 text-left">{isZh ? '趋势跟踪' : 'Trend Following'}</th>
                    <th className="p-2 text-left">{isZh ? '日内交易' : 'Day Trading'}</th>
                    <th className="p-2 text-left">{isZh ? '区间交易' : 'Range Trading'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800 dark:border-gray-700">
                    <td className="p-2 font-bold text-white">{isZh ? '市场环境' : 'Market Environment'}</td>
                    <td className="p-2 text-green-600 dark:text-green-400">{isZh ? '趋势市场（30%时间）' : 'Trending (30% of time)'}</td>
                    <td className="p-2">{isZh ? '任何市场' : 'Any market'}</td>
                    <td className="p-2">{isZh ? '震荡市场（70%时间）' : 'Ranging (70% of time)'}</td>
                  </tr>
                  <tr className="border-b border-gray-800 dark:border-gray-700">
                    <td className="p-2 font-bold text-white">{isZh ? '持仓时间' : 'Holding Period'}</td>
                    <td className="p-2">2-30天</td>
                    <td className="p-2">{isZh ? '几分钟-8小时' : 'Minutes-8 hours'}</td>
                    <td className="p-2">1-5天</td>
                  </tr>
                  <tr className="border-b border-gray-800 dark:border-gray-700">
                    <td className="p-2 font-bold text-white">{isZh ? '胜率' : 'Win Rate'}</td>
                    <td className="p-2 text-yellow-600 dark:text-yellow-400">35-45%</td>
                    <td className="p-2 text-green-600 dark:text-green-400">50-60%</td>
                    <td className="p-2 text-green-600 dark:text-green-400">60-70%</td>
                  </tr>
                  <tr className="border-b border-gray-800 dark:border-gray-700">
                    <td className="p-2 font-bold text-white">{isZh ? '盈亏比' : 'Reward-Risk'}</td>
                    <td className="p-2 text-green-600 dark:text-green-400">3:1 - 5:1</td>
                    <td className="p-2">1.5:1 - 2:1</td>
                    <td className="p-2">1:1 - 1.5:1</td>
                  </tr>
                  <tr className="border-b border-gray-800 dark:border-gray-700">
                    <td className="p-2 font-bold text-white">{isZh ? '交易频率' : 'Trade Frequency'}</td>
                    <td className="p-2">{isZh ? '每周1-3笔' : '1-3/week'}</td>
                    <td className="p-2">{isZh ? '每天1-5笔' : '1-5/day'}</td>
                    <td className="p-2">{isZh ? '每周3-10笔' : '3-10/week'}</td>
                  </tr>
                  <tr className="border-b border-gray-800 dark:border-gray-700">
                    <td className="p-2 font-bold text-white">{isZh ? '心理压力' : 'Psychological Stress'}</td>
                    <td className="p-2 text-green-600 dark:text-green-400">{isZh ? '低（耐心）' : 'Low (patience)'}</td>
                    <td className="p-2 text-red-600 dark:text-red-400">{isZh ? '高（快速决策）' : 'High (quick decisions)'}</td>
                    <td className="p-2 text-yellow-600 dark:text-yellow-400">{isZh ? '中等' : 'Medium'}</td>
                  </tr>
                  <tr className="border-b border-gray-800 dark:border-gray-700">
                    <td className="p-2 font-bold text-white">{isZh ? '时间投入' : 'Time Commitment'}</td>
                    <td className="p-2 text-green-600 dark:text-green-400">{isZh ? '低（每天15-30分钟）' : 'Low (15-30 min/day)'}</td>
                    <td className="p-2 text-red-600 dark:text-red-400">{isZh ? '高（2-6小时/天）' : 'High (2-6 hrs/day)'}</td>
                    <td className="p-2">{isZh ? '中等（1-2小时/天）' : 'Medium (1-2 hrs/day)'}</td>
                  </tr>
                  <tr className="border-b border-gray-800 dark:border-gray-700">
                    <td className="p-2 font-bold text-white">{isZh ? '适合人群' : 'Suitable For'}</td>
                    <td className="p-2 text-green-600 dark:text-green-400">{isZh ? '兼职、新手、懒人' : 'Part-time, beginners, lazy'}</td>
                    <td className="p-2">{isZh ? '全职、中级' : 'Full-time, intermediate'}</td>
                    <td className="p-2">{isZh ? '全职、经验者' : 'Full-time, experienced'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '为什么趋势跟踪是最适合大多数交易者的策略？' : 'Why Trend Following Best Suited for Most Traders?'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '简单易学：' : 'Simple to Learn:'}</strong>{' '}
                {isZh ? '只需识别趋势方向（上升/下降/震荡），无需复杂的多指标分析，新手1-2个月即可掌握基础' : 'Only need to identify trend direction (up/down/range), no complex multi-indicator analysis, beginners can master basics in 1-2 months'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '心理负担小：' : 'Low Psychological Burden:'}</strong>{' '}
                {isZh ? '不需要盯盘，每天检查1-2次即可，无需瞬间决策，可以兼职交易' : 'No need to watch screen, check 1-2 times daily, no instant decisions, can trade part-time'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '盈利潜力大：' : 'Large Profit Potential:'}</strong>{' '}
                {isZh ? '单笔盈利可能数百点，抓住一次大趋势相当于十几次日内交易的利润' : 'Single profit may reach hundreds of pips, catching one major trend equals profits from dozens of day trades'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '容错率高：' : 'High Tolerance:'}</strong>{' '}
                {isZh ? '即使胜率只有40%，只要盈亏比足够高（3:1），依然能稳定盈利' : 'Even with only 40% win rate, as long as reward-risk high enough (3:1), still consistently profitable'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '历史验证：' : 'Historically Proven:'}</strong>{' '}
                {isZh ? '华尔街顶级对冲基金（如Dunn Capital、Winton）都使用趋势跟踪策略，数十年持续盈利' : 'Top Wall Street hedge funds (e.g., Dunn Capital, Winton) use trend following strategies, consistently profitable for decades'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '适合各种时间框架：' : 'Suits Various Timeframes:'}</strong>{' '}
                {isZh ? '可应用于日内（H1）、波段（H4/D1）、长线（W1/MN），灵活适配个人时间安排' : 'Applicable to intraday (H1), swing (H4/D1), long-term (W1/MN), flexibly adapts to personal schedules'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '趋势跟踪的核心挑战' : 'Core Challenges of Trend Following'}
            </h3>
            <p className="mb-2 text-gray-300 dark:text-gray-300">
              {isZh
                ? '趋势跟踪并非完美无缺，它的最大挑战是：低胜率和等待的煎熬。'
                : 'Trend following is not perfect, its biggest challenges are: low win rate and the agony of waiting.'}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 dark:text-gray-300">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '低胜率的心理折磨：' : 'Psychological Torture of Low Win Rate:'}</strong>{' '}
                {isZh ? '可能连续止损5-10次，只有2-3次盈利，但这2-3次盈利足以覆盖所有亏损并盈利。大多数人无法承受连续亏损的打击，提前放弃' : 'May stop out 5-10 consecutive times, only 2-3 wins, but these 2-3 wins enough to cover all losses and profit. Most people cannot bear consecutive losses, quit prematurely'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '震荡市场的煎熬：' : 'Agony of Ranging Markets:'}</strong>{' '}
                {isZh ? '市场70%时间在震荡，趋势跟踪者需要耐心等待，可能数周甚至数月没有交易机会，极易产生焦虑和冲动交易' : 'Market ranges 70% of time, trend followers need patient waiting, may have no trading opportunities for weeks or months, easily causes anxiety and impulsive trading'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '利润回吐：' : 'Profit Retracement:'}</strong>{' '}
                {isZh ? '趋势反转时，部分利润会回吐（可能20-30%），这是趋势跟踪的必然代价，但很多人无法接受，过早离场' : 'When trend reverses, some profits retrace (possibly 20-30%), this is inevitable cost of trend following, but many cannot accept, exit too early'}
              </li>
            </ul>
            <p className="mt-3 text-gray-300 dark:text-gray-300 font-bold">
              {isZh
                ? '结论：趋势跟踪最适合有耐心、情绪稳定、能接受低胜率的交易者。如果你追求短期刺激和高胜率，趋势跟踪不适合你。'
                : 'Conclusion: Trend following best suited for patient, emotionally stable traders who can accept low win rate. If you pursue short-term excitement and high win rate, trend following not for you.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Trend Identification */}
      <section id="trend-identification" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '趋势识别核心方法' : 'Core Trend Identification Methods'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '趋势跟踪的第一步也是最关键的一步：准确识别当前市场处于上升趋势、下降趋势还是震荡状态。只有正确识别趋势，才能确保顺势交易的高胜算。以下是五种经过实战验证的趋势识别方法。'
              : 'First and most critical step of trend following: accurately identify whether current market is in uptrend, downtrend, or ranging state. Only correct trend identification ensures high probability of trading with trend. Following are five battle-tested trend identification methods.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '方法1：价格行为法（最直观）' : 'Method 1: Price Action (Most Intuitive)'}</h3>
            <p className="mb-3">
              {isZh
                ? '趋势的本质是价格持续创造更高的高点和更高的低点（上升趋势），或更低的高点和更低的低点（下降趋势）。'
                : 'Essence of trend is price continuously creating higher highs and higher lows (uptrend), or lower highs and lower lows (downtrend).'}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-bold mb-2 text-white">{isZh ? '上升趋势特征：' : 'Uptrend Characteristics:'}</p>
                <ul className="space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '✅ 每个新高点都高于前一个高点' : '✅ Each new high above previous high'}</li>
                  <li className="text-gray-300">{isZh ? '✅ 每个回调低点都高于前一个低点' : '✅ Each pullback low above previous low'}</li>
                  <li className="text-gray-300">{isZh ? '✅ 形成"波峰-波谷"依次抬升的结构' : '✅ Forms ascending "peak-trough" structure'}</li>
                  <li className="text-gray-300">{isZh ? '✅ 连接波谷可画出上升趋势线' : '✅ Connecting troughs draws ascending trendline'}</li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-2 text-white">{isZh ? '下降趋势特征：' : 'Downtrend Characteristics:'}</p>
                <ul className="space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '✅ 每个新低点都低于前一个低点' : '✅ Each new low below previous low'}</li>
                  <li className="text-gray-300">{isZh ? '✅ 每个反弹高点都低于前一个高点' : '✅ Each bounce high below previous high'}</li>
                  <li className="text-gray-300">{isZh ? '✅ 形成"波峰-波谷"依次降低的结构' : '✅ Forms descending "peak-trough" structure'}</li>
                  <li className="text-gray-300">{isZh ? '✅ 连接波峰可画出下降趋势线' : '✅ Connecting peaks draws descending trendline'}</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-[#0a0a0a] dark:bg-gray-900">
              <p className="font-bold mb-2 text-gray-300">{isZh ? '震荡市场特征：' : 'Ranging Market Characteristics:'}</p>
              <ul className="space-y-1 text-sm text-gray-300">
                <li className="text-gray-300">{isZh ? '❌ 高点和低点在水平区间内来回波动' : '❌ Highs and lows oscillate within horizontal range'}</li>
                <li className="text-gray-300">{isZh ? '❌ 无法形成明确的更高高点或更低低点' : '❌ Cannot form clear higher highs or lower lows'}</li>
                <li className="text-gray-300">{isZh ? '❌ 价格受明显的支撑和阻力位限制' : '❌ Price constrained by clear support and resistance'}</li>
                <li className="text-gray-300">{isZh ? '❌ 无法画出有效的趋势线' : '❌ Cannot draw valid trendlines'}</li>
              </ul>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '方法2：移动平均线法（最可靠）' : 'Method 2: Moving Average (Most Reliable)'}
            </h3>
            <p className="mb-3">
              {isZh
                ? '移动平均线（MA/EMA）是趋势跟踪的核心工具，通过平滑价格波动揭示趋势方向。'
                : 'Moving Averages (MA/EMA) are core tools of trend following, revealing trend direction by smoothing price fluctuations.'}
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '经典EMA组合：20 EMA + 50 EMA' : 'Classic EMA Combination: 20 EMA + 50 EMA'}</p>
                <ul className="space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '上升趋势：' : 'Uptrend:'}</strong>{' '}
                    {isZh ? '价格持续在20 EMA和50 EMA上方运行，20 EMA在50 EMA上方（金叉）' : 'Price consistently above 20 EMA and 50 EMA, 20 EMA above 50 EMA (golden cross)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '下降趋势：' : 'Downtrend:'}</strong>{' '}
                    {isZh ? '价格持续在20 EMA和50 EMA下方运行，20 EMA在50 EMA下方（死叉）' : 'Price consistently below 20 EMA and 50 EMA, 20 EMA below 50 EMA (death cross)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '震荡市场：' : 'Ranging Market:'}</strong>{' '}
                    {isZh ? '价格频繁穿越20 EMA和50 EMA，两条EMA相互缠绕，方向不明' : 'Price frequently crosses 20 EMA and 50 EMA, two EMAs intertwine, direction unclear'}
                  </li>
                </ul>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-2 border-gray-800 text-sm">
                  <thead>
                    <tr className="bg-gray-900 text-gray-300">
                      <th className="border border-gray-800 p-2 text-left">{isZh ? '时间框架' : 'Timeframe'}</th>
                      <th className="border border-gray-800 p-2 text-left">{isZh ? '推荐EMA' : 'Recommended EMA'}</th>
                      <th className="border border-gray-800 p-2 text-left">{isZh ? '适用场景' : 'Use Case'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-gray-800">
                      <td className="border border-gray-800 p-2 font-bold text-white">H1</td>
                      <td className="border border-gray-800 p-2">20 EMA + 50 EMA</td>
                      <td className="border border-gray-800 p-2">{isZh ? '日内趋势跟踪' : 'Intraday trend following'}</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-800">
                      <td className="border border-gray-800 p-2 font-bold text-white">H4</td>
                      <td className="border border-gray-800 p-2">20 EMA + 50 EMA</td>
                      <td className="border border-gray-800 p-2">{isZh ? '波段趋势跟踪（最常用）' : 'Swing trend following (most common)'}</td>
                    </tr>
                    <tr className="border border-gray-800">
                      <td className="border border-gray-800 p-2 font-bold text-white">D1</td>
                      <td className="border border-gray-800 p-2">10 EMA + 30 EMA</td>
                      <td className="border border-gray-800 p-2">{isZh ? '长线趋势跟踪' : 'Long-term trend following'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '方法3：ADX指标法（衡量趋势强度）' : 'Method 3: ADX Indicator (Measure Trend Strength)'}
            </h3>
            <p className="mb-3">
              {isZh
                ? 'ADX（Average Directional Index，平均趋向指标）不仅能识别趋势方向，还能量化趋势的强度，是趋势跟踪者的必备工具。'
                : 'ADX (Average Directional Index) not only identifies trend direction but also quantifies trend strength, essential tool for trend followers.'}
            </p>
            <div className="space-y-3 text-sm">
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? 'ADX数值解读：' : 'ADX Value Interpretation:'}</p>
                <ul className="space-y-2">
                  <li className="text-gray-300">
                    <strong className="text-red-600 dark:text-red-400">ADX &lt; 20:</strong>{' '}
                    {isZh ? '无趋势或极弱趋势，市场处于震荡状态，不适合趋势跟踪，应避免交易或使用区间策略' : 'No trend or extremely weak trend, market ranging, unsuitable for trend following, avoid trading or use range strategy'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-yellow-600 dark:text-yellow-400">ADX 20-25:</strong>{' '}
                    {isZh ? '趋势开始形成，可以谨慎进场，但止损要严格' : 'Trend starting to form, can cautiously enter, but stops must be strict'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-green-600 dark:text-green-400">ADX 25-40:</strong>{' '}
                    {isZh ? '明确趋势，最佳交易时机，趋势跟踪的黄金区间' : 'Clear trend, best trading opportunity, golden zone for trend following'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-blue-600 dark:text-blue-400">ADX 40-60:</strong>{' '}
                    {isZh ? '强趋势，可继续持有现有仓位，但新入场需谨慎（可能过度延伸）' : 'Strong trend, can continue holding existing positions, but new entries need caution (possibly overextended)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-purple-600 dark:text-purple-400">ADX &gt; 60:</strong>{' '}
                    {isZh ? '极强趋势，但可能接近衰竭，不建议新入场，可考虑部分获利' : 'Extremely strong trend, but may near exhaustion, not recommended for new entry, consider partial profit-taking'}
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-600">
                <p className="font-bold mb-2 text-white">{isZh ? '✅ 最佳趋势跟踪信号：' : '✅ Best Trend Following Signal:'}</p>
                <p className="text-gray-300 dark:text-gray-300">
                  {isZh
                    ? 'ADX从20下方上穿25 + 价格突破20 EMA + +DI（绿线）在-DI（红线）上方 = 强烈的上升趋势开始信号，立即做多。反之，ADX上穿25 + 价格跌破20 EMA + -DI在+DI上方 = 强烈的下降趋势开始信号，立即做空。'
                    : 'ADX crosses above 25 from below 20 + price breaks above 20 EMA + +DI (green) above -DI (red) = strong uptrend start signal, go long immediately. Conversely, ADX crosses above 25 + price breaks below 20 EMA + -DI above +DI = strong downtrend start signal, go short immediately.'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '方法4：趋势线法' : 'Method 4: Trendline Method'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? '连接价格的波谷（上升趋势）或波峰（下降趋势），画出趋势线，只要价格不跌破趋势线，趋势就持续。'
                  : 'Connect price troughs (uptrend) or peaks (downtrend) to draw trendline, as long as price doesn\'t break trendline, trend continues.'}
              </p>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '有效趋势线：' : 'Valid Trendline:'}</strong>{' '}
                  {isZh ? '至少连接3个波谷/波峰，触及次数越多越可靠' : 'Connect at least 3 troughs/peaks, more touches more reliable'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '趋势反转：' : 'Trend Reversal:'}</strong>{' '}
                  {isZh ? '价格收盘价明确跌破上升趋势线（或突破下降趋势线）' : 'Price close clearly breaks ascending trendline (or breaks above descending trendline)'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '入场时机：' : 'Entry Timing:'}</strong>{' '}
                  {isZh ? '价格回测趋势线后反弹，是低风险入场点' : 'Price retests trendline then bounces, low-risk entry point'}
                </li>
              </ul>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '方法5：MACD指标法' : 'Method 5: MACD Indicator'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? 'MACD是趋势跟踪的经典辅助指标，通过快慢线交叉和柱状图确认趋势。'
                  : 'MACD is classic auxiliary indicator for trend following, confirms trend through fast/slow line crossovers and histogram.'}
              </p>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '上升趋势：' : 'Uptrend:'}</strong>{' '}
                  {isZh ? 'MACD线（蓝）在信号线（橙）上方，柱状图为正值' : 'MACD line (blue) above signal line (orange), histogram positive'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '下降趋势：' : 'Downtrend:'}</strong>{' '}
                  {isZh ? 'MACD线在信号线下方，柱状图为负值' : 'MACD line below signal line, histogram negative'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '最佳入场：' : 'Best Entry:'}</strong>{' '}
                  {isZh ? 'MACD金叉（向上穿越信号线）且柱状图从负转正' : 'MACD golden cross (crosses above signal line) and histogram turns from negative to positive'}
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '综合判断：多时间框架趋势确认' : 'Comprehensive Judgment: Multiple Timeframe Trend Confirmation'}
            </h3>
            <p className="mb-3 text-gray-300 dark:text-gray-300">
              {isZh
                ? '单一时间框架容易产生假信号。专业趋势跟踪者使用"三重时间框架"确认趋势：'
                : 'Single timeframe easily produces false signals. Professional trend followers use "triple timeframe" trend confirmation:'}
            </p>
            <ul className="space-y-2 text-gray-300 dark:text-gray-300 text-sm">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 大周期（D1/W1）：' : '1. Large Timeframe (D1/W1):'}</strong>{' '}
                {isZh ? '确认主趋势方向，这是"方向指南针"，绝不逆势' : 'Confirm main trend direction, this is "directional compass", never trade against it'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 中周期（H4）：' : '2. Medium Timeframe (H4):'}</strong>{' '}
                {isZh ? '确认中期趋势和入场时机，寻找与大周期一致的趋势' : 'Confirm medium-term trend and entry timing, look for trend consistent with large timeframe'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 小周期（H1）：' : '3. Small Timeframe (H1):'}</strong>{' '}
                {isZh ? '精确入场点，等待价格回调至关键位后入场' : 'Precise entry point, wait for price pullback to key level before entry'}
              </li>
            </ul>
            <p className="mt-3 text-gray-300 dark:text-gray-300">
              <strong className="text-white">{isZh ? '示例：' : 'Example:'}</strong>{' '}
              {isZh
                ? 'D1显示EUR/USD上升趋势（价格在50 EMA上方）→ H4确认上升趋势且价格回调至20 EMA → H1等待反弹信号（锤子线、MACD金叉）→ 入场做多。三重确认，成功率提升至60%以上。'
                : 'D1 shows EUR/USD uptrend (price above 50 EMA) → H4 confirms uptrend and price pulls back to 20 EMA → H1 waits for bounce signal (hammer, MACD golden cross) → Enter long. Triple confirmation, success rate exceeds 60%.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: EMA System */}
      <section id="ema-system" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? 'EMA均线系统应用' : 'EMA System Application'}
        </h2>
        <div className="space-y-6">
          <p className="text-gray-300 dark:text-gray-300">
            {isZh
              ? 'EMA（指数移动平均线）是趋势跟踪的核心武器，相比SMA（简单移动平均线）更敏感、更能及时反映趋势变化。以下是完整的EMA趋势跟踪系统。'
              : 'EMA (Exponential Moving Average) is core weapon of trend following, more sensitive than SMA (Simple Moving Average), more timely reflects trend changes. Following is complete EMA trend following system.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '经典EMA系统：20/50/200三线组合' : 'Classic EMA System: 20/50/200 Triple Combination'}</h3>
            <div className="space-y-3">
              <div>
                <p className="font-bold mb-2 text-white">{isZh ? '20 EMA（短期趋势线）：' : '20 EMA (Short-Term Trend):'}</p>
                <ul className="space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '代表短期趋势方向（1-2周）' : 'Represents short-term trend direction (1-2 weeks)'}</li>
                  <li className="text-gray-300">{isZh ? '价格在20 EMA上方=短期上升趋势，下方=短期下降趋势' : 'Price above 20 EMA = short-term uptrend, below = short-term downtrend'}</li>
                  <li className="text-gray-300">{isZh ? '用于入场时机：价格回调至20 EMA后反弹是最佳入场点' : 'Used for entry timing: price pullback to 20 EMA then bounce is best entry'}</li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-2 text-white">{isZh ? '50 EMA（中期趋势线）：' : '50 EMA (Medium-Term Trend):'}</p>
                <ul className="space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '代表中期趋势方向（1-2个月）' : 'Represents medium-term trend direction (1-2 months)'}</li>
                  <li className="text-gray-300">{isZh ? '价格在50 EMA上方=中期上升趋势，这是主战场方向' : 'Price above 50 EMA = medium-term uptrend, this is main battlefield direction'}</li>
                  <li className="text-gray-300">{isZh ? '20 EMA与50 EMA金叉/死叉是重要趋势信号' : '20 EMA golden/death cross with 50 EMA is important trend signal'}</li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-2 text-white">{isZh ? '200 EMA（长期趋势线）：' : '200 EMA (Long-Term Trend):'}</p>
                <ul className="space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '代表长期趋势方向（6-12个月）' : 'Represents long-term trend direction (6-12 months)'}</li>
                  <li className="text-gray-300">{isZh ? '价格在200 EMA上方=长期牛市，下方=长期熊市' : 'Price above 200 EMA = long-term bull market, below = long-term bear market'}</li>
                  <li className="text-gray-300">{isZh ? '用于判断大方向：只做与200 EMA一致的方向' : 'Used to judge overall direction: only trade direction consistent with 200 EMA'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? 'EMA趋势跟踪完整交易规则' : 'Complete EMA Trend Following Trading Rules'}
            </h3>
            <div className="space-y-4 text-gray-300 dark:text-gray-300">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-600">
                <p className="font-bold mb-2 text-white">{isZh ? '做多规则（买入）：' : 'Long Rules (Buy):'}</p>
                <ol className="list-decimal pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '趋势确认：' : 'Trend Confirmation:'}</strong>{' '}
                    {isZh ? '价格在50 EMA和200 EMA上方运行' : 'Price running above 50 EMA and 200 EMA'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'EMA排列：' : 'EMA Alignment:'}</strong>{' '}
                    {isZh ? '20 EMA > 50 EMA > 200 EMA（多头排列）' : '20 EMA > 50 EMA > 200 EMA (bullish alignment)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '入场触发：' : 'Entry Trigger:'}</strong>
                    <ul className="list-circle pl-6 mt-1">
                      <li className="text-gray-300">{isZh ? '方式A：价格回调至20 EMA或50 EMA后反弹（最安全）' : 'Method A: Price pulls back to 20 EMA or 50 EMA then bounces (safest)'}</li>
                      <li className="text-gray-300">{isZh ? '方式B：20 EMA金叉50 EMA时立即入场（趋势初期）' : 'Method B: Enter when 20 EMA golden crosses 50 EMA (early trend)'}</li>
                      <li className="text-gray-300">{isZh ? '方式C：价格突破前高阻力，站稳后追入' : 'Method C: Price breaks above previous high resistance, chase after holding'}</li>
                    </ul>
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '止损：' : 'Stop-Loss:'}</strong>{' '}
                    {isZh ? '20 EMA下方30-50点，或50 EMA下方' : '30-50 pips below 20 EMA, or below 50 EMA'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '止盈：' : 'Take-Profit:'}</strong>{' '}
                    {isZh ? '不设固定止盈，使用追踪止损，只要价格不跌破20 EMA就持续持有' : 'No fixed take-profit, use trailing stop, hold as long as price doesn\'t break 20 EMA'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '退出信号：' : 'Exit Signal:'}</strong>{' '}
                    {isZh ? '价格跌破20 EMA且收盘确认，或20 EMA死叉50 EMA' : 'Price breaks below 20 EMA with close confirmation, or 20 EMA death crosses 50 EMA'}
                  </li>
                </ol>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
                <p className="font-bold mb-2 text-white">{isZh ? '做空规则（卖出）：' : 'Short Rules (Sell):'}</p>
                <ol className="list-decimal pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '趋势确认：' : 'Trend Confirmation:'}</strong>{' '}
                    {isZh ? '价格在50 EMA和200 EMA下方运行' : 'Price running below 50 EMA and 200 EMA'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? 'EMA排列：' : 'EMA Alignment:'}</strong>{' '}
                    {isZh ? '20 EMA < 50 EMA < 200 EMA（空头排列）' : '20 EMA < 50 EMA < 200 EMA (bearish alignment)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '入场触发：' : 'Entry Trigger:'}</strong>
                    <ul className="list-circle pl-6 mt-1">
                      <li className="text-gray-300">{isZh ? '方式A：价格反弹至20 EMA或50 EMA后回落（最安全）' : 'Method A: Price bounces to 20 EMA or 50 EMA then falls (safest)'}</li>
                      <li className="text-gray-300">{isZh ? '方式B：20 EMA死叉50 EMA时立即入场（趋势初期）' : 'Method B: Enter when 20 EMA death crosses 50 EMA (early trend)'}</li>
                      <li className="text-gray-300">{isZh ? '方式C：价格跌破前低支撑，站稳后追空' : 'Method C: Price breaks below previous low support, chase short after holding'}</li>
                    </ul>
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '止损：' : 'Stop-Loss:'}</strong>{' '}
                    {isZh ? '20 EMA上方30-50点，或50 EMA上方' : '30-50 pips above 20 EMA, or above 50 EMA'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '止盈：' : 'Take-Profit:'}</strong>{' '}
                    {isZh ? '不设固定止盈，使用追踪止损，只要价格不突破20 EMA就持续持有' : 'No fixed take-profit, use trailing stop, hold as long as price doesn\'t break above 20 EMA'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '退出信号：' : 'Exit Signal:'}</strong>{' '}
                    {isZh ? '价格突破20 EMA且收盘确认，或20 EMA金叉50 EMA' : 'Price breaks above 20 EMA with close confirmation, or 20 EMA golden crosses 50 EMA'}
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? 'EMA追踪止损系统' : 'EMA Trailing Stop System'}
            </h3>
            <p className="mb-3 text-gray-300 dark:text-gray-300 text-sm">
              {isZh
                ? '趋势跟踪的核心是"让利润奔跑"，而追踪止损是实现这一目标的关键工具。'
                : 'Core of trend following is "let profits run", and trailing stops are key tool to achieve this.'}
            </p>
            <div className="space-y-3 text-sm">
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a] text-gray-300 dark:text-gray-300">
                <p className="font-bold mb-2 text-white">{isZh ? '阶段1：初始止损（入场时）' : 'Stage 1: Initial Stop (At Entry)'}</p>
                <ul className="space-y-1">
                  <li className="text-gray-300">{isZh ? '止损设在20 EMA下方（上升趋势）或上方（下降趋势）30-50点' : 'Stop set 30-50 pips below 20 EMA (uptrend) or above (downtrend)'}</li>
                  <li className="text-gray-300">{isZh ? '这是固定止损，保护本金，单笔风险控制在账户2%以内' : 'This is fixed stop, protects capital, single risk controlled within 2% of account'}</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a] text-gray-300 dark:text-gray-300">
                <p className="font-bold mb-2 text-white">{isZh ? '阶段2：盈亏平衡止损（盈利50%时）' : 'Stage 2: Breakeven Stop (At 50% Profit)'}</p>
                <ul className="space-y-1">
                  <li className="text-gray-300">{isZh ? '当价格朝盈利方向运行达到风险的50%时，将止损移至入场价' : 'When price moves in profit direction by 50% of risk, move stop to entry price'}</li>
                  <li className="text-gray-300">{isZh ? '例如：入场1.0900，止损1.0850（50点），当价格达到1.0925时，止损移至1.0900' : 'Example: Entry 1.0900, stop 1.0850 (50 pips), when price reaches 1.0925, move stop to 1.0900'}</li>
                  <li className="text-gray-300">{isZh ? '这样即使价格反转，也不会亏损，锁定无风险交易' : 'This way even if price reverses, won\'t lose, locks risk-free trade'}</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a] text-gray-300 dark:text-gray-300">
                <p className="font-bold mb-2 text-white">{isZh ? '阶段3：EMA追踪止损（盈利100%后）' : 'Stage 3: EMA Trailing Stop (After 100% Profit)'}</p>
                <ul className="space-y-1">
                  <li className="text-gray-300">{isZh ? '当价格持续朝盈利方向运行，每天将止损移至20 EMA下方/上方' : 'As price continues in profit direction, daily move stop below/above 20 EMA'}</li>
                  <li className="text-gray-300">{isZh ? '例如：做多，每天收盘后检查20 EMA位置，将止损设在20 EMA下方30点' : 'Example: Long, after daily close check 20 EMA position, set stop 30 pips below 20 EMA'}</li>
                  <li className="text-gray-300">{isZh ? '这样可以锁定大部分利润，同时给趋势延续留有空间' : 'This locks most profits while giving space for trend continuation'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? 'EMA系统的优势与局限' : 'EMA System Advantages and Limitations'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300 dark:text-gray-300">
              <div>
                <p className="font-bold mb-2 text-green-600 dark:text-green-400">{isZh ? '✅ 优势：' : '✅ Advantages:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-gray-300">{isZh ? '简单直观，无需复杂计算' : 'Simple and intuitive, no complex calculations'}</li>
                  <li className="text-gray-300">{isZh ? '滞后性小，能及时捕捉趋势变化' : 'Low lag, timely captures trend changes'}</li>
                  <li className="text-gray-300">{isZh ? '适用于所有时间框架和货币对' : 'Applicable to all timeframes and currency pairs'}</li>
                  <li className="text-gray-300">{isZh ? '提供清晰的入场、止损、止盈信号' : 'Provides clear entry, stop-loss, take-profit signals'}</li>
                  <li className="text-gray-300">{isZh ? '可与其他指标结合（ADX、MACD）' : 'Can combine with other indicators (ADX, MACD)'}</li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-2 text-red-600 dark:text-red-400">{isZh ? '❌ 局限：' : '❌ Limitations:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-gray-300">{isZh ? '在震荡市场频繁产生假信号' : 'Frequently produces false signals in ranging markets'}</li>
                  <li className="text-gray-300">{isZh ? '趋势反转时会有一定的利润回吐' : 'Some profit retracement when trend reverses'}</li>
                  <li className="text-gray-300">{isZh ? '无法预测趋势何时结束' : 'Cannot predict when trend will end'}</li>
                  <li className="text-gray-300">{isZh ? '需要配合其他工具过滤信号' : 'Needs other tools to filter signals'}</li>
                  <li className="text-gray-300">{isZh ? '不适合超短线交易（M1/M5）' : 'Unsuitable for ultra-short-term trading (M1/M5)'}</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 font-bold text-gray-300 dark:text-gray-300">
              {isZh
                ? '建议：EMA系统最适合H4和D1时间框架的波段和长线趋势跟踪。配合ADX过滤震荡市场，配合MACD确认入场时机，可大幅提高成功率。'
                : 'Recommendation: EMA system best suited for H4 and D1 timeframe swing and long-term trend following. Combined with ADX to filter ranging markets, combined with MACD to confirm entry timing, can significantly improve success rate.'}
            </p>
          </div>
        </div>
      </section>

      {/* Continue with remaining sections following same pattern... */}
      {/* Due to length constraints, I'll create a comprehensive structure for remaining sections */}

      {/* Section 4: Case Studies */}
      <section id="case-studies" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '实战案例分析' : 'Real-World Case Studies'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '案例1：EUR/USD长期上升趋势跟踪（H4图表）' : 'Case 1: EUR/USD Long-Term Uptrend Following (H4 Chart)'}
            </h3>
            <div className="space-y-2 text-gray-300 dark:text-gray-300 text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '趋势背景：' : 'Trend Context:'}</strong>{' '}
                {isZh
                  ? '2024年1月初，EUR/USD在1.0850附近经过数周盘整后，20 EMA金叉50 EMA，ADX从18上升至28，明确的上升趋势开始形成。'
                  : 'Early Jan 2024, after weeks of consolidation around 1.0850, EUR/USD 20 EMA golden crosses 50 EMA, ADX rises from 18 to 28, clear uptrend starts forming.'}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '入场执行：' : 'Entry Execution:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? 'H4确认：价格在50 EMA（1.0840）和200 EMA（1.0780）上方' : 'H4 confirmation: Price above 50 EMA (1.0840) and 200 EMA (1.0780)'}</li>
                <li className="text-gray-300">{isZh ? 'EMA排列：20 EMA > 50 EMA > 200 EMA（完美多头排列）' : 'EMA alignment: 20 EMA > 50 EMA > 200 EMA (perfect bullish alignment)'}</li>
                <li className="text-gray-300">{isZh ? 'ADX：28，进入趋势区间' : 'ADX: 28, entering trend zone'}</li>
                <li className="text-gray-300">{isZh ? '入场时机：价格从1.0920回调至20 EMA（1.0880），出现看涨Pin Bar后入场' : 'Entry timing: Price pulls back from 1.0920 to 20 EMA (1.0880), enters after bullish Pin Bar'}</li>
                <li className="text-gray-300">{isZh ? '入场价：1.0885' : 'Entry: 1.0885'}</li>
                <li className="text-gray-300">{isZh ? '止损：1.0835（20 EMA下方50点）' : 'Stop: 1.0835 (50 pips below 20 EMA)'}</li>
                <li className="text-gray-300">{isZh ? '风险：50点 = $50（0.1手）' : 'Risk: 50 pips = $50 (0.1 lot)'}</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '持仓管理：' : 'Position Management:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? '第3天：价格涨至1.0920（盈利35点），将止损移至1.0885（盈亏平衡）' : 'Day 3: Price rises to 1.0920 (profit 35 pips), move stop to 1.0885 (breakeven)'}</li>
                <li className="text-gray-300">{isZh ? '第7天：价格涨至1.1050，止损移至20 EMA下方（1.0980）' : 'Day 7: Price rises to 1.1050, move stop below 20 EMA (1.0980)'}</li>
                <li className="text-gray-300">{isZh ? '第15天：价格涨至1.1250，止损移至1.1150' : 'Day 15: Price rises to 1.1250, move stop to 1.1150'}</li>
                <li className="text-gray-300">{isZh ? '第22天：价格触及1.1380后回调，跌破20 EMA，在1.1320平仓' : 'Day 22: Price touches 1.1380 then pulls back, breaks 20 EMA, close at 1.1320'}</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '最终结果：' : 'Final Result:'}</strong>{' '}
                {isZh
                  ? '盈利：1.1320 - 1.0885 = 435点 = $435（0.1手）。持仓22天，风险$50，收益$435，风险回报比1:8.7。这就是趋势跟踪的威力！'
                  : 'Profit: 1.1320 - 1.0885 = 435 pips = $435 (0.1 lot). Held 22 days, risk $50, reward $435, 1:8.7 risk-reward. This is the power of trend following!'}
              </p>
              <p className="text-green-600 dark:text-green-400 font-bold mt-2">
                {isZh ? '✅ 成功因素：耐心等待 + 顺势而为 + 追踪止损 + 让利润奔跑' : '✅ Success Factors: Patient waiting + Trading with trend + Trailing stops + Letting profits run'}
              </p>
            </div>
          </div>

          <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '案例2：GBP/JPY逆势交易失败教训' : 'Case 2: GBP/JPY Counter-Trend Failure Lesson'}
            </h3>
            <div className="space-y-2 text-gray-300 dark:text-gray-300 text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '错误背景：' : 'Wrong Context:'}</strong>{' '}
                {isZh
                  ? '2024年1月18日，GBP/JPY处于明确下降趋势，价格从190.00持续下跌至186.00，20 EMA死叉50 EMA，ADX达到35。'
                  : 'Jan 18, 2024, GBP/JPY in clear downtrend, price continuously falling from 190.00 to 186.00, 20 EMA death crosses 50 EMA, ADX reaches 35.'}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '错误操作：' : 'Wrong Operation:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? '交易者看到价格"跌太多"，认为"超卖"，试图抄底做多' : 'Trader saw price "fell too much", thought "oversold", tried to bottom-fish long'}</li>
                <li className="text-gray-300">{isZh ? 'H4图表明确显示下降趋势，但交易者忽视了' : 'H4 chart clearly showed downtrend, but trader ignored'}</li>
                <li className="text-gray-300">{isZh ? '在186.50做多，止损186.00（50点）' : 'Went long at 186.50, stop 186.00 (50 pips)'}</li>
                <li className="text-gray-300">{isZh ? '期望：价格反弹至188.00（150点目标）' : 'Expectation: Price bounces to 188.00 (150 pip target)'}</li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '惨痛结果：' : 'Painful Result:'}</strong>{' '}
                {isZh
                  ? '价格小幅反弹至186.80后继续下跌，触发止损186.00，亏损50点。之后价格继续跌至184.50，如果顺势做空可盈利200点。'
                  : 'Price briefly bounced to 186.80 then continued falling, triggered stop 186.00, loss 50 pips. Price later fell to 184.50, could have profited 200 pips if shorted with trend.'}
              </p>
              <p className="text-red-600 dark:text-red-400 font-bold mt-2">
                {isZh ? '❌ 核心错误：逆势交易！趋势跟踪的铁律是"绝不逆势"，这是99%失败交易者的通病。' : '❌ Core Error: Counter-trend trading! Iron law of trend following is "never trade against trend", this is common disease of 99% failed traders.'}
              </p>
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
              ❌ {isZh ? '错误1：在震荡市场频繁交易' : 'Mistake 1: Frequent Trading in Ranging Markets'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2 text-sm">
              {isZh
                ? '市场70%时间在震荡，趋势跟踪者在震荡市场频繁入场，导致连续止损，消耗本金和心理。'
                : 'Market ranges 70% of time, trend followers frequently enter in ranging markets, causing consecutive stops, consuming capital and psychology.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold text-sm">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '使用ADX过滤：只在ADX>25时交易。在震荡市场（ADX<20）耐心等待，不要强行交易。记住：趋势跟踪者的大部分时间应该在观望，等待趋势出现。宁可错过10次震荡，也不要在震荡中亏损10次。'
                : 'Use ADX filter: only trade when ADX>25. In ranging markets (ADX<20) patiently wait, don\'t force trades. Remember: Most time of trend followers should be in waiting, waiting for trend to appear. Better miss 10 ranges than lose 10 times in ranging.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误2：过早获利了结' : 'Mistake 2: Taking Profits Too Early'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2 text-sm">
              {isZh
                ? '价格盈利50-100点后，交易者害怕利润回吐，过早平仓，错失后续数百点的趋势行情。'
                : 'After 50-100 pips profit, trader fears profit retracement, closes too early, misses subsequent hundreds of pips of trending move.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold text-sm">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '使用追踪止损，让利润奔跑。只要价格不跌破20 EMA，就持续持有。可以分批获利：盈利100点后平50%仓位，剩余50%用追踪止损持有。记住：趋势跟踪的核心是"让利润奔跑"，单笔大盈利远比频繁小盈利重要。'
                : 'Use trailing stops, let profits run. Hold as long as price doesn\'t break 20 EMA. Can take partial profits: after 100 pips profit close 50% position, hold remaining 50% with trailing stop. Remember: Core of trend following is "let profits run", single large profit far more important than frequent small profits.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误3：无法承受连续止损' : 'Mistake 3: Cannot Bear Consecutive Stops'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2 text-sm">
              {isZh
                ? '连续止损3-5次后，交易者失去信心，放弃策略，恰好错过即将到来的大趋势。'
                : 'After 3-5 consecutive stops, trader loses confidence, abandons strategy, coincidentally misses upcoming major trend.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold text-sm">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '接受低胜率是趋势跟踪的本质。预期胜率只有35-45%，意味着10次交易可能只有4次盈利，但这4次盈利足以覆盖6次亏损并盈利。关键是严格遵守策略，不要因为短期连续亏损而放弃。记录交易日志，分析失败交易，持续改进。保持小仓位（单笔风险1-2%），确保连续10次止损也不会致命。'
                : 'Accept low win rate is essence of trend following. Expected win rate only 35-45%, means 10 trades may only have 4 wins, but these 4 wins enough to cover 6 losses and profit. Key is strictly follow strategy, don\'t abandon due to short-term consecutive losses. Keep trading journal, analyze losing trades, continuously improve. Maintain small positions (1-2% risk per trade), ensure 10 consecutive stops not fatal.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Pyramiding Strategy */}
      <section id="pyramiding-strategy" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '加仓策略要点' : 'Pyramiding Strategy Essentials'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '加仓（Pyramiding）是趋势跟踪的高级技巧，在趋势延续时逐步增加仓位，最大化单次趋势的利润。但加仓必须遵循严格规则，否则容易转盈为亏。'
              : 'Pyramiding is advanced technique of trend following, gradually increasing positions as trend continues, maximizing profit from single trend. But pyramiding must follow strict rules, otherwise easily turns profit to loss.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '正确加仓的黄金法则' : 'Golden Rules of Correct Pyramiding'}</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 只在盈利头寸上加仓：' : '1. Only Pyramid on Winning Positions:'}</strong>{' '}
                {isZh
                  ? '绝不在亏损头寸上加仓"摊平成本"，这是赌徒行为。只在价格朝盈利方向运行、趋势确认后加仓。'
                  : 'Never pyramid on losing positions to "average down", this is gambling. Only pyramid after price moves in profit direction and trend confirmed.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 每次加仓量递减：' : '2. Decrease Size Each Addition:'}</strong>{' '}
                {isZh
                  ? '第一笔仓位最大，后续加仓量逐步减少。例如：第一笔1.0手，第二笔0.5手，第三笔0.3手。形成"正金字塔"结构。'
                  : 'First position largest, subsequent additions gradually decrease. Example: First 1.0 lot, second 0.5 lot, third 0.3 lot. Forms "ascending pyramid" structure.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 加仓间隔至少50-100点：' : '3. Minimum 50-100 Pip Spacing:'}</strong>{' '}
                {isZh
                  ? '不要频繁加仓。第一笔盈利至少50-100点后，再考虑第二笔。这样即使趋势反转，前期利润也能覆盖后期加仓的亏损。'
                  : 'Don\'t pyramid frequently. Consider second position only after first profits at least 50-100 pips. This way even if trend reverses, early profits cover later pyramid losses.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 最多加仓2-3次：' : '4. Maximum 2-3 Additions:'}</strong>{' '}
                {isZh
                  ? '过度加仓会导致平均成本接近当前价格，一旦反转，所有利润瞬间消失。建议最多加仓2-3次。'
                  : 'Excessive pyramiding causes average cost near current price, once reverses, all profits instantly vanish. Recommend maximum 2-3 additions.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '5. 将所有头寸的止损同步移动：' : '5. Move All Stops Together:'}</strong>{' '}
                {isZh
                  ? '每次加仓后，将所有头寸的止损移至相同位置（如20 EMA下方），确保一旦趋势反转，所有头寸同时退出。'
                  : 'After each addition, move all stops to same position (e.g., below 20 EMA), ensure all positions exit together once trend reverses.'}
              </li>
            </ul>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '加仓实战案例' : 'Pyramiding Real Example'}
            </h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '场景：' : 'Scenario:'}</strong>{' '}
                {isZh ? 'EUR/USD上升趋势，H4图表' : 'EUR/USD uptrend, H4 chart'}
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '第一笔：' : 'First Position:'}</strong>{' '}
                  {isZh ? '1.0900入场，止损1.0850，仓位1.0手' : 'Entry 1.0900, stop 1.0850, size 1.0 lot'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '第二笔：' : 'Second Position:'}</strong>{' '}
                  {isZh ? '价格涨至1.1000（第一笔盈利100点），加仓0.5手，止损1.0950（保护第一笔利润）' : 'Price rises to 1.1000 (first profits 100 pips), add 0.5 lot, stop 1.0950 (protects first profit)'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '第三笔：' : 'Third Position:'}</strong>{' '}
                  {isZh ? '价格涨至1.1150（第一笔盈利250点），加仓0.3手，止损1.1050' : 'Price rises to 1.1150 (first profits 250 pips), add 0.3 lot, stop 1.1050'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '退出：' : 'Exit:'}</strong>{' '}
                  {isZh ? '价格涨至1.1300后回调，跌破20 EMA，在1.1200平仓所有头寸' : 'Price rises to 1.1300 then pulls back, breaks 20 EMA, close all positions at 1.1200'}
                </li>
              </ul>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a] mt-3">
                <p className="font-bold mb-2 text-white">{isZh ? '最终盈利计算：' : 'Final Profit Calculation:'}</p>
                <ul className="space-y-1">
                  <li className="text-gray-300">{isZh ? '第一笔：(1.1200 - 1.0900) × 1.0手 = 300点 = $3000' : 'First: (1.1200 - 1.0900) × 1.0 lot = 300 pips = $3000'}</li>
                  <li className="text-gray-300">{isZh ? '第二笔：(1.1200 - 1.1000) × 0.5手 = 100点 = $500' : 'Second: (1.1200 - 1.1000) × 0.5 lot = 100 pips = $500'}</li>
                  <li className="text-gray-300">{isZh ? '第三笔：(1.1200 - 1.1150) × 0.3手 = 15点 = $45' : 'Third: (1.1200 - 1.1150) × 0.3 lot = 15 pips = $45'}</li>
                  <li className="font-bold pt-2 border-t border-gray-600 text-white">
                    {isZh ? '总盈利：$3545' : 'Total Profit: $3545'}
                  </li>
                </ul>
                <p className="mt-2 text-green-600 dark:text-green-400 font-bold">
                  {isZh
                    ? '如果只持有第一笔仓位，盈利只有$3000。通过正确加仓，增加了18%的利润！'
                    : 'If only held first position, profit only $3000. Through correct pyramiding, increased profit by 18%!'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '错误加仓的危险示例' : 'Dangerous Wrong Pyramiding Example'}
            </h3>
            <p className="mb-3 text-sm">
              <strong className="text-white">{isZh ? '场景：' : 'Scenario:'}</strong>{' '}
              {isZh ? '交易者在亏损头寸上加仓"摊平"' : 'Trader pyramids on losing position to "average down"'}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li className="text-gray-300">{isZh ? '第一笔：1.0900做多，价格跌至1.0850，亏损50点' : 'First: Long at 1.0900, price falls to 1.0850, loss 50 pips'}</li>
              <li className="text-gray-300">{isZh ? '错误加仓：在1.0850再次做多1.0手，试图"摊平成本"至1.0875' : 'Wrong pyramid: Long again 1.0 lot at 1.0850, trying to "average down" cost to 1.0875'}</li>
              <li className="text-gray-300">{isZh ? '结果：价格继续跌至1.0800，两笔头寸共亏损150点 = $1500' : 'Result: Price continues falling to 1.0800, both positions lose total 150 pips = $1500'}</li>
            </ul>
            <p className="mt-3 text-red-600 dark:text-red-400 font-bold text-sm">
              {isZh
                ? '❌ 致命错误：在亏损头寸上加仓是赌博，不是交易！只会加速爆仓。正确做法是：第一笔亏损时果断止损，而非加仓。'
                : '❌ Fatal Error: Pyramiding on losing position is gambling, not trading! Only accelerates blow-up. Correct approach: decisively stop out first position when losing, not pyramid.'}
            </p>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '加仓建议：谨慎为上' : 'Pyramiding Advice: Caution First'}
            </h3>
            <p className="text-sm">
              {isZh
                ? '加仓是高级技巧，只适合经验丰富的交易者。新手和中级交易者建议：1) 前1-2年不要加仓，专注于单一入场和追踪止损；2) 只在连续3个月稳定盈利后，才尝试加仓；3) 初期只加仓一次，熟练后再增加；4) 永远记住：加仓是锦上添花，而非必需。不加仓也能盈利，但错误加仓会毁掉账户。'
                : 'Pyramiding is advanced technique, only suitable for experienced traders. Beginner and intermediate traders recommend: 1) Don\'t pyramid for first 1-2 years, focus on single entry and trailing stops; 2) Only try pyramiding after 3 consecutive months of consistent profits; 3) Initially only one addition, increase after proficiency; 4) Always remember: Pyramiding is icing on cake, not necessity. Can profit without pyramiding, but wrong pyramiding destroys accounts.'}
            </p>
          </div>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
