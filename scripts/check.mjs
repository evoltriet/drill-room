import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const failures = [];

const requiredIds = [
  'problem',
  'duration',
  'startPause',
  'resetTimer',
  'code',
  'notes',
  'copyCode',
  'copyAll',
  'newSession',
  'sound',
  'saveStatus'
];

for (const id of requiredIds) {
  if (!html.includes(`id="${id}"`)) failures.push(`Missing required element #${id}`);
}

const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
if (scripts.length !== 1) {
  failures.push(`Expected one inline script, found ${scripts.length}`);
} else {
  try {
    new Function(scripts[0][1]);
  } catch (error) {
    failures.push(`Inline JavaScript does not parse: ${error.message}`);
  }
}

if (/<script\b[^>]*\bsrc=/i.test(html)) failures.push('External scripts are not allowed');
if (!html.includes("var INDENT = '    ';")) failures.push('Editor indentation must remain four spaces');
if (!html.includes("var STORAGE_KEY = 'drill-room.session.v1';")) failures.push('Unexpected storage key');
if (html.includes('Copy for Claude')) failures.push('Copy action must remain provider-neutral');

if (failures.length > 0) {
  console.error('Drill Room validation failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Drill Room validation passed.');
