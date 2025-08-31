import { Meta, StoryObj } from '@storybook/react';
import Table, { ITableHead } from '.';
import Tag from '../Tag';
import mockData from '@/mock/mockTableRows.json';
import Pagination from '../Pagination';
import { useState } from 'react';

const fields: ITableHead[] = [
  { key: 'name', label: 'Name', align: 'left', width: 50 },
  { key: 'age', label: 'Age', align: 'left', width: 80 },
  { key: 'job', label: 'Job', align: 'left', width: 80 },
  { key: 'address', label: '', align: 'right' },
];

const rows1 = mockData
  .map((rowItem) => ({
    ...rowItem,
    job: <Tag variant="success">{rowItem.job}</Tag>,
  }))
  .slice(0, 5);

/**
 * 테이블입니다.
 * - theadClassName속성을 사용해 thead는 배경과 동일하게 지정해야 함
 */
const meta: Meta<typeof Table> = {
  component: () => (
    <Table
      fields={fields}
      rows={rows1}
      selectedRow={[fields[0].key, rows1[0]]}
    />
  ),
  argTypes: {
    theadClassName: {
      name: 'theadClassName',
      description: 'table header className',
      defaultValue: undefined,
      control: 'text',
    },
    tbodyClassName: {
      name: 'tbodyClassName',
      description: 'table body className',
      defaultValue: undefined,
      control: 'text',
    },
    onClickRow: {
      name: 'onClickRow',
      description: '테이블 행 클릭시 onclick 이벤트',
      defaultValue: undefined,
      control: 'function',
    },
    onDoubleClickRow: {
      name: 'onDoubleClickRow',
      description: '테이블 행 더블클릭시 onclick 이벤트',
      defaultValue: undefined,
      control: 'function',
    },
    selectedRow: {
      name: 'selectedRow',
      description:
        '현재 선택된 row 객체 전달 시 highlight효과 적용, [선택 기준이 될 field key, 선택된 row 객체의 기준에 해당하는 값]',
      defaultValue: undefined,
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

export const DefaultTable: Story = {};

const rows2 = mockData.map((rowItem) => ({
  ...rowItem,
  job: <Tag variant="success">{rowItem.job}</Tag>,
}));

/**
 * Pagination 추가된 테이블
 * @returns
 */
export const TableWithPagination = () => {
  const PER_PAGE = 6;
  const [page, setPage] = useState(1);

  const rowsByPage = rows2.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="ods-w-full ods-flex ods-flex-col ods-items-center ods-gap-4 ods-h-[500px]">
      <Table
        fields={fields}
        rows={rowsByPage}
        theadClassName="ods-bg-[#f0f0f0]"
      />
      <Pagination
        totalItems={rows2.length}
        displayPages={PER_PAGE}
        pageCount={5}
        setPage={(page) => setPage(page)}
      />
    </div>
  );
};

export const EmptyTable = () => {
  return (
    <div className="ods-w-full ods-flex ods-flex-col ods-items-center ods-gap-4 ods-h-[500px]">
      <Table fields={fields} rows={[]} theadClassName="ods-bg-[#f0f0f0]" />
    </div>
  );
};
