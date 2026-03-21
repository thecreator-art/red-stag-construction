const fs = require('fs');
const path = require('path');

const slugs = [
  "kitchen-remodel-beverly-hills",
  "kitchen-remodel-sherman-oaks",
  "bathroom-remodel-encino",
  "adu-contractor-studio-city",
  "general-contractor-bel-air"
];

const basePath = path.join(__dirname, '.next', 'server', 'app');

slugs.forEach(slug => {
  const filePath = path.join(basePath, `${slug}.html`);
  if (!fs.existsSync(filePath)) {
    console.log(`FILE NOT FOUND: ${filePath}`);
    return;
  }
  
  const html = fs.readFileSync(filePath, 'utf-8');
  
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/);
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/);
  
  console.log(`\n--- URL: /${slug} ---`);
  console.log('TITLE:', titleMatch ? titleMatch[1] : 'NOT FOUND');
  console.log('DESC:', descMatch ? descMatch[1] : 'NOT FOUND');
  console.log('CANONICAL:', canonicalMatch ? canonicalMatch[1] : 'NOT FOUND');
  console.log('H1:', h1Match ? h1Match[1] : 'NOT FOUND');
});
