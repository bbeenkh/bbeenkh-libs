# API & React Query 연동 패턴 분석

## 전체 흐름

```
Component / Custom Hook
    ↓  useQuery / useInfiniteQuery
Query Key Factory (createQueryKeys / createQueryKeyStore)
    ↓  { queryKey, queryFn }
Service Class (APIService 상속)
    ↓  this.$axios (axios instance)
Interceptor (Bearer 토큰 주입, 401/403 처리)
    ↓
MSW Handler (개발/테스트 환경에서 intercept)
    ↓
실제 API 서버 (프로덕션)
```

---

## 1. APIService 베이스 클래스

**경로:** `src/apiService/APIService.ts`

모든 서비스 클래스가 상속받는 추상 클래스.

```ts
class APIService<Q extends Record<string, any>> {
  protected $axios: AxiosInstance;
  queries: Q = {} as Q;

  constructor(baseURL?: string) {
    // axios 인스턴스 생성 (withCredentials: true)
    this.$axios = axios.create({ baseURL, headers: { ... }, withCredentials: true });
    setInterceptors(this.$axios);

    // @createQueryFactory 데코레이터가 붙은 메서드를 자동으로 queries 객체에 등록
    const proto = Object.getPrototypeOf(this);
    const meta = proto.__queryFactoryList__;
    if (Array.isArray(meta)) {
      meta.forEach(({ methodName, keys, isPrivate, queryOptions }) => {
        const method = this[methodName]?.bind(this);
        this.createQueryKeyFn(method, keys, isPrivate, queryOptions);
      });
    }
  }

  // queries[fnName] = (params) => ({ queryFn, queryKey, ...queryOptions })
  private createQueryKeyFn(fetchFn, keys, isPrivate, queryOptions) {
    const baseQueryKey = [];
    if (isPrivate) baseQueryKey.push('PRIVATE');
    if (keys) baseQueryKey.push(...keys);
    this.queries[fnName] = (params) => ({
      queryFn: () => fetchFn(params),
      queryKey: [...baseQueryKey, { ...params }],
      ...queryOptions,
    });
  }
}
```

**핵심 특징:**
- `$axios` — protected이므로 서비스 메서드에서 직접 사용
- `queries` — 데코레이터 기반으로 자동 생성된 queryKey 팩토리 모음
- 프록시 모드 지원 (`NEXT_PUBLIC_USE_API_PROXY`)
- SSR 환경: `typeof window === 'undefined'` 분기

---

## 2. Axios Interceptor

**경로:** `src/api/interceptor.ts`

```ts
// Request: Bearer 토큰 주입
axiosService.interceptors.request.use(async (config) => {
  // 서버 환경: getServerSession으로 토큰 획득
  // 클라이언트 환경: getAuthState().token 사용
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

// Response: 에러 처리
axiosService.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (status === 401) → 로그아웃 후 /login 리다이렉트
    if (status === 403) → openInvalidUserRoleDialog()
    return Promise.reject(error);
  }
);
```

---

## 3. Service 클래스 작성 패턴

**경로:** `src/apiService/services/`

### 3-1. 기본 구조

```ts
// AgencyContractService.ts (예시)

// ① Interface는 서비스 파일 상단에 같이 작성
export interface IAgencyActivationListReq {
  page?: number;
  perPage?: number;
}

export interface IAgencyActivationListRes extends IPaginationInfo, IResponseInfo {
  data: IActivation[];
}

// ② 서비스 클래스: APIService 상속
class AgencyContractService extends APIService<{}> {
  // ③ 메서드: async, 파라미터 단일 객체, return res.data
  async activationList(params: IAgencyActivationListReq): Promise<IAgencyActivationListRes> {
    const res = await this.$axios.get<IAgencyActivationListRes>('/api/agency/activations', { params });
    return res.data;
  }

  // 동적 경로: 구조분해로 path param 분리
  async activationDetail({ activationId }: IAgencyActivationDetailReq) {
    const res = await this.$axios.get<IAgencyActivationDetailRes>(
      `/api/agency/activations/${activationId}`
    );
    return res.data;
  }

  // POST: path param을 구조분해, 나머지를 body로
  async rejectActivation({ activationId, ...payload }: IAgencyActivationRejectReq) {
    const res = await this.$axios.post<IAgencyActivationRejectRes>(
      `/api/agency/activations/${activationId}/reject`,
      payload
    );
    return res.data;
  }
}

export default AgencyContractService;
```

### 3-2. Interface 네이밍 규칙

| 구분 | 네이밍 | 예시 |
|------|--------|------|
| 요청 파라미터 | `I[Name]Req` | `IAgencyActivationListReq` |
| 응답 타입 | `I[Name]Res` | `IAgencyActivationListRes` |
| 요청/응답 단일 인터페이스 | 쪼개지 않고 단일 작성 | — |

### 3-3. 메서드 작성 규칙

```ts
/**
 * JSDoc 설명
 * GET /api/agency/activations
 * https://dev-api.my010.kr/docs/api#/operations/...
 */
async methodName(params: IXxxReq): Promise<IXxxRes> {
  const res = await this.$axios.get<IXxxRes>('/api/...', { params });
  return res.data;  // 항상 res.data 반환
}
```

- 파라미터는 무조건 **단일 객체**로 받음
- 동적 경로 파라미터는 **구조분해**로 분리: `({ id, ...payload })`
- URL 주석: 동적 파라미터는 `#`으로 치환 — `/api/agency/activations/#/reject`
- `return res.data` — axios 응답 데이터만 반환

---

## 4. Query Key Factory 작성 패턴

**경로:** `src/utils/queryKeyFactories/`
**라이브러리:** `@lukemorales/query-key-factory`

### 4-1. createQueryKeys (단순 도메인)

```ts
// contractQueryFactory.ts
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const agencyContractQueryFactory = createQueryKeys('contract-agency', {
  /** 개통 목록 조회 */
  list: (params?: IAgencyActivationListReq) => ({
    queryKey: [params],
    queryFn: () => AgencyContractService.activationList(params || {}),
  }),

  /** 개통 상세 조회 */
  detail: ({ activationId }: { activationId: number }) => ({
    queryKey: [activationId],
    queryFn: () => AgencyContractService.activationDetail({ activationId }),
    staleTime: Infinity,  // queryOptions도 같이 포함 가능
  }),
});
```

### 4-2. createQueryKeyStore (복수 도메인)

```ts
// inventoryQueryFactory.ts
import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const inventoryQueryKeyFactory = createQueryKeyStore({
  // 도메인 1
  inventory: {
    list: (params?: IInventoryListReq) => ({
      queryKey: ['inventoryList', params],
      queryFn: () => InventoryService.getInventoryList(params),
    }),
    detail: ({ serialNumber }: { serialNumber: string }) => ({
      queryKey: ['inventoryDetail', serialNumber],
      queryFn: () => InventoryService.getInventoryDetail({ serialNumber }),
    }),
    // infinite query용: queryFn에 paginationParams 인자 포함
    grouppedByDevice: (params: IGrouppedInventoriesByDeviceReq) => ({
      queryKey: ['inventoryGrouppedByDevice', params],
      queryFn: (paginationParams: Record<string, any>) =>
        InventoryService.fetchGrouppedInventoriesByDevice({ ...params, ...paginationParams }),
    }),
  },
  // 도메인 2
  inventoryRequest: {
    list: (params: IInventoryRequestListReq) => ({
      queryKey: ['inventoryRequestList', params],
      queryFn: () => InventoryService.getInventoryRequestList(params),
    }),
  },
});
```

### 4-3. createQueryKeys vs createQueryKeyStore 선택 기준

| 상황 | 선택 |
|------|------|
| 단일 서비스, 단순 쿼리 | `createQueryKeys` |
| 복수 서비스 / 도메인 분류 필요 | `createQueryKeyStore` |

---

## 5. 컴포넌트에서 사용 패턴

### 5-1. 일반 useQuery

```ts
import { agencyContractQueryFactory } from '@/utils/queryKeyFactories/contractQueryFactory';

// 팩토리에서 { queryKey, queryFn } 구조분해
const { data, isLoading } = useQuery({
  ...agencyContractQueryFactory.list({ page: 1, perPage: 20 }),
});
```

### 5-2. 무한 스크롤: useInfiniteTableQuery

**경로:** `src/hooks/useInfiniteTableQuery.tsx`

```ts
// 재사용 가능한 무한 스크롤 wrapper
// queryFactory의 queryFn을 그대로 활용
const factory = inventoryQueryKeyFactory.inventory.list({ carrier: 'SKT' });
const { flattenData, totalCount, isLoading, fetchNextPage } = useInfiniteTableQuery({
  params: { carrier: 'SKT' },
  queryKey: factory.queryKey,
  queryFn: factory.queryFn,
});
```

내부적으로 `useInfiniteQuery` 사용:
- `pageParam` 기반으로 자동 페이지네이션
- `meta.last_page >= meta.current_page` 로 마지막 페이지 판단
- `flattenData` — 모든 페이지 flat하게 합산
- `totalCount` — `meta.total` 값 반환

### 5-3. 커스텀 훅으로 캡슐화

```ts
// src/hooks/rquery/useFetchInventoryList.tsx
export default function useFetchInventoryList(params: UseFetchInventoryListParams) {
  const factory = inventoryQueryKeyFactory.inventory.list(params);
  const queryStates = useInfiniteTableQuery({
    params,
    queryKey: factory.queryKey,
    queryFn: factory.queryFn,
  });

  // UI용 데이터 변환 (memoize)
  const finalTableRows = useMemo(() => {
    return queryStates.flattenData.map((inv) => ({
      ...inv,
      manufacturer: getManufacturerLabel(inv.manufacturer),
      imeiView: <CopyableText text={inv.imei} />,
    }));
  }, [queryStates.flattenData]);

  return { queryStates, finalTableRows };
}
```

---

## 6. Mutation 패턴

Query Factory는 GET 전용. Mutation은 서비스 메서드를 직접 호출.

```ts
const { mutateAsync } = useMutation({
  mutationFn: (payload: IAgencyActivationRejectReq) =>
    AgencyContractService.rejectActivation(payload),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: agencyContractQueryFactory.list._def });
    toast.success('거절되었습니다.');
  },
  onError: (error) => {
    toast.error(parseErrorMessage(error));
  },
});
```

---

## 7. MSW Mock Handler 패턴

**경로:** `src/mocks/handlers/`

```ts
// inventoryHandlers.ts (예시 구조)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Mock DB (모듈 레벨 상태)
let mockInventoryDB: IInventoryItem[] = [ ... ];

// 페이지네이션 메타 생성 헬퍼
function createPaginationMeta(page, total, perPage, basePath) { ... }

export const inventoryHandlers = [
  // GET (목록 + 페이지네이션)
  http.get(`${baseUrl}/api/inventories`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 1);
    const perPage = Number(url.searchParams.get('per_page') || 15);

    return HttpResponse.json({
      data: mockInventoryDB.slice((page - 1) * perPage, page * perPage),
      ...createPaginationMeta(page, mockInventoryDB.length, perPage, `${baseUrl}/api/inventories`),
    });
  }),

  // GET (상세, 동적 경로)
  http.get(`${baseUrl}/api/inventories/:serialNumber`, ({ params }) => {
    const item = mockInventoryDB.find((i) => i.serial_number === params.serialNumber);
    if (!item) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    return HttpResponse.json({ data: item });
  }),

  // POST (mutation)
  http.post(`${baseUrl}/api/inventory/:inventoryId/transfer`, ({ params }) => {
    return HttpResponse.json({ id: params.inventoryId, transferred_at: new Date().toISOString() });
  }),
];
```

**Mock 작성 원칙:**
- 모듈 레벨 변수로 상태 유지 (POST/PATCH 변경 반영)
- 실제 API 응답 shape 동일하게 유지
- 성공 / 실패(404, 400, 500) 케이스 각각 작성
- `createPaginationMeta` 헬퍼로 `meta`, `links` 포함

---

## 8. 공통 타입

**경로:** `src/types/common.ts`

```ts
// 페이지네이션 응답에 extends
interface IPaginationInfo {
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: { url: string; label: string; active: boolean }[];
    path: string;
  };
  links: { first: string; last: string; prev: string | null; next: string | null };
}

// 생성/수정/삭제 응답에 사용
interface ICUDDefaultRes {
  code: number;
  message: string;
  data: any;
  errors: null | Record<string, string[]>;
}
```

---

## 9. 파일 추가 체크리스트

새 API 도메인 추가 시 작업 순서:

```
1. src/apiService/services/[Domain]Service.ts
   - Interface (Req/Res) 정의
   - APIService 상속 클래스 작성

2. src/utils/queryKeyFactories/[domain]QueryFactory.ts
   - createQueryKeys / createQueryKeyStore 선택
   - list, detail 등 쿼리 팩토리 함수 작성

3. src/mocks/handlers/[domain]Handlers.ts
   - 목 데이터 + HTTP 핸들러 작성
   - src/mocks/handlers/index.ts에 등록

4. src/hooks/rquery/useFetch[Domain].ts (필요 시)
   - useQuery / useInfiniteTableQuery 래핑
   - UI용 데이터 변환 포함
```
