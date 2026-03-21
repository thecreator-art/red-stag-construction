'use client';

export const ServiceAreaMap = () => {
  return (
    <div className="relative z-0 h-[500px] w-full overflow-hidden rounded-sm border-4 border-white shadow-2xl md:h-[600px]">
      <iframe
        src="https://maps.google.com/maps?q=Los+Angeles,+CA&t=&z=10&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Red Stag Construction Service Area — Greater Los Angeles"
      />
    </div>
  );
};
