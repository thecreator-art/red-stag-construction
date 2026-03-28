'use client';

import { useEffect } from 'react';

export const Analytics = () => {
  useEffect(() => {
    const handlePhoneClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const phoneLink = target.closest('a[href^="tel:"]');
      if (!phoneLink) {
        return;
      }

      const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
      if (!gtag) {
        return;
      }

      gtag('event', 'phone_click', {
        phone_number: phoneLink.getAttribute('href'),
        page_location: window.location.href,
      });
    };

    document.addEventListener('click', handlePhoneClick);

    return () => {
      document.removeEventListener('click', handlePhoneClick);
    };
  }, []);

  return null;
};
