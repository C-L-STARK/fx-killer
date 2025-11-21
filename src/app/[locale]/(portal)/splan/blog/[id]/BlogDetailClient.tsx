'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'motion/react';
import InterviewCTA from '@/components/custom/InterviewCTA';
import type { BlogPost } from '@/lib/supabase';

interface NewsItem {
  slug: string;
  title: string;
  date: string;
  description: string;
  source: string;
  category: string;
}

interface BlogDetailClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  latestNews: NewsItem[];
  locale: string;
}

export default function BlogDetailClient({ post, relatedPosts, latestNews, locale }: BlogDetailClientProps) {
  const router = useRouter();
  const { language } = useLanguage();

  // Parse tags based on language
  const currentTags = language === 'zh' ? post.tags : (post.tags_en || post.tags);
  const tagList = currentTags ? currentTags.split(/[,，]/).map(tag => tag.trim()).filter(tag => tag) : [];

  return (
    <>
      <div className="bg-black min-h-screen">
        {/* Back Button */}
        <div className="bg-black border-b border-white/10 sticky top-16 z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => router.push(`/${language}/splan/blog`)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {language === 'zh' ? '返回博客' : 'Back to Blog'}
            </button>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badges */}
            <div className="flex gap-2 mb-6">
              {post.top && (
                <span className="px-3 py-1 bg-[#ff102a] text-white text-sm font-bold">
                  {language === 'zh' ? '置顶' : 'TOP'}
                </span>
              )}
              {post.recommand && (
                <span className="px-3 py-1 bg-white text-black text-sm font-bold">
                  {language === 'zh' ? '推荐' : 'FEATURED'}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              {language === 'zh' ? post.title : post.title_en}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{post.author}</span>
              </div>
              {post.created_at && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(post.created_at).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}
              {post.remark && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{language === 'zh' ? post.remark : (post.remark_en || post.remark)}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {tagList.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tagList.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/5 text-gray-300 text-sm font-medium border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-lg prose-invert max-w-none
              prose-headings:font-black prose-headings:text-white
              prose-p:text-gray-300
              prose-a:text-white prose-a:no-underline prose-a:font-bold hover:prose-a:underline
              prose-strong:text-white
              prose-ul:text-gray-300
              prose-ol:text-gray-300
              prose-blockquote:border-l-[#ff102a] prose-blockquote:bg-white/5 prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:not-italic"
              dangerouslySetInnerHTML={{ __html: language === 'zh' ? post.content : post.content_en }}
            />
          </motion.div>

          {/* Latest News Section */}
          {latestNews.length > 0 && (
            <div className="mt-16 pt-16 border-t border-white/10">
              <h2 className="text-3xl font-black text-white mb-8">
                {language === 'zh' ? '最新新闻' : 'Latest News'}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {latestNews.map((news) => (
                  <motion.div
                    key={news.slug}
                    whileHover={{ y: -4 }}
                    onClick={() => router.push(`/${locale}/news/${news.slug}`)}
                    className="bg-[#0a0a0a] border border-white/10 hover:border-[#ff102a] transition-all cursor-pointer p-6"
                  >
                    <h3 className="text-lg font-bold text-white line-clamp-2 mb-3 group-hover:text-[#ff102a]">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                      {news.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(news.date).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      {news.source && (
                        <span className="text-gray-600">•</span>
                      )}
                      {news.source && (
                        <span>{news.source}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-16 border-t border-white/10">
              <h2 className="text-3xl font-black text-white mb-8">
                {language === 'zh' ? '相关文章' : 'Related Articles'}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => {
                  const relatedCurrentTags = language === 'zh' ? relatedPost.tags : (relatedPost.tags_en || relatedPost.tags);
                  const relatedTags = relatedCurrentTags ? relatedCurrentTags.split(/[,，]/).map(tag => tag.trim()).filter(tag => tag) : [];
                  return (
                    <motion.div
                      key={relatedPost.id}
                      whileHover={{ y: -4 }}
                      onClick={() => router.push(`/${language}/splan/blog/${relatedPost.id}`)}
                      className="bg-[#0a0a0a] border border-white/10 hover:border-[#ff102a] transition-all cursor-pointer p-6"
                    >
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ff102a]">
                        {language === 'zh' ? relatedPost.title : relatedPost.title_en}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                        {language === 'zh'
                          ? relatedPost.content.replace(/<[^>]*>/g, '').substring(0, 100)
                          : relatedPost.content_en.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </p>
                      {relatedTags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {relatedTags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-white/5 text-gray-400 text-xs border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </article>
      </div>

      {/* Interview CTA - Full Width Footer */}
      <div className="w-full bg-black border-t border-white/10">
        <InterviewCTA />
      </div>
    </>
  );
}
