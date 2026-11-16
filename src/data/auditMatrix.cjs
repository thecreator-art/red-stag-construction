const fs = require('fs');

const matrix = JSON.parse(fs.readFileSync('src/data/matrix.json', 'utf8'));

const topServices = [
  { prefix: "kitchen-remodel", name: "Kitchen Remodeling" },
  { prefix: "bathroom-remodel", name: "Bathroom Remodeling" },
  { prefix: "adu-contractor", name: "ADU Construction" },
  { prefix: "custom-home-builder", name: "Custom Home Build" },
  { prefix: "home-addition", name: "Home Addition" }
];

const cities = ["Beverly Hills", "Bel Air", "Hidden Hills", "Pacific Palisades", "Malibu", "Brentwood", "Manhattan Beach", "Santa Monica", "West Hollywood", "Silver Lake", "Studio City", "Sherman Oaks", "Encino", "Calabasas", "Tarzana", "Woodland Hills", "Burbank", "Granada Hills", "Northridge", "San Fernando"];

const counts = {};
topServices.forEach(s => counts[s.prefix] = []);

matrix.forEach(m => {
  topServices.forEach(s => {
    if (m.slug.startsWith(s.prefix + '-')) {
      counts[s.prefix].push(m.city);
    }
  });
});

let missingService = null;

console.log("--- Matrix Audit ---");
topServices.forEach(s => {
  console.log(`${s.prefix}: ${counts[s.prefix].length} cities found`);
  if (counts[s.prefix].length < 20) {
    missingService = s;
    const missingCities = cities.filter(c => !counts[s.prefix].includes(c));
    console.log(`  -> Missing all cities for ${s.prefix}!`);
  }
});

// Since the generator already exists in generateMatrix.js, we can also extract the template from an existing service
// and replicate it for the missing one.

if (missingService) {
  console.log("\nFound missing service:", missingService.prefix);
  
  // We'll generate the missing 20 using the same logic. Let's find an existing service to copy the template.
  const templateObjects = matrix.filter(m => m.slug.startsWith('kitchen-remodel-'));
  
  const newRecords = templateObjects.map(t => {
    // Clone
    let n = JSON.parse(JSON.stringify(t));
    n.slug = n.slug.replace('kitchen-remodel', missingService.prefix);
    n.title = n.title.replace('Kitchen Remodeling', missingService.name).replace('Kitchen Remodel', missingService.name);
    n.service = missingService.name;
    // Tweak intro to match
    n.intro = n.intro.replace(/kitchen/gi, missingService.name.toLowerCase());
    return n;
  });

  const updatedMatrix = [...matrix, ...newRecords];
  fs.writeFileSync('src/data/matrix.json', JSON.stringify(updatedMatrix, null, 2));
  console.log(`\nSuccessfully injected 20 new records. New total records: ${updatedMatrix.length}`);
}
