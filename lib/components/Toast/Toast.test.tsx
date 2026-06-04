import { render, screen } from '@testing-library/react';
import Toast from '.';

describe('Toast', () => {
  describe('Toast.Provider', () => {
    it('children이 렌더링된다', () => {
      render(
        <Toast.Provider open={false} onOpenChange={() => {}} message="알림">
          <div>앱 콘텐츠</div>
        </Toast.Provider>,
      );
      expect(screen.getByText('앱 콘텐츠')).toBeInTheDocument();
    });

    it('open=true 시 message가 렌더링된다', () => {
      render(
        <Toast.Provider open={true} onOpenChange={() => {}} message="성공적으로 처리되었습니다.">
          <div />
        </Toast.Provider>,
      );
      expect(screen.getByText('성공적으로 처리되었습니다.')).toBeInTheDocument();
    });

    it('open=false 시 toast-root가 렌더링되지 않는다', () => {
      render(
        <Toast.Provider open={false} onOpenChange={() => {}} message="숨겨진 메시지">
          <div />
        </Toast.Provider>,
      );
      expect(screen.queryByTestId('toast-root')).not.toBeInTheDocument();
    });

    it('styleClass.root이 toast-root에 적용된다', () => {
      render(
        <Toast.Provider
          open={true}
          onOpenChange={() => {}}
          message="메시지"
          styleClass={{ root: 'bg-gray-800 text-white' }}
        >
          <div />
        </Toast.Provider>,
      );
      expect(screen.getByTestId('toast-root')).toHaveClass('bg-gray-800', 'text-white');
    });
  });
});
