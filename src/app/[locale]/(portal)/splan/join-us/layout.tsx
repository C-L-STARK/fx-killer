import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '加入FX Killer - 30天成为职业外汇交易员 | 汇刃交易员培训',
    'Join FX Killer - Become a Professional Forex Trader in 30 Days',
    'FX Killer职业交易员培训计划：30天系统化培训，通过考核获得真实资金交易权限，分润高达90%。专业导师指导，实战训练，风险管理，助你成为盈利的职业交易员。',
    'FX Killer professional trader training program: 30-day systematic training, pass evaluation to get real funded trading account, up to 90% profit split. Expert mentorship, practical training, risk management - become a profitable professional trader.',
    '外汇交易员培训, 职业交易员, 交易员招募, 资金管理, 外汇培训计划, 交易员考核, 盈利分成, 专业交易培训, funded trader, prop trading',
    'forex trader training, professional trader, trader recruitment, funded account, forex training program, trader evaluation, profit split, professional trading education, funded trader, prop trading',
    lang,
    {
      url: '/splan/join-us',
      type: 'website',
      section: 'Recruitment',
      author: 'FX Killer Team',
    }
  );
}

export default function JoinUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
