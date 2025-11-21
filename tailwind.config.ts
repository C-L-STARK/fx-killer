import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 背景色：深黑色系
        gray: {
          800: '#0a0a0a',  // 背景：深黑色
          900: '#000000',  // 背景：纯黑
        },
      },
      textColor: {
        // 文字颜色：保持原始灰色（不覆盖）
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      borderColor: {
        // 边框颜色：红色系（在黑背景上可见）
        gray: {
          200: '#5a2525',  // 可见的暗红边框
          300: '#6a3030',  // 可见的暗红边框
          400: '#7a3535',  // 可见的暗红边框
          600: '#4a2020',  // 可见的暗红边框
          700: '#3a1a1a',  // 可见的暗红边框
          800: '#5a1a1a',  // 表格常用：可见的暗红边框
        },
      },
      animation: {
        scroll: "scroll var(--animation-duration, 40s) linear infinite var(--animation-direction, forwards)",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-100% - 1rem))" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
};

export default config;

