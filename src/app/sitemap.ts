import type { MetadataRoute } from 'next';

import blogsData from '@/data/blogs.json';
import locationsData from '@/data/locations.json';
import matrixData from '@/data/matrix.json';
import projectsData from '@/data/projects.json';
import servicesData from '@/data/services.json';

const BASE_URL = 'https://redstagcc.com';
const lastModified = new Date();

const createEntry = (
  path: string,
  priority: number,
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
): MetadataRoute.Sitemap[number] => ({
  url: `${BASE_URL}${path}`,
  lastModified,
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    createEntry('/', 1.0, 'daily'),
    createEntry('/about', 0.5, 'monthly'),
    createEntry('/contact', 0.5, 'monthly'),
    createEntry('/our-work', 0.5, 'monthly'),
    createEntry('/cost-guides', 0.6, 'monthly'),
    createEntry('/areas-we-serve', 0.5, 'monthly'),
    createEntry('/faq', 0.5, 'monthly'),
    createEntry('/our-process', 0.5, 'monthly'),
    createEntry('/reviews', 0.5, 'monthly'),
    createEntry('/licenses-insurance', 0.5, 'monthly'),
    createEntry('/blog', 0.5, 'monthly'),
    createEntry('/for-architects', 0.4, 'monthly'),
    createEntry('/for-designers', 0.4, 'monthly'),
    createEntry('/for-real-estate-agents', 0.4, 'monthly'),
  ];

  const serviceRoutes = servicesData.map((service) =>
    createEntry(`/${service.slug}`, 0.9, 'weekly')
  );

  const locationRoutes = locationsData.map((location) =>
    createEntry(`/${location.slug}`, 0.8, 'weekly')
  );

  const matrixRoutes = matrixData.map((matrix) =>
    createEntry(`/${matrix.slug}`, 0.7, 'monthly')
  );

  const blogRoutes = blogsData.map((blog) =>
    createEntry(`/${blog.slug}`, 0.6, 'monthly')
  );

  const costGuideRoutes = [
    'kitchen-remodel-cost-los-angeles',
    'bathroom-remodel-cost-los-angeles',
    'adu-cost-los-angeles',
    'custom-home-cost-los-angeles',
    'home-addition-cost-los-angeles',
  ].map((slug) => createEntry(`/cost-guides/${slug}`, 0.6, 'monthly'));

  const projectRoutes = projectsData.map((project) =>
    createEntry(`/projects/${project.slug}`, 0.6, 'monthly')
  );

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...locationRoutes,
    ...matrixRoutes,
    ...blogRoutes,
    ...costGuideRoutes,
    ...projectRoutes,
  ];
}
