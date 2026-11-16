const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');
const DATA_DIR = path.join(SRC_DIR, 'data');
const bannedPhrases = [
  'seamlessly',
  'flawlessly',
  'transformative',
  'uncompromising',
  'commands the expertise',
  'deliver your transformation',
  'cutting-edge',
  'innovative solutions',
  'tailor-made',
  'bespoke',
  'utilize',
  'leverage',
  'robust',
  'comprehensive',
  'streamlined',
  'state-of-the-art',
  'meticulously',
  'holistic',
  'synergy',
  'paradigm',
  'unlock your potential',
  'take it to the next level',
  'game-changer',
  'best-in-class',
  'world-class',
  'top-notch',
  'second to none',
];

function walk(dir, extensions) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(fullPath, extensions));
    } else if (entry.isFile() && extensions.includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractSentence(content, index) {
  const sentenceStart = Math.max(
    content.lastIndexOf('.', index),
    content.lastIndexOf('!', index),
    content.lastIndexOf('?', index),
    content.lastIndexOf('\n', index)
  );
  const sliceStart = sentenceStart === -1 ? 0 : sentenceStart + 1;
  const sentenceEndCandidates = [
    content.indexOf('.', index),
    content.indexOf('!', index),
    content.indexOf('?', index),
    content.indexOf('\n', index),
  ].filter((value) => value !== -1);
  const sliceEnd = sentenceEndCandidates.length > 0 ? Math.min(...sentenceEndCandidates) + 1 : content.length;
  return content.slice(sliceStart, sliceEnd).replace(/\s+/g, ' ').trim();
}

const files = [
  ...walk(SRC_DIR, ['.tsx']),
  ...walk(DATA_DIR, ['.json']),
];

const findings = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lowerContent = content.toLowerCase();

  bannedPhrases.forEach((phrase) => {
    let searchIndex = 0;

    while (true) {
      const matchIndex = lowerContent.indexOf(phrase, searchIndex);
      if (matchIndex === -1) {
        break;
      }

      const lineNumber = content.slice(0, matchIndex).split('\n').length;
      findings.push({
        file: path.relative(ROOT, file),
        lineNumber,
        phrase,
        sentence: extractSentence(content, matchIndex),
      });

      searchIndex = matchIndex + phrase.length;
    }
  });
}

console.log('Copy audit report');

if (findings.length === 0) {
  console.log('No banned phrases found.');
  process.exit(0);
}

findings
  .sort((a, b) => a.file.localeCompare(b.file) || a.lineNumber - b.lineNumber || a.phrase.localeCompare(b.phrase))
  .forEach((finding) => {
    console.log(`${finding.file}:${finding.lineNumber} [${finding.phrase}] ${finding.sentence}`);
  });
