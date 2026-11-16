import Link from 'next/link';
import { ContactForm } from '@/components/forms/ContactForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { TrustBadge } from '@/components/ui/TrustBadge';
import type { ProService } from '@/data/proServices';

const BASE_URL = 'https://redstagcc.com';

export const ProServicePage = ({ service }: { service: ProService }) => {
  const url = `${BASE_URL}/${service.slug}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.name,
    url,
    description: service.metaDescription,
    areaServed: { '@type': 'City', name: 'Los Angeles', containedInPlace: { '@type': 'State', name: 'California' } },
    provider: {
      '@type': ['LocalBusiness', 'GeneralContractor'],
      name: 'Red Stag Construction',
      url: BASE_URL,
      telephone: '(323) 922-4235',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3211 Cahuenga Blvd W Ste 207',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90068',
        addressCountry: 'US',
      },
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ParallaxHero
        imageSrc={service.heroImage}
        imageAlt={service.heroAlt}
        h1Text={service.h1}
        h2Text={service.heroSubline}
        ctaText="Get a Free Estimate"
        ctaHref="/contact"
        phoneNumber="(323) 922-4235"
      />

      <TrustBadge />

      {/* Answer first */}
      <section className="bg-white px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            crumbs={[
              { label: 'Home', href: '/' },
              { label: service.name, href: `/${service.slug}` },
            ]}
          />
          <div className="mt-8 space-y-6 text-lg leading-8 text-text-body">
            {service.answer.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link href="/contact" className="cta">
              Request a Proposal
            </Link>
            <a href="tel:3239224235" className="font-bold text-navy-deep">
              or call (323) 922-4235
            </a>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="border-y border-[#e2dbcf] bg-warm-white px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">{service.scopeHeading}</h2>
          <div className="mt-10 grid gap-px overflow-hidden border border-[#dcd2c6] bg-[#dcd2c6] md:grid-cols-2 lg:grid-cols-3">
            {service.scope.map((item, index) => (
              <div key={item.title} className="bg-white p-8">
                <p className="font-serif text-sm font-bold text-accent-red">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 font-sans text-lg font-bold text-text-dark">{item.title}</h3>
                <p className="mt-3 leading-7 text-text-body">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="bg-white px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">{service.clientsHeading}</h2>
          <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {service.clients.map((client) => (
              <div key={client.title} className="border-l-2 border-accent-red pl-6">
                <h3 className="font-sans text-lg font-bold text-text-dark">{client.title}</h3>
                <p className="mt-2 leading-7 text-text-body">{client.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="bg-navy-deep px-6 py-16 text-white md:px-12 md:py-24" id="fees">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">{service.feesHeading}</h2>
          <p className="mt-5 max-w-3xl leading-7 text-gray-300">{service.feesIntro}</p>
          <div className="mt-10 overflow-x-auto border border-white/15">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-white/10 text-xs uppercase tracking-[0.16em] text-gray-200">
                  <th className="px-5 py-4 font-semibold">Item</th>
                  <th className="px-5 py-4 font-semibold">Typical range</th>
                  <th className="px-5 py-4 font-semibold">What it covers</th>
                </tr>
              </thead>
              <tbody>
                {service.fees.map((fee) => (
                  <tr key={fee.item} className="border-t border-white/10 align-top">
                    <td className="px-5 py-4 font-semibold text-white">{fee.item}</td>
                    <td className="px-5 py-4 font-bold text-white">{fee.range}</td>
                    <td className="px-5 py-4 text-gray-300">{fee.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-8 max-w-3xl space-y-3 text-sm leading-6 text-gray-300">
            {service.feesNotes.map((note) => (
              <li key={note.slice(0, 40)} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent-red" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">{service.processHeading}</h2>
          <ol className="mt-10 space-y-8">
            {service.process.map((step, index) => (
              <li key={step.title} className="flex gap-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-navy-deep font-serif text-lg font-bold text-navy-deep">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-sans text-lg font-bold text-text-dark">{step.title}</h3>
                  <p className="mt-1 leading-7 text-text-body">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Local */}
      <section className="border-y border-[#e2dbcf] bg-warm-white px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">{service.localHeading}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {service.local.map((item) => (
              <div key={item.title} className="bg-white p-8 shadow-sm">
                <h3 className="font-sans text-lg font-bold text-text-dark">{item.title}</h3>
                <p className="mt-3 leading-7 text-text-body">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">{service.name} questions</h2>
          <div className="mt-8">
            <FAQAccordion showSearch={false} categories={[{ categoryTitle: '', questions: service.faqs }]} />
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-navy-deep px-6 py-16 text-white md:px-12 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">{service.closingHeadline}</h2>
            <p className="mt-5 leading-7 text-gray-300">{service.closingText}</p>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Related</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {service.related.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-semibold text-white underline decoration-accent-red underline-offset-4 hover:text-accent-red">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
};
