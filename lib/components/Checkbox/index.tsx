/**
 * @file Checkbox/index.tsx
 * @author liam / liam@imnotpizzalib.com
 * @description 체크박스 컴포넌트
 */

import React, { InputHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';
import '@/index.css';
import { twMerge } from 'tailwind-merge';

export interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  className?: string;
}

function Checkbox(
  { className, label, id, onChange, ...props }: ICheckboxProps,
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
      <CheckboxInput
        type="checkbox"
        {...props}
        onChange={onChange}
        id={id}
        ref={ref}
        className={props.disabled ? 'ods-cursor-default' : 'ods-cursor-pointer'}
      />
      <div
        className={twMerge(
          'ods-absolute ods-bottom-0 ods-left-0 ods-z-5',
          'checkbox-icon',
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

export default forwardRef(Checkbox);

const CheckboxInput = styled.input`
  width: 1.25em;
  height: 1.25em;
  z-index: 10;
  opacity: 0 !important;

  &[type='checkbox'] {
    width: 1.25em;
    height: 1.25em;
    z-index: 5;
    opacity: 0 !important;
  }

  &[type='checkbox'] + .checkbox-icon {
    width: 1.25em;
    height: 1.25em;
    background: var(--ods-checkbox-unselected) no-repeat;
    background-size: contain;
  }

  &[type='checkbox']:checked + .checkbox-icon {
    width: 1.25em;
    height: 1.25em;
    background: var(--ods-checkbox-selected) no-repeat;
    background-size: contain;
  }

  &[type='checkbox']:disabled + .checkbox-icon {
    width: 1.25em;
    height: 1.25em;
    background: var(--ods-checkbox-disabled) no-repeat;
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
