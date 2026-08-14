import fs from 'node:fs';

const failures = [];
const read = (name) => fs.readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const parseScripts = (html) => [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
const requireIds = (html, ids, page) => {
  for (const id of ids) {
    if (!html.includes('id="' + id + '"')) failures.push(page + ': missing required element #' + id);
  }
};
const parse = (source, label) => {
  try { new Function(source); }
  catch (error) { failures.push(label + ' does not parse: ' + error.message); }
};

const lightweight = read('drill_room.html');
requireIds(lightweight, ['problem', 'duration', 'startPause', 'resetTimer', 'code', 'notes', 'copyCode', 'copyAll', 'newSession', 'sound', 'saveStatus'], 'drill_room.html');
const lightweightScripts = parseScripts(lightweight);
if (lightweightScripts.length !== 1) {
  failures.push('drill_room.html: expected one inline script, found ' + lightweightScripts.length);
} else {
  parse(lightweightScripts[0][1], 'drill_room.html inline JavaScript');
}
if (/<script\b[^>]*\bsrc=/i.test(lightweight)) failures.push('drill_room.html: external scripts are not allowed');
if (!lightweight.includes("var INDENT = '    ';")) failures.push('drill_room.html: editor indentation must remain four spaces');
if (!lightweight.includes("var STORAGE_KEY = 'drill-room.session.v1';")) failures.push('drill_room.html: unexpected storage key');

const compiler = read('drill_room_compiler.html');
requireIds(compiler, ['problem', 'description', 'solutionEditor', 'testsEditor', 'notes', 'duration', 'startPause', 'resetTimer', 'runTests', 'stopRun', 'resetTests', 'copyCode', 'copyFailures', 'newSession', 'runtimeStatus', 'structuredResults', 'rawResults'], 'drill_room_compiler.html');
const compilerScripts = parseScripts(compiler);
if (compilerScripts.length !== 2) {
  failures.push('drill_room_compiler.html: expected worker and app scripts, found ' + compilerScripts.length);
} else {
  parse(compilerScripts[0][1], 'drill_room_compiler.html worker JavaScript');
  parse(compilerScripts[1][1], 'drill_room_compiler.html app JavaScript');
}
if (/<script\b[^>]*\bsrc=/i.test(compiler)) failures.push('drill_room_compiler.html: scripts must remain embedded');
if (!compiler.includes('https://cdn.jsdelivr.net/pyodide/v0.26.3/full/')) failures.push('drill_room_compiler.html: Pyodide CDN must be pinned');
if (!compiler.includes('var STORAGE_KEY="drill-room.compiler.v1"')) failures.push('drill_room_compiler.html: unexpected storage key');
if (!compiler.includes('TIMEOUT=3000')) failures.push('drill_room_compiler.html: execution timeout must remain three seconds');
if (!compiler.includes('worker.postMessage({type:"run"')) failures.push('drill_room_compiler.html: test execution contract is missing');

if (failures.length) {
  console.error('Drill Room validation failed:\n');
  failures.forEach((failure) => console.error('- ' + failure));
  process.exit(1);
}
console.log('Drill Room validation passed.');
