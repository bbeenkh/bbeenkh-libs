# 프로젝트 스캐폴딩 가이드라인

`scaffold_project` tool로 프로젝트를 생성한 뒤, 아래 단계를 순서대로 수행한다.

---

## 1. 필수 의존성 설치

스캐폴딩이 생성한 `package.json`에는 이미 올바른 버전이 명시되어 있다.
생성 직후 반드시 실행:

```bash
cd <프로젝트경로>
pnpm install
```

핵심 의존성 (스캐폴딩 시점 버전과 동일):

| 패키지 | 용도 |
|--------|------|
| react, react-dom | UI 프레임워크 |
| tailwindcss | 스타일링 |
| typescript | 타입 체크 |
| vite | 빌드/개발서버 |
| zustand + immer | 클라이언트 상태 |
| @tanstack/react-query | 서버 상태 |
| axios | HTTP |
| react-router-dom | 라우팅 |
| react-hook-form | 폼 |
| vitest, @testing-library/react | 단위 테스트 |
| msw | API 모킹 |
| framer-motion | 애니메이션 |

---

## 2. 간단 폼 submit 예제 생성

스캐폴딩이 `src/App.tsx`에 기본 form submit 예제를 생성한다.
`cn()` 유틸과 기본 HTML 요소를 사용한 구조:

```tsx
import { useState, type FormEvent } from 'react';
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
```

---

## 3. 컴포넌트 Story 작성

Storybook이 설정된 경우, Layout, Input, Button에 대한 story를 작성한다.
`src/stories/` 디렉토리에 생성:

### `src/stories/Button.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';

function Button({ children, disabled, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={className} disabled={disabled} {...props}>{children}</button>;
}

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    children: { control: 'text', description: '버튼 내용' },
    disabled: { control: 'boolean', description: '비활성화 여부' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '버튼',
    className: 'bg-blue-500 text-white px-4 py-2 rounded',
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화',
    disabled: true,
    className: 'bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed',
  },
};
```

### `src/stories/Input.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={className} {...props} />;
}

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
    className: 'border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성화된 입력창',
    disabled: true,
    className: 'border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-400 cursor-not-allowed',
  },
};
```

### `src/stories/Layout.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex flex-col">{children}</div>;
}

function Header({ children, sticky }: { children: React.ReactNode; sticky?: boolean }) {
  return <header className={`bg-gray-100 p-4 ${sticky ? 'sticky top-0' : ''}`}>{children}</header>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <main className="flex-1 p-6">{children}</main>;
}

function Footer({ children }: { children: React.ReactNode }) {
  return <footer className="bg-gray-100 p-4">{children}</footer>;
}

const SampleLayout = ({ sticky }: { sticky: boolean }) => (
  <div className="w-full h-[400px] overflow-y-scroll">
    <Layout>
      <Header sticky={sticky}>
        <div className="font-bold">Header</div>
      </Header>
      <Body>
        {Array.from({ length: 8 }).map((_, i) => (
          <p key={i} className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        ))}
      </Body>
      <Footer>
        <div>Footer</div>
      </Footer>
    </Layout>
  </div>
);

const meta: Meta<typeof SampleLayout> = {
  title: 'Components/Layout',
  component: SampleLayout,
  argTypes: {
    sticky: { control: 'boolean', description: '스크롤시 header 고정 여부' },
  },
};
export default meta;

type Story = StoryObj<typeof SampleLayout>;

export const Default: Story = {
  args: { sticky: false },
};
```

---

## 4. 테스트 구축 및 통과 확인

### 단위 테스트 (Vitest + Testing Library)

`src/__tests__/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App 폼', () => {
  it('이름을 입력하고 제출하면 결과가 표시된다', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText('이름을 입력하세요');
    const button = screen.getByRole('button', { name: '제출' });

    await user.type(input, '홍길동');
    await user.click(button);

    expect(screen.getByText('제출됨: 홍길동')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });
});
```

실행:
```bash
pnpm test
```

### E2E 테스트 (Playwright)

설치:
```bash
pnpm add -D @playwright/test
npx playwright install chromium
```

`playwright.config.ts`:
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  webServer: {
    command: 'pnpm dev',
    port: 5173,
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:5173',
  },
});
```

`e2e/form.spec.ts`:
```typescript
import { test, expect } from '@playwright/test';

test('폼 제출 플로우', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('이름을 입력하세요').fill('홍길동');
  await page.getByRole('button', { name: '제출' }).click();

  await expect(page.getByText('제출됨: 홍길동')).toBeVisible();
});
```

실행:
```bash
npx playwright test
```

모든 테스트가 통과하는지 확인한다.

---

## 5. .gitignore

프로젝트 루트에 `.gitignore` 파일이 스캐폴딩 시 자동 생성된다:

```
node_modules/
dist/
.env
.env.*
.env.local
*.log
```

---

## 체크리스트

스캐폴딩 완료 후 아래를 순서대로 확인:

- [ ] `pnpm install` 성공
- [ ] `pnpm dev` 로 개발서버 기동 확인
- [ ] 폼 submit 예제가 정상 동작
- [ ] Layout / Input / Button story 작성 완료
- [ ] `pnpm test` 단위 테스트 통과
- [ ] `npx playwright test` E2E 테스트 통과
- [ ] `.gitignore`에 `node_modules/`, `.env*` 포함
