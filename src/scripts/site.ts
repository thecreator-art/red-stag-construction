// All client behaviour for the site, in plain DOM code. Nothing here is needed
// to read a page: every block enhances markup that already works as HTML.

import { rankDocs, type SearchDoc } from '../lib/searchRank';

const WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/9in8SPNBkkEtL4Iq1Xne/webhook-trigger/cc074b4f-2041-4991-a61d-99eb8ecb8df2';
const GA_ID = 'G-6BJ4K8SE7P';
const CHAT_WIDGET_ID = '6a7a471e9f377fcb653bc568';

type Gtag = (...args: unknown[]) => void;
const w = window as Window & { dataLayer?: unknown[]; gtag?: Gtag };

const $ = <T extends Element>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

/* ------------------------------------------------------------------ */
/* Analytics queue. Events are queued now; gtag.js itself loads later. */
/* ------------------------------------------------------------------ */
w.dataLayer = w.dataLayer || [];
w.gtag =
  w.gtag ||
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    (w.dataLayer as unknown[]).push(arguments);
  };
w.gtag('js', new Date());
w.gtag('config', GA_ID);

document.addEventListener('click', (event) => {
  const link = (event.target as Element | null)?.closest?.('a[href^="tel:"]');
  if (!link) return;
  w.gtag?.('event', 'phone_click', { phone_number: link.getAttribute('href'), page_location: location.href });
});

/* ------------------------------------------------------------------ */
/* Third-party scripts: load on first interaction, or after a delay.   */
/* Keeps Google Analytics and the chat widget off the critical path.   */
/* ------------------------------------------------------------------ */
let thirdPartyLoaded = false;
const loadThirdParty = () => {
  if (thirdPartyLoaded) return;
  thirdPartyLoaded = true;

  const ga = document.createElement('script');
  ga.async = true;
  ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(ga);

  // GoHighLevel chat widget (also serves A2P verification).
  const chat = document.createElement('script');
  chat.src = 'https://widgets.leadconnectorhq.com/loader.js';
  chat.dataset.resourcesUrl = 'https://widgets.leadconnectorhq.com/chat-widget/loader.js';
  chat.dataset.widgetId = CHAT_WIDGET_ID;
  chat.dataset.source = 'WEB_USER';
  document.body.appendChild(chat);
  keepChatWidgetClearOfStickyBar();
};
(['pointerdown', 'keydown', 'touchstart', 'scroll', 'mousemove'] as const).forEach((type) =>
  window.addEventListener(type, loadThirdParty, { once: true, passive: true })
);
window.addEventListener('load', () => window.setTimeout(loadThirdParty, 12000));

/**
 * The chat bubble is `position: fixed; bottom: 20px` inside a shadow root. On
 * phones that lands on the sticky call bar's "Get Estimate" button. Global CSS
 * cannot reach it and its 0.2s transition keeps `bottom` pinned, so both are
 * set inline and re-applied whenever the widget resets them.
 */
function keepChatWidgetClearOfStickyBar() {
  const selectors = ['#lc_text-widget', '#lc_text-widget--btn'];
  const offset = '76px';
  const mobile = window.matchMedia('(max-width: 767px)');
  let frame = 0;

  const targets = () => {
    const root = $('chat-widget')?.shadowRoot;
    if (!root) return [] as HTMLElement[];
    return selectors.map((sel) => root.querySelector<HTMLElement>(sel)).filter((el): el is HTMLElement => Boolean(el));
  };

  const sync = () => {
    const elements = targets();
    if (elements.length === 0) return false;
    elements.forEach((el) => {
      if (mobile.matches) {
        if (el.style.getPropertyValue('transition') !== 'none') el.style.setProperty('transition', 'none', 'important');
        if (el.style.getPropertyValue('bottom') !== offset) el.style.setProperty('bottom', offset, 'important');
      } else if (el.style.getPropertyPriority('bottom') === 'important') {
        el.style.removeProperty('bottom');
        el.style.removeProperty('transition');
      }
    });
    return true;
  };

  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(sync);
  };

  const start = () => {
    if (!sync()) return false;
    const observer = new MutationObserver(schedule);
    targets().forEach((el) => observer.observe(el, { attributes: true, attributeFilter: ['style'] }));
    mobile.addEventListener('change', schedule);
    return true;
  };

  const retry = window.setInterval(() => {
    if (start()) window.clearInterval(retry);
  }, 300);
  window.setTimeout(() => window.clearInterval(retry), 30000);
}

/* ------------------------------------------------------------------ */
/* The italic headline face is only used below the fold: add it late.  */
/* ------------------------------------------------------------------ */
window.addEventListener('load', () => {
  const css = document.documentElement.dataset.italicFont;
  if (!css) return;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
});

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
const nav = $<HTMLElement>('[data-nav]');
if (nav) {
  const closeMenus = () =>
    $$<HTMLElement>('[data-menu][data-open]', nav).forEach((menu) => {
      delete menu.dataset.open;
      $('[data-menu-toggle]', menu)?.setAttribute('aria-expanded', 'false');
    });

  const onScroll = () => {
    nav.toggleAttribute('data-scrolled', window.scrollY > 24);
    closeMenus();
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  $$<HTMLElement>('[data-menu]', nav).forEach((menu) => {
    $('[data-menu-toggle]', menu)?.addEventListener('click', () => {
      const willOpen = !('open' in menu.dataset);
      closeMenus();
      if (willOpen) {
        menu.dataset.open = '';
        $('[data-menu-toggle]', menu)?.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('mousedown', (event) => {
    if (!nav.contains(event.target as Node)) closeMenus();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenus();
  });

  const toggle = $<HTMLButtonElement>('[data-nav-toggle]', nav);
  const mobileMenu = $<HTMLElement>('#mobile-menu', nav);
  const setMobileOpen = (open: boolean) => {
    if (!toggle || !mobileMenu) return;
    mobileMenu.hidden = !open;
    nav.toggleAttribute('data-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle?.addEventListener('click', () => setMobileOpen(Boolean(mobileMenu?.hidden)));
  mobileMenu?.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a')) setMobileOpen(false);
  });
}

/* ------------------------------------------------------------------ */
/* Lead forms                                                          */
/* ------------------------------------------------------------------ */
document.addEventListener('input', (event) => {
  const field = event.target as HTMLInputElement;
  const form = field.closest?.('form[data-lead-form]');
  if (!form || !field.name) return;
  const error = $<HTMLElement>(`[data-error-for="${field.name}"]`, form);
  if (error) error.hidden = true;
  field.removeAttribute('aria-invalid');
});

document.addEventListener('submit', async (event) => {
  const form = (event.target as Element).closest?.<HTMLFormElement>('form[data-lead-form]');
  if (!form) return;
  event.preventDefault();
  if (form.dataset.busy) return;

  const data = new FormData(form);
  if (data.get('_honey')) return; // bots only

  let valid = true;
  $$<HTMLInputElement>('[required]', form).forEach((field) => {
    if (String(data.get(field.name) || '').trim()) return;
    valid = false;
    field.setAttribute('aria-invalid', 'true');
    const error = $<HTMLElement>(`[data-error-for="${field.name}"]`, form);
    if (error) {
      error.textContent = `${field.dataset.label || 'This field'} is required.`;
      error.hidden = false;
    }
  });
  if (!valid) return;

  const payload: Record<string, string> = {};
  data.forEach((value, key) => {
    if (key !== '_honey') payload[key] = String(value);
  });
  Object.assign(payload, JSON.parse(form.dataset.extra || '{}'));

  const button = $<HTMLButtonElement>('button[type="submit"]', form);
  const idleLabel = button?.textContent ?? '';
  const formError = $<HTMLElement>('[data-form-error]', form);
  const setBusy = (busy: boolean) => {
    if (busy) form.dataset.busy = '1';
    else delete form.dataset.busy;
    if (button) {
      button.disabled = busy;
      button.textContent = busy ? button.dataset.sendingLabel || 'Sending...' : idleLabel;
    }
  };

  setBusy(true);
  if (formError) formError.hidden = true;

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Lead submission failed');

    if (form.dataset.gtagService) {
      w.gtag?.('event', 'contact_form_submitted', {
        service_type: payload.projectType || form.dataset.gtagService,
        city: payload.city || 'Los Angeles',
        page_location: location.href,
      });
    }
    location.assign('/thank-you');
  } catch {
    if (formError) formError.hidden = false;
    setBusy(false);
  }
});

/* ------------------------------------------------------------------ */
/* Exit popup: never before one minute on the page, once per session.  */
/* ------------------------------------------------------------------ */
const popup = $<HTMLElement>('[data-exit-popup]');
if (popup && location.pathname !== '/thank-you') {
  const KEY = 'redstag_exit_intent';
  let seen = false;
  try {
    seen = sessionStorage.getItem(KEY) === 'true';
  } catch {
    seen = true;
  }

  if (!seen) {
    let armed = false;
    const close = () => {
      popup.hidden = true;
    };
    const show = () => {
      if (!popup.hidden) return;
      popup.hidden = false;
      try {
        sessionStorage.setItem(KEY, 'true');
      } catch {
        /* private mode */
      }
      document.removeEventListener('mouseleave', onLeave);
      $<HTMLElement>('[data-exit-close]', popup)?.focus();
    };
    const onLeave = (event: MouseEvent) => {
      if (armed && event.clientY < 10) show();
    };
    document.addEventListener('mouseleave', onLeave);
    window.setTimeout(() => {
      armed = true;
      show();
    }, 60000);
    $('[data-exit-close]', popup)?.addEventListener('click', close);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
  }
}

/* ------------------------------------------------------------------ */
/* FAQ search                                                          */
/* ------------------------------------------------------------------ */
$$<HTMLElement>('[data-faq]').forEach((faq) => {
  const input = $<HTMLInputElement>('[data-faq-search]', faq);
  if (!input) return;
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    let total = 0;
    $$<HTMLElement>('[data-faq-category]', faq).forEach((category) => {
      let visible = 0;
      $$<HTMLElement>('[data-faq-item]', category).forEach((item) => {
        const match = !query || (item.textContent || '').toLowerCase().includes(query);
        item.hidden = !match;
        if (match) visible += 1;
      });
      category.hidden = visible === 0;
      total += visible;
    });
    const empty = $<HTMLElement>('[data-faq-empty]', faq);
    if (empty) empty.hidden = total > 0;
  });
});

/* ------------------------------------------------------------------ */
/* Before / after sliders                                              */
/* ------------------------------------------------------------------ */
$$<HTMLElement>('[data-ba]').forEach((slider) => {
  const handle = $<HTMLElement>('[data-ba-handle]', slider);
  if (!handle) return;
  let dragging = false;

  const set = (percent: number) => {
    const value = Math.min(100, Math.max(0, percent));
    slider.style.setProperty('--pos', `${value}%`);
    handle.setAttribute('aria-valuenow', String(Math.round(value)));
  };
  const fromEvent = (event: PointerEvent) => {
    const rect = slider.getBoundingClientRect();
    set(((event.clientX - rect.left) / rect.width) * 100);
  };

  handle.addEventListener('pointerdown', (event) => {
    dragging = true;
    handle.setPointerCapture(event.pointerId);
    handle.style.cursor = 'grabbing';
    fromEvent(event);
  });
  handle.addEventListener('pointermove', (event) => {
    if (dragging) fromEvent(event);
  });
  const end = (event: PointerEvent) => {
    dragging = false;
    if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
    handle.style.cursor = 'grab';
  };
  handle.addEventListener('pointerup', end);
  handle.addEventListener('pointercancel', end);
  handle.addEventListener('keydown', (event) => {
    const current = Number(handle.getAttribute('aria-valuenow') || 50);
    if (event.key === 'ArrowLeft') set(current - 5);
    if (event.key === 'ArrowRight') set(current + 5);
  });
});

/* ------------------------------------------------------------------ */
/* Review ticker: slow auto-scroll that loops, pauses on hover/drag.   */
/* Runs only while on screen and when motion is allowed.               */
/* ------------------------------------------------------------------ */
$$<HTMLElement>('[data-ticker]').forEach((ticker) => {
  const group = $<HTMLElement>('[data-ticker-group]', ticker);
  if (!group) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GAP = 32;
  const SPEED = 0.06; // px per ms
  let paused = false;
  let dragging = false;
  let startX = 0;
  let startLeft = 0;
  let frame = 0;
  let last = 0;

  const tick = (time: number) => {
    const delta = Math.min(time - last, 50);
    last = time;
    const loop = group.offsetWidth + GAP;
    if (!paused && !dragging && !reduceMotion) ticker.scrollLeft += delta * SPEED;
    if (ticker.scrollLeft >= loop * 2) ticker.scrollLeft -= loop;
    else if (ticker.scrollLeft <= loop * 0.5) ticker.scrollLeft += loop;
    frame = requestAnimationFrame(tick);
  };

  new IntersectionObserver((entries) => {
    cancelAnimationFrame(frame);
    if (entries[0].isIntersecting) {
      if (ticker.scrollLeft === 0) ticker.scrollLeft = group.offsetWidth + GAP;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }).observe(ticker);

  ticker.addEventListener('mouseenter', () => (paused = true));
  ticker.addEventListener('mouseleave', () => (paused = false));
  ticker.addEventListener('touchstart', () => (paused = true), { passive: true });
  ticker.addEventListener('touchend', () => (paused = false));
  ticker.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse') return;
    dragging = true;
    startX = event.clientX;
    startLeft = ticker.scrollLeft;
    ticker.setPointerCapture(event.pointerId);
  });
  ticker.addEventListener('pointermove', (event) => {
    if (dragging) ticker.scrollLeft = startLeft - (event.clientX - startX);
  });
  const end = (event: PointerEvent) => {
    dragging = false;
    if (ticker.hasPointerCapture(event.pointerId)) ticker.releasePointerCapture(event.pointerId);
  };
  ticker.addEventListener('pointerup', end);
  ticker.addEventListener('pointercancel', end);
});

/* ------------------------------------------------------------------ */
/* Portfolio filter                                                    */
/* ------------------------------------------------------------------ */
$$<HTMLElement>('[data-portfolio]').forEach((portfolio) => {
  const active: Record<string, string> = { service: '', city: '' };
  const apply = () => {
    let visible = 0;
    $$<HTMLElement>('[data-portfolio-card]', portfolio).forEach((card) => {
      const match =
        (!active.service || card.dataset.service === active.service) && (!active.city || card.dataset.city === active.city);
      card.hidden = !match;
      if (match) visible += 1;
    });
    const empty = $<HTMLElement>('[data-portfolio-empty]', portfolio);
    if (empty) empty.hidden = visible > 0;
  };
  $$<HTMLElement>('[data-filter-group]', portfolio).forEach((group) => {
    const kind = group.dataset.filterGroup as string;
    const on = (group.dataset.activeClass || '').split(' ');
    const off = (group.dataset.idleClass || '').split(' ');
    group.addEventListener('click', (event) => {
      const button = (event.target as Element).closest<HTMLElement>('[data-filter-value]');
      if (!button) return;
      active[kind] = button.dataset.filterValue || '';
      $$<HTMLElement>('[data-filter-value]', group).forEach((other) => {
        const selected = other === button;
        other.classList.remove(...(selected ? off : on));
        other.classList.add(...(selected ? on : off));
        other.setAttribute('aria-pressed', String(selected));
      });
      apply();
    });
  });
});

/* ------------------------------------------------------------------ */
/* Background video and hero drift                                     */
/* ------------------------------------------------------------------ */
$$<HTMLVideoElement>('video[data-autoplay-visible]').forEach((video) => {
  new IntersectionObserver(
    (entries, observer) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      video.preload = 'auto';
      void video.play().catch(() => {});
    },
    { rootMargin: '200px' }
  ).observe(video);
});

const parallax = $<HTMLElement>('[data-parallax]');
if (parallax && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        parallax.style.transform = `translateY(${window.scrollY * 0.5}px)`;
        ticking = false;
      });
    },
    { passive: true }
  );
}

/* ------------------------------------------------------------------ */
/* Site search. The index is fetched the first time a box is used.     */
/* ------------------------------------------------------------------ */
let indexPromise: Promise<SearchDoc[]> | null = null;
const loadIndex = () => {
  indexPromise = indexPromise || fetch('/search-index.json').then((res) => res.json());
  return indexPromise;
};

const resultRow = (doc: SearchDoc, extra = '') =>
  `<a href="${escapeHtml(doc.url)}" ${extra} class="flex w-full items-start gap-3 border-b border-gray-100 bg-white px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-warm-white aria-selected:bg-warm-white">` +
  `<span class="mt-0.5 shrink-0 rounded-sm bg-navy-deep px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">${escapeHtml(doc.type)}</span>` +
  `<span class="min-w-0"><span class="block truncate text-sm font-semibold text-text-dark">${escapeHtml(doc.title)}</span>` +
  `<span class="mt-0.5 block truncate text-xs text-text-body">${escapeHtml(doc.description)}</span></span></a>`;

$$<HTMLElement>('[data-search]').forEach((box) => {
  const input = $<HTMLInputElement>('[data-search-input]', box);
  const results = $<HTMLElement>('[data-search-results]', box);
  if (!input || !results) return;
  let activeIndex = -1;

  const render = async () => {
    const query = input.value.trim();
    if (!query) {
      results.hidden = true;
      results.innerHTML = '';
      return;
    }
    const docs = rankDocs(await loadIndex(), query, 8);
    if (input.value.trim() !== query) return; // a newer keystroke won
    activeIndex = -1;
    results.innerHTML = docs.length
      ? docs.map((doc) => resultRow(doc, 'role="option"')).join('') +
        `<a href="/search?q=${encodeURIComponent(query)}" class="block w-full bg-navy-deep px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-navy-light">See all results for &ldquo;${escapeHtml(query)}&rdquo;</a>`
      : `<div class="px-4 py-4 text-sm text-text-body">No results for &ldquo;${escapeHtml(query)}&rdquo;. Press Enter to search all pages.</div>`;
    results.hidden = false;
  };

  input.addEventListener('focus', () => void loadIndex(), { once: true });
  input.addEventListener('input', () => void render());
  input.addEventListener('keydown', (event) => {
    const rows = $$<HTMLAnchorElement>('a[role="option"]', results);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      activeIndex =
        event.key === 'ArrowDown' ? Math.min(activeIndex + 1, rows.length - 1) : Math.max(activeIndex - 1, -1);
      rows.forEach((row, i) => row.setAttribute('aria-selected', String(i === activeIndex)));
    } else if (event.key === 'Enter' && activeIndex >= 0 && rows[activeIndex]) {
      event.preventDefault();
      location.assign(rows[activeIndex].href);
    } else if (event.key === 'Escape') {
      results.hidden = true;
    }
  });

  // Header variant: the icon opens and closes the panel.
  const toggle = $<HTMLButtonElement>('[data-search-toggle]', box);
  const panel = $<HTMLElement>('[data-search-panel]', box);
  if (toggle && panel) {
    const setOpen = (open: boolean) => {
      panel.hidden = !open;
      box.toggleAttribute('data-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close search' : 'Open search');
      if (open) input.focus();
    };
    toggle.addEventListener('click', () => setOpen(panel.hidden));
    document.addEventListener('mousedown', (event) => {
      if (!box.contains(event.target as Node)) setOpen(false);
    });
  } else {
    document.addEventListener('mousedown', (event) => {
      if (!box.contains(event.target as Node)) results.hidden = true;
    });
  }
});

// Full results on /search
const page = $<HTMLElement>('[data-search-page]');
if (page) {
  const query = (new URLSearchParams(location.search).get('q') || '').trim();
  const summary = $<HTMLElement>('[data-search-summary]', page);
  const list = $<HTMLElement>('[data-search-list]', page);
  const input = $<HTMLInputElement>('[data-search-input]', page);
  if (input) input.value = query;
  if (query && summary && list) {
    void loadIndex().then((docs) => {
      const found = rankDocs(docs, query, 60);
      summary.textContent = `${found.length} result${found.length === 1 ? '' : 's'} for “${query}”`;
      list.innerHTML = found.length
        ? found
            .map(
              (doc) =>
                `<a href="${escapeHtml(doc.url)}" class="group flex items-start gap-4 py-5 transition-colors hover:bg-white">` +
                `<span class="mt-1 shrink-0 rounded-sm bg-navy-deep px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">${escapeHtml(doc.type)}</span>` +
                `<span class="min-w-0"><span class="block text-lg font-bold text-text-dark transition-colors group-hover:text-accent-red">${escapeHtml(doc.title)}</span>` +
                `<span class="mt-1 block text-sm leading-relaxed text-text-body">${escapeHtml(doc.description)}</span></span></a>`
            )
            .join('')
        : `<div class="py-10 text-center"><p class="text-lg font-semibold text-text-dark">No results found.</p><p class="mt-2 text-text-body">Try a broader term like “kitchen”, “ADU”, or a city name.</p></div>`;
    });
  }
}
