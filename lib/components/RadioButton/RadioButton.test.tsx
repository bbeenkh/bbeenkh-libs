import { render, screen, fireEvent } from '@testing-library/react';
import RadioButton from '.';

describe('RadioButton', () => {
  it('radio input이 렌더링된다', () => {
    render(<RadioButton id="rb1" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('label이 렌더링된다', () => {
    render(<RadioButton id="rb1" label="옵션 A" />);
    expect(screen.getByText('옵션 A')).toBeInTheDocument();
  });

  it('checked 상태가 적용된다', () => {
    render(<RadioButton id="rb1" checked onChange={() => {}} />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('unchecked 상태가 적용된다', () => {
    render(<RadioButton id="rb1" checked={false} onChange={() => {}} />);
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('onChange가 호출된다', () => {
    const onChange = vi.fn();
    render(<RadioButton id="rb1" onChange={onChange} />);
    fireEvent.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('disabled 상태가 적용된다', () => {
    render(<RadioButton id="rb1" disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('label htmlFor가 id와 연결된다', () => {
    render(<RadioButton id="my-rb" label="선택" />);
    const label = screen.getByText('선택');
    expect(label).toHaveAttribute('for', 'my-rb');
  });
});
