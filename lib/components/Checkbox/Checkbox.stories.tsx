// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)

import { Meta, StoryObj } from '@storybook/react';
import Checkbox from '.';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
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
    label: 'Value',
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const DefaultCheckbox: Story = {};

export const CheckboxGroup = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const onChange = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((option) => option !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <div>
      <p className="text-black">selected: {selected}</p>
      {/* Wrap CheckboxGroup component in a div */}
      <div className="flex justify-start gap-2">
        <Checkbox
          id="option1"
          label="Option 1"
          checked={selected.includes('option1')}
          onChange={() => onChange('option1')}
        />
        <Checkbox
          id="option2"
          label="Option 2"
          checked={selected.includes('option2')}
          onChange={() => onChange('option2')}
        />
        <Checkbox
          id="option3"
          label="Option 3"
          checked={selected.includes('option3')}
          onChange={() => onChange('option3')}
        />
      </div>
    </div>
  );
};

export const CheckboxGroupWithHookForm = () => {
  const { register, watch } = useForm({
    defaultValues: {
      checkboxGroup: [],
    },
  });
  const selected = watch('checkboxGroup') || [];
  return (
    <div className="text-black">
      <h3>React Hook Form Example</h3>
      <p className="text-black">selected: {selected}</p>
      <div className="flex justify-start gap-2">
        <Checkbox
          id="option1"
          label="Option 1"
          value="option1"
          {...register('checkboxGroup')}
        />
        <Checkbox
          id="option2"
          label="Option 2"
          value="option2"
          {...register('checkboxGroup')}
        />
        <Checkbox
          id="option3"
          label="Option 3"
          value="option3"
          {...register('checkboxGroup')}
        />
      </div>
    </div>
  );
};
