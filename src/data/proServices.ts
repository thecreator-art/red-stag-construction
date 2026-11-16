// Content for the two professional-service pages: construction management and
// development services. Fee figures are typical Los Angeles market ranges, not
// quotes. Company facts (license, dates, address) match /licenses-insurance.

export interface ProService {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroAlt: string;
  heroSubline: string;
  answer: string[];
  scopeHeading: string;
  scope: { title: string; text: string }[];
  clientsHeading: string;
  clients: { title: string; text: string }[];
  feesHeading: string;
  feesIntro: string;
  fees: { item: string; range: string; basis: string }[];
  feesNotes: string[];
  processHeading: string;
  process: { title: string; text: string }[];
  localHeading: string;
  local: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  related: { label: string; href: string }[];
  closingHeadline: string;
  closingText: string;
}

export const constructionManagement: ProService = {
  slug: 'construction-management-los-angeles',
  name: 'Construction Management',
  h1: 'Construction Management in Los Angeles, CA',
  metaTitle: 'Construction Management Los Angeles | Red Stag Construction',
  metaDescription:
    'Construction management in Los Angeles from a licensed general contractor. Budgets, bids, permits, schedule and site supervision. Typical fees 5% to 15%. CSLB #964664.',
  heroImage: '/images/services/general.jpg',
  heroAlt: 'Residential construction site managed by Red Stag Construction in Los Angeles',
  heroSubline:
    'One licensed builder running your budget, bids, permits, schedule and job site from the first estimate to the final inspection.',
  answer: [
    'Construction management means we run the project for you. We price the drawings, bid the trades, pull the permits, build the schedule, supervise the site every working day and approve every invoice before you pay it. You keep the decisions. We carry the coordination.',
    'In Los Angeles a construction manager usually charges 5% to 10% of construction cost on larger projects and 10% to 15% on smaller residential jobs, with preconstruction billed hourly or as a fixed fee. Red Stag has held California contractor license #964664 since 2011, so the same company that manages your project is licensed to build it.',
  ],
  scopeHeading: 'What we manage',
  scope: [
    {
      title: 'Preconstruction budget',
      text: 'A line by line estimate from your drawings before they are finished, so the design gets corrected on paper instead of in the field. We flag the items that move a Los Angeles budget most: foundations, shoring, utility upgrades and long lead finishes.',
    },
    {
      title: 'Bidding and trade contracts',
      text: 'We write the scope for each trade, collect at least three comparable bids where the market allows, level them so you can see what each one leaves out, and write subcontracts that tie payment to finished work.',
    },
    {
      title: 'Permits and inspections',
      text: 'Plan check submittals, corrections, clearances and inspection scheduling with the Los Angeles Department of Building and Safety or your city building department, including deputy inspections for concrete, welding and structural work.',
    },
    {
      title: 'Schedule',
      text: 'A critical path schedule built around real lead times for windows, cabinets, stone, steel and electrical gear, updated every week and shared with you, your architect and every trade on site.',
    },
    {
      title: 'Daily site supervision',
      text: 'A superintendent on site who checks layout before concrete is poured, framing before it is covered, and waterproofing before tile goes on. Photos and a written report go out every week.',
    },
    {
      title: 'Cost control and payments',
      text: 'Every change is priced and approved in writing before the work starts. Each payment request is checked against work in place, and we collect lien releases from subcontractors and suppliers with every payment.',
    },
  ],
  clientsHeading: 'Who hires a construction manager',
  clients: [
    {
      title: 'Homeowners with an architect already on board',
      text: 'You have drawings, or you are close. You want a builder at the table now to keep the design inside the budget, then one accountable company to run the job.',
    },
    {
      title: 'Investors and small developers',
      text: 'You are building a duplex, a small lot project, several ADUs or a spec home and you need reliable numbers, lender draw paperwork and a schedule you can underwrite.',
    },
    {
      title: 'Owners who live out of the area',
      text: 'You cannot walk the site every week. We act as your eyes on the job, with photo reports, a shared budget and a single phone number.',
    },
    {
      title: 'Owners of a project that has stalled',
      text: 'The first contractor left, the permit expired or the budget is gone. We audit what was built, what was paid for and what it takes to finish, then take over.',
    },
  ],
  feesHeading: 'Typical construction management fees in Los Angeles',
  feesIntro:
    'These are common market ranges for the Los Angeles area. Your fee depends on project size, how complete the drawings are, site difficulty and how much risk we carry. The exact figure is written into your proposal before you sign anything.',
  fees: [
    {
      item: 'Preconstruction services',
      range: '$150 to $250 per hour, or a fixed fee from about $5,000',
      basis: 'Estimating, constructability review, bid packages and schedule before permits are issued. Often credited toward the construction fee.',
    },
    {
      item: 'Construction management fee, projects above about $2 million',
      range: '5% to 10% of construction cost',
      basis: 'We manage and coordinate. Trade contracts can be held by you or by us.',
    },
    {
      item: 'Construction management fee, projects under about $2 million',
      range: '10% to 15% of construction cost',
      basis: 'Smaller jobs need the same supervision, permits and paperwork, so the percentage is higher.',
    },
    {
      item: 'Cost plus with a guaranteed maximum price',
      range: 'Cost of the work plus a 10% to 20% fee',
      basis: 'We hold the trade contracts and guarantee a ceiling. Savings below the ceiling are returned or shared as the contract states.',
    },
    {
      item: 'Site supervision and general conditions',
      range: 'Commonly 6% to 12% of construction cost',
      basis: 'Superintendent, temporary power and toilets, fencing, dumpsters, site protection. Billed at cost and shown as its own line.',
    },
  ],
  feesNotes: [
    'A percentage fee is calculated on the cost of the work, not on land, design fees or permit fees.',
    'Carry a contingency of 5% to 10% on new construction and 10% to 15% on remodels and hillside sites, where hidden conditions are common.',
    'Ask any construction manager who holds the subcontracts. If they do, they should carry the license, insurance and workers compensation for the job. We do.',
  ],
  processHeading: 'How a managed project runs',
  process: [
    {
      title: 'Site walk and document review',
      text: 'We walk the property, read the drawings, soils report and survey, and tell you what we see as the main cost and schedule risks.',
    },
    {
      title: 'Budget and schedule',
      text: 'You get a written estimate broken down by trade and a first schedule. If the number is over your target we list specific changes that bring it back.',
    },
    {
      title: 'Permits and bidding',
      text: 'While the plans are in plan check we bid the trades, so contracts are ready to sign when the permit is issued.',
    },
    {
      title: 'Construction',
      text: 'Daily supervision, a weekly owner meeting, a weekly report with photos, and a budget update every month showing committed cost, paid to date and forecast to finish.',
    },
    {
      title: 'Closeout',
      text: 'Final inspections, Certificate of Occupancy where one is required, punch list, warranties, manuals, as built drawings and final lien releases handed over in one package.',
    },
  ],
  localHeading: 'What makes Los Angeles projects harder to manage',
  local: [
    {
      title: 'Hillside rules',
      text: 'The City of Los Angeles Baseline Hillside Ordinance limits grading and floor area on hillside lots, and large earth export requires a haul route approval. Both affect schedule months before a shovel hits the ground.',
    },
    {
      title: 'Utility lead times',
      text: 'A new or upgraded electrical service from the Los Angeles Department of Water and Power can take many months. We apply early so power is not the last thing holding up your final inspection.',
    },
    {
      title: 'Energy and stormwater requirements',
      text: 'California Title 24 energy rules shape window, insulation and mechanical choices. The city Low Impact Development ordinance requires many projects to capture stormwater on site, which adds planters, drywells or tanks to the site work.',
    },
    {
      title: 'Lien law',
      text: 'California gives subcontractors and suppliers mechanics lien rights against your property. Collecting the statutory conditional and unconditional releases with each payment is how you stay protected, and it is part of every payment cycle we run.',
    },
  ],
  faqs: [
    {
      question: 'What is the difference between a construction manager and a general contractor?',
      answer:
        'A general contractor usually gives one fixed price and keeps the trade pricing private. A construction manager works for a stated fee, shows you every bid and invoice, and gets involved during design. Red Stag is licensed as a general contractor and can work either way.',
    },
    {
      question: 'How much does construction management cost in Los Angeles?',
      answer:
        'Typical fees run 5% to 10% of construction cost on projects above about $2 million and 10% to 15% on smaller residential work. Preconstruction is commonly billed at $150 to $250 per hour or as a fixed fee.',
    },
    {
      question: 'When should I bring in a construction manager?',
      answer:
        'During schematic design, before the drawings are submitted for permit. That is when a cost estimate can still change the design cheaply. We also take over projects that are already under way.',
    },
    {
      question: 'Do I still need an architect?',
      answer:
        'Yes for most new homes, additions and structural remodels. We work with the architect and engineer you already have, or we can run the project as design-build under one contract.',
    },
    {
      question: 'Does a construction manager need a contractor license in California?',
      answer:
        'A company that contracts to build, or that holds the subcontracts, needs a California contractor license. Red Stag holds CSLB license #964664 with B General Building, C-6 and C-36 classifications, active since 2011.',
    },
    {
      question: 'Can you manage a project for my lender?',
      answer:
        'Yes. We prepare the schedule of values, monthly draw requests, progress photos and lien releases that construction lenders and their inspectors ask for.',
    },
  ],
  related: [
    { label: 'Development Services', href: '/real-estate-development-los-angeles' },
    { label: 'General Contracting', href: '/general-contractor-los-angeles' },
    { label: 'Custom Home Building', href: '/custom-home-builder-los-angeles' },
    { label: 'ADU Construction', href: '/adu-contractor-los-angeles' },
    { label: 'Pricing Benchmarks', href: '/pricing' },
    { label: 'Licenses and Insurance', href: '/licenses-insurance' },
  ],
  closingHeadline: 'Send us your drawings',
  closingText:
    'Tell us the address, what you are building and where the plans stand. We will review them and come back with the questions a builder should be asking at this stage.',
};

export const developmentServices: ProService = {
  slug: 'real-estate-development-los-angeles',
  name: 'Development Services',
  h1: 'Real Estate Development Services in Los Angeles, CA',
  metaTitle: 'Real Estate Development Services Los Angeles | Red Stag',
  metaDescription:
    'Development services in Los Angeles: feasibility, entitlements, design team, budget and construction for custom homes, ADUs, SB 9 and small lot projects. CSLB #964664.',
  heroImage: '/images/services/custom.jpg',
  heroAlt: 'Ground up residential development in Los Angeles built by Red Stag Construction',
  heroSubline:
    'From an empty or underused lot to a finished, permitted building: feasibility, entitlements, design team, budget and construction under one licensed builder.',
  answer: [
    'Development services cover everything between owning a property and holding the keys to a finished building. We test what the lot allows, put real construction numbers on it, assemble the architect and engineers, carry the project through planning and plan check, and then build it.',
    'In Los Angeles a development manager typically charges 3% to 5% of total project cost, separate from the construction contract. Soft costs such as design, engineering, permits and fees usually add 20% to 30% on top of construction cost. Red Stag has been a licensed California general contractor since 2011, license #964664, so the budget in your feasibility study comes from the company that will be held to it.',
  ],
  scopeHeading: 'What development services include',
  scope: [
    {
      title: 'Feasibility study',
      text: 'Zoning, height, setbacks, floor area, parking, hillside or coastal overlays and utility capacity, turned into a clear answer: what can be built here, roughly what it costs and how long it takes.',
    },
    {
      title: 'Due diligence before you buy',
      text: 'During escrow we review the survey, title exceptions, soils conditions, slope, methane zone status and existing permits, so surprises show up before your deposit goes hard.',
    },
    {
      title: 'Design team',
      text: 'We bring in and coordinate the architect, structural and civil engineers, soils engineer, surveyor and energy consultant, with one schedule and one budget they all design to.',
    },
    {
      title: 'Entitlements and permits',
      text: 'Applications, hearings where they are required, plan check corrections and agency clearances with Los Angeles City Planning and the Department of Building and Safety, or your local city.',
    },
    {
      title: 'Budget and lender package',
      text: 'A development budget covering land, soft costs, construction, financing and contingency, with the schedule of values and cash flow a construction lender needs.',
    },
    {
      title: 'Construction and closeout',
      text: 'We build the project as the general contractor, or manage it for a stated fee, through final inspection, Certificate of Occupancy and handover.',
    },
  ],
  clientsHeading: 'Who uses development services',
  clients: [
    {
      title: 'Property owners with more land than house',
      text: 'A large lot, a teardown or a property that qualifies for a lot split. You want to know if adding units or rebuilding makes financial sense before you spend on drawings.',
    },
    {
      title: 'Investors and family offices',
      text: 'You have the capital and want a local builder to find the constraints, set the budget and deliver the building while you stay out of the daily detail.',
    },
    {
      title: 'Buyers in escrow',
      text: 'You have a short contingency period and need a builder to tell you what the lot will really support and what the site work will cost.',
    },
    {
      title: 'Architects and brokers',
      text: 'You need construction pricing and constructability input for a client early, before the design is fixed or the offer is written.',
    },
  ],
  feesHeading: 'Typical development costs and fees in Los Angeles',
  feesIntro:
    'These are common market ranges for the Los Angeles area, shown so you can sketch a budget. Real numbers depend on the lot, the product and the approvals required. Your proposal states our fee in writing before any work begins.',
  fees: [
    {
      item: 'Feasibility study',
      range: '$3,500 to $15,000 fixed fee',
      basis: 'Depends on lot complexity and the number of options studied. Often credited if we go on to build.',
    },
    {
      item: 'Development management fee',
      range: '3% to 5% of total project cost',
      basis: 'Covers managing the design team, entitlements, budget and reporting. Separate from the construction contract.',
    },
    {
      item: 'Soft costs',
      range: '20% to 30% of construction cost',
      basis: 'Architecture, engineering, soils, survey, permits, school and utility fees, insurance and financing costs.',
    },
    {
      item: 'Ground up custom home construction',
      range: '$450 to $850+ per square foot',
      basis: 'Our 2026 Los Angeles benchmark. Hillside foundations, basements and high end finishes push past the top of the range.',
    },
    {
      item: 'ADU construction',
      range: '$185,000 to $425,000+',
      basis: 'Our 2026 Los Angeles benchmark for garage conversions through detached new units.',
    },
    {
      item: 'Project contingency',
      range: '5% to 10% of construction cost',
      basis: 'Raise it to 10% to 15% for hillside lots, older structures and sites with unknown soils.',
    },
  ],
  feesNotes: [
    'Total project cost means land, soft costs, construction, financing and contingency added together.',
    'Entitlement time is a cost. Every month in planning carries loan interest, taxes and insurance, so it belongs in the budget from day one.',
    'These figures are for budgeting. They are not financial or investment advice, and returns on any project depend on the market when you sell or lease.',
  ],
  processHeading: 'From lot to finished building',
  process: [
    {
      title: 'Feasibility',
      text: 'We study the zoning and the site and give you a written summary with a buildable program, a rough cost range and a timeline.',
    },
    {
      title: 'Concept and budget',
      text: 'The architect produces a concept. We price it by trade. You decide whether to proceed with numbers in front of you.',
    },
    {
      title: 'Entitlements and design',
      text: 'Planning approvals where they are required, then full construction drawings and engineering, priced again at each milestone so the budget holds.',
    },
    {
      title: 'Permits and financing',
      text: 'Plan check, agency clearances and trade bidding run in parallel. Your lender receives the budget, schedule and contract it needs to close the loan.',
    },
    {
      title: 'Construction',
      text: 'We build with daily supervision, weekly reports and monthly cost updates through final inspection and Certificate of Occupancy.',
    },
  ],
  localHeading: 'Los Angeles rules that shape what you can build',
  local: [
    {
      title: 'SB 9 lot splits and duplexes',
      text: 'California Senate Bill 9, in effect since January 2022, lets many single family lots be split in two or built with two homes through a ministerial process. Eligibility depends on the lot, hazard zones and owner occupancy rules, so it has to be checked parcel by parcel.',
    },
    {
      title: 'Accessory dwelling units',
      text: 'State ADU law allows a detached ADU and a junior ADU on most single family lots and has removed many local barriers. For a lot of owners it is the fastest way to add a rentable unit.',
    },
    {
      title: 'Small lot subdivisions',
      text: 'The City of Los Angeles Small Lot Subdivision Ordinance allows fee simple townhome style homes on lots zoned for multifamily or commercial use, each on its own small parcel.',
    },
    {
      title: 'Hillside, coastal and methane overlays',
      text: 'Hillside lots fall under the Baseline Hillside Ordinance. Property in the coastal zone can need a coastal development permit. Parts of the city sit in mapped methane zones that require testing and mitigation under the slab. Each one changes cost and schedule.',
    },
  ],
  faqs: [
    {
      question: 'What does a development manager do?',
      answer:
        'A development manager runs a project on the owner’s behalf from feasibility to completion: zoning review, budget, design team, approvals, financing paperwork and construction oversight. The owner keeps ownership and makes the major decisions.',
    },
    {
      question: 'How much does it cost to develop a property in Los Angeles?',
      answer:
        'Plan on construction cost plus 20% to 30% in soft costs, a 5% to 10% contingency and financing costs. Ground up custom homes in our 2026 benchmarks run $450 to $850+ per square foot for construction alone.',
    },
    {
      question: 'How long does a development project take?',
      answer:
        'A by right single family home commonly takes 4 to 8 months to design and permit and 10 to 16 months to build. Projects that need a planning hearing, a coastal permit or a subdivision map can add 6 to 18 months before construction starts.',
    },
    {
      question: 'Can my lot be split under SB 9?',
      answer:
        'Possibly. The lot generally must be in a single family zone, outside certain hazard and historic areas, and meet minimum size rules after the split. We check your specific parcel as part of a feasibility study.',
    },
    {
      question: 'Do you only work on your own projects?',
      answer:
        'We provide these services for property owners, investors and their design teams. You own the project. We manage it and build it.',
    },
    {
      question: 'What do you need from me to start a feasibility study?',
      answer:
        'The property address or parcel number, what you hope to build, your target budget and any survey, title report or soils report you already have.',
    },
  ],
  related: [
    { label: 'Construction Management', href: '/construction-management-los-angeles' },
    { label: 'Custom Home Building', href: '/custom-home-builder-los-angeles' },
    { label: 'ADU Construction', href: '/adu-contractor-los-angeles' },
    { label: 'Home Additions', href: '/home-addition-contractor-los-angeles' },
    { label: 'Pricing Benchmarks', href: '/pricing' },
    { label: 'For Architects', href: '/for-architects' },
  ],
  closingHeadline: 'Start with the address',
  closingText:
    'Send us the property address and what you have in mind. We will tell you what we would look at first and what a feasibility study for that lot would cover.',
};
