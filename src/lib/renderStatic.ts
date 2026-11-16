import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// React 19 emits a <link rel="preload" as="image"> for every <img> it renders.
// On a static page that would preload dozens of below-the-fold images, so the
// hints are removed here. scripts/postbuild.mjs adds one for the hero image.
export function renderStatic(element: ReactElement): string {
  return renderToStaticMarkup(element).replace(/<link rel="preload" as="image"[^>]*>/g, '');
}
