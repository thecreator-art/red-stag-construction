export const SplitBreak = () => {
  return (
    <section className="relative z-10 w-full overflow-hidden bg-[#152D45] px-6 py-28 text-center shadow-2xl lg:py-40">
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
      <div className="relative mx-auto flex max-w-5xl flex-col items-center">
        <h2 className="text-4xl lg:text-6xl font-serif text-white font-bold leading-tight drop-shadow-lg mb-8">
          Designed here. Built right. Delivered on time.
        </h2>
        <div className="w-32 h-[1px] bg-white/20 mb-6"></div>
        <p className="text-xs tracking-widest text-gray-400 uppercase font-sans">
          LICENSED GENERAL CONTRACTOR · LOS ANGELES · EST. 2011
        </p>
      </div>
    </section>
  );
};
