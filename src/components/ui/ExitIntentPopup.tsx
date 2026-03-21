'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const ExitIntentPopup = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
    } catch (err) {
      setErrorMsg('Error contacting servers. Please call us directly at (626) 652-2303.');
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/80 backdrop-blur-sm p-4">
      <div className="bg-[#111] border-t-4 border-accent-red w-full max-w-lg p-8 rounded-sm shadow-2xl relative animate-in zoom-in-95 duration-300">
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot Security Payload */}
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <input required type="text" name="fullName" placeholder="Full Name" className="w-full bg-navy-deep border border-gray-800 text-white rounded-sm px-4 py-3 focus:outline-none focus:border-accent-red transition-colors" />
          </div>
          <div>
            <input required type="tel" name="phone" placeholder="Phone Number" className="w-full bg-navy-deep border border-gray-800 text-white rounded-sm px-4 py-3 focus:outline-none focus:border-accent-red transition-colors" />
          </div>
          
          <button disabled={isSubmitting} type="submit" className="w-full bg-accent-red hover:bg-[#990000] transition-colors text-white font-extrabold uppercase tracking-widest py-4 mt-2 shadow-[0_0_15px_rgba(179,18,23,0.3)] disabled:opacity-50 flex justify-center items-center">
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
