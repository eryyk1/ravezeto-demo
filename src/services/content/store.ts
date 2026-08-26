import { createDefaultContent } from './defaults';
import type {
  CompanySettings,
  HomeHeroContent,
  Partner,
  PalyazatokSettings,
  Reference,
  SiteContent,
  TeamMember,
} from './types';

const STORAGE_KEY = 'ravezeto_cms_v1';

type Listener = () => void;

function mergeContent(partial: Partial<SiteContent>, defaults: SiteContent): SiteContent {
  return {
    version: partial.version ?? defaults.version,
    company: { ...defaults.company, ...partial.company },
    homeHero: { ...defaults.homeHero, ...partial.homeHero },
    team: partial.team?.length ? partial.team : defaults.team,
    partners: partial.partners?.length ? partial.partners : defaults.partners,
    references: partial.references?.length ? partial.references : defaults.references,
    palyazatok: { ...defaults.palyazatok, ...partial.palyazatok },
  };
}

function loadFromStorage(): SiteContent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return mergeContent(parsed, createDefaultContent());
  } catch {
    return null;
  }
}

class ContentStore {
  private data: SiteContent;
  private listeners = new Set<Listener>();
  private listCache: {
    team: TeamMember[] | null;
    activeTeam: TeamMember[] | null;
    partners: Partner[] | null;
    activePartners: Partner[] | null;
    references: Reference[] | null;
    activeReferences: Reference[] | null;
  } = {
    team: null,
    activeTeam: null,
    partners: null,
    activePartners: null,
    references: null,
    activeReferences: null,
  };

  constructor() {
    this.data = loadFromStorage() ?? createDefaultContent();
  }

  private invalidateListCache() {
    this.listCache = {
      team: null,
      activeTeam: null,
      partners: null,
      activePartners: null,
      references: null,
      activeReferences: null,
    };
  }

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  private persist() {
    if (typeof window === 'undefined') return;
    this.invalidateListCache();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    this.notify();
  }

  getSnapshot = (): SiteContent => this.data;

  resetToDefaults() {
    this.data = createDefaultContent();
    this.persist();
  }

  getCompany = (): CompanySettings => this.data.company;

  updateCompany(company: CompanySettings) {
    this.data = { ...this.data, company };
    this.persist();
  }

  getHomeHero = (): HomeHeroContent => this.data.homeHero;

  updateHomeHero(homeHero: HomeHeroContent) {
    this.data = { ...this.data, homeHero };
    this.persist();
  }

  getTeam = (): TeamMember[] => {
    if (!this.listCache.team) {
      this.listCache.team = [...this.data.team].sort((a, b) => a.order - b.order);
    }
    return this.listCache.team;
  };

  getActiveTeam = (): TeamMember[] => {
    if (!this.listCache.activeTeam) {
      this.listCache.activeTeam = this.getTeam().filter((member) => member.active);
    }
    return this.listCache.activeTeam;
  };

  getTeamMember(id: string): TeamMember | undefined {
    return this.data.team.find((member) => member.id === id);
  }

  saveTeamMember(member: TeamMember) {
    const index = this.data.team.findIndex((item) => item.id === member.id);
    const team = [...this.data.team];
    if (index >= 0) team[index] = member;
    else team.push(member);
    this.data = { ...this.data, team };
    this.persist();
  }

  deleteTeamMember(id: string) {
    this.data = {
      ...this.data,
      team: this.data.team.filter((member) => member.id !== id),
    };
    this.persist();
  }

  getPartners = (): Partner[] => {
    if (!this.listCache.partners) {
      this.listCache.partners = [...this.data.partners].sort((a, b) => a.order - b.order);
    }
    return this.listCache.partners;
  };

  getActivePartners = (): Partner[] => {
    if (!this.listCache.activePartners) {
      this.listCache.activePartners = this.getPartners().filter((partner) => partner.active);
    }
    return this.listCache.activePartners;
  };

  getPartner(id: string): Partner | undefined {
    return this.data.partners.find((partner) => partner.id === id);
  }

  savePartner(partner: Partner) {
    const index = this.data.partners.findIndex((item) => item.id === partner.id);
    const partners = [...this.data.partners];
    if (index >= 0) partners[index] = partner;
    else partners.push(partner);
    this.data = { ...this.data, partners };
    this.persist();
  }

  deletePartner(id: string) {
    this.data = {
      ...this.data,
      partners: this.data.partners.filter((partner) => partner.id !== id),
    };
    this.persist();
  }

  getReferences = (): Reference[] => {
    if (!this.listCache.references) {
      this.listCache.references = [...this.data.references].sort((a, b) => a.order - b.order);
    }
    return this.listCache.references;
  };

  getActiveReferences = (): Reference[] => {
    if (!this.listCache.activeReferences) {
      this.listCache.activeReferences = this.getReferences().filter((reference) => reference.active);
    }
    return this.listCache.activeReferences;
  };

  getReference(id: string): Reference | undefined {
    return this.data.references.find((reference) => reference.id === id);
  }

  saveReference(reference: Reference) {
    const index = this.data.references.findIndex((item) => item.id === reference.id);
    const references = [...this.data.references];
    if (index >= 0) references[index] = reference;
    else references.push(reference);
    this.data = { ...this.data, references };
    this.persist();
  }

  deleteReference(id: string) {
    this.data = {
      ...this.data,
      references: this.data.references.filter((reference) => reference.id !== id),
    };
    this.persist();
  }

  getPalyazatok = (): PalyazatokSettings => this.data.palyazatok;

  updatePalyazatok(palyazatok: PalyazatokSettings) {
    this.data = { ...this.data, palyazatok };
    this.persist();
  }
}

export const contentStore = new ContentStore();

/** Thin service facades — swap implementation for Supabase later */
export const contentService = {
  getCompany: () => contentStore.getCompany(),
  updateCompany: (data: CompanySettings) => contentStore.updateCompany(data),
  getHomeHero: () => contentStore.getHomeHero(),
  updateHomeHero: (data: HomeHeroContent) => contentStore.updateHomeHero(data),
  getPalyazatok: () => contentStore.getPalyazatok(),
  updatePalyazatok: (data: PalyazatokSettings) => contentStore.updatePalyazatok(data),
};

export const teamService = {
  getAll: () => contentStore.getTeam(),
  getActive: () => contentStore.getActiveTeam(),
  getById: (id: string) => contentStore.getTeamMember(id),
  save: (member: TeamMember) => contentStore.saveTeamMember(member),
  remove: (id: string) => contentStore.deleteTeamMember(id),
};

export const partnerService = {
  getAll: () => contentStore.getPartners(),
  getActive: () => contentStore.getActivePartners(),
  getById: (id: string) => contentStore.getPartner(id),
  save: (partner: Partner) => contentStore.savePartner(partner),
  remove: (id: string) => contentStore.deletePartner(id),
};

export const referenceService = {
  getAll: () => contentStore.getReferences(),
  getActive: () => contentStore.getActiveReferences(),
  getById: (id: string) => contentStore.getReference(id),
  save: (reference: Reference) => contentStore.saveReference(reference),
  remove: (id: string) => contentStore.deleteReference(id),
};

export function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function readImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('A kép beolvasása sikertelen.'));
    reader.readAsDataURL(file);
  });
}
