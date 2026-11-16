// Static markup. Submitted by src/scripts/site.ts (form[data-lead-form]).

export const BlogSidebarLeadForm = ({ source }: { source: string }) => {
  return (
    <form data-lead-form className="mt-4 space-y-4">
      <input type="hidden" name="source" value={source} />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
      <div>
        <label htmlFor="blog-sidebar-name" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-dark">
          Name
        </label>
        <input
          id="blog-sidebar-name"
          name="fullName"
          data-label="Name"
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
      <p data-form-error hidden className="text-sm text-accent-red">
        There was an error sending your request. Please call us directly at{' '}
        <a href="tel:3239224235" className="font-semibold underline hover:text-[#990000]">
          (323) 922-4235
        </a>
        .
      </p>
      <button type="submit" data-sending-label="Sending..." className="cta cta-block cta-sm">
        Send Message
      </button>
    </form>
  );
};
