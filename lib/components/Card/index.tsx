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
 * dialog Layout UI
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
