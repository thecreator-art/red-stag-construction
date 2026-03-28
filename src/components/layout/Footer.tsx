import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="mt-auto bg-navy-deep text-white border-t-4 border-accent-red">
      <section className="border-b border-white/10 px-4 py-10 md:px-0 md:py-12">
        <div className="container mx-auto">
          <div className="overflow-hidden rounded-sm border border-white/10 bg-white/5 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.6fr]">
              <div className="relative min-h-[220px]">
                <Image
                  src="/images/projects/trousdale-after.jpg"
                  alt="Luxury Los Angeles exterior renovation by Red Stag Construction"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/25 via-transparent to-transparent" />
              </div>
              <div className="flex flex-col justify-center gap-5 px-6 py-8 md:px-10 md:py-10">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent-red">Ready When You Are</p>
                <div>
                  <h2 className="text-3xl font-serif font-bold leading-tight text-white md:text-4xl">
                    One team. One contract. Built to finish right.
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
                    Red Stag manages design, permits, and construction across Greater Los Angeles for custom homes, additions, ADUs, kitchens, bathrooms, and full-property renovations.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="tel:6266522303"
                    className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-200 hover:border-accent-red hover:text-accent-red"
                  >
                    Call (626) 652-2303
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center justify-center rounded-sm bg-accent-red px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-200 hover:bg-[#990000] hover:brightness-110"
                  >
                    Request Formal Estimate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div>
            <Link href="/" className="block mb-6">
              <Image
                src="/images/logo/logo-primary.png"
                alt="Red Stag Construction Corporation"
                width={290}
                height={128}
                className="h-14 w-auto object-contain md:h-16"
              />
            </Link>
            <p className="text-gray-400 mb-6 font-semibold">
              Built on Craft. Driven by Accountability.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="font-semibold text-white">License #964664</p>
              <p>Est. 2011</p>
              <p>Licensed General Contractor - State of California</p>
              <a
                href="https://www.cslb.ca.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-gray-400 transition-colors hover:text-accent-red"
              >
                CSLB License #964664
              </a>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://www.instagram.com/redstagcc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/5 text-gray-300 transition-all duration-200 hover:border-accent-red hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.20 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="https://www.facebook.com/Redstagconstructioncompany"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/5 text-gray-300 transition-all duration-200 hover:border-accent-red hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/in/israel-aquino-59333259"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/5 text-gray-300 transition-all duration-200 hover:border-accent-red hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003L22.225 0z"/></svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-accent-red text-lg mb-6 font-bold uppercase tracking-wider">Contact Us</h3>
            <div className="space-y-4 text-sm font-semibold">
              <p className="flex flex-col">
                <span className="text-gray-500 mb-1">Phone</span>
                <a href="tel:6266522303" className="text-white hover:text-accent-red text-lg transition-colors">(626) 652-2303</a>
              </p>
              <p className="flex flex-col">
                <span className="text-gray-500 mb-1">Email</span>
                <a href="mailto:support@redstagcc.com" className="hover:text-accent-red transition-colors">support@redstagcc.com</a>
              </p>
              <p className="flex flex-col">
                <span className="text-gray-500 mb-1">Address</span>
                <span>3211 Cahuenga Blvd W Ste 207</span>
                <span>Los Angeles, CA 90068</span>
              </p>
              <p className="flex flex-col">
                <span className="text-gray-500 mb-1">Hours</span>
                <span>Mon-Sat 8AM-6PM</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-accent-red text-lg mb-6 font-bold uppercase tracking-wider">Company</h3>
            <ul className="space-y-3 text-sm font-semibold">
              <li><Link href="/about" className="hover:text-white text-gray-400 transition-colors">About Red Stag</Link></li>
              <li><Link href="/our-work" className="hover:text-white text-gray-400 transition-colors">Our Portfolio</Link></li>
              <li><Link href="/areas-we-serve" className="hover:text-white text-gray-400 transition-colors">Areas We Serve</Link></li>
              <li><Link href="/faq" className="hover:text-white text-gray-400 transition-colors">FAQ</Link></li>
              <li><Link href="/reviews" className="hover:text-white text-gray-400 transition-colors">Reviews</Link></li>
              <li><Link href="/licenses-insurance" className="hover:text-white text-gray-400 transition-colors">Licenses & Insurance</Link></li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="text-accent-red text-lg mb-6 font-bold uppercase tracking-wider">Partners</h3>
            <ul className="space-y-3 text-sm font-semibold">
              <li><Link href="/for-architects" className="hover:text-white text-gray-400 transition-colors">For Architects</Link></li>
              <li><Link href="/for-designers" className="hover:text-white text-gray-400 transition-colors">For Interior Designers</Link></li>
              <li><Link href="/for-real-estate-agents" className="hover:text-white text-gray-400 transition-colors">For Real Estate Agents</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-semibold text-gray-500">
          <p>&copy; {new Date().getFullYear()} Red Stag Construction. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8">
          <a
            href="https://www.vaultio.co"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-2 text-center text-sm text-gray-400 transition-colors hover:text-white md:flex-row md:gap-3"
          >
            <span>Web Design and Digital Marketing by</span>
            <span className="flex items-center gap-1.5">
              <Image
                src="/images/footer/vaultio-logo.png"
                alt="Vaultio"
                width={48}
                height={48}
                className="h-11 w-11 object-contain"
              />
              <span className="font-semibold text-white">Vaultio</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};
