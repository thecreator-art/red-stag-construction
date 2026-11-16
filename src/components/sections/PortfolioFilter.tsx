import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';

// Static markup: every project is rendered. Filtering is done by
// src/scripts/site.ts ([data-portfolio]) by hiding cards.

export interface PortfolioProject {
  id: string;
  title: string;
  serviceType: string;
  city: string;
  beforeImage: string;
  afterImage: string;
}

export interface PortfolioFilterProps {
  projects: PortfolioProject[];
  className?: string;
}

const IDLE = 'border-gray-700 text-gray-300 hover:border-white hover:text-white bg-navy-deep/50';
const BASE = 'px-5 py-2 text-xs font-bold tracking-wider uppercase border transition-all duration-300';

export const PortfolioFilter = ({ projects, className = '' }: PortfolioFilterProps) => {
  const services = Array.from(new Set(projects.map((p) => p.serviceType)));
  const cities = Array.from(new Set(projects.map((p) => p.city)));

  const group = (kind: 'service' | 'city', allLabel: string, values: string[], active: string) => (
    <div className="flex flex-wrap gap-2" data-filter-group={kind} data-active-class={active} data-idle-class={IDLE}>
      <button type="button" data-filter-value="" aria-pressed="true" className={`${BASE} ${active}`}>
        {allLabel}
      </button>
      {values.map((value) => (
        <button key={value} type="button" data-filter-value={value} aria-pressed="false" className={`${BASE} ${IDLE}`}>
          {value}
        </button>
      ))}
    </div>
  );

  return (
    <div data-portfolio className={`w-full ${className}`}>
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        <div className="flex-1">
          <h4 className="text-xs font-bold tracking-[0.2em] text-gray-300 uppercase mb-4">Filter by Service</h4>
          {group('service', 'All Services', services, 'bg-accent-red border-accent-red text-white')}
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold tracking-[0.2em] text-gray-300 uppercase mb-4">Filter by Area</h4>
          {group('city', 'All Areas', cities, 'bg-white border-white text-black')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {projects.map((project) => (
          <div
            key={project.id}
            data-portfolio-card
            data-service={project.serviceType}
            data-city={project.city}
            className="group flex flex-col bg-navy-deep rounded-sm overflow-hidden border border-gray-800 shadow-xl"
          >
              <div className="overflow-hidden">
                <BeforeAfterSlider 
                  beforeImage={project.beforeImage} 
                  afterImage={project.afterImage} 
                  altText={`${project.title} Before and After`}
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight">{project.title}</h3>
                    <span className="text-accent-red font-bold text-xs tracking-widest uppercase border border-accent-red/30 px-3 py-1.5 bg-accent-red/10 whitespace-nowrap ml-4 rounded-sm">{project.city}</span>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base mb-6 border-b border-gray-800 pb-6">{project.serviceType}</p>
                </div>
                
                <div className="flex items-center text-white/50 group-hover:text-white transition-colors">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase mr-3">View Project Case</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
                </div>
              </div>
          </div>
        ))}

        <div
          data-portfolio-empty
          hidden
          className="col-span-1 lg:col-span-2 py-32 text-center text-gray-300 border border-dashed border-gray-700 flex flex-col items-center justify-center bg-navy-deep"
        >
          <p className="text-lg uppercase tracking-wider font-bold">No Projects Match Selected Filters</p>
          <p className="text-sm mt-2 max-w-md">Try adjusting your filters to see more of our completed construction and remodeling work across Los Angeles.</p>
        </div>
      </div>
    </div>
  );
};
