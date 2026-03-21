export const metadata = {
  title: 'Terms of Service | Red Stag Construction',
  description: 'Review the Red Stag Construction terms of service for estimates, liability limits, licensing, and project documentation.',
  robots: 'noindex',
};
export default function Terms() {
  return (
    <div className="bg-white py-24 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl prose prose-lg text-text-body">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-dark mb-8">Terms of Service</h1>
        <p className="mb-6">Effective Date: January 1, 2024</p>
        <h2 className="text-2xl font-serif font-bold text-text-dark mt-10 mb-4">1. Estimate Validity</h2>
        <p className="mb-6 leading-relaxed">Free estimates provided via the physical website interface or direct communications are initial budgetary blueprints subject to hard engineering plans and city approvals. Official contracts supersede any preliminary figures.</p>
        <h2 className="text-2xl font-serif font-bold text-text-dark mt-10 mb-4">2. Liability Limits</h2>
        <p className="mb-6 leading-relaxed">Red Stag Construction operates fully licensed, bonded, and insured (License #964664). Our aggregate liability under standard operations shall be restricted strictly to the explicit terms established in finalized CSLB Home Improvement Contracts.</p>
        <h2 className="text-2xl font-serif font-bold text-text-dark mt-10 mb-4">3. Licensing Protocol</h2>
        <p className="mb-6 leading-relaxed">We adhere entirely to guidelines established by the California State License Board. All architectural renderings, 3D designs, and blueprints executed by our native teams remain the intellectual property of Red Stag Construction until full transfer upon final payment.</p>
      </div>
    </div>
  );
}
