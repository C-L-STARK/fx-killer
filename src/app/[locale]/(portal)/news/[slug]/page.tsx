import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServerLanguage, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { getBrandConfig } from '@/lib/brand-config';
import LocaleLink from '@/components/navigation/LocaleLink';
import ReactMarkdown from 'react-markdown';
import InterviewCTA from '@/components/custom/InterviewCTA';
import { supabase } from '@/lib/supabase';

interface NewsPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

interface HistoryNewsItem {
  slug: string;
  title: string;
  date: string;
}

async function getNewsContent(slug: string, language: 'zh' | 'en') {
  const newsDir = path.join(process.cwd(), 'src/content/news', slug);
  const filePath = path.join(newsDir, `${language}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    title: data.title,
    date: data.date,
    description: data.description,
    keywords: data.keywords,
    category: data.category,
    source: data.source,
    content: content
  };
}

async function getHistoryNews(language: 'zh' | 'en', currentSlug: string, limit = 10): Promise<HistoryNewsItem[]> {
  const newsDir = path.join(process.cwd(), 'src/content/news');

  if (!fs.existsSync(newsDir)) {
    return [];
  }

  const folders = fs.readdirSync(newsDir).filter(item => {
    const itemPath = path.join(newsDir, item);
    return fs.statSync(itemPath).isDirectory() && item !== currentSlug;
  });

  const news = folders
    .map(folder => {
      const filePath = path.join(newsDir, folder, `${language}.md`);

      if (!fs.existsSync(filePath)) {
        return null;
      }

      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      return {
        slug: folder,
        title: data.title,
        date: data.date
      };
    })
    .filter((item): item is HistoryNewsItem => item !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  return news;
}

// Get random 3 blog posts from Supabase
async function getRandomBlogs(limit = 3) {
  try {
    const { data: blogs, error } = await supabase
      .from('Blog')
      .select('id, title, title_en, content, content_en, tags, tags_en, remark, remark_en, author, created_at')
      .order('created_at', { ascending: false })
      .limit(50); // Get recent 50, then randomize

    if (error || !blogs) {
      return [];
    }

    // Shuffle and take first 'limit' items
    const shuffled = blogs.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  } catch (error) {
    console.error('Error fetching random blogs:', error);
    return [];
  }
}

export async function generateMetadata({ params }: NewsPageProps) {
  const { slug, locale } = await params;
  const language = locale === 'en' ? 'en' : 'zh';
  const brandConfig = await getBrandConfig();

  const newsZh = await getNewsContent(slug, 'zh');
  const newsEn = await getNewsContent(slug, 'en');

  if (!newsZh || !newsEn) {
    return {
      title: language === 'zh' ? '新闻未找到' : 'News Not Found'
    };
  }

  // 使用品牌配置动态生成标题
  const brandNameZh = brandConfig.brandName.zh;
  const brandNameEn = brandConfig.brandName.en;
  const seoKeywordsZh = brandConfig.seo.keywords.zh.slice(0, 2).join('、');
  const seoKeywordsEn = brandConfig.seo.keywords.en.slice(0, 2).join(', ');

  return generateBilingualMetadata(
    newsZh.title + `丨${brandNameZh}丨${seoKeywordsZh}`,
    newsEn.title + `丨${brandNameEn}丨${seoKeywordsEn}`,
    newsZh.description,
    newsEn.description,
    brandConfig.seo.keywords.zh.join(', ') + ', ' + newsZh.keywords.join(', '),
    brandConfig.seo.keywords.en.join(', ') + ', ' + newsEn.keywords.join(', '),
    language,
    brandConfig,
    {
      url: `/news/${slug}`,
      type: 'article',
      publishedTime: newsZh.date,
      modifiedTime: newsZh.date,
      section: newsZh.category,
      useTemplate: true,
    }
  );
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { slug, locale } = await params;
  const language = locale === 'en' ? 'en' : 'zh';
  const isZh = language === 'zh';

  const news = await getNewsContent(slug, language);
  const historyNews = await getHistoryNews(language, slug);
  const randomBlogs = await getRandomBlogs(3);
  const brandConfig = await import('@/lib/brand-config').then(m => m.getBrandConfig());
  const brandName = isZh ? brandConfig.brandName.zh : brandConfig.brandName.en;

  if (!news) {
    notFound();
  }

  // Replace hardcoded brand names in content
  let processedContent = news.content
    .replace(/FX Killer/g, brandName)
    .replace(/汇刃/g, brandName);

  // Replace in source field
  const processedSource = news.source
    .replace(/FX Killer/g, brandName)
    .replace(/汇刃/g, brandName);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <LocaleLink
            href="/news"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-6"
          >
            ← {isZh ? '返回新闻列表' : 'Back to News'}
          </LocaleLink>

          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold">
              {news.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {news.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{processedSource}</span>
            <span>•</span>
            <span>
              {new Date(news.date).toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - History News */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-800">
                  {isZh ? '最新新闻' : 'Recent News'}
                </h3>
                <ul className="space-y-3">
                  {historyNews.map((item) => (
                    <li key={item.slug}>
                      <LocaleLink
                        href={`/news/${item.slug}`}
                        className="block group"
                      >
                        <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 mb-1">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(item.date).toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
                {historyNews.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isZh ? '暂无更多新闻' : 'No more news'}
                  </p>
                )}
              </div>
            </div>
          </aside>

          {/* Article Content */}
          <article className="flex-1 min-w-0">
            {/* Article Body with Medium-style Styling */}
            <div className="mb-8">
              <div className="max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({node, children, ...props}) => (
                      <p
                        className="text-[21px] leading-[32px] text-gray-800 dark:text-gray-200 mb-8"
                        {...props}
                      >
                        {children}
                      </p>
                    ),
                    h1: ({node, children, ...props}) => (
                      <h1
                        className="text-[42px] leading-[48px] font-bold text-gray-900 dark:text-white mb-6 mt-12"
                        {...props}
                      >
                        {children}
                      </h1>
                    ),
                    h2: ({node, children, ...props}) => (
                      <h2
                        className="text-[32px] leading-[40px] font-bold text-gray-900 dark:text-white mb-6 mt-10"
                        {...props}
                      >
                        {children}
                      </h2>
                    ),
                    h3: ({node, children, ...props}) => (
                      <h3
                        className="text-[26px] leading-[32px] font-bold text-gray-900 dark:text-white mb-5 mt-8"
                        {...props}
                      >
                        {children}
                      </h3>
                    ),
                    strong: ({node, children, ...props}) => (
                      <strong
                        className="font-bold text-gray-900 dark:text-white"
                        {...props}
                      >
                        {children}
                      </strong>
                    ),
                    em: ({node, children, ...props}) => (
                      <em
                        className="italic text-gray-800 dark:text-gray-200"
                        {...props}
                      >
                        {children}
                      </em>
                    ),
                    a: ({node, children, ...props}) => {
                      const href = props.href || '';
                      // Check if it's an internal link (starts with /)
                      const isInternal = href.startsWith('/') && !href.startsWith('//');

                      if (isInternal) {
                        // Add language prefix to internal links
                        const localizedHref = `/${language}${href}`;
                        return (
                          <Link
                            href={localizedHref}
                            className="text-gray-900 dark:text-white underline decoration-gray-900 dark:decoration-white underline-offset-2 hover:opacity-70 transition-opacity"
                          >
                            {children}
                          </Link>
                        );
                      }

                      return (
                        <a
                          className="text-gray-900 dark:text-white underline decoration-gray-900 dark:decoration-white underline-offset-2 hover:opacity-70 transition-opacity"
                          {...props}
                        >
                          {children}
                        </a>
                      );
                    },
                    blockquote: ({node, children, ...props}) => (
                      <blockquote
                        className="border-l-4 border-gray-900 dark:border-white pl-6 pr-6 py-2 my-8 italic text-[21px] leading-[32px] text-gray-700 dark:text-gray-300"
                        {...props}
                      >
                        {children}
                      </blockquote>
                    ),
                    ul: ({node, children, ...props}) => (
                      <ul
                        className="mb-8 pl-8 list-disc"
                        {...props}
                      >
                        {children}
                      </ul>
                    ),
                    ol: ({node, children, ...props}) => (
                      <ol
                        className="mb-8 pl-8 list-decimal"
                        {...props}
                      >
                        {children}
                      </ol>
                    ),
                    li: ({node, children, ...props}) => (
                      <li
                        className="text-[21px] leading-[32px] text-gray-800 dark:text-gray-200 mb-3"
                        {...props}
                      >
                        {children}
                      </li>
                    ),
                    hr: ({node, ...props}) => (
                      <div className="my-10 text-center">
                        <span className="inline-block text-gray-400 text-2xl tracking-widest">• • •</span>
                      </div>
                    ),
                    code: ({node, className, children, ...props}: any) => {
                      const inline = !className;
                      return inline ? (
                        <code
                          className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-[18px] font-mono text-red-600 dark:text-red-400"
                          {...props}
                        >
                          {children}
                        </code>
                      ) : (
                        <code
                          className="block bg-gray-100 dark:bg-gray-800 p-6 rounded my-8 text-[16px] font-mono overflow-x-auto"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {processedContent}
                </ReactMarkdown>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 p-6 mb-8">
              <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-3">
                {isZh ? '相关标签' : 'Related Tags'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {news.keywords.map((keyword: string) => (
                  <span
                    key={keyword}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center mb-12">
              <LocaleLink
                href="/news"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border-2 border-black dark:border-white"
              >
                ← {isZh ? '返回新闻列表' : 'Back to News List'}
              </LocaleLink>
            </div>
          </article>
        </div>
      </div>

      {/* Related Blog Posts Section */}
      {randomBlogs.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 text-center">
              {isZh ? '推荐阅读' : 'Recommended Reading'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {randomBlogs.map((blog: any) => {
                const currentTags = isZh ? blog.tags : (blog.tags_en || blog.tags);
                const tagList = currentTags ? currentTags.split(/[,，]/).map((tag: string) => tag.trim()).filter((tag: string) => tag) : [];

                return (
                  <LocaleLink
                    key={blog.id}
                    href={`/splan/blog/${blog.id}`}
                    className="block group"
                  >
                    <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all p-6 h-full">
                      {/* Tags */}
                      {tagList.length > 0 && (
                        <div className="mb-3">
                          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                            {tagList[0]}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:underline line-clamp-2">
                        {isZh ? blog.title : blog.title_en}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {isZh
                          ? blog.content.replace(/<[^>]*>/g, '').substring(0, 120)
                          : blog.content_en.replace(/<[^>]*>/g, '').substring(0, 120)}...
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                        <span>{blog.author}</span>
                        {(blog.remark || blog.remark_en) && (
                          <span>{isZh ? blog.remark : (blog.remark_en || blog.remark)}</span>
                        )}
                      </div>
                    </div>
                  </LocaleLink>
                );
              })}
            </div>

            {/* View All Blogs Link */}
            <div className="text-center mt-8">
              <LocaleLink
                href="/splan/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-80 transition-opacity"
              >
                {isZh ? '查看所有博客文章 →' : 'View All Blog Posts →'}
              </LocaleLink>
            </div>
          </div>
        </div>
      )}

      {/* Training CTA Section */}
      <InterviewCTA />
    </div>
  );
}
