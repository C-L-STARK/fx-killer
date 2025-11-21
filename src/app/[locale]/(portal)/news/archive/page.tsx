import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getServerLanguage } from '@/lib/getServerLanguage';
import LocaleLink from '@/components/navigation/LocaleLink';
import { Metadata } from 'next';

interface NewsItem {
  slug: string;
  title: string;
  date: string;
  description: string;
}

interface MonthGroup {
  month: string;
  year: string;
  news: NewsItem[];
}

async function getNewsByMonth(language: 'zh' | 'en'): Promise<MonthGroup[]> {
  const newsDir = path.join(process.cwd(), 'src/content/news');
  const allNews: NewsItem[] = [];

  if (!fs.existsSync(newsDir)) {
    return [];
  }

  const folders = fs.readdirSync(newsDir).filter(item => {
    const itemPath = path.join(newsDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  for (const folder of folders) {
    const filePath = path.join(newsDir, folder, `${language}.md`);

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      allNews.push({
        slug: folder,
        title: data.title,
        date: data.date,
        description: data.description || ''
      });
    }
  }

  // Sort by date descending
  allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Group by month
  const grouped = new Map<string, NewsItem[]>();

  allNews.forEach(item => {
    const date = new Date(item.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(item);
  });

  // Convert to array
  const result: MonthGroup[] = [];
  grouped.forEach((news, key) => {
    const [year, month] = key.split('-');
    result.push({ year, month, news });
  });

  // Sort by year-month descending
  result.sort((a, b) => {
    const keyA = `${a.year}-${a.month}`;
    const keyB = `${b.year}-${b.month}`;
    return keyB.localeCompare(keyA);
  });

  return result;
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  const isZh = language === 'zh';

  return {
    title: isZh ? '新闻归档 - FX Killer' : 'News Archive - FX Killer',
    description: isZh
      ? '按月份浏览FX Killer的所有外汇新闻文章归档'
      : 'Browse all FX Killer forex news articles by month',
  };
}

export default async function NewsArchivePage() {
  const language = await getServerLanguage();
  const isZh = language === 'zh';
  const monthGroups = await getNewsByMonth(language);

  const getMonthName = (month: string, year: string) => {
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white border-b-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <LocaleLink
            href="/news"
            className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6"
          >
            ← {isZh ? '返回新闻' : 'Back to News'}
          </LocaleLink>

          <h1 className="text-5xl font-bold mb-4">
            {isZh ? '新闻归档' : 'News Archive'}
          </h1>
          <p className="text-xl text-gray-300">
            {isZh ? '按月份浏览所有外汇新闻文章' : 'Browse all forex news articles by month'}
          </p>
        </div>
      </div>

      {/* Archive Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {monthGroups.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">
              {isZh ? '暂无新闻归档' : 'No news archive available'}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {monthGroups.map(group => (
              <div key={`${group.year}-${group.month}`} className="bg-gray-50 dark:bg-black border-2 border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-800">
                  {getMonthName(group.month, group.year)}
                  <span className="ml-3 text-lg text-gray-500 dark:text-gray-400">
                    ({group.news.length} {isZh ? '篇文章' : 'articles'})
                  </span>
                </h2>

                <ul className="space-y-4">
                  {group.news.map(item => (
                    <li key={item.slug} className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 hover:border-black dark:hover:border-white transition-colors">
                      <LocaleLink href={`/news/${item.slug}`} className="block group">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:underline mb-2">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {new Date(item.date).toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
