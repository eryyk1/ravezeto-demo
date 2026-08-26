import { useSyncExternalStore } from 'react';
import { contentStore } from './store';
import type {
  CompanySettings,
  HomeHeroContent,
  Partner,
  PalyazatokSettings,
  Reference,
  TeamMember,
} from './types';

export function useSiteContent() {
  return useSyncExternalStore(contentStore.subscribe, contentStore.getSnapshot);
}

export function useCompanySettings(): CompanySettings {
  return useSyncExternalStore(contentStore.subscribe, contentStore.getCompany);
}

export function useHomeHero(): HomeHeroContent {
  return useSyncExternalStore(contentStore.subscribe, contentStore.getHomeHero);
}

export function useTeamMembers(activeOnly = true): TeamMember[] {
  return useSyncExternalStore(
    contentStore.subscribe,
    activeOnly ? contentStore.getActiveTeam : contentStore.getTeam,
  );
}

export function usePartners(activeOnly = true): Partner[] {
  return useSyncExternalStore(
    contentStore.subscribe,
    activeOnly ? contentStore.getActivePartners : contentStore.getPartners,
  );
}

export function useReferences(activeOnly = true): Reference[] {
  return useSyncExternalStore(
    contentStore.subscribe,
    activeOnly ? contentStore.getActiveReferences : contentStore.getReferences,
  );
}

export function usePalyazatokSettings(): PalyazatokSettings {
  return useSyncExternalStore(contentStore.subscribe, contentStore.getPalyazatok);
}
