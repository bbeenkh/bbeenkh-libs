import { render, screen } from '@testing-library/react';
import Anim from '.';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} data-testid="motion-div" {...rest}>
        {children}
      </div>
    ),
  },
}));

describe('Anim', () => {
  describe('Anim.Fade', () => {
    it('children을 렌더링한다', () => {
      render(
        <Anim.Fade>
          <span>페이드 콘텐츠</span>
        </Anim.Fade>,
      );
      expect(screen.getByText('페이드 콘텐츠')).toBeInTheDocument();
    });

    it('motion.div가 렌더링된다', () => {
      render(
        <Anim.Fade>
          <span>내용</span>
        </Anim.Fade>,
      );
      expect(screen.getByTestId('motion-div')).toBeInTheDocument();
    });

    it('기본 className이 w-full이다', () => {
      render(
        <Anim.Fade>
          <span>내용</span>
        </Anim.Fade>,
      );
      expect(screen.getByTestId('motion-div')).toHaveClass('w-full');
    });

    it('className prop이 적용된다', () => {
      render(
        <Anim.Fade className="custom-class">
          <span>내용</span>
        </Anim.Fade>,
      );
      expect(screen.getByTestId('motion-div')).toHaveClass('custom-class');
    });
  });

  describe('Anim.ScaleFade', () => {
    it('children을 렌더링한다', () => {
      render(
        <Anim.ScaleFade>
          <span>스케일 콘텐츠</span>
        </Anim.ScaleFade>,
      );
      expect(screen.getByText('스케일 콘텐츠')).toBeInTheDocument();
    });

    it('motion.div가 렌더링된다', () => {
      render(
        <Anim.ScaleFade>
          <span>내용</span>
        </Anim.ScaleFade>,
      );
      expect(screen.getByTestId('motion-div')).toBeInTheDocument();
    });

    it('기본 className이 w-fit이다', () => {
      render(
        <Anim.ScaleFade>
          <span>내용</span>
        </Anim.ScaleFade>,
      );
      expect(screen.getByTestId('motion-div')).toHaveClass('w-fit');
    });

    it('className prop이 적용된다', () => {
      render(
        <Anim.ScaleFade className="extra">
          <span>내용</span>
        </Anim.ScaleFade>,
      );
      expect(screen.getByTestId('motion-div')).toHaveClass('extra');
    });
  });
});
