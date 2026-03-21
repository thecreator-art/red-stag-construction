'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const ExitIntentPopup = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Suppress specifically tracking the thank you conversion route
    if (pathname === '/thank-you') return;

    // Reject execution if session token verifies prior appearance
    if (sessionStorage.getItem('redstag_exit_intent') === 'true') return;

    // Desktop Mouseleave bound detection
    const handleMouseLeave = (e: MouseEvent) => {
      // Fire exclusively if trajectory crosses the aggressive top 10px Y bounds
      if (e.clientY < 10) {
        triggerPopup();
      }
    };

    const triggerPopup = () => {
      setIsVisible(true);
      sessionStorage.setItem('redstag_exit_intent', 'true');
      document.removeEventListener('mouseleave', handleMouseLeave);
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    // Mobile specific 45-second attention retention threshold
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('redstag_exit_intent')) {
        triggerPopup();
      }
    }, 45000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [pathname]);

  const validateFieldValues = (formData: FormData) => {
    const nextErrors: Record<string, string> = {};

    if (!String(formData.get('fullName') || '').trim()) {
      nextErrors.fullName = 'Full Name is required.';
    }

    if (!String(formData.get('phone') || '').trim()) {
      nextErrors.phone = 'Phone Number is required.';
    }

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
    
    // Explicit Honeypot Validation handling silent failures against bots
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
      formContext: 'Exit Intent Action - High Priority' // Meta Tracking Key
    };

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL || '';
      if (!webhookUrl) {
        throw new Error('GHL Webhook Configuration omitted');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsVisible(false);
        router.push('/thank-you');
      } else {
        throw new Error('Transmission Failed');
      }
    } catch {
      setErrorMsg('Error contacting servers. Please call us directly at (626) 652-2303.');
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/80 p-4 backdrop-blur-sm">
      <div className="relative z-[1] w-full max-w-lg animate-in zoom-in-95 rounded-sm border-t-4 border-accent-red bg-navy-deep p-8 shadow-2xl duration-300">
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 z-[2] text-gray-500 transition-colors hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex justify-center mb-6">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#B31217" className="w-12 h-12">
             <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
           </svg>
        </div>

        <h2 className="text-3xl font-serif font-bold text-center text-white mb-6 leading-tight">Get a Free Estimate Before You Go</h2>
        
        {/* Persistent Error State Dropdown */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-900/40 border-l-4 border-accent-red text-white text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative z-[1] space-y-4">
          {/* Honeypot Security Payload */}
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <input required type="text" name="fullName" aria-invalid={Boolean(fieldErrors.fullName)} onChange={() => clearFieldError('fullName')} placeholder="Full Name" className="w-full rounded-sm border border-gray-800 bg-navy-deep px-4 py-3 text-white transition-colors focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/20" />
            {fieldErrors.fullName ? <p className="mt-2 text-sm text-accent-red">{fieldErrors.fullName}</p> : null}
          </div>
          <div>
            <input required type="tel" name="phone" aria-invalid={Boolean(fieldErrors.phone)} onChange={() => clearFieldError('phone')} placeholder="Phone Number" className="w-full rounded-sm border border-gray-800 bg-navy-deep px-4 py-3 text-white transition-colors focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/20" />
            {fieldErrors.phone ? <p className="mt-2 text-sm text-accent-red">{fieldErrors.phone}</p> : null}
          </div>
          
          <button disabled={isSubmitting} type="submit" className="relative z-[1] mt-2 flex w-full items-center justify-center bg-accent-red py-4 font-extrabold uppercase tracking-widest text-white shadow-[0_0_15px_rgba(179,18,23,0.3)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#990000] hover:brightness-110 disabled:opacity-50">
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Processing...
              </span>
            ) : "Secure My Estimate"}
          </button>
        </form>
      </div>
    </div>
  );
};
