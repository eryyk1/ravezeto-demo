/** CMS entity types — Supabase-ready schema */

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

export type HomeHeroContent = {
  label: string;
  headlineLines: [string, string, string];
  intro: string;
  ctaPrimary: string;
  ctaPrimaryLink: string;
  ctaSecondary: string;
  ctaSecondaryLink: string;
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

export type PalyazatokSettings = {
  heroLabel: string;
  q1: string;
  q2Lead: string;
  q2Mark: string;
  lead: string;
  deadlineKicker: string;
  deadlineDate: string;
  active: boolean;
};

export type SiteContent = {
  version: number;
  company: CompanySettings;
  homeHero: HomeHeroContent;
  team: TeamMember[];
  partners: Partner[];
  references: Reference[];
  palyazatok: PalyazatokSettings;
};

export type ContentSection =
  | 'company'
  | 'homeHero'
  | 'team'
  | 'partners'
  | 'references'
  | 'palyazatok';
