import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { htmlToJsx } from './html-to-jsx.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const PAGES = [
  {
    slug: 'fooldal',
    bodyFile: 'HomeBody.tsx',
    dir: 'home',
    css: 'client-prototype.css',
    meta: '/',
    pageFile: 'HomePage.tsx',
  },
  {
    slug: 'csapatunk',
    bodyFile: 'RolunkBody.tsx',
    dir: 'rolunk',
    css: 'rolunk.css',
    meta: '/rolunk',
    pageFile: 'RolunkPage.tsx',
  },
  {
    slug: 'tanacsadas',
    bodyFile: 'TanacsadasBody.tsx',
    dir: 'tanacsadas',
    css: 'tanacsadas.css',
    meta: '/tanacsadas',
    pageFile: 'TanacsadasPage.tsx',
  },
  {
    slug: 'felnottkepzes',
    bodyFile: 'FelnottkepzesBody.tsx',
    dir: 'felnottkepzes',
    css: 'felnottkepzes.css',
    meta: '/felnottkepzes',
    pageFile: 'FelnottkepzesPage.tsx',
    skipBody: true,
  },
  {
    slug: 'referenciak',
    bodyFile: 'ReferenciakBody.tsx',
    dir: 'referenciak',
    css: 'referenciak.css',
    meta: '/referenciak',
    pageFile: 'ReferenciakPage.tsx',
  },
  {
    slug: 'palyazatok',
    bodyFile: 'PalyazatokBody.tsx',
    dir: 'palyazatok',
    css: 'palyazatok.css',
    meta: '/palyazatok',
    pageFile: 'PalyazatokPage.tsx',
  },
  {
    slug: 'kapcsolat',
    bodyFile: 'KapcsolatBody.tsx',
    dir: 'kapcsolat',
    css: 'kapcsolat.css',
    meta: '/kapcsolat',
    pageFile: 'KapcsolatPage.tsx',
  },
  {
    slug: 'adatvedelem',
    bodyFile: 'AdatvedelemBody.tsx',
    dir: 'jogi',
    css: 'jogi.css',
    meta: '/jogi/adatvedelem',
    pageFile: 'AdatvedelemPage.tsx',
    wrapper: 'jogi',
  },
  {
    slug: 'impresszum',
    bodyFile: 'ImpresszumBody.tsx',
    dir: 'jogi',
    css: 'jogi-impresszum.css',
    meta: '/jogi/impresszum',
    pageFile: 'ImpresszumBody.tsx',
    wrapper: 'jogi',
  },
];

function needsLinkImport(jsx) {
  return jsx.includes('<Link') || jsx.includes('</Link>');
}

for (const page of PAGES) {
  if (page.skipBody) {
    console.log(`skip body generation: ${page.slug}`);
    continue;
  }

  const htmlPath = path.join(root, 'client-reference', `${page.slug}.body.html`);
  const html = fs.readFileSync(htmlPath, 'utf8');
  let jsx = htmlToJsx(html);

  if (page.slug === 'kapcsolat') {
    jsx = jsx.replace(
      /<form[\s\S]*?<\/form>/,
      '{/* FORM_SLOT */}',
    );
  }

  if (page.slug === 'palyazatok') {
    jsx = jsx.replace(
      /<form[\s\S]*?<\/form>/,
      '{/* FORM_SLOT */}',
    );
  }

  const imports = [];
  if (needsLinkImport(jsx)) {
    imports.push("import { Link } from 'react-router-dom';");
  }

  const componentName = page.bodyFile.replace('.tsx', '');
  const bodyTsx = `${imports.join('\n')}${imports.length ? '\n\n' : ''}export default function ${componentName}() {
  return (
    <>
${jsx.split('\n').map((line) => (line ? `      ${line}` : '')).join('\n')}
    </>
  );
}
`;

  const outDir = path.join(root, 'src', 'pages', page.dir);
  fs.writeFileSync(path.join(outDir, page.bodyFile), bodyTsx);

  if (page.wrapper !== 'jogi') {
    const pageTsx = `import { useMemo } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { resolvePageMeta } from '../../seo/pageMeta';
import ${componentName} from './${page.bodyFile.replace('.tsx', '')}';
import './${page.css}';

export default function ${page.pageFile.replace('.tsx', '')}() {
  const meta = useMemo(() => resolvePageMeta('${page.meta}'), []);
  usePageMeta(meta);

  return <${componentName} />;
}
`;
    fs.writeFileSync(path.join(outDir, page.pageFile), pageTsx);
  }

  console.log(`generated ${page.slug} -> ${page.bodyFile}`);
}

console.log('done');
