import { render, screen } from '@testing-library/react';
import QueryProvider from './QueryProvider';

describe('QueryProvider', () => {
  it('children을 렌더링한다', () => {
    render(
      <QueryProvider>
        <div>앱 내용</div>
      </QueryProvider>,
    );
    expect(screen.getByText('앱 내용')).toBeInTheDocument();
  });
});
