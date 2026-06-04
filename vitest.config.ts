import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

/** CSS와 SVG 파일을 테스트 환경에서 빈/모의 모듈로 처리하는 플러그인 */
const mockStaticAssetsPlugin = {
  name: 'mock-static-assets',
  resolveId(id: string) {
    if (id.endsWith('.css')) return '\0mock-css';
    const cleanId = id.split('?')[0];
    if (cleanId.endsWith('.svg')) return '\0mock-svg';
  },
  load(id: string) {
    if (id === '\0mock-css') return '';
    if (id === '\0mock-svg') {
      return `
        import React from 'react';
        const SvgMock = (props) => React.createElement('svg', props);
        export default SvgMock;
        export const ReactComponent = SvgMock;
      `;
    }
  },
};

export default defineConfig({
  plugins: [react(), mockStaticAssetsPlugin],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/lib/components/original/**',
    ],
  },
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, 'lib/'),
    },
  },
});
