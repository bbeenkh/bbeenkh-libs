import { render, screen, fireEvent } from '@testing-library/react';
import Input from '.';

describe('Input', () => {
  describe('기본 동작', () => {
    it('input 요소가 렌더링된다', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('placeholder가 적용된다', () => {
      render(<Input placeholder="검색어 입력" />);
      expect(screen.getByPlaceholderText('검색어 입력')).toBeInTheDocument();
    });

    it('value가 적용된다', () => {
      render(<Input value="테스트" onChange={() => {}} />);
      expect(screen.getByDisplayValue('테스트')).toBeInTheDocument();
    });

    it('onChange가 호출된다', () => {
      const onChange = vi.fn();
      render(<Input onChange={onChange} />);
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } });
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('래퍼 div에 relative flex items-center 클래스가 적용된다', () => {
      const { container } = render(<Input />);
      expect(container.firstChild).toHaveClass('relative', 'flex', 'items-center');
    });

    it('input에 w-full outline-none 클래스가 적용된다', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveClass('w-full', 'outline-none');
    });
  });

  describe('onEnter', () => {
    it('Enter 키 입력 시 onEnter가 호출된다', () => {
      const onEnter = vi.fn();
      render(<Input onEnter={onEnter} />);
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
      expect(onEnter).toHaveBeenCalledTimes(1);
    });

    it('Enter 외 키 입력 시 onEnter가 호출되지 않는다', () => {
      const onEnter = vi.fn();
      render(<Input onEnter={onEnter} />);
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'a' });
      expect(onEnter).not.toHaveBeenCalled();
    });

    it('onEnter 없이 Enter 키 입력해도 에러가 없다', () => {
      render(<Input />);
      expect(() =>
        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' }),
      ).not.toThrow();
    });
  });

  describe('prefix / suffix', () => {
    it('prefix가 렌더링된다', () => {
      render(<Input prefix={<span data-testid="prefix-icon">P</span>} />);
      expect(screen.getByTestId('prefix-icon')).toBeInTheDocument();
    });

    it('suffix가 렌더링된다', () => {
      render(<Input suffix={<span data-testid="suffix-icon">S</span>} />);
      expect(screen.getByTestId('suffix-icon')).toBeInTheDocument();
    });

    it('prefix 없으면 prefix 래퍼가 없다', () => {
      const { container } = render(<Input />);
      expect(container.querySelector('[class*="left-2"]')).not.toBeInTheDocument();
    });

    it('suffix 없으면 suffix 래퍼가 없다', () => {
      const { container } = render(<Input />);
      expect(container.querySelector('[class*="right-2"]')).not.toBeInTheDocument();
    });
  });

  describe('styleClass prop', () => {
    it('styleClass.root이 래퍼에 적용된다', () => {
      const { container } = render(<Input styleClass={{ root: 'border rounded' }} />);
      expect(container.firstChild).toHaveClass('border', 'rounded');
    });

    it('styleClass.input이 input 요소에 적용된다', () => {
      render(<Input styleClass={{ input: 'text-sm pl-8' }} />);
      expect(screen.getByRole('textbox')).toHaveClass('text-sm', 'pl-8');
    });

    it('styleClass.prefix가 prefix 래퍼에 적용된다', () => {
      const { container } = render(
        <Input prefix={<span>P</span>} styleClass={{ prefix: 'text-gray-400' }} />,
      );
      const prefixWrapper = container.querySelector('[class*="left-2"]');
      expect(prefixWrapper).toHaveClass('text-gray-400');
    });

    it('styleClass.suffix가 suffix 래퍼에 적용된다', () => {
      const { container } = render(
        <Input suffix={<span>S</span>} styleClass={{ suffix: 'text-gray-500' }} />,
      );
      const suffixWrapper = container.querySelector('[class*="right-2"]');
      expect(suffixWrapper).toHaveClass('text-gray-500');
    });
  });
});
