import { Meta, StoryObj } from '@storybook/react';
import Selectbox from '.';
import { useState } from 'react';

/**
 * Radix UI Select 기반 Selectbox 컴포넌트
 * - `options` 배열로 선택지 주입
 * - `onSelect`으로 선택 값 콜백
 * - 기본 스타일 없음 — 모든 스타일은 `styleClass`로 주입
 */
const meta: Meta = {
  title: 'Components/Selectbox',
};

export default meta;

type Story = StoryObj;

const baseOptions = [
  { label: '정확도순', value: 'accuracy' },
  { label: '최신순', value: 'latest' },
  { label: '이름순', value: 'name' },
];

const triggerClass = 'flex items-center justify-between gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm min-w-[120px] bg-white hover:bg-gray-50 transition-colors';
const contentClass = 'bg-white rounded-lg shadow-lg border border-gray-200 z-50';
const viewportClass = 'p-1';
const itemClass = 'px-3 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 data-[highlighted]:bg-gray-100 outline-none';

/** 기본 Selectbox */
export const DefaultSelectbox: Story = {
  render: () => {
    const [selected, setSelected] = useState('accuracy');
    return (
      <div className="p-8">
        <Selectbox
          value={selected}
          options={baseOptions}
          onSelect={setSelected}
          styleClass={{ trigger: triggerClass, content: contentClass, viewport: viewportClass, item: itemClass }}
        />
      </div>
    );
  },
};

/** placeholder 표시 */
export const WithPlaceholder: Story = {
  render: () => {
    const [selected, setSelected] = useState('');
    return (
      <div className="p-8">
        <Selectbox
          value={selected || undefined}
          options={baseOptions}
          onSelect={setSelected}
          placeholder="정렬 기준 선택"
          styleClass={{ trigger: triggerClass, content: contentClass, viewport: viewportClass, item: itemClass }}
        />
      </div>
    );
  },
};

/** 스타일 없는 최소 Selectbox */
export const Minimal: Story = {
  render: () => {
    const [selected, setSelected] = useState('accuracy');
    return (
      <div className="p-8">
        <Selectbox
          value={selected}
          options={baseOptions}
          onSelect={setSelected}
        />
      </div>
    );
  },
};

/** 많은 옵션 */
export const ManyOptions: Story = {
  render: () => {
    const options = Array.from({ length: 10 }, (_, i) => ({
      label: `옵션 ${i + 1}`,
      value: String(i + 1),
    }));
    const [selected, setSelected] = useState('1');
    return (
      <div className="p-8">
        <Selectbox
          value={selected}
          options={options}
          onSelect={setSelected}
          styleClass={{
            trigger: triggerClass,
            content: `${contentClass} max-h-48 overflow-y-auto`,
            viewport: viewportClass,
            item: itemClass,
          }}
        />
      </div>
    );
  },
};
