'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useBrand } from '@/contexts/BrandContext';
import { parseVideoUrl, getPlatformName, type VideoEmbed } from '@/lib/videoEmbedParser';

interface MatrixMember {
  id: number;
  name: string;
  isLive: boolean;
  youtubeId: string | null;
  specialty: string;
  lastLive: string | null;
  liveUrl?: string; // Full URL for multi-platform support
}

interface LiveTradingClientProps {
  members: MatrixMember[];
}

export default function LiveTradingClient({ members }: LiveTradingClientProps) {
  const { language } = useLanguage();
  const brand = useBrand();
  const isZh = language === 'zh';
  const brandName = isZh ? brand.brandName.zh : brand.brandName.en;

  // Get unique platforms being used
  const activePlatforms = new Set<string>();
  members.forEach((member) => {
    if (member.isLive && member.liveUrl) {
      const parsed = parseVideoUrl(member.liveUrl);
      if (parsed) {
        activePlatforms.add(getPlatformName(parsed.platform));
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section - Matching news page style */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white border-b-2 border-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider">
              {isZh ? '矩阵成员实盘' : 'Matrix Members Live Trading'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="font-black">
              {isZh ? '实盘直播' : 'Live Trading'}
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? `观看${brandName}矩阵成员的实时交易，学习专业交易决策`
              : `Watch ${brandName} matrix members trade live and learn professional decision-making`}
          </p>
        </div>
      </div>

      {/* Matrix Grid - Full Width Mosaic, No Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 bg-white dark:bg-black">
        {members.map((member) => {
          // Parse video URL for multi-platform support
          const videoEmbed = member.liveUrl ? parseVideoUrl(member.liveUrl) : null;
          const isLive = member.isLive && videoEmbed;

          return (
            <div
              key={member.id}
              className="relative bg-black border-r border-b border-gray-300 dark:border-gray-700 last:border-r-0 lg:last:border-r lg:[&:nth-child(3n)]:border-r-0 overflow-hidden group"
              style={{ aspectRatio: '16/9' }}
            >
              {isLive && videoEmbed ? (
                // Live Video Stream (Multi-platform)
                <>
                  {/* Live Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1.5 text-xs font-bold flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    LIVE
                  </div>

                  {/* Platform Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 text-xs font-medium shadow-lg">
                    {getPlatformName(videoEmbed.platform)}
                  </div>

                  {/* Video Iframe - Full container */}
                  <div className="absolute inset-0 bg-black">
                    {videoEmbed.platform === 'youtube' ? (
                      <iframe
                        src={videoEmbed.embedUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : videoEmbed.platform === 'bilibili' ? (
                      <iframe
                        src={videoEmbed.embedUrl}
                        className="w-full h-full"
                        allowFullScreen
                        style={{ border: 0 }}
                      />
                    ) : (
                      // Generic iframe for other platforms
                      <iframe
                        src={videoEmbed.embedUrl}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    )}
                  </div>

                  {/* Member Info Overlay - Shows on hover */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <h3 className="font-bold text-base text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {member.specialty}
                    </p>
                  </div>
                </>
              ) : (
                // Offline Placeholder
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 mb-4 bg-gray-300 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-500 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="px-4 py-1.5 bg-gray-300 dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                    {isZh ? '离线' : 'Offline'}
                  </div>

                  {/* Member Info */}
                  <div className="text-center px-6">
                    <h3 className="font-bold text-base text-black dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {member.specialty}
                    </p>
                    {member.lastLive && (
                      <p className="text-xs text-gray-500">
                        {isZh ? '上次直播' : 'Last Live'}: {member.lastLive}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
