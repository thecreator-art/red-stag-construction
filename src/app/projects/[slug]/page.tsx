import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import projectsData from "@/data/projects.json";

type ProjectEntry = (typeof projectsData)[number];

interface PageProps {
  params: Promise<{ slug: string }>;
}

const PHONE_NUMBER = "(626) 652-2303";

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((entry) => entry.slug === slug);

  if (!project) {
    return {
      title: "Project Gallery Not Found | Red Stag",
      description: "This Red Stag gallery page could not be found.",
    };
  }

  return {
    title: `${project.title} Gallery | Red Stag`,
    description: `${project.category} photos from ${project.title} in ${project.location}. Browse the full Red Stag project gallery.`,
    alternates: {
      canonical: `https://redstagcc.com/projects/${project.slug}`,
    },
  };
}

function getRelatedProjects(currentProject: ProjectEntry) {
  return projectsData.filter((project) => project.slug !== currentProject.slug).slice(0, 3);
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project);
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    author: {
      "@type": "Organization",
      name: "Red Stag Construction",
    },
    about: `${project.category} in ${project.location}`,
    url: `https://redstagcc.com/projects/${project.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />

      <section className="border-b border-white/10 bg-navy-deep pb-20 pt-24 text-white md:pb-24 md:pt-32">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <Link
            href="/our-work"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-accent-red transition-opacity hover:opacity-80"
          >
            <span aria-hidden="true">←</span>
            Back to Gallery
          </Link>
          <h1 className="mt-8 font-sans text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.5)] md:text-7xl">
            {project.title}
          </h1>
          <p className="mt-5 text-base font-semibold uppercase tracking-[0.18em] text-white/70 md:text-lg">
            {project.tagline.replaceAll("/", " • ")}
          </p>
          <p className="mx-auto mt-8 max-w-4xl text-lg leading-8 text-white/70 md:text-2xl md:leading-10">
            {project.description}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-5 border-t border-white/10 pt-8 text-left md:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Location</p>
              <p className="mt-3 text-xl font-semibold text-white">{project.location}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Project Type</p>
              <p className="mt-3 text-xl font-semibold text-white">{project.category}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Need pricing?</p>
              <a
                href="tel:6266522303"
                className="mt-3 inline-block text-xl font-semibold text-white transition-opacity hover:opacity-80"
              >
                {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-deep pb-24 pt-8 md:pb-28 md:pt-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {project.galleryImages.map((image, index) => (
              <div
                key={`${project.slug}-${image}`}
                className={index === 0 ? "relative overflow-hidden md:col-span-2" : "relative overflow-hidden"}
              >
                <div className={index === 0 ? "relative aspect-[16/9]" : "relative aspect-[4/5] md:aspect-[4/3]"}>
                  <Image
                    src={image}
                    alt={`${project.title} photo ${index + 1}`}
                    fill
                    priority={index < 2}
                    sizes={index === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-20 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-0.5 w-14 bg-accent-red" />
            <h2 className="font-serif text-3xl font-bold text-text-dark md:text-4xl">More project galleries</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedProjects.map((relatedProject) => (
              <Link
                key={relatedProject.slug}
                href={`/projects/${relatedProject.slug}`}
                className="group block overflow-hidden bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={relatedProject.coverImage}
                    alt={relatedProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#152d45]/85 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-text-dark">{relatedProject.title}</h3>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent-red">
                    {relatedProject.category}
                  </p>
                  <p className="mt-3 text-base leading-7 text-text-body">{relatedProject.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep py-20 text-center md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="font-serif text-3xl font-bold text-white md:text-5xl">
            Want this level of finish on your own project?
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/75">
            Call Red Stag early. It is the fastest way to get real pricing, real sequencing, and a
            clear read on what the work will actually take.
          </p>
          <a
            href="tel:6266522303"
            className="mt-8 block text-4xl font-bold text-white transition-opacity hover:opacity-90"
          >
            {PHONE_NUMBER}
          </a>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center justify-center bg-accent-red px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-200 hover:brightness-110"
          >
            Get a Free Estimate
          </Link>
        </div>
      </section>
    </>
  );
}
