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
- `style.css` — compiled CSS with all CSS variables and base styles

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
- All Tailwind utility classes are prefixed with `` to avoid conflicts in consuming apps
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

## Component List

모든 컴포넌트는 `lib/components/<Name>/index.tsx`에 위치하며, `lib/index.tsx`에서 공개 export된다.

| 컴포넌트 | export 이름 | 패턴 | 기반 | 설명 |
|---|---|---|---|---|
| Accordion | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | Compound | Radix Accordion | 펼침/접힘 아코디언. `type="single"\|"multiple"` |
| Anim | (내부 전용) | Compound | framer-motion | 페이드/스케일 애니메이션 래퍼. `Anim.Fade`, `Anim.ScaleFade` |
| Button | `Button` | 단일 | Radix Slot | 스타일 없는 버튼. `asChild`로 Slot 패턴 지원 |
| Card (legacy) | `Card` | Compound | 순수 React | 흰 배경 카드. `Card.Header`, `.Title`, `.Body`, `.Footer` |
| CardUI | `CardUI` (내부 전용) | Named export | 순수 React | shadcn 스타일 카드. `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` |
| Checkbox | `Checkbox` | 단일 | Radix Checkbox | 커스텀 아이콘 주입 가능 체크박스 |
| ContextMenu | (내부 전용) | Compound | Radix ContextMenu | 우클릭 컨텍스트 메뉴 |
| DropdownMenu | (내부 전용) | Compound | Radix DropdownMenu | 버튼 트리거 드롭다운 메뉴 |
| Fallback | `Fallback` | 단일 | 순수 React | 빈 상태(empty state) 표시. 아이콘 + 메시지 |
| Input | `Input` | 단일 | 순수 React | prefix/suffix 슬롯 + `onEnter` 콜백 |
| Layout | (내부 전용) | Compound | 순수 React | 페이지 루트 레이아웃. `Layout.Header`, `.Body`, `.Footer` |
| Modal | `Modal` | Compound | Radix Dialog | 크기(`md/lg/xl`), 외부클릭 방지, ErrorBoundary 내장 |
| Popover | (내부 전용) | Compound | Radix Popover | `Popover.Root/Trigger/Content/Arrow/Close` |
| RadioButton | `RadioButton` | Compound | Radix RadioGroup | `RadioButton.Group` + `RadioButton.Item` |
| Selectbox | (내부 전용) | 단일 | Radix Select | `options` 배열 주입 방식 선택 박스 |
| Separator | `Separator` | 단일 | Radix Separator | 수평/수직 구분선. `orientation` prop |
| Skeleton | `Skeleton` | Compound | 순수 React | 로딩 플레이스홀더. `Skeleton.Box`, `.Circle`, `.Container` |
| Spinner | (내부 전용) | 단일 | 순수 React | SVG 스피너. `xs/sm/lg/xl` 사이즈 |
| SwitchButton | `SwitchButton` | 단일 | Radix Switch | 토글 스위치. 기본 스타일 포함 |
| Tab | (내부 전용) | Compound | Radix Tabs | `Tab.Root/List/Trigger/Content` |
| Toast | (내부 전용) | Compound | Radix Toast | `Toast.Provider`로 앱 루트에서 감싸서 사용 |

> **참고**: `lib/index.tsx`에 export된 컴포넌트만 패키지 소비자에게 공개된다. "내부 전용"은 현재 `lib/index.tsx`에 export되지 않은 컴포넌트이다.
