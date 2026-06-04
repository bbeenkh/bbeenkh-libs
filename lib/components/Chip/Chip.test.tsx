import { render, screen, fireEvent } from '@testing-library/react';
import Chip from '.';

describe('Chip', () => {
  it('children을 렌더링한다', () => {
    render(<Chip>태그</Chip>);
    expect(screen.getByText('태그')).toBeInTheDocument();
  });

  it('button 요소로 렌더링된다', () => {
    render(<Chip>태그</Chip>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('onClick이 호출된다', () => {
    const onClick = vi.fn();
    render(<Chip onClick={onClick}>태그</Chip>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('className이 적용된다', () => {
    render(<Chip className="extra-class">태그</Chip>);
    expect(screen.getByRole('button')).toHaveClass('extra-class');
  });

  describe('variant', () => {
    it('variant="outlined"(기본값) + selected=true 시 ods-text-primary 클래스가 적용된다', () => {
      render(<Chip variant="outlined" selected>태그</Chip>);
      expect(screen.getByRole('button')).toHaveClass('ods-text-primary');
    });

    it('variant="filled" + selected=true 시 ods-bg-primary 클래스가 적용된다', () => {
      render(<Chip variant="filled" selected>태그</Chip>);
      expect(screen.getByRole('button')).toHaveClass('ods-bg-primary');
    });

    it('variant="filled" + selected=false 시 ods-bg-white 클래스가 적용된다', () => {
      render(<Chip variant="filled" selected={false}>태그</Chip>);
      expect(screen.getByRole('button')).toHaveClass('ods-bg-white');
    });
  });

  describe('icon="check"', () => {
    it('icon="check"이면 아이콘이 렌더링된다', () => {
      const { container } = render(<Chip icon="check">태그</Chip>);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('icon 없으면 svg가 렌더링되지 않는다', () => {
      const { container } = render(<Chip>태그</Chip>);
      expect(container.querySelector('svg')).not.toBeInTheDocument();
    });
  });
});
