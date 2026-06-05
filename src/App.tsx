import React, { useState } from 'react';
import Layout from '../lib/components/Layout';
import Button from '../lib/components/Button';
import Input from '../lib/components/Input';
import Checkbox from '../lib/components/Checkbox';
import RadioButton from '../lib/components/RadioButton';
import Card from '../lib/components/Card';
import Skeleton from '../lib/components/Skeleton';
import Spinner from '../lib/components/Spinner';
import Tab from '../lib/components/Tab';
import Selectbox from '../lib/components/Selectbox';
import Popover from '../lib/components/Popover';
import Toast from '../lib/components/Toast';
import Anim from '../lib/components/Anim';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-gray-700 border-b border-gray-200 pb-2 mb-4">{title}</h2>
      <div className="flex flex-wrap gap-4 items-start">{children}</div>
    </section>
  );
}

export default function App() {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('a');
  const [selectValue, setSelectValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <Toast.Provider
      open={toastOpen}
      onOpenChange={setToastOpen}
      message="토스트 메시지입니다!"
      styleClass={{
        root: 'bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg text-sm',
        viewport: 'fixed bottom-6 right-6 flex flex-col gap-2 z-50',
      }}
    >
      <Layout maxWidth="960px" styleClass={{ root: 'mx-auto px-6' }}>
        <Layout.Header styleClass={{ root: 'py-6 border-b border-gray-200 mb-8' }}>
          <h1 className="text-2xl font-bold text-gray-900">imnotpizza-libs Component Showcase</h1>
          <p className="text-sm text-gray-500 mt-1">라이브러리에 포함된 모든 컴포넌트 미리보기</p>
        </Layout.Header>

        <Layout.Body styleClass={{ root: 'py-8' }}>

          {/* Button */}
          <Section title="Button">
            <Button styleClass={{ root: 'bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors' }}>
              기본 버튼
            </Button>
            <Button styleClass={{ root: 'border border-gray-900 text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors' }}>
              아웃라인 버튼
            </Button>
            <Button styleClass={{ root: 'bg-gray-100 text-gray-400 px-4 py-2 rounded-md text-sm font-medium cursor-not-allowed' }} disabled>
              비활성 버튼
            </Button>
            <Button styleClass={{ root: 'bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors' }}>
              위험 버튼
            </Button>
          </Section>

          {/* Input */}
          <Section title="Input">
            <Input
              placeholder="기본 입력"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              styleClass={{
                root: 'border border-gray-300 rounded-md h-10 w-64',
                input: 'px-3 text-sm',
              }}
            />
            <Input
              placeholder="접두사 포함"
              styleClass={{
                root: 'border border-gray-300 rounded-md h-10 w-64',
                input: 'pl-8 pr-3 text-sm',
                prefix: 'text-gray-400 text-sm',
              }}
              prefix={<span>🔍</span>}
            />
            <Input
              placeholder="접미사 포함"
              styleClass={{
                root: 'border border-gray-300 rounded-md h-10 w-64',
                input: 'pl-3 pr-10 text-sm',
                suffix: 'text-gray-400 text-xs',
              }}
              suffix={<span>원</span>}
            />
            <Input
              placeholder="비활성"
              disabled
              styleClass={{
                root: 'border border-gray-200 rounded-md h-10 w-64 bg-gray-50',
                input: 'px-3 text-sm text-gray-400 cursor-not-allowed',
              }}
            />
          </Section>

          {/* Checkbox */}
          <Section title="Checkbox">
            <Checkbox
              id="cb1"
              label="기본 체크박스"
              checked={checkboxChecked}
              onCheckedChange={setCheckboxChecked}
            />
            <Checkbox id="cb2" label="기본 체크됨" defaultChecked />
            <Checkbox id="cb3" label="비활성" disabled />
            <Checkbox id="cb4" label="비활성 체크됨" disabled checked />
          </Section>

          {/* RadioButton */}
          <Section title="RadioButton">
            <RadioButton.Group value={radioValue} onValueChange={setRadioValue} className="flex flex-row gap-4">
              <RadioButton.Item value="a" id="rb1" label="옵션 A" />
              <RadioButton.Item value="b" id="rb2" label="옵션 B" />
              <RadioButton.Item value="c" id="rb3" label="옵션 C" />
              <RadioButton.Item value="d" id="rb4" label="비활성" disabled />
            </RadioButton.Group>
          </Section>

          {/* Card */}
          <Section title="Card">
            <Card className="w-72 h-48">
              <Card.Header>
                <Card.Title>카드 제목</Card.Title>
              </Card.Header>
              <Card.Body>
                <p className="text-sm text-gray-600">카드 본문 내용이 들어가는 영역입니다. 다양한 콘텐츠를 배치할 수 있습니다.</p>
              </Card.Body>
            </Card>
            <Card className="w-72 h-48">
              <Card.Header>
                <Card.Title>두 번째 카드</Card.Title>
                <Button styleClass={{ root: 'text-xs text-blue-500 hover:underline' }}>더보기</Button>
              </Card.Header>
              <Card.Body>
                <p className="text-sm text-gray-600">헤더에 액션 버튼이 있는 카드입니다.</p>
              </Card.Body>
            </Card>
          </Section>

          {/* Skeleton */}
          <Section title="Skeleton">
            <Skeleton.Container styleClass={{ root: 'flex flex-col gap-3 w-64' }}>
              <div className="flex items-center gap-3">
                <Skeleton.Circle styleClass={{ root: 'w-10 h-10 rounded-full bg-gray-200 animate-pulse shrink-0' }} />
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton.Box styleClass={{ root: 'w-full h-3 rounded bg-gray-200 animate-pulse' }} />
                  <Skeleton.Box styleClass={{ root: 'w-3/4 h-3 rounded bg-gray-200 animate-pulse' }} />
                </div>
              </div>
              <Skeleton.Box styleClass={{ root: 'w-full h-24 rounded-lg bg-gray-200 animate-pulse' }} />
              <Skeleton.Box styleClass={{ root: 'w-full h-3 rounded bg-gray-200 animate-pulse' }} />
              <Skeleton.Box styleClass={{ root: 'w-2/3 h-3 rounded bg-gray-200 animate-pulse' }} />
            </Skeleton.Container>
          </Section>

          {/* Spinner */}
          <Section title="Spinner">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8"><Spinner size="xs" /></div>
                <span className="text-xs text-gray-500">xs</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8"><Spinner size="sm" /></div>
                <span className="text-xs text-gray-500">sm</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8"><Spinner size="lg" /></div>
                <span className="text-xs text-gray-500">lg</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10"><Spinner size="xl" /></div>
                <span className="text-xs text-gray-500">xl</span>
              </div>
            </div>
          </Section>

          {/* Tab */}
          <Section title="Tab">
            <Tab.Root defaultValue="tab1" className="w-full max-w-md">
              <Tab.List
                styleClass={{
                  root: 'flex gap-0 border-b border-gray-200',
                }}
              >
                <Tab.Trigger
                  value="tab1"
                  styleClass={{
                    root: 'px-4 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 transition-colors',
                  }}
                >
                  첫 번째 탭
                </Tab.Trigger>
                <Tab.Trigger
                  value="tab2"
                  styleClass={{
                    root: 'px-4 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 transition-colors',
                  }}
                >
                  두 번째 탭
                </Tab.Trigger>
                <Tab.Trigger
                  value="tab3"
                  styleClass={{
                    root: 'px-4 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 transition-colors',
                  }}
                >
                  세 번째 탭
                </Tab.Trigger>
              </Tab.List>
              <Tab.Content value="tab1" styleClass={{ root: 'pt-4 text-sm text-gray-600' }}>
                첫 번째 탭의 콘텐츠입니다.
              </Tab.Content>
              <Tab.Content value="tab2" styleClass={{ root: 'pt-4 text-sm text-gray-600' }}>
                두 번째 탭의 콘텐츠입니다.
              </Tab.Content>
              <Tab.Content value="tab3" styleClass={{ root: 'pt-4 text-sm text-gray-600' }}>
                세 번째 탭의 콘텐츠입니다.
              </Tab.Content>
            </Tab.Root>
          </Section>

          {/* Selectbox */}
          <Section title="Selectbox">
            <Selectbox
              value={selectValue}
              options={[
                { label: '정확도순', value: 'accuracy' },
                { label: '최신순', value: 'latest' },
                { label: '인기순', value: 'popular' },
              ]}
              onSelect={setSelectValue}
              placeholder="정렬 선택"
              styleClass={{
                trigger: 'border border-gray-300 rounded-md px-3 py-2 text-sm w-40 flex justify-between items-center hover:bg-gray-50',
                content: 'bg-white shadow-lg rounded-md border border-gray-200 z-50',
                viewport: 'p-1',
                item: 'px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded data-[highlighted]:bg-gray-100 outline-none',
              }}
            />
          </Section>

          {/* Popover */}
          <Section title="Popover">
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button styleClass={{ root: 'border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-50 transition-colors' }}>
                  팝오버 열기
                </Button>
              </Popover.Trigger>
              <Popover.Content
                styleClass={{
                  content: 'bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64',
                  arrow: 'fill-white',
                }}
              >
                <p className="text-sm text-gray-700 font-medium mb-1">팝오버 제목</p>
                <p className="text-xs text-gray-500 mb-3">팝오버 안에 자유롭게 콘텐츠를 배치할 수 있습니다.</p>
                <Popover.Close asChild>
                  <Button styleClass={{ root: 'text-xs text-gray-500 hover:text-gray-900' }}>닫기</Button>
                </Popover.Close>
              </Popover.Content>
            </Popover.Root>
          </Section>

          {/* Toast */}
          <Section title="Toast">
            <Button
              styleClass={{ root: 'bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors' }}
              onClick={() => setToastOpen(true)}
            >
              토스트 표시
            </Button>
          </Section>

          {/* Anim */}
          <Section title="Anim">
            <div className="w-full flex flex-col gap-6">
              <div>
                <p className="text-xs text-gray-500 mb-2">Anim.Fade (direction: up)</p>
                <Anim.Fade direction="up" duration={600}>
                  <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
                    위에서 페이드 인 되는 요소입니다.
                  </div>
                </Anim.Fade>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Anim.Fade (direction: left, delay: 200ms)</p>
                <Anim.Fade direction="left" duration={600} delay={200}>
                  <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
                    왼쪽에서 페이드 인 되는 요소입니다.
                  </div>
                </Anim.Fade>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Anim.ScaleFade</p>
                <Anim.ScaleFade duration={600} delay={400}>
                  <div className="bg-green-50 rounded-lg p-4 text-sm text-green-700">
                    스케일 페이드 인 되는 요소입니다.
                  </div>
                </Anim.ScaleFade>
              </div>
            </div>
          </Section>

        </Layout.Body>

        <Layout.Footer styleClass={{ root: 'border-t border-gray-200 py-6 text-center text-xs text-gray-400' }}>
          imnotpizza-libs · Component Showcase
        </Layout.Footer>
      </Layout>
    </Toast.Provider>
  );
}
