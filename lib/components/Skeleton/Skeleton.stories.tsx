import { Meta, StoryObj } from '@storybook/react';
import Skeleton from '.';
import { twMerge } from 'tailwind-merge';

/**
 * 컨텐츠의 로딩 상태를 나타내는 Skeleton 컴포넌트
 * 각 스켈레톤 엘리먼트는 tailwind 사용하여 디자인 커스터마이징 가능
 */
export const DefaultSkeleton = () => (
  <Skeleton.Container className="ods-rounded-xl ods-w-[300px] ods-h-auto">
    <Skeleton.Circle size="12" />
    <Skeleton.Box className="ods-rounded-xl ods-w-1/3 ods-h-8" />
    <Skeleton.Box className="ods-rounded-xl ods-w-2/3 ods-h-8" />
    <Skeleton.Box className="ods-rounded-xl ods-w-full ods-h-8" />
    <div className="ods-w-full ods-flex ods-gap-2">
      <Skeleton.Box className="ods-rounded-xl ods-h-8" />
      <Skeleton.Box className="ods-rounded-xl ods-h-8" />
    </div>
    <Skeleton.Box className="ods-rounded-xl ods-w-full ods-h-[200px]" />
  </Skeleton.Container>
);

const meta: Meta<typeof Skeleton> = {
  component: DefaultSkeleton,
  argTypes: {},
};
export default meta;
