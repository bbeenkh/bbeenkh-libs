// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)

import { Meta } from '@storybook/react';
import { Dropdown, MultipleSelectDropdown } from '.';
import { useState } from 'react';

const selectOptions = [
  {
    value: 1,
    label: 'One',
  },
  {
    value: 2,
    label: 'Two',
  },
  {
    value: 3,
    label: 'Three',
  },
  {
    value: 4,
    label: 'Four',
  },
  {
    value: 5,
    label: 'Five',
  },
];

export const DefaultDropdown = ({ ...props }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <Dropdown
        className="ods-w-72"
        options={selectOptions}
        label="Label"
        value={selected}
        onChange={setSelected}
        {...props}
      />
    </div>
  );
};

export const DefaultMultipleDropdown = ({ ...props }) => {
  const [selected, setSelected] = useState<number[]>([]);

  return (
    <>
      <MultipleSelectDropdown
        className="ods-w-72"
        options={selectOptions}
        label="Label"
        value={selected}
        onChange={setSelected}
        {...props}
      />
    </>
  );
};

export const DisabledDropdown = ({ ...props }) => {
  const [selected, setSelected] = useState(0);
  return (
    <div>
      <Dropdown
        className="ods-w-72"
        options={selectOptions}
        label="Label"
        value={selected}
        onChange={setSelected}
        disabled
        {...props}
      />
    </div>
  );
};

export const DisabledMultipleDropdown = ({ ...props }) => {
  const [selected, setSelected] = useState<number[]>([]);
  return (
    <MultipleSelectDropdown
      className="ods-w-72"
      options={selectOptions}
      label="Label"
      value={selected}
      onChange={setSelected}
      disabled
      {...props}
    />
  );
};

/**
 * Drop Down은 사용자에게 허용된 선택 옵션만 제공하여 사용자가 데이터를 잘못 입력하는 것을 방지해 주는 요소입니다.
 * 선택 시 사용자가 하나의 옵션 또는 여러 옵션을 선택할 수 있는 목록을 제공합니다.
 *
 * - Option.value의 타입을 제네릭으로 받아서 사용합니다.
 */
const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  argTypes: {
    options: {
      name: 'options',
      description: 'Dropdown 옵션',
      control: 'object',
    },
    label: {
      name: 'label',
      description: 'Dropdown 라벨',
      control: 'text',
    },
    value: {
      name: '선택된 값',
      description: 'onChange를 통해 갱신된 현재 선택된  값',
      control: 'object',
    },
    onChange: {
      name: '변경 이벤트',
      description:
        'options 목록 선택시마다 호출되는 함수, value값 초기화에 사용됨',
      control: 'function',
    },
    disabled: {
      name: 'disabled',
      description: '비활성화 여부',
      control: 'boolean',
    },
  },
};
export default meta;
