import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Selectbox from '.';

const options = [
  { label: '정확도순', value: 'accuracy' },
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
];

describe('Selectbox', () => {
  describe('기본 동작', () => {
    it('placeholder가 렌더링된다', () => {
      render(
        <Selectbox options={options} onSelect={() => {}} placeholder="정렬 선택" />,
      );
      expect(screen.getByText('정렬 선택')).toBeInTheDocument();
    });

    it('value가 설정되면 해당 라벨이 표시된다', () => {
      render(<Selectbox options={options} onSelect={() => {}} value="accuracy" />);
      expect(screen.getByText('정확도순')).toBeInTheDocument();
    });

    it('트리거 버튼이 렌더링된다', () => {
      render(<Selectbox options={options} onSelect={() => {}} placeholder="선택" />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('styleClass prop', () => {
    it('styleClass.trigger가 트리거 버튼에 적용된다', () => {
      render(
        <Selectbox
          options={options}
          onSelect={() => {}}
          placeholder="선택"
          styleClass={{ trigger: 'border rounded px-3' }}
        />,
      );
      expect(screen.getByRole('combobox')).toHaveClass('border', 'rounded', 'px-3');
    });
  });

  describe('옵션 선택', () => {
    it('트리거 클릭 시 옵션 목록이 열린다', async () => {
      const user = userEvent.setup();
      render(
        <Selectbox options={options} onSelect={() => {}} placeholder="선택" />,
      );
      await user.click(screen.getByRole('combobox'));
      expect(screen.getByText('정확도순')).toBeInTheDocument();
      expect(screen.getByText('최신순')).toBeInTheDocument();
    });

    it('옵션 선택 시 onSelect가 호출된다', async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();
      render(<Selectbox options={options} onSelect={onSelect} placeholder="선택" />);
      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByText('최신순'));
      expect(onSelect).toHaveBeenCalledWith('latest');
    });
  });
});
