import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from '.';

describe('Popover', () => {
  describe('기본 동작', () => {
    it('트리거 버튼이 렌더링된다', () => {
      render(
        <Popover.Root>
          <Popover.Trigger>열기</Popover.Trigger>
          <Popover.Content>팝오버 내용</Popover.Content>
        </Popover.Root>,
      );
      expect(screen.getByText('열기')).toBeInTheDocument();
    });

    it('기본 상태에서 콘텐츠가 표시되지 않는다', () => {
      render(
        <Popover.Root>
          <Popover.Trigger>열기</Popover.Trigger>
          <Popover.Content>팝오버 내용</Popover.Content>
        </Popover.Root>,
      );
      expect(screen.queryByText('팝오버 내용')).not.toBeInTheDocument();
    });

    it('트리거 클릭 시 콘텐츠가 표시된다', async () => {
      const user = userEvent.setup();
      render(
        <Popover.Root>
          <Popover.Trigger>열기</Popover.Trigger>
          <Popover.Content>팝오버 내용</Popover.Content>
        </Popover.Root>,
      );
      await user.click(screen.getByText('열기'));
      expect(screen.getByText('팝오버 내용')).toBeInTheDocument();
    });

    it('open=true 시 콘텐츠가 표시된다', () => {
      render(
        <Popover.Root open>
          <Popover.Trigger>열기</Popover.Trigger>
          <Popover.Content>팝오버 내용</Popover.Content>
        </Popover.Root>,
      );
      expect(screen.getByText('팝오버 내용')).toBeInTheDocument();
    });
  });

  describe('styleClass prop', () => {
    it('styleClass.content가 콘텐츠에 적용된다', () => {
      render(
        <Popover.Root open>
          <Popover.Trigger>열기</Popover.Trigger>
          <Popover.Content styleClass={{ content: 'bg-white shadow-lg' }}>
            <span>내용</span>
          </Popover.Content>
        </Popover.Root>,
      );
      const content = screen.getByText('내용').closest('[data-radix-popper-content-wrapper]')
        ?.firstChild as HTMLElement;
      expect(content).toHaveClass('bg-white', 'shadow-lg');
    });
  });

  describe('Popover.Close', () => {
    it('Close 버튼 클릭 시 팝오버가 닫힌다', async () => {
      const user = userEvent.setup();
      render(
        <Popover.Root>
          <Popover.Trigger>열기</Popover.Trigger>
          <Popover.Content>
            <span>팝오버 내용</span>
            <Popover.Close>닫기</Popover.Close>
          </Popover.Content>
        </Popover.Root>,
      );
      await user.click(screen.getByText('열기'));
      expect(screen.getByText('팝오버 내용')).toBeInTheDocument();
      await user.click(screen.getByText('닫기'));
      expect(screen.queryByText('팝오버 내용')).not.toBeInTheDocument();
    });
  });
});
