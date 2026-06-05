import { render } from '@testing-library/react';
import Spinner from '.';

describe('Spinner', () => {
  it('렌더링된다', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('SVG 아이콘이 렌더링된다', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('size="xs"일 때 w-4 h-4 클래스가 적용된다', () => {
    const { container } = render(<Spinner size="xs" />);
    expect(container.querySelector('svg')).toHaveClass('w-4', 'h-4');
  });

  it('size="sm"일 때 w-5 h-5 클래스가 적용된다', () => {
    const { container } = render(<Spinner size="sm" />);
    expect(container.querySelector('svg')).toHaveClass('w-5', 'h-5');
  });

  it('size="lg"(기본값)일 때 w-6 h-6 클래스가 적용된다', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('svg')).toHaveClass('w-6', 'h-6');
  });

  it('size="xl"일 때 w-8 h-8 클래스가 적용된다', () => {
    const { container } = render(<Spinner size="xl" />);
    expect(container.querySelector('svg')).toHaveClass('w-8', 'h-8');
  });

  it('className이 svg에 적용된다', () => {
    const { container } = render(<Spinner className="extra-spin" />);
    expect(container.querySelector('svg')).toHaveClass('extra-spin');
  });
});
