import { render, screen } from '@testing-library/react';
import SearchFallbackView from '.';

describe('SearchFallbackView', () => {
  describe('기본 동작', () => {
    it('message를 렌더링한다', () => {
      render(<SearchFallbackView message="검색된 결과가 없습니다." />);
      expect(screen.getByText('검색된 결과가 없습니다.')).toBeInTheDocument();
    });

    it('icon prop이 있으면 아이콘을 렌더링한다', () => {
      render(
        <SearchFallbackView
          message="메시지"
          icon={<span data-testid="custom-icon">icon</span>}
        />,
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('icon이 없으면 아이콘이 렌더링되지 않는다', () => {
      render(<SearchFallbackView message="메시지" />);
      expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument();
    });

    it('icon prop 없이 렌더링 시 icon 래퍼(data-slot="icon")가 없다', () => {
      const { container } = render(<SearchFallbackView message="메시지" />);
      expect(container.querySelector('[data-slot="icon"]')).not.toBeInTheDocument();
    });

    it('icon이 있으면 data-slot="icon" 래퍼가 존재한다', () => {
      const { container } = render(
        <SearchFallbackView message="메시지" icon={<span>아이콘</span>} />,
      );
      expect(container.querySelector('[data-slot="icon"]')).toBeInTheDocument();
    });
  });

  describe('styleClass prop', () => {
    it('styleClass.root이 래퍼에 적용된다', () => {
      const { container } = render(
        <SearchFallbackView message="메시지" styleClass={{ root: 'flex flex-col items-center' }} />,
      );
      expect(container.firstChild).toHaveClass('flex', 'flex-col', 'items-center');
    });

    it('styleClass.message가 message 요소에 적용된다', () => {
      render(
        <SearchFallbackView
          message="메시지"
          styleClass={{ message: 'text-gray-500 text-sm' }}
        />,
      );
      expect(screen.getByText('메시지')).toHaveClass('text-gray-500', 'text-sm');
    });

    it('styleClass.icon이 아이콘 래퍼에 적용된다', () => {
      const { container } = render(
        <SearchFallbackView
          message="메시지"
          icon={<span>아이콘</span>}
          styleClass={{ icon: 'mb-4 w-20' }}
        />,
      );
      expect(container.querySelector('[data-slot="icon"]')).toHaveClass('mb-4', 'w-20');
    });

    it('기본 스타일이 없다', () => {
      const { container } = render(<SearchFallbackView message="메시지" />);
      expect((container.firstChild as HTMLElement).className.trim()).toBe('');
    });
  });
});
