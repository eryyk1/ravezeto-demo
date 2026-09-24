/** /felnottkepzes — source: live https://www.ravezeto.hu/felnottkepzesek/ */

import { company } from './company';
import { pageImage } from '../data/media';

export const felnottkepzesHero = {
  label: 'Felnőttképzés',
  titleLead:
    'Minőségi képzéseink segítségével fejlesztjük a XXI. század munkahelyi',
  titleMark: 'kulcskompetenciáit!',
  awardLine: 'Az év trénerei is nálunk dolgoznak',
  image: pageImage('felnottkepzes', 'fk-terem.png'),
  imageAlt: 'Tusrajz: tréner a flipchartnál, félkörben ülő résztvevők',
} as const;

export const felnottkepzesMethodTags = [
  'Jelenléti tréningek',
  'E-learning tananyag',
  'Online tréning elemek',
  'Szervezeti modul',
  'Follow up szolgáltatások',
] as const;

export const felnottkepzesKeyMessage = {
  label: 'Felnőttképzés',
  title:
    'A munkatársi kiválóság mellett a szervezeti működés fejlesztésében is segítenek a kompetenciafejlesztő képzések',
  text:
    'Képzési programjaink sosem „dobozos” termékek, változatos oktatás-módszertani megoldásokkal biztosítjuk a képzések jobb hasznosulását.',
} as const;

export const felnottkepzesCredentials = {
  paragraphs: [
    'A mai, mesterséges intelligencia által gyorsan formált üzleti környezetben a technológiai tudás mellett a humán készségek értékelődnek fel igazán. Gyakorlatias soft skill- és AI-képzéseket tartunk, amelyekkel segítünk, hogy a vezetők és munkatársak hatékonyabban és felelősen használják a mesterséges intelligencia eszközeit, ezáltal gyorsabban végezzék munkájukat.',
    'Programjaink révén a résztvevők azokat a kritikus gondolkodási, kommunikációs és adaptációs képességeket is elsajátíthatják, amelyek elengedhetetlenek a jövőálló vállalati működéshez. Fejlessze csapatát velünk, és alakítsa versenyelőnnyé a technológia és az emberi tényező szinergiáját!',
    'Tréneri csapatunk sokéves tereptapasztalata, kiemelkedő szakmai tudása garantálja, hogy közvetlen, felszabadolt légkörben zajló tréningjeink a lehető legjobban szolgálják a megfogalmazott képzési célokat.',
  ],
} as const;

export const felnottkepzesReg = {
  registration: 'Nyilvántartásba vételi számunk: B/2020/001943',
  license: 'Engedélyszámunk: E/2021/000106',
} as const;

export const felnottkepzesMotto =
  'A munkahelyek legnagyobb kihívása gyakran a hatékony kommunikáció és a csapatmunka hiánya. Célunk, hogy résztvevőink olyan készségeket sajátítsanak el, amelyek révén sikeresen navigálhatnak a munkahelyi kihívások között.';

export const felnottkepzesCategories = [
  {
    id: 'kommunikacio',
    index: '01',
    title: 'Kommunikációs készségfejlesztés',
    text: 'A világ folyamatosan változik, ahogyan a kommunikációs módszerek is. Részletesen foglalkozunk az aktív hallgatás, az érzelmi intelligencia és a hatékony visszajelzés technikáival, hogy a résztvevők magabiztosan tudják kifejezni gondolataikat és érzéseiket.',
    visual: '/assets/illustrations/illust_inner_courses.svg',
  },
  {
    id: 'vezetoi',
    index: '02',
    title: 'Vezetői skillek fejlesztése',
    text: 'A sikeres vezetés kulcsa a megfelelő eszközök és ismeretek birtoklása. Képzésünk során a résztvevők megismerkednek a különböző vezetési stílusokkal és azok alkalmazásával, valamint a konfliktuskezelési és döntéshozatali technikákkal.',
    visual: '/assets/illustrations/illust_coaching.svg',
  },
  {
    id: 'generaciok',
    index: '03',
    title: 'Generációk közötti együttműködés',
    text: 'Képzésünk segít az eltérő korú munkatársak közötti hatékony kommunikáció, megértés és együttműködés kialakításában. A különböző életkorú munkavállalók más-más munkastílust, technológiai tudást és tapasztalatokat hoznak a munkahelyre, ami kihívásokat jelenthet a mindennapi együttműködés során. Célunk, hogy a különböző generációk közötti szakadékot áthidaljuk, és elősegítsük a kölcsönös tiszteleten alapuló, eredményes munkakapcsolatokat.',
    visual: '/assets/illustrations/illust_inner_hrdevelopment.svg',
  },
  {
    id: 'stressz',
    index: '04',
    title: 'Munkahelyi stressz – stresszkezelési technikák',
    text: 'A munkahelyi stressz napjaink egyik legnagyobb kihívása. A mentális egészség megőrzése érdekében tréningjeinken a résztvevők megismerkednek a stresszforrások azonosításának módszereivel és elsajátítják azokat a gyakorlati technikákat, amelyekkel képesek lesznek tudatosan kezelni a kihívásokat, hogyan őrizhetik meg lelki egyensúlyukat és növelhetik teljesítőképességüket a mindennapi munka során.',
    visual: '/assets/illustrations/illust_stress.svg',
  },
] as const;

export const felnottkepzesProcess = {
  label: 'Folyamat',
  title: 'Hogyan dolgozunk?',
  lead:
    'A fejlesztési és képzési igények meghatározását, illesztését és megvalósítását vállalatra szabva, ügyfeleink igényei és meglévő tudásszintje figyelembevételével végezzük.',
  steps: [
    {
      id: 'igeny',
      step: '01',
      title: 'Igényfeltárás',
      text: 'A fejlesztési és képzési igények meghatározása — ügyfeleink céljai és meglévő tudásszintje alapján.',
    },
    {
      id: 'illesztes',
      step: '02',
      title: 'Illesztés és tervezés',
      text: 'A képzési igények illesztése és megvalósításának tervezése vállalatra szabva.',
    },
    {
      id: 'tananyag',
      step: '03',
      title: 'Tananyagfejlesztés',
      text: 'Ennek szerves része a tananyagfejlesztés is — a vállalat kontextusához igazítva.',
    },
    {
      id: 'megvalositas',
      step: '04',
      title: 'Megvalósítás',
      text: 'Jelenléti tréningek, e-learning tananyag, online tréning elemek és szervezeti modul alkalmazása.',
    },
    {
      id: 'followup',
      step: '05',
      title: 'Follow-up',
      text: 'Follow up szolgáltatások a képzések jobb hasznosulásáért.',
    },
  ],
} as const;

export const felnottkepzesProgrammeGroups = [
  {
    id: 'munkavallaloi',
    filterCode: 'mv',
    tab: 'Munkavállalói kompetenciák fejlesztése',
    index: '01',
    title: 'Munkavállalói kompetenciák fejlesztése',
    items: [
      {
        title: 'Időgazdálkodás',
        description:
          'Ismerős érzés, hogy a sürgős és fontos feladatok halmozódása miatt egyikkel sem sikerül igazán haladni? Segítünk megérteni, mi történik bennünk a sürgetés és a befejezetlen munka hatására, és választ adunk arra, hogyan érdemes priorizálni, mikor és hogyan lehet nemet mondani, valamint milyen technikákkal használható fel a leghatékonyabban a rendelkezésre álló idő.',
      },
      {
        title: 'Komplex kommunikációs készségek fejlesztése',
        description:
          'Segítünk bővíteni az eredményes személyes kommunikációs készségekhez tartozó ismereteket! Fejlesztjük a kommunikációs készségtárat, hogy a munkavégzés színterein hatékonyabbá váljon a feladatvégzés, a munkahelyi kapcsolatok kiépítése. Ezáltal változik a munkahelyi viselkedéskultúra, az együttműködés és a közös problémamegoldás.',
      },
      {
        title: 'Konfliktuskezelés',
        description:
          'A konfliktusok felismerése és hatékony kezelése, valamint a nyertes-nyertes megoldások kialakítása kulcsfontosságú a sikeres együttműködéshez. Az elméleti alapok mellett gyakorlati tapasztalatot is adunk ehhez, emellett segítünk tudatosítani a saját stresszreakciókat, bővítjük a stresszkezelési eszköztárat, és fejlesztjük a változásokhoz való rugalmas alkalmazkodás képességét.',
      },
      {
        title: 'Sikeres szervezeti együttműködés és kommunikáció a gyakorlatban',
        description:
          'A hatékony munkahelyi kommunikáció és együttműködés nemcsak az eredményesebb munkavégzést, hanem a jó munkahelyi légkört is megalapozza. Ehhez adunk a gyakorlatban is alkalmazható kommunikációs és tárgyalástechnikai eszközöket, amelyeket a résztvevők a saját munkakörnyezetükben is hasznosítani tudnak.',
      },
      {
        title: 'Szervezeti és generációk közötti együttműködés fejlesztése',
        description:
          'A szervezetek sikere nagyban múlik azon, hogy a különböző csapatok, területek és generációk milyen hatékonyan tudnak együtt dolgozni egy közös cél érdekében. Feltárjuk a szervezeti és generációs különbségekből fakadó együttműködési nehézségeket, és olyan közös nyelvet, gyakorlati eszközöket adunk a résztvevők kezébe, amelyekkel erősíthető a kölcsönös megértés és a hatékony, összehangolt munkavégzés.',
      },
      {
        title: 'Üzleti kapcsolattartás és kommunikáció',
        description:
          'Olyan helyzetekre kínálunk megoldást, mint a nemet mondás nehézségei, a meggyőző fellépés kialakítása vitahelyzetekben, valamint a testbeszéd, a kommunikációs stílus és az artikuláció tudatosabb használata. Mindezekkel azt a hatékony, átgondolt kommunikációt erősítjük, amely az eredményes együttműködés egyik alapfeltétele.',
      },
    ],
  },
  {
    id: 'stressz',
    filterCode: 'st',
    tab: 'Vállalati stresszmenedzsment',
    index: '02',
    title: 'Vállalati stresszmenedzsment',
    items: [
      {
        title: 'A stressz és én',
        description:
          'Megismertetjük a stressz fogalmát, biológiáját és fiziológiáját, valamint a stresszel való megküzdés személyes eszközeit. Segítünk azonosítani a munkahelyi stresszfaktorokat, bemutatjuk a különböző megküzdési stratégiákat és a kiégés jelenségét, majd segítünk elsajátítani a különböző stresszkezelési technikákat.',
      },
      {
        title: 'Mentálhigiéné és lelki egészségvédelem',
        description:
          'Az önismeret fejlesztésével és a mentális egészség megőrzését szolgáló módszerek bemutatásával segítünk hatékonyabban kezelni a mindennapi élet lelki kihívásait. Külön figyelmet szentelünk a társas támogatás és a kapcsolati háló szerepére, amely mind a munkahelyi, mind a magánéleti lelki egészség megőrzésében fontos szerepet játszik.',
      },
    ],
  },
  {
    id: 'vezetoi',
    filterCode: 've',
    tab: 'Vezetőfejlesztés',
    index: '03',
    title: 'Vezetőfejlesztés',
    items: [
      {
        title: 'Menedzseri szemlélet a vezetői munkában',
        description:
          'Ahhoz, hogy egy vezető eredményesen és hatékonyan tudja ellátni a rábízott feladatokat, egy kicsit menedzserré is kell válnia. Fejlesztjük a vezetői készségeket: erősítjük a menedzseri szemléletmódot, az együttműködési készséget és a kapcsolódó kompetenciákat, valamint javítjuk a problémamegoldó készséget.',
      },
      {
        title: 'Tudatosság és társas készségek a vezetésben tréning',
        description:
          'A vezetői szerep hatékony betöltéséhez elengedhetetlen a feladatok és kompetenciák tudatos ismerete, valamint a problémamegoldás komplex szemlélete. Bemutatjuk a problémafelvető és -elemző módszereket, döntéshozatali gyakorlatokon keresztül fejlesztjük a résztvevők képességeit, és megismertetjük velük a projektszemléletet.',
      },
      {
        title: 'Vezetői kompetenciák fejlesztése',
        description:
          'Az üzleti, piaci szemléletmód tudatos kialakítása és gyakorlása kulcsfontosságú a hatékony vezetői működéshez. Élményszerű tanulással és vezetői helyzetgyakorlatok segítségével fejlesztjük a résztvevőket olyan területeken, mint a szervezeti célok és kultúra képviselete, az időgazdálkodás, a változáskezelés, valamint a tárgyalási és érdekérvényesítési készségek.',
      },
      {
        title: 'Tudatos vezetői működés fejlesztése',
        description:
          'Milyen a jó vezető? Tudatában van saját szerepének és felelősségének, komplex módon képes értelmezni és megoldani a felmerülő problémákat, és megalapozott döntéseket hoz. Segítünk tudatosítani a vezetői funkciókat, és fejlesztjük a vezetői szerepteljesítményt.',
      },
    ],
  },
  {
    id: 'mentori',
    filterCode: 'me',
    tab: 'Mentori kompetenciák',
    index: '04',
    title: 'Mentori kompetenciák',
    items: [
      {
        title: 'Munkahelyi mentorok képzése',
        description:
          'Korunk mentorai olyan tapasztaltabb munkatársak, akik kevésbé rutinos kollégáikat segítik szakmai fejlődésükben. A mentori kapcsolat sikere a személyes viszonyon, a harmonikus együttműködésen múlik, ezért a mentori szerephez szükséges kompetenciák és kommunikációs eszközök fejlesztésével készítjük fel a résztvevőket erre a feladatra.',
      },
    ],
  },
  {
    id: 'digitalis',
    filterCode: 'di',
    tab: 'Digitális kompetenciák',
    index: '05',
    title: 'Digitális kompetenciák',
    items: [
      {
        title: 'Irodai Office alapok',
        description:
          'Megmutatjuk a Word, Excel és PowerPoint alapjait, valamint az internet és az e-mail magabiztos kezelését is. Emellett bepillantást adunk további modern digitális eszközök használatába is.',
      },
      {
        title: 'Haladó Irodai Office',
        description:
          'A képzés végére a résztvevők magabiztosan készítenek majd professzionális, többoldalas dokumentumokat, összetett táblázatokat, kimutatásokat és vizuálisan igényes prezentációkat. Emellett megismerik azokat a digitális eszközöket is, amelyek tudatos használatával hatékonyabbá tehető a mindennapi irodai munka.',
      },
      {
        title: 'Mesterséges intelligencia alapjai',
        description:
          'Segítünk felfedezni a mesterséges intelligencia világát, és példákkal megmutatni, hogyan használható hatékony munkatársként a mindennapokban – gyakorlati tudással, magabiztos AI-kommunikációval.',
      },
      {
        title: 'AI alkalmazási lehetőségei üzleti folyamatokban',
        description:
          'Megmutatjuk, hogyan építhető be az AI a mindennapi üzleti folyamatokba, és hogyan növelhető vele a hatékonyság. Olyan szemléletet adunk, amellyel a résztvevők magabiztosan felismerik a saját munkájukban rejlő AI-lehetőségeket.',
      },
      {
        title: 'AI támogatás a vezetői munkában',
        description:
          'Hogyan segítheti az AI a vezetői döntéshozatalt, a csapatirányítást és a napi feladatok hatékonyabb szervezését? Erre adunk választ olyan gyakorlati eszközökkel, amelyekkel időt és energiát lehet megtakarítani.',
      },
    ],
  },
] as const;

export const felnottkepzesProgrammeCta = {
  label: 'Kapcsolatfelvétel',
  link: '/kapcsolat',
} as const;

export const felnottkepzesContact = {
  customerService: {
    title: 'Ügyfélszolgálat',
    address: company.address,
    hours: company.hours,
  },
  office: {
    title: 'Irodánk',
    address: company.address,
    note: '6. kapucsengő',
    mapUrl: company.mapsSearch,
  },
} as const;

export const felnottkepzesCta = {
  kicker: 'Kapcsolat',
  title: 'Képezzük együtt csapatát!',
  btnLabel: 'Írjon nekünk',
  link: '/kapcsolat',
} as const;
