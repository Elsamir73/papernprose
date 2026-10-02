# PapernProse

PapernProse is a responsive book discovery and review site built with React 18, TypeScript, Vite, and React Router. The sample books, writers, and editorial posts are fictional. Shelf state, reading progress, followed authors, and theme preference stay in browser localStorage; there is no backend.

## TODO

- [x] Scaffold Vite, React 18, TypeScript, Router, and local fonts
- [x] Add fictional catalog data and reusable UI
- [x] Build lazy routes, discovery pages, and reader workflows
- [x] Add responsive design, accessibility, metadata, and legal/info pages
- [x] Add Vercel deployment and search indexing files
- [x] Run lint, production build, and preview route checks

## Setup

Requirements: Node.js supported by the installed Vite version and npm.

```sh
npm install
npm run dev
```

The development server prints its local URL. No environment variables or backend are needed.

## Scripts

- `npm run dev` starts the Vite development server.
- `npm run lint` runs ESLint.
- `npm run build` runs strict TypeScript checks and creates `dist/`.
- `npm run preview` serves the production build locally.

## Folder Map

- `src/components/` reusable layout, header, footer, book covers/cards, ratings, search, shelf and theme controls
- `src/data/` fictional book, author, post, and genre JSON
- `src/hooks/` localStorage and document metadata hooks
- `src/pages/` lazy-loaded route page modules
- `src/styles/` design tokens and responsive site styles
- `src/types/` shared TypeScript data types
- `public/` favicon, robots policy, and sitemap

## Editing the Catalog

To add a book, add an object to `src/data/books.json` with a unique `id` and `slug`, an existing `authorId` from `authors.json`, a genre name from `genres.json`, and the remaining fields represented by the other entries. Ratings accept half-star increments from 0 to 5. Use `"#"` for each `buyLinks[].url` in this sample project. Its cover is generated automatically from `coverColor`, title, and author.

To add an author, add a unique object to `src/data/authors.json` with `id`, URL-safe `slug`, display `name`, short `bio`, and a CSS hex `color`; reference its `id` from books. Add posts to `src/data/posts.json` and use one of the four supported categories. The six genre definitions live in `src/data/genres.json`.

## Choices and Limitations

- The current Vite scaffold wizard installs React 19 by default, so dependencies were explicitly aligned to React 18.
- React Router 7 is used with React 18 to clear the Router 6 npm advisories while preserving the BrowserRouter route model.
- Route page families are split with `React.lazy` and `Suspense`; static catalog content is bundled from local JSON.
- Theme defaults to the operating-system preference and can be set to light/dark from the header. Reader state is local to each browser.
- Contact, newsletter, and book-submission forms validate and show local success states only; they do not send or persist form contents.
- Sitemap and robots entries use `https://papernprose.vercel.app`. Deployment steps are in `DEPLOY.md`.
- Privacy, terms, contact disclosures, and affiliate language are placeholders. **A qualified professional must review all legal and privacy text before launch.**
- The sample content and all cover designs are fictional and do not use external book imagery.
