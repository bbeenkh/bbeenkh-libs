import { Meta, StoryObj } from '@storybook/react';
import Badge from '.';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    type: {
      name: '타입',
      control: { type: 'radio' },
      options: ['number', 'dot'],
      description: 'Badge 사용 타입 선택',
    },
    size: {
      name: '크기',
      control: { type: 'radio' },
      options: ['default', 'sm'],
      description: 'Badge의 크기 (타입이 dot일 경우에만 sm 사이즈 적용됨)',
    },
    children: {
      name: '정보의 개수',
      description: 'Badge 안에 나타낼 수 (타입이 dot일 경우 노출x)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const DefaultButton: Story = {
  args: {
    children: 1,
    type: 'number',
    size: 'default',
  },
};
