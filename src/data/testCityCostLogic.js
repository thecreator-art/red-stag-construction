const formatCost = (num) => {
  if (num < 1000) return "$" + num;
  return "$" + num.toLocaleString();
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
  'Bathroom Remodel': [50000, 90000]
};

const costSentences = {
  'Bathroom Remodel': [
    (min, max) => "A primary suite bath expansion—featuring a curbless shower and freestanding tub—typically represents a " + min + " to " + max + " investment with exceptional resale value.",
    (min, max) => "Comprehensive bathroom gut-outs that completely optimize plumbing layouts generally land in the " + min + " to " + max + " tier in this specific market.",
    (min, max) => "Depending on the selection of imported tile and custom woodwork, a luxury bathroom transformation here requires a budget between " + min + " and " + max + "."
  ]
};

const ctas = [
  "Red Stag Construction guarantees flawless execution for your {city} project. Call (626) 652-2303 to schedule a site consultation.",
  "Partner with Red Stag Construction to seamlessly elevate your home. Reach our office at (626) 652-2303.",
  "Red Stag Construction commands the expertise to deliver your {city} property transformation flawlessly. Ready to begin? Call (626) 652-2303.",
  "We anticipate the hidden variables so your {city} timeline and budget remain protected. Call (626) 652-2303 for a transparent consultation.",
  "Connect with our master builders and project development team at (626) 652-2303 to discuss your exact vision.",
  "For a true design-build partner operating natively in {city}, contact our executive estimators directly at (626) 652-2303."
];

const profiles = {
  'beverly-hills': (noun, article, A) => "When undertaking " + article + " " + noun + " in Beverly Hills, dealing with the independent City of Beverly Hills Building Department and stringent design review requirements is simply part of the foundation. Whether your property sits in the complex hillside lots of Trousdale Estates or Benedict Canyon, we understand that finish expectations here run ultra-premium—think Sub-Zero, Wolf, and bookmatched stone. With architectural standards pushing maximum value, you need a contractor who doesn't learn on your dime.",
  
  'studio-city': (noun, article, A) => A + " " + noun + " in Studio City often involves bridging the gap between historical charm and modern luxury. Whether updating a 1940s ranch south of Ventura Blvd or a sprawling mid-century modern in the surrounding hills, securing LADBS permits smoothly is essential. With property appreciation making renovation ROI crystal clear, our clean job sites stay in the good graces of Studio City's highly active neighborhood councils.",
  
  'encino': (noun, article, A) => "The residential market in Encino is defined by sprawling mid-century ranch homes ripe for modernization or complete scrapes. Navigating " + article + " " + noun + " here means catering to an affluent demographic with uncompromisingly high finish expectations, utilizing the larger lot sizes typical to this part of the SFV. Furthermore, projects north of Ventura require a builder versed in hillside structural complexity.",
  
  'sherman-oaks': (noun, article, A) => "Undertaking " + article + " " + noun + " in Sherman Oaks is a brilliant investment, but it frequently uncovers the realities of the area's 1950s-1970s housing stock, requiring extensive electrical and plumbing updates mid-project. The generous lot sizes here create a massive market for expansion, while homes near the Ventura Blvd corridor require careful commercial adjacency planning."
};

const tests = [
  { slug: 'beverly-hills', name: 'Beverly Hills' }, 
  { slug: 'studio-city', name: 'Studio City' }, 
  { slug: 'encino', name: 'Encino' }, 
  { slug: 'sherman-oaks', name: 'Sherman Oaks' }
];

let globalIndex = 0;

tests.forEach(city => {
  const tier = cityTiers[city.slug];
  const base = serviceBases['Bathroom Remodel'];
  
  let roundFactor = base[0] < 1000 ? 10 : 1000;
  const minCost = Math.round((base[0] * tier[0]) / roundFactor) * roundFactor;
  const maxCost = Math.round((base[1] * tier[1]) / roundFactor) * roundFactor;
  
  const costSentenceFn = costSentences['Bathroom Remodel'][globalIndex % costSentences['Bathroom Remodel'].length];
  const costSentence = costSentenceFn(formatCost(minCost), formatCost(maxCost));
  
  const ctaFn = ctas[globalIndex % ctas.length];
  const cta = ctaFn.replace(/{city}/g, city.name);
  
  const profileText = profiles[city.slug]('bathroom remodel', 'a', 'A');
  
  console.log("--- bathroom-remodel-" + city.slug + " ---");
  console.log(profileText + " " + costSentence + " " + cta);
  console.log("");
  
  globalIndex++;
});
