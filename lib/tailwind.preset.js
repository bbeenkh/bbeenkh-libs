import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

/**
 * 디자인 시스템 공용으로 사용하기 위한 preset config
 * 디자인 시스템을 사용하기 위해서는 해당 파일을 tailwind.config.js에 preset으로 추가해야 함
 */
export default {
  content: ['./**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--ods-color-primary)',
        secondary: 'var(--ods-color-secondary)',
        tertiary: 'var(--ods-color-tertiary)',
        caption: 'var(--ods-color-caption)',
        black: 'var(--ods-color-black)',
        white: 'var(--ods-color-white)',
        'off-white': 'var(--ods-color-off-white)',
        card: 'var(--ods-color-card)',
        gray: {
          900: 'var(--ods-color-gray-900)',
          800: 'var(--ods-color-gray-800)',
          700: 'var(--ods-color-gray-700)',
          600: 'var(--ods-color-gray-600)',
          500: 'var(--ods-color-gray-500)',
          400: 'var(--ods-color-gray-400)',
          300: 'var(--ods-color-gray-300)',
          200: 'var(--ods-color-gray-200)',
          100: 'var(--ods-color-gray-100)',
          50: 'var(--ods-color-gray-50)',
        },
        state: {
          danger: 'var(--ods-color-state-danger)',
          warning: 'var(--ods-color-state-warning)',
          success: 'var(--ods-color-state-success)',
          info: 'var(--ods-color-state-info)',
        },
        borderActive: 'var(--ods-color-border-active)',
        borderPrimary: 'var(--ods-color-border-primary)',
        borderSecondary: 'var(--ods-color-border-secondary)',
      },
      fontSize: {
        xxxl: 'var(--ods-font-xxxl)',
        xxl: 'var(--ods-font-xxl)',
        xl: 'var(--ods-font-xl)',
        lg: 'var(--ods-font-lg)',
        md: 'var(--ods-font-md)',
        sm: 'var(--ods-font-sm)',
        xs: 'var(--ods-font-xs)',
        xxs: 'var(--ods-font-xxs)',
        h1: [
          'var(--ods-font-h1-size)',
          { fontWeight: 700, lineHeight: 'var(--ods-font-h1-line)' },
        ],
        h2: [
          'var(--ods-font-h2-size)',
          { fontWeight: 700, lineHeight: 'var(--ods-font-h2-line)' },
        ],
        h3: [
          'var(--ods-font-h3-size)',
          { fontWeight: 700, lineHeight: 'var(--ods-font-h3-line)' },
        ],
        h4: [
          'var(--ods-font-h4-size)',
          { fontWeight: 400, lineHeight: 'var(--ods-font-h4-line)' },
        ],
        title1: [
          'var(--ods-font-title1-size)',
          { fontWeight: 700, lineHeight: 'var(--ods-font-title1-line)' },
        ],
        title2: [
          'var(--ods-font-title2-size)',
          { fontWeight: 400, lineHeight: 'var(--ods-font-title2-line)' },
        ],
        title3: [
          'var(--ods-font-title3-size)',
          { fontWeight: 700, lineHeight: 'var(--ods-font-title3-line)' },
        ],
        title4: [
          'var(--ods-font-title4-size)',
          { fontWeight: 400, lineHeight: 'var(--ods-font-title4-line)' },
        ],
        body1: [
          'var(--ods-font-body1-size)',
          { fontWeight: 700, lineHeight: 'var(--ods-font-body1-line)' },
        ],
        body2: [
          'var(--ods-font-body2-size)',
          { fontWeight: 400, lineHeight: 'var(--ods-font-body2-line)' },
        ],
        body3: [
          'var(--ods-font-body3-size)',
          { fontWeight: 400, lineHeight: 'var(--ods-font-body3-line)' },
        ],
      },
      fontWeight: {
        bold: 700,
        regular: 400,
      },
      spacing: {
        xxxl: 'var(--ods-space-xxxl)',
        xxl: 'var(--ods-space-xxl)',
        xl: 'var(--ods-space-xl)',
        lg: 'var(--ods-space-lg)',
        md: 'var(--ods-space-md)',
        sm: 'var(--ods-space-sm)',
        xs: 'var(--ods-space-xs)',
        xxs: 'var(--ods-space-xxs)',
        xxxs: 'var(--ods-space-xxxs)',
      },
      screens: {
        mobile: 'var(--ods-layout-mobile)',
        tablet: 'var(--ods-layout-tablet)',
        desktop: 'var(--ods-layout-desktop)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s linear infinite',
      },
    },
    ...convertRemToEm(defaultTheme),
  },
  // 스크롤바 제거 플러그인
  // https://www.npmjs.com/package/tailwind-scrollbar-hide
  plugins: [
    tailwindScrollbarHide,
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.flex-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.flex-start': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        },
      });
    }),
  ],
};

/**
 * tailwind rem 단위를 em 단위로 변환, tailwind는 em 지원안해 직접 변환
 * 참고: https://github.com/tailwindlabs/tailwindcss/issues/1232
 * @param {*} input: tailwind defaultTheme
 * @returns
 */
function convertRemToEm(input) {
  if (input == null) {
    return input;
  }
  switch (typeof input) {
    case 'object': {
      if (Array.isArray(input)) {
        return input.map((val) => convertRemToEm(val));
      }
      const ret = {};
      for (const key in input) {
        ret[key] = convertRemToEm(input[key]);
      }
      return ret;
    }
    case 'string': {
      return input.replace(
        /(\d*\.?\d+)rem$/,
        (_, val) => `${parseFloat(val)}em`,
      );
    }
    case 'function': {
      return eval(
        input
          .toString()
          .replace(/(\d*\.?\d+)rem/g, (_, val) => `${parseFloat(val)}em`),
      );
    }
    default:
      return input;
  }
}
