import { defineConfig } from 'astro/config';

// Site à la racine : https://username.github.io/
export default defineConfig({
  site: 'https://johnstevesg.wixsite.com',
  base: '/',
  build: {
    assets: '_assets',
  },
});
