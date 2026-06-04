import { Meta } from '@storybook/react';
import Skeleton from '.';

/**
 * 컨텐츠의 로딩 상태를 나타내는 Skeleton 컴포넌트
 * 각 스켈레톤 엘리먼트는 styleClass를 사용하여 디자인 커스터마이징 가능
 */
export const DefaultSkeleton = () => (
  <Skeleton.Container styleClass={{ root: 'rounded-xl w-[300px] h-auto flex flex-col gap-4 p-4 bg-gray-100' }}>
    <Skeleton.Circle styleClass={{ root: 'w-12 h-12 rounded-full bg-gray-300 animate-pulse' }} />
    <Skeleton.Box styleClass={{ root: 'rounded-xl w-1/3 h-8 bg-gray-300 animate-pulse' }} />
    <Skeleton.Box styleClass={{ root: 'rounded-xl w-2/3 h-8 bg-gray-300 animate-pulse' }} />
    <Skeleton.Box styleClass={{ root: 'rounded-xl w-full h-8 bg-gray-300 animate-pulse' }} />
    <div className="w-full flex gap-2">
      <Skeleton.Box styleClass={{ root: 'rounded-xl h-8 flex-1 bg-gray-300 animate-pulse' }} />
      <Skeleton.Box styleClass={{ root: 'rounded-xl h-8 flex-1 bg-gray-300 animate-pulse' }} />
    </div>
    <Skeleton.Box styleClass={{ root: 'rounded-xl w-full h-[200px] bg-gray-300 animate-pulse' }} />
  </Skeleton.Container>
);

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: DefaultSkeleton,
  argTypes: {},
};
export default meta;
