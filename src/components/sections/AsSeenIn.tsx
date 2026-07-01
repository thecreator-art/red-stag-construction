import Link from 'next/link';

const AD_ARTICLE_URL =
  'https://www.architecturaldigest.com/gallery/inside-reimagined-1948-tract-home-los-angeles';

interface AsSeenInProps {
  /** 'light' for use on warm/white backgrounds, 'dark' for navy backgrounds. */
  theme?: 'light' | 'dark';
  className?: string;
}

export const AsSeenIn = ({ theme = 'light', className = '' }: AsSeenInProps) => {
  const dark = theme === 'dark';

  return (
    <section
      className={`w-full border-y px-6 py-10 md:py-12 ${
        dark ? 'border-white/10 bg-navy-deep' : 'border-[#e2dbcf] bg-warm-white'
      } ${className}`}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center md:flex-row md:justify-center md:gap-8">
        <span
          className={`text-xs font-bold uppercase tracking-[0.28em] ${
            dark ? 'text-gray-400' : 'text-text-body'
          }`}
        >
          As Featured In
        </span>

        <Link
          href={AD_ARTICLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex flex-col items-center transition-opacity hover:opacity-80 md:flex-row md:items-baseline md:gap-3"
          aria-label="Read the Architectural Digest feature (opens in a new tab)"
        >
          <span
            className={`font-serif text-2xl leading-none tracking-tight md:text-3xl ${
              dark ? 'text-white' : 'text-text-dark'
            }`}
          >
            Architectural Digest
          </span>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-accent-red md:mt-0">
            Read the feature
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
};
