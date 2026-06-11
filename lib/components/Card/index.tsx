/**
 * @file: Card.tsx
 * @author: liam / liam@imnotpizzalib.com
 * @since: 2024.02.21 ~
 * @description: Card ui
 */

import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ILayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * # Card UI
 * ---
 * - 흰 배경 + 테두리 + 둥근 모서리로 구성된 카드 레이아웃 컴포넌트 (Compound Component 패턴)
 * - `Card.Header`: 헤더 영역 (`justify-between` 가로 배치)
 * - `Card.Title`: 카드 제목 텍스트
 * - `Card.Body`: 본문 콘텐츠 영역
 * - `Card.Footer`: 하단 고정 푸터 (absolute 배치)
 * ---
 * @param className - 추가 Tailwind 클래스
 * @param children - 카드 내부 콘텐츠
 * @example
 * <Card className="max-w-sm">
 *   <Card.Header>
 *     <Card.Title>제목</Card.Title>
 *   </Card.Header>
 *   <Card.Body>본문 내용</Card.Body>
 *   <Card.Footer>푸터</Card.Footer>
 * </Card>
 */
const Card = ({ className, children }: ILayoutProps) => (
  <section
    className={twMerge(
      'w-full h-full p-6 bg-white border-[#E2E2E2] border flex flex-col relative rounded-lg gap-6',
      className,
    )}
  >
    {children}
  </section>
);

/** Card 헤더 */
Card.Header = ({ className, children }: ILayoutProps) => (
  <header
    className={twMerge(
      'w-full flex justify-between items-center',
      className,
    )}
  >
    {children}
  </header>
);

/** Card 제목 */
Card.Title = ({ className, children }: ILayoutProps) => (
  <p
    className={twMerge(
      'text-xl font-bold !m-0 flex items-center justify-start text-gray-900',
      className,
    )}
  >
    {children}
  </p>
);

/**
 * Card body
 */
Card.Body = ({ className, children }: ILayoutProps) => (
  <div
    className={twMerge('flex items-start justify-start', className)}
  >
    {children}
  </div>
);

/** Card Footer */
Card.Footer = ({ className, children }: ILayoutProps) => (
  <div
    className={twMerge(
      'absolute w-full flex left-0 bottom-0',
      className,
    )}
  >
    {children}
  </div>
);

export default Card;
