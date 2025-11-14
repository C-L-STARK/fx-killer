"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBrand } from '@/contexts/BrandContext';
import { ContactMethod, PartnerBroker, PropFirm } from '@/lib/brand-config';
import ContactMethodIcon, { BUILTIN_ICON_OPTIONS } from '@/components/brand/ContactMethodIcon';
import { Plus, Trash2, MoveUp, MoveDown } from 'lucide-react';

type TabType = 'view' | 'basic' | 'contact' | 'referrals' | 'brokers' | 'propfirms' | 'banners' | 'seo' | 'presets';

export default function BrandConfigManager() {
  const { language } = useLanguage();
  const brand = useBrand();
  const isZh = language === 'zh';

  const [activeTab, setActiveTab] = useState<TabType>('view');
  const [presets, setPresets] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  // 基本信息表单
  const [basicForm, setBasicForm] = useState({
    brand_name_zh: brand.brandName.zh,
    brand_name_en: brand.brandName.en,
    brand_domain: brand.domain,
    contact_email: brand.globalEmail,
  });

  // 联系方式表单
  const [contactMethods, setContactMethods] = useState<ContactMethod[]>(brand.contactMethods);

  // 推荐码表单
  const [referralCodes, setReferralCodes] = useState(brand.referralCodes);

  // 合作经纪商表单
  const [partnerBrokers, setPartnerBrokers] = useState<PartnerBroker[]>(brand.partnerBrokers);

  // 自营交易公司表单
  const [propFirms, setPropFirms] = useState<PropFirm[]>(brand.propFirms);

  // Footer 横幅表单
  const [footerBanners, setFooterBanners] = useState(brand.footerBanners);
  const [showBanners, setShowBanners] = useState(brand.showFooterBanners);

  // SEO 配置表单
  const [seoForm, setSeoForm] = useState({
    title_template_zh: brand.seo.titleTemplate?.zh || '{title}丨汇刃丨{keywords}',
    title_template_en: brand.seo.titleTemplate?.en || '{title}丨FX Killer丨{keywords}',
    description_zh: brand.seo.description?.zh || '',
    description_en: brand.seo.description?.en || '',
    keywords_zh: brand.seo.keywords?.zh?.join(', ') || '',
    keywords_en: brand.seo.keywords?.en?.join(', ') || '',
    og_image: brand.seo.ogImage || '/brand/og-image.png',
  });

  useEffect(() => {
    loadPresets();
  }, []);

  const loadPresets = async () => {
    try {
      const response = await fetch('/api/brand/presets');
      if (response.ok) {
        const data = await response.json();
        setPresets(data.presets || []);
      }
    } catch (error) {
      console.error('Failed to load presets:', error);
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  // 刷新配置 - 重新加载数据而不是刷新页面
  const refreshConfig = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/brand/config');
      if (response.ok) {
        const { config } = await response.json();

        // 更新所有表单状态
        setBasicForm({
          brand_name_zh: config.brand_name_zh,
          brand_name_en: config.brand_name_en,
          brand_domain: config.brand_domain,
          contact_email: config.contact_email,
        });
        setContactMethods(config.contact_methods || []);
        setReferralCodes(config.referral_codes || []);
        setPartnerBrokers(config.partner_brokers || []);
        setPropFirms(config.prop_firms || []);
        setFooterBanners(config.footer_banners || []);
        setShowBanners(config.show_footer_banners ?? true);
        setSeoForm({
          title_template_zh: config.seo_title_template_zh || '{title}丨汇刃丨{keywords}',
          title_template_en: config.seo_title_template_en || '{title}丨FX Killer丨{keywords}',
          description_zh: config.seo_description_zh || '',
          description_en: config.seo_description_en || '',
          keywords_zh: (config.seo_keywords_zh || []).join(', '),
          keywords_en: (config.seo_keywords_en || []).join(', '),
          og_image: config.seo_og_image_url || '/brand/og-image.png',
        });

        showMessage(isZh ? '✅ 配置已刷新' : '✅ Config refreshed', 'success');
      } else {
        showMessage(isZh ? '❌ 刷新失败' : '❌ Refresh failed', 'error');
      }
    } catch (error) {
      showMessage(isZh ? '❌ 刷新失败' : '❌ Refresh failed', 'error');
    } finally {
      setRefreshing(false);
    }
  };

  // 保存基本信息
  const saveBasicInfo = async () => {
    if (!confirm(isZh ? '确定保存基本信息？' : 'Save basic information?')) return;

    setLoading(true);
    try {
      const response = await fetch('/api/brand/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(basicForm),
      });

      if (response.ok) {
        showMessage(isZh ? '✅ 基本信息已保存' : '✅ Basic info saved', 'success');
      } else {
        showMessage(isZh ? '❌ 保存失败' : '❌ Save failed', 'error');
      }
    } catch (error) {
      showMessage(isZh ? '❌ 保存失败' : '❌ Save failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 保存联系方式
  const saveContactMethods = async () => {
    if (!confirm(isZh ? '确定保存联系方式配置？' : 'Save contact methods?')) return;

    setLoading(true);
    try {
      // 清理数据：移除空字段和未定义值
      const cleanedMethods = contactMethods.map(method => {
        const cleaned: any = {
          icon: {
            type: method.icon.type,
          },
          name_zh: method.name_zh || '',
          name_en: method.name_en || '',
          value: method.value || '',
          action: method.action,
          enabled: method.enabled,
          sort_order: method.sort_order,
        };

        // 根据图标类型添加对应字段
        if (method.icon.type === 'builtin' || method.icon.type === 'emoji') {
          cleaned.icon.value = method.icon.value || '';
        } else if (method.icon.type === 'url') {
          cleaned.icon.url_light = method.icon.url_light || '';
          cleaned.icon.url_dark = method.icon.url_dark || '';
        }

        // 如果是 modal 操作，添加 modal_content
        if (method.action === 'modal' && method.modal_content) {
          cleaned.modal_content = method.modal_content;
        }

        return cleaned;
      });

      const response = await fetch('/api/brand/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact_methods: cleanedMethods }),
      });

      if (response.ok) {
        showMessage(isZh ? '✅ 联系方式已保存' : '✅ Contact methods saved', 'success');
      } else {
        const errorData = await response.json();
        console.error('Save error:', errorData);
        showMessage(`${isZh ? '❌ 保存失败' : '❌ Save failed'}: ${errorData.error || 'Unknown error'}`, 'error');
      }
    } catch (error) {
      console.error('Failed to save contact methods:', error);
      showMessage(isZh ? '❌ 保存失败' : '❌ Save failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 保存推荐码
  const saveReferralCodes = async () => {
    if (!confirm(isZh ? '确定保存推荐码配置？' : 'Save referral codes?')) return;

    setLoading(true);
    try {
      const response = await fetch('/api/brand/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referral_codes: referralCodes }),
      });

      if (response.ok) {
        showMessage(isZh ? '✅ 推荐码已保存' : '✅ Referral codes saved', 'success');
      } else {
        showMessage(isZh ? '❌ 保存失败' : '❌ Save failed', 'error');
      }
    } catch (error) {
      showMessage(isZh ? '❌ 保存失败' : '❌ Save failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 保存合作经纪商
  const savePartnerBrokers = async () => {
    if (!confirm(isZh ? '确定保存合作经纪商配置？' : 'Save partner brokers?')) return;

    setLoading(true);
    try {
      const response = await fetch('/api/brand/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partner_brokers: partnerBrokers }),
      });

      if (response.ok) {
        showMessage(isZh ? '✅ 合作经纪商已保存' : '✅ Partner brokers saved', 'success');
      } else {
        showMessage(isZh ? '❌ 保存失败' : '❌ Save failed', 'error');
      }
    } catch (error) {
      showMessage(isZh ? '❌ 保存失败' : '❌ Save failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 保存自营交易公司
  const savePropFirms = async () => {
    if (!confirm(isZh ? '确定保存自营交易公司配置？' : 'Save prop firms?')) return;

    setLoading(true);
    try {
      const response = await fetch('/api/brand/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prop_firms: propFirms }),
      });

      if (response.ok) {
        showMessage(isZh ? '✅ 自营交易公司已保存' : '✅ Prop firms saved', 'success');
      } else {
        showMessage(isZh ? '❌ 保存失败' : '❌ Save failed', 'error');
      }
    } catch (error) {
      showMessage(isZh ? '❌ 保存失败' : '❌ Save failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 保存 Footer 横幅
  const saveFooterBanners = async () => {
    if (!confirm(isZh ? '确定保存 Footer 横幅配置？' : 'Save footer banners?')) return;

    setLoading(true);
    try {
      const response = await fetch('/api/brand/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          footer_banners: footerBanners,
          show_footer_banners: showBanners
        }),
      });

      if (response.ok) {
        showMessage(isZh ? '✅ Footer 横幅已保存' : '✅ Footer banners saved', 'success');
      } else {
        showMessage(isZh ? '❌ 保存失败' : '❌ Save failed', 'error');
      }
    } catch (error) {
      showMessage(isZh ? '❌ 保存失败' : '❌ Save failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 保存 SEO 配置
  const saveSEOConfig = async () => {
    if (!confirm(isZh ? '确定保存 SEO 配置？' : 'Save SEO configuration?')) return;

    setLoading(true);
    try {
      const response = await fetch('/api/brand/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seo_title_template_zh: seoForm.title_template_zh,
          seo_title_template_en: seoForm.title_template_en,
          seo_description_zh: seoForm.description_zh,
          seo_description_en: seoForm.description_en,
          seo_keywords_zh: seoForm.keywords_zh.split(',').map(k => k.trim()).filter(Boolean),
          seo_keywords_en: seoForm.keywords_en.split(',').map(k => k.trim()).filter(Boolean),
          seo_og_image_url: seoForm.og_image,
        }),
      });

      if (response.ok) {
        showMessage(isZh ? '✅ SEO 配置已保存' : '✅ SEO config saved', 'success');
      } else {
        showMessage(isZh ? '❌ 保存失败' : '❌ Save failed', 'error');
      }
    } catch (error) {
      showMessage(isZh ? '❌ 保存失败' : '❌ Save failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const switchPreset = async (presetName: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/brand/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presetName }),
      });

      if (response.ok) {
        showMessage(isZh ? `✅ 已切换到品牌: ${presetName}，页面将在1.5秒后刷新` : `✅ Switched to: ${presetName}, page will reload in 1.5s`, 'success');
        setTimeout(() => window.location.reload(), 1500);
      } else {
        showMessage(isZh ? '❌ 切换失败' : '❌ Switch failed', 'error');
      }
    } catch (error) {
      showMessage(isZh ? '❌ 切换失败' : '❌ Switch failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveCurrentAsPreset = async () => {
    const presetName = prompt(
      isZh ? '输入预设名称（仅字母、数字、下划线）：' : 'Enter preset name (letters, numbers, underscores only):'
    );

    if (!presetName) return;
    if (!/^[a-zA-Z0-9_]+$/.test(presetName)) {
      alert(isZh ? '预设名称格式不正确' : 'Invalid preset name format');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/brand/presets/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presetName }),
      });

      if (response.ok) {
        showMessage(isZh ? `✅ 预设 "${presetName}" 已保存` : `✅ Preset "${presetName}" saved`, 'success');
        loadPresets();
      } else {
        showMessage(isZh ? '❌ 保存失败' : '❌ Save failed', 'error');
      }
    } catch (error) {
      showMessage(isZh ? '❌ 保存失败' : '❌ Save failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deletePreset = async (presetName: string) => {
    if (!confirm(isZh ? `确定删除预设 "${presetName}"？` : `Delete preset "${presetName}"?`)) return;

    setLoading(true);
    try {
      const response = await fetch('/api/brand/presets/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presetName }),
      });

      if (response.ok) {
        showMessage(isZh ? `预设 "${presetName}" 已删除` : `Preset "${presetName}" deleted`, 'success');
        loadPresets();
      } else {
        const data = await response.json();
        showMessage(data.error || (isZh ? '删除失败' : 'Delete failed'), 'error');
      }
    } catch (error) {
      showMessage(isZh ? '删除失败' : 'Delete failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ========== 联系方式管理函数 ==========

  // 添加新联系方式
  const addContactMethod = () => {
    const newMethod: ContactMethod = {
      icon: { type: 'builtin', value: 'mail' },
      name_zh: '',
      name_en: '',
      value: '',
      action: 'newtab',
      enabled: false,
      sort_order: contactMethods.length + 1,
    };
    setContactMethods([...contactMethods, newMethod]);
  };

  // 删除联系方式
  const deleteContactMethod = (index: number) => {
    if (confirm(isZh ? '确定删除此联系方式？' : 'Delete this contact method?')) {
      setContactMethods(contactMethods.filter((_, i) => i !== index));
    }
  };

  // 移动联系方式（上下排序）
  const moveContactMethod = (index: number, direction: 'up' | 'down') => {
    const newMethods = [...contactMethods];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newMethods.length) return;

    [newMethods[index], newMethods[targetIndex]] = [newMethods[targetIndex], newMethods[index]];

    // 更新 sort_order
    newMethods.forEach((method, i) => {
      method.sort_order = i + 1;
    });

    setContactMethods(newMethods);
  };

  // 更新联系方式
  const updateContactMethod = (index: number, updates: Partial<ContactMethod>) => {
    const updated = [...contactMethods];
    updated[index] = { ...updated[index], ...updates };
    setContactMethods(updated);
  };

  const TabButton = ({ tab, label }: { tab: TabType; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-3 text-sm font-bold transition-all ${
        activeTab === tab
          ? 'border-b-2 border-black dark:border-white text-black dark:text-white -mb-0.5'
          : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-black dark:text-white mb-2">
            {isZh ? '🎨 品牌配置管理' : '🎨 Brand Configuration'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isZh ? '查看、编辑和管理品牌配置' : 'View, edit and manage brand configuration'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b-2 border-gray-200 dark:border-gray-700 overflow-x-auto">
          <TabButton tab="view" label={isZh ? '查看' : 'View'} />
          <TabButton tab="basic" label={isZh ? '基本信息' : 'Basic'} />
          <TabButton tab="contact" label={isZh ? '联系方式' : 'Contact'} />
          <TabButton tab="referrals" label={isZh ? '合作经纪商' : 'Partner Brokers'} />
          <TabButton tab="brokers" label={isZh ? '合作平台' : 'Platforms'} />
          <TabButton tab="propfirms" label={isZh ? '自营公司' : 'Prop Firms'} />
          <TabButton tab="banners" label={isZh ? 'Footer横幅' : 'Banners'} />
          <TabButton tab="seo" label="SEO" />
          <TabButton tab="presets" label={isZh ? '预设' : 'Presets'} />
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 border-2 ${
              messageType === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-500'
                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-500'
            }`}
          >
            {message}
          </div>
        )}

        {/* View Tab - 完整配置查看 */}
        {activeTab === 'view' && (
          <div className="space-y-6">
            {/* 刷新按钮 */}
            <div className="flex justify-end">
              <button
                onClick={refreshConfig}
                disabled={refreshing}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm"
              >
                {refreshing ? (isZh ? '刷新中...' : 'Refreshing...') : (isZh ? '🔄 刷新配置' : '🔄 Refresh Config')}
              </button>
            </div>

            {/* 基本信息 */}
            <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
              <h2 className="text-xl font-bold text-black dark:text-white mb-4">
                {isZh ? '📋 基本信息' : '📋 Basic Information'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem label={isZh ? '品牌名称（中文）' : 'Brand Name (Chinese)'} value={brand.brandName.zh} />
                <InfoItem label={isZh ? '品牌名称（英文）' : 'Brand Name (English)'} value={brand.brandName.en} />
                <InfoItem label={isZh ? '域名' : 'Domain'} value={brand.domain} />
                <InfoItem label={isZh ? '全局邮箱' : 'Global Email'} value={brand.globalEmail} />
              </div>
            </div>

            {/* 联系方式 */}
            <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
              <h2 className="text-xl font-bold text-black dark:text-white mb-4">
                {isZh ? '📞 联系方式' : '📞 Contact Methods'} ({brand.contactMethods.length})
              </h2>
              <div className="space-y-2">
                {brand.contactMethods.map((method, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-3">
                      <ContactMethodIcon icon={method.icon} className="w-5 h-5" />
                      <div>
                        <p className="font-semibold text-black dark:text-white">
                          {isZh ? method.name_zh : method.name_en}
                        </p>
                        {method.value && <p className="text-sm text-gray-600 dark:text-gray-400">{method.value}</p>}
                        <p className="text-xs text-gray-500">
                          {isZh ? '操作' : 'Action'}: {method.action === 'modal' ? (isZh ? '弹窗' : 'Modal') : method.action === 'newtab' ? (isZh ? '新窗口' : 'New Tab') : (isZh ? '本窗口' : 'Same Tab')}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-bold ${
                      method.enabled
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}>
                      {method.enabled ? (isZh ? '已启用' : 'Enabled') : (isZh ? '已禁用' : 'Disabled')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 推荐码 */}
            {brand.referralCodes.length > 0 && (
              <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
                <h2 className="text-xl font-bold text-black dark:text-white mb-4">
                  {isZh ? '🎁 推荐码' : '🎁 Referral Codes'} ({brand.referralCodes.length})
                </h2>
                <div className="space-y-2">
                  {brand.referralCodes.map((referral, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-black dark:text-white">{isZh ? referral.name_zh : referral.name_en}</p>
                        <code className="px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-mono">{referral.code}</code>
                      </div>
                      {referral.benefit_zh && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">{isZh ? referral.benefit_zh : referral.benefit_en}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1 truncate">{referral.url}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer 横幅 */}
            <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
              <h2 className="text-xl font-bold text-black dark:text-white mb-4">
                {isZh ? '🖼️ Footer 横幅' : '🖼️ Footer Banners'} ({brand.footerBanners.length})
              </h2>
              <div className="mb-4">
                <span className={`px-3 py-1 text-sm font-bold ${
                  brand.showFooterBanners
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                    : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {brand.showFooterBanners ? (isZh ? '✓ 横幅已启用' : '✓ Banners Enabled') : (isZh ? '✗ 横幅已禁用' : '✗ Banners Disabled')}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {brand.footerBanners.map((banner, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                    <p className="font-semibold text-black dark:text-white mb-2">{banner.name}</p>
                    {banner.image_url && (
                      <img src={banner.image_url} alt={banner.name} className="w-full h-auto mb-2" style={{ maxHeight: '80px', objectFit: 'contain' }} />
                    )}
                    <p className="text-xs text-gray-500 truncate">{banner.link_url}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO 配置 */}
            <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
              <h2 className="text-xl font-bold text-black dark:text-white mb-4">
                {isZh ? '🔍 SEO 配置' : '🔍 SEO Configuration'}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">{isZh ? '标题模板（中文）' : 'Title Template (Chinese)'}</p>
                  <p className="text-black dark:text-white font-mono text-sm">{brand.seo.titleTemplate.zh}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">{isZh ? '标题模板（英文）' : 'Title Template (English)'}</p>
                  <p className="text-black dark:text-white font-mono text-sm">{brand.seo.titleTemplate.en}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">{isZh ? 'SEO 描述（中文）' : 'SEO Description (Chinese)'}</p>
                  <p className="text-black dark:text-white text-sm">{brand.seo.description.zh}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">{isZh ? 'SEO 描述（英文）' : 'SEO Description (English)'}</p>
                  <p className="text-black dark:text-white text-sm">{brand.seo.description.en}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">{isZh ? 'SEO 关键词（中文）' : 'SEO Keywords (Chinese)'}</p>
                  <p className="text-black dark:text-white text-sm">{brand.seo.keywords.zh.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">{isZh ? 'SEO 关键词（英文）' : 'SEO Keywords (English)'}</p>
                  <p className="text-black dark:text-white text-sm">{brand.seo.keywords.en.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">OG Image</p>
                  <p className="text-black dark:text-white text-sm">{brand.seo.ogImage}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
            <h2 className="text-xl font-bold text-black dark:text-white mb-6">{isZh ? '编辑基本信息' : 'Edit Basic Information'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '品牌名称（中文）' : 'Brand Name (Chinese)'}</label>
                <input
                  type="text"
                  value={basicForm.brand_name_zh}
                  onChange={(e) => setBasicForm({ ...basicForm, brand_name_zh: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '品牌名称（英文）' : 'Brand Name (English)'}</label>
                <input
                  type="text"
                  value={basicForm.brand_name_en}
                  onChange={(e) => setBasicForm({ ...basicForm, brand_name_en: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '域名' : 'Domain'}</label>
                <input
                  type="text"
                  value={basicForm.brand_domain}
                  onChange={(e) => setBasicForm({ ...basicForm, brand_domain: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                  placeholder="example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '全局邮箱' : 'Global Email'}</label>
                <input
                  type="email"
                  value={basicForm.contact_email}
                  onChange={(e) => setBasicForm({ ...basicForm, contact_email: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                  placeholder="contact@example.com"
                />
              </div>
              <div className="pt-4">
                <button
                  onClick={saveBasicInfo}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {loading ? (isZh ? '保存中...' : 'Saving...') : (isZh ? '保存基本信息' : 'Save Basic Info')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Methods Tab - 新的通用管理界面 */}
        {activeTab === 'contact' && (
          <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black dark:text-white">{isZh ? '编辑联系方式' : 'Edit Contact Methods'}</h2>
              <button
                onClick={addContactMethod}
                className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                {isZh ? '添加联系方式' : 'Add Contact Method'}
              </button>
            </div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="p-5 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  {/* 头部：操作按钮 */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-black dark:text-white">
                      #{index + 1} - {method.name_zh || (isZh ? '(未命名)' : '(Unnamed)')}
                    </h3>
                    <div className="flex items-center gap-2">
                      {/* 移动按钮 */}
                      <button
                        onClick={() => moveContactMethod(index, 'up')}
                        disabled={index === 0}
                        className="p-2 border border-gray-400 disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title={isZh ? '上移' : 'Move Up'}
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveContactMethod(index, 'down')}
                        disabled={index === contactMethods.length - 1}
                        className="p-2 border border-gray-400 disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title={isZh ? '下移' : 'Move Down'}
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                      {/* 删除按钮 */}
                      <button
                        onClick={() => deleteContactMethod(index)}
                        className="p-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                        title={isZh ? '删除' : 'Delete'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 表单内容 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 图标类型选择 */}
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '图标类型' : 'Icon Type'}</label>
                      <select
                        value={method.icon.type}
                        onChange={(e) => updateContactMethod(index, {
                          icon: { ...method.icon, type: e.target.value as 'builtin' | 'emoji' | 'url' }
                        })}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
                      >
                        <option value="builtin">{isZh ? '内置图标' : 'Built-in Icon'}</option>
                        <option value="emoji">Emoji</option>
                        <option value="url">{isZh ? '图片链接' : 'Image URL'}</option>
                      </select>
                    </div>

                    {/* 图标值输入（根据类型变化） - 始终占据列位置 */}
                    <div className="md:col-span-1">
                      {method.icon.type === 'builtin' && (
                        <div>
                          <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '选择图标' : 'Select Icon'}</label>
                          <select
                            value={method.icon.value || 'mail'}
                            onChange={(e) => updateContactMethod(index, {
                              icon: { ...method.icon, value: e.target.value }
                            })}
                            className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
                          >
                            {BUILTIN_ICON_OPTIONS.map(opt => (
                              <option key={opt.value} value={opt.value}>{isZh ? opt.label : opt.label_en}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {method.icon.type === 'emoji' && (
                        <div>
                          <label className="block text-sm font-bold text-black dark:text-white mb-2">Emoji</label>
                          <input
                            type="text"
                            value={method.icon.value || ''}
                            onChange={(e) => updateContactMethod(index, {
                              icon: { ...method.icon, value: e.target.value }
                            })}
                            placeholder="📧"
                            className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
                          />
                        </div>
                      )}
                    </div>

                    {/* URL类型的额外字段 */}
                    {method.icon.type === 'url' && (
                      <>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '图片 URL（亮色）' : 'Image URL (Light)'}</label>
                          <input
                            type="url"
                            value={method.icon.url_light || ''}
                            onChange={(e) => updateContactMethod(index, {
                              icon: { ...method.icon, url_light: e.target.value }
                            })}
                            placeholder="https://example.com/icon-light.png"
                            className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '图片 URL（暗色）' : 'Image URL (Dark)'}</label>
                          <input
                            type="url"
                            value={method.icon.url_dark || ''}
                            onChange={(e) => updateContactMethod(index, {
                              icon: { ...method.icon, url_dark: e.target.value }
                            })}
                            placeholder="https://example.com/icon-dark.png"
                            className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
                          />
                        </div>
                      </>
                    )}

                    {/* 名称 */}
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '名称（中文）' : 'Name (Chinese)'}</label>
                      <input
                        type="text"
                        value={method.name_zh}
                        onChange={(e) => updateContactMethod(index, { name_zh: e.target.value })}
                        placeholder="微信"
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '名称（英文）' : 'Name (English)'}</label>
                      <input
                        type="text"
                        value={method.name_en}
                        onChange={(e) => updateContactMethod(index, { name_en: e.target.value })}
                        placeholder="WeChat"
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
                      />
                    </div>

                    {/* 联系方式值 */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '联系方式值' : 'Contact Value'}</label>
                      <input
                        type="text"
                        value={method.value}
                        onChange={(e) => updateContactMethod(index, { value: e.target.value })}
                        placeholder={isZh ? '邮箱、URL、微信号等' : 'Email, URL, WeChat ID, etc.'}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
                      />
                    </div>

                    {/* 跳转方式 */}
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '跳转方式' : 'Action Type'}</label>
                      <select
                        value={method.action}
                        onChange={(e) => updateContactMethod(index, { action: e.target.value as 'modal' | 'newtab' | 'link' })}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
                      >
                        <option value="modal">{isZh ? '弹窗显示' : 'Show Modal'}</option>
                        <option value="newtab">{isZh ? '新窗口打开' : 'Open in New Tab'}</option>
                        <option value="link">{isZh ? '本窗口跳转' : 'Navigate in Same Tab'}</option>
                      </select>
                    </div>

                    {/* 启用状态 */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`enabled-${index}`}
                        checked={method.enabled}
                        onChange={(e) => updateContactMethod(index, { enabled: e.target.checked })}
                        className="w-5 h-5"
                      />
                      <label htmlFor={`enabled-${index}`} className="text-sm font-bold text-black dark:text-white">
                        {isZh ? '启用此联系方式' : 'Enable this contact method'}
                      </label>
                    </div>

                    {/* 弹窗内容（仅当 action 为 modal 时显示） */}
                    {method.action === 'modal' && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-black dark:text-white mb-2">
                          {isZh ? '弹窗内容（可选，如微信二维码URL）' : 'Modal Content (Optional, e.g., WeChat QR Code URL)'}
                        </label>
                        <input
                          type="text"
                          value={method.modal_content || ''}
                          onChange={(e) => updateContactMethod(index, { modal_content: e.target.value })}
                          placeholder="https://example.com/wechat-qr.png"
                          className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white outline-none"
                        />
                      </div>
                    )}

                    {/* 图标预览 */}
                    <div className="md:col-span-2 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500">
                      <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">{isZh ? '预览' : 'Preview'}:</p>
                      <div className="flex items-center gap-3">
                        <ContactMethodIcon icon={method.icon} className="w-6 h-6" />
                        <span className="text-black dark:text-white">{isZh ? method.name_zh : method.name_en}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {contactMethods.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  {isZh ? '暂无联系方式，点击上方按钮添加' : 'No contact methods. Click the button above to add.'}
                </div>
              )}

              <button
                onClick={saveContactMethods}
                disabled={loading}
                className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {loading ? (isZh ? '保存中...' : 'Saving...') : (isZh ? '保存联系方式' : 'Save Contact Methods')}
              </button>
            </div>
          </div>
        )}

        {/* Referral Codes Tab */}
        {activeTab === 'referrals' && (
          <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black dark:text-white">{isZh ? '编辑推荐码' : 'Edit Referral Codes'}</h2>
              <button
                onClick={() => {
                  setReferralCodes([...referralCodes, {
                    name_zh: '',
                    name_en: '',
                    code: '',
                    url: '',
                    benefit_zh: '',
                    benefit_en: ''
                  }]);
                }}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm"
              >
                {isZh ? '+ 添加推荐码' : '+ Add Referral Code'}
              </button>
            </div>
            <div className="space-y-6">
              {referralCodes.map((referral, index) => (
                <div key={index} className="p-4 border-2 border-gray-300 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-black dark:text-white">#{index + 1}</h3>
                    <button
                      onClick={() => {
                        if (confirm(isZh ? '确定删除此推荐码？' : 'Delete this referral code?')) {
                          setReferralCodes(referralCodes.filter((_, i) => i !== index));
                        }
                      }}
                      className="px-3 py-1 border-2 border-red-500 text-red-500 text-sm font-bold hover:bg-red-500 hover:text-white transition-colors"
                    >
                      {isZh ? '删除' : 'Delete'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '平台名称（中文）' : 'Platform Name (Chinese)'}</label>
                      <input
                        type="text"
                        value={referral.name_zh}
                        onChange={(e) => {
                          const updated = [...referralCodes];
                          updated[index].name_zh = e.target.value;
                          setReferralCodes(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '平台名称（英文）' : 'Platform Name (English)'}</label>
                      <input
                        type="text"
                        value={referral.name_en}
                        onChange={(e) => {
                          const updated = [...referralCodes];
                          updated[index].name_en = e.target.value;
                          setReferralCodes(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '推荐码' : 'Referral Code'}</label>
                      <input
                        type="text"
                        value={referral.code}
                        onChange={(e) => {
                          const updated = [...referralCodes];
                          updated[index].code = e.target.value;
                          setReferralCodes(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '推荐链接' : 'Referral URL'}</label>
                      <input
                        type="url"
                        value={referral.url}
                        onChange={(e) => {
                          const updated = [...referralCodes];
                          updated[index].url = e.target.value;
                          setReferralCodes(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '优惠信息（中文）' : 'Benefit (Chinese)'}</label>
                      <input
                        type="text"
                        value={referral.benefit_zh || ''}
                        onChange={(e) => {
                          const updated = [...referralCodes];
                          updated[index].benefit_zh = e.target.value;
                          setReferralCodes(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                        placeholder="5%优惠"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '优惠信息（英文）' : 'Benefit (English)'}</label>
                      <input
                        type="text"
                        value={referral.benefit_en || ''}
                        onChange={(e) => {
                          const updated = [...referralCodes];
                          updated[index].benefit_en = e.target.value;
                          setReferralCodes(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                        placeholder="5% discount"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={saveReferralCodes}
                disabled={loading}
                className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {loading ? (isZh ? '保存中...' : 'Saving...') : (isZh ? '保存推荐码' : 'Save Referral Codes')}
              </button>
            </div>
          </div>
        )}

        {/* Partner Brokers Tab */}
        {activeTab === 'brokers' && (
          <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black dark:text-white">{isZh ? '编辑合作经纪商' : 'Edit Partner Brokers'}</h2>
              <button
                onClick={() => {
                  setPartnerBrokers([...partnerBrokers, {
                    name_zh: '',
                    name_en: '',
                    url: '',
                    code: '',
                    benefit_zh: '',
                    benefit_en: ''
                  }]);
                }}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm"
              >
                {isZh ? '+ 添加经纪商' : '+ Add Broker'}
              </button>
            </div>
            <div className="space-y-6">
              {partnerBrokers.map((broker, index) => (
                <div key={index} className="p-4 border-2 border-gray-300 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-black dark:text-white">#{index + 1}</h3>
                    <button
                      onClick={() => {
                        if (confirm(isZh ? '确定删除此经纪商？' : 'Delete this broker?')) {
                          setPartnerBrokers(partnerBrokers.filter((_, i) => i !== index));
                        }
                      }}
                      className="px-3 py-1 border-2 border-red-500 text-red-500 text-sm font-bold hover:bg-red-500 hover:text-white transition-colors"
                    >
                      {isZh ? '删除' : 'Delete'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '经纪商名称（中文）' : 'Broker Name (Chinese)'}</label>
                      <input
                        type="text"
                        value={broker.name_zh}
                        onChange={(e) => {
                          const updated = [...partnerBrokers];
                          updated[index].name_zh = e.target.value;
                          setPartnerBrokers(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '经纪商名称（英文）' : 'Broker Name (English)'}</label>
                      <input
                        type="text"
                        value={broker.name_en}
                        onChange={(e) => {
                          const updated = [...partnerBrokers];
                          updated[index].name_en = e.target.value;
                          setPartnerBrokers(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '官网链接' : 'Website URL'}</label>
                      <input
                        type="url"
                        value={broker.url}
                        onChange={(e) => {
                          const updated = [...partnerBrokers];
                          updated[index].url = e.target.value;
                          setPartnerBrokers(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '推荐码（可选）' : 'Code (Optional)'}</label>
                      <input
                        type="text"
                        value={broker.code || ''}
                        onChange={(e) => {
                          const updated = [...partnerBrokers];
                          updated[index].code = e.target.value;
                          setPartnerBrokers(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '优惠信息（中文，可选）' : 'Benefit (Chinese, Optional)'}</label>
                      <input
                        type="text"
                        value={broker.benefit_zh || ''}
                        onChange={(e) => {
                          const updated = [...partnerBrokers];
                          updated[index].benefit_zh = e.target.value;
                          setPartnerBrokers(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                        placeholder="全返"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '优惠信息（英文，可选）' : 'Benefit (English, Optional)'}</label>
                      <input
                        type="text"
                        value={broker.benefit_en || ''}
                        onChange={(e) => {
                          const updated = [...partnerBrokers];
                          updated[index].benefit_en = e.target.value;
                          setPartnerBrokers(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                        placeholder="Full Refund"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={savePartnerBrokers}
                disabled={loading}
                className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {loading ? (isZh ? '保存中...' : 'Saving...') : (isZh ? '保存合作经纪商' : 'Save Partner Brokers')}
              </button>
            </div>
          </div>
        )}

        {/* Prop Firms Tab */}
        {activeTab === 'propfirms' && (
          <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black dark:text-white">{isZh ? '编辑自营交易公司' : 'Edit Prop Firms'}</h2>
              <button
                onClick={() => {
                  setPropFirms([...propFirms, {
                    name_zh: '',
                    name_en: '',
                    url: '',
                    code: '',
                    benefit_zh: '',
                    benefit_en: ''
                  }]);
                }}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm"
              >
                {isZh ? '+ 添加自营公司' : '+ Add Prop Firm'}
              </button>
            </div>
            <div className="space-y-6">
              {propFirms.map((firm, index) => (
                <div key={index} className="p-4 border-2 border-gray-300 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-black dark:text-white">#{index + 1}</h3>
                    <button
                      onClick={() => {
                        if (confirm(isZh ? '确定删除此自营公司？' : 'Delete this prop firm?')) {
                          setPropFirms(propFirms.filter((_, i) => i !== index));
                        }
                      }}
                      className="px-3 py-1 border-2 border-red-500 text-red-500 text-sm font-bold hover:bg-red-500 hover:text-white transition-colors"
                    >
                      {isZh ? '删除' : 'Delete'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '公司名称（中文）' : 'Firm Name (Chinese)'}</label>
                      <input
                        type="text"
                        value={firm.name_zh}
                        onChange={(e) => {
                          const updated = [...propFirms];
                          updated[index].name_zh = e.target.value;
                          setPropFirms(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '公司名称（英文）' : 'Firm Name (English)'}</label>
                      <input
                        type="text"
                        value={firm.name_en}
                        onChange={(e) => {
                          const updated = [...propFirms];
                          updated[index].name_en = e.target.value;
                          setPropFirms(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '官网链接' : 'Website URL'}</label>
                      <input
                        type="url"
                        value={firm.url}
                        onChange={(e) => {
                          const updated = [...propFirms];
                          updated[index].url = e.target.value;
                          setPropFirms(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '推荐码（可选）' : 'Code (Optional)'}</label>
                      <input
                        type="text"
                        value={firm.code || ''}
                        onChange={(e) => {
                          const updated = [...propFirms];
                          updated[index].code = e.target.value;
                          setPropFirms(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '优惠信息（中文，可选）' : 'Benefit (Chinese, Optional)'}</label>
                      <input
                        type="text"
                        value={firm.benefit_zh || ''}
                        onChange={(e) => {
                          const updated = [...propFirms];
                          updated[index].benefit_zh = e.target.value;
                          setPropFirms(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                        placeholder="5%优惠"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '优惠信息（英文，可选）' : 'Benefit (English, Optional)'}</label>
                      <input
                        type="text"
                        value={firm.benefit_en || ''}
                        onChange={(e) => {
                          const updated = [...propFirms];
                          updated[index].benefit_en = e.target.value;
                          setPropFirms(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                        placeholder="5% discount"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={savePropFirms}
                disabled={loading}
                className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {loading ? (isZh ? '保存中...' : 'Saving...') : (isZh ? '保存自营交易公司' : 'Save Prop Firms')}
              </button>
            </div>
          </div>
        )}

        {/* Footer Banners Tab */}
        {activeTab === 'banners' && (
          <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black dark:text-white">{isZh ? '编辑 Footer 横幅' : 'Edit Footer Banners'}</h2>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showBanners}
                    onChange={(e) => setShowBanners(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-bold text-black dark:text-white">{isZh ? '显示横幅' : 'Show Banners'}</span>
                </label>
                <button
                  onClick={() => {
                    setFooterBanners([...footerBanners, { name: '', image_url: '', link_url: '' }]);
                  }}
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm"
                >
                  {isZh ? '+ 添加横幅' : '+ Add Banner'}
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {footerBanners.map((banner, index) => (
                <div key={index} className="p-4 border-2 border-gray-300 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-black dark:text-white">{banner.name || `横幅 #${index + 1}`}</h3>
                    <button
                      onClick={() => {
                        if (confirm(isZh ? '确定删除此横幅？' : 'Delete this banner?')) {
                          setFooterBanners(footerBanners.filter((_, i) => i !== index));
                        }
                      }}
                      className="px-3 py-1 border-2 border-red-500 text-red-500 text-sm font-bold hover:bg-red-500 hover:text-white transition-colors"
                    >
                      {isZh ? '删除' : 'Delete'}
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '横幅名称' : 'Banner Name'}</label>
                      <input
                        type="text"
                        value={banner.name}
                        onChange={(e) => {
                          const updated = [...footerBanners];
                          updated[index].name = e.target.value;
                          setFooterBanners(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                        placeholder="FTMO"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '图片 URL（CDN链接）' : 'Image URL (CDN link)'}</label>
                      <input
                        type="url"
                        value={banner.image_url}
                        onChange={(e) => {
                          const updated = [...footerBanners];
                          updated[index].image_url = e.target.value;
                          setFooterBanners(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                        placeholder="https://cdn.example.com/banner.png"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '链接 URL' : 'Link URL'}</label>
                      <input
                        type="url"
                        value={banner.link_url}
                        onChange={(e) => {
                          const updated = [...footerBanners];
                          updated[index].link_url = e.target.value;
                          setFooterBanners(updated);
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                        placeholder="https://example.com"
                      />
                    </div>
                    {banner.image_url && (
                      <div>
                        <p className="text-sm font-bold text-black dark:text-white mb-2">{isZh ? '预览' : 'Preview'}:</p>
                        <img src={banner.image_url} alt={banner.name} className="max-w-full h-auto" style={{ maxHeight: '120px' }} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={saveFooterBanners}
                disabled={loading}
                className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {loading ? (isZh ? '保存中...' : 'Saving...') : (isZh ? '保存 Footer 横幅' : 'Save Footer Banners')}
              </button>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
            <h2 className="text-xl font-bold text-black dark:text-white mb-6">{isZh ? '编辑 SEO 配置' : 'Edit SEO Configuration'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '标题模板（中文）' : 'Title Template (Chinese)'}</label>
                <input
                  type="text"
                  value={seoForm.title_template_zh}
                  onChange={(e) => setSeoForm({ ...seoForm, title_template_zh: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                  placeholder="{title}丨汇刃丨{keywords}"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{isZh ? '可用变量：{title}, {keywords}' : 'Available variables: {title}, {keywords}'}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? '标题模板（英文）' : 'Title Template (English)'}</label>
                <input
                  type="text"
                  value={seoForm.title_template_en}
                  onChange={(e) => setSeoForm({ ...seoForm, title_template_en: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                  placeholder="{title}丨FX Killer丨{keywords}"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? 'SEO 描述（中文）' : 'SEO Description (Chinese)'}</label>
                <textarea
                  value={seoForm.description_zh}
                  onChange={(e) => setSeoForm({ ...seoForm, description_zh: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? 'SEO 描述（英文）' : 'SEO Description (English)'}</label>
                <textarea
                  value={seoForm.description_en}
                  onChange={(e) => setSeoForm({ ...seoForm, description_en: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? 'SEO 关键词（中文，逗号分隔）' : 'SEO Keywords (Chinese, comma separated)'}</label>
                <input
                  type="text"
                  value={seoForm.keywords_zh}
                  onChange={(e) => setSeoForm({ ...seoForm, keywords_zh: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                  placeholder="职业交易员培训, 外汇交易员培训, 日内交易员培训"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? 'SEO 关键词（英文，逗号分隔）' : 'SEO Keywords (English, comma separated)'}</label>
                <input
                  type="text"
                  value={seoForm.keywords_en}
                  onChange={(e) => setSeoForm({ ...seoForm, keywords_en: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                  placeholder="Professional Trader Training, Forex Trader Training, Day Trader Training"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black dark:text-white mb-2">{isZh ? 'OG 图片 URL' : 'OG Image URL'}</label>
                <input
                  type="text"
                  value={seoForm.og_image}
                  onChange={(e) => setSeoForm({ ...seoForm, og_image: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                  placeholder="/brand/og-image.png"
                />
              </div>
              <div className="pt-4">
                <button
                  onClick={saveSEOConfig}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {loading ? (isZh ? '保存中...' : 'Saving...') : (isZh ? '保存 SEO 配置' : 'Save SEO Config')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Presets Tab */}
        {activeTab === 'presets' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-black dark:text-white">{isZh ? '品牌预设管理' : 'Brand Preset Management'}</h2>
                <button
                  onClick={saveCurrentAsPreset}
                  disabled={loading}
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {isZh ? '保存当前配置为预设' : 'Save Current as Preset'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {presets.map((preset) => (
                  <div key={preset} className="p-4 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-lg font-bold text-black dark:text-white">{preset}</p>
                      {preset === 'fxkiller' && (
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1">
                          {isZh ? '默认' : 'Default'}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => switchPreset(preset)}
                        disabled={loading}
                        className="flex-1 px-3 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                      >
                        {isZh ? '应用' : 'Apply'}
                      </button>
                      {preset !== 'fxkiller' && (
                        <button
                          onClick={() => deletePreset(preset)}
                          disabled={loading}
                          className="px-3 py-2 border-2 border-red-500 text-red-500 text-sm font-bold hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                        >
                          {isZh ? '删除' : 'Delete'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 p-6">
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-3">
                {isZh ? '💡 关于品牌预设' : '💡 About Brand Presets'}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li>{isZh ? '预设保存当前的完整品牌配置' : 'Presets save complete brand configuration'}</li>
                <li>{isZh ? '可以快速在不同品牌之间切换' : 'Quick switching between different brands'}</li>
                <li>{isZh ? '应用预设会立即更新配置并刷新页面' : 'Applying preset updates config and reloads page'}</li>
                <li>{isZh ? 'fxkiller 是默认预设，无法删除' : 'fxkiller is the default preset, cannot be deleted'}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 信息展示组件
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-lg font-bold text-black dark:text-white">{value}</p>
    </div>
  );
}
