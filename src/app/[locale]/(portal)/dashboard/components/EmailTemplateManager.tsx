"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminConfigAuth from './AdminConfigAuth';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { TextStyle, Color, FontSize } from '@tiptap/extension-text-style';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';

interface EmailTemplate {
  id: string;
  form_type: string;
  subject_zh: string;
  subject_en: string;
  content_zh: string;
  content_en: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const DEFAULT_FORM_TYPES = ['interview', 'contact', 'propfirm', 'membership'];

const FORM_TYPES = [
  { value: 'interview', label_zh: '面试预约', label_en: 'Interview' },
  { value: 'contact', label_zh: '联系咨询', label_en: 'Contact' },
  { value: 'propfirm', label_zh: '自营交易', label_en: 'PropFirm' },
  { value: 'membership', label_zh: '会员咨询', label_en: 'Membership' },
];

const TEMPLATE_VARIABLES = [
  { var: '{{name}}', desc_zh: '用户姓名', desc_en: 'User name' },
  { var: '{{email}}', desc_zh: '用户邮箱', desc_en: 'User email' },
  { var: '{{phone}}', desc_zh: '用户电话', desc_en: 'User phone' },
  { var: '{{plan}}', desc_zh: '选择的计划', desc_en: 'Selected plan' },
  { var: '{{price}}', desc_zh: '价格信息', desc_en: 'Price info' },
  { var: '{{date}}', desc_zh: '提交日期', desc_en: 'Submission date' },
];

// Rich Text Editor Toolbar Component
function EditorToolbar({ editor }: { editor: any }) {
  if (!editor) return null;

  const addImage = () => {
    const choice = window.confirm('Click OK to enter image URL, or Cancel to upload a file');

    if (choice) {
      // URL input
      const url = window.prompt('Enter image URL:');
      if (url) {
        const width = window.prompt('Enter image width (e.g., 300, 50%, or leave empty for auto):', '');
        editor.chain().focus().setImage({
          src: url,
          ...(width ? { width } : {})
        }).run();
      }
    } else {
      // File upload for base64
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result as string;
            const width = window.prompt('Enter image width (e.g., 300, 50%, or leave empty for auto):', '');
            editor.chain().focus().setImage({
              src: base64,
              ...(width ? { width } : {})
            }).run();
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
  };

  const resizeImage = () => {
    const width = window.prompt('Enter new image width (e.g., 300, 50%, 100%):', '');
    if (width) {
      editor.chain().focus().updateAttributes('image', { width }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter link URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  const setFontSize = (size: string) => {
    editor.chain().focus().setFontSize(size).run();
  };

  const colors = [
    { value: '#000000', label: 'Black' },
    { value: '#374151', label: 'Gray' },
    { value: '#DC2626', label: 'Red' },
    { value: '#EA580C', label: 'Orange' },
    { value: '#CA8A04', label: 'Yellow' },
    { value: '#16A34A', label: 'Green' },
    { value: '#2563EB', label: 'Blue' },
    { value: '#7C3AED', label: 'Purple' },
  ];

  const fontSizes = [
    { value: '12px', label: '12' },
    { value: '14px', label: '14' },
    { value: '16px', label: '16' },
    { value: '18px', label: '18' },
    { value: '20px', label: '20' },
    { value: '24px', label: '24' },
    { value: '28px', label: '28' },
    { value: '32px', label: '32' },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-300 dark:border-gray-600 bg-[#0a0a0a]">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 text-sm ${editor.isActive('bold') ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white'}`}
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 text-sm italic ${editor.isActive('italic') ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white'}`}
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-2 py-1 text-sm line-through ${editor.isActive('strike') ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white'}`}
      >
        S
      </button>
      <span className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

      {/* Font Size */}
      <select
        onChange={(e) => setFontSize(e.target.value)}
        className="px-1 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-black dark:text-white border-0"
        defaultValue=""
      >
        <option value="" disabled>Size</option>
        {fontSizes.map(size => (
          <option key={size.value} value={size.value}>{size.label}</option>
        ))}
      </select>

      {/* Color Picker */}
      <select
        onChange={(e) => setColor(e.target.value)}
        className="px-1 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-black dark:text-white border-0"
        defaultValue=""
      >
        <option value="" disabled>Color</option>
        {colors.map(color => (
          <option key={color.value} value={color.value} style={{ color: color.value }}>
            {color.label}
          </option>
        ))}
      </select>

      <span className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 text-sm ${editor.isActive('heading', { level: 1 }) ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white'}`}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white'}`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-2 py-1 text-sm ${editor.isActive('heading', { level: 3 }) ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white'}`}
      >
        H3
      </button>
      <span className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 text-sm ${editor.isActive('bulletList') ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white'}`}
      >
        • List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-2 py-1 text-sm ${editor.isActive('orderedList') ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white'}`}
      >
        1. List
      </button>
      <span className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
      <button
        type="button"
        onClick={addLink}
        className={`px-2 py-1 text-sm ${editor.isActive('link') ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white'}`}
      >
        Link
      </button>
      <button
        type="button"
        onClick={addImage}
        className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-black dark:text-white"
      >
        Image
      </button>
      <button
        type="button"
        onClick={resizeImage}
        className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-black dark:text-white"
        title="Resize selected image"
      >
        Resize
      </button>
      <span className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-2 py-1 text-sm ${editor.isActive('blockquote') ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white'}`}
      >
        Quote
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-black dark:text-white"
        title="Insert horizontal rule / divider"
      >
        ― HR
      </button>
    </div>
  );
}

// Rich Text Editor Component
function RichTextEditor({ content, onChange, placeholder }: { content: string; onChange: (html: string) => void; placeholder?: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      BulletList,
      OrderedList,
      ListItem,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto',
        },
      }),
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
      FontSize,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none text-black',
      },
    },
  });

  // Update content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="border-2 border-gray-300 dark:border-gray-600 bg-white">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default function EmailTemplateManager() {
  const { language } = useLanguage();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    form_type: '',
    subject_zh: '',
    subject_en: '',
    content_zh: '',
    content_en: '',
    is_active: true,
  });

  // Fetch templates
  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/email-templates');
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status
  useEffect(() => {
    const authenticated = localStorage.getItem('config_authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
      fetchTemplates();
    } else {
      setLoading(false);
    }
  }, []);

  // Show auth modal if not authenticated
  if (!isAuthenticated) {
    return <AdminConfigAuth onAuthenticated={() => {
      setIsAuthenticated(true);
      fetchTemplates();
    }} />;
  }

  // Handle form submit (only for editing)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate) return;

    setSubmitting(true);

    try {
      const response = await fetch(`/api/email-templates/${editingTemplate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchTemplates();
        resetForm();
        alert(language === 'zh' ? '保存成功' : 'Saved successfully');
      } else {
        const error = await response.json();
        alert(error.error || (language === 'zh' ? '保存失败' : 'Save failed'));
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert(language === 'zh' ? '保存失败' : 'Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle edit
  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setFormData({
      form_type: template.form_type,
      subject_zh: template.subject_zh,
      subject_en: template.subject_en,
      content_zh: template.content_zh,
      content_en: template.content_en,
      is_active: template.is_active,
    });
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setEditingTemplate(null);
    setFormData({
      form_type: '',
      subject_zh: '',
      subject_en: '',
      content_zh: '',
      content_en: '',
      is_active: true,
    });
    setShowForm(false);
  };

  // Insert variable into content
  const insertVariable = (variable: string, field: 'content_zh' | 'content_en') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field] + variable,
    }));
  };

  // Get form type label
  const getFormTypeLabel = (type: string) => {
    const found = FORM_TYPES.find(t => t.value === type);
    return found ? (language === 'zh' ? found.label_zh : found.label_en) : type;
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white mb-2">
          {language === 'zh' ? '邮件模板' : 'Email Templates'}
        </h1>
        <p className="text-gray-400">
          {language === 'zh'
            ? '管理自动发送邮件的模板内容（4种默认模板不可删除）'
            : 'Manage email templates for automated sending (4 default templates cannot be deleted)'}
        </p>
      </div>

      {/* Form */}
      {showForm && editingTemplate && (
        <div className="mb-8 p-6 bg-[#0a0a0a] border-2 border-gray-300 dark:border-gray-600">
          <h2 className="text-xl font-bold mb-4 text-white">
            {language === 'zh' ? '编辑模板' : 'Edit Template'}: {getFormTypeLabel(editingTemplate.form_type)}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-white">
                  {language === 'zh' ? '邮件主题（中文）' : 'Subject (Chinese)'} *
                </label>
                <input
                  type="text"
                  value={formData.subject_zh}
                  onChange={(e) => setFormData({ ...formData, subject_zh: e.target.value })}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-white">
                  {language === 'zh' ? '邮件主题（英文）' : 'Subject (English)'} *
                </label>
                <input
                  type="text"
                  value={formData.subject_en}
                  onChange={(e) => setFormData({ ...formData, subject_en: e.target.value })}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-black dark:text-white"
                />
              </div>
            </div>

            {/* Template Variables */}
            <div className="p-4 bg-gray-100 dark:bg-[#0a0a0a]">
              <p className="text-sm font-bold mb-2 text-black dark:text-white">
                {language === 'zh' ? '可用变量（点击插入）：' : 'Available Variables (click to insert):'}
              </p>
              <div className="flex flex-wrap gap-2">
                {TEMPLATE_VARIABLES.map(v => (
                  <span key={v.var} className="text-xs bg-[#0a0a0a] px-2 py-1 text-gray-300">
                    <code>{v.var}</code> - {language === 'zh' ? v.desc_zh : v.desc_en}
                  </span>
                ))}
              </div>
            </div>

            {/* Content - Chinese */}
            <div>
              <label className="block text-sm font-bold mb-1 text-white">
                {language === 'zh' ? '邮件内容（中文）' : 'Content (Chinese)'} *
              </label>
              <div className="mb-2 flex flex-wrap gap-1">
                {TEMPLATE_VARIABLES.map(v => (
                  <button
                    key={v.var}
                    type="button"
                    onClick={() => insertVariable(v.var, 'content_zh')}
                    className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    {v.var}
                  </button>
                ))}
              </div>
              <RichTextEditor
                content={formData.content_zh}
                onChange={(html) => setFormData({ ...formData, content_zh: html })}
                placeholder={language === 'zh' ? '输入中文邮件内容...' : 'Enter Chinese email content...'}
              />
            </div>

            {/* Content - English */}
            <div>
              <label className="block text-sm font-bold mb-1 text-white">
                {language === 'zh' ? '邮件内容（英文）' : 'Content (English)'} *
              </label>
              <div className="mb-2 flex flex-wrap gap-1">
                {TEMPLATE_VARIABLES.map(v => (
                  <button
                    key={v.var}
                    type="button"
                    onClick={() => insertVariable(v.var, 'content_en')}
                    className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    {v.var}
                  </button>
                ))}
              </div>
              <RichTextEditor
                content={formData.content_en}
                onChange={(html) => setFormData({ ...formData, content_en: html })}
                placeholder={language === 'zh' ? '输入英文邮件内容...' : 'Enter English email content...'}
              />
            </div>

            {/* Active */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="is_active" className="text-sm text-white">
                {language === 'zh' ? '启用此模板' : 'Enable this template'}
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-[#0a0a0a] dark:hover:bg-gray-200 disabled:opacity-50"
              >
                {submitting
                  ? (language === 'zh' ? '保存中...' : 'Saving...')
                  : (language === 'zh' ? '保存' : 'Save')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border-2 border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#0a0a0a]"
              >
                {language === 'zh' ? '取消' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Template List */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">
          {language === 'zh' ? '加载中...' : 'Loading...'}
        </div>
      ) : templates.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          {language === 'zh' ? '暂无模板，请在数据库中创建默认模板' : 'No templates, please create default templates in database'}
        </div>
      ) : (
        <div className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`p-6 border-2 ${template.is_active
                ? 'border-gray-300 dark:border-gray-600 bg-[#0a0a0a]'
                : 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-black opacity-60'
                }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                    {getFormTypeLabel(template.form_type)}
                    {!template.is_active && (
                      <span className="text-xs bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-2 py-1">
                        {language === 'zh' ? '已禁用' : 'Disabled'}
                      </span>
                    )}
                    {DEFAULT_FORM_TYPES.includes(template.form_type) && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1">
                        {language === 'zh' ? '默认' : 'Default'}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {language === 'zh' ? template.subject_zh : template.subject_en}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPreviewContent(
                      language === 'zh' ? template.content_zh : template.content_en
                    )}
                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#0a0a0a]"
                  >
                    {language === 'zh' ? '预览' : 'Preview'}
                  </button>
                  <button
                    onClick={() => handleEdit(template)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {language === 'zh' ? '编辑' : 'Edit'}
                  </button>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {language === 'zh' ? '更新时间：' : 'Updated: '}
                {new Date(template.updated_at).toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewContent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-bold text-white">{language === 'zh' ? '邮件预览' : 'Email Preview'}</h3>
              <button
                onClick={() => setPreviewContent(null)}
                className="text-gray-400 hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div
              className="p-6 prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: previewContent }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
