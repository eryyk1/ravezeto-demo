/** CMS entity types — structured for future PHP/MySQL or Supabase backend */

export type TeamMember = {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  portrait: string;
  portraitPosition?: string;
  featured?: boolean;
  order: number;
  active: boolean;
};

export type Partner = {
  id: string;
  slug: string;
  name: string;
  logo: string;
  websiteUrl?: string;
  order: number;
  active: boolean;
};

export type Reference = {
  id: string;
  title: string;
  description: string;
  logo: string;
  who: string;
  quotes: string[];
  category?: string;
  order: number;
  active: boolean;
};

export type ServiceItem = {
  id: string;
  slug: string;
  section: 'tanacsadas' | 'felnottkepzes' | 'home';
  index: string;
  label: string;
  title: string;
  intro: string;
  detail?: string;
  problems: string[];
  cta?: string;
  link?: string;
  visual?: string;
  image?: string;
  order: number;
  active: boolean;
};

export type HomeHeroContent = {
  label: string;
  headlineLines: [string, string, string];
  intro: string;
  ctaPrimary: string;
  ctaPrimaryLink: string;
  ctaSecondary: string;
  ctaSecondaryLink: string;
};

export type HomeQuoteContent = {
  text: string;
  author: string;
  context: string;
  teamLine: string;
  teamLink: string;
  teamCta: string;
};

export type HomeReasonItem = {
  emphasis: string;
  rest: string;
  subtitle: string;
  text: string;
};

export type HomeReasonsContent = {
  title: string;
  intro: string;
  items: HomeReasonItem[];
};

export type HomeServiceCard = {
  id: string;
  title: string;
  text: string;
  link: string;
  cta: string;
  external: boolean;
  icon: string;
  order: number;
  active: boolean;
};

export type HomeServicesIntro = {
  kicker: string;
  title: string;
  intro: string;
};

export type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

export type HomeStatsContent = {
  kicker: string;
  title: string;
  refsText: string;
  refsLink: string;
  refsCta: string;
  items: StatItem[];
};

export type CloseBand = {
  kicker: string;
  title: string;
  cta: string;
  link: string;
};

export type EuMarkContent = {
  image: string;
  alt: string;
  link: string;
};

export type RolunkContent = {
  hero: {
    label: string;
    title: string;
    titleMark: string;
    intro: string;
    image: string;
    imageAlt: string;
  };
  story: {
    pullQuote: string;
    paragraphs: string[];
    motto: string;
  };
  values: {
    label: string;
    title: string;
    image: string;
    labels: string[];
  };
  closing: string;
  close: CloseBand;
};

export type TanacsadasPageContent = {
  hero: {
    label: string;
    title: string;
    intro: string;
    image: string;
    imageAlt: string;
  };
  quote: {
    text: string;
    author: string;
    note: string;
  };
  motto: string;
  szervezetfejlesztes: {
    punch: string;
    bands: Array<{
      title: string;
      paragraphs: string[];
      photoLabel: string;
      photo?: string;
    }>;
  };
  coaching: {
    leadStrong: string;
    leadRest: string;
    cards: Array<{
      title: string;
      paragraphs: string[];
    }>;
  };
  close: CloseBand;
};

export type FelnottkepzesCategory = {
  id: string;
  index: string;
  title: string;
  text: string;
  visual: string;
  image?: string;
  order: number;
  active: boolean;
};

export type FelnottkepzesProgrammeItem = {
  title: string;
  hours: string;
};

export type FelnottkepzesProgrammeGroup = {
  id: string;
  tab: string;
  index: string;
  title: string;
  items: FelnottkepzesProgrammeItem[];
  order: number;
  active: boolean;
};

export type FelnottkepzesPageContent = {
  hero: {
    label: string;
    titleLead: string;
    titleMark: string;
    awardLine: string;
    image: string;
    imageAlt: string;
  };
  methodTags: string[];
  keyMessage: {
    label: string;
    title: string;
    text: string;
  };
  credentials: {
    paragraphs: string[];
  };
  registration: string;
  license: string;
  motto: string;
  processLead: string;
  close: CloseBand;
};

export type ReferenciakPageContent = {
  hero: {
    label: string;
    title: string;
    titleMark: string;
    lead: string;
  };
  stats: StatItem[];
  cta: {
    kicker: string;
    title: string;
    text: string;
    btnLabel: string;
    link: string;
  };
};

export type KapcsolatPageContent = {
  hero: {
    label: string;
    title: string;
    intro: string;
  };
  mapEmbed: string;
  mapsSearch: string;
  doorbellNote: string;
  formTitle: string;
  formMessages: {
    success: string;
    error: string;
    required: string;
    invalidEmail: string;
    notConfigured: string;
  };
};

export type FooterContent = {
  trainingReg: string;
  euMark: EuMarkContent;
};

export type SeoEntry = {
  path: string;
  title: string;
  description: string;
};

export type PalyazatokTopicCard = {
  id: string;
  title: string;
  text?: string;
  items?: string[];
};

export type PalyazatokFact = {
  id: string;
  symbol?: string;
  value?: number;
  suffix?: string;
  text: string;
  highlight?: boolean;
};

export type PalyazatokSettings = {
  heroLabel: string;
  q1: string;
  q2Lead: string;
  q2Mark: string;
  lead: string;
  heroCta: string;
  deadlineKicker: string;
  deadlineLabel: string;
  deadlineDate: string;
  topicsLabel: string;
  topicsTitle: string;
  topics: PalyazatokTopicCard[];
  factsLabel: string;
  factsTitle: string;
  facts: PalyazatokFact[];
  aboutText: string;
  aboutLinkLabel: string;
  aboutLink: string;
  stepsLabel: string;
  stepsTitle: string;
  steps: string[];
  contactName: string;
  contactRole: string;
  contactPortrait: string;
  contactEmail: string;
  contactPhone: string;
  contactPhoneTel: string;
  formTitle: string;
  formPrivacyText: string;
  formPrivacyLink: string;
  formPrivacyLinkLabel: string;
  formSubmit: string;
  active: boolean;
};

export type CompanySettings = {
  name: string;
  tagline: string;
  address: string;
  hours: string;
  phone: string;
  phoneTel: string;
  email: string;
  facebook: string;
};

/** Full editable site snapshot */
export type SiteContent = {
  schemaVersion: number;
  company: CompanySettings;
  homeHero: HomeHeroContent;
  homeQuote: HomeQuoteContent;
  homeReasons: HomeReasonsContent;
  homeServicesIntro: HomeServicesIntro;
  homeServices: HomeServiceCard[];
  homeStats: HomeStatsContent;
  homeContactClose: CloseBand;
  rolunk: RolunkContent;
  tanacsadas: TanacsadasPageContent;
  services: ServiceItem[];
  felnottkepzes: FelnottkepzesPageContent;
  felnottkepzesCategories: FelnottkepzesCategory[];
  felnottkepzesProgrammes: FelnottkepzesProgrammeGroup[];
  referenciakPage: ReferenciakPageContent;
  kapcsolat: KapcsolatPageContent;
  footer: FooterContent;
  seo: SeoEntry[];
  team: TeamMember[];
  partners: Partner[];
  references: Reference[];
  palyazatok: PalyazatokSettings;
};

export type ContentVersion = {
  id: string;
  createdAt: string;
  label: string;
  snapshot: SiteContent;
};

export type ActivityEntry = {
  id: string;
  at: string;
  message: string;
  section?: string;
};

export type CmsMeta = {
  lastModified: string | null;
  lastPublished: string | null;
  hasUnpublishedChanges: boolean;
};

export type CmsState = {
  storageVersion: 2;
  draft: SiteContent;
  published: SiteContent;
  versions: ContentVersion[];
  activity: ActivityEntry[];
  meta: CmsMeta;
};

export type ContentSection =
  | 'company'
  | 'homeHero'
  | 'home'
  | 'rolunk'
  | 'tanacsadas'
  | 'felnottkepzes'
  | 'services'
  | 'team'
  | 'partners'
  | 'references'
  | 'referenciakPage'
  | 'kapcsolat'
  | 'footer'
  | 'seo'
  | 'palyazatok';
