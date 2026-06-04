import { render, screen, fireEvent } from '@testing-library/react';
import Table from '.';

const fields = [
  { key: 'name', label: '이름' },
  { key: 'age', label: '나이', align: 'center' as const },
  { key: 'role', label: '역할', align: 'right' as const },
];

const rows = [
  { name: '홍길동', age: 30, role: '관리자' },
  { name: '김철수', age: 25, role: '사용자' },
];

describe('Table', () => {
  it('필드 헤더가 렌더링된다', () => {
    render(<Table fields={fields} rows={rows} />);
    expect(screen.getByText('이름')).toBeInTheDocument();
    expect(screen.getByText('나이')).toBeInTheDocument();
    expect(screen.getByText('역할')).toBeInTheDocument();
  });

  it('행 데이터가 렌더링된다', () => {
    render(<Table fields={fields} rows={rows} />);
    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('김철수')).toBeInTheDocument();
  });

  it('빈 rows 배열이면 tbody가 비어있다', () => {
    const { container } = render(<Table fields={fields} rows={[]} />);
    const tbody = container.querySelector('tbody');
    expect(tbody?.querySelectorAll('tr')).toHaveLength(0);
  });

  it('onClickRow가 행 클릭 시 호출된다', () => {
    const onClickRow = vi.fn();
    render(<Table fields={fields} rows={rows} onClickRow={onClickRow} />);
    const tableRows = screen.getAllByRole('row');
    // 첫 번째는 thead tr, 두 번째부터 tbody tr
    fireEvent.click(tableRows[1]);
    expect(onClickRow).toHaveBeenCalledTimes(1);
  });

  it('align="center"인 필드의 th에 ods-text-center 클래스가 적용된다', () => {
    const { container } = render(<Table fields={fields} rows={rows} />);
    const ths = container.querySelectorAll('th');
    expect(ths[1]).toHaveClass('ods-text-center');
  });
});
