/**
 * @file: DatePicker/index.tsx
 * @author: chad / chad@imnotpizzalib.com
 * @since: 2024.06.24 ~
 * @description: 달력 컴포넌트
 */

import '@/index.css';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import ReactDatePicker, {
  DatePickerProps,
  registerLocale,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from '../Input';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { today, formatedDate } from '@/utils/date';
import ko from 'date-fns/locale/ko';
import { twMerge } from 'tailwind-merge';

import {
  AnglesLeftSolid,
  ChevronLeftSolid,
  ChevronRightSolid,
  AnglesRightSolid,
} from '../Icons';

export interface IDatePickerProps {
  startDate: Date;
  endDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>> | ((date: Date) => void);
  setEndDate: Dispatch<SetStateAction<Date>> | ((date: Date) => void);
  disabled?: boolean;
  range?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

registerLocale('ko', ko as any);

/**
 * 달력 컴포넌트
 * @param {Date} startDate 시작 날짜
 * @param {Date} endDate 끝 날짜
 * @param {function} setStartDate 시작 날짜 변경 함수 (useState)
 * @param {function} setEndDate 끝 날짜 변경 함수 (useState)
 * @param {boolean} disabled 비활성화
 * @param {boolean} range 범위 선택
 * @param {Date} minDate 최소일자
 * @param {Date} maxDate 최대일자
 * @param {string} className css class
 */
export default function DatePicker({
  startDate = today,
  endDate = today,
  setStartDate,
  setEndDate,
  className,
  ...props
}: IDatePickerProps) {
  const outside = useRef<HTMLDivElement>(null);

  /** input에 보여줄 단일 날짜 */
  const [showDate, setShowDate] = useState<string>(formatedDate(startDate));
  /** input에 보여줄 범위 날짜 */
  const [showRangeDate, setShowRangeDate] = useState<string>(
    `${formatedDate(startDate)} ~ ${formatedDate(endDate)}`,
  );

  /** 달력 노출 여부 */
  const [isShowDatePicker, setIsShowDatePicker] = useState<boolean>(false);

  /** 날짜 선택(변경) 시 */
  useEffect(() => {
    props.range
      ? setShowRangeDate(
          `${formatedDate(startDate)} ~ ${formatedDate(endDate ?? startDate)}`,
        )
      : setShowDate(formatedDate(startDate));
  }, [startDate, endDate]);

  /** input 클릭 */
  const hanldeInputClick = () => {
    setIsShowDatePicker(!isShowDatePicker);
  };

  /** 날짜 단일 선택 */
  const handleSelectedChange = (date: Date | any) => {
    setIsShowDatePicker(!isShowDatePicker);
    setStartDate(date);
  };

  /** 날짜 범위 선택 */
  const handleRangeChange = (date: Date[] | any) => {
    if (!date) return;

    const [start, end] = date;
    setStartDate(start);
    setEndDate(end);

    if (end) setIsShowDatePicker(false);
  };

  const ArrowClassName = 'ods-fill-gray-500 ods-w-[1.56em] ods-h-[1.56em]';

  /** 외부 영역 클릭 시 달력 닫기 */
  const clickOutside = (e: MouseEvent) => {
    const { target } = e;

    if (
      isShowDatePicker &&
      outside.current &&
      !outside.current.contains(target as Node)
    ) {
      setIsShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', (e) => clickOutside(e));
  }, [isShowDatePicker]);

  return (
    <div className={twMerge('ods-relative', className)} ref={outside}>
      <Input
        useCalendar
        value={props.range ? showRangeDate : showDate}
        disabled={props.disabled}
        onClickCalendarBtn={hanldeInputClick}
      />
      {isShowDatePicker && (
        <StyledReactDatePicker
          range={props.range}
          sameDate={formatedDate(startDate) === formatedDate(endDate)}
        >
          <ReactDatePicker
            selectsMultiple={undefined}
            calendarClassName="ods-shadow-lg"
            locale="ko"
            selected={startDate}
            inline
            startDate={props.range ? startDate : undefined}
            endDate={props.range ? endDate : undefined}
            selectsRange={props.range ? true : undefined}
            monthsShown={props.range ? 2 : 1}
            minDate={props.minDate}
            maxDate={props.maxDate}
            onChange={props.range ? handleRangeChange : handleSelectedChange}
            renderCustomHeader={({
              customHeaderCount,
              monthDate,
              decreaseMonth,
              increaseMonth,
              decreaseYear,
              increaseYear,
            }) => (
              <div className="ods-flex ods-items-center ods-justify-between ods-px-md">
                <div className="ods-text-[1.1em] ods-font-bold">
                  {dayjs(monthDate).get('year')}년{' '}
                  {dayjs(monthDate).get('month') + 1}월
                </div>
                <div
                  className={twMerge(
                    'ods-flex ods-gap-xs',
                    props.range && customHeaderCount < 1
                      ? 'ods-invisible'
                      : null,
                  )}
                >
                  <div className="ods-flex ods-gap-xxs">
                    <button onClick={decreaseYear}>
                      <AnglesLeftSolid className={ArrowClassName} />
                    </button>
                    <button onClick={decreaseMonth}>
                      <ChevronLeftSolid className={ArrowClassName} />
                    </button>
                  </div>
                  <div className="ods-flex ods-gap-xxs">
                    <button onClick={increaseMonth}>
                      <ChevronRightSolid className={ArrowClassName} />
                    </button>
                    <button onClick={increaseYear}>
                      <AnglesRightSolid className={ArrowClassName} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          />
        </StyledReactDatePicker>
      )}
    </div>
  );
}

interface IStyledDatePicker {
  range: boolean | undefined;
  sameDate: boolean;
}

/** DatePicker 컴포넌트, DatePicker class는 여기에 추가 */
const StyledReactDatePicker = styled.div<IStyledDatePicker>`
  position: absolute;
  padding-top: 0.5em;
  z-index: 1;

  .react-datepicker {
    border-radius: 0.625em;
    border: none;

    .react-datepicker__month-container {
      padding: 0.937em;

      .react-datepicker__day-name {
        color: #676767;
        font-size: 1.1em;
      }

      .react-datepicker__header {
        background-color: inherit;
        border: none;
      }

      .react-datepicker__day--keyboard-selected {
        background-color: inherit;
      }

      .react-datepicker__day {
        font-size: 1.1em;
        color: #232323;
      }

      .react-datepicker__day--in-range {
        background-color: #e2e2e2;
        border-radius: 0;
        color: #232323;
      }

      .react-datepicker__day--selected {
        border-radius: ${(props) => (props.range ? '100% 0% 0% 100%' : '100%')};
        background-color: #232323;
        color: white;
      }

      .react-datepicker__day--range-end {
        border-radius: ${(props) =>
          props.sameDate ? '100%' : '0% 100% 100% 0%'};
        background-color: #232323;
        color: white;
      }

      .react-datepicker__day--disabled {
        color: #b3b3b3;
      }
    }
  }

  .react-datepicker__day--in-selecting-range:not(
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--in--range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--in-range
    ) {
    background-color: #f8f8f8;
    color: #232323;
  }
`;
