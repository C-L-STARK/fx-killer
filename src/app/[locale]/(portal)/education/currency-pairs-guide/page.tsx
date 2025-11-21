import { Metadata } from 'next';
import LocaleLink from '@/components/navigation/LocaleLink';

// SEO Metadata
export const metadata: Metadata = {
  title: '货币对分类与特点完整指南 - 主要货币对vs交叉货币对 | FX Killer',
  description: '全面解析外汇市场货币对分类：主要货币对、次要货币对、交叉货币对、异国货币对的特点、波动性、点差对比。选择最适合你的交易货币对，提高交易成功率。',
  keywords: '货币对分类, 主要货币对, 交叉货币对, 异国货币对, EUR/USD, GBP/USD, 货币对点差, 货币对波动性',
  openGraph: {
    title: '货币对分类与特点完整指南 - 主要货币对vs交叉货币对 | FX Killer',
    description: '深入了解不同货币对的特点、风险和交易策略，选择最适合你的交易品种。',
    type: 'article',
    locale: 'zh_CN',
  },
};

export default function CurrencyPairsGuidePage() {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-black border-b-2 border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <LocaleLink href="/" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
              首页
            </LocaleLink>
            <span className="text-gray-400">/</span>
            <LocaleLink href="/education" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
              教育中心
            </LocaleLink>
            <span className="text-gray-400">/</span>
            <span className="text-white font-bold">货币对分类与特点</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            货币对分类与特点<br />完整指南
          </h1>
          <p className="text-xl text-gray-300 dark:text-gray-300 mb-8 leading-relaxed">
            掌握不同货币对的特点、波动性和交易成本，选择最适合你的交易品种。
            本指南涵盖主要货币对、交叉货币对、异国货币对的完整对比分析。
          </p>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 dark:text-gray-600">📖 阅读时间:</span>
              <span className="font-bold text-white">20 分钟</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 dark:text-gray-600">📊 难度:</span>
              <span className="font-bold text-white">入门级</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 dark:text-gray-600">🎯 更新:</span>
              <span className="font-bold text-white">2025年1月</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">

        {/* Table of Contents */}
        <div className="bg-gray-50 dark:bg-black border-2 border-gray-800 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">📑 内容目录</h2>
          <nav className="space-y-2">
            <a href="#currency-pair-basics" className="block text-gray-300 dark:text-gray-300 hover:text-black dark:hover:text-white hover:pl-2 transition-all">
              1. 货币对基础概念
            </a>
            <a href="#major-pairs" className="block text-gray-300 dark:text-gray-300 hover:text-black dark:hover:text-white hover:pl-2 transition-all">
              2. 主要货币对详解
            </a>
            <a href="#minor-pairs" className="block text-gray-300 dark:text-gray-300 hover:text-black dark:hover:text-white hover:pl-2 transition-all">
              3. 次要货币对（商品货币）
            </a>
            <a href="#cross-pairs" className="block text-gray-300 dark:text-gray-300 hover:text-black dark:hover:text-white hover:pl-2 transition-all">
              4. 交叉货币对分析
            </a>
            <a href="#exotic-pairs" className="block text-gray-300 dark:text-gray-300 hover:text-black dark:hover:text-white hover:pl-2 transition-all">
              5. 异国货币对特点
            </a>
            <a href="#comparison" className="block text-gray-300 dark:text-gray-300 hover:text-black dark:hover:text-white hover:pl-2 transition-all">
              6. 货币对全面对比
            </a>
            <a href="#selection-guide" className="block text-gray-300 dark:text-gray-300 hover:text-black dark:hover:text-white hover:pl-2 transition-all">
              7. 如何选择货币对
            </a>
            <a href="#faq" className="block text-gray-300 dark:text-gray-300 hover:text-black dark:hover:text-white hover:pl-2 transition-all">
              8. 常见问题解答
            </a>
          </nav>
        </div>

        {/* Section 1: Basics */}
        <section id="currency-pair-basics" className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
            货币对基础概念
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-300 dark:text-gray-300 leading-relaxed mb-4">
              在外汇市场中，货币总是<strong className="text-white">成对交易</strong>的。一个货币对由两种货币组成，表示用一种货币兑换另一种货币的汇率。理解货币对的结构和分类是外汇交易的基础。
            </p>

            <div className="bg-gray-900 text-gray-300 p-6 my-6 border-2 border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-white">💡 货币对结构详解</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold mb-2 text-white">基础货币（Base Currency）</p>
                  <p className="text-sm">货币对中的第一个货币，数量固定为1单位。它是你要"买入"或"卖出"的货币。</p>
                </div>
                <div>
                  <p className="font-bold mb-2 text-white">报价货币（Quote Currency）</p>
                  <p className="text-sm">货币对中的第二个货币，表示购买1单位基础货币需要多少报价货币。</p>
                </div>
                <div className="bg-gray-50 dark:bg-black text-white p-4 border border-gray-800">
                  <p className="font-bold mb-2 text-white">示例：EUR/USD = 1.1000</p>
                  <ul className="text-sm space-y-1 list-none">
                    <li className="text-gray-300">• 基础货币：EUR（欧元）</li>
                    <li className="text-gray-300">• 报价货币：USD（美元）</li>
                    <li className="text-gray-300">• 含义：1欧元 = 1.1000美元</li>
                    <li className="text-gray-300">• 做多EUR/USD = 预期欧元相对美元升值</li>
                    <li className="text-gray-300">• 做空EUR/USD = 预期欧元相对美元贬值</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-white">买入价与卖出价</h3>

            <p className="text-gray-300 dark:text-gray-300 leading-relaxed mb-6">
              每个货币对都有两个价格：
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border-2 border-gray-800 p-6">
                <h4 className="font-bold text-white mb-3 text-lg">卖出价（Bid Price）</h4>
                <p className="text-gray-300 dark:text-gray-300 text-sm mb-3">
                  市场愿意"买入"基础货币（或你"卖出"基础货币）的价格，通常是较低的价格。
                </p>
                <div className="bg-gray-50 dark:bg-black p-3 border border-gray-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-0">
                    <strong className="text-white">例子：</strong>EUR/USD Bid = 1.0998，你可以以此价格卖出1欧元，获得1.0998美元。
                  </p>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-6">
                <h4 className="font-bold text-white mb-3 text-lg">买入价（Ask Price）</h4>
                <p className="text-gray-300 dark:text-gray-300 text-sm mb-3">
                  市场愿意"卖出"基础货币（或你"买入"基础货币）的价格，通常是较高的价格。
                </p>
                <div className="bg-gray-50 dark:bg-black p-3 border border-gray-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-0">
                    <strong className="text-white">例子：</strong>EUR/USD Ask = 1.1000，你需要支付1.1000美元来买入1欧元。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-black border-2 border-gray-800 p-6 my-6">
              <h4 className="text-lg font-bold mb-3 text-white">📊 点差（Spread）= Ask - Bid</h4>
              <p className="text-gray-300 dark:text-gray-300 mb-3">
                买入价和卖出价之间的差价称为<strong className="text-white">点差</strong>，是经纪商的主要收入来源，也是你的交易成本。
              </p>
              <p className="text-gray-300 dark:text-gray-300 mb-0">
                <strong className="text-white">计算示例：</strong>EUR/USD的Ask = 1.1000，Bid = 1.0998，点差 = 1.1000 - 1.0998 = 0.0002 = 2点
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Major Pairs */}
        <section id="major-pairs" className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
            主要货币对详解
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-300 dark:text-gray-300 leading-relaxed mb-6">
              主要货币对（Major Pairs）是指<strong className="text-white">包含美元且交易量最大</strong>的7个货币对。它们占全球外汇交易量的80%以上，具有最高的流动性、最低的点差和最透明的价格。
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-white">七大主要货币对</h3>

            <div className="space-y-6 mb-8">
              <div className="border-2 border-gray-800 p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-2xl font-bold text-white">EUR/USD</h4>
                  <span className="bg-gray-900 text-gray-300 px-3 py-1 text-sm font-bold">王者</span>
                </div>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  <strong className="text-white">欧元/美元</strong> - 全球交易量最大的货币对，占外汇市场总交易量的约24%。
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-white mb-2">✓ 优势</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 流动性极佳，几乎无滑点</li>
                      <li className="text-gray-300">• 点差最低（0.5-1.5点）</li>
                      <li className="text-gray-300">• 新闻和分析资源最丰富</li>
                      <li className="text-gray-300">• 适合所有交易策略</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-2">📊 特点</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 日均波动：50-100点</li>
                      <li className="text-gray-300">• 最活跃时段：欧洲-美国重叠</li>
                      <li className="text-gray-300">• 影响因素：美联储、欧洲央行政策</li>
                      <li className="text-gray-300">• 新手首选货币对</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-6">
                <h4 className="text-2xl font-bold mb-3 text-white">USD/JPY</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  <strong className="text-white">美元/日元</strong> - 第二大交易货币对，占市场份额约13.5%，被称为"龙"。
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-white mb-2">✓ 优势</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 极高流动性，点差1-2点</li>
                      <li className="text-gray-300">• 趋势性强，适合趋势跟踪</li>
                      <li className="text-gray-300">• 日本央行干预明确，易判断</li>
                      <li className="text-gray-300">• 套息交易首选货币对</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-2">📊 特点</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 日均波动：60-120点</li>
                      <li className="text-gray-300">• 最活跃时段：东京、纽约时段</li>
                      <li className="text-gray-300">• 避险货币：风险厌恶时日元走强</li>
                      <li className="text-gray-300">• 对美国国债收益率敏感</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-6">
                <h4 className="text-2xl font-bold mb-3 text-white">GBP/USD</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  <strong className="text-white">英镑/美元</strong> - 被称为"Cable"（电缆），因历史上通过大西洋电缆传输报价而得名。市场份额约9.5%。
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-white mb-2">✓ 优势</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 波动性大，日内交易机会多</li>
                      <li className="text-gray-300">• 流动性好，点差1.5-3点</li>
                      <li className="text-gray-300">• 趋势明确，技术分析有效</li>
                      <li className="text-gray-300">• 单日可达100-200点波动</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-2">📊 特点</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 日均波动：100-150点</li>
                      <li className="text-gray-300">• 最活跃时段：伦敦、纽约时段</li>
                      <li className="text-gray-300">• 对英国经济数据极其敏感</li>
                      <li className="text-gray-300">• 风险较高，需谨慎管理仓位</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-6">
                <h4 className="text-2xl font-bold mb-3 text-white">USD/CHF</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  <strong className="text-white">美元/瑞郎</strong> - 瑞士法郎是传统避险货币，与EUR/USD走势通常负相关。市场份额约3.6%。
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-white mb-2">✓ 优势</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 避险属性，危机时波动加大</li>
                      <li className="text-gray-300">• 与EUR/USD形成对冲</li>
                      <li className="text-gray-300">• 流动性好，点差1.5-3点</li>
                      <li className="text-gray-300">• 瑞士央行政策透明</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-2">📊 特点</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 日均波动：50-90点</li>
                      <li className="text-gray-300">• 最活跃时段：欧洲时段</li>
                      <li className="text-gray-300">• 风险事件时波动剧烈</li>
                      <li className="text-gray-300">• 央行干预历史：2015年黑天鹅</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-6">
                <h4 className="text-2xl font-bold mb-3 text-white">AUD/USD</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  <strong className="text-white">澳元/美元</strong> - 商品货币代表，与大宗商品（特别是铁矿石、煤炭）价格高度相关。市场份额约5.1%。
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-white mb-2">✓ 优势</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 高利率货币，套息交易热门</li>
                      <li className="text-gray-300">• 与中国经济密切相关</li>
                      <li className="text-gray-300">• 流动性好，点差1-2.5点</li>
                      <li className="text-gray-300">• 趋势性强</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-2">📊 特点</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 日均波动：60-100点</li>
                      <li className="text-gray-300">• 最活跃时段：亚洲、美国时段</li>
                      <li className="text-gray-300">• 风险偏好货币：股市涨澳元涨</li>
                      <li className="text-gray-300">• 受商品价格和中国数据影响</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-6">
                <h4 className="text-2xl font-bold mb-3 text-white">USD/CAD</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  <strong className="text-white">美元/加元</strong> - 被称为"Loonie"（加拿大货币上有潜鸟图案），与原油价格密切相关。市场份额约4.3%。
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-white mb-2">✓ 优势</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 与原油价格高度负相关</li>
                      <li className="text-gray-300">• 美加经济关联，数据同步</li>
                      <li className="text-gray-300">• 流动性好，点差1.5-3点</li>
                      <li className="text-gray-300">• 适合商品交易者</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-2">📊 特点</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 日均波动：60-100点</li>
                      <li className="text-gray-300">• 最活跃时段：美国时段</li>
                      <li className="text-gray-300">• 油价涨→加元涨→USD/CAD跌</li>
                      <li className="text-gray-300">• 受美国和加拿大数据双重影响</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-6">
                <h4 className="text-2xl font-bold mb-3 text-white">NZD/USD</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  <strong className="text-white">纽元/美元</strong> - 被称为"Kiwi"（奇异鸟），与澳元走势高度相关，也是商品货币。市场份额约1.7%。
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-white mb-2">✓ 优势</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 高利率，套息交易首选</li>
                      <li className="text-gray-300">• 波动性较大，日内机会多</li>
                      <li className="text-gray-300">• 与AUD/USD相关性高</li>
                      <li className="text-gray-300">• 流动性尚可，点差2-4点</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-2">📊 特点</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 日均波动：60-110点</li>
                      <li className="text-gray-300">• 最活跃时段：亚洲、美国时段</li>
                      <li className="text-gray-300">• 农产品出口国，受全球需求影响</li>
                      <li className="text-gray-300">• 与澳元、中国经济关联</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-gray-300 p-6 my-6 border-2 border-gray-800">
              <h4 className="text-lg font-bold mb-3 text-white">🎯 主要货币对交易建议</h4>
              <p className="mb-3">
                <strong className="text-white">新手：</strong>从EUR/USD开始，它流动性最好、点差最低、资源最丰富。
              </p>
              <p className="mb-3">
                <strong className="text-white">日内交易者：</strong>GBP/USD和EUR/USD，波动性大，日内机会多。
              </p>
              <p className="mb-3">
                <strong className="text-white">趋势交易者：</strong>USD/JPY和AUD/USD，趋势性强，适合中长线持仓。
              </p>
              <p className="mb-0">
                <strong className="text-white">商品交易者：</strong>USD/CAD（原油）、AUD/USD（金属），与商品价格相关。
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Minor Pairs */}
        <section id="minor-pairs" className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
            次要货币对（商品货币）
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-300 dark:text-gray-300 leading-relaxed mb-6">
              次要货币对通常指<strong className="text-white">主要货币对之外的美元货币对</strong>，特别是商品货币（AUD、NZD、CAD）和其他发达国家货币。它们的流动性略低于主要货币对，但仍有良好的交易条件。
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-white">商品货币的三大特征</h3>

            <div className="space-y-4 mb-8">
              <div className="border-2 border-gray-800 p-5">
                <h4 className="text-lg font-bold mb-2 text-white">1. 与大宗商品价格高度相关</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  澳大利亚、新西兰、加拿大是资源出口国，本国货币价值受商品价格直接影响：
                </p>
                <ul className="list-none space-y-2 text-gray-300 dark:text-gray-300">
                  <li className="text-gray-300">• <strong className="text-white">AUD：</strong>铁矿石、煤炭、黄金价格上涨→澳元上涨</li>
                  <li className="text-gray-300">• <strong className="text-white">CAD：</strong>原油价格上涨→加元上涨→USD/CAD下跌</li>
                  <li className="text-gray-300">• <strong className="text-white">NZD：</strong>乳制品、农产品价格上涨→纽元上涨</li>
                </ul>
              </div>

              <div className="border-2 border-gray-800 p-5">
                <h4 className="text-lg font-bold mb-2 text-white">2. 高利率，适合套息交易</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  商品货币国家的利率通常高于美国、欧洲、日本，吸引套息交易资金：
                </p>
                <div className="bg-gray-50 dark:bg-black p-4 border border-gray-800">
                  <p className="text-sm text-gray-300 dark:text-gray-300 mb-2">
                    <strong className="text-white">套息交易示例（2024年数据）：</strong>
                  </p>
                  <ul className="text-sm text-gray-300 dark:text-gray-300 list-none space-y-1">
                    <li className="text-gray-300">• 借入日元（利率-0.1%）→ 买入澳元（利率4.35%）</li>
                    <li className="text-gray-300">• 年利差收益：约4.45%</li>
                    <li className="text-gray-300">• 风险：如果AUD/JPY下跌，汇率损失可能超过利息收益</li>
                  </ul>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-5">
                <h4 className="text-lg font-bold mb-2 text-white">3. 风险偏好指标</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-2">
                  商品货币是<strong className="text-white">"风险资产"</strong>，其走势反映全球风险偏好：
                </p>
                <ul className="list-none space-y-2 text-gray-300 dark:text-gray-300">
                  <li className="text-gray-300">• <strong className="text-white">风险偏好增强：</strong>股市上涨→商品货币走强（AUD、NZD、CAD涨）</li>
                  <li className="text-gray-300">• <strong className="text-white">风险厌恶：</strong>市场恐慌→避险货币走强（USD、JPY、CHF涨）</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-white">其他次要货币对</h3>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-2 border-gray-800">
                <thead>
                  <tr className="bg-gray-900 text-gray-300">
                    <th className="border-2 border-gray-800 px-4 py-3 text-left font-bold text-white">货币对</th>
                    <th className="border-2 border-gray-800 px-4 py-3 text-left font-bold text-white">特点</th>
                    <th className="border-2 border-gray-800 px-4 py-3 text-left font-bold text-white">点差</th>
                    <th className="border-2 border-gray-800 px-4 py-3 text-left font-bold text-white">适合策略</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300 dark:text-gray-300">
                  <tr>
                    <td className="border-2 border-gray-800 px-4 py-3 font-bold text-white">USD/SGD</td>
                    <td className="border-2 border-gray-800 px-4 py-3">新加坡元，稳定性高</td>
                    <td className="border-2 border-gray-800 px-4 py-3">3-6点</td>
                    <td className="border-2 border-gray-800 px-4 py-3">区间交易</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-black">
                    <td className="border-2 border-gray-800 px-4 py-3 font-bold text-white">USD/HKD</td>
                    <td className="border-2 border-gray-800 px-4 py-3">港元与美元挂钩，波动极小</td>
                    <td className="border-2 border-gray-800 px-4 py-3">20-40点</td>
                    <td className="border-2 border-gray-800 px-4 py-3">不建议交易</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-800 px-4 py-3 font-bold text-white">USD/SEK</td>
                    <td className="border-2 border-gray-800 px-4 py-3">瑞典克朗，与EUR相关</td>
                    <td className="border-2 border-gray-800 px-4 py-3">30-60点</td>
                    <td className="border-2 border-gray-800 px-4 py-3">中长线</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-black">
                    <td className="border-2 border-gray-800 px-4 py-3 font-bold text-white">USD/NOK</td>
                    <td className="border-2 border-gray-800 px-4 py-3">挪威克朗，石油出口国</td>
                    <td className="border-2 border-gray-800 px-4 py-3">40-80点</td>
                    <td className="border-2 border-gray-800 px-4 py-3">商品相关交易</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 dark:bg-black border-2 border-gray-800 p-6 my-6">
              <h4 className="text-lg font-bold mb-3 text-white">💡 交易建议</h4>
              <p className="text-gray-300 dark:text-gray-300 mb-0">
                商品货币适合<strong className="text-white">中长线趋势交易</strong>和<strong className="text-white">套息交易</strong>。在交易前，应关注相关商品价格走势（如原油、黄金）和全球风险偏好指标（如VIX恐慌指数、股市表现）。新手建议先从主要货币对积累经验，再涉足商品货币。
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Cross Pairs */}
        <section id="cross-pairs" className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
            交叉货币对分析
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-300 dark:text-gray-300 leading-relaxed mb-6">
              交叉货币对（Cross Pairs）是指<strong className="text-white">不包含美元的货币对</strong>。它们允许交易者直接交易两种非美元货币，避免美元波动的干扰，捕捉特定国家或地区之间的经济差异。
            </p>

            <div className="bg-gray-900 text-gray-300 p-6 my-6 border-2 border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-white">🔍 为什么交易交叉货币对？</h3>
              <ul className="list-none space-y-3 mb-0">
                <li className="text-gray-300"><strong className="text-white">1. 避开美元波动：</strong>如果美元同时对欧元和英镑走弱，EUR/USD和GBP/USD都会上涨，但EUR/GBP可能没有明确方向。交叉盘让你专注于欧元vs英镑的相对强弱。</li>
                <li className="text-gray-300"><strong className="text-white">2. 更多交易机会：</strong>主要货币对只有7个，但交叉货币对有数十个，提供更多样化的交易选择。</li>
                <li className="text-gray-300"><strong className="text-white">3. 地区性趋势：</strong>捕捉特定地区（如欧洲内部、亚洲内部）的经济差异和套利机会。</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-white">主要交叉货币对</h3>

            <div className="space-y-6 mb-8">
              <div className="border-2 border-gray-800 p-6">
                <h4 className="text-2xl font-bold mb-3 text-white">EUR/GBP</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  <strong className="text-white">欧元/英镑</strong> - 欧洲两大经济体货币对，流动性仅次于主要货币对。
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-white mb-2">✓ 优势</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 流动性极好，点差1.5-3点</li>
                      <li className="text-gray-300">• 受脱欧、欧元区政策影响大</li>
                      <li className="text-gray-300">• 趋势明确，适合波段交易</li>
                      <li className="text-gray-300">• 避开美元因素</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-2">📊 特点</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 日均波动：40-80点</li>
                      <li className="text-gray-300">• 最活跃时段：欧洲时段</li>
                      <li className="text-gray-300">• 历史区间：0.70-0.95</li>
                      <li className="text-gray-300">• 央行政策分歧时波动加大</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-6">
                <h4 className="text-2xl font-bold mb-3 text-white">EUR/JPY</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  <strong className="text-white">欧元/日元</strong> - 套息交易最热门的交叉货币对，结合了欧元的高利率和日元的低利率。
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-white mb-2">✓ 优势</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 套息交易首选（利差大）</li>
                      <li className="text-gray-300">• 流动性好，点差2-4点</li>
                      <li className="text-gray-300">• 波动性大，日内机会多</li>
                      <li className="text-gray-300">• 风险偏好指标：股市涨EUR/JPY涨</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-2">📊 特点</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 日均波动：80-150点</li>
                      <li className="text-gray-300">• 最活跃时段：欧洲、亚洲时段</li>
                      <li className="text-gray-300">• 危机时暴跌（避险资金流入日元）</li>
                      <li className="text-gray-300">• 与全球股市相关性高</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-6">
                <h4 className="text-2xl font-bold mb-3 text-white">GBP/JPY</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  <strong className="text-white">英镑/日元</strong> - 被称为"龙"或"野兽"，以极高的波动性著称，是日内交易者的最爱。
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-white mb-2">✓ 优势</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 波动性极大，单日可达200点</li>
                      <li className="text-gray-300">• 日内交易机会丰富</li>
                      <li className="text-gray-300">• 流动性好，点差2.5-5点</li>
                      <li className="text-gray-300">• 趋势强劲时利润空间大</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-2">⚠️ 风险</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 日均波动：100-200点</li>
                      <li className="text-gray-300">• 最活跃时段：伦敦、东京重叠</li>
                      <li className="text-gray-300">• 新闻时段剧烈波动</li>
                      <li className="text-gray-300">• 不适合新手，需严格止损</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-6">
                <h4 className="text-2xl font-bold mb-3 text-white">AUD/JPY</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  <strong className="text-white">澳元/日元</strong> - 商品货币与避险货币的对决，是全球风险偏好的晴雨表。
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-white mb-2">✓ 优势</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 套息交易热门货币对</li>
                      <li className="text-gray-300">• 风险指标：与股市高度相关</li>
                      <li className="text-gray-300">• 受中国经济和商品价格影响</li>
                      <li className="text-gray-300">• 流动性好，点差2-4点</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-2">📊 特点</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 日均波动：80-130点</li>
                      <li className="text-gray-300">• 最活跃时段：亚洲时段</li>
                      <li className="text-gray-300">• 风险偏好增强→AUD/JPY涨</li>
                      <li className="text-gray-300">• 市场恐慌→AUD/JPY暴跌</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-6">
                <h4 className="text-2xl font-bold mb-3 text-white">EUR/CHF</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  <strong className="text-white">欧元/瑞郎</strong> - 历史上受瑞士央行干预最多的货币对。
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-white mb-2">✓ 优势</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 流动性好，点差2-4点</li>
                      <li className="text-gray-300">• 欧洲区域内货币对</li>
                      <li className="text-gray-300">• 避险需求时波动加大</li>
                      <li className="text-gray-300">• 央行政策差异带来机会</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-2">⚠️ 风险</p>
                    <ul className="text-sm text-gray-300 dark:text-gray-300 space-y-1 list-none">
                      <li className="text-gray-300">• 日均波动：40-70点</li>
                      <li className="text-gray-300">• 最活跃时段：欧洲时段</li>
                      <li className="text-gray-300">• 2015年黑天鹅事件教训</li>
                      <li className="text-gray-300">• 瑞士央行干预风险</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-white">交叉货币对的计算</h3>

            <div className="bg-gray-50 dark:bg-black border-2 border-gray-800 p-6 my-6">
              <h4 className="text-lg font-bold mb-3 text-white">📐 交叉汇率计算方法</h4>
              <p className="text-gray-300 dark:text-gray-300 mb-4">
                交叉货币对的价格实际上是通过两个主要货币对计算得出的：
              </p>
              <div className="bg-gray-50 dark:bg-black p-4 border-2 border-gray-800 mb-4">
                <p className="font-bold text-white mb-2">示例：计算EUR/GBP</p>
                <p className="text-sm text-gray-300 dark:text-gray-300 mb-2">
                  已知：EUR/USD = 1.1000，GBP/USD = 1.2500
                </p>
                <p className="text-sm text-gray-300 dark:text-gray-300 mb-2">
                  计算：EUR/GBP = EUR/USD ÷ GBP/USD = 1.1000 ÷ 1.2500 = 0.8800
                </p>
                <p className="text-sm text-gray-300 dark:text-gray-300 mb-0">
                  含义：1欧元 = 0.88英镑
                </p>
              </div>
              <p className="text-gray-300 dark:text-gray-300 mb-0">
                <strong className="text-white">启示：</strong>交叉货币对的走势受两个主要货币对共同影响。如果EUR/USD和GBP/USD同时上涨相同幅度，EUR/GBP可能不动。
              </p>
            </div>

            <div className="bg-gray-900 text-gray-300 p-6 my-6 border-2 border-gray-800">
              <h4 className="text-lg font-bold mb-3 text-white">🎯 交叉货币对交易策略</h4>
              <ol className="list-decimal pl-5 space-y-2 mb-0">
                <li className="text-gray-300"><strong className="text-white">套息交易：</strong>买入高息货币对低息货币（如EUR/JPY、AUD/JPY），持有过夜赚取利息差</li>
                <li className="text-gray-300"><strong className="text-white">相关性交易：</strong>利用EUR/USD和GBP/USD的相关性，通过EUR/GBP捕捉欧元和英镑的相对强弱</li>
                <li className="text-gray-300"><strong className="text-white">地区性新闻交易：</strong>当英国公布经济数据时，EUR/GBP比GBP/USD更直接反映英镑走势</li>
                <li className="text-gray-300"><strong className="text-white">风险偏好交易：</strong>使用AUD/JPY、EUR/JPY等作为风险情绪指标，股市涨时做多，恐慌时做空</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section 5: Exotic Pairs */}
        <section id="exotic-pairs" className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
            异国货币对特点
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-300 dark:text-gray-300 leading-relaxed mb-6">
              异国货币对（Exotic Pairs）是指<strong className="text-white">包含新兴市场或小型经济体货币的货币对</strong>。它们提供更高的波动性和潜在利润，但同时伴随更大的风险和交易成本。
            </p>

            <div className="bg-red-50 dark:bg-red-950 border-2 border-red-600 p-6 my-6">
              <h4 className="text-lg font-bold mb-3 text-red-600">⚠️ 异国货币对的风险</h4>
              <ul className="list-none space-y-2 text-gray-300 dark:text-gray-300 mb-0">
                <li className="text-gray-300">• <strong className="text-white">流动性差：</strong>买卖价差大，成交困难，易出现滑点</li>
                <li className="text-gray-300">• <strong className="text-white">点差高：</strong>通常是主要货币对的10-50倍，交易成本极高</li>
                <li className="text-gray-300">• <strong className="text-white">政治风险：</strong>新兴市场政局不稳，货币政策不透明</li>
                <li className="text-gray-300">• <strong className="text-white">隔夜利息波动大：</strong>可能面临巨额负利息</li>
                <li className="text-gray-300">• <strong className="text-white">信息不对称：</strong>新闻和分析资源稀缺，难以判断走势</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-white">常见异国货币对</h3>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-2 border-gray-800">
                <thead>
                  <tr className="bg-gray-900 text-gray-300">
                    <th className="border-2 border-gray-800 px-4 py-3 text-left font-bold text-white">货币对</th>
                    <th className="border-2 border-gray-800 px-4 py-3 text-left font-bold text-white">名称</th>
                    <th className="border-2 border-gray-800 px-4 py-3 text-left font-bold text-white">典型点差</th>
                    <th className="border-2 border-gray-800 px-4 py-3 text-left font-bold text-white">特点</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300 dark:text-gray-300">
                  <tr>
                    <td className="border-2 border-gray-800 px-4 py-3 font-bold text-white">USD/TRY</td>
                    <td className="border-2 border-gray-800 px-4 py-3">美元/土耳其里拉</td>
                    <td className="border-2 border-gray-800 px-4 py-3">50-200点</td>
                    <td className="border-2 border-gray-800 px-4 py-3">高通胀，波动极大</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-black">
                    <td className="border-2 border-gray-800 px-4 py-3 font-bold text-white">USD/ZAR</td>
                    <td className="border-2 border-gray-800 px-4 py-3">美元/南非兰特</td>
                    <td className="border-2 border-gray-800 px-4 py-3">100-300点</td>
                    <td className="border-2 border-gray-800 px-4 py-3">商品货币，政治风险高</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-800 px-4 py-3 font-bold text-white">USD/MXN</td>
                    <td className="border-2 border-gray-800 px-4 py-3">美元/墨西哥比索</td>
                    <td className="border-2 border-gray-800 px-4 py-3">50-150点</td>
                    <td className="border-2 border-gray-800 px-4 py-3">受美国经济和石油价格影响</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-black">
                    <td className="border-2 border-gray-800 px-4 py-3 font-bold text-white">USD/BRL</td>
                    <td className="border-2 border-gray-800 px-4 py-3">美元/巴西雷亚尔</td>
                    <td className="border-2 border-gray-800 px-4 py-3">100-400点</td>
                    <td className="border-2 border-gray-800 px-4 py-3">高利率，商品出口国</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-800 px-4 py-3 font-bold text-white">USD/RUB</td>
                    <td className="border-2 border-gray-800 px-4 py-3">美元/俄罗斯卢布</td>
                    <td className="border-2 border-gray-800 px-4 py-3">200-800点</td>
                    <td className="border-2 border-gray-800 px-4 py-3">制裁风险，流动性极差</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-black">
                    <td className="border-2 border-gray-800 px-4 py-3 font-bold text-white">USD/CNH</td>
                    <td className="border-2 border-gray-800 px-4 py-3">美元/离岸人民币</td>
                    <td className="border-2 border-gray-800 px-4 py-3">20-50点</td>
                    <td className="border-2 border-gray-800 px-4 py-3">受央行管控，波动可控</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-white">异国货币对的交易场景</h3>

            <div className="space-y-4 mb-8">
              <div className="border-2 border-gray-800 p-5">
                <h4 className="text-lg font-bold mb-2 text-white">场景1：高利率套息交易</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  新兴市场货币通常有高利率（如土耳其里拉、南非兰特），吸引套息交易者。
                </p>
                <div className="bg-gray-50 dark:bg-black p-4 border border-gray-800">
                  <p className="text-sm text-gray-300 dark:text-gray-300 mb-2">
                    <strong className="text-white">示例：</strong>做多USD/TRY（借入美元买入里拉）
                  </p>
                  <ul className="text-sm text-gray-300 dark:text-gray-300 list-none space-y-1">
                    <li className="text-gray-300">• 利率差：土耳其央行利率40%，美联储5.5%，年利差35%</li>
                    <li className="text-gray-300">• 风险：里拉持续贬值，汇率损失远超利息收益</li>
                    <li className="text-gray-300">• 结果：2023年USD/TRY从18涨至33，涨幅83%，利息收益无法弥补</li>
                  </ul>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-5">
                <h4 className="text-lg font-bold mb-2 text-white">场景2：商品价格驱动交易</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  资源出口国的货币与商品价格高度相关（如南非的黄金、巴西的铁矿石）。
                </p>
                <div className="bg-gray-50 dark:bg-black p-4 border border-gray-800">
                  <p className="text-sm text-gray-300 dark:text-gray-300 mb-0">
                    <strong className="text-white">策略：</strong>黄金价格上涨时做空USD/ZAR（南非兰特走强），但需警惕南非政治风险和电力危机。
                  </p>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-5">
                <h4 className="text-lg font-bold mb-2 text-white">场景3：地缘政治事件交易</h4>
                <p className="text-gray-300 dark:text-gray-300 mb-3">
                  新兴市场货币对地缘政治事件极其敏感，可能出现剧烈波动。
                </p>
                <div className="bg-gray-50 dark:bg-black p-4 border border-gray-800">
                  <p className="text-sm text-gray-300 dark:text-gray-300 mb-0">
                    <strong className="text-white">案例：</strong>2022年俄乌冲突爆发后，USD/RUB单日暴涨30%，许多经纪商停止该货币对交易。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-gray-300 p-6 my-6 border-2 border-gray-800">
              <h4 className="text-lg font-bold mb-3 text-white">💡 FX Killer的警告</h4>
              <p className="mb-3">
                <strong className="text-white">异国货币对不适合新手交易者。</strong>即使是经验丰富的交易者，也应谨慎涉足。主要原因：
              </p>
              <ol className="list-decimal pl-5 space-y-2 mb-0">
                <li className="text-gray-300">交易成本极高（点差可达主要货币对的50倍），侵蚀大部分利润</li>
                <li className="text-gray-300">流动性差，可能无法在理想价格成交，甚至无法平仓</li>
                <li className="text-gray-300">新兴市场经济和政治不稳定，"黑天鹅"事件频发</li>
                <li className="text-gray-300">缺乏足够的分析工具和信息，盲目交易风险极大</li>
              </ol>
            </div>

            <div className="bg-gray-50 dark:bg-black border-2 border-gray-800 p-6 my-6">
              <h4 className="text-lg font-bold mb-3 text-white">✅ 如果一定要交易异国货币对</h4>
              <ul className="list-none space-y-2 text-gray-300 dark:text-gray-300 mb-0">
                <li className="text-gray-300">• <strong className="text-white">使用极小仓位：</strong>不超过账户资金的0.5%风险</li>
                <li className="text-gray-300">• <strong className="text-white">设置宽松止损：</strong>考虑到高点差和波动性</li>
                <li className="text-gray-300">• <strong className="text-white">避免持仓过夜：</strong>隔夜利息和跳空风险巨大</li>
                <li className="text-gray-300">• <strong className="text-white">深入研究：</strong>了解该国经济、政治、央行政策</li>
                <li className="text-gray-300">• <strong className="text-white">选择可靠经纪商：</strong>确保在极端情况下能够平仓</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Comparison */}
        <section id="comparison" className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
            货币对全面对比
          </h2>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold mt-8 mb-4 text-white">核心指标对比</h3>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-2 border-gray-800 text-sm">
                <thead>
                  <tr className="bg-gray-900 text-gray-300">
                    <th className="border-2 border-gray-800 px-3 py-3 text-left font-bold text-white">分类</th>
                    <th className="border-2 border-gray-800 px-3 py-3 text-left font-bold text-white">流动性</th>
                    <th className="border-2 border-gray-800 px-3 py-3 text-left font-bold text-white">点差范围</th>
                    <th className="border-2 border-gray-800 px-3 py-3 text-left font-bold text-white">波动性</th>
                    <th className="border-2 border-gray-800 px-3 py-3 text-left font-bold text-white">适合新手</th>
                    <th className="border-2 border-gray-800 px-3 py-3 text-left font-bold text-white">推荐策略</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300 dark:text-gray-300">
                  <tr>
                    <td className="border-2 border-gray-800 px-3 py-3 font-bold text-white">主要货币对</td>
                    <td className="border-2 border-gray-800 px-3 py-3">极高</td>
                    <td className="border-2 border-gray-800 px-3 py-3">0.5-3点</td>
                    <td className="border-2 border-gray-800 px-3 py-3">中等</td>
                    <td className="border-2 border-gray-800 px-3 py-3">✅ 是</td>
                    <td className="border-2 border-gray-800 px-3 py-3">所有策略</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-black">
                    <td className="border-2 border-gray-800 px-3 py-3 font-bold text-white">交叉货币对</td>
                    <td className="border-2 border-gray-800 px-3 py-3">高</td>
                    <td className="border-2 border-gray-800 px-3 py-3">1.5-5点</td>
                    <td className="border-2 border-gray-800 px-3 py-3">中-高</td>
                    <td className="border-2 border-gray-800 px-3 py-3">⚠️ 谨慎</td>
                    <td className="border-2 border-gray-800 px-3 py-3">套息、趋势</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-800 px-3 py-3 font-bold text-white">商品货币对</td>
                    <td className="border-2 border-gray-800 px-3 py-3">高</td>
                    <td className="border-2 border-gray-800 px-3 py-3">1-3点</td>
                    <td className="border-2 border-gray-800 px-3 py-3">中-高</td>
                    <td className="border-2 border-gray-800 px-3 py-3">✅ 是</td>
                    <td className="border-2 border-gray-800 px-3 py-3">套息、商品相关</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-black">
                    <td className="border-2 border-gray-800 px-3 py-3 font-bold text-white">异国货币对</td>
                    <td className="border-2 border-gray-800 px-3 py-3">低</td>
                    <td className="border-2 border-gray-800 px-3 py-3">20-800点</td>
                    <td className="border-2 border-gray-800 px-3 py-3">极高</td>
                    <td className="border-2 border-gray-800 px-3 py-3">❌ 否</td>
                    <td className="border-2 border-gray-800 px-3 py-3">高风险投机</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-white">不同交易风格的货币对选择</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border-2 border-gray-800 p-6">
                <h4 className="font-bold text-white mb-3 text-lg">📊 日内交易（Scalping/Day Trading）</h4>
                <p className="text-sm text-gray-300 dark:text-gray-300 mb-3">
                  需要高流动性、低点差、适度波动性
                </p>
                <div className="bg-gray-50 dark:bg-black p-4 border border-gray-800">
                  <p className="text-xs font-bold text-white mb-2">首选货币对：</p>
                  <ul className="text-xs text-gray-300 dark:text-gray-300 list-none space-y-1">
                    <li className="text-gray-300">• EUR/USD - 点差最低，流动性最好</li>
                    <li className="text-gray-300">• GBP/USD - 波动性大，机会多</li>
                    <li className="text-gray-300">• USD/JPY - 趋势明确，易判断</li>
                    <li className="text-gray-300">• GBP/JPY - 波动极大（风险高）</li>
                  </ul>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-6">
                <h4 className="font-bold text-white mb-3 text-lg">📈 波段交易（Swing Trading）</h4>
                <p className="text-sm text-gray-300 dark:text-gray-300 mb-3">
                  关注中期趋势，持仓数天至数周
                </p>
                <div className="bg-gray-50 dark:bg-black p-4 border border-gray-800">
                  <p className="text-xs font-bold text-white mb-2">首选货币对：</p>
                  <ul className="text-xs text-gray-300 dark:text-gray-300 list-none space-y-1">
                    <li className="text-gray-300">• EUR/USD - 趋势清晰，新闻驱动</li>
                    <li className="text-gray-300">• USD/JPY - 央行政策驱动</li>
                    <li className="text-gray-300">• AUD/USD - 商品价格驱动</li>
                    <li className="text-gray-300">• EUR/GBP - 地区经济差异</li>
                  </ul>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-6">
                <h4 className="font-bold text-white mb-3 text-lg">💱 套息交易（Carry Trade）</h4>
                <p className="text-sm text-gray-300 dark:text-gray-300 mb-3">
                  赚取隔夜利息差，持仓数周至数月
                </p>
                <div className="bg-gray-50 dark:bg-black p-4 border border-gray-800">
                  <p className="text-xs font-bold text-white mb-2">首选货币对：</p>
                  <ul className="text-xs text-gray-300 dark:text-gray-300 list-none space-y-1">
                    <li className="text-gray-300">• AUD/JPY - 高利差，流动性好</li>
                    <li className="text-gray-300">• NZD/JPY - 更高利差</li>
                    <li className="text-gray-300">• EUR/JPY - 欧元区利率回升</li>
                    <li className="text-gray-300">• GBP/JPY - 高利差高波动</li>
                  </ul>
                </div>
              </div>

              <div className="border-2 border-gray-800 p-6">
                <h4 className="font-bold text-white mb-3 text-lg">🎯 趋势跟踪（Trend Following）</h4>
                <p className="text-sm text-gray-300 dark:text-gray-300 mb-3">
                  捕捉长期趋势，持仓数周至数月
                </p>
                <div className="bg-gray-50 dark:bg-black p-4 border border-gray-800">
                  <p className="text-xs font-bold text-white mb-2">首选货币对：</p>
                  <ul className="text-xs text-gray-300 dark:text-gray-300 list-none space-y-1">
                    <li className="text-gray-300">• EUR/USD - 央行政策分歧明显</li>
                    <li className="text-gray-300">• USD/JPY - 利差驱动，趋势强</li>
                    <li className="text-gray-300">• AUD/USD - 商品周期驱动</li>
                    <li className="text-gray-300">• USD/CAD - 原油价格驱动</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Selection Guide */}
        <section id="selection-guide" className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
            如何选择货币对
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-300 dark:text-gray-300 leading-relaxed mb-6">
              选择合适的货币对是交易成功的第一步。不同的货币对适合不同的交易者和策略。以下是系统化的选择流程：
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-white">选择流程（5步法）</h3>

            <div className="space-y-4 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-gray-300 flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-white">评估你的经验水平</h4>
                  <ul className="text-gray-300 dark:text-gray-300 list-none space-y-1">
                    <li className="text-gray-300">• <strong className="text-white">新手（0-6个月）：</strong>仅交易EUR/USD、USD/JPY、GBP/USD</li>
                    <li className="text-gray-300">• <strong className="text-white">中级（6-18个月）：</strong>可涉足AUD/USD、USD/CAD、EUR/GBP</li>
                    <li className="text-gray-300">• <strong className="text-white">高级（18个月以上）：</strong>可尝试GBP/JPY、EUR/JPY等高波动交叉盘</li>
                    <li className="text-gray-300">• <strong className="text-white">专家级：</strong>谨慎涉足异国货币对</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-gray-300 flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-white">确定你的交易风格</h4>
                  <ul className="text-gray-300 dark:text-gray-300 list-none space-y-1">
                    <li className="text-gray-300">• <strong className="text-white">剥头皮（Scalping）：</strong>EUR/USD、GBP/USD（低点差）</li>
                    <li className="text-gray-300">• <strong className="text-white">日内交易：</strong>EUR/USD、GBP/USD、GBP/JPY（高波动）</li>
                    <li className="text-gray-300">• <strong className="text-white">波段交易：</strong>所有主要货币对和热门交叉盘</li>
                    <li className="text-gray-300">• <strong className="text-white">头寸交易：</strong>USD/JPY、EUR/USD、AUD/USD（趋势性强）</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-gray-300 flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-white">考虑你的交易时间</h4>
                  <ul className="text-gray-300 dark:text-gray-300 list-none space-y-1">
                    <li className="text-gray-300">• <strong className="text-white">亚洲时段（北京早8:00-16:00）：</strong>USD/JPY、AUD/USD、NZD/USD</li>
                    <li className="text-gray-300">• <strong className="text-white">欧洲时段（北京下午15:30-00:30）：</strong>EUR/USD、GBP/USD、EUR/GBP</li>
                    <li className="text-gray-300">• <strong className="text-white">美国时段（北京晚20:30-05:00）：</strong>USD/CAD、EUR/USD、GBP/USD</li>
                    <li className="text-gray-300">• <strong className="text-white">重叠时段（北京晚20:30-00:30）：</strong>所有主要货币对</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-gray-300 flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-white">评估你的风险承受能力</h4>
                  <ul className="text-gray-300 dark:text-gray-300 list-none space-y-1">
                    <li className="text-gray-300">• <strong className="text-white">保守型：</strong>EUR/USD、USD/JPY（波动性低，点差小）</li>
                    <li className="text-gray-300">• <strong className="text-white">平衡型：</strong>GBP/USD、AUD/USD、USD/CAD</li>
                    <li className="text-gray-300">• <strong className="text-white">激进型：</strong>GBP/JPY、EUR/JPY、AUD/JPY（高波动）</li>
                    <li className="text-gray-300">• <strong className="text-white">避免：</strong>异国货币对（除非你是专家）</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-gray-300 flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-white">专注于2-3个货币对</h4>
                  <p className="text-gray-300 dark:text-gray-300">
                    不要试图交易所有货币对。专注于2-3个货币对，深入了解它们的特性、影响因素和历史走势，才能建立真正的优势。<strong className="text-white">专注胜过分散</strong>。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-gray-300 p-6 my-6 border-2 border-gray-800">
              <h4 className="text-lg font-bold mb-3 text-white">🎯 FX Killer推荐的新手货币对组合</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-bold mb-2 text-white">组合1：保守型</p>
                  <ul className="list-none space-y-1 text-sm">
                    <li className="text-gray-300">• <strong className="text-white">主要交易：</strong>EUR/USD（70%精力）</li>
                    <li className="text-gray-300">• <strong className="text-white">辅助交易：</strong>USD/JPY（30%精力）</li>
                    <li className="text-gray-300">• <strong className="text-white">原因：</strong>最低点差，最高流动性，新闻资源丰富，适合学习</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold mb-2 text-white">组合2：平衡型</p>
                  <ul className="list-none space-y-1 text-sm">
                    <li className="text-gray-300">• <strong className="text-white">主要交易：</strong>EUR/USD（50%精力）</li>
                    <li className="text-gray-300">• <strong className="text-white">辅助交易：</strong>GBP/USD（30%精力）+ AUD/USD（20%精力）</li>
                    <li className="text-gray-300">• <strong className="text-white">原因：</strong>平衡了稳定性和波动性，涵盖不同地区和时段</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold mb-2 text-white">组合3：激进型（需有经验）</p>
                  <ul className="list-none space-y-1 text-sm">
                    <li className="text-gray-300">• <strong className="text-white">主要交易：</strong>GBP/USD（40%精力）+ GBP/JPY（40%精力）</li>
                    <li className="text-gray-300">• <strong className="text-white">辅助交易：</strong>EUR/JPY（20%精力）</li>
                    <li className="text-gray-300">• <strong className="text-white">原因：</strong>高波动性，日内机会多，但风险大，需严格风险管理</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-black border-2 border-gray-800 p-6 my-6">
              <h4 className="text-lg font-bold mb-3 text-white">💡 实战技巧：货币对相关性</h4>
              <p className="text-gray-300 dark:text-gray-300 mb-3">
                某些货币对高度相关或负相关，同时交易可能增加风险或形成对冲：
              </p>
              <div className="space-y-2 text-sm text-gray-300 dark:text-gray-300">
                <p className="text-gray-300"><strong className="text-white">正相关（同向波动）：</strong></p>
                <ul className="list-none space-y-1 ml-4">
                  <li className="text-gray-300">• EUR/USD 与 GBP/USD（相关性约80%）</li>
                  <li className="text-gray-300">• AUD/USD 与 NZD/USD（相关性约90%）</li>
                  <li className="text-gray-300">• EUR/JPY 与 GBP/JPY（相关性约85%）</li>
                </ul>
                <p className="mt-3"><strong className="text-white">负相关（反向波动）：</strong></p>
                <ul className="list-none space-y-1 ml-4">
                  <li className="text-gray-300">• EUR/USD 与 USD/CHF（相关性约-95%）</li>
                  <li className="text-gray-300">• USD/JPY 与 AUD/USD（相关性约-70%）</li>
                </ul>
                <p className="mt-3"><strong className="text-white">警示：</strong>同时做多EUR/USD和GBP/USD相当于加倍押注美元走弱，风险成倍增加。</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
            常见问题解答
          </h2>

          <div className="space-y-4">
            <details className="border-2 border-gray-800 p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-white list-none flex items-center justify-between">
                <span className="text-gray-300">Q1: 为什么EUR/USD的点差比GBP/JPY低那么多？</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-300 dark:text-gray-300 leading-relaxed">
                <p className="mb-3">
                  点差的大小主要取决于<strong className="text-white">流动性</strong>和<strong className="text-white">交易量</strong>：
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li className="text-gray-300"><strong className="text-white">EUR/USD：</strong>日交易量超1.5万亿美元，买卖双方众多，竞争激烈，点差被压至0.5-1.5点</li>
                  <li className="text-gray-300"><strong className="text-white">GBP/JPY：</strong>交叉货币对，流动性低于主要货币对，需要通过GBP/USD和USD/JPY合成，增加成本，点差通常2.5-5点</li>
                </ul>
                <p className="text-gray-300">
                  <strong className="text-white">类比：</strong>在超市买水（EUR/USD）竞争激烈价格低，在酒店客房买水（GBP/JPY）价格高，道理相同。
                </p>
              </div>
            </details>

            <details className="border-2 border-gray-800 p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-white list-none flex items-center justify-between">
                <span className="text-gray-300">Q2: 同时交易多个货币对会提高盈利吗？</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-300 dark:text-gray-300 leading-relaxed">
                <p className="mb-3">
                  <strong className="text-white">不一定，甚至可能适得其反。</strong>原因如下：
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li className="text-gray-300"><strong className="text-white">分散精力：</strong>无法深入研究每个货币对的特性</li>
                  <li className="text-gray-300"><strong className="text-white">隐藏的相关性：</strong>同时做多EUR/USD和GBP/USD，实际是押注美元走弱，风险集中而非分散</li>
                  <li className="text-gray-300"><strong className="text-white">过度交易：</strong>寻找更多"机会"往往导致冲动交易和亏损</li>
                </ul>
                <p className="text-gray-300">
                  <strong className="text-white">专业交易者的做法：</strong>专注于2-3个货币对，成为该领域的"专家"。例如，许多成功的日内交易者只交易EUR/USD，因为他们对这个货币对的每一个细微波动都了如指掌。
                </p>
              </div>
            </details>

            <details className="border-2 border-gray-800 p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-white list-none flex items-center justify-between">
                <span className="text-gray-300">Q3: USD/CNY可以交易吗？与USD/CNH有什么区别？</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-300 dark:text-gray-300 leading-relaxed">
                <p className="mb-3">
                  大多数外汇经纪商提供的是<strong className="text-white">USD/CNH（离岸人民币）</strong>，而非USD/CNY（在岸人民币）：
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-bold text-white mb-2">USD/CNY（在岸人民币）</p>
                    <ul className="text-sm list-disc pl-6 space-y-1">
                      <li className="text-gray-300">在中国大陆交易，受中国人民银行严格管控</li>
                      <li className="text-gray-300">每日波动限制在2%以内</li>
                      <li className="text-gray-300">境外投资者难以直接交易</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-white mb-2">USD/CNH（离岸人民币）</p>
                    <ul className="text-sm list-disc pl-6 space-y-1">
                      <li className="text-gray-300">在香港、新加坡等境外市场交易，市场化程度高</li>
                      <li className="text-gray-300">波动性更大，更自由</li>
                      <li className="text-gray-300">大多数外汇经纪商提供USD/CNH交易</li>
                      <li className="text-gray-300">典型点差：20-50点（远高于主要货币对）</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-3">
                  <strong className="text-white">建议：</strong>新手避免交易USD/CNH，因为点差高、受政策影响大、波动不规律。
                </p>
              </div>
            </details>

            <details className="border-2 border-gray-800 p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-white list-none flex items-center justify-between">
                <span className="text-gray-300">Q4: 为什么有时候点差突然变大？</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-300 dark:text-gray-300 leading-relaxed">
                <p className="mb-3">
                  点差扩大的常见原因：
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                  <li className="text-gray-300"><strong className="text-white">重大新闻发布：</strong>非农就业数据、央行利率决议等重大事件前后，市场不确定性增加，做市商扩大点差保护自己</li>
                  <li className="text-gray-300"><strong className="text-white">低流动性时段：</strong>亚洲时段早盘、周末开盘前后，市场参与者少，点差自然扩大</li>
                  <li className="text-gray-300"><strong className="text-white">市场剧烈波动：</strong>"黑天鹅"事件（如2015年瑞郎危机）导致流动性枯竭，点差暴增</li>
                  <li className="text-gray-300"><strong className="text-white">经纪商问题：</strong>某些不良经纪商故意操纵点差</li>
                </ol>
                <p className="text-gray-300">
                  <strong className="text-white">应对策略：</strong>避免在重大新闻前后5-10分钟交易，避开低流动性时段，选择受严格监管的经纪商。
                </p>
              </div>
            </details>

            <details className="border-2 border-gray-800 p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-white list-none flex items-center justify-between">
                <span className="text-gray-300">Q5: 新手应该从哪个货币对开始？</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-300 dark:text-gray-300 leading-relaxed">
                <p className="mb-3">
                  <strong className="text-white">毫无疑问：EUR/USD</strong>。理由如下：
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li className="text-gray-300"><strong className="text-white">点差最低：</strong>通常0.5-1.5点，降低交易成本</li>
                  <li className="text-gray-300"><strong className="text-white">流动性最好：</strong>任何时候都能快速成交，无滑点</li>
                  <li className="text-gray-300"><strong className="text-white">信息丰富：</strong>新闻、分析、教育资源最多</li>
                  <li className="text-gray-300"><strong className="text-white">波动适中：</strong>不像GBP/JPY那样剧烈，但又有足够的交易机会</li>
                  <li className="text-gray-300"><strong className="text-white">全球关注：</strong>世界上最多交易者关注，技术分析更有效</li>
                </ul>
                <p className="text-gray-300">
                  <strong className="text-white">学习路径：</strong>从EUR/USD开始→掌握后加入USD/JPY或GBP/USD→积累1年以上经验后考虑交叉货币对→永远谨慎对待异国货币对。
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* Related Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-white border-l-4 border-gray-800 pl-4">
            相关学习资源
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <LocaleLink href="/education/forex-basics" className="border-2 border-gray-800 p-6 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2 text-white">外汇交易基础</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-600">
                了解外汇市场的基本概念和运作机制
              </p>
            </LocaleLink>

            <LocaleLink href="/education/trading-sessions-guide" className="border-2 border-gray-800 p-6 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group">
              <div className="text-3xl mb-4">🕐</div>
              <h3 className="text-xl font-bold mb-2 text-white">交易时段详解</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-600">
                掌握不同时段的货币对活跃度和最佳交易时间
              </p>
            </LocaleLink>

            <LocaleLink href="/education/spreads-and-commissions" className="border-2 border-gray-800 p-6 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2 text-white">点差与佣金</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-600">
                理解外汇交易成本，选择最合适的经纪商
              </p>
            </LocaleLink>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-gray-300 p-12 border-2 border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              想系统学习货币对交易策略？
            </h2>
            <p className="text-xl mb-8 text-gray-300 dark:text-gray-300">
              加入 FX Killer 30天系统化培训，掌握不同货币对的特性和交易技巧
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocaleLink
                href="/splan/join-us"
                className="px-10 py-4 bg-gray-50 dark:bg-black text-white font-bold text-lg border-2 border-gray-800 hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:hover:text-black transition-all inline-block text-center"
              >
                了解培训计划
              </LocaleLink>
              <LocaleLink
                href="/tools/position-calculator"
                className="px-10 py-4 bg-transparent text-gray-300 font-bold text-lg border-2 border-gray-800 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all inline-block text-center"
              >
                免费仓位计算器
              </LocaleLink>
            </div>
          </div>
        </section>

      </article>

      {/* Footer Navigation */}
      <div className="bg-gray-50 dark:bg-black border-t-2 border-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">上一课</p>
              <LocaleLink href="/education/market-participants" className="text-lg font-bold text-white hover:underline">
                ← 外汇市场参与者
              </LocaleLink>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">下一课</p>
              <LocaleLink href="/education/trading-sessions-guide" className="text-lg font-bold text-white hover:underline">
                交易时段详解 →
              </LocaleLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
