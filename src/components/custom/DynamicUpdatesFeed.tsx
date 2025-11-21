"use client";

import { useState, useEffect } from 'react';

interface Update {
    id: string;
    type: 'market' | 'education' | 'success' | 'announcement' | 'blog' | 'alert';
    title: {
        zh: string;
        en: string;
    };
    timestamp?: string;
    meta?: {
        zh: string;
        en: string;
    };
}

const typeConfig = {
    market: { emoji: '📊', label: { zh: '行情', en: 'Market' } },
    education: { emoji: '📚', label: { zh: '教学', en: 'Edu' } },
    success: { emoji: '🎉', label: { zh: '喜报', en: 'Success' } },
    announcement: { emoji: '📢', label: { zh: '公告', en: 'News' } },
    blog: { emoji: '✍️', label: { zh: '博客', en: 'Blog' } },
    alert: { emoji: '⚡', label: { zh: '提醒', en: 'Alert' } },
};

function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
}

export default function DynamicUpdatesFeed({ language }: { language: string }) {
    const [updates, setUpdates] = useState<Update[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUpdates() {
            try {
                const response = await fetch('/api/updates');
                const data = await response.json();

                if (data.success) {
                    setUpdates(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch updates:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUpdates();
    }, []);

    if (loading) {
        return (
            <div className="h-[520px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[520px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="space-y-3 p-6">
                {updates.map((update, index) => {
                    const config = typeConfig[update.type];

                    return (
                        <div
                            key={update.id}
                            className="group relative bg-black/40 border border-white/10 p-4 hover:bg-black/60 hover:border-[#ff102a]/50 transition-all duration-300 cursor-pointer animate-[fadeInUp_0.5s_ease-out_forwards]"
                            style={{
                                animationDelay: `${index * 50}ms`
                            }}
                        >
                            {/* Type Badge & Time */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">{config.emoji}</span>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                        {language === 'zh' ? config.label.zh : config.label.en}
                                    </span>
                                </div>
                                {update.timestamp && (
                                    <div className="text-[10px] text-gray-600 font-mono">
                                        {formatTimestamp(update.timestamp)}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="mb-2">
                                <div className="text-sm text-white font-medium leading-snug group-hover:text-[#ff102a] transition-colors line-clamp-2">
                                    {language === 'zh' ? update.title.zh : update.title.en}
                                </div>
                            </div>

                            {/* Meta info for items without timestamp */}
                            {!update.timestamp && update.meta && (
                                <div className="text-[10px] text-gray-600 italic">
                                    {language === 'zh' ? update.meta.zh : update.meta.en}
                                </div>
                            )}

                            {/* Hover indicator */}
                            <div className="absolute left-0 top-0 w-1 h-full bg-[#ff102a] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
