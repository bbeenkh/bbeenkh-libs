import { Meta, StoryObj } from '@storybook/react';
import Checkbox from '.';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    disabled: {
      name: '비활성화',
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
    id: 'default-checkbox',
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

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <div>
      <p className="text-black mb-2">selected: [{selected.join(', ')}]</p>
      <div className="flex justify-start gap-2">
        <Checkbox
          id="option1"
          label="Option 1"
          checked={selected.includes('option1')}
          onCheckedChange={() => toggle('option1')}
        />
        <Checkbox
          id="option2"
          label="Option 2"
          checked={selected.includes('option2')}
          onCheckedChange={() => toggle('option2')}
        />
        <Checkbox
          id="option3"
          label="Option 3"
          checked={selected.includes('option3')}
          onCheckedChange={() => toggle('option3')}
        />
      </div>
    </div>
  );
};

export const CheckboxGroupWithHookForm = () => {
  const { control, watch } = useForm({
    defaultValues: { option1: false, option2: false, option3: false },
  });
  const values = watch();
  const selected = Object.entries(values)
    .filter(([, v]) => v)
    .map(([k]) => k);

  return (
    <div className="text-black">
      <h3 className="mb-1">React Hook Form Example</h3>
      <p className="mb-2">selected: [{selected.join(', ')}]</p>
      <div className="flex justify-start gap-2">
        {(['option1', 'option2', 'option3'] as const).map((name) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <Checkbox
                id={name}
                label={name.replace('option', 'Option ')}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        ))}
      </div>
    </div>
  );
};
