import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { getBrandConfig } from '@/lib/brand-config';
import LocaleLink from '@/components/navigation/LocaleLink';

// Generate SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const brandConfig = await getBrandConfig();

  // 使用品牌配置动态生成标题
  const brandNameZh = brandConfig.brandName.zh;
  const brandNameEn = brandConfig.brandName.en;
  const seoKeywordsZh = brandConfig.seo.keywords.zh.slice(0, 2).join('、');
  const seoKeywordsEn = brandConfig.seo.keywords.en.slice(0, 2).join(', ');

  return generateBilingualMetadata(
    `外汇交易教育中心丨${brandNameZh}丨${seoKeywordsZh}`,
    `Forex Trading Education Center丨${brandNameEn}丨${seoKeywordsEn}`,
    `完整的外汇交易教育体系，涵盖基础知识、技术分析、交易策略、风险管理。从零基础到职业交易员，${brandNameZh}助你系统化学习外汇交易。25+专业课程，4大学习方向，100%免费学习。专业日内交易员培训和全职交易员培训体系。`,
    `Complete forex trading education system covering fundamentals, technical analysis, trading strategies, and risk management. From beginner to professional trader with ${brandNameEn}. 25+ professional courses, 4 learning categories, 100% free. Professional day trader training and full-time trader training system.`,
    brandConfig.seo.keywords.zh.join(', ') + ', 外汇教育, 外汇学习, 交易课程, 外汇培训, 技术分析教程, 交易策略, 风险管理, 外汇基础知识, 技术指标, 价格行为, K线形态, 支撑阻力, 日内交易, 波段交易, 剥头皮交易, 趋势跟踪, 仓位管理, 止损策略, 交易心理',
    brandConfig.seo.keywords.en.join(', ') + ', forex education, forex learning, trading courses, forex training, technical analysis tutorials, trading strategies, risk management, forex basics, technical indicators, price action, candlestick patterns, support resistance, day trading, swing trading, scalping, trend following, position sizing, stop loss strategies, trading psychology',
    lang,
    brandConfig,
    {
      url: '/education',
      type: 'website',
      section: 'Education',
      author: `${brandConfig.brandName[lang]} Education Team`,
      useTemplate: true,
    }
  );
}

// Course categories data with bilingual support
const courseCategories = [
  {
    id: 'basics',
    icon: '📚',
    title: { zh: '基础知识', en: 'Basic Knowledge' },
    description: { zh: '掌握外汇交易的核心概念和基础理论', en: 'Master core forex trading concepts and fundamentals' },
    color: 'border-black dark:border-white',
    bgColor: 'bg-gray-50 dark:bg-gray-900',
    courses: [
      { title: { zh: '外汇交易基础', en: 'Forex Trading Basics' }, slug: 'forex-basics', status: { zh: '热门', en: 'Popular' } },
      { title: { zh: '外汇市场交易时段', en: 'Trading Sessions Guide' }, slug: 'trading-sessions-guide', status: { zh: '新', en: 'New' } },
      { title: { zh: '点差与佣金详解', en: 'Spreads and Commissions' }, slug: 'spreads-and-commissions', status: { zh: '新', en: 'New' } },
      { title: { zh: '杠杆与保证金', en: 'Leverage and Margin' }, slug: 'leverage-and-margin', status: { zh: '新', en: 'New' } },
      { title: { zh: '经纪商选择指南', en: 'Broker Selection Guide' }, slug: 'broker-selection-guide', status: { zh: '新', en: 'New' } },
      { title: { zh: '货币对完整解析', en: 'Currency Pairs Guide' }, slug: 'currency-pairs-guide', status: { zh: '新', en: 'New' } },
      { title: { zh: '外汇市场参与者', en: 'Market Participants' }, slug: 'market-participants', status: { zh: '新', en: 'New' } },
    ]
  },
  {
    id: 'technical',
    icon: '📊',
    title: { zh: '技术分析', en: 'Technical Analysis' },
    description: { zh: '学习图表分析、技术指标和价格行为', en: 'Learn chart analysis, technical indicators, and price action' },
    color: 'border-black dark:border-white',
    bgColor: 'bg-gray-50 dark:bg-gray-900',
    courses: [
      { title: { zh: '布林带指标详解', en: 'Bollinger Bands Guide' }, slug: 'bollinger-bands', status: { zh: '新', en: 'New' } },
      { title: { zh: '肯特纳通道指标', en: 'Keltner Channels' }, slug: 'keltner-channels', status: { zh: '新', en: 'New' } },
      { title: { zh: 'MACD指标完整教程', en: 'MACD Indicator Complete Guide' }, slug: 'macd-indicator', status: { zh: '新', en: 'New' } },
      { title: { zh: 'EMA均线系统', en: 'EMA Moving Averages' }, slug: 'ema-moving-averages', status: { zh: '新', en: 'New' } },
      { title: { zh: 'RSI指标应用指南', en: 'RSI Indicator Guide' }, slug: 'rsi-indicator', status: { zh: '新', en: 'New' } },
      { title: { zh: 'K线形态识别指南', en: 'Candlestick Patterns' }, slug: 'candlestick-patterns', status: { zh: '新', en: 'New' } },
      { title: { zh: '支撑阻力与趋势线', en: 'Support, Resistance & Trendlines' }, slug: 'support-resistance', status: { zh: '新', en: 'New' } },
      { title: { zh: '价格行为交易策略', en: 'Price Action Trading' }, slug: 'price-action', status: { zh: '新', en: 'New' } },
    ]
  },
  {
    id: 'strategies',
    icon: '🎯',
    title: { zh: '交易策略', en: 'Trading Strategies' },
    description: { zh: '实战交易策略和系统化交易方法', en: 'Practical trading strategies and systematic methods' },
    color: 'border-black dark:border-white',
    bgColor: 'bg-gray-50 dark:bg-gray-900',
    courses: [
      { title: { zh: '日内交易完整指南', en: 'Day Trading Complete Guide' }, slug: 'day-trading', status: { zh: '新', en: 'New' } },
      { title: { zh: '波段交易策略', en: 'Swing Trading Strategy' }, slug: 'swing-trading', status: { zh: '新', en: 'New' } },
      { title: { zh: '剥头皮交易技巧', en: 'Scalping Techniques' }, slug: 'scalping', status: { zh: '新', en: 'New' } },
      { title: { zh: '趋势跟踪系统', en: 'Trend Following System' }, slug: 'trend-following', status: { zh: '新', en: 'New' } },
      { title: { zh: '突破交易策略', en: 'Breakout Trading Strategy' }, slug: 'breakout-trading', status: { zh: '新', en: 'New' } },
    ]
  },
  {
    id: 'risk',
    icon: '🛡️',
    title: { zh: '风险管理', en: 'Risk Management' },
    description: { zh: '仓位控制、最大回撤和交易心理', en: 'Position sizing, drawdown control, and trading psychology' },
    color: 'border-black dark:border-white',
    bgColor: 'bg-gray-50 dark:bg-gray-900',
    courses: [
      { title: { zh: '风险管理基础', en: 'Risk Management Basics' }, slug: 'risk-management', status: { zh: '新', en: 'New' } },
      { title: { zh: '仓位控制与资金管理', en: 'Position Sizing & Money Management' }, slug: 'position-sizing', status: { zh: '新', en: 'New' } },
      { title: { zh: '止损策略大全', en: 'Stop Loss Strategies' }, slug: 'stop-loss-strategies', status: { zh: '新', en: 'New' } },
      { title: { zh: '交易心理学', en: 'Trading Psychology' }, slug: 'trading-psychology', status: { zh: '新', en: 'New' } },
      { title: { zh: '风险回报比优化', en: 'Risk-Reward Optimization' }, slug: 'risk-reward', status: { zh: '新', en: 'New' } },
    ]
  }
];

export default async function EducationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);
  const isZh = lang === 'zh';
  const brandConfig = await import('@/lib/brand-config').then(m => m.getBrandConfig());
  const brandName = isZh ? brandConfig.brandName.zh : brandConfig.brandName.en;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - 增强版 */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white border-b-2 border-gray-800 overflow-hidden">
        {/* 装饰性背景 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider">{isZh ? '专业交易教育' : 'Professional Trading Education'}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="font-black">{isZh ? '外汇交易教育中心' : 'Forex Trading Education Center'}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZh ? (
              <>
                系统化学习外汇交易知识，从零基础到职业交易员<br />
                专业、实战、高效的学习路径
              </>
            ) : (
              <>
                Systematic forex trading education from beginner to professional<br />
                Professional, practical, and efficient learning path
              </>
            )}
          </p>

          {/* Quick Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">25+</span> {isZh ? '专业课程' : 'Courses'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">4</span> {isZh ? '学习方向' : 'Categories'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">100%</span> {isZh ? '免费学习' : 'Free Learning'}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">24/7</span> {isZh ? '随时访问' : 'Always Available'}
            </div>
          </div>
        </div>
      </div>

      {/* Course Categories Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-black dark:text-white">
            {isZh ? '课程分类' : 'Course Categories'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {isZh ? '选择适合你的学习方向，系统化掌握外汇交易技能' : 'Choose your learning path and master forex trading systematically'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {courseCategories.map((category) => (
            <div
              key={category.id}
              className={`border-2 ${category.color} ${category.bgColor} p-8 hover:shadow-xl transition-all`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{category.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black mb-2 text-black dark:text-white">
                    {isZh ? category.title.zh : category.title.en}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {isZh ? category.description.zh : category.description.en}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {category.courses.map((course, index) => {
                  const courseTitle = isZh ? course.title.zh : course.title.en;
                  const statusText = isZh ? course.status.zh : course.status.en;
                  const isComingSoon = statusText === '即将推出' || statusText === 'Coming Soon';
                  const isPopular = statusText === '热门' || statusText === 'Popular';
                  const isNew = statusText === '新' || statusText === 'New';

                  return (
                    <LocaleLink
                      key={index}
                      href={isComingSoon ? '#' : `/education/${course.slug}`}
                      className={`block p-4 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group ${
                        isComingSoon ? 'opacity-60 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-black dark:text-white group-hover:text-white dark:group-hover:text-black">{courseTitle}</span>
                        {statusText && (
                          <span className={`text-xs px-3 py-1 border-2 ${
                            isPopular
                              ? 'bg-red-600 text-white border-red-600'
                              : isNew
                              ? 'bg-green-600 text-white border-green-600'
                              : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-black dark:border-white'
                          }`}>
                            {statusText}
                          </span>
                        )}
                      </div>
                    </LocaleLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Why Learn Here Section */}
        <div className="bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-white p-12 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-black dark:text-white">
              {isZh ? `为什么选择 ${brandName} 教育中心？` : `Why Choose ${brandName} Education Center?`}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {isZh
                ? '我们提供系统化的外汇交易教育，由职业交易员编写，注重实战应用。所有课程完全免费，24/7随时访问，配套专业交易工具支持。'
                : 'We provide systematic forex trading education written by professional traders with focus on practical application. All courses are completely free, accessible 24/7, with professional trading tools support.'}
            </p>
            <p className="text-xl font-bold text-black dark:text-white">
              {isZh ? '从零基础到职业交易员，助你在外汇市场稳定盈利' : 'From beginner to professional trader, helping you achieve consistent profits in forex markets'}
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-black dark:bg-white text-white dark:text-black p-12 border-2 border-black dark:border-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              {isZh ? '准备好成为职业交易员了吗？' : 'Ready to Become a Professional Trader?'}
            </h2>
            <p className="text-xl mb-8 text-gray-300 dark:text-gray-700">
              {isZh ? (
                <>
                  完成教育中心的学习后，加入 {brandName} 30天系统化培训<br />
                  通过考核，获得真实资金进行交易
                </>
              ) : (
                <>
                  After completing the education center, join {brandName} 30-day systematic training<br />
                  Pass the evaluation and receive real funds for trading
                </>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocaleLink
                href="/splan/join-us"
                className="px-10 py-4 bg-white dark:bg-black text-black dark:text-white font-bold text-lg border-2 border-white dark:border-black hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:hover:text-black transition-all inline-block text-center"
              >
                {isZh ? '了解培训计划' : 'Learn About Training'}
              </LocaleLink>
              <LocaleLink
                href="/splan/psychology-test"
                className="px-10 py-4 bg-transparent text-white dark:text-black font-bold text-lg border-2 border-white dark:border-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all inline-block text-center"
              >
                {isZh ? '免费心理测评' : 'Free Psychology Test'}
              </LocaleLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
