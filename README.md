# Cours de musique en ligne

Site vitrine Astro pour proposer des cours de musique en ligne, déployé sur GitHub Pages.

## Prérequis

- Node.js 18+
- npm

## Développement local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
```

Les fichiers statiques sont générés dans `dist/`.

## Déploiement sur GitHub Pages

1. **Configurer la base URL**  
   Dans `astro.config.mjs`, remplacez `base: '/siteweb'` par le nom de votre dépôt.  
   Exemple : si votre dépôt s’appelle `cours-musique`, mettez `base: '/cours-musique'`.  
   Si votre site est à `https://votre-username.github.io/` (sans sous-chemin), mettez `base: '/'`.

2. **Activer GitHub Pages**  
   Sur le dépôt GitHub : **Settings → Pages**.  
   Source : **GitHub Actions**.

3. **Pousser le code**  
   À chaque push sur la branche `main`, le workflow `.github/workflows/deploy.yml` build le site et le déploie sur GitHub Pages.

## Structure du projet

- `src/layouts/Layout.astro` — mise en page et navigation
- `src/pages/` — pages du site (accueil, cours, à propos, contact)
- `public/` — fichiers statiques (favicon, etc.)

Personnalisez le contenu (texte, email de contact, offres de cours) directement dans les fichiers `.astro` des pages.
