'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const BlogSidebarLeadForm = ({ source }: { source: string }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const formData = new FormData(event.currentTarget);

    if (formData.get('_honey')) {
      setIsSubmitting(false);
      return;
    }

    const payload = {
      source,
      fullName: formData.get('name'),
      phone: formData.get('phone'),
    };

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL || '';
      if (!webhookUrl) {
        throw new Error('Missing GHL webhook configuration');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Sidebar lead form submission failed');
      }

      router.push('/thank-you');
    } catch {
      setErrorMsg('There was an error sending your request. Please call us directly at');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <input type="hidden" name="source" value={source} />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
      <div>
        <label htmlFor="blog-sidebar-name" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-dark">
          Name
        </label>
        <input
          id="blog-sidebar-name"
          name="name"
          type="text"
          required
          className="w-full border border-gray-300 px-4 py-3 text-sm text-text-dark focus:border-accent-red focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="blog-sidebar-phone" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-dark">
          Phone
        </label>
        <input
          id="blog-sidebar-phone"
          name="phone"
          type="tel"
          required
          className="w-full border border-gray-300 px-4 py-3 text-sm text-text-dark focus:border-accent-red focus:outline-none"
        />
      </div>
      {errorMsg ? (
        <p className="text-sm text-accent-red">
          {errorMsg}{' '}
          <a href="tel:6266522303" className="font-semibold underline hover:text-[#990000]">
            (626) 652-2303
          </a>
          .
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent-red px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};
