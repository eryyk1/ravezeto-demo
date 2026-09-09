import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const body = fs.readFileSync(path.join(__dirname, '../client-reference/felnottkepzes.body.html'), 'utf8');

function toJsx(html) {
  let jsx = html
    .replace(/class="/g, 'className="')
    .replace(/stroke-width="/g, 'strokeWidth="')
    .replace(/stroke-linecap="/g, 'strokeLinecap="')
    .replace(/stroke-linejoin="/g, 'strokeLinejoin="')
    .replace(/aria-label="/g, 'aria-label="')
    .replace(/aria-hidden="/g, 'aria-hidden="')
    .replace(/aria-selected="/g, 'aria-selected="')
    .replace(/style="margin-top:1rem"/g, 'style={{ marginTop: \'1rem\' }}')
    .replace(/style="margin-top:1.4rem"/g, 'style={{ marginTop: \'1.4rem\' }}')
    .replace(/style="margin-bottom:0"/g, 'style={{ marginBottom: 0 }}')
    .replace(/onerror="this.remove\(\)"/g, 'onError={(e) => e.currentTarget.remove()}')
    .replace(/<br>/g, '<br />')
    .replace(/<img([^>]*?)>/g, '<img$1 />')
    .replace(/href="final-kapcsolat.html"/g, 'href="/kapcsolat"')
    .replace(/href="final-adatvedelem.html"/g, 'href="/jogi/adatvedelem"')
    .replace(/href="final-impresszum.html"/g, 'href="/jogi/impresszum"')
    .replace(/href="#"/g, 'href="https://www.linkedin.com/company/ravezeto-projekt"');

  jsx = jsx.replace(/className="btn" href="/g, 'className="btn" to=');
  jsx = jsx.replace(/className="map" href="/g, 'className="map" href="');
  jsx = jsx.replace(/to="\/kapcsolat"/g, 'to="/kapcsolat"');
  jsx = jsx.replace(/to="\/jogi\/adatvedelem"/g, 'to="/jogi/adatvedelem"');
  jsx = jsx.replace(/to="\/jogi\/impresszum"/g, 'to="/jogi/impresszum"');

  return jsx;
}

console.log(toJsx(body));
