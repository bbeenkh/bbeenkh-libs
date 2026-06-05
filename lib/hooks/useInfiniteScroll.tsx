import { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseInfiniteScrollOptions {
  onTriggered: () => void;
  isLoading?: boolean;
  hasNextPage?: boolean;
  threshold?: number;
}

/**
 * # useInfiniteScroll
 * ---
 * - 간단설명: IntersectionObserver 기반 무한 스크롤 훅
 * - 반환된 `InfiniteScrollWrapper`로 리스트를 감싸면, 하단 감지 영역이 뷰포트에 들어올 때
 *   `onTriggered`를 호출해 다음 페이지를 로드한다
 * - `isLoading`이 `true`이거나 `hasNextPage`가 `false`이면 콜백이 실행되지 않는다
 * ---
 * @param onTriggered 뷰포트 진입 시 호출되는 콜백 (다음 페이지 로드 트리거)
 * @param isLoading 현재 데이터 로딩 중 여부 (기본값: `false`)
 * @param hasNextPage 다음 페이지 존재 여부 (기본값: `true`)
 * @param threshold IntersectionObserver 임계값 0–1 (기본값: `0.1`)
 * @returns `{ InfiniteScrollWrapper }` — 리스트와 감지 영역을 함께 렌더링하는 래퍼 컴포넌트
 * @example
 * const { InfiniteScrollWrapper } = useInfiniteScroll({
 *   onTriggered: fetchNextPage,
 *   isLoading,
 *   hasNextPage,
 * });
 *
 * return (
 *   <InfiniteScrollWrapper thresholdUI={isLoading ? <Spinner /> : null}>
 *     {items.map(item => <Card key={item.id} {...item} />)}
 *   </InfiniteScrollWrapper>
 * );
 */
const useInfiniteScroll = ({
  onTriggered,
  isLoading = false,
  hasNextPage = true,
  threshold = 0.1,
}: UseInfiniteScrollOptions) => {
  const { ref, inView } = useInView({ threshold });

  useEffect(() => {
    if (inView && !isLoading && hasNextPage) {
      onTriggered();
    }
  }, [inView, isLoading, hasNextPage, onTriggered]);

  const InfiniteScrollWrapper = useCallback(({ children, thresholdUI }: { children: React.ReactNode, thresholdUI: React.ReactNode }) => {
    return <div className='w-full flex flex-col gap-2'>
      {children}
      <div ref={ref} className='w-full h-10'>{thresholdUI}</div>
    </div>
  }, [ref]);

  return { InfiniteScrollWrapper };
};

export default useInfiniteScroll;
