import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nexgenads.space';

  const routes = [
    '/',
    '/about',
    '/investors',
    '/partners',
    '/survey',
    '/contact',
    '/blog',
    '/faq',
    '/privacy-policy',
    '/terms',
    '/cookie-policy',
    '/support',
    '/waitlist',
  ];

  const getPriority = (route: string): number => {
    switch (route) {
      case '/':
        return 1.0;
      case '/investors':
      case '/partners':
        return 0.9;
      case '/about':
      case '/blog':
        return 0.8;
      case '/survey':
      case '/contact':
        return 0.7;
      default:
        return 0.5;
    }
  };

  const getChangeFrequency = (route: string): 'daily' | 'weekly' | 'monthly' | 'yearly' => {
    switch (route) {
      case '/':
      case '/blog':
        return 'weekly';
      case '/investors':
      case '/partners':
      case '/about':
      case '/survey':
      case '/contact':
        return 'monthly';
      default:
        return 'yearly';
    }
  };

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(route),
    priority: getPriority(route),
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts
    .filter((post) => post.status === 'published')
    .map((post) => {
      const lastModified = new Date(post.updatedDate ?? post.publishDate);
      const images = post.coverImage
        ? [post.coverImage.startsWith('http') ? post.coverImage : `${baseUrl}${post.coverImage}`]
        : undefined;

      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
        images,
      };
    });

  return [...staticEntries, ...blogEntries];
}
