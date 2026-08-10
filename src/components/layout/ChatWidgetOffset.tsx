'use client';

import { useEffect } from 'react';

/**
 * The GoHighLevel chat widget renders its bubble as `position: fixed; bottom: 20px`
 * inside its own shadow root. On mobile that lands on top of StickyBottomBar
 * (h-14 / 56px), covering the "Get Estimate" CTA.
 *
 * Shadow DOM blocks global CSS, and a <style> appended into the shadow root does not
 * win against the widget's own positioning — both verified in-browser.
 *
 * Setting the inline value is also not sufficient on its own: the widget carries a
 * `transition: 0.2s` on these elements and re-renders repeatedly during the greeting
 * prompt, so `bottom` stays visually pinned at 20px for tens of seconds even while the
 * inline attribute already reads 76px !important. Measured on a production build: the
 * bubble stole 5 of 11 tap points across the "Get Estimate" CTA for 24s+ straight.
 * Clearing the transition makes the offset take effect immediately (0 of 11 stolen).
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
          // Transition must be cleared or `bottom` never visually settles.
          if (el.style.getPropertyValue('transition') !== 'none') {
            el.style.setProperty('transition', 'none', 'important');
          }
          if (el.style.getPropertyValue('bottom') !== OFFSET) {
            el.style.setProperty('bottom', OFFSET, 'important');
          }
        } else if (el.style.getPropertyPriority('bottom') === 'important') {
          el.style.removeProperty('bottom');
          el.style.removeProperty('transition');
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
