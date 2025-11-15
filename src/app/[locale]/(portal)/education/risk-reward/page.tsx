import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { getBrandConfig } from '@/lib/brand-config';
import { riskRewardContent } from '@/content/education/risk-reward.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();

  return generateBilingualMetadata(
    riskRewardContent.zh.title,
    riskRewardContent.en.title,
    riskRewardContent.zh.description,
    riskRewardContent.en.description,
    riskRewardContent.zh.keywords,
    riskRewardContent.en.keywords,
    lang,
    brandConfig
  );
}

export default async function RiskRewardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();
  const content = riskRewardContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: What is Risk-Reward Ratio */}
      <section id="what-is-risk-reward" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? '什么是风险回报比？' : 'What is Risk-Reward Ratio?'}
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            {isZh
              ? '风险回报比（Risk-Reward Ratio，简称R:R或RRR）是衡量每笔交易潜在收益与风险的比值，是交易数学的核心概念。它回答一个关键问题：为了赚取$1的利润，我愿意承担多少风险？简单来说：风险回报比决定了你需要多高的胜率才能盈利，以及长期能赚多少钱。'
              : 'Risk-Reward Ratio (R:R or RRR) measures the ratio of potential reward to risk per trade, core concept of trading mathematics. It answers a key question: to earn $1 profit, how much risk am I willing to take? Simply put: risk-reward ratio determines what win rate you need to profit, and how much money you can earn long-term.'}
          </p>

          <div className="p-6 bg-black dark:bg-white text-white dark:text-black">
            <h3 className="text-xl font-bold mb-4">{isZh ? '风险回报比基础公式' : 'Risk-Reward Ratio Basic Formula'}</h3>
            <div className="text-center font-mono text-2xl my-4">
              {isZh
                ? 'R:R = 潜在盈利 ÷ 潜在亏损'
                : 'R:R = Potential Profit ÷ Potential Loss'}
            </div>
            <p className="mb-3">
              {isZh
                ? '或者用R数表示（R = Risk，即风险单位）：'
                : 'Or expressed in R multiples (R = Risk unit):'}
            </p>
            <ul className="space-y-2">
              <li>
                <strong>1:1</strong> - {isZh ? '冒险$100赚$100（止损30点，止盈30点）' : 'Risk $100 to earn $100 (stop 30 pips, target 30 pips)'}
              </li>
              <li>
                <strong>1:2</strong> - {isZh ? '冒险$100赚$200（止损30点，止盈60点）' : 'Risk $100 to earn $200 (stop 30 pips, target 60 pips)'}
              </li>
              <li>
                <strong>1:3</strong> - {isZh ? '冒险$100赚$300（止损30点，止盈90点）' : 'Risk $100 to earn $300 (stop 30 pips, target 90 pips)'}
              </li>
              <li>
                <strong>1:5</strong> - {isZh ? '冒险$100赚$500（止损30点，止盈150点）' : 'Risk $100 to earn $500 (stop 30 pips, target 150 pips)'}
              </li>
            </ul>
          </div>

          <div className="p-6 border-2 border-black dark:border-white">
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
              {isZh ? '风险回报比计算示例' : 'Risk-Reward Ratio Calculation Examples'}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="font-bold">{isZh ? '示例1：EUR/USD日内交易' : 'Example 1: EUR/USD Day Trade'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>{isZh ? '入场价：1.1050' : 'Entry: 1.1050'}</li>
                  <li>{isZh ? '止损价：1.1020（30点）' : 'Stop: 1.1020 (30 pips)'}</li>
                  <li>{isZh ? '止盈价：1.1110（60点）' : 'Target: 1.1110 (60 pips)'}</li>
                  <li>{isZh ? '潜在亏损：30点 = $300（1手）' : 'Potential loss: 30 pips = $300 (1 lot)'}</li>
                  <li>{isZh ? '潜在盈利：60点 = $600（1手）' : 'Potential profit: 60 pips = $600 (1 lot)'}</li>
                  <li className="font-bold text-black dark:text-white">
                    {isZh ? 'R:R = 600 ÷ 300 = 1:2' : 'R:R = 600 ÷ 300 = 1:2'}
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <p className="font-bold">{isZh ? '示例2：GBP/JPY波段交易' : 'Example 2: GBP/JPY Swing Trade'}</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>{isZh ? '入场价：185.00' : 'Entry: 185.00'}</li>
                  <li>{isZh ? '止损价：184.50（50点）' : 'Stop: 184.50 (50 pips)'}</li>
                  <li>{isZh ? '止盈价：186.50（150点）' : 'Target: 186.50 (150 pips)'}</li>
                  <li>{isZh ? '潜在亏损：50点 = $325（1手）' : 'Potential loss: 50 pips = $325 (1 lot)'}</li>
                  <li>{isZh ? '潜在盈利：150点 = $975（1手）' : 'Potential profit: 150 pips = $975 (1 lot)'}</li>
                  <li className="font-bold text-black dark:text-white">
                    {isZh ? 'R:R = 975 ÷ 325 = 1:3' : 'R:R = 975 ÷ 325 = 1:3'}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 bg-black dark:bg-white text-white dark:text-black">
            <h3 className="text-xl font-bold mb-4">
              {isZh ? '为什么风险回报比至关重要？' : 'Why Risk-Reward Ratio is Crucial?'}
            </h3>
            <ul className="space-y-3">
              <li>
                <strong>{isZh ? '1. 决定盈亏平衡胜率：' : '1. Determines Breakeven Win Rate:'}</strong>{' '}
                {isZh
                  ? 'R:R 1:1需要50%胜率才盈亏平衡，1:2只需33%，1:3只需25%。更好的R:R让你即使胜率不高也能盈利。'
                  : 'R:R 1:1 needs 50% win rate to break even, 1:2 only needs 33%, 1:3 only needs 25%. Better R:R lets you profit even with lower win rate.'}
              </li>
              <li>
                <strong>{isZh ? '2. 放大策略优势：' : '2. Amplifies Strategy Edge:'}</strong>{' '}
                {isZh
                  ? '如果你的策略胜率45%，R:R 1:1会亏损，但R:R 1:2就能盈利（期望值0.35R），R:R 1:3更是大幅盈利（期望值0.8R）。'
                  : 'If your strategy has 45% win rate, R:R 1:1 loses, but R:R 1:2 profits (expectancy 0.35R), R:R 1:3 profits significantly (expectancy 0.8R).'}
              </li>
              <li>
                <strong>{isZh ? '3. 降低心理压力：' : '3. Reduces Psychological Pressure:'}</strong>{' '}
                {isZh
                  ? 'R:R 1:3意味着连续3次止损，只要1次止盈就能回本。这大大降低连续亏损的心理压力，让你更容易坚持策略。'
                  : 'R:R 1:3 means 3 consecutive stops, just 1 take-profit breaks even. This greatly reduces psychological pressure of consecutive losses, makes it easier to stick to strategy.'}
              </li>
              <li>
                <strong>{isZh ? '4. 复利增长的基础：' : '4. Foundation of Compound Growth:'}</strong>{' '}
                {isZh
                  ? '期望值为正的策略（胜率×盈利-败率×亏损>0）是复利增长的前提。优化R:R是提高期望值最直接的方法。'
                  : 'Positive expectancy strategy (win rate × profit - loss rate × loss > 0) is prerequisite for compound growth. Optimizing R:R is most direct method to increase expectancy.'}
              </li>
            </ul>
          </div>

          <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '⚡ 关键洞察：R:R不是越大越好' : '⚡ Key Insight: R:R is NOT Better The Higher'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {isZh
                ? '很多新手误以为"R:R越大越好，应该追求1:5甚至1:10"。这是错误的！R:R越大，达成难度越高，胜率会显著下降。R:R 1:5可能听起来诱人，但如果胜率只有10%（因为目标太大），期望值反而为负。最优R:R应该平衡胜率和回报，通常在1:1.5到1:3之间。职业交易者的目标是"可持续的正期望值"，而非"最大的R:R"。'
                : 'Many beginners mistakenly think "higher R:R is better, should pursue 1:5 or even 1:10". This is wrong! Higher R:R means higher difficulty to achieve, win rate drops significantly. R:R 1:5 may sound tempting, but if win rate only 10% (because target too large), expectancy actually negative. Optimal R:R should balance win rate and reward, typically between 1:1.5 to 1:3. Professional traders\' goal is "sustainable positive expectancy", not "largest R:R".'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: R:R Calculation & Application */}
      <section id="calculation-methods" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? 'R:R计算与应用' : 'R:R Calculation & Application'}
        </h2>
        <div className="space-y-6">
          <div className="p-6 border-2 border-black dark:border-white">
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
              {isZh ? '三种R:R计算方法' : 'Three R:R Calculation Methods'}
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                <p className="font-bold mb-2">{isZh ? '方法1：点数计算法' : 'Method 1: Pip Calculation'}</p>
                <p className="text-sm mb-2">
                  {isZh
                    ? '基于止损和止盈的点数差计算R:R，最直观简单。'
                    : 'Calculate R:R based on pip difference between stop and target, most intuitive.'}
                </p>
                <div className="font-mono text-sm bg-white dark:bg-black p-2 text-black dark:text-white">
                  {isZh
                    ? 'R:R = 止盈点数 ÷ 止损点数\n示例：止损30点，止盈60点 → R:R = 60÷30 = 1:2'
                    : 'R:R = Target Pips ÷ Stop Pips\nExample: Stop 30 pips, Target 60 pips → R:R = 60÷30 = 1:2'}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                <p className="font-bold mb-2">{isZh ? '方法2：金额计算法' : 'Method 2: Dollar Amount Calculation'}</p>
                <p className="text-sm mb-2">
                  {isZh
                    ? '基于潜在盈利和亏损的金额计算R:R，更精确（考虑仓位大小）。'
                    : 'Calculate R:R based on potential profit and loss dollar amounts, more precise (considers position size).'}
                </p>
                <div className="font-mono text-sm bg-white dark:bg-black p-2 text-black dark:text-white">
                  {isZh
                    ? 'R:R = 潜在盈利金额 ÷ 潜在亏损金额\n示例：冒险$200赚$500 → R:R = 500÷200 = 1:2.5'
                    : 'R:R = Potential Profit $ ÷ Potential Loss $\nExample: Risk $200 earn $500 → R:R = 500÷200 = 1:2.5'}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                <p className="font-bold mb-2">{isZh ? '方法3：R倍数法' : 'Method 3: R Multiple Method'}</p>
                <p className="text-sm mb-2">
                  {isZh
                    ? '将风险定义为1R，盈利表示为R的倍数。职业交易者常用此法记录交易。'
                    : 'Define risk as 1R, express profit as R multiples. Professional traders commonly use this method to record trades.'}
                </p>
                <div className="font-mono text-sm bg-white dark:bg-black p-2 text-black dark:text-white">
                  {isZh
                    ? '风险 = 1R（如$200）\n目标 = 2R（即$400）→ R:R = 1:2\n实际盈利 = 1.8R（即$360）→ 该笔交易赚1.8R'
                    : 'Risk = 1R (e.g., $200)\nTarget = 2R (i.e., $400) → R:R = 1:2\nActual profit = 1.8R (i.e., $360) → This trade earned 1.8R'}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-black dark:border-white">
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
              {isZh ? '实战R:R应用场景' : 'Practical R:R Application Scenarios'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-black dark:border-white text-sm">
                <thead>
                  <tr className="bg-black dark:bg-white text-white dark:text-black">
                    <th className="border border-black dark:border-white p-3 text-left">{isZh ? '场景' : 'Scenario'}</th>
                    <th className="border border-black dark:border-white p-3 text-left">{isZh ? '推荐R:R' : 'Recommended R:R'}</th>
                    <th className="border border-black dark:border-white p-3 text-left">{isZh ? '原因' : 'Reason'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black dark:border-white p-3">{isZh ? '强势趋势突破' : 'Strong Trend Breakout'}</td>
                    <td className="border border-black dark:border-white p-3 font-bold">1:3-1:5</td>
                    <td className="border border-black dark:border-white p-3">
                      {isZh ? '趋势延续空间大，可设置远目标' : 'Trend continuation space large, can set distant target'}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td className="border border-black dark:border-white p-3">{isZh ? '支撑/阻力反弹' : 'Support/Resistance Bounce'}</td>
                    <td className="border border-black dark:border-white p-3 font-bold">1:2-1:3</td>
                    <td className="border border-black dark:border-white p-3">
                      {isZh ? '反弹空间有限，目标至下一个关键位' : 'Bounce space limited, target to next key level'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black dark:border-white p-3">{isZh ? '震荡区间交易' : 'Range Trading'}</td>
                    <td className="border border-black dark:border-white p-3 font-bold">1:1.5-1:2</td>
                    <td className="border border-black dark:border-white p-3">
                      {isZh ? '区间有限，目标为区间另一端' : 'Range limited, target is other end of range'}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td className="border border-black dark:border-white p-3">{isZh ? '新闻前抢跑' : 'News Front-Running'}</td>
                    <td className="border border-black dark:border-white p-3 font-bold">1:1-1:1.5</td>
                    <td className="border border-black dark:border-white p-3">
                      {isZh ? '风险高，快进快出，小目标即可' : 'High risk, quick in-out, small target sufficient'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black dark:border-white p-3">{isZh ? '回调入场（趋势延续）' : 'Pullback Entry (Trend Continuation)'}</td>
                    <td className="border border-black dark:border-white p-3 font-bold">1:2.5-1:4</td>
                    <td className="border border-black dark:border-white p-3">
                      {isZh ? '入场点优秀，止损小，目标可设前高/低' : 'Entry excellent, small stop, target can set previous high/low'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Additional sections would follow for:
          - Section 3: Win Rate & R:R Relationship
          - Section 4: Expectancy Calculation Optimization
          - Section 5: Target Setting Strategies
          - Section 6: R:R Case Comparisons
          - Section 7: R:R Optimization Techniques
      */}

    </EducationPageTemplate>
  );
}
