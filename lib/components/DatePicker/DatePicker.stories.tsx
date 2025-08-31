import { Meta, StoryObj } from '@storybook/react';
import DatePicker, { IDatePickerProps } from '.';
import { useState } from 'react';
import { today } from '@/utils/date';

/** Example */
const ExampleDatePicker = ({ ...props }: IDatePickerProps) => {
  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(today);

  return (
    <div className="h-[300px]">
      <DatePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        disabled={props.disabled}
        range={props.range}
        minDate={props.minDate}
        maxDate={props.maxDate}
      />
    </div>
  );
};

const meta: Meta<typeof ExampleDatePicker> = {
  component: ExampleDatePicker,
  argTypes: {
    disabled: {
      name: '비활성화',
      control: 'boolean',
      description: '인풋의 비활성화 여부',
    },
    range: {
      name: '범위선택',
      control: 'boolean',
      description: '날짜 범위선택 여부',
    },
    minDate: {
      name: '최소일자',
      control: 'date',
      description: '최소일자 이전은 선택 불가능',
    },
    maxDate: {
      name: '최대일자',
      control: 'date',
      description: '최대일자 이후는 선택 불가능',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ExampleDatePicker>;

export const DefaultDatePicker: Story = {
  args: {
    disabled: false,
    range: false,
  },
};
