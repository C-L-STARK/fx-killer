import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fxkiller.com'
  const lastModified = new Date()

  // 定义所有公开页面
  const routes: MetadataRoute.Sitemap = [
    // 首页 - 最高优先级
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },

    // 核心功能页面 - 高优先级
    {
      url: `${baseUrl}/dashboard`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/position-calculator`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // 培训计划页面 - 高优先级
    {
      url: `${baseUrl}/splan/join-us`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/splan/courses`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/splan/psychology-test`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/splan/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/splan/donate`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    },

    // 内容页面
    {
      url: `${baseUrl}/history`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  return routes
}
