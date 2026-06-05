import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '.';

const meta: Meta = {
  title: 'Components/DropdownMenu',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center h-40">
      <DropdownMenu>
        <DropdownMenuTrigger className="px-4 py-2 text-sm rounded-md border border-gray-200 bg-white hover:bg-gray-50 outline-none">
          메뉴 열기
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 shadow-md rounded-md">
          <DropdownMenuLabel>내 계정</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>프로필</DropdownMenuItem>
          <DropdownMenuItem>설정</DropdownMenuItem>
          <DropdownMenuItem>팀</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            로그아웃
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => {
    const [showStatus, setShowStatus] = useState(true);
    const [showEmail, setShowEmail] = useState(false);

    return (
      <div className="flex items-center justify-center h-40">
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 text-sm rounded-md border border-gray-200 bg-white hover:bg-gray-50 outline-none">
            표시 항목
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-200 shadow-md rounded-md">
            <DropdownMenuLabel>표시 설정</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
              상태
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showEmail} onCheckedChange={setShowEmail}>
              이메일
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};

export const WithRadio: Story = {
  render: () => {
    const [position, setPosition] = useState('bottom');

    return (
      <div className="flex items-center justify-center h-40">
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 text-sm rounded-md border border-gray-200 bg-white hover:bg-gray-50 outline-none">
            패널 위치
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-200 shadow-md rounded-md">
            <DropdownMenuLabel>위치 선택</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top">상단</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">하단</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">우측</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};

export const WithSubmenu: Story = {
  render: () => (
    <div className="flex items-center justify-center h-40">
      <DropdownMenu>
        <DropdownMenuTrigger className="px-4 py-2 text-sm rounded-md border border-gray-200 bg-white hover:bg-gray-50 outline-none">
          더보기
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 shadow-md rounded-md">
          <DropdownMenuItem>새 파일</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>내보내기</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="bg-white border border-gray-200 shadow-md rounded-md">
              <DropdownMenuItem>PDF</DropdownMenuItem>
              <DropdownMenuItem>PNG</DropdownMenuItem>
              <DropdownMenuItem>CSV</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>삭제</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};
