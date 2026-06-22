import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';
import React from 'react';
import '../src/tokens/tokens.css';

const LIGHT_BG = 'hsl(216, 33%, 97%)'; // #F5F7FA
const DARK_BG  = 'hsl(214, 11%, 12%)'; // #1A1D21

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    docs: {
      toc: true,
    },
  },
  decorators: [
    // Aplica classe dark + background correto no wrapper
    // Garante que CSS variables e cores de texto funcionem em ambos os temas
    (Story, context) => {
      const isDark = (context.globals as Record<string, string>)['theme'] === 'dark';
      return React.createElement(
        'div',
        {
          className: isDark ? 'dark' : '',
          style: { background: isDark ? DARK_BG : LIGHT_BG, minHeight: '100%' },
        },
        React.createElement(Story),
      );
    },
    withThemeByClassName({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
