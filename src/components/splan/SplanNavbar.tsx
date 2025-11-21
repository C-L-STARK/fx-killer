"use client";

import React from 'react';
import Link from 'next/link';

export default function SplanNavbar() {
  return (
    <nav className="bg-white dark:bg-[#0a0a0a] border-b-2 border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-black text-black dark:text-white">FX</span>
            <span className="text-2xl font-normal text-gray-600 dark:text-gray-400 ml-1">Killer</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/splan/join-us"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              外汇培训
            </Link>
            <Link
              href="/splan/courses"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              培训体系
            </Link>
            <Link
              href="/splan/faq"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              常见问题
            </Link>
            <Link
              href="/splan/psychology-test"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              心理测评
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors font-semibold"
            >
              交易系统
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm"
            >
              返回首页
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden mt-4 pt-4 border-t-2 border-gray-200 dark:border-gray-700 space-y-2">
          <Link
            href="/splan/join-us"
            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            外汇培训
          </Link>
          <Link
            href="/splan/courses"
            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            培训体系
          </Link>
          <Link
            href="/splan/faq"
            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            常见问题
          </Link>
          <Link
            href="/splan/psychology-test"
            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            心理测评
          </Link>
          <Link
            href="/dashboard"
            className="block py-2 text-black dark:text-white font-semibold"
          >
            交易系统
          </Link>
        </div>
      </div>
    </nav>
  );
}
