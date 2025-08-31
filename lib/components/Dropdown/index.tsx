/**
 * @file Dropdown/index.tsx
 * @author liam / liam@imnotpizzalib.com
 * @description Dropdown 컴포넌트
 */
import React, { useState } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import Checkbox from '../Checkbox';
import Tag from '../Tag';
import { AngleDownSolid } from '@/components/Icons';

/**
 * 드롭다운 옵션 타입
 * @param {T} value - 선택 값
 * @param {string} label - 선택 라벨
 */
export interface IDropdownOption<T> {
  value: T;
  label: string;
}

/**
 * 드롭다운
 * T: 선택할 옵션의 value의 타입
 */
interface IProps<T> {
  options: IDropdownOption<T>[];
  label: string;
  className?: string;
  disabled?: boolean;
}

interface IDropdownProps<T> extends IProps<T> {
  value: T;
  onChange: (value: T) => void;
}

interface IMultipleSelectDropdownProps<T> extends IProps<T> {
  value: T[];
  onChange: (value: T[]) => void;
}

/**
 * 드롭다운 UI (단일선택)
 * @param options - 선택 옵션 배열
 * @param label - 라벨
 * @param value - 현재 선택된 값
 * @param onChange - 선택 변경 시 호출되는 onChange
 * @param className - 커스텀 클래스
 * @param disabled - 비활성화 여부
 *
 * TODO: 키보드 조작 기능 추가
 */
export function Dropdown<T>({
  options,
  label,
  value,
  onChange,
  className,
  disabled = false,
}: IDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const selectedOption = options.find((option) => option.value === value) || {
    label: '',
    value: null,
  };

  /** 키보드 조작 이벤트 */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || !isOpen) {
      setIsOpen(!isOpen);
    }

    if (!isOpen) return;

    switch (event.key) {
      case 'ArrowDown': {
        setHighlightedIndex((prevIndex) =>
          prevIndex === null || prevIndex === options.length - 1
            ? 0
            : prevIndex + 1,
        );
        break;
      }
      case 'ArrowUp': {
        setHighlightedIndex((prevIndex) =>
          prevIndex === null || prevIndex === 0
            ? options.length - 1
            : prevIndex - 1,
        );
        break;
      }
      case 'Enter': {
        if (highlightedIndex !== null) {
          onChange(options[highlightedIndex].value);
          setHighlightedIndex(null);
        }
        break;
      }
      case 'Escape': {
        setIsOpen(false);
        setHighlightedIndex(null);
        break;
      }
      default:
        break;
    }
  };

  return (
    <Container
      isOpen={isOpen}
      className={className}
      onMouseDown={() => !disabled && setIsOpen(!isOpen)}
      onBlur={() => setIsOpen(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      disabled={disabled}
    >
      <div className="ods-w-full ods-flex ods-justify-between ods-items-center ods-gap-sm">
        <div className="ods-flex ods-justify-start ods-items-center ods-gap-sm">
          <span className="ods-text-tertiary ods-text-sm ods-font-bold">
            {label}
          </span>
          <span className="ods-text-sm ods-font-bold">
            {selectedOption.label}
          </span>
        </div>
        <AngleDownSolid
          className={twJoin(
            'ods-w-4 ods-h-4',
            'ods-fill-gray-500',
            isOpen ? 'ods-transform ods-rotate-180' : '',
          )}
        />
      </div>
      {/* selectbox 리스트 데이터 */}
      {isOpen && (
        <div className="ods-w-full ods-h-auto ods-bg-white ods-rounded-lg ods-shadow ods-flex-col ods-justify-start ods-items-start ods-inline-flex ods-absolute ods-z-10 ods-left-0 ods-top-14">
          {options.map((option, index) => (
            <div
              onMouseDown={() => {
                onChange(option.value);
              }}
              role="button"
              tabIndex={0}
              className={twJoin(
                'ods-w-full ods-px-sm ods-py-xs ods-flex ods-justify-start ods-items-center ods-text-black ods-cursor-pointer hover:ods-bg-card',
                highlightedIndex === index ? 'ods-bg-card' : '',
                index === 0 ? 'ods-rounded-t-lg' : '',
                index === options.length - 1 ? 'ods-rounded-b-lg' : '',
              )}
              key={option.label}
            >
              <span className="ods-m-0 ods-text-ellipsis ods-overflow-hidden ods-text-sm ods-font-bold">
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

/**
 * 드롭다운 UI (다중선택)
 * @param options - 선택 옵션 배열
 * @param label - 라벨
 * @param value - 현재 선택된 값
 * @param onChange - 선택 변경 시 호출되는 onChange
 * @param className - 커스텀 클래스
 */
export function MultipleSelectDropdown<T>({
  options,
  label,
  value,
  onChange,
  className,
  disabled = false,
}: IMultipleSelectDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const selectedOptions = options.filter((option) =>
    value.includes(option.value),
  );

  /** 키보드 조작 이벤트 */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || !isOpen) {
      setIsOpen(!isOpen);
    }

    if (!isOpen) return;

    switch (event.key) {
      case 'ArrowDown': {
        setHighlightedIndex((prevIndex) =>
          prevIndex === null || prevIndex === options.length - 1
            ? 0
            : prevIndex + 1,
        );
        break;
      }
      case 'ArrowUp': {
        setHighlightedIndex((prevIndex) =>
          prevIndex === null || prevIndex === 0
            ? options.length - 1
            : prevIndex - 1,
        );
        break;
      }
      case 'Enter': {
        if (highlightedIndex !== null) {
          if (value.includes(options[highlightedIndex].value)) {
            onChange(
              value.filter((v) => v !== options[highlightedIndex].value),
            );
          } else {
            onChange([...value, options[highlightedIndex].value]);
          }
          setHighlightedIndex(null);
        }
        break;
      }
      case 'Escape': {
        setIsOpen(false);
        setHighlightedIndex(null);
        break;
      }
      default:
        break;
    }
  };

  return (
    <Container
      isOpen={isOpen}
      className={className}
      onMouseDown={() => !disabled && setIsOpen(!isOpen)}
      onKeyDown={handleKeyDown}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      disabled={disabled}
    >
      <div className="ods-w-full ods-flex ods-justify-between ods-items-center ods-gap-sm ods-font-bold">
        <div className="ods-flex ods-justify-start ods-items-center ods-gap-sm">
          <span className="ods-text-tertiary ods-ext-sm">{label}</span>
          <div className="ods-flex ods-justify-start ods-items-center ods-gap-xxs">
            {selectedOptions.slice(0, 2).map((selected) => (
              <Tag variant="default" key={selected.label}>
                {selected.label}
              </Tag>
            ))}
            {selectedOptions.length > 2 && (
              <span className="ods-text-tertiary ods-text-xs">
                외 {selectedOptions.length - 2}개
              </span>
            )}
          </div>
        </div>
        <AngleDownSolid
          className={twJoin(
            'ods-w-4 ods-h-4',
            'ods-fill-gray-500',
            isOpen ? 'ods-transform ods-rotate-180' : '',
          )}
        />
      </div>
      {/* selectbox 리스트 데이터 */}
      {isOpen && (
        <OptionListContainer>
          {options.map((option, index) => (
            <div
              onMouseDown={() => {
                // 이미 값 있으면 제거, 없으면 추가
                if (value.includes(option.value)) {
                  onChange(value.filter((v) => v !== option.value));
                } else {
                  onChange([...value, option.value]);
                }
              }}
              role="button"
              tabIndex={0}
              className={twJoin(
                'ods-w-full ods-px-sm ods-py-xs ods-flex ods-justify-start ods-items-center ods-text-black cods-ursor-pointer hover:ods-bg-card',
                highlightedIndex === index ? 'ods-bg-card' : '',
                index === 0 ? 'ods-rounded-t-lg' : '',
                index === options.length - 1 ? 'ods-rounded-b-lg' : '',
              )}
              key={option.label}
            >
              <div className="ods-flex ods-gap-xs ods-items-center ods-truncate">
                <Checkbox
                  id={option.label}
                  checked={value.includes(option.value)}
                  readOnly
                />
                <span className="ods-m-0 ods-text-ellipsis ods-overflow-hidden ods-text-sm ods-font-bold">
                  {option.label}
                </span>
              </div>
            </div>
          ))}
        </OptionListContainer>
      )}
    </Container>
    // </div>
  );
}
/** 버튼 컨테이너 */
const Container = ({
  children,
  isOpen,
  className,
  disabled,
  ...props
}: {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    className={twMerge(
      'ods-inline-flex ods-h-12 ods-px-sm ods-border ods-rounded-lg ods-bg-white ods-border-borderPrimary ods-transition-colors ods-relative ods-text-black ods-cursor-pointer ods-items-center',
      isOpen && 'ods-border-borderActive',
      disabled && 'ods-opacity-50 !ods-cursor-default',
      className,
    )}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

/** 옵션 리스트 컨테이너 */
const OptionListContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="ods-w-full ods-h-auto ods-bg-white ods-rounded-lg ods-shadow ods-flex-col ods-justify-start ods-items-start ods-inline-flex ods-absolute ods-z-10 ods-left-0 ods-top-14">
    {children}
  </div>
);
