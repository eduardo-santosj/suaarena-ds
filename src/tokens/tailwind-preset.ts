import type { Config } from 'tailwindcss';

type Preset = Omit<Config, 'content'>;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const animate = require('tailwindcss-animate');

/**
 * @sua-arena/ui — Tailwind Preset
 *
 * Adicione ao tailwind.config.ts de qualquer projeto:
 *
 * ```ts
 * import suaArenaPreset from '@sua-arena/ui/tailwind-preset';
 *
 * export default {
 *   presets: [suaArenaPreset],
 *   content: [...seu conteúdo..., './node_modules/@sua-arena/ui/dist/**'],
 * };
 * ```
 */
const preset: Preset = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        border:     'hsl(var(--border))',
        input:      'hsl(var(--input))',
        ring:       'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // ── Aliases diretos para a paleta de marca ──
        brand: {
          orange: '#FF7E29',  // Laranja Solar
          cyan:   '#29E7FF',  // Ciano Areia
          dark:   '#1A1D21',  // Fundo escuro
          light:  '#F5F7FA',  // Branco Gelo
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(-4px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%':      { transform: 'rotate(10deg)' },
          '75%':      { transform: 'rotate(-10deg)' },
        },
        'point-left': {
          '0%, 100%': { transform: 'translateX(0)', opacity: '1' },
          '50%':      { transform: 'translateX(-6px)', opacity: '0.4' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'fade-in':        'fade-in 0.15s ease-out',
        wiggle:           'wiggle 0.5s ease-in-out',
        'point-left':     'point-left 1s ease-in-out infinite',
      },
    },
  },
  plugins: [animate],
};

export default preset;
