/** /mentally — backup: template-mentally.php + homeMentally */

export const mentallyHero = {
  label: 'Mentally',
  title: 'Egészséges munkatársak\n= versenyképes vállalat',
  intro:
    'A Mentally egy tudományos alapokon nyugvó online mérőeszköz, amely azonnali személyes visszajelzést ad minden munkavállalónak, miközben átfogó képet nyújt a vezetőknek a vállalat állapotáról.',
} as const;

export const mentallyThoughts = [
  'Senki nem vállalja a felelősséget a hibákért…',
  'Már megint felmondott egy kulcsemberünk…',
  'Hiába emeltünk fizetést, még mindig magas a fluktuáció…',
  'Valamit nagyon rosszul csinálunk, de nem tudom, hogy mit…',
] as const;

export const mentallyFeatures = [
  {
    title: 'Azonnali visszajelzés',
    text: 'Minden munkavállaló személyes, anonim visszajelzést kap a szervezeten belüli helyzetéről.',
    icon: '/assets/illustrations/illust_empx_1.svg',
  },
  {
    title: 'Vezetői áttekintés',
    text: 'A vezetők átfogó képet kapnak a vállalat állapotáról, a fejlesztendő területekről.',
    icon: '/assets/illustrations/illust_empx_2.svg',
  },
  {
    title: 'Tudományos alapok',
    text: 'Validált mérőeszköz, amely a szervezeti egészség és a mentális jólét dimenzióit vizsgálja.',
    icon: '/assets/illustrations/illust_empx_3.svg',
  },
  {
    title: 'Fejlesztési irányok',
    text: 'Segít azonosítani, hol van a legnagyobb fejlesztési potenciál — nem sablonos válaszokkal.',
    icon: '/assets/illustrations/illust_empx_4.svg',
  },
] as const;

export const mentallyCta = {
  title: 'Tegyen csapata mentális egészségéért!',
  text: 'Kérjen személyes konzultációt tanácsadóinktól.',
  cta: 'Kapcsolatfelvétel',
  link: '/kapcsolat',
} as const;
