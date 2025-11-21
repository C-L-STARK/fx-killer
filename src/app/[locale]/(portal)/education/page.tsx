import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import LocaleLink from '@/components/navigation/LocaleLink';
import PremiumCTA from '@/components/custom/PremiumCTA';

// Generate SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '外汇交易教育中心丨汇刃丨日内交易员培训、全职交易员培训',
    'Forex Trading Education Center丨FX Killer丨Day Trader Training, Full-Time Trader Training',
    '完整的外汇交易教育体系，涵盖基础知识、技术分析、交易策略、风险管理。从零基础到职业交易员，FX Killer助你系统化学习外汇交易。25+专业课程，4大学习方向，100%免费学习。专业日内交易员培训和全职交易员培训体系。',
    'Complete forex trading education system covering fundamentals, technical analysis, trading strategies, and risk management. From beginner to professional trader with FX Killer. 25+ professional courses, 4 learning categories, 100% free. Professional day trader training and full-time trader training system.',
    '外汇教育, 外汇学习, 交易课程, 外汇培训, 日内交易员培训, 全职交易员培训, 技术分析教程, 交易策略, 风险管理, 外汇基础知识, 技术指标, 价格行为, K线形态, 支撑阻力, 日内交易, 波段交易, 剥头皮交易, 趋势跟踪, 仓位管理, 止损策略, 交易心理',
    'forex education, forex learning, trading courses, forex training, day trader training, full-time trader training, technical analysis tutorials, trading strategies, risk management, forex basics, technical indicators, price action, candlestick patterns, support resistance, day trading, swing trading, scalping, trend following, position sizing, stop loss strategies, trading psychology',
    lang,
    {
      url: '/education',
      type: 'website',
      section: 'Education',
      author: 'FX Killer Education Team',
    }
  );
}

// Course categories data with bilingual support
const courseCategories = [
  {
    id: 'basics',
    icon: 'book',
    title: { zh: '基础知识', en: 'Basic Knowledge' },
    description: { zh: '掌握外汇交易的核心概念和基础理论', en: 'Master core forex trading concepts and fundamentals' },
    color: 'border-gray-800',
    bgColor: 'bg-gray-50 dark:bg-black',
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
    icon: 'chart',
    title: { zh: '技术分析', en: 'Technical Analysis' },
    description: { zh: '学习图表分析、技术指标和价格行为', en: 'Learn chart analysis, technical indicators, and price action' },
    color: 'border-gray-800',
    bgColor: 'bg-gray-50 dark:bg-black',
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
    icon: 'target',
    title: { zh: '交易策略', en: 'Trading Strategies' },
    description: { zh: '实战交易策略和系统化交易方法', en: 'Practical trading strategies and systematic methods' },
    color: 'border-gray-800',
    bgColor: 'bg-gray-50 dark:bg-black',
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
    icon: 'shield',
    title: { zh: '风险管理', en: 'Risk Management' },
    description: { zh: '仓位控制、最大回撤和交易心理', en: 'Position sizing, drawdown control, and trading psychology' },
    color: 'border-gray-800',
    bgColor: 'bg-gray-50 dark:bg-black',
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

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - 增强版 */}
      <div className="relative bg-black text-white border-b border-[#ff102a] overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff102a] blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff102a] blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-[#ff102a]/10 border border-[#ff102a] backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider text-[#ff102a]">
              {isZh ? '系统化教育' : 'Systematic Education'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            <span className="font-black text-white">
              {isZh ? '教育中心' : 'Education Center'}
            </span>
          </h1>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '从零开始，系统学习外汇交易。全部课程免费，24/7随时访问。'
              : 'Start from scratch, learn forex trading systematically. All courses free, accessible 24/7.'}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-6 py-3 bg-black/50 border border-[#ff102a]/30">
              <span className="text-[#ff102a] font-bold">{isZh ? '免费' : 'Free'}</span>
              <span className="text-gray-400 ml-2">{isZh ? '全部课程' : 'All Courses'}</span>
            </div>
            <div className="px-6 py-3 bg-black/50 border border-[#ff102a]/30">
              <span className="text-[#ff102a] font-bold">24/7</span>
              <span className="text-gray-400 ml-2">{isZh ? '随时访问' : 'Access Anytime'}</span>
            </div>
            <div className="px-6 py-3 bg-black/50 border border-[#ff102a]/30">
              <span className="text-[#ff102a] font-bold">{isZh ? '专业' : 'Pro'}</span>
              <span className="text-gray-400 ml-2">{isZh ? '交易员编写' : 'Trader Written'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Categories Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            {isZh ? '课程分类' : 'Course Categories'}
          </h2>
          <p className="text-xl text-gray-400">
            {isZh ? '选择适合你的学习方向，系统化掌握外汇交易技能' : 'Choose your learning path and master forex trading systematically'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {courseCategories.map((category) => (
            <div
              key={category.id}
              className="border border-gray-800 bg-black/30 p-8 hover:border-[#ff102a] transition-all group/card"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-[#ff102a]/10 border border-[#ff102a]/30 group-hover/card:bg-[#ff102a]/20 transition-all">
                  {category.icon === 'book' && (
                    <svg className="w-8 h-8 text-[#ff102a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                  {category.icon === 'chart' && (
                    <svg className="w-8 h-8 text-[#ff102a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )}
                  {category.icon === 'target' && (
                    <svg className="w-8 h-8 text-[#ff102a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {category.icon === 'shield' && (
                    <svg className="w-8 h-8 text-[#ff102a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black mb-2 text-white group-hover/card:text-[#ff102a] transition-colors">
                    {isZh ? category.title.zh : category.title.en}
                  </h3>
                  <p className="text-gray-400">
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
                      className={`block p-4 border border-gray-800 hover:border-[#ff102a] bg-black hover:bg-black transition-all group ${isComingSoon ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-300 group-hover:text-white transition-colors">{courseTitle}</span>
                        {statusText && (
                          <span className={`text-xs px-3 py-1 border ${isPopular
                            ? 'bg-red-900/30 text-red-400 border-red-900/50'
                            : isNew
                              ? 'bg-green-900/30 text-green-400 border-green-900/50'
                              : 'bg-black text-gray-500 border-gray-800'
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
        <div className="bg-black/30 border border-gray-800 p-12 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff102a] blur-[100px] opacity-5 pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-white">
              {isZh ? '为什么选择 FX Killer 教育中心？' : 'Why Choose FX Killer Education Center?'}
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              {isZh
                ? '我们提供系统化的外汇交易教育，由职业交易员编写，注重实战应用。所有课程完全免费，24/7随时访问，配套专业交易工具支持。'
                : 'We provide systematic forex trading education written by professional traders with focus on practical application. All courses are completely free, accessible 24/7, with professional trading tools support.'}
            </p>
            <p className="text-xl font-bold text-white">
              {isZh ? '从零基础到职业交易员，助你在外汇市场稳定盈利' : 'From beginner to professional trader, helping you achieve consistent profits in forex markets'}
            </p>
          </div>
        </div>
      </div>

      {/* Premium CTA - Full Width */}
      <PremiumCTA
        badge={{ zh: '进阶学习', en: 'Advanced Learning' }}
        title={{
          zh: '准备好成为职业交易员了吗？',
          en: 'Ready to Become a Professional Trader?'
        }}
        subtitle={{
          zh: '完成教育中心学习，加入30天系统化培训。通过考核，获得真实资金进行交易。',
          en: 'Complete education center courses, join 30-day systematic training. Pass evaluation and receive real funds for trading.'
        }}
        primaryButton={{
          text: { zh: '了解培训计划', en: 'Learn About Training' },
          action: 'link',
          link: `/${lang}/splan/join-us`
        }}
        secondaryButton={{
          text: { zh: '免费心理测评', en: 'Free Psychology Test' },
          action: 'link',
          link: `/${lang}/splan/psychology-test`
        }}
        showStats={true}
      />
    </div>
  );
}
