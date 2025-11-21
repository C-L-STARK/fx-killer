import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { leverageMarginContent } from '@/content/education/leverage-and-margin.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = leverageMarginContent[lang];

  return generateBilingualMetadata(
    leverageMarginContent.zh.title,
    leverageMarginContent.en.title,
    leverageMarginContent.zh.description,
    leverageMarginContent.en.description,
    leverageMarginContent.zh.keywords,
    leverageMarginContent.en.keywords,
    lang
  );
}

export default async function LeverageMarginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = leverageMarginContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: What is Leverage */}
      <section id="what-is-leverage" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '什么是杠杆交易？' : 'What is Leveraged Trading?'}
        </h2>
        <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '杠杆（Leverage）允许交易者用较小的资金控制更大价值的头寸。简单来说，就是"借钱交易"。'
              : 'Leverage allows traders to control larger position values with smaller capital. Simply put, it\'s "trading with borrowed money."'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '形象比喻' : 'Analogy'}</h3>
            <p className="mb-4">
              {isZh
                ? '想象你想买一套价值$100,000的房产。没有杠杆，你需要全款支付$100,000。但如果你使用1:10杠杆（相当于10%首付），你只需要$10,000就能控制这套房产。'
                : 'Imagine buying a $100,000 property. Without leverage, you need the full $100,000. But with 1:10 leverage (10% down payment), you only need $10,000 to control the property.'}
            </p>
            <p className="text-gray-300">
              {isZh
                ? '如果房价涨到$110,000（+10%），你的$10,000变成$20,000（+100%）。但如果房价跌到$90,000（-10%），你的$10,000全部亏损。这就是杠杆的双刃剑效应。'
                : 'If the property rises to $110,000 (+10%), your $10,000 becomes $20,000 (+100%). But if it falls to $90,000 (-10%), you lose your entire $10,000. This is leverage\'s double-edged sword effect.'}
            </p>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '外汇交易中的杠杆' : 'Leverage in Forex Trading'}
            </h3>
            <p className="mb-3">
              {isZh
                ? '外汇市场的杠杆通常远高于其他市场：'
                : 'Forex market leverage is typically much higher than other markets:'}
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-gray-300">
                {isZh ? '外汇：' : 'Forex:'} 1:50 - 1:500 ({isZh ? '常见1:100' : 'commonly 1:100'})
              </li>
              <li className="text-gray-300">
                {isZh ? '股票：' : 'Stocks:'} 1:2 - 1:5
              </li>
              <li className="text-gray-300">
                {isZh ? '期货：' : 'Futures:'} 1:10 - 1:20
              </li>
            </ul>
            <p className="mt-3 text-sm">
              {isZh
                ? '⚠️ 高杠杆意味着高风险。外汇市场的高杠杆是导致许多新手快速亏损的主要原因之一。'
                : '⚠️ High leverage means high risk. High forex leverage is a major reason many beginners lose quickly.'}
            </p>
          </div>

          <p className="text-gray-300">
            {isZh
              ? '杠杆本身不是敌人，问题在于如何使用。专业交易员通常使用较低的实际杠杆，即使账户提供1:500的杠杆，他们可能只使用1:5-1:10的实际杠杆水平。'
              : 'Leverage itself isn\'t the enemy - it\'s how you use it. Professional traders typically use low effective leverage. Even with 1:500 account leverage, they may only use 1:5-1:10 effective leverage.'}
          </p>
        </div>
      </section>

      {/* Section 2: Margin Explained */}
      <section id="margin-explained" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '保证金机制详解' : 'Understanding Margin Mechanics'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '保证金（Margin）是开仓所需的资金，是使用杠杆的直接体现。理解保证金的关键概念：'
              : 'Margin is the capital required to open positions, directly reflecting leverage usage. Key margin concepts:'}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '已用保证金 (Used Margin)' : 'Used Margin'}
              </h3>
              <p className="mb-2">
                {isZh
                  ? '当前持仓占用的保证金总额。'
                  : 'Total margin locked in current positions.'}
              </p>
              <p className="text-sm">
                {isZh
                  ? '计算公式：(手数 × 合约大小 × 开仓价格) ÷ 杠杆'
                  : 'Formula: (Lots × Contract size × Entry price) ÷ Leverage'}
              </p>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '可用保证金 (Free Margin)' : 'Free Margin'}
              </h3>
              <p className="mb-2">
                {isZh
                  ? '还可用于开新仓的资金。'
                  : 'Capital available for opening new positions.'}
              </p>
              <p className="text-sm">
                {isZh
                  ? '计算公式：净值 - 已用保证金'
                  : 'Formula: Equity - Used Margin'}
              </p>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '净值 (Equity)' : 'Equity'}
              </h3>
              <p className="mb-2">
                {isZh
                  ? '账户当前总价值（含浮动盈亏）。'
                  : 'Current total account value (including floating P&L).'}
              </p>
              <p className="text-sm">
                {isZh
                  ? '计算公式：余额 + 浮动盈亏'
                  : 'Formula: Balance + Floating P&L'}
              </p>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '保证金比例 (Margin Level)' : 'Margin Level'}
              </h3>
              <p className="mb-2">
                {isZh
                  ? '衡量账户健康度的关键指标。'
                  : 'Key metric for account health.'}
              </p>
              <p className="text-sm">
                {isZh
                  ? '计算公式：(净值 ÷ 已用保证金) × 100%'
                  : 'Formula: (Equity ÷ Used Margin) × 100%'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '实例演示' : 'Practical Example'}</h3>
            <div className="space-y-3 font-mono text-sm">
              <p className="text-gray-300">
                {isZh ? '账户余额：' : 'Account Balance:'} $10,000
              </p>
              <p className="text-gray-300">
                {isZh ? '杠杆：' : 'Leverage:'} 1:100
              </p>
              <p className="text-gray-300">
                {isZh ? '交易：' : 'Trade:'} 1 {isZh ? '标准手' : 'standard lot'} EUR/USD @ 1.1000
              </p>
              <p className="border-t border-white/20 dark:border-black/20 pt-3 mt-3">
                {isZh ? '已用保证金：' : 'Used Margin:'} (1 × 100,000 × 1.1000) ÷ 100 = <strong className="text-white">$1,100</strong>
              </p>
              <p className="text-gray-300">
                {isZh ? '可用保证金：' : 'Free Margin:'} $10,000 - $1,100 = <strong className="text-white">$8,900</strong>
              </p>
              <p className="text-gray-300">
                {isZh ? '保证金比例：' : 'Margin Level:'} ($10,000 ÷ $1,100) × 100% = <strong className="text-white">909%</strong>
              </p>
              <p className="mt-4 text-white/80 dark:text-gray-300/80">
                {isZh
                  ? '💡 保证金比例越高越安全。通常低于100%会被强制平仓。'
                  : '💡 Higher margin level = safer. Typically forced liquidation below 100%.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Leverage Ratios */}
      <section id="leverage-ratios" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '杠杆比例选择：1:100 vs 1:500？' : 'Choosing Leverage: 1:100 vs 1:500?'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '很多新手认为高杠杆更好，因为"可以用更少资金开仓"。这是一个危险的误解。让我们对比不同杠杆的实际影响：'
              : 'Many beginners think high leverage is better because "you can open positions with less capital." This is a dangerous misconception. Let\'s compare different leverage impacts:'}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-800">
              <thead>
                <tr className="bg-gray-900 text-gray-300">
                  <th className="border-2 border-gray-800 p-3 text-left">
                    {isZh ? '杠杆' : 'Leverage'}
                  </th>
                  <th className="border-2 border-gray-800 p-3 text-left">
                    {isZh ? '所需保证金' : 'Required Margin'}
                  </th>
                  <th className="border-2 border-gray-800 p-3 text-left">
                    {isZh ? '爆仓点' : 'Liquidation Point'}
                  </th>
                  <th className="border-2 border-gray-800 p-3 text-left">
                    {isZh ? '风险评估' : 'Risk Assessment'}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-300 dark:text-gray-300">
                <tr>
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">1:50</td>
                  <td className="border-2 border-gray-800 p-3">$2,200</td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '市场波动7.8%' : '7.8% market move'}
                  </td>
                  <td className="border-2 border-gray-800 p-3 text-green-600 dark:text-green-400">
                    {isZh ? '低风险' : 'Low risk'}
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">1:100</td>
                  <td className="border-2 border-gray-800 p-3">$1,100</td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '市场波动8.9%' : '8.9% market move'}
                  </td>
                  <td className="border-2 border-gray-800 p-3 text-yellow-600 dark:text-yellow-400">
                    {isZh ? '中等风险' : 'Medium risk'}
                  </td>
                </tr>
                <tr>
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">1:200</td>
                  <td className="border-2 border-gray-800 p-3">$550</td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '市场波动9.5%' : '9.5% market move'}
                  </td>
                  <td className="border-2 border-gray-800 p-3 text-orange-600 dark:text-orange-400">
                    {isZh ? '较高风险' : 'Higher risk'}
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">1:500</td>
                  <td className="border-2 border-gray-800 p-3">$220</td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '市场波动9.8%' : '9.8% market move'}
                  </td>
                  <td className="border-2 border-gray-800 p-3 text-red-600 dark:text-red-400">
                    {isZh ? '极高风险' : 'Very high risk'}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm mt-2">
              {isZh
                ? '* 假设：账户$10,000，交易1标准手EUR/USD @ 1.1000'
                : '* Assumptions: $10,000 account, 1 standard lot EUR/USD @ 1.1000'}
            </p>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-[#0a0a0a] border-l-4 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '💡 关键洞察' : '💡 Key Insight'}
            </h3>
            <p className="mb-3">
              {isZh
                ? '高杠杆并不会提高你的盈利能力，它只是减少了所需保证金。但同时，它也减少了你的安全边际。'
                : 'High leverage doesn\'t increase profitability - it only reduces required margin. But simultaneously, it reduces your safety margin.'}
            </p>
            <p className="text-gray-300">
              <strong className="text-white">{isZh ? '建议选择：' : 'Recommended choice:'}</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li className="text-gray-300">
                {isZh ? '新手：1:50 - 1:100' : 'Beginners: 1:50 - 1:100'}
              </li>
              <li className="text-gray-300">
                {isZh ? '有经验者：1:100 - 1:200' : 'Experienced: 1:100 - 1:200'}
              </li>
              <li className="text-gray-300">
                {isZh ? '专业交易员：1:100 (但实际使用低杠杆)' : 'Professionals: 1:100 (but use low effective leverage)'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Margin Call */}
      <section id="margin-call" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '追加保证金与强制平仓' : 'Margin Call and Forced Liquidation'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '当账户净值降低到一定程度，经纪商会采取措施保护自己（和你）免受更大损失：'
              : 'When account equity drops to certain levels, brokers take measures to protect themselves (and you) from greater losses:'}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '⚠️ 追加保证金 (Margin Call)' : '⚠️ Margin Call'}
              </h3>
              <p className="mb-3">
                {isZh
                  ? '当保证金比例降至100%左右时，经纪商会发出警告。'
                  : 'When margin level drops to ~100%, broker issues warning.'}
              </p>
              <p className="text-sm">
                {isZh
                  ? '此时你有三个选择：1) 入金增加保证金；2) 平掉部分仓位；3) 什么都不做，等待强平。'
                  : 'Three choices: 1) Deposit more funds; 2) Close some positions; 3) Do nothing, await liquidation.'}
              </p>
            </div>

            <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '🚨 强制平仓 (Stop Out)' : '🚨 Stop Out'}
              </h3>
              <p className="mb-3">
                {isZh
                  ? '当保证金比例降至50%-20%时，系统自动平仓。'
                  : 'When margin level drops to 50%-20%, system auto-closes positions.'}
              </p>
              <p className="text-sm">
                {isZh
                  ? '通常从亏损最大的仓位开始平，直到保证金比例恢复到安全水平。'
                  : 'Usually starts with largest losing position, closes until margin level recovers.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '强制平仓实例' : 'Liquidation Example'}
            </h3>
            <div className="space-y-3 font-mono text-sm">
              <p className="text-gray-300">{isZh ? '初始状态：' : 'Initial:'}</p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">
                  {isZh ? '账户余额：' : 'Balance:'} $10,000
                </li>
                <li className="text-gray-300">
                  {isZh ? '交易：' : 'Trade:'} 5 {isZh ? '标准手' : 'lots'} EUR/USD @ 1.1000
                </li>
                <li className="text-gray-300">
                  {isZh ? '已用保证金：' : 'Used Margin:'} $5,500 (1:100 {isZh ? '杠杆' : 'leverage'})
                </li>
                <li className="text-gray-300">
                  {isZh ? '保证金比例：' : 'Margin Level:'} 182%
                </li>
              </ul>

              <p className="border-t border-white/20 dark:border-black/20 pt-3 mt-3">
                {isZh ? '市场下跌100点后：' : 'After 100-pip drop:'}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">
                  {isZh ? '浮动亏损：' : 'Floating loss:'} -$5,000
                </li>
                <li className="text-gray-300">
                  {isZh ? '净值：' : 'Equity:'} $10,000 - $5,000 = $5,000
                </li>
                <li className="text-gray-300">
                  {isZh ? '保证金比例：' : 'Margin Level:'} ($5,000 ÷ $5,500) × 100% = <strong className="text-red-400">91%</strong>
                </li>
                <li className="text-red-400">
                  🚨 {isZh ? '触发强制平仓（假设止损水平100%）' : 'Triggers liquidation (assuming 100% stop out)'}
                </li>
              </ul>

              <p className="mt-4 text-white/80 dark:text-gray-300/80">
                {isZh
                  ? '结果：账户从$10,000亏损至约$5,000，仅市场波动0.9%。'
                  : 'Result: Account drops from $10,000 to ~$5,000, only 0.9% market move.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-[#0a0a0a] border-l-4 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '如何避免强制平仓？' : 'How to Avoid Liquidation?'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '控制仓位：' : 'Control position size:'}</strong>{' '}
                {isZh
                  ? '单笔交易风险不超过账户的1-2%'
                  : 'Risk no more than 1-2% per trade'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '设置止损：' : 'Set stop losses:'}</strong>{' '}
                {isZh
                  ? '每笔交易都必须有预设止损'
                  : 'Every trade must have predefined stop loss'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '保持充足可用保证金：' : 'Maintain adequate free margin:'}</strong>{' '}
                {isZh
                  ? '已用保证金建议不超过总资金的30%'
                  : 'Used margin should not exceed 30% of total capital'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '避免过度交易：' : 'Avoid overtrading:'}</strong>{' '}
                {isZh
                  ? '不要同时持有过多头寸'
                  : 'Don\'t hold too many positions simultaneously'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: Risk Management */}
      <section id="risk-management" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '杠杆风险管理策略' : 'Leverage Risk Management Strategies'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '成功使用杠杆的关键不是追求高杠杆，而是有效控制风险。以下是专业交易员使用的核心策略：'
              : 'The key to successful leverage use isn\'t pursuing high leverage, but effective risk control. Here are core strategies used by professionals:'}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '策略1：2%规则' : 'Strategy 1: 2% Rule'}
              </h3>
              <p className="mb-3">
                {isZh
                  ? '单笔交易风险永远不超过账户总资金的2%。'
                  : 'Never risk more than 2% of total capital per trade.'}
              </p>
              <div className="text-sm bg-gray-50 dark:bg-[#0a0a0a] p-3">
                <p className="font-bold mb-2 text-white">{isZh ? '示例：' : 'Example:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-gray-300">
                    {isZh ? '账户：' : 'Account:'} $10,000
                  </li>
                  <li className="text-gray-300">
                    {isZh ? '2%风险：' : '2% risk:'} $200
                  </li>
                  <li className="text-gray-300">
                    {isZh ? '止损距离：' : 'Stop distance:'} 50 pips
                  </li>
                  <li className="text-gray-300">
                    {isZh ? '最大手数：' : 'Max lots:'} 0.4 {isZh ? '标准手' : 'lots'}
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '策略2：分散持仓' : 'Strategy 2: Diversify Positions'}
              </h3>
              <p className="mb-3">
                {isZh
                  ? '不要把所有资金集中在单一货币对或方向。'
                  : 'Don\'t concentrate all capital in single pair or direction.'}
              </p>
              <div className="text-sm bg-gray-50 dark:bg-[#0a0a0a] p-3">
                <p className="font-bold mb-2 text-white">{isZh ? '建议：' : 'Recommendation:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-gray-300">
                    {isZh ? '最多同时3-5个持仓' : 'Maximum 3-5 simultaneous positions'}
                  </li>
                  <li className="text-gray-300">
                    {isZh ? '避免相关性高的货币对' : 'Avoid highly correlated pairs'}
                  </li>
                  <li className="text-gray-300">
                    {isZh ? '总风险敞口不超过10%' : 'Total risk exposure <10%'}
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '策略3：降低实际杠杆' : 'Strategy 3: Reduce Effective Leverage'}
              </h3>
              <p className="mb-3">
                {isZh
                  ? '即使账户提供高杠杆，也要主动控制实际使用的杠杆水平。'
                  : 'Even with high account leverage, actively control actual leverage used.'}
              </p>
              <div className="text-sm bg-gray-50 dark:bg-[#0a0a0a] p-3">
                <p className="font-bold mb-2 text-white">{isZh ? '计算：' : 'Calculation:'}</p>
                <p className="text-gray-300">
                  {isZh ? '实际杠杆 = 持仓价值 ÷ 账户净值' : 'Effective leverage = Position value ÷ Equity'}
                </p>
                <p className="mt-2">
                  {isZh ? '目标：保持在1:5以下' : 'Target: Keep below 1:5'}
                </p>
              </div>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '策略4：阶梯式加仓' : 'Strategy 4: Pyramiding'}
              </h3>
              <p className="mb-3">
                {isZh
                  ? '不要一次性开满仓位，而是根据市场走势分批加仓。'
                  : 'Don\'t open full position at once, add gradually based on market movement.'}
              </p>
              <div className="text-sm bg-gray-50 dark:bg-[#0a0a0a] p-3">
                <p className="font-bold mb-2 text-white">{isZh ? '方法：' : 'Method:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-gray-300">
                    {isZh ? '初始仓位：50%计划仓位' : 'Initial: 50% of planned position'}
                  </li>
                  <li className="text-gray-300">
                    {isZh ? '盈利后加仓：25%' : 'Add after profit: 25%'}
                  </li>
                  <li className="text-gray-300">
                    {isZh ? '继续盈利加仓：25%' : 'Continue if profitable: 25%'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '💎 专业交易员的杠杆使用原则' : '💎 Professional Leverage Principles'}
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                ✓ {isZh ? '账户杠杆可以高（1:100-1:500），但实际杠杆必须低（1:3-1:10）' : 'Account leverage can be high (1:100-1:500), but effective leverage must be low (1:3-1:10)'}
              </li>
              <li className="text-gray-300">
                ✓ {isZh ? '杠杆是工具，不是目标。重点是风险控制，不是盈利放大' : 'Leverage is a tool, not a goal. Focus on risk control, not profit amplification'}
              </li>
              <li className="text-gray-300">
                ✓ {isZh ? '在你能承受最大亏损的前提下使用杠杆' : 'Use leverage within maximum tolerable loss limits'}
              </li>
              <li className="text-gray-300">
                ✓ {isZh ? '永远为意外留出缓冲空间（保持充足可用保证金）' : 'Always leave buffer for unexpected events (maintain adequate free margin)'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Practical Examples */}
      <section id="practical-examples" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '实战案例分析' : 'Practical Case Analysis'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              ❌ {isZh ? '案例1：过度杠杆的悲剧' : 'Case 1: Tragedy of Excessive Leverage'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '交易者A：' : 'Trader A:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">
                  {isZh ? '账户：' : 'Account:'} $5,000
                </li>
                <li className="text-gray-300">
                  {isZh ? '杠杆：' : 'Leverage:'} 1:500
                </li>
                <li className="text-gray-300">
                  {isZh ? '交易：' : 'Trade:'} 5 {isZh ? '标准手' : 'lots'} EUR/USD ({isZh ? '实际杠杆1:110' : 'effective leverage 1:110'})
                </li>
                <li className="text-gray-300">
                  {isZh ? '想法：' : 'Thinking:'} "{isZh ? '只要涨50点就能赚$2,500！' : 'Just 50 pips up = $2,500 profit!'}"
                </li>
              </ul>
              <p className="mt-3">
                <strong className="text-white">{isZh ? '结果：' : 'Result:'}</strong>{' '}
                {isZh
                  ? '市场反向波动45点，账户爆仓，损失$5,000（100%）'
                  : 'Market moves 45 pips against, account liquidated, $5,000 loss (100%)'}
              </p>
              <p className="text-red-600 dark:text-red-400 font-bold">
                {isZh
                  ? '💀 错误：过度杠杆 + 无止损 + 赌博心态'
                  : '💀 Mistakes: Excessive leverage + No stop loss + Gambling mentality'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-600">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              ✅ {isZh ? '案例2：专业风险管理' : 'Case 2: Professional Risk Management'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '交易者B：' : 'Trader B:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">
                  {isZh ? '账户：' : 'Account:'} $5,000
                </li>
                <li className="text-gray-300">
                  {isZh ? '杠杆：' : 'Leverage:'} 1:100
                </li>
                <li className="text-gray-300">
                  {isZh ? '交易：' : 'Trade:'} 0.2 {isZh ? '标准手' : 'lots'} EUR/USD ({isZh ? '实际杠杆1:4.4' : 'effective leverage 1:4.4'})
                </li>
                <li className="text-gray-300">
                  {isZh ? '止损：' : 'Stop loss:'} 50 pips ({isZh ? '风险$100 = 2%账户' : 'risk $100 = 2% account'})
                </li>
                <li className="text-gray-300">
                  {isZh ? '止盈：' : 'Take profit:'} 150 pips ({isZh ? '目标$300 = 风险回报1:3' : 'target $300 = 1:3 R:R'})
                </li>
              </ul>
              <p className="mt-3">
                <strong className="text-white">{isZh ? '结果：' : 'Result:'}</strong>{' '}
                {isZh
                  ? '即使这笔交易止损，只损失$100（2%）。10笔交易中赢4笔，总体盈利。'
                  : 'Even if stopped out, only loses $100 (2%). Winning 4 out of 10 trades yields overall profit.'}
              </p>
              <p className="text-green-600 dark:text-green-400 font-bold">
                {isZh
                  ? '✅ 正确：低杠杆 + 严格止损 + 良好风险回报比'
                  : '✅ Correct: Low leverage + Strict stops + Good risk-reward ratio'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
