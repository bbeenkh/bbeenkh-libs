import { Meta, StoryObj } from '@storybook/react';
import Drawer from '.';
import Layout from '../Layout';
import { useEffect, useState } from 'react';
import DrawerIndex from './DrawerIndex';
import { BarsSolid } from '../Icons';

const SampleDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onClick = () => {
    // redirect to somewhere
  };

  // storybook에 디폴트로 들어간 body padding 제거
  useEffect(() => {
    const body = document.querySelector('.sb-main-padded') as HTMLDivElement;
    if (body) {
      body.style.padding = '0';
    }
    return () => {
      if (body) {
        body.style.padding = '1rem';
      }
    };
  }, []);

  return (
    <>
      <div className="w-full h-[500px] overflow-y-scroll p-0 m-0 bg-gray-100">
        <Layout styleClass={{ root: 'h-auto' }}>
          <Layout.Header styleClass={{ root: 'bg-white m-0 sticky top-0' }}>
            <div className="w-full flex justify-start items-center">
              <BarsSolid
                fill="black"
                className="cursor-pointer"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              />
            </div>
          </Layout.Header>
          <Layout.Body>
            <Drawer isOpen={isDrawerOpen}>
              {/* drawer item들 추후 모듈화 필요하면 추가 */}
              <DrawerIndex title="title">
                <DrawerIndex.Item title="index1" onClick={onClick} />
                <DrawerIndex.Item title="index2" onClick={onClick} />
                <DrawerIndex.Item title="index3" onClick={onClick} />
              </DrawerIndex>
              <DrawerIndex title="title">
                <DrawerIndex.Item title="index1" onClick={onClick} />
                <DrawerIndex.Item title="index2" onClick={onClick} />
                <DrawerIndex.Item title="index3" onClick={onClick} />
              </DrawerIndex>
            </Drawer>
          </Layout.Body>
        </Layout>
      </div>
    </>
  );
};

const meta: Meta<typeof Drawer> = {
  component: SampleDrawer,
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const DefaultDrawer: Story = {
  args: {},
};
