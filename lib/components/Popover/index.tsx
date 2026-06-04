import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { twMerge } from 'tailwind-merge';

interface ContentStyleClass {
  content?: string;
  arrow?: string;
}

/**
 * # Popover.Content
 * ---
 * - 팝오버 콘텐츠 서브컴포넌트. Portal을 통해 렌더링된다.
 * - `data-[state=open]` / `data-[state=closed]` CSS 애니메이션으로 fade in/out 된다.
 * - `side`로 표시 방향(상/하/좌/우)을 지정한다 (기본값: `'bottom'`).
 * - `sideOffset`으로 트리거와의 간격을 지정한다 (기본값: `8px`).
 * - `Arrow`가 내부에 포함되어 있으며, `styleClass.arrow`로 스타일을 지정할 수 있다.
 * ---
 * @param children - 렌더링할 자식 요소
 * @param styleClass.content - 콘텐츠 요소에 추가할 className
 * @param styleClass.arrow - 화살표 요소에 추가할 className
 * @param side - 팝오버 표시 방향 (`'top' | 'bottom' | 'left' | 'right'`, 기본값: `'bottom'`)
 * @param sideOffset - 트리거 엘리먼트와의 간격(px) (기본값: `8`)
 * ---
 * @example
 * <Popover.Root>
 *   <Popover.Trigger>열기</Popover.Trigger>
 *   <Popover.Content side="top" sideOffset={12} styleClass={{ content: 'bg-white shadow-lg', arrow: 'fill-white' }}>
 *     내용
 *   </Popover.Content>
 * </Popover.Root>
 */
const Content = ({
  children,
  styleClass,
  ...props
}: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
  styleClass?: ContentStyleClass;
}) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      {...props}
      className={twMerge(
        'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
        styleClass?.content,
      )}
      sideOffset={props.sideOffset ?? 8}
    >
      {children}
      <Popover.Arrow className={styleClass?.arrow} />
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
);

/**
 * # Popover UI
 * ---
 * - 간단설명: Radix UI Popover 기반 복합 컴포넌트 (Compound Component 패턴)
 * - `Popover.Root`: 팝오버 루트 (Radix Popover.Root 직접 사용)
 * - `Popover.Trigger`: 팝오버 트리거 버튼 (Radix Popover.Trigger 직접 사용)
 * - `Popover.Content`: 팝오버 콘텐츠 — Portal 렌더링 + Arrow 포함
 * - `Popover.Close`: 팝오버 닫기 버튼 (Radix Popover.Close 직접 사용)
 * - `Popover.Arrow`: 팝오버 화살표 (Radix Popover.Arrow 직접 사용)
 * - 기본 스타일 없음 — 모든 스타일은 `styleClass`로 주입
 */
const Popover: {
  Root: typeof PopoverPrimitive.Root;
  Trigger: typeof PopoverPrimitive.Trigger;
  Portal: typeof PopoverPrimitive.Portal;
  Anchor: typeof PopoverPrimitive.Anchor;
  Close: typeof PopoverPrimitive.Close;
  Arrow: typeof PopoverPrimitive.Arrow;
  Content: typeof Content;
} = {
  Root: PopoverPrimitive.Root,
  Trigger: PopoverPrimitive.Trigger,
  Portal: PopoverPrimitive.Portal,
  Anchor: PopoverPrimitive.Anchor,
  Close: PopoverPrimitive.Close,
  Arrow: PopoverPrimitive.Arrow,
  Content,
};

export default Popover;
