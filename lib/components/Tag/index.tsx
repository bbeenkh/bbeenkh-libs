import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'danger';
  forceTagStyle?: string;
  children: string;
}

/**
 * 간단한 상태 표시에 주로 사용되는 컴포넌트입니다.
 * default, info(blue), success(green), warning(orange), danger(red) 스타일을 제공합니다.
 * @property {string} variant - 뱃지 스타일: default, info, success, warning, danger
 * @property {string} forceTagStyle - 커스텀 Tag 스타일 지정 (반드시 필요한 경우 아니면 사용하지 말 것, 디자인 팀과 상의하에 적용)
 * @property {string} children - 뱃지 내용
 */
export default function Tag({
  variant = 'default',
  forceTagStyle,
  children,
}: IProps) {
  const styleByVariant = useMemo(() => {
    switch (variant) {
      case 'default':
        return 'ods-text-gray-700 ods-bg-off-white';
      case 'info':
        return 'ods-text-state-info ods-bg-[#EDF4FF]';
      case 'success':
        return 'ods-text-state-success ods-bg-[#EEFFF2]';
      case 'warning':
        return 'ods-text-state-warning ods-bg-[#FFF7EE]';
      case 'danger':
        return 'ods-text-state-danger ods-bg-[#FFEEF1]';
    }
  }, [variant]);

  return (
    <div
      className={twMerge(
        'ods-flex-nowrap ods-justify-center ods-px-xs ods-font-bold ods-leading-6 ods-text-center ods-whitespace-nowrap ods-rounded-full ods-h-6 ods-inline-flex',
        styleByVariant,
        forceTagStyle,
      )}
    >
      <span className="ods-text-xs">{children}</span>
    </div>
  );
}
