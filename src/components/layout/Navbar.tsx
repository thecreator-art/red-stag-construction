'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

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

type DesktopMenu = 'services' | 'areas' | null;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<DesktopMenu>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: number | undefined;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      setIsUserScrolling(true);
      setActiveDesktopMenu(null);
      if (scrollTimeout !== undefined) {
        window.clearTimeout(scrollTimeout);
      }
      scrollTimeout = window.setTimeout(() => {
        setIsUserScrolling(false);
      }, 160);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (scrollTimeout !== undefined) {
        window.clearTimeout(scrollTimeout);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMobileMenu = () => {
    setIsOpen(false);
    setMobileServicesOpen(false);
    setMobileAreasOpen(false);
  };

  const openDesktopMenu = (menu: DesktopMenu) => {
    if (isUserScrolling) {
      return;
    }

    setActiveDesktopMenu(menu);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-white/10 bg-navy-deep text-white transition-[height,box-shadow] duration-300 ${
        isScrolled ? 'shadow-[0_12px_30px_rgba(10,24,38,0.22)]' : ''
      }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between px-4 transition-[height] duration-300 ${
          isScrolled ? 'h-[60px]' : 'h-20'
        }`}
      >
        <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
          <img
            src="/images/logo/logo-light.png"
            alt="Red Stag Construction"
            className={`w-auto object-contain transition-[height] duration-300 ${
              isScrolled ? 'h-8 md:h-9' : 'h-10 md:h-12'
            }`}
          />
        </Link>

        <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold tracking-wide">
          <Link href="/" className="hover:text-accent-red transition-colors">Home</Link>

          <div
            className="relative"
            onMouseEnter={() => openDesktopMenu('services')}
            onMouseLeave={() => setActiveDesktopMenu((current) => (current === 'services' ? null : current))}
          >
            <button className="flex items-center gap-2 hover:text-accent-red transition-colors">
              Services
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`h-4 w-4 transition-transform duration-200 ${
                  activeDesktopMenu === 'services' ? 'rotate-180' : ''
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
              <div
                className={`w-[920px] rounded-sm border border-white/10 bg-navy-deep p-8 shadow-[0_18px_50px_rgba(10,24,38,0.35)] transition-all duration-200 ${
                  activeDesktopMenu === 'services'
                    ? 'visible translate-y-0 opacity-100'
                    : 'invisible -translate-y-2 opacity-0'
                }`}
              >
                <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-8">
                  <div className="grid grid-cols-3 gap-4">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={service.slug}
                        className="rounded-sm border border-white/10 bg-white/5 px-4 py-4 transition-colors hover:border-accent-red hover:bg-white/8"
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
                    <Button href="/contact" variant="primary" className="mt-8 w-full">
                      Get a Free Estimate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/our-work" className="hover:text-accent-red transition-colors">Our Work</Link>

          <div
            className="relative"
            onMouseEnter={() => openDesktopMenu('areas')}
            onMouseLeave={() => setActiveDesktopMenu((current) => (current === 'areas' ? null : current))}
          >
            <Link href="/areas-we-serve" className="flex items-center gap-2 hover:text-accent-red transition-colors">
              Areas We Serve
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`h-4 w-4 transition-transform duration-200 ${
                  activeDesktopMenu === 'areas' ? 'rotate-180' : ''
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
              </svg>
            </Link>
            <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
              <div
                className={`w-[760px] rounded-sm border border-white/10 bg-navy-deep p-8 shadow-[0_18px_50px_rgba(10,24,38,0.35)] transition-all duration-200 ${
                  activeDesktopMenu === 'areas'
                    ? 'visible translate-y-0 opacity-100'
                    : 'invisible -translate-y-2 opacity-0'
                }`}
              >
                <div className="grid grid-cols-4 gap-x-8 gap-y-4">
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={city.slug}
                      className="font-sans text-sm font-semibold text-gray-200 transition-colors hover:text-accent-red"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link href="/about" className="hover:text-accent-red transition-colors">About</Link>
          <Link href="/blog" className="hover:text-accent-red transition-colors">Blog</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex flex-col items-end mr-4">
            <span className="text-xs text-gray-400">Call Us Anytime</span>
            <a href="tel:6266522303" className="font-bold text-accent-red hover:text-white transition-colors">(626) 652-2303</a>
          </div>
          <Button href="/contact" variant="primary" className="hidden md:inline-flex">
            Get an Estimate
          </Button>
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className={`fixed inset-0 z-40 bg-navy-deep lg:hidden ${
            isScrolled ? 'pt-[60px]' : 'pt-20'
          }`}
        >
          <div className="flex h-full flex-col overflow-y-auto border-t border-white/10 px-5 py-6">
            <nav className="flex flex-col gap-2 text-lg font-semibold">
              <Link href="/" className="px-3 py-3 text-white transition-colors hover:text-accent-red" onClick={closeMobileMenu}>
                Home
              </Link>

              <div className="border-t border-white/10 pt-2">
                <button
                  className="flex w-full items-center justify-between px-3 py-3 text-left text-white transition-colors hover:text-accent-red"
                  onClick={() => setMobileServicesOpen((current) => !current)}
                  aria-expanded={mobileServicesOpen}
                >
                  <span>Services</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`h-5 w-5 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {mobileServicesOpen && (
                  <div className="space-y-2 px-3 pb-2">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={service.slug}
                        className="block rounded-sm border border-white/10 bg-white/5 px-4 py-3"
                        onClick={closeMobileMenu}
                      >
                        <span className="block font-sans text-sm font-bold text-white">{service.name}</span>
                        <span className="mt-1 block text-xs text-gray-400">{service.description}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/our-work" className="border-t border-white/10 px-3 py-3 text-white transition-colors hover:text-accent-red" onClick={closeMobileMenu}>
                Our Work
              </Link>

              <div className="border-t border-white/10 pt-2">
                <button
                  className="flex w-full items-center justify-between px-3 py-3 text-left text-white transition-colors hover:text-accent-red"
                  onClick={() => setMobileAreasOpen((current) => !current)}
                  aria-expanded={mobileAreasOpen}
                >
                  <span>Areas We Serve</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`h-5 w-5 transition-transform duration-200 ${mobileAreasOpen ? 'rotate-180' : ''}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {mobileAreasOpen && (
                  <div className="grid grid-cols-2 gap-2 px-3 pb-2">
                    {cities.map((city) => (
                      <Link
                        key={city.slug}
                        href={city.slug}
                        className="rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-100"
                        onClick={closeMobileMenu}
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about" className="border-t border-white/10 px-3 py-3 text-white transition-colors hover:text-accent-red" onClick={closeMobileMenu}>
                About
              </Link>
              <Link href="/blog" className="border-t border-white/10 px-3 py-3 text-white transition-colors hover:text-accent-red" onClick={closeMobileMenu}>
                Blog
              </Link>
            </nav>

            <div className="mt-auto border-t border-white/10 pt-6">
              <a href="tel:6266522303" className="mb-5 block text-center text-2xl font-extrabold tracking-wide text-white">
                (626) 652-2303
              </a>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center bg-accent-red px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-red-800"
                onClick={closeMobileMenu}
              >
                Get an Estimate
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
