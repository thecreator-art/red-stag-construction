'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-primary-dark text-white border-b border-gray-800">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-serif font-bold text-2xl tracking-widest text-white uppercase">
            Red Stag
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold tracking-wide">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <div className="group relative">
            <button className="flex items-center hover:text-gold transition-colors">Services</button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:block bg-white text-primary-dark p-6 shadow-xl w-[800px] border-t-2 border-primary-red">
               <div className="grid grid-cols-3 gap-6">
                 <div>
                   <Link href="/kitchen-remodel-los-angeles" className="block font-bold hover:text-primary-red">Kitchen Remodel</Link>
                   <p className="text-xs text-body-grey mt-1">Full gut remodels and custom cabinetry.</p>
                 </div>
                 <div>
                   <Link href="/bathroom-remodel-los-angeles" className="block font-bold hover:text-primary-red">Bathroom Remodel</Link>
                   <p className="text-xs text-body-grey mt-1">Walk-in showers, tile, & modern fixtures.</p>
                 </div>
                 <div>
                   <Link href="/adu-contractor-los-angeles" className="block font-bold hover:text-primary-red">ADU Contractor</Link>
                   <p className="text-xs text-body-grey mt-1">Design, permits, & full construction.</p>
                 </div>
               </div>
               <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                 <Link href="/general-contractor-los-angeles" className="text-primary-red text-sm font-bold hover:underline">View All Services →</Link>
               </div>
            </div>
          </div>
          <Link href="/our-work" className="hover:text-gold transition-colors">Our Work</Link>
          <div className="group relative">
            <Link href="/areas-we-serve" className="flex items-center hover:text-gold transition-colors">Areas We Serve</Link>
            <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:block bg-white text-primary-dark p-4 shadow-xl w-[250px] border-t-2 border-primary-red">
               <ul className="space-y-3">
                 <li><Link href="/general-contractor-beverly-hills" className="hover:text-primary-red font-semibold block">Beverly Hills</Link></li>
                 <li><Link href="/general-contractor-bel-air" className="hover:text-primary-red font-semibold block">Bel Air</Link></li>
                 <li><Link href="/general-contractor-brentwood-la" className="hover:text-primary-red font-semibold block">Brentwood</Link></li>
                 <li><Link href="/areas-we-serve" className="text-sm font-bold text-primary-red mt-4 block hover:underline">View All Areas →</Link></li>
               </ul>
            </div>
          </div>
          <Link href="/about" className="hover:text-gold transition-colors">About</Link>
          <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex flex-col items-end mr-4">
            <span className="text-xs text-gray-400">Call Us Anytime</span>
            <a href="tel:6266522303" className="font-bold text-gold hover:text-white transition-colors">(626) 652-2303</a>
          </div>
          <Button href="/contact" variant="primary" className="hidden md:inline-flex">
            Get an Estimate
          </Button>
          <button 
            className="lg:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-primary-dark h-[calc(100vh-80px)] overflow-y-auto px-4 py-6 border-t border-gray-800 flex flex-col">
          <nav className="flex flex-col space-y-6 text-lg font-semibold flex-1">
            <Link href="/" className="text-white hover:text-gold px-4 py-2" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/general-contractor-los-angeles" className="text-white hover:text-gold px-4 py-2" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="/our-work" className="text-white hover:text-gold px-4 py-2" onClick={() => setIsOpen(false)}>Our Work</Link>
            <Link href="/areas-we-serve" className="text-white hover:text-gold px-4 py-2" onClick={() => setIsOpen(false)}>Areas We Serve</Link>
            <Link href="/about" className="text-white hover:text-gold px-4 py-2" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/blog" className="text-white hover:text-gold px-4 py-2" onClick={() => setIsOpen(false)}>Blog</Link>
          </nav>
          <div className="mt-8 pt-6 border-t border-gray-800 sticky bottom-0 bg-primary-dark pb-8">
            <a href="tel:6266522303" className="flex items-center justify-center space-x-2 text-xl font-bold text-gold mb-6">
              <span>(626) 652-2303</span>
            </a>
            <Button href="/contact" variant="primary" fullWidth onClick={() => setIsOpen(false)}>
              Get an Estimate
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
