import React, { useMemo } from 'react';
import { twJoin } from 'tailwind-merge';
import SpinnerIcon from '@/assets/svgs/spinner-icon.svg?react';

interface IProps {
  size?: 'xs' | 'sm' | 'lg' | 'xl';
  className?: string;
}

/**
 * 로딩 스피너 UI
 * @param {string} size 스피너 크기 (xl, lg, sm, xs)
 */
export default function Spinner({ size = 'lg', className }: IProps) {
  /** 사이즈에 따른 css */
  const sizeClassName = useMemo(() => {
    switch (size) {
      case 'xs':
        return 'ods-w-4 ods-h-4';
      case 'sm':
        return 'ods-w-5 ods-h-5';
      case 'lg':
        return 'ods-w-6 ods-h-6';
      case 'xl':
        return 'ods-w-8 ods-h-8';
      default:
        return 'ods-w-6 ods-h-6';
    }
  }, [size]);

  return (
    <div className="ods-w-full ods-h-full ods-flex ods-justify-center ods-items-center">
      <SpinnerIcon
        className={twJoin(
          'ods-text-gray-200 ods-animate-spin ods-fill-black',
          sizeClassName,
          className,
        )}
      />
    </div>
  );
}
