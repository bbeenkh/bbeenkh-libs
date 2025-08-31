import { Meta } from '@storybook/react';
import IconButton from '.';
import { XmarkSolid } from '../Icons';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
};

/**
 * Icon Buttons
 * - 내부에 아이콘, 이미지 등 요소 탑재 가능한 투명 버튼
 * - props 구조는 ODS Button과 사용방식 동일
 */
export const Default = () => {
  return (
    <div className="ods-flex gap-6">
      <IconButton>
        <XmarkSolid className="ods-fill-black ods-w-md ods-h-md" />
      </IconButton>
      <IconButton>
        <XmarkSolid className="ods-fill-black ods-w-xl ods-h-xl" />
      </IconButton>
      <IconButton>
        <XmarkSolid className="ods-fill-black ods-w-8 ods-h-8" />
      </IconButton>
    </div>
  );
};

export default meta;
