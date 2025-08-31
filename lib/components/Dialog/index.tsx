import useModal from '@/hooks/useModal';
import React, { useEffect } from 'react';
import { atom, createStore, Provider, useAtom, useAtomValue } from 'jotai';
import Modal from '../Modal';
import Button from '../Button';

/**
 * alert dialog 속성
 * @interface
 * @property {string} type - alert type (alert: 확인만, confirm: 확인/취소)
 * @property {string} title - 제목
 * @property {string} description - 내용
 * @property {() => void} onOk - 확인 버튼 event function
 * @property {() => void} onCancel - 취소 버튼 event function
 */
export interface IDialogProps {
  type?: 'alert' | 'confirm';
  title: string;
  description?: React.ReactNode | string;
  children?: React.ReactNode;
  okLabel?: string;
  onOk?: () => void;
  cancelLabel?: string;
  onCancel?: () => void;
}

const defaultDialogProps: IDialogProps = {
  type: 'alert',
  title: '',
  description: '',
  okLabel: '확인',
  onOk: () => {},
  cancelLabel: '취소',
  onCancel: () => {},
};

const dialogModalAtom = atom<{
  isOpen: boolean;
  dialogProps: IDialogProps;
}>({
  isOpen: false,
  dialogProps: defaultDialogProps,
});

export const dialogStore = createStore();

/**
 * react 환경 외부에서 dialog 열기
 * - props: dialog Props
 */
export const openExternalDialog = (props: IDialogProps) => {
  dialogStore.set(dialogModalAtom, {
    isOpen: true,
    dialogProps: {
      ...defaultDialogProps,
      ...props,
    },
  });
};

/**
 * react 환경 외부에서 dialog 닫기
 */
export const closeExternalDialog = () => {
  dialogStore.set(dialogModalAtom, {
    isOpen: false,
    dialogProps: defaultDialogProps,
  });
};

/**
 * Dialog modal open/close hook
 * dialog 사용시 사용
 * @returns openDialog: dialog open 함수
 * @returns closeDialog: dialog close 함수
 *
 * @example
 * ```
 * const { openDialog, closeDialog } = useDialog();
 * openDialog({
 * ..
 * });
 */
export function useDialog() {
  const [dialogModal, setdialogModal] = useAtom(dialogModalAtom);

  const openDialog = (dialogProps: IDialogProps) => {
    setdialogModal({
      ...dialogModal,
      isOpen: true,
      dialogProps,
    });
  };

  const closeDialog = () => {
    setdialogModal({
      ...dialogModal,
      isOpen: false,
      dialogProps: { ...defaultDialogProps },
    });
  };

  return {
    openDialog,
    closeDialog,
  };
}

/**
 * Dialog provider
 * - 최상단에 위치시켜 사용할 것
 */
export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={dialogStore}>
      {children}
      <Dialog />
    </Provider>
  );
};

/**
 * Dialog component
 */
export default function Dialog() {
  const { openModal, closeModal, ModalView } = useModal();
  const dialogModal = useAtomValue(dialogModalAtom);

  useEffect(() => {
    dialogModal.isOpen ? openModal() : closeModal();
  }, [dialogModal]);

  const { type, title, description, onOk, onCancel, okLabel, cancelLabel } =
    dialogModal.dialogProps;

  return (
    <ModalView rounded>
      <Modal className="ods-min-w-[31.25rem] ods-h-auto ods-rounded-lg ods-p-md">
        <Modal.Header className="!ods-mb-4">
          <Modal.Title className="ods-text-xl">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ods-gap-xl">
          {description && <p className="ods-text-gray-700">{description}</p>}
          <div className="ods-w-full ods-flex ods-justify-end ods-gap-xs">
            {type === 'confirm' && (
              <Button size="xs" usageType="line" onClick={onCancel}>
                {cancelLabel || '취소'}
              </Button>
            )}
            <Button size="xs" onClick={onOk}>
              {okLabel || '확인'}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </ModalView>
  );
}
