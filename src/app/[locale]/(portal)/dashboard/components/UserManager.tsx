"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminConfigAuth from './AdminConfigAuth';

interface FormSubmission {
  id: string;
  form_type: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  plan?: string;
  price_usd?: string;
  price_cny?: string;
  payment_method?: string;
  language: string;
  stage: string;
  email_sent: boolean;
  email_sent_at?: string;
  created_at: string;
  updated_at: string;
}

interface EmailTemplate {
  id: string;
  form_type: string;
  subject_zh: string;
  subject_en: string;
  content_zh: string;
  content_en: string;
  is_active: boolean;
}

const STAGES = [
  '面试邀约',
  '已面试',
  '资料学习',
  '一阶段',
  '二阶段',
  '考核阶段',
  '小额实盘',
  '大额实盘',
  '退出',
];

const STAGES_EN = [
  'Interview Invitation',
  'Interviewed',
  'Learning Materials',
  'Phase 1',
  'Phase 2',
  'Assessment',
  'Small Live Trading',
  'Large Live Trading',
  'Exited',
];

export default function UserManager() {
  const { language } = useLanguage();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    stage: '',
    formType: '',
    search: '',
  });

  // Email modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [emailMode, setEmailMode] = useState<'template' | 'custom'>('template');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [customContent, setCustomContent] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  // Edit/Add user modal state
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<FormSubmission | null>(null);
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    phone: '',
    form_type: 'contact',
    stage: '面试邀约',
    message: '',
    language: 'zh',
    // Propfirm specific fields
    plan: '',
    price_usd: '',
    price_cny: '',
    payment_method: 'wechat',
  });
  const [savingUser, setSavingUser] = useState(false);

  // Fetch submissions
  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/form-submissions');
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status
  useEffect(() => {
    const authenticated = localStorage.getItem('config_authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
      fetchSubmissions();
    } else {
      setLoading(false);
    }
  }, []);

  // Show auth modal if not authenticated
  if (!isAuthenticated) {
    return <AdminConfigAuth onAuthenticated={() => {
      setIsAuthenticated(true);
      fetchSubmissions();
    }} />;
  }

  // Update stage
  const handleUpdateStage = async (id: string, newStage: string) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/form-submissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage }),
      });

      if (response.ok) {
        setSubmissions(prev =>
          prev.map(s => s.id === id ? { ...s, stage: newStage } : s)
        );
      } else {
        alert(language === 'zh' ? '更新失败' : 'Update failed');
      }
    } catch (error) {
      console.error('Failed to update stage:', error);
      alert(language === 'zh' ? '更新失败' : 'Update failed');
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete submission
  const handleDelete = async (id: string) => {
    if (!confirm(language === 'zh' ? '确定要删除此记录吗？' : 'Delete this record?')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/form-submissions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id));
      } else {
        alert(language === 'zh' ? '删除失败' : 'Delete failed');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert(language === 'zh' ? '删除失败' : 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  // Resend email
  const handleResendEmail = async (id: string) => {
    if (!confirm(language === 'zh' ? '确定要重新发送邮件吗？' : 'Resend email?')) {
      return;
    }

    setUpdatingId(id);
    try {
      const response = await fetch(`/api/form-submissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_sent: false, email_sent_at: null }),
      });

      if (response.ok) {
        setSubmissions(prev =>
          prev.map(s => s.id === id ? { ...s, email_sent: false, email_sent_at: undefined } : s)
        );
        alert(language === 'zh' ? '已标记为待发送，将在下次定时任务中发送' : 'Marked for resend in next cron job');
      } else {
        alert(language === 'zh' ? '操作失败' : 'Operation failed');
      }
    } catch (error) {
      console.error('Failed to resend:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  // Open user modal for editing
  const handleEditUser = (submission: FormSubmission) => {
    setEditingUser(submission);
    setUserFormData({
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      form_type: submission.form_type,
      stage: submission.stage,
      message: submission.message || '',
      language: submission.language,
      plan: submission.plan || '',
      price_usd: submission.price_usd || '',
      price_cny: submission.price_cny || '',
      payment_method: submission.payment_method || 'wechat',
    });
    setShowUserModal(true);
  };

  // Open user modal for adding new
  const handleAddUser = () => {
    setEditingUser(null);
    setUserFormData({
      name: '',
      email: '',
      phone: '',
      form_type: 'contact',
      stage: '面试邀约',
      message: '',
      language: 'zh',
      plan: '',
      price_usd: '',
      price_cny: '',
      payment_method: 'wechat',
    });
    setShowUserModal(true);
  };

  // Save user (create or update)
  const handleSaveUser = async () => {
    if (!userFormData.name || !userFormData.email) {
      alert(language === 'zh' ? '请填写姓名和邮箱' : 'Please fill in name and email');
      return;
    }

    setSavingUser(true);
    try {
      if (editingUser) {
        // Update existing user
        const response = await fetch(`/api/form-submissions/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: userFormData.name,
            email: userFormData.email,
            phone: userFormData.phone,
          }),
        });

        if (response.ok) {
          setSubmissions(prev =>
            prev.map(s => s.id === editingUser.id
              ? { ...s, name: userFormData.name, email: userFormData.email, phone: userFormData.phone }
              : s
            )
          );
          setShowUserModal(false);
          alert(language === 'zh' ? '更新成功' : 'Updated successfully');
        } else {
          alert(language === 'zh' ? '更新失败' : 'Update failed');
        }
      } else {
        // Create new user
        const submitData: Record<string, any> = {
          formType: userFormData.form_type,
          name: userFormData.name,
          email: userFormData.email,
          phone: userFormData.phone,
          message: userFormData.message,
          language: userFormData.language,
        };

        // Add propfirm specific data
        if (userFormData.form_type === 'propfirm') {
          submitData.plan = userFormData.plan;
          submitData.priceUsd = userFormData.price_usd;
          submitData.priceCny = userFormData.price_cny;
          submitData.paymentMethod = userFormData.payment_method;
        }

        const response = await fetch('/api/form-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData),
        });

        if (response.ok) {
          await fetchSubmissions();
          setShowUserModal(false);
          alert(language === 'zh' ? '添加成功' : 'Added successfully');
        } else {
          alert(language === 'zh' ? '添加失败' : 'Add failed');
        }
      }
    } catch (error) {
      console.error('Failed to save user:', error);
      alert(language === 'zh' ? '操作失败' : 'Operation failed');
    } finally {
      setSavingUser(false);
    }
  };

  // Open email modal
  const handleOpenEmailModal = async (submission: FormSubmission) => {
    setSelectedSubmission(submission);
    setEmailMode('template');
    setSelectedTemplateId('');
    setCustomSubject('');
    setCustomContent('');
    setShowEmailModal(true);

    // Fetch templates
    try {
      const response = await fetch('/api/email-templates');
      if (response.ok) {
        const data = await response.json();
        setEmailTemplates(data.filter((t: EmailTemplate) => t.is_active));
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    }
  };

  // Send email
  const handleSendEmail = async () => {
    if (!selectedSubmission) return;

    if (emailMode === 'template' && !selectedTemplateId) {
      alert(language === 'zh' ? '请选择模板' : 'Please select a template');
      return;
    }

    if (emailMode === 'custom' && (!customSubject || !customContent)) {
      alert(language === 'zh' ? '请填写主题和内容' : 'Please fill in subject and content');
      return;
    }

    setSendingEmail(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: selectedSubmission.id,
          useTemplate: emailMode === 'template',
          templateId: emailMode === 'template' ? selectedTemplateId : undefined,
          customSubject: emailMode === 'custom' ? customSubject : undefined,
          customContent: emailMode === 'custom' ? customContent : undefined,
        }),
      });

      if (response.ok) {
        // Update local state
        setSubmissions(prev =>
          prev.map(s =>
            s.id === selectedSubmission.id
              ? { ...s, email_sent: true, email_sent_at: new Date().toISOString() }
              : s
          )
        );
        setShowEmailModal(false);
        alert(language === 'zh' ? '邮件发送成功' : 'Email sent successfully');
      } else {
        const error = await response.json();
        alert(error.error || (language === 'zh' ? '发送失败' : 'Send failed'));
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      alert(language === 'zh' ? '发送失败' : 'Send failed');
    } finally {
      setSendingEmail(false);
    }
  };

  // Filter submissions
  const filteredSubmissions = submissions.filter(s => {
    if (filter.stage && s.stage !== filter.stage) return false;
    if (filter.formType && s.form_type !== filter.formType) return false;
    if (filter.search) {
      const search = filter.search.toLowerCase();
      return (
        s.name.toLowerCase().includes(search) ||
        s.email.toLowerCase().includes(search) ||
        s.phone.includes(search)
      );
    }
    return true;
  });

  // Get unique form types
  const formTypes = [...new Set(submissions.map(s => s.form_type))];

  // Format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get form type label
  const getFormTypeLabel = (type: string) => {
    const labels: Record<string, { zh: string; en: string }> = {
      interview: { zh: '面试预约', en: 'Interview' },
      contact: { zh: '联系咨询', en: 'Contact' },
      propfirm: { zh: '自营交易', en: 'PropFirm' },
      membership: { zh: '会员咨询', en: 'Membership' },
    };
    return labels[type]?.[language] || type;
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-black dark:text-white mb-2">
          {language === 'zh' ? '用户管理' : 'User Management'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'zh'
            ? `共 ${submissions.length} 条记录，已筛选 ${filteredSubmissions.length} 条`
            : `Total ${submissions.length} records, filtered ${filteredSubmissions.length}`}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder={language === 'zh' ? '搜索姓名/邮箱/电话...' : 'Search name/email/phone...'}
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
        <select
          value={filter.stage}
          onChange={(e) => setFilter({ ...filter, stage: e.target.value })}
          className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <option value="">{language === 'zh' ? '所有阶段' : 'All Stages'}</option>
          {STAGES.map((stage, idx) => (
            <option key={stage} value={stage}>
              {language === 'zh' ? stage : STAGES_EN[idx]}
            </option>
          ))}
        </select>
        <select
          value={filter.formType}
          onChange={(e) => setFilter({ ...filter, formType: e.target.value })}
          className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <option value="">{language === 'zh' ? '所有类型' : 'All Types'}</option>
          {formTypes.map(type => (
            <option key={type} value={type}>{getFormTypeLabel(type)}</option>
          ))}
        </select>
        <button
          onClick={() => fetchSubmissions()}
          disabled={loading}
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50"
        >
          {loading ? (language === 'zh' ? '刷新中...' : 'Refreshing...') : (language === 'zh' ? '刷新' : 'Refresh')}
        </button>
        <button
          onClick={handleAddUser}
          className="px-4 py-2 bg-green-600 text-white font-bold hover:bg-green-700"
        >
          {language === 'zh' ? '新增用户' : 'Add User'}
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">
          {language === 'zh' ? '加载中...' : 'Loading...'}
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {language === 'zh' ? '暂无数据' : 'No data'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-bold">
                  {language === 'zh' ? '姓名' : 'Name'}
                </th>
                <th className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-bold">
                  {language === 'zh' ? '邮箱' : 'Email'}
                </th>
                <th className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-bold">
                  {language === 'zh' ? '电话' : 'Phone'}
                </th>
                <th className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-bold">
                  {language === 'zh' ? '类型' : 'Type'}
                </th>
                <th className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-bold">
                  {language === 'zh' ? '详情' : 'Details'}
                </th>
                <th className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-bold">
                  {language === 'zh' ? '阶段' : 'Stage'}
                </th>
                <th className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-bold">
                  {language === 'zh' ? '邮件状态' : 'Email Status'}
                </th>
                <th className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-bold">
                  {language === 'zh' ? '提交时间' : 'Submitted'}
                </th>
                <th className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-bold">
                  {language === 'zh' ? '操作' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-sm">
                    <div className="font-medium">{submission.name}</div>
                  </td>
                  <td className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-sm">
                    <a href={`mailto:${submission.email}`} className="text-blue-600 hover:underline">
                      {submission.email}
                    </a>
                  </td>
                  <td className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-sm">
                    {submission.phone}
                  </td>
                  <td className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-sm">
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs">
                      {getFormTypeLabel(submission.form_type)}
                    </span>
                  </td>
                  <td className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-sm">
                    <div className="max-w-xs">
                      {/* Show propfirm data */}
                      {submission.form_type === 'propfirm' && submission.plan && (
                        <div className="text-xs mb-1">
                          <span className="font-medium">{language === 'zh' ? '计划：' : 'Plan: '}</span>
                          {submission.plan}
                          <br />
                          <span className="font-medium">{language === 'zh' ? '价格：' : 'Price: '}</span>
                          {submission.price_cny} / {submission.price_usd}
                          {submission.payment_method && (
                            <>
                              <br />
                              <span className="font-medium">{language === 'zh' ? '支付：' : 'Pay: '}</span>
                              {submission.payment_method === 'wechat' ? '微信' :
                               submission.payment_method === 'alipay' ? '支付宝' :
                               submission.payment_method === 'bank' ? '银行转账' : submission.payment_method}
                            </>
                          )}
                        </div>
                      )}
                      {/* Show message */}
                      {submission.message && (
                        <div className="text-xs text-gray-600 dark:text-gray-400 truncate" title={submission.message}>
                          {submission.message.length > 50
                            ? submission.message.substring(0, 50) + '...'
                            : submission.message}
                        </div>
                      )}
                      {/* Show if no details */}
                      {!submission.plan && !submission.message && (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </div>
                  </td>
                  <td className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-sm">
                    <select
                      value={submission.stage}
                      onChange={(e) => handleUpdateStage(submission.id, e.target.value)}
                      disabled={updatingId === submission.id}
                      className="px-2 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm disabled:opacity-50"
                    >
                      {STAGES.map((stage, idx) => (
                        <option key={stage} value={stage}>
                          {language === 'zh' ? stage : STAGES_EN[idx]}
                        </option>
                      ))}
                    </select>
                    {updatingId === submission.id && (
                      <span className="ml-2 text-xs text-gray-500">...</span>
                    )}
                  </td>
                  <td className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-sm">
                    {submission.email_sent ? (
                      <span className="text-green-600 dark:text-green-400">
                        {language === 'zh' ? '已发送' : 'Sent'}
                        {submission.email_sent_at && (
                          <span className="block text-xs text-gray-500">
                            {formatDate(submission.email_sent_at)}
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="text-yellow-600 dark:text-yellow-400">
                        {language === 'zh' ? '待发送' : 'Pending'}
                      </span>
                    )}
                  </td>
                  <td className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-sm">
                    {formatDate(submission.created_at)}
                  </td>
                  <td className="border-2 border-gray-300 dark:border-gray-600 px-4 py-3 text-sm">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEditUser(submission)}
                        className="px-2 py-1 text-xs bg-yellow-600 text-white hover:bg-yellow-700"
                      >
                        {language === 'zh' ? '编辑' : 'Edit'}
                      </button>
                      <button
                        onClick={() => handleOpenEmailModal(submission)}
                        className="px-2 py-1 text-xs bg-green-600 text-white hover:bg-green-700"
                      >
                        {language === 'zh' ? '发邮件' : 'Email'}
                      </button>
                      {submission.email_sent && (
                        <button
                          onClick={() => handleResendEmail(submission.id)}
                          disabled={updatingId === submission.id}
                          className="px-2 py-1 text-xs bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                          {updatingId === submission.id
                            ? '...'
                            : (language === 'zh' ? '重发' : 'Resend')}
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(submission.id)}
                        disabled={deletingId === submission.id}
                        className="px-2 py-1 text-xs bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                      >
                        {deletingId === submission.id
                          ? '...'
                          : (language === 'zh' ? '删除' : 'Delete')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Send Email Modal */}
      {showEmailModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">
                  {language === 'zh' ? '发送邮件' : 'Send Email'}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === 'zh' ? '收件人：' : 'To: '}{selectedSubmission.name} ({selectedSubmission.email})
                </p>
              </div>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Mode Toggle */}
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setEmailMode('template')}
                  className={`px-4 py-2 text-sm font-medium ${
                    emailMode === 'template'
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {language === 'zh' ? '使用模板' : 'Use Template'}
                </button>
                <button
                  onClick={() => setEmailMode('custom')}
                  className={`px-4 py-2 text-sm font-medium ${
                    emailMode === 'custom'
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {language === 'zh' ? '自定义内容' : 'Custom Content'}
                </button>
              </div>

              {emailMode === 'template' ? (
                /* Template Selection */
                <div>
                  <label className="block text-sm font-bold mb-2">
                    {language === 'zh' ? '选择模板' : 'Select Template'}
                  </label>
                  {emailTemplates.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      {language === 'zh' ? '暂无可用模板' : 'No templates available'}
                    </p>
                  ) : (
                    <select
                      value={selectedTemplateId}
                      onChange={(e) => setSelectedTemplateId(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    >
                      <option value="">{language === 'zh' ? '请选择模板' : 'Select template'}</option>
                      {emailTemplates.map(template => (
                        <option key={template.id} value={template.id}>
                          {template.form_type} - {language === 'zh' ? template.subject_zh : template.subject_en}
                        </option>
                      ))}
                    </select>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    {language === 'zh'
                      ? '模板中的变量将自动替换为用户信息'
                      : 'Variables in template will be replaced with user info'}
                  </p>
                </div>
              ) : (
                /* Custom Content */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      {language === 'zh' ? '邮件主题' : 'Subject'}
                    </label>
                    <input
                      type="text"
                      value={customSubject}
                      onChange={(e) => setCustomSubject(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      placeholder={language === 'zh' ? '请输入邮件主题' : 'Enter email subject'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      {language === 'zh' ? '邮件内容 (支持 HTML)' : 'Content (HTML supported)'}
                    </label>
                    <textarea
                      value={customContent}
                      onChange={(e) => setCustomContent(e.target.value)}
                      rows={10}
                      className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 font-mono text-sm"
                      placeholder={language === 'zh' ? '请输入邮件内容...' : 'Enter email content...'}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {language === 'zh' ? '取消' : 'Cancel'}
              </button>
              <button
                onClick={handleSendEmail}
                disabled={sendingEmail}
                className="px-4 py-2 bg-green-600 text-white font-bold hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                {sendingEmail ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {language === 'zh' ? '发送中...' : 'Sending...'}
                  </>
                ) : (
                  language === 'zh' ? '发送邮件' : 'Send Email'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Add User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-bold text-lg">
                {editingUser
                  ? (language === 'zh' ? '编辑用户' : 'Edit User')
                  : (language === 'zh' ? '新增用户' : 'Add User')}
              </h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">
                  {language === 'zh' ? '姓名' : 'Name'} *
                </label>
                <input
                  type="text"
                  value={userFormData.name}
                  onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  placeholder={language === 'zh' ? '请输入姓名' : 'Enter name'}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">
                  {language === 'zh' ? '邮箱' : 'Email'} *
                </label>
                <input
                  type="email"
                  value={userFormData.email}
                  onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  placeholder={language === 'zh' ? '请输入邮箱' : 'Enter email'}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">
                  {language === 'zh' ? '电话' : 'Phone'}
                </label>
                <input
                  type="text"
                  value={userFormData.phone}
                  onChange={(e) => setUserFormData({ ...userFormData, phone: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  placeholder={language === 'zh' ? '请输入电话' : 'Enter phone'}
                />
              </div>

              {/* Only show these fields when adding new user */}
              {!editingUser && (
                <>
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      {language === 'zh' ? '类型' : 'Type'}
                    </label>
                    <select
                      value={userFormData.form_type}
                      onChange={(e) => setUserFormData({ ...userFormData, form_type: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    >
                      <option value="interview">{language === 'zh' ? '面试预约' : 'Interview'}</option>
                      <option value="contact">{language === 'zh' ? '联系咨询' : 'Contact'}</option>
                      <option value="propfirm">{language === 'zh' ? '自营交易' : 'PropFirm'}</option>
                      <option value="membership">{language === 'zh' ? '会员咨询' : 'Membership'}</option>
                    </select>
                  </div>

                  {/* Propfirm specific fields */}
                  {userFormData.form_type === 'propfirm' && (
                    <>
                      <div>
                        <label className="block text-sm font-bold mb-2">
                          {language === 'zh' ? '计划' : 'Plan'}
                        </label>
                        <select
                          value={userFormData.plan}
                          onChange={(e) => setUserFormData({ ...userFormData, plan: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        >
                          <option value="">{language === 'zh' ? '请选择计划' : 'Select plan'}</option>
                          <option value="$10K">$10K</option>
                          <option value="$25K">$25K</option>
                          <option value="$50K">$50K</option>
                          <option value="$100K">$100K</option>
                          <option value="$200K">$200K</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold mb-2">
                            {language === 'zh' ? '美元价格' : 'USD Price'}
                          </label>
                          <input
                            type="text"
                            value={userFormData.price_usd}
                            onChange={(e) => setUserFormData({ ...userFormData, price_usd: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                            placeholder="$99"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2">
                            {language === 'zh' ? '人民币价格' : 'CNY Price'}
                          </label>
                          <input
                            type="text"
                            value={userFormData.price_cny}
                            onChange={(e) => setUserFormData({ ...userFormData, price_cny: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                            placeholder="¥699"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2">
                          {language === 'zh' ? '支付方式' : 'Payment Method'}
                        </label>
                        <select
                          value={userFormData.payment_method}
                          onChange={(e) => setUserFormData({ ...userFormData, payment_method: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        >
                          <option value="wechat">{language === 'zh' ? '微信支付' : 'WeChat Pay'}</option>
                          <option value="alipay">{language === 'zh' ? '支付宝' : 'Alipay'}</option>
                          <option value="bank">{language === 'zh' ? '银行转账' : 'Bank Transfer'}</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-bold mb-2">
                      {language === 'zh' ? '语言' : 'Language'}
                    </label>
                    <select
                      value={userFormData.language}
                      onChange={(e) => setUserFormData({ ...userFormData, language: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    >
                      <option value="zh">中文</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      {language === 'zh' ? '备注' : 'Message'}
                    </label>
                    <textarea
                      value={userFormData.message}
                      onChange={(e) => setUserFormData({ ...userFormData, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      placeholder={language === 'zh' ? '可选备注信息' : 'Optional message'}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {language === 'zh' ? '取消' : 'Cancel'}
              </button>
              <button
                onClick={handleSaveUser}
                disabled={savingUser}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50"
              >
                {savingUser
                  ? (language === 'zh' ? '保存中...' : 'Saving...')
                  : (language === 'zh' ? '保存' : 'Save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
