"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ShineLinkButton } from '@/components/custom/ShineButton';

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();

  const content = {
    zh: {
      title: "隐私政策",
      lastUpdated: "最后更新：2024年11月",
      sections: [
        {
          title: "1. 信息收集",
          content: [
            "我们收集以下类型的信息：",
            "• 个人身份信息：姓名、邮箱、联系方式等您主动提供的信息",
            "• 使用数据：访问时间、浏览页面、IP地址等自动收集的信息",
            "• 交易数据：仅在您使用我们的交易系统时收集相关交易记录",
            "• Cookie信息：用于改善用户体验的技术信息"
          ]
        },
        {
          title: "2. 信息使用",
          content: [
            "我们使用收集的信息用于：",
            "• 提供和改进我们的培训服务",
            "• 处理您的培训申请和考核评估",
            "• 发送重要通知和更新信息",
            "• 分析网站使用情况以优化用户体验",
            "• 保护平台安全和防止欺诈行为"
          ]
        },
        {
          title: "3. 信息共享",
          content: [
            "我们承诺：",
            "• 不会出售您的个人信息给第三方",
            "• 仅在法律要求或经您同意的情况下共享信息",
            "• 与合作经纪商和自营交易公司共享必要信息时，会要求其遵守相同的隐私标准",
            "• 匿名化的统计数据可能用于改进服务"
          ]
        },
        {
          title: "4. 数据安全",
          content: [
            "我们采取以下措施保护您的数据：",
            "• 使用 SSL/TLS 加密传输所有敏感数据",
            "• 定期进行安全审计和漏洞扫描",
            "• 限制员工访问个人信息的权限",
            "• 使用安全的云服务存储数据",
            "• 定期备份数据以防意外丢失"
          ]
        },
        {
          title: "5. Cookie 使用",
          content: [
            "我们使用 Cookie 来：",
            "• 记住您的登录状态和偏好设置",
            "• 分析网站流量和用户行为",
            "• 提供个性化内容和广告",
            "您可以通过浏览器设置管理或禁用 Cookie，但这可能影响网站的某些功能。"
          ]
        },
        {
          title: "6. 用户权利",
          content: [
            "您有权：",
            "• 访问和查看我们持有的关于您的个人信息",
            "• 要求更正不准确的信息",
            "• 要求删除您的个人信息（在某些情况下）",
            "• 反对或限制我们处理您的数据",
            "• 数据可携带权（获取您的数据副本）",
            "如需行使这些权利，请通过 x.stark.dylan@gmail.com 联系我们。"
          ]
        },
        {
          title: "7. 第三方服务",
          content: [
            "我们的网站可能包含指向第三方网站的链接，包括：",
            "• 合作经纪商（EC Markets、TickMill）",
            "• 自营交易公司（FTMO、FundedNext）",
            "• 交易平台（MetaAPI、MetaTrader）",
            "这些第三方网站有自己的隐私政策，我们不对其内容或做法负责。"
          ]
        },
        {
          title: "8. 儿童隐私",
          content: [
            "我们的服务不面向18岁以下的儿童。我们不会故意收集儿童的个人信息。如果我们发现无意中收集了儿童的信息，将立即删除。"
          ]
        },
        {
          title: "9. 国际数据传输",
          content: [
            "您的信息可能被传输到您所在国家/地区以外的服务器。我们会确保这些传输符合适用的数据保护法律，并采取适当的安全措施。"
          ]
        },
        {
          title: "10. 政策更新",
          content: [
            "我们可能会不时更新本隐私政策。重大变更会通过网站公告或电子邮件通知您。继续使用我们的服务即表示您接受更新后的政策。"
          ]
        },
        {
          title: "11. 联系我们",
          content: [
            "如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：",
            "• 电子邮件：x.stark.dylan@gmail.com",
            "• 邮件主题：外汇交易员沟通 - 隐私咨询"
          ]
        }
      ],
      riskWarning: {
        title: "风险提示",
        content: "外汇交易具有高风险，可能不适合所有投资者。杠杆交易可能导致快速且巨大的损失。请确保您充分了解相关风险，并在必要时寻求独立建议。本网站内容仅供教育和信息参考，不构成投资建议。"
      }
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: November 2024",
      sections: [
        {
          title: "1. Information Collection",
          content: [
            "We collect the following types of information:",
            "• Personal information: Name, email, contact details you voluntarily provide",
            "• Usage data: Access time, pages viewed, IP address automatically collected",
            "• Trading data: Trading records collected only when you use our trading system",
            "• Cookie information: Technical information to improve user experience"
          ]
        },
        {
          title: "2. Information Use",
          content: [
            "We use collected information to:",
            "• Provide and improve our training services",
            "• Process your training applications and assessments",
            "• Send important notices and updates",
            "• Analyze website usage to optimize user experience",
            "• Protect platform security and prevent fraud"
          ]
        },
        {
          title: "3. Information Sharing",
          content: [
            "We commit to:",
            "• Never sell your personal information to third parties",
            "• Share information only when legally required or with your consent",
            "• Require the same privacy standards when sharing necessary information with partner brokers and prop firms",
            "• Anonymized statistics may be used to improve services"
          ]
        },
        {
          title: "4. Data Security",
          content: [
            "We implement the following measures to protect your data:",
            "• Use SSL/TLS encryption for all sensitive data transmission",
            "• Conduct regular security audits and vulnerability scans",
            "• Restrict employee access to personal information",
            "• Use secure cloud services for data storage",
            "• Regularly backup data to prevent accidental loss"
          ]
        },
        {
          title: "5. Cookie Usage",
          content: [
            "We use Cookies to:",
            "• Remember your login status and preferences",
            "• Analyze website traffic and user behavior",
            "• Provide personalized content and advertisements",
            "You can manage or disable Cookies through browser settings, but this may affect certain website features."
          ]
        },
        {
          title: "6. User Rights",
          content: [
            "You have the right to:",
            "• Access and view personal information we hold about you",
            "• Request correction of inaccurate information",
            "• Request deletion of your personal information (in certain cases)",
            "• Object to or restrict our processing of your data",
            "• Data portability (obtain a copy of your data)",
            "To exercise these rights, please contact us at x.stark.dylan@gmail.com"
          ]
        },
        {
          title: "7. Third-Party Services",
          content: [
            "Our website may contain links to third-party sites, including:",
            "• Partner brokers (EC Markets, TickMill)",
            "• Prop trading firms (FTMO, FundedNext)",
            "• Trading platforms (MetaAPI, MetaTrader)",
            "These third-party sites have their own privacy policies. We are not responsible for their content or practices."
          ]
        },
        {
          title: "8. Children's Privacy",
          content: [
            "Our services are not intended for children under 18. We do not knowingly collect personal information from children. If we discover we have inadvertently collected such information, we will delete it immediately."
          ]
        },
        {
          title: "9. International Data Transfer",
          content: [
            "Your information may be transferred to servers outside your country/region. We ensure these transfers comply with applicable data protection laws and implement appropriate security measures."
          ]
        },
        {
          title: "10. Policy Updates",
          content: [
            "We may update this privacy policy from time to time. Significant changes will be communicated via website announcement or email. Continued use of our services indicates acceptance of the updated policy."
          ]
        },
        {
          title: "11. Contact Us",
          content: [
            "If you have questions or suggestions about this privacy policy, please contact us:",
            "• Email: x.stark.dylan@gmail.com",
            "• Subject: Forex Trader Communication - Privacy Inquiry"
          ]
        }
      ],
      riskWarning: {
        title: "Risk Warning",
        content: "Forex trading carries high risk and may not be suitable for all investors. Leveraged trading can result in rapid and substantial losses. Please ensure you fully understand the risks involved and seek independent advice if necessary. Website content is for educational and informational purposes only and does not constitute investment advice."
      }
    }
  };

  const currentContent = language === 'zh' ? content.zh : content.en;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
            {currentContent.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {currentContent.lastUpdated}
          </p>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {currentContent.sections.map((section, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-black border-2 border-black dark:border-white p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
                {section.title}
              </h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Risk Warning */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 p-6">
            <h2 className="text-xl font-bold mb-4 text-yellow-900 dark:text-yellow-300 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {currentContent.riskWarning.title}
            </h2>
            <p className="text-yellow-900 dark:text-yellow-200 leading-relaxed">
              {currentContent.riskWarning.content}
            </p>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <ShineLinkButton
            href="/"
            className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-[#0a0a0a] dark:hover:bg-gray-200"
          >
            {language === 'zh' ? '返回首页' : 'Back to Home'}
          </ShineLinkButton>
        </motion.div>
      </div>
    </div>
  );
}
