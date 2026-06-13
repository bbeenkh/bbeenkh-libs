# MCP Component Installer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `bbeenkh-libs` 컴포넌트를 다른 프로젝트에 파일 복사 + 패키지 설치로 추가하는 로컬 MCP 서버 구축

**Architecture:** `mcp/` 폴더를 독립 Node.js 앱으로 구성. `registry.json`에 컴포넌트별 파일 경로·의존성을 정의하고, `index.ts`가 `list_components` / `add_component` 두 MCP 툴을 노출. stdio transport로 Claude Code에 등록.

**Tech Stack:** `@modelcontextprotocol/sdk`, `tsx` (빌드 없이 TS 직접 실행), Node.js fs/child_process

---

## File Map

| 파일 | 역할 |
|------|------|
| `mcp/package.json` | MCP 서버 전용 의존성 |
| `mcp/tsconfig.json` | TypeScript 설정 |
| `mcp/registry.json` | 컴포넌트 → files + deps 매핑 |
| `mcp/index.ts` | MCP 서버 진입점 (두 툴 구현) |
| `~/.claude/settings.json` | Claude Code MCP 등록 |

---

## Task 1: mcp/package.json + mcp/tsconfig.json 생성

**Files:**
- Create: `mcp/package.json`
- Create: `mcp/tsconfig.json`

- [ ] **Step 1: `mcp/package.json` 작성**

```json
{
  "name": "bbeenkh-libs-mcp",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "tsx index.ts"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

- [ ] **Step 2: `mcp/tsconfig.json` 작성**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["index.ts"]
}
```

- [ ] **Step 3: 의존성 설치**

```bash
cd mcp && npm install
```

Expected: `node_modules/` 생성, `package-lock.json` 생성

- [ ] **Step 4: 커밋**

```bash
git add mcp/package.json mcp/tsconfig.json mcp/package-lock.json
git commit -m "chore: MCP 서버 패키지 설정 추가"
```

---

## Task 2: registry.json 작성

**Files:**
- Create: `mcp/registry.json`

> **파일 경로 규칙:**
> - `lib/components/X/...` → 복사 시 `<target_dir>/X/...`
> - `lib/utils/...` → 복사 시 `<target_dir>/utils/...`

- [ ] **Step 1: `mcp/registry.json` 작성**

```json
{
  "Accordion": {
    "description": "펼침/접힘 아코디언. type=\"single\"|\"multiple\" 지원",
    "files": [
      "lib/components/Accordion/index.tsx",
      "lib/utils/cn.ts"
    ],
    "deps": ["@radix-ui/react-accordion", "classnames", "tailwind-merge"]
  },
  "Anim": {
    "description": "framer-motion 기반 Fade/ScaleFade 애니메이션 래퍼",
    "files": ["lib/components/Anim/index.tsx"],
    "deps": ["framer-motion", "tailwind-merge"]
  },
  "Button": {
    "description": "스타일 없는 버튼. asChild로 Radix Slot 패턴 지원",
    "files": ["lib/components/Button/index.tsx"],
    "deps": ["@radix-ui/react-slot"]
  },
  "Card": {
    "description": "흰 배경 카드 레이아웃. Card.Header/.Title/.Body/.Footer",
    "files": ["lib/components/Card/index.tsx"],
    "deps": ["tailwind-merge"]
  },
  "CardUI": {
    "description": "shadcn 스타일 카드. CardHeader/Title/Description/Action/Content/Footer",
    "files": [
      "lib/components/CardUI/index.tsx",
      "lib/utils/cn.ts"
    ],
    "deps": ["classnames", "tailwind-merge"]
  },
  "Checkbox": {
    "description": "커스텀 아이콘 주입 가능 체크박스. 제어/비제어 모드 지원",
    "files": ["lib/components/Checkbox/index.tsx"],
    "deps": ["@radix-ui/react-checkbox", "tailwind-merge"]
  },
  "ContextMenu": {
    "description": "우클릭 컨텍스트 메뉴. 서브메뉴/체크박스/라디오 항목 지원",
    "files": [
      "lib/components/ContextMenu/index.tsx",
      "lib/utils/cn.ts"
    ],
    "deps": ["@radix-ui/react-context-menu", "classnames", "tailwind-merge"]
  },
  "DropdownMenu": {
    "description": "버튼 트리거 드롭다운 메뉴. 서브메뉴/체크박스/라디오 항목 지원",
    "files": [
      "lib/components/DropdownMenu/index.tsx",
      "lib/utils/cn.ts"
    ],
    "deps": ["@radix-ui/react-dropdown-menu", "classnames", "tailwind-merge"]
  },
  "Fallback": {
    "description": "빈 상태(empty state) 표시. 아이콘 + 메시지 조합",
    "files": [
      "lib/components/Fallback/index.tsx",
      "lib/utils/cn.ts"
    ],
    "deps": ["classnames", "tailwind-merge"]
  },
  "Input": {
    "description": "prefix/suffix 슬롯, onEnter 콜백 지원 입력 필드",
    "files": ["lib/components/Input/index.tsx"],
    "deps": ["tailwind-merge"]
  },
  "Layout": {
    "description": "페이지 루트 레이아웃. Layout.Header/.Body/.Footer",
    "files": ["lib/components/Layout/index.tsx"],
    "deps": []
  },
  "Modal": {
    "description": "Radix Dialog 기반 모달. 크기 md/lg/xl, ErrorBoundary 내장",
    "files": ["lib/components/Modal/index.tsx"],
    "deps": ["@radix-ui/react-dialog", "react-error-boundary", "tailwind-merge"]
  },
  "Popover": {
    "description": "Radix Popover 기반 팝오버. Root/Trigger/Content/Arrow/Close",
    "files": ["lib/components/Popover/index.tsx"],
    "deps": ["@radix-ui/react-popover", "tailwind-merge"]
  },
  "RadioButton": {
    "description": "라디오 그룹. RadioButton.Group + RadioButton.Item",
    "files": ["lib/components/RadioButton/index.tsx"],
    "deps": ["@radix-ui/react-radio-group", "tailwind-merge"]
  },
  "Selectbox": {
    "description": "options 배열 주입 방식 선택 박스",
    "files": ["lib/components/Selectbox/index.tsx"],
    "deps": ["@radix-ui/react-select"]
  },
  "Separator": {
    "description": "수평/수직 구분선. orientation prop으로 방향 지정",
    "files": ["lib/components/Separator/index.tsx"],
    "deps": ["@radix-ui/react-separator", "tailwind-merge"]
  },
  "Skeleton": {
    "description": "로딩 플레이스홀더. Skeleton.Box/.Circle/.Container",
    "files": ["lib/components/Skeleton/index.tsx"],
    "deps": []
  },
  "Spinner": {
    "description": "SVG 스피너. xs/sm/lg/xl 사이즈 (SVGR 설정 필요)",
    "files": ["lib/components/Spinner/index.tsx"],
    "deps": ["tailwind-merge"],
    "note": "lib/assets/svgs/spinner-icon.svg 파일과 타겟 프로젝트의 SVGR 플러그인 설정이 필요합니다."
  },
  "SwitchButton": {
    "description": "토글 스위치. 기본 스타일 포함, styleClass로 커스터마이즈",
    "files": ["lib/components/SwitchButton/index.tsx"],
    "deps": ["@radix-ui/react-switch", "tailwind-merge"]
  },
  "Tab": {
    "description": "탭 UI. Tab.Root/List/Trigger/Content",
    "files": ["lib/components/Tab/index.tsx"],
    "deps": ["@radix-ui/react-tabs"]
  },
  "Toast": {
    "description": "알림 토스트. Toast.Provider로 앱 루트에서 감싸서 사용",
    "files": ["lib/components/Toast/index.tsx"],
    "deps": ["@radix-ui/react-toast"]
  }
}
```

- [ ] **Step 2: 커밋**

```bash
git add mcp/registry.json
git commit -m "chore: MCP 컴포넌트 레지스트리 추가"
```

---

## Task 3: mcp/index.ts — list_components 툴

**Files:**
- Create: `mcp/index.ts`

- [ ] **Step 1: `mcp/index.ts` 기본 골격 + list_components 구현**

```ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIB_ROOT = path.resolve(__dirname, '..');

interface ComponentEntry {
  description: string;
  files: string[];
  deps: string[];
  note?: string;
}

type Registry = Record<string, ComponentEntry>;

function loadRegistry(): Registry {
  const registryPath = path.join(__dirname, 'registry.json');
  return JSON.parse(fs.readFileSync(registryPath, 'utf-8')) as Registry;
}

const server = new Server(
  { name: 'component-installer', version: '1.0.0' },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'list_components',
      description: '설치 가능한 컴포넌트 목록을 반환합니다.',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
    {
      name: 'add_component',
      description:
        '컴포넌트 파일을 타겟 디렉토리에 복사하고 npm 의존성을 설치합니다.',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: '컴포넌트 이름 (예: Button, Modal)',
          },
          target_dir: {
            type: 'string',
            description: '타겟 프로젝트의 컴포넌트 폴더 절대경로 (예: /Users/me/my-app/src/components)',
          },
        },
        required: ['name', 'target_dir'],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'list_components') {
    const registry = loadRegistry();
    const list = Object.entries(registry)
      .map(([key, entry]) => `• **${key}** — ${entry.description}`)
      .join('\n');
    return {
      content: [{ type: 'text', text: `사용 가능한 컴포넌트 (${Object.keys(registry).length}개):\n\n${list}` }],
    };
  }

  if (name === 'add_component') {
    return handleAddComponent(args as { name: string; target_dir: string });
  }

  return {
    content: [{ type: 'text', text: `Unknown tool: ${name}` }],
    isError: true,
  };
});

// Task 4에서 전체 구현으로 교체할 스텁
function handleAddComponent(_args: { name: string; target_dir: string }) {
  return {
    content: [{ type: 'text', text: 'add_component: not yet implemented' }],
    isError: true,
  };
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
```

- [ ] **Step 2: 서버가 기동되는지 확인**

```bash
cd mcp && echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | npx tsx index.ts
```

Expected: JSON 응답에 `list_components`, `add_component` 두 툴이 포함됨

- [ ] **Step 3: 커밋**

```bash
git add mcp/index.ts
git commit -m "feat: MCP 서버 기본 골격 + list_components 툴 추가"
```

---

## Task 4: mcp/index.ts — add_component 툴 구현

**Files:**
- Modify: `mcp/index.ts`

- [ ] **Step 1: 헬퍼 함수 3개를 `main()` 앞에 추가**

`// add_component 구현은 Task 4에서 추가` 주석을 아래 코드로 교체:

```ts
function getDestPath(srcRelative: string, targetDir: string): string {
  if (srcRelative.startsWith('lib/components/')) {
    return path.join(targetDir, srcRelative.slice('lib/components/'.length));
  }
  if (srcRelative.startsWith('lib/utils/')) {
    return path.join(targetDir, 'utils', srcRelative.slice('lib/utils/'.length));
  }
  return path.join(targetDir, path.basename(srcRelative));
}

function findProjectRoot(startDir: string): string | null {
  let dir = startDir;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'package.json'))) return dir;
    dir = path.dirname(dir);
  }
  return null;
}

function detectPackageManager(projectRoot: string): 'pnpm' | 'yarn' | 'npm' {
  if (fs.existsSync(path.join(projectRoot, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(projectRoot, 'yarn.lock'))) return 'yarn';
  return 'npm';
}

function handleAddComponent(args: { name: string; target_dir: string }) {
  const registry = loadRegistry();

  // 1. 컴포넌트 조회 (case-insensitive)
  const key = Object.keys(registry).find(
    (k) => k.toLowerCase() === args.name.toLowerCase(),
  );
  if (!key) {
    const available = Object.keys(registry).join(', ');
    return {
      content: [
        {
          type: 'text',
          text: `컴포넌트 "${args.name}"을 찾을 수 없습니다.\n사용 가능: ${available}`,
        },
      ],
      isError: true,
    };
  }

  const entry = registry[key];

  // 2. target_dir 존재 확인
  if (!fs.existsSync(args.target_dir)) {
    return {
      content: [
        {
          type: 'text',
          text: `target_dir가 존재하지 않습니다: ${args.target_dir}`,
        },
      ],
      isError: true,
    };
  }

  // 3. 파일 복사
  const copiedFiles: string[] = [];
  for (const srcRelative of entry.files) {
    const srcAbs = path.join(LIB_ROOT, srcRelative);
    const destAbs = getDestPath(srcRelative, args.target_dir);
    fs.mkdirSync(path.dirname(destAbs), { recursive: true });
    fs.copyFileSync(srcAbs, destAbs);
    copiedFiles.push(destAbs);
  }

  // 4. 패키지 매니저 감지 + 설치
  let installResult = '';
  if (entry.deps.length > 0) {
    const projectRoot = findProjectRoot(args.target_dir);
    if (!projectRoot) {
      installResult = '⚠️ package.json을 찾지 못해 의존성 설치를 건너뜁니다.';
    } else {
      const pm = detectPackageManager(projectRoot);
      const installCmd =
        pm === 'npm'
          ? `npm install ${entry.deps.join(' ')}`
          : `${pm} add ${entry.deps.join(' ')}`;
      try {
        execSync(installCmd, { cwd: projectRoot, stdio: 'pipe' });
        installResult = `✅ ${pm}로 설치 완료: ${entry.deps.join(', ')}`;
      } catch (e) {
        installResult = `⚠️ 패키지 설치 실패 (수동 설치 필요): ${entry.deps.join(', ')}\n명령: ${installCmd}`;
      }
    }
  } else {
    installResult = '(추가 패키지 없음)';
  }

  const noteSection = entry.note ? `\n📌 참고: ${entry.note}` : '';

  return {
    content: [
      {
        type: 'text',
        text: [
          `✅ ${key} 컴포넌트 설치 완료`,
          '',
          '**복사된 파일:**',
          ...copiedFiles.map((f) => `  - ${f}`),
          '',
          `**의존성:** ${installResult}`,
          noteSection,
        ].join('\n'),
      },
    ],
  };
}
```

- [ ] **Step 2: add_component 동작 확인**

테스트용 임시 디렉토리를 만들어 실행:

```bash
mkdir -p /tmp/test-project/src/components
echo '{}' > /tmp/test-project/package.json

echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"add_component","arguments":{"name":"Button","target_dir":"/tmp/test-project/src/components"}}}' \
  | cd mcp && npx tsx index.ts
```

Expected:
- `/tmp/test-project/src/components/Button/index.tsx` 파일 생성 확인
- 응답 텍스트에 `✅ Button 컴포넌트 설치 완료` 포함

```bash
cat /tmp/test-project/src/components/Button/index.tsx
```

Expected: `bbeenkh-libs`의 Button 컴포넌트 소스와 동일

- [ ] **Step 3: 임시 디렉토리 정리**

```bash
rm -rf /tmp/test-project
```

- [ ] **Step 4: 커밋**

```bash
git add mcp/index.ts
git commit -m "feat: MCP add_component 툴 구현"
```

---

## Task 5: Claude Code settings.json 등록

**Files:**
- Modify: `~/.claude/settings.json`

- [ ] **Step 1: settings.json에 MCP 서버 등록**

`~/.claude/settings.json`을 열어 `mcpServers` 키 추가 (이미 다른 서버가 있으면 병합):

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

- [ ] **Step 2: Claude Code 재시작 후 연결 확인**

Claude Code 재시작 후 채팅창에서:
```
/mcp
```

Expected: `component-installer` 서버가 `connected` 상태로 표시됨

- [ ] **Step 3: 동작 테스트**

Claude Code 채팅에서:
```
list_components 툴로 사용 가능한 컴포넌트 목록 보여줘
```

Expected: 21개 컴포넌트 목록이 출력됨
