"use client";

import React, { useState, useEffect } from 'react';
import AdminLogin from './components/AdminLogin';
import SidebarMenu from './components/SidebarMenu';
import TiantiPanel from './components/TiantiPanel';
import LivestreamManager from './components/LivestreamManager';
import BlogManager from './components/BlogManager';
import ConfigManager from './components/ConfigManager';
import TopTradersManager from './components/TopTradersManager';
import UserManager from './components/UserManager';
import EmailTemplateManager from './components/EmailTemplateManager';
import TradingOrdersPage from './trading-orders/page';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TradingDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('strategy');
  const { language, t } = useLanguage();

  // Hide navbar when authenticated, show when logged out
  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (navbar) {
      if (isAuthenticated) {
        navbar.style.display = 'none';
      } else {
        navbar.style.display = 'block';
      }
    }

    // Cleanup: show navbar when component unmounts
    return () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.display = 'block';
      }
    };
  }, [isAuthenticated]);

  useEffect(() => {
    const authenticated = localStorage.getItem('dashboard_authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('dashboard_authenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'strategy':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-black text-white mb-6">
              {language === 'zh' ? '天梯趋势' : 'Tianti Trend'}
            </h1>
            <TiantiPanel />
          </div>
        );
      case 'users':
        return <UserManager />;
      case 'email-templates':
        return <EmailTemplateManager />;
      case 'livestream':
        return <LivestreamManager />;
      case 'blog':
        return <BlogManager />;
      case 'top-traders':
        return <TopTradersManager />;
      case 'trading-orders':
        return <TradingOrdersPage />;
      case 'config':
        return <ConfigManager />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-black fixed inset-0 z-50">
      {/* Sidebar */}
      <SidebarMenu activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-[#0a0a0a] border-b border-white/10 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                {language === 'zh' ? '汇刃控制台' : 'FX Killer Dashboard'}
              </h2>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-white/10 text-gray-300 hover:bg-white/5 transition-colors"
            >
              {language === 'zh' ? '退出登录' : 'Logout'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
