import type { APIRoute } from 'astro';
import sitemap from '../app/sitemap';

export const GET: APIRoute = () => {
  const urls = sitemap()
    .map((entry) => {
      const lastmod = entry.lastModified ? new Date(entry.lastModified).toISOString() : '';
      return [
        '<url>',
        `<loc>${entry.url}</loc>`,
        lastmod ? `<lastmod>${lastmod}</lastmod>` : '',
        entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : '',
        entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : '',
        '</url>',
      ].join('');
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
