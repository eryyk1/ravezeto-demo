/** Sketch illustrations from final-felnottkepzes.html (sourced from RAV bundle extracts). */
export const felnottkepzesImages = {
  terem: '/assets/images/felnottkepzes/fk-terem.png',
  kommunikacio: '/assets/images/felnottkepzes/fk-kommunikacio.png',
  vezetoi: '/assets/images/felnottkepzes/fk-vezetoi.png',
  generaciok: '/assets/images/felnottkepzes/fk-generaciok.png',
  stressz: '/assets/images/felnottkepzes/fk-stressz.png',
} as const;

export const felnottkepzesCategoryBands = [
  {
    id: 'kommunikacio',
    flip: false,
    image: felnottkepzesImages.kommunikacio,
    alt: 'Tusrajz: két beszélgető alak, beszédbuborékaik összeérnek',
  },
  {
    id: 'vezetoi',
    flip: true,
    image: felnottkepzesImages.vezetoi,
    alt: 'Tusrajz: karmester alak, pálcája nyomán felfelé ívelő vonalak',
  },
  {
    id: 'generaciok',
    flip: false,
    image: felnottkepzesImages.generaciok,
    alt: 'Tusrajz: két oldalról épülő híd, középen arany zárókő',
  },
  {
    id: 'stressz',
    flip: true,
    image: felnottkepzesImages.stressz,
    alt: 'Tusrajz: kusza vonal kisimul nyugodt vonallá',
  },
] as const;
