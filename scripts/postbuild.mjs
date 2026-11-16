// Runs after `astro build`. Works on the finished HTML in dist/:
//  1. Every local <img> gets responsive WebP sources, intrinsic width/height,
//     and lazy loading. The hero image is preloaded instead.
//  2. Table cells get data-label attributes so tables can stack on phones
//     without any JavaScript.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PUBLIC = join(ROOT, 'public');
const OUT = join(DIST, '_img');
const CACHE = join(ROOT, 'node_modules', '.cache', 'site-img');
const WIDTHS = [384, 640, 828, 1080, 1280, 1920];
const QUALITY = 68;
const HERO_QUALITY = 52;
const HERO_AVIF_QUALITY = 42; // hero photos sit under a dark overlay, so they can be lighter
const DEFAULT_SIZES = '(max-width: 768px) 100vw, 50vw';

mkdirSync(OUT, { recursive: true });
mkdirSync(CACHE, { recursive: true });

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : entry.name.endsWith('.html') ? [join(dir, entry.name)] : []
  );

/** src path -> { width, height, variants: [{ w, url }] } | null */
const manifest = new Map();

async function prepare(src, quality = QUALITY, format = 'webp') {
  const cacheKey = `${src}@${quality}@${format}`;
  if (manifest.has(cacheKey)) return manifest.get(cacheKey);
  const file = join(PUBLIC, decodeURIComponent(src));
  if (!/\.(jpe?g|png)$/i.test(src) || !existsSync(file)) {
    manifest.set(cacheKey, null);
    return null;
  }

  const stat = statSync(file);
  const key = createHash('sha1').update(`${src}:${stat.size}:${stat.mtimeMs}:${quality}:${format}`).digest('hex').slice(0, 12);
  const base = src.replace(/^\/images\//, '').replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();

  const metaFile = join(CACHE, `${key}.json`);
  let meta = existsSync(metaFile) ? JSON.parse(readFileSync(metaFile, 'utf8')) : null;
  if (!meta) {
    const { width, height, orientation } = await sharp(file).metadata();
    const rotated = orientation && orientation >= 5;
    meta = { width: rotated ? height : width, height: rotated ? width : height };
    writeFileSync(metaFile, JSON.stringify(meta));
  }

  const widths = WIDTHS.filter((w) => w < meta.width);
  if (widths.length === 0 || meta.width <= WIDTHS[WIDTHS.length - 1]) widths.push(Math.min(meta.width, WIDTHS[WIDTHS.length - 1]));
  const unique = [...new Set(widths)].sort((a, b) => a - b);

  const variants = [];
  for (const w of unique) {
    const name = `${base}-${key}-${w}.${format}`;
    const cached = join(CACHE, name);
    if (!existsSync(cached)) {
      const resized = sharp(file).rotate().resize({ width: w, withoutEnlargement: true });
      await (format === 'avif' ? resized.avif({ quality, effort: 5 }) : resized.webp({ quality, effort: 5 })).toFile(cached);
    }
    copyFileSync(cached, join(OUT, name));
    variants.push({ w, url: `/_img/${name}` });
  }

  const entry = { ...meta, variants };
  manifest.set(cacheKey, entry);
  return entry;
}

const attr = (tag, name) => {
  const match = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return match ? match[1] : null;
};
const setAttr = (tag, name, value) =>
  attr(tag, name) !== null
    ? tag.replace(new RegExp(`(\\s${name}=")[^"]*(")`), `$1${value}$2`)
    : tag.replace(/\s*\/?>$/, ` ${name}="${value}">`);
const dropAttr = (tag, name) => tag.replace(new RegExp(`\\s${name}="[^"]*"`), '');

let imageCount = 0;
let optimized = 0;

async function processHtml(file) {
  let html = readFileSync(file, 'utf8');
  const tags = html.match(/<img\b[^>]*>/g) || [];
  let preload = '';

  for (const original of new Set(tags)) {
    let tag = original;
    const src = attr(tag, 'src');
    const priority = attr(tag, 'data-priority');
    tag = dropAttr(tag, 'data-priority');
    imageCount += 1;

    if (priority) {
      tag = setAttr(tag, 'decoding', priority === 'true' ? 'sync' : 'async');
      if (priority === 'true') tag = setAttr(tag, 'fetchpriority', 'high');
    } else {
      tag = setAttr(setAttr(tag, 'loading', 'lazy'), 'decoding', 'async');
    }

    const entry = src && src.startsWith('/images/') ? await prepare(src, priority === 'true' ? HERO_QUALITY : QUALITY) : null;
    if (entry) {
      optimized += 1;
      const declaredWidth = Number(attr(tag, 'width')) || 0;
      const sizes = attr(tag, 'sizes') || (declaredWidth ? `${declaredWidth}px` : DEFAULT_SIZES);
      const srcset = entry.variants.map((v) => `${v.url} ${v.w}w`).join(', ');
      const fallback = (entry.variants.find((v) => v.w >= 1080) || entry.variants[entry.variants.length - 1]).url;

      tag = setAttr(tag, 'src', fallback);
      tag = setAttr(tag, 'srcset', srcset);
      tag = setAttr(tag, 'sizes', sizes);
      if (!declaredWidth) {
        tag = setAttr(setAttr(tag, 'width', entry.width), 'height', entry.height);
      }

      if (priority === 'true') {
        // Hero image: AVIF first (smaller), WebP as the fallback, and a typed
        // preload that browsers without AVIF simply ignore.
        const avif = await prepare(src, HERO_AVIF_QUALITY, 'avif');
        const avifSrcset = avif.variants.map((v) => `${v.url} ${v.w}w`).join(', ');
        if (!preload) {
          preload = `<link rel="preload" as="image" type="image/avif" imagesrcset="${avifSrcset}" imagesizes="${sizes}" fetchpriority="high">`;
        }
        tag = `<picture><source type="image/avif" srcset="${avifSrcset}" sizes="${sizes}">${tag}</picture>`;
      }
    }

    if (tag !== original) html = html.split(original).join(tag);
  }

  if (preload) {
    // After the viewport meta, so the browser picks the size for the real viewport.
    html = html.replace(/(<meta name="viewport"[^>]*>)/, `$1${preload}`);
  }

  // Table cells: label each <td> with its column heading.
  html = html.replace(/<table\b[\s\S]*?<\/table>/g, (table) => {
    const head = table.match(/<thead\b[\s\S]*?<\/thead>/);
    if (!head) return table;
    const labels = [...head[0].matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((m) => m[1].replace(/<[^>]*>/g, '').trim());
    return table.replace(/<tr\b[^>]*>[\s\S]*?<\/tr>/g, (row) => {
      let column = 0;
      return row.replace(/<td\b([^>]*)>/g, (cell, attrs) => {
        const label = labels[column++];
        return !label || /data-label=/.test(attrs) ? cell : `<td${attrs} data-label="${label.replace(/"/g, '&quot;')}">`;
      });
    });
  });

  writeFileSync(file, html);
}

const files = walk(DIST);
for (const file of files) await processHtml(file);
console.log(`[postbuild] ${files.length} pages, ${imageCount} image tags, ${optimized} optimized, ${manifest.size} source images`);
