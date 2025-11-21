import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { brokerSelectionContent } from '@/content/education/broker-selection-guide.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = brokerSelectionContent[lang];

  return generateBilingualMetadata(
    brokerSelectionContent.zh.title,
    brokerSelectionContent.en.title,
    brokerSelectionContent.zh.description,
    brokerSelectionContent.en.description,
    brokerSelectionContent.zh.keywords,
    brokerSelectionContent.en.keywords,
    lang
  );
}

export default async function BrokerSelectionGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = brokerSelectionContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: Why Important */}
      <section id="why-important" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '为什么经纪商选择如此重要？' : 'Why Broker Selection Matters'}
        </h2>
        <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '选择经纪商是外汇交易中最重要的决定之一。一个错误的选择可能导致资金全部损失，即使你的交易策略完全正确。'
              : 'Choosing a broker is one of the most critical decisions in forex trading. A wrong choice could lead to total capital loss, even with a perfect trading strategy.'}
          </p>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '真实案例：选错经纪商的代价' : 'Real Case: Cost of Wrong Broker Choice'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '案例1：虚假监管平台' : 'Case 1: Fake Regulation Platform'}</strong>
              </p>
              <p className="text-gray-300">
                {isZh
                  ? '交易者李某在某平台投入$10,000，平台宣称受"英国FCA"监管。3个月后李某盈利至$18,000，申请出金却被拒绝。调查发现该平台监管号是伪造的，公司根本不存在。最终血本无归。'
                  : 'Trader Li invested $10,000 on a platform claiming "UK FCA" regulation. After 3 months, profits reached $18,000, but withdrawal was denied. Investigation revealed fake license number and non-existent company. Total loss.'}
              </p>
              <p className="text-gray-300">
                <strong className="text-red-600 dark:text-red-400">
                  {isZh ? '损失：$10,000（100%本金）' : 'Loss: $10,000 (100% capital)'}
                </strong>
              </p>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '案例2：严重滑点与拒绝成交' : 'Case 2: Severe Slippage and Execution Rejection'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                {isZh
                  ? '交易者王某使用超低点差经纪商，点差仅0.2点。但每次盈利交易都会遭遇3-5点滑点，亏损交易则精准成交。更糟糕的是，大行情时系统频繁"断线"，止损单无法执行。'
                  : 'Trader Wang used an ultra-low spread broker (0.2 pips). Every profitable trade encountered 3-5 pip slippage, while losing trades executed precisely. Worse, system "disconnected" during major moves, stop-loss orders failed to execute.'}
              </p>
              <p className="text-gray-300">
                <strong className="text-yellow-600 dark:text-yellow-400">
                  {isZh ? '结果：虽有正确策略，但因执行问题长期亏损' : 'Result: Despite correct strategy, long-term losses due to execution issues'}
                </strong>
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-[#0a0a0a] border-l-4 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '选择可靠经纪商的核心原则' : 'Core Principles for Choosing Reliable Brokers'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '监管优先：' : 'Regulation First:'}</strong>{' '}
                {isZh ? '严格监管是资金安全的唯一保障' : 'Strict regulation is the only guarantee of fund security'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '成本次之：' : 'Cost Secondary:'}</strong>{' '}
                {isZh ? '点差再低也比不上保住本金重要' : 'Low spreads mean nothing if capital is lost'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '执行质量：' : 'Execution Quality:'}</strong>{' '}
                {isZh ? '滑点和拒绝成交会蚕食所有利润' : 'Slippage and rejections will erode all profits'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '出金保障：' : 'Withdrawal Protection:'}</strong>{' '}
                {isZh ? '能否顺利取出盈利是关键' : 'Ability to withdraw profits is crucial'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: Regulation */}
      <section id="regulation" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '监管资质：首要考察标准' : 'Regulation: Primary Criterion'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '监管机构是经纪商与交易者之间的"裁判"。严格的监管意味着：资金隔离、定期审计、赔偿计划、投诉机制。以下是全球公认的四大监管机构：'
              : 'Regulators act as "referees" between brokers and traders. Strict regulation means: fund segregation, regular audits, compensation schemes, complaint mechanisms. Here are four globally recognized top regulators:'}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-800">
              <thead>
                <tr className="bg-gray-900 text-gray-300">
                  <th className="border-2 border-gray-800 p-3 text-left">
                    {isZh ? '监管机构' : 'Regulator'}
                  </th>
                  <th className="border-2 border-gray-800 p-3 text-left">
                    {isZh ? '国家' : 'Country'}
                  </th>
                  <th className="border-2 border-gray-800 p-3 text-left">
                    {isZh ? '赔偿上限' : 'Compensation Limit'}
                  </th>
                  <th className="border-2 border-gray-800 p-3 text-left">
                    {isZh ? '特点' : 'Features'}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-300 dark:text-gray-300">
                <tr>
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">FCA</td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '英国' : 'UK'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">£85,000</td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '全球最严格，资金强制隔离' : 'Strictest globally, mandatory segregation'}
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">ASIC</td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '澳大利亚' : 'Australia'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">A$400,000</td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '严格监管，赔偿额度高' : 'Strict oversight, high compensation'}
                  </td>
                </tr>
                <tr>
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">NFA</td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '美国' : 'USA'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '无上限（资金分离）' : 'No limit (segregation)'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '杠杆限制50:1，保护性强' : '50:1 leverage limit, strong protection'}
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">CySEC</td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '塞浦路斯' : 'Cyprus'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">€20,000</td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '欧盟监管，接受度高' : 'EU regulation, widely accepted'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '如何验证监管牌照真伪？（三步验证法）' : 'How to Verify Regulation License? (3-Step Verification)'}
            </h3>
            <div className="space-y-3 font-mono text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '步骤1：' : 'Step 1:'}</strong>{' '}
                {isZh ? '访问监管机构官网' : 'Visit regulator\'s official website'}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">FCA: www.fca.org.uk/firms</li>
                <li className="text-gray-300">ASIC: connectonline.asic.gov.au</li>
                <li className="text-gray-300">NFA: www.nfa.futures.org/basicnet</li>
                <li className="text-gray-300">CySEC: www.cysec.gov.cy</li>
              </ul>

              <p className="border-t border-white/20 dark:border-black/20 pt-3 mt-3">
                <strong className="text-white">{isZh ? '步骤2：' : 'Step 2:'}</strong>{' '}
                {isZh ? '在查询系统中输入经纪商名称或牌照号' : 'Enter broker name or license number in search system'}
              </p>

              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '步骤3：' : 'Step 3:'}</strong>{' '}
                {isZh
                  ? '确认监管范围包含"外汇保证金交易"或"CFD交易"'
                  : 'Confirm regulatory scope includes "forex margin trading" or "CFD trading"'}
              </p>

              <p className="mt-4 text-white/80 dark:text-gray-300/80">
                {isZh
                  ? '⚠️ 警惕：部分黑平台会盗用真实监管号（套牌），务必核对公司名称是否一致！'
                  : '⚠️ Beware: Some scam platforms steal real license numbers (cloning). Always verify company name matches!'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Broker Types */}
      <section id="broker-types" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '经纪商类型对比：MM vs STP vs ECN' : 'Broker Type Comparison: MM vs STP vs ECN'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '经纪商的类型决定了你的订单如何被执行。理解三种主要类型的差异，有助于选择最适合自己的平台：'
              : 'Broker type determines how your orders are executed. Understanding the three main types helps choose the platform best suited for you:'}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-800">
              <thead>
                <tr className="bg-gray-900 text-gray-300">
                  <th className="border-2 border-gray-800 p-3 text-left">
                    {isZh ? '特征' : 'Feature'}
                  </th>
                  <th className="border-2 border-gray-800 p-3 text-left">MM</th>
                  <th className="border-2 border-gray-800 p-3 text-left">STP</th>
                  <th className="border-2 border-gray-800 p-3 text-left">ECN</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 dark:text-gray-300">
                <tr>
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">
                    {isZh ? '订单执行方式' : 'Order Execution'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '经纪商内部对冲' : 'Internal broker matching'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '直达流动性提供商' : 'Direct to liquidity providers'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '银行间市场匹配' : 'Interbank market matching'}
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">
                    {isZh ? '点差类型' : 'Spread Type'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '固定，2-3点' : 'Fixed, 2-3 pips'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '浮动，1-2点' : 'Floating, 1-2 pips'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '浮动，0.2-1点' : 'Floating, 0.2-1 pips'}
                  </td>
                </tr>
                <tr>
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">
                    {isZh ? '佣金' : 'Commission'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '无' : 'None'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '通常无' : 'Usually none'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">$3-7/{isZh ? '手' : 'lot'}</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">
                    {isZh ? '利益冲突' : 'Conflict of Interest'}
                  </td>
                  <td className="border-2 border-gray-800 p-3 text-yellow-600 dark:text-yellow-400">
                    {isZh ? '有（对赌模式）' : 'Yes (betting model)'}
                  </td>
                  <td className="border-2 border-gray-800 p-3 text-green-600 dark:text-green-400">
                    {isZh ? '低' : 'Low'}
                  </td>
                  <td className="border-2 border-gray-800 p-3 text-green-600 dark:text-green-400">
                    {isZh ? '无' : 'None'}
                  </td>
                </tr>
                <tr>
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">
                    {isZh ? '执行速度' : 'Execution Speed'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '快' : 'Fast'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '较快' : 'Fairly fast'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '最快' : 'Fastest'}
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                  <td className="border-2 border-gray-800 p-3 font-bold text-white">
                    {isZh ? '适合人群' : 'Best For'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '新手、小资金' : 'Beginners, small capital'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '中级交易者' : 'Intermediate traders'}
                  </td>
                  <td className="border-2 border-gray-800 p-3">
                    {isZh ? '专业交易者、高频交易' : 'Professionals, high-frequency'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                MM {isZh ? '做市商' : 'Market Maker'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? '经纪商充当交易对手方，你买它卖，你卖它买。固定点差，成本可预测。'
                  : 'Broker acts as counterparty. You buy, they sell; you sell, they buy. Fixed spreads, predictable costs.'}
              </p>
              <p className="text-sm">
                <strong className="text-green-600 dark:text-green-400">✅ {isZh ? '优点：' : 'Pros:'}</strong>{' '}
                {isZh ? '简单、稳定、适合新手' : 'Simple, stable, beginner-friendly'}
              </p>
              <p className="text-sm">
                <strong className="text-red-600 dark:text-red-400">❌ {isZh ? '缺点：' : 'Cons:'}</strong>{' '}
                {isZh ? '可能存在利益冲突' : 'Potential conflict of interest'}
              </p>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                STP {isZh ? '直通式处理' : 'Straight Through Processing'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? '订单直接发送到流动性提供商，无交易台干预。更透明，点差浮动。'
                  : 'Orders sent directly to liquidity providers without dealing desk intervention. More transparent, floating spreads.'}
              </p>
              <p className="text-sm">
                <strong className="text-green-600 dark:text-green-400">✅ {isZh ? '优点：' : 'Pros:'}</strong>{' '}
                {isZh ? '透明度高、无对赌' : 'High transparency, no betting'}
              </p>
              <p className="text-sm">
                <strong className="text-red-600 dark:text-red-400">❌ {isZh ? '缺点：' : 'Cons:'}</strong>{' '}
                {isZh ? '点差可能扩大' : 'Spreads may widen'}
              </p>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                ECN {isZh ? '电子通讯网络' : 'Electronic Communication Network'}
              </h3>
              <p className="mb-3 text-sm">
                {isZh
                  ? '直接进入银行间市场，与全球银行、对冲基金的订单匹配。点差最低。'
                  : 'Direct access to interbank market, orders matched with global banks and hedge funds. Lowest spreads.'}
              </p>
              <p className="text-sm">
                <strong className="text-green-600 dark:text-green-400">✅ {isZh ? '优点：' : 'Pros:'}</strong>{' '}
                {isZh ? '最透明、点差最低' : 'Most transparent, lowest spreads'}
              </p>
              <p className="text-sm">
                <strong className="text-red-600 dark:text-red-400">❌ {isZh ? '缺点：' : 'Cons:'}</strong>{' '}
                {isZh ? '需支付佣金' : 'Commission required'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Trading Conditions */}
      <section id="trading-conditions" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '交易条件评估' : 'Trading Conditions Assessment'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '除了监管和类型，还需要评估经纪商的具体交易条件。以下是关键指标：'
              : 'Beyond regulation and type, evaluate specific trading conditions. Here are key metrics:'}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '点差与佣金' : 'Spreads & Commission'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">
                  <strong className="text-white">EUR/USD:</strong> {isZh ? '典型点差0.5-3点' : 'Typical spread 0.5-3 pips'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">GBP/USD:</strong> {isZh ? '典型点差1-4点' : 'Typical spread 1-4 pips'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '佣金：' : 'Commission:'}</strong>{' '}
                  {isZh ? 'ECN账户$3-7/标准手' : 'ECN accounts $3-7/standard lot'}
                </li>
                <li className="text-yellow-600 dark:text-yellow-400">
                  {isZh
                    ? '⚠️ 警惕超低点差平台，可能通过滑点盈利'
                    : '⚠️ Beware ultra-low spread platforms, may profit through slippage'}
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '杠杆与保证金' : 'Leverage & Margin'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '常见杠杆：' : 'Common leverage:'}</strong> 1:50 - 1:500
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '建议新手：' : 'Beginner recommendation:'}</strong> 1:50 - 1:100
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '监管限制：' : 'Regulatory limits:'}</strong>{' '}
                  {isZh ? 'FCA最高1:30，NFA最高1:50' : 'FCA max 1:30, NFA max 1:50'}
                </li>
                <li className="text-green-600 dark:text-green-400">
                  {isZh
                    ? '✅ 高杠杆不等于高风险，关键是如何使用'
                    : '✅ High leverage ≠ high risk, key is how you use it'}
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '最低入金与手数' : 'Minimum Deposit & Lot Size'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '标准账户：' : 'Standard account:'}</strong> $100 - $500
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? 'ECN账户：' : 'ECN account:'}</strong> $200 - $1,000
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '最小手数：' : 'Min lot size:'}</strong> 0.01 {isZh ? '手（微型手）' : 'lot (micro)'}
                </li>
                <li className="text-blue-600 dark:text-blue-400">
                  {isZh
                    ? '💡 新手建议：至少$500起步，控制风险'
                    : '💡 Beginner tip: Start with at least $500, control risk'}
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '订单执行质量' : 'Order Execution Quality'}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '执行速度：' : 'Execution speed:'}</strong>{' '}
                  {isZh ? '应小于100毫秒' : 'Should be <100ms'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '滑点控制：' : 'Slippage control:'}</strong>{' '}
                  {isZh ? '正常市场<1点' : 'Normal market <1 pip'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '拒绝率：' : 'Rejection rate:'}</strong>{' '}
                  {isZh ? '应低于1%' : 'Should be <1%'}
                </li>
                <li className="text-red-600 dark:text-red-400">
                  {isZh
                    ? '❌ 频繁滑点和拒绝是黑平台标志'
                    : '❌ Frequent slippage and rejections indicate scam platform'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Fund Security */}
      <section id="fund-security" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '资金安全与出金保障' : 'Fund Security and Withdrawal Protection'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '资金安全是选择经纪商的首要考量。即使盈利再多,如果无法顺利出金,也是竹篮打水一场空。'
              : 'Fund security is the primary consideration when choosing a broker. Even with great profits, if you cannot withdraw, it\'s all for nothing.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '三层资金保护机制' : 'Three-Layer Fund Protection Mechanism'}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold mb-2 text-white">
                  {isZh ? '第一层：资金隔离（Segregated Accounts）' : 'Layer 1: Segregated Accounts'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '客户资金与经纪商运营资金完全分离，存放在独立的托管银行账户中。即使经纪商破产，客户资金也不会被挪用。'
                    : 'Client funds completely separated from broker operational funds, stored in independent custodial bank accounts. Even if broker bankrupts, client funds remain protected.'}
                </p>
                <p className="text-sm mt-2 text-green-400 dark:text-green-600">
                  ✅ {isZh ? 'FCA、ASIC强制要求' : 'Mandatory under FCA, ASIC'}
                </p>
              </div>

              <div className="border-t border-white/20 dark:border-black/20 pt-4">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '第二层：赔偿计划（Compensation Scheme）' : 'Layer 2: Compensation Scheme'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '如果经纪商破产且资金隔离出现问题，监管机构的赔偿计划会进行补偿：'
                    : 'If broker bankrupts and segregation fails, regulator compensation schemes provide coverage:'}
                </p>
                <ul className="text-sm mt-2 space-y-1 list-disc pl-6">
                  <li className="text-gray-300">UK FSCS: {isZh ? '最高' : 'Up to'} £85,000</li>
                  <li className="text-gray-300">Australia FCS: {isZh ? '最高' : 'Up to'} A$400,000</li>
                  <li className="text-gray-300">Cyprus ICF: {isZh ? '最高' : 'Up to'} €20,000</li>
                </ul>
              </div>

              <div className="border-t border-white/20 dark:border-black/20 pt-4">
                <p className="font-bold mb-2 text-white">
                  {isZh ? '第三层：定期审计（Regular Audits）' : 'Layer 3: Regular Audits'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '严格监管的经纪商需要定期接受第三方会计师事务所的财务审计，并向监管机构报告。'
                    : 'Strictly regulated brokers undergo regular third-party accountant financial audits and report to regulators.'}
                </p>
                <p className="text-sm mt-2 text-blue-400 dark:text-blue-600">
                  💡 {isZh ? '可在经纪商官网查看审计报告' : 'Audit reports available on broker websites'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-[#0a0a0a] border-l-4 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '出金流程评估清单' : 'Withdrawal Process Assessment Checklist'}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '出金速度：' : 'Withdrawal speed:'}</strong>{' '}
                {isZh ? '1-3个工作日为正常水平' : '1-3 business days is normal'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '出金手续费：' : 'Withdrawal fees:'}</strong>{' '}
                {isZh ? '电汇$20-50，电子钱包通常免费' : 'Wire $20-50, e-wallets usually free'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '最低出金额：' : 'Min withdrawal:'}</strong>{' '}
                {isZh ? '通常$50-100' : 'Typically $50-100'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '身份验证：' : 'ID verification:'}</strong>{' '}
                {isZh ? '首次出金需要KYC，合理合规' : 'KYC required for first withdrawal, reasonable and compliant'}
              </li>
              <li className="text-red-600 dark:text-red-400">
                ❌{' '}
                {isZh
                  ? '警惕：要求额外文件、反复拖延、设置过高门槛的平台'
                  : 'Warning: Platforms requiring excessive documents, repeated delays, or unreasonable thresholds'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Red Flags */}
      <section id="red-flags" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '黑平台识别：10大危险信号' : 'Scam Broker Identification: 10 Warning Signs'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '识别黑平台的能力可以保护你免受巨额损失。以下是10个明显的危险信号，遇到任何一个都应立即远离：'
              : 'Ability to identify scam platforms protects you from massive losses. Here are 10 clear warning signs - encountering any should prompt immediate avoidance:'}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">🚨</span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    1. {isZh ? '虚假或套牌监管' : 'Fake or Cloned Regulation'}
                  </h3>
                </div>
              </div>
              <p className="text-sm">
                {isZh
                  ? '宣称受监管但无法在监管机构官网查询到，或盗用其他公司的监管号。'
                  : 'Claims regulation but cannot be verified on regulator website, or uses stolen license numbers.'}
              </p>
            </div>

            <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">💸</span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    2. {isZh ? '出金困难或拒绝' : 'Withdrawal Difficulties or Rejection'}
                  </h3>
                </div>
              </div>
              <p className="text-sm">
                {isZh
                  ? '以各种理由拖延出金：需要额外文件、达到更高交易量、缴纳"税费"等。'
                  : 'Delays withdrawals with various excuses: additional documents needed, higher trading volume required, "tax" payment, etc.'}
              </p>
            </div>

            <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">📉</span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    3. {isZh ? '严重滑点和报价异常' : 'Severe Slippage and Abnormal Quotes'}
                  </h3>
                </div>
              </div>
              <p className="text-sm">
                {isZh
                  ? '盈利订单滑点严重，亏损订单精准成交；价格与其他平台差异巨大。'
                  : 'Profitable orders suffer severe slippage, losing orders execute precisely; prices vastly differ from other platforms.'}
              </p>
            </div>

            <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    4. {isZh ? '过度营销和高额赠金' : 'Excessive Marketing and High Bonuses'}
                  </h3>
                </div>
              </div>
              <p className="text-sm">
                {isZh
                  ? '承诺300%赠金、保证盈利、无风险交易等不切实际的好处。'
                  : 'Promises 300% bonuses, guaranteed profits, risk-free trading, and other unrealistic benefits.'}
              </p>
            </div>

            <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">📞</span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    5. {isZh ? '强制销售和骚扰' : 'Aggressive Sales and Harassment'}
                  </h3>
                </div>
              </div>
              <p className="text-sm">
                {isZh
                  ? '频繁致电催促入金，承诺"内幕消息"，推荐"保证盈利"的信号服务。'
                  : 'Frequent calls urging deposits, promising "insider information," recommending "guaranteed profit" signal services.'}
              </p>
            </div>

            <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">🌐</span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    6. {isZh ? '网站和平台不专业' : 'Unprofessional Website and Platform'}
                  </h3>
                </div>
              </div>
              <p className="text-sm">
                {isZh
                  ? '网站信息不完整，联系方式模糊，平台频繁断线或卡顿。'
                  : 'Incomplete website info, vague contact details, platform frequently disconnects or lags.'}
              </p>
            </div>

            <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">🏝️</span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    7. {isZh ? '离岸监管或无监管' : 'Offshore Regulation or Unregulated'}
                  </h3>
                </div>
              </div>
              <p className="text-sm">
                {isZh
                  ? '注册在"避税天堂"（如BVI、Seychelles），监管宽松，客户保护极弱。'
                  : 'Registered in "tax havens" (like BVI, Seychelles), lax regulation, minimal client protection.'}
              </p>
            </div>

            <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">💬</span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    8. {isZh ? '大量负面评价' : 'Numerous Negative Reviews'}
                  </h3>
                </div>
              </div>
              <p className="text-sm">
                {isZh
                  ? '在ForexPeaceArmy、WikiFX等平台上有大量出金困难、欺诈投诉。'
                  : 'Many withdrawal difficulty and fraud complaints on ForexPeaceArmy, WikiFX, and other platforms.'}
              </p>
            </div>

            <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    9. {isZh ? '账户突然被冻结' : 'Account Suddenly Frozen'}
                  </h3>
                </div>
              </div>
              <p className="text-sm">
                {isZh
                  ? '盈利后账户被冻结，以"违规交易"、"套利行为"等理由扣押资金。'
                  : 'Account frozen after profits, funds seized citing "irregular trading," "arbitrage," etc.'}
              </p>
            </div>

            <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">🎰</span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    10. {isZh ? '模拟盘与实盘差异巨大' : 'Huge Demo vs Live Account Differences'}
                  </h3>
                </div>
              </div>
              <p className="text-sm">
                {isZh
                  ? '模拟盘一切正常，实盘交易时点差扩大、滑点严重、执行延迟。'
                  : 'Demo account normal, live trading shows wider spreads, severe slippage, execution delays.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '遇到黑平台怎么办？' : 'What to Do When Encountering Scam Platform?'}
            </h3>
            <ol className="list-decimal pl-6 space-y-2 text-sm">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '立即停止交易：' : 'Stop trading immediately:'}</strong>{' '}
                {isZh ? '不要追加入金' : 'Do not deposit more funds'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '保留所有证据：' : 'Preserve all evidence:'}</strong>{' '}
                {isZh ? '交易记录、聊天记录、转账凭证' : 'Trading records, chat logs, transfer receipts'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '向监管机构投诉：' : 'File complaint with regulator:'}</strong>{' '}
                {isZh ? '如果平台确实受监管' : 'If platform is actually regulated'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '在曝光平台发布：' : 'Post on exposure platforms:'}</strong>{' '}
                ForexPeaceArmy, WikiFX
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '考虑法律途径：' : 'Consider legal action:'}</strong>{' '}
                {isZh ? '金额较大可咨询律师' : 'Consult lawyer for large amounts'}
              </li>
            </ol>
          </div>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
