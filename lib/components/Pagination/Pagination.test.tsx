import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '.';

describe('Pagination', () => {
  const defaultProps = {
    totalItems: 30,
    displayPages: 10,
    pageCount: 5,
    setPage: vi.fn(),
  };

  it('페이지 버튼들이 렌더링된다', () => {
    render(<Pagination {...defaultProps} />);
    // totalItems=30, displayPages=10 → 3 페이지
    expect(screen.getByLabelText('pg-1')).toBeInTheDocument();
    expect(screen.getByLabelText('pg-2')).toBeInTheDocument();
    expect(screen.getByLabelText('pg-3')).toBeInTheDocument();
  });

  it('첫 페이지가 기본 활성 상태(disabled)이다', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByLabelText('pg-1')).toBeDisabled();
  });

  it('다른 페이지 버튼 클릭 시 해당 페이지로 이동된다', () => {
    render(<Pagination {...defaultProps} />);
    const page2 = screen.getByLabelText('pg-2');
    expect(page2).not.toBeDisabled();
    fireEvent.click(page2);
    expect(page2).toBeDisabled();
  });

  it('className이 적용된다', () => {
    const { container } = render(
      <Pagination {...defaultProps} className="custom-pagination" />,
    );
    expect(container.firstChild).toHaveClass('custom-pagination');
  });

  it('totalItems=0이면 페이지 버튼이 없다', () => {
    render(<Pagination {...defaultProps} totalItems={0} />);
    expect(screen.queryByLabelText('pg-1')).not.toBeInTheDocument();
  });
});
