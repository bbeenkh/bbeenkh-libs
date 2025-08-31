import { Meta, StoryObj } from '@storybook/react';
import Input from '.';
import { ChangeEvent, useState, useEffect } from 'react';
import Button from '../Button';
import { ArrowRotateRightSolid } from '../Icons';
import RadioButton from '../RadioButton';
import Checkbox from '../Checkbox';
import { twMerge } from 'tailwind-merge';
import DatePicker from '../DatePicker';
import { today } from '@/utils/date';
import { useForm } from 'react-hook-form';

const meta: Meta<typeof Input> = {
  component: Input,
  argTypes: {
    value: {
      name: '입력',
      control: 'text',
      description: '이곳에 입력해야 input에 입력된 것으로 인식됩니다. -->',
    },
    label: {
      name: '라벨',
      control: 'text',
      description: '왼쪽에 표시할 라벨 내용',
    },
    labelWidth: {
      name: '라벨 넓이',
      constrol: 'text',
      description: '라벨의 width 지정 (ex. 100px)',
    },
    placeholder: {
      name: 'placeholder',
      control: 'text',
      description: 'input 예시 입력',
    },
    helperText: {
      name: '하단 텍스트',
      control: 'text',
      description: 'input 하단에 노출될 텍스트',
    },
    type: {
      name: '타입',
      control: { type: 'select' },
      options: ['password', 'text', 'number'],
      description: 'input의 타입 지정',
    },
    disabled: {
      name: '비활성화',
      control: 'boolean',
      description: 'input 비활성화 여부',
    },
    clearable: {
      name: 'clearable',
      description: 'input 입력 시 clear 버튼',
      acction: 'clicked',
    },
    prefixNode: {
      name: '접두사',
      control: 'text',
      description: 'input 앞 쪽에 노출될 내용 (이곳에서는 문자열만 가능)',
    },
    suffixNode: {
      name: '접미사',
      control: 'text',
      description: 'input 뒤 쪽에 노출될 내용 (이곳에서는 문자열만 가능)',
    },
    inputNode: {
      name: 'input helper',
      control: 'text',
      description: '접미사 앞에 노출될 내용 (이곳에서는 문자열만 가능)',
    },
    isRequire: {
      name: '필수 상태',
      control: 'boolean',
      description: '필수 상태 표시 여부',
    },
    error: {
      name: '입력 오류',
      control: 'boolean',
      description: '입력 오류 표시 여부',
    },
    success: {
      name: '입력 성공',
      control: 'boolean',
      description: '입력 성공 표시 여부',
    },
    useShowPassword: {
      name: '패스워드 노출',
      control: 'boolean',
      description: '패스워드 입력시 노출 여부',
    },
    useCalendar: {
      name: '달력 사용',
      control: 'boolean',
      description: 'input을 DatePicker input으로 사용 가능',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const DefaultInput: Story = {
  args: {
    value: '',
    label: 'Label',
    labelWidth: '50px',
    isRequire: true,
    placeholder: 'I am input',
    helperText: 'hepler text 예시입니다.',
    type: 'text',
    disabled: false,
    clearable: (e) => alert('clear 버튼 클릭'),
    prefixNode: '',
    suffixNode: '',
    inputNode: '',
    error: false,
    success: false,
    useShowPassword: false,
    useCalendar: false,
  },
};

/** 사용 별 예시 ▼ */
export const Example = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [radioValue, setRadioValue] = useState<string>('icon');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(today);

  const [timer, setTimer] = useState(9999);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValue(value);
  };

  const onClickClearBtn = () => {
    setInputValue('');
  };

  const handleRadioButtonChange = (value: string) => {
    setRadioValue(value);
  };

  const checkDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const onClickSuccessBtn = () => {
    setIsSuccess(!isSuccess);
  };

  const onClickErrorBtn = () => {
    setIsError(!isError);
  };

  const onClickTimerResetBtn = () => {
    setTimer(9999);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Checkbox
        className="ods-mb-lg"
        id="disabled"
        label="disabled"
        checked={isDisabled}
        onChange={checkDisabled}
      />
      <div className="ods-mb-lg">
        <p className="ods-mb-sm ods-text-title3">default</p>
        <Input
          value={inputValue}
          onChange={onChangeValue}
          disabled={isDisabled}
        />
      </div>

      <div className="ods-mb-lg">
        <p className="ods-mb-sm ods-text-title3">clearable</p>
        <Input
          value={inputValue}
          onChange={onChangeValue}
          clearable={onClickClearBtn}
          disabled={isDisabled}
        />
      </div>

      <div className="ods-mb-lg">
        <p className="ods-mb-sm ods-text-title3">date picker</p>
        <DatePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          disabled={isDisabled}
        />
      </div>

      <div className="ods-mb-lg">
        <p className="ods-mb-sm ods-text-title3">with button</p>
        <div className="ods-w-full ods-flex ods-justify-start ods-gap-3 ods-mb-sm">
          <RadioButton
            id="icon"
            checked={radioValue === 'icon'}
            onChange={() => handleRadioButtonChange('icon')}
            label="icon"
          />
          <RadioButton
            id="button"
            checked={radioValue === 'button'}
            onChange={() => handleRadioButtonChange('button')}
            label="button"
          />
        </div>
        <Input
          value={inputValue}
          onChange={onChangeValue}
          clearable={onClickClearBtn}
          suffixNode={
            radioValue === 'icon' ? (
              <ArrowRotateRightSolid
                className={twMerge(
                  isDisabled
                    ? 'ods-fill-gray-200 ods-pointer-events-none'
                    : 'ods-fill-gray-500 ods-cursor-pointer',
                )}
                onClick={() => alert('아이콘 클릭')}
              />
            ) : (
              <Button
                size="sm"
                onClick={() => alert('버튼 클릭')}
                disabled={isDisabled}
              >
                Click!
              </Button>
            )
          }
          disabled={isDisabled}
        />
      </div>

      <div className="ods-mb-lg">
        <p className="ods-mb-sm ods-text-title3">password</p>
        <Input
          type="password"
          value={inputValue}
          onChange={onChangeValue}
          useShowPassword
          disabled={isDisabled}
        />
      </div>

      <div className="ods-mb-lg">
        <p className="ods-mb-sm ods-text-title3">with label</p>
        <Input
          value={inputValue}
          onChange={onChangeValue}
          label="With Label"
          labelWidth="6em"
          disabled={isDisabled}
        />
      </div>

      <div className="ods-mb-lg">
        <p className="ods-mb-sm ods-text-title3">timer</p>
        <Input
          value={inputValue}
          onChange={onChangeValue}
          disabled={isDisabled}
          label="인증번호"
          isRequire
          labelWidth="6em"
          inputNode={<span className="ods-text-state-danger">{timer}</span>}
          suffixNode={
            <Button
              size="xs"
              onClick={onClickTimerResetBtn}
              disabled={isDisabled}
            >
              초기화
            </Button>
          }
        />
      </div>

      <div className="ods-mb-lg">
        <p className="ods-mb-sm ods-text-title3">success</p>
        <Input
          value={inputValue}
          clearable={onClickClearBtn}
          onChange={onChangeValue}
          label="청소년 언제나 할인"
          labelWidth="6em"
          isRequire
          disabled={isDisabled}
          success={isSuccess}
          helperText={isSuccess ? '멋진 아이디군요!' : ''}
          suffixNode={
            <Button
              size="xs"
              onClick={onClickSuccessBtn}
              disabled={isDisabled || !inputValue}
            >
              확인
            </Button>
          }
        />
      </div>

      <div className="ods-mb-lg">
        <p className="ods-mb-sm ods-text-title3">error</p>
        <Input
          value={inputValue}
          clearable={onClickClearBtn}
          onChange={onChangeValue}
          label="아이디"
          labelWidth="6em"
          isRequire
          disabled={isDisabled}
          error={isError}
          helperText={isError ? '누군가 이미 사용 하고있어요!' : ''}
          suffixNode={
            <Button
              size="xs"
              onClick={onClickErrorBtn}
              disabled={isDisabled || !inputValue}
            >
              확인
            </Button>
          }
        />
      </div>
    </>
  );
};

/**
 * react hook form 연동 예제
 */
export const InputWithReactHookForm = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      value: '',
    },
  });

  const onSubmit = (data: any) => {
    alert('VALUE: ' + data.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ods-flex ods-gap-sm">
      <Input {...register('value')} />
      <Button size="lg" type="submit">
        Submit
      </Button>
    </form>
  );
};
