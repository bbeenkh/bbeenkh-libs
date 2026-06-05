import { renderHook, render, screen } from '@testing-library/react';
import useInfiniteScroll from './useInfiniteScroll';

vi.mock('react-intersection-observer', () => ({
  useInView: vi.fn(),
}));

import { useInView, type InViewHookResponse } from 'react-intersection-observer';

const mockUseInView = vi.mocked(useInView);
const mockRef = vi.fn();

/** InViewHookResponse는 object + 튜플 하이브리드 타입이므로 양쪽 모두 충족하는 mock 생성 */
function makeInViewResponse(inView: boolean): InViewHookResponse {
  const tuple = Object.assign([mockRef, inView, undefined] as [typeof mockRef, boolean, undefined], {
    ref: mockRef,
    inView,
    entry: undefined,
  });
  return tuple as unknown as InViewHookResponse;
}

beforeEach(() => {
  mockUseInView.mockReturnValue(makeInViewResponse(false));
});

describe('useInfiniteScroll', () => {
  describe('InfiniteScrollWrapper', () => {
    it('children을 렌더링한다', () => {
      const { result } = renderHook(() =>
        useInfiniteScroll({ onTriggered: vi.fn() }),
      );
      const { InfiniteScrollWrapper } = result.current;

      render(
        <InfiniteScrollWrapper thresholdUI={null}>
          <div>아이템</div>
        </InfiniteScrollWrapper>,
      );

      expect(screen.getByText('아이템')).toBeInTheDocument();
    });

    it('thresholdUI를 렌더링한다', () => {
      const { result } = renderHook(() =>
        useInfiniteScroll({ onTriggered: vi.fn() }),
      );
      const { InfiniteScrollWrapper } = result.current;

      render(
        <InfiniteScrollWrapper thresholdUI={<span>로딩 중</span>}>
          <div>아이템</div>
        </InfiniteScrollWrapper>,
      );

      expect(screen.getByText('로딩 중')).toBeInTheDocument();
    });

    it('thresholdUI가 null이면 감지 영역만 렌더링된다', () => {
      const { result } = renderHook(() =>
        useInfiniteScroll({ onTriggered: vi.fn() }),
      );
      const { InfiniteScrollWrapper } = result.current;

      render(
        <InfiniteScrollWrapper thresholdUI={null}>
          <div>아이템</div>
        </InfiniteScrollWrapper>,
      );

      expect(screen.queryByText('로딩 중')).not.toBeInTheDocument();
      expect(screen.getByText('아이템')).toBeInTheDocument();
    });
  });

  describe('onTriggered 호출 조건', () => {
    it('뷰포트에 진입하면 onTriggered를 호출한다', () => {
      mockUseInView.mockReturnValue(makeInViewResponse(true));
      const onTriggered = vi.fn();

      renderHook(() => useInfiniteScroll({ onTriggered }));

      expect(onTriggered).toHaveBeenCalledTimes(1);
    });

    it('isLoading이 true이면 뷰포트 진입 시에도 onTriggered를 호출하지 않는다', () => {
      mockUseInView.mockReturnValue(makeInViewResponse(true));
      const onTriggered = vi.fn();

      renderHook(() => useInfiniteScroll({ onTriggered, isLoading: true }));

      expect(onTriggered).not.toHaveBeenCalled();
    });

    it('hasNextPage가 false이면 뷰포트 진입 시에도 onTriggered를 호출하지 않는다', () => {
      mockUseInView.mockReturnValue(makeInViewResponse(true));
      const onTriggered = vi.fn();

      renderHook(() => useInfiniteScroll({ onTriggered, hasNextPage: false }));

      expect(onTriggered).not.toHaveBeenCalled();
    });

    it('뷰포트에 진입하지 않으면 onTriggered를 호출하지 않는다', () => {
      mockUseInView.mockReturnValue(makeInViewResponse(false));
      const onTriggered = vi.fn();

      renderHook(() => useInfiniteScroll({ onTriggered }));

      expect(onTriggered).not.toHaveBeenCalled();
    });
  });

  describe('threshold', () => {
    it('threshold 기본값 0.1을 useInView에 전달한다', () => {
      renderHook(() => useInfiniteScroll({ onTriggered: vi.fn() }));

      expect(mockUseInView).toHaveBeenCalledWith({ threshold: 0.1 });
    });

    it('커스텀 threshold 값을 useInView에 전달한다', () => {
      renderHook(() => useInfiniteScroll({ onTriggered: vi.fn(), threshold: 0.5 }));

      expect(mockUseInView).toHaveBeenCalledWith({ threshold: 0.5 });
    });
  });
});
