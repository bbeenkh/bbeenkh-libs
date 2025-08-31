import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Skeleton Slide UI 컴포넌트
 */
const SkeletonSlideUI = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        'ods-relative ods-overflow-hidden ods-bg-gray-300',
        className,
      )}
    >
      <div className="ods-absolute ods-inset-0 ods-bg-gradient-to-r ods-from-gray-300 ods-via-gray-400 ods-to-gray-300 ods-animate-shimmer ods-w-full ods-h-full ods-rounded-inherit" />
    </div>
  );
};

/**
 * skeleton Box 컴포넌트
 * - Card, Inut 등등의 UI에 적합
 */
const Box = ({ className }: { className?: string }) => {
  return (
    <SkeletonSlideUI className={twMerge('ods-w-full ods-h-4', className)} />
  );
};

/**
 * skeleton Circle 컴포넌트
 * - 프로필 등 원형 UI에 적합
 */
const Circle = ({ size, className }: { size: string; className?: string }) => {
  return (
    <SkeletonSlideUI
      className={twMerge(
        `ods-w-${size} ods-h-${size} !ods-rounded-full`,
        className,
      )}
    />
  );
};

/**
 * skeleton Container 컴포넌트
 */
const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div
      className={twMerge(
        'ods-relative ods-overflow-hidden ods-bg-gray-200 ods-flex ods-flex-col ods-gap-4 ods-w-full ods-h-auto ods-p-6 ods-rounded-md',
        className,
      )}
    >
      {children}
    </div>
  );
};

/**
 * Skeleton Loading UI 컴포넌트
 */
const Skeleton = {
  Box,
  Circle,
  Container,
};

export default Skeleton;
