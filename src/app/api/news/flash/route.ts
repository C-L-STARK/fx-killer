import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// In-memory cache for flash news
interface CacheEntry {
  news: any[];
  timestamp: number;
}

const cache: {
  zh: CacheEntry | null;
  en: CacheEntry | null;
} = {
  zh: null,
  en: null,
};

const CACHE_DURATION = 60 * 1000; // 60 seconds
const MAX_NEWS = 30;

// Fetch news from external API
async function fetchNewsFromAPI(lang: 'zh' | 'en'): Promise<any[]> {
  const langCode = lang === 'en' ? '2' : '0';
  const timestamp = Date.now();

  console.log('[FlashNews] Fetching from external API:', { lang, langCode });

  const response = await fetch(
    `https://news.futunn.com/news-site-api/main/get-flash-list?pageSize=${MAX_NEWS}&_t=${timestamp}`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'accept': 'application/json, text/plain, */*',
        'x-news-site-lang': langCode,
        'Referer': lang === 'en'
          ? 'https://news.futunn.com/en/main/live?lang=en-us'
          : 'https://news.futunn.com/main/live?lang=zh-cn',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const news = data.data?.data?.news || [];

  console.log('[FlashNews] Successfully fetched', news.length, 'news items');

  return news;
}

// Update cache if needed
async function updateCache(lang: 'zh' | 'en'): Promise<any[]> {
  const now = Date.now();
  const cachedEntry = cache[lang];

  // Return cache if valid
  if (cachedEntry && now - cachedEntry.timestamp < CACHE_DURATION) {
    console.log('[FlashNews] Using cache for', lang, '(age:', Math.round((now - cachedEntry.timestamp) / 1000), 's)');
    return cachedEntry.news;
  }

  // Fetch new data
  console.log('[FlashNews] Cache expired or missing for', lang, '- fetching new data');
  try {
    const news = await fetchNewsFromAPI(lang);
    cache[lang] = {
      news: news.slice(0, MAX_NEWS),
      timestamp: now,
    };
    return cache[lang]!.news;
  } catch (error) {
    console.error('[FlashNews] Error fetching news:', error);
    // Return stale cache if available
    if (cachedEntry) {
      console.log('[FlashNews] Returning stale cache due to error');
      return cachedEntry.news;
    }
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = (searchParams.get('lang') || 'zh') as 'zh' | 'en';

    console.log('[FlashNews] GET request for lang:', lang);

    const news = await updateCache(lang);

    return NextResponse.json({
      success: true,
      news,
      cached: true,
      timestamp: cache[lang]?.timestamp || Date.now(),
    });
  } catch (error) {
    console.error('[FlashNews] Error in GET handler:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch flash news',
        news: [],
      },
      { status: 500 }
    );
  }
}
