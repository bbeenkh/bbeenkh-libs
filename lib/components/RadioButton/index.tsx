/**
 * @file RadioButton/index.tsx
 * @author liam / liam@imnotpizzalib.com
 * @description 라디오버튼 컴포넌트
 */

import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
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

export interface IRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  disabledIcon?: React.ReactNode;
}

function RadioButton(
  {
    className,
    label,
    id,
    checkedIcon = <CheckedIcon />,
    uncheckedIcon = <UncheckedIcon />,
    disabledIcon = <DisabledIcon />,
    onChange,
    ...props
  }: IRadioButtonProps,
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
          type="radio"
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

export default forwardRef(RadioButton);
