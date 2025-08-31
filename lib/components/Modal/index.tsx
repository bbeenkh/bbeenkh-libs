/**
 * @file: Modal.tsx
 * @author: liam / liam@imnotpizzalib.com
 * @since: 2024.02.21 ~
 * @description: 모달창+모달 레이아웃 UI
 */

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { XmarkSolid } from '../Icons';

interface ILayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 모달창 컨테이너
 * @param absolute: true설정시 기존모달 전체화면 덮는 모달창으로 변경
 */
const Modal = ({
  className,
  absolute,
  children,
}: ILayoutProps & { absolute?: boolean }) => (
  <section
    className={twMerge(
      'ods-w-full ods-h-full ods-bg-white ods-flex ods-flex-col ods-text-base ods-leading-relaxed ods-relative ods-p-6',
      className,
      absolute && 'ods-absolute ods-bottom-0 ods-left-0 ods-z-10',
    )}
  >
    {children}
  </section>
);

/**
 * 모달창 헤더 영역
 */
Modal.Header = ({ className, children }: ILayoutProps) => (
  <header
    className={twMerge(
      'ods-w-full ods-flex ods-justify-between ods-items-center ods-text-black ods-mb-8 ods-top-0 ods-left-0',
      className,
    )}
  >
    {children}
  </header>
);

/**
 * 모달창 닫기버튼
 */
Modal.CloseButton = ({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props}>
      <XmarkSolid fill="black" />
    </button>
  );
};

/**
 * 모달창 제목 영역
 */
Modal.Title = ({ className, children }: ILayoutProps) => (
  <div
    className={twMerge(
      'ods-text-xl ods-leading-6 ods-font-bold ods-m-0 ods-flex ods-items-center ods-justify-start ods-gap-4',
      className,
    )}
  >
    {children}
  </div>
);

/**
 * 모달창 바디 영역
 */
Modal.Body = ({ className, children }: ILayoutProps) => (
  <div
    className={twMerge(
      'ods-h-full ods-flex ods-flex-col ods-justify-start ods-items-start ods-overflow-y-auto ods-flex-grow',
      className,
    )}
  >
    {children}
  </div>
);

/**
 * 모달창 푸터 영역
 */
Modal.Footer = ({ className, children }: ILayoutProps) => (
  <>
    <div
      className={twMerge(
        'ods-w-full ods-flex ods-justify-start ods-items-start ods-pt-6',
        className,
      )}
    >
      {children}
    </div>
  </>
);

export default Modal;
