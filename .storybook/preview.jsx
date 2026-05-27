/** @type { import('@storybook/react-vite').Preview } */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '../src/styles/style.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  ),
];

export default preview;