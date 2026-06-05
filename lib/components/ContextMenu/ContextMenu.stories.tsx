import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from '.';

const meta: Meta = {
  title: 'Components/ContextMenu',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center h-48">
      <ContextMenu>
        <ContextMenuTrigger className="flex items-center justify-center w-64 h-24 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 select-none cursor-context-menu">
          우클릭해보세요
        </ContextMenuTrigger>
        <ContextMenuContent className="bg-white border border-gray-200 shadow-md rounded-md">
          <ContextMenuItem>
            뒤로가기
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            앞으로가기
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            새로고침
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            저장
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => {
    const [showBookmarks, setShowBookmarks] = useState(true);
    const [showHistory, setShowHistory] = useState(false);

    return (
      <div className="flex items-center justify-center h-48">
        <ContextMenu>
          <ContextMenuTrigger className="flex items-center justify-center w-64 h-24 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 select-none cursor-context-menu">
            우클릭해보세요
          </ContextMenuTrigger>
          <ContextMenuContent className="bg-white border border-gray-200 shadow-md rounded-md">
            <ContextMenuLabel>보기 설정</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
              북마크 표시
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked={showHistory} onCheckedChange={setShowHistory}>
              방문 기록 표시
            </ContextMenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    );
  },
};

export const WithRadio: Story = {
  render: () => {
    const [theme, setTheme] = useState('system');

    return (
      <div className="flex items-center justify-center h-48">
        <ContextMenu>
          <ContextMenuTrigger className="flex items-center justify-center w-64 h-24 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 select-none cursor-context-menu">
            우클릭해보세요
          </ContextMenuTrigger>
          <ContextMenuContent className="bg-white border border-gray-200 shadow-md rounded-md">
            <ContextMenuLabel>테마</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
              <ContextMenuRadioItem value="light">라이트</ContextMenuRadioItem>
              <ContextMenuRadioItem value="dark">다크</ContextMenuRadioItem>
              <ContextMenuRadioItem value="system">시스템 설정</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    );
  },
};

export const WithSubmenu: Story = {
  render: () => (
    <div className="flex items-center justify-center h-48">
      <ContextMenu>
        <ContextMenuTrigger className="flex items-center justify-center w-64 h-24 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 select-none cursor-context-menu">
          우클릭해보세요
        </ContextMenuTrigger>
        <ContextMenuContent className="bg-white border border-gray-200 shadow-md rounded-md">
          <ContextMenuItem>잘라내기</ContextMenuItem>
          <ContextMenuItem>복사</ContextMenuItem>
          <ContextMenuItem>붙여넣기</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>공유</ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-white border border-gray-200 shadow-md rounded-md">
              <ContextMenuItem>링크 복사</ContextMenuItem>
              <ContextMenuItem>이메일로 보내기</ContextMenuItem>
              <ContextMenuItem>메시지로 보내기</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>삭제</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};
