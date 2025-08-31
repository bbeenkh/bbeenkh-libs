// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)

import { Meta, StoryObj } from '@storybook/react';
import RadioButton from '.';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const meta: Meta<typeof RadioButton> = {
  component: RadioButton,
  argTypes: {
    disabled: {
      name: '활성화',
      control: 'boolean',
    },
    checked: {
      name: '선택/선택 해제',
      control: 'boolean',
    },
    label: {
      name: '라벨',
      control: 'text',
    },
  },
  args: {
    disabled: false,
    checked: false,
    label: 'Label',
  },
};
export default meta;

type Story = StoryObj<typeof RadioButton>;

export const DefaultRadioButton: Story = {};

/**
 * radio button group 예제
 * @returns
 */
export const RadioButtonGroup = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleRadioButtonChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="ods-w-full ods-flex ods-flex-col">
      <h3 className="ods-text-black">value: {selectedValue}</h3>
      <div className="ods-w-full ods-flex ods-justify-start ods-gap-3">
        <RadioButton
          id="option1"
          checked={selectedValue === 'option1'}
          onChange={() => handleRadioButtonChange('option1')}
          label="Option 1"
        />
        <RadioButton
          id="option2"
          checked={selectedValue === 'option2'}
          onChange={() => handleRadioButtonChange('option2')}
          label="Option 2"
        />
        <RadioButton
          id="option3"
          checked={selectedValue === 'option3'}
          onChange={() => handleRadioButtonChange('option3')}
          label="Option 3"
        />
      </div>
    </div>
  );
};

/**
 * radio button group with react-hook-form 예제
 * @returns
 */
export const RadioButtonGroupWithHookForm = () => {
  const { register, watch } = useForm();
  const selectedValue = watch('radioGroup');

  return (
    <div className="ods-w-full ods-flex ods-flex-col">
      <h3 className="ods-text-black">value: {selectedValue}</h3>
      <div className="ods-w-full ods-flex ods-justify-start ods-gap-3">
        <RadioButton
          id="option1"
          {...register('radioGroup')}
          value="option1"
          label="Option 1"
        />
        <RadioButton
          id="option2"
          {...register('radioGroup')}
          value="option2"
          label="Option 2"
        />
        <RadioButton
          id="option3"
          {...register('radioGroup')}
          value="option3"
          label="Option 3"
        />
      </div>
    </div>
  );
};
