/**
 * React Query API 연동 패턴 예제 스토리
 *
 * api-react-query.md 패턴 기반:
 * - Service 메서드 (mock)
 * - Query Key Factory (createQueryKeys 패턴)
 * - useQuery / useMutation 사용
 * - 로딩 → Skeleton, 에러 → 재시도 버튼, 성공 → Card 렌더
 */

import React from 'react';
import { Meta } from '@storybook/react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Card from '@/components/Card';
import Skeleton from '@/components/Skeleton';
import Button from '@/components/Button';

// ─── Types ────────────────────────────────────────────────────────────────────

interface IUser {
  id: number;
  name: string;
  email: string;
  role: '관리자' | '사용자';
}

interface IUserListRes {
  data: IUser[];
  meta: { total: number; current_page: number; last_page: number; per_page: number };
}

interface ICreateUserReq {
  name: string;
  email: string;
  role: IUser['role'];
}

// ─── Mock Service (APIService 패턴 참고) ──────────────────────────────────────

const mockUsers: IUser[] = [
  { id: 1, name: '김철수', email: 'kim@example.com', role: '관리자' },
  { id: 2, name: '이영희', email: 'lee@example.com', role: '사용자' },
  { id: 3, name: '박지훈', email: 'park@example.com', role: '사용자' },
];

let mockDb = [...mockUsers];

const UserService = {
  /** GET /api/users — 사용자 목록 조회 */
  async getUserList(): Promise<IUserListRes> {
    await new Promise((r) => setTimeout(r, 1200));
    return {
      data: mockDb,
      meta: { total: mockDb.length, current_page: 1, last_page: 1, per_page: 10 },
    };
  },

  /** POST /api/users — 사용자 생성 */
  async createUser(payload: ICreateUserReq): Promise<IUser> {
    await new Promise((r) => setTimeout(r, 800));
    const newUser: IUser = { id: Date.now(), ...payload };
    mockDb = [...mockDb, newUser];
    return newUser;
  },
};

// ─── Query Key Factory (api-react-query.md §4-1 패턴) ─────────────────────────

const userQueryFactory = {
  list: () => ({
    queryKey: ['users', 'list'] as const,
    queryFn: () => UserService.getUserList(),
  }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function UserListSkeleton() {
  return (
    <div className="ods-flex ods-flex-col ods-gap-3 ods-w-full ods-max-w-lg">
      {[1, 2, 3].map((i) => (
        <Skeleton.Container
          key={i}
          styleClass={{ root: 'ods-flex ods-items-center ods-gap-4 ods-p-4 ods-border ods-border-gray-200 ods-rounded-lg' }}
        >
          <Skeleton.Circle styleClass={{ root: 'ods-w-10 ods-h-10 ods-rounded-full ods-bg-gray-200 ods-animate-pulse ods-shrink-0' }} />
          <div className="ods-flex ods-flex-col ods-gap-2 ods-flex-1">
            <Skeleton.Box styleClass={{ root: 'ods-h-4 ods-w-1/3 ods-rounded ods-bg-gray-200 ods-animate-pulse' }} />
            <Skeleton.Box styleClass={{ root: 'ods-h-3 ods-w-1/2 ods-rounded ods-bg-gray-200 ods-animate-pulse' }} />
          </div>
          <Skeleton.Box styleClass={{ root: 'ods-h-5 ods-w-12 ods-rounded-xl ods-bg-gray-200 ods-animate-pulse' }} />
        </Skeleton.Container>
      ))}
    </div>
  );
}

function UserCard({ user }: { user: IUser }) {
  return (
    <Card className="ods-p-4 ods-flex-row ods-items-center ods-gap-4 ods-rounded-lg">
      <div className="ods-w-10 ods-h-10 ods-rounded-full ods-bg-gray-200 ods-flex ods-items-center ods-justify-center ods-shrink-0">
        <span className="ods-text-sm ods-font-bold ods-text-gray-600">
          {user.name[0]}
        </span>
      </div>
      <Card.Body className="ods-flex-col ods-items-start ods-flex-1 ods-gap-0.5">
        <span className="ods-text-sm ods-font-bold ods-text-gray-900">{user.name}</span>
        <span className="ods-text-xs ods-text-gray-500">{user.email}</span>
      </Card.Body>
      <span
        className={`ods-text-xs ods-px-2 ods-py-0.5 ods-rounded-xl ods-font-bold ${
          user.role === '관리자'
            ? 'ods-bg-gray-900 ods-text-white'
            : 'ods-bg-gray-100 ods-text-gray-600'
        }`}
      >
        {user.role}
      </span>
    </Card>
  );
}

function ErrorView({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="ods-flex ods-flex-col ods-items-center ods-gap-4 ods-p-8 ods-text-center">
      <p className="ods-text-sm ods-text-state-danger ods-font-bold">데이터를 불러오지 못했습니다.</p>
      <Button
        styleClass={{ root: 'ods-px-4 ods-py-2 ods-bg-gray-900 ods-text-white ods-text-sm ods-rounded-md' }}
        onClick={onRetry}
      >
        다시 시도
      </Button>
    </div>
  );
}

// ─── UserList 컴포넌트 ─────────────────────────────────────────────────────────

function UserList() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery({
    ...userQueryFactory.list(),
  });

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: (payload: ICreateUserReq) => UserService.createUser(payload),
    onSuccess: () => {
      // 목록 쿼리 무효화 → 자동 재조회
      queryClient.invalidateQueries({ queryKey: userQueryFactory.list().queryKey });
    },
  });

  if (isLoading) return <UserListSkeleton />;
  if (isError) return <ErrorView onRetry={refetch} />;

  return (
    <div className="ods-flex ods-flex-col ods-gap-4 ods-w-full ods-max-w-lg">
      <div className="ods-flex ods-items-center ods-justify-between">
        <h2 className="ods-text-base ods-font-bold ods-text-gray-900">
          사용자 목록 ({data?.meta.total ?? 0}명)
        </h2>
        <Button
          styleClass={{ root: 'ods-px-3 ods-py-1.5 ods-bg-gray-900 ods-text-white ods-text-sm ods-rounded-md disabled:ods-opacity-50' }}
          disabled={isPending}
          onClick={() =>
            createUser({
              name: `신규 사용자 ${Date.now() % 100}`,
              email: `user${Date.now() % 100}@example.com`,
              role: '사용자',
            })
          }
        >
          {isPending ? '추가 중…' : '+ 사용자 추가'}
        </Button>
      </div>
      <div className="ods-flex ods-flex-col ods-gap-2">
        {data?.data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

/** 마운트 시 API 조회 → 스켈레톤 → 카드 목록 */
export const FetchOnMount = () => {
  // 스토리마다 독립 QueryClient 사용 (상태 격리)
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <UserList />
    </QueryClientProvider>
  );
};

/** 로딩 상태 — Skeleton 표시 */
export const LoadingState = () => {
  const client = new QueryClient();
  // queryFn이 절대 resolve되지 않아 영구 로딩 상태 유지
  client.setQueryDefaults(userQueryFactory.list().queryKey, {
    queryFn: () => new Promise(() => {}),
  });
  return (
    <QueryClientProvider client={client}>
      <UserList />
    </QueryClientProvider>
  );
};

/** 에러 상태 — 재시도 버튼 표시 */
export const ErrorState = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  client.setQueryDefaults(userQueryFactory.list().queryKey, {
    queryFn: () => Promise.reject(new Error('서버 오류 (500)')),
  });
  return (
    <QueryClientProvider client={client}>
      <UserList />
    </QueryClientProvider>
  );
};

/** 성공 상태 — 캐시에 데이터 미리 주입 */
export const SuccessState = () => {
  const client = new QueryClient();
  client.setQueryData(userQueryFactory.list().queryKey, {
    data: mockUsers,
    meta: { total: mockUsers.length, current_page: 1, last_page: 1, per_page: 10 },
  } satisfies IUserListRes);
  return (
    <QueryClientProvider client={client}>
      <UserList />
    </QueryClientProvider>
  );
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Examples/React Query API 연동',
  parameters: {
    docs: {
      description: {
        component: `
api-react-query.md 패턴을 기반으로 한 API 연동 예제입니다.

- **Service**: \`UserService.getUserList()\` / \`UserService.createUser()\`
- **Query Factory**: \`userQueryFactory.list()\` → \`{ queryKey, queryFn }\`
- **useQuery**: 로딩 → Skeleton, 에러 → 재시도 버튼, 성공 → Card 목록
- **useMutation**: 사용자 추가 후 \`invalidateQueries\`로 목록 자동 갱신
        `.trim(),
      },
    },
  },
};
export default meta;
