# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# 작업 순서: 신규 작업 시, 반드시 다음 플로우를 준수하여 작업 진행할 것
1. 기획&요구사항 정리
- atlassian mcp 사용해 Jira 접근하여 기획 확인
- 전반적 작업 내용은 jira에서 확인
- 브랜치 명은 티켓 이름을 그대로 사용

<!-- - 세부 기획, 제약사항 등은 confluence에서 확인(현재 세팅 안되었으므로 무시)
  - PDR: 기획 및 제약사항 어떻게, 어째서 했는지를 정리하는 문서
  - ADR: 특정 기술 도입 결정을 왜 하였는지 정리하는 문서 -->

2. 디자인: stitch mcp 사용해 화면, ui배치 구성
- 반드시 존재하는 디자인 시스템 기반으로 제작할것, 새로 제작 필요할시는 별도 생성 질문후 진행

3. 개발: Jira, confluence, stitch mcp 통해 작업사항 바탕으로 하여  작업내용 파악
- 개발 과정은 red green refactor 원칙 기반 TDD로 작업 진행할 것
- superpowers의 brainstorming skill 사용하여 기획 구체화 진행
- 커밋 메세지: 내용은 전부 한글로 작성할것

- 개발 방법론: superpowers의 test-driven-development skill 사용하여 TDD로 진행
1. 테스트 desc 작성, 작성후 검토 요청하기
2. 구현하려는 기능의 테스트 작성 
3. 테스트를 통과시키는 최소한의 코드 작성
4. 리팩토링 및 개선

- 폴더 구조: fsd 패턴 사용하여 구조적으로 정리
규칙
폴더 구조: 레이어, 슬라이스, 세그먼트로 분류됨

레이어: fsd에서 정의된 폴더 분류
App: 최상위 app.tsx, provider, router 등 최상위 설정들
Pages; 개별 페이지 정의, 비즈니스 로직보다는 사용자 인터페이스 관련 로직만 관리
widgets: 페이지 내 독립적으로 작동하는 기능 관리, 다양한 페이지에서 재사용 가능 (ui): template
Features: 재사용 가능한 비즈니스 기능 위한 레이어, 재사용 가능한 ui+비즈니스 로직: organisms
Entities: 데이터 모델, 데이터에 대한 로직, 사용자 정보 관리 store, interface 정의
Shared: 공용 ui, 유틸 순수함수들-슬라이스 없이 세그먼트만 있음: atoms, molecules

슬라이스: 레이어의 컨텍스트별 폴더, 각 도메인에 대한 폴더명 구성
- index.ts: 해당 슬라이스에서 사용가능한 모든 기능 리턴, 구체적인 경로 몰라도 import 가능함
세그먼트: 컨텍스트별 세부 내용, 아래 디렉토리로 구별되나 커스터마이징 가능
    - Model: 상태관리, 비즈니스로직, 데이터 상태 저장및 관리
    - Ui: 각 기능에 대한 UI
    - api: 각 api 요청에 대한 코드 작성 (rq useQuery, useMutation hoook)
    - Lib: 유틸 순수함수
    - Types: interface, type


레이어는 반드시 자신의 하위요소만 참조해야 함
각 세그먼트의 폴더명은 컨벤션은 있으나 임의 변경 가능





- 중요!: Jsdoc 작성
- 각 작성한 요소의 스펙에 대해 jsdoc 형식의 간단 문서를 작성해야 한다
- 한국어로 작성하며, 함수, 변수, 클래스 등의 경우 요소 바로 위에 작성한다

- 아래의 양식에 따라 작성한다
/** 
 * # 컴포넌트/함수/클래스 이름
   ---
 * - 간단설명: 무슨역할인지 1줄로 설명
   - 제약사항 및 특이사항: 있으면 목록별로 나열
   ---
   @param: 쿼리파라미터
   ex) @param children react children
   ---
 * @example: 간단예제
 * 
 */
 
- type, interface, enum의 경우, jsdoc은 다음과 같은 형태로 작성한다
/**
 * 도서 검색 목록 정렬 기준
 * - ACCURACY = 정확도순
 * - LATEST = 발간일순
 */
export enum FETCH_BOOK_SORT {
	/** 정확도순 */
  ACCURACY = "accuracy",
  /** 발간일순 */
  LATEST = "latest",
}


4. 작업 마무리 및 PR
- 티켓 검토중으로 작업상태 변경
- 각 테스트 진행후 PR 
- AI 가 기본 내용 검토
- 사용자가 최종 검토
 
 

# 프로젝트 스펙 문서

> Daum(Kakao) Books API를 활용한 도서 검색 SPA

---

## 실행 환경

| 항목 | 버전 |
|------|------|
| Node.js | 24.15.0 (Volta 관리) |
| 패키지 매니저 | pnpm |
| TypeScript | 5.7.3 |
| 빌드 도구 | Vite 5.1.0 |

---

## 환경 변수

`.env` 파일에 아래 변수 필요:

```env
VITE_KAKAO_REST_API_KEY=<카카오 REST API 키>
VITE_KAKAO_API_BASE_URL=https://dapi.kakao.com
```

---

## 실행 명령어

```bash
pnpm install           # 의존성 설치
pnpm run dev           # Vite 개발 서버 (http://localhost:5173)
pnpm run build         # TypeScript 검사 + 프로덕션 빌드 (dist/)
pnpm run lint          # ESLint 검사
pnpm run test          # Vitest 단위 테스트
pnpm run test:e2e      # Playwright E2E 테스트
pnpm run test:e2e:ui   # Playwright UI 모드
pnpm run storybook     # Storybook 컴포넌트 탐색기 (http://localhost:6006)
pnpm run bundle:analyze # 번들 시각화 분석
pnpm run svgr          # SVG → React 컴포넌트 자동 생성
```

---

## 주요 의존성

### 런타임 의존성

| 라이브러리 | 버전 | 용도 |
|-----------|------|------|
| react | 19.2.0 | UI 프레임워크 |
| react-dom | 19.2.0 | DOM 렌더링 |
| react-compiler-runtime | 19.1.0-rc.3 | React Compiler (실험적) |
| react-router-dom | ^7.8.2 | 클라이언트 라우팅 |
| @tanstack/react-query | ^5.85.6 | 서버 상태 관리 |
| @lukemorales/query-key-factory | ^1.3.4 | React Query 키 중앙 관리 |
| zustand | ^5.0.12 | 전역 클라이언트 상태 |
| nuqs | ^2.5.2 | URL 쿼리 파라미터 상태 |
| axios | ^1.11.0 | HTTP 클라이언트 |
| react-hook-form | ^7.72.1 | 폼 상태 관리 |
| immer | ^11.1.4 | 불변 상태 업데이트 |
| @radix-ui/react-popover | ^1.1.15 | Popover UI |
| @radix-ui/react-select | ^2.2.6 | Select UI |
| @radix-ui/react-slot | ^1.2.4 | 슬롯 컴포지션 |
| @radix-ui/react-tabs | ^1.1.13 | 탭 UI |
| @radix-ui/react-toast | ^1.2.15 | 토스트 알림 |
| framer-motion | ^12.40.0 | 애니메이션 |
| react-intersection-observer | ^10.0.3 | 무한 스크롤 감지 |
| react-error-boundary | ^6.0.0 | 에러 바운더리 |
| react-modal | ^3.16.3 | 모달 UI |
| react-datepicker | ^8.8.0 | 날짜 선택기 |
| @ssgoi/react | ^4.2.1 | 페이지 전환 애니메이션 |
| autoprefixer | ^10.4.21 | CSS 벤더 프리픽스 |

### 개발 의존성

| 라이브러리 | 버전 | 용도 |
|-----------|------|------|
| vite | ^5.1.0 | 빌드 도구 |
| @vitejs/plugin-react | ^4.2.1 | React + Babel 플러그인 |
| vite-plugin-svgr | ^4.5.0 | SVG → React 컴포넌트 |
| vite-tsconfig-paths | ^5.1.4 | tsconfig paths 해석 |
| vite-bundle-visualizer | ^1.2.1 | 번들 시각화 |
| babel-plugin-react-compiler | 19.1.0-rc.3 | React Compiler 빌드 |
| typescript | 5.7.3 | 타입 검사 |
| vitest | ^3.2.4 | 단위 테스트 |
| @playwright/test | ^1.59.1 | E2E 테스트 |
| @testing-library/react | ^16.3.0 | 컴포넌트 테스트 |
| @testing-library/jest-dom | ^6.9.1 | DOM matcher 확장 |
| @testing-library/user-event | ^14.6.1 | 사용자 이벤트 시뮬레이션 |
| msw | ^2.13.3 | API 모킹 (Mock Service Worker) |
| jsdom | ^27.0.0 | 테스트용 DOM 환경 |
| storybook | ^9.1.8 | 컴포넌트 문서화 |
| @storybook/react-vite | ^9.1.8 | Storybook + Vite |
| tailwindcss | ^3.4.17 | 유틸리티 CSS |
| postcss | ^8.5 | CSS 처리 |
| eslint | ^8.56.0 | 코드 린팅 |
| prettier | ^3.6.2 | 코드 포맷팅 |
| husky | ^9.1.7 | Git 훅 |
| commitlint | ^21.0.1 | 커밋 메시지 검증 |

---

## 아키텍처

### 상태 관리 전략

| 레이어 | 라이브러리 | 담당 |
|--------|-----------|------|
| 서버 캐시 | React Query | API 결과 (검색, 즐겨찾기, 히스토리) |
| URL 상태 | nuqs | 검색 필터, 페이지네이션 |
| 전역 클라이언트 | Jotai (toastStore) / Zustand | 토스트 알림, 검색 폼 |
| 영속성 | localStorage | 즐겨찾기 목록, 검색 히스토리 (최대 8개) |

### 컴포넌트 구조 (Atomic Design)

```
src/components/
├── atoms/          # 기본 UI 요소 (Button, Input, Icons, Skeleton, Toast...)
├── molecules/      # atoms 조합 (Header, SearchQueryInput)
├── organisms/      # 상태 보유, 기능 인식 컴포넌트 (DaumBookItem, ...)
├── template/       # 전체 기능 뷰 (DaumBookSearchView, DaumBookFavoriteView)
└── etc/            # 인프라 (ErrorBoundary, RootProvider, Typography)
```

### 디렉토리 구조 요약

```
프로젝트 루트/
├── src/
│   ├── api/                # Axios 인스턴스 및 API 함수
│   ├── components/         # Atomic Design 컴포넌트
│   ├── constants/          # 앱 상수
│   ├── enums/              # TypeScript Enum
│   ├── hooks/              # 커스텀 훅 (useInfiniteScroll 등)
│   ├── interfaces/         # TypeScript 인터페이스
│   ├── mocks/              # MSW 핸들러 및 서버 설정
│   ├── pages/              # 라우트 페이지 컴포넌트
│   ├── rquery/             # React Query 레이어
│   │   ├── queryKeyFactory.ts  # 쿼리 키 중앙 관리
│   │   └── hooks/          # React Query 커스텀 훅
│   ├── router/             # React Router 설정
│   ├── stores/             # Zustand/Jotai 스토어
│   ├── styles/             # 글로벌 스타일
│   ├── types/              # TypeScript 타입 정의
│   └── utils/              # 유틸 함수 (storage, toast 등)
├── e2e/                    # Playwright E2E 테스트
├── docs/                   # 문서 (ADR, PRD, 스펙)
└── public/                 # 정적 자산 (폰트, 아이콘)
```

---

## 테스트 환경

### 단위 테스트 (Vitest)

- **환경:** jsdom
- **설정 파일:** `vitest.config.ts`, `vitest.setup.ts`
- **대상 파일:** `src/**/*.test.{ts,tsx}`, `src/**/*.spec.{ts,tsx}`
- **주요 설정:**
  - Radix UI jsdom 폴리필 (pointer capture, ResizeObserver, scrollIntoView)
  - localStorage 모킹
  - MSW 서버 생명주기 관리 (beforeAll/afterEach/afterAll)
- **단일 파일 실행:** `npx vitest run src/path/to/file.test.ts`

### E2E 테스트 (Playwright)

- **테스트 디렉토리:** `./e2e`
- **기본 URL:** `http://localhost:5173`
- **브라우저:** Chromium, Firefox, WebKit
- **CI 설정:** 재시도 2회, 단일 워커
- **리포터:** HTML

---

## 빌드 설정

### TypeScript 설정

- **대상:** ES2020
- **모듈:** ESNext
- **경로 별칭:** `@/*` → `src/*`
- **Strict 모드:** 활성화
- **JSX:** react-jsx

### Vite 빌드

- **출력 디렉토리:** `dist/`
- **청크 분리:** `react-datepicker` 별도 청크
- **플러그인:** React Compiler, SVGR, tsconfigPaths, SSGOI

### CSS

- **프레임워크:** Tailwind CSS 3.4.17
- **커스텀 컬러:**
  - primary: `#4880EE` (파란색)
  - red, gray 계열 변형
- **후처리:** PostCSS + Autoprefixer

---

## 코드 품질 도구

| 도구 | 설정 파일 | 용도 |
|------|---------|------|
| ESLint | `eslint.config.js` | Flat config, TypeScript + React Hooks + JSX A11y |
| Prettier | `.prettierrc` | singleQuote, tabWidth 2, trailingComma all |
| Husky | `.husky/` | 커밋 전 훅 |
| Commitlint | `commitlint.config.ts` | Conventional Commits 강제 |

---

## 주요 패턴

### 즐겨찾기 낙관적 업데이트

React Query의 `onMutate`로 캐시를 즉시 업데이트하고, 에러 시 이전 값으로 롤백.
→ `src/rquery/hooks/useToggleFavorite.ts`

### 무한 스크롤

`IntersectionObserver`로 목록 하단 sentinel 감지.
→ `src/hooks/useInfiniteScroll.ts`

### API 레이어

Bearer 토큰 및 공통 헤더가 설정된 Axios 인스턴스를 통해 모든 API 호출.
→ `src/api/index.ts`

### React Query 키 관리

`@lukemorales/query-key-factory`로 쿼리 키를 중앙 관리. 인라인 키 사용 금지.
→ `src/rquery/queryKeyFactory.ts`

---

## 폰트

- Noto Sans KR (Google Fonts, `index.html`에서 로드)
