import { Meta, StoryObj } from '@storybook/react';
import Pagination from '.';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  argTypes: {
    totalItems: {
      name: '총 게시물 수',
      control: 'number',
      description: '페이지네이션 처리할 총 게시물 수 지정',
    },
    displayPages: {
      name: '보여줄 게시물 수',
      control: 'number',
      description: '한 페이지에 보여질 게시물 수 지정',
    },
    pageCount: {
      name: '페이지 버튼 수',
      control: 'number',
      description: '한 번에 보여질 버튼 수 지정',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const DefaultPagination: Story = {
  args: {
    totalItems: 100,
    displayPages: 10,
    pageCount: 5,
    setPage(page) {
      console.log('선택한 페이지 >> ', page);
    },
  },
};
