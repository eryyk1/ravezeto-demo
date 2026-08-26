import { createDefaultContent } from './defaults';
import type {
  ActivityEntry,
  CmsState,
  CompanySettings,
  ContentVersion,
  FelnottkepzesCategory,
  FelnottkepzesPageContent,
  FelnottkepzesProgrammeGroup,
  HomeHeroContent,
  KapcsolatPageContent,
  Partner,
  PalyazatokSettings,
  Reference,
  ReferenciakPageContent,
  RolunkContent,
  ServiceItem,
  SiteContent,
  TanacsadasPageContent,
  TeamMember,
} from './types';

const STORAGE_KEY_V2 = 'ravezeto_cms_v2';
const STORAGE_KEY_V1 = 'ravezeto_cms_v1';
const MAX_VERSIONS = 40;
const MAX_ACTIVITY = 80;

type Listener = () => void;

function cloneContent(content: SiteContent): SiteContent {
  return structuredClone(content);
}

function nowIso(): string {
  return new Date().toISOString();
}

function formatVersionLabel(date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function mergeLegacyV1(parsed: Partial<SiteContent>, defaults: SiteContent): SiteContent {
  return {
    ...defaults,
    company: { ...defaults.company, ...parsed.company },
    homeHero: { ...defaults.homeHero, ...parsed.homeHero },
    team: parsed.team?.length ? parsed.team : defaults.team,
    partners: parsed.partners?.length ? parsed.partners : defaults.partners,
    references: parsed.references?.length ? parsed.references : defaults.references,
    palyazatok: { ...defaults.palyazatok, ...parsed.palyazatok },
  };
}

function loadInitialState(): CmsState {
  const defaults = createDefaultContent();
  if (typeof window === 'undefined') {
    return {
      storageVersion: 2,
      draft: defaults,
      published: cloneContent(defaults),
      versions: [],
      activity: [],
      meta: {
        lastModified: null,
        lastPublished: null,
        hasUnpublishedChanges: false,
      },
    };
  }

  try {
    const rawV2 = localStorage.getItem(STORAGE_KEY_V2);
    if (rawV2) {
      const parsed = JSON.parse(rawV2) as CmsState;
      if (parsed.storageVersion === 2 && parsed.draft && parsed.published) {
        return {
          ...parsed,
          draft: { ...defaults, ...parsed.draft },
          published: { ...defaults, ...parsed.published },
          versions: parsed.versions ?? [],
          activity: parsed.activity ?? [],
          meta: parsed.meta ?? {
            lastModified: null,
            lastPublished: null,
            hasUnpublishedChanges: false,
          },
        };
      }
    }
  } catch {
    /* fall through */
  }

  try {
    const rawV1 = localStorage.getItem(STORAGE_KEY_V1);
    if (rawV1) {
      const parsed = JSON.parse(rawV1) as Partial<SiteContent>;
      const merged = mergeLegacyV1(parsed, defaults);
      const ts = nowIso();
      return {
        storageVersion: 2,
        draft: merged,
        published: cloneContent(merged),
        versions: [],
        activity: [
          {
            id: `act-migrate-${Date.now()}`,
            at: ts,
            message: 'Tartalom átmigrálva a korábbi CMS verzióból',
            section: 'system',
          },
        ],
        meta: {
          lastModified: ts,
          lastPublished: ts,
          hasUnpublishedChanges: false,
        },
      };
    }
  } catch {
    /* fall through */
  }

  const ts = nowIso();
  return {
    storageVersion: 2,
    draft: defaults,
    published: cloneContent(defaults),
    versions: [],
    activity: [],
    meta: {
      lastModified: ts,
      lastPublished: ts,
      hasUnpublishedChanges: false,
    },
  };
}

class ContentStore {
  private state: CmsState;
  private listeners = new Set<Listener>();

  constructor() {
    this.state = loadInitialState();
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
    localStorage.setItem(STORAGE_KEY_V2, JSON.stringify(this.state));
    this.notify();
  }

  getCmsState = (): CmsState => this.state;

  getMeta = () => this.state.meta;

  getVersions = (): ContentVersion[] => this.state.versions;

  getActivity = (): ActivityEntry[] => this.state.activity;

  /** Public site reads published content */
  getPublished = (): SiteContent => this.state.published;

  /** Admin reads/writes draft */
  getDraft = (): SiteContent => this.state.draft;

  getSnapshot = (): SiteContent => this.state.published;

  private touchDraft(message: string, section?: string) {
    this.state = {
      ...this.state,
      meta: {
        ...this.state.meta,
        lastModified: nowIso(),
        hasUnpublishedChanges: true,
      },
      activity: [
        {
          id: createId('act'),
          at: nowIso(),
          message,
          section,
        },
        ...this.state.activity,
      ].slice(0, MAX_ACTIVITY),
    };
  }

  saveDraft(content: SiteContent, activityMessage: string, section?: string) {
    this.state = { ...this.state, draft: cloneContent(content) };
    this.touchDraft(activityMessage, section);
    this.persist();
  }

  updateDraft(updater: (draft: SiteContent) => SiteContent, activityMessage: string, section?: string) {
    this.saveDraft(updater(this.state.draft), activityMessage, section);
  }

  publish(activityMessage = 'Változások publikálva') {
    const snapshot = cloneContent(this.state.draft);
    const version: ContentVersion = {
      id: createId('ver'),
      createdAt: nowIso(),
      label: formatVersionLabel(),
      snapshot: cloneContent(snapshot),
    };
    const ts = nowIso();
    this.state = {
      ...this.state,
      published: snapshot,
      versions: [version, ...this.state.versions].slice(0, MAX_VERSIONS),
      meta: {
        lastModified: ts,
        lastPublished: ts,
        hasUnpublishedChanges: false,
      },
      activity: [
        {
          id: createId('act'),
          at: ts,
          message: activityMessage,
          section: 'publish',
        },
        ...this.state.activity,
      ].slice(0, MAX_ACTIVITY),
    };
    this.persist();
  }

  restoreVersion(versionId: string): boolean {
    const version = this.state.versions.find((item) => item.id === versionId);
    if (!version) return false;

    const restored = cloneContent(version.snapshot);
    const newVersion: ContentVersion = {
      id: createId('ver'),
      createdAt: nowIso(),
      label: `${formatVersionLabel()} — visszaállítás`,
      snapshot: cloneContent(restored),
    };
    const ts = nowIso();
    this.state = {
      ...this.state,
      draft: restored,
      published: cloneContent(restored),
      versions: [newVersion, ...this.state.versions].slice(0, MAX_VERSIONS),
      meta: {
        lastModified: ts,
        lastPublished: ts,
        hasUnpublishedChanges: false,
      },
      activity: [
        {
          id: createId('act'),
          at: ts,
          message: `Verzió visszaállítva: ${version.label}`,
          section: 'versions',
        },
        ...this.state.activity,
      ].slice(0, MAX_ACTIVITY),
    };
    this.persist();
    return true;
  }

  resetToDefaults() {
    const defaults = createDefaultContent();
    const ts = nowIso();
    this.state = {
      storageVersion: 2,
      draft: defaults,
      published: cloneContent(defaults),
      versions: this.state.versions,
      activity: [
        {
          id: createId('act'),
          at: ts,
          message: 'Tartalom visszaállítva az alapértelmezett értékekre',
          section: 'system',
        },
        ...this.state.activity,
      ].slice(0, MAX_ACTIVITY),
      meta: {
        lastModified: ts,
        lastPublished: ts,
        hasUnpublishedChanges: false,
      },
    };
    this.persist();
  }

  // ── Published getters (public site) ──

  getCompany = (): CompanySettings => this.state.published.company;
  getHomeHero = (): HomeHeroContent => this.state.published.homeHero;
  getRolunk = (): RolunkContent => this.state.published.rolunk;
  getTanacsadas = (): TanacsadasPageContent => this.state.published.tanacsadas;
  getFelnottkepzes = (): FelnottkepzesPageContent => this.state.published.felnottkepzes;
  getReferenciakPage = (): ReferenciakPageContent => this.state.published.referenciakPage;
  getKapcsolat = (): KapcsolatPageContent => this.state.published.kapcsolat;
  getPalyazatok = (): PalyazatokSettings => this.state.published.palyazatok;

  getTeam = (): TeamMember[] =>
    [...this.state.published.team].sort((a, b) => a.order - b.order);

  getActiveTeam = (): TeamMember[] => this.getTeam().filter((m) => m.active);

  getPartners = (): Partner[] =>
    [...this.state.published.partners].sort((a, b) => a.order - b.order);

  getActivePartners = (): Partner[] => this.getPartners().filter((p) => p.active);

  getReferences = (): Reference[] =>
    [...this.state.published.references].sort((a, b) => a.order - b.order);

  getActiveReferences = (): Reference[] => this.getReferences().filter((r) => r.active);

  getServices = (section?: ServiceItem['section']): ServiceItem[] => {
    const list = [...this.state.published.services].sort((a, b) => a.order - b.order);
    return section ? list.filter((s) => s.section === section) : list;
  };

  getActiveServices = (section?: ServiceItem['section']): ServiceItem[] =>
    this.getServices(section).filter((s) => s.active);

  getFelnottkepzesCategories = (): FelnottkepzesCategory[] =>
    [...this.state.published.felnottkepzesCategories]
      .sort((a, b) => a.order - b.order)
      .filter((c) => c.active);

  getFelnottkepzesProgrammes = (): FelnottkepzesProgrammeGroup[] =>
    [...this.state.published.felnottkepzesProgrammes]
      .sort((a, b) => a.order - b.order)
      .filter((g) => g.active);

  // ── Draft entity operations ──

  getTeamMember(id: string): TeamMember | undefined {
    return this.state.draft.team.find((m) => m.id === id);
  }

  saveTeamMember(member: TeamMember) {
    const team = [...this.state.draft.team];
    const index = team.findIndex((m) => m.id === member.id);
    if (index >= 0) team[index] = member;
    else team.push(member);
    this.updateDraft(
      (draft) => ({ ...draft, team }),
      member.name ? `Csapat — ${member.name} mentve` : 'Csapattag mentve',
      'team',
    );
  }

  deleteTeamMember(id: string) {
    const member = this.state.draft.team.find((m) => m.id === id);
    this.updateDraft(
      (draft) => ({ ...draft, team: draft.team.filter((m) => m.id !== id) }),
      member ? `Csapat — ${member.name} törölve` : 'Csapattag törölve',
      'team',
    );
  }

  reorderTeam(ids: string[]) {
    const map = new Map(this.state.draft.team.map((m) => [m.id, m]));
    const team = ids
      .map((id, index) => {
        const member = map.get(id);
        return member ? { ...member, order: index + 1 } : null;
      })
      .filter(Boolean) as TeamMember[];
    this.updateDraft((draft) => ({ ...draft, team }), 'Csapat sorrend módosítva', 'team');
  }

  getPartner(id: string): Partner | undefined {
    return this.state.draft.partners.find((p) => p.id === id);
  }

  savePartner(partner: Partner) {
    const partners = [...this.state.draft.partners];
    const index = partners.findIndex((p) => p.id === partner.id);
    if (index >= 0) partners[index] = partner;
    else partners.push(partner);
    this.updateDraft(
      (draft) => ({ ...draft, partners }),
      partner.name ? `Partner — ${partner.name} mentve` : 'Partner mentve',
      'partners',
    );
  }

  deletePartner(id: string) {
    const partner = this.state.draft.partners.find((p) => p.id === id);
    this.updateDraft(
      (draft) => ({ ...draft, partners: draft.partners.filter((p) => p.id !== id) }),
      partner ? `Partner — ${partner.name} törölve` : 'Partner törölve',
      'partners',
    );
  }

  reorderPartners(ids: string[]) {
    const map = new Map(this.state.draft.partners.map((p) => [p.id, p]));
    const partners = ids
      .map((id, index) => {
        const partner = map.get(id);
        return partner ? { ...partner, order: index + 1 } : null;
      })
      .filter(Boolean) as Partner[];
    this.updateDraft((draft) => ({ ...draft, partners }), 'Partnerek sorrendje módosítva', 'partners');
  }

  getReference(id: string): Reference | undefined {
    return this.state.draft.references.find((r) => r.id === id);
  }

  saveReference(reference: Reference) {
    const references = [...this.state.draft.references];
    const index = references.findIndex((r) => r.id === reference.id);
    if (index >= 0) references[index] = reference;
    else references.push(reference);
    this.updateDraft(
      (draft) => ({ ...draft, references }),
      reference.title ? `Referencia — ${reference.title} mentve` : 'Referencia mentve',
      'references',
    );
  }

  deleteReference(id: string) {
    const reference = this.state.draft.references.find((r) => r.id === id);
    this.updateDraft(
      (draft) => ({ ...draft, references: draft.references.filter((r) => r.id !== id) }),
      reference ? `Referencia — ${reference.title} törölve` : 'Referencia törölve',
      'references',
    );
  }

  reorderReferences(ids: string[]) {
    const map = new Map(this.state.draft.references.map((r) => [r.id, r]));
    const references = ids
      .map((id, index) => {
        const reference = map.get(id);
        return reference ? { ...reference, order: index + 1 } : null;
      })
      .filter(Boolean) as Reference[];
    this.updateDraft(
      (draft) => ({ ...draft, references }),
      'Referenciák sorrendje módosítva',
      'references',
    );
  }

  getService(id: string): ServiceItem | undefined {
    return this.state.draft.services.find((s) => s.id === id);
  }

  saveService(service: ServiceItem) {
    const services = [...this.state.draft.services];
    const index = services.findIndex((s) => s.id === service.id);
    if (index >= 0) services[index] = service;
    else services.push(service);
    this.updateDraft(
      (draft) => ({ ...draft, services }),
      service.title ? `Szolgáltatás — ${service.title} mentve` : 'Szolgáltatás mentve',
      'services',
    );
  }

  deleteService(id: string) {
    const service = this.state.draft.services.find((s) => s.id === id);
    this.updateDraft(
      (draft) => ({ ...draft, services: draft.services.filter((s) => s.id !== id) }),
      service ? `Szolgáltatás — ${service.title} törölve` : 'Szolgáltatás törölve',
      'services',
    );
  }

  reorderServices(ids: string[]) {
    const map = new Map(this.state.draft.services.map((s) => [s.id, s]));
    const services = ids
      .map((id, index) => {
        const service = map.get(id);
        return service ? { ...service, order: index + 1 } : null;
      })
      .filter(Boolean) as ServiceItem[];
    this.updateDraft(
      (draft) => ({ ...draft, services }),
      'Szolgáltatások sorrendje módosítva',
      'services',
    );
  }

  // ── Section updaters (draft) ──

  updateCompany(company: CompanySettings) {
    this.updateDraft((draft) => ({ ...draft, company }), 'Beállítások — cégadatok mentve', 'company');
  }

  updateHomeHero(homeHero: HomeHeroContent) {
    this.updateDraft((draft) => ({ ...draft, homeHero }), 'Kezdőlap hero mentve', 'homeHero');
  }

  updateRolunk(rolunk: RolunkContent) {
    this.updateDraft((draft) => ({ ...draft, rolunk }), 'Rólunk oldal mentve', 'rolunk');
  }

  updateTanacsadas(tanacsadas: TanacsadasPageContent) {
    this.updateDraft((draft) => ({ ...draft, tanacsadas }), 'Tanácsadás oldal mentve', 'tanacsadas');
  }

  updateFelnottkepzes(felnottkepzes: FelnottkepzesPageContent) {
    this.updateDraft(
      (draft) => ({ ...draft, felnottkepzes }),
      'Felnőttképzés oldal mentve',
      'felnottkepzes',
    );
  }

  updatePalyazatok(palyazatok: PalyazatokSettings) {
    this.updateDraft((draft) => ({ ...draft, palyazatok }), 'Pályázatok oldal mentve', 'palyazatok');
  }

  updateDraftSection<K extends keyof SiteContent>(key: K, value: SiteContent[K], message: string) {
    this.updateDraft((draft) => ({ ...draft, [key]: value }), message, String(key));
  }
}

export const contentStore = new ContentStore();

export const contentService = {
  getCompany: () => contentStore.getCompany(),
  updateCompany: (data: CompanySettings) => contentStore.updateCompany(data),
  getHomeHero: () => contentStore.getHomeHero(),
  updateHomeHero: (data: HomeHeroContent) => contentStore.updateHomeHero(data),
  getPalyazatok: () => contentStore.getPalyazatok(),
  updatePalyazatok: (data: PalyazatokSettings) => contentStore.updatePalyazatok(data),
  getDraft: () => contentStore.getDraft(),
  getMeta: () => contentStore.getMeta(),
  saveDraft: (content: SiteContent, message: string, section?: string) =>
    contentStore.saveDraft(content, message, section),
  publish: (message?: string) => contentStore.publish(message),
  getVersions: () => contentStore.getVersions(),
  getActivity: () => contentStore.getActivity(),
  restoreVersion: (id: string) => contentStore.restoreVersion(id),
};

export const teamService = {
  getAll: () => contentStore.getDraft().team.sort((a, b) => a.order - b.order),
  getActive: () => contentStore.getActiveTeam(),
  getById: (id: string) => contentStore.getTeamMember(id),
  save: (member: TeamMember) => contentStore.saveTeamMember(member),
  remove: (id: string) => contentStore.deleteTeamMember(id),
  reorder: (ids: string[]) => contentStore.reorderTeam(ids),
};

export const partnerService = {
  getAll: () => contentStore.getDraft().partners.sort((a, b) => a.order - b.order),
  getActive: () => contentStore.getActivePartners(),
  getById: (id: string) => contentStore.getPartner(id),
  save: (partner: Partner) => contentStore.savePartner(partner),
  remove: (id: string) => contentStore.deletePartner(id),
  reorder: (ids: string[]) => contentStore.reorderPartners(ids),
};

export const referenceService = {
  getAll: () => contentStore.getDraft().references.sort((a, b) => a.order - b.order),
  getActive: () => contentStore.getActiveReferences(),
  getById: (id: string) => contentStore.getReference(id),
  save: (reference: Reference) => contentStore.saveReference(reference),
  remove: (id: string) => contentStore.deleteReference(id),
  reorder: (ids: string[]) => contentStore.reorderReferences(ids),
};

export const serviceItemService = {
  getAll: (section?: ServiceItem['section']) => {
    const list = [...contentStore.getDraft().services].sort((a, b) => a.order - b.order);
    return section ? list.filter((s) => s.section === section) : list;
  },
  getById: (id: string) => contentStore.getService(id),
  save: (service: ServiceItem) => contentStore.saveService(service),
  remove: (id: string) => contentStore.deleteService(id),
  reorder: (ids: string[]) => contentStore.reorderServices(ids),
};

export function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']);

export function readImageFile(file: File): Promise<string> {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return Promise.reject(new Error('Csak JPG, PNG, WebP, GIF vagy SVG kép tölthető fel.'));
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return Promise.reject(new Error('A kép mérete legfeljebb 2 MB lehet.'));
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('A kép beolvasása sikertelen.'));
    reader.readAsDataURL(file);
  });
}

export function formatHuDateTime(iso: string | null): string {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
