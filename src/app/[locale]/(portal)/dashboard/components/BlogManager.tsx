"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BlogPost } from '@/lib/supabase';
import BlogStyleHelper from './BlogStyleHelper';
import BlogAIGenerator from './BlogAIGenerator';
import { migrateBlogs, convertBlogPost } from '@/lib/blogMigration';
import { blogPosts } from '@/data/blogPosts';

export default function BlogManager() {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);
  const [separatingTags, setSeparatingTags] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  // Refs for textarea elements to insert templates
  const contentZhRef = useRef<HTMLTextAreaElement>(null);
  const contentEnRef = useRef<HTMLTextAreaElement>(null);
  const [activeContentField, setActiveContentField] = useState<'zh' | 'en'>('zh');

  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    title_en: '',
    content: '',
    content_en: '',
    author: '',
    remark: '',
    remark_en: '',
    tags: '',
    tags_en: '',
    rel_1: null,
    rel_2: null,
    rel_3: null,
    recommand: false,
    top: false,
  });

  // Fetch blogs
  const fetchBlogs = async (forceRefresh = false) => {
    setLoading(true);
    try {
      const url = forceRefresh ? '/api/blogs?refresh=true' : '/api/blogs';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle cache clearing
  const handleClearCache = async () => {
    if (!confirm(language === 'zh' ? '确定要清除缓存并刷新数据吗？' : 'Clear cache and refresh data?')) {
      return;
    }

    try {
      // Clear API cache
      await fetchBlogs(true);

      // Clear page cache (ISR) for both languages
      const secret = process.env.NEXT_PUBLIC_REVALIDATE_SECRET || 'dev_secret_change_in_production';

      await Promise.all([
        fetch(`/api/revalidate?path=/zh/splan/blog&secret=${secret}`),
        fetch(`/api/revalidate?path=/en/splan/blog&secret=${secret}`),
      ]);

      // Show success message
      alert(language === 'zh' ? '缓存已清除，数据已刷新（包括页面缓存）' : 'Cache cleared and data refreshed (including page cache)');
    } catch (error) {
      console.error('Error clearing cache:', error);
      alert(language === 'zh' ? '清除缓存时出错' : 'Error clearing cache');
    }
  };

  // Handle migration
  const handleMigration = async () => {
    if (!confirm(language === 'zh'
      ? `确定要迁移 ${blogPosts.length} 篇历史博客到数据库吗？这将创建新的文章。`
      : `Migrate ${blogPosts.length} historical blog posts to database? This will create new articles.`)) {
      return;
    }

    setMigrating(true);
    try {
      const results = await migrateBlogs(blogPosts);
      const successCount = results.filter(r => r.success).length;
      const failCount = results.filter(r => !r.success).length;

      alert(
        language === 'zh'
          ? `迁移完成！成功：${successCount} 篇，失败：${failCount} 篇`
          : `Migration complete! Success: ${successCount}, Failed: ${failCount}`
      );

      // Refresh blog list
      await fetchBlogs(true);
    } catch (error) {
      alert(language === 'zh' ? '迁移失败，请查看控制台错误' : 'Migration failed, check console for errors');
      console.error('Migration error:', error);
    } finally {
      setMigrating(false);
    }
  };

  // Handle automatic tag separation (Chinese/English)
  const handleSeparateTags = async () => {
    const blogsWithMixedTags = blogs.filter(blog => {
      // Check if tags field has both Chinese and English characters
      if (!blog.tags) return false;
      const hasChinese = /[\u4e00-\u9fa5]/.test(blog.tags);
      const hasEnglish = /[a-zA-Z]/.test(blog.tags);
      return hasChinese && hasEnglish;
    });

    if (blogsWithMixedTags.length === 0) {
      alert(language === 'zh' ? '没有需要分离的标签' : 'No tags need separation');
      return;
    }

    if (!confirm(language === 'zh'
      ? `发现 ${blogsWithMixedTags.length} 篇文章的标签需要分离。确定要自动分离中英文标签吗？`
      : `Found ${blogsWithMixedTags.length} articles with mixed tags. Separate Chinese and English tags automatically?`)) {
      return;
    }

    setSeparatingTags(true);
    try {
      let successCount = 0;
      let failCount = 0;

      for (const blog of blogsWithMixedTags) {
        try {
          // Split tags by comma or Chinese comma
          const allTags = blog.tags.split(/[,，]/).map(tag => tag.trim()).filter(tag => tag);

          // Separate Chinese and English tags
          const chineseTags: string[] = [];
          const englishTags: string[] = [];

          allTags.forEach(tag => {
            if (/[\u4e00-\u9fa5]/.test(tag)) {
              chineseTags.push(tag);
            } else {
              englishTags.push(tag);
            }
          });

          // Update the blog
          const response = await fetch('/api/blogs', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...blog,
              tags: chineseTags.join(','),
              tags_en: englishTags.join(','),
            }),
          });

          if (response.ok) {
            successCount++;
          } else {
            failCount++;
            console.error(`Failed to update blog ${blog.id}`);
          }
        } catch (error) {
          failCount++;
          console.error(`Error updating blog ${blog.id}:`, error);
        }
      }

      alert(
        language === 'zh'
          ? `标签分离完成！成功：${successCount} 篇，失败：${failCount} 篇`
          : `Tag separation complete! Success: ${successCount}, Failed: ${failCount}`
      );

      // Refresh blog list
      await fetchBlogs(true);
    } catch (error) {
      alert(language === 'zh' ? '标签分离失败，请查看控制台错误' : 'Tag separation failed, check console for errors');
      console.error('Tag separation error:', error);
    } finally {
      setSeparatingTags(false);
    }
  };

  // Handle AI generation
  const handleAIGenerated = (data: {
    title: string;
    title_en: string;
    content: string;
    content_en: string;
    tags: string;
    tags_en: string;
    remark: string;
    remark_en: string;
    author: string;
  }) => {
    setFormData({
      ...formData,
      title: data.title,
      title_en: data.title_en,
      content: data.content,
      content_en: data.content_en,
      tags: data.tags,
      tags_en: data.tags_en,
      remark: data.remark,
      remark_en: data.remark_en,
      author: data.author || 'FX Killer Team',
    });
    setShowForm(true);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Helper function to revalidate blog pages
  const revalidateBlogPages = async () => {
    try {
      const secret = process.env.NEXT_PUBLIC_REVALIDATE_SECRET || 'dev_secret_change_in_production';
      await Promise.all([
        fetch(`/api/revalidate?path=/zh/splan/blog&secret=${secret}`),
        fetch(`/api/revalidate?path=/en/splan/blog&secret=${secret}`),
      ]);
    } catch (error) {
      console.error('Failed to revalidate blog pages:', error);
    }
  };

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = '/api/blogs';
      const method = editingBlog ? 'PUT' : 'POST';
      const body = editingBlog ? { ...formData, id: editingBlog.id } : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await fetchBlogs();
        await revalidateBlogPages(); // Auto-revalidate after create/update
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save blog:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm(language === 'zh' ? '确定要删除吗？' : 'Are you sure to delete?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchBlogs();
        await revalidateBlogPages(); // Auto-revalidate after delete
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      title_en: '',
      content: '',
      content_en: '',
      author: '',
      remark: '',
      remark_en: '',
      tags: '',
      tags_en: '',
      rel_1: null,
      rel_2: null,
      rel_3: null,
      recommand: false,
      top: false,
    });
    setEditingBlog(null);
    setShowForm(false);
  };

  const startEdit = (blog: BlogPost) => {
    setFormData(blog);
    setEditingBlog(blog);
    setShowForm(true);
  };

  // Handle inserting template HTML into the active textarea
  const handleInsertTemplate = (html: string) => {
    const targetRef = activeContentField === 'zh' ? contentZhRef : contentEnRef;
    if (!targetRef.current) return;

    const textarea = targetRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    // Insert template at cursor position
    const newText = text.substring(0, start) + '\n' + html + '\n' + text.substring(end);

    // Update form data
    if (activeContentField === 'zh') {
      setFormData({ ...formData, content: newText });
    } else {
      setFormData({ ...formData, content_en: newText });
    }

    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + html.length + 2;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  return (
    <div className="p-8">
      {showAIGenerator && (
        <BlogAIGenerator
          onGenerated={handleAIGenerated}
          onClose={() => setShowAIGenerator(false)}
        />
      )}

      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-black text-black dark:text-white">
          {language === 'zh' ? '博客文章管理' : 'Blog Management'}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAIGenerator(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {language === 'zh' ? 'AI 生成' : 'AI Generate'}
          </button>
          <button
            onClick={handleSeparateTags}
            disabled={separatingTags}
            className="px-6 py-3 bg-green-600 dark:bg-green-500 text-white font-bold hover:opacity-80 transition-opacity flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {separatingTags ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {language === 'zh' ? '分离中...' : 'Separating...'}
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                {language === 'zh' ? '分离中英文标签' : 'Separate Tags'}
              </>
            )}
          </button>
          {/* Migration button - Hidden as migration is complete */}
          {/* <button
            onClick={handleMigration}
            disabled={migrating}
            className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-bold hover:opacity-80 transition-opacity flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {migrating ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {language === 'zh' ? '迁移中...' : 'Migrating...'}
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                {language === 'zh' ? `迁移历史博客 (${blogPosts.length})` : `Migrate Historical Blogs (${blogPosts.length})`}
              </>
            )}
          </button> */}
          <button
            onClick={handleClearCache}
            className="px-6 py-3 bg-gray-600 dark:bg-gray-500 text-white font-bold hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {language === 'zh' ? '清除缓存' : 'Clear Cache'}
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-80 transition-opacity"
          >
            {showForm ? (language === 'zh' ? '取消' : 'Cancel') : (language === 'zh' ? '添加新文章' : 'Add New Post')}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-bold text-black dark:text-white mb-4">
            {editingBlog ? (language === 'zh' ? '编辑文章' : 'Edit Post') : (language === 'zh' ? '添加新文章' : 'Add New Post')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'zh' ? '标题（中文）' : 'Title (Chinese)'}
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'zh' ? '标题（英文）' : 'Title (English)'}
                </label>
                <input
                  type="text"
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Blog Style Helper */}
            <BlogStyleHelper onInsert={handleInsertTemplate} />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'zh' ? '内容（中文 HTML）' : 'Content (Chinese HTML)'}
              </label>
              <textarea
                ref={contentZhRef}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                onFocus={() => setActiveContentField('zh')}
                className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white font-mono text-sm"
                rows={12}
                required
                placeholder="支持HTML格式，可以使用 Tailwind CSS 类名。点击上方样式模板快速插入。"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'zh' ? '内容（英文 HTML）' : 'Content (English HTML)'}
              </label>
              <textarea
                ref={contentEnRef}
                value={formData.content_en}
                onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                onFocus={() => setActiveContentField('en')}
                className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white font-mono text-sm"
                rows={12}
                required
                placeholder="Supports HTML format with Tailwind CSS classes. Click style templates above to insert."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'zh' ? '作者' : 'Author'}
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'zh' ? '标签（中文，逗号分隔）' : 'Tags (Chinese, comma separated)'}
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
                  placeholder="交易心理, 风险管理, 技术分析"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'zh' ? '标签（英文，逗号分隔）' : 'Tags (English, comma separated)'}
              </label>
              <input
                type="text"
                value={formData.tags_en}
                onChange={(e) => setFormData({ ...formData, tags_en: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
                placeholder="trading psychology, risk management, technical analysis"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'zh' ? '备注（中文）' : 'Remark (Chinese)'}
                </label>
                <input
                  type="text"
                  value={formData.remark}
                  onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
                  placeholder="10分钟阅读"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'zh' ? '备注（英文）' : 'Remark (English)'}
                </label>
                <input
                  type="text"
                  value={formData.remark_en}
                  onChange={(e) => setFormData({ ...formData, remark_en: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
                  placeholder="10 min read"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'zh' ? '相关文章1 (ID)' : 'Related Article 1 (ID)'}
                </label>
                <input
                  type="number"
                  value={formData.rel_1 || ''}
                  onChange={(e) => setFormData({ ...formData, rel_1: e.target.value ? parseInt(e.target.value) : null })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'zh' ? '相关文章2 (ID)' : 'Related Article 2 (ID)'}
                </label>
                <input
                  type="number"
                  value={formData.rel_2 || ''}
                  onChange={(e) => setFormData({ ...formData, rel_2: e.target.value ? parseInt(e.target.value) : null })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'zh' ? '相关文章3 (ID)' : 'Related Article 3 (ID)'}
                </label>
                <input
                  type="number"
                  value={formData.rel_3 || ''}
                  onChange={(e) => setFormData({ ...formData, rel_3: e.target.value ? parseInt(e.target.value) : null })}
                  className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.recommand}
                  onChange={(e) => setFormData({ ...formData, recommand: e.target.checked })}
                  className="w-5 h-5"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {language === 'zh' ? '推荐文章' : 'Recommended'}
                </span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.top}
                  onChange={(e) => setFormData({ ...formData, top: e.target.checked })}
                  className="w-5 h-5"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {language === 'zh' ? '置顶文章' : 'Pinned'}
                </span>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-80"
              >
                {editingBlog ? (language === 'zh' ? '更新' : 'Update') : (language === 'zh' ? '创建' : 'Create')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {language === 'zh' ? '取消' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">{language === 'zh' ? '加载中...' : 'Loading...'}</div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-sm font-bold text-black dark:text-white">ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-black dark:text-white">
                  {language === 'zh' ? '标题' : 'Title'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-black dark:text-white">
                  {language === 'zh' ? '作者' : 'Author'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-black dark:text-white">
                  {language === 'zh' ? '标签' : 'Tags'}
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-black dark:text-white">
                  {language === 'zh' ? '状态' : 'Status'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-black dark:text-white">
                  {language === 'zh' ? '操作' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    {language === 'zh' ? '暂无数据' : 'No data'}
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{blog.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      {language === 'zh' ? blog.title : blog.title_en}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{blog.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      {language === 'zh' ? blog.tags : (blog.tags_en || blog.tags)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        {blog.top && (
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-bold">
                            {language === 'zh' ? '置顶' : 'TOP'}
                          </span>
                        )}
                        {blog.recommand && (
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-bold">
                            {language === 'zh' ? '推荐' : 'REC'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => startEdit(blog)}
                        className="text-blue-600 dark:text-blue-400 hover:underline mr-4"
                      >
                        {language === 'zh' ? '编辑' : 'Edit'}
                      </button>
                      <button
                        onClick={() => blog.id && handleDelete(blog.id)}
                        className="text-red-600 dark:text-red-400 hover:underline"
                      >
                        {language === 'zh' ? '删除' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
