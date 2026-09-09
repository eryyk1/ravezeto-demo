export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_BY_PATH: Record<string, readonly FaqItem[]> = {
  '/': [
    {
      question: 'Mivel foglalkozik a Rávezető Projekt Kft.?',
      answer:
        'Szervezetfejlesztéssel, vezetői tanácsadással, változásmenedzsmenttel és engedélyezett felnőttképzéssel segítjük a magyar vállalatokat 2008 óta.',
    },
    {
      question: 'Milyen formában dolgoznak ügyfeleikkel?',
      answer:
        'Tanácsadás, tréning, coaching és pályázati képzési projektek formájában, jelenléti és online megoldásokkal, vállalatra szabva.',
    },
  ],
  '/palyazatok': [
    {
      question: 'Milyen pályázati képzéseket támogat a Rávezető Projekt Kft.?',
      answer:
        'A GINOP Plusz 3.2.1-21 felhívás keretében vezetői, kommunikációs és stresszkezelési képzéseket állítunk össze cégre szabott portfólióként.',
    },
    {
      question: 'Hogyan indul a pályázati együttműködés?',
      answer:
        'Díjmentes konzultációval kezdünk, majd segítünk a képzési portfólió összeállításában, a benyújtásban és a megvalósításban.',
    },
  ],
  '/felnottkepzes': [
    {
      question: 'Engedélyes felnőttképző intézmény a Rávezető?',
      answer:
        'Igen. Nyilvántartásba vételi számunk B/2020/001943, engedélyszámunk E/2021/000106.',
    },
    {
      question: 'Milyen képzési formák érhetők el?',
      answer:
        'Jelenléti tréningek, e-learning tananyag, online tréning elemek és szervezeti modulok kombinációjával dolgozunk.',
    },
    {
      question: 'Van mesterséges intelligencia képzésük?',
      answer:
        'Igen, engedélyezett, 16 órás „Mesterséges intelligencia alapjai” akkreditált programunk is elérhető vállalati csoportok számára.',
    },
  ],
  '/tanacsadas': [
    {
      question: 'Kinek szól a Rávezető tanácsadási szolgáltatása?',
      answer:
        'Vezetőknek és szervezeteknek, akik emberközpontú megközelítéssel szeretnék támogatni a változást, a csapatok fejlődését és a működés javítását.',
    },
  ],
  '/kapcsolat': [
    {
      question: 'Hogyan lehet kapcsolatba lépni a Rávezető Projekt Kft.-vel?',
      answer:
        'Telefonon, e-mailben vagy személyesen a 1146 Budapest, Izsó u. 7. 1/3. címen, hétköznap 9 és 16 óra között.',
    },
  ],
};

export function resolveFaqForPath(pathname: string): readonly FaqItem[] {
  const path =
    pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;

  if (FAQ_BY_PATH[path]) {
    return FAQ_BY_PATH[path];
  }

  if (path.startsWith('/tanacsadas')) {
    return FAQ_BY_PATH['/tanacsadas'] ?? [];
  }

  if (path.startsWith('/felnottkepzes')) {
    return FAQ_BY_PATH['/felnottkepzes'] ?? [];
  }

  return [];
}
