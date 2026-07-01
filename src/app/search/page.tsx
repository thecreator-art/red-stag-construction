import type { Metadata } from 'next';
import Link from 'next/link';
import { searchDocs } from '@/lib/searchData';
import { SearchBox } from '@/components/search/SearchBox';

export const metadata: Metadata = {
  title: 'Search | Red Stag Construction',
  description: 'Search services, service areas, projects, cost guides, and articles across Red Stag Construction.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://redstagcc.com/search' },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q ?? '').trim();
  const results = query ? searchDocs(query, 60) : [];

  return (
    <section className="bg-warm-white">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        <h1 className="font-serif text-3xl font-bold text-text-dark md:text-5xl">Search</h1>
        <p className="mt-3 text-text-body">
          Find services, service areas, projects, cost guides, and articles.
        </p>

        <div className="mt-8">
          <SearchBox variant="inline" placeholder="Search services, areas, guides…" />
        </div>

        {query && (
          <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-text-body">
            {results.length} result{results.length === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
          </p>
        )}

        <div className="mt-4 divide-y divide-gray-200 border-y border-gray-200">
          {query && results.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-lg font-semibold text-text-dark">No results found.</p>
              <p className="mt-2 text-text-body">
                Try a broader term like &ldquo;kitchen&rdquo;, &ldquo;ADU&rdquo;, or a city name.
              </p>
            </div>
          )}

          {results.map((doc) => (
            <Link
              key={doc.url}
              href={doc.url}
              className="group flex items-start gap-4 py-5 transition-colors hover:bg-white"
            >
              <span className="mt-1 shrink-0 rounded-sm bg-navy-deep px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                {doc.type}
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-bold text-text-dark transition-colors group-hover:text-accent-red">
                  {doc.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-text-body">{doc.description}</span>
              </span>
            </Link>
          ))}
        </div>

        {!query && (
          <p className="mt-6 text-text-body">Enter a search term above to get started.</p>
        )}
      </div>
    </section>
  );
}
