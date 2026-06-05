import { Meta, StoryObj } from '@storybook/react';
import RadioButton from '.';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const meta: Meta<typeof RadioButton.Item> = {
  title: 'Components/RadioButton',
  component: RadioButton.Item,
  argTypes: {
    disabled: {
      name: '비활성화',
      control: 'boolean',
    },
    label: {
      name: '라벨',
      control: 'text',
    },
  },
  args: {
    value: 'default',
    disabled: false,
    label: 'Label',
  },
  decorators: [
    (Story) => (
      <RadioButton.Group defaultValue="default">
        <Story />
      </RadioButton.Group>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof RadioButton.Item>;

export const DefaultRadioButton: Story = {};

/**
 * RadioButton.Group + RadioButton.Item 기본 예제
 */
export const RadioButtonGroup = () => {
  const [selected, setSelected] = useState('');

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-black">value: {selected || '(없음)'}</p>
      <RadioButton.Group
        value={selected}
        onValueChange={setSelected}
        className="flex flex-row gap-3"
      >
        <RadioButton.Item value="option1" id="option1" label="Option 1" />
        <RadioButton.Item value="option2" id="option2" label="Option 2" />
        <RadioButton.Item value="option3" id="option3" label="Option 3" />
        <RadioButton.Item value="option4" id="option4" label="비활성" disabled />
      </RadioButton.Group>
    </div>
  );
};

/**
 * react-hook-form Controller 연동 예제
 */
export const RadioButtonGroupWithHookForm = () => {
  const { control, watch } = useForm({ defaultValues: { radioGroup: '' } });
  const selected = watch('radioGroup');

  return (
    <div className="w-full flex flex-col gap-2">
      <h3 className="text-black">React Hook Form Example</h3>
      <p className="text-black">value: {selected || '(없음)'}</p>
      <Controller
        name="radioGroup"
        control={control}
        render={({ field }) => (
          <RadioButton.Group
            value={field.value}
            onValueChange={field.onChange}
            className="flex flex-row gap-3"
          >
            <RadioButton.Item value="option1" id="rhf-option1" label="Option 1" />
            <RadioButton.Item value="option2" id="rhf-option2" label="Option 2" />
            <RadioButton.Item value="option3" id="rhf-option3" label="Option 3" />
          </RadioButton.Group>
        )}
      />
    </div>
  );
};
