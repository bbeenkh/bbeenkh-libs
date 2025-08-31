import React from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
}

/**
 * 좌측 drawer 컴포넌트 (Tailwind + ods- prefix 적용)
 */
export default function Drawer({ children, className, isOpen = true }: IProps) {
  return (
    <aside
      className={twMerge(
        'ods-fixed ods-top-0 ods-left-0 ods-h-full ods-z-[49] ods-bg-white ods-p-xl',
        'ods-transition-transform ods-duration-200 ods-ease-in-out',
        'ods-w-[var(--drawer-width)]',
        isOpen ? 'ods-translate-x-0' : 'ods--translate-x-full',
        className,
      )}
    >
      <div className="ods-mt-[var(--drawer-margin-top)] ods-w-full ods-h-full ods-flex ods-flex-col ods-justify-start ods-items-start ods-overflow-y-auto ods-gap-xl ods-scrollbar-hide">
        {children}
      </div>
    </aside>
  );
}
