import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // OneDrive can lock PDFs and favicons in public/, causing EBUSY watcher crashes.
      ignored: ['**/public/assets/documents/**', '**/public/cropped-ravezeto_logo-*.jpg'],
    },
  },
});
