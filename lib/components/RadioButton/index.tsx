/**
 * @file RadioButton/index.tsx
 * @author liam / liam@imnotpizzalib.com
 * @description 라디오버튼 컴포넌트
 */

import React, { InputHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import '@/index.css';

export interface IRadioButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

function RadioButton(
  { className, label, id, ...props }: IRadioButtonProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <Container
      className={twMerge(
        'ods-relative ods-h-6 ods-flex ods-gap-xs',
        props.disabled ? 'ods-cursor-default' : 'ods-cursor-pointer',
        className,
      )}
    >
      <Radio type="radio" {...props} ref={ref} />
      <div
        className={twMerge(
          'ods-absolute ods-bottom-0 ods-left-0 ods-z-5',
          'radio-icon',
        )}
      />
      <label
        className={twMerge(
          'ods-text-black ods-text-sm',
          props.disabled && 'ods-text-gray-500',
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </Container>
  );
}

export default forwardRef(RadioButton);

const Radio = styled.input`
  width: 1.25em;
  height: 1.25em;
  z-index: 10;
  cursor: pointer;
  opacity: 0 !important;

  &[type='radio'] {
    width: 1.25em;
    height: 1.25em;
    cursor: pointer;
    z-index: 5;
    opacity: 0 !important;
  }

  &[type='radio'] + .radio-icon {
    width: 1.25em;
    height: 1.25em;
    background: var(--ods-radio-unselected) no-repeat;
    background-size: contain;
  }

  &[type='radio']:checked + .radio-icon {
    width: 1.25em;
    height: 1.25em;
    background: var(--ods-radio-selected) no-repeat;
    background-size: contain;
  }

  &[type='radio']:disabled + .radio-icon {
    width: 1.25em;
    height: 1.25em;
    background: var(--ods-radio-disabled) no-repeat;
    background-size: contain;
    cursor: default;
  }
`;

const Container = styled.div`
  width: auto;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
`;
