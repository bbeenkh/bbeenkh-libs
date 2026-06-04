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

  const { ref } = useInfiniteScroll({
    onIntersect: () => {
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
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id} className="p-3 bg-gray-100 rounded text-sm">
            {item.label}
          </li>
        ))}
      </ul>

      <div ref={ref} className="py-4 text-center text-sm text-gray-500">
        {isLoading && '로딩 중...'}
        {!isLoading && !hasNextPage && '모든 항목을 불러왔습니다.'}
      </div>
    </div>
  );
};

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
