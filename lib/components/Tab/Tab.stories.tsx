import { Meta, StoryObj } from '@storybook/react';
import Tab from '.';
import { useState } from 'react';

/**
 * Radix UI Tabs 기반 Tab 컴포넌트
 * - Tab.Root, Tab.List, Tab.Trigger, Tab.Content 의 compound component 방식으로 사용
 * - `data-[state=active]` 셀렉터로 활성 탭 스타일 지정
 */
const meta: Meta = {
  title: 'Components/Tab',
};

export default meta;

type Story = StoryObj;

const underlineTrigger = 'px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-colors';
const pillTrigger = 'flex-1 px-3 py-1.5 text-sm font-medium rounded-md text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all';

/** 기본 탭 — 밑줄 스타일 */
export const DefaultTab: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');
    return (
      <div className="w-80">
        <Tab.Root value={value} onValueChange={setValue}>
          <Tab.List styleClass={{ root: 'flex border-b border-gray-200' }}>
            <Tab.Trigger value="tab1" styleClass={{ root: underlineTrigger }}>탭 1</Tab.Trigger>
            <Tab.Trigger value="tab2" styleClass={{ root: underlineTrigger }}>탭 2</Tab.Trigger>
            <Tab.Trigger value="tab3" styleClass={{ root: underlineTrigger }}>탭 3</Tab.Trigger>
          </Tab.List>
          <Tab.Content value="tab1" styleClass={{ root: 'p-4' }}>
            <p className="text-sm text-gray-700">탭 1 콘텐츠입니다.</p>
          </Tab.Content>
          <Tab.Content value="tab2" styleClass={{ root: 'p-4' }}>
            <p className="text-sm text-gray-700">탭 2 콘텐츠입니다.</p>
          </Tab.Content>
          <Tab.Content value="tab3" styleClass={{ root: 'p-4' }}>
            <p className="text-sm text-gray-700">탭 3 콘텐츠입니다.</p>
          </Tab.Content>
        </Tab.Root>
      </div>
    );
  },
};

/** 알약(pill) 스타일 탭 */
export const PillTab: Story = {
  render: () => {
    const [value, setValue] = useState('search');
    return (
      <div className="w-80">
        <Tab.Root value={value} onValueChange={setValue}>
          <Tab.List styleClass={{ root: 'flex gap-1 p-1 bg-gray-100 rounded-lg' }}>
            <Tab.Trigger value="search" styleClass={{ root: pillTrigger }}>검색</Tab.Trigger>
            <Tab.Trigger value="favorites" styleClass={{ root: pillTrigger }}>즐겨찾기</Tab.Trigger>
            <Tab.Trigger value="history" styleClass={{ root: pillTrigger }}>히스토리</Tab.Trigger>
          </Tab.List>
          <Tab.Content value="search" styleClass={{ root: 'p-4' }}>
            <p className="text-sm text-gray-700">도서 검색 콘텐츠</p>
          </Tab.Content>
          <Tab.Content value="favorites" styleClass={{ root: 'p-4' }}>
            <p className="text-sm text-gray-700">즐겨찾기 콘텐츠</p>
          </Tab.Content>
          <Tab.Content value="history" styleClass={{ root: 'p-4' }}>
            <p className="text-sm text-gray-700">히스토리 콘텐츠</p>
          </Tab.Content>
        </Tab.Root>
      </div>
    );
  },
};

/** 기본값(defaultValue) 사용 — 비제어 모드 */
export const UncontrolledTab: Story = {
  name: '비제어 모드 (defaultValue)',
  render: () => (
    <div className="w-80">
      <Tab.Root defaultValue="b">
        <Tab.List styleClass={{ root: 'flex border-b border-gray-200' }}>
          <Tab.Trigger value="a" styleClass={{ root: underlineTrigger }}>A</Tab.Trigger>
          <Tab.Trigger value="b" styleClass={{ root: underlineTrigger }}>B (기본)</Tab.Trigger>
          <Tab.Trigger value="c" styleClass={{ root: underlineTrigger }}>C</Tab.Trigger>
        </Tab.List>
        <Tab.Content value="a" styleClass={{ root: 'p-4' }}>
          <p className="text-sm text-gray-700">A 패널</p>
        </Tab.Content>
        <Tab.Content value="b" styleClass={{ root: 'p-4' }}>
          <p className="text-sm text-gray-700">B 패널 — 기본 선택됨</p>
        </Tab.Content>
        <Tab.Content value="c" styleClass={{ root: 'p-4' }}>
          <p className="text-sm text-gray-700">C 패널</p>
        </Tab.Content>
      </Tab.Root>
    </div>
  ),
};
