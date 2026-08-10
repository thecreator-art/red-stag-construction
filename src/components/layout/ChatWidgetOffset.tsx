'use client';

import { useEffect } from 'react';

/**
 * The GoHighLevel chat widget renders its bubble as `position: fixed; bottom: 20px`
 * inside its own shadow root. On mobile that lands on top of StickyBottomBar
 * (h-14 / 56px), covering the "Get Estimate" CTA.
 *
 * Shadow DOM blocks global CSS, and a <style> appended into the shadow root does not
 * win against the widget's own positioning — verified in-browser. Setting the inline
 * value with `!important` on the widget's positioned elements does.
 *
 * Selectors are verified against the widget's live DOM. If the vendor renames them
 * this no-ops rather than breaking anything.
 */
const SELECTORS = ['#lc_text-widget', '#lc_text-widget--btn'];
const MOBILE_QUERY = '(max-width: 767px)'; // StickyBottomBar is md:hidden
const OFFSET = '76px'; // 56px sticky bar + 20px clearance

export const ChatWidgetOffset = () => {
  useEffect(() => {
    let frame = 0;
    let retry = 0;
    let giveUp = 0;
    let observer: MutationObserver | undefined;
    const mobile = window.matchMedia(MOBILE_QUERY);

    const targets = (): HTMLElement[] => {
      const root = document.querySelector('chat-widget')?.shadowRoot;
      if (!root) return [];
      return SELECTORS.map((sel) => root.querySelector<HTMLElement>(sel)).filter(
        (el): el is HTMLElement => Boolean(el)
      );
    };

    // Only writes when the value is actually wrong, so the MutationObserver
    // this triggers settles immediately instead of looping.
    const sync = () => {
      const elements = targets();
      if (elements.length === 0) return false;

      const wantsOffset = mobile.matches;
      elements.forEach((el) => {
        if (wantsOffset) {
          if (el.style.getPropertyValue('bottom') !== OFFSET) {
            el.style.setProperty('bottom', OFFSET, 'important');
          }
        } else if (el.style.getPropertyPriority('bottom') === 'important') {
          el.style.removeProperty('bottom');
        }
      });
      return true;
    };

    const schedule = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(sync);
    };

    const start = () => {
      if (!sync()) return false;
      observer = new MutationObserver(schedule);
      targets().forEach((el) =>
        observer?.observe(el, { attributes: true, attributeFilter: ['style'] })
      );
      mobile.addEventListener('change', schedule);
      return true;
    };

    // Third-party script loads async — retry briefly, then give up.
    if (!start()) {
      retry = window.setInterval(() => {
        if (start()) window.clearInterval(retry);
      }, 300);
      giveUp = window.setTimeout(() => window.clearInterval(retry), 30000);
    }

    return () => {
      observer?.disconnect();
      mobile.removeEventListener('change', schedule);
      window.cancelAnimationFrame(frame);
      window.clearInterval(retry);
      window.clearTimeout(giveUp);
    };
  }, []);

  return null;
};
