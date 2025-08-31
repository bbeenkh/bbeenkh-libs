import classNames from 'classnames';
import React, { useMemo } from 'react';
import '@/index.css';
import { CheckSolid } from '@/components/Icons';
import { twJoin } from 'tailwind-merge';

export interface IChipProps {
  children: React.ReactNode;
  icon?: 'check';
  className?: string;
  selected?: boolean;
  variant?: 'filled' | 'outlined';
  onClick?: () => void;
}

export default function Chip({
  children,
  icon,
  className,
  selected,
  onClick,
  variant = 'outlined',
}: IChipProps) {
  const LeftIcon = useMemo(() => {
    switch (icon) {
      case 'check':
        return CheckSolid;
      default:
        return null;
    }
  }, [icon]);

  const colorClassName = useMemo(() => {
    if (variant === 'filled') {
      return selected
        ? 'ods-bg-primary ods-text-white'
        : 'ods-bg-white ods-text-primary ods-border-borderSecondary ods-border ods-border-solid';
    } else {
      return selected
        ? 'ods-bg-transparent ods-text-primary ods-border-primary ods-border ods-border-solid'
        : 'ods-bg-transparent ods-text-gray-500 ods-border-borderSecondary ods-border ods-border-solid';
    }
  }, [variant, selected]);

  const leftIconClassName = useMemo(() => {
    if (variant === 'filled') {
      return selected ? 'ods-fill-white' : 'ods-fill-primary';
    } else {
      return selected ? 'ods-fill-primary' : 'ods-fill-borderSecondary';
    }
  }, [variant, selected]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        'ods-inline-flex ods-justify-center ods-items-center ods-h-8 ods-min-w-10 ods-gap-1 ods-rounded-full ods-cursor-pointer',
        className,
        colorClassName,
        LeftIcon ? 'ods-px-xs' : 'ods-px-sm',
      )}
    >
      {LeftIcon && (
        <LeftIcon className={twJoin('ods-w-4 ods-h-4', leftIconClassName)} />
      )}
      <p className="ods-text-xs">{children}</p>
    </button>
  );
}
