import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tab from '.';

describe('Tab', () => {
  const renderTabs = (defaultValue = 'tab1') =>
    render(
      <Tab.Root defaultValue={defaultValue}>
        <Tab.List>
          <Tab.Trigger value="tab1">탭1</Tab.Trigger>
          <Tab.Trigger value="tab2">탭2</Tab.Trigger>
        </Tab.List>
        <Tab.Content value="tab1">탭1 내용</Tab.Content>
        <Tab.Content value="tab2">탭2 내용</Tab.Content>
      </Tab.Root>,
    );

  describe('기본 동작', () => {
    it('탭 트리거들이 렌더링된다', () => {
      renderTabs();
      expect(screen.getByText('탭1')).toBeInTheDocument();
      expect(screen.getByText('탭2')).toBeInTheDocument();
    });

    it('defaultValue에 해당하는 탭 콘텐츠가 보인다', () => {
      renderTabs('tab1');
      expect(screen.getByText('탭1 내용')).toBeInTheDocument();
    });

    it('다른 탭 클릭 시 해당 콘텐츠가 표시된다', async () => {
      const user = userEvent.setup();
      renderTabs('tab1');
      await user.click(screen.getByText('탭2'));
      expect(screen.getByText('탭2 내용')).toBeInTheDocument();
    });

    it('활성 탭에 aria-selected="true"가 설정된다', () => {
      renderTabs('tab1');
      const trigger = screen.getByRole('tab', { name: '탭1' });
      expect(trigger).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('styleClass prop', () => {
    it('Tab.List의 styleClass.root이 적용된다', () => {
      const { container } = render(
        <Tab.Root defaultValue="tab1">
          <Tab.List styleClass={{ root: 'flex gap-4' }}>
            <Tab.Trigger value="tab1">탭1</Tab.Trigger>
          </Tab.List>
          <Tab.Content value="tab1">내용</Tab.Content>
        </Tab.Root>,
      );
      expect(container.querySelector('[role="tablist"]')).toHaveClass('flex', 'gap-4');
    });

    it('Tab.Trigger의 styleClass.root이 적용된다', () => {
      render(
        <Tab.Root defaultValue="tab1">
          <Tab.List>
            <Tab.Trigger value="tab1" styleClass={{ root: 'px-4 py-2' }}>
              탭1
            </Tab.Trigger>
          </Tab.List>
          <Tab.Content value="tab1">내용</Tab.Content>
        </Tab.Root>,
      );
      expect(screen.getByRole('tab', { name: '탭1' })).toHaveClass('px-4', 'py-2');
    });

    it('Tab.Content의 styleClass.root이 적용된다', () => {
      render(
        <Tab.Root defaultValue="tab1">
          <Tab.List>
            <Tab.Trigger value="tab1">탭1</Tab.Trigger>
          </Tab.List>
          <Tab.Content value="tab1" styleClass={{ root: 'p-4' }}>
            내용
          </Tab.Content>
        </Tab.Root>,
      );
      expect(screen.getByRole('tabpanel')).toHaveClass('p-4');
    });
  });
});
