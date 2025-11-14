'use client';

import { createContext, useContext, ReactNode } from 'react';
import { BrandConfig } from '@/lib/brand-config';

const BrandContext = createContext<BrandConfig | null>(null);

export function BrandProvider({
  children,
  config,
}: {
  children: ReactNode;
  config: BrandConfig;
}) {
  return (
    <BrandContext.Provider value={config}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within BrandProvider');
  }
  return context;
}

// 便捷钩子：获取全局邮箱
export function useGlobalEmail(): string {
  const { globalEmail } = useBrand();
  return globalEmail;
}

// 便捷钩子：获取品牌名称
export function useBrandName(locale: 'zh' | 'en' = 'zh'): string {
  const { brandName } = useBrand();
  return brandName[locale];
}

// 便捷钩子：获取 Logo URL
export function useLogo(mode: 'light' | 'dark' = 'light'): string {
  const { logo } = useBrand();
  return logo[mode];
}
