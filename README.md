# Moscow Dog Grooming

Astro 6 marketing site with a GitHub-backed Keystatic CMS. Public pages are prerendered during the build; the Keystatic editor is served dynamically by Astro's standalone Node adapter.

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

Keystatic is configured in GitHub mode for `blazegreenhalgh/moscow-dog-grooming`. On the first visit to `/keystatic`, follow the setup flow to create and install the GitHub App for this repository. The setup creates a private `.env` file containing the required credentials.

Do not commit `.env`. Use `.env.example` as the list of variables that must also be added to the production environment.

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

Content is stored in `src/content/sections`. Uploaded images are stored in `public`. Saving in Keystatic commits the changed content and images to GitHub.

The client can edit headings, paragraphs, button labels, pricing, lists and images. Image uploads do not require alt text or a manual orientation. The gallery keeps each image's natural proportions and creates its masonry-style layout automatically. Location and opening hours are global fields shared by the hero, contact area and footer. Layout classes, colours, component behavior and section anchors remain controlled by the Astro templates.

## Production build

```bash
npm run build
npm start
```

The Node server entrypoint is `dist/server/entry.mjs`.

## Timeweb App Platform

Deploy the repository as a Dockerfile application with:

- Repository: `blazegreenhalgh/moscow-dog-grooming`
- Branch: `main`
- Dockerfile location: repository root
- Project directory: leave empty
- Health-check path: `/`
- Automatic deployments: enabled

The image uses Node.js 24, builds the Astro project, runs the standalone Node server as a non-root user and exposes port `8080`. The public GitHub App slug is compiled into the Keystatic admin UI during the image build.

Add the four Keystatic variables listed in `.env.example` to the Timeweb application. The three private values are read only at runtime and are not stored in the Docker image.

## Client access and publishing

The client needs a GitHub account with write access to the repository. They sign in at `/keystatic` using GitHub. Saving content creates a GitHub commit, which triggers a Timeweb rebuild when automatic deployment is enabled. The public page updates after that deployment completes.
