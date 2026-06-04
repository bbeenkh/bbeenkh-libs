import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

interface StyleClass {
  root?: string;
}

/**
 * # Tab.List
 * ---
 * - Radix UI `Tabs.List` 래퍼
 * - 탭 트리거들을 감싸는 컨테이너 역할
 * - 기본 스타일 없음 — 모든 스타일은 `styleClass`로 주입
 * ---
 * @param children 탭 트리거(Tab.Trigger) 목록
 * @param styleClass 커스텀 스타일 클래스 객체
 * - `styleClass.root`: List 컨테이너에 적용할 Tailwind 클래스
 */
const List = ({
  children,
  styleClass,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { styleClass?: StyleClass }) => (
  <TabsPrimitive.List className={styleClass?.root} {...props}>
    {children}
  </TabsPrimitive.List>
);

/**
 * # Tab.Trigger
 * ---
 * - Radix UI `Tabs.Trigger` 래퍼
 * - 개별 탭 버튼 역할. `value` prop으로 탭 식별
 * - 기본 스타일 없음 — 모든 스타일은 `styleClass`로 주입
 * ---
 * @param children 탭 버튼 내부 콘텐츠
 * @param styleClass 커스텀 스타일 클래스 객체
 * - `styleClass.root`: Trigger 버튼에 적용할 Tailwind 클래스
 */
const Trigger = ({
  children,
  styleClass,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { styleClass?: StyleClass }) => (
  <TabsPrimitive.Trigger className={styleClass?.root} {...props}>
    {children}
  </TabsPrimitive.Trigger>
);

/**
 * # Tab.Content
 * ---
 * - Radix UI `Tabs.Content` 래퍼
 * - 탭 패널 콘텐츠 영역. `value`가 활성 탭과 일치할 때 표시
 * - 기본 스타일 없음 — 모든 스타일은 `styleClass`로 주입
 * ---
 * @param children 탭 패널 내부 콘텐츠
 * @param styleClass 커스텀 스타일 클래스 객체
 * - `styleClass.root`: Content 패널에 적용할 Tailwind 클래스
 */
const Content = ({
  children,
  styleClass,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & { styleClass?: StyleClass }) => (
  <TabsPrimitive.Content className={styleClass?.root} {...props}>
    {children}
  </TabsPrimitive.Content>
);

/**
 * # Tab UI
 * ---
 * - 간단설명: Radix UI Tabs 기반 복합 컴포넌트 (Compound Component 패턴)
 * - `Tab.Root`: 탭 전체 컨테이너 (Radix Tabs.Root 직접 사용)
 * - `Tab.List`: 탭 트리거 목록 컨테이너
 * - `Tab.Trigger`: 개별 탭 트리거 버튼
 * - `Tab.Content`: 탭 패널 콘텐츠 영역
 * - 기본 스타일 없음 — 모든 스타일은 `styleClass`로 주입
 * ---
 * @example
 * <Tab.Root defaultValue="tab1">
 *   <Tab.List styleClass={{ root: 'flex gap-4 border-b' }}>
 *     <Tab.Trigger value="tab1" styleClass={{ root: 'px-4 py-2 font-medium' }}>
 *       도서 검색
 *     </Tab.Trigger>
 *     <Tab.Trigger value="tab2" styleClass={{ root: 'px-4 py-2 font-medium' }}>
 *       찜한 책
 *     </Tab.Trigger>
 *   </Tab.List>
 *   <Tab.Content value="tab1" styleClass={{ root: 'p-4' }}>
 *     도서 검색 콘텐츠
 *   </Tab.Content>
 *   <Tab.Content value="tab2" styleClass={{ root: 'p-4' }}>
 *     찜한 책 콘텐츠
 *   </Tab.Content>
 * </Tab.Root>
 */
const Tab = {
  Root: TabsPrimitive.Root,
  List,
  Trigger,
  Content,
};

export default Tab;
