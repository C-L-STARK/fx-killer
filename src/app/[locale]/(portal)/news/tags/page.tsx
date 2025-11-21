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

interface TagGroup {
  tag: string;
  news: NewsItem[];
}

async function getNewsByTag(language: 'zh' | 'en'): Promise<TagGroup[]> {
  const newsDir = path.join(process.cwd(), 'src/content/news');
  const allNews: (NewsItem & { keywords: string[] })[] = [];

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
        description: data.description || '',
        keywords: data.keywords || []
      });
    }
  }

  // Group by tag
  const grouped = new Map<string, NewsItem[]>();

  allNews.forEach(item => {
    item.keywords.forEach(tag => {
      if (!grouped.has(tag)) {
        grouped.set(tag, []);
      }
      grouped.get(tag)!.push({
        slug: item.slug,
        title: item.title,
        date: item.date,
        description: item.description
      });
    });
  });

  // Convert to array and sort by tag name
  const result: TagGroup[] = [];
  grouped.forEach((news, tag) => {
    // Sort news by date descending
    news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    result.push({ tag, news });
  });

  result.sort((a, b) => a.tag.localeCompare(b.tag));

  return result;
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  const isZh = language === 'zh';

  return {
    title: isZh ? '标签归档 - FX Killer' : 'Tags Archive - FX Killer',
    description: isZh
      ? '按标签浏览FX Killer的所有外汇新闻文章'
      : 'Browse all FX Killer forex news articles by tags',
  };
}

export default async function TagsArchivePage() {
  const language = await getServerLanguage();
  const isZh = language === 'zh';
  const tagGroups = await getNewsByTag(language);

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
            {isZh ? '标签归档' : 'Tags Archive'}
          </h1>
          <p className="text-xl text-gray-300">
            {isZh ? '按标签浏览所有外汇新闻文章' : 'Browse all forex news articles by tags'}
          </p>

          {/* Tag Cloud */}
          <div className="mt-8 flex flex-wrap gap-3">
            {tagGroups.map(group => (
              <a
                key={group.tag}
                href={`#${group.tag}`}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-colors"
              >
                #{group.tag} ({group.news.length})
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Archive Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {tagGroups.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">
              {isZh ? '暂无标签归档' : 'No tags archive available'}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {tagGroups.map(group => (
              <div
                key={group.tag}
                id={group.tag}
                className="bg-gray-50 dark:bg-black border-2 border-gray-200 dark:border-gray-800 p-8 scroll-mt-24"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-800">
                  #{group.tag}
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
                              day: 'numeric',
                              year: 'numeric'
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
