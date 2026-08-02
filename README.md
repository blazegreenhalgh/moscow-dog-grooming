# Moscow Dog Grooming

Astro 6 marketing site with a local Keystatic CMS. Public pages are prerendered during the build; the Keystatic editor is served dynamically by Astro's standalone Node adapter.

## Requirements

- Node.js 24
- npm

## Local development

```bash
npm install
npm run dev
```

Open:

- Website: `http://localhost:4321/`
- CMS: `http://localhost:4321/keystatic`

Keystatic is currently configured in `local` storage mode. Saving in the CMS writes the corresponding JSON and image files directly into this project.

## Editable sections

The CMS navigation follows the order of the homepage:

1. Site, header and footer
2. Hero
3. Services
4. Before and after
5. Benefits
6. Pricing
7. Gallery
8. Reviews
9. How it works
10. FAQ
11. Contact

Content is stored in `src/content/sections`. Uploaded images are stored in `public` and committed with the content when Git storage is enabled later.

The client can edit headings, paragraphs, button labels, pricing, lists and images. Image uploads do not require alt text or a manual orientation. The gallery keeps each image's natural proportions and creates its masonry-style layout automatically. Location and opening hours are global fields shared by the hero, contact area and footer. Layout classes, colours, component behavior and section anchors remain controlled by the Astro templates.

## Production build

```bash
npm run build
npm start
```

The Node server entrypoint is `dist/server/entry.mjs`. Set `HOST=0.0.0.0` in Timeweb. Astro will use the platform's `PORT` value when it is provided.

## Not completed yet

The project has deliberately not been connected or pushed to GitHub. Before the Timeweb deployment:

1. Create the GitHub repository and push the project.
2. Create a Keystatic Cloud team and project connected to that repository.
3. Change `storage.kind` in `keystatic.config.ts` from `local` to `cloud`.
4. Add the Keystatic Cloud `team/project` identifier.
5. Connect the repository to a Timeweb Backend application with automatic deployment enabled.
