import React from 'react';
import { cn } from '../../utils/cn';

interface StyleClass {
  root?: string;
  icon?: string;
  message?: string;
}

interface Props {
  message: string;
  icon?: React.ReactNode;
  styleClass?: StyleClass;
}

/**
 * # Fallback UI
 * ---
 * - 간단설명: 검색 결과 없음 등 폴백 상태를 표시하는 컴포넌트
 * - 아이콘과 메시지를 조합하여 빈 상태(empty state)를 표현한다
 * - 기본 스타일 없음 — 모든 스타일은 `styleClass`로 주입
 * ---
 * @param message 표시할 메시지 텍스트
 * @param icon 선택적 아이콘 ReactNode
 * @param styleClass 커스텀 스타일 클래스 객체
 * - `styleClass.root`: 루트 컨테이너 클래스
 * - `styleClass.icon`: 아이콘 래퍼 클래스
 * - `styleClass.message`: 메시지 텍스트 클래스
 * @example
 * <Fallback
 *   message="검색 결과가 없습니다"
 *   icon={<SearchIcon />}
 *   styleClass={{
 *     root: 'flex flex-col items-center gap-2 py-10',
 *     icon: 'text-gray-400',
 *     message: 'text-gray-500 text-sm',
 *   }}
 * />
 */
export default function Fallback({ message, icon, styleClass }: Props) {
  return (
    <div className={cn('flex flex-col items-center justify-center w-full flex-1', styleClass?.root)}>
      {icon && (
        <div data-slot="icon" className={styleClass?.icon}>
          {icon}
        </div>
      )}
      <span className={styleClass?.message}>{message}</span>
    </div>
  );
}
