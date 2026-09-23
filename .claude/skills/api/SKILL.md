---
name: api
description: Use when creating API classes, React Query hooks (useQuery, useMutation, useSuspenseQuery), or adding new domain entities with CRUD operations
---

# API 호출 패턴

새 도메인(예: book) 추가 시 아래 순서를 따른다.

## 1. 타입 정의 (`entities/<domain>/model/types.ts`)

```tsx
export interface Book {
  id: number;
  title: string;
  author: string;
}

export interface BookCreateRequest {
  title: string;
  author: string;
}
```

## 2. API 클래스 (`entities/<domain>/api/<domain>Api.ts`)

```tsx
import { API } from '@/shared/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { Book, BookCreateRequest } from '../model/types';

export class BookAPI {
  static fetchBooks() {
    return API.get<Book[]>('/books');
  }

  static fetchBookById(id: number) {
    return API.get<Book>(`/books/${id}`);
  }

  static createBook(data: BookCreateRequest) {
    return API.post<Book>('/books', data);
  }

  static updateBook(id: number, data: Partial<BookCreateRequest>) {
    return API.patch<Book>(`/books/${id}`, data);
  }

  static deleteBook(id: number) {
    return API.delete<void>(`/books/${id}`);
  }

  static query = createQueryKeys('books', {
    list: () => ({
      queryKey: ['list'],
      queryFn: async () => {
        const { data } = await BookAPI.fetchBooks();
        return data;
      },
    }),
    detail: (id: number) => ({
      queryKey: [id],
      queryFn: async () => {
        const { data } = await BookAPI.fetchBookById(id);
        return data;
      },
    }),
  });
}
```

## 3. Query 훅 (`entities/<domain>/api/use<Domain>Query.ts`)

```tsx
import { useQuery } from '@tanstack/react-query';
import { BookAPI } from './bookApi';

export default function useBooksQuery() {
  return useQuery({ ...BookAPI.query.list() });
}
```

파라미터가 있는 경우:

```tsx
export default function useBookDetailQuery(id: number) {
  return useQuery({ ...BookAPI.query.detail(id), enabled: !!id });
}
```

## 4. Mutation 훅 (`entities/<domain>/api/use<Action><Domain>Mutation.ts`)

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookAPI } from './bookApi';
import type { BookCreateRequest } from '../model/types';

export default function useCreateBookMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BookCreateRequest) => BookAPI.createBook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BookAPI.query._def });
    },
  });
}
```

## 5. index.ts (`entities/<domain>/index.ts`)

```tsx
export { BookAPI } from './api/bookApi';
export { default as useBooksQuery } from './api/useBooksQuery';
export { default as useBookDetailQuery } from './api/useBookDetailQuery';
export { default as useCreateBookMutation } from './api/useCreateBookMutation';
export type { Book, BookCreateRequest } from './model/types';
```

## 6. 컴포넌트에서 사용

```tsx
import { useBooksQuery, useCreateBookMutation } from '@/entities/book';

function BookList() {
  const { data: books, isLoading } = useBooksQuery();
  const { mutate: createBook } = useCreateBookMutation();

  const handleAdd = () => {
    createBook({ title: '새 도서', author: '김작가' });
  };
  // ...
}
```
