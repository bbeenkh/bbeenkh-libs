import { Meta, StoryObj } from '@storybook/react';
import Input from '.';

/**
 * prefix/suffix/onEnter를 지원하는 Input 컴포넌트
 * - 기본 스타일 없음 — 모든 스타일은 `styleClass`로 주입
 * - `prefix`: input 좌측 아이콘/텍스트
 * - `suffix`: input 우측 단위/버튼
 * - `onEnter`: Enter 키 콜백
 */
const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    placeholder: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

/** 기본 Input */
export const DefaultInput: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
    type: 'text',
    styleClass: {
      root: 'border border-gray-300 rounded-lg px-3 py-2',
      input: 'text-sm outline-none',
    },
  },
};

/** 채워진 배경 스타일 */
export const FilledInput: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    type: 'text',
    styleClass: {
      root: 'bg-gray-100 rounded-lg px-3 py-2',
      input: 'bg-transparent outline-none text-sm',
    },
  },
};

/** 밑줄 스타일 */
export const UnderlinedInput: Story = {
  args: {
    placeholder: '밑줄 스타일 입력창',
    type: 'text',
    styleClass: {
      root: 'border-b border-gray-400 px-1 py-1',
      input: 'bg-transparent outline-none text-sm',
    },
  },
};

/** 검색 아이콘 prefix 포함 */
export const InputWithPrefix: Story = {
  render: () => (
    <Input
      placeholder="검색..."
      styleClass={{
        root: 'border border-gray-300 rounded-lg px-3 py-2',
        input: 'pl-1 outline-none text-sm',
        prefix: 'text-gray-400',
      }}
      prefix={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      }
    />
  ),
};

/** 단위 suffix 포함 */
export const InputWithSuffix: Story = {
  render: () => (
    <Input
      placeholder="0"
      type="number"
      styleClass={{
        root: 'border border-gray-300 rounded-lg px-3 py-2 w-36',
        input: 'pr-6 outline-none text-sm',
        suffix: 'text-gray-500 text-sm',
      }}
      suffix={<span>원</span>}
    />
  ),
};

/** Enter 키 이벤트 */
export const InputWithOnEnter: Story = {
  render: () => (
    <Input
      placeholder="Enter 키를 누르면 알림이 표시됩니다"
      styleClass={{
        root: 'border border-gray-300 rounded-lg px-3 py-2 w-72',
        input: 'outline-none text-sm',
      }}
      onEnter={() => alert('Enter 입력됨!')}
    />
  ),
};

/** 비활성화 상태 */
export const DisabledInput: Story = {
  args: {
    placeholder: '비활성화된 입력창',
    disabled: true,
    styleClass: {
      root: 'border border-gray-200 rounded-lg px-3 py-2 bg-gray-50',
      input: 'outline-none text-sm text-gray-400 cursor-not-allowed',
    },
  },
};
