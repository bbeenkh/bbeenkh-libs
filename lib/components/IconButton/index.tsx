import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 추가적인 CSS 클래스명
   */
  className?: string;
  /**
   * 아이콘 컴포넌트 (예: Icon 컴포넌트 등)
   */
  icon: React.ReactNode;
}

/**
 * # IconButton UI
 * ---
 * - 간단설명: 아이콘을 감싸는 버튼 컴포넌트
 * - hover/active 시 opacity 전환 기본 제공
 * ---
 * @param icon 버튼 내부에 렌더링할 아이콘 ReactNode
 * @param className 추가적인 Tailwind 클래스명
 * @example
 * <IconButton icon={<CloseIcon />} onClick={handleClose} />
 */
function IconButton({ className = '', icon, ...props }: Props) {
  return (
    <button
      className={twMerge(
        'flex items-center justify-center transition-opacity hover:opacity-70 active:opacity-50',
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
}

export default IconButton;
