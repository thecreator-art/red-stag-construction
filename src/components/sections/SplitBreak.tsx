export const SplitBreak = () => {
  return (
    <section className="relative z-10 flex h-[160px] w-full items-center overflow-hidden bg-[#152D45] px-6 text-center shadow-2xl lg:h-[240px]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/blueprint-drawing-animation.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#152D45]/78" />
      <div className="relative mx-auto flex max-w-[22rem] flex-col items-center justify-center lg:max-w-5xl">
        <h2 className="mb-4 text-[2.4rem] font-serif font-bold leading-[0.95] text-white drop-shadow-lg sm:text-5xl lg:mb-8 lg:text-5xl">
          Designed here. Built right. Delivered on time.
        </h2>
        <div className="mb-3 h-[1px] w-24 bg-white/20 lg:mb-6 lg:w-32"></div>
        <p className="text-[10px] font-sans uppercase tracking-[0.22em] text-gray-400 sm:text-xs lg:tracking-widest">
          LICENSED GENERAL CONTRACTOR · LOS ANGELES · EST. 2011 · LICENSE #964664
        </p>
      </div>
    </section>
  );
};
