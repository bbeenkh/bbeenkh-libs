import React from 'react';

interface StyleClass {
  root?: string;
}

interface Props {
  children: React.ReactNode;
  styleClass?: StyleClass;
}

interface LayoutProps extends Props {
  maxWidth?: string;
  minWidth?: string;
}

const cx = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ') || undefined;

/**
 * # Layout
 * ---
 * - 페이지 루트 레이아웃 컴포넌트. `<main>` 태그로 렌더링되며 항상 화면을 꽉 채운다 (`flex flex-col min-h-screen`).
 * - `Layout.Header`, `Layout.Body`(`flex-1`), `Layout.Footer` 서브컴포넌트와 함께 사용한다.
 * - max/min width는 props로 제어한다.
 * ---
 * @param children - 렌더링할 자식 요소
 * @param styleClass - 루트 요소에 추가할 className 객체
 * @param maxWidth - 최대 너비 (예: "1200px")
 * @param minWidth - 최소 너비 (예: "320px")
 * ---
 * @example
 * <Layout maxWidth="1200px" minWidth="320px">
 *   <Layout.Header>헤더</Layout.Header>
 *   <Layout.Body>본문</Layout.Body>
 *   <Layout.Footer>푸터</Layout.Footer>
 * </Layout>
 */
function Layout({ children, styleClass, maxWidth, minWidth }: LayoutProps) {
  return (
    <main
      className={cx('flex flex-col min-h-screen', styleClass?.root)}
      style={{ maxWidth, minWidth }}
    >
      {children}
    </main>
  );
}

/**
 * # Layout.Header
 * ---
 * - 헤더 영역 서브컴포넌트. `<header>` 태그로 렌더링되며 기본 외부여백이 제거된다.
 * ---
 * @param children - 렌더링할 자식 요소
 * @param styleClass - 루트 요소에 추가할 className 객체
 * ---
 * @example
 * <Layout.Header styleClass={{ root: 'sticky top-0' }}>헤더 내용</Layout.Header>
 */
Layout.Header = ({ children, styleClass }: Props) => (
  <header className={cx('m-0', styleClass?.root)}>{children}</header>
);

/**
 * # Layout.Body
 * ---
 * - 본문 영역 서브컴포넌트. `<div>` 태그로 렌더링되며 기본 외부여백이 제거된다.
 * ---
 * @param children - 렌더링할 자식 요소
 * @param styleClass - 루트 요소에 추가할 className 객체
 * ---
 * @example
 * <Layout.Body styleClass={{ root: 'flex-1 overflow-auto' }}>본문 내용</Layout.Body>
 */
Layout.Body = ({ children, styleClass }: Props) => (
  <div className={cx('m-0 flex-1', styleClass?.root)}>{children}</div>
);

/**
 * # Layout.Footer
 * ---
 * - 푸터 영역 서브컴포넌트. `<footer>` 태그로 렌더링되며 기본 외부여백이 제거된다.
 * ---
 * @param children - 렌더링할 자식 요소
 * @param styleClass - 루트 요소에 추가할 className 객체
 * ---
 * @example
 * <Layout.Footer styleClass={{ root: 'sticky bottom-0' }}>푸터 내용</Layout.Footer>
 */
Layout.Footer = ({ children, styleClass }: Props) => (
  <footer className={cx('m-0', styleClass?.root)}>{children}</footer>
);

export default Layout;
