import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { twMerge } from 'tailwind-merge';

const UncheckedIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.75 2C7.23 2 2.75 6.48 2.75 12C2.75 17.52 7.23 22 12.75 22C18.27 22 22.75 17.52 22.75 12C22.75 6.48 18.27 2 12.75 2ZM12.75 20C8.33 20 4.75 16.42 4.75 12C4.75 7.58 8.33 4 12.75 4C17.17 4 20.75 7.58 20.75 12C20.75 16.42 17.17 20 12.75 20Z"
      fill="#E2E2E2"
    />
  </svg>
);

const CheckedIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10.75" cy="10" r="10" fill="#232323" />
    <circle cx="10.75" cy="10" r="5" fill="white" />
  </svg>
);

const DisabledIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10.75" cy="10" r="10" fill="#E2E2E2" />
  </svg>
);

// ─── RadioButton.Group ──────────────────────────────────────────────

interface GroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  className?: string;
}

/**
 * # RadioButton.Group
 * ---
 * - Radix `RadioGroup.Root` 래퍼
 * - `value` / `onValueChange`로 선택 상태를 제어한다
 * - `defaultValue`로 비제어 모드도 지원
 */
const Group = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  GroupProps
>(function Group({ className, children, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={twMerge('flex flex-col gap-xs', className)}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Root>
  );
});

// ─── RadioButton.Item ───────────────────────────────────────────────

interface ItemProps {
  /** RadioGroup 내에서 이 항목을 식별하는 값 */
  value: string;
  id?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  disabledIcon?: React.ReactNode;
}

/**
 * # RadioButton.Item
 * ---
 * - Radix `RadioGroup.Item` 래퍼
 * - `RadioButton.Group` 안에서 사용해야 한다
 * - `data-state="checked"` / `data-disabled` attribute로 아이콘 전환
 */
const Item = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  ItemProps
>(function Item(
  {
    value,
    id,
    label,
    className,
    disabled,
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
      <RadioGroupPrimitive.Item
        ref={ref}
        id={id}
        value={value}
        disabled={disabled}
        className="relative w-5 h-5 shrink-0 focus-visible:outline-none group"
      >
        {/* unchecked */}
        <div className="w-full h-full group-data-[state=checked]:hidden group-data-[disabled]:hidden">
          {uncheckedIcon}
        </div>
        {/* disabled */}
        <div className="w-full h-full hidden group-data-[disabled]:block">
          {disabledIcon}
        </div>
        {/* checked: Radix Indicator는 선택 상태일 때만 렌더링 */}
        <RadioGroupPrimitive.Indicator className="absolute inset-0 w-full h-full">
          {checkedIcon}
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
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

// ─── RadioButton ────────────────────────────────────────────────────

/**
 * # RadioButton UI
 * ---
 * - Radix UI `@radix-ui/react-radio-group` 기반 복합 컴포넌트
 * - 접근성(키보드, 스크린리더) Radix가 처리
 * - `RadioButton.Group`: 라디오 그룹 루트 (`value` / `onValueChange`)
 * - `RadioButton.Item`: 개별 라디오 항목 (`value` prop으로 식별)
 * ---
 * @example
 * <RadioButton.Group value={selected} onValueChange={setSelected}>
 *   <RadioButton.Item value="a" id="rb-a" label="옵션 A" />
 *   <RadioButton.Item value="b" id="rb-b" label="옵션 B" />
 *   <RadioButton.Item value="c" id="rb-c" label="옵션 C" disabled />
 * </RadioButton.Group>
 */
const RadioButton = { Group, Item };

export default RadioButton;
