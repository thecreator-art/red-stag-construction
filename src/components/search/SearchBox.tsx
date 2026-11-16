// Static markup for the site search. Results are fetched and rendered by
// src/scripts/site.ts ([data-search]); submitting goes to /search?q=...
// Without JavaScript the form still submits to the search page.

interface SearchBoxProps {
  /** 'header' = icon that opens a floating panel. 'inline' = always-open full-width field. */
  variant?: 'header' | 'inline';
  placeholder?: string;
  className?: string;
}

const SearchIcon = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
  </svg>
);

export const SearchBox = ({ variant = 'header', placeholder = 'Search the site…', className = '' }: SearchBoxProps) => {
  if (variant === 'inline') {
    return (
      <form data-search="inline" action="/search" method="get" role="search" className={`relative w-full ${className}`}>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            <SearchIcon />
          </span>
          <input
            type="search"
            name="q"
            data-search-input
            placeholder={placeholder}
            aria-label="Search the site"
            autoComplete="off"
            className="w-full rounded-sm border border-gray-300 bg-white py-4 pl-12 pr-28 text-base text-text-dark shadow-sm outline-none transition-colors focus:border-accent-red"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm bg-accent-red px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-800"
          >
            Search
          </button>
        </div>
        <div data-search-results hidden className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-sm border border-white/10 bg-white text-left shadow-[0_18px_50px_rgba(10,24,38,0.35)]" />
      </form>
    );
  }

  return (
    <div data-search="header" className={`group/search relative ${className}`}>
      <button
        type="button"
        data-search-toggle
        aria-label="Open search"
        aria-expanded="false"
        className="flex min-h-11 min-w-11 items-center justify-center text-white transition-colors hover:text-accent-red"
      >
        <span className="group-data-[open]/search:hidden">
          <SearchIcon />
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="hidden h-5 w-5 group-data-[open]/search:block">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      <form data-search-panel hidden action="/search" method="get" role="search" className="absolute right-0 top-full z-50 mt-3 w-[min(85vw,24rem)]">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <SearchIcon className="h-4 w-4" />
          </span>
          <input
            type="search"
            name="q"
            data-search-input
            placeholder={placeholder}
            aria-label="Search the site"
            autoComplete="off"
            className="w-full rounded-sm border border-gray-300 bg-white py-3 pl-9 pr-3 text-sm text-text-dark shadow-[0_18px_50px_rgba(10,24,38,0.35)] outline-none transition-colors focus:border-accent-red"
          />
        </div>
        <div data-search-results hidden className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-sm border border-white/10 bg-white text-left shadow-[0_18px_50px_rgba(10,24,38,0.35)]" />
      </form>
    </div>
  );
};
