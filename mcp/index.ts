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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
