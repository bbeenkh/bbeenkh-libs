/* eslint-disable react/no-unescaped-entities */
import { Meta, StoryObj } from '@storybook/react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import coconutIconUrl from '@/assets/icons/coconut-logo.png';
import { useEffect, useState } from 'react';
import Drawer from '@/components/Drawer';
import DrawerIndex from '@/components/Drawer/DrawerIndex';
import { BarsSolid } from '@/components/Icons';
import '@/styles/coconut-styles.css';

const CoconutIcon = () => (
  <img className="ods-w-[6em] ods-h-[2em]" alt="icon" src={coconutIconUrl} />
);

/**
 * 레이아웃
 */
const SampleLayout = ({ sticky }: { sticky: boolean }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const onClick = () => {
    // redirect to somewhere
  };

  return (
    <div className="ods-w-full ods-h-[100vh] ods-overflow-scroll ods-bg-off-white ods-relative">
      <Layout className="ods-h-auto">
        <Layout.Header sticky={sticky} className="ods-bg-white ods-h-16">
          <div className="ods-w-full ods-bg-white ods-justify-between ods-items-center ods-inline-flex">
            <div className="ods-justify-start ods-items-center ods-gap-md ods-flex">
              <BarsSolid
                fill="black"
                className="ods-cursor-pointer"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              />
              <CoconutIcon />
            </div>
            <div className="ods-justify-start ods-items-center ods-gap-md ods-flex">
              <div className="ods-justify-start ods-items-start ods-gap-xs ods-flex">
                <div className="ods-text-neutral-800 ods-text-sm ods-leading-tight">
                  이서준님
                </div>
              </div>
              <Button usageType="line" size="sm">
                로그아웃
              </Button>
            </div>
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
          <main>
            <p className="ods-mb-4">
              ==================== Lorem Ipsum ====================
            </p>
            <p className="ods-mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <p className="ods-mb-4">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </p>
            <p className="ods-mb-4">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
            <p className="ods-mb-4">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
            <p className="ods-mb-4">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
            <p className="ods-mb-4">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
            <p className="ods-mb-4">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
            <p className="ods-mb-4">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
            <p className="ods-mb-4">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </main>
        </Layout.Body>
      </Layout>
    </div>
  );
};

const meta: Meta<typeof SampleLayout> = {
  component: SampleLayout,
};
export default meta;

type Story = StoryObj<typeof SampleLayout>;

export const DefaultLayout: Story = {
  args: {
    sticky: true,
  },
};
