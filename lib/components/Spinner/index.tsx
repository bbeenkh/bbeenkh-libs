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
        return 'w-4 h-4';
      case 'sm':
        return 'w-5 h-5';
      case 'lg':
        return 'w-6 h-6';
      case 'xl':
        return 'w-8 h-8';
      default:
        return 'w-6 h-6';
    }
  }, [size]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <SpinnerIcon
        className={twJoin(
          'text-gray-200 animate-spin fill-black',
          sizeClassName,
          className,
        )}
      />
    </div>
  );
}
