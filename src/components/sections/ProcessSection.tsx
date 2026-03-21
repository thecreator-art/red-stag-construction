'use client';
import { motion } from 'framer-motion';

export const ProcessSection = () => {
  const steps = [
    { num: '01', title: 'Consult', desc: 'We walk the property, analyze the structural realities, and discuss your exact vision and budget boundaries.' },
    { num: '02', title: 'Design', desc: 'Our architectural team drafts the blueprints, curates materials, and finalizes the engineering specifications.' },
    { num: '03', title: 'Permit', desc: 'We handle all city submissions, HOA approvals, and historic preservation board clearances.' },
    { num: '04', title: 'Build', desc: 'Master tradesmen execute the plans under strict project management with zero subcontractor delays.' }
  ];

  return (
    <section className="w-full bg-warm-grey py-20 md:py-32 px-6 md:px-12 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-32">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#111] leading-tight mb-8">Our Process</h2>
          <div className="w-24 h-1.5 bg-accent-red mx-auto shadow-md"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 relative">
          {/* Internal Connective Tracking Line (Lg Bounds) */}
          <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-gray-200 z-0 border-t border-dashed border-gray-300"></div>

          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative z-10 flex flex-col items-center md:items-start lg:items-center text-center md:text-left lg:text-center group"
            >
              <div className="mb-6 inline-block border-b-2 border-accent-red pb-2 leading-none">
                <span className="block text-6xl md:text-7xl font-serif font-extrabold text-accent-red leading-none">{step.num}</span>
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-widest text-[#111] mb-5">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed max-w-sm font-serif">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
