⏺ API 호출 패턴 사용법

  아래는 book이라는 새 도메인을 추가한다고 가정했을 때의 api 추가 예시이다.
  모든 API의 연동은 다음 원칙을 준수해야 한다.

  ---
  1. 타입 정의 (entities/book/model/types.ts)

  /**
   * 도서 정보
   * - id: 도서 고유 ID
   * - title: 도서 제목
   * - author: 저자명
   */
  export interface Book {
    /** 도서 고유 ID */
    id: number;
    /** 도서 제목 */
    title: string;
    /** 저자명 */
    author: string;
  }

  /**
   * 도서 등록 요청
   * - title: 도서 제목
   * - author: 저자명
   */
  export interface BookCreateRequest {
    title: string;
    author: string;
  }

  ---
  2. API 클래스 (entities/book/api/bookApi.ts)

  import { API } from '@/shared/api';
  import { createQueryKeys } from '@lukemorales/query-key-factory';
  import type { Book, BookCreateRequest } from '../model/types';

  /**
   * # BookAPI
   * ---
   * - 간단설명: 도서 관련 API를 정적 메서드로 관리하는 클래스
   * ---
   * @example
   * const { data } = await BookAPI.fetchBooks();
   * const { data } = await BookAPI.fetchBookById(1);
   */
  export class BookAPI {
    /** 도서 목록 조회 */
    static fetchBooks() {
      return API.get<Book[]>('/books');
    }

    /** 도서 상세 조회 */
    static fetchBookById(id: number) {
      return API.get<Book>(`/books/${id}`);
    }

    /** 도서 등록 */
    static createBook(data: BookCreateRequest) {
      return API.post<Book>('/books', data);
    }

    /** 도서 수정 */
    static updateBook(id: number, data: Partial<BookCreateRequest>) {
      return API.patch<Book>(`/books/${id}`, data);
    }

    /** 도서 삭제 */
    static deleteBook(id: number) {
      return API.delete<void>(`/books/${id}`);
    }

    /** 쿼리 키 팩토리 */
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

  ---
  3. Query 훅 (entities/book/api/useBooksQuery.ts)

  import { useQuery } from '@tanstack/react-query';
  import { BookAPI } from './bookApi';

  /**
   * # useBooksQuery
   * ---
   * - 간단설명: 도서 목록을 조회하는 React Query 훅
   * ---
   * @example
   * const { data: books, isLoading } = useBooksQuery();
   */
  export default function useBooksQuery() {
    return useQuery({
      ...BookAPI.query.list(),
    });
  }

  파라미터가 있는 경우 (entities/book/api/useBookDetailQuery.ts):

  import { useQuery } from '@tanstack/react-query';
  import { BookAPI } from './bookApi';

  /**
   * # useBookDetailQuery
   * ---
   * - 간단설명: 도서 상세 정보를 조회하는 React Query 훅
   * ---
   * @param id 도서 ID
   * @example
   * const { data: book } = useBookDetailQuery(1);
   */
  export default function useBookDetailQuery(id: number) {
    return useQuery({
      ...BookAPI.query.detail(id),
      enabled: !!id,
    });
  }

  ---
  4. Mutation 훅 (entities/book/api/useCreateBookMutation.ts)

  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import { BookAPI } from './bookApi';
  import type { BookCreateRequest } from '../model/types';

  /**
   * # useCreateBookMutation
   * ---
   * - 간단설명: 도서 등록 mutation 훅 (POST /books)
   * ---
   * @example
   * const { mutate, isPending } = useCreateBookMutation();
   * mutate({ title: '제목', author: '저자' });
   */
  export default function useCreateBookMutation() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: BookCreateRequest) => BookAPI.createBook(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: BookAPI.query._def });
      },
    });
  }

  ---
  5. index.ts (entities/book/index.ts)

  export { BookAPI } from './api/bookApi';
  export { default as useBooksQuery } from './api/useBooksQuery';
  export { default as useBookDetailQuery } from './api/useBookDetailQuery';
  export { default as useCreateBookMutation } from './api/useCreateBookMutation';
  export type { Book, BookCreateRequest } from './model/types';

  ---
  6. 컴포넌트에서 사용

  import { useBooksQuery, useCreateBookMutation } from '@/entities/book';

  function BookList() {
    const { data: books, isLoading } = useBooksQuery();
    const { mutate: createBook, isPending } = useCreateBookMutation();

    const handleAdd = () => {
      createBook({ title: '새 도서', author: '김작가' });
    };

    // ...
  }