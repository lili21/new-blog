import { MetadataRoute } from 'next'
import { allPosts } from "contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  return allPosts.map(post => ({
    url: `https://blog.lili21.me${post.url}`,
    lastModified: post.date,
    changeFrequency: 'yearly',
    priority: 1,
  }))
}
