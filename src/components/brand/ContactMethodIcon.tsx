"use client";

import React from 'react';
import {
  Mail,
  MessageCircle,
  Send,
  Phone,
  Instagram,
  Facebook,
  Music,
  BookOpen,
  Heart,
  MessageSquare,
} from 'lucide-react';

// 微信自定义图标组件
const WeChatIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088v-.034zm-3.01 3.296c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982zm4.655 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
  </svg>
);

// X (Twitter) 最新图标
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// YouTube 最新图标
const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// 内置图标映射
const BUILTIN_ICONS = {
  // 常用联系方式
  'mail': Mail,
  'message-circle': MessageCircle,
  'wechat': WeChatIcon,  // 微信图标
  'send': Send,  // Telegram
  'phone': Phone,

  // 社交媒体
  'youtube': YouTubeIcon,  // YouTube 最新图标
  'twitter': XIcon,  // X (Twitter) 最新图标
  'instagram': Instagram,
  'facebook': Facebook,
  'music': Music,  // TikTok
  'book-open': BookOpen,  // Xiaohongshu
  'heart': Heart,  // LINE
  'message-square': MessageSquare,  // WhatsApp
} as const;

export type BuiltinIconName = keyof typeof BUILTIN_ICONS;

export interface ContactMethodIconConfig {
  type: 'builtin' | 'emoji' | 'url';
  value?: string;
  url_light?: string;
  url_dark?: string;
}

interface ContactMethodIconProps {
  icon: ContactMethodIconConfig;
  className?: string;
}

export default function ContactMethodIcon({ icon, className = 'w-5 h-5' }: ContactMethodIconProps) {
  // 内置图标
  if (icon.type === 'builtin' && icon.value) {
    const IconComponent = BUILTIN_ICONS[icon.value as BuiltinIconName];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
  }

  // Emoji 图标
  if (icon.type === 'emoji' && icon.value) {
    return <span className={`text-xl ${className}`}>{icon.value}</span>;
  }

  // 图片 URL（支持亮色/暗色主题）
  if (icon.type === 'url') {
    return (
      <>
        {icon.url_light && (
          <img
            src={icon.url_light}
            alt="icon"
            className={`dark:hidden ${className}`}
          />
        )}
        {icon.url_dark && (
          <img
            src={icon.url_dark}
            alt="icon"
            className={`hidden dark:block ${className}`}
          />
        )}
        {!icon.url_light && icon.url_dark && (
          <img
            src={icon.url_dark}
            alt="icon"
            className={className}
          />
        )}
        {icon.url_light && !icon.url_dark && (
          <img
            src={icon.url_light}
            alt="icon"
            className={className}
          />
        )}
      </>
    );
  }

  // 默认图标
  return <MessageCircle className={className} />;
}

// 导出内置图标选项（用于管理界面的下拉选择）
export const BUILTIN_ICON_OPTIONS = [
  { value: 'mail', label: '邮箱 (Mail)', label_en: 'Mail' },
  { value: 'wechat', label: '微信 (WeChat)', label_en: 'WeChat' },
  { value: 'message-circle', label: '消息 (Message)', label_en: 'Message' },
  { value: 'send', label: 'Telegram', label_en: 'Telegram' },
  { value: 'phone', label: '电话 (Phone)', label_en: 'Phone' },
  { value: 'youtube', label: 'YouTube', label_en: 'YouTube' },
  { value: 'twitter', label: 'X/Twitter', label_en: 'X/Twitter' },
  { value: 'instagram', label: 'Instagram', label_en: 'Instagram' },
  { value: 'facebook', label: 'Facebook', label_en: 'Facebook' },
  { value: 'music', label: '抖音 (TikTok)', label_en: 'TikTok' },
  { value: 'book-open', label: '小红书 (XHS)', label_en: 'Xiaohongshu' },
  { value: 'heart', label: 'LINE', label_en: 'LINE' },
  { value: 'message-square', label: 'WhatsApp', label_en: 'WhatsApp' },
] as const;
