import { useEffect, useState } from 'react';
import { contentStore } from './store';
import type {
  CompanySettings,
  HomeHeroContent,
  Partner,
  PalyazatokSettings,
  Reference,
  SiteContent,
  TeamMember,
} from './types';

function useStoreValue<T>(read: () => T): T {
  const [value, setValue] = useState(() => read());

  useEffect(() => {
    const sync = () => setValue(read());
    return contentStore.subscribe(sync);
  }, [read]);

  return value;
}

export function useSiteContent(): SiteContent {
  return useStoreValue(contentStore.getSnapshot);
}

export function useCompanySettings(): CompanySettings {
  return useStoreValue(contentStore.getCompany);
}

export function useHomeHero(): HomeHeroContent {
  return useStoreValue(contentStore.getHomeHero);
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

export function usePalyazatokSettings(): PalyazatokSettings {
  return useStoreValue(contentStore.getPalyazatok);
}
