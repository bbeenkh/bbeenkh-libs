import { render, screen } from '@testing-library/react';
import Badge from '.';

describe('Badge', () => {
  describe('type=number (기본값)', () => {
    it('숫자를 렌더링한다', () => {
      render(<Badge>5</Badge>);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('999 이하 숫자를 그대로 표시한다', () => {
      render(<Badge>999</Badge>);
      expect(screen.getByText('999')).toBeInTheDocument();
    });

    it('1000 이상 숫자는 "999+"로 표시한다', () => {
      render(<Badge>1000</Badge>);
      expect(screen.getByText('999+')).toBeInTheDocument();
    });

    it('children이 없으면 "0"을 표시한다', () => {
      render(<Badge />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('type=dot', () => {
    it('텍스트를 렌더링하지 않는다', () => {
      render(<Badge type="dot">5</Badge>);
      expect(screen.queryByText('5')).not.toBeInTheDocument();
    });

    it('size="default"일 때 ods-w-2 ods-h-2 클래스가 적용된다', () => {
      const { container } = render(<Badge type="dot" size="default" />);
      expect(container.firstChild).toHaveClass('ods-w-2', 'ods-h-2');
    });

    it('size="sm"일 때 ods-w-1 ods-h-1 클래스가 적용된다', () => {
      const { container } = render(<Badge type="dot" size="sm" />);
      expect(container.firstChild).toHaveClass('ods-w-1', 'ods-h-1');
    });
  });
});
