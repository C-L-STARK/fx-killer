import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { tradingSessionsContent } from '@/content/education/trading-sessions-guide.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = tradingSessionsContent[lang];

  return generateBilingualMetadata(
    tradingSessionsContent.zh.title,
    tradingSessionsContent.en.title,
    tradingSessionsContent.zh.description,
    tradingSessionsContent.en.description,
    tradingSessionsContent.zh.keywords,
    tradingSessionsContent.en.keywords,
    lang
  );
}

export default async function TradingSessionsGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = tradingSessionsContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: Why Important */}
      <section id="why-important" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '为什么交易时段如此重要？' : 'Why Trading Sessions Matter'}
        </h2>
        <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '外汇市场虽然是24小时运行，但并非所有时段都同样适合交易。不同交易时段有着截然不同的市场特征：'
              : 'While the forex market operates 24 hours, not all periods are equally suitable for trading. Different sessions have distinctly different market characteristics:'}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-gray-300">
              <strong className="text-white">{isZh ? '流动性差异：' : 'Liquidity Variations:'}</strong>{' '}
              {isZh
                ? '欧美重叠时段可能比亚洲时段的交易量高出3-5倍'
                : 'London-New York overlap can have 3-5x higher volume than Asian session'}
            </li>
            <li className="text-gray-300">
              <strong className="text-white">{isZh ? '波动性不同：' : 'Volatility Differences:'}</strong>{' '}
              {isZh
                ? '伦敦开盘时EUR/USD平均波动可达80-120点，而悉尼时段可能仅20-30点'
                : 'EUR/USD averages 80-120 pips during London open, vs 20-30 pips during Sydney'}
            </li>
            <li className="text-gray-300">
              <strong className="text-white">{isZh ? '点差变化：' : 'Spread Variations:'}</strong>{' '}
              {isZh
                ? '流动性强的时段点差更窄，交易成本更低'
                : 'High liquidity periods have tighter spreads and lower trading costs'}
            </li>
            <li className="text-gray-300">
              <strong className="text-white">{isZh ? '趋势特征：' : 'Trend Characteristics:'}</strong>{' '}
              {isZh
                ? '某些时段更容易出现单边趋势，某些时段则以震荡为主'
                : 'Some sessions favor trending moves, others tend to range'}
            </li>
          </ul>
          <p className="bg-gray-100 dark:bg-[#0a0a0a] p-4 border-l-4 border-gray-800">
            <strong className="text-white">{isZh ? '💡 核心观点：' : '💡 Key Insight:'}</strong>{' '}
            {isZh
              ? '选对交易时段，可以显著提升盈利概率，降低交易成本。这不是可选项，而是成功交易的必备条件。'
              : 'Choosing the right session significantly improves profit probability and reduces costs. This isn\'t optional - it\'s essential for successful trading.'}
          </p>
        </div>
      </section>

      {/* Section 2: Four Sessions */}
      <section id="four-sessions" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '全球四大交易时段详解' : 'The Four Major Trading Sessions'}
        </h2>

        {/* Sydney Session */}
        <div className="mb-8 p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-white">
            {isZh ? '1. 悉尼时段 (Sydney Session)' : '1. Sydney Session'}
          </h3>
          <div className="space-y-3 text-gray-300 dark:text-gray-300">
            <p className="text-gray-300">
              <strong className="text-white">{isZh ? '交易时间：' : 'Trading Hours:'}</strong>{' '}
              {isZh ? '北京时间 06:00 - 15:00' : '06:00 - 15:00 Beijing Time'}
            </p>
            <p className="text-gray-300">
              <strong className="text-white">{isZh ? '活跃货币对：' : 'Active Pairs:'}</strong> AUD/USD, NZD/USD, AUD/JPY
            </p>
            <p className="text-gray-300">
              <strong className="text-white">{isZh ? '市场特征：' : 'Characteristics:'}</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-gray-300">{isZh ? '市场流动性最低，点差相对较大' : 'Lowest liquidity, wider spreads'}</li>
              <li className="text-gray-300">{isZh ? '波动性较小，适合趋势跟踪策略' : 'Lower volatility, suitable for trend-following'}</li>
              <li className="text-gray-300">
                {isZh
                  ? '澳洲和新西兰经济数据发布时段'
                  : 'Period for Australian and New Zealand economic data'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '适合新手练习，风险相对可控'
                  : 'Good for beginners to practice, more manageable risk'}
              </li>
            </ul>
          </div>
        </div>

        {/* Tokyo Session */}
        <div className="mb-8 p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-white">
            {isZh ? '2. 东京时段 (Tokyo Session)' : '2. Tokyo Session'}
          </h3>
          <div className="space-y-3 text-gray-300 dark:text-gray-300">
            <p className="text-gray-300">
              <strong className="text-white">{isZh ? '交易时间：' : 'Trading Hours:'}</strong>{' '}
              {isZh ? '北京时间 08:00 - 17:00' : '08:00 - 17:00 Beijing Time'}
            </p>
            <p className="text-gray-300">
              <strong className="text-white">{isZh ? '活跃货币对：' : 'Active Pairs:'}</strong> USD/JPY, EUR/JPY, GBP/JPY, AUD/JPY
            </p>
            <p className="text-gray-300">
              <strong className="text-white">{isZh ? '市场特征：' : 'Characteristics:'}</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-gray-300">
                {isZh
                  ? '亚洲时段流动性最强的时期'
                  : 'Strongest liquidity period in Asian timezone'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '日本经济数据对USD/JPY影响显著'
                  : 'Japanese economic data significantly impacts USD/JPY'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '中国市场开盘后，风险情绪可能影响商品货币'
                  : 'After China market open, risk sentiment can affect commodity currencies'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '适合区间交易和日内波段策略'
                  : 'Suitable for range trading and intraday swing strategies'}
              </li>
            </ul>
          </div>
        </div>

        {/* London Session */}
        <div className="mb-8 p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-white">
            {isZh ? '3. 伦敦时段 (London Session) ⭐' : '3. London Session ⭐'}
          </h3>
          <div className="space-y-3 text-gray-300 dark:text-gray-300">
            <p className="text-gray-300">
              <strong className="text-white">{isZh ? '交易时间：' : 'Trading Hours:'}</strong>{' '}
              {isZh ? '北京时间 15:00 - 00:00（冬令时16:00-01:00）' : '15:00 - 00:00 Beijing Time (16:00-01:00 DST)'}
            </p>
            <p className="text-gray-300">
              <strong className="text-white">{isZh ? '活跃货币对：' : 'Active Pairs:'}</strong> EUR/USD, GBP/USD, EUR/GBP, EUR/CHF
            </p>
            <p className="text-gray-300">
              <strong className="text-white">{isZh ? '市场特征：' : 'Characteristics:'}</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-gray-300">
                {isZh
                  ? '全球最大的外汇交易中心，占全球交易量约35%'
                  : 'World\'s largest forex center, ~35% of global volume'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '流动性极强，点差最窄，执行速度快'
                  : 'Extremely high liquidity, tightest spreads, fast execution'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '欧洲经济数据密集发布时段'
                  : 'Period for concentrated European economic data releases'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '容易形成强劲趋势，适合突破和趋势策略'
                  : 'Strong trending tendency, ideal for breakout and trend strategies'}
              </li>
              <li className="text-white font-bold">
                {isZh ? '⚠️ 推荐：最适合大多数交易者的时段' : '⚠️ Recommended: Best session for most traders'}
              </li>
            </ul>
          </div>
        </div>

        {/* New York Session */}
        <div className="mb-8 p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-white">
            {isZh ? '4. 纽约时段 (New York Session) ⭐' : '4. New York Session ⭐'}
          </h3>
          <div className="space-y-3 text-gray-300 dark:text-gray-300">
            <p className="text-gray-300">
              <strong className="text-white">{isZh ? '交易时间：' : 'Trading Hours:'}</strong>{' '}
              {isZh ? '北京时间 20:00 - 05:00（冬令时21:00-06:00）' : '20:00 - 05:00 Beijing Time (21:00-06:00 DST)'}
            </p>
            <p className="text-gray-300">
              <strong className="text-white">{isZh ? '活跃货币对：' : 'Active Pairs:'}</strong> EUR/USD, GBP/USD, USD/JPY, USD/CAD
            </p>
            <p className="text-gray-300">
              <strong className="text-white">{isZh ? '市场特征：' : 'Characteristics:'}</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-gray-300">
                {isZh
                  ? '全球第二大交易中心，占全球交易量约20%'
                  : 'World\'s second-largest center, ~20% of global volume'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '美国经济数据对全球市场影响最大'
                  : 'US economic data has greatest impact on global markets'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '与伦敦时段重叠（20:00-00:00）是流动性最强时期'
                  : 'Overlap with London (20:00-00:00) is peak liquidity period'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '纽约独立时段（00:00-05:00）波动性逐渐降低'
                  : 'New York-only session (00:00-05:00) sees gradually declining volatility'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Overlap Periods */}
      <section id="overlap-periods" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '重叠时段：交易的黄金时刻' : 'Overlap Periods: Golden Trading Hours'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '当两个主要交易时段重叠时，市场流动性达到峰值，这些时段往往提供最佳交易机会：'
              : 'When two major sessions overlap, market liquidity peaks, often providing the best trading opportunities:'}
          </p>

          {/* Tokyo-London Overlap */}
          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-3 text-white">
              {isZh ? '🌅 东京-伦敦重叠 (Tokyo-London Overlap)' : '🌅 Tokyo-London Overlap'}
            </h3>
            <p className="mb-2">
              <strong className="text-white">{isZh ? '时间：' : 'Time:'}</strong>{' '}
              {isZh ? '北京时间 15:00 - 17:00 (2小时)' : '15:00 - 17:00 Beijing Time (2 hours)'}
            </p>
            <p className="mb-2">
              <strong className="text-white">{isZh ? '特点：' : 'Features:'}</strong>{' '}
              {isZh
                ? '流动性开始增强，EUR/JPY、GBP/JPY等交叉盘活跃度上升'
                : 'Liquidity strengthens, EUR/JPY, GBP/JPY cross pairs become more active'}
            </p>
            <p className="text-gray-300">
              <strong className="text-white">{isZh ? '适合：' : 'Suitable for:'}</strong>{' '}
              {isZh ? '交叉货币对短线交易' : 'Short-term cross pair trading'}
            </p>
          </div>

          {/* London-New York Overlap */}
          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-3 text-white">
              {isZh ? '🔥 伦敦-纽约重叠 (London-New York Overlap) - 最佳时段' : '🔥 London-New York Overlap - Prime Time'}
            </h3>
            <p className="mb-2">
              <strong className="text-white">{isZh ? '时间：' : 'Time:'}</strong>{' '}
              {isZh ? '北京时间 20:00 - 00:00 (4小时)' : '20:00 - 00:00 Beijing Time (4 hours)'}
            </p>
            <p className="mb-2">
              <strong className="text-white">{isZh ? '特点：' : 'Features:'}</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-2">
              <li className="text-gray-300">
                {isZh
                  ? '全天流动性最强，EUR/USD日交易量的60%集中在此时段'
                  : 'Peak daily liquidity, 60% of EUR/USD daily volume concentrated here'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '重大经济数据发布（如非农、美联储决议）多在此时段'
                  : 'Major releases (NFP, Fed decisions) often during this period'}
              </li>
              <li className="text-gray-300">{isZh ? '点差最窄，执行质量最佳' : 'Tightest spreads, best execution quality'}</li>
              <li className="text-gray-300">
                {isZh
                  ? '强趋势行情和突破走势频繁出现'
                  : 'Strong trends and breakout moves frequently occur'}
              </li>
            </ul>
            <p className="text-gray-300">
              <strong className="text-white">{isZh ? '适合：' : 'Suitable for:'}</strong>{' '}
              {isZh
                ? '所有策略 - 趋势、突破、剥头皮、波段交易'
                : 'All strategies - trend, breakout, scalping, swing trading'}
            </p>
          </div>

          <p className="bg-gray-100 dark:bg-[#0a0a0a] p-4 border-l-4 border-gray-800">
            <strong className="text-white">{isZh ? '💡 专业建议：' : '💡 Pro Tip:'}</strong>{' '}
            {isZh
              ? '如果你只能在一个时段交易，毫无疑问选择伦敦-纽约重叠时段（北京时间20:00-00:00）。这4小时内的交易机会，可能超过其他20小时的总和。'
              : 'If you can only trade one session, choose London-New York overlap (20:00-00:00 Beijing time) without hesitation. Trading opportunities in these 4 hours may exceed the rest of the day combined.'}
          </p>
        </div>
      </section>

      {/* Section 4: Currency Pairs Best Times */}
      <section id="currency-pairs" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '不同货币对的最佳交易时段' : 'Best Trading Times for Currency Pairs'}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-2 border-gray-800">
            <thead>
              <tr className="bg-gray-900 text-gray-300">
                <th className="border-2 border-gray-800 p-3 text-left">
                  {isZh ? '货币对' : 'Currency Pair'}
                </th>
                <th className="border-2 border-gray-800 p-3 text-left">
                  {isZh ? '最佳交易时段' : 'Best Trading Session'}
                </th>
                <th className="border-2 border-gray-800 p-3 text-left">
                  {isZh ? '北京时间' : 'Beijing Time'}
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-300 dark:text-gray-300">
              <tr>
                <td className="border-2 border-gray-800 p-3 font-bold text-white">EUR/USD</td>
                <td className="border-2 border-gray-800 p-3">
                  {isZh ? '伦敦-纽约重叠' : 'London-NY Overlap'}
                </td>
                <td className="border-2 border-gray-800 p-3">20:00 - 00:00</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                <td className="border-2 border-gray-800 p-3 font-bold text-white">GBP/USD</td>
                <td className="border-2 border-gray-800 p-3">
                  {isZh ? '伦敦-纽约重叠' : 'London-NY Overlap'}
                </td>
                <td className="border-2 border-gray-800 p-3">20:00 - 00:00</td>
              </tr>
              <tr>
                <td className="border-2 border-gray-800 p-3 font-bold text-white">USD/JPY</td>
                <td className="border-2 border-gray-800 p-3">
                  {isZh ? '东京 + 纽约' : 'Tokyo + New York'}
                </td>
                <td className="border-2 border-gray-800 p-3">
                  08:00 - 17:00, 20:00 - 05:00
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                <td className="border-2 border-gray-800 p-3 font-bold text-white">AUD/USD</td>
                <td className="border-2 border-gray-800 p-3">
                  {isZh ? '悉尼 + 东京' : 'Sydney + Tokyo'}
                </td>
                <td className="border-2 border-gray-800 p-3">06:00 - 17:00</td>
              </tr>
              <tr>
                <td className="border-2 border-gray-800 p-3 font-bold text-white">USD/CAD</td>
                <td className="border-2 border-gray-800 p-3">{isZh ? '纽约' : 'New York'}</td>
                <td className="border-2 border-gray-800 p-3">20:00 - 05:00</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                <td className="border-2 border-gray-800 p-3 font-bold text-white">EUR/JPY</td>
                <td className="border-2 border-gray-800 p-3">
                  {isZh ? '东京-伦敦重叠' : 'Tokyo-London Overlap'}
                </td>
                <td className="border-2 border-gray-800 p-3">15:00 - 17:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Practical Strategy */}
      <section id="practical-strategy" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '基于时段的实战交易策略' : 'Session-Based Trading Strategies'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-3 text-white">
              {isZh ? '策略1：亚洲时段区间交易' : 'Strategy 1: Asian Session Range Trading'}
            </h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-300">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '亚洲时段波动性低，价格倾向于在区间内震荡'
                  : 'Asian session low volatility tends toward range-bound movement'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '执行：' : 'Execution:'}</strong>{' '}
                {isZh
                  ? '在支撑位买入，阻力位卖出；设置较紧的止损和止盈'
                  : 'Buy at support, sell at resistance; set tight stops and targets'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '适合货币对：' : 'Suitable pairs:'}</strong> AUD/USD, NZD/USD, EUR/USD
              </li>
            </ul>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-3 text-white">
              {isZh ? '策略2：伦敦开盘突破' : 'Strategy 2: London Open Breakout'}
            </h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-300">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '伦敦开盘后流动性激增，容易突破亚洲时段形成的区间'
                  : 'London open liquidity surge often breaks Asian session ranges'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '执行：' : 'Execution:'}</strong>{' '}
                {isZh
                  ? '在北京时间15:00-16:00观察，等待价格突破亚洲高低点'
                  : 'Observe 15:00-16:00 Beijing time, wait for breakout of Asian highs/lows'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '适合货币对：' : 'Suitable pairs:'}</strong> EUR/USD, GBP/USD, EUR/GBP
              </li>
            </ul>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-3 text-white">
              {isZh ? '策略3：纽约开盘趋势跟踪' : 'Strategy 3: New York Open Trend Following'}
            </h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-300">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '原理：' : 'Principle:'}</strong>{' '}
                {isZh
                  ? '伦敦-纽约重叠时段趋势最为明显，适合趋势跟踪'
                  : 'London-NY overlap shows clearest trends, ideal for trend-following'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '执行：' : 'Execution:'}</strong>{' '}
                {isZh
                  ? '使用EMA均线确认趋势方向，回调时入场，顺势交易'
                  : 'Use EMA to confirm trend direction, enter on pullbacks, trade with trend'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '适合货币对：' : 'Suitable pairs:'}</strong> EUR/USD, GBP/USD, USD/JPY
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Volatility Patterns */}
      <section id="volatility-patterns" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '波动性模式与风险管理' : 'Volatility Patterns & Risk Management'}
        </h2>
        <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '不同交易时段的波动性差异巨大，必须相应调整风险管理策略：'
              : 'Volatility varies dramatically across sessions, requiring adjusted risk management:'}
          </p>

          <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '高波动时段 (伦敦-纽约重叠)' : 'High Volatility (London-NY Overlap)'}
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-gray-300">{isZh ? '适当扩大止损距离，避免被噪音止损' : 'Widen stops to avoid noise stop-outs'}</li>
              <li className="text-gray-300">
                {isZh
                  ? '减小仓位（建议降低30-50%），因为价格波动更大'
                  : 'Reduce position size (30-50% recommended) due to larger moves'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '密切关注经济日历，避免重大数据前后开仓'
                  : 'Monitor economic calendar, avoid positions around major releases'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '低波动时段 (亚洲时段)' : 'Low Volatility (Asian Session)'}
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-gray-300">
                {isZh
                  ? '可以使用较紧的止损，提高风险回报比'
                  : 'Use tighter stops for improved risk-reward ratios'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '适合剥头皮策略，但需注意点差相对较大'
                  : 'Suitable for scalping, but note relatively wider spreads'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '持仓可以持续到伦敦开盘，捕捉突破行情'
                  : 'Hold positions into London open to catch breakout moves'}
              </li>
            </ul>
          </div>

          <p className="bg-gray-100 dark:bg-[#0a0a0a] p-4 border-l-4 border-gray-800">
            <strong className="text-white">{isZh ? '⚠️ 风险警告：' : '⚠️ Risk Warning:'}</strong>{' '}
            {isZh
              ? '时段转换时刻（如伦敦开盘、纽约开盘）价格波动剧烈且不可预测。新手应避免在开盘前后15分钟内交易，等待市场稳定后再行动。'
              : 'Session transitions (London open, NY open) see violent and unpredictable moves. Beginners should avoid trading 15 minutes before/after opens, wait for market stabilization.'}
          </p>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
