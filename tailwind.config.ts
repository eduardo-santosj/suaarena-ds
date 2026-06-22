/**
 * tailwind.config.ts
 *
 * Em Tailwind v4 o config e CSS-first via @theme em tokens.css.
 * Este arquivo e mantido apenas para compatibilidade com ferramentas
 * que esperam um config JS (IntelliSense, lint, etc).
 *
 * O @tailwindcss/vite no Storybook detecta conteudo automaticamente.
 */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
};

export default config;
