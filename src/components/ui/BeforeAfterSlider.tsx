import Image from 'next/image';

export interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  labelBefore?: string;
  labelAfter?: string;
  className?: string;
  altText?: string;
}

// Static markup driven by one CSS variable (--pos). Dragging is handled by
// src/scripts/site.ts ([data-ba]). Without JavaScript it rests at 50%.
export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  labelBefore = 'BEFORE',
  labelAfter = 'AFTER',
  className = '',
  altText = 'Before and After Project Comparison',
}: BeforeAfterSliderProps) => {
  return (
    <div
      data-ba
      className={`relative aspect-[3/2] w-full overflow-hidden bg-navy-deep ${className}`}
      style={{ ['--pos' as string]: '50%' }}
    >
      <Image
        src={afterImage}
        alt={`${altText} (after)`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="pointer-events-none object-cover"
      />

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: 'inset(0 calc(100% - var(--pos)) 0 0)' }}
      >
        <Image
          src={beforeImage}
          alt={`${altText} (before)`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="pointer-events-none object-cover"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-px -translate-x-1/2 bg-accent-red shadow-[0_0_14px_rgba(0,0,0,0.45)]"
        style={{ left: 'var(--pos)' }}
      />

      <div
        className="pointer-events-none absolute top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent-red bg-navy-deep text-white shadow-xl"
        style={{ left: 'var(--pos)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
          <path d="M8 5v14l-6-7 6-7zM16 5v14l6-7-6-7z" />
        </svg>
      </div>

      <div className="pointer-events-none absolute left-4 top-4 z-30 rounded-sm bg-navy-deep/75 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white md:text-sm">
        {labelBefore}
      </div>
      <div className="pointer-events-none absolute right-4 top-4 z-30 rounded-sm bg-navy-deep/75 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white md:text-sm">
        {labelAfter}
      </div>

      <div
        data-ba-handle
        role="slider"
        tabIndex={0}
        aria-label="Before and after image comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        className="absolute inset-0 z-40 cursor-grab touch-pan-y"
      />
    </div>
  );
};
