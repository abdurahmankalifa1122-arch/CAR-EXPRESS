import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ command }) => {
  if (command === 'build') {
    process.env.NODE_ENV = 'production';
  }

  const rawBase = process.env.VITE_BASE_PATH?.trim();
  const base =
    command === 'build'
      ? rawBase
        ? rawBase.replace(/\/+$/, '') + '/'
        : './'
      : '/';

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'strip-dev-only-html',
        apply: 'build',
        transformIndexHtml(html) {
          return html.replace(/<script data-dev-only>[\s\S]*?<\/script>/g, '');
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: true,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
