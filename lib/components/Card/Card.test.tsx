import { render, screen } from '@testing-library/react';
import Card from '.';

describe('Card', () => {
  describe('Card (root)', () => {
    it('children을 렌더링한다', () => {
      render(<Card>카드 내용</Card>);
      expect(screen.getByText('카드 내용')).toBeInTheDocument();
    });

    it('section 요소로 렌더링된다', () => {
      const { container } = render(<Card>내용</Card>);
      expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('className이 적용된다', () => {
      const { container } = render(<Card className="custom-card">내용</Card>);
      expect(container.querySelector('section')).toHaveClass('custom-card');
    });
  });

  describe('Card.Header', () => {
    it('children을 렌더링한다', () => {
      render(<Card.Header>헤더</Card.Header>);
      expect(screen.getByText('헤더')).toBeInTheDocument();
    });

    it('header 요소로 렌더링된다', () => {
      const { container } = render(<Card.Header>헤더</Card.Header>);
      expect(container.querySelector('header')).toBeInTheDocument();
    });

    it('className이 적용된다', () => {
      const { container } = render(
        <Card.Header className="extra-class">헤더</Card.Header>,
      );
      expect(container.querySelector('header')).toHaveClass('extra-class');
    });
  });

  describe('Card.Title', () => {
    it('children을 렌더링한다', () => {
      render(<Card.Title>제목</Card.Title>);
      expect(screen.getByText('제목')).toBeInTheDocument();
    });

    it('p 요소로 렌더링된다', () => {
      const { container } = render(<Card.Title>제목</Card.Title>);
      expect(container.querySelector('p')).toBeInTheDocument();
    });
  });

  describe('Card.Body', () => {
    it('children을 렌더링한다', () => {
      render(<Card.Body>본문</Card.Body>);
      expect(screen.getByText('본문')).toBeInTheDocument();
    });
  });

  describe('Card.Footer', () => {
    it('children을 렌더링한다', () => {
      render(<Card.Footer>푸터</Card.Footer>);
      expect(screen.getByText('푸터')).toBeInTheDocument();
    });
  });
});
