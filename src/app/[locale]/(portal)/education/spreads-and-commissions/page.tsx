import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { spreadsCommissionsContent } from '@/content/education/spreads-and-commissions.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = spreadsCommissionsContent[lang];

  return generateBilingualMetadata(
    spreadsCommissionsContent.zh.title,
    spreadsCommissionsContent.en.title,
    spreadsCommissionsContent.zh.description,
    spreadsCommissionsContent.en.description,
    spreadsCommissionsContent.zh.keywords,
    spreadsCommissionsContent.en.keywords,
    lang
  );
}

export default async function SpreadsCommissionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = spreadsCommissionsContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: What is Spread */}
      <section id="what-is-spread" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '什么是点差？' : 'What is a Spread?'}
        </h2>
        <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '点差（Spread）是外汇交易中买入价（Ask）和卖出价（Bid）之间的差额，是交易者每次开仓必须支付的成本。'
              : 'The spread is the difference between the buying price (Ask) and selling price (Bid) in forex trading, a cost traders must pay on every position opened.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <p className="text-lg font-bold mb-2 text-white">{isZh ? '实例说明：' : 'Example:'}</p>
            <p className="mb-2">EUR/USD {isZh ? '报价：' : 'Quote:'}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-gray-300">
                {isZh ? '买入价 (Ask)：' : 'Ask Price:'} 1.1003
              </li>
              <li className="text-gray-300">
                {isZh ? '卖出价 (Bid)：' : 'Bid Price:'} 1.1000
              </li>
              <li className="text-gray-300">
                {isZh ? '点差：' : 'Spread:'} 3 {isZh ? '点 (pips)' : 'pips'}
              </li>
            </ul>
            <p className="mt-4">
              {isZh
                ? '这意味着：你以1.1003买入，立即卖出只能以1.1000成交，瞬间亏损3点。这3点就是你支付给经纪商的交易成本。'
                : 'This means: you buy at 1.1003, but can immediately sell only at 1.1000, instantly losing 3 pips. These 3 pips are the trading cost paid to your broker.'}
            </p>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '点差的金钱价值' : 'Monetary Value of Spreads'}
            </h3>
            <p className="mb-2">
              {isZh
                ? '不同货币对和交易手数的点差成本不同：'
                : 'Spread costs vary by currency pair and lot size:'}
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-gray-300">
                EUR/USD, 3{isZh ? '点点差' : '-pip spread'}, 1{isZh ? '标准手' : ' standard lot'}: <strong className="text-white">$30</strong>
              </li>
              <li className="text-gray-300">
                GBP/USD, 2{isZh ? '点点差' : '-pip spread'}, 1{isZh ? '标准手' : ' standard lot'}: <strong className="text-white">$20</strong>
              </li>
              <li className="text-gray-300">
                USD/JPY, 1.5{isZh ? '点点差' : '-pip spread'}, 1{isZh ? '标准手' : ' standard lot'}: <strong className="text-white">$15</strong>
              </li>
            </ul>
            <p className="mt-3 text-sm">
              {isZh
                ? '💡 对于日内交易者，如果一天交易10次，仅点差成本就可能达到$150-$300！'
                : '💡 For day traders making 10 trades daily, spread costs alone could reach $150-$300!'}
            </p>
          </div>

          <p className="text-gray-300">
            {isZh
              ? '点差看似微小，但对于频繁交易的日内交易者和剥头皮策略来说，点差是最大的成本因素之一。选择低点差经纪商，可以显著提升长期盈利能力。'
              : 'While seemingly small, spreads are one of the largest cost factors for frequent day traders and scalpers. Choosing a low-spread broker can significantly improve long-term profitability.'}
          </p>
        </div>
      </section>

      {/* Section 2: Spread Types */}
      <section id="spread-types" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '固定点差 vs 浮动点差' : 'Fixed vs Floating Spreads'}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '固定点差 (Fixed Spread)' : 'Fixed Spread'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '特点：' : 'Features:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? '点差保持恒定，不随市场波动' : 'Spread remains constant regardless of market conditions'}</li>
                <li className="text-gray-300">
                  {isZh
                    ? '经纪商承担市场波动风险'
                    : 'Broker assumes market volatility risk'}
                </li>
                <li className="text-gray-300">
                  {isZh
                    ? '通常略高于浮动点差的平均值'
                    : 'Typically slightly higher than average floating spread'}
                </li>
              </ul>

              <p className="mt-4">
                <strong className="text-green-600 dark:text-green-400">{isZh ? '✅ 优点：' : '✅ Advantages:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? '成本可预测，便于计算盈亏' : 'Predictable costs, easy P&L calculation'}</li>
                <li className="text-gray-300">
                  {isZh
                    ? '重大新闻时段点差不会突然扩大'
                    : 'Spreads won\'t suddenly widen during major news'}
                </li>
                <li className="text-gray-300">{isZh ? '适合新手和剥头皮交易者' : 'Suitable for beginners and scalpers'}</li>
              </ul>

              <p className="mt-4">
                <strong className="text-red-600 dark:text-red-400">{isZh ? '❌ 缺点：' : '❌ Disadvantages:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">
                  {isZh
                    ? '平时市场点差可能高于浮动点差'
                    : 'May be higher than floating spreads during normal markets'}
                </li>
                <li className="text-gray-300">
                  {isZh
                    ? '极端行情下经纪商可能暂停交易'
                    : 'Brokers may suspend trading during extreme conditions'}
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '浮动点差 (Floating Spread)' : 'Floating Spread'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '特点：' : 'Features:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">
                  {isZh
                    ? '点差随市场流动性实时变化'
                    : 'Spread varies in real-time with market liquidity'}
                </li>
                <li className="text-gray-300">
                  {isZh
                    ? '反映真实市场供需关系'
                    : 'Reflects real market supply and demand'}
                </li>
                <li className="text-gray-300">
                  {isZh
                    ? '高流动性时段点差收窄，低流动性时段扩大'
                    : 'Narrows during high liquidity, widens during low liquidity'}
                </li>
              </ul>

              <p className="mt-4">
                <strong className="text-green-600 dark:text-green-400">{isZh ? '✅ 优点：' : '✅ Advantages:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">
                  {isZh
                    ? '正常市场条件下点差更低'
                    : 'Lower spreads during normal market conditions'}
                </li>
                <li className="text-gray-300">
                  {isZh
                    ? '更透明，反映真实市场状况'
                    : 'More transparent, reflects real market conditions'}
                </li>
                <li className="text-gray-300">
                  {isZh
                    ? '适合趋势交易和长线持仓'
                    : 'Suitable for trend trading and longer-term positions'}
                </li>
              </ul>

              <p className="mt-4">
                <strong className="text-red-600 dark:text-red-400">{isZh ? '❌ 缺点：' : '❌ Disadvantages:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">
                  {isZh
                    ? '成本不可预测，难以精确计算'
                    : 'Unpredictable costs, difficult to calculate precisely'}
                </li>
                <li className="text-gray-300">
                  {isZh
                    ? '重大新闻时点差可能暴涨至10-50点'
                    : 'Spreads can spike to 10-50 pips during major news'}
                </li>
                <li className="text-gray-300">
                  {isZh
                    ? '不适合剥头皮策略'
                    : 'Not suitable for scalping strategies'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-100 dark:bg-[#0a0a0a] border-l-4 border-gray-800">
          <p className="text-gray-300">
            <strong className="text-white">{isZh ? '💡 如何选择？' : '💡 Which to Choose?'}</strong>
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2 text-gray-300 dark:text-gray-300">
            <li className="text-gray-300">
              {isZh
                ? '新手、剥头皮交易者 → 固定点差（成本可控，易于学习）'
                : 'Beginners, scalpers → Fixed spreads (controlled costs, easier learning)'}
            </li>
            <li className="text-gray-300">
              {isZh
                ? '趋势交易者、波段交易者 → 浮动点差（长期成本更低）'
                : 'Trend traders, swing traders → Floating spreads (lower long-term costs)'}
            </li>
            <li className="text-gray-300">
              {isZh
                ? '避开新闻交易者 → 两者皆可，但需避开数据发布时段'
                : 'News avoiders → Either works, but avoid data release periods'}
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3: Commission Models */}
      <section id="commission-models" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '佣金模式：无佣金 vs 佣金账户' : 'Commission Models: Commission-Free vs Commission-Based'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '除了点差，部分经纪商还收取交易佣金。理解两种模式的差异，对选择账户类型至关重要：'
              : 'Beyond spreads, some brokers charge trading commissions. Understanding the difference is crucial for account selection:'}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '无佣金账户 (Commission-Free)' : 'Commission-Free Account'}
              </h3>
              <p className="mb-3">
                {isZh
                  ? '经纪商通过点差盈利，不额外收取佣金。'
                  : 'Broker profits through spreads, no additional commission.'}
              </p>
              <p className="mb-2">
                <strong className="text-white">{isZh ? '成本示例：' : 'Cost Example:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li className="text-gray-300">EUR/USD {isZh ? '点差：' : 'spread:'} 3 pips</li>
                <li className="text-gray-300">{isZh ? '佣金：' : 'Commission:'} $0</li>
                <li className="text-gray-300">
                  <strong className="text-white">
                    {isZh ? '总成本：' : 'Total cost:'} $30 ({isZh ? '仅点差' : 'spread only'})
                  </strong>
                </li>
              </ul>
              <p className="text-sm">
                {isZh
                  ? '✅ 适合：新手、长线交易者、小资金账户'
                  : '✅ Suitable for: Beginners, long-term traders, small accounts'}
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '佣金账户 (Commission-Based)' : 'Commission-Based Account'}
              </h3>
              <p className="mb-3">
                {isZh
                  ? '点差更低，但每笔交易收取固定佣金（通常$3-$7/标准手）。'
                  : 'Lower spreads, but charges fixed commission per trade (typically $3-$7/lot).'}
              </p>
              <p className="mb-2">
                <strong className="text-white">{isZh ? '成本示例：' : 'Cost Example:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li className="text-gray-300">EUR/USD {isZh ? '点差：' : 'spread:'} 0.5 pips</li>
                <li className="text-gray-300">
                  {isZh ? '佣金：' : 'Commission:'} $7 ({isZh ? '往返' : 'round-trip'})
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">
                    {isZh ? '总成本：' : 'Total cost:'} $12 ({isZh ? '点差$5 + 佣金$7' : '$5 spread + $7 commission'})
                  </strong>
                </li>
              </ul>
              <p className="text-sm">
                {isZh
                  ? '✅ 适合：日内交易者、剥头皮策略、高频交易'
                  : '✅ Suitable for: Day traders, scalpers, high-frequency traders'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <p className="text-lg font-bold mb-2 text-white">
              {isZh ? '⚠️ 关键洞察：哪个更便宜？' : '⚠️ Key Insight: Which is Cheaper?'}
            </p>
            <p className="text-gray-300">
              {isZh
                ? '对于主要货币对（EUR/USD, GBP/USD），佣金账户通常总成本更低。对于交叉货币对和异国货币对，无佣金账户可能更划算。建议计算实际总成本（点差+佣金）后再决定。'
                : 'For major pairs (EUR/USD, GBP/USD), commission accounts typically have lower total costs. For cross and exotic pairs, commission-free may be cheaper. Calculate actual total costs (spread + commission) before deciding.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Account Types */}
      <section id="account-types" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '账户类型对比：MM、STP、ECN' : 'Account Type Comparison: MM, STP, ECN'}
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-2 border-gray-800">
            <thead>
              <tr className="bg-gray-900 text-gray-300">
                <th className="border-2 border-gray-800 p-3 text-left">
                  {isZh ? '类型' : 'Type'}
                </th>
                <th className="border-2 border-gray-800 p-3 text-left">
                  {isZh ? '全称' : 'Full Name'}
                </th>
                <th className="border-2 border-gray-800 p-3 text-left">
                  {isZh ? '点差' : 'Spread'}
                </th>
                <th className="border-2 border-gray-800 p-3 text-left">
                  {isZh ? '佣金' : 'Commission'}
                </th>
                <th className="border-2 border-gray-800 p-3 text-left">
                  {isZh ? '执行方式' : 'Execution'}
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-300 dark:text-gray-300">
              <tr>
                <td className="border-2 border-gray-800 p-3 font-bold text-white">MM</td>
                <td className="border-2 border-gray-800 p-3">Market Maker</td>
                <td className="border-2 border-gray-800 p-3">
                  {isZh ? '固定，较高' : 'Fixed, higher'}
                </td>
                <td className="border-2 border-gray-800 p-3">{isZh ? '无' : 'None'}</td>
                <td className="border-2 border-gray-800 p-3">
                  {isZh ? '经纪商内部对冲' : 'Internal broker matching'}
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                <td className="border-2 border-gray-800 p-3 font-bold text-white">STP</td>
                <td className="border-2 border-gray-800 p-3">Straight Through Processing</td>
                <td className="border-2 border-gray-800 p-3">
                  {isZh ? '浮动，中等' : 'Floating, medium'}
                </td>
                <td className="border-2 border-gray-800 p-3">{isZh ? '通常无' : 'Usually none'}</td>
                <td className="border-2 border-gray-800 p-3">
                  {isZh ? '直达流动性提供商' : 'Direct to liquidity providers'}
                </td>
              </tr>
              <tr>
                <td className="border-2 border-gray-800 p-3 font-bold text-white">ECN</td>
                <td className="border-2 border-gray-800 p-3">Electronic Communication Network</td>
                <td className="border-2 border-gray-800 p-3">
                  {isZh ? '浮动，极低' : 'Floating, very low'}
                </td>
                <td className="border-2 border-gray-800 p-3">
                  {isZh ? '有（$3-7/手）' : 'Yes ($3-7/lot)'}
                </td>
                <td className="border-2 border-gray-800 p-3">
                  {isZh ? '直接进入银行间市场' : 'Direct to interbank market'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-4 text-gray-300 dark:text-gray-300">
          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-2 text-white">
              {isZh ? 'MM账户 (做市商)' : 'MM Account (Market Maker)'}
            </h3>
            <p className="text-gray-300">
              {isZh
                ? '经纪商充当你的交易对手方。适合新手，但存在潜在利益冲突（你的亏损可能是经纪商的盈利）。'
                : 'Broker acts as your counterparty. Suitable for beginners, but potential conflict of interest (your losses may be broker\'s profits).'}
            </p>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-2 text-white">
              {isZh ? 'STP账户 (直通式处理)' : 'STP Account (Straight Through Processing)'}
            </h3>
            <p className="text-gray-300">
              {isZh
                ? '订单直接发送到流动性提供商，没有交易台干预。更透明，适合中级交易者。'
                : 'Orders sent directly to liquidity providers without dealing desk intervention. More transparent, suitable for intermediate traders.'}
            </p>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-2 text-white">
              {isZh ? 'ECN账户 (电子通讯网络)' : 'ECN Account (Electronic Communication Network)'}
            </h3>
            <p className="text-gray-300">
              {isZh
                ? '最透明的模式，你的订单与全球银行、对冲基金的订单一起匹配。点差最低，执行最快，但收取佣金。适合专业交易者和高频策略。'
                : 'Most transparent model, your orders matched with global banks and hedge funds. Lowest spreads, fastest execution, but charges commission. Suitable for professional traders and high-frequency strategies.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Hidden Costs */}
      <section id="hidden-costs" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '隐藏成本：滑点、库存费、出金费' : 'Hidden Costs: Slippage, Swap, Withdrawal Fees'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '除了点差和佣金，还有一些容易被忽视但同样重要的交易成本：'
              : 'Beyond spreads and commissions, there are often-overlooked but equally important costs:'}
          </p>

          <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '1. 滑点 (Slippage)' : '1. Slippage'}
            </h3>
            <p className="mb-2">
              {isZh
                ? '订单执行价格与预期价格之间的差异。常见于：'
                : 'Difference between expected price and execution price. Common during:'}
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-gray-300">{isZh ? '重大新闻发布时刻' : 'Major news releases'}</li>
              <li className="text-gray-300">{isZh ? '市场流动性不足时段' : 'Low liquidity periods'}</li>
              <li className="text-gray-300">{isZh ? '大额订单执行' : 'Large order execution'}</li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">{isZh ? '控制方法：' : 'Control methods:'}</strong>{' '}
              {isZh
                ? '避开新闻时段、使用限价单、选择高流动性时段交易'
                : 'Avoid news periods, use limit orders, trade during high liquidity'}
            </p>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '2. 隔夜利息/库存费 (Swap/Rollover)' : '2. Swap/Rollover'}
            </h3>
            <p className="mb-2">
              {isZh
                ? '持仓过夜需要支付或收取的利息，取决于两个货币的利率差：'
                : 'Interest paid or earned on overnight positions, based on interest rate differential:'}
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-gray-300">
                {isZh
                  ? '买入高息货币 → 收取利息（正库存费）'
                  : 'Buy high-interest currency → Earn interest (positive swap)'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '买入低息货币 → 支付利息（负库存费）'
                  : 'Buy low-interest currency → Pay interest (negative swap)'}
              </li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">{isZh ? '示例：' : 'Example:'}</strong>{' '}
              {isZh
                ? '做多AUD/JPY（澳元利率高，日元利率低），每晚可能收取$5-10。做空则需支付。'
                : 'Long AUD/JPY (AUD high rate, JPY low rate), may earn $5-10 nightly. Short pays.'}
            </p>
            <p className="text-sm mt-2">
              {isZh
                ? '💡 对于长期持仓，库存费可能成为重要成本或收益。'
                : '💡 For long-term positions, swaps can become significant costs or earnings.'}
            </p>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '3. 出金费用 (Withdrawal Fees)' : '3. Withdrawal Fees'}
            </h3>
            <p className="mb-2">
              {isZh
                ? '部分经纪商对出金收取费用：'
                : 'Some brokers charge withdrawal fees:'}
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-gray-300">
                {isZh
                  ? '银行电汇：通常$20-50/次'
                  : 'Bank wire transfer: typically $20-50 per transfer'}
              </li>
              <li className="text-gray-300">
                {isZh ? '电子钱包：$0-10/次' : 'E-wallet: $0-10 per transfer'}
              </li>
              <li className="text-gray-300">
                {isZh
                  ? '信用卡：可能有2-3%手续费'
                  : 'Credit card: possible 2-3% processing fee'}
              </li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">{isZh ? '建议：' : 'Recommendation:'}</strong>{' '}
              {isZh
                ? '选择提供免费出金或低费用出金的经纪商，尤其是对小资金账户。'
                : 'Choose brokers offering free or low-cost withdrawals, especially for smaller accounts.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Cost Calculation */}
      <section id="cost-calculation" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '交易成本计算与优化' : 'Trading Cost Calculation & Optimization'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '完整成本计算公式' : 'Complete Cost Calculation Formula'}
            </h3>
            <div className="space-y-2 font-mono text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '单笔交易总成本 =' : 'Total cost per trade ='}</strong>
              </p>
              <p className="pl-4">
                {isZh ? '点差成本' : 'Spread cost'} + {isZh ? '佣金' : 'Commission'} + {isZh ? '滑点成本' : 'Slippage cost'} + {isZh ? '库存费' : 'Swap'} ({isZh ? '如持仓过夜' : 'if overnight'})
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '实战案例：日内交易者成本分析' : 'Real Case: Day Trader Cost Analysis'}
            </h3>
            <p className="mb-3">
              {isZh
                ? '假设：日内交易者，每天交易EUR/USD 10次，每次1标准手，持续一个月（20个交易日）'
                : 'Assumptions: Day trader, 10 EUR/USD trades daily, 1 lot each, over 1 month (20 trading days)'}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-bold mb-2 text-white">{isZh ? '经纪商A（无佣金账户）' : 'Broker A (Commission-Free)'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '点差：' : 'Spread:'} 3 pips = $30</li>
                  <li className="text-gray-300">{isZh ? '佣金：' : 'Commission:'} $0</li>
                  <li className="text-gray-300">{isZh ? '单笔成本：' : 'Cost per trade:'} $30</li>
                  <li className="font-bold text-white">
                    {isZh ? '月总成本：' : 'Monthly cost:'} $30 × 10 × 20 = <strong className="text-white">$6,000</strong>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-bold mb-2 text-white">{isZh ? '经纪商B（ECN账户）' : 'Broker B (ECN Account)'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '点差：' : 'Spread:'} 0.5 pips = $5</li>
                  <li className="text-gray-300">{isZh ? '佣金：' : 'Commission:'} $7</li>
                  <li className="text-gray-300">{isZh ? '单笔成本：' : 'Cost per trade:'} $12</li>
                  <li className="font-bold text-white">
                    {isZh ? '月总成本：' : 'Monthly cost:'} $12 × 10 × 20 = <strong className="text-white">$2,400</strong>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-lg font-bold text-white">
              {isZh
                ? '💰 结论：经纪商B每月节省 $3,600（60%成本）！'
                : '💰 Conclusion: Broker B saves $3,600 monthly (60% cost reduction)!'}
            </p>
            <p className="text-sm mt-2">
              {isZh
                ? '对于高频交易者，选择低成本经纪商是盈利的关键因素之一。'
                : 'For high-frequency traders, choosing a low-cost broker is a key profitability factor.'}
            </p>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-[#0a0a0a] border-l-4 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '成本优化策略' : 'Cost Optimization Strategies'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '选择合适的账户类型：' : 'Choose appropriate account type:'}</strong>{' '}
                {isZh
                  ? '高频交易用ECN，长线交易用标准账户'
                  : 'ECN for high-frequency, standard for long-term'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '在高流动性时段交易：' : 'Trade during high liquidity:'}</strong>{' '}
                {isZh ? '点差更窄，滑点更少' : 'Tighter spreads, less slippage'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '避开重大新闻时段：' : 'Avoid major news:'}</strong>{' '}
                {isZh ? '防止点差暴涨和滑点' : 'Prevent spread spikes and slippage'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '合并交易频率：' : 'Consolidate trading frequency:'}</strong>{' '}
                {isZh
                  ? '减少过度交易，提高每笔交易质量'
                  : 'Reduce overtrading, improve trade quality'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '定期对比经纪商：' : 'Regularly compare brokers:'}</strong>{' '}
                {isZh
                  ? '市场竞争激烈，可能有更优惠的选择'
                  : 'Competitive market may offer better options'}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
