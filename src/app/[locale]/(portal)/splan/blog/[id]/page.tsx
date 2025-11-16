import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { supabase, BlogPost } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface NewsItem {
  slug: string;
  title: string;
  date: string;
  description: string;
  source: string;
  category: string;
}

// Get latest news from markdown files
async function getLatestNews(language: 'zh' | 'en', limit: number = 4): Promise<NewsItem[]> {
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
        description: data.description || '',
        source: data.source,
        category: data.category,
      });
    }
  }

  // Sort by date descending and take latest N
  allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return allNews.slice(0, limit);
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const lang = getLanguageFromLocale(locale);

  // Fetch blog post
  const { data, error } = await supabase
    .from('Blog')
    .select('*')
    .eq('id', parseInt(id))
    .single();

  if (error || !data) {
    return {
      title: lang === 'zh' ? '文章未找到丨汇刃' : 'Article Not Found丨FX Killer',
    };
  }

  const post = data as BlogPost;

  // Parse tags
  const tagList = post.tags ? post.tags.split(/[,，]/).map(tag => tag.trim()).filter(tag => tag) : [];
  const firstTwoTags = tagList.slice(0, 2).join(lang === 'zh' ? '、' : ', ');

  // Training keywords for SEO framework
  const trainingKeywords = [
    { zh: '职业交易员培训', en: 'Professional Trader Training' },
    { zh: '外汇交易员培训', en: 'Forex Trader Training' },
    { zh: '日内交易员培训', en: 'Day Trader Training' },
    { zh: '全职交易员培训', en: 'Full-Time Trader Training' },
  ];

  // Rotate keywords based on post ID
  const selectedKeywords = [
    trainingKeywords[post.id! % 4],
    trainingKeywords[(post.id! + 1) % 4]
  ];

  const keywordSuffix = lang === 'zh'
    ? `${selectedKeywords[0].zh}、${selectedKeywords[1].zh}`
    : `${selectedKeywords[0].en}, ${selectedKeywords[1].en}`;

  // Build title with tags and SEO framework
  const zhTitle = `${post.title}丨汇刃丨${keywordSuffix}`;
  const enTitle = `${post.title_en}丨FX Killer丨${keywordSuffix}`;

  // Build description from content excerpt
  const stripHTML = (html: string) => html.replace(/<[^>]*>/g, '').substring(0, 160);
  const zhDescription = stripHTML(post.content);
  const enDescription = stripHTML(post.content_en);

  // Build keywords
  const zhKeywords = `${tagList.join(', ')}, ${selectedKeywords[0].zh}, ${selectedKeywords[1].zh}, 交易心理, 风险管理`;
  const enKeywords = `${tagList.join(', ')}, ${selectedKeywords[0].en}, ${selectedKeywords[1].en}, trading psychology, risk management`;

  return generateBilingualMetadata(
    zhTitle,
    enTitle,
    zhDescription,
    enDescription,
    zhKeywords,
    enKeywords,
    lang,
    {
      url: `/splan/blog/${id}`,
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      author: post.author,
      section: 'Blog',
    }
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const lang = getLanguageFromLocale(locale);

  // Fetch blog post
  const { data: postData, error: postError } = await supabase
    .from('Blog')
    .select('*')
    .eq('id', parseInt(id))
    .single();

  if (postError || !postData) {
    notFound();
  }

  const post = postData as BlogPost;

  // Get related posts (same first tag, exclude current)
  let relatedPosts: BlogPost[] = [];
  if (post.tags) {
    const postTags = post.tags.split(/[,，]/).map(tag => tag.trim()).filter(tag => tag);
    const firstTag = postTags[0];

    if (firstTag) {
      const { data: allPosts } = await supabase
        .from('Blog')
        .select('*')
        .order('created_at', { ascending: false });

      if (allPosts) {
        relatedPosts = allPosts
          .filter((p: any) => {
            if (p.id === post.id) return false;
            if (!p.tags) return false;
            const pTags = p.tags.split(/[,，]/).map((tag: string) => tag.trim()).filter((tag: string) => tag);
            return pTags.includes(firstTag);
          })
          .slice(0, 3) as BlogPost[];
      }
    }
  }

  // Fetch latest 4 news from markdown files
  const latestNews = await getLatestNews(lang, 4);

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} latestNews={latestNews} locale={locale} />;
}
