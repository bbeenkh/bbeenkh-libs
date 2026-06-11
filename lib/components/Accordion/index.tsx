import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/utils/cn';

/**
 * # Accordion UI
 * ---
 * - Radix UI `@radix-ui/react-accordion` 기반 아코디언 복합 컴포넌트
 * - `Accordion`: 아코디언 루트. `type="single"` (단일 열림) 또는 `type="multiple"` (다중 열림) 지원
 * - `AccordionItem`: 개별 아코디언 항목. `value` prop으로 식별
 * - `AccordionTrigger`: 항목 헤더 버튼. 클릭 시 열림/닫힘 토글, 열림 상태에서 chevron 180° 회전
 * - `AccordionContent`: 항목 콘텐츠 영역. 열림/닫힘 시 animate-accordion-down/up 애니메이션
 * ---
 * @example
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>제목 1</AccordionTrigger>
 *     <AccordionContent>내용 1</AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger>제목 2</AccordionTrigger>
 *     <AccordionContent>내용 2</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 */
const Accordion = AccordionPrimitive.Root;

/**
 * # AccordionItem
 * ---
 * - 개별 아코디언 항목 컴포넌트. `value` prop으로 고유 식별
 * - 하단 구분선(`border-b border-gray-200`) 기본 포함
 * @param value - 아코디언 항목의 고유 식별자
 * @param className - 추가 Tailwind 클래스
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b border-gray-200', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

/**
 * # AccordionTrigger
 * ---
 * - 아코디언 항목의 헤더 버튼. `AccordionItem` 내부에서 사용
 * - 열림 상태(`data-state=open`)일 때 우측 chevron 아이콘이 180° 회전
 * @param className - 추가 Tailwind 클래스
 * @param children - 트리거 버튼 내부 콘텐츠 (제목 텍스트 등)
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 shrink-0 text-gray-500 transition-transform duration-200"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/**
 * # AccordionContent
 * ---
 * - 아코디언 항목의 콘텐츠 영역. `AccordionItem` 내부에서 `AccordionTrigger`와 함께 사용
 * - 열릴 때 `animate-accordion-down`, 닫힐 때 `animate-accordion-up` 애니메이션 적용
 * @param className - 내부 콘텐츠 div에 추가할 Tailwind 클래스
 * @param children - 펼쳐질 콘텐츠
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
