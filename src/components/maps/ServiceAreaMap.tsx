'use client';

const locations = [
  { city: 'Beverly Hills', lat: 34.0736, lng: -118.4004 },
  { city: 'Bel Air', lat: 34.0833, lng: -118.4478 },
  { city: 'Hidden Hills', lat: 34.1675, lng: -118.6609 },
  { city: 'Pacific Palisades', lat: 34.0483, lng: -118.5265 },
  { city: 'Malibu', lat: 34.0259, lng: -118.7798 },
  { city: 'Brentwood', lat: 34.0521, lng: -118.4735 },
  { city: 'Manhattan Beach', lat: 33.8847, lng: -118.4109 },
  { city: 'Santa Monica', lat: 34.0195, lng: -118.4912 },
  { city: 'West Hollywood', lat: 34.0900, lng: -118.3617 },
  { city: 'Silver Lake', lat: 34.0869, lng: -118.2702 },
  { city: 'Studio City', lat: 34.1484, lng: -118.3965 },
  { city: 'Sherman Oaks', lat: 34.1490, lng: -118.4514 },
  { city: 'Encino', lat: 34.1517, lng: -118.5214 },
  { city: 'Calabasas', lat: 34.1367, lng: -118.6615 },
  { city: 'Tarzana', lat: 34.1685, lng: -118.5360 },
  { city: 'Woodland Hills', lat: 34.1683, lng: -118.6106 },
  { city: 'Burbank', lat: 34.1808, lng: -118.3090 },
  { city: 'Granada Hills', lat: 34.2794, lng: -118.5022 },
  { city: 'Northridge', lat: 34.2381, lng: -118.5301 },
  { city: 'San Fernando', lat: 34.2819, lng: -118.4390 }
];

export const ServiceAreaMap = ({ className = '' }: { className?: string }) => {
  // Bounding box for greater LA including Malibu and SFV
  const minLng = -118.85;
  const maxLng = -118.15;
  const minLat = 33.85;
  const maxLat = 34.35;

  const w = 800;
  const h = 600;

  // Linear projection formulas mapping geo blocks to local SVG bounds
  const getX = (lng: number) => ((lng - minLng) / (maxLng - minLng)) * w;
  const getY = (lat: number) => ((maxLat - lat) / (maxLat - minLat)) * h;

  return (
    <div className={`relative w-full h-full bg-[#111111] overflow-hidden ${className}`}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full text-gray-800" preserveAspectRatio="xMidYMid slice">
        {/* LA Coastline Stylized Geometry */}
        <path d="M 0,600 L 800,600 L 800,450 Q 600,420 500,440 T 100,520 L 0,550 Z" fill="#0a0a0a" />
        
        {/* Mountain Range Divider (Santa Monicas) */}
        <path d="M -50,380 Q 200,320 400,350 T 850,320" stroke="#1f1f1f" strokeWidth="60" fill="none" strokeLinecap="round" opacity="0.5" />
        
        {/* Technical Grid Overlay */}
        {[...Array(11)].map((_, i) => (
          <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2={h} stroke="#1a1a1a" strokeWidth="1" />
        ))}
        {[...Array(9)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 75} x2={w} y2={i * 75} stroke="#1a1a1a" strokeWidth="1" />
        ))}

        {locations.map((loc, idx) => {
          const x = getX(loc.lng);
          const y = getY(loc.lat);
          return (
            <g key={idx} className="group cursor-pointer">
              {/* Outer pulsing ping zone */}
              <circle cx={x} cy={y} r="14" fill="none" stroke="#B31217" strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping origin-center" />
              
              {/* Primary Dot Geometry */}
              <circle cx={x} cy={y} r="6" fill="#B31217" className="transition-transform duration-300 group-hover:scale-125" />
              <circle cx={x} cy={y} r="2" fill="#ffffff" />
              
              {/* Pure CSS Hover Label Card */}
              <g className="opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none drop-shadow-xl" transform={`translate(${x}, ${y - 28})`}>
                <rect x="-60" y="-18" width="120" height="26" fill="#ffffff" rx="2" />
                <polygon points="-6,8 6,8 0,14" fill="#ffffff" />
                <rect x="-60" y="-18" width="4" height="26" fill="#B31217" rx="1" />
                <text x="0" y="-1" textAnchor="middle" fill="#000000" fontSize="11" fontWeight="800" letterSpacing="0.05em" fontFamily="sans-serif" className="uppercase">
                  {loc.city}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
      
      {/* Legend Map Overlay */}
      <div className="absolute bottom-6 right-6 bg-[#1A1A1A]/95 p-4 border-l-4 border-accent-red shadow-2xl backdrop-blur-sm pointer-events-none">
        <h4 className="text-text-dark font-bold tracking-widest uppercase text-sm mb-1">Service Area</h4>
        <p className="text-gray-400 text-xs font-mono">Greater Los Angeles</p>
      </div>
    </div>
  );
};
