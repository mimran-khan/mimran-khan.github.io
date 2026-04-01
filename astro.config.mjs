import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://mimran-khan.github.io',
  integrations: [tailwind()],
  output: 'static',
  build: {
    format: 'file',
  },
  devToolbar: {
    enabled: false,
  },
});
