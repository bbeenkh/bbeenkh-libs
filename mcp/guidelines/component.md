# 컴포넌트 작성 가이드라인

## 파일 구조

```
lib/components/<Name>/
  index.tsx              # 메인 컴포넌트
  <Name>.stories.tsx     # Storybook 스토리 (선택)
```

`lib/index.tsx`에서 export해야 패키지 소비자에게 공개된다.

## Props 패턴

```tsx
// 네이티브 HTML 속성 확장
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  styleClass?: { root?: string };  // Tailwind 클래스 주입용
}
```

- `styleClass` 객체로 각 영역(root, header, body 등)의 클래스를 외부에서 주입
- 기본 스타일은 최소화하거나 없음 — 소비자가 `styleClass`로 정의

## Compound Component 패턴

복합 UI(Card, Modal, Tab 등)는 서브컴포넌트를 부모에 할당:

```tsx
function Modal({ children, ...props }: Props) {
  return <Dialog.Root {...props}>{children}</Dialog.Root>;
}

function Header({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={twMerge('...', className)}>{children}</div>;
}

// 부모에 서브컴포넌트 할당
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
```

사용:
```tsx
<Modal>
  <Modal.Header>제목</Modal.Header>
  <Modal.Body>내용</Modal.Body>
</Modal>
```

## 스타일링

- `tailwind-merge`의 `twMerge()`로 클래스 병합 (충돌 해소)
- 조건부 클래스는 `cn()` 유틸 사용 (`lib/utils/cn.ts`)
- Tailwind 유틸리티 클래스에 `ods-` 프리픽스 (소비자 앱 충돌 방지)
- 동적/변형 스타일이 복잡한 경우만 `styled-components` 사용

## Radix UI 프리미티브

접근성이 필요한 인터랙티브 컴포넌트는 Radix UI 기반:

```tsx
import * as Dialog from '@radix-ui/react-dialog';

// Radix 프리미티브를 감싸고, 프로젝트 컨벤션에 맞는 API 제공
export default function Modal({ children, ...props }: IModalProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content>{children}</Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

## forwardRef

소비자가 DOM ref 접근이 필요한 컴포넌트는 `forwardRef` 사용:

```tsx
const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input ref={ref} {...props} />;
});
```

## JSDoc 컨벤션

```tsx
/**
 * # ComponentName UI
 * ---
 * - 간단설명: 한 줄 설명
 * - 상세 동작 설명 (bullet points)
 * ---
 * @param propName 설명
 * @example
 * <Component prop="value">children</Component>
 */
```

## Story 컨벤션

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Component from '.';

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
};
export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  render: () => <Component>기본</Component>,
};
```

## export 등록

`lib/index.tsx`에 추가:

```tsx
import ODSNewComponent from './components/NewComponent';
export const NewComponent = ODSNewComponent;
```

`ODS` 접두사로 import 후 재export하는 패턴을 따른다.
