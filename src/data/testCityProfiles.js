const serviceExamples = {
  'Bathroom Remodel': [
    "A primary suite bath expansion—featuring a curbless shower and freestanding tub—typically represents a $60,000 to $90,000 investment with exceptional resale value."
  ]
};

const profiles = {
  'beverly-hills': (noun, example, article, A) => `When undertaking ${article} ${noun} in Beverly Hills, dealing with the independent City of Beverly Hills Building Department and stringent design review requirements is simply part of the foundation. Whether your property sits in the complex hillside lots of Trousdale Estates or Benedict Canyon, we understand that finish expectations here run ultra-premium—think Sub-Zero, Wolf, and bookmatched stone. With construction costs routinely hitting $400 to $700 per square foot, you need a contractor who doesn't learn on your dime. ${example} Red Stag Construction guarantees flawless execution for your Beverly Hills project. Call (626) 652-2303 to schedule a site consultation.`,
  
  'studio-city': (noun, example, article, A) => `${A} ${noun} in Studio City often involves bridging the gap between historical charm and modern luxury. Whether updating a 1940s ranch south of Ventura Blvd or a sprawling mid-century modern in the surrounding hills, securing LADBS permits smoothly is essential. With property appreciation making renovation ROI crystal clear, our clean job sites stay in the good graces of Studio City's highly active neighborhood councils. ${example} Partner with Red Stag Construction to elevate your home. Reach us at (626) 652-2303.`,
  
  'encino': (noun, example, article, A) => `The residential market in Encino is defined by sprawling mid-century ranch homes ripe for modernization or complete scrapes. Navigating ${article} ${noun} here means catering to an affluent demographic with uncompromisingly high finish expectations, utilizing the larger lot sizes typical to this part of the SFV. Furthermore, projects north of Ventura require a builder versed in hillside structural complexity. ${example} Red Stag Construction commands the expertise to deliver your Encino property transformation flawlessly. Ready to begin? Call (626) 652-2303.`,
  
  'sherman-oaks': (noun, example, article, A) => `Undertaking ${article} ${noun} in Sherman Oaks is a brilliant investment, but it frequently uncovers the realities of the area's 1950s-1970s housing stock, requiring extensive electrical and plumbing updates mid-project. The generous lot sizes here create a massive market for expansion, while homes near the Ventura Blvd corridor require careful commercial adjacency planning. ${example} Red Stag Construction anticipates these hidden variables so your Sherman Oaks timeline and budget remain protected. Call (626) 652-2303 for a transparent consultation.`
};

const tests = ['beverly-hills', 'studio-city', 'encino', 'sherman-oaks'];
const noun = 'bathroom remodel';
const article = 'a';
const A = 'A';
const example = serviceExamples['Bathroom Remodel'][0];

tests.forEach(city => {
  console.log(`--- bathroom-remodel-${city} ---`);
  console.log(profiles[city](noun, example, article, A));
  console.log("");
});
