import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseInfiniteScrollOptions {
  onIntersect: () => void;
  isLoading?: boolean;
  hasNextPage?: boolean;
  threshold?: number;
}

const useInfiniteScroll = ({
  onIntersect,
  isLoading = false,
  hasNextPage = true,
  threshold = 0.1,
}: UseInfiniteScrollOptions) => {
  const { ref, inView } = useInView({ threshold });

  useEffect(() => {
    if (inView && !isLoading && hasNextPage) {
      onIntersect();
    }
  }, [inView, isLoading, hasNextPage, onIntersect]);

  return { ref };
};

export default useInfiniteScroll;
