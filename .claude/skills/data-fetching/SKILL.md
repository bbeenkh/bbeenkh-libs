---
name: data-fetching
description: Use when implementing API data loading, handling loading/error states, or setting up Suspense + ErrorBoundary + useSuspenseQuery patterns
---

# 데이터 패칭 — Suspense + ErrorBoundary

## 기본 패턴

API 로딩 컴포넌트에 fallback 처리가 필요할 때:

```tsx
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <Suspense fallback={<SkeletonList />}>
    <DataComponent />   {/* useSuspenseQuery 사용 */}
  </Suspense>
</ErrorBoundary>
```

## useSuspenseQuery

`@tanstack/react-query`의 `useSuspenseQuery`로 `isLoading` 분기 제거:

```tsx
import { useSuspenseQuery } from '@tanstack/react-query';

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

## Skeleton fallback

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

## ErrorBoundary fallback

```tsx
import type { FallbackProps } from 'react-error-boundary';

function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <p className="text-gray-600">데이터를 불러오지 못했습니다</p>
      <button onClick={resetErrorBoundary} className="bg-blue-500 text-white px-4 py-2 rounded">
        다시 시도
      </button>
    </div>
  );
}
```

## QueryProvider 설정

앱 루트에서 감싸야 한다:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 1000 * 60 } },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```
