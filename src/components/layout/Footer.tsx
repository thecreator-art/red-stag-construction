import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const Footer = () => {
  return (
    <footer className="bg-navy-deep text-white pt-20 pb-10 mt-auto border-t-4 border-accent-red">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <Link href="/" className="block mb-6">
              <img 
                src="/images/logo/logo-light.png" 
                alt="Red Stag Construction" 
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 mb-6 font-semibold">
              Built on Craft. Driven by Accountability.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>License #964664</p>
              <p>Est. 2011</p>
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

        {/* Map Embed */}
        <div className="w-full h-64 mb-16 rounded-sm overflow-hidden border border-gray-800">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.469735518173!2d-118.34966602353112!3d34.134335514757134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bdcf70bb0eb9%3A0xc3f9828d1c1eb582!2s3211%20Cahuenga%20Blvd%20W%20%23207%2C%20Los%20Angeles%2C%20CA%2090068!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale contrast-125"
          ></iframe>
        </div>

        {/* Copyright & Legal */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-semibold text-gray-500">
          <p>&copy; {new Date().getFullYear()} Red Stag Construction. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
