import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { adminAuthDevPlugin } from './vite.adminAuthPlugin';

const ADMIN_ENV_KEYS = [
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
  'ADMIN_JWT_SECRET',
  'CLIENT_ADMIN_EMAIL',
  'CLIENT_ADMIN_PASSWORD',
] as const;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  for (const key of ADMIN_ENV_KEYS) {
    if (env[key]) process.env[key] = env[key];
  }

  return {
    plugins: [react(), adminAuthDevPlugin()],
    server: {
      watch: {
        // OneDrive can lock PDFs and favicons in public/, causing EBUSY watcher crashes.
        ignored: ['**/public/assets/documents/**', '**/public/cropped-ravezeto_logo-*.jpg'],
      },
    },
  };
});
