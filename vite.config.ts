import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import typescriptPlugin from '@rollup/plugin-typescript';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts';
import path from 'path';

const isIconDir = (dir: string) => {
  return dir.includes('lib/assets/icons');
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['lib'],
      exclude: ['**/*.stories.tsx', './lib/ImportTest.tsx'],
    }),
    svgr({}),
  ],
  // absolute path
  resolve: {
    alias: {
      '@/': `${__dirname}/lib/`,
    },
  },
  assetsInclude: ['**/*.svg', '**/*.png'],
  build: {
    copyPublicDir: true, // static asset 복사 위해 true로
    outDir: path.resolve(__dirname, 'dist'), // output 지정
    /**
     * 모듈: esm, cjs 동시 지원 방식 사용 (jest, nextjs에서 문제발생)
     */
    lib: {
      entry: {
        index: path.resolve(__dirname, 'lib/index.tsx'), // entry 지정
        preset: path.resolve(__dirname, 'lib/tailwind.preset.js'), // tailwind preset 지정
      },
      formats: ['es', 'cjs'], // 번들링 포맷 지정
      fileName: (format, entryName) => {
        if (entryName === 'preset') {
          if (format === 'es') {
            return 'preset.mjs'; // mjs 번들
          } else {
            return 'preset.js'; // cjs 번들
          }
        }
        if (format === 'es') {
          // TODO: 모듈명에 맞게 번들파일명 지정, lib/xxx/[모듈명]/index 방식으로 통일필요
          return 'index.mjs'; // mjs 번들
        } else if (format === 'cjs') {
          return 'index.js'; // cjs 번들
        }
        return 'index.js';
      },
    },
    target: 'modules',
    minify: 'terser', // 번들링시 minify 여부
    // rollup 옵션
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-toastify',
        'tailwind-merge',
        'react-datepicker',
        'date-fns',
        'react-modal',
        'jotai',
      ], // 외부 라이브러리 지정 (번들에 포함되지 않고 외부 라이브러리를 사용하도록 설정)
      output: {
        /**
         * tree-shaking 적용위해 추가
         * https://rollupjs.org/configuration-options/#output-preservemodules
         */
        preserveModules: false,
        plugins: [
          typescriptPlugin({
            tsconfig: './tsconfig.json',
            compilerOptions: {
              declaration: true,
              declarationDir: path.resolve(__dirname, 'dist'),
              declarationMap: true,
              sourceMap: true,
              outDir: path.resolve(__dirname, 'dist'),
            },
          }),
        ],
        /**
         * cjs모듈에 대해 es모듈 형식으로 cjs모듈을 사용할 수 있도록 설정
         * https://rollupjs.org/configuration-options/#output-interop
         */
        interop: 'auto',
        assetFileNames(chunkInfo) {
          if (chunkInfo.name === 'style.css') {
            return 'ods-style.css'; // 원하는 파일명으로 변경
          }
          return chunkInfo.name ?? '';
        },
      },
    },
    // Terser 옵션
    terserOptions: {
      compress: {
        module: true,
        drop_console: true, // console.log 제거
      },
    },
  },
});
