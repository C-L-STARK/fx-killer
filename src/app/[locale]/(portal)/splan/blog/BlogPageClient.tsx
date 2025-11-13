'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'motion/react';
import type { BlogPost } from '@/lib/supabase';

interface BlogPageClientProps {
  blogs: BlogPost[];
}

export default function BlogPageClient({ blogs }: BlogPageClientProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract unique categories from tags (split by comma or Chinese comma), use language-specific tags
  const categories = useMemo(() => {
    const cats = ['all'];
    blogs.forEach(blog => {
      const currentTags = language === 'zh' ? blog.tags : (blog.tags_en || blog.tags);
      if (currentTags) {
        const tagList = currentTags.split(/[,，]/).map(tag => tag.trim()).filter(tag => tag);
        tagList.forEach(tag => {
          if (!cats.includes(tag)) {
            cats.push(tag);
          }
        });
      }
    });
    return cats;
  }, [blogs, language]);

  // Filter posts by category (tag)
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') return blogs;

    return blogs.filter(blog => {
      const currentTags = language === 'zh' ? blog.tags : (blog.tags_en || blog.tags);
      if (!currentTags) return false;
      const tagList = currentTags.split(/[,，]/).map(tag => tag.trim()).filter(tag => tag);
      return tagList.includes(selectedCategory);
    });
  }, [blogs, selectedCategory, language]);

  // Sort posts by top first, then by created_at (newest first)
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      // Top posts first
      if (a.top && !b.top) return -1;
      if (!a.top && b.top) return 1;

      // Then by date
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
  }, [filteredPosts]);

  // Category names (just use the tag names as is)
  const getCategoryName = (cat: string) => {
    if (cat === 'all') {
      return language === 'zh' ? '全部' : 'All';
    }
    return cat;
  };

  return (
    <>
      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-semibold border-2 whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white'
                }`}
              >
                {getCategoryName(category)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sortedPosts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">{language === 'zh' ? '暂无文章' : 'No articles yet'}</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPosts.map((post, index) => {
              // Parse tags for display based on language
              const currentTags = language === 'zh' ? post.tags : (post.tags_en || post.tags);
              const tagList = currentTags ? currentTags.split(/[,，]/).map(tag => tag.trim()).filter(tag => tag) : [];

              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => router.push(`/${language}/splan/blog/${post.id}`)}
                  className="relative bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all cursor-pointer group overflow-hidden"
                >
                  {/* Corner Badges - Horizontal Layout */}
                  {(post.top || post.recommand) && (
                    <div className="absolute top-0 right-0 z-10 flex gap-1">
                      {post.top && (
                        <div className="bg-red-600 text-white px-3 py-1 text-xs font-bold shadow-lg">
                          {language === 'zh' ? '置顶' : 'TOP'}
                        </div>
                      )}
                      {post.recommand && (
                        <div className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-xs font-bold shadow-lg">
                          {language === 'zh' ? '推荐' : 'FEATURED'}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    {/* Tags (first tag as category) */}
                    <div className="flex items-center gap-2 mb-3">
                      {tagList.length > 0 && (
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                          {tagList[0]}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:underline">
                      {language === 'zh' ? post.title : post.title_en}
                    </h2>

                    {/* Excerpt (first 100 chars of content, strip HTML) */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {language === 'zh'
                        ? post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                        : post.content_en.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-4">
                      <span>{post.author}</span>
                      {post.created_at && (
                        <span>{new Date(post.created_at).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US')}</span>
                      )}
                    </div>

                    {/* Tags */}
                    {tagList.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tagList.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
