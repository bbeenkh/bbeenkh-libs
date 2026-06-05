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
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        caption: 'var(--color-caption)',
        black: 'var(--color-black)',
        white: 'var(--color-white)',
        'off-white': 'var(--color-off-white)',
        card: 'var(--color-card)',
        gray: {
          900: 'var(--color-gray-900)',
          800: 'var(--color-gray-800)',
          700: 'var(--color-gray-700)',
          600: 'var(--color-gray-600)',
          500: 'var(--color-gray-500)',
          400: 'var(--color-gray-400)',
          300: 'var(--color-gray-300)',
          200: 'var(--color-gray-200)',
          100: 'var(--color-gray-100)',
          50: 'var(--color-gray-50)',
        },
        state: {
          danger: 'var(--color-state-danger)',
          warning: 'var(--color-state-warning)',
          success: 'var(--color-state-success)',
          info: 'var(--color-state-info)',
        },
        borderActive: 'var(--color-border-active)',
        borderPrimary: 'var(--color-border-primary)',
        borderSecondary: 'var(--color-border-secondary)',
      },
      fontSize: {
        xxxl: 'var(--font-xxxl)',
        xxl: 'var(--font-xxl)',
        xl: 'var(--font-xl)',
        lg: 'var(--font-lg)',
        md: 'var(--font-md)',
        sm: 'var(--font-sm)',
        xs: 'var(--font-xs)',
        xxs: 'var(--font-xxs)',
        h1: [
          'var(--font-h1-size)',
          { fontWeight: 700, lineHeight: 'var(--font-h1-line)' },
        ],
        h2: [
          'var(--font-h2-size)',
          { fontWeight: 700, lineHeight: 'var(--font-h2-line)' },
        ],
        h3: [
          'var(--font-h3-size)',
          { fontWeight: 700, lineHeight: 'var(--font-h3-line)' },
        ],
        h4: [
          'var(--font-h4-size)',
          { fontWeight: 400, lineHeight: 'var(--font-h4-line)' },
        ],
        title1: [
          'var(--font-title1-size)',
          { fontWeight: 700, lineHeight: 'var(--font-title1-line)' },
        ],
        title2: [
          'var(--font-title2-size)',
          { fontWeight: 400, lineHeight: 'var(--font-title2-line)' },
        ],
        title3: [
          'var(--font-title3-size)',
          { fontWeight: 700, lineHeight: 'var(--font-title3-line)' },
        ],
        title4: [
          'var(--font-title4-size)',
          { fontWeight: 400, lineHeight: 'var(--font-title4-line)' },
        ],
        body1: [
          'var(--font-body1-size)',
          { fontWeight: 700, lineHeight: 'var(--font-body1-line)' },
        ],
        body2: [
          'var(--font-body2-size)',
          { fontWeight: 400, lineHeight: 'var(--font-body2-line)' },
        ],
        body3: [
          'var(--font-body3-size)',
          { fontWeight: 400, lineHeight: 'var(--font-body3-line)' },
        ],
      },
      fontWeight: {
        bold: 700,
        regular: 400,
      },
      spacing: {
        xxxl: 'var(--space-xxxl)',
        xxl: 'var(--space-xxl)',
        xl: 'var(--space-xl)',
        lg: 'var(--space-lg)',
        md: 'var(--space-md)',
        sm: 'var(--space-sm)',
        xs: 'var(--space-xs)',
        xxs: 'var(--space-xxs)',
        xxxs: 'var(--space-xxxs)',
      },
      screens: {
        mobile: 'var(--layout-mobile)',
        tablet: 'var(--layout-tablet)',
        desktop: 'var(--layout-desktop)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
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
