export const TeamSection = () => {
  const team = [
    { name: 'Israel Aquino', title: 'Founder & CEO', bio: 'With over twenty years of high-end structural experience, Israel directs the unified vision and operational execution of every Red Stag build.', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800' },
    { name: 'Anthony Torsarkissian', title: 'Chief Architect', bio: 'Licensed architectural engineer mapping out structural feasibility and breathtaking aesthetic continuity across all residential assets.', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800' },
    { name: 'Zack Ward', title: 'Master Form Setter', bio: 'The foundation of Red Stag. Zack ensures structural perimeters and concrete executions exceed local engineering code natively.', photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=800' }
  ];

  return (
    <section className="w-full bg-[#F5F0E8] py-24 md:py-32 px-6 md:px-12 text-[#2A2A2A] border-y border-[#dcd2c6] shadow-inner">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-8">The Team Behind Your Project</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-serif text-xl border-l-4 border-primary-red pl-6 py-2">Uncompromising standards require uncompromising leadership.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {team.map((member, i) => (
            <div key={i} className="flex flex-col group bg-white shadow-xl hover:shadow-2xl transition-shadow pb-8 rounded-sm overflow-hidden">
              <div className="w-full aspect-[3/4] overflow-hidden mb-8 bg-gray-200 border-b-[6px] border-primary-red relative">
                <div className="absolute inset-0 bg-primary-red/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500 mix-blend-multiply"></div>
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter grayscale group-hover:grayscale-0 relative z-0" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-widest px-8 mb-2 text-[#111]">{member.name}</h3>
              <p className="text-primary-red font-bold text-xs tracking-[0.2em] uppercase mb-6 px-8">{member.title}</p>
              <p className="text-gray-600 leading-relaxed font-serif px-8">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
