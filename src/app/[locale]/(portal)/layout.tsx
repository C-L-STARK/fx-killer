import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import UnifiedNavbar from "@/components/layout/UnifiedNavbar";
import SplanFooter from "@/components/splan/SplanFooter";
import SubscriptionNotification from "@/components/custom/SubscriptionNotification";
import FloatingContactForm from "@/components/custom/FloatingContactForm";
import WelcomeModalWrapper from "@/components/custom/WelcomeModalWrapper";
import CalendlyWidget from "@/components/custom/CalendlyWidget";
import Providers from "@/components/providers/Providers";
import MouseFollower from "@/components/effects/MouseFollower";
import ScrollProgress, { BackToTop } from "@/components/effects/ScrollProgress";
import PageLoader from "@/components/effects/PageLoader";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fxkiller.com'),
  title: {
    default: "FX Killer - Professional FX Trader Training Platform | 外汇交易职业交易员培训",
    template: "%s | FX Killer"
  },
  description: "FX Killer - 专注于外汇交易的职业交易员培训平台。提供系统化外汇交易培训、实战训练和资金支持。通过专业考核即可获得资金管理权限，分润比例高达90%。培养真正适合外汇市场的专业交易员。",
  keywords: ["FX Killer", "外汇交易", "外汇培训", "职业交易员", "FX交易", "外汇交易员", "外汇培训平台", "forex交易", "专业交易员培训", "外汇实战", "外汇技能培训"],
  authors: [{ name: "FX Killer" }],
  creator: "FX Killer",
  publisher: "FX Killer",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://fxkiller.com",
    siteName: "FX Killer",
    title: "FX Killer - Professional FX Trader Training Platform",
    description: "专注于外汇交易的职业交易员培训平台。提供系统化外汇交易培训、实战训练和资金支持。通过专业考核即可获得资金管理权限，分润比例高达90%。",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FX Killer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "FX Killer - Professional FX Trader Training Platform",
    description: "专注于外汇交易的职业交易员培训平台。提供系统化外汇交易培训、实战训练和资金支持。",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // 可以添加 Google Search Console 验证码
    // google: 'google-site-verification-code',
    other: {
      'baidu-site-verification': 'codeva-kDRjETSiUu',
    },
  },
};

export default async function PortalLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const lang = locale === 'en' ? 'en-US' : 'zh-CN';

  return (
    <html lang={lang} className={inter.variable} suppressHydrationWarning style={{ colorScheme: 'light dark' }}>
      <head>
        <meta name="baidu-site-verification" content="codeva-kDRjETSiUu" />
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <PageLoader />
          <MouseFollower />
          <ScrollProgress />
          <UnifiedNavbar />
          <main className="pt-16">
            <Theme accentColor="gray" scaling="90%" grayColor="slate" appearance="inherit" radius="none">
              {children}
            </Theme>
          </main>
          <SplanFooter />
          <BackToTop />
          <FloatingContactForm />
          <WelcomeModalWrapper />
          <CalendlyWidget />
          <SubscriptionNotification />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
