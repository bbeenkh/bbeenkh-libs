import { Meta, StoryObj } from '@storybook/react';
import SwitchButton from '.';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const meta: Meta<typeof SwitchButton> = {
  title: 'Components/SwitchButton',
  component: SwitchButton,
  argTypes: {
    checked: {
      name: 'checked',
      control: 'boolean',
    },
    disabled: {
      name: '비활성화',
      control: 'boolean',
    },
    defaultChecked: {
      name: '초기값 (비제어)',
      control: 'boolean',
    },
  },
  args: {
    disabled: false,
    defaultChecked: false,
  },
};
export default meta;

type Story = StoryObj<typeof SwitchButton>;

/** 기본 스위치 (Controls 패널로 조작 가능) */
export const Default: Story = {};

/** 초기값 on */
export const DefaultChecked: Story = {
  args: { defaultChecked: true },
};

/** 비활성화 */
export const Disabled: Story = {
  args: { disabled: true },
};

/** 비활성화 + 켜진 상태 */
export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

/** 제어 컴포넌트 — 외부 상태와 연동 */
export const Controlled = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <SwitchButton checked={isOn} onCheckedChange={setIsOn} />
        <span className="text-sm text-gray-700">{isOn ? 'ON' : 'OFF'}</span>
      </div>
      <button
        className="text-xs text-blue-500 underline w-fit"
        onClick={() => setIsOn((v) => !v)}
      >
        외부에서 토글
      </button>
    </div>
  );
};

/** 커스텀 스타일 — 크기·색상 오버라이드 */
export const CustomStyle = () => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <SwitchButton
        defaultChecked
        styleClass={{
          root: 'w-14 h-8 data-[state=checked]:bg-blue-500',
          thumb: 'w-6 h-6 data-[state=checked]:translate-x-6',
        }}
      />
      <span className="text-xs text-gray-500">blue / large</span>
    </div>
    <div className="flex items-center gap-3">
      <SwitchButton
        defaultChecked
        styleClass={{
          root: 'w-8 h-4 data-[state=checked]:bg-green-500',
          thumb: 'w-3 h-3 data-[state=checked]:translate-x-4',
        }}
      />
      <span className="text-xs text-gray-500">green / small</span>
    </div>
  </div>
);

/** react-hook-form Controller 연동 예제 */
export const WithHookForm = () => {
  const { control, watch } = useForm({
    defaultValues: { notifications: false, darkMode: true },
  });
  const values = watch();

  return (
    <div className="flex flex-col gap-4 text-sm text-gray-700">
      <h3 className="font-medium">설정</h3>
      <div className="flex items-center justify-between w-48">
        <span>알림</span>
        <Controller
          name="notifications"
          control={control}
          render={({ field }) => (
            <SwitchButton checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </div>
      <div className="flex items-center justify-between w-48">
        <span>다크모드</span>
        <Controller
          name="darkMode"
          control={control}
          render={({ field }) => (
            <SwitchButton checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </div>
      <p className="text-xs text-gray-400 mt-2">
        값: {JSON.stringify(values)}
      </p>
    </div>
  );
};
