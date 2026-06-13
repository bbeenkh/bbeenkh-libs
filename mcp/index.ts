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
