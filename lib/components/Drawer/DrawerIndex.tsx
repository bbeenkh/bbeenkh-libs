import React from 'react';

interface IProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Drawer 목차 컴포넌트
 * 추후 재사용 정도 봐서 디자인시스템에 추가예정
 * @param param0
 * @returns
 */
function DrawerIndex({ title, children }: IProps) {
  return (
    <div className="ods-w-full ods-flex ods-flex-col ods-justify-start ods-items-start ods-gap-sm">
      <span className="ods-text-tertiary ods-text-xs">{title}</span>
      <ul className="ods-w-full ods-flex-col ods-justify-start ods-items-start ods-gap-xs ods-flex">
        {children}
      </ul>
    </div>
  );
}

DrawerIndex.Item = function ({
  title,
  onClick,
}: {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <li className="ods-w-full ods-h-[2.25em] ods-px-2 hover:ods-bg-off-white active:ods-bg-gray-200 ods-rounded ods-flex ods-justify-start ods-items-center ods-gap-6 ods-cursor-pointer">
      <button
        onClick={onClick}
        className="ods-text-black ods-text-sm ods-font-bold"
      >
        {title}
      </button>
    </li>
  );
};

export default DrawerIndex;
