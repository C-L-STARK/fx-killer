"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import EmailContactModal from '@/components/custom/EmailContactModal';
import { useLanguage } from '@/contexts/LanguageContext';
import PremiumCTA from '@/components/custom/PremiumCTA';

// FAQ data types
interface FAQ {
  question: string;
  answer: string;
}

interface FAQData {
  course: FAQ[];
  learning: FAQ[];
  pricing: FAQ[];
  support: FAQ[];
  other: FAQ[];
}

// FAQ data function based on language
const getFAQData = (language: 'zh' | 'en'): FAQData => {
  if (language === 'zh') {
    return {
      course: [
        {
          question: '什么是 FX Killer 外汇交易员培训？',
          answer: '我们是一个专注于筛选和培养顶尖外汇交易员的专业培训平台。我们致力于用最短的时间从大量人群中筛选出少数适合做交易的人才并进行培养。我们将在<strong> 30个工作日</strong>内判断新人是否是做交易的可塑之才。通过考核者将获得资金支持，成为独立交易员或基金经理。'
        },
        {
          question: '为什么筛选如此严格？',
          answer: '我们的理念是<strong>培养真正适合的人，留下极少数，劝返大多数</strong>。在交易的世界里，有些人天生不适合。我们用严格的筛选机制确保只有真正适合的人才能进入。这不是贬低，而是对每个人负责——不让不适合的人在二级市场上成为韭菜。'
        },
        {
          question: '30个工作日会学习什么？',
          answer: '<strong>第1-3天</strong>：完成规则练习，熟悉交易系统基本规则（15个标准进场点不出错）<br/><strong>第3-20天</strong>：盈利练习，找到适合自己的品种，要求连续10个工作日不错单、不漏单、不亏损<br/><strong>第20-40天</strong>：小额实盘训练（如通过盈利考核）<br/>软件到期前不能完成考核，将被劝退。'
        },
        {
          question: '为什么只有一次机会？',
          answer: '因为交易就像做手术，务必严肃，容不得任何不遵守规则的人。一旦开始职业交易训练，会投入大量精力和时间去培养。每个人的时间和精力都很宝贵，我们需要确保双方的投入都是值得的。<strong>匹配度决定一切。</strong>'
        },
        {
          question: '通过考核的概率有多大？',
          answer: '根据历史数据，通过考核的概率<strong> &lt; 18%</strong>。但对你而言，要么是1%，要么是99%。这取决于你是否真正适合做交易，是否严格遵守纪律，是否能承受压力并保持情绪稳定。'
        }
      ],
      learning: [
        {
          question: '培训是免费的吗？',
          answer: '是的，培训过程不收取学费。但你需要付出的是<strong>时间和精力</strong>。免费的往往是最"贵"的——一旦被选中进入培训，需要全身心投入。真正能坚持下来的人虽然不会为金钱所累，但的确"任重道远"。'
        },
        {
          question: '需要什么样的基础条件？',
          answer: '<ul><li>大专学历以上，35岁以下</li><li>认真、细心、耐心、心理健康</li><li>连续30个工作日可投入</li><li>Windows电脑，独立的交易环境</li><li>周一到周五，每天最低保证 13:30 - 21:30 在线</li><li>北京时间20:00参加团队长会议室复盘</li></ul>'
        },
        {
          question: '3天不能完成规则考核会怎样？',
          answer: '3天不能完成规则考核，将<strong>酌情劝退处理</strong>。我们的筛选机制非常严格，如果连基本规则都无法快速掌握，说明可能不适合这个行业。这是为了保护你，避免浪费更多时间。'
        },
        {
          question: '通过考核后可以获得什么？',
          answer: '通过考核后，我们会为你分配资金：<ul><li><strong>小额实盘</strong>：20美金仓位，配资100美金</li><li><strong>大额实盘</strong>：根据小额实盘表现设定</li><li><strong>分润比例</strong>：60%-90%+（随能力提升而提高）</li><li><strong>完全自由</strong>：不受时间空间限制，可以在世界任何角落工作</li></ul>'
        },
        {
          question: '学习过程中可以提问吗？',
          answer: '可以。每天北京时间20:00有团队长会议室复盘，可以直接开麦与团队长沟通。其他时间可以通过微信与团队长联系。但请注意：<strong>学员之间不得加微信、电话等联系方式</strong>，这是纪律红线。'
        }
      ],
      pricing: [
        {
          question: '关于收入、社保、底薪和薪资结构',
          answer: '任何盈利导向的企业，都不会做亏本买卖。在我们这个极简行业，所有价值都源于二级市场的买卖差价——简单、直接、残酷。<strong>在你证明盈利能力（通过考核）之前，我们不会投入一分钱。</strong>考核通过后，你的实际收入，绝不会超过你在"战场"（二级市场）上缴获的"战利品"。'
        },
        {
          question: '通过考核后的收入分配如何？',
          answer: '你在战场获得的战利品，<strong>至少 60% 属于你个人</strong>，随着你的能力提升，这个比例也会随之提高，<strong>至高可达 90% 以上</strong>。剩下的属于我们，所以我们会用心培养每一位准交易员——你战场战利品多，我们战利品也才会多，我们是一条船上的战友，荣辱与共！'
        },
        {
          question: '小额实盘的风控要求是什么？',
          answer: '小额实盘<strong>只有一次机会</strong>，请珍惜：<ul><li>日回撤不超过 20%</li><li>周总回撤不得超过 30%</li><li>超过回撤要求即视为失败，劝退</li></ul>这是硬性规定，目的是培养你的风险管理能力。'
        },
        {
          question: '为什么不需要付学费？',
          answer: '跟传统学科不同，不需要你付出数万美金的"学费"，毕竟这是一个钱生钱的行当。我们的模式是：我们培养你，你通过后我们分享你的战果。这是一种<strong>合作共赢</strong>的关系，而非雇佣关系。你是一个独立的创业者，独立的个体。'
        }
      ],
      support: [
        {
          question: '什么是交易铁律？',
          answer: '交易纪律就像法律法规，触碰一次就会被标上不信任的标签。<strong>一旦触碰，就再也无法进入矩阵团队；第二次触碰红线，直接劝退离开团队。</strong>交易就像做手术，务必严肃，容不得任何不遵守规则的人。'
        },
        {
          question: '交易规则红线有哪些？',
          answer: '<ul><li>硬止损线不能移动，位置务必设置正确</li><li>只有标准和激进两种进场方式（盈利训练阶段额外增加破止损线入场），其他都是错单</li><li>不能跨越红折线持仓</li><li>止损和出场必须满足规则条件，不满足一律按错单处理</li><li>5倍以上利润才能使用止盈线</li></ul>'
        },
        {
          question: '会议纪律红线有哪些？',
          answer: '<ul><li><strong>学员之间不得加微信、电话等联系方式</strong></li><li>会议室内保持严肃，不得谈论除交易外其他话题</li></ul>违反以上任何一条，都将被视为触碰红线。'
        },
        {
          question: '如果不适合做交易会怎样？',
          answer: '如果在30个工作日内，我们判断你不适合做交易，会如实告知，并<strong>劝诫其此生不要踏足二级市场</strong>。这不是侮辱，而是保护。不适合的人进入二级市场，最终只会成为韭菜，亏损累累。我们帮你避免这个结局。'
        }
      ],
      other: [
        {
          question: '为什么说"年轻人更适合"？',
          answer: '国内多数"经验丰富"的中年交易员，往往是失败者：不良习惯缠身，或在不上不下的泥沼中挣扎。<strong>经验有时是枷锁，而非利剑。</strong>真正适配的是20-35岁的年轻人：学习迅捷、适应力强，能直面市场风暴。我们计划在30个工作日内，让年轻人直达那些"专家"10-20年的盈利高度。'
        },
        {
          question: '交易有风险吗？',
          answer: '<strong>交易存在较高风险</strong>，可能导致本金损失。市场波动、杠杆使用、情绪化决策等都可能带来亏损。我们会系统教授风险管理知识，但请务必记住：<strong>交易有风险，投资需谨慎</strong>，不要投入超过您承受能力的资金。'
        },
        {
          question: '我可以一边工作一边参加培训吗？',
          answer: '不可以。培训要求<strong>连续30个工作日</strong>，周一到周五每天最低保证 13:30 - 21:30 在线。这是全职投入的筛选和培养过程。如果无法保证时间投入，建议不要申请，因为这会浪费双方的时间。'
        },
        {
          question: '通过考核后还需要每天在线吗？',
          answer: '不需要。通过考核进入大额矩阵后，你将拥有<strong>完全自由的工作时间</strong>，每天不限制交易量，只需保证每日不亏的底线即可。你可以在阿尔卑斯山滑雪，夏威夷游泳或北海道发呆……金钱会源源不断地自动流入你的口袋。'
        }
      ]
    };
  } else {
    // English FAQs
    return {
      course: [
        {
          question: 'What is FX Killer Forex Trader Training?',
          answer: 'We are a professional training platform focused on selecting and cultivating elite forex traders. We are committed to identifying, in the shortest time possible, the few individuals from a large population who are suited for trading, and providing them with cultivation. Within <strong>30 working days</strong>, we will determine whether newcomers have the potential to become traders. Those who pass the assessment will receive capital support and become independent traders or fund managers.'
        },
        {
          question: 'Why is the selection so strict?',
          answer: 'Our philosophy is to <strong>cultivate those truly suited, retain the few, and advise the majority to pursue other paths</strong>. In the trading world, some people are inherently unsuited. We use a strict selection mechanism to ensure only those truly suited can enter. This isn\'t disparagement, but responsibility for everyone—preventing unsuited individuals from becoming cannon fodder in secondary markets.'
        },
        {
          question: 'What will I learn in 30 working days?',
          answer: '<strong>Days 1-3</strong>: Complete rules practice, familiarize with basic trading system rules (15 standard entry points without errors)<br/><strong>Days 3-20</strong>: Profit practice, find suitable currency pairs, requirement: 10 consecutive working days with no missed entries, no missed exits, no losses<br/><strong>Days 20-40</strong>: Small-amount live training (if profit assessment passed)<br/>Failure to complete assessment before software expiration results in dismissal.'
        },
        {
          question: 'Why only one chance?',
          answer: 'Because trading is like performing surgery—utmost seriousness required, no tolerance for rule violators. Once professional trading training begins, significant energy and time are invested in cultivation. Everyone\'s time and energy are precious; we need to ensure both parties\' investment is worthwhile. <strong>Compatibility determines everything.</strong>'
        },
        {
          question: 'What is the probability of passing the assessment?',
          answer: 'Based on historical data, the probability of passing is <strong>&lt; 18%</strong>. But for you, it\'s either 1% or 99%. It depends on whether you\'re truly suited for trading, whether you strictly follow discipline, and whether you can handle pressure while maintaining emotional stability.'
        }
      ],
      learning: [
        {
          question: 'Is the training free?',
          answer: 'Yes, the training process is free of tuition. But what you need to invest is <strong>time and energy</strong>. Free is often the most "expensive"—once selected for training, full dedication is required. Those who truly persevere won\'t be burdened by money, but indeed "the road is long and arduous."'
        },
        {
          question: 'What are the basic requirements?',
          answer: '<ul><li>Associate degree or higher, under 35 years old</li><li>Serious, meticulous, patient, psychologically healthy</li><li>Continuous 30 working days available</li><li>Windows computer, independent trading environment</li><li>Monday to Friday, minimum guaranteed online 1:30 PM - 9:30 PM</li><li>Beijing Time 8:00 PM team leader conference room debrief</li></ul>'
        },
        {
          question: 'What happens if I can\'t complete rules assessment in 3 days?',
          answer: 'Failure to complete rules assessment in 3 days results in <strong>discretionary dismissal</strong>. Our selection mechanism is very strict. If you can\'t quickly master basic rules, it indicates you may not be suited for this industry. This protects you from wasting more time.'
        },
        {
          question: 'What do I get after passing the assessment?',
          answer: 'After passing, we will allocate capital to you: <ul><li><strong>Small-amount live</strong>: $20 position, $100 capital allocation</li><li><strong>Large-amount live</strong>: Set based on small-amount live performance</li><li><strong>Profit share</strong>: 60%-90%+ (increases with ability improvement)</li><li><strong>Complete freedom</strong>: Unrestricted by time and space, can work anywhere in the world</li></ul>'
        },
        {
          question: 'Can I ask questions during learning?',
          answer: 'Yes. Daily Beijing Time 8:00 PM team leader conference room debrief where you can communicate directly with the team leader. Other times you can contact via WeChat. But note: <strong>Students must not add WeChat, phone, or other contact methods between each other</strong>—this is a discipline red line.'
        }
      ],
      pricing: [
        {
          question: 'About Income, Benefits, Base Salary, and Compensation Structure',
          answer: 'Any profit-oriented enterprise won\'t do business at a loss. In our minimalist industry, all value comes from market price differences—simple, direct, brutal. <strong>Before you prove profitability (pass assessment), we won\'t invest a penny.</strong> After passing, your actual income will never exceed the "spoils" you capture in the "battlefield" (secondary market).'
        },
        {
          question: 'How is income distributed after passing the assessment?',
          answer: 'The spoils you capture on the battlefield—<strong>at least 60% belong to you personally</strong>. As your abilities improve, this ratio increases, <strong>reaching up to 90% and beyond</strong>. The rest belongs to us, so we will cultivate every trainee wholeheartedly—the more spoils you get, the more we get. We are comrades on the same boat, sharing honor and disgrace!'
        },
        {
          question: 'What are the risk control requirements for small-amount live trading?',
          answer: 'Small-amount live trading has <strong>only one chance</strong>, please cherish it: <ul><li>Daily drawdown not exceeding 20%</li><li>Weekly total drawdown not exceeding 30%</li><li>Exceeding drawdown requirements is considered failure, resulting in dismissal</li></ul>This is a hard requirement aimed at cultivating your risk management ability.'
        },
        {
          question: 'Why is there no tuition fee?',
          answer: 'Unlike traditional disciplines, you don\'t need to pay tens of thousands in "tuition"—after all, this is a business of money making money. Our model: we cultivate you, after you pass we share your results. This is a <strong>mutual cooperation</strong> relationship, not employment. You are an independent entrepreneur, an independent individual.'
        }
      ],
      support: [
        {
          question: 'What are Trading Iron Laws?',
          answer: 'Trading discipline is like laws and regulations; touching it once brands you as untrustworthy. <strong>Once touched, you can never enter the matrix team; a second violation of red lines results in direct dismissal from the team.</strong> Trading is like performing surgery—utmost seriousness required, no tolerance for rule violators.'
        },
        {
          question: 'What are the trading rule red lines?',
          answer: '<ul><li>Hard stop-loss lines cannot be moved; positions must be set correctly</li><li>Only standard and aggressive entry methods (profit training phase additionally includes break-stop-loss-line entry), others are errors</li><li>Cannot hold positions across red折lines</li><li>Stop-loss and exit must meet rule conditions; non-compliance is treated as errors</li><li>Take-profit lines can only be used with 5x+ profit</li></ul>'
        },
        {
          question: 'What are the meeting discipline red lines?',
          answer: '<ul><li><strong>Students must not add WeChat, phone, or other contact methods between each other</strong></li><li>Maintain seriousness in conference rooms; no discussion of topics other than trading</li></ul>Violating any of the above will be considered touching red lines.'
        },
        {
          question: 'What happens if I\'m not suited for trading?',
          answer: 'If within 30 working days we judge you unsuited for trading, we will be honest and <strong>advise you never to enter secondary markets</strong>. This isn\'t insult, but protection. Unsuited people entering secondary markets ultimately only become cannon fodder with cumulative losses. We help you avoid this outcome.'
        }
      ],
      other: [
        {
          question: 'Why are "young people more suitable"?',
          answer: 'Most "experienced" middle-aged traders in China are often failures: plagued by bad habits or struggling in mediocrity. <strong>Experience can sometimes be shackles, not a sword.</strong> Truly suited are 20-35-year-old young people: quick learners, highly adaptable, able to face market storms directly. We plan to bring young people to the profitability level of those "experts" with 10-20 years of experience within 30 working days.'
        },
        {
          question: 'Does trading carry risk?',
          answer: '<strong>Trading carries high risk</strong>, potentially leading to principal loss. Market volatility, leverage use, emotional decisions can all bring losses. We will systematically teach risk management knowledge, but please remember: <strong>Trading carries risk, investment requires caution</strong>—do not invest funds beyond your capacity to bear.'
        },
        {
          question: 'Can I participate in training while working?',
          answer: 'No. Training requires <strong>continuous 30 working days</strong>, Monday to Friday minimum guaranteed online 1:30 PM - 9:30 PM. This is a full-time selection and cultivation process. If you cannot guarantee time investment, we suggest not applying, as this wastes both parties\' time.'
        },
        {
          question: 'Do I still need to be online daily after passing the assessment?',
          answer: 'No. After passing and entering the large-amount matrix, you will have <strong>complete freedom in working hours</strong>, no daily trading volume limits, just maintain the baseline of no daily losses. You can ski in the Alps, swim in Hawaii, or daydream in Hokkaido... Money will continuously flow into your pocket.'
        }
      ]
    };
  }
};

// FAQ Item component
const FAQItem = ({ faq, isOpen, onClick }: { faq: FAQ; isOpen: boolean; onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-black border overflow-hidden transition-all ${isOpen ? 'border-[#ff102a] shadow-[0_0_20px_rgba(255,16,42,0.1)]' : 'border-gray-800 hover:border-gray-600'
        }`}
    >
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-6 text-left transition-all ${isOpen ? 'bg-black' : 'hover:bg-black/50'
          }`}
      >
        <span className="flex-1 pr-4 font-bold text-lg text-white">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-8 h-8 flex items-center justify-center ${isOpen ? 'bg-[#ff102a]' : 'bg-[#0a0a0a]'
            }`}
        >
          <span className={`text-lg font-bold ${isOpen ? 'text-white' : 'text-gray-400'}`}>
            ▼
          </span>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="px-6 pb-6 pt-2 text-gray-400 text-base leading-relaxed border-t border-gray-800"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const { t, language } = useLanguage();

  // Get FAQ data based on current language
  const faqData = getFAQData(language);

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`;
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key);
    } else {
      newOpenItems.add(key);
    }
    setOpenItems(newOpenItems);
  };

  const filterFAQs = (faqs: FAQ[]) => {
    if (!searchQuery) return faqs;
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black border-b-2 border-[#ff102a]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff102a] blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff102a] blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-[#ff102a]/10 border border-[#ff102a] backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider text-[#ff102a]">{t('faq.hero.badge')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
            {t('faq.hero.title')}
            <br />
            <span className="text-3xl md:text-4xl font-normal text-gray-300">{t('faq.hero.subtitle')}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('faq.hero.desc')}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('faq.search.placeholder')}
              className="w-full px-6 py-5 pr-32 text-lg border border-gray-800 bg-black text-white focus:outline-none focus:border-[#ff102a] transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <span className="px-6 py-3 bg-[#ff102a] text-white font-bold text-sm">
                {t('faq.search.button')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Course FAQs */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-[#ff102a]"></div>
            <h2 className="text-3xl font-black text-white">{t('faq.category.course')}</h2>
            <span className="px-4 py-2 bg-black border border-gray-800 text-white text-sm font-bold">
              {filterFAQs(faqData.course).length}
            </span>
          </div>
          <div className="space-y-4">
            {filterFAQs(faqData.course).map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openItems.has(`course-${index}`)}
                onClick={() => toggleItem('course', index)}
              />
            ))}
          </div>
        </section>

        {/* Learning FAQs */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-[#ff102a]"></div>
            <h2 className="text-3xl font-black text-white">{t('faq.category.learning')}</h2>
            <span className="px-4 py-2 bg-black border border-gray-800 text-white text-sm font-bold">
              {filterFAQs(faqData.learning).length}
            </span>
          </div>
          <div className="space-y-4">
            {filterFAQs(faqData.learning).map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openItems.has(`learning-${index}`)}
                onClick={() => toggleItem('learning', index)}
              />
            ))}
          </div>
        </section>

        {/* Pricing FAQs */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-[#ff102a]"></div>
            <h2 className="text-3xl font-black text-white">{t('faq.category.pricing')}</h2>
            <span className="px-4 py-2 bg-black border border-gray-800 text-white text-sm font-bold">
              {filterFAQs(faqData.pricing).length}
            </span>
          </div>
          <div className="space-y-4">
            {filterFAQs(faqData.pricing).map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openItems.has(`pricing-${index}`)}
                onClick={() => toggleItem('pricing', index)}
              />
            ))}
          </div>
        </section>

        {/* Support FAQs */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-[#ff102a]"></div>
            <h2 className="text-3xl font-black text-white">{t('faq.category.support')}</h2>
            <span className="px-4 py-2 bg-black border border-gray-800 text-white text-sm font-bold">
              {filterFAQs(faqData.support).length}
            </span>
          </div>
          <div className="space-y-4">
            {filterFAQs(faqData.support).map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openItems.has(`support-${index}`)}
                onClick={() => toggleItem('support', index)}
              />
            ))}
          </div>
        </section>

        {/* Other FAQs */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-[#ff102a]"></div>
            <h2 className="text-3xl font-black text-white">{t('faq.category.other')}</h2>
            <span className="px-4 py-2 bg-black border border-gray-800 text-white text-sm font-bold">
              {filterFAQs(faqData.other).length}
            </span>
          </div>
          <div className="space-y-4">
            {filterFAQs(faqData.other).map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openItems.has(`other-${index}`)}
                onClick={() => toggleItem('other', index)}
              />
            ))}
          </div>
        </section>

      </div>

      {/* Premium CTA */}
      <PremiumCTA
        title={{
          zh: '还有疑问？',
          en: 'Still Have Questions?'
        }}
        subtitle={{
          zh: '无法找到你想要的答案？联系我们的团队获取专业解答和咨询。',
          en: 'Can\'t find the answer you\'re looking for? Contact our team for professional answers and consultation.'
        }}
        primaryButton={{
          text: { zh: '立即咨询', en: 'Contact Now' },
          action: 'modal'
        }}
        secondaryButton={{
          text: { zh: '查看培训计划', en: 'View Training' },
          action: 'link',
          link: `/${language}/splan/join-us`
        }}
        showStats={false}
        onModalOpen={() => setIsEmailModalOpen(true)}
      />

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title={t('faq.contact.modal.title')}
      />
    </div>
  );
}
