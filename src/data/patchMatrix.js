const fs = require('fs');
const path = require('path');

const matrixData = require('./matrix.json');

// Re-generate the bottom 10 cities for "General Contracting" to reach exactly 150
const allCities = [
  { name: 'West Hollywood', slug: 'west-hollywood', tier: 3 },
  { name: 'Silver Lake', slug: 'silver-lake', tier: 3 },
  { name: 'Burbank', slug: 'burbank', tier: 3 },
  { name: 'Granada Hills', slug: 'granada-hills', tier: 3 },
  { name: 'Northridge', slug: 'northridge', tier: 3 },
  { name: 'San Fernando', slug: 'san-fernando', tier: 3 },
  { name: 'Culver City', slug: 'culver-city', tier: 3 },
  { name: 'Glendale', slug: 'glendale', tier: 3 },
  { name: 'Pasadena', slug: 'pasadena', tier: 3 },
  { name: 'Eagle Rock', slug: 'eagle-rock', tier: 3 }
];

const serviceName = 'General Contracting';
const serviceSlug = 'general-contractor';
const serviceTitle = 'General Contractor in {city}, CA';

let count = 0;

allCities.forEach((city, idx) => {
  const newSlug = `${serviceSlug}-${city.slug}`;
  // Only add if not already exists
  if (!matrixData.find(m => m.slug === newSlug) && count < 10) {
    matrixData.push({
      slug: newSlug,
      title: serviceTitle.replace('{city}', city.name),
      service: serviceName,
      city: city.name,
      intro: `A general contracting project in ${city.name} is not just another renovation project—it represents a significant investment in your property's long-term value. Homeowners in ${city.name} expect premium finish levels and a builder who understands local codes perfectly. From overseeing major seismic retrofits to managing complex tear-downs, our oversight prevents costly redesigns mid-construction. Red Stag Construction brings our design-build expertise to every project we manage in the area. Call (626) 652-2303 to schedule your site visit.`
    });
    count++;
  }
});

fs.writeFileSync(path.join(__dirname, 'matrix.json'), JSON.stringify(matrixData, null, 2));
console.log(`Added ${count} pages. Total matrix pages: ${matrixData.length}`);
