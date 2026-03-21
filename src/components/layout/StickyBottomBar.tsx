'use client';

import Link from 'next/link';

export const StickyBottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-14 w-full items-center bg-navy-deep shadow-[0_-2px_10px_rgba(0,0,0,0.15)] md:hidden">
      <a
        href="tel:6266522303"
        className="flex min-h-11 min-w-0 flex-1 items-center gap-2 px-4 font-sans text-sm font-bold text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 shrink-0">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25h2.118c.966 0 1.8.69 1.983 1.639l.511 2.655a2.25 2.25 0 0 1-.573 2.032l-1.06 1.06a15.708 15.708 0 0 0 6.885 6.885l1.06-1.06a2.25 2.25 0 0 1 2.032-.573l2.655.51a2.25 2.25 0 0 1 1.639 1.984V19.5a2.25 2.25 0 0 1-2.25 2.25h-.75C10.648 21.75 2.25 13.352 2.25 3.75V4.5Z"
          />
        </svg>
        <span className="truncate">(626) 652-2303</span>
      </a>
      <Link
        href="/contact"
        className="mr-2 inline-flex min-h-11 items-center justify-center bg-accent-red px-5 py-3 font-sans text-xs font-bold uppercase tracking-wider text-white"
      >
        Get Estimate
      </Link>
    </div>
  );
};
