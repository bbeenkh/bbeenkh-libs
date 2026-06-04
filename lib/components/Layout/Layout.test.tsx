import { render, screen } from '@testing-library/react';
import Layout from '.';

describe('Layout', () => {
  describe('Layout (root)', () => {
    it('children을 렌더링한다', () => {
      render(<Layout>내용</Layout>);
      expect(screen.getByText('내용')).toBeInTheDocument();
    });

    it('main 요소로 렌더링된다', () => {
      render(<Layout>내용</Layout>);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('styleClass.root이 main 요소에 적용된다', () => {
      render(<Layout styleClass={{ root: 'bg-white' }}>내용</Layout>);
      expect(screen.getByRole('main')).toHaveClass('bg-white');
    });

    it('maxWidth prop이 style에 적용된다', () => {
      render(<Layout maxWidth="1200px">내용</Layout>);
      expect(screen.getByRole('main')).toHaveStyle({ maxWidth: '1200px' });
    });

    it('minWidth prop이 style에 적용된다', () => {
      render(<Layout minWidth="320px">내용</Layout>);
      expect(screen.getByRole('main')).toHaveStyle({ minWidth: '320px' });
    });

    it('maxWidth, minWidth 미전달 시 style이 설정되지 않는다', () => {
      render(<Layout>내용</Layout>);
      const el = screen.getByRole('main');
      expect(el.style.maxWidth).toBe('');
      expect(el.style.minWidth).toBe('');
    });

    it('기본으로 flex flex-col min-h-screen 클래스가 적용된다', () => {
      render(<Layout>내용</Layout>);
      expect(screen.getByRole('main')).toHaveClass('flex', 'flex-col', 'min-h-screen');
    });
  });

  describe('Layout.Header', () => {
    it('children을 렌더링한다', () => {
      render(<Layout.Header>헤더</Layout.Header>);
      expect(screen.getByText('헤더')).toBeInTheDocument();
    });

    it('header 요소로 렌더링된다', () => {
      render(<Layout.Header>헤더</Layout.Header>);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('styleClass.root이 header 요소에 적용된다', () => {
      render(<Layout.Header styleClass={{ root: 'sticky top-0' }}>헤더</Layout.Header>);
      expect(screen.getByRole('banner')).toHaveClass('sticky');
    });

    it('기본 외부여백이 제거된다 (m-0)', () => {
      render(<Layout.Header>헤더</Layout.Header>);
      expect(screen.getByRole('banner')).toHaveClass('m-0');
    });
  });

  describe('Layout.Body', () => {
    it('children을 렌더링한다', () => {
      render(<Layout.Body>본문</Layout.Body>);
      expect(screen.getByText('본문')).toBeInTheDocument();
    });

    it('styleClass.root이 body 요소에 적용된다', () => {
      render(<Layout.Body styleClass={{ root: 'overflow-auto' }}>본문</Layout.Body>);
      expect(screen.getByText('본문')).toHaveClass('overflow-auto');
    });

    it('기본으로 m-0 flex-1 클래스가 적용된다', () => {
      const { container } = render(<Layout.Body>본문</Layout.Body>);
      expect(container.firstChild).toHaveClass('m-0', 'flex-1');
    });
  });

  describe('Layout.Footer', () => {
    it('children을 렌더링한다', () => {
      render(<Layout.Footer>푸터</Layout.Footer>);
      expect(screen.getByText('푸터')).toBeInTheDocument();
    });

    it('footer 요소로 렌더링된다', () => {
      render(<Layout.Footer>푸터</Layout.Footer>);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('styleClass.root이 footer 요소에 적용된다', () => {
      render(<Layout.Footer styleClass={{ root: 'sticky bottom-0' }}>푸터</Layout.Footer>);
      expect(screen.getByRole('contentinfo')).toHaveClass('sticky');
    });

    it('기본 외부여백이 제거된다 (m-0)', () => {
      render(<Layout.Footer>푸터</Layout.Footer>);
      expect(screen.getByRole('contentinfo')).toHaveClass('m-0');
    });
  });
});
