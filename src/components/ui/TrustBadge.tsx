export const TrustBadge = ({ className = "" }: { className?: string }) => {
  const items = [
    {
      text: 'License 964664',
      icon: (
        <svg className="mr-2 h-5 w-5 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      text: 'Est. 2011',
      icon: (
        <svg className="mr-2 h-5 w-5 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      text: 'Los Angeles Based',
      icon: (
        <svg className="mr-2 h-5 w-5 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      text: '100+ Projects',
      icon: (
        <svg className="mr-2 h-5 w-5 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      text: '5-Star Rated · 47+ Reviews',
      icon: (
        <svg className="mr-2 h-5 w-5 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`border-y border-[#e6decf] bg-[#F5F0E8] py-5 shadow-sm ${className}`.trim()}>
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-6 px-4 text-center text-[#2A2A2A] md:justify-between">
        {items.map((item, index) => (
          <div key={item.text} className="flex items-center whitespace-nowrap text-[10px] font-extrabold uppercase tracking-widest opacity-90 md:text-sm">
            {item.icon}
            {item.text}
            {index < items.length - 1 ? <span className="ml-6 hidden h-1.5 w-1.5 rounded-full bg-accent-red md:block" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};
