/**
 * @file Checkbox/index.tsx
 * @author liam / liam@imnotpizzalib.com
 * @description 체크박스 컴포넌트
 */

import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
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

export interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  className?: string;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  disabledIcon?: React.ReactNode;
}

function Checkbox(
  {
    className,
    label,
    id,
    checkedIcon = <CheckedIcon />,
    uncheckedIcon = <UncheckedIcon />,
    disabledIcon = <DisabledIcon />,
    onChange,
    ...props
  }: ICheckboxProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const isControlled = props.checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(props.defaultChecked ?? false);
  const isChecked = isControlled ? !!props.checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e);
  };

  const icon = props.disabled ? disabledIcon : isChecked ? checkedIcon : uncheckedIcon;

  return (
    <div
      className={twMerge(
        'inline-flex items-center gap-xs',
        props.disabled ? 'cursor-default' : 'cursor-pointer',
        className,
      )}
    >
      <div className="relative w-5 h-5 shrink-0">
        <input
          type="checkbox"
          {...props}
          onChange={handleChange}
          id={id}
          ref={ref}
          className={twMerge(
            'absolute inset-0 w-full h-full opacity-0 z-10',
            props.disabled ? 'cursor-default' : 'cursor-pointer',
          )}
        />
        <div className="pointer-events-none">{icon}</div>
      </div>
      {label && (
        <label
          className={twMerge('text-black text-sm', props.disabled && 'text-gray-500')}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
}

export default forwardRef(Checkbox);
