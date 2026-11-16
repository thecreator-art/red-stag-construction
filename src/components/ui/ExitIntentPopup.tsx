// Static markup, hidden by default. Shown after one minute on the page (and on
// exit intent after that) by src/scripts/site.ts ([data-exit-popup]).

export const ExitIntentPopup = () => {
  return (
    // z sits above the GoHighLevel chat widget (z-index 99999999) so the modal is not covered.
    <div data-exit-popup hidden role="dialog" aria-modal="true" aria-labelledby="exit-popup-title" className="fixed inset-0 z-[100000000] flex items-center justify-center bg-navy-deep/80 p-4 backdrop-blur-sm">
      <div className="relative z-[1] w-full max-w-lg rounded-sm border-t-4 border-accent-red bg-navy-deep p-8 shadow-2xl duration-300">
        
        <button
          type="button"
          data-exit-close
          aria-label="Close"
          className="absolute top-4 right-4 z-[2] text-gray-500 transition-colors hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex justify-center mb-5">
          <img
            src="/images/logo/logo-primary.png"
            alt="Red Stag Construction Corporation"
            className="h-16 w-auto object-contain md:h-20"
          />
        </div>

        <h2 id="exit-popup-title" className="text-3xl font-serif font-bold text-center text-white mb-3 leading-tight">Before You Go — Get a Free Estimate</h2>
        <p className="mb-6 text-center text-sm leading-relaxed text-gray-300">
          Design-build specialists serving Greater Los Angeles since 2011. Leave your name and number and our team will call you back — usually same day.
        </p>
        
        <form data-lead-form data-extra='{"formContext":"Exit Intent Action - High Priority","source":"Exit Popup Form"}' className="relative z-[1] space-y-4">
          <div data-form-error hidden className="p-4 bg-red-900/40 border-l-4 border-accent-red text-white text-sm text-center">
            Error contacting servers. Please call us directly at{' '}
            <a href="tel:3239224235" className="font-semibold underline hover:text-accent-red">
              (323) 922-4235
            </a>
            .
          </div>
          {/* Honeypot Security Payload */}
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <input required type="text" name="fullName" data-label="Full Name" aria-label="Full Name" placeholder="Full Name" className="w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 transition-colors focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/20" />
            <p data-error-for="fullName" hidden className="mt-2 text-sm text-accent-red" />
          </div>
          <div>
            <input required type="tel" name="phone" data-label="Phone Number" aria-label="Phone Number" placeholder="Phone Number" className="w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 transition-colors focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/20" />
            <p data-error-for="phone" hidden className="mt-2 text-sm text-accent-red" />
          </div>

          <button type="submit" data-sending-label="Processing..." className="cta cta-block mt-2">
            Get My Free Estimate
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-300">
          Prefer to talk now?{' '}
          <a href="tel:3239224235" className="font-bold text-accent-red transition-colors hover:text-white">
            (323) 922-4235
          </a>
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-white/10 pt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
          <span>Licensed &amp; Insured</span>
          <span aria-hidden="true" className="text-accent-red">&bull;</span>
          <span>CSLB #964664</span>
          <span aria-hidden="true" className="text-accent-red">&bull;</span>
          <span>Building LA Since 2011</span>
        </div>
      </div>
    </div>
  );
};
