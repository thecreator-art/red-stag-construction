// Site-wide search index.
// Plain data module (no `fs`) so it can be imported from both the
// server-rendered /search page and the client-side search box.

import blogsData from '@/data/blogs.json';
import locationsData from '@/data/locations.json';
import matrixData from '@/data/matrix.json';
import projectsData from '@/data/projects.json';
import servicesData from '@/data/services.json';

export type SearchDocType =
  | 'Service'
  | 'Service Area'
  | 'Project'
  | 'Cost Guide'
  | 'Article'
  | 'Page';

export interface SearchDoc {
  title: string;
  url: string;
  type: SearchDocType;
  description: string;
  /** Extra terms to match against (city, keyword, etc.). */
  keywords: string;
}

const clean = (value: unknown, max = 160): string => {
  if (typeof value !== 'string') return '';
  const stripped = value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (stripped.length <= max) return stripped;
  return `${stripped.slice(0, max - 1).trimEnd()}…`;
};

// Core marketing / informational pages that live outside the data files.
const staticPages: SearchDoc[] = [
  { title: 'Home', url: '/', type: 'Page', description: 'Licensed Los Angeles general contractor since 2011 — custom homes, ADUs, remodels, and additions.', keywords: 'home main' },
  { title: 'About Red Stag Construction', url: '/about', type: 'Page', description: 'Meet the licensed team behind Los Angeles most demanding construction projects.', keywords: 'about team company history' },
  { title: 'Our Work', url: '/our-work', type: 'Page', description: 'A portfolio of custom homes, remodels, and additions built across Greater Los Angeles.', keywords: 'portfolio gallery projects work' },
  { title: 'Our Process', url: '/our-process', type: 'Page', description: 'How Red Stag scopes, permits, and delivers a construction project from first call to closeout.', keywords: 'process how we work steps' },
  { title: 'Reviews', url: '/reviews', type: 'Page', description: 'What Los Angeles homeowners say about building with Red Stag Construction.', keywords: 'reviews testimonials ratings' },
  { title: 'Areas We Serve', url: '/areas-we-serve', type: 'Page', description: 'Neighborhoods and cities across Los Angeles County served by Red Stag Construction.', keywords: 'areas service area coverage cities' },
  { title: 'Cost Guides', url: '/cost-guides', type: 'Page', description: 'Detailed 2026 pricing guides for remodels, ADUs, additions, and custom builds in LA.', keywords: 'cost pricing budget estimate guides' },
  { title: 'Blog', url: '/blog', type: 'Page', description: 'Construction, remodeling, and permitting insights for Los Angeles homeowners.', keywords: 'blog articles news insights' },
  { title: 'FAQ', url: '/faq', type: 'Page', description: 'Answers to common questions about permits, timelines, budgets, and working with Red Stag.', keywords: 'faq questions answers help' },
  { title: 'Contact Us', url: '/contact', type: 'Page', description: 'Request a free, no-obligation estimate for your Los Angeles construction project.', keywords: 'contact estimate quote phone email' },
  { title: 'Licenses & Insurance', url: '/licenses-insurance', type: 'Page', description: 'Red Stag Construction licensing, bonding, and insurance details.', keywords: 'license insurance bonded CSLB' },
  { title: 'For Architects', url: '/for-architects', type: 'Page', description: 'How Red Stag partners with architects on complex Los Angeles builds.', keywords: 'architects partners design' },
  { title: 'For Designers', url: '/for-designers', type: 'Page', description: 'Collaborating with interior designers on high-end Los Angeles projects.', keywords: 'designers interior partners' },
  { title: 'For Real Estate Agents', url: '/for-real-estate-agents', type: 'Page', description: 'Renovation and pre-sale construction support for LA real estate agents.', keywords: 'real estate agents referral partners' },
  { title: 'Privacy Policy', url: '/privacy-policy', type: 'Page', description: 'How Red Stag Construction handles your information.', keywords: 'privacy policy legal' },
  { title: 'Terms of Service', url: '/terms', type: 'Page', description: 'Terms governing use of the Red Stag Construction website.', keywords: 'terms legal conditions' },
];

// Cost guides are defined inline in the cost-guides route; mirror their slugs here.
const costGuides: SearchDoc[] = [
  { slug: 'kitchen-remodel-cost-los-angeles', title: 'Kitchen Remodel Cost in Los Angeles (2026)' },
  { slug: 'bathroom-remodel-cost-los-angeles', title: 'Bathroom Remodel Cost in Los Angeles (2026)' },
  { slug: 'adu-cost-los-angeles', title: 'ADU Cost in Los Angeles (2026)' },
  { slug: 'custom-home-cost-los-angeles', title: 'Custom Home Cost in Los Angeles (2026)' },
  { slug: 'home-addition-cost-los-angeles', title: 'Home Addition Cost in Los Angeles (2026)' },
].map((g) => ({
  title: g.title,
  url: `/cost-guides/${g.slug}`,
  type: 'Cost Guide' as const,
  description: 'Detailed 2026 cost breakdown, budgeting factors, and permit expectations for Los Angeles.',
  keywords: `cost price budget ${g.slug.replace(/-/g, ' ')}`,
}));

const serviceDocs: SearchDoc[] = servicesData.map((s) => ({
  title: clean(s.title) || clean(s.h1),
  url: `/${s.slug}`,
  type: 'Service',
  description: clean(s.metaDescription) || clean(s.intro),
  keywords: `${clean(s.keyword, 80)} service`,
}));

const matrixDocs: SearchDoc[] = matrixData.map((m) => ({
  title: clean(m.title),
  url: `/${m.slug}`,
  type: 'Service Area',
  description: clean(m.intro),
  keywords: `${clean(m.service, 60)} ${clean(m.city, 60)}`,
}));

const locationDocs: SearchDoc[] = locationsData.map((l) => ({
  title: `General Contractor in ${clean(l.city)}`,
  url: `/${l.slug}`,
  type: 'Service Area',
  description: clean(l.intro),
  keywords: `${clean(l.city, 60)} location area`,
}));

const projectDocs: SearchDoc[] = projectsData.map((p) => ({
  title: clean(p.title),
  url: `/projects/${p.slug}`,
  type: 'Project',
  description: clean(p.tagline) || clean(p.description),
  keywords: `${clean(p.category, 60)} ${clean(p.location, 60)} project portfolio`,
}));

const blogDocs: SearchDoc[] = blogsData.map((b) => ({
  title: clean(b.title),
  url: `/${b.slug}`,
  type: 'Article',
  description: 'Guide from the Red Stag Construction blog.',
  keywords: `${clean(b.keyword, 80)} article blog`,
}));

export const SEARCH_DOCS: SearchDoc[] = [
  ...staticPages,
  ...serviceDocs,
  ...costGuides,
  ...matrixDocs,
  ...locationDocs,
  ...projectDocs,
  ...blogDocs,
].filter((d) => d.title && d.url);

/**
 * Ranked, case-insensitive search across titles, descriptions, and keywords.
 * Returns the best matches first, capped at `limit`.
 */
export function searchDocs(query: string, limit = 40): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const terms = q.split(/\s+/).filter(Boolean);

  const scored = SEARCH_DOCS.map((doc) => {
    const title = doc.title.toLowerCase();
    const keywords = doc.keywords.toLowerCase();
    const description = doc.description.toLowerCase();
    const haystack = `${title} ${keywords} ${description}`;

    let score = 0;
    for (const term of terms) {
      if (!haystack.includes(term)) return { doc, score: -1 }; // every term must appear
      if (title === term) score += 100;
      if (title.startsWith(term)) score += 40;
      if (title.includes(term)) score += 25;
      if (keywords.includes(term)) score += 10;
      if (description.includes(term)) score += 4;
    }
    // Whole-phrase bonus.
    if (title.includes(q)) score += 30;
    return { doc, score };
  })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((entry) => entry.doc);
}
