import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { readFile, writeFile, mkdir, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const LIB_ROOT = join(__dirname, '..', 'lib');
const REPO_ROOT = join(__dirname, '..');
const REGISTRY_PATH = join(__dirname, 'component-desc.json');
const GUIDELINES_DIR = join(__dirname, 'guidelines');

// --- types ---

interface RegistryEntry {
  category?: string;
  description: string;
  files: string[];
  stories?: string;
  deps: string[];
  note?: string;
}

// --- helpers ---

async function loadRegistry(): Promise<Record<string, RegistryEntry>> {
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

async function readDesignTokens(): Promise<string> {
  return readFile(join(LIB_ROOT, 'index.css'), 'utf-8');
}

/**
 * 현재 repo의 package.json에서 의존성 버전을 런타임에 읽어옴
 */
async function readRepoDeps(): Promise<{
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}> {
  const raw = await readFile(join(REPO_ROOT, 'package.json'), 'utf-8');
  const pkg = JSON.parse(raw);
  return {
    dependencies: pkg.dependencies ?? {},
    devDependencies: pkg.devDependencies ?? {},
  };
}

function getTemplates(
  name: string,
  deps: { dependencies: Record<string, string>; devDependencies: Record<string, string> },
): Record<string, string> {
  const pick = (keys: string[], from: Record<string, string>) =>
    Object.fromEntries(keys.filter((k) => k in from).map((k) => [k, from[k]]));

  const appDeps = pick(
    [
      'react',
      'react-dom',
      'axios',
      'zustand',
      'immer',
      'nuqs',
      'react-router-dom',
      'framer-motion',
      'classnames',
      'tailwind-merge',
      'dayjs',
      'lodash-es',
      'react-error-boundary',
    ],
    deps.dependencies,
  );

  const appDevDeps = pick(
    [
      '@types/react',
      '@types/react-dom',
      '@types/lodash-es',
      '@vitejs/plugin-react',
      '@tanstack/react-query',
      '@testing-library/jest-dom',
      '@testing-library/react',
      '@testing-library/user-event',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'autoprefixer',
      'eslint',
      'eslint-config-prettier',
      'eslint-import-resolver-typescript',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-prettier',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'eslint-plugin-react-refresh',
      'husky',
      'jsdom',
      'msw',
      'postcss',
      'prettier',
      'react-hook-form',
      'tailwindcss',
      'typescript',
      'vite',
      'vite-plugin-svgr',
      'vitest',
    ],
    deps.devDependencies,
  );

  return {
    'package.json': JSON.stringify(
      {
        name,
        version: '0.1.0',
        private: true,
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'tsc && vite build',
          preview: 'vite preview',
          test: 'vitest run',
          'test:watch': 'vitest',
          lint: 'eslint .',
          prepare: 'husky',
        },
        dependencies: appDeps,
        devDependencies: appDevDeps,
      },
      null,
      2,
    ),

    'tsconfig.json': JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          lib: ['DOM', 'DOM.Iterable', 'ESNext'],
          module: 'ESNext',
          moduleResolution: 'bundler',
          jsx: 'react-jsx',
          strict: true,
          skipLibCheck: true,
          noEmit: true,
          isolatedModules: true,
          esModuleInterop: true,
          resolveJsonModule: true,
          baseUrl: '.',
          paths: { '@/*': ['src/*'] },
        },
        include: ['src'],
      },
      null,
      2,
    ),

    'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@/': \`\${__dirname}/src/\`,
    },
  },
});
`,

    'vitest.config.ts': `import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
});
`,

    'vitest.setup.ts': `import '@testing-library/jest-dom';
`,

    'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
`,

    'postcss.config.js': `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,

    '.prettierrc': JSON.stringify(
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        useTabs: false,
        trailingComma: 'all',
        bracketSpacing: true,
        semi: true,
      },
      null,
      2,
    ),

    '.eslintrc.cjs': `module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
  },
  env: { browser: true, es6: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import', 'prettier', 'jsx-a11y'],
  settings: {
    'import/resolver': {
      typescript: { project: './tsconfig.json', alwaysTryTypes: true },
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    },
    react: { version: 'detect' },
  },
  rules: {
    'no-console': 'warn',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': 'warn',
  },
  ignorePatterns: ['node_modules/', 'dist/'],
};
`,

    '.gitignore': `node_modules/
dist/
.env
.env.*
.env.local
*.log
`,

    'index.html': `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,

    'src/main.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`,

    'src/App.tsx': `import { useState, type FormEvent } from 'react';
import { cn } from './utils/cn';

function App() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(name);
    setName('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-100 sticky top-0 p-4">
        <h1 className="text-xl font-bold">폼 예제</h1>
      </header>
      <main className="flex-1 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
          <input
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={cn('border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none')}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:opacity-80"
          >
            제출
          </button>
          {submitted && (
            <p className="text-sm text-green-600">제출됨: {submitted}</p>
          )}
        </form>
      </main>
    </div>
  );
}

export default App;
`,

    'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;
`,

    'src/utils/cn.ts': `import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: Parameters<typeof classnames>) =>
  twMerge(classnames(...inputs));
`,
  };
}

// --- server ---

const server = new Server(
  { name: 'bbeenkh-libs-server', version: '2.0.0' },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    // --- 기존 tools ---
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
        'Get the full source code of a component, hook, or util to understand its props and patterns',
      inputSchema: {
        type: 'object' as const,
        properties: {
          name: {
            type: 'string',
            description:
              'Item name (e.g. "Button", "Modal", "useInfiniteScroll", "cn")',
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
    // --- 신규 tools ---
    {
      name: 'list_items',
      description:
        'List all registry items (components, hooks, utils) with optional category filter',
      inputSchema: {
        type: 'object' as const,
        properties: {
          filter: {
            type: 'string',
            description: 'Optional substring to filter item names',
          },
          category: {
            type: 'string',
            enum: ['component', 'hook', 'util'],
            description: 'Filter by category',
          },
        },
      },
    },
    {
      name: 'get_guidelines',
      description:
        'Get coding guidelines and patterns. Call without topic to list available topics.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          topic: {
            type: 'string',
            description:
              'Guideline topic (e.g. "component", "hook", "util"). Omit to list available topics.',
          },
        },
      },
    },
    {
      name: 'scaffold_project',
      description:
        'Create a new project on disk with the same tech stack (React 19, Vite, Tailwind, Zustand, React Query, Vitest, etc.)',
      inputSchema: {
        type: 'object' as const,
        properties: {
          path: {
            type: 'string',
            description: 'Absolute path where the project directory will be created',
          },
          name: {
            type: 'string',
            description: 'Project name for package.json (defaults to directory name)',
          },
        },
        required: ['path'],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    // --- 기존 handlers ---
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

    // --- 신규 handlers ---
    case 'list_items': {
      const registry = await loadRegistry();
      const filter = String(args?.filter ?? '').toLowerCase();
      const category = args?.category as string | undefined;
      const entries = Object.entries(registry)
        .filter(([k, v]) => {
          const cat = v.category ?? 'component';
          if (category && cat !== category) return false;
          if (filter && !k.toLowerCase().includes(filter)) return false;
          return true;
        })
        .map(([k, v]) => ({
          name: k,
          category: v.category ?? 'component',
          description: v.description,
          deps: v.deps,
        }));
      return {
        content: [{ type: 'text', text: JSON.stringify(entries, null, 2) }],
      };
    }

    case 'get_guidelines': {
      const topic = args?.topic as string | undefined;
      if (!topic) {
        const files = await readdir(GUIDELINES_DIR);
        const topics = files
          .filter((f) => f.endsWith('.md'))
          .map((f) => f.replace('.md', ''));
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ available_topics: topics }, null, 2),
            },
          ],
        };
      }
      const filePath = join(GUIDELINES_DIR, `${topic}.md`);
      const content = await readFile(filePath, 'utf-8');
      return { content: [{ type: 'text', text: content }] };
    }

    case 'scaffold_project': {
      const targetPath = String(args?.path ?? '');
      if (!targetPath) throw new Error('path is required');

      const projectName =
        String(args?.name ?? '') || targetPath.split('/').pop() || 'my-app';
      const deps = await readRepoDeps();
      const templates = getTemplates(projectName, deps);

      const created: string[] = [];
      for (const [relativePath, content] of Object.entries(templates)) {
        const absPath = join(targetPath, relativePath);
        await mkdir(dirname(absPath), { recursive: true });
        await writeFile(absPath, content, 'utf-8');
        created.push(relativePath);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                message: `Project scaffolded at ${targetPath}`,
                name: projectName,
                files: created,
                next_steps: [
                  `cd ${targetPath}`,
                  'pnpm install',
                  'pnpm dev',
                ],
              },
              null,
              2,
            ),
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error('bbeenkh-libs MCP Server Started');
