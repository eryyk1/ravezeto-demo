import { teamPhotos2025 } from '../data/media';

/**
 * Active team — source: live https://ravezeto.hu/csapatunk/ + 2025-02-20 posts in backup SQL
 * Portraits: 2025/02 MG_* shoot (mirrored from wp-content/uploads)
 */

export type TeamMember = {
  id: number;
  name: string;
  slug: string;
  bio: string;
  portrait: string;
  portraitPosition?: string;
  featured?: boolean;
};

export const teamMembers: TeamMember[] = [
  {
    id: 794,
    name: 'Ríz Ádám CMC',
    slug: 'riz-adam-cmc',
    bio: '16 éve dolgozom tanácsadóként, nagyon szeretem a munkámat. Öröm tanácsadással fejleszteni azt a vállalatot, amely emberközpontú fejlesztésekben gondolkodik, és igyekszik a munkahelyi hétköznapokat jobbá tenni. Mert tényleg megéri.',
    portrait: teamPhotos2025['riz-adam-cmc'],
    portraitPosition: 'center 18%',
    featured: true,
  },
  {
    id: 800,
    name: 'Berta Anikó',
    slug: 'berta-aniko',
    bio: '2018 óta foglalkozom felnőttképzések szervezésével és lebonyolításával. A képzési folyamatot a tervezéstől a megvalósításig végigkísérem, ügyelve arra, hogy a programok az ügyfelek valós igényeire épüljenek, szakmailag magas színvonalúak legyenek, és minden jogszabályi előírásnak megfeleljenek.',
    portrait: teamPhotos2025['berta-aniko'],
    portraitPosition: 'center 12%',
  },
  {
    id: 797,
    name: 'Bíró Gabriella',
    slug: 'biro-gabriella',
    bio: '1992-től dolgozom szervezetfejlesztés területén. 1989-ben megismerkedtem az OD szervezetfejlesztés módszerével, azóta közreműködtem szervezeti kultúraváltás folyamataiban, vezettem tréningeket, workshopokat, és szervezeti folyamatok fejlesztése részeként coachként dolgoztam vezetőkkel. A kulturális antropológia területén szerzett ismereteimet törekszem alkalmazni, szemlélődöm, tanulok és értelmezek.',
    portrait: teamPhotos2025['biro-gabriella'],
    portraitPosition: 'center 20%',
  },
  {
    id: 803,
    name: 'Soós Andrea',
    slug: 'soos-andrea',
    bio: 'A korábbi munkahelyeken szerzett változatos tapasztalatokat felhasználva a cég operatív vezetésében veszek részt. A projektek menedzsmentjén felül azért is felelek, hogy a cég pénzügyei rendben legyenek. Számomra fontos, hogy a minőségi munkavégzés kiemelt szempont a Rávezetőnél, ami együtt jár az ügyfeleink és a velünk együtt dolgozó szakértők elégedettségével.',
    portrait: teamPhotos2025['soos-andrea'],
    portraitPosition: 'center 15%',
  },
  {
    id: 806,
    name: 'Szőke Ádám',
    slug: 'szoke-adam',
    bio: 'A Rávezetőben elsősorban szervezetfejlesztési projekteken dolgozom tanácsadóként, amelyben nagy segítséget nyújt a korábban 9 év alatt szerzett vezetői tapasztalatom egy felsőoktatási intézményben. Rendszergondolkodásom, empátiám kiegészült a szervezetfejlesztés képzésen szerzett strukturált ismeretekkel, amelyeket még tovább bővítve igyekszem több szemszögből és eszközzel megközelíteni az egyéni-, csoportos- és szervezeti problémákat.',
    portrait: teamPhotos2025['szoke-adam'],
    portraitPosition: 'center 22%',
  },
];
