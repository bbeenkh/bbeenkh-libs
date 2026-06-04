import { Meta } from '@storybook/react';
import IconButton from '.';
import { XmarkSolid } from '../Icons';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
};

/**
 * Icon Buttons
 * - 내부에 아이콘, 이미지 등 요소 탑재 가능한 투명 버튼
 */
export const Default = () => {
  return (
    <div className="flex gap-6">
      <IconButton icon={<XmarkSolid className="w-5 h-5" />} />
      <IconButton icon={<XmarkSolid className="w-7 h-7" />} />
      <IconButton icon={<XmarkSolid className="w-8 h-8" />} />
    </div>
  );
};

export default meta;
