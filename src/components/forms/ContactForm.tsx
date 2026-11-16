// Static markup. Submitted by src/scripts/site.ts (form[data-lead-form]).

export const ContactForm = ({ className = '' }: { className?: string }) => {
  return (
    <form data-lead-form data-extra='{"source":"Contact Page Form"}' data-gtag-service="Contact" className={`relative z-[1] w-full bg-navy-deep p-8 shadow-2xl md:p-12 ${className}`}>
      
      {/* Inline Persistent Error Delivery Mechanics */}
      <div data-form-error hidden className="p-4 mb-6 bg-red-900/40 border-l-4 border-accent-red text-white text-sm">
        There was an error submitting your request to our system. Please try calling us directly at{' '}
        <a href="tel:3239224235" className="font-semibold underline hover:text-accent-red">
          (323) 922-4235
        </a>
        .
      </div>
      
      {/* Honeypot Trap Mechanism */}
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <h3 className="text-2xl font-serif font-bold text-white mb-8 border-b border-gray-800 pb-4">Provide Details to Begin</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="fullName" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 border-l-2 border-accent-red pl-2">Full Name</label>
          <input required type="text" id="fullName" name="fullName" data-label="Full Name" className="w-full bg-navy-deep border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-colors" />
          <p data-error-for="fullName" hidden className="mt-2 text-sm text-accent-red" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 border-l-2 border-accent-red pl-2">Phone Number</label>
          <input required type="tel" id="phone" name="phone" data-label="Phone Number" className="w-full bg-navy-deep border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-colors" />
          <p data-error-for="phone" hidden className="mt-2 text-sm text-accent-red" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="projectType" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 border-l-2 border-accent-red pl-2">Project Type</label>
          <select required id="projectType" name="projectType" data-label="Project Type" className="w-full bg-navy-deep border border-gray-700 text-gray-200 px-4 py-3 focus:outline-none focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-colors appearance-none">
            <option value="">Select Project Type</option>
            <option value="Bathroom Remodel">Bathroom Remodel</option>
            <option value="Kitchen Remodel">Kitchen Remodel</option>
            <option value="ADU Construction">ADU Construction</option>
            <option value="Custom Home">Custom Home Build</option>
            <option value="Home Addition">Home Addition</option>
            <option value="General Contracting">General Contracting</option>
            <option value="Other">Other Design-Build</option>
          </select>
          <p data-error-for="projectType" hidden className="mt-2 text-sm text-accent-red" />
        </div>
        <div>
          <label htmlFor="city" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 border-l-2 border-accent-red pl-2">City</label>
          <input required type="text" id="city" name="city" data-label="City" placeholder="e.g. Sherman Oaks" className="w-full bg-navy-deep border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-colors" />
          <p data-error-for="city" hidden className="mt-2 text-sm text-accent-red" />
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="message" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 border-l-2 border-accent-red pl-2">Tell Us About Your Project</label>
        <textarea required id="message" name="message" rows={5} data-label="Tell Us About Your Project" placeholder="Briefly describe your scope regarding budget, timing, or architectural desires..." className="w-full bg-navy-deep border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-colors resize-y" />
        <p data-error-for="message" hidden className="mt-2 text-sm text-accent-red" />
      </div>

      <button type="submit" data-sending-label="Sending..." className="cta cta-block">
        Request Formal Estimate
      </button>
    </form>
  );
};
