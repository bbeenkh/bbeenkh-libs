import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Modal from '.';
import Button from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'lg', 'xl'],
      description: '모달 너비 (md: 600px, lg: 900px, xl: 1200px)',
    },
    hideCloseButton: {
      control: 'boolean',
      description: '우상단 닫기 버튼 숨김',
    },
    preventOutsideClose: {
      control: 'boolean',
      description: 'true 시 외부 클릭·Escape로 닫히지 않음',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

/** 기본 — 제목 + 본문 + 푸터 */
export const Default: Story = {
  render: (args) => (
    <Modal
      {...args}
      triggerUI={
        <Button styleClass={{ root: 'px-4 py-2 bg-gray-900 text-white rounded-lg text-sm' }}>
          모달 열기
        </Button>
      }
    >
      <Modal.Header>
        <Modal.Title>모달 제목</Modal.Title>
        <Modal.Description>모달에 대한 부가 설명을 여기에 작성합니다.</Modal.Description>
      </Modal.Header>
      <Modal.Body>
        <p className="text-sm text-gray-700">모달 본문 내용입니다.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button styleClass={{ root: 'px-4 py-2 border border-gray-300 rounded-lg text-sm' }}>
          취소
        </Button>
        <Button styleClass={{ root: 'px-4 py-2 bg-gray-900 text-white rounded-lg text-sm' }}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  ),
  args: { size: 'md' },
};

/** 사이즈 — lg (900px) */
export const LargeSize: Story = {
  render: (args) => (
    <Modal
      {...args}
      triggerUI={
        <Button styleClass={{ root: 'px-4 py-2 bg-gray-900 text-white rounded-lg text-sm' }}>
          큰 모달 열기
        </Button>
      }
    >
      <Modal.Header>
        <Modal.Title>넓은 모달</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-sm text-gray-700">size="lg"로 지정된 모달입니다 (900px).</p>
      </Modal.Body>
    </Modal>
  ),
  args: { size: 'lg' },
};

/** 닫기 버튼 숨김 — 푸터 버튼으로만 닫기 */
export const HideCloseButton: Story = {
  render: (args) => (
    <Modal
      {...args}
      triggerUI={
        <Button styleClass={{ root: 'px-4 py-2 bg-gray-900 text-white rounded-lg text-sm' }}>
          열기
        </Button>
      }
    >
      <Modal.Header>
        <Modal.Title>닫기 버튼 없음</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-sm text-gray-700">푸터의 버튼으로만 닫을 수 있습니다.</p>
      </Modal.Body>
      <Modal.Footer>
        <Dialog.Close asChild>
          <Button styleClass={{ root: 'px-4 py-2 bg-gray-900 text-white rounded-lg text-sm' }}>
            닫기
          </Button>
        </Dialog.Close>
      </Modal.Footer>
    </Modal>
  ),
  args: { hideCloseButton: true },
};

/** 외부 클릭 닫힘 방지 */
export const PreventOutsideClose: Story = {
  render: (args) => (
    <Modal
      {...args}
      triggerUI={
        <Button styleClass={{ root: 'px-4 py-2 bg-gray-900 text-white rounded-lg text-sm' }}>
          열기
        </Button>
      }
    >
      <Modal.Header>
        <Modal.Title>외부 클릭 방지</Modal.Title>
        <Modal.Description>overlay 클릭 또는 Escape 키로 닫히지 않습니다.</Modal.Description>
      </Modal.Header>
      <Modal.Body>
        <p className="text-sm text-gray-700">닫기 버튼(×)으로만 닫을 수 있습니다.</p>
      </Modal.Body>
    </Modal>
  ),
  args: { preventOutsideClose: true },
};

/** 제어 모드 (open / onOpenChange) */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <Button
          styleClass={{ root: 'px-4 py-2 bg-gray-900 text-white rounded-lg text-sm w-fit' }}
          onClick={() => setOpen(true)}
        >
          외부에서 열기
        </Button>
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Header>
            <Modal.Title>제어 모드 모달</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-sm text-gray-700">open 상태: {String(open)}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              styleClass={{ root: 'px-4 py-2 bg-gray-900 text-white rounded-lg text-sm' }}
              onClick={() => setOpen(false)}
            >
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};
