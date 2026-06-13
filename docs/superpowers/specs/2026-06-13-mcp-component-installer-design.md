# MCP Component Installer — Design Spec

**Date:** 2026-06-13
**Status:** Approved

---

## Overview

`bbeenkh-libs` 컴포넌트를 다른 프로젝트에 복사·설치하는 로컬 MCP 서버.
Claude Code(또는 MCP 호환 IDE)에서 `list_components` / `add_component` 툴로 컴포넌트 파일을 타겟 프로젝트에 복사하고, 필요한 npm 패키지를 자동으로 설치한다.

---

## File Structure

```
bbeenkh-libs/
└── mcp/
    ├── index.ts          ← MCP 서버 진입점 (stdio transport)
    ├── registry.json     ← 컴포넌트별 files + deps 메타데이터
    └── package.json      ← MCP 서버 전용 의존성
```

- 기존 라이브러리 빌드(`vite.config.ts`, `lib/`)와 완전히 분리된 독립 Node.js 앱.
- `mcp/package.json`은 라이브러리 루트 `package.json`과 별개로 관리한다.

---

## registry.json Schema

```ts
type Registry = Record<string, ComponentEntry>;

interface ComponentEntry {
  description: string;       // 한줄 설명 (list_components 응답에 표시)
  files: string[];           // 라이브러리 루트 기준 상대 경로
  deps: string[];            // npm 패키지명 배열
}
```

예시:
```json
{
  "Button": {
    "description": "스타일 없는 버튼. asChild로 Radix Slot 패턴 지원",
    "files": ["lib/components/Button/index.tsx"],
    "deps": ["@radix-ui/react-slot"]
  },
  "Modal": {
    "description": "Radix Dialog 기반 모달. 크기 md/lg/xl, ErrorBoundary 내장",
    "files": ["lib/components/Modal/index.tsx"],
    "deps": ["@radix-ui/react-dialog", "react-error-boundary"]
  }
}
```

---

## MCP Tools

### `list_components`

| 항목 | 내용 |
|------|------|
| 입력 | 없음 |
| 출력 | `{ name, description }[]` 형태의 컴포넌트 목록 |

### `add_component`

| 항목 | 내용 |
|------|------|
| 입력 | `name: string` — 컴포넌트명 (registry key와 case-insensitive 매치), `target_dir: string` — 타겟 프로젝트의 컴포넌트 폴더 **절대경로** |
| 출력 | 성공 메시지 또는 에러 메시지 |

**실행 순서:**

1. `registry.json`에서 `name`에 해당하는 항목 조회 → 없으면 에러 반환
2. `<target_dir>/<ComponentName>/` 디렉토리 생성 (이미 존재하면 덮어씀)
3. `files` 목록의 각 파일을 `<target_dir>/<ComponentName>/` 에 복사
4. 타겟 프로젝트 루트(= `target_dir`를 역방향 탐색해서 `package.json` 위치) 감지
5. 패키지 매니저 자동 감지:
   - `pnpm-lock.yaml` 존재 → `pnpm add`
   - `yarn.lock` 존재 → `yarn add`
   - 그 외 → `npm install`
6. `deps` 설치 실행
7. 결과 반환 (복사된 파일 경로, 설치된 패키지 목록)

**에러 케이스:**

| 상황 | 동작 |
|------|------|
| 존재하지 않는 컴포넌트명 | 에러 메시지 + 사용 가능한 목록 안내 |
| `target_dir`가 존재하지 않음 | 에러 메시지 |
| 패키지 설치 실패 | 파일 복사는 유지, 설치 실패 메시지 반환 |

---

## Dependencies (`mcp/package.json`)

```json
{
  "dependencies": {
    "@modelcontextprotocol/sdk": "latest"
  },
  "devDependencies": {
    "tsx": "latest",
    "typescript": "latest"
  }
}
```

- `tsx`로 TypeScript를 직접 실행 (별도 빌드 스텝 없음).

---

## Claude Code 등록

`~/.claude/settings.json`에 추가:

```json
{
  "mcpServers": {
    "component-installer": {
      "command": "npx",
      "args": ["tsx", "/Users/gobobin/projects/bbeenkh-libs/mcp/index.ts"]
    }
  }
}
```

---

## Out of Scope

- CSS variables / Tailwind config 셋업 (옵션 C) — 이번 범위 아님
- 컴포넌트 업데이트/버전 관리
- 원격 서버 배포
