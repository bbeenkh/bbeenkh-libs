import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Anim from '.';

type FadeComponent = typeof Anim.Fade;
type ScaleFadeComponent = typeof Anim.ScaleFade;

/**
 * 상하좌우 방향 페이드 인/아웃 애니메이션 wrapper 컴포넌트
 *
 * - `type="in"` (기본값) : 지정 방향에서 진입
 * - `type="out"` : 지정 방향으로 퇴장
 *
 * > 애니메이션을 다시 재생하려면 **Remount component** 버튼을 누르세요.
 */
const meta: Meta<FadeComponent> = {
  title: 'Components/Anim',
  component: Anim.Fade,
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['in', 'out'],
      description: '애니메이션 타입',
    },
    direction: {
      control: { type: 'select' },
      options: ['up', 'down', 'left', 'right'],
      description: '애니메이션 방향',
    },
    duration: {
      control: { type: 'range', min: 100, max: 1500, step: 50 },
      description: '지속 시간 (ms)',
    },
    delay: {
      control: { type: 'range', min: 0, max: 1000, step: 50 },
      description: '지연 시간 (ms)',
    },
    className: { control: 'text' },
    children: { control: false },
  },
};

export default meta;

type Story = StoryObj<FadeComponent>;

const SampleBox = ({ label }: { label: string }) => (
  <div className="w-48 h-16 rounded-lg bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
    {label}
  </div>
);

/** FadeIn 플레이그라운드 — controls 패널에서 type·direction·duration·delay 조절 가능 */
export const FadeInPlayground: Story = {
  args: {
    type: 'in',
    direction: 'up',
    duration: 250,
    delay: 0,
  },
  render: (args) => (
    <Anim.Fade {...args}>
      <SampleBox label="Fade In" />
    </Anim.Fade>
  ),
};

/** FadeOut 플레이그라운드 */
export const FadeOutPlayground: Story = {
  args: {
    type: 'out',
    direction: 'up',
    duration: 250,
    delay: 0,
  },
  render: (args) => (
    <Anim.Fade {...args}>
      <SampleBox label="Fade Out" />
    </Anim.Fade>
  ),
};

/** 4방향 FadeIn 한눈에 비교 */
export const FadeInDirections: Story = {
  render: () => (
    <div className="flex gap-8 p-8">
      {(['up', 'down', 'left', 'right'] as const).map((dir) => (
        <div key={dir} className="flex flex-col items-center gap-3">
          <Anim.Fade direction={dir}>
            <SampleBox label={dir} />
          </Anim.Fade>
          <span className="text-xs text-gray-500">{dir}</span>
        </div>
      ))}
    </div>
  ),
};

/** 4방향 FadeOut 한눈에 비교 */
export const FadeOutDirections: Story = {
  render: () => (
    <div className="flex gap-8 p-8">
      {(['up', 'down', 'left', 'right'] as const).map((dir) => (
        <div key={dir} className="flex flex-col items-center gap-3">
          <Anim.Fade type="out" direction={dir}>
            <SampleBox label={dir} />
          </Anim.Fade>
          <span className="text-xs text-gray-500">{dir}</span>
        </div>
      ))}
    </div>
  ),
};

/** delay를 이용한 순차 등장 */
export const StaggeredFadeIn: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-8">
      {['첫 번째', '두 번째', '세 번째', '네 번째'].map((label, i) => (
        <Anim.Fade key={label} direction="left" delay={i * 120}>
          <div className="w-64 h-12 rounded-lg bg-blue-500 text-white flex items-center px-4 text-sm font-semibold">
            {label} 아이템
          </div>
        </Anim.Fade>
      ))}
    </div>
  ),
};

/** 토글 버튼으로 FadeIn ↔ FadeOut 전환 */
export const ToggleDemo: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    const [key, setKey] = useState(0);

    const handleToggle = () => {
      setVisible((v) => !v);
      setKey((k) => k + 1);
    };

    return (
      <div className="flex flex-col items-center gap-6 p-8">
        <button
          onClick={handleToggle}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white text-sm"
        >
          {visible ? 'FadeOut 실행' : 'FadeIn 실행'}
        </button>
        {visible ? (
          <Anim.Fade key={`in-${key}`} direction="up">
            <SampleBox label="Fade In ↑" />
          </Anim.Fade>
        ) : (
          <Anim.Fade key={`out-${key}`} type="out" direction="down">
            <SampleBox label="Fade Out ↓" />
          </Anim.Fade>
        )}
      </div>
    );
  },
};

// ─── ScaleFade Stories ──────────────────────────────────────────────────────

type ScaleFadeStory = StoryObj<ScaleFadeComponent>;

/** ScaleFade 플레이그라운드 — controls 패널에서 type·duration·delay 조절 가능 */
export const ScaleFadePlayground: ScaleFadeStory = {
  args: {
    type: 'in',
    duration: 250,
    delay: 0,
  },
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['in', 'out'],
      description: '애니메이션 타입',
    },
    duration: {
      control: { type: 'range', min: 100, max: 1500, step: 50 },
      description: '지속 시간 (ms)',
    },
    delay: {
      control: { type: 'range', min: 0, max: 1000, step: 50 },
      description: '지연 시간 (ms)',
    },
    children: { control: false },
  },
  render: (args) => (
    <Anim.ScaleFade {...args}>
      <SampleBox label="Scale Fade" />
    </Anim.ScaleFade>
  ),
};

/** ScaleFadeIn / ScaleFadeOut 나란히 비교 */
export const ScaleFadeInOut: ScaleFadeStory = {
  render: () => (
    <div className="flex gap-12 p-8 items-center">
      <div className="flex flex-col items-center gap-3">
        <Anim.ScaleFade type="in">
          <SampleBox label="Scale In" />
        </Anim.ScaleFade>
        <span className="text-xs text-gray-500">type="in"</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Anim.ScaleFade type="out">
          <SampleBox label="Scale Out" />
        </Anim.ScaleFade>
        <span className="text-xs text-gray-500">type="out"</span>
      </div>
    </div>
  ),
};

/** 토글 버튼으로 ScaleFadeIn ↔ ScaleFadeOut 전환 */
export const ScaleFadeToggleDemo: ScaleFadeStory = {
  render: () => {
    const [visible, setVisible] = useState(true);
    const [key, setKey] = useState(0);

    const handleToggle = () => {
      setVisible((v) => !v);
      setKey((k) => k + 1);
    };

    return (
      <div className="flex flex-col items-center gap-6 p-8">
        <button
          onClick={handleToggle}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white text-sm"
        >
          {visible ? 'Scale Out 실행' : 'Scale In 실행'}
        </button>
        <Anim.ScaleFade key={key} type={visible ? 'in' : 'out'}>
          <SampleBox label={visible ? 'Scale In' : 'Scale Out'} />
        </Anim.ScaleFade>
      </div>
    );
  },
};
