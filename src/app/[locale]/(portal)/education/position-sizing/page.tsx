import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { getBrandConfig } from '@/lib/brand-config';
import { positionSizingContent } from '@/content/education/position-sizing.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();

  return generateBilingualMetadata(
    positionSizingContent.zh.title,
    positionSizingContent.en.title,
    positionSizingContent.zh.description,
    positionSizingContent.en.description,
    positionSizingContent.zh.keywords,
    positionSizingContent.en.keywords,
    lang,
    brandConfig
  );
}

export default async function PositionSizingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();
  const content = positionSizingContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: What is Position Sizing */}
      <section id="what-is-position-sizing" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? '什么是仓位控制？' : 'What is Position Sizing?'}
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            {isZh
              ? '仓位控制（Position Sizing）是指根据账户资金、风险承受能力和市场条件，科学计算每笔交易应该开多少手/仓位的方法。它是风险管理的核心执行环节，直接决定了你在既定止损距离下承担多大风险。仓位控制不是简单的"开1手还是0.5手"，而是一套系统化的资金管理方法论，包括固定比例法、凯利公式、动态调整等多种策略。'
              : 'Position Sizing refers to scientifically calculating how many lots/position to open per trade based on account capital, risk tolerance, and market conditions. It\'s the core execution of risk management, directly determining how much risk you take at a given stop distance. Position sizing isn\'t simply "open 1 lot or 0.5 lot", but a systematic money management methodology including fixed fractional, Kelly Criterion, dynamic adjustment and other strategies.'}
          </p>

          <div className="p-6 bg-black dark:bg-white text-white dark:text-black">
            <h3 className="text-xl font-bold mb-4">{isZh ? '仓位控制的重要性' : 'Importance of Position Sizing'}</h3>
            <ul className="space-y-3">
              <li>
                <strong>{isZh ? '1. 风险控制的最后防线：' : '1. Last Line of Risk Control:'}</strong>{' '}
                {isZh
                  ? '即使设置了止损，如果仓位过大（如满仓），单次止损仍可能导致账户重创或爆仓。正确的仓位控制确保即使连续止损，账户仍有回旋余地。例如，$10,000账户开10手EUR/USD，止损30点就亏$3,000（30%）；但开0.67手，止损30点只亏$200（2%）。'
                  : 'Even with stop-loss set, if position too large (e.g., full position), single stop can still devastate account or cause blow-up. Proper position sizing ensures even consecutive stops, account still has recovery room. E.g., $10,000 account opening 10 lots EUR/USD, 30 pip stop loses $3,000 (30%); but opening 0.67 lots, 30 pip stop only loses $200 (2%).'}
              </li>
              <li>
                <strong>{isZh ? '2. 复利增长的基础：' : '2. Foundation of Compound Growth:'}</strong>{' '}
                {isZh
                  ? '科学的仓位控制让账户随盈利自然增长。初期$10,000开0.7手，6个月后账户$15,000自动增至1.05手，实现复利效应。如果一直固定1手，就错过了资金增长带来的收益放大。'
                  : 'Scientific position sizing allows account to naturally grow with profits. Initially $10,000 opens 0.7 lots, after 6 months account $15,000 automatically increases to 1.05 lots, achieving compound effect. If always fixed 1 lot, miss profit amplification from capital growth.'}
              </li>
              <li>
                <strong>{isZh ? '3. 心理压力管理：' : '3. Psychological Pressure Management:'}</strong>{' '}
                {isZh
                  ? '过大的仓位会导致极大的心理压力，每个价格波动都让你紧张。合理的仓位（单笔风险1-2%）让你在交易中保持冷静，即使触发止损也不会影响情绪和判断。'
                  : 'Oversized position causes extreme psychological pressure, every price movement makes you nervous. Reasonable position (1-2% per-trade risk) keeps you calm in trading, even stop hit doesn\'t affect emotions and judgment.'}
              </li>
              <li>
                <strong>{isZh ? '4. 策略表现评估：' : '4. Strategy Performance Evaluation:'}</strong>{' '}
                {isZh
                  ? '一致的仓位控制让你能够准确评估策略真实表现。如果每笔交易风险不同（今天2%，明天5%），就无法判断盈亏是因为策略还是仓位控制。固定风险百分比确保数据可比性。'
                  : 'Consistent position sizing allows accurate evaluation of strategy true performance. If per-trade risk varies (2% today, 5% tomorrow), cannot judge if profit/loss due to strategy or position sizing. Fixed risk percentage ensures data comparability.'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '⚠️ 错误仓位控制的典型后果' : '⚠️ Typical Consequences of Wrong Position Sizing'}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>
                <strong>{isZh ? '过大仓位：' : 'Oversized Position:'}</strong>{' '}
                {isZh ? '单笔风险5-10%，连续3次止损就亏损15-30%，心理崩溃，账户难以恢复。需要50-100%收益才能回本。' : 'Per-trade risk 5-10%, 3 consecutive stops lose 15-30%, psychological collapse, account hard to recover. Need 50-100% return to break even.'}
              </li>
              <li>
                <strong>{isZh ? '过小仓位：' : 'Undersized Position:'}</strong>{' '}
                {isZh ? '单笔风险0.1-0.5%，即使策略正确，盈利速度极慢，浪费时间和机会成本。心理上也难以保持积极性。' : 'Per-trade risk 0.1-0.5%, even with correct strategy, profit speed extremely slow, waste time and opportunity cost. Psychologically hard to stay motivated.'}
              </li>
              <li>
                <strong>{isZh ? '随意调整：' : 'Random Adjustment:'}</strong>{' '}
                {isZh ? '盈利后加倍仓位，亏损后减半，导致风险不一致，无法评估策略真实表现，也容易情绪化交易。' : 'Double position after wins, half after losses, causes inconsistent risk, cannot evaluate true strategy performance, also prone to emotional trading.'}
              </li>
              <li>
                <strong>{isZh ? '忽视波动性：' : 'Ignoring Volatility:'}</strong>{' '}
                {isZh ? '所有货币对用相同手数，高波动性货币对（GBP/JPY）风险是低波动性（EUR/CHF）的3-5倍，导致实际风险失控。' : 'Same lot size for all pairs, high volatility pairs (GBP/JPY) risk 3-5x low volatility (EUR/CHF), causes actual risk loss of control.'}
              </li>
              <li>
                <strong>{isZh ? '基于保证金而非风险：' : 'Based on Margin Not Risk:'}</strong>{' '}
                {isZh ? '看到账户还有$5,000保证金，就开5手，忽视了单次止损可能亏损数千美元。保证金充足≠可以重仓。' : 'Seeing account has $5,000 margin, open 5 lots, ignoring single stop could lose thousands. Sufficient margin ≠ can overlever.'}
              </li>
            </ul>
          </div>

          <div className="p-6 border-2 border-black dark:border-white">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '仓位控制的三大方法' : 'Three Major Position Sizing Methods'}
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                <p className="font-bold mb-2">
                  {isZh ? '1. 固定比例法（Fixed Fractional）' : '1. Fixed Fractional Method'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '每笔交易固定风险百分比（如2%），最简单、最常用。适合所有交易者，尤其是新手。无论账户盈亏，始终保持固定百分比，让仓位随账户自然增长或缩减。'
                    : 'Fixed risk percentage per trade (e.g., 2%), simplest, most commonly used. Suitable for all traders, especially beginners. Regardless of account profit/loss, always maintain fixed percentage, let position naturally grow or shrink with account.'}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                <p className="font-bold mb-2">
                  {isZh ? '2. 凯利公式（Kelly Criterion）' : '2. Kelly Criterion'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '根据胜率和盈亏比计算最优仓位，理论上实现最快增长。需要准确的历史数据（至少100笔交易）。建议使用半凯利或1/4凯利降低波动性。适合有经验的交易者。'
                    : 'Calculate optimal position based on win rate and profit/loss ratio, theoretically achieves fastest growth. Requires accurate historical data (at least 100 trades). Recommend using half-Kelly or 1/4-Kelly to reduce volatility. Suitable for experienced traders.'}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                <p className="font-bold mb-2">
                  {isZh ? '3. 动态调整法（Dynamic Sizing）' : '3. Dynamic Sizing Method'}
                </p>
                <p className="text-sm">
                  {isZh
                    ? '根据市场波动性（ATR）、账户表现、交易时段、货币对特性等因素动态调整仓位。最灵活，但也最复杂。适合职业交易者或使用自动化工具的交易者。'
                    : 'Dynamically adjust position based on market volatility (ATR), account performance, trading session, currency pair characteristics. Most flexible but also most complex. Suitable for professional traders or those using automated tools.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Fixed Fractional Method */}
      <section id="fixed-fractional" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? '固定比例法详解' : 'Fixed Fractional Method Explained'}
        </h2>
        <div className="space-y-6">
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              {isZh
                ? '固定比例法是最简单、最可靠的仓位控制方法，被全球90%以上的职业交易者采用。核心原则：无论账户盈亏，每笔交易的风险始终保持在账户净值的固定百分比（通常1-3%）。这种方法简单易执行，风险可控，且能实现自动复利增长。'
                : 'Fixed fractional method is the simplest, most reliable position sizing method, adopted by over 90% of professional traders worldwide. Core principle: regardless of account profit/loss, per-trade risk always maintains fixed percentage of account equity (typically 1-3%). This method is simple to execute, risk-controlled, and achieves automatic compound growth.'}
            </p>

            <div className="p-6 border-2 border-black dark:border-white">
              <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
                {isZh ? '标准计算公式' : 'Standard Calculation Formula'}
              </h3>
              <div className="p-4 bg-black dark:bg-white text-white dark:text-black text-center font-mono text-lg mb-4">
                {isZh
                  ? '手数 = (账户净值 × 风险%) / (止损点数 × 每点价值)'
                  : 'Lot Size = (Account Equity × Risk %) / (Stop Pips × Pip Value)'}
              </div>
              <div className="space-y-3 text-sm">
                <p><strong>{isZh ? '公式要素解释：' : 'Formula Components:'}</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>{isZh ? '账户净值：' : 'Account Equity:'}</strong>{' '}
                    {isZh ? '当前可用资金总额，包括已实现盈亏。注意是净值（Equity）而非余额（Balance）。' : 'Current total available funds including realized profit/loss. Note it\'s equity not balance.'}
                  </li>
                  <li>
                    <strong>{isZh ? '风险%：' : 'Risk %:'}</strong>{' '}
                    {isZh ? '单笔最大风险百分比。新手1%，中级1-2%，职业2-3%，激进最多3%。' : 'Maximum risk percentage per trade. Beginners 1%, intermediate 1-2%, professional 2-3%, aggressive maximum 3%.'}
                  </li>
                  <li>
                    <strong>{isZh ? '止损点数：' : 'Stop Pips:'}</strong>{' '}
                    {isZh ? '从入场价到止损价的距离（以点计）。基于技术分析确定，不是随意设定。' : 'Distance from entry to stop price (in pips). Determined by technical analysis, not arbitrary.'}
                  </li>
                  <li>
                    <strong>{isZh ? '每点价值：' : 'Pip Value:'}</strong>{' '}
                    {isZh ? 'EUR/USD标准手$10/点，迷你手$1/点，微型手$0.1/点。不同货币对略有差异。' : 'EUR/USD standard lot $10/pip, mini lot $1/pip, micro lot $0.1/pip. Varies slightly by pair.'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-black dark:border-white">
              <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
                {isZh ? '实例1：EUR/USD日内交易' : 'Example 1: EUR/USD Day Trade'}
              </h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="p-3 bg-gray-50 dark:bg-gray-800">
                  <p className="font-bold mb-2">{isZh ? '交易参数：' : 'Trade Parameters:'}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{isZh ? '账户净值：$10,000' : 'Account Equity: $10,000'}</li>
                    <li>{isZh ? '风险设置：2%' : 'Risk Setting: 2%'}</li>
                    <li>{isZh ? '货币对：EUR/USD' : 'Pair: EUR/USD'}</li>
                    <li>{isZh ? '入场价：1.0850' : 'Entry: 1.0850'}</li>
                    <li>{isZh ? '止损价：1.0820（30点）' : 'Stop: 1.0820 (30 pips)'}</li>
                    <li>{isZh ? '每点价值：$10（标准手）' : 'Pip Value: $10 (standard lot)'}</li>
                  </ul>
                </div>
                <div className="p-3 bg-black dark:bg-white text-white dark:text-black font-mono text-xs">
                  <p className="mb-2">{isZh ? '计算过程：' : 'Calculation:'}</p>
                  <p>Risk = $10,000 × 2% = $200</p>
                  <p>Lot = $200 / (30 × $10)</p>
                  <p>Lot = $200 / $300</p>
                  <p className="font-bold mt-1">= 0.67 lots</p>
                </div>
                <p className="mt-2">
                  <strong>{isZh ? '结论：' : 'Conclusion:'}</strong>{' '}
                  {isZh
                    ? '开仓0.6或0.7标准手，确保止损触发时亏损不超过$200（账户2%）。'
                    : 'Open 0.6 or 0.7 standard lots, ensuring stop hit loses no more than $200 (2% of account).'}
                </p>
              </div>
            </div>

            <div className="p-6 border-2 border-black dark:border-white">
              <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
                {isZh ? '实例2：GBP/JPY波段交易' : 'Example 2: GBP/JPY Swing Trade'}
              </h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="p-3 bg-gray-50 dark:bg-gray-800">
                  <p className="font-bold mb-2">{isZh ? '交易参数：' : 'Trade Parameters:'}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{isZh ? '账户净值：$5,000' : 'Account Equity: $5,000'}</li>
                    <li>{isZh ? '风险设置：1.5%' : 'Risk Setting: 1.5%'}</li>
                    <li>{isZh ? '货币对：GBP/JPY' : 'Pair: GBP/JPY'}</li>
                    <li>{isZh ? '入场价：185.50' : 'Entry: 185.50'}</li>
                    <li>{isZh ? '止损价：184.70（80点）' : 'Stop: 184.70 (80 pips)'}</li>
                    <li>{isZh ? '每点价值：约$6.5（标准手）' : 'Pip Value: ~$6.5 (standard lot)'}</li>
                  </ul>
                </div>
                <div className="p-3 bg-black dark:bg-white text-white dark:text-black font-mono text-xs">
                  <p className="mb-2">{isZh ? '计算过程：' : 'Calculation:'}</p>
                  <p>Risk = $5,000 × 1.5% = $75</p>
                  <p>Lot = $75 / (80 × $6.5)</p>
                  <p>Lot = $75 / $520</p>
                  <p className="font-bold mt-1">= 0.14 lots</p>
                </div>
                <p className="mt-2">
                  <strong>{isZh ? '结论：' : 'Conclusion:'}</strong>{' '}
                  {isZh
                    ? '开仓0.14标准手（或1.4迷你手），最大亏损约$75。GBP/JPY波动大，止损较宽，所以仓位相应减小。'
                    : 'Open 0.14 standard lots (or 1.4 mini lots), maximum loss about $75. GBP/JPY high volatility, wider stop, so position proportionally smaller.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-black dark:bg-white text-white dark:text-black">
            <h3 className="text-xl font-bold mb-4">
              {isZh ? '不同账户规模的风险设置建议' : 'Risk Setting Recommendations by Account Size'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-white dark:border-black text-sm">
                <thead>
                  <tr className="bg-white dark:bg-black text-black dark:text-white">
                    <th className="border border-white dark:border-black p-3 text-left">{isZh ? '账户规模' : 'Account Size'}</th>
                    <th className="border border-white dark:border-black p-3 text-left">{isZh ? '建议风险%' : 'Recommended Risk %'}</th>
                    <th className="border border-white dark:border-black p-3 text-left">{isZh ? '单笔风险金额' : 'Risk Per Trade'}</th>
                    <th className="border border-white dark:border-black p-3 text-left">{isZh ? '原因' : 'Reason'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white dark:border-black p-3">$500-1,000</td>
                    <td className="border border-white dark:border-black p-3 font-bold">1-2%</td>
                    <td className="border border-white dark:border-black p-3">$5-20</td>
                    <td className="border border-white dark:border-black p-3">
                      {isZh ? '小资金需保守，允许更多错误' : 'Small capital needs conservatism, allow more mistakes'}
                    </td>
                  </tr>
                  <tr className="bg-white/10">
                    <td className="border border-white dark:border-black p-3">$1,000-5,000</td>
                    <td className="border border-white dark:border-black p-3 font-bold">1.5-2%</td>
                    <td className="border border-white dark:border-black p-3">$15-100</td>
                    <td className="border border-white dark:border-black p-3">
                      {isZh ? '标准设置，平衡增长与风险' : 'Standard setting, balance growth and risk'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white dark:border-black p-3">$5,000-20,000</td>
                    <td className="border border-white dark:border-black p-3 font-bold">2%</td>
                    <td className="border border-white dark:border-black p-3">$100-400</td>
                    <td className="border border-white dark:border-black p-3">
                      {isZh ? '职业交易者标准设置' : 'Professional trader standard'}
                    </td>
                  </tr>
                  <tr className="bg-white/10">
                    <td className="border border-white dark:border-black p-3">$20,000+</td>
                    <td className="border border-white dark:border-black p-3 font-bold">1.5-2.5%</td>
                    <td className="border border-white dark:border-black p-3">$300+</td>
                    <td className="border border-white dark:border-black p-3">
                      {isZh ? '大资金可适度降低百分比' : 'Large capital can moderately reduce percentage'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm">
              {isZh
                ? '注意：这些是建议值，实际设置应考虑个人风险承受能力、交易经验、策略胜率等因素。'
                : 'Note: These are suggested values, actual settings should consider personal risk tolerance, trading experience, strategy win rate, etc.'}
            </p>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '固定比例法的核心优势' : 'Core Advantages of Fixed Fractional'}
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>
                <strong>{isZh ? '1. 自动复利增长：' : '1. Automatic Compound Growth:'}</strong>{' '}
                {isZh ? '账户增长10%，仓位自动增长10%，无需手动调整。例如$10,000增至$11,000，单笔风险从$200自动增至$220。' : 'Account grows 10%, position automatically grows 10%, no manual adjustment. E.g., $10,000 grows to $11,000, per-trade risk automatically increases from $200 to $220.'}
              </li>
              <li>
                <strong>{isZh ? '2. 风险自动递减：' : '2. Risk Automatically Decreases:'}</strong>{' '}
                {isZh ? '连续亏损时，随账户缩水仓位自动减小，保护剩余资金。$10,000亏至$9,000，单笔风险从$200降至$180。' : 'During consecutive losses, position automatically decreases with account shrinkage, protecting remaining capital. $10,000 loses to $9,000, per-trade risk drops from $200 to $180.'}
              </li>
              <li>
                <strong>{isZh ? '3. 简单易执行：' : '3. Simple to Execute:'}</strong>{' '}
                {isZh ? '无需复杂计算，只需确定固定百分比。使用仓位计算器即可快速得出手数。' : 'No complex calculation needed, just determine fixed percentage. Use position calculator to quickly get lot size.'}
              </li>
              <li>
                <strong>{isZh ? '4. 心理压力可控：' : '4. Controllable Psychological Pressure:'}</strong>{' '}
                {isZh ? '每笔亏损占账户比例固定（如2%），不会因单笔巨额亏损导致情绪失控。' : 'Each loss is fixed percentage of account (e.g., 2%), won\'t lose emotional control from single large loss.'}
              </li>
              <li>
                <strong>{isZh ? '5. 适应所有策略：' : '5. Adapts to All Strategies:'}</strong>{' '}
                {isZh ? '无论剥头皮、日内、波段，都可以使用固定比例法。只需根据策略调整风险百分比。' : 'Whether scalping, day trading, swing trading, can use fixed fractional. Just adjust risk percentage based on strategy.'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Kelly Criterion */}
      <section id="kelly-criterion" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? '凯利公式应用' : 'Kelly Criterion Application'}
        </h2>
        <div className="space-y-6">
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              {isZh
                ? '凯利公式（Kelly Criterion）由数学家约翰·凯利于1956年提出，原用于信息论，后被应用于赌博和投资领域。它通过计算最优仓位百分比，理论上实现账户最快增长。在外汇交易中，凯利公式可以帮助我们根据策略的历史表现（胜率和盈亏比）确定科学的仓位大小。'
                : 'Kelly Criterion was proposed by mathematician John Kelly in 1956, originally for information theory, later applied to gambling and investment. It calculates optimal position percentage to theoretically achieve fastest account growth. In forex trading, Kelly Criterion helps us determine scientific position size based on strategy historical performance (win rate and profit/loss ratio).'}
            </p>

            <div className="p-6 border-2 border-black dark:border-white">
              <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
                {isZh ? '凯利公式计算' : 'Kelly Criterion Formula'}
              </h3>
              <div className="p-4 bg-black dark:bg-white text-white dark:text-black text-center font-mono text-lg mb-4">
                K = (W × B - L) / B
              </div>
              <div className="space-y-3 text-sm">
                <p><strong>{isZh ? '公式解释：' : 'Formula Explanation:'}</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>K</strong> = {isZh ? '凯利百分比（应投入的资金比例）' : 'Kelly percentage (proportion of capital to invest)'}
                  </li>
                  <li>
                    <strong>W</strong> = {isZh ? '胜率（盈利交易占比）' : 'Win rate (proportion of winning trades)'}
                  </li>
                  <li>
                    <strong>B</strong> = {isZh ? '盈亏比（平均盈利 / 平均亏损）' : 'Profit/loss ratio (average win / average loss)'}
                  </li>
                  <li>
                    <strong>L</strong> = {isZh ? '失败率（1 - W）' : 'Loss rate (1 - W)'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
              <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
                {isZh ? '示例：趋势跟踪策略' : 'Example: Trend Following Strategy'}
              </h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p className="font-bold">{isZh ? '策略统计数据（100笔交易）：' : 'Strategy Statistics (100 trades):'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isZh ? '盈利交易：42笔' : 'Winning trades: 42'}</li>
                  <li>{isZh ? '亏损交易：58笔' : 'Losing trades: 58'}</li>
                  <li>{isZh ? '胜率（W）：42% = 0.42' : 'Win rate (W): 42% = 0.42'}</li>
                  <li>{isZh ? '平均盈利：$450' : 'Average win: $450'}</li>
                  <li>{isZh ? '平均亏损：$180' : 'Average loss: $180'}</li>
                  <li>{isZh ? '盈亏比（B）：$450/$180 = 2.5' : 'Profit/loss ratio (B): $450/$180 = 2.5'}</li>
                </ul>
                <div className="p-3 bg-white dark:bg-black text-black dark:text-white font-mono text-xs mt-2">
                  <p className="mb-2">{isZh ? '凯利计算：' : 'Kelly Calculation:'}</p>
                  <p>K = (0.42 × 2.5 - 0.58) / 2.5</p>
                  <p>K = (1.05 - 0.58) / 2.5</p>
                  <p>K = 0.47 / 2.5</p>
                  <p className="font-bold mt-1">K = 0.188 = 18.8%</p>
                </div>
                <p className="mt-2">
                  <strong>{isZh ? '结论：' : 'Conclusion:'}</strong>{' '}
                  {isZh
                    ? '完全凯利建议单笔风险18.8%，但这太激进！实际应使用半凯利（9.4%）或1/4凯利（4.7%）。'
                    : 'Full Kelly suggests 18.8% per-trade risk, but this is too aggressive! Actually should use half-Kelly (9.4%) or 1/4-Kelly (4.7%).'}
                </p>
              </div>
            </div>

            <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
              <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
                {isZh ? '示例：日内突破策略' : 'Example: Day Trading Breakout Strategy'}
              </h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p className="font-bold">{isZh ? '策略统计数据（150笔交易）：' : 'Strategy Statistics (150 trades):'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isZh ? '盈利交易：75笔' : 'Winning trades: 75'}</li>
                  <li>{isZh ? '亏损交易：75笔' : 'Losing trades: 75'}</li>
                  <li>{isZh ? '胜率（W）：50% = 0.50' : 'Win rate (W): 50% = 0.50'}</li>
                  <li>{isZh ? '平均盈利：$300' : 'Average win: $300'}</li>
                  <li>{isZh ? '平均亏损：$200' : 'Average loss: $200'}</li>
                  <li>{isZh ? '盈亏比（B）：$300/$200 = 1.5' : 'Profit/loss ratio (B): $300/$200 = 1.5'}</li>
                </ul>
                <div className="p-3 bg-white dark:bg-black text-black dark:text-white font-mono text-xs mt-2">
                  <p className="mb-2">{isZh ? '凯利计算：' : 'Kelly Calculation:'}</p>
                  <p>K = (0.50 × 1.5 - 0.50) / 1.5</p>
                  <p>K = (0.75 - 0.50) / 1.5</p>
                  <p>K = 0.25 / 1.5</p>
                  <p className="font-bold mt-1">K = 0.167 = 16.7%</p>
                </div>
                <p className="mt-2">
                  <strong>{isZh ? '建议：' : 'Recommendation:'}</strong>{' '}
                  {isZh
                    ? '使用1/4凯利 = 4.2%，或更保守的2-3%。胜率50%的策略波动较大，需要降低风险。'
                    : 'Use 1/4-Kelly = 4.2%, or more conservative 2-3%. 50% win rate strategy has high volatility, need to reduce risk.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-black dark:bg-white text-white dark:text-black">
            <h3 className="text-xl font-bold mb-4">
              {isZh ? '凯利公式的实际应用建议' : 'Practical Kelly Criterion Recommendations'}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-4 border-2 border-white dark:border-black">
                <p className="font-bold mb-2">{isZh ? '1. 永远不要使用完全凯利（Full Kelly）' : '1. Never Use Full Kelly'}</p>
                <p>
                  {isZh
                    ? '完全凯利假设你对胜率和盈亏比有完美预测，但实际交易中数据会变化。完全凯利会导致极大波动，单次连续亏损可能回撤30-50%。'
                    : 'Full Kelly assumes perfect prediction of win rate and profit/loss ratio, but in actual trading data changes. Full Kelly causes extreme volatility, single losing streak may drawdown 30-50%.'}
                </p>
              </div>
              <div className="p-4 border-2 border-white dark:border-black">
                <p className="font-bold mb-2">{isZh ? '2. 推荐使用半凯利或1/4凯利' : '2. Recommend Half-Kelly or 1/4-Kelly'}</p>
                <p>
                  {isZh
                    ? '半凯利（K/2）：降低50%波动性，仍能获得75%的增长速度。1/4凯利（K/4）：最保守，波动性很小，适合风险厌恶者。'
                    : 'Half-Kelly (K/2): Reduce 50% volatility, still achieve 75% growth rate. 1/4-Kelly (K/4): Most conservative, very low volatility, suitable for risk-averse.'}
                </p>
              </div>
              <div className="p-4 border-2 border-white dark:border-black">
                <p className="font-bold mb-2">{isZh ? '3. 需要至少100笔交易数据' : '3. Need At Least 100 Trade Data'}</p>
                <p>
                  {isZh
                    ? '凯利公式依赖准确的胜率和盈亏比。少于100笔交易的数据不具代表性，可能导致错误的仓位计算。新手应先用固定比例法积累数据。'
                    : 'Kelly Criterion relies on accurate win rate and profit/loss ratio. Data less than 100 trades not representative, may lead to wrong position calculation. Beginners should first use fixed fractional to accumulate data.'}
                </p>
              </div>
              <div className="p-4 border-2 border-white dark:border-black">
                <p className="font-bold mb-2">{isZh ? '4. 定期重新计算（每季度）' : '4. Recalculate Regularly (Quarterly)'}</p>
                <p>
                  {isZh
                    ? '市场环境变化、策略表现波动，需要定期更新凯利百分比。建议每季度或每100笔交易重新计算一次。'
                    : 'Market environment changes, strategy performance fluctuates, need to regularly update Kelly percentage. Recommend recalculating quarterly or every 100 trades.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '凯利公式 vs 固定比例法：如何选择？' : 'Kelly Criterion vs Fixed Fractional: How to Choose?'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-yellow-600 text-sm">
                <thead>
                  <tr className="bg-yellow-600 text-white">
                    <th className="border border-yellow-600 p-3 text-left">{isZh ? '对比项' : 'Aspect'}</th>
                    <th className="border border-yellow-600 p-3 text-left">{isZh ? '固定比例法' : 'Fixed Fractional'}</th>
                    <th className="border border-yellow-600 p-3 text-left">{isZh ? '凯利公式' : 'Kelly Criterion'}</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr>
                    <td className="border border-yellow-600 p-3 font-bold">{isZh ? '难度' : 'Difficulty'}</td>
                    <td className="border border-yellow-600 p-3">{isZh ? '简单，易执行' : 'Simple, easy to execute'}</td>
                    <td className="border border-yellow-600 p-3">{isZh ? '复杂，需数据分析' : 'Complex, needs data analysis'}</td>
                  </tr>
                  <tr className="bg-yellow-50 dark:bg-yellow-900/10">
                    <td className="border border-yellow-600 p-3 font-bold">{isZh ? '数据要求' : 'Data Requirement'}</td>
                    <td className="border border-yellow-600 p-3">{isZh ? '无需历史数据' : 'No historical data needed'}</td>
                    <td className="border border-yellow-600 p-3">{isZh ? '至少100笔交易' : 'At least 100 trades'}</td>
                  </tr>
                  <tr>
                    <td className="border border-yellow-600 p-3 font-bold">{isZh ? '增长速度' : 'Growth Speed'}</td>
                    <td className="border border-yellow-600 p-3">{isZh ? '稳定增长' : 'Stable growth'}</td>
                    <td className="border border-yellow-600 p-3">{isZh ? '理论最优（半凯利）' : 'Theoretically optimal (half-Kelly)'}</td>
                  </tr>
                  <tr className="bg-yellow-50 dark:bg-yellow-900/10">
                    <td className="border border-yellow-600 p-3 font-bold">{isZh ? '波动性' : 'Volatility'}</td>
                    <td className="border border-yellow-600 p-3">{isZh ? '低，可控' : 'Low, controllable'}</td>
                    <td className="border border-yellow-600 p-3">{isZh ? '中高（取决于K值）' : 'Medium-high (depends on K)'}</td>
                  </tr>
                  <tr>
                    <td className="border border-yellow-600 p-3 font-bold">{isZh ? '适用对象' : 'Suitable For'}</td>
                    <td className="border border-yellow-600 p-3">{isZh ? '所有交易者' : 'All traders'}</td>
                    <td className="border border-yellow-600 p-3">{isZh ? '经验丰富者' : 'Experienced traders'}</td>
                  </tr>
                  <tr className="bg-yellow-50 dark:bg-yellow-900/10">
                    <td className="border border-yellow-600 p-3 font-bold">{isZh ? '推荐风险' : 'Recommended Risk'}</td>
                    <td className="border border-yellow-600 p-3">1-3%</td>
                    <td className="border border-yellow-600 p-3">1/4-1/2 Kelly</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">
              {isZh
                ? '建议：新手和中级交易者使用固定比例法（1-2%）；职业交易者且有充足数据支持时，可以尝试1/4凯利或半凯利。'
                : 'Recommendation: Beginners and intermediate traders use fixed fractional (1-2%); professional traders with sufficient data can try 1/4-Kelly or half-Kelly.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Dynamic Sizing */}
      <section id="dynamic-sizing" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? '动态仓位调整策略' : 'Dynamic Position Adjustment Strategies'}
        </h2>
        <div className="space-y-6">
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              {isZh
                ? '动态仓位调整是最灵活的仓位控制方法，根据市场波动性、账户表现、交易时段、货币对特性等多个因素实时调整仓位大小。这种方法可以最大化资金利用效率，同时适应不断变化的市场环境。适合职业交易者或使用自动化交易系统的交易者。'
                : 'Dynamic position adjustment is the most flexible position sizing method, adjusting position size in real-time based on market volatility, account performance, trading session, currency pair characteristics, and other factors. This method maximizes capital efficiency while adapting to ever-changing market environment. Suitable for professional traders or those using automated trading systems.'}
            </p>

            <div className="p-6 border-2 border-black dark:border-white">
              <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
                {isZh ? '方法1：基于ATR的波动性调整' : 'Method 1: ATR-Based Volatility Adjustment'}
              </h3>
              <div className="space-y-3 text-sm">
                <p>
                  {isZh
                    ? 'ATR（Average True Range，平均真实波幅）衡量市场波动性。高波动时减小仓位，低波动时增加仓位，保持风险一致。'
                    : 'ATR (Average True Range) measures market volatility. Reduce position during high volatility, increase during low volatility, maintain consistent risk.'}
                </p>
                <div className="p-4 bg-gray-50 dark:bg-gray-800">
                  <p className="font-bold mb-2">{isZh ? '计算公式：' : 'Calculation Formula:'}</p>
                  <div className="font-mono text-xs bg-black dark:bg-white text-white dark:text-black p-3 mb-2">
                    {isZh
                      ? '调整因子 = 基准ATR / 当前ATR\n手数 = 标准手数 × 调整因子'
                      : 'Adjustment Factor = Baseline ATR / Current ATR\nLot Size = Standard Lots × Adjustment Factor'}
                  </div>
                  <p className="font-bold mb-2">{isZh ? '示例：EUR/USD交易' : 'Example: EUR/USD Trading'}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{isZh ? '基准ATR（过去30天平均）：60点' : 'Baseline ATR (30-day average): 60 pips'}</li>
                    <li>{isZh ? '标准仓位（2%风险）：0.7手' : 'Standard position (2% risk): 0.7 lots'}</li>
                    <li>{isZh ? '低波动日（ATR=40点）：0.7 × (60/40) = 1.05手' : 'Low volatility day (ATR=40): 0.7 × (60/40) = 1.05 lots'}</li>
                    <li>{isZh ? '高波动日（ATR=90点）：0.7 × (60/90) = 0.47手' : 'High volatility day (ATR=90): 0.7 × (60/90) = 0.47 lots'}</li>
                  </ul>
                </div>
                <p>
                  <strong>{isZh ? '优势：' : 'Advantages:'}</strong>{' '}
                  {isZh
                    ? '自动适应市场波动，低波动时增加仓位提高收益，高波动时减小仓位控制风险。特别适合日内交易和波段交易。'
                    : 'Automatically adapts to market volatility, increase position during low volatility to boost returns, decrease during high volatility to control risk. Especially suitable for day trading and swing trading.'}
                </p>
              </div>
            </div>

            <div className="p-6 border-2 border-black dark:border-white">
              <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
                {isZh ? '方法2：基于账户表现的阶梯调整' : 'Method 2: Tiered Adjustment Based on Account Performance'}
              </h3>
              <div className="space-y-3 text-sm">
                <p>
                  {isZh
                    ? '根据账户最近表现动态调整风险百分比。连续盈利时适度增加风险，连续亏损时降低风险，保护心理状态和剩余资金。'
                    : 'Dynamically adjust risk percentage based on recent account performance. Moderately increase risk during winning streaks, decrease during losing streaks, protect psychological state and remaining capital.'}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-2 border-black dark:border-white">
                    <thead>
                      <tr className="bg-black dark:bg-white text-white dark:text-black">
                        <th className="border border-black dark:border-white p-3 text-left">
                          {isZh ? '账户状态' : 'Account Status'}
                        </th>
                        <th className="border border-black dark:border-white p-3 text-left">
                          {isZh ? '风险调整' : 'Risk Adjustment'}
                        </th>
                        <th className="border border-black dark:border-white p-3 text-left">
                          {isZh ? '原因' : 'Reason'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '正常状态' : 'Normal State'}
                        </td>
                        <td className="border border-black dark:border-white p-3 font-bold">2%</td>
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '标准设置' : 'Standard setting'}
                        </td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '连续5笔盈利' : '5 Consecutive Wins'}
                        </td>
                        <td className="border border-black dark:border-white p-3 font-bold">2.5%</td>
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '策略有效，适度增加' : 'Strategy working, moderate increase'}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '连续3笔亏损' : '3 Consecutive Losses'}
                        </td>
                        <td className="border border-black dark:border-white p-3 font-bold">1.5%</td>
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '可能策略问题，降低风险' : 'Possible strategy issue, reduce risk'}
                        </td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '连续5笔亏损' : '5 Consecutive Losses'}
                        </td>
                        <td className="border border-black dark:border-white p-3 font-bold">1%</td>
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '暂停评估，最小风险' : 'Pause evaluate, minimum risk'}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '回撤超过15%' : 'Drawdown Over 15%'}
                        </td>
                        <td className="border border-black dark:border-white p-3 font-bold">0.5-1%</td>
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '保护模式，重新评估' : 'Protection mode, re-evaluate'}
                        </td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '账户创新高' : 'Account New High'}
                        </td>
                        <td className="border border-black dark:border-white p-3 font-bold">2-3%</td>
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '心理状态好，可增加' : 'Good psychology, can increase'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3">
                  <strong>{isZh ? '注意：' : 'Note:'}</strong>{' '}
                  {isZh
                    ? '调整应遵循预设规则，而非情绪化决策。建议设置明确触发条件，例如"连续3笔亏损自动降至1.5%"，并在交易日志中记录每次调整。'
                    : 'Adjustments should follow preset rules, not emotional decisions. Recommend setting clear trigger conditions, e.g., "after 3 consecutive losses automatically reduce to 1.5%", and record each adjustment in trading journal.'}
                </p>
              </div>
            </div>

            <div className="p-6 border-2 border-black dark:border-white">
              <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
                {isZh ? '方法3：基于交易时段的调整' : 'Method 3: Trading Session-Based Adjustment'}
              </h3>
              <div className="space-y-3 text-sm">
                <p>
                  {isZh
                    ? '不同交易时段的流动性和波动性差异巨大。伦敦和纽约时段交易量大、趋势明显，可以使用标准仓位；亚洲时段流动性低、假突破多，应该减小仓位。'
                    : 'Different trading sessions have vastly different liquidity and volatility. London and New York sessions have high volume and clear trends, can use standard position; Asian session has low liquidity and many false breakouts, should reduce position.'}
                </p>
                <div className="p-4 bg-gray-50 dark:bg-gray-800">
                  <p className="font-bold mb-2">{isZh ? '时段调整建议：' : 'Session Adjustment Recommendations:'}</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>{isZh ? '亚洲时段（GMT 00:00-08:00）：' : 'Asian Session (GMT 00:00-08:00):'}</strong>{' '}
                      {isZh ? '标准仓位 × 0.5-0.7（流动性低，假突破多）' : 'Standard position × 0.5-0.7 (low liquidity, many false breakouts)'}
                    </li>
                    <li>
                      <strong>{isZh ? '伦敦时段（GMT 08:00-16:00）：' : 'London Session (GMT 08:00-16:00):'}</strong>{' '}
                      {isZh ? '标准仓位 × 1.0（流动性充足，趋势明确）' : 'Standard position × 1.0 (sufficient liquidity, clear trends)'}
                    </li>
                    <li>
                      <strong>{isZh ? '纽约时段（GMT 13:00-21:00）：' : 'New York Session (GMT 13:00-21:00):'}</strong>{' '}
                      {isZh ? '标准仓位 × 1.0-1.2（流动性最大，波动性高）' : 'Standard position × 1.0-1.2 (highest liquidity, high volatility)'}
                    </li>
                    <li>
                      <strong>{isZh ? '伦敦-纽约重叠（GMT 13:00-16:00）：' : 'London-NY Overlap (GMT 13:00-16:00):'}</strong>{' '}
                      {isZh ? '标准仓位 × 1.0（最佳交易时段）' : 'Standard position × 1.0 (best trading window)'}
                    </li>
                    <li>
                      <strong>{isZh ? '重大新闻前后：' : 'Around Major News:'}</strong>{' '}
                      {isZh ? '标准仓位 × 0.3-0.5或不交易（波动剧烈，风险高）' : 'Standard position × 0.3-0.5 or no trading (extreme volatility, high risk)'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 border-2 border-black dark:border-white">
              <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
                {isZh ? '方法4：基于货币对特性的差异化' : 'Method 4: Currency Pair Characteristic Differentiation'}
              </h3>
              <div className="space-y-3 text-sm">
                <p>
                  {isZh
                    ? '不同货币对的波动性、点差、流动性差异巨大。高波动性货币对（如GBP/JPY）应该使用更小仓位，低波动性货币对（如EUR/CHF）可以适度增加。'
                    : 'Different currency pairs have vastly different volatility, spreads, liquidity. High volatility pairs (like GBP/JPY) should use smaller position, low volatility pairs (like EUR/CHF) can moderately increase.'}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-2 border-black dark:border-white">
                    <thead>
                      <tr className="bg-black dark:bg-white text-white dark:text-black">
                        <th className="border border-black dark:border-white p-3 text-left">
                          {isZh ? '货币对类型' : 'Pair Type'}
                        </th>
                        <th className="border border-black dark:border-white p-3 text-left">
                          {isZh ? '仓位调整' : 'Position Adjustment'}
                        </th>
                        <th className="border border-black dark:border-white p-3 text-left">
                          {isZh ? '示例' : 'Examples'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '主要货币对' : 'Major Pairs'}
                        </td>
                        <td className="border border-black dark:border-white p-3 font-bold">1.0×</td>
                        <td className="border border-black dark:border-white p-3">EUR/USD, GBP/USD, USD/JPY</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '交叉盘（低波动）' : 'Crosses (Low Vol)'}
                        </td>
                        <td className="border border-black dark:border-white p-3 font-bold">1.2×</td>
                        <td className="border border-black dark:border-white p-3">EUR/CHF, EUR/GBP</td>
                      </tr>
                      <tr>
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '交叉盘（高波动）' : 'Crosses (High Vol)'}
                        </td>
                        <td className="border border-black dark:border-white p-3 font-bold">0.6-0.8×</td>
                        <td className="border border-black dark:border-white p-3">GBP/JPY, GBP/AUD, EUR/JPY</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? 'Exotic货币对' : 'Exotic Pairs'}
                        </td>
                        <td className="border border-black dark:border-white p-3 font-bold">0.3-0.5×</td>
                        <td className="border border-black dark:border-white p-3">USD/TRY, USD/ZAR, EUR/TRY</td>
                      </tr>
                      <tr>
                        <td className="border border-black dark:border-white p-3">
                          {isZh ? '商品货币对' : 'Commodity Pairs'}
                        </td>
                        <td className="border border-black dark:border-white p-3 font-bold">0.8-1.0×</td>
                        <td className="border border-black dark:border-white p-3">AUD/USD, NZD/USD, USD/CAD</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-black dark:bg-white text-white dark:text-black">
            <h3 className="text-xl font-bold mb-4">
              {isZh ? '动态调整的综合示例' : 'Comprehensive Dynamic Adjustment Example'}
            </h3>
            <div className="space-y-3 text-sm">
              <p className="font-bold">{isZh ? '场景：' : 'Scenario:'}</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{isZh ? '账户：$10,000' : 'Account: $10,000'}</li>
                <li>{isZh ? '基础风险：2%（$200）' : 'Base Risk: 2% ($200)'}</li>
                <li>{isZh ? '货币对：GBP/JPY（高波动）' : 'Pair: GBP/JPY (high volatility)'}</li>
                <li>{isZh ? '时段：伦敦时段' : 'Session: London'}</li>
                <li>{isZh ? '当前ATR：120点（基准80点）' : 'Current ATR: 120 pips (baseline 80 pips)'}</li>
                <li>{isZh ? '账户状态：正常' : 'Account Status: Normal'}</li>
              </ul>
              <div className="p-3 bg-white dark:bg-black text-black dark:text-white font-mono text-xs mt-2">
                <p className="mb-2">{isZh ? '调整计算：' : 'Adjustment Calculation:'}</p>
                <p>Base Risk: $200</p>
                <p>Pair Adjustment: × 0.7 (GBP/JPY high vol)</p>
                <p>ATR Adjustment: × (80/120) = × 0.67</p>
                <p>Session Adjustment: × 1.0 (London)</p>
                <p className="mt-2">Final Risk = $200 × 0.7 × 0.67 × 1.0</p>
                <p className="font-bold">= $93.8</p>
              </div>
              <p className="mt-2">
                {isZh
                  ? '结论：虽然基础风险是$200，但考虑到GBP/JPY高波动性和当前ATR偏高，实际应使用约$94的风险，相当于0.94%的账户风险，确保在极端行情下仍能控制风险。'
                  : 'Conclusion: Although base risk is $200, considering GBP/JPY high volatility and current elevated ATR, actually should use about $94 risk, equivalent to 0.94% account risk, ensuring risk control even in extreme market conditions.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '动态调整的注意事项' : 'Dynamic Adjustment Considerations'}
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>
                <strong>{isZh ? '1. 制定明确规则：' : '1. Establish Clear Rules:'}</strong>{' '}
                {isZh ? '所有调整都应基于预设规则，而非主观判断。在交易计划中详细记录调整逻辑和触发条件。' : 'All adjustments should be based on preset rules, not subjective judgment. Detail adjustment logic and trigger conditions in trading plan.'}
              </li>
              <li>
                <strong>{isZh ? '2. 避免过度复杂：' : '2. Avoid Over-Complexity:'}</strong>{' '}
                {isZh ? '不要同时使用过多调整因子。建议最多组合2-3个因子（如ATR + 时段 + 账户表现），否则难以执行和评估。' : 'Don\'t use too many adjustment factors simultaneously. Recommend maximum 2-3 factors combined (e.g., ATR + session + account performance), otherwise hard to execute and evaluate.'}
              </li>
              <li>
                <strong>{isZh ? '3. 使用自动化工具：' : '3. Use Automation Tools:'}</strong>{' '}
                {isZh ? '动态调整计算复杂，手动执行容易出错。建议使用仓位计算器、EA或交易脚本自动化执行。' : 'Dynamic adjustment calculation complex, manual execution error-prone. Recommend using position calculator, EA or trading scripts for automated execution.'}
              </li>
              <li>
                <strong>{isZh ? '4. 定期回测验证：' : '4. Regular Backtest Validation:'}</strong>{' '}
                {isZh ? '每季度回测动态调整策略的效果，确保调整规则仍然有效。市场环境变化可能需要更新规则。' : 'Quarterly backtest dynamic adjustment strategy effectiveness, ensure adjustment rules still valid. Market environment changes may require rule updates.'}
              </li>
              <li>
                <strong>{isZh ? '5. 保留安全边际：' : '5. Maintain Safety Margin:'}</strong>{' '}
                {isZh ? '即使动态增加仓位，也不应超过账户的3-5%风险。安全永远是第一位的。' : 'Even with dynamic position increase, should not exceed 3-5% account risk. Safety always first priority.'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: Case Studies */}
      <section id="case-studies" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? '实战案例分析' : 'Real-World Case Studies'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '成功案例：科学仓位管理实现稳定增长' : 'Success Case: Scientific Position Management Achieves Stable Growth'}
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
              <p>
                <strong>{isZh ? '交易者背景：' : 'Trader Background:'}</strong>{' '}
                {isZh
                  ? '小陈，初始资金$8,000，使用日内突破策略，严格执行固定比例法（2%风险）+ ATR动态调整。'
                  : 'Chen, initial capital $8,000, using day trading breakout strategy, strictly executing fixed fractional (2% risk) + ATR dynamic adjustment.'}
              </p>
              <div className="p-4 bg-white dark:bg-black text-black dark:text-white">
                <p className="font-bold mb-2">{isZh ? '12个月交易记录：' : '12-Month Trading Record:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isZh ? '总交易：280笔' : 'Total Trades: 280'}</li>
                  <li>{isZh ? '胜率：48%（134胜146负）' : 'Win Rate: 48% (134 wins, 146 losses)'}</li>
                  <li>{isZh ? '平均盈亏比：1:2.2' : 'Average Risk-Reward: 1:2.2'}</li>
                  <li>{isZh ? '最大单笔盈利：$420' : 'Largest Win: $420'}</li>
                  <li>{isZh ? '最大单笔亏损：$178（始终<2%）' : 'Largest Loss: $178 (always <2%)'}</li>
                  <li>{isZh ? '最大回撤：12%（3周）' : 'Max Drawdown: 12% (3 weeks)'}</li>
                  <li>{isZh ? '月均收益率：4.2%' : 'Monthly Average Return: 4.2%'}</li>
                  <li className="font-bold text-green-600 dark:text-green-400">
                    {isZh ? '最终账户：$13,150（增长64%）' : 'Final Account: $13,150 (64% growth)'}
                  </li>
                </ul>
              </div>
              <p>
                <strong>{isZh ? '关键成功因素：' : 'Key Success Factors:'}</strong>
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>{isZh ? '严格执行2%规则：' : 'Strict 2% Rule Execution:'}</strong>{' '}
                  {isZh ? '280笔交易，每笔风险始终在1.8-2.1%之间，从未超过2.5%。' : '280 trades, every trade risk consistently between 1.8-2.1%, never exceeded 2.5%.'}
                </li>
                <li>
                  <strong>{isZh ? 'ATR动态调整：' : 'ATR Dynamic Adjustment:'}</strong>{' '}
                  {isZh ? '高波动日（ATR>80点）自动减小仓位至标准的60-70%，避免了多次潜在的大亏损。' : 'High volatility days (ATR>80 pips) automatically reduced position to 60-70% of standard, avoided multiple potential large losses.'}
                </li>
                <li>
                  <strong>{isZh ? '复利增长：' : 'Compound Growth:'}</strong>{' '}
                  {isZh ? '随账户增长，单笔风险从$160（月1）自动增至$260（月12），实现加速增长。' : 'With account growth, per-trade risk automatically increased from $160 (month 1) to $260 (month 12), achieving accelerated growth.'}
                </li>
                <li>
                  <strong>{isZh ? '回撤管理：' : 'Drawdown Management:'}</strong>{' '}
                  {isZh ? '遭遇12%回撤时，暂时降低风险至1.5%持续2周，待账户恢复后才重新使用2%。' : 'When encountering 12% drawdown, temporarily reduced risk to 1.5% for 2 weeks, only returned to 2% after account recovered.'}
                </li>
              </ol>
              <p className="mt-3 p-3 bg-green-100 dark:bg-green-900/30 border-2 border-green-600">
                <strong>{isZh ? '启示：' : 'Insight:'}</strong>{' '}
                {isZh
                  ? '即使胜率低于50%，通过科学的仓位控制（固定2%）+ 良好的盈亏比（1:2.2）+ 动态调整，仍能实现年化64%的稳定增长。关键是纪律性和系统化。'
                  : 'Even with win rate below 50%, through scientific position sizing (fixed 2%) + good risk-reward (1:2.2) + dynamic adjustment, still achieved stable 64% annualized growth. Key is discipline and systematization.'}
              </p>
            </div>
          </div>

          <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '失败案例：缺乏仓位纪律导致爆仓' : 'Failure Case: Lack of Position Discipline Leads to Blow-Up'}
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
              <p>
                <strong>{isZh ? '交易者背景：' : 'Trader Background:'}</strong>{' '}
                {isZh
                  ? '小赵，初始资金$12,000，使用相同的日内突破策略，但未执行仓位控制，凭感觉调整仓位。'
                  : 'Zhao, initial capital $12,000, using same day trading breakout strategy, but didn\'t execute position control, adjusted position by feeling.'}
              </p>
              <div className="p-4 bg-white dark:bg-black text-black dark:text-white">
                <p className="font-bold mb-2">{isZh ? '5个月灾难性记录：' : '5-Month Disastrous Record:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{isZh ? '第1个月：盈利$1,800（账户$13,800）' : 'Month 1: Profit $1,800 (account $13,800)'}</li>
                  <li>{isZh ? '感觉良好，第2个月仓位从1手增至2-3手' : 'Feeling good, month 2 position increased from 1 lot to 2-3 lots'}</li>
                  <li>{isZh ? '第2个月：单笔亏损$1,200（风险约9%）' : 'Month 2: Single loss $1,200 (risk ~9%)'}</li>
                  <li>{isZh ? '不服气，第3个月开5手想"快速回本"' : 'Refused to accept, month 3 opened 5 lots to "quickly recover"'}</li>
                  <li>{isZh ? '第3个月：连续2笔巨亏，$3,500（账户跌至$9,100）' : 'Month 3: 2 consecutive large losses, $3,500 (account fell to $9,100)'}</li>
                  <li>{isZh ? '恐慌中第4-5个月：随意交易，仓位混乱' : 'Panic months 4-5: random trading, chaotic position sizing'}</li>
                  <li className="font-bold text-red-600 dark:text-red-400">
                    {isZh ? '最终账户：$2,800（亏损77%）' : 'Final Account: $2,800 (77% loss)'}
                  </li>
                </ul>
              </div>
              <p>
                <strong>{isZh ? '失败原因剖析：' : 'Failure Analysis:'}</strong>
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>{isZh ? '无固定风险管理：' : 'No Fixed Risk Management:'}</strong>{' '}
                  {isZh ? '凭感觉调整仓位，盈利后1手→3手，亏损后5手想回本。单笔风险在2-15%之间随意波动。' : 'Adjusted position by feeling, after wins 1 lot→3 lots, after losses 5 lots to recover. Per-trade risk randomly fluctuated between 2-15%.'}
                </li>
                <li>
                  <strong>{isZh ? '情绪化交易：' : 'Emotional Trading:'}</strong>{' '}
                  {isZh ? '首月盈利后过度自信，亏损后不服气加大赌注，完全被情绪主导。' : 'After first month profit overconfident, after losses refused to accept and increased bets, completely dominated by emotions.'}
                </li>
                <li>
                  <strong>{isZh ? '忽视复利反向效应：' : 'Ignored Reverse Compound Effect:'}</strong>{' '}
                  {isZh ? '账户从$13,800跌至$9,100时，仍使用相同手数，实际风险百分比暴增。' : 'When account fell from $13,800 to $9,100, still used same lot size, actual risk percentage skyrocketed.'}
                </li>
                <li>
                  <strong>{isZh ? '缺乏止损机制：' : 'Lacked Stop-Loss Mechanism:'}</strong>{' '}
                  {isZh ? '没有每日最大亏损限额，连续亏损后继续交易，损失不断扩大。' : 'No daily maximum loss limit, continued trading after consecutive losses, losses continuously expanded.'}
                </li>
                <li>
                  <strong>{isZh ? '策略相同，结果天壤之别：' : 'Same Strategy, Vastly Different Results:'}</strong>{' '}
                  {isZh ? '小陈和小赵使用相同策略，但仓位管理的差异导致一个盈利64%，一个亏损77%。' : 'Chen and Zhao used same strategy, but position management difference led to one profiting 64%, other losing 77%.'}
                </li>
              </ol>
              <p className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 border-2 border-red-600">
                <strong>{isZh ? '教训：' : 'Lesson:'}</strong>{' '}
                {isZh
                  ? '交易策略只是成功的一部分，仓位控制才是决定生死的关键。无论你的策略多么优秀，如果没有科学的仓位管理，最终都会走向失败。'
                  : 'Trading strategy is only part of success, position control is the key determining survival. No matter how excellent your strategy, without scientific position management, ultimately will fail.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Common Mistakes */}
      <section id="common-mistakes" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? '常见错误与规避方法' : 'Common Mistakes and Solutions'}
        </h2>
        <div className="space-y-6">
          {[
            {
              title: isZh ? '错误1：固定手数交易' : 'Mistake 1: Fixed Lot Size Trading',
              problem: isZh
                ? '无论账户大小、止损距离，总是开1手或固定手数。结果：止损30点时风险$300，止损50点时风险$500，风险不一致。'
                : 'Regardless of account size or stop distance, always open 1 lot or fixed lot size. Result: 30 pip stop risks $300, 50 pip stop risks $500, inconsistent risk.',
              solution: isZh
                ? '使用动态仓位计算：手数 = (账户 × 2%) / (止损点数 × 每点价值)。每笔交易根据止损距离调整手数，确保风险一致。'
                : 'Use dynamic position calculation: Lot Size = (Account × 2%) / (Stop Pips × Pip Value). Adjust lot size per trade based on stop distance, ensure consistent risk.',
            },
            {
              title: isZh ? '错误2：基于保证金而非风险计算' : 'Mistake 2: Based on Margin Not Risk',
              problem: isZh
                ? '看到账户还有$3,000可用保证金，就开3手，忽视了止损可能亏损数千美元。保证金充足≠可以重仓。'
                : 'Seeing $3,000 available margin, open 3 lots, ignoring stop could lose thousands. Sufficient margin ≠ can overlever.',
              solution: isZh
                ? '仓位计算基于账户净值（Equity）和风险百分比，与保证金无关。例如$10,000账户，2%风险=$200，根据止损距离反推手数，而不是看保证金余额。'
                : 'Position calculation based on account equity and risk percentage, not margin. E.g., $10,000 account, 2% risk=$200, reverse calculate lot size from stop distance, not look at margin balance.',
            },
            {
              title: isZh ? '错误3：盈利后立即加大仓位' : 'Mistake 3: Immediately Increase Position After Wins',
              problem: isZh
                ? '连续3笔盈利后，从1%风险跳至5%，认为"手感好"。一次亏损回吐所有利润，甚至转盈为亏。'
                : 'After 3 consecutive wins, jump from 1% to 5% risk, thinking "feeling good". One loss gives back all profits, even turns profit to loss.',
              solution: isZh
                ? '保持固定风险百分比，让仓位随账户自然增长。例如：账户从$10,000增至$11,000，单笔风险从$200自动增至$220（2%），无需主观调整。'
                : 'Maintain fixed risk percentage, let position naturally grow with account. E.g., account grows from $10,000 to $11,000, per-trade risk automatically increases from $200 to $220 (2%), no subjective adjustment.',
            },
            {
              title: isZh ? '错误4：所有货币对用相同仓位' : 'Mistake 4: Same Position for All Pairs',
              problem: isZh
                ? 'EUR/USD和GBP/JPY都开1手。但GBP/JPY波动性是EUR/USD的2-3倍，实际风险差异巨大。'
                : 'Open 1 lot for both EUR/USD and GBP/JPY. But GBP/JPY volatility is 2-3x EUR/USD, actual risk difference huge.',
              solution: isZh
                ? '使用ATR或货币对特性调整仓位。高波动性货币对减少20-50%仓位，确保所有交易的实际风险金额相同（如都是$200）。'
                : 'Use ATR or pair characteristics to adjust position. Reduce 20-50% position for high volatility pairs, ensure all trades have same actual risk amount (e.g., all $200).',
            },
            {
              title: isZh ? '错误5：忽视账户缩水的影响' : 'Mistake 5: Ignoring Account Shrinkage Impact',
              problem: isZh
                ? '账户从$10,000亏至$7,000，仍开1手EUR/USD。实际单笔风险从2%增至2.8%，风险失控。'
                : 'Account loses from $10,000 to $7,000, still open 1 lot EUR/USD. Actual per-trade risk increases from 2% to 2.8%, risk out of control.',
              solution: isZh
                ? '始终基于当前账户净值计算仓位。账户$7,000时，2%风险=$140，应相应减少手数至约0.47手。每周更新一次计算。'
                : 'Always calculate position based on current account equity. At $7,000 account, 2% risk=$140, should reduce lot size to about 0.47 lots. Update calculation weekly.',
            },
          ].map((item, index) => (
            <div key={index} className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
              <h3 className="text-lg font-bold mb-3 text-black dark:text-white">❌ {item.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
                <strong>{isZh ? '问题：' : 'Problem:'}</strong> {item.problem}
              </p>
              <p className="text-green-600 dark:text-green-400 font-bold text-sm">
                ✅ {isZh ? '解决方案：' : 'Solution:'} {item.solution}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: Advanced Optimization */}
      <section id="advanced-optimization" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? '仓位优化技巧' : 'Position Optimization Techniques'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-black dark:border-white">
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
              {isZh ? '技巧1：分批建仓策略' : 'Technique 1: Scaled Entry Strategy'}
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>
                {isZh
                  ? '不一次性开满仓位，而是分2-3批建仓，降低平均成本并控制风险。适合趋势跟踪和波段交易。'
                  : 'Don\'t open full position at once, but build in 2-3 batches, reduce average cost and control risk. Suitable for trend following and swing trading.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                <p className="font-bold mb-2">{isZh ? '实施方法：' : 'Implementation:'}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>{isZh ? '第1批（50%仓位）：' : 'Batch 1 (50% position):'}</strong>{' '}
                    {isZh ? '在初始信号出现时建仓，止损设置在关键技术位' : 'Enter at initial signal, stop at key technical level'}
                  </li>
                  <li>
                    <strong>{isZh ? '第2批（30%仓位）：' : 'Batch 2 (30% position):'}</strong>{' '}
                    {isZh ? '价格突破前高/低确认趋势时加仓，第1批止损移至盈亏平衡' : 'Add when price breaks previous high/low confirming trend, move batch 1 stop to breakeven'}
                  </li>
                  <li>
                    <strong>{isZh ? '第3批（20%仓位）：' : 'Batch 3 (20% position):'}</strong>{' '}
                    {isZh ? '趋势加速时再次加仓，前两批止损移至保护利润位置' : 'Add again when trend accelerates, move first two stops to protect profit'}
                  </li>
                </ul>
              </div>
              <p>
                <strong>{isZh ? '优势：' : 'Advantages:'}</strong>{' '}
                {isZh
                  ? '1) 降低初始风险；2) 趋势确认后加仓提高收益；3) 心理压力更小，更易执行。'
                  : '1) Reduce initial risk; 2) Add after trend confirmation to boost returns; 3) Less psychological pressure, easier to execute.'}
              </p>
            </div>
          </div>

          <div className="p-6 border-2 border-black dark:border-white">
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
              {isZh ? '技巧2：相关性管理' : 'Technique 2: Correlation Management'}
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>
                {isZh
                  ? '避免同时持有高度相关的货币对，防止风险集中。例如同时做多EUR/USD、GBP/USD、AUD/USD，实际风险远超单笔2%。'
                  : 'Avoid simultaneously holding highly correlated pairs to prevent risk concentration. E.g., simultaneously long EUR/USD, GBP/USD, AUD/USD, actual risk far exceeds per-trade 2%.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                <p className="font-bold mb-2">{isZh ? '相关性控制原则：' : 'Correlation Control Principles:'}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    {isZh
                      ? '高相关性（>0.8）：同时最多持有1个仓位，或将单笔风险降至1%'
                      : 'High correlation (>0.8): Maximum 1 position simultaneously, or reduce per-trade risk to 1%'}
                  </li>
                  <li>
                    {isZh
                      ? '中相关性（0.5-0.8）：可同时持有，但总风险控制在3%内'
                      : 'Medium correlation (0.5-0.8): Can hold simultaneously, but total risk within 3%'}
                  </li>
                  <li>
                    {isZh
                      ? '低相关性（<0.5）：可正常建仓，每笔2%'
                      : 'Low correlation (<0.5): Can enter normally, 2% each'}
                  </li>
                  <li>
                    {isZh
                      ? '负相关性（<-0.5）：可用于对冲，但需谨慎（可能双向止损）'
                      : 'Negative correlation (<-0.5): Can use for hedging, but be cautious (may stop both ways)'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-black dark:border-white">
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
              {isZh ? '技巧3：最大总风险限额' : 'Technique 3: Maximum Total Risk Limit'}
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>
                {isZh
                  ? '除了单笔风险限制（2%），还应设置最大总风险限额，控制同时持仓的总体风险敞口。'
                  : 'Besides per-trade risk limit (2%), also set maximum total risk limit to control overall risk exposure of simultaneous positions.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                <p className="font-bold mb-2">{isZh ? '推荐设置：' : 'Recommended Settings:'}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>{isZh ? '保守型：' : 'Conservative:'}</strong>{' '}
                    {isZh ? '最大总风险5%（最多2-3个仓位）' : 'Maximum total risk 5% (max 2-3 positions)'}
                  </li>
                  <li>
                    <strong>{isZh ? '平衡型：' : 'Balanced:'}</strong>{' '}
                    {isZh ? '最大总风险8%（最多3-4个仓位）' : 'Maximum total risk 8% (max 3-4 positions)'}
                  </li>
                  <li>
                    <strong>{isZh ? '激进型：' : 'Aggressive:'}</strong>{' '}
                    {isZh ? '最大总风险10%（最多4-5个仓位）' : 'Maximum total risk 10% (max 4-5 positions)'}
                  </li>
                </ul>
              </div>
              <p>
                <strong>{isZh ? '实施：' : 'Implementation:'}</strong>{' '}
                {isZh
                  ? '开新仓前，计算所有现有仓位的总风险。如果已达8%，即使有好机会也不再开仓，等待现有仓位平仓后再考虑。'
                  : 'Before opening new position, calculate total risk of all existing positions. If already at 8%, even with good opportunity don\'t open new position, wait for existing positions to close.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-black dark:bg-white text-white dark:text-black">
            <h3 className="text-xl font-bold mb-4">
              {isZh ? '技巧4：使用专业工具自动化' : 'Technique 4: Use Professional Tools for Automation'}
            </h3>
            <div className="space-y-3 text-sm">
              <p>
                {isZh
                  ? '手动计算仓位复杂且容易出错，专业交易者都使用工具自动化执行。推荐工具：'
                  : 'Manual position calculation is complex and error-prone, professional traders use automated tools. Recommended tools:'}
              </p>
              <ul className="space-y-2">
                <li>
                  <strong>{isZh ? '1. FX Killer Position Calculator：' : '1. FX Killer Position Calculator:'}</strong>{' '}
                  {isZh
                    ? '输入账户、风险%、止损点数，自动计算手数。支持所有货币对，自动获取实时每点价值。'
                    : 'Input account, risk %, stop pips, auto-calculate lot size. Supports all pairs, auto-fetch real-time pip values.'}
                </li>
                <li>
                  <strong>{isZh ? '2. Position Sizing EA：' : '2. Position Sizing EA:'}</strong>{' '}
                  {isZh
                    ? 'MT4/MT5脚本，开仓时自动计算并设置手数、止损、止盈，避免人为错误。'
                    : 'MT4/MT5 script, auto-calculate and set lot size, stop-loss, take-profit when opening, avoid human error.'}
                </li>
                <li>
                  <strong>{isZh ? '3. Excel仓位管理表：' : '3. Excel Position Management Sheet:'}</strong>{' '}
                  {isZh
                    ? '记录每笔交易的仓位计算过程，定期分析是否符合风险管理规则。'
                    : 'Record position calculation process for every trade, regularly analyze if following risk management rules.'}
                </li>
                <li>
                  <strong>{isZh ? '4. 相关性矩阵工具：' : '4. Correlation Matrix Tool:'}</strong>{' '}
                  {isZh
                    ? '实时显示持仓货币对的相关性，避免风险集中。'
                    : 'Real-time display of correlation between held pairs, avoid risk concentration.'}
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '给职业交易者的高级建议' : 'Advanced Advice for Professional Traders'}
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>
                <strong>{isZh ? '1. 定期审计仓位管理：' : '1. Regular Position Management Audit:'}</strong>{' '}
                {isZh ? '每季度分析实际风险是否符合计划，是否有违规超仓情况。' : 'Quarterly analyze if actual risk matches plan, any violation overleveraging.'}
              </li>
              <li>
                <strong>{isZh ? '2. 回测不同仓位方法：' : '2. Backtest Different Position Methods:'}</strong>{' '}
                {isZh ? '用历史数据测试固定比例、凯利公式、动态调整的实际效果，找到最适合你的方法。' : 'Test fixed fractional, Kelly Criterion, dynamic adjustment with historical data, find method best for you.'}
              </li>
              <li>
                <strong>{isZh ? '3. 账户分层管理：' : '3. Tiered Account Management:'}</strong>{' '}
                {isZh ? '将资金分成多个账户，使用不同风险级别（如50%保守、30%标准、20%激进），分散风险。' : 'Divide capital into multiple accounts, use different risk levels (e.g., 50% conservative, 30% standard, 20% aggressive), diversify risk.'}
              </li>
              <li>
                <strong>{isZh ? '4. 持续优化调整规则：' : '4. Continuously Optimize Adjustment Rules:'}</strong>{' '}
                {isZh ? '市场环境变化，仓位管理规则也需更新。每半年评估一次ATR基准、时段调整、相关性阈值是否需要修改。' : 'Market environment changes, position management rules need updates. Every 6 months evaluate if ATR baseline, session adjustment, correlation thresholds need modification.'}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
