import type { Config } from 'tailwindcss';
import preset from './src/tokens/tailwind-preset';

/** Tailwind config para uso interno do Storybook */
const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  presets: [preset],
};

export default config;
