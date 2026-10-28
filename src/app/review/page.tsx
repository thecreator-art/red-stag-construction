import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Review Red Stag Construction in Los Angeles, CA | Google Business Profile',
  description: 'Share your remodeling, ADU, or custom home construction experience with Red Stag Construction (3211 Cahuenga Boulevard West, STE 207, Los Angeles, CA 90068).',
  alternates: { canonical: 'https://redstagcc.com/review' },
};

export default function ReviewPage() {
  const prompts = [
    {
      label: 'Kitchen & Bathroom Remodeling',
      text: 'Red Stag Construction handled our kitchen and bathroom remodel in Los Angeles with clear milestone pricing, clean LADBS permitting, and outstanding finish carpentry.',
    },
    {
      label: 'ADU & Home Addition',
      text: 'Israel, Anthony, and the Red Stag Construction team managed our ADU build in Sherman Oaks from architectural plans and permits through final inspection on schedule.',
    },
    {
      label: 'Full Home Renovation',
      text: 'Licensed general contractor Red Stag Construction delivered our whole-home renovation in Burbank and Beverly Hills with zero surprise change orders.',
    },
  ];

  return (
    <section className="bg-warm-white py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 p-8 md:p-12 shadow-lg">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent-red mb-3">
          Verified Client Feedback · CSLB License #964664
        </p>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#111] mb-6">
          Review Red Stag Construction in Los Angeles, CA
        </h1>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
          Thank you for trusting Red Stag Construction (3211 Cahuenga Boulevard West, STE 207, Los Angeles, CA 90068) with your home! Mentioning the <strong>project scope</strong> (kitchen remodel, ADU, bathroom remodel, addition) and <strong>city</strong> helps fellow Los Angeles homeowners find a dependable design-build general contractor.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {prompts.map((p) => (
            <div key={p.label} className="border border-gray-200 bg-warm-white p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-accent-red mb-2">{p.label}</h2>
              <p className="text-sm text-gray-700 leading-relaxed">&ldquo;{p.text}&rdquo;</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://www.google.com/maps?cid=1546060090964512284"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-accent-red px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white hover:opacity-90"
          >
            Leave a Google Review &rarr;
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-gray-300 px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#111] hover:border-accent-red"
          >
            Contact Our Cahuenga Office
          </Link>
        </div>
      </div>
    </section>
  );
}
