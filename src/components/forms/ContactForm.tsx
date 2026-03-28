'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const ContactForm = ({ className = '' }: { className?: string }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateFieldValues = (formData: FormData) => {
    const nextErrors: Record<string, string> = {};
    const requiredFields = [
      { key: 'fullName', label: 'Full Name' },
      { key: 'phone', label: 'Phone Number' },
      { key: 'projectType', label: 'Project Type' },
      { key: 'city', label: 'City' },
      { key: 'message', label: 'Tell Us About Your Project' },
    ];

    requiredFields.forEach(({ key, label }) => {
      if (!String(formData.get(key) || '').trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    return nextErrors;
  };

  const clearFieldError = (field: string) => {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    
    // Explicit Honeypot Validation handling silent failures against scrape bots
    if (formData.get('_honey')) {
      setIsSubmitting(false);
      return; 
    }

    const nextErrors = validateFieldValues(formData);
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setIsSubmitting(false);
      return;
    }

    setFieldErrors({});

    const payload = {
      fullName: formData.get('fullName'),
      phone: formData.get('phone'),
      projectType: formData.get('projectType'),
      city: formData.get('city'),
      message: formData.get('message'),
      source: 'Contact Page Form',
    };

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL
        || 'https://services.leadconnectorhq.com/hooks/9in8SPNBkkEtL4Iq1Xne/webhook-trigger/cc074b4f-2041-4991-a61d-99eb8ecb8df2';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const gtag = typeof window !== 'undefined'
          ? (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
          : undefined;

        if (gtag) {
          gtag('event', 'contact_form_submitted', {
            service_type: formData.get('projectType'),
            city: formData.get('city'),
            page_location: window.location.href,
          });
        }

        // Enforce structural redirect to custom validation pathing routing 
        router.push('/thank-you');
      } else {
        throw new Error('Internal Server Handshake Configuration Dropped');
      }
    } catch {
      setErrorMsg('There was an error submitting your request to our system. Please try calling us directly at');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative z-[1] w-full bg-navy-deep p-8 shadow-2xl md:p-12 ${className}`}>
      
      {/* Inline Persistent Error Delivery Mechanics */}
      {errorMsg && (
        <div className="p-4 mb-6 bg-red-900/40 border-l-4 border-accent-red text-white text-sm">
          {errorMsg}{' '}
          <a href="tel:6266522303" className="font-semibold underline hover:text-accent-red">
            (626) 652-2303
          </a>
          .
        </div>
      )}
      
      {/* Honeypot Trap Mechanism */}
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <h3 className="text-2xl font-serif font-bold text-white mb-8 border-b border-gray-800 pb-4">Provide Details to Begin</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="fullName" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 border-l-2 border-accent-red pl-2">Full Name</label>
          <input required type="text" id="fullName" name="fullName" aria-invalid={Boolean(fieldErrors.fullName)} onChange={() => clearFieldError('fullName')} className="w-full bg-navy-deep border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-colors" />
          {fieldErrors.fullName ? <p className="mt-2 text-sm text-accent-red">{fieldErrors.fullName}</p> : null}
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 border-l-2 border-accent-red pl-2">Phone Number</label>
          <input required type="tel" id="phone" name="phone" aria-invalid={Boolean(fieldErrors.phone)} onChange={() => clearFieldError('phone')} className="w-full bg-navy-deep border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-colors" />
          {fieldErrors.phone ? <p className="mt-2 text-sm text-accent-red">{fieldErrors.phone}</p> : null}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="projectType" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 border-l-2 border-accent-red pl-2">Project Type</label>
          <select required id="projectType" name="projectType" aria-invalid={Boolean(fieldErrors.projectType)} onChange={() => clearFieldError('projectType')} className="w-full bg-navy-deep border border-gray-700 text-gray-200 px-4 py-3 focus:outline-none focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-colors appearance-none">
            <option value="">Select Project Type</option>
            <option value="Bathroom Remodel">Bathroom Remodel</option>
            <option value="Kitchen Remodel">Kitchen Remodel</option>
            <option value="ADU Construction">ADU Construction</option>
            <option value="Custom Home">Custom Home Build</option>
            <option value="Home Addition">Home Addition</option>
            <option value="General Contracting">General Contracting</option>
            <option value="Other">Other Design-Build</option>
          </select>
          {fieldErrors.projectType ? <p className="mt-2 text-sm text-accent-red">{fieldErrors.projectType}</p> : null}
        </div>
        <div>
          <label htmlFor="city" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 border-l-2 border-accent-red pl-2">City</label>
          <input required type="text" id="city" name="city" aria-invalid={Boolean(fieldErrors.city)} onChange={() => clearFieldError('city')} placeholder="e.g. Sherman Oaks" className="w-full bg-navy-deep border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-colors" />
          {fieldErrors.city ? <p className="mt-2 text-sm text-accent-red">{fieldErrors.city}</p> : null}
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="message" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 border-l-2 border-accent-red pl-2">Tell Us About Your Project</label>
        <textarea required id="message" name="message" rows={5} aria-invalid={Boolean(fieldErrors.message)} onChange={() => clearFieldError('message')} placeholder="Briefly describe your scope regarding budget, timing, or architectural desires..." className="w-full bg-navy-deep border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-colors resize-y" />
        {fieldErrors.message ? <p className="mt-2 text-sm text-accent-red">{fieldErrors.message}</p> : null}
      </div>

      <button disabled={isSubmitting} type="submit" className="group relative z-[1] flex w-full items-center justify-center overflow-hidden bg-accent-red py-5 font-extrabold uppercase tracking-widest text-white shadow-[0_0_15px_rgba(179,18,23,0.3)] transition-all duration-300 hover:bg-[#990000] disabled:opacity-50 disabled:shadow-none">
        {isSubmitting ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Sending...
          </span>
        ) : (
          <span className="flex items-center">
            Request Formal Estimate
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        )}
      </button>
    </form>
  );
};
