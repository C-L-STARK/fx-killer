import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { getBrandConfig } from '@/lib/brand-config';
import { tradingPsychologyContent } from '@/content/education/trading-psychology.content';
import EducationPageTemplate from '@/components/education/EducationPageTemplate';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();

  return generateBilingualMetadata(
    tradingPsychologyContent.zh.title,
    tradingPsychologyContent.en.title,
    tradingPsychologyContent.zh.description,
    tradingPsychologyContent.en.description,
    tradingPsychologyContent.zh.keywords,
    tradingPsychologyContent.en.keywords,
    lang,
    brandConfig
  );
}

export default async function TradingPsychologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();
  const content = tradingPsychologyContent[lang];
  const isZh = lang === 'zh';

  return (
    <EducationPageTemplate content={content} language={lang}>
      {/* Section 1: Why Psychology Matters More Than Technicals */}
      <section id="why-psychology-matters" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-black dark:border-white pl-4">
          {isZh ? '为什么心理比技术更重要？' : 'Why Psychology Matters More Than Technicals'}
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            {isZh
              ? '交易成功的公式：10%技术分析 + 10%资金管理 + 80%心理控制。这是华尔街流传的经典比例，也是无数职业交易者的共识。你可以掌握最先进的技术分析工具、最完美的交易策略，但如果无法控制情绪、克服心理陷阱，仍会亏损。相反，即使策略平庸，只要拥有钢铁般的纪律和情绪管理能力，也能实现稳定盈利。'
              : 'Trading success formula: 10% technical analysis + 10% money management + 80% psychological control. This is the classic ratio circulating on Wall Street, also consensus among countless professional traders. You can master the most advanced technical analysis tools, most perfect trading strategy, but if unable to control emotions, overcome psychological traps, will still lose. Conversely, even with mediocre strategy, as long as you have iron discipline and emotional management ability, can achieve stable profitability.'}
          </p>

          <div className="p-6 bg-black dark:bg-white text-white dark:text-black">
            <h3 className="text-xl font-bold mb-4">{isZh ? '为什么心理因素决定成败？' : 'Why Psychological Factors Determine Success/Failure?'}</h3>
            <ul className="space-y-3">
              <li>
                <strong>{isZh ? '1. 市场是情绪的战场：' : '1. Market is Emotional Battlefield:'}</strong>{' '}
                {isZh
                  ? '外汇市场的每一次波动都是数百万交易者情绪的集体体现：恐惧导致抛售、贪婪导致追涨。如果你无法控制自己的情绪，就会成为市场情绪的牺牲品——在恐慌时割肉，在疯狂时追高。'
                  : 'Every forex market movement is collective manifestation of millions of traders\' emotions: fear causes selling, greed causes chasing. If you cannot control your emotions, you become victim of market emotions—cutting losses in panic, chasing highs in madness.'}
              </li>
              <li>
                <strong>{isZh ? '2. 技术分析人人可学，心理控制难以掌握：' : '2. Technical Analysis Anyone Can Learn, Psychological Control Hard to Master:'}</strong>{' '}
                {isZh
                  ? '支撑阻力、均线、K线形态，这些技术知识1-3个月就能掌握。但克服恐惧、控制贪婪、保持纪律，可能需要数年甚至终生修炼。这是分隔盈利者和亏损者的真正鸿沟。'
                  : 'Support resistance, moving averages, candlestick patterns—these technical knowledge can be mastered in 1-3 months. But overcoming fear, controlling greed, maintaining discipline may require years or even lifetime practice. This is the true chasm separating profitable from losing traders.'}
              </li>
              <li>
                <strong>{isZh ? '3. 小错误的累积效应：' : '3. Cumulative Effect of Small Errors:'}</strong>{' '}
                {isZh
                  ? '一次情绪化决策（移动止损、重仓交易、报复性开仓）可能只导致5-10%亏损，看似不严重。但这些小错误累积起来，几个月后账户可能亏损50-80%。而纪律严明的交易者，即使策略平庸，也能避免大错，实现正期望值。'
                  : 'One emotional decision (moving stop, overleveraging, revenge trading) may only cause 5-10% loss, seems not serious. But these small errors accumulate, months later account may lose 50-80%. While disciplined traders, even with mediocre strategy, can avoid big mistakes, achieve positive expectancy.'}
              </li>
              <li>
                <strong>{isZh ? '4. 市场会放大你的性格缺陷：' : '4. Market Amplifies Your Character Flaws:'}</strong>{' '}
                {isZh
                  ? '日常生活中，冲动、贪婪、恐惧的代价可能很小。但在交易中，这些性格缺陷会被金钱放大100倍：冲动导致爆仓、贪婪导致亏光利润、恐惧导致错失良机。交易是一面镜子，映照出你性格中的所有弱点。'
                  : 'In daily life, cost of impulsiveness, greed, fear may be small. But in trading, these character flaws are amplified 100x by money: impulsiveness leads to blowup, greed loses all profits, fear misses opportunities. Trading is mirror reflecting all weaknesses in your character.'}
              </li>
            </ul>
          </div>

          <div className="p-6 border-2 border-black dark:border-white">
            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
              {isZh ? '职业交易者 vs 业余交易者的心理差异' : 'Professional vs Amateur Trader Psychological Differences'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-black dark:border-white text-sm">
                <thead>
                  <tr className="bg-black dark:bg-white text-white dark:text-black">
                    <th className="border border-black dark:border-white p-3 text-left">{isZh ? '场景' : 'Scenario'}</th>
                    <th className="border border-black dark:border-white p-3 text-left">{isZh ? '业余交易者' : 'Amateur Trader'}</th>
                    <th className="border border-black dark:border-white p-3 text-left">{isZh ? '职业交易者' : 'Professional Trader'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black dark:border-white p-3 font-bold">{isZh ? '连续3次止损' : '3 Consecutive Stops'}</td>
                    <td className="border border-black dark:border-white p-3 text-red-600 dark:text-red-400">
                      {isZh ? '愤怒、不甘心，加大仓位想回本' : 'Angry, unwilling, increase position to recover'}
                    </td>
                    <td className="border border-black dark:border-white p-3 text-green-600 dark:text-green-400">
                      {isZh ? '冷静，检查策略，必要时减仓或暂停' : 'Calm, check strategy, reduce position or pause if needed'}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td className="border border-black dark:border-white p-3 font-bold">{isZh ? '错过大行情' : 'Miss Big Move'}</td>
                    <td className="border border-black dark:border-white p-3 text-red-600 dark:text-red-400">
                      {isZh ? 'FOMO，立即追涨追跌，不管价格' : 'FOMO, immediately chase, regardless of price'}
                    </td>
                    <td className="border border-black dark:border-white p-3 text-green-600 dark:text-green-400">
                      {isZh ? '接受错过，等待下次机会或回调入场' : 'Accept missing, wait for next opportunity or pullback entry'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black dark:border-white p-3 font-bold">{isZh ? '盈利单接近止盈' : 'Profit Near Target'}</td>
                    <td className="border border-black dark:border-white p-3 text-red-600 dark:text-red-400">
                      {isZh ? '贪婪，移动止盈想赚更多，结果利润回吐' : 'Greedy, move target to earn more, result gives back profit'}
                    </td>
                    <td className="border border-black dark:border-white p-3 text-green-600 dark:text-green-400">
                      {isZh ? '按计划止盈，锁定利润，绝不贪婪' : 'Take profit as planned, lock profit, never greedy'}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td className="border border-black dark:border-white p-3 font-bold">{isZh ? '亏损单接近止损' : 'Loss Near Stop'}</td>
                    <td className="border border-black dark:border-white p-3 text-red-600 dark:text-red-400">
                      {isZh ? '恐惧，移动止损想避免亏损，扩大损失' : 'Fear, move stop to avoid loss, expand loss'}
                    </td>
                    <td className="border border-black dark:border-white p-3 text-green-600 dark:text-green-400">
                      {isZh ? '接受亏损，让止损执行，保护资金' : 'Accept loss, let stop execute, protect capital'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black dark:border-white p-3 font-bold">{isZh ? '达到每日盈利目标' : 'Reach Daily Profit Target'}</td>
                    <td className="border border-black dark:border-white p-3 text-red-600 dark:text-red-400">
                      {isZh ? '过度自信，继续交易想赚更多，回吐利润' : 'Overconfident, continue trading for more, give back profits'}
                    </td>
                    <td className="border border-black dark:border-white p-3 text-green-600 dark:text-green-400">
                      {isZh ? '停止交易，保护利润，明天继续' : 'Stop trading, protect profits, continue tomorrow'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
              {isZh ? '⚠️ 心理失控的典型案例' : '⚠️ Typical Case of Psychological Loss of Control'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {isZh
                ? '交易者小赵，技术分析能力优秀，回测胜率55%、R:R 1:2.5，理论上能稳定盈利。但实盘3个月亏损40%。原因：1) 看到好机会但害怕亏损，不敢进场，错过70%的高质量交易；2) 错过后FOMO，追涨追跌，进场的都是低质量交易，胜率只有30%；3) 盈利单达到1R就提前平仓（恐惧利润回吐），平均盈利只有0.8R，而亏损单却死扛不止损，平均亏损1.5R；4) 连续2次止损后情绪失控，加大仓位"回本"，单笔风险从2%增至8%，一次失败就亏损$640。'
                : 'Trader Zhao, excellent technical analysis ability, backtest 55% win rate, R:R 1:2.5, theoretically can profit stably. But live trading 3 months lost 40%. Reasons: 1) Seeing good opportunity but afraid of loss, dare not enter, missed 70% high-quality trades; 2) After missing FOMO, chasing, only entered low-quality trades, win rate only 30%; 3) Profit positions exit early at 1R (fear profit giveback), average profit only 0.8R, while loss positions hold stubbornly without stop, average loss 1.5R; 4) After 2 consecutive stops emotional loss of control, increase position to "recover", per-trade risk from 2% to 8%, one failure loses $640.'}
            </p>
            <p className="text-red-600 dark:text-red-400 font-bold">
              {isZh
                ? '教训：技术再好，心理失控就是灾难。小赵需要的不是更好的策略，而是心理辅导和纪律训练。'
                : 'Lesson: No matter how good the technicals, psychological loss of control is disaster. Zhao needs not better strategy, but psychological counseling and discipline training.'}
            </p>
          </div>
        </div>
      </section>

      {/* Additional sections would follow similar patterns for:
          - Section 2: Common Psychological Traps
          - Section 3: Fear and Greed Management
          - Section 4: Building Trading Discipline System
          - Section 5: Stress and Emotional Management
          - Section 6: Psychological Case Studies
          - Section 7: Trading Journal & Review
      */}

    </EducationPageTemplate>
  );
}
