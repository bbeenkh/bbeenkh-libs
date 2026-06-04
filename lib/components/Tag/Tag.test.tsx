import { render, screen } from '@testing-library/react';
import Tag from '.';

describe('Tag', () => {
  it('children 텍스트를 렌더링한다', () => {
    render(<Tag>완료</Tag>);
    expect(screen.getByText('완료')).toBeInTheDocument();
  });

  it('기본 variant(default)로 렌더링된다', () => {
    const { container } = render(<Tag>기본</Tag>);
    expect(container.firstChild).toHaveClass('ods-text-gray-700');
  });

  it('variant="info"가 적용된다', () => {
    const { container } = render(<Tag variant="info">정보</Tag>);
    expect(container.firstChild).toHaveClass('ods-text-state-info');
  });

  it('variant="success"가 적용된다', () => {
    const { container } = render(<Tag variant="success">성공</Tag>);
    expect(container.firstChild).toHaveClass('ods-text-state-success');
  });

  it('variant="warning"가 적용된다', () => {
    const { container } = render(<Tag variant="warning">경고</Tag>);
    expect(container.firstChild).toHaveClass('ods-text-state-warning');
  });

  it('variant="danger"가 적용된다', () => {
    const { container } = render(<Tag variant="danger">위험</Tag>);
    expect(container.firstChild).toHaveClass('ods-text-state-danger');
  });

  it('forceTagStyle이 적용된다', () => {
    const { container } = render(<Tag forceTagStyle="custom-class">태그</Tag>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
