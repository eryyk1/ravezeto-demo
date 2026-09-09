import { resolveStructuredData } from '../src/seo/structuredData.ts';

const paths = ['/', '/rolunk', '/tanacsadas', '/felnottkepzes', '/referenciak', '/kapcsolat'];

for (const path of paths) {
  const data = resolveStructuredData(path, {
    team: [
      {
        id: '1',
        name: 'Teszt Tanácsadó',
        slug: 'teszt',
        role: 'Tanácsadó',
        bio: 'Teszt bio.',
        portrait: '/assets/logo.svg',
        order: 1,
        active: true,
      },
    ],
  });

  const json = JSON.stringify(data);
  JSON.parse(json);
  const graph = data['@graph'];
  if (!Array.isArray(graph) || graph.length === 0) {
    throw new Error(`Missing @graph for ${path}`);
  }
  console.log(`OK ${path} — ${graph.length} nodes`);
}

console.log('All JSON-LD payloads valid.');
