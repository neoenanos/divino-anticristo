// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: 'https://divinoanticristo.cl',
  base: '/',

  integrations: [sitemap(), pagefind()],

  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      langs: [],
      wrap: true,
    },
  },

  adapter: netlify(),
});