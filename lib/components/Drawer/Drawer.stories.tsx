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
      <div className="ods-w-full ods-h-[500px] ods-overflow-y-scroll ods-p-0 ods-m-0 ods-bg-gray-100">
        <Layout className="ods-h-auto">
          <Layout.Header className="ods-bg-white" sticky>
            <div className="ods-w-full ods-flex ods-justify-start ods-items-center">
              <BarsSolid
                fill="black"
                className="ods-cursor-pointer"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              />
            </div>
          </Layout.Header>
          <Layout.Body isDrawerOpen={isDrawerOpen}>
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
