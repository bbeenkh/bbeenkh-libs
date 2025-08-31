import React from 'react';
import { twJoin } from 'tailwind-merge';
import Button from '../Button';

/**
 * 아이콘 버튼
 * - 내부에 아이콘, 이미지 등 요소 탑재 가능한 투명 버튼
 * - props 구조는 ODS Button과 사용방식 동일
 */
export default function IconButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
}) {
  return (
    <Button
      className={twJoin(
        'ods-bg-transparent ods-border-none ods-p-0 ods-m-0 ods-w-auto ods-h-auto active:ods-bg-transparent hover:ods-opacity-60 active:ods-opacity-80',
        className,
      )}
      size="sm"
      {...props}
    >
      {children}
    </Button>
  );
}
