import { Meta, StoryObj } from '@storybook/react';
import Tag from '.';

/**
 * - 간단한 상태 표시에 주로 사용되는 컴포넌트입니다. 
 * - default, info(blue), success(green), warning(orange), danger(red) 스타일을 제공합니다.
 */
const meta: Meta<typeof Tag> = {
  component: Tag,
  argTypes: {
    variant: {
      name: 'variant',
      description:
        '상태 또는 추가 정보를 표시하고 싶을 때 사용하는 컴포넌트 입니다.',
      control: { type: 'radio' },
      options: ['default', 'info', 'success', 'warning', 'danger'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const DefaultTag: Story = {
  args: {
    variant: 'default',
    children: 'Value',
  },
};
