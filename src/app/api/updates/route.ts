// Next.js API Route - Platform Updates Feed
import { NextRequest, NextResponse } from 'next/server';

// 真实数据池 - 可以连接数据库或CMS
const allUpdates = {
    marketAnalysis: [
        {
            id: 'ma-1',
            type: 'market',
            title: {
                zh: 'GBP/JPY 技术分析：突破关键阻力位',
                en: 'GBP/JPY Technical: Breaking Key Resistance'
            },
            timestamp: '2024-11-20T14:30:00Z',
        },
        {
            id: 'ma-2',
            type: 'market',
            title: {
                zh: 'EUR/USD 日内交易策略更新',
                en: 'EUR/USD Intraday Strategy Update'
            },
            timestamp: '2024-11-20T10:15:00Z',
        },
        {
            id: 'ma-3',
            type: 'market',
            title: {
                zh: 'XAU/USD 黄金走势分析报告',
                en: 'XAU/USD Gold Trend Analysis Report'
            },
            timestamp: '2024-11-19T16:45:00Z',
        },
    ],
    education: [
        {
            id: 'edu-1',
            type: 'education',
            title: {
                zh: '风险管理进阶课程：仓位管理的黄金法则',
                en: 'Advanced Risk Management: Position Sizing Rules'
            },
            timestamp: '2024-11-20T09:15:00Z',
        },
        {
            id: 'edu-2',
            type: 'education',
            title: {
                zh: '交易心理学：如何克服恐惧与贪婪',
                en: 'Trading Psychology: Overcoming Fear and Greed'
            },
            timestamp: '2024-11-18T14:20:00Z',
        },
        {
            id: 'edu-3',
            type: 'education',
            title: {
                zh: '技术指标深度解析：MACD实战应用',
                en: 'Technical Indicators Deep Dive: MACD Practical Application'
            },
            timestamp: '2024-11-17T11:30:00Z',
        },
    ],
    success: [
        {
            id: 'suc-1',
            type: 'success',
            title: {
                zh: '王同学通过考核，首月盈利 $12,450',
                en: 'Student Wang Passed - First Month Profit $12,450'
            },
            timestamp: '2024-11-20T06:45:00Z',
        },
        {
            id: 'suc-2',
            type: 'success',
            title: {
                zh: '李同学获得资金支持，开始职业交易生涯',
                en: 'Student Li Secured Funding - Starting Professional Career'
            },
            timestamp: '2024-11-19T15:30:00Z',
        },
        {
            id: 'suc-3',
            type: 'success',
            title: {
                zh: '张同学累计盈利突破 $50,000',
                en: 'Student Zhang Total Profit Exceeds $50,000'
            },
            timestamp: '2024-11-18T09:20:00Z',
        },
    ],
    announcements: [
        {
            id: 'ann-1',
            type: 'announcement',
            title: {
                zh: '2月新学期招生开启，名额有限',
                en: 'Feb Enrollment Open - Limited Spots Available'
            },
            timestamp: '2024-11-19T18:20:00Z',
        },
        {
            id: 'ann-2',
            type: 'announcement',
            title: {
                zh: '平台系统升级公告',
                en: 'Platform System Upgrade Notice'
            },
            meta: {
                zh: '计划维护时间',
                en: 'Scheduled Maintenance'
            }
        },
        {
            id: 'ann-3',
            type: 'announcement',
            title: {
                zh: '新增交易工具：智能风控系统上线',
                en: 'New Trading Tool: Smart Risk Control System Launched'
            },
            timestamp: '2024-11-15T10:00:00Z',
        },
    ],
    blog: [
        {
            id: 'blog-1',
            type: 'blog',
            title: {
                zh: '如何在外汇市场建立稳定盈利系统',
                en: 'Building a Consistently Profitable Forex System'
            },
            timestamp: '2024-11-18T15:30:00Z',
        },
        {
            id: 'blog-2',
            type: 'blog',
            title: {
                zh: '职业交易员的一天：时间管理与交易纪律',
                en: 'A Day in Life of Pro Trader: Time Management & Discipline'
            },
            timestamp: '2024-11-16T12:00:00Z',
        },
        {
            id: 'blog-3',
            type: 'blog',
            title: {
                zh: '从零到职业交易员：我的30天成长之路',
                en: 'From Zero to Pro Trader: My 30-Day Journey'
            },
            timestamp: '2024-11-14T08:45:00Z',
        },
    ],
    alerts: [
        {
            id: 'alert-1',
            type: 'alert',
            title: {
                zh: '美联储利率决议将于今晚公布',
                en: 'Fed Interest Rate Decision Tonight'
            },
            timestamp: '2024-11-17T22:10:00Z',
        },
        {
            id: 'alert-2',
            type: 'alert',
            title: {
                zh: '欧洲央行政策会议即将召开',
                en: 'ECB Policy Meeting Approaching'
            },
            meta: {
                zh: '重大市场事件',
                en: 'Major Market Event'
            }
        },
        {
            id: 'alert-3',
            type: 'alert',
            title: {
                zh: '非农就业数据即将发布，注意风险',
                en: 'NFP Data Release - Risk Alert'
            },
            timestamp: '2024-11-13T08:30:00Z',
        },
    ],
};

// 随机选择每个类型的最新一条
function getRandomUpdates() {
    const categories = Object.keys(allUpdates);
    const selectedUpdates = [];

    for (const category of categories) {
        const items = allUpdates[category as keyof typeof allUpdates];
        if (items && items.length > 0) {
            // 随机选择一条
            const randomIndex = Math.floor(Math.random() * items.length);
            selectedUpdates.push(items[randomIndex]);
        }
    }

    // 按时间戳排序（最新的在前），没有时间戳的放在后面
    selectedUpdates.sort((a, b) => {
        if (!a.timestamp && !b.timestamp) return 0;
        if (!a.timestamp) return 1;
        if (!b.timestamp) return -1;
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return selectedUpdates;
}

export async function GET(request: NextRequest) {
    try {
        const updates = getRandomUpdates();

        return NextResponse.json({
            success: true,
            data: updates,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch updates' },
            { status: 500 }
        );
    }
}
