import { render, screen } from '@testing-library/react';
import Drawer from '.';

describe('Drawer', () => {
  it('children을 렌더링한다', () => {
    render(<Drawer>사이드바 내용</Drawer>);
    expect(screen.getByText('사이드바 내용')).toBeInTheDocument();
  });

  it('aside 요소로 렌더링된다', () => {
    const { container } = render(<Drawer>내용</Drawer>);
    expect(container.querySelector('aside')).toBeInTheDocument();
  });

  it('isOpen=true(기본값)일 때 translate-x-0 클래스가 적용된다', () => {
    const { container } = render(<Drawer isOpen={true}>내용</Drawer>);
    expect(container.querySelector('aside')).toHaveClass('ods-translate-x-0');
  });

  it('isOpen=false일 때 -translate-x-full 클래스가 적용된다', () => {
    const { container } = render(<Drawer isOpen={false}>내용</Drawer>);
    expect(container.querySelector('aside')).toHaveClass('ods--translate-x-full');
  });

  it('className이 aside 요소에 적용된다', () => {
    const { container } = render(<Drawer className="w-64">내용</Drawer>);
    expect(container.querySelector('aside')).toHaveClass('w-64');
  });
});
