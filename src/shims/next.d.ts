// Type-only stand-ins so existing page files keep compiling without Next.js.
declare module 'next' {
  export interface Metadata {
    title?: string;
    description?: string;
    robots?: { index?: boolean; follow?: boolean } | string;
    alternates?: { canonical?: string };
    openGraph?: Record<string, unknown>;
    twitter?: Record<string, unknown>;
    other?: Record<string, string>;
    [key: string]: unknown;
  }
  export namespace MetadataRoute {
    type Sitemap = Array<{
      url: string;
      lastModified?: string | Date;
      changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
      priority?: number;
    }>;
    interface Robots {
      rules: { userAgent?: string; allow?: string | string[]; disallow?: string | string[] };
      sitemap?: string;
    }
  }
}
