import type { Meta, StoryObj } from '@storybook/react';
import Popover from '.';

/**
 * Popover 컴포넌트 스토리
 * - Popover.Root, Popover.Trigger, Popover.Content 의 compound component 방식으로 사용
 * - side prop으로 표시 방향(top/bottom/left/right) 지정 가능
 * - sideOffset prop으로 트리거와의 간격 조정 가능 (기본값: 8px)
 */
const meta: Meta = {
  title: 'Atoms/Popover',
};

export default meta;

type Story = StoryObj;

const triggerClass = 'px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors';
const outlineTriggerClass = 'px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors';
const contentClass = 'z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4';

export const Default: Story = {
  render: () => (
    <div className="p-12">
      <Popover.Root>
        <Popover.Trigger className={triggerClass}>
          팝오버 열기
        </Popover.Trigger>
        <Popover.Content styleClass={{ content: contentClass }}>
          <div className="w-48">
            <p className="text-sm">팝오버 콘텐츠입니다.</p>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};

/** 위치 옵션 — top / bottom / left / right */
export const Positions: Story = {
  name: '위치 옵션 (side)',
  render: () => (
    <div className="flex items-center justify-center gap-4 p-24">
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <Popover.Root key={side}>
          <Popover.Trigger className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            {side}
          </Popover.Trigger>
          <Popover.Content side={side} styleClass={{ content: contentClass }}>
            <p className="text-sm whitespace-nowrap">{side} 방향 팝오버</p>
          </Popover.Content>
        </Popover.Root>
      ))}
    </div>
  ),
};

/** Arrow 포함 */
export const WithArrow: Story = {
  render: () => (
    <div className="p-12">
      <Popover.Root>
        <Popover.Trigger className={outlineTriggerClass}>
          화살표 있는 팝오버
        </Popover.Trigger>
        <Popover.Content styleClass={{ content: contentClass, arrow: 'fill-gray-200' }}>
          <div className="w-48">
            <p className="text-sm font-semibold mb-1">팝오버 제목</p>
            <p className="text-xs text-gray-500">팝오버 설명 텍스트입니다.</p>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};

/** 닫기 버튼 포함 */
export const WithCloseButton: Story = {
  render: () => (
    <div className="p-12">
      <Popover.Root>
        <Popover.Trigger className={triggerClass}>
          팝오버 열기
        </Popover.Trigger>
        <Popover.Content styleClass={{ content: contentClass }}>
          <div className="w-48 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold">팝오버 제목</p>
              <Popover.Close className="text-gray-400 hover:text-gray-600 text-lg leading-none">
                ✕
              </Popover.Close>
            </div>
            <p className="text-xs text-gray-500">X 버튼으로 팝오버를 닫을 수 있습니다.</p>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};

/** sideOffset 조절 예시 */
export const CustomOffset: Story = {
  name: 'sideOffset 조절',
  render: () => (
    <div className="flex gap-6 p-12">
      <Popover.Root>
        <Popover.Trigger className={outlineTriggerClass}>
          기본 간격 (8px)
        </Popover.Trigger>
        <Popover.Content styleClass={{ content: contentClass }}>
          <p className="text-sm whitespace-nowrap">sideOffset = 8</p>
        </Popover.Content>
      </Popover.Root>
      <Popover.Root>
        <Popover.Trigger className={outlineTriggerClass}>
          넓은 간격 (24px)
        </Popover.Trigger>
        <Popover.Content sideOffset={24} styleClass={{ content: contentClass }}>
          <p className="text-sm whitespace-nowrap">sideOffset = 24</p>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
};
