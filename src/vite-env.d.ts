/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_FORMSPREE_CONTACT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
