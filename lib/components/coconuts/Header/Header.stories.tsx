import { Meta, StoryObj } from '@storybook/react';
import Header from '.';
import Tag from '@/components/Tag';

const SampleHeader = (props: any) => {
  return (
    <Header {...props}>
      <Header.Left>
        <Tag variant="default">Value</Tag>
        <Tag variant="default">Value</Tag>
        <Tag variant="default">Value</Tag>
      </Header.Left>
      <Header.Right>
        <Header.Button usageType="line">취소</Header.Button>
        <Header.Button className="!ods-bg-coconut-brand">저장</Header.Button>
      </Header.Right>
    </Header>
  );
};

const meta: Meta<typeof Header> = {
  component: SampleHeader,
  argTypes: {
    size: {
      name: 'size',
      description: 'Header 내 title, backbutton 사이즈',
      defaultValue: 'sm',
      control: 'radio',
      options: ['sm', 'lg'],
    },
    backButton: {
      name: 'backButton',
      description: '뒤로가기 버튼 추가여부',
      defaultValue: false,
      control: 'radio',
      options: [true, false],
    },
    onClickBackButton: {
      name: 'onClickBackButton',
      description: 'backbutton 클릭시 이벤트',
      defaultValue: undefined,
      control: 'function',
    },
    title: {
      name: 'title',
      description: 'title',
      defaultValue: '',
      control: 'text',
    },
    description: {
      name: 'description',
      description: 'description',
      defaultValue: '',
      control: 'text',
    },
    children: {
      name: 'children',
      description: 'title 오른쪽부터 좌측까지의 컨텐츠',
      defaultValue: undefined,
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Header>;

export const DefaultHeader: Story = {
  args: {
    size: 'lg',
    title: 'Heading',
    description: 'Description',
    backButton: true,
    onClickBackButton: () => {
      console.log('back button clicked!');
    },
  },
};
