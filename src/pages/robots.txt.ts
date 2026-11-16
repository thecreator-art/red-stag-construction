import type { APIRoute } from 'astro';
import robots from '../app/robots';

export const GET: APIRoute = () => {
  const { rules, sitemap } = robots();
  const list = (value?: string | string[]) => (value === undefined ? [] : Array.isArray(value) ? value : [value]);
  const lines = [
    `User-Agent: ${rules.userAgent ?? '*'}`,
    ...list(rules.allow).map((path) => `Allow: ${path}`),
    ...list(rules.disallow).map((path) => `Disallow: ${path}`),
    '',
    sitemap ? `Sitemap: ${sitemap}` : '',
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
