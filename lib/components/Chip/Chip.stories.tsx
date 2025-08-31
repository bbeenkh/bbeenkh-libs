// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)

import { Meta, StoryObj } from '@storybook/react';
import Chip from '.';
import { useState } from 'react';

const meta: Meta<typeof Chip> = {
  component: Chip,
  argTypes: {
    children: {
      name: '텍스트',
      control: 'text',
    },
    selected: {
      name: '선택 여부',
      control: 'boolean',
    },
    variant: {
      name: '칩 스타일',
      control: { type: 'radio' },
    },
    icon: {
      name: '아이콘',
      control: { type: 'radio' },
      options: ['check', null], // Select between 'check' and 'plus'
    },
  },
  args: {
    children: 'Click me',
    variant: 'filled',
    selected: false,
  },
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const DefaultChip: Story = {
  args: {
    selected: false,
    variant: 'filled',
  },
};

/**
 * 단일 선택
 */
export const SingleSelectChipList = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex gap-4">
      <Chip
        selected={selected === 'chip1'}
        onClick={() => setSelected('chip1')}
      >
        Chip 1
      </Chip>
      <Chip
        selected={selected === 'chip2'}
        onClick={() => setSelected('chip2')}
      >
        Chip 2
      </Chip>
      <Chip
        selected={selected === 'chip3'}
        onClick={() => setSelected('chip3')}
      >
        Chip 3
      </Chip>
    </div>
  );
};

/**
 * 복수 선택
 */
export const MultipleSelectChipList = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const onSelect = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <div className="flex gap-4">
      <Chip
        selected={selected.includes('chip1')}
        onClick={() => onSelect('chip1')}
        icon="check"
      >
        Chip 1
      </Chip>
      <Chip
        selected={selected.includes('chip2')}
        onClick={() => onSelect('chip2')}
        icon="check"
      >
        Chip 2
      </Chip>
      <Chip
        selected={selected.includes('chip3')}
        onClick={() => onSelect('chip3')}
        icon="check"
      >
        Chip 3
      </Chip>
    </div>
  );
};
