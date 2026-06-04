# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@imnotpizza/imnotpizza-libs` is a React component design system library (ODS - Open Design System) published to the GitHub NPM registry. It outputs dual-format bundles (ESM + CJS) with a Tailwind CSS preset and shared CSS.

## Commands

```bash
pnpm build          # TypeScript type check + Vite build → dist/
pnpm lint           # ESLint across the project
pnpm storybook      # Storybook dev server at :6006
pnpm build-storybook
pnpm analyze        # Bundle visualizer
```

There is no test script — no unit tests exist in this repo. Storybook stories serve as component documentation/demos.

## Architecture

### Build Outputs (`dist/`)
- `index.js` / `index.mjs` — main component bundle (CJS + ESM)
- `preset.js` / `preset.mjs` — Tailwind CSS preset
- `ods-style.css` — compiled CSS with all CSS variables and base styles

The build is configured in `vite.config.ts` with Terser minification (strips `console.log`). React, React DOM, react-toastify, date-fns, and other peer deps are externalized.

### Source Structure (`lib/`)
- `lib/index.tsx` — single entry point; all public exports live here
- `lib/components/` — one directory per component (Button, Card, Badge, etc.)
- `lib/components/original/` — legacy components using an atoms pattern (do not modify without care)
- `lib/assets/` — SVGs and icons; SVGs are imported as React components via SVGR
- `lib/styles/` — global styles
- `lib/tailwind.preset.js` — Tailwind config preset consumed by downstream projects
- `lib/index.css` — CSS variables for colors, typography, spacing, and layout sizes

### Styling Conventions
- All Tailwind utility classes are prefixed with `ods-` to avoid conflicts in consuming apps
- Dynamic or variant-based styles use `styled-components`; static layout uses Tailwind + `tailwind-merge` (`twMerge`) + `classnames`
- CSS custom properties in `lib/index.css` define the full color/spacing/typography token system
- Checkbox/radio SVG icons are inlined as `data:` URIs in CSS variables

### Component Patterns
- Functional components with TypeScript props interfaces extending native HTML element attributes
- `forwardRef` used where consumers need DOM refs
- Compound component pattern for complex components (e.g., `Card` → `Card.Header`, `Card.Body`, etc.)
- New components should export from `lib/index.tsx`

### Publishing
CI (`publish.yml`) triggers on push to `master`: runs ESLint, builds, and publishes to `https://npm.pkg.github.com/`. Increment `version` in `package.json` before merging to trigger a new release.
