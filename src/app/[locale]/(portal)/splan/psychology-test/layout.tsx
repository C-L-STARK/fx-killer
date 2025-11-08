import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '交易心理测评 - 评估你的交易员潜力 | FX Killer',
    'Trading Psychology Test - Assess Your Trader Potential | FX Killer',
    '免费专业交易心理测评，评估你的风险承受能力、决策风格、情绪控制、纪律性等交易员核心素质。了解自己的优势与不足，制定针对性的提升计划。',
    'Free professional trading psychology assessment to evaluate your risk tolerance, decision-making style, emotional control, discipline and core trader qualities. Understand your strengths and weaknesses, develop targeted improvement plans.',
    '交易心理测评, 交易员测试, 风险承受能力, 交易纪律, 情绪管理, 交易心理学, 交易员素质评估, 职业交易员测试',
    'trading psychology test, trader assessment, risk tolerance, trading discipline, emotional management, trading psychology, trader quality evaluation, professional trader test',
    lang,
    {
      url: '/splan/psychology-test',
      type: 'website',
      section: 'Assessment',
      author: 'FX Killer Team',
    }
  );
}

export default function PsychologyTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
