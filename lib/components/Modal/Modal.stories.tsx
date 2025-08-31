/* eslint-disable react/no-unescaped-entities */
import { Meta } from '@storybook/react';
import Modal from '.';
import Button from '../Button';
import useModal from '@/hooks/useModal';
import { useEffect } from 'react';

interface ModalProps {
  modalTitle?: string;
  absolute?: boolean;
  showHeader?: boolean;
  showBody?: boolean;
  showFooter?: boolean;
  children?: React.ReactNode;
  isOpen: boolean;
}

export const ModalSample = ({
  modalTitle = 'Modal Title',
  absolute,
  showHeader = true,
  showBody = true,
  showFooter = true,
  isOpen,
}: ModalProps) => {
  const { openModal, closeModal, ModalView } = useModal();

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen]);

  return (
    <div className="ods-flex ods-items-center ods-justify-center ods-bg-black">
      <ModalView className="ods-w-[500px] ods-h-[500px]">
        <Modal>
          {showHeader && (
            <Modal.Header>
              <Modal.Title>{modalTitle}</Modal.Title>
              <Modal.CloseButton onClick={closeModal} />
            </Modal.Header>
          )}
          {showBody && (
            <Modal.Body>
              <p>==== START ====</p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p>==== END ====</p>
            </Modal.Body>
          )}
          {showFooter && (
            <Modal.Footer>
              <div className="ods-w-full ods-flex ods-justify-end ods-items-end ods-gap-xs">
                <Button size="md" onClick={closeModal}>
                  확인
                </Button>
                <Button size="md" onClick={closeModal}>
                  취소
                </Button>
              </div>
            </Modal.Footer>
          )}
          {absolute && (
            <Modal absolute className="ods-bg-gray-200">
              <p>Absolute modal</p>
            </Modal>
          )}
        </Modal>
      </ModalView>
    </div>
  );
};

const meta: Meta<typeof ModalSample> = {
  component: ModalSample,
  argTypes: {
    isOpen: {
      name: '모달창 열림 여부',
      control: 'boolean',
    },
    absolute: {
      name: 'absolute',
      description: 'true설정한 경우 모달창 위에 뜨는 모달창으로 사용 가능',
      control: 'boolean',
    },
    showHeader: {
      name: 'showHeader',
      description: '헤더 영역 노출 여부',
      control: 'boolean',
    },
    showBody: {
      name: 'showBody',
      description: '몸체 영역 노출 여부',
      control: 'boolean',
    },
    showFooter: {
      name: 'showFooter',
      description: '풋터 영역 노출 여부',
      control: 'boolean',
    },
    modalTitle: {
      name: 'modalTitle',
      description: '모달 타이틀',
      control: 'text',
    },
  },
};

export default meta;
