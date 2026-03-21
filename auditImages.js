const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');
const IMAGE_BLOCK_REGEX = /<Image\b[\s\S]*?(?:\/>|<\/Image>)/g;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }

  return files;
}

function getLineNumber(content, index) {
  return content.slice(0, index).split('\n').length;
}

function isEmptyAlt(block) {
  const literalAlt = block.match(/\balt\s*=\s*["']([^"']*)["']/);
  if (literalAlt) {
    return literalAlt[1].trim().length === 0;
  }

  const expressionAlt = block.match(/\balt\s*=\s*\{\s*["'`]([^"'`]*)["'`]\s*\}/);
  if (expressionAlt) {
    return expressionAlt[1].trim().length === 0;
  }

  return false;
}

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const findings = [];
  const matches = [...content.matchAll(IMAGE_BLOCK_REGEX)];

  matches.forEach((match, index) => {
    const block = match[0];
    const line = getLineNumber(content, match.index || 0);
    const issues = [];
    const aboveFold = index < 2 || line <= 120;

    if (!/\balt\s*=/.test(block)) {
      issues.push('missing alt prop');
    } else if (isEmptyAlt(block)) {
      issues.push('empty alt prop');
    }

    if (!/\bsizes\s*=/.test(block)) {
      issues.push('missing sizes prop');
    }

    if (aboveFold && !/\bpriority\b/.test(block)) {
      issues.push('missing priority prop for likely above-the-fold image');
    }

    const usesFill = /\bfill\b/.test(block);
    if (!usesFill) {
      if (!/\bwidth\s*=/.test(block)) {
        issues.push('missing width prop');
      }
      if (!/\bheight\s*=/.test(block)) {
        issues.push('missing height prop');
      }
    }

    if (issues.length > 0) {
      findings.push({
        file: path.relative(ROOT, filePath),
        line,
        issues,
      });
    }
  });

  return findings;
}

const files = walk(SRC_DIR);
const findings = files.flatMap(auditFile);

console.log('Image audit report');
console.log(`Scanned ${files.length} TSX files.`);

if (findings.length === 0) {
  console.log('No image audit findings.');
  process.exit(0);
}

findings.forEach((finding) => {
  console.log(`${finding.file}:${finding.line} - ${finding.issues.join('; ')}`);
});
