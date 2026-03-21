'use client';

export const ServiceAreaMap = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px] overflow-hidden rounded-sm shadow-2xl border-4 border-white">
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
