import { company } from '../../content/company';
import { homeHero } from '../../content/home';
import { referenceClientLogos } from '../../content/partners';
import { referenciakTestimonials } from '../../content/referenciak';
import { teamMembers as legacyTeam } from '../../content/team';
import {
  palyazatokDeadline,
  palyazatokHero,
} from '../../pages/palyazatok/palyazatokContent';
import type { SiteContent } from './types';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function createDefaultContent(): SiteContent {
  return {
    version: 1,
    company: {
      name: company.name,
      tagline: company.tagline,
      address: company.address,
      hours: company.hours,
      phone: company.phone,
      phoneTel: company.phoneTel,
      email: company.email,
      facebook: company.facebook,
    },
    homeHero: {
      label: homeHero.label,
      headlineLines: [...homeHero.headlineLines] as [string, string, string],
      intro: homeHero.intro,
      ctaPrimary: homeHero.ctaPrimary,
      ctaPrimaryLink: homeHero.ctaPrimaryLink,
      ctaSecondary: homeHero.ctaSecondary,
      ctaSecondaryLink: homeHero.ctaSecondaryLink,
    },
    team: legacyTeam.map((member, index) => ({
      id: String(member.id),
      name: member.name,
      slug: member.slug,
      role: member.featured ? 'Alapító, ügyvezető' : 'Tanácsadó',
      bio: member.bio,
      portrait: member.portrait,
      portraitPosition: member.portraitPosition,
      featured: member.featured,
      order: index + 1,
      active: true,
    })),
    partners: referenceClientLogos.map((partner, index) => ({
      id: partner.slug,
      slug: partner.slug,
      name: partner.name,
      logo: partner.logo,
      order: index + 1,
      active: true,
    })),
    references: referenciakTestimonials.map((item, index) => ({
      id: slugify(item.logo) || `ref-${index + 1}`,
      title: item.logo,
      description: item.quotes[0]?.slice(0, 120) ?? '',
      logo: item.logo,
      who: item.who,
      quotes: [...item.quotes],
      order: index + 1,
      active: true,
    })),
    palyazatok: {
      heroLabel: palyazatokHero.label,
      q1: palyazatokHero.q1,
      q2Lead: palyazatokHero.q2Lead,
      q2Mark: palyazatokHero.q2Mark,
      lead: palyazatokHero.lead,
      deadlineKicker: palyazatokDeadline.kicker,
      deadlineDate: palyazatokDeadline.date,
      active: true,
    },
  };
}
