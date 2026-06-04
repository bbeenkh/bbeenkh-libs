import { Meta, StoryObj } from '@storybook/react';
import SearchFallbackView from '.';
import Button from '../Button';

const SearchIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const OfflineIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M12 12h.01M3 3l18 18" />
  </svg>
);

const baseStyle = {
  root: 'flex flex-col items-center gap-3 py-12 text-gray-500',
  icon: 'text-gray-400',
  message: 'text-sm',
};

/**
 * 검색 결과 없음 등 빈 상태를 표시하는 SearchFallbackView 컴포넌트
 * - `message`: 표시할 텍스트
 * - `icon`: 선택적 아이콘 ReactNode
 * - `styleClass`로 스타일 주입
 */
const meta: Meta<typeof SearchFallbackView> = {
  title: 'Components/SearchFallbackView',
  component: SearchFallbackView,
  argTypes: {
    message: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof SearchFallbackView>;

/** 기본 — 아이콘 + 메시지 */
export const DefaultFallback: Story = {
  args: {
    message: '검색된 결과가 없습니다.',
    icon: <SearchIcon />,
    styleClass: baseStyle,
  },
};

/** 아이콘 없는 메시지만 */
export const FallbackWithoutIcon: Story = {
  args: {
    message: '검색 도중 문제가 발생하였습니다. 다시 시도해 주세요.',
    icon: undefined,
    styleClass: {
      root: 'flex flex-col items-center gap-3 py-12 text-gray-500',
      message: 'text-sm',
    },
  },
};

/** 오프라인 상태 */
export const OfflineState: Story = {
  args: {
    icon: <OfflineIcon />,
    message: '인터넷 연결을 확인해주세요.',
    styleClass: baseStyle,
  },
};

/** 에러 상태 — 재시도 버튼 포함 */
export const ErrorState: Story = {
  render: () => (
    <div className="w-full flex flex-col items-center gap-2">
      <SearchFallbackView
        message="검색 도중 알 수 없는 문제가 발생하였습니다."
        styleClass={{
          root: 'flex flex-col items-center gap-3 py-12 text-gray-500',
          message: 'text-sm',
        }}
      />
      <Button styleClass={{ root: 'px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors' }}>
        재시도
      </Button>
    </div>
  ),
};

/** Timeout 에러 — 재시도 버튼 포함 */
export const TimeoutState: Story = {
  render: () => (
    <div className="w-full flex flex-col items-center gap-2">
      <SearchFallbackView
        message="요청 시간이 초과되었습니다. 재시도해주세요."
        styleClass={{
          root: 'flex flex-col items-center gap-3 py-12 text-gray-500',
          message: 'text-sm',
        }}
      />
      <Button styleClass={{ root: 'px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors' }}>
        재시도
      </Button>
    </div>
  ),
};
