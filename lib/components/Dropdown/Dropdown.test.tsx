import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from '.';

const options = [
  { label: '전체', value: 'all' },
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
];

describe('Dropdown', () => {
  it('label이 렌더링된다', () => {
    render(
      <Dropdown
        options={options}
        label="정렬"
        value="all"
        onChange={() => {}}
      />,
    );
    expect(screen.getByText('정렬')).toBeInTheDocument();
  });

  it('현재 선택된 값의 라벨이 표시된다', () => {
    render(
      <Dropdown
        options={options}
        label="정렬"
        value="latest"
        onChange={() => {}}
      />,
    );
    expect(screen.getByText('최신순')).toBeInTheDocument();
  });

  it('클릭 시 옵션 목록이 열린다', () => {
    render(
      <Dropdown
        options={options}
        label="정렬"
        value="all"
        onChange={() => {}}
      />,
    );
    const container = screen.getByText('정렬').closest('[tabindex="0"]')!;
    fireEvent.mouseDown(container);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('옵션 선택 시 onChange가 호출된다', () => {
    const onChange = vi.fn();
    render(
      <Dropdown
        options={options}
        label="정렬"
        value="all"
        onChange={onChange}
      />,
    );
    const container = screen.getByText('정렬').closest('[tabindex="0"]')!;
    fireEvent.mouseDown(container);
    const optionButtons = screen.getAllByRole('button');
    fireEvent.mouseDown(optionButtons[0]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('disabled 상태에서는 클릭해도 목록이 열리지 않는다', () => {
    render(
      <Dropdown
        options={options}
        label="정렬"
        value="all"
        onChange={() => {}}
        disabled
      />,
    );
    const container = screen.getByText('정렬').closest('[tabindex="0"]')!;
    fireEvent.mouseDown(container);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
