import { Meta } from '@storybook/react';
import Toast from '.';
import { useState } from 'react';

/**
 * Radix UI Toast 기반 Toast 컴포넌트
 * - `Toast.Provider`로 앱을 감싸서 사용
 * - `open` / `onOpenChange` / `message` prop으로 외부에서 상태를 직접 제어
 */
const meta: Meta = {
  title: 'Components/Toast',
};

export default meta;

const btnClass = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors';

/** 기본 Toast */
export function DefaultToast() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const show = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  return (
    <Toast.Provider
      open={open}
      onOpenChange={setOpen}
      message={message}
      styleClass={{
        root: 'bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm',
        viewport: 'fixed bottom-4 right-4 z-50 flex flex-col gap-2',
      }}
    >
      <button
        className={`${btnClass} bg-blue-600 text-white hover:bg-blue-700`}
        onClick={() => show('안녕하세요! 토스트 메시지입니다.')}
      >
        토스트 표시
      </button>
    </Toast.Provider>
  );
}

/** 성공 / 실패 / 정보 스타일 */
export function StyledToasts() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [rootClass, setRootClass] = useState('');

  const show = (msg: string, cls: string) => {
    setMessage(msg);
    setRootClass(cls);
    setOpen(true);
  };

  return (
    <Toast.Provider
      open={open}
      onOpenChange={setOpen}
      message={message}
      styleClass={{
        root: `px-4 py-3 rounded-lg shadow-lg text-sm text-white ${rootClass}`,
        viewport: 'fixed bottom-4 right-4 z-50 flex flex-col gap-2',
      }}
    >
      <div className="flex gap-3">
        <button
          className={`${btnClass} bg-green-600 text-white hover:bg-green-700`}
          onClick={() => show('저장되었습니다!', 'bg-green-700')}
        >
          성공
        </button>
        <button
          className={`${btnClass} bg-red-600 text-white hover:bg-red-700`}
          onClick={() => show('오류가 발생했습니다.', 'bg-red-700')}
        >
          오류
        </button>
        <button
          className={`${btnClass} bg-blue-600 text-white hover:bg-blue-700`}
          onClick={() => show('처리 중입니다...', 'bg-blue-700')}
        >
          정보
        </button>
      </div>
    </Toast.Provider>
  );
}

/** 긴 메시지 Toast */
export function LongMessageToast() {
  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider
      open={open}
      onOpenChange={setOpen}
      message="검색 결과를 불러오는 데 실패했습니다. 네트워크 연결을 확인하고 다시 시도해 주세요."
      styleClass={{
        root: 'bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm max-w-xs',
        viewport: 'fixed bottom-4 right-4 z-50 flex flex-col gap-2',
      }}
    >
      <button
        className={`${btnClass} bg-gray-800 text-white hover:bg-gray-700`}
        onClick={() => setOpen(true)}
      >
        긴 메시지 표시
      </button>
    </Toast.Provider>
  );
}
