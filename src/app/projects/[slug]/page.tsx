import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import projectsData from '@/data/projects.json';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';

type ProjectEntry = (typeof projectsData)[number];

interface PageProps {
  params: Promise<{ slug: string }>;
}

const PHONE_NUMBER = '(626) 652-2303';
const PHONE_HREF = 'tel:6266522303';

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((entry) => entry.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found | Red Stag',
      description: 'This Red Stag Construction case study could not be found.',
    };
  }

  return {
    title: `${project.title} | Red Stag`,
    description: `${project.serviceType} case study in ${project.city} with project scope, timeline, budget range, and Red Stag's design-build approach.`,
  };
}

const getRelatedProjects = (currentProject: ProjectEntry) =>
  projectsData.filter((project) => project.slug !== currentProject.slug).slice(0, 3);

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project);
  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.result,
    author: {
      '@type': 'Organization',
      name: 'Red Stag Construction',
    },
    about: `${project.serviceType} in ${project.city}`,
    url: `https://redstagcc.com/projects/${project.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />

      <section className="bg-navy-deep py-20 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-red">Case Study</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-serif font-bold text-white md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-white/80">
            {project.city} / {project.serviceType}
          </p>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
            <div className="border border-gray-200 bg-warm-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Service Type</p>
              <p className="mt-3 text-2xl font-serif font-bold text-text-dark">{project.serviceType}</p>
            </div>
            <div className="border border-gray-200 bg-warm-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">City</p>
              <p className="mt-3 text-2xl font-serif font-bold text-text-dark">{project.city}</p>
            </div>
            <div className="border border-gray-200 bg-warm-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Approx. Size</p>
              <p className="mt-3 text-2xl font-serif font-bold text-text-dark">{project.squareFootage}</p>
            </div>
            <div className="border border-gray-200 bg-warm-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Timeline</p>
              <p className="mt-3 text-2xl font-serif font-bold text-text-dark">{project.timeline}</p>
            </div>
            <div className="border border-gray-200 bg-warm-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Budget Range</p>
              <p className="mt-3 text-2xl font-serif font-bold text-text-dark">{project.budgetRange}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-20 md:py-24">
        <div className="container mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-16">
            <div>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-0.5 w-14 bg-accent-red"></span>
                <h2 className="text-3xl font-serif font-bold text-text-dark md:text-4xl">The challenge</h2>
              </div>
              <p className="text-lg leading-8 text-text-body">{project.challenge}</p>
            </div>

            <div>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-0.5 w-14 bg-accent-red"></span>
                <h2 className="text-3xl font-serif font-bold text-text-dark md:text-4xl">Red Stag&apos;s approach</h2>
              </div>
              <p className="text-lg leading-8 text-text-body">{project.approach}</p>
            </div>

            <div>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-0.5 w-14 bg-accent-red"></span>
                <h2 className="text-3xl font-serif font-bold text-text-dark md:text-4xl">The result</h2>
              </div>
              <p className="mb-10 text-lg leading-8 text-text-body">{project.result}</p>
              <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                {project.beforeAfter.map((galleryItem) => (
                  <BeforeAfterSlider
                    key={`${project.slug}-${galleryItem.beforeImage}-${galleryItem.afterImage}`}
                    beforeImage={galleryItem.beforeImage}
                    afterImage={galleryItem.afterImage}
                    altText={galleryItem.altText}
                  />
                ))}
              </div>
            </div>

            <div className="bg-navy-deep px-8 py-10 shadow-xl">
              <span className="block text-6xl leading-none text-accent-red">&ldquo;</span>
              <p className="mt-4 text-2xl font-serif italic leading-10 text-white">{project.testimonial}</p>
              <p className="mt-6 text-base font-bold text-white">{project.testimonialFrom}</p>
              <p className="mt-1 text-sm text-gray-400">{project.city}</p>
            </div>
          </div>

          <aside>
            <div className="sticky top-28 border border-gray-200 bg-white p-6">
              <h2 className="text-2xl font-serif font-bold text-text-dark">Project details</h2>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Project</dt>
                  <dd className="mt-2 text-base font-semibold text-text-dark">{project.title}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Service</dt>
                  <dd className="mt-2 text-base font-semibold text-text-dark">{project.serviceType}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Location</dt>
                  <dd className="mt-2 text-base font-semibold text-text-dark">{project.city}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Approx. Size</dt>
                  <dd className="mt-2 text-base font-semibold text-text-dark">{project.squareFootage}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Timeline</dt>
                  <dd className="mt-2 text-base font-semibold text-text-dark">{project.timeline}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Budget</dt>
                  <dd className="mt-2 text-base font-semibold text-text-dark">{project.budgetRange}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-0.5 w-14 bg-accent-red"></span>
            <h2 className="text-3xl font-serif font-bold text-text-dark md:text-4xl">Related projects</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedProjects.map((relatedProject) => (
              <Link
                key={relatedProject.slug}
                href={`/projects/${relatedProject.slug}`}
                className="border border-gray-200 bg-warm-white p-7 transition-colors hover:border-accent-red"
              >
                <h3 className="text-2xl font-serif font-bold text-text-dark">{relatedProject.title}</h3>
                <p className="mt-3 text-base leading-7 text-text-body">
                  {relatedProject.city} / {relatedProject.serviceType}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep py-20 md:py-24">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-white md:text-5xl">
            Planning a project like this in {project.city}?
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/80">
            Talk with Red Stag before pricing, permit timing, and field logistics start pulling the project in different directions.
          </p>
          <a
            href={PHONE_HREF}
            className="mt-8 block text-4xl font-bold text-white transition-opacity hover:opacity-90"
          >
            {PHONE_NUMBER}
          </a>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center bg-accent-red px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
          >
            Get a Free Estimate
          </Link>
        </div>
      </section>
    </>
  );
}
