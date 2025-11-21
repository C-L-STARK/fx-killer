import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { riskManagementContent } from '@/content/education/risk-management.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    riskManagementContent.zh.title,
    riskManagementContent.en.title,
    riskManagementContent.zh.description,
    riskManagementContent.en.description,
    riskManagementContent.zh.keywords,
    riskManagementContent.en.keywords,
    lang
  );
}

export default async function RiskManagementPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const content = riskManagementContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: What is Risk Management */}
      <section id="what-is-risk-management" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '什么是风险管理？' : 'What is Risk Management?'}
        </h2>
        <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '风险管理（Risk Management）是外汇交易中最重要、却最容易被忽视的环节。它指的是通过系统化的方法，控制每笔交易的潜在亏损，保护交易资金，确保即使在连续亏损的情况下，账户仍有足够资金继续交易和实现盈利。简单来说：风险管理不是教你如何赚钱，而是教你如何不亏光钱。'
              : 'Risk Management is the most important yet most overlooked aspect of forex trading. It refers to using systematic methods to control potential losses per trade, protect trading capital, and ensure that even during consecutive losses, the account has sufficient funds to continue trading and achieve profitability. Simply put: risk management doesn\'t teach you how to make money, but how not to lose all your money.'}
          </p>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '为什么风险管理至关重要？' : 'Why Risk Management is Crucial'}</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 交易是概率游戏：' : '1. Trading is a Probability Game:'}</strong>{' '}
                {isZh
                  ? '没有任何策略能保证100%胜率。即使是职业交易者，胜率也通常在40-60%之间。这意味着连续亏损5-10笔是正常现象。如果没有风险管理，一次重仓失败就可能爆仓。'
                  : 'No strategy guarantees 100% win rate. Even professional traders typically have 40-60% win rates. This means 5-10 consecutive losses are normal. Without risk management, one overleveraged failure can blow your account.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 保护本金是第一要务：' : '2. Protecting Capital is Priority One:'}</strong>{' '}
                {isZh
                  ? '亏损10%只需赚11%就能回本，但亏损50%需要赚100%才能回本，亏损80%需要赚400%！复利增长的前提是本金不能大幅缩水。'
                  : 'A 10% loss needs 11% gain to recover, but 50% loss needs 100% gain to break even, 80% loss needs 400%! Compound growth requires capital not to significantly shrink.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 情绪控制的基础：' : '3. Foundation of Emotional Control:'}</strong>{' '}
                {isZh
                  ? '当单笔亏损超过承受范围（如账户的10-20%），交易者会陷入恐慌、愤怒，导致报复性交易、移动止损等错误决策。严格的风险管理让你保持冷静。'
                  : 'When single loss exceeds tolerance (e.g., 10-20% of account), traders panic and become angry, leading to revenge trading, moving stops, and other poor decisions. Strict risk management keeps you calm.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 长期盈利的保障：' : '4. Guarantee of Long-Term Profitability:'}</strong>{' '}
                {isZh
                  ? '研究显示，90%的交易者亏损不是因为策略不好，而是因为缺乏风险管理：不设止损、重仓交易、频繁交易。风险管理让你在市场中存活足够长时间，等待盈利机会。'
                  : 'Research shows 90% of traders lose not because of poor strategy, but lack of risk management: no stops, overleveraging, overtrading. Risk management keeps you alive long enough to catch profitable opportunities.'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '⚠️ 真实案例：缺乏风险管理的后果' : '⚠️ Real Case: Consequences of Poor Risk Management'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-3">
              {isZh
                ? '交易者小李，账户$10,000，学习了一套胜率55%的突破策略。前5笔交易盈利$1,200，信心爆棚。第6笔交易时，他把仓位从1手增加到5手（风险从2%增至10%），认为"这次一定能赢"。结果市场假突破，触发止损，单笔亏损$5,000。小李不甘心，立即开仓"回本"，又亏$3,000。最终账户从$11,200缩水至$3,200，亏损68%。即使后续策略继续有效，他也需要212%的收益才能回本，几乎不可能。'
                : 'Trader Li, $10,000 account, learned a 55% win rate breakout strategy. First 5 trades profit $1,200, confidence soared. On 6th trade, he increased position from 1 lot to 5 lots (risk from 2% to 10%), thinking "this one will definitely win". Result: false breakout, stop hit, single loss $5,000. Li refused to accept, immediately opened position to "recover", lost another $3,000. Account shrunk from $11,200 to $3,200, 68% loss. Even if strategy continues working, he needs 212% return to break even - nearly impossible.'}
            </p>
            <p className="text-red-600 dark:text-red-400 font-bold">
              {isZh
                ? '如果小李严格执行2%风险管理，即使连续亏损10笔，账户仍有$8,200（仅亏18%），完全有能力继续交易并实现盈利。'
                : 'If Li strictly followed 2% risk management, even after 10 consecutive losses, account would still have $8,200 (only 18% loss), fully capable of continuing trading and achieving profitability.'}
            </p>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-2 border-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '风险管理的三大支柱' : 'Three Pillars of Risk Management'}
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 仓位控制（Position Sizing）：' : '1. Position Sizing:'}</strong>{' '}
                {isZh
                  ? '控制每笔交易的手数/仓位大小，确保单笔最大亏损不超过账户的1-2%。这是风险管理的核心。'
                  : 'Control lot size/position size per trade, ensure maximum single loss doesn\'t exceed 1-2% of account. This is the core of risk management.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 止损设置（Stop-Loss）：' : '2. Stop-Loss:'}</strong>{' '}
                {isZh
                  ? '为每笔交易设置止损点，限制最大亏损金额。止损是你的生命线，绝不移动或取消。'
                  : 'Set stop-loss point for every trade, limit maximum loss amount. Stop-loss is your lifeline, never move or cancel it.'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 风险回报比（Risk-Reward Ratio）：' : '3. Risk-Reward Ratio:'}</strong>{' '}
                {isZh
                  ? '确保每笔交易的潜在收益至少是风险的1.5-3倍。这样即使胜率50%，长期仍能盈利。'
                  : 'Ensure potential reward is at least 1.5-3x risk per trade. This way even with 50% win rate, long-term still profitable.'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: Core Principles */}
      <section id="core-principles" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '风险管理核心原则' : 'Core Risk Management Principles'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '原则1：2%规则（The 2% Rule）' : 'Principle 1: The 2% Rule'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '定义：' : 'Definition:'}</strong>{' '}
                {isZh
                  ? '任何单笔交易的最大风险（从入场到止损的潜在亏损）不超过账户净值的2%。这是职业交易者广泛采用的黄金标准。'
                  : 'Maximum risk per trade (potential loss from entry to stop-loss) doesn\'t exceed 2% of account equity. This is the golden standard widely adopted by professional traders.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '计算示例：' : 'Calculation Example:'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li className="text-gray-300">{isZh ? '账户余额：$10,000' : 'Account Balance: $10,000'}</li>
                  <li className="text-gray-300">{isZh ? '单笔最大风险：$10,000 × 2% = $200' : 'Maximum Risk Per Trade: $10,000 × 2% = $200'}</li>
                  <li className="text-gray-300">{isZh ? '交易EUR/USD，止损30点' : 'Trading EUR/USD, stop-loss 30 pips'}</li>
                  <li className="text-gray-300">{isZh ? '标准手每点价值$10' : 'Standard lot pip value $10'}</li>
                  <li className="font-bold text-white">
                    {isZh
                      ? '可开仓位：$200 ÷ (30点 × $10) = 0.67手'
                      : 'Position Size: $200 ÷ (30 pips × $10) = 0.67 lots'}
                  </li>
                </ul>
              </div>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '为什么是2%？' : 'Why 2%?'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-gray-300">
                  {isZh
                    ? '连续10次止损只亏损18.3%（而非20%，因为每次亏损后本金减少）'
                    : '10 consecutive losses only lose 18.3% (not 20%, as capital decreases after each loss)'}
                </li>
                <li className="text-gray-300">
                  {isZh
                    ? '连续20次止损才会导致33%回撤，仍有回旋余地'
                    : '20 consecutive losses only cause 33% drawdown, still room to recover'}
                </li>
                <li className="text-gray-300">
                  {isZh
                    ? '心理压力可控，不会因为单笔亏损过大而情绪失控'
                    : 'Psychological pressure manageable, won\'t lose emotional control due to large single loss'}
                </li>
                <li className="text-gray-300">
                  {isZh
                    ? '即使遭遇连续亏损期，账户仍有足够资金等待市场机会'
                    : 'Even during losing streaks, account has sufficient funds to wait for market opportunities'}
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '原则2：止损永不移动（除非朝盈利方向）' : 'Principle 2: Never Move Stop-Loss (Unless Toward Profit)'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                {isZh
                  ? '止损一旦设定，就是你的最后防线。很多交易者看到价格接近止损时，会想"也许价格会反转，给它多一点空间"，于是把止损移远。这是致命错误。'
                  : 'Once stop-loss is set, it\'s your last line of defense. Many traders when seeing price approach stop think "maybe price will reverse, give it more room", so they move stop further. This is a fatal mistake.'}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
                  <p className="font-bold text-red-600 dark:text-red-400 mb-2">
                    ❌ {isZh ? '错误做法' : 'Wrong Approach'}
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '原计划止损30点（$200）' : 'Original stop 30 pips ($200)'}</li>
                    <li className="text-gray-300">{isZh ? '价格接近止损，移至50点（$333）' : 'Price nears stop, move to 50 pips ($333)'}</li>
                    <li className="text-gray-300">{isZh ? '价格继续下跌，再移至80点（$533）' : 'Price continues falling, move to 80 pips ($533)'}</li>
                    <li className="text-gray-300">{isZh ? '最终触发止损，亏损$533，是原计划的2.7倍' : 'Finally hit stop, loss $533, 2.7x original plan'}</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-600">
                  <p className="font-bold text-green-600 dark:text-green-400 mb-2">
                    ✅ {isZh ? '正确做法' : 'Correct Approach'}
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li className="text-gray-300">{isZh ? '设定止损30点（$200）' : 'Set stop 30 pips ($200)'}</li>
                    <li className="text-gray-300">{isZh ? '止损一旦设定，永不移动' : 'Once stop set, never move'}</li>
                    <li className="text-gray-300">{isZh ? '触发止损，亏损$200，符合风险管理' : 'Stop hit, loss $200, within risk management'}</li>
                    <li className="text-gray-300">{isZh ? '保持情绪稳定，继续执行下一笔交易' : 'Stay emotionally stable, continue next trade'}</li>
                  </ul>
                </div>
              </div>
              <p className="mt-3">
                <strong className="text-white">{isZh ? '唯一例外：' : 'Only Exception:'}</strong>{' '}
                {isZh
                  ? '当价格朝盈利方向运行时，可以移动止损至盈亏平衡点（入场价）或更高，锁定部分利润。这叫"追踪止损"。'
                  : 'When price moves in profitable direction, can move stop to breakeven (entry price) or higher, locking in partial profit. This is called "trailing stop".'}
              </p>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '原则3：每日最大亏损限额' : 'Principle 3: Daily Maximum Loss Limit'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300">
              <p className="text-gray-300">
                {isZh
                  ? '除了单笔风险控制，还需设定每日最大亏损限额。一旦达到，立即停止交易，避免情绪化交易扩大亏损。'
                  : 'Beyond per-trade risk control, also set daily maximum loss limit. Once reached, immediately stop trading, avoid emotional trading expanding losses.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '推荐设置：' : 'Recommended Settings:'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '保守型：' : 'Conservative:'}</strong>{' '}
                    {isZh ? '每日最大亏损3%（约1.5笔交易）' : 'Daily max loss 3% (approx 1.5 trades)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '平衡型：' : 'Balanced:'}</strong>{' '}
                    {isZh ? '每日最大亏损5%（约2.5笔交易）' : 'Daily max loss 5% (approx 2.5 trades)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '激进型：' : 'Aggressive:'}</strong>{' '}
                    {isZh ? '每日最大亏损7%（约3.5笔交易）' : 'Daily max loss 7% (approx 3.5 trades)'}
                  </li>
                </ul>
              </div>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '为什么需要每日限额？' : 'Why Daily Limit?'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li className="text-gray-300">{isZh ? '防止"报复性交易"：亏损后想快速回本，导致冲动开仓' : 'Prevent "revenge trading": wanting quick recovery after loss, leading to impulsive positions'}</li>
                <li className="text-gray-300">{isZh ? '保护心理状态：连续亏损会影响判断力，需要时间冷静' : 'Protect mental state: consecutive losses affect judgment, need time to cool down'}</li>
                <li className="text-gray-300">{isZh ? '识别策略问题：如果频繁触发每日限额，说明策略或执行有问题' : 'Identify strategy issues: if frequently hitting daily limit, indicates strategy or execution problems'}</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '原则4：风险承受能力评估' : 'Principle 4: Risk Tolerance Assessment'}
            </h3>
            <p className="mb-3">
              {isZh
                ? '不同交易者的风险承受能力不同。新手、兼职交易者、小资金账户应该使用更低的风险百分比（1%或更低），而职业交易者、大资金账户可以使用2-3%。'
                : 'Different traders have different risk tolerance. Beginners, part-time traders, small accounts should use lower risk percentage (1% or less), while professional traders, large accounts can use 2-3%.'}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-800">
                <thead>
                  <tr className="bg-gray-50 dark:bg-black text-white">
                    <th className="border border-gray-800 p-3 text-left">
                      {isZh ? '交易者类型' : 'Trader Type'}
                    </th>
                    <th className="border border-gray-800 p-3 text-left">
                      {isZh ? '建议风险' : 'Recommended Risk'}
                    </th>
                    <th className="border border-gray-800 p-3 text-left">
                      {isZh ? '每日限额' : 'Daily Limit'}
                    </th>
                    <th className="border border-gray-800 p-3 text-left">
                      {isZh ? '原因' : 'Reason'}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-300">
                  <tr>
                    <td className="border border-gray-800 p-3">
                      {isZh ? '新手（<6个月）' : 'Beginner (<6 months)'}
                    </td>
                    <td className="border border-gray-800 p-3 font-bold text-white">0.5-1%</td>
                    <td className="border border-gray-800 p-3">2-3%</td>
                    <td className="border border-gray-800 p-3">
                      {isZh ? '学习阶段，保护本金优先' : 'Learning phase, protect capital priority'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 p-3">
                      {isZh ? '中级（6-18个月）' : 'Intermediate (6-18 months)'}
                    </td>
                    <td className="border border-gray-800 p-3 font-bold text-white">1-2%</td>
                    <td className="border border-gray-800 p-3">3-5%</td>
                    <td className="border border-gray-800 p-3">
                      {isZh ? '策略稳定，可适度增加风险' : 'Strategy stable, can moderately increase risk'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 p-3">
                      {isZh ? '职业（>18个月）' : 'Professional (>18 months)'}
                    </td>
                    <td className="border border-gray-800 p-3 font-bold text-white">2-3%</td>
                    <td className="border border-gray-800 p-3">5-7%</td>
                    <td className="border border-gray-800 p-3">
                      {isZh ? '经验丰富，情绪控制好' : 'Experienced, good emotional control'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 p-3">
                      {isZh ? '小资金（<$1000）' : 'Small Account (<$1000)'}
                    </td>
                    <td className="border border-gray-800 p-3 font-bold text-white">1-2%</td>
                    <td className="border border-gray-800 p-3">3-5%</td>
                    <td className="border border-gray-800 p-3">
                      {isZh ? '资金有限，不能承受大回撤' : 'Limited capital, cannot afford large drawdown'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Position Sizing Basics */}
      <section id="position-sizing-basics" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '仓位控制基础' : 'Position Sizing Basics'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <p className="text-gray-300">
            {isZh
              ? '仓位控制是风险管理的核心执行环节。它回答一个关键问题：在既定的止损距离下，我应该开多少手才能确保亏损不超过2%？掌握仓位计算公式是每个交易者的必备技能。'
              : 'Position sizing is the core execution of risk management. It answers a key question: given a stop-loss distance, how many lots should I open to ensure loss doesn\'t exceed 2%? Mastering position calculation formula is essential for every trader.'}
          </p>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '标准仓位计算公式' : 'Standard Position Sizing Formula'}
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-gray-900 text-gray-300 text-center font-mono text-lg">
                {isZh
                  ? '手数 = (账户余额 × 风险%) / (止损点数 × 每点价值)'
                  : 'Lot Size = (Account Balance × Risk %) / (Stop Pips × Pip Value)'}
              </div>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '公式解释：' : 'Formula Explanation:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '账户余额：' : 'Account Balance:'}</strong>{' '}
                  {isZh ? '当前可用资金，如$10,000' : 'Current available funds, e.g., $10,000'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '风险%：' : 'Risk %:'}</strong>{' '}
                  {isZh ? '单笔最大风险百分比，通常2%' : 'Maximum risk percentage per trade, typically 2%'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '止损点数：' : 'Stop Pips:'}</strong>{' '}
                  {isZh ? '从入场到止损的距离，如30点' : 'Distance from entry to stop-loss, e.g., 30 pips'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">{isZh ? '每点价值：' : 'Pip Value:'}</strong>{' '}
                  {isZh
                    ? 'EUR/USD标准手每点$10，迷你手$1，微型手$0.1'
                    : 'EUR/USD standard lot $10/pip, mini lot $1/pip, micro lot $0.1/pip'}
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '示例1：EUR/USD交易' : 'Example 1: EUR/USD Trade'}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-bold text-white">{isZh ? '交易参数：' : 'Trade Parameters:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-gray-300">{isZh ? '账户：$10,000' : 'Account: $10,000'}</li>
                  <li className="text-gray-300">{isZh ? '风险：2% = $200' : 'Risk: 2% = $200'}</li>
                  <li className="text-gray-300">{isZh ? '止损：30点' : 'Stop: 30 pips'}</li>
                  <li className="text-gray-300">{isZh ? '货币对：EUR/USD' : 'Pair: EUR/USD'}</li>
                </ul>
                <p className="font-bold mt-3 text-white">{isZh ? '计算过程：' : 'Calculation:'}</p>
                <div className="p-3 bg-gray-100 dark:bg-[#0a0a0a] font-mono text-xs">
                  {isZh
                    ? '手数 = ($10,000 × 2%) / (30 × $10)\n     = $200 / $300\n     = 0.67标准手'
                    : 'Lot Size = ($10,000 × 2%) / (30 × $10)\n          = $200 / $300\n          = 0.67 standard lots'}
                </div>
                <p className="mt-2">
                  <strong className="text-white">{isZh ? '结论：' : 'Conclusion:'}</strong>{' '}
                  {isZh
                    ? '开仓0.6或0.7标准手，确保最大亏损不超过$200。'
                    : 'Open 0.6 or 0.7 standard lots, ensuring maximum loss doesn\'t exceed $200.'}
                </p>
              </div>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '示例2：GBP/JPY交易' : 'Example 2: GBP/JPY Trade'}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-bold text-white">{isZh ? '交易参数：' : 'Trade Parameters:'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-gray-300">{isZh ? '账户：$5,000' : 'Account: $5,000'}</li>
                  <li className="text-gray-300">{isZh ? '风险：1% = $50' : 'Risk: 1% = $50'}</li>
                  <li className="text-gray-300">{isZh ? '止损：50点' : 'Stop: 50 pips'}</li>
                  <li className="text-gray-300">{isZh ? '货币对：GBP/JPY（每点约$6.8）' : 'Pair: GBP/JPY (pip value ~$6.8)'}</li>
                </ul>
                <p className="font-bold mt-3 text-white">{isZh ? '计算过程：' : 'Calculation:'}</p>
                <div className="p-3 bg-gray-100 dark:bg-[#0a0a0a] font-mono text-xs">
                  {isZh
                    ? '手数 = ($5,000 × 1%) / (50 × $6.8)\n     = $50 / $340\n     = 0.15标准手'
                    : 'Lot Size = ($5,000 × 1%) / (50 × $6.8)\n          = $50 / $340\n          = 0.15 standard lots'}
                </div>
                <p className="mt-2">
                  <strong className="text-white">{isZh ? '结论：' : 'Conclusion:'}</strong>{' '}
                  {isZh
                    ? '开仓0.15标准手（或1.5迷你手），最大亏损约$51。'
                    : 'Open 0.15 standard lots (or 1.5 mini lots), maximum loss about $51.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '⚡ 快速提示：使用仓位计算器' : '⚡ Quick Tip: Use Position Calculator'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300">
              {isZh
                ? '手动计算仓位容易出错，尤其是交叉货币对（如GBP/JPY、EUR/AUD）每点价值不固定。建议使用专业仓位计算器（如FX Killer Position Calculator），只需输入账户、风险%、止损点数，即可自动计算最佳手数，避免计算错误导致的风险失控。'
                : 'Manual position calculation is error-prone, especially for cross pairs (GBP/JPY, EUR/AUD) with variable pip values. Recommend using professional position calculator (like FX Killer Position Calculator), just input account, risk %, stop pips to automatically calculate optimal lot size, avoiding calculation errors causing risk loss of control.'}
            </p>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '常见仓位控制错误' : 'Common Position Sizing Mistakes'}
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-300">
                <strong className="text-red-600 dark:text-red-400">
                  ❌ {isZh ? '错误1：固定手数交易' : 'Mistake 1: Fixed Lot Size Trading'}
                </strong>
                <p className="text-sm mt-1">
                  {isZh
                    ? '无论止损大小，总是开1手。止损30点时风险$300，止损50点时风险$500，风险不一致。应根据止损大小动态调整手数。'
                    : 'Always open 1 lot regardless of stop size. 30 pip stop risks $300, 50 pip stop risks $500, inconsistent risk. Should dynamically adjust lot size based on stop size.'}
                </p>
              </li>
              <li className="text-gray-300">
                <strong className="text-red-600 dark:text-red-400">
                  ❌ {isZh ? '错误2：忽视每点价值差异' : 'Mistake 2: Ignoring Pip Value Differences'}
                </strong>
                <p className="text-sm mt-1">
                  {isZh
                    ? '认为所有货币对每点价值都是$10。实际上，GBP/JPY、AUD/CAD等交叉盘每点价值不同，且随汇率波动。必须使用计算器或查询经纪商数据。'
                    : 'Assuming all pairs have $10 pip value. Actually, cross pairs like GBP/JPY, AUD/CAD have different pip values that fluctuate with exchange rates. Must use calculator or check broker data.'}
                </p>
              </li>
              <li className="text-gray-300">
                <strong className="text-red-600 dark:text-red-400">
                  ❌ {isZh ? '错误3：盈利后立即加大仓位' : 'Mistake 3: Immediately Increasing Position After Wins'}
                </strong>
                <p className="text-sm mt-1">
                  {isZh
                    ? '连续盈利后，从1%风险跳至5%风险，认为"手感好"。一次亏损就回吐所有利润。应随账户净值自然增长而增加仓位，而非主观调整。'
                    : 'After consecutive wins, jumping from 1% to 5% risk, thinking "feeling good". One loss gives back all profits. Should increase position naturally with account growth, not subjectively adjust.'}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Risk-Reward Ratio */}
      <section id="risk-reward-ratio" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '风险回报比详解' : 'Risk-Reward Ratio Explained'}
        </h2>
        <div className="space-y-6">
          <div className="space-y-4 text-gray-300 dark:text-gray-300 leading-relaxed">
            <p className="text-gray-300">
              {isZh
                ? '风险回报比（Risk-Reward Ratio，简称R:R）是衡量每笔交易潜在收益与风险的比值。它决定了你需要多高的胜率才能实现盈利。理解并优化风险回报比，是从亏损交易者进化为盈利交易者的关键。'
                : 'Risk-Reward Ratio (R:R) measures potential reward versus risk per trade. It determines what win rate you need to achieve profitability. Understanding and optimizing risk-reward ratio is key to evolving from losing to profitable trader.'}
            </p>

            <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-white">{isZh ? '风险回报比计算' : 'Risk-Reward Ratio Calculation'}</h3>
              <div className="text-center font-mono text-lg mb-4">
                {isZh
                  ? 'R:R = 潜在盈利 / 潜在亏损'
                  : 'R:R = Potential Profit / Potential Loss'}
              </div>
              <ul className="space-y-2">
                <li className="text-gray-300">
                  <strong className="text-white">1:1</strong> - {isZh ? '止损30点，止盈30点' : 'Stop 30 pips, target 30 pips'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">1:2</strong> - {isZh ? '止损30点，止盈60点' : 'Stop 30 pips, target 60 pips'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">1:3</strong> - {isZh ? '止损30点，止盈90点' : 'Stop 30 pips, target 90 pips'}
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">1:5</strong> - {isZh ? '止损30点，止盈150点' : 'Stop 30 pips, target 150 pips'}
                </li>
              </ul>
            </div>

            <div className="p-6 border-2 border-gray-800">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '风险回报比与胜率的关系' : 'Relationship Between R:R and Win Rate'}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-2 border-gray-800 text-sm">
                  <thead>
                    <tr className="bg-gray-900 text-gray-300">
                      <th className="border border-gray-800 p-3 text-left">
                        {isZh ? '风险回报比' : 'R:R Ratio'}
                      </th>
                      <th className="border border-gray-800 p-3 text-left">
                        {isZh ? '盈亏平衡胜率' : 'Breakeven Win Rate'}
                      </th>
                      <th className="border border-gray-800 p-3 text-left">
                        {isZh ? '50%胜率下收益' : 'Profit at 50% Win Rate'}
                      </th>
                      <th className="border border-gray-800 p-3 text-left">
                        {isZh ? '适用策略' : 'Suitable Strategy'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">1:1</td>
                      <td className="border border-gray-800 p-3 text-gray-300">50%</td>
                      <td className="border border-gray-800 p-3 text-gray-300">$0（盈亏平衡）</td>
                      <td className="border border-gray-800 p-3 text-gray-300">
                        {isZh ? '高胜率剥头皮' : 'High win rate scalping'}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                      <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">1:1.5</td>
                      <td className="border border-gray-800 p-3 text-gray-300">40%</td>
                      <td className="border border-gray-800 p-3 text-gray-300">+$250</td>
                      <td className="border border-gray-800 p-3 text-gray-300">
                        {isZh ? '短线日内交易' : 'Short-term day trading'}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">1:2</td>
                      <td className="border border-gray-800 p-3 text-gray-300">33%</td>
                      <td className="border border-gray-800 p-3 text-gray-300">+$500</td>
                      <td className="border border-gray-800 p-3 text-gray-300">
                        {isZh ? '标准日内交易' : 'Standard day trading'}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                      <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">1:3</td>
                      <td className="border border-gray-800 p-3 text-gray-300">25%</td>
                      <td className="border border-gray-800 p-3 text-gray-300">+$1,000</td>
                      <td className="border border-gray-800 p-3 text-gray-300">
                        {isZh ? '波段交易' : 'Swing trading'}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 p-3 font-bold text-gray-300 text-white">1:5</td>
                      <td className="border border-gray-800 p-3 text-gray-300">16.7%</td>
                      <td className="border border-gray-800 p-3 text-gray-300">+$2,000</td>
                      <td className="border border-gray-800 p-3 text-gray-300">
                        {isZh ? '趋势跟踪' : 'Trend following'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm mt-3 text-gray-600 dark:text-gray-400">
                {isZh
                  ? '注：假设每笔交易风险$200，进行10笔交易的结果'
                  : 'Note: Assumes $200 risk per trade, results after 10 trades'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '案例：1:2风险回报比的威力' : 'Case: Power of 1:2 Risk-Reward'}
              </h3>
              <div className="space-y-2 text-sm text-gray-300 dark:text-gray-300">
                <p className="font-bold text-white">{isZh ? '交易记录（10笔）：' : 'Trading Record (10 trades):'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-gray-300">{isZh ? '胜率：40%（4胜6负）' : 'Win rate: 40% (4 wins, 6 losses)'}</li>
                  <li className="text-gray-300">{isZh ? '单笔风险：$200' : 'Risk per trade: $200'}</li>
                  <li className="text-gray-300">{isZh ? '单笔目标：$400（1:2）' : 'Target per trade: $400 (1:2)'}</li>
                  <li className="text-gray-300">{isZh ? '4笔盈利：4 × $400 = $1,600' : '4 wins: 4 × $400 = $1,600'}</li>
                  <li className="text-gray-300">{isZh ? '6笔亏损：6 × $200 = -$1,200' : '6 losses: 6 × $200 = -$1,200'}</li>
                  <li className="font-bold text-green-600 dark:text-green-400">
                    {isZh ? '净利润：$400' : 'Net profit: $400'}
                  </li>
                </ul>
                <p className="mt-3">
                  {isZh
                    ? '即使胜率只有40%，由于风险回报比1:2，仍实现盈利$400（账户4%收益）。'
                    : 'Even with only 40% win rate, due to 1:2 risk-reward, still achieved $400 profit (4% account return).'}
                </p>
              </div>
            </div>

            <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
              <h3 className="text-lg font-bold mb-3 text-white">
                {isZh ? '反例：1:1风险回报比的陷阱' : 'Counter-example: Trap of 1:1 Risk-Reward'}
              </h3>
              <div className="space-y-2 text-sm text-gray-300 dark:text-gray-300">
                <p className="font-bold text-white">{isZh ? '交易记录（10笔）：' : 'Trading Record (10 trades):'}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-gray-300">{isZh ? '胜率：60%（6胜4负）' : 'Win rate: 60% (6 wins, 4 losses)'}</li>
                  <li className="text-gray-300">{isZh ? '单笔风险：$200' : 'Risk per trade: $200'}</li>
                  <li className="text-gray-300">{isZh ? '单笔目标：$200（1:1）' : 'Target per trade: $200 (1:1)'}</li>
                  <li className="text-gray-300">{isZh ? '6笔盈利：6 × $200 = $1,200' : '6 wins: 6 × $200 = $1,200'}</li>
                  <li className="text-gray-300">{isZh ? '4笔亏损：4 × $200 = -$800' : '4 losses: 4 × $200 = -$800'}</li>
                  <li className="text-gray-300">{isZh ? '点差成本：10笔 × $20 = -$200' : 'Spread cost: 10 trades × $20 = -$200'}</li>
                  <li className="font-bold text-red-600 dark:text-red-400">
                    {isZh ? '净利润：$200' : 'Net profit: $200'}
                  </li>
                </ul>
                <p className="mt-3">
                  {isZh
                    ? '即使胜率高达60%，由于风险回报比仅1:1，扣除点差后利润微薄，不值得投入时间和精力。'
                    : 'Even with 60% win rate, due to only 1:1 risk-reward, after spread costs profit is minimal, not worth time and effort.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '如何选择最佳风险回报比？' : 'How to Choose Optimal Risk-Reward Ratio?'}
            </h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-300">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 根据策略类型：' : '1. Based on Strategy Type:'}</strong>{' '}
                {isZh
                  ? '剥头皮（M1-M5）：1:1-1:1.5；日内交易（M15-H1）：1:2-1:3；波段交易（H4-D1）：1:3-1:5'
                  : 'Scalping (M1-M5): 1:1-1:1.5; Day trading (M15-H1): 1:2-1:3; Swing trading (H4-D1): 1:3-1:5'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 考虑市场波动性：' : '2. Consider Market Volatility:'}</strong>{' '}
                {isZh
                  ? '高波动性货币对（GBP/JPY）容易达成大目标，可用1:3；低波动性（EUR/CHF）用1:1.5-1:2'
                  : 'High volatility pairs (GBP/JPY) easily achieve large targets, use 1:3; low volatility (EUR/CHF) use 1:1.5-1:2'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 测试历史数据：' : '3. Test Historical Data:'}</strong>{' '}
                {isZh
                  ? '回测你的策略，看看平均能达成多大的利润目标，设定现实的风险回报比'
                  : 'Backtest your strategy to see what profit targets are typically achieved, set realistic risk-reward ratio'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. 平衡胜率与回报：' : '4. Balance Win Rate and Reward:'}</strong>{' '}
                {isZh
                  ? '目标越大，胜率越低。找到你能接受的胜率和风险回报比平衡点（如45%胜率配1:2）'
                  : 'Larger targets mean lower win rate. Find balance point you can accept between win rate and risk-reward (e.g., 45% win rate with 1:2)'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: Case Studies */}
      <section id="case-studies" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '实战案例分析' : 'Real-World Case Studies'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '成功案例：严格执行2%规则' : 'Success Case: Strict 2% Rule Execution'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300 text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '交易者背景：' : 'Trader Background:'}</strong>{' '}
                {isZh
                  ? '小张，初始资金$5,000，使用趋势跟踪策略，严格执行2%风险管理。'
                  : 'Zhang, initial capital $5,000, using trend following strategy, strictly executing 2% risk management.'}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '3个月交易记录：' : '3-Month Trading Record:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? '总交易：45笔' : 'Total trades: 45'}</li>
                <li className="text-gray-300">{isZh ? '胜率：42%（19胜26负）' : 'Win rate: 42% (19 wins, 26 losses)'}</li>
                <li className="text-gray-300">{isZh ? '平均风险回报比：1:2.5' : 'Average risk-reward: 1:2.5'}</li>
                <li className="text-gray-300">{isZh ? '单笔风险：始终$100（账户2%）' : 'Risk per trade: always $100 (2% of account)'}</li>
                <li className="text-gray-300">{isZh ? '19笔盈利：19 × $250 = $4,750' : '19 wins: 19 × $250 = $4,750'}</li>
                <li className="text-gray-300">{isZh ? '26笔亏损：26 × $100 = -$2,600' : '26 losses: 26 × $100 = -$2,600'}</li>
                <li className="font-bold text-green-600 dark:text-green-400">
                  {isZh ? '净利润：$2,150（账户增长43%）' : 'Net profit: $2,150 (43% account growth)'}
                </li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '关键成功因素：' : 'Key Success Factors:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? '即使胜率低于50%，仍因高风险回报比实现盈利' : 'Even with win rate below 50%, still profitable due to high risk-reward'}</li>
                <li className="text-gray-300">{isZh ? '单笔风险固定2%，最大回撤仅15%，情绪稳定' : 'Fixed 2% risk per trade, maximum drawdown only 15%, emotionally stable'}</li>
                <li className="text-gray-300">{isZh ? '从不违反规则，连续7次止损后仍坚持策略' : 'Never violated rules, continued strategy after 7 consecutive losses'}</li>
                <li className="text-gray-300">{isZh ? '随账户增长自然增加仓位（从$100增至$143风险）' : 'Naturally increased position with account growth ($100 to $143 risk)'}</li>
              </ul>
            </div>
          </div>

          <div className="p-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '失败案例：忽视风险管理的代价' : 'Failure Case: Price of Ignoring Risk Management'}
            </h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-300 text-sm">
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '交易者背景：' : 'Trader Background:'}</strong>{' '}
                {isZh
                  ? '小王，初始资金$10,000，使用相同策略，但未执行风险管理。'
                  : 'Wang, initial capital $10,000, using same strategy, but didn\'t execute risk management.'}
              </p>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '灾难性交易记录：' : 'Disastrous Trading Record:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? '第1-5笔：使用1手（风险约3%），盈利$1,500' : 'Trades 1-5: using 1 lot (risk ~3%), profit $1,500'}</li>
                <li className="text-gray-300">{isZh ? '信心膨胀，第6笔增加至3手（风险9%）' : 'Confidence inflated, trade 6 increased to 3 lots (9% risk)'}</li>
                <li className="text-gray-300">{isZh ? '第6笔触发止损，亏损$900' : 'Trade 6 hit stop, loss $900'}</li>
                <li className="text-gray-300">{isZh ? '不服气，第7笔开5手想"快速回本"' : 'Refused to accept, trade 7 opened 5 lots to "quickly recover"'}</li>
                <li className="text-gray-300">{isZh ? '第7笔再次止损，亏损$1,500' : 'Trade 7 stopped out again, loss $1,500'}</li>
                <li className="text-gray-300">{isZh ? '恐慌中第8-10笔，连续重仓亏损' : 'Panic trades 8-10, consecutive overleveraged losses'}</li>
                <li className="font-bold text-red-600 dark:text-red-400">
                  {isZh ? '最终账户：$3,800（亏损62%）' : 'Final account: $3,800 (62% loss)'}
                </li>
              </ul>
              <p className="text-gray-300">
                <strong className="text-white">{isZh ? '失败原因分析：' : 'Failure Analysis:'}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-gray-300">{isZh ? '无固定风险百分比，随意调整仓位' : 'No fixed risk percentage, randomly adjusted position'}</li>
                <li className="text-gray-300">{isZh ? '盈利后过度自信，大幅增加风险' : 'Overconfident after wins, dramatically increased risk'}</li>
                <li className="text-gray-300">{isZh ? '亏损后情绪失控，试图"报复性交易"回本' : 'Lost emotional control after losses, tried "revenge trading" to recover'}</li>
                <li className="text-gray-300">{isZh ? '单笔风险高达9-15%，3次失败即爆仓' : 'Per-trade risk as high as 9-15%, 3 failures blew account'}</li>
                <li className="text-gray-300">{isZh ? '需要163%收益才能回本，几乎不可能' : 'Needs 163% return to break even, nearly impossible'}</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '对比总结：风险管理的决定性作用' : 'Comparison Summary: Decisive Role of Risk Management'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-800 text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-black text-white">
                    <th className="border border-gray-800 p-3 text-left">{isZh ? '对比项' : 'Item'}</th>
                    <th className="border border-gray-800 p-3 text-left">{isZh ? '小张（成功）' : 'Zhang (Success)'}</th>
                    <th className="border border-gray-800 p-3 text-left">{isZh ? '小王（失败）' : 'Wang (Failure)'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-800 p-3">{isZh ? '初始资金' : 'Initial Capital'}</td>
                    <td className="border border-gray-800 p-3">$5,000</td>
                    <td className="border border-gray-800 p-3">$10,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 p-3">{isZh ? '单笔风险' : 'Risk Per Trade'}</td>
                    <td className="border border-gray-800 p-3">2%（固定）</td>
                    <td className="border border-gray-800 p-3">3-15%（随意）</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 p-3">{isZh ? '胜率' : 'Win Rate'}</td>
                    <td className="border border-gray-800 p-3">42%</td>
                    <td className="border border-gray-800 p-3">~50%（估计）</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 p-3">{isZh ? '最大回撤' : 'Max Drawdown'}</td>
                    <td className="border border-gray-800 p-3">15%</td>
                    <td className="border border-gray-800 p-3">62%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 p-3 font-bold text-white">{isZh ? '最终结果' : 'Final Result'}</td>
                    <td className="border border-gray-800 p-3 text-green-400">+43%</td>
                    <td className="border border-gray-800 p-3 text-red-400">-62%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              {isZh
                ? '结论：即使资金更少、胜率更低，严格的风险管理仍能实现盈利；而缺乏风险管理，即使资金充足、胜率尚可，仍会导致灾难性亏损。'
                : 'Conclusion: Even with less capital and lower win rate, strict risk management still achieves profitability; while without risk management, even with sufficient capital and decent win rate, still leads to catastrophic losses.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Common Mistakes */}
      <section id="common-mistakes" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '常见错误与规避方法' : 'Common Mistakes and Solutions'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误1：不设止损或心理止损' : 'Mistake 1: No Stop-Loss or Mental Stop-Loss'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '认为"止损会被猎杀"或"我会手动平仓"，不设置止损单。结果：网络故障、行情剧烈波动、或情绪失控时无法及时平仓，小亏变爆仓。'
                : 'Thinking "stops get hunted" or "I\'ll manually close", not setting stop-loss orders. Result: network failure, severe volatility, or emotional loss of control prevents timely closing, small loss becomes account blow-up.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '每笔交易开仓同时必须设置止损单。止损是你的生命线，不是敌人。职业交易者100%使用止损单，从不依赖手动平仓。如果担心被猎杀，将止损设置在关键支撑/阻力位外侧，而非整数关口。'
                : 'Must set stop-loss order when opening every position. Stop-loss is your lifeline, not enemy. Professional traders 100% use stop-loss orders, never rely on manual close. If worried about stop hunting, set stop outside key support/resistance, not at round numbers.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误2：满仓或重仓交易' : 'Mistake 2: Full Position or Overleveraging'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '使用账户的50-100%保证金开仓，认为"放手一搏"。一次逆向波动就爆仓，甚至产生负余额。'
                : 'Using 50-100% of account margin to open positions, thinking "go all in". One adverse move blows account, even negative balance.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '保证金使用率永远不超过30%，最好控制在10-20%。这样即使市场剧烈波动，也有足够缓冲空间。记住：保证金充足≠可以重仓，风险管理基于账户净值而非保证金。例如，$10,000账户即使保证金只需$100，单笔风险仍应控制在$200（2%）。'
                : 'Margin usage never exceeds 30%, preferably 10-20%. This way even during severe market volatility, sufficient buffer space. Remember: sufficient margin ≠ can overlever, risk management based on account equity not margin. E.g., $10,000 account even if margin only requires $100, per-trade risk should still control at $200 (2%).'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误3：亏损后加倍仓位（马丁格尔）' : 'Mistake 3: Doubling Position After Loss (Martingale)'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '亏损$100后，下一笔开2倍仓位，想"一次回本"。连续亏损几次后，仓位呈指数级增长（1手→2手→4手→8手），最终爆仓。'
                : 'After $100 loss, next trade double position to "recover in one trade". After several consecutive losses, position grows exponentially (1 lot→2 lots→4 lots→8 lots), eventually blows account.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '永远保持固定风险百分比（如2%），无论盈亏。亏损后，仓位应该随账户减少而自然减少，而非增加。马丁格尔策略在交易中是自杀行为，职业交易者从不使用。如果连续亏损，应该暂停交易、复盘策略，而不是加大赌注。'
                : 'Always maintain fixed risk percentage (e.g., 2%), regardless of wins/losses. After loss, position should naturally decrease with account reduction, not increase. Martingale strategy in trading is suicide, professional traders never use it. If consecutive losses, should pause trading, review strategy, not increase bets.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误4：忽视相关性，同时交易多个相关货币对' : 'Mistake 4: Ignoring Correlation, Trading Multiple Correlated Pairs'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '同时做多EUR/USD、GBP/USD、AUD/USD，认为是"分散风险"。实际上，这三个货币对高度相关（都对美元），一旦美元走强，三笔交易同时亏损，实际风险6-8%。'
                : 'Simultaneously long EUR/USD, GBP/USD, AUD/USD, thinking it\'s "risk diversification". Actually, these three pairs highly correlated (all against USD), once USD strengthens, all three trades lose, actual risk 6-8%.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '了解货币对相关性，避免同时交易高度相关的货币对。如果必须交易，将总风险控制在2-3%内（如每对1%）。建议：同时最多持有2-3个仓位，且选择低相关性货币对（如EUR/USD + GBP/JPY + AUD/NZD）。使用FX Killer的相关性工具识别风险。'
                : 'Understand currency pair correlation, avoid simultaneously trading highly correlated pairs. If must trade, control total risk within 2-3% (e.g., 1% each). Recommend: hold maximum 2-3 positions simultaneously, choose low-correlation pairs (e.g., EUR/USD + GBP/JPY + AUD/NZD). Use FX Killer correlation tool to identify risks.'}
            </p>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              ❌ {isZh ? '错误5：达到目标后继续交易' : 'Mistake 5: Continue Trading After Reaching Target'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {isZh
                ? '设定每日盈利目标$200，达成后继续交易"趁手感好多赚点"。结果过度交易，执行质量下降，回吐所有利润甚至转盈为亏。'
                : 'Set daily profit target $200, after achieving continue trading to "take advantage of good feeling". Result: overtrading, execution quality declines, give back all profits or even turn profit to loss.'}
            </p>
            <p className="text-green-600 dark:text-green-400 font-bold">
              ✅ {isZh ? '正确做法：' : 'Solution:'}{' '}
              {isZh
                ? '设定每日盈利目标和亏损限额，达到任一标准立即停止交易。盈利目标不应过高（建议账户的3-5%），这样可以保持纪律。记住：交易是马拉松，不是百米冲刺。保护今天的利润，明天继续赚钱，比一天赚大钱后连续亏损好得多。'
                : 'Set daily profit target and loss limit, stop trading immediately upon reaching either. Profit target shouldn\'t be too high (recommend 3-5% of account), this maintains discipline. Remember: trading is marathon, not sprint. Protect today\'s profit, continue earning tomorrow, much better than earning big one day then consecutive losses.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: Advanced Techniques */}
      <section id="advanced-techniques" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
          {isZh ? '进阶风险管理技巧' : 'Advanced Risk Management Techniques'}
        </h2>
        <div className="space-y-6 text-gray-300 dark:text-gray-300 leading-relaxed">
          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '技巧1：动态风险调整' : 'Technique 1: Dynamic Risk Adjustment'}
            </h3>
            <div className="space-y-3">
              <p className="text-gray-300">
                {isZh
                  ? '根据账户表现和市场环境，动态调整风险百分比。不是固定2%，而是在1-3%之间灵活调整。'
                  : 'Dynamically adjust risk percentage based on account performance and market environment. Not fixed 2%, but flexible between 1-3%.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '调整规则：' : 'Adjustment Rules:'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '连续盈利：' : 'Consecutive Wins:'}</strong>{' '}
                    {isZh
                      ? '连续5笔盈利后，风险从2%增至2.5%，最高3%'
                      : 'After 5 consecutive wins, increase risk from 2% to 2.5%, maximum 3%'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '连续亏损：' : 'Consecutive Losses:'}</strong>{' '}
                    {isZh
                      ? '连续3笔亏损后，风险从2%降至1.5%，连续5笔降至1%'
                      : 'After 3 consecutive losses, decrease risk from 2% to 1.5%, after 5 consecutive to 1%'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '高波动市场：' : 'High Volatility Market:'}</strong>{' '}
                    {isZh
                      ? '重大新闻前后、市场剧烈波动时，降至1%'
                      : 'Around major news, severe market volatility, decrease to 1%'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '低波动市场：' : 'Low Volatility Market:'}</strong>{' '}
                    {isZh
                      ? '亚洲时段、横盘市场，可维持2%或适度增至2.5%'
                      : 'Asian session, ranging market, maintain 2% or moderately increase to 2.5%'}
                  </li>
                </ul>
              </div>
              <p className="text-sm mt-3">
                <strong className="text-white">{isZh ? '注意：' : 'Note:'}</strong>{' '}
                {isZh
                  ? '动态调整应遵循明确规则，而非主观判断。在交易计划中提前制定规则，避免情绪化决策。'
                  : 'Dynamic adjustment should follow clear rules, not subjective judgment. Establish rules in advance in trading plan, avoid emotional decisions.'}
              </p>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '技巧2：多层次止损策略' : 'Technique 2: Multi-Tier Stop-Loss Strategy'}
            </h3>
            <div className="space-y-3">
              <p className="text-gray-300">
                {isZh
                  ? '不只设置一个止损点，而是使用多层次止损，分批退出亏损仓位，减少单次巨额亏损的心理冲击。'
                  : 'Not just one stop-loss point, but multi-tier stop-loss, exit losing position in batches, reduce psychological impact of single large loss.'}
              </p>
              <div className="p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <p className="font-bold mb-2 text-white">{isZh ? '实施方法：' : 'Implementation Method:'}</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '第一层（50%仓位）：' : 'First Tier (50% position):'}</strong>{' '}
                    {isZh
                      ? '在关键技术位设置止损（如支撑位下方）'
                      : 'Set stop at key technical level (below support)'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '第二层（30%仓位）：' : 'Second Tier (30% position):'}</strong>{' '}
                    {isZh
                      ? '在更远的止损位（如前低点下方），给价格多一点空间'
                      : 'At further stop level (below previous low), give price more room'}
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">{isZh ? '第三层（20%仓位）：' : 'Third Tier (20% position):'}</strong>{' '}
                    {isZh
                      ? '最终止损位（如2倍ATR），防止极端行情'
                      : 'Final stop level (e.g., 2x ATR), protect against extreme moves'}
                  </li>
                </ul>
              </div>
              <p className="text-sm mt-3">
                <strong className="text-white">{isZh ? '优点：' : 'Advantages:'}</strong>{' '}
                {isZh
                  ? '1) 降低被止损后立即反转的懊恼；2) 保留小部分仓位应对反转；3) 心理压力更小，更容易执行。'
                  : '1) Reduce regret of immediate reversal after stop; 2) Keep small position for reversal; 3) Less psychological pressure, easier to execute.'}
              </p>
            </div>
          </div>

          <div className="p-6 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '技巧3：账户分层管理' : 'Technique 3: Tiered Account Management'}
            </h3>
            <div className="space-y-3">
              <p className="text-gray-300">
                {isZh
                  ? '将交易资金分成多个层次，每个层次有不同的风险承受能力和盈利目标，实现风险分散。'
                  : 'Divide trading capital into multiple tiers, each tier with different risk tolerance and profit targets, achieving risk diversification.'}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-2 border-gray-800 text-sm">
                  <thead>
                    <tr className="bg-gray-900 text-gray-300">
                      <th className="border border-gray-800 p-3 text-left">
                        {isZh ? '账户层次' : 'Account Tier'}
                      </th>
                      <th className="border border-gray-800 p-3 text-left">
                        {isZh ? '资金分配' : 'Capital Allocation'}
                      </th>
                      <th className="border border-gray-800 p-3 text-left">
                        {isZh ? '风险设置' : 'Risk Setting'}
                      </th>
                      <th className="border border-gray-800 p-3 text-left">
                        {isZh ? '策略类型' : 'Strategy Type'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-800 p-3 text-gray-300">
                        {isZh ? '保守层（A账户）' : 'Conservative Tier (Account A)'}
                      </td>
                      <td className="border border-gray-800 p-3 text-gray-300">50%</td>
                      <td className="border border-gray-800 p-3 text-gray-300">1%</td>
                      <td className="border border-gray-800 p-3 text-gray-300">
                        {isZh ? '趋势跟踪，H4/D1' : 'Trend following, H4/D1'}
                      </td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-[#0a0a0a]">
                      <td className="border border-gray-800 p-3 text-gray-300">
                        {isZh ? '平衡层（B账户）' : 'Balanced Tier (Account B)'}
                      </td>
                      <td className="border border-gray-800 p-3 text-gray-300">30%</td>
                      <td className="border border-gray-800 p-3 text-gray-300">2%</td>
                      <td className="border border-gray-800 p-3 text-gray-300">
                        {isZh ? '日内交易，H1/M15' : 'Day trading, H1/M15'}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 p-3 text-gray-300">
                        {isZh ? '激进层（C账户）' : 'Aggressive Tier (Account C)'}
                      </td>
                      <td className="border border-gray-800 p-3 text-gray-300">20%</td>
                      <td className="border border-gray-800 p-3 text-gray-300">3%</td>
                      <td className="border border-gray-800 p-3 text-gray-300">
                        {isZh ? '剥头皮，M5/M15' : 'Scalping, M5/M15'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm mt-3">
                <strong className="text-white">{isZh ? '优点：' : 'Advantages:'}</strong>{' '}
                {isZh
                  ? '1) 即使激进账户爆仓，仍保留80%资金；2) 不同策略分散风险；3) 可以尝试新策略而不危及全部资金。'
                  : '1) Even if aggressive account blows up, still retain 80% capital; 2) Different strategies diversify risk; 3) Can try new strategies without risking all capital.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-300 border-2 border-gray-800">
            <h3 className="text-xl font-bold mb-4 text-white">
              {isZh ? '技巧4：使用风险管理工具' : 'Technique 4: Use Risk Management Tools'}
            </h3>
            <p className="mb-3">
              {isZh
                ? '借助专业工具自动化风险管理流程，减少人为错误和情绪干扰。'
                : 'Leverage professional tools to automate risk management process, reduce human error and emotional interference.'}
            </p>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '1. 仓位计算器：' : '1. Position Calculator:'}</strong>{' '}
                {isZh
                  ? '自动计算最佳手数，避免计算错误'
                  : 'Automatically calculate optimal lot size, avoid calculation errors'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '2. 风险回报比计算器：' : '2. Risk-Reward Calculator:'}</strong>{' '}
                {isZh
                  ? '可视化展示潜在盈亏，帮助决策是否入场'
                  : 'Visualize potential profit/loss, help decide whether to enter'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '3. 交易日志：' : '3. Trading Journal:'}</strong>{' '}
                {isZh
                  ? '记录每笔交易的风险管理执行情况，定期复盘改进'
                  : 'Record risk management execution of every trade, regularly review and improve'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '4. EA/脚本：' : '4. EA/Scripts:'}</strong>{' '}
                {isZh
                  ? '自动设置止损止盈、追踪止损、达到限额自动关闭交易'
                  : 'Automatically set stop-loss/take-profit, trailing stop, auto-close trades when limit reached'}
              </li>
              <li className="text-gray-300">
                <strong className="text-white">{isZh ? '5. 相关性矩阵：' : '5. Correlation Matrix:'}</strong>{' '}
                {isZh
                  ? '识别高度相关的货币对，避免重复风险'
                  : 'Identify highly correlated pairs, avoid duplicate risk'}
              </li>
            </ul>
            <p className="mt-3 text-sm">
              {isZh
                ? 'FX Killer 提供完整的风险管理工具套件，帮助你实现自动化、系统化的风险控制。'
                : 'FX Killer provides complete risk management tool suite to help you achieve automated, systematic risk control.'}
            </p>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-white">
              {isZh ? '给职业交易者的建议' : 'Advice for Professional Traders'}
            </h3>
            <p className="text-gray-300 dark:text-gray-300">
              {isZh
                ? '即使你已经是经验丰富的交易者，仍需定期审查风险管理体系。市场环境变化、账户规模增长、心理状态波动都会影响风险管理效果。建议每季度进行风险管理审计：1) 检查实际风险是否符合计划（是否有违规重仓）；2) 分析最大回撤原因和速度；3) 评估风险回报比是否需要调整；4) 更新止损策略以适应市场波动性变化。记住：风险管理不是一成不变的规则，而是需要持续优化的系统。'
                : 'Even if you\'re an experienced trader, still need to regularly review risk management system. Market environment changes, account size growth, psychological state fluctuations all affect risk management effectiveness. Recommend quarterly risk management audit: 1) Check if actual risk matches plan (any violation overleveraging); 2) Analyze maximum drawdown causes and speed; 3) Evaluate if risk-reward ratio needs adjustment; 4) Update stop-loss strategy to adapt to market volatility changes. Remember: risk management is not unchanging rule, but system needing continuous optimization.'}
            </p>
          </div>
        </div>
      </section>
    </EducationPageTemplate>
  );
}
