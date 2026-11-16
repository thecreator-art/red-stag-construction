import type { CSSProperties } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
}

// Emits a plain <img>. scripts/postbuild.mjs then swaps in responsive WebP
// sources, intrinsic dimensions and lazy loading for every image in the build.
export default function Image({ src, alt, fill, priority, sizes, className, width, height, style }: ImageProps) {
  const fillStyle: CSSProperties | undefined = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }
    : style;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      sizes={sizes}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      data-priority={priority ? 'true' : undefined}
      style={fillStyle}
    />
  );
}
