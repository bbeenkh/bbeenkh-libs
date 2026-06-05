import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { twMerge } from 'tailwind-merge';

const UncheckedIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.25" y="0.5" width="23" height="23" rx="3.5" stroke="#E2E2E2" />
  </svg>
);

const CheckedIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.75" width="24" height="24" rx="4" fill="#232323" />
    <path
      d="M10.6134 14.5836L7.83339 11.8036L6.88672 12.7436L10.6134 16.4703L18.6134 8.47027L17.6734 7.53027L10.6134 14.5836Z"
      fill="white"
    />
  </svg>
);

const DisabledIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.75" width="24" height="24" rx="4" fill="#E2E2E2" />
  </svg>
);

export interface ICheckboxProps {
  id: string;
  label?: string;
  className?: string;
  /** 제어 컴포넌트용 checked 값 */
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  disabledIcon?: React.ReactNode;
}

/**
 * # Checkbox UI
 * ---
 * - Radix UI `@radix-ui/react-checkbox` 기반 체크박스 컴포넌트
 * - 접근성(키보드, 스크린리더) Radix가 처리
 * - `checked` / `onCheckedChange` — 제어 컴포넌트
 * - `defaultChecked` — 비제어 컴포넌트
 * - `checkedIcon` / `uncheckedIcon` / `disabledIcon` — 커스텀 아이콘 주입 가능
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  ICheckboxProps
>(function Checkbox(
  {
    id,
    label,
    className,
    checked,
    defaultChecked,
    disabled,
    onCheckedChange,
    checkedIcon = <CheckedIcon />,
    uncheckedIcon = <UncheckedIcon />,
    disabledIcon = <DisabledIcon />,
  },
  ref,
) {
  return (
    <div
      className={twMerge(
        'inline-flex items-center gap-xs',
        disabled ? 'cursor-default' : 'cursor-pointer',
        className,
      )}
    >
      <CheckboxPrimitive.Root
        ref={ref}
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={(val) => onCheckedChange?.(val === true)}
        className="relative w-5 h-5 shrink-0 focus-visible:outline-none group"
      >
        {/* unchecked / disabled: Indicator가 없을 때(unchecked) 표시 */}
        <div className="w-full h-full group-data-[state=checked]:hidden group-data-[disabled]:hidden">
          {uncheckedIcon}
        </div>
        {/* disabled */}
        <div className="w-full h-full hidden group-data-[disabled]:block">
          {disabledIcon}
        </div>
        {/* checked: Radix Indicator는 checked 상태일 때만 렌더링 */}
        <CheckboxPrimitive.Indicator className="absolute inset-0 w-full h-full">
          {checkedIcon}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={id}
          className={twMerge(
            'text-black text-sm',
            disabled ? 'cursor-default text-gray-500' : 'cursor-pointer',
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
});

export default Checkbox;
