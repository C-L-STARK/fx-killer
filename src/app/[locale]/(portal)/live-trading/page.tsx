import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '实盘直播丨汇刃丨职业交易员培训、外汇交易员培训',
    'Live Trading丨FX Killer丨Professional Trader Training, Forex Trader Training',
    '观看汇刃矩阵成员的实盘交易直播，学习真实的交易决策过程。6位职业交易员同步直播，展示专业的交易技巧和风险管理策略。',
    'Watch FX Killer matrix members\' live trading sessions and learn real trading decision-making processes. 6 professional traders streaming simultaneously, demonstrating expert trading skills and risk management strategies.',
    '实盘直播, 外汇直播, 交易直播, 职业交易员培训, 外汇交易员培训, 日内交易员培训',
    'live trading, forex live, trading stream, professional trader training, forex trader training, day trader training',
    lang,
    {
      url: '/live-trading',
      type: 'website',
      section: 'Live Trading',
      author: 'FX Killer Team',
    }
  );
}

export default function LiveTradingPage() {
  // Matrix members data
  const matrixMembers = [
    {
      id: 1,
      name: 'Alex Chen',
      avatar: '👨‍💼',
      isLive: true,
      youtubeId: 'JIKlDnnnqas',
      specialty: '趋势交易 / Trend Trading',
      lastLive: null,
    },
    {
      id: 2,
      name: 'Sarah Wang',
      avatar: '👩‍💼',
      isLive: false,
      youtubeId: null,
      specialty: '剥头皮交易 / Scalping',
      lastLive: '2025-11-10 14:30',
    },
    {
      id: 3,
      name: 'Michael Zhang',
      avatar: '👨‍💻',
      isLive: false,
      youtubeId: null,
      specialty: '波段交易 / Swing Trading',
      lastLive: '2025-11-09 09:15',
    },
    {
      id: 4,
      name: 'Emily Liu',
      avatar: '👩‍💻',
      isLive: false,
      youtubeId: null,
      specialty: '日内交易 / Day Trading',
      lastLive: '2025-11-08 16:45',
    },
    {
      id: 5,
      name: 'David Lin',
      avatar: '👨‍🔬',
      isLive: false,
      youtubeId: null,
      specialty: '突破交易 / Breakout Trading',
      lastLive: '2025-11-07 11:20',
    },
    {
      id: 6,
      name: 'Jessica Wu',
      avatar: '👩‍🔬',
      isLive: false,
      youtubeId: null,
      specialty: '新闻交易 / News Trading',
      lastLive: '2025-11-06 08:00',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
            <span className="inline-block">实盘直播</span>
            <span className="mx-3 text-gray-400">|</span>
            <span className="inline-block">Live Trading</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            观看汇刃矩阵成员的实时交易，学习专业交易决策
            <br />
            Watch our matrix members trade live and learn professional decision-making
          </p>
        </div>

        {/* YouTube Notice */}
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center justify-center gap-3 text-red-800 dark:text-red-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="font-medium">
              直播通过 YouTube 进行 / Streaming via YouTube
            </span>
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matrixMembers.map((member) => (
            <div
              key={member.id}
              className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all"
            >
              {member.isLive && member.youtubeId ? (
                // Live YouTube Stream
                <div className="relative">
                  {/* Live Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    LIVE
                  </div>

                  {/* YouTube Iframe */}
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${member.youtubeId}?autoplay=1&mute=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Member Info */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{member.avatar}</span>
                      <div>
                        <h3 className="font-bold text-lg text-black dark:text-white">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {member.specialty}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Offline Placeholder
                <div className="p-6">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <span className="text-6xl mb-3 block">{member.avatar}</span>
                      <div className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                        离线 / Offline
                      </div>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div>
                    <h3 className="font-bold text-lg text-black dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {member.specialty}
                    </p>
                    {member.lastLive && (
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        上次直播 / Last Live: {member.lastLive}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            矩阵成员每周进行多场实盘直播，展示真实的交易过程
          </p>
          <p>
            Matrix members conduct multiple live trading sessions weekly, showcasing real trading processes
          </p>
        </div>
      </div>
    </div>
  );
}
