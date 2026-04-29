import Link from 'next/link';

export const TeamSection = () => {
  const team = [
    { name: 'Elisa', title: 'CEO', bio: 'Elisa oversees the strategic direction and operations of Red Stag Construction, ensuring every project meets the highest standards of quality and client satisfaction.', photo: '/images/team/elisa.jpg', position: 'object-[70%_15%]' },
    { name: 'Israel', title: 'Principal Contractor', bio: 'Israel manages the physical execution of every Red Stag job site. He oversees all structural work, framing, and on-site crews to guarantee the build meets local codes and our standard of quality.', photo: '/images/team/israel.jpg', position: 'object-center' },
    { name: 'Anthony', title: 'COO & Prime Contractor', bio: 'Anthony drives day-to-day logistics, vendor management, and material procurement. He keeps every project phased, scheduled, and moving forward on timeline without costly delays.', photo: '/images/team/anthony.jpg', position: 'object-center' },
    { name: 'Zack', title: 'Head of Project Development', bio: 'Zack leads initial client consultations, site evaluations, and pre-construction planning. He breaks down the raw numbers, assesses structural feasibility, and guides homeowners through the permitting process.', photo: '/images/team/zack.jpg', position: 'object-center' }
  ];

  return (
    <section className="w-full border-y border-[#dcd2c6] bg-[#F5F0E8] px-6 py-16 text-[#2A2A2A] shadow-inner md:px-12 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 text-center md:mb-28">
          <h2 className="mb-6 text-3xl font-serif font-bold leading-tight md:text-5xl lg:text-6xl">The Team Behind Your Project</h2>
          <p className="mx-auto max-w-2xl border-l-4 border-accent-red py-2 pl-4 font-serif text-lg text-gray-600 md:pl-6 md:text-xl">
            15 years. 100+ projects. Every one permitted and delivered on time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {team.map((member, i) => (
            <div key={i} className="group mx-auto flex w-full max-w-sm cursor-pointer flex-col overflow-hidden rounded-sm bg-warm-white pb-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:max-w-none md:pb-8">
              <div className="relative mb-6 w-full overflow-hidden border-b-[6px] border-accent-red bg-gray-200 aspect-[5/4] sm:aspect-[4/5] md:mb-8 md:aspect-[3/4]">
                <div className="pointer-events-none absolute inset-0 z-10 bg-accent-red/20 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100"></div>
                <img src={member.photo} alt={member.name} className={`relative z-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0 grayscale ${member.position}`} />
              </div>
              <h3 className="mb-2 px-6 text-xl font-bold uppercase tracking-[0.18em] text-[#111] transition-colors duration-300 group-hover:text-accent-red md:px-8 md:text-2xl md:tracking-widest">{member.name}</h3>
              <p className="mb-4 px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-red md:mb-6 md:px-8 md:text-xs md:tracking-[0.2em]">{member.title}</p>
              <p className="px-6 font-serif leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-[#2A2A2A] md:px-8">{member.bio}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center md:mt-20">
          <Link href="/contact" className="inline-block bg-accent-red px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#B31217] hover:shadow-2xl hover:-translate-y-1 md:px-12 md:py-5 md:text-base md:tracking-[0.2em]">
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};
