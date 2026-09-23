# 데이터 패칭 — Suspense + ErrorBoundary

## 기본 패턴

API 로딩 컴포넌트에 fallback 처리가 필요할 때, Suspense + ErrorBoundary 조합을 사용한다:

```tsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary fallback={<ErrorFallback />}>
  <Suspense fallback={<SkeletonList />}>
    <DataComponent />   {/* useSuspenseQuery 사용 */}
  </Suspense>
</ErrorBoundary>
```

### useSuspenseQuery

`@tanstack/react-query`의 `useSuspenseQuery`를 사용하면 데이터가 준비될 때까지 Suspense가 fallback을 표시한다. `isLoading` 분기가 필요 없다:

```tsx
import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';

function UserList() {
  const { data } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users').then((res) => res.data),
  });

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Skeleton fallback

로딩 중 표시할 Skeleton을 Suspense의 fallback으로 전달:

```tsx
function SkeletonList() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
      ))}
    </div>
  );
}
```

### ErrorBoundary fallback

에러 발생 시 재시도 버튼이 포함된 fallback:

```tsx
import type { FallbackProps } from 'react-error-boundary';

function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <p className="text-gray-600">데이터를 불러오지 못했습니다</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        다시 시도
      </button>
    </div>
  );
}
```

### 조합 예시

```tsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function UserPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">사용자 목록</h1>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SkeletonList />}>
          <UserList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
```

---

## QueryProvider 설정

앱 루트에서 QueryClientProvider를 감싸야 한다:

```tsx
// src/app/providers.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```
