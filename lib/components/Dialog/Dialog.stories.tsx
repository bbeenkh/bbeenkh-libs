import { Meta } from '@storybook/react';
import Dialog, {
  closeExternalDialog,
  IDialogProps,
  openExternalDialog,
  useDialog,
} from '.';
import { useEffect, useRef } from 'react';

interface IProps extends IDialogProps {
  isOpen: boolean;
}

class Ins {
  run() {
    openExternalDialog({
      type: 'alert',
      title: 'External modal',
      description: 'External modal open',
      onOk: () => {
        closeExternalDialog();
      },
    });
  }
}

/**
 * - openDialog 예시
 * ```
  openDialog({
    type: 'alert',
    title: '타이틀',
    description: '메시지',
    onOk: () => {
      console.log('ok');
      closeDialog();
    },
    onCancel: () => {
      console.log('cancel');
      closeDialog();
    },
    ...props,
  });
 * ```
 */
export const DefaultDialog = ({ isOpen, ...props }: IProps) => {
  const { openDialog, closeDialog } = useDialog();
  const $ins = useRef<Ins>(new Ins());

  useEffect(() => {
    if (isOpen) {
      openDialog({
        type: 'alert',
        onOk: () => {
          console.log('ok');
          closeDialog();
        },
        onCancel: () => {
          console.log('cancel');
          closeDialog();
        },
        ...props,
      });
    } else {
      closeDialog();
    }
  }, [isOpen]);
  return (
    <div>
      <button
        onClick={() => {
          $ins.current.run();
        }}
      >
        external open
      </button>
    </div>
  );
};

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  argTypes: {
    isOpen: {
      name: '모달 열기/닫기',
      description: '',
      control: 'boolean',
    },
    type: {
      name: 'type',
      description: 'Dialog 타입, alert: 확인만, confirm: 확인/취소',
      // alert confirm 선택
      control: { type: 'select' },
      options: ['alert', 'confirm'],
    },
    title: {
      name: 'title',
      description: 'Dialog 제목',
      control: 'text',
      default: '타이틀',
    },
    description: {
      name: 'description',
      description: 'Dialog 메시지',
      control: 'text',
      default: '메세지',
    },
    okLabel: {
      name: 'okLabel',
      description: 'Dialog 확인 버튼 텍스트',
      control: 'text',
    },
    cancelLabel: {
      name: 'cancelLabel',
      description: 'Dialog 취소 버튼 텍스트',
      control: 'text',
    },
  },
};
export default meta;

type Story = typeof Dialog;
