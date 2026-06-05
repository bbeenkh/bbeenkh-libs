import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { twMerge } from 'tailwind-merge';

interface StyleClass {
  root?: string;
  thumb?: string;
}

interface Props extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  styleClass?: StyleClass;
}

/**
 * # SwitchButton UI
 * ---
 * - Radix UI `@radix-ui/react-switch` 기반 스위치 버튼 컴포넌트
 * - 접근성(키보드, 스크린리더, form 제출) Radix가 처리
 * - `checked` / `onCheckedChange` — 제어 컴포넌트
 * - `defaultChecked` — 비제어 컴포넌트
 * - `data-[state=checked]` / `data-[state=unchecked]` / `data-[disabled]` attribute 제공
 * - 기본 스타일 포함 — `styleClass`로 덮어쓸 수 있음
 * ---
 * @param checked - 제어 컴포넌트용 on/off 값
 * @param defaultChecked - 비제어 초기값
 * @param onCheckedChange - 상태 변경 콜백 `(checked: boolean) => void`
 * @param disabled - 비활성화 여부
 * @param styleClass.root - 트랙(배경) 영역 추가 클래스
 * @param styleClass.thumb - 썸(원형 핸들) 추가 클래스
 * ---
 * @example
 * // 비제어
 * <SwitchButton defaultChecked />
 *
 * // 제어
 * <SwitchButton checked={isOn} onCheckedChange={setIsOn} />
 *
 * // 커스텀 스타일
 * <SwitchButton
 *   styleClass={{
 *     root: 'w-14 h-8 data-[state=checked]:bg-blue-500',
 *     thumb: 'w-6 h-6 data-[state=checked]:translate-x-6',
 *   }}
 * />
 */
const SwitchButton = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  Props
>(function SwitchButton({ styleClass, className, ...props }, ref) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={twMerge(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full',
        'transition-colors duration-200',
        'bg-gray-200 data-[state=checked]:bg-gray-900',
        'disabled:cursor-not-allowed disabled:opacity-40',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2',
        styleClass?.root,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={twMerge(
          'block h-4 w-4 rounded-full bg-white shadow-sm',
          'transition-transform duration-200',
          'translate-x-1 data-[state=checked]:translate-x-6',
          styleClass?.thumb,
        )}
      />
    </SwitchPrimitive.Root>
  );
});

export default SwitchButton;
