// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)

import { Meta, StoryObj } from '@storybook/react';
import Snackbar from '.';
import useSnackbarToast from '@/hooks/useSnackbarToast';
import { ToastContainer } from 'react-toastify';
import Button from '../Button';

const meta: Meta<typeof Snackbar> = {
  component: Snackbar,
  argTypes: {
    type: {
      name: 'type',
      description:
        'Snackbar 타입 (text: 텍스트만, action: 아이콘, 텍스트, close)',
      control: { type: 'radio' },
    },
    title: {
      name: 'title',
      description: 'Snackbar 제목, type이 action일 때만 사용됨',
      control: 'text',
    },
    desc: {
      name: 'desc',
      description: 'Snackbar 설명, type 상관없이 무조건 출력',
      control: 'text',
    },
    icon: {
      name: 'icon',
      description: 'Snackbar 아이콘, type이 action일 때만 나타남',
      control: { type: 'radio' },
    },
  },
  args: {
    type: 'text',
    title: 'Title',
    desc: 'Description',
  },
};
export default meta;

type Story = StoryObj<typeof Snackbar>;

/**
 * Snackbar는 일시적으로 사용자에게 전달해야 하는 간단한 메시지나 피드백을 제공하는 컴포넌트입니다.
 */
export const DefaultSnackbar: Story = {
  args: {
    type: 'text',
    title: 'Title',
    desc: 'Description',
    icon: 'success',
  },
};
/**
 * Snackbar + useSnackbarToast hook 연동 예시,
 * react-toastify props참고: https://fkhadra.github.io/react-toastify/api/toast-container
 */
export const SnackbarToast = () => {
  const { showToast } = useSnackbarToast();
  return (
    <div className="ods-w-full ods-h-[10em]">
      <ToastContainer
        toastStyle={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          width: '22em',
        }}
      />
      <Button
        size="xxs"
        onClick={() => {
          showToast(
            {
              title: 'Title',
              desc: 'Description',
              type: 'action',
              icon: 'success',
            },
            {},
          );
        }}
      >
        show toast
      </Button>
    </div>
  );
};
