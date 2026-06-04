import type { Preview } from '@storybook/react';
import React from 'react';
import '@/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f0f0f0',
        },
      ],
    },
  },
};

export const decorators = [
  (Story) => (
    <Story />
  ),
];

export default preview;
