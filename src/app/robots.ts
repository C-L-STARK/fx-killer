import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://fxkiller.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',          // 禁止爬取API路由
          '/_next/*',        // 禁止爬取Next.js内部文件
          '/*.json',         // 禁止爬取JSON文件
          '/admin/*',        // 禁止爬取管理后台（如果有）
        ],
      },
      // 针对百度爬虫的特殊规则
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/api/*', '/_next/*'],
      },
      // 针对Google爬虫的特殊规则
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/*', '/_next/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
