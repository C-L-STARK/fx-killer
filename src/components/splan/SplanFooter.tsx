"use client";

import React from 'react';
import LocaleLink from '@/components/navigation/LocaleLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBrand } from '@/contexts/BrandContext';
import { ContactMethod } from '@/lib/brand-config';
import ContactMethodIcon from '@/components/brand/ContactMethodIcon';
import EmailContactModal from '@/components/custom/EmailContactModal';
import { NeuralBackground } from '@/components/ui/neural-background';

export default function SplanFooter() {
  const { t, language } = useLanguage();
  const brand = useBrand();
  const isZh = language === 'zh';

  const [showContactModal, setShowContactModal] = React.useState(false);
  const [selectedMethod, setSelectedMethod] = React.useState<ContactMethod | null>(null);
  const [showEmailModal, setShowEmailModal] = React.useState(false);

  // 处理联系方式点击
  const handleContactClick = (method: ContactMethod) => {
    // 邮箱永远使用全局 EmailContactModal
    const isEmail = method.name_en.toLowerCase() === 'email' ||
                    method.name_zh === '邮箱' ||
                    method.icon.value === 'mail';

    if (isEmail) {
      setShowEmailModal(true);
    } else if (method.action === 'modal') {
      setSelectedMethod(method);
      setShowContactModal(true);
    } else if (method.action === 'newtab' && method.value) {
      window.open(method.value, '_blank');
    } else if (method.action === 'link' && method.value) {
      window.location.href = method.value;
    }
  };

  // 获取社交媒体图标
  const getSocialIcon = (platform: string) => {
    const icons: Record<string, any> = {
      twitter: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      youtube: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      discord: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
    };
    return icons[platform] || null;
  };

  return (
    <footer className="relative bg-black dark:bg-gray-950 text-white py-12 border-t border-gray-800 overflow-hidden">
      {/* Neural Background - Light mode */}
      <div className="dark:hidden">
        <NeuralBackground hue={200} saturation={0.5} chroma={0.4} isDark={false} />
      </div>

      {/* Neural Background - Dark mode */}
      <div className="hidden dark:block">
        <NeuralBackground hue={200} saturation={0.5} chroma={0.4} isDark={true} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About + Contact Methods */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-black text-white">
                {brand.brandName[isZh ? 'zh' : 'en'].split('')[0]}
              </span>
              <span className="text-xl font-normal text-gray-400 ml-1">
                {brand.brandName[isZh ? 'zh' : 'en'].substring(1)}
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {t('footer.about')}
            </p>

            {/* Contact Methods - 从配置加载 */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">
                {isZh ? '联系方式' : 'Contact'}
              </p>
              <div className="flex items-center gap-3">
                {brand.contactMethods
                  .filter(method => method.enabled)
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map((method, index) => (
                    <button
                      key={index}
                      onClick={() => handleContactClick(method)}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                      title={isZh ? method.name_zh : method.name_en}
                    >
                      <ContactMethodIcon icon={method.icon} className="w-5 h-5" />
                    </button>
                  ))}
              </div>
            </div>

            {/* Social Media Icons - 从配置加载 */}
            {(brand.social.twitter || brand.social.youtube || brand.social.discord) && (
              <div>
                <p className="text-xs text-gray-500 mb-2">
                  {isZh ? '社交媒体' : 'Social Media'}
                </p>
                <div className="flex items-center gap-3">
                  {brand.social.twitter && (
                    <a
                      href={brand.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      title="Twitter / X"
                    >
                      {getSocialIcon('twitter')}
                    </a>
                  )}
                  {brand.social.youtube && (
                    <a
                      href={brand.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      title="YouTube"
                    >
                      {getSocialIcon('youtube')}
                    </a>
                  )}
                  {brand.social.discord && (
                    <a
                      href={brand.social.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      title="Discord"
                    >
                      {getSocialIcon('discord')}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Links - Navigation */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.nav.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <LocaleLink href="/" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.home')}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/splan/join-us" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.training')}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/education" className="text-gray-400 hover:text-white transition-colors">
                  {isZh ? '教育' : 'Education'}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/news" className="text-gray-400 hover:text-white transition-colors">
                  {isZh ? '新闻' : 'News'}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/market-analysis" className="text-gray-400 hover:text-white transition-colors">
                  {isZh ? '行情' : 'Market'}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/splan/blog" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.blog')}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/splan/psychology-test" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.psychology')}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.dashboard')}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/economic-calendar" className="text-gray-400 hover:text-white transition-colors">
                  {isZh ? '日历' : 'Calendar'}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/top-traders" className="text-gray-400 hover:text-white transition-colors">
                  {isZh ? '天梯' : 'Leaderboard'}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/splan/faq" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.faq')}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/splan/donate" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.membership')}
                </LocaleLink>
              </li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="font-bold mb-4">{isZh ? '交易工具' : 'Trading Tools'}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <LocaleLink href="/tools/position-calculator" className="text-gray-400 hover:text-white transition-colors">
                  {isZh ? '仓位计算器' : 'Position Calculator'}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/tools/risk-reward-calculator" className="text-gray-400 hover:text-white transition-colors">
                  {isZh ? '风险回报计算器' : 'Risk/Reward Calculator'}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/tools/pip-calculator" className="text-gray-400 hover:text-white transition-colors">
                  {isZh ? '点值计算器' : 'Pip Calculator'}
                </LocaleLink>
              </li>
            </ul>

            <h4 className="font-bold mb-4 mt-6">{isZh ? '其他资源' : 'Resources'}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <LocaleLink href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  {isZh ? '隐私政策' : 'Privacy Policy'}
                </LocaleLink>
              </li>
              <li>
                <a href="https://www.bilibili.com/video/BV19a411X7eY" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors">
                  {t('video.doc1.title')}
                </a>
              </li>
              <li>
                <a href="https://www.bilibili.com/video/BV1FZ4y1o734" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors">
                  {t('video.doc2.title')}
                </a>
              </li>
            </ul>
          </div>

          {/* Combined Partners Section - 合作伙伴（推荐码 + 合作经纪商 + 自营公司） */}
          <div>
            <h4 className="font-bold mb-4">
              {isZh ? '合作伙伴' : 'Partners'}
            </h4>

            {/* Referral Codes - 合作经纪商 */}
            {brand.referralCodes.length > 0 && (
              <div className="mb-6">
                <h5 className="text-xs text-gray-500 mb-2 uppercase">
                  {isZh ? '合作经纪商' : 'Partner Brokers'}
                </h5>
                <ul className="space-y-2 text-sm">
                  {brand.referralCodes.map((partner, index) => (
                    <li key={index}>
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {isZh ? partner.name_zh : partner.name_en}
                      </a>
                      {partner.code && (
                        <>
                          <span className="text-xs text-gray-500 ml-2">
                            {isZh ? '邀请码' : 'Code'}:
                          </span>
                          <code className="text-xs bg-gray-800 px-2 py-0.5 text-gray-400 font-mono ml-1">
                            {partner.code}
                          </code>
                        </>
                      )}
                      {partner.benefit_zh && (
                        <span className="text-xs text-gray-600 ml-2">
                          ({isZh ? partner.benefit_zh : partner.benefit_en})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Partner Brokers - 合作平台 */}
            {brand.partnerBrokers.length > 0 && (
              <div className="mb-6">
                <h5 className="text-xs text-gray-500 mb-2 uppercase">
                  {isZh ? '合作平台' : 'Platforms'}
                </h5>
                <ul className="space-y-2 text-sm">
                  {brand.partnerBrokers.map((broker, index) => (
                    <li key={index}>
                      <a
                        href={broker.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {isZh ? broker.name_zh : broker.name_en}
                      </a>
                      {broker.code && (
                        <>
                          <span className="text-xs text-gray-500 ml-2">
                            {isZh ? '推荐码' : 'Code'}:
                          </span>
                          <code className="text-xs bg-gray-800 px-2 py-0.5 text-gray-400 font-mono ml-1">
                            {broker.code}
                          </code>
                        </>
                      )}
                      {broker.benefit_zh && (
                        <span className="text-xs text-gray-600 ml-2">
                          ({isZh ? broker.benefit_zh : broker.benefit_en})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prop Firms - 自营交易公司 */}
            {brand.propFirms.length > 0 && (
              <div>
                <h5 className="text-xs text-gray-500 mb-2 uppercase">
                  {isZh ? '自营交易公司' : 'Prop Firms'}
                </h5>
                <ul className="space-y-2 text-sm">
                  {brand.propFirms.map((firm, index) => (
                    <li key={index}>
                      <a
                        href={firm.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {isZh ? firm.name_zh : firm.name_en}
                      </a>
                      {firm.code && (
                        <>
                          <span className="text-xs text-gray-500 ml-2">
                            {isZh ? '推荐码' : 'Code'}:
                          </span>
                          <code className="text-xs bg-gray-800 px-2 py-0.5 text-gray-400 font-mono ml-1">
                            {firm.code}
                          </code>
                        </>
                      )}
                      {firm.benefit_zh && (
                        <span className="text-xs text-gray-600 ml-2">
                          ({isZh ? firm.benefit_zh : firm.benefit_en})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} {brand.brandName[isZh ? 'zh' : 'en']} · {brand.domain}
          </p>
          <p className="mt-2 text-xs">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>

      {/* Affiliate Banners - 从配置加载 */}
      {brand.showFooterBanners && brand.footerBanners.length > 0 && (
        <div className="relative z-20 border-t border-gray-800 mt-8 pt-8 pb-8">
          <div className="mx-auto px-8 md:px-12 lg:px-16">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
              {brand.footerBanners.map((banner, index) => (
                <a
                  key={index}
                  href={banner.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block hover:opacity-80 transition-opacity"
                >
                  <img
                    src={banner.image_url}
                    alt={banner.name}
                    className="max-w-full h-auto"
                    style={{ height: '90px' }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal (WeChat / Phone / etc) */}
      {showContactModal && selectedMethod && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowContactModal(false)}
        >
          <div
            className="relative bg-white dark:bg-gray-900 shadow-2xl max-w-md w-full overflow-hidden border-2 border-black dark:border-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with title and close button */}
            <div className="relative bg-black dark:bg-white px-6 py-4 border-b-2 border-black dark:border-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white dark:text-black">
                  {isZh ? '联系方式' : 'Contact Information'}
                </h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {selectedMethod.modal_content ? (
                // WeChat QR Code Display
                <div className="space-y-6">
                  {/* QR Code */}
                  <div className="bg-white dark:bg-gray-800 p-6 border-2 border-gray-200 dark:border-gray-700">
                    <img
                      src={selectedMethod.modal_content}
                      alt="QR Code"
                      className="mx-auto w-56 h-56"
                    />
                  </div>

                  {/* WeChat ID */}
                  {selectedMethod.value && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                        {isZh ? selectedMethod.name_zh + ' 号' : selectedMethod.name_en + ' ID'}
                      </p>
                      <div className="inline-flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-4 py-3 border border-gray-300 dark:border-gray-600">
                        <code className="text-xl font-bold text-gray-900 dark:text-white font-mono">
                          {selectedMethod.value}
                        </code>
                      </div>
                    </div>
                  )}

                  {/* Instruction */}
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    {isZh ? '扫描二维码或复制账号添加' : 'Scan QR code or copy ID to add'}
                  </p>

                  {/* Copy Button */}
                  {selectedMethod.value && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedMethod.value);
                        alert(isZh ? '已复制到剪贴板！' : 'Copied to clipboard!');
                      }}
                      className="w-full px-6 py-3.5 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border-2 border-black dark:border-white"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {isZh ? `复制${selectedMethod.name_zh}号` : `Copy ${selectedMethod.name_en} ID`}
                      </span>
                    </button>
                  )}
                </div>
              ) : (
                // Other contact methods (Phone, etc.)
                <div className="space-y-6">
                  <div className="text-center bg-gray-50 dark:bg-gray-800 p-8 border-2 border-gray-200 dark:border-gray-700">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedMethod.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isZh ? selectedMethod.name_zh : selectedMethod.name_en}
                    </p>
                  </div>

                  {selectedMethod.value && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedMethod.value);
                        alert(isZh ? '已复制到剪贴板！' : 'Copied to clipboard!');
                      }}
                      className="w-full px-6 py-3.5 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border-2 border-black dark:border-white"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {isZh ? `复制${selectedMethod.name_zh}` : `Copy ${selectedMethod.name_en}`}
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        title={isZh ? '职业交易员面试预约' : 'Professional Trader Interview'}
      />
    </footer>
  );
}
