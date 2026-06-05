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

// ─── Mock Service ─────────────────────────────────────────────────────────────

const mockUsers: IUser[] = [
  { id: 1, name: '김철수', email: 'kim@example.com', role: '관리자' },
  { id: 2, name: '이영희', email: 'lee@example.com', role: '사용자' },
  { id: 3, name: '박지훈', email: 'park@example.com', role: '사용자' },
];

let mockDb = [...mockUsers];

const UserService = {
  async getUserList(): Promise<IUserListRes> {
    await new Promise((r) => setTimeout(r, 1200));
    return {
      data: mockDb,
      meta: { total: mockDb.length, current_page: 1, last_page: 1, per_page: 10 },
    };
  },

  async createUser(payload: ICreateUserReq): Promise<IUser> {
    await new Promise((r) => setTimeout(r, 800));
    const newUser: IUser = { id: Date.now(), ...payload };
    mockDb = [...mockDb, newUser];
    return newUser;
  },
};

// ─── Query Key Factory ────────────────────────────────────────────────────────

const userQueryFactory = {
  list: () => ({
    queryKey: ['users', 'list'] as const,
    queryFn: () => UserService.getUserList(),
  }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function UserListSkeleton() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      {[1, 2, 3].map((i) => (
        <Skeleton.Container
          key={i}
          styleClass={{ root: 'flex items-center gap-4 p-4 border border-gray-200 rounded-lg' }}
        >
          <Skeleton.Circle styleClass={{ root: 'w-10 h-10 rounded-full bg-gray-200 animate-pulse shrink-0' }} />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton.Box styleClass={{ root: 'h-4 w-1/3 rounded bg-gray-200 animate-pulse' }} />
            <Skeleton.Box styleClass={{ root: 'h-3 w-1/2 rounded bg-gray-200 animate-pulse' }} />
          </div>
          <Skeleton.Box styleClass={{ root: 'h-5 w-12 rounded-xl bg-gray-200 animate-pulse' }} />
        </Skeleton.Container>
      ))}
    </div>
  );
}

function UserCard({ user }: { user: IUser }) {
  return (
    <Card className="p-4 flex-row items-center gap-4 rounded-lg">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
        <span className="text-sm font-bold text-gray-600">{user.name[0]}</span>
      </div>
      <Card.Body className="flex-col items-start flex-1 gap-0.5">
        <span className="text-sm font-bold text-gray-900">{user.name}</span>
        <span className="text-xs text-gray-500">{user.email}</span>
      </Card.Body>
      <span
        className={`text-xs px-2 py-0.5 rounded-xl font-bold ${
          user.role === '관리자' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
        }`}
      >
        {user.role}
      </span>
    </Card>
  );
}

function ErrorView({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 p-8 text-center">
      <p className="text-sm text-state-danger font-bold">데이터를 불러오지 못했습니다.</p>
      <Button
        styleClass={{ root: 'px-4 py-2 bg-gray-900 text-white text-sm rounded-md' }}
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
  const { data, isLoading, isError, refetch } = useQuery({ ...userQueryFactory.list() });

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: (payload: ICreateUserReq) => UserService.createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryFactory.list().queryKey });
    },
  });

  if (isLoading) return <UserListSkeleton />;
  if (isError) return <ErrorView onRetry={refetch} />;

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">
          사용자 목록 ({data?.meta.total ?? 0}명)
        </h2>
        <Button
          styleClass={{ root: 'px-3 py-1.5 bg-gray-900 text-white text-sm rounded-md disabled:opacity-50' }}
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
      <div className="flex flex-col gap-2">
        {data?.data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────

export const FetchOnMount = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <UserList />
    </QueryClientProvider>
  );
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Examples/React Query API 연동',
};
export default meta;
