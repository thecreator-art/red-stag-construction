'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { searchDocs, type SearchDoc } from '@/lib/searchData';

interface SearchBoxProps {
  /** 'header' = collapsible icon + input (desktop nav). 'inline' = always-open full-width field. */
  variant?: 'header' | 'inline';
  placeholder?: string;
  className?: string;
  /** Called after the user navigates to a result (e.g. to close a mobile menu). */
  onNavigate?: () => void;
}

const SearchIcon = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
  </svg>
);

export const SearchBox = ({
  variant = 'header',
  placeholder = 'Search the site…',
  className = '',
  onNavigate,
}: SearchBoxProps) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(variant === 'inline');
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);

  const results = useMemo<SearchDoc[]>(
    () => (query.trim() ? searchDocs(query, 8) : []),
    [query]
  );

  // Close on outside click / Escape (header variant only).
  useEffect(() => {
    if (variant === 'inline') return;
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [variant]);

  useEffect(() => {
    if (open && variant === 'header') inputRef.current?.focus();
  }, [open, variant]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  const go = (url: string) => {
    setOpen(variant === 'inline');
    setQuery('');
    onNavigate?.();
    router.push(url);
  };

  const submit = () => {
    const q = query.trim();
    if (!q) return;
    go(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        go(results[activeIndex].url);
      } else {
        submit();
      }
    } else if (event.key === 'Escape') {
      if (variant === 'header') setOpen(false);
      setQuery('');
    }
  };

  const showDropdown = query.trim().length > 0;

  const dropdown = showDropdown && (
    <div
      className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-sm border border-white/10 bg-white text-left shadow-[0_18px_50px_rgba(10,24,38,0.35)]"
      role="listbox"
    >
      {results.length === 0 ? (
        <div className="px-4 py-4 text-sm text-text-body">
          No results for &ldquo;{query.trim()}&rdquo;. Press Enter to search all pages.
        </div>
      ) : (
        <>
          {results.map((doc, i) => (
            <button
              key={doc.url}
              type="button"
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => go(doc.url)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`flex w-full items-start gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-b-0 ${
                i === activeIndex ? 'bg-warm-white' : 'bg-white hover:bg-warm-white'
              }`}
            >
              <span className="mt-0.5 shrink-0 rounded-sm bg-navy-deep px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                {doc.type}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-text-dark">{doc.title}</span>
                <span className="mt-0.5 block truncate text-xs text-text-body">{doc.description}</span>
              </span>
            </button>
          ))}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={submit}
            className="block w-full bg-navy-deep px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-navy-light"
          >
            See all results for &ldquo;{query.trim()}&rdquo;
          </button>
        </>
      )}
    </div>
  );

  if (variant === 'inline') {
    return (
      <div ref={containerRef} className={`relative w-full ${className}`}>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Search the site"
            className="w-full rounded-sm border border-gray-300 bg-white py-4 pl-12 pr-28 text-base text-text-dark shadow-sm outline-none transition-colors focus:border-accent-red"
          />
          <button
            type="button"
            onClick={submit}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm bg-accent-red px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-800"
          >
            Search
          </button>
        </div>
        {dropdown}
      </div>
    );
  }

  // Header variant: a fixed-size icon button that opens a floating search panel.
  // The panel is absolutely positioned so it never reflows the nav bar.
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={open ? 'Close search' : 'Open search'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-11 min-w-11 items-center justify-center text-white transition-colors hover:text-accent-red"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <SearchIcon />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-3 w-[min(85vw,24rem)]">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon className="h-4 w-4" />
            </span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              aria-label="Search the site"
              className="w-full rounded-sm border border-gray-300 bg-white py-3 pl-9 pr-3 text-sm text-text-dark shadow-[0_18px_50px_rgba(10,24,38,0.35)] outline-none transition-colors focus:border-accent-red"
            />
          </div>
          {dropdown}
        </div>
      )}
    </div>
  );
};
