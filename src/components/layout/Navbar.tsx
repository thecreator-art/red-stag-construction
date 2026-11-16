import Link from 'next/link';
import { Button } from '../ui/Button';
import { SearchBox } from '../search/SearchBox';

// Static markup. Open/closed and scrolled states are data attributes toggled
// by src/scripts/site.ts ([data-nav]); Tailwind group-data variants do the rest.

const services = [
  {
    name: 'Kitchen Remodel',
    slug: '/kitchen-remodel-los-angeles',
    description: 'Full gut remodels, layout changes, cabinetry, and finish work.'
  },
  {
    name: 'Bathroom Remodel',
    slug: '/bathroom-remodel-los-angeles',
    description: 'Walk-in showers, tile, plumbing updates, and fixture installs.'
  },
  {
    name: 'ADU Construction',
    slug: '/adu-contractor-los-angeles',
    description: 'Detached ADUs, garage conversions, plans, permits, and build-out.'
  },
  {
    name: 'Custom Home Build',
    slug: '/custom-home-builder-los-angeles',
    description: 'Ground-up homes for hillside, estate, and infill properties.'
  },
  {
    name: 'Home Addition',
    slug: '/home-addition-contractor-los-angeles',
    description: 'Room additions, second stories, and square-footage expansions.'
  },
  {
    name: 'General Contracting',
    slug: '/general-contractor-los-angeles',
    description: 'Whole-home scopes managed under one licensed design-build team.'
  },
  {
    name: 'Construction Management',
    slug: '/construction-management-los-angeles',
    description: 'Budgets, bids, permits, schedule, and daily site supervision.'
  },
  {
    name: 'Development Services',
    slug: '/real-estate-development-los-angeles',
    description: 'Feasibility, entitlements, design team, and ground-up delivery.'
  },
  {
    name: 'Hardscaping',
    slug: '/hardscape-contractor-los-angeles',
    description: 'Driveways, retaining walls, patios, pool decks, and concrete.'
  },
  {
    name: 'Fencing and Gates',
    slug: '/fence-company-los-angeles',
    description: 'Privacy fencing, iron gates, motors, and access control systems.'
  },
  {
    name: 'Window Replacement',
    slug: '/window-replacement-los-angeles',
    description: 'Title 24-compliant replacement windows with clean installation.'
  }
];

const cities = [
  { name: 'Beverly Hills', slug: '/general-contractor-beverly-hills' },
  { name: 'Bel Air', slug: '/general-contractor-bel-air' },
  { name: 'Hidden Hills', slug: '/general-contractor-hidden-hills' },
  { name: 'Pacific Palisades', slug: '/general-contractor-pacific-palisades' },
  { name: 'Malibu', slug: '/general-contractor-malibu' },
  { name: 'Brentwood', slug: '/general-contractor-brentwood-la' },
  { name: 'Manhattan Beach', slug: '/general-contractor-manhattan-beach' },
  { name: 'Santa Monica', slug: '/general-contractor-santa-monica' },
  { name: 'West Hollywood', slug: '/general-contractor-west-hollywood' },
  { name: 'Silver Lake', slug: '/general-contractor-silver-lake' },
  { name: 'Studio City', slug: '/general-contractor-studio-city' },
  { name: 'Sherman Oaks', slug: '/general-contractor-sherman-oaks' },
  { name: 'Encino', slug: '/general-contractor-encino' },
  { name: 'Calabasas', slug: '/general-contractor-calabasas' },
  { name: 'Tarzana', slug: '/general-contractor-tarzana' },
  { name: 'Woodland Hills', slug: '/general-contractor-woodland-hills' },
  { name: 'Burbank', slug: '/general-contractor-burbank' },
  { name: 'Granada Hills', slug: '/general-contractor-granada-hills' },
  { name: 'Northridge', slug: '/general-contractor-northridge' },
  { name: 'San Fernando', slug: '/general-contractor-san-fernando' }
];

export const Navbar = () => {
  return (
    <div data-nav className="group/nav sticky top-0 z-50 w-full">
      <header
        className="w-full border-b border-white/10 bg-navy-deep text-white transition-[height,box-shadow] duration-300 group-data-[scrolled]/nav:shadow-[0_12px_30px_rgba(10,24,38,0.22)]"
      >
        <div
          className="container mx-auto flex h-24 items-center justify-between px-4 transition-[height] duration-300 md:h-28 group-data-[scrolled]/nav:h-[72px]"
        >
          <Link href="/" className="flex shrink-0 items-center">
            <img
              src="/images/logo/logo-primary.png"
              alt="Red Stag Construction Corporation"
              width={290}
              height={128}
              sizes="(max-width: 767px) 190px, 220px"
              data-priority="eager"
              className="h-20 w-auto object-contain transition-[height] duration-300 md:h-24 group-data-[scrolled]/nav:h-14 md:group-data-[scrolled]/nav:h-16"
            />
          </Link>

          <nav className="hidden xl:flex items-center space-x-6 whitespace-nowrap text-sm font-semibold tracking-wide 2xl:space-x-8">
            <Link href="/" className="hover:text-accent-red transition-colors">Home</Link>

            <div className="group/menu relative" data-menu>
              <button
                type="button"
                data-menu-toggle
                className="flex min-h-11 items-center gap-2 transition-colors hover:text-accent-red"
                aria-expanded="false"
              >
                Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-data-[open]/menu:rotate-180"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div
                className="absolute left-0 top-full pt-4 pointer-events-none group-data-[open]/menu:pointer-events-auto"
              >
                <div
                  className="w-[920px] max-w-[calc(100vw-2rem)] whitespace-normal rounded-sm border border-white/10 bg-navy-deep p-8 shadow-[0_18px_50px_rgba(10,24,38,0.35)] transition-all duration-200 invisible -translate-y-2 opacity-0 pointer-events-none group-data-[open]/menu:visible group-data-[open]/menu:translate-y-0 group-data-[open]/menu:opacity-100 group-data-[open]/menu:pointer-events-auto"
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-8">
                    <div className="grid grid-cols-3 gap-4">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={service.slug}
                          className="block rounded-sm border border-white/10 bg-white/5 px-4 py-4 transition-all duration-200 hover:border-accent-red hover:bg-white/8"
                        >
                          <span className="block font-sans text-sm font-bold text-white">{service.name}</span>
                          <span className="mt-1 block truncate text-xs text-gray-400">{service.description}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="flex flex-col justify-between rounded-sm border border-white/10 bg-white/6 p-8">
                      <div>
                        <h3 className="font-serif text-3xl font-bold text-white">Start Your Project</h3>
                        <p className="mt-3 text-sm text-gray-400">Free consultations. No obligation.</p>
                      </div>
                      <Button href="/contact" variant="primary" className="cta-sm mt-8 w-full">
                        Get a Free Estimate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/our-work" className="hover:text-accent-red transition-colors">Our Work</Link>

            <div className="group/menu relative" data-menu>
              <button
                type="button"
                data-menu-toggle
                className="flex min-h-11 items-center gap-2 transition-colors hover:text-accent-red"
                aria-expanded="false"
              >
                Areas We Serve
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-data-[open]/menu:rotate-180"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div
                className="absolute left-1/2 top-full -translate-x-1/2 pt-4 pointer-events-none group-data-[open]/menu:pointer-events-auto"
              >
                <div
                  className="w-[760px] whitespace-normal rounded-sm border border-white/10 bg-navy-deep p-8 shadow-[0_18px_50px_rgba(10,24,38,0.35)] transition-all duration-200 invisible -translate-y-2 opacity-0 pointer-events-none group-data-[open]/menu:visible group-data-[open]/menu:translate-y-0 group-data-[open]/menu:opacity-100 group-data-[open]/menu:pointer-events-auto"
                >
                  <div className="grid grid-cols-4 gap-x-8 gap-y-4">
                    {cities.map((city) => (
                      <Link
                        key={city.slug}
                        href={city.slug}
                        className="block rounded-sm px-3 py-2 font-sans text-sm font-semibold text-gray-200 transition-all duration-200 hover:bg-white/8 hover:text-accent-red"
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/about" className="hover:text-accent-red transition-colors">About</Link>
            <Link href="/faq" className="hover:text-accent-red transition-colors">FAQ</Link>
            <Link href="/pricing" className="hover:text-accent-red transition-colors">Pricing</Link>
            <Link href="/blog" className="hover:text-accent-red transition-colors">Blog</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <SearchBox variant="header" className="hidden xl:block" />
            <div className="hidden xl:flex flex-col items-end mr-4 whitespace-nowrap">
              <span className="text-xs text-gray-400">Call Us Anytime</span>
              <a href="tel:3239224235" className="font-bold text-accent-red hover:text-white transition-colors">(323) 922-4235</a>
            </div>
            <Button href="/contact" variant="primary" className="cta-sm hidden md:inline-flex">
              Get an Estimate
            </Button>
            <button
              type="button"
              data-nav-toggle
              className="min-h-11 min-w-11 p-2 text-white xl:hidden"
              aria-label="Open navigation menu"
              aria-expanded="false"
              aria-controls="mobile-menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="h-8 w-8">
                <path className="group-data-[menu-open]/nav:hidden" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                <path className="hidden group-data-[menu-open]/nav:block" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

        <div
          id="mobile-menu"
          hidden
          className="fixed inset-0 z-40 bg-navy-deep pt-24 xl:hidden group-data-[scrolled]/nav:pt-[72px]"
        >
          <div className="flex h-full flex-col overflow-y-auto border-t border-white/10 px-5 py-6">
            <div className="mb-4">
              <SearchBox variant="inline" placeholder="Search the site…" />
            </div>
            <nav className="flex flex-col gap-2 text-lg font-semibold">
              <Link href="/" className="block min-h-11 px-3 py-3 text-white transition-colors hover:text-accent-red">
                Home
              </Link>

              <details name="mobile-nav" className="group/sub border-t border-white/10 pt-2">
                <summary className="flex min-h-11 w-full cursor-pointer list-none items-center justify-between px-3 py-3 text-left text-white transition-colors hover:text-accent-red [&::-webkit-details-marker]:hidden">
                  <span>Services</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="h-5 w-5 transition-transform duration-200 group-open/sub:rotate-180">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                  <div className="space-y-2 px-3 pb-2">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={service.slug}
                        className="block min-h-11 rounded-sm border border-white/10 bg-white/5 px-4 py-3 transition-all duration-200 hover:border-accent-red hover:bg-white/8"
                       
                      >
                        <span className="block font-sans text-sm font-bold text-white">{service.name}</span>
                        <span className="mt-1 block text-xs text-gray-400">{service.description}</span>
                      </Link>
                    ))}
                  </div>
              </details>

              <Link href="/our-work" className="block min-h-11 border-t border-white/10 px-3 py-3 text-white transition-colors hover:text-accent-red">
                Our Work
              </Link>

              <details name="mobile-nav" className="group/sub border-t border-white/10 pt-2">
                <summary className="flex min-h-11 w-full cursor-pointer list-none items-center justify-between px-3 py-3 text-left text-white transition-colors hover:text-accent-red [&::-webkit-details-marker]:hidden">
                  <span>Areas We Serve</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="h-5 w-5 transition-transform duration-200 group-open/sub:rotate-180">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                  <div className="grid grid-cols-2 gap-2 px-3 pb-2">
                    {cities.map((city) => (
                      <Link
                        key={city.slug}
                        href={city.slug}
                        className="block min-h-11 rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-100 transition-all duration-200 hover:border-accent-red hover:bg-white/8"
                       
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
              </details>

              <Link href="/about" className="block min-h-11 border-t border-white/10 px-3 py-3 text-white transition-colors hover:text-accent-red">
                About
              </Link>
              <Link href="/faq" className="block min-h-11 border-t border-white/10 px-3 py-3 text-white transition-colors hover:text-accent-red">
                FAQ
              </Link>
              <Link href="/pricing" className="block min-h-11 border-t border-white/10 px-3 py-3 text-white transition-colors hover:text-accent-red">
                Pricing
              </Link>
              <Link href="/blog" className="block min-h-11 border-t border-white/10 px-3 py-3 text-white transition-colors hover:text-accent-red">
                Blog
              </Link>
            </nav>

            <div className="mt-auto border-t border-white/10 pt-6">
              <a href="tel:3239224235" className="mb-5 block text-center text-2xl font-extrabold tracking-wide text-white">
                (323) 922-4235
              </a>
              <Link
                href="/contact"
                className="cta cta-block"
               
              >
                Get an Estimate
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
};
