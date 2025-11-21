"use client";

import React, { useState } from 'react';
import EmailContactModal from '@/components/custom/EmailContactModal';

export default function CoursesPage() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero - Enhanced */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white border-b-2 border-gray-800 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider">专业训练营</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="font-black">培训体系</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            30个工作日专业训练营，从新兵到战士的蜕变之路
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">30</span> 工作日
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">4</span> 训练阶段
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm">
              <span className="text-white font-bold">&lt;18%</span> 通过率
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-black dark:bg-white text-white dark:text-black p-8 border-2 border-black dark:border-white">
            <h2 className="text-2xl font-bold mb-4">我们不是传统培训机构</h2>
            <p className="text-gray-200 dark:text-gray-800 leading-relaxed mb-4">
              我们不提供录播课程、不售卖教学视频、不搞付费培训。我们是<strong className="text-white dark:text-black">外汇交易员专业训练营</strong>，用专业化管理方式将你训练成正规军。
            </p>
            <p className="text-gray-200 dark:text-gray-800 leading-relaxed">
              在这里，你要么通过考核成为战士，要么被劝退离开。<strong className="text-white dark:text-black">培养真正适合的人，留下极少数，劝返大多数。</strong>
            </p>
          </div>
        </section>

        {/* Training Phases */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-black dark:bg-white"></div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">训练阶段</h2>
          </div>
          <div className="space-y-6">

            {/* Phase 1 */}
            <div className="border-l-4 border-black dark:border-white bg-gray-50 dark:bg-black p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-black dark:bg-white text-white dark:text-black w-8 h-8 flex items-center justify-center font-bold border-2 border-black dark:border-white">1</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">规则练习（第1-3天）</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                完成规则练习，尽快熟悉交易系统的基本规则
              </p>
              <div className="bg-gray-50 dark:bg-[#0a0a0a] p-4 border-2 border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">考核要求：</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 15个标准进场点不出错</li>
                  <li className="text-gray-900 dark:text-white font-semibold">• <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1">重要</span> 3天不能完成规则考核，酌情劝退处理</li>
                </ul>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="border-l-4 border-gray-600 dark:border-gray-400 bg-gray-50 dark:bg-black p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-gray-600 dark:bg-gray-400 text-white dark:text-black w-8 h-8 flex items-center justify-center font-bold border-2 border-gray-600 dark:border-gray-400">2</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">盈利练习（第3-20天）</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                开始盈利练习，务必不要想法太多，找到适合自己的品种
              </p>
              <div className="bg-gray-50 dark:bg-[#0a0a0a] p-4 border-2 border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">训练进度：</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-3">
                  <li>• <strong>第一周</strong>：多练习，找到适合自己的品种（先找4-6个观察，稳定到2个交易品种）</li>
                  <li>• <strong>第二周</strong>：按照盈利考核标准进行盈利练习，不错单、不漏单、不亏损</li>
                  <li>• <strong>第三周</strong>：务必不能犯低级错误，务必做到操作一致性</li>
                </ul>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">盈利考核要求：</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 连续10个工作日，每天做到所选交易品种不错单、不漏单、不亏损</li>
                  <li>• 考核期内，允许请假不超过1天</li>
                  <li className="text-gray-900 dark:text-white font-semibold">• <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1">重要</span> 软件到期前不能完成连续10天盈利，劝退处理</li>
                </ul>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="border-l-4 border-gray-700 dark:border-gray-300 bg-gray-50 dark:bg-black p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-[#0a0a0a] dark:bg-gray-300 text-white dark:text-black w-8 h-8 flex items-center justify-center font-bold border-2 border-gray-700 dark:border-gray-300">3</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">小额实盘（20工作日）</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                小额实盘仍旧只有一次机会，超出回撤要求即视为失败，请珍惜
              </p>
              <div className="bg-gray-50 dark:bg-[#0a0a0a] p-4 border-2 border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">资金配置：</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-3">
                  <li>• 20美金仓位，配资100美金</li>
                  <li>• 小额实盘依旧保持盈利考核要求，1-3品种，不错单，不漏单，不亏损</li>
                </ul>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">风控要求：</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li className="text-gray-900 dark:text-white font-semibold">• <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1">风控</span> 日回撤不超过 20%</li>
                  <li className="text-gray-900 dark:text-white font-semibold">• <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1">风控</span> 周总回撤不得超过 30%</li>
                  <li className="text-gray-900 dark:text-white font-semibold">• <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1">重要</span> 超过回撤要求即视为失败，劝退</li>
                </ul>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="border-l-4 border-black dark:border-white bg-gray-100 dark:bg-[#0a0a0a] p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-black dark:bg-white text-white dark:text-black w-8 h-8 flex items-center justify-center font-bold border-2 border-black dark:border-white">★</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">大额矩阵（职业交易员）</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                小额实盘20工作日固化无误，进入大额矩阵
              </p>
              <div className="bg-gray-50 dark:bg-black p-4 border-2 border-black dark:border-white">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">职业交易员特权：</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-3">
                  <li>• <strong>完全自由</strong>：拥有完全自由的工作时间，每天不限制交易量</li>
                  <li>• <strong>底线要求</strong>：保证每日不亏的底线即可</li>
                  <li>• <strong>资金支持</strong>：根据小额实盘表现设定初始仓位</li>
                  <li>• <strong>仓位增长</strong>：随盈利曲线上升，逐步增加仓位规模</li>
                </ul>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">分润比例：</p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• 至少 60% 属于你个人</li>
                  <li>• 随能力提升，比例逐步提高</li>
                  <li>• 至高可达 90% 以上</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Rules */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-black dark:bg-white"></div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">交易铁律</h2>
          </div>
          <div className="bg-gray-50 dark:bg-black border-2 border-gray-300 dark:border-gray-700 p-6">
            <p className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
              交易纪律就像法律法规，触碰一次就会被标上不信任的标签，一旦触碰，就再也无法进入矩阵团队，第二次触碰红线，直接劝退离开团队。<strong>交易就像做手术，务必严肃，容不得任何不遵守规则的人。</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3 text-gray-900 dark:text-white">交易规则红线：</h3>
                <ul className="text-sm text-gray-800 dark:text-gray-200 space-y-2">
                  <li>• 硬止损线不能移动，位置务必设置正确</li>
                  <li>• 只有标准和激进两种进场方式</li>
                  <li>• 不能跨越红折线持仓</li>
                  <li>• 止损和出场必须满足规则条件</li>
                  <li>• 5倍以上利润才能使用止盈线</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 text-gray-900 dark:text-white">会议纪律红线：</h3>
                <ul className="text-sm text-gray-800 dark:text-gray-200 space-y-2">
                  <li>• 学员之间不得加微信、电话等联系方式</li>
                  <li>• 会议室内保持严肃，不得谈论除交易外其他话题</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-black dark:bg-white"></div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">时间安排</h2>
          </div>
          <div className="bg-gray-50 dark:bg-black p-6 border-2 border-gray-200 dark:border-gray-700">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-xs font-bold flex-shrink-0">时间</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">周一至周五</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">每天最低保证 13:30 - 21:30 在线（北京时间）</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-xs font-bold flex-shrink-0">复盘</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">团队长会议室复盘</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">每天北京时间 20:00，可以直接开麦与团队长沟通</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-xs font-bold flex-shrink-0">设备</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">设备要求</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Windows电脑（win虚拟机或云主机也可），独立的交易环境</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA - Enhanced */}
        <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white p-12 text-center border-2 border-gray-800 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white blur-3xl"></div>
          </div>
          <div className="relative">
            <h3 className="text-3xl font-black mb-4">准备好接受挑战了吗？</h3>
            <p className="text-xl text-gray-300 mb-8">
              通过率 &lt; 18%。对你而言，要么是1%，要么是99%。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/splan/psychology-test"
                className="px-8 py-4 bg-white/10 border-2 border-white/20 text-white font-bold hover:bg-white hover:text-black transition-colors backdrop-blur-sm"
              >
                交易心理测评
              </a>
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="px-8 py-4 bg-white text-black font-bold border-2 border-white hover:bg-transparent hover:text-white transition-colors"
              >
                立即申请
              </button>
            </div>
          </div>
        </div>

        {/* Email Contact Modal */}
        <EmailContactModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          title="职业交易员申请"
        />
      </div>
    </div>
  );
}
