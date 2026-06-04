import { render, screen } from '@testing-library/react';
import { forwardRef } from 'react';
import { InfiniteScrollWrapper } from '.';

describe('InfiniteScrollWrapper', () => {
  it('children을 렌더링한다', () => {
    render(
      <InfiniteScrollWrapper>
        <div>목록 아이템</div>
      </InfiniteScrollWrapper>,
    );
    expect(screen.getByText('목록 아이템')).toBeInTheDocument();
  });

  it('ods-w-full 클래스가 적용된다', () => {
    const { container } = render(
      <InfiniteScrollWrapper>
        <div>내용</div>
      </InfiniteScrollWrapper>,
    );
    expect(container.firstChild).toHaveClass('ods-w-full');
  });

  it('className이 적용된다', () => {
    const { container } = render(
      <InfiniteScrollWrapper className="overflow-y-auto">
        <div>내용</div>
      </InfiniteScrollWrapper>,
    );
    expect(container.firstChild).toHaveClass('overflow-y-auto');
  });

  it('isLoading=false 시 기본 loadingUI가 표시되지 않는다', () => {
    const { container } = render(
      <InfiniteScrollWrapper isLoading={false}>
        <div>내용</div>
      </InfiniteScrollWrapper>,
    );
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('isLoading=true 시 기본 loadingUI(Spinner)가 렌더링된다', () => {
    const { container } = render(
      <InfiniteScrollWrapper isLoading>
        <div>내용</div>
      </InfiniteScrollWrapper>,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('커스텀 loadingUI가 렌더링된다', () => {
    render(
      <InfiniteScrollWrapper isLoading loadingUI={<span>로딩중...</span>}>
        <div>내용</div>
      </InfiniteScrollWrapper>,
    );
    expect(screen.getByText('로딩중...')).toBeInTheDocument();
  });
});
