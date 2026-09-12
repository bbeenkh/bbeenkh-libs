import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const LIB_ROOT = join(__dirname, '..', 'lib');
const REGISTRY_PATH = join(__dirname, 'component-desc.json');

// --- helpers ---

async function loadRegistry(): Promise<
  Record<
    string,
    { description: string; files: string[]; stories?: string; deps: string[] }
  >
> {
  const raw = await readFile(REGISTRY_PATH, 'utf-8');
  return JSON.parse(raw);
}

/**
 * 컴포넌트 스펙 담긴 component-desc.json 읽어들여 요청에 맞는 컴포넌트의 코드 읽기
 */
async function readComponentSource(name: string): Promise<string> {
  const registry = await loadRegistry();
  const entry = registry[name];
  if (!entry) throw new Error(`Unknown component: ${name}`);

  const sources: string[] = [];
  for (const filePath of entry.files) {
    const absPath = join(__dirname, '..', filePath);
    const content = await readFile(absPath, 'utf-8');
    sources.push(`// --- ${filePath} ---\n${content}`);
  }
  if (entry.stories) {
    const absPath = join(__dirname, '..', entry.stories);
    const content = await readFile(absPath, 'utf-8');
    sources.push(`// --- ${entry.stories} (usage examples) ---\n${content}`);
  }
  return sources.join('\n\n');
}

/**
 * 
 */
async function readDesignTokens(): Promise<string> {
  return readFile(join(LIB_ROOT, 'index.css'), 'utf-8');
}

// --- server ---

const server = new Server(
  { name: 'bbeenkh-libs-server', version: '1.0.0' },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'list_components',
      description:
        'List available UI components in the bbeenkh-libs design system',
      inputSchema: {
        type: 'object' as const,
        properties: {
          filter: {
            type: 'string',
            description: 'Optional substring to filter component names',
          },
        },
      },
    },
    {
      name: 'get_component_spec',
      description:
        'Get the full source code of a component to understand its props and patterns',
      inputSchema: {
        type: 'object' as const,
        properties: {
          name: {
            type: 'string',
            description: 'Component name (e.g. "Button", "Modal", "Card")',
          },
        },
        required: ['name'],
      },
    },
    {
      name: 'get_design_tokens',
      description:
        'Get CSS custom properties (colors, spacing, typography, layout tokens)',
      inputSchema: {
        type: 'object' as const,
        properties: {},
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'list_components': {
      const registry = await loadRegistry();
      const filter = String(args?.filter ?? '').toLowerCase();
      const entries = Object.entries(registry)
        .filter(([k]) => !filter || k.toLowerCase().includes(filter))
        .map(([k, v]) => ({
          name: k,
          description: v.description,
          deps: v.deps,
        }));
      return {
        content: [{ type: 'text', text: JSON.stringify(entries, null, 2) }],
      };
    }

    case 'get_component_spec': {
      const componentName = String(args?.name ?? '');
      const source = await readComponentSource(componentName);
      return { content: [{ type: 'text', text: source }] };
    }

    case 'get_design_tokens': {
      const tokens = await readDesignTokens();
      return { content: [{ type: 'text', text: tokens }] };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error('bbeenkh-libs MCP Server Started');
