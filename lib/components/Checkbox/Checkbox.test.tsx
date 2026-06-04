import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '.';

describe('Checkbox', () => {
  it('checkbox input이 렌더링된다', () => {
    render(<Checkbox id="cb1" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('label이 렌더링된다', () => {
    render(<Checkbox id="cb1" label="동의합니다" />);
    expect(screen.getByText('동의합니다')).toBeInTheDocument();
  });

  it('checked 상태가 적용된다', () => {
    render(<Checkbox id="cb1" checked onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('unchecked 상태가 적용된다', () => {
    render(<Checkbox id="cb1" checked={false} onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('onChange가 호출된다', () => {
    const onChange = vi.fn();
    render(<Checkbox id="cb1" onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('disabled 상태가 적용된다', () => {
    render(<Checkbox id="cb1" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('label htmlFor가 id와 연결된다', () => {
    render(<Checkbox id="my-cb" label="선택" />);
    const label = screen.getByText('선택');
    expect(label).toHaveAttribute('for', 'my-cb');
  });
});
