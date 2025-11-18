import LocaleLink from '@/components/navigation/LocaleLink';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '感谢您的联系 | Thank You',
  description: '我们已收到您的信息，会尽快与您联系。',
};

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Thank You Message */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
          {isZh ? '感谢您的联系！' : 'Thank You!'}
        </h1>

        <div className="space-y-4 mb-12">
          <p className="text-xl text-gray-700 dark:text-gray-300">
            {isZh
              ? '我们已经收到您的信息'
              : 'We have received your message'}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {isZh
              ? '我们的团队会在24小时内与您取得联系，请留意您的邮箱。'
              : 'Our team will contact you within 24 hours. Please check your email.'}
          </p>
          <p className="text-md text-gray-500 dark:text-gray-500">
            {isZh
              ? '期待与您一起开启职业交易员之旅！'
              : 'Looking forward to starting your professional trading journey!'}
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-8"></div>

        {/* Back to Home Button */}
        <LocaleLink
          href="/"
          className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-lg font-semibold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
        >
          {isZh ? '返回主页' : 'Back to Home'}
        </LocaleLink>
      </div>
    </div>
  );
}
