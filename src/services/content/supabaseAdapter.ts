/**
 * Supabase content adapter — implement when VITE_SUPABASE_URL is configured.
 * Expected tables: site_settings (jsonb), team_members, partners, references
 */

import type { SiteContent } from './types';

export type ContentStorageAdapter = {
  load(): Promise<SiteContent | null>;
  save(content: SiteContent): Promise<void>;
};

export const supabaseContentAdapter: ContentStorageAdapter = {
  async load() {
    // TODO: connect Supabase client and fetch site_content row
    return null;
  },
  async save(_content: SiteContent) {
    // TODO: upsert site_content in Supabase
    throw new Error('Supabase content adapter is not configured yet.');
  },
};
