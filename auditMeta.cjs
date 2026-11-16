const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, 'src', 'app');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      files.push(fullPath);
    }
  }

  return files;
}

function extractFirstStringValue(content, key) {
  const metadataBlockMatch =
    content.match(/export\s+const\s+metadata\s*=\s*\{([\s\S]*?)\};/) ||
    content.match(/generateMetadata[\s\S]*?if\s*\([^)]*\)\s*return\s*\{([\s\S]*?)\};/);
  const generateMetadataIndex = content.indexOf('generateMetadata');
  const source = metadataBlockMatch
    ? metadataBlockMatch[1]
    : generateMetadataIndex !== -1
      ? content.slice(generateMetadataIndex)
      : content;
  const patterns = [
    new RegExp(`${key}\\s*:\\s*['"]([^'"]+)['"]`),
    new RegExp(key + '\\s*:\\s*`([^`]+)`'),
  ];

  for (const pattern of patterns) {
    const match = source.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

function extractMetadataSource(content) {
  const metadataBlockMatch =
    content.match(/export\s+const\s+metadata\s*=\s*\{([\s\S]*?)\};/) ||
    content.match(/generateMetadata[\s\S]*?if\s*\([^)]*\)\s*return\s*\{([\s\S]*?)\};/);
  const generateMetadataIndex = content.indexOf('generateMetadata');

  if (metadataBlockMatch) {
    return metadataBlockMatch[1];
  }

  if (generateMetadataIndex !== -1) {
    return content.slice(generateMetadataIndex);
  }

  return content;
}

function getRouteKeyword(filePath) {
  const relativeDir = path.relative(APP_DIR, path.dirname(filePath));
  if (!relativeDir || relativeDir === '.') {
    return '';
  }

  const segment = relativeDir
    .split(path.sep)
    .find((part) => part !== 'app' && !part.startsWith('(') && !part.startsWith('['));

  return (segment || '').replace(/-/g, ' ').trim();
}

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const findings = [];
  const metadataSource = extractMetadataSource(content);
  const hasMetadataExport =
    /export\s+const\s+metadata\b/.test(content) ||
    /export\s+(async\s+)?function\s+generateMetadata\b/.test(content);
  const usesGenerateMetadata = /export\s+(async\s+)?function\s+generateMetadata\b/.test(content);

  if (!hasMetadataExport) {
    findings.push('missing metadata export or generateMetadata');
  }

  const title = extractFirstStringValue(metadataSource, 'title');
  const description = extractFirstStringValue(metadataSource, 'description');
  const routeKeyword = getRouteKeyword(filePath);

  if (usesGenerateMetadata) {
    if (!/title\s*:/.test(metadataSource)) {
      findings.push('missing title');
    }
    if (!/description\s*:/.test(metadataSource)) {
      findings.push('missing description');
    }
  } else {
    if (!title) {
      findings.push('missing title');
    } else {
      if (title.length > 65) {
        findings.push(`title too long (${title.length} chars)`);
      }

      if (
        !title.toLowerCase().includes('red stag') &&
        routeKeyword &&
        !title.toLowerCase().includes(routeKeyword.toLowerCase())
      ) {
        findings.push('title missing Red Stag or primary keyword');
      }
    }

    if (!description) {
      findings.push('missing description');
    } else if (description.length >= 160) {
      findings.push(`description too long (${description.length} chars)`);
    }
  }

  return findings.length > 0
    ? {
        file: path.relative(ROOT, filePath),
        findings,
      }
    : null;
}

const files = walk(APP_DIR);
const findings = files.map(auditFile).filter(Boolean);

console.log('Metadata audit report');
console.log(`Scanned ${files.length} page files.`);

if (findings.length === 0) {
  console.log('No metadata audit findings.');
  process.exit(0);
}

findings.forEach((finding) => {
  console.log(`${finding.file} - ${finding.findings.join('; ')}`);
});
