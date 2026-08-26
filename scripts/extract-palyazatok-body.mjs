import fs from 'node:fs';

const html = fs.readFileSync('client-reference/palyazatok.html', 'utf8');
const start = html.indexOf('<section class="hero">');
const end = html.indexOf('<section class="close"');
const chunk = html.slice(start, end).replace(/data:image[^"']+/g, '[IMG]');
console.log(chunk);
