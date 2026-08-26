import { useEffect, useState } from 'react';
import { contentStore } from './store';
import type {
  ActivityEntry,
  CmsMeta,
  CompanySettings,
  ContentVersion,
  FelnottkepzesCategory,
  FelnottkepzesPageContent,
  FelnottkepzesProgrammeGroup,
  FooterContent,
  HomeHeroContent,
  HomeQuoteContent,
  HomeReasonsContent,
  HomeServiceCard,
  HomeServicesIntro,
  HomeStatsContent,
  KapcsolatPageContent,
  Partner,
  PalyazatokSettings,
  Reference,
  ReferenciakPageContent,
  RolunkContent,
  SeoEntry,
  ServiceItem,
  SiteContent,
  TanacsadasPageContent,
  TeamMember,
  CloseBand,
  EuMarkContent,
} from './types';

function useStoreValue<T>(read: () => T): T {
  const [value, setValue] = useState(() => read());

  useEffect(() => {
    const sync = () => setValue(read());
    return contentStore.subscribe(sync);
  }, [read]);

  return value;
}

/** Full published snapshot (public site) */
export function useSiteContent(): SiteContent {
  return useStoreValue(contentStore.getPublished);
}

/** Admin draft snapshot */
export function useDraftContent(): SiteContent {
  return useStoreValue(contentStore.getDraft);
}

export function useCmsMeta(): CmsMeta {
  return useStoreValue(contentStore.getMeta);
}

export function useContentVersions(): ContentVersion[] {
  return useStoreValue(contentStore.getVersions);
}

export function useActivityLog(): ActivityEntry[] {
  return useStoreValue(contentStore.getActivity);
}

export function useCompanySettings(): CompanySettings {
  return useStoreValue(contentStore.getCompany);
}

export function useHomeHero(): HomeHeroContent {
  return useStoreValue(contentStore.getHomeHero);
}

export function useHomeQuote(): HomeQuoteContent {
  return useStoreValue(() => contentStore.getPublished().homeQuote);
}

export function useHomeReasons(): HomeReasonsContent {
  return useStoreValue(() => contentStore.getPublished().homeReasons);
}

export function useHomeServicesIntro(): HomeServicesIntro {
  return useStoreValue(() => contentStore.getPublished().homeServicesIntro);
}

export function useHomeServices(activeOnly = true): HomeServiceCard[] {
  return useStoreValue(() => {
    const list = [...contentStore.getPublished().homeServices].sort((a, b) => a.order - b.order);
    return activeOnly ? list.filter((s) => s.active) : list;
  });
}

export function useHomeStats(): HomeStatsContent {
  return useStoreValue(() => contentStore.getPublished().homeStats);
}

export function useHomeContactClose(): CloseBand {
  return useStoreValue(() => contentStore.getPublished().homeContactClose);
}

export function useFooterContent(): FooterContent {
  return useStoreValue(() => contentStore.getPublished().footer);
}

export function useEuMark(): EuMarkContent {
  return useStoreValue(() => contentStore.getPublished().footer.euMark);
}

export function useRolunkContent(): RolunkContent {
  return useStoreValue(contentStore.getRolunk);
}

export function useTanacsadasContent(): TanacsadasPageContent {
  return useStoreValue(contentStore.getTanacsadas);
}

export function useFelnottkepzesContent(): FelnottkepzesPageContent {
  return useStoreValue(contentStore.getFelnottkepzes);
}

export function useReferenciakPageContent(): ReferenciakPageContent {
  return useStoreValue(contentStore.getReferenciakPage);
}

export function useKapcsolatContent(): KapcsolatPageContent {
  return useStoreValue(contentStore.getKapcsolat);
}

export function useSeoEntries(): SeoEntry[] {
  return useStoreValue(() => contentStore.getPublished().seo);
}

export function useTeamMembers(activeOnly = true): TeamMember[] {
  const read = activeOnly ? contentStore.getActiveTeam : contentStore.getTeam;
  return useStoreValue(read);
}

export function usePartners(activeOnly = true): Partner[] {
  const read = activeOnly ? contentStore.getActivePartners : contentStore.getPartners;
  return useStoreValue(read);
}

export function useReferences(activeOnly = true): Reference[] {
  const read = activeOnly ? contentStore.getActiveReferences : contentStore.getReferences;
  return useStoreValue(read);
}

export function useServices(section?: ServiceItem['section'], activeOnly = true): ServiceItem[] {
  return useStoreValue(() => {
    const read = activeOnly ? contentStore.getActiveServices : contentStore.getServices;
    return read(section);
  });
}

export function useFelnottkepzesCategories(): FelnottkepzesCategory[] {
  return useStoreValue(contentStore.getFelnottkepzesCategories);
}

export function useFelnottkepzesProgrammes(): FelnottkepzesProgrammeGroup[] {
  return useStoreValue(contentStore.getFelnottkepzesProgrammes);
}

export function useDraftTeamMembers(activeOnly = false): TeamMember[] {
  return useStoreValue(() => {
    const list = [...contentStore.getDraft().team].sort((a, b) => a.order - b.order);
    return activeOnly ? list.filter((m) => m.active) : list;
  });
}

export function useDraftPartners(activeOnly = false): Partner[] {
  return useStoreValue(() => {
    const list = [...contentStore.getDraft().partners].sort((a, b) => a.order - b.order);
    return activeOnly ? list.filter((p) => p.active) : list;
  });
}

export function useDraftReferences(activeOnly = false): Reference[] {
  return useStoreValue(() => {
    const list = [...contentStore.getDraft().references].sort((a, b) => a.order - b.order);
    return activeOnly ? list.filter((r) => r.active) : list;
  });
}

export function useDraftServices(section?: ServiceItem['section'], activeOnly = false): ServiceItem[] {
  return useStoreValue(() => {
    const list = [...contentStore.getDraft().services].sort((a, b) => a.order - b.order);
    const filtered = section ? list.filter((s) => s.section === section) : list;
    return activeOnly ? filtered.filter((s) => s.active) : filtered;
  });
}

export function useDraftRolunk(): RolunkContent {
  return useStoreValue(() => contentStore.getDraft().rolunk);
}

export function useDraftTanacsadas(): TanacsadasPageContent {
  return useStoreValue(() => contentStore.getDraft().tanacsadas);
}

export function useDraftFelnottkepzes(): FelnottkepzesPageContent {
  return useStoreValue(() => contentStore.getDraft().felnottkepzes);
}

export function useDraftKapcsolat(): KapcsolatPageContent {
  return useStoreValue(() => contentStore.getDraft().kapcsolat);
}

export function useDraftReferenciakPage(): ReferenciakPageContent {
  return useStoreValue(() => contentStore.getDraft().referenciakPage);
}

export function useDraftHomeHero(): HomeHeroContent {
  return useStoreValue(() => contentStore.getDraft().homeHero);
}

export function usePalyazatokSettings(): PalyazatokSettings {
  return useStoreValue(contentStore.getPalyazatok);
}
