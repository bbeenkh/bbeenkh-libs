# 유틸 함수 작성 가이드라인

## 파일 구조

```
lib/utils/<name>.ts     # 유틸 구현 (TSX 불필요 — JSX 없음)
```

하나의 파일에 관련 함수들을 모아둔다 (파일당 1~3개).

## 작성 원칙

- **순수 함수** 우선: 같은 입력 → 같은 출력, 부수효과 없음
- **named export**: `export const fn = (...) => ...`
- 파라미터 2개 이하면 개별 인자, 3개 이상이면 객체 + 인터페이스:

```tsx
// 간단한 경우
export const cn = (...inputs: Parameters<typeof classnames>) =>
  twMerge(classnames(...inputs));

// 파라미터가 많은 경우
interface ITruncateString {
  value: string;
  limit?: number;
  attach?: string;
}

export const truncateString = ({ value, limit = 3, attach = '...' }: ITruncateString) => {
  return value.length > limit ? value.slice(0, limit) + attach : value;
};
```

## JSDoc

```tsx
/**
 * 함수 설명
 * @param paramName 설명
 */
```

## 기존 유틸 목록

| 함수 | 파일 | 용도 |
|------|------|------|
| `cn()` | `lib/utils/cn.ts` | classnames + tailwind-merge 래퍼 |
| `formatedDate()` | `lib/utils/date.ts` | dayjs 날짜 포맷 |
| `truncateString()` | `lib/utils/format.ts` | 문자열 말줄임 |

## 소비자 프로젝트에서의 유틸 패턴

### cn() — 스타일링 필수 유틸

모든 프로젝트에서 `classnames` + `tailwind-merge` 조합 권장:

```tsx
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: Parameters<typeof classnames>) =>
  twMerge(classnames(...inputs));
```

### API 래퍼

Axios 인스턴스를 하나 만들고 인터셉터로 공통 처리:

```tsx
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (res) => res,
  (err) => { /* 공통 에러 처리 */ },
);
```

### 날짜 처리

`dayjs` 사용, 포맷 함수는 프로젝트별로 하나만 정의:

```tsx
import dayjs from 'dayjs';

export const formatDate = (date: Date | null, format = 'YYYY-MM-DD') => {
  if (!date) return '';
  return dayjs(date).format(format);
};
```
