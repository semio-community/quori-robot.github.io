# Quori Website

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/small.svg)](https://astro.build)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Website for [Quori](https://semio.community/quori) — a community-driven modular research platform for human-robot interaction.

## Ecosystem Architecture

This repo is one of four repositories that together form the Semio ecosystem platform:

```
ecosystem-content-hub          Canonical MDX content files (all sites)
ecosystem-content-schema       Shared Zod schemas & TypeScript types
ecosystem-site-core            Shared React UI components & layout
quori-robot.github.io          This repo — Astro site
```

Content is authored in `ecosystem-content-hub` and synced to each site repo's `src/content/` directory. Schemas come from `@semio-community/ecosystem-content-schema`. UI components come from `@semio-community/ecosystem-site-core`.

## Tech Stack

- **Framework**: [Astro v5](https://astro.build/) with React islands (`client:load`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom design tokens
- **Content**: MDX content collections via `createEcosystemCollections`
- **Search**: [Pagefind](https://pagefind.app/) static search
- **Code Quality**: [Biome](https://biomejs.dev/)
- **Deployment**: GitHub Pages via GitHub Actions

## Project Structure

```
src/
├── site.config.ts        Site metadata, menu links, nav styling variant
├── content.config.ts     Content collection definitions (ecosystem schema)
├── content/              MDX content files (synced from content hub)
│   ├── events/
│   ├── hardware/         Quori hardware versions and modules
│   ├── software/
│   ├── research/
│   ├── people/
│   └── organizations/
├── pages/                Astro file-based routing
│   ├── index.astro
│   ├── platform.astro    Quori platform overview + module configurator
│   ├── events.astro
│   ├── events/[...slug].astro
│   ├── projects.astro
│   ├── hardware/[...slug].astro
│   └── ...
├── react-pages/          React page components (used as Astro islands)
│   └── home/
│       ├── HomePage.tsx
│       └── sections/
├── layouts/
│   └── SiteShell.astro   Root HTML layout
├── components/
│   ├── BaseHead.astro    Meta tags, OG, favicons
│   ├── layout/           Header.tsx, Footer.tsx, SkipLink.tsx
│   ├── navigation/       NavIconButton.tsx, MobileNavButton.tsx, navIcons.ts
│   ├── sections/         Thin re-exports of PageSection, SubsectionGrid
│   ├── detail/           DetailHero.tsx adapter, LinkSection.tsx
│   ├── cards/            Thin re-exports of shared card components
│   ├── events/           Thin re-export of EventsSections
│   ├── search/           SearchProvider, SearchModal, SearchApp
│   ├── hero/             HeroHeader.tsx (Quori-branded glyph animation)
│   ├── background/       ParallaxHexBackground.tsx
│   ├── people/           PersonPopover.tsx
│   └── ui/               Configurator, Configurator3D, ModuleCarousel (Quori-specific)
└── utils/                url.ts, date.ts, images.ts, events.ts, etc.
```

## Development

### Prerequisites

Node.js 18+ and npm.

### Setup

```bash
npm install
npm run dev        # dev server at http://localhost:4321
```

### Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server (Astro + CMS preview) |
| `npm run dev:site` | Astro dev server only |
| `npm run build` | Full build: CMS config + Astro + Pagefind index |
| `npm run build:site` | Astro build only |
| `npm run build:search` | Regenerate Pagefind index |
| `npm run preview` | Preview production build locally |
| `npm run check` | Astro type check |
| `npm run lint` | Biome lint |
| `npm run format` | Format code |

## Adding and Modifying Content

Content files are MDX with frontmatter matching the ecosystem content schema. The canonical source is `ecosystem-content-hub`; files are synced into `src/content/<type>/`.

To add a content entry directly, add an MDX file to `src/content/<type>/`. Use an existing entry in the same collection as a reference.

Key frontmatter fields:
- `name` / `title` — display name
- `visibility` — controls which sites show this entry (e.g. `["quori-robot"]`)
- `draft: true` — hides from production builds

## Adding Pages

**Static page**: Add `src/pages/my-page.astro`, import `SiteShell`, render content.

**React page**: Create `src/react-pages/my-page/MyPage.tsx`, then reference from a `.astro` page with `client:load`.

**Detail route**: Already handled by `src/pages/<type>/[...slug].astro` for each content collection.

## Modifying Navigation

Edit `menuLinks` in `src/site.config.ts`. To add a top-level link:
```ts
{
  path: "/my-page/",
  title: "My Page",
  inHeader: true,
  sections: [
    { kind: "link", title: "Section", href: "/my-page/#section" },
  ],
}
```

Set `callToAction: true` to render as a CTA button.

## Quori-Specific Features

- **Platform page** (`src/pages/platform.astro`): Interactive 3D hardware configurator
- **Module configurator** (`src/components/ui/Configurator.tsx`): Rule-based module selection UI
- **3D visualization** (`src/components/ui/configurator3d/`): Three.js/WebGL hardware models

These features are Quori-specific and should remain in this repo.

## Updating the Shared Package

When `@semio-community/ecosystem-site-core` is updated:

```bash
npm install @semio-community/ecosystem-site-core@^X.Y.Z
npx tsc --noEmit    # verify no type errors
npm run build       # verify build succeeds
```

## Deployment

Merging to `main` triggers the GitHub Actions workflow, which builds and deploys to GitHub Pages.

## Contributing

1. Fork the repository and create a feature branch
2. Make changes; run `npm run check` and `npm run build` to verify
3. Open a pull request with a clear description

For guidance on the AI-assisted development workflow, see [AGENTS.md](AGENTS.md).

## License

MIT — see [LICENSE](LICENSE).
