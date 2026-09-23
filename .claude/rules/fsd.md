# FSD (Feature-Sliced Design) 파일 구조

## 레이어 구조

```
src/
├── app/            # 앱 진입점, 프로바이더, 라우터, 글로벌 스타일
├── pages/          # 라우트별 페이지 컴포넌트
├── widgets/        # 독립적 UI 블록 (헤더, 사이드바, 복합 카드 등)
├── features/       # 사용자 액션 단위 기능 (로그인 폼, 댓글 작성 등)
├── entities/       # 비즈니스 엔티티 (User, Post, Product 등)
└── shared/         # 공유 유틸, UI, API, 타입, 상수
```

## 각 레이어 역할

| 레이어 | 역할 | import 가능 대상 |
|--------|------|-----------------|
| `app` | 라우터, 프로바이더, 글로벌 설정 | 모든 하위 레이어 |
| `pages` | 라우트 단위 조합 | widgets, features, entities, shared |
| `widgets` | 독립적 UI 블록 조합 | features, entities, shared |
| `features` | 사용자 액션 단위 | entities, shared |
| `entities` | 비즈니스 도메인 모델 | shared |
| `shared` | 범용 유틸, 타입, UI | 없음 (최하위) |

**핵심 규칙:** 상위 레이어만 하위 레이어를 import할 수 있다. 같은 레이어 간 import 금지.

## 슬라이스 내부 구조 (세그먼트)

각 슬라이스는 용도별 세그먼트로 나눈다:

```
features/auth/
├── ui/             # React 컴포넌트
│   └── LoginForm.tsx
├── model/          # 상태, 로직 (zustand store, hook)
│   └── useAuth.ts
├── api/            # API 호출
│   └── authApi.ts
├── lib/            # 슬라이스 전용 유틸
│   └── validateEmail.ts
└── index.ts        # 공개 API (이 슬라이스에서 외부로 노출할 것만 export)
```

## 실제 프로젝트 예시

```
src/
├── app/
│   ├── main.tsx              # ReactDOM.createRoot
│   ├── App.tsx               # 라우터 + 프로바이더 조합
│   ├── providers.tsx         # QueryClientProvider 등
│   └── router.tsx            # react-router-dom 라우트 정의
│
├── pages/
│   ├── home/
│   │   └── ui/HomePage.tsx
│   └── users/
│       └── ui/UsersPage.tsx
│
├── widgets/
│   ├── header/
│   │   └── ui/Header.tsx
│   └── sidebar/
│       └── ui/Sidebar.tsx
│
├── features/
│   ├── auth/
│   │   ├── ui/LoginForm.tsx
│   │   ├── model/useAuth.ts
│   │   ├── api/authApi.ts
│   │   └── index.ts
│   └── create-post/
│       ├── ui/CreatePostForm.tsx
│       ├── model/useCreatePost.ts
│       ├── api/postApi.ts
│       └── index.ts
│
├── entities/
│   ├── user/
│   │   ├── ui/UserCard.tsx
│   │   ├── model/types.ts
│   │   ├── api/userApi.ts
│   │   └── index.ts
│   └── post/
│       ├── ui/PostCard.tsx
│       ├── model/types.ts
│       ├── api/postApi.ts
│       └── index.ts
│
└── shared/
    ├── api/
    │   └── instance.ts       # axios 인스턴스
    ├── ui/
    │   └── Skeleton.tsx      # 공통 UI
    ├── utils/
    │   └── cn.ts             # classnames + tailwind-merge
    ├── types/
    │   └── common.ts         # 공통 타입
    └── constants/
        └── index.ts          # 공통 상수
```

## index.ts — 공개 API

각 슬라이스의 `index.ts`는 외부에 노출할 것만 re-export한다:

```ts
// features/auth/index.ts
export { LoginForm } from './ui/LoginForm';
export { useAuth } from './model/useAuth';
```

외부에서는 반드시 index를 통해 import:

```ts
// O
import { LoginForm } from '@/features/auth';

// X — 내부 구조에 직접 접근 금지
import { LoginForm } from '@/features/auth/ui/LoginForm';
```

## tsconfig paths 설정

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## FSD + Suspense 조합

페이지 레벨에서 Suspense + ErrorBoundary로 feature/entity를 감싼다:

```tsx
// pages/users/ui/UsersPage.tsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { UserList } from '@/entities/user';
import { SkeletonList } from '@/shared/ui';

export function UsersPage() {
  return (
    <ErrorBoundary fallback={<div>에러 발생</div>}>
      <Suspense fallback={<SkeletonList />}>
        <UserList />
      </Suspense>
    </ErrorBoundary>
  );
}
```
