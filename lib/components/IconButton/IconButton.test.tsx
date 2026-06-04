import { render, screen, fireEvent } from '@testing-library/react';
import IconButton from '.';

describe('IconButton', () => {
  describe('기본 동작', () => {
    it('icon prop으로 전달된 아이콘이 렌더링된다', () => {
      render(
        <IconButton
          icon={<span data-testid="test-icon">icon</span>}
          aria-label="아이콘 버튼"
        />,
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('button 요소로 렌더링된다', () => {
      render(<IconButton icon={<span>icon</span>} aria-label="btn" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('aria-label이 적용된다', () => {
      render(
        <IconButton icon={<span>icon</span>} aria-label="즐겨찾기" />,
      );
      expect(screen.getByRole('button', { name: '즐겨찾기' })).toBeInTheDocument();
    });
  });

  describe('onClick', () => {
    it('클릭 시 onClick이 호출된다', () => {
      const onClick = vi.fn();
      render(
        <IconButton icon={<span>icon</span>} onClick={onClick} aria-label="클릭 버튼" />,
      );
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('className prop', () => {
    it('추가 className이 버튼에 적용된다', () => {
      render(
        <IconButton icon={<span>icon</span>} className="extra-class" aria-label="class-btn" />,
      );
      expect(screen.getByRole('button')).toHaveClass('extra-class');
    });

    it('기본 클래스(flex items-center justify-center)가 적용된다', () => {
      render(<IconButton icon={<span>icon</span>} aria-label="default-btn" />);
      expect(screen.getByRole('button')).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });

  describe('disabled', () => {
    it('disabled 상태가 적용된다', () => {
      render(
        <IconButton icon={<span>icon</span>} disabled aria-label="disabled-btn" />,
      );
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('disabled 상태에서 onClick이 호출되지 않는다', () => {
      const onClick = vi.fn();
      render(
        <IconButton icon={<span>icon</span>} disabled onClick={onClick} aria-label="disabled-click" />,
      );
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
