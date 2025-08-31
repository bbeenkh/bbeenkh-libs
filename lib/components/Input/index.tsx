/**
 * @file: Input/index.tsx
 * @author: chad / chad@imnotpizzalib.com
 * @since: 2024.02.07 ~
 * @description: input 컴포넌트
 */

import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
  HTMLInputTypeAttribute,
} from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

import {
  CircleCheckSolid,
  CircleExclamationSolid,
  CalendarDaysSolid,
  CirclePlusSolid,
  EyeOnSolid,
  EyeOffSolid,
} from '../Icons';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isRequire?: boolean;
  label?: string;
  labelWidth?: string | number;
  labelClassName?: string;
  register?: any;
  prefixNode?: string | ReactNode;
  suffixNode?: string | ReactNode;
  inputNode?: string | ReactNode;
  error?: boolean;
  success?: boolean;
  helperText?: string;
  // clearable?: boolean;
  clearable?: (e?: any) => void;
  useShowPassword?: boolean;
  useCalendar?: boolean;
  // onClickClearBtn?: (e?: any) => void;
  onClickCalendarBtn?: (e?: any) => void;
}

/**
 * Input Component
 * @param {RefType} ref
 * @param {string} className css class
 * @param {boolean} isRequire 필수 상태 표시 여부
 * @param {string} label 라벨 내용
 * @param {string | number} labelWidth 라벨 넓이 (ex 100)
 * @param {string} labelClassName 라벨 css class
 * @param {any} register react-hook-form register
 * @param {string | ReactNode} prefixNode 인풋 앞에 올 내용 (접두tk)
 * @param {string | ReactNode} suffixNode 인풋 뒤에 올 내용 (접미사)
 * @param {string | ReactNode} inputNode 접미사 앞에 올 내용
 * @param {boolean} error 입력 에러 상태 여부
 * @param {boolean} success 입력 성공 상태 여부
 * @param {string} placeholder 인풋 예시
 * @param {string} helperText 인풋 하단에 나타낼 도움 텍스트
 * @param {boolean} clearable 인풋 clear 버튼 사용 () => void
 * @param {boolean} useShowPassword 패스워드 노출 여부
 * @param {boolean} useCalendar 인풋을 calendar로 사용 여부
 * @param {function} onClickCalendarBtn 달력 아이콘 클릭 => void;
 */
const Input = (
  { type = 'text', className, ...props }: IInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const [activeInput, setActiveInput] = useState<boolean>(false);
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type);

  const onFocus = () => setActiveInput(true);
  const onBlur = () => setActiveInput(false);

  /** 비밀번호 노출 아이콘 클릭 */
  const onClickShowPassword = () => {
    if (inputType === 'password') setInputType('text');
    if (inputType === 'text') setInputType('password');
  };

  return (
    <div
      className={classNames('ods-flex ods-gap-sm ods-items-start', className)}
    >
      {/* label */}
      {props.label && (
        <LabelContainer
          className={classNames(
            props.labelClassName,
            'ods-flex ods-items-center',
          )}
          width={props.labelWidth}
        >
          <label
            htmlFor={props.label}
            className={classNames(
              'ods-text-title4 ods-flex ods-break-keep',
              props.disabled ? 'ods-text-tertiary' : 'ods-text-black',
            )}
          >
            <span style={{ maxWidth: `${props.labelWidth}` }}>
              {props.label}
            </span>
            {props.isRequire && (
              <div
                className={classNames(
                  'ods-w-[0.28em] ods-h-[0.28em] ods-rounded-full ods-shrink-0 ods-ml-[0.125em]',
                  props.disabled ? 'ods-bg-tertiary' : 'ods-bg-state-danger',
                )}
              />
            )}
          </label>
        </LabelContainer>
      )}
      {/* Input */}
      <div className={classNames('ods-w-full ods-flex-col')}>
        <div
          className={classNames(
            'ods-flex ods-w-full ods-h-12 ods-relative ods-px-sm ods-border ods-rounded-lg ods-bg-white focus:ods-border-borderActive ods-transition-colors ods-flex-nowrap',
            activeInput
              ? 'ods-border-borderActive'
              : 'ods-border-borderPrimary',
            props.error && 'ods-border-state-danger',
            props.success && 'ods-border-state-success',
          )}
        >
          {/* prefix */}
          {props.useCalendar && (
            <NodeContainer position="left" disabled={props.disabled}>
              <CalendarDaysSolid
                className={classNames(
                  props.disabled ? 'ods-fill-gray-200' : 'ods-fill-tertiary',
                )}
              />
            </NodeContainer>
          )}
          {props.prefixNode && !props.useCalendar && (
            <NodeContainer position="left" disabled={props.disabled}>
              {props.prefixNode}
            </NodeContainer>
          )}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div className="ods-w-full ods-relative" onBlur={onBlur}>
            <BaseInput
              ref={ref}
              id={props.label}
              className={classNames(
                'ods-w-full ods-h-full ods-bg-white ods-text-black ods-text-title3 focus:ods-outline-none placeholder:ods-font-regular placeholder:ods-text-tertiary disabled:ods-text-tertiary disabled:ods-pointer-events-none',
              )}
              onFocus={onFocus}
              onBlur={onBlur}
              type={inputType}
              placeholder={props.useCalendar ? 'YYYY-MM-DD' : props.placeholder}
              readOnly={props.useCalendar || props.readOnly}
              onClick={props.onClickCalendarBtn}
              {...props}
            />
          </div>

          {(props.clearable ||
            props.error ||
            props.success ||
            props.useShowPassword ||
            props.inputNode) && (
            <InputHelperContainer disabled={props.disabled}>
              {/* clear button */}
              {props.clearable &&
                (props.value || props.defaultValue) &&
                !props.useShowPassword &&
                !props.error &&
                !props.success && (
                  <CirclePlusSolid
                    className={classNames(
                      'ods-rotate-45 ods-w-[1.4em] ods-h-[1.4em]',
                      `${props.disabled ? 'ods-fill-gray-200 ods-pointer-events-none' : 'ods-fill-gray-500 ods-cursor-pointer'}`,
                    )}
                    onClick={props.clearable}
                  />
                )}

              {/* show password */}
              {props.useShowPassword && !props.error && !props.success && (
                <div
                  className={classNames(
                    props.disabled
                      ? 'ods-pointer-events-none'
                      : 'ods-cursor-pointer',
                  )}
                  onClick={onClickShowPassword}
                  role="presentation"
                >
                  {inputType === 'password' ? (
                    <EyeOnSolid
                      className={classNames(
                        'ods-w-[1.4em] ods-h-[1.4em]',
                        `${props.disabled ? 'ods-fill-gray-200' : 'ods-fill-gray-500'}`,
                      )}
                    />
                  ) : (
                    <EyeOffSolid
                      className={classNames(
                        'ods-w-[1.4em] ods-h-[1.4em]',
                        `${props.disabled ? 'ods-fill-gray-200' : 'ods-fill-gray-500'}`,
                      )}
                    />
                  )}
                </div>
              )}

              {/* success / error Icon */}
              {props.error && !props.success && (
                <CircleExclamationSolid
                  className={classNames(
                    'ods-fill-state-danger ods-w-[1.4em] ods-h-[1.4em]',
                  )}
                />
              )}
              {props.success && !props.error && (
                <CircleCheckSolid
                  className={classNames(
                    'ods-fill-state-success ods-w-[1.4em] ods-h-[1.4em]',
                  )}
                />
              )}

              {/* inputNode */}
              {props.inputNode && props.inputNode}
            </InputHelperContainer>
          )}

          {/* suffix */}
          {props.suffixNode && (
            <NodeContainer position="right" disabled={props.disabled}>
              {props.suffixNode}
            </NodeContainer>
          )}
        </div>

        {/* helper text */}
        {props.helperText && (
          <div className={classNames('ods-mt-xxs ods-h-[1.5em] ods-text-xs')}>
            <p
              className={classNames(
                'ods-text-caption',
                props.error && 'ods-text-state-danger',
                props.success && 'ods-text-state-success',
              )}
            >
              {props.helperText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface IInputHelper {
  children: string | ReactNode;
  disabled?: boolean;
}

const InputHelperContainer = ({ children, disabled }: IInputHelper) => {
  return (
    <div
      className={classNames(
        'ods-h-full ods-flex ods-justify-center ods-items-center ods-break-keep ods-whitespace-pre ods-pl-sm ods-text-title4',
        disabled ? 'ods-text-tertiary' : 'ods-text-black',
      )}
    >
      {children}
    </div>
  );
};

interface INodeContainer {
  position: 'left' | 'right';
  children: string | ReactNode;
  disabled?: boolean;
}

const NodeContainer = ({ position, children, disabled }: INodeContainer) => {
  return (
    <div
      className={classNames(
        'ods-h-full ods-flex ods-justify-center ods-items-center ods-break-keep ods-whitespace-pre',
        typeof children === 'string' ? 'ods-text-title3' : 'ods-text-title1',
        position === 'left' ? 'ods-pr-sm' : 'ods-pl-sm',
        disabled ? 'ods-text-tertiary' : 'ods-text-black',
      )}
    >
      {children}
    </div>
  );
};

const LabelContainer = styled.div<{
  width?: string | number;
}>`
  min-height: 3em;
  min-width: ${(props) => `${props.width}`};
  max-width: ${(props) => `${props.width}`};
`;

const BaseInput = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export default forwardRef(Input);
