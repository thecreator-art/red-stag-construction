'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const TrustBar = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);

    if (formData.get('_honey')) {
      setIsSubmitting(false);
      return;
    }

    const payload = {
      fullName: formData.get('fullName'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      message: formData.get('message'),
      source: 'inline_trust_bar',
    };

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL || '';
      if (!webhookUrl) {
        throw new Error('Missing webhook configuration');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Lead submission failed');
      }

      const gtag = typeof window !== 'undefined'
        ? (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
        : undefined;

      if (gtag) {
        gtag('event', 'contact_form_submitted', {
          service_type: 'Quick Quote',
          city: 'Los Angeles',
          page_location: window.location.href,
        });
      }

      router.push('/thank-you');
    } catch {
      setErrorMsg('There was an error submitting your request. Please call (626) 652-2303.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative z-20 w-full border-y border-[#e6decf] bg-[#F5F0E8] py-4 shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="overflow-hidden rounded-sm border border-[#e3ddd2] bg-white shadow-[0_12px_40px_rgba(21,45,69,0.12)]">
          <div className="grid gap-4 px-4 py-4 md:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center">
            <div className="text-center lg:text-left">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-accent-red">
                Free Consultation
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-[#1A1A1A]">
                Start your quote.
              </h2>
              <p className="mt-1 text-sm text-[#3D3D3D]">
                Name, number, email, and a few project details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1.4fr_auto]">
                <input
                  required
                  type="text"
                  name="fullName"
                  placeholder="Name"
                  className="h-12 rounded-sm border border-[#d9d1c5] bg-[#F8F6F2] px-4 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-[#6B7280] focus:border-accent-red"
                />
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="Number"
                  className="h-12 rounded-sm border border-[#d9d1c5] bg-[#F8F6F2] px-4 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-[#6B7280] focus:border-accent-red"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="h-12 rounded-sm border border-[#d9d1c5] bg-[#F8F6F2] px-4 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-[#6B7280] focus:border-accent-red"
                />
                <input
                  required
                  type="text"
                  name="message"
                  placeholder="Project details"
                  className="h-12 rounded-sm border border-[#d9d1c5] bg-[#F8F6F2] px-4 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-[#6B7280] focus:border-accent-red"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 min-w-[170px] rounded-sm bg-accent-red px-6 text-sm font-extrabold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#990000] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending...' : 'Get Estimate'}
                </button>
              </div>

              {errorMsg ? (
                <p className="text-sm font-medium text-accent-red">{errorMsg}</p>
              ) : (
                <p className="text-xs uppercase tracking-[0.18em] text-[#6B7280]">
                  Licensed general contractor. Los Angeles based. Fast callback.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
