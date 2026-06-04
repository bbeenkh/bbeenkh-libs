# Hooks & Utils 분석

> API 연동 구조는 `prompts/api-react-query.md` 참조

---

## 목차

- [src/hooks/](#srchooks)
  - [데이터 패칭 Hooks](#데이터-패칭-hooks)
  - [UI 상태 Hooks](#ui-상태-hooks)
  - [도메인 전용 Hooks](#도메인-전용-hooks)
  - [rquery/ 서브디렉토리](#rquery-서브디렉토리)
- [src/utils/](#srcutils)
  - [포맷 / 라벨](#포맷--라벨)
  - [인증 / 스토리지](#인증--스토리지)
  - [데이터 변환](#데이터-변환)
  - [기타 유틸](#기타-유틸)

---

## src/hooks/

### 데이터 패칭 Hooks

---

#### `useInfiniteTableQuery`
**경로:** `src/hooks/useInfiniteTableQuery.tsx`

페이지네이션 API를 무한스크롤로 래핑. 리스트 페이지의 표준 데이터 패칭 훅.

```ts
useInfiniteTableQuery<T>({
  queryKey: readonly unknown[];
  queryFn: (params: Record<string, any>) => Promise<{ data: T[]; meta?: { last_page, current_page, total } }>;
  params?: Record<string, any>;  // page 제외한 필터 파라미터
  enabled?: boolean;
})
// 반환:
// flattenData: T[]        — 전체 페이지 flat 합산
// totalCount: number      — meta.total 값
// ...useInfiniteQuery 반환값 (fetchNextPage, hasNextPage, isLoading, ...)
```

**내부 동작:**
- `pageParam`(기본 1) 기반으로 `queryFn({ ...params, page: pageParam })` 호출
- `meta.current_page >= meta.last_page` 또는 `data.length === 0` → 마지막 페이지 판단
- 모든 페이지 data를 `flatMap`하여 `flattenData` 반환

---

#### `useFetchAllList`
**경로:** `src/hooks/useFetchAllList.ts`

페이지네이션 API에서 **모든 데이터**를 연쇄 호출로 전부 가져올 때 사용.

```ts
// 범용
useFetchAllList<T>({ queryKey, queryFn, enabled? })
// → UseQueryResult<T[]>  (모든 페이지 flat 합산)

// 전용 훅
useFetchAllAgencyList({ enabled? })  // 내 매핑 대리점 전체
useFetchAllStoreList({ enabled? })   // 내 매핑 판매점 전체

// 유틸 함수 (hook 없이 사용)
fetchAllList<T>(fetchFn: (page: number) => Promise<{data: T[]; meta: ...}>)
// → Promise<T[]>
```

---

#### `useFetchAllInventoryList`
**경로:** `src/hooks/useFetchAllInventoryList.ts`

재고 전체 목록을 다양한 조건으로 가져오는 특화 훅 모음.

| 훅 | 설명 |
|---|---|
| `useFetchAllOfMyInventoryList` | 내 재고 전체 |
| `useFetchInventoriesByDeviceCode` | 기기코드별 재고 (`move_status=RECEIVED`, `status=NORMAL`) |
| `useFetchAllMyInventories` | 단말기별 그룹화된 내 재고 |
| `useFetchAllAgencyDistributionList` | 대리점 유통망 재고 전체 |
| `useFetchAllAgencyDistributionInventories` | 대리점 유통망 단말기별 그룹 |
| `useFetchAllDodomaeDistributionList` | 도도매 유통망 재고 전체 |
| `useFetchAllDodomaeDistributionInventories` | 도도매 유통망 단말기별 그룹 |
| `useFetchAllStoreDistributionList` | 판매점 유통망 재고 전체 |
| `useFetchAllStoreDistributionInventories` | 판매점 유통망 단말기별 그룹 |
| `useFetchAllRequestInventories` | 재고 요청/이동 전체 |

---

#### `useMappedStores`
**경로:** `src/hooks/useMappedStores.ts`

```ts
useMappedStores({ enabled: boolean })
// 매핑된 판매점 전체 목록 조회 (페이지네이션 자동 순회)
```

---

#### `useFetchConsultingHistory`
**경로:** `src/hooks/useFetchConsultingHistory.ts`

```ts
useFetchConsultingHistory({ historyId?, activationId? })
// 사용자 유형(Store/Agency/Dodomae)에 따라 다른 API 호출
// 직렬화된 history JSON 파싱, consultAt 날짜 포맷 포함
```

---

#### `usePlanGroups`
**경로:** `src/hooks/usePlanGruopList.tsx`

```ts
usePlanGroups(params?: Record<string, unknown>)
// 반환: ...query 상태 + getGroupByPlanId(planId) 헬퍼 함수
```

---

#### `useTopFiveData`
**경로:** `src/hooks/useTopFiveData.ts`

```ts
useTopFiveData()
// 대시보드용 Top 5 데이터 (6개월 rolling)
// 반환:
//   topAgencyIncentiveList, topStoreIncentiveList
//   topAgencyRecoveryList,  topStoreRecoveryList
//   topAgencySettlementList, topStoreSettlementList
//   loading: boolean
// 유저 조직 유형에 따라 자동 분기
```

---

### UI 상태 Hooks

---

#### `useTableFilteringForm`
**경로:** `src/hooks/useTableFilteringForm.tsx`

리스트 페이지 필터링 UI와 URL 상태를 동시에 관리. 가장 많이 쓰이는 훅 중 하나.

```ts
const { Filtering, params, setParams } = useTableFilteringForm({
  initialStates: { status: null, carrier: null, page: 1 },
});

// 반환 컴포넌트
<Filtering.Provider>
  <Filtering.Input fieldName="search" placeholder="검색" />
  <Filtering.Dropdown fieldName="carrier" options={carrierOptions} placeholder="통신사" />
  <Filtering.DatePicker fieldName="date" />
  <Filtering.DateRangePicker startFieldName="from" endFieldName="to" />
  <Filtering.SubmitButton>검색</Filtering.SubmitButton>
</Filtering.Provider>
```

**내부 동작:**
- `nuqs`의 `useQueryStates`로 URL 쿼리 파라미터와 동기화
- `react-hook-form`의 `FormProvider`로 감싸서 필드 상태 관리
- `Dropdown`/`DatePicker`는 선택 즉시 URL 반영
- `Input`은 Enter 키 또는 모바일 blur 시 URL 반영
- `SubmitButton`은 form submit으로 전체 반영

---

#### `useClientPagination`
**경로:** `src/hooks/useClientPagination.tsx`

이미 패칭된 전체 데이터를 클라이언트에서 페이지네이션.

```ts
const { data, allData, meta, isLoading, Pagination } = useClientPagination({
  data: fullList,       // 전체 데이터 배열
  perPage: 20,          // 페이지당 항목 수
  filterFn?: (item) => boolean,  // 추가 필터링 (선택)
});

// <Pagination /> 컴포넌트 그대로 렌더링
```

---

#### `useFieldVisibility`
**경로:** `src/hooks/useFieldVisibility.tsx`

테이블 컬럼 표시/숨김 토글 관리.

```ts
const { visibleFields, tableFields, shouldDisplayTd, modalProps } = useFieldVisibility(
  initFields,           // ITableHead[] 초기 컬럼 목록
  onInit,               // () => Promise — 초기 설정 로드
  onUpdate              // (fields) => void — 변경 시 저장
);

// shouldDisplayTd(fieldKey) → boolean
// modalProps → 컬럼 관리 모달에 전달
```

---

#### `useFullTableList`
**경로:** `src/hooks/useFullTableList.tsx`

여러 `useQuery` 결과를 하나의 페이지네이션 리스트로 합산.

```ts
const { data, allData, meta, isLoading, Pagination } = useFullTableList({
  queryResults: [queryA, queryB],   // UseQueryResult 배열
  perPage: 20,
  filterFn?: (item) => boolean,
});
```

---

#### `useDragAndDrop`
**경로:** `src/hooks/useDragAndDrop.tsx`

UI 비종속 범용 드래그앤드롭 상태 관리.

```ts
const {
  handleDragStart, handleDragEnd, handleDragOver, handleDragLeave, handleDrop,
  draggedItemId, dragOverTargetId, isDragging, isDragOver,
} = useDragAndDrop<T>({ onDrop, items });
```

---

### 도메인 전용 Hooks

---

#### `useOrgInfoById` → `useDodomaeList`, `useStoreListByDodomae`, `useAgencyListByDodomae`
**경로:** `src/hooks/useOrgInfoById.ts`

코드 기반으로 조직 정보 조회. when: 코드로 매장/대리점/도도매 정보가 필요할 때.

---

#### `useGetDetailByCode`
**경로:** `src/hooks/useGetDetailByCode.ts`

```ts
useGetStoreDetailByCode(code: string)   // → { data, isLoading, isError }
useGetDodomaeDetailByCode(code: string) // → { data, isLoading, isError }
useGetAgencyDetailByCode(code: string)  // → { data, isLoading, isError }
```

---

#### `useSettlementTargetName`
**경로:** `src/hooks/useSettlementTargetName.ts`

```ts
useSettlementTargetName(settlement: ISettlementWithTarget | null)
// → { orgName, ownerName, isLoading, target }
// 유저 유형 + 정산 데이터 기반으로 정산 대상 조직명/대표자 조회
```

---

#### `useViaDodomaeFilter`
**경로:** `src/hooks/useViaDodomaeFilter.ts`

```ts
useViaDodomaeFilter<T>(policies, { enabled? })
// → { filteredPolicies, viaDodomaeMappings, isLoading }
// 경유 도도매 연결된 판매점에 대해 통신사 일치 정책만 필터링

checkViaDodomaePolicy(dodomaeId, policyCarrier, viaDodomaeMappings)
// → boolean — 정책 노출 여부 판단
```

---

#### `useCustomerInfoQueryParams`
**경로:** `src/hooks/useQueryParams.ts`

```ts
useCustomerInfoQueryParams()
// NUQS 기반 고객정보 쿼리 파라미터 상태 관리
// 관리 항목: client_name, client_phone, device_model,
//            opening_date_from/to, serial_number, sort, status, pagination
```

---

#### `useCheckInventoryDetailAvailable`
**경로:** `src/hooks/useCheckInventoryDetailAvailable.ts`

```ts
useCheckInventoryDetailAvailable(useSidePanel?: boolean)
// → validate 함수 반환
// 재고 상세 조회 권한 확인 후 페이지 이동 or SidePanel 열기
// 권한 없으면 에러 다이얼로그 표시
```

---

#### `useStoreManagement`
**경로:** `src/hooks/useStoreManagement.tsx`

판매점 그룹 관리 mutation 훅 모음.

```ts
useDeleteStoreMutation()  // 삭제 mutation
useAddStoreMutation()     // 추가 mutation
useStoreDelete()          // → { handleDeleteStore, isDeleting }
useStoreAdd()             // → { handleAddStores, isAdding }
useStoreDragAndDrop()     // → { handleStoreMove, isMoving }
// 모두 성공 시 캐시 invalidate + toast 메시지 표시
```

---

### rquery/ 서브디렉토리

**경로:** `src/hooks/rquery/`

특정 페이지/도메인에 최적화된 쿼리 훅. `useInfiniteTableQuery`를 래핑하고 UI용 데이터 변환 포함.

#### `useFetchInventoryList`

```ts
useFetchInventoryList(params: UseFetchInventoryListParams)
// → { queryStates, finalTableRows, inventoryList }
// useInfiniteTableQuery 래핑
// manufacturer 한글 라벨 변환
// imei → CopyableText 컴포넌트로 변환 (memoized)
```

---

## src/utils/

### 포맷 / 라벨

---

#### `format.ts`
**경로:** `src/utils/format.ts`

| 함수 | 설명 |
|------|------|
| `formatNumber(value, placeholder?, unit?)` | 천 단위 콤마 (`"1,000 원"`) |
| `formatPhoneNumber(input)` | 전화번호 하이픈 자동 포맷 |
| `formatMobileNumber(input)` | 휴대폰 번호 `010-XXXX-XXXX` 포맷 |
| `getFullAddress({ address, detail_address })` | 주소 + 상세주소 합산 |
| `getUserRoleLabel(role: USER_ROLE)` | USER_ROLE → 한글 변환 |
| `parseErrorMessage(error: TAPIError)` | API 에러 메시지 추출 |
| `validatePassword(password)` | 비밀번호 유효성 (`{success, error?}`) |
| `convertLegacyPaginationMeta(data)` | 구형 pagination → 표준 meta |
| `includeAllOptions(all, options)` | 드롭다운에 "전체" 옵션 추가 |
| `includeUnselectedOptions(required, options)` | 드롭다운에 "미선택" 옵션 추가 |
| `getStoreManageRequestToastMsg(type, name)` | 매핑 요청 toast 메시지 |
| `convertRawUserType(v)` | 백엔드 유저타입 → USER_TYPE enum 변환 |
| `convertRemoveComma(value)` | 콤마 제거 후 number 반환 |
| `calcString(expression)` | 수식 문자열 계산 |
| `convertConsultAmount(amount, raisedPosition?)` | 금액 올림 처리 |

---

#### `label.ts`
**경로:** `src/utils/label.ts`

enum → 한글 라벨 변환 함수 모음.

| 함수 | 변환 대상 |
|------|----------|
| `getOrganizationTypeLabel(type)` | 판매점 / 대리점 / 도도매 |
| `getManufacturerLabel(manufacturer)` | SAMSUNG / APPLE / 기타 |
| `getCarrierLabel(carrier: CARRIER)` | SKT / KT / LG |
| `getContractTypeLabel(type, fullname?)` | 신규 / 기변 / 번이 |
| `getSupportTypeLabel(type, fullname?)` | 공시 / 선약 |
| `getUserStatusLabel(status: USER_STATUS)` | 유저 상태 |
| `getInventoryActivationStatusLabel` | 개통 상태 |
| `getInventoryExposureStatusLabel` | 노출 상태 |
| `getInventoryFaultStatusLabel` | 불량 상태 |
| `getInventoryLossStatusLabel` | 분실 상태 |
| `getInventoryMoveStatusLabel` | 이동 상태 |
| `getInventoryStockStatusLabel` | 재고 상태 |
| `getInventoryRequestStatusLabel` | 요청 상태 |
| `getInventoryHistoryStatusLabel` | 히스토리 상태 |
| `getRequestStatusChipClass(status)` | 상태 chip CSS 클래스 |
| `getConsultingCardTypeLabel(carrier, type)` | 카드 유형 |

---

#### `validation.ts`
**경로:** `src/utils/validation.ts`

```ts
mobileValidation(message?)    // Zod — 010-XXXX-XXXX 형식만
phoneValidation(message?)     // Zod — 일반 전화번호 형식 (02, 0XX 등)

// 타입 가드 함수
checkIsAgencyUser(user)   // → user is TAgencyUser
checkIsStoreUser(user)    // → user is TStoreUser
checkIsDodomaeUser(user)  // → user is TDodomaeUser
checkIsPendingStore(store) // → store is IPendingStore
```

---

#### `address.ts`
**경로:** `src/utils/address.ts`

```ts
getDefaultAddress(address: Partial<IAddress> | null)  // → IAddress (빈 필드 기본값 포함)
addressSchema  // Zod 스키마 — road_address, zipcode, sido, gugun, dong 등
```

---

### 인증 / 스토리지

---

#### `AuthManager.ts`
**경로:** `src/utils/AuthManager.ts`

Zustand 기반 전역 인증 상태 관리.

```ts
// Hook (컴포넌트 내부)
const { user, logout, isAgency, isDodomae, isStore, checkRoles, getAgencyCarrier } = useAuthManager();

// 함수 (컴포넌트 외부 — 인터셉터 등)
getAuthState()                 // 현재 상태 스냅샷
setAuthState(token, user)      // 상태 업데이트

// Zustand store (직접 사용 가능)
useAuthStore.getState().initFromSession()
useAuthStore.getState().logout()
```

---

#### `safeStorage.ts`
**경로:** `src/utils/safeStorage.ts`

SSR 안전한 `localStorage` 래퍼.

```ts
isLocalStorageAvailable()              // → boolean
safeGetItem(key: string)               // → string | null
safeSetItem(key: string, value: string)
safeRemoveItem(key: string)
```

---

### 데이터 변환

---

#### `settlementMapper.ts`
**경로:** `src/utils/settlementMapper.ts`

API 정산 데이터 → 화면 표시 포맷 변환.

```ts
mapSettlementToViewData(settlement: ISettlementItem)       // → SettlementData
mapSettlementListToViewData(settlements: ISettlementItem[]) // → SettlementData[]
calculateSettlementAmounts(settlement)
// → { rebateAmount, incentiveAmount, penaltyAmount, totalAmount }
```

---

#### `rebateUitls.ts`
**경로:** `src/utils/rebateUitls.ts`

정책 상세 데이터 → 테이블 포맷 변환 (Handsontable 연동용).

```ts
parseDetailData(detail)
// → { rowHeaders, excelData, planGroupIndexMap, originalDetails, cellDetailMappings }

parseSelectedModels(details)  // → TSelectedDevices (단말기 고유 목록)
parseFormattedPlanGroups(detail) // → [{ id, name }]
parseSelectedPlans(detail, allRatePlanGroups) // → 2D 배열
```

---

#### `notificationCacheUtils.ts`
**경로:** `src/utils/notificationCacheUtils.ts`

알림 관련 React Query 캐시 무효화 유틸.

```ts
removeSignupRequestFromCache(userId)           // 회원가입 요청 캐시 무효화
removeInventoryRequestFromCache(requestId)     // 재고 요청 캐시 무효화
removeActivationRequestFromCache(activationId) // 개통 요청 캐시 무효화 (대리점 + 도도매)
```

---

### 기타 유틸

---

#### `exportExcel.ts`
**경로:** `src/utils/exportExcel.ts`

```ts
exportInventoryToExcel({
  exportData,
  fileName,
  exportType: 'inventory' | 'inventoryRequest' | 'inventoryTransfer',
})
// → XLSX 파일 다운로드
```

---

#### `fileDownload.ts`
**경로:** `src/utils/fileDownload.ts`

```ts
fileDownload(response: AxiosResponse)         // axios 응답에서 파일 다운로드
downloadFileWithName(data, fileName)          // Blob 데이터 직접 다운로드
downloadFileByHttp(url, fileName)             // HTTP URL에서 fetch 후 다운로드
```

---

#### `metadata.ts`
**경로:** `src/utils/metadata.ts`

```ts
createMetadata(override?: Metadata)
// Next.js 페이지 SEO 메타데이터 생성
// 기본값: title, OG 태그, favicon, keywords 포함
```

---

#### `function.ts`
**경로:** `src/utils/function.ts`

```ts
once<T>(fn: T)
// → 최초 1회만 실행되는 함수 래퍼 (이후 호출 무시)
```

---

#### `queryKeyFactory.ts` (레거시)
**경로:** `src/utils/queryKeyFactory.ts`

기존 방식의 queryKey 상수/팩토리 모음. 신규 작업은 `src/utils/queryKeyFactories/` 디렉토리의 파일 사용.

상수: `Q_INVENTORY`, `Q_INVENTORY_REQUEST`, `REBATE`, `AGENCY_STORE`, `PRIVATE` 등

---

## 빠른 참조

### "이 기능이 필요하면 이 훅 사용"

| 기능 | 훅/유틸 |
|------|---------|
| 무한스크롤 리스트 | `useInfiniteTableQuery` |
| 드래그앤드롭 | `useDragAndDrop` |

### "이 값이 필요하면 이 유틸 사용"

| 기능 | 유틸 |
|------|------|
| 숫자 → 콤마 포맷 | `formatNumber` |
| 전화번호 포맷 | `formatPhoneNumber` / `formatMobileNumber` |
