import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { adminAuthDevPlugin } from './vite.adminAuthPlugin';
import { contactApiDevPlugin } from './vite.contactApiPlugin';

const ADMIN_ENV_KEYS = [
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
  'ADMIN_JWT_SECRET',
  'CLIENT_ADMIN_EMAIL',
  'CLIENT_ADMIN_PASSWORD',
] as const;

const CONTACT_ENV_KEYS = ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL'] as const;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  for (const key of [...ADMIN_ENV_KEYS, ...CONTACT_ENV_KEYS]) {
    if (env[key]) process.env[key] = env[key];
  }

  const buildId =
    process.env.CF_PAGES_COMMIT_SHA?.slice(0, 7) ??
    process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ??
    process.env.GITHUB_SHA?.slice(0, 7) ??
    'dev';

  return {
    define: {
      __APP_BUILD_ID__: JSON.stringify(buildId),
    },
    plugins: [react(), adminAuthDevPlugin(), contactApiDevPlugin()],
    server: {
      watch: {
        // OneDrive can lock PDFs and favicons in public/, causing EBUSY watcher crashes.
        ignored: ['**/public/assets/documents/**', '**/public/cropped-ravezeto_logo-*.jpg'],
      },
    },
  };
});
