// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
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

  image: {
    domains: ["img.youtube.com","i.ytimg.com"],
  },

  fonts: [{
  provider: fontProviders.local(),
  name: "PQNSQ",
  cssVariable: "--font-PQNSQ",
  fallbacks: ["Fira Code","JetBrains Mono","Monaco","Consolas","Ubuntu Mono","monospace"],
  options: {
    variants: [{
      src: ['../font/PQNSQ.ttf'],
      }]
    }
  }],

  adapter: netlify(),
});