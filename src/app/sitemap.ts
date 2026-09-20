import { MetadataRoute } from 'next';
import productsData from '../data/products.json';

const BASE_URL = 'https://www.aquacy.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about-us',
    '/catalog',
    '/contact',
    '/communication-modules',
    '/instruments',
    '/systems-monitoring',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const productRoutes = productsData.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
