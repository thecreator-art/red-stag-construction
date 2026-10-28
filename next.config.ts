import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/services/home-remodeling', destination: '/general-contractor-los-angeles', permanent: true },
      { source: '/services/kitchen-remodeling', destination: '/kitchen-remodel-los-angeles', permanent: true },
      { source: '/services/adu-construction', destination: '/adu-contractor-los-angeles', permanent: true },
      { source: '/services/bathroom-remodeling', destination: '/bathroom-remodel-los-angeles', permanent: true },
      { source: '/services/hardscaping', destination: '/hardscape-contractor-los-angeles', permanent: true },
    ];
  },
};

export default nextConfig;
