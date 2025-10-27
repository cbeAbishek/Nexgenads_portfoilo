import { MetadataRoute } from 'next';

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

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(route),
    priority: getPriority(route),
  }));
}
