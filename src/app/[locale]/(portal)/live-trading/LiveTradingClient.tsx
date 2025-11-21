'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { parseVideoUrl, getPlatformName, type VideoEmbed } from '@/lib/videoEmbedParser';
import PremiumCTA from '@/components/custom/PremiumCTA';
import EmailContactModal from '@/components/custom/EmailContactModal';
import LiveOrdersDisplay from '@/components/trading/LiveOrdersDisplay';

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
  const isZh = language === 'zh';
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

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
      <div className="relative bg-black text-white border-b-2 border-[#ff102a] overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff102a] blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff102a] blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-[#ff102a]/10 border border-[#ff102a] backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider text-[#ff102a]">
              {isZh ? '矩阵成员实盘' : 'Matrix Members Live Trading'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="font-black">
              {isZh ? '实盘直播' : 'Live Trading'}
            </span>
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZh
              ? '观看汇刃矩阵成员的实时交易，学习专业交易决策'
              : 'Watch our matrix members trade live and learn professional decision-making'}
          </p>
        </div>
      </div>

      {/* Matrix Grid - Full Width Mosaic, No Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 bg-black">
        {members.map((member) => {
          // Parse video URL for multi-platform support
          const videoEmbed = member.liveUrl ? parseVideoUrl(member.liveUrl) : null;
          const isLive = member.isLive && videoEmbed;

          return (
            <div
              key={member.id}
              className="relative bg-black border-r border-b border-gray-800 last:border-r-0 lg:last:border-r lg:[&:nth-child(3n)]:border-r-0 overflow-hidden group"
              style={{ aspectRatio: '16/9' }}
            >
              {isLive && videoEmbed ? (
                // Live Video Stream (Multi-platform)
                <>
                  {/* Live Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-[#ff102a] text-white px-3 py-1.5 text-xs font-bold flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    LIVE
                  </div>

                  {/* Platform Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 text-xs font-medium shadow-lg border border-gray-800">
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
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 border-t border-gray-800">
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
                <div className="absolute inset-0 bg-black flex flex-col items-center justify-center group-hover:bg-black transition-colors duration-300">
                  <div className="w-16 h-16 mb-4 bg-black rounded-full flex items-center justify-center border border-gray-800 group-hover:border-[#ff102a] transition-colors">
                    <svg className="w-8 h-8 text-gray-600 group-hover:text-[#ff102a] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="px-4 py-1.5 bg-black text-sm font-medium text-gray-400 mb-4 border border-gray-800">
                    {isZh ? '离线' : 'Offline'}
                  </div>

                  {/* Member Info */}
                  <div className="text-center px-6">
                    <h3 className="font-bold text-base text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {member.specialty}
                    </p>
                    {member.lastLive && (
                      <p className="text-xs text-gray-600">
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

      {/* Trading Orders Display */}
      <div className="bg-black py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <LiveOrdersDisplay />
        </div>
      </div>

      {/* Premium CTA */}
      <PremiumCTA
        badge={{ zh: '加入我们', en: 'Join Us' }}
        title={{
          zh: '想成为矩阵成员？',
          en: 'Want to Join Our Matrix?'
        }}
        subtitle={{
          zh: '完成培训考核，成为职业交易员。获得真实资金配置，享受60-90%高分润。',
          en: 'Complete training evaluation, become a professional trader. Get real funded accounts with 60-90% profit share.'
        }}
        primaryButton={{
          text: { zh: '预约面试', en: 'Schedule Interview' },
          action: 'modal'
        }}
        secondaryButton={{
          text: { zh: '免费心理测评', en: 'Psychology Test' },
          action: 'link',
          link: `/${language}/splan/psychology-test`
        }}
        showStats={true}
        onModalOpen={() => setIsEmailModalOpen(true)}
      />

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}
