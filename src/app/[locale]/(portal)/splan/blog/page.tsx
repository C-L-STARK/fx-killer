import { getLanguageFromLocale } from '@/lib/getServerLanguage';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/lib/supabase';
import BlogPageClient from './BlogPageClient';
import InterviewCTA from '@/components/custom/InterviewCTA';

// Enable ISR - Revalidate every 1 hour
export const revalidate = 3600;

// Enable dynamic rendering for language
export const dynamic = 'force-dynamic';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const language = getLanguageFromLocale(locale);

  // Fetch blogs directly from Supabase on the server
  const { data: blogs, error } = await supabase
    .from('Blog')
    .select('*')
    .order('top', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch blogs:', error);
  }

  const blogPosts = (blogs || []) as BlogPost[];

  // Pre-calculate stats for hero section
  const totalBlogs = blogPosts.length;
  const featuredBlogs = blogPosts.filter(p => p.recommand).length;

  // Extract unique tags
  const allTags = new Set<string>();
  blogPosts.forEach(blog => {
    const currentTags = language === 'zh' ? blog.tags : (blog.tags_en || blog.tags);
    if (currentTags) {
      const tagList = currentTags.split(/[,，]/).map(tag => tag.trim()).filter(tag => tag);
      tagList.forEach(tag => allTags.add(tag));
    }
  });
  const totalTags = allTags.size;

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-950">
        {/* Hero Section - Enhanced */}
        <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white border-b-2 border-gray-800 overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white blur-3xl"></div>
          </div>

          <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
            <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <span className="text-sm font-semibold tracking-wider">
                {language === 'zh' ? '专业交易知识' : 'Professional Trading Knowledge'}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="font-black">
                {language === 'zh' ? '交易博客' : 'Trading Blog'}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {language === 'zh'
                ? '深度解析外汇交易策略、市场分析和职业交易员心得'
                : 'In-depth analysis of forex trading strategies, market insights, and professional trader experiences'}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
                <span className="text-white font-bold">{totalBlogs}</span> {language === 'zh' ? '篇文章' : 'Articles'}
              </div>
              <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
                <span className="text-white font-bold">{totalTags}</span> {language === 'zh' ? '个标签' : 'Tags'}
              </div>
              <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
                <span className="text-white font-bold">{featuredBlogs}</span> {language === 'zh' ? '精选推荐' : 'Featured'}
              </div>
            </div>
          </div>
        </div>

        {/* Client-side interactive content */}
        <BlogPageClient blogs={blogPosts} />
      </div>

      {/* Interview CTA - Full Width Footer */}
      <div className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <InterviewCTA />
      </div>
    </>
  );
}
