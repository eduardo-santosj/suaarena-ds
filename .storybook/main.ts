import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: (config) => {
    // Tailwind v4 via plugin Vite (substitui PostCSS)
    config.plugins = [...(config.plugins ?? []), tailwindcss()];

    // Suprime warnings de "use client" dos pacotes Radix UI no build do Storybook.
    config.build = {
      ...config.build,
      rollupOptions: {
        ...config.build?.rollupOptions,
        onwarn(warning, warn) {
          if (
            warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
            warning.message.includes('"use client"')
          ) {
            return;
          }
          warn(warning);
        },
      },
    };
    return config;
  },
};

export default config;
