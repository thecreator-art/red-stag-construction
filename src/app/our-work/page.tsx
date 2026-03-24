import Image from "next/image";
import Link from "next/link";

import projectsData from "@/data/projects.json";
import { TrustBadge } from "@/components/ui/TrustBadge";

export const metadata = {
  title: "Gallery | Red Stag Construction Los Angeles",
  description:
    "Browse recent Red Stag Construction work across Los Angeles, from detached ADUs to full interior renovations and signature residential builds.",
};

const instagramTiles = projectsData.flatMap((project) =>
  project.galleryImages.slice(0, 3).map((image, index) => ({
    src: image,
    alt: `${project.title} gallery image ${index + 1}`,
  })),
).slice(0, 11);

export default function OurWorkPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-navy-deep pt-24 pb-20 text-white md:pt-32 md:pb-24">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent-red">
            Signature Portfolio
          </p>
          <h1 className="mt-6 font-sans text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.5)] md:text-7xl">
            Discover How Vision
            <br />
            Meets Precision
          </h1>
          <p className="mx-auto mt-8 max-w-5xl text-lg leading-8 text-white/70 md:text-2xl md:leading-10">
            Recent work that shows how Red Stag handles layout, finishes, field control, and the kind
            of detail Los Angeles clients actually notice when the job is done.
          </p>
        </div>
      </section>

      <TrustBadge />

      <section className="bg-navy-deep pb-24 pt-12 text-white md:pb-28">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {projectsData.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group relative block cursor-pointer overflow-hidden bg-[#11263b]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#152d45]/95 via-[#152d45]/20 to-transparent transition-colors duration-300 group-hover:from-[#152d45]/85" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-8 text-center md:p-10">
                    <h2 className="font-sans text-3xl font-bold tracking-tight text-white md:text-5xl">
                      {project.title}
                    </h2>
                    <p className="mt-4 text-xl font-semibold text-white/95 md:text-2xl">
                      {project.tagline.replaceAll("/", " - ")}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 border-b border-accent-red pb-1 text-xs font-bold uppercase tracking-[0.24em] text-accent-red">
                      View Project
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-20 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent-red">Instagram</p>
              <h2 className="mt-4 font-serif text-4xl font-bold text-text-dark md:text-5xl">
                More site progress. More finish work. No filler.
              </h2>
              <p className="mt-5 text-lg leading-8 text-text-body">
                If you want the day-to-day field shots, detail moments, and finished rooms that do not
                always make the main portfolio, that lives on Instagram.
              </p>
            </div>

            <a
              href="https://www.instagram.com/redstagcc/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center bg-accent-red px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-200 hover:brightness-110"
            >
              See More of Our Work on Instagram
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {instagramTiles.map((tile, index) => (
              <a
                key={`${tile.src}-${index}`}
                href="https://www.instagram.com/redstagcc/"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block aspect-square overflow-hidden bg-navy-deep ${
                  index === 0 ? "sm:col-span-2 sm:row-span-2 sm:aspect-auto" : ""
                }`}
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes={index === 0 ? "(max-width: 640px) 50vw, 33vw" : "(max-width: 640px) 50vw, 16vw"}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-[#152d45]/10 transition-colors duration-300 group-hover:bg-[#152d45]/25" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep py-20 text-center md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="font-serif text-3xl font-bold text-white md:text-5xl">
            Ready to talk through your own project?
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/75">
            If you have seen enough, the next move is simple. Call us, walk the site, and get a real
            read on scope, sequencing, and what the build will take.
          </p>
          <a
            href="tel:6266522303"
            className="mt-8 block text-4xl font-bold text-white transition-opacity hover:opacity-90"
          >
            (626) 652-2303
          </a>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center justify-center bg-accent-red px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-200 hover:brightness-110"
          >
            Start Your Estimate
          </Link>
        </div>
      </section>
    </>
  );
}
