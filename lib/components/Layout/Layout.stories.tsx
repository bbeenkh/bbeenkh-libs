/* eslint-disable react/no-unescaped-entities */
import { Meta, StoryObj } from '@storybook/react';
import Layout from '.';

const loremText = `Lorem Ipsum is simply dummy text of the printing and typesetting
industry. Lorem Ipsum has been the industry's standard dummy text
ever since the 1500s, when an unknown printer took a galley of
type and scrambled it to make a type specimen book.`;

const SampleLayout = ({ sticky }: { sticky: boolean }) => {
  return (
    <>
      <div className="w-full h-[500px] overflow-y-scroll">
        <Layout styleClass={{ root: 'h-auto' }}>
          <Layout.Header styleClass={{ root: `bg-gray-300 m-0 ${sticky ? 'sticky top-0' : ''}` }}>
            <div className="w-full h-full border border-black border-solid">
              header
            </div>
          </Layout.Header>
          <Layout.Body>
            {Array.from({ length: 8 }).map((_, i) => (
              <p key={i} className="mb-4">{loremText}</p>
            ))}
          </Layout.Body>
          <Layout.Footer styleClass={{ root: 'bg-gray-300 m-0' }}>
            <div className="h-full border border-black border-solid">
              Footer
            </div>
          </Layout.Footer>
        </Layout>
      </div>
    </>
  );
};

/**
 * 프로젝트의 최상단에 위치하게 되는 레이아웃 컴포넌트
 * - header, body, footer로 구성되어 여백, 높이/너비 커스텀 가능
 */
const meta: Meta<typeof SampleLayout> = {
  component: SampleLayout,
  argTypes: {
    sticky: {
      name: 'sticky',
      description: '스크롤시 header 고정 여부',
      defaultValue: false,
      control: 'boolean',
    },
  },
};
export default meta;

type Story = StoryObj<typeof SampleLayout>;

export const DefaultLayout: Story = {
  args: {
    sticky: false,
  },
};
