/**
 * @file: Table.tsx
 * @author: liam / liam@imnotpizzalib.com
 * @since: 2024.02.22 ~
 * @description: 테이블
 */

import classNames from 'classnames';
import { Fragment, memo, useMemo } from 'react';
import styled from 'styled-components';
import * as _ from 'lodash-es';
import { twJoin, twMerge } from 'tailwind-merge';

/**
 * 테이블 필드 속성
 */
export interface ITableHead {
  /** key - 필드 키 */
  key: string;
  /** label - 필드 라벨 */
  label: React.ReactNode;
  /** align - 필드 좌우 정렬: left, center, right, 기본값: left  */
  align?: 'left' | 'center' | 'right';
  /** width: 각 column의 width값 */
  width?: number;
}

export interface ITableProps<T extends Record<string, any>> {
  fields: ITableHead[];
  rows: T[];
  theadClassName?: string;
  tbodyClassName?: string;
  onClickRow?: (row: T) => void;
  onDoubleClickRow?: (row: T) => void;
  selectedRow?: [ITableHead['key'], T];
}

/**
 * 테이블 컴포넌트
 * @param fields 필드 속성, ITableHead참고
 * @param rows 테이블 데이터,
 * @param theadClassName 테이블 헤더 tailwind class
 * @param tbodyClassName 테이블 바디 tailwind class
 * @param onClickRow 행 클릭시 이벤트
 * @param selectedRow 선택된 행, [선택 기준값, 선택된 값]
 *
 * 제네릭: row의 타입
 */
function Table<T extends Record<string, any>>({
  fields,
  rows,
  theadClassName,
  tbodyClassName,
  onClickRow,
  onDoubleClickRow,
  selectedRow,
}: ITableProps<T>) {
  const textAlign = (align: ITableHead['align']) => {
    switch (align) {
      case 'left':
        return 'ods-text-left';
      case 'center':
        return 'ods-text-center';
      case 'right':
        return 'ods-text-right';
      default:
        return 'ods-text-left';
    }
  };

  /** selected 효과 위해 isSelected 상태초기화 */
  const rowsWithSelected = useMemo(
    () =>
      rows.map((row) => {
        let isSelected = false;

        if (selectedRow) {
          const _targetField = selectedRow[0];
          const _targetRow = selectedRow[1];
          isSelected = _targetRow[_targetField] === row[_targetField];
        }
        return { ...row, isSelected };
      }),
    [rows, selectedRow],
  );

  return (
    <Container className="ods-scrollbar-hide">
      <table>
        {/* Table Head */}
        <thead
          className={twMerge('ods-sticky ods-top-0 ods-z-[10]', theadClassName)}
        >
          <tr className="ods-text-gray-700">
            {fields.map((field) => {
              if (!_.isNil(field.label)) {
                return (
                  <th
                    key={field.key}
                    className={twMerge(
                      'ods-whitespace-nowrap',
                      textAlign(field.align),
                    )}
                    style={{
                      width: field.width,
                    }}
                  >
                    {field.label}
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {/* Table Body */}
          {rowsWithSelected.map((row, index) => {
            const rowKeyList = Object.keys(row);
            return (
              <Fragment key={index}>
                <tr
                  className={twJoin(
                    onClickRow && 'hover:ods-bg-card ods-cursor-pointer',
                  )}
                  onClick={() => onClickRow && onClickRow(row)}
                  onDoubleClick={() =>
                    onDoubleClickRow && onDoubleClickRow(row)
                  }
                >
                  {rowKeyList.map((key, rowIndex) => {
                    const fieldKey = fields[rowIndex]?.key;
                    if (!fieldKey) return null;
                    const value = row[fieldKey];
                    if (_.isNil(value)) return null;
                    return (
                      <td
                        key={key}
                        className={classNames(
                          // 텍스트 줄바꿈 방지
                          'ods-whitespace-nowrap ods-text-black',
                          tbodyClassName,
                          textAlign(fields[rowIndex].align),
                        )}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
      <div className="ods-w-full ods-h-auto ods-absolute ods-top-0 ods-flex ods-flex-col ods-gap-md ods-z-[1] ods-mt-[3.2em]">
        {rowsWithSelected.map((row, index) => {
          return (
            <div
              key={index}
              className={twJoin(
                // TODO: 색상 확정되면 수정
                row.isSelected && 'ods-bg-gray-300',
                'ods-border-gray-200 ods-rounded-xl ods-bg-white ods-border ods-w-full ods-h-[3.75em]',
              )}
            />
          );
        })}
      </div>
      {!rows.length && (
        <div className="ods-absolute ods-flex ods-justify-center ods-items-center ods-w-full ods-h-full ods-top-[0.8em] ods-left-[0em] ods-z-[10] ods-text-gray-700">
          검색 결과가 없습니다.
        </div>
      )}
    </Container>
  );
}

export default memo(Table) as <T>(
  props: ITableProps<T extends Record<string, any> ? T : any>,
) => JSX.Element;

const Container = styled.div`
  background: transparent !important;
  border: none;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  /* 테이블 */
  table {
    width: 100%;
    font-size: 0.875em;
    font-weight: 400;
  }

  tbody {
    position: relative;
    width: 100%;
  }

  tbody > tr {
    position: relative;
    height: 5.42em;
    z-index: 5;
  }

  th,
  td {
    padding: 0.75em;
    padding-top: 0.85em;
    padding-bottom: 0.85em;
  }

  th {
    font-weight: 400;
  }
`;
