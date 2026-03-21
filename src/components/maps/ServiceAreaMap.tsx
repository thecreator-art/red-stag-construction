'use client';

import Link from 'next/link';

const locations = [
  { city: 'Beverly Hills', slug: '/general-contractor-beverly-hills', lat: 34.0736, lng: -118.4004 },
  { city: 'Bel Air', slug: '/general-contractor-bel-air', lat: 34.0833, lng: -118.4478 },
  { city: 'Hidden Hills', slug: '/general-contractor-hidden-hills', lat: 34.1675, lng: -118.6609 },
  { city: 'Pacific Palisades', slug: '/general-contractor-pacific-palisades', lat: 34.0483, lng: -118.5265 },
  { city: 'Malibu', slug: '/general-contractor-malibu', lat: 34.0259, lng: -118.7798 },
  { city: 'Brentwood', slug: '/general-contractor-brentwood-la', lat: 34.0521, lng: -118.4735 },
  { city: 'Manhattan Beach', slug: '/general-contractor-manhattan-beach', lat: 33.8847, lng: -118.4109 },
  { city: 'Santa Monica', slug: '/general-contractor-santa-monica', lat: 34.0195, lng: -118.4912 },
  { city: 'West Hollywood', slug: '/general-contractor-west-hollywood', lat: 34.09, lng: -118.3617 },
  { city: 'Silver Lake', slug: '/general-contractor-silver-lake', lat: 34.0869, lng: -118.2702 },
  { city: 'Studio City', slug: '/general-contractor-studio-city', lat: 34.1484, lng: -118.3965 },
  { city: 'Sherman Oaks', slug: '/general-contractor-sherman-oaks', lat: 34.149, lng: -118.4514 },
  { city: 'Encino', slug: '/general-contractor-encino', lat: 34.1517, lng: -118.5214 },
  { city: 'Calabasas', slug: '/general-contractor-calabasas', lat: 34.1367, lng: -118.6615 },
  { city: 'Tarzana', slug: '/general-contractor-tarzana', lat: 34.1685, lng: -118.536 },
  { city: 'Woodland Hills', slug: '/general-contractor-woodland-hills', lat: 34.1683, lng: -118.6106 },
  { city: 'Burbank', slug: '/general-contractor-burbank', lat: 34.1808, lng: -118.309 },
  { city: 'Granada Hills', slug: '/general-contractor-granada-hills', lat: 34.2794, lng: -118.5022 },
  { city: 'Northridge', slug: '/general-contractor-northridge', lat: 34.2381, lng: -118.5301 },
  { city: 'San Fernando', slug: '/general-contractor-san-fernando', lat: 34.2819, lng: -118.439 }
];

export const ServiceAreaMap = ({ className = '' }: { className?: string }) => {
  const minLng = -118.85;
  const maxLng = -118.15;
  const minLat = 33.85;
  const maxLat = 34.35;
  const getLeft = (lng: number) => `${((lng - minLng) / (maxLng - minLng)) * 100}%`;
  const getTop = (lat: number) => `${((maxLat - lat) / (maxLat - minLat)) * 100}%`;

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-sm border border-[#c8d2dc] bg-[#dfe5eb] ${className}`}>
      <svg
        viewBox="0 0 800 600"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5f1ea" />
            <stop offset="100%" stopColor="#e8e4de" />
          </linearGradient>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8fb2c9" />
            <stop offset="100%" stopColor="#6e95af" />
          </linearGradient>
        </defs>

        <rect width="800" height="600" fill="url(#waterGradient)" />
        <path
          d="M 0 520 C 110 500 150 470 230 420 C 300 375 360 335 440 310 C 520 285 615 265 800 245 L 800 0 L 0 0 Z"
          fill="url(#landGradient)"
        />
        <path
          d="M 40 475 C 180 455 275 420 345 372 C 420 320 505 270 800 230"
          fill="none"
          stroke="#a8b8c7"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M 125 360 C 255 335 330 310 405 260 C 455 226 520 205 610 190"
          fill="none"
          stroke="#152D45"
          strokeWidth="5"
          strokeDasharray="10 12"
          opacity="0.3"
        />
        <path
          d="M 195 205 C 255 170 330 155 435 170 C 520 184 605 178 700 146"
          fill="none"
          stroke="#6f7d87"
          strokeWidth="18"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M 120 275 C 220 250 320 248 405 262 C 475 272 560 268 655 242"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.55"
        />
        <text x="90" y="448" fill="#152D45" fontSize="20" fontWeight="700" letterSpacing="0.08em">
          PACIFIC OCEAN
        </text>
        <text x="238" y="185" fill="#152D45" fontSize="18" fontWeight="700" letterSpacing="0.08em" opacity="0.55">
          SANTA MONICA MOUNTAINS
        </text>
      </svg>

      <div className="absolute inset-0">
        {locations.map((location) => (
          <Link
            key={location.slug}
            href={location.slug}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: getLeft(location.lng), top: getTop(location.lat) }}
            aria-label={`View ${location.city} service area page`}
          >
            <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-red/35 bg-accent-red/15 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <span className="relative block h-4 w-4 rounded-full border-2 border-white bg-accent-red shadow-[0_0_0_3px_rgba(21,45,69,0.18)] transition-transform duration-200 group-hover:scale-110" />
            <span className="pointer-events-none absolute left-1/2 top-[-0.9rem] hidden -translate-x-1/2 whitespace-nowrap rounded-sm bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#152D45] shadow-lg group-hover:block">
              {location.city}
            </span>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-6 right-6 border-l-4 border-accent-red bg-white/90 px-4 py-3 shadow-xl backdrop-blur-sm">
        <h4 className="mb-1 text-sm font-bold uppercase tracking-[0.18em] text-[#152D45]">Service Area</h4>
        <p className="text-xs font-medium tracking-[0.08em] text-[#3D3D3D]">Greater Los Angeles</p>
      </div>
    </div>
  );
};
