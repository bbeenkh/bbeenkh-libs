import { render, screen } from '@testing-library/react';
import Skeleton from '.';

describe('Skeleton', () => {
  describe('Skeleton.Box', () => {
    it('렌더링된다', () => {
      const { container } = render(<Skeleton.Box />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('styleClass.root이 적용된다', () => {
      const { container } = render(<Skeleton.Box styleClass={{ root: 'w-1/3 h-8' }} />);
      expect(container.firstChild).toHaveClass('w-1/3');
      expect(container.firstChild).toHaveClass('h-8');
    });

    it('기본 스타일이 없다', () => {
      const { container } = render(<Skeleton.Box />);
      expect((container.firstChild as HTMLElement).className.trim()).toBe('');
    });

    it('여러 styleClass를 동시에 적용할 수 있다', () => {
      const { container } = render(
        <Skeleton.Box styleClass={{ root: 'rounded-full bg-gray-300 animate-pulse' }} />,
      );
      expect(container.firstChild).toHaveClass('rounded-full', 'bg-gray-300', 'animate-pulse');
    });
  });

  describe('Skeleton.Circle', () => {
    it('렌더링된다', () => {
      const { container } = render(<Skeleton.Circle />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('styleClass.root이 적용된다', () => {
      const { container } = render(
        <Skeleton.Circle styleClass={{ root: 'w-12 h-12 rounded-full' }} />,
      );
      expect(container.firstChild).toHaveClass('rounded-full');
    });

    it('기본 스타일이 없다', () => {
      const { container } = render(<Skeleton.Circle />);
      expect((container.firstChild as HTMLElement).className.trim()).toBe('');
    });
  });

  describe('Skeleton.Container', () => {
    it('children을 렌더링한다', () => {
      render(
        <Skeleton.Container>
          <span>자식 요소</span>
        </Skeleton.Container>,
      );
      expect(screen.getByText('자식 요소')).toBeInTheDocument();
    });

    it('여러 children을 렌더링한다', () => {
      render(
        <Skeleton.Container>
          <Skeleton.Box styleClass={{ root: 'h-4' }} />
          <Skeleton.Circle styleClass={{ root: 'w-8 h-8' }} />
        </Skeleton.Container>,
      );
      // 두 자식 모두 존재
      const { container } = render(
        <Skeleton.Container>
          <span data-testid="child-1">1</span>
          <span data-testid="child-2">2</span>
        </Skeleton.Container>,
      );
      expect(container.querySelectorAll('[data-testid]')).toHaveLength(2);
    });

    it('styleClass.root이 적용된다', () => {
      const { container } = render(
        <Skeleton.Container styleClass={{ root: 'flex flex-col gap-2 p-4' }}>
          <span />
        </Skeleton.Container>,
      );
      expect(container.firstChild).toHaveClass('flex', 'flex-col', 'gap-2');
    });

    it('기본 스타일이 없다', () => {
      const { container } = render(
        <Skeleton.Container>
          <span />
        </Skeleton.Container>,
      );
      expect((container.firstChild as HTMLElement).className.trim()).toBe('');
    });
  });
});
