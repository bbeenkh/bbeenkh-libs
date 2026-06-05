import { QueryClient, QueryClientProvider, useInfiniteQuery } from '@tanstack/react-query';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import useInfiniteScroll from './useInfiniteScroll';

const PAGE_SIZE = 10;

const generateItems = (page: number) =>
  Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: (page - 1) * PAGE_SIZE + i + 1,
    label: `아이템 ${(page - 1) * PAGE_SIZE + i + 1}`,
  }));

const InfiniteScrollDemo = ({ maxPages = 5 }: { maxPages?: number }) => {
  const [items, setItems] = useState(generateItems(1));
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const hasNextPage = page < maxPages;

  const { InfiniteScrollWrapper } = useInfiniteScroll({
    onTriggered: () => {
      setIsLoading(true);
      setTimeout(() => {
        const next = page + 1;
        setItems((prev) => [...prev, ...generateItems(next)]);
        setPage(next);
        setIsLoading(false);
      }, 800);
    },
    isLoading,
    hasNextPage,
  });

  return (
    <div className="max-w-sm mx-auto p-4 border rounded-lg h-[400px] overflow-y-auto">
      <InfiniteScrollWrapper
        thresholdUI={
          isLoading ? (
            <p className="text-center text-sm text-gray-500">로딩 중...</p>
          ) : !hasNextPage ? (
            <p className="text-center text-sm text-gray-500">모든 항목을 불러왔습니다.</p>
          ) : null
        }
      >
        {items.map((item) => (
          <div key={item.id} className="p-3 bg-gray-100 rounded text-sm">
            {item.label}
          </div>
        ))}
      </InfiniteScrollWrapper>
    </div>
  );
};

const fetchItems = async ({ pageParam = 1 }: { pageParam: number }) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    items: generateItems(pageParam),
    nextPage: pageParam < 5 ? pageParam + 1 : undefined,
  };
};

const queryClient = new QueryClient();

const InfiniteScrollWithReactQueryDemo = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['infinite-items'],
      queryFn: fetchItems,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  const { InfiniteScrollWrapper } = useInfiniteScroll({
    onTriggered: fetchNextPage,
    isLoading: isFetchingNextPage,
    hasNextPage,
  });

  return (
    <div className="max-w-sm mx-auto p-4 border rounded-lg h-[400px] overflow-y-auto">
      <InfiniteScrollWrapper
        thresholdUI={
          isFetchingNextPage ? (
            <p className="text-center text-sm text-gray-500">로딩 중...</p>
          ) : !hasNextPage ? (
            <p className="text-center text-sm text-gray-500">모든 항목을 불러왔습니다.</p>
          ) : null
        }
      >
        {items.map((item) => (
          <div key={item.id} className="p-3 bg-gray-100 rounded text-sm">
            {item.label}
          </div>
        ))}
      </InfiniteScrollWrapper>
    </div>
  );
};

const WithReactQueryProvider = () => (
  <QueryClientProvider client={queryClient}>
    <InfiniteScrollWithReactQueryDemo />
  </QueryClientProvider>
);

const meta: Meta<typeof InfiniteScrollDemo> = {
  title: 'Hooks/useInfiniteScroll',
  component: InfiniteScrollDemo,
  argTypes: {
    maxPages: {
      name: '최대 페이지 수',
      control: 'number',
      description: '불러올 수 있는 최대 페이지 수',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InfiniteScrollDemo>;

export const Default: Story = {
  args: {
    maxPages: 5,
  },
};

export const WithReactQuery: StoryObj<typeof WithReactQueryProvider> = {
  render: () => <WithReactQueryProvider />,
  name: 'useInfiniteQuery 연동',
};
