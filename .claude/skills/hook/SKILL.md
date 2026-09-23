---
name: hook
description: Use when creating or modifying custom React hooks — naming conventions, parameter patterns, return values, testing with renderHook
---

# 커스텀 훅 작성 가이드라인

## 파일 구조

```
lib/hooks/<hookName>.tsx
lib/hooks/<hookName>.stories.tsx  # 데모 스토리 (선택)
lib/hooks/<hookName>.test.tsx     # 테스트 (선택)
```

## 네이밍

- 파일명과 함수명 모두 `use` 접두사: `useInfiniteScroll`, `useDebounce`
- `default export` 사용

## 파라미터 패턴

옵션이 2개 이상이면 객체 파라미터 + 인터페이스:

```tsx
interface UseInfiniteScrollOptions {
  onTriggered: () => void;
  isLoading?: boolean;
  hasNextPage?: boolean;
  threshold?: number;
}

const useInfiniteScroll = ({
  onTriggered,
  isLoading = false,
  hasNextPage = true,
  threshold = 0.1,
}: UseInfiniteScrollOptions) => {
  // ...
};

export default useInfiniteScroll;
```

## 반환값

- 단일 값: 직접 반환
- 여러 값: 객체로 반환 (`return { InfiniteScrollWrapper }`)

## 래퍼 컴포넌트 반환 패턴

훅이 UI 요소를 반환할 때, `useCallback`으로 감싼 컴포넌트를 반환:

```tsx
const InfiniteScrollWrapper = useCallback(
  ({ children, thresholdUI }: { children: React.ReactNode; thresholdUI: React.ReactNode }) => (
    <div className="w-full flex flex-col gap-2">
      {children}
      <div ref={ref} className="w-full h-10">{thresholdUI}</div>
    </div>
  ),
  [ref],
);
return { InfiniteScrollWrapper };
```

## JSDoc

컴포넌트와 동일한 `# HookName` + `---` + `@param` + `@example` 포맷.

## export 등록

`lib/index.tsx`에 named export:

```tsx
import useHookName from './hooks/useHookName';
export { useHookName };
```

## 테스트

```tsx
import { renderHook } from '@testing-library/react';
import useHookName from './useHookName';

describe('useHookName', () => {
  it('기본 동작', () => {
    const { result } = renderHook(() => useHookName({ option: 'value' }));
    expect(result.current.something).toBeDefined();
  });
});
```
