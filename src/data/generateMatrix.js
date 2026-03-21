const fs = require('fs');
const path = require('path');

const formatCost = (num) => {
  if (num < 1000) return "$" + num;
  return "$" + num.toLocaleString();
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const getArticle = (word) => {
  if (word.toUpperCase().startsWith('ADU')) return 'an';
  return /^[aeiou]/i.test(word) ? 'an' : 'a';
};

const top5Services = [
  { name: 'Kitchen Remodel', slug: 'kitchen-remodel', title: 'Kitchen Remodel Contractor in {city}, CA' },
  { name: 'Bathroom Remodel', slug: 'bathroom-remodel', title: 'Bathroom Remodel Contractor in {city}, CA' },
  { name: 'ADU Contractor', slug: 'adu-contractor', title: 'ADU Contractor in {city}, CA' },
  { name: 'Custom Home Builder', slug: 'custom-home-builder', title: 'Custom Home Builder in {city}, CA' },
  { name: 'Home Addition', slug: 'home-addition', title: 'Home Addition Contractor in {city}, CA' }
];

const next4Services = [
  { name: 'General Contracting', slug: 'general-contractor', title: 'General Contractor in {city}, CA' },
  { name: 'Hardscape & Concrete', slug: 'hardscape-contractor', title: 'Hardscape Contractor in {city}, CA' },
  { name: 'Window Replacement', slug: 'window-replacement', title: 'Window Replacement in {city}, CA' },
  { name: 'Fence Company', slug: 'fence-company', title: 'Fence Company in {city}, CA' }
];

const allCities = [
  { name: 'Beverly Hills', slug: 'beverly-hills', tier: 1 },
  { name: 'Bel Air', slug: 'bel-air', tier: 1 },
  { name: 'Hidden Hills', slug: 'hidden-hills', tier: 1 },
  { name: 'Pacific Palisades', slug: 'pacific-palisades', tier: 2 },
  { name: 'Malibu', slug: 'malibu', tier: 2 },
  { name: 'Brentwood', slug: 'brentwood-la', tier: 2 },
  { name: 'Manhattan Beach', slug: 'manhattan-beach', tier: 2 },
  { name: 'Santa Monica', slug: 'santa-monica', tier: 3 },
  { name: 'West Hollywood', slug: 'west-hollywood', tier: 3 },
  { name: 'Silver Lake', slug: 'silver-lake', tier: 3 },
  { name: 'Studio City', slug: 'studio-city', tier: 4 },
  { name: 'Sherman Oaks', slug: 'sherman-oaks', tier: 4 },
  { name: 'Encino', slug: 'encino', tier: 4 },
  { name: 'Calabasas', slug: 'calabasas', tier: 4 },
  { name: 'Tarzana', slug: 'tarzana', tier: 5 },
  { name: 'Woodland Hills', slug: 'woodland-hills', tier: 5 },
  { name: 'Burbank', slug: 'burbank', tier: 5 },
  { name: 'Granada Hills', slug: 'granada-hills', tier: 5 },
  { name: 'Northridge', slug: 'northridge', tier: 5 },
  { name: 'San Fernando', slug: 'san-fernando', tier: 6 }
];

const serviceNouns = {
  'Kitchen Remodel': 'kitchen remodel',
  'Bathroom Remodel': 'bathroom remodel',
  'ADU Contractor': 'ADU construction project',
  'Custom Home Builder': 'custom home build',
  'Home Addition': 'home addition',
  'General Contracting': 'general contracting project',
  'Hardscape & Concrete': 'hardscape and concrete project',
  'Window Replacement': 'window replacement',
  'Fence Company': 'fence installation'
};

const cityTiers = {
  'beverly-hills': [1.6, 1.67], 'bel-air': [1.6, 1.67], 'hidden-hills': [1.6, 1.67],
  'pacific-palisades': [1.4, 1.33], 'malibu': [1.4, 1.33], 'brentwood-la': [1.4, 1.33], 'manhattan-beach': [1.4, 1.33],
  'santa-monica': [1.1, 1.05], 'west-hollywood': [1.1, 1.05], 'silver-lake': [1.1, 1.05],
  'studio-city': [1.0, 1.0], 'sherman-oaks': [1.0, 1.0], 'encino': [1.0, 1.0], 'calabasas': [1.0, 1.0],
  'tarzana': [0.8, 0.83], 'woodland-hills': [0.8, 0.83], 'burbank': [0.8, 0.83], 'granada-hills': [0.8, 0.83], 'northridge': [0.8, 0.83],
  'san-fernando': [0.7, 0.72]
};

const serviceBases = {
  'Kitchen Remodel': [85000, 150000],
  'Bathroom Remodel': [50000, 90000],
  'ADU Contractor': [220000, 280000],
  'Custom Home Builder': [400, 600], 
  'Home Addition': [300, 450], 
  'General Contracting': [150000, 250000],
  'Hardscape & Concrete': [40000, 90000],
  'Window Replacement': [35000, 65000],
  'Fence Company': [15000, 35000]
};

const costSentences = {
  'Kitchen Remodel': [
    (min, max) => "A full-gut custom kitchen spanning appliances, layout changes, and stone countertops generally ranges from " + min + " to " + max + " in this neighborhood.",
    (min, max) => "Extensive kitchen renovations that involve structural wall removals or island additions typically require budgets between " + min + " and " + max + ".",
    (min, max) => "For a premium chef's kitchen build that maximizes your property value, most local scopes fall squarely within the " + min + " to " + max + " tier."
  ],
  'Bathroom Remodel': [
    (min, max) => "A primary suite bath expansion—featuring a curbless shower and freestanding tub—typically represents a " + min + " to " + max + " investment with exceptional resale value.",
    (min, max) => "Comprehensive bathroom gut-outs that completely optimize plumbing layouts generally land in the " + min + " to " + max + " tier in this specific market.",
    (min, max) => "Depending on the selection of imported tile and custom woodwork, a luxury bathroom transformation here requires a budget between " + min + " and " + max + "."
  ],
  'ADU Contractor': [
    (min, max) => "Designing, permitting, and building a detached ADU on a standard lot currently runs between " + min + " and " + max + ", quickly offsetting costs via rental income.",
    (min, max) => "Depending on foundation engineering and utility trenching, a fully finished accessory dwelling unit represents a " + min + " to " + max + " capital improvement.",
    (min, max) => "A robust design-build ADU encompassing full architectural planning through final landscaping will typically require a " + min + " to " + max + " investment."
  ],
  'Custom Home Builder': [
    (min, max) => "Factoring in complex engineering and finish work, high-end ground-up construction generally starts at " + min + " to " + max + " per square foot.",
    (min, max) => "Building a luxury residence perfectly matched to your vision normally requires an investment of " + min + " and " + max + " per square foot.",
    (min, max) => "Depending on architectural complexities like steel frames or specific grading needs, plan for " + min + " to " + max + " per square foot."
  ],
  'Home Addition': [
    (min, max) => "Adding a new master suite or expanding a secondary wing typically costs around " + min + " to " + max + " per square foot.",
    (min, max) => "Single-level structural expansions that flow seamlessly with the existing roofline usually start between " + min + " and " + max + " per square foot.",
    (min, max) => "Given the logistics of tying into an existing foundation, most meaningful home additions represent a " + min + " to " + max + " per square foot investment."
  ],
  'General Contracting': [
    (min, max) => "A comprehensive whole-home renovation managed correctly from day one typically involves capital allocations of " + min + " up to " + max + ".",
    (min, max) => "Handling major structural retrofits alongside aesthetic interior updates generally ranges from " + min + " to " + max + " based on finish tiers.",
    (min, max) => "Overhauling a property completely utilizing white-glove project management frequently represents a " + min + " to " + max + " investment."
  ],
  'Hardscape & Concrete': [
    (min, max) => "Engineering robust hillside retaining walls or pouring expansive custom driveways routinely scopes from " + min + " to " + max + ".",
    (min, max) => "Comprehensive hardscaping packages integrating outdoor kitchens or structural fire pits typically require budgets between " + min + " and " + max + ".",
    (min, max) => "Major concrete and decorative paver installations designed to last decades usually land in the " + min + " to " + max + " tier."
  ],
  'Window Replacement': [
    (min, max) => "Retrofitting a residence with premium multi-slide doors and aluminum-clad wood windows generally constitutes a " + min + " to " + max + " upgrade.",
    (min, max) => "Replacing outdated glazing with energy-efficient architectural frames typically falls between " + min + " and " + max + ".",
    (min, max) => "Comprehensive fenestration packages that drastically improve natural light and seal the envelope span " + min + " to " + max + "."
  ],
  'Fence Company': [
    (min, max) => "Installing premium horizontal cedar fencing or a custom wrought-iron automated privacy gate runs from " + min + " to " + max + ".",
    (min, max) => "Heavy-duty property line enclosures utilizing deep concrete footings usually represent a " + min + " to " + max + " exterior investment.",
    (min, max) => "Whether securing the perimeter with masonry walls or architectural metalwork, scopes generally range between " + min + " and " + max + "."
  ]
};

const ctas = [
  "Red Stag Construction guarantees flawless execution for your {city} project. Call (626) 652-2303 to schedule a site consultation.",
  "Partner with Red Stag Construction to seamlessly elevate your home. Reach our office at (626) 652-2303.",
  "Red Stag Construction commands the expertise to deliver your {city} property transformation flawlessly. Ready to begin? Call (626) 652-2303.",
  "We anticipate the hidden variables so your {city} timeline and budget remain protected. Call (626) 652-2303 for a transparent consultation.",
  "Connect with our master builders and project development team at (626) 652-2303 to discuss your exact vision.",
  "For a true design-build partner operating natively in {city}, contact our executive estimators directly at (626) 652-2303.",
  "Ensure absolute quality and transparency. Dial (626) 652-2303 to connect with the leading contractors working in {city} today."
];

const profiles = {
  'beverly-hills': (noun, article, A) => "When undertaking " + article + " " + noun + " in Beverly Hills, dealing with the independent City of Beverly Hills Building Department and stringent design review requirements is simply part of the foundation. Whether your property sits in the complex hillside lots of Trousdale Estates or Benedict Canyon, we understand that finish expectations here run ultra-premium—think Sub-Zero, Wolf, and bookmatched stone. With architectural standards pushing maximum value, you need a contractor who doesn't learn on your dime.",
  'bel-air': (noun, article, A) => "Executing " + article + " " + noun + " in the steep canyon lots of Bel Air requires an elite understanding of engineered foundations and extreme structural requirements. Because land values are phenomenally high, homeowners constantly weigh complex rebuild versus renovate decisions, often while navigating local HPOZ considerations and coordinating strict gated community access for our construction crews. Seamlessly managing these high-stakes logistics is our baseline.",
  'hidden-hills': (noun, article, A) => "Operating a true " + noun + " within Hidden Hills requires a specialized approach tailored to this fully gated equestrian community. Pre-approved contractor access is strictly enforced, and heavy renovation grading must accommodate sensitive horse property considerations. Beyond logistics, achieving the absolute premium finish expectations of this ultra-high household income enclave requires veteran execution.",
  'pacific-palisades': (noun, article, A) => "Managing " + article + " " + noun + " in Pacific Palisades requires deep local knowledge, from navigating California Coastal Commission overlays near the bluffs to integrating post-fire rebuild and hardening awareness. In a neighborhood boasting some of the highest median home values in Los Angeles, honoring the strong community character through impeccable design is non-negotiable.",
  'malibu': (noun, article, A) => A + " " + noun + " in Malibu is never a standard undertaking. The California Coastal Commission dictates permitting for properties near the water, and contractors must rigorously manage WUI zone fire hardening and private septic system requirements due to the lack of city sewer infrastructure. Tight construction access along PCH demands masterful logistical coordination to deliver extreme premium results.",
  'brentwood-la': (noun, article, A) => A + " " + noun + " in Brentwood demands a contractor capable of handling both the large flat lots below San Vicente and the extreme hillside complexity above Sunset. In pockets with strong HOA presences, our high-income clientele expect seasoned professionals who understand that they've renovated before and will not tolerate amateur delays. For those near the UCLA corridor, the rental demand makes certain projects highly lucrative.",
  'manhattan-beach': (noun, article, A) => "Building or remodeling with " + article + " " + noun + " in Manhattan Beach presents a unique set of coastal variables. From dealing with the independent building department to engineering around the notoriously small lot sizes in the Sand Section, precision is everything. Material selection must also preempt salt air corrosion while meeting incredibly high finish expectations.",
  'santa-monica': (noun, article, A) => "If you are initiating " + article + " " + noun + " in Santa Monica, partnering with a firm that understands the independent City of Santa Monica Building Department and its progressive green building requirements is critical. The high density of older structures and intense demand for space near SMC and UCLA make specific investments incredibly strategic, though local rent control ordinances must be navigated carefully.",
  'west-hollywood': (noun, article, A) => "Initiating " + article + " " + noun + " in West Hollywood is a masterclass in urban efficiency. The independent City of West Hollywood Building Department utilizes a rigorous design review process that fiercely protects the neighborhood's celebrated architectural character. In this dense environment with extraordinarily limited lot sizes, design-forward homeowners demand structural ingenuity that maximizes every square inch.",
  'silver-lake': (noun, article, A) => "The defining feature of any " + noun + " in Silver Lake is anticipating the steep hillside terrain. Nearly every project here requires complex slope engineering, meticulous drainage planning, or heavy retaining wall construction. Furthermore, working within older Craftsman and Spanish Colonial stock demands a builder who can meet the progressive, design-forward expectations of a vibrant architectural community.",
  'studio-city': (noun, article, A) => A + " " + noun + " in Studio City often involves bridging the gap between historical charm and modern luxury. Whether updating a 1940s ranch south of Ventura Blvd or a sprawling mid-century modern in the surrounding hills, securing LADBS permits smoothly is essential. With property appreciation making renovation ROI crystal clear, our clean job sites stay in the good graces of Studio City's highly active neighborhood councils.",
  'sherman-oaks': (noun, article, A) => "Undertaking " + article + " " + noun + " in Sherman Oaks is a brilliant investment, but it frequently uncovers the realities of the area's 1950s-1970s housing stock, requiring extensive electrical and plumbing updates mid-project. The generous lot sizes here create a massive market for expansion, while homes near the Ventura Blvd corridor require careful commercial adjacency planning.",
  'encino': (noun, article, A) => "The residential market in Encino is defined by sprawling mid-century ranch homes ripe for modernization or complete scrapes. Navigating " + article + " " + noun + " here means catering to an affluent demographic with uncompromisingly high finish expectations, utilizing the larger lot sizes typical to this part of the SFV. Furthermore, projects north of Ventura require a builder versed in hillside structural complexity.",
  'calabasas': (noun, article, A) => "Successfully managing " + article + " " + noun + " in Calabasas hinges on exceptional administrative and logistical foresight. We routinely coordinate with the Las Virgenes Homeowners Federation and secure strict contractor approvals for gated community access. Our builds prioritize crucial fire zone considerations in the foothill areas while meeting the premium material demands of a high-income demographic.",
  'tarzana': (noun, article, A) => "Because Tarzana serves as an accessible entry point into upscale SFV homeownership, executing " + article + " " + noun + " here is driven by a strong remodel-to-update market. The predominantly flat terrain simplifies structural mechanics, allowing budgets to stretch further while maximizing the excellent potential on standard-sized lots. With growing local appreciation, your capital improvements immediately build substantial equity.",
  'woodland-hills': (noun, article, A) => A + " " + noun + " in Woodland Hills is uniquely influenced by the expanding Warner Center, creating a dynamic residential-commercial character in certain zones. Driven by strong family demographics, the demand for expanded living spaces requires a firm familiar with navigating the area's mid-century housing stock, increasing deep familial utility while securing outstanding market value.",
  'burbank': (noun, article, A) => "Planning " + article + " " + noun + " in Burbank means interacting directly with the dedicated City of Burbank building department rather than LADBS. Supported by a robust entertainment industry employment base, the strong family demographic here drives highly practical, value-boosting renovations, especially for detached additions near the major studios.",
  'granada-hills': (noun, article, A) => A + " " + noun + " in Granada Hills is an incredibly smart equity play. Serving a robust demographic of move-up buyers, we specialize in comprehensive modernization of the area's prevalent 1960s and 1970s housing stock. The predominantly flat terrain keeps structural preparations straightforward, ensuring your investment is heavily weighted toward high-quality visible finishes.",
  'northridge': (noun, article, A) => "When approaching " + article + " " + noun + " in Northridge, our structural teams remain highly vigilant. The legacy of the 1994 earthquake means older properties frequently hide deferred seismic retrofitting that must be addressed before aesthetic work begins. Additionally, CSUN adjacency fuels a highly lucrative rental market for strategic expansions on these favorable, flat lots.",
  'san-fernando': (noun, article, A) => "Executing " + article + " " + noun + " in the City of San Fernando requires a contractor who maximizes tight spatial constraints. As a vital, hard-working community with slightly smaller lot sizes, renovations here demand intensely practical design that radically improves daily family utility without unnecessary bloated costs. Our bilingual site managers ensure clear communication across every phase of the build."
};

let matrixPages = [];
let combinationIndex = 0;

const buildCombination = (service, city) => {
  const noun = serviceNouns[service.name];
  const article = getArticle(noun);
  const capitalizedArticle = capitalize(article);
  const locationName = city.name;
  
  const tier = cityTiers[city.slug];
  const base = serviceBases[service.name];
  
  let roundFactor = base[0] < 1000 ? 10 : 1000;
  let isSqft = base[0] < 1000;
  const minCost = Math.round((base[0] * tier[0]) / roundFactor) * roundFactor;
  const maxCost = Math.round((base[1] * tier[1]) / roundFactor) * roundFactor;
  
  const formattedMin = formatCost(minCost);
  const formattedMax = formatCost(maxCost);
  
  const costSentenceFn = costSentences[service.name][combinationIndex % costSentences[service.name].length];
  const costSentence = costSentenceFn(formattedMin, formattedMax);
  
  const ctaFn = ctas[combinationIndex % ctas.length];
  const cta = ctaFn.replace(/{city}/g, locationName);
  
  const profileText = profiles[city.slug](noun, article, capitalizedArticle);
  const fullIntro = profileText + " " + costSentence + " " + cta;

  matrixPages.push({
    slug: service.slug + "-" + city.slug,
    title: service.title.replace('{city}', locationName),
    service: service.name,
    city: locationName,
    intro: fullIntro
  });
  
  combinationIndex++;
};

// Build ALL 9 services x 20 cities (180 combinations total)
// This definitively pushes the Next.js static generation count well past 230+ pages.
const allServices = [...top5Services, ...next4Services];
allServices.forEach(s => allCities.forEach(c => buildCombination(s, c)));

fs.writeFileSync(path.join(__dirname, 'matrix.json'), JSON.stringify(matrixPages, null, 2));
console.log("Successfully rebuilt exactly " + matrixPages.length + " matrix pages with unique city profiles, scaled costs, and rolling CTAs.");
