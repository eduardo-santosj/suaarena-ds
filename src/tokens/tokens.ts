/**
 * @eduardo-santosj/ui -- Design Tokens como objeto JS
 *
 * Espelho de `tokens.css` para quem nao roda no DOM: o tailwind.config.js do
 * React Native / NativeWind, scripts de geracao de imagem, e-mail, etc.
 *
 * Regra: este arquivo e `tokens.css` carregam OS MESMOS valores. Se mudar um,
 * muda o outro. O CSS continua sendo a fonte para o web; este objeto e a fonte
 * para tudo que nao le CSS.
 *
 * Uso no NativeWind (app dark-only):
 *   const { tailwindColors } = require('@eduardo-santosj/ui/tokens');
 *   module.exports = { theme: { extend: { colors: tailwindColors } } };
 */

/** Cores de marca. Iguais em qualquer tema. */
export const brand = {
  orange: '#FF7E29',
  cyan: '#29E7FF',
  /** Grafite. Cor de marca (selo, chip, card de share); nao e mais o fundo do dark. */
  dark: '#1A1D21',
  light: '#F5F7FA',
  /** Gelo do brand sheet, usado em fundo claro de arte. */
  cream: '#F1EEE7',
} as const;

/** Tema escuro. Mesmos valores do bloco `.dark` em tokens.css. */
export const dark = {
  background: '#0F1215',
  foreground: '#F5F7FA',

  surface1: '#171B20',
  surface2: '#1F242A',
  surface3: '#272D34',

  card: '#171B20',
  cardForeground: '#F5F7FA',
  popover: '#1F242A',
  popoverForeground: '#F5F7FA',

  primary: '#FF7E29',
  primaryForeground: '#FFFFFF',
  secondary: '#29E7FF',
  secondaryForeground: '#1A1A1A',

  muted: '#272D34',
  mutedForeground: '#8C98A6',
  accent: '#29E7FF',
  accentForeground: '#1A1A1A',

  destructive: '#FF453A',
  destructiveForeground: '#FFFFFF',
  success: '#30D158',
  successForeground: '#062A10',
  warning: '#FFD60A',
  warningForeground: '#1A1A1A',

  border: '#262B31',
  input: '#262B31',
  ring: '#FF7E29',
} as const;

/** Tema claro. Mesmos valores do bloco `:root` em tokens.css. */
export const light = {
  background: '#F5F7FA',
  foreground: '#333333',

  surface1: '#FFFFFF',
  surface2: '#F8FAFC',
  surface3: '#EEF2F6',

  card: '#FFFFFF',
  cardForeground: '#333333',
  popover: '#F8FAFC',
  popoverForeground: '#333333',

  primary: '#FF7E29',
  primaryForeground: '#FFFFFF',
  secondary: '#29E7FF',
  secondaryForeground: '#1A1A1A',

  muted: '#E9EDF2',
  mutedForeground: '#666666',
  accent: '#29E7FF',
  accentForeground: '#1A1A1A',

  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',
  success: '#34C759',
  successForeground: '#FFFFFF',
  warning: '#FFCC00',
  warningForeground: '#1A1A1A',

  border: '#DCE2EA',
  input: '#DCE2EA',
  ring: '#FF7E29',
} as const;

/** Raio. Controle = md/lg, card = 2xl, palco/sheet = 3xl, pill = full. */
export const radius = {
  sm: 6,
  md: 8,
  lg: 10,
  xl: 14,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
} as const;

/**
 * Familias tipograficas. No web entram via next/font (variaveis CSS); no
 * React Native o nome e o da fonte carregada com expo-font.
 */
export const fonts = {
  /** Corpo, formulario, lista. Fonte do sistema: acompanha o Dynamic Type. */
  sans: 'System',
  /** Titulo, placar, numero grande. Fonte do brand sheet. */
  display: 'Poppins',
  /** Rotulo em caixa alta, data, estatistica. */
  mono: 'JetBrainsMono',
} as const;

/**
 * Escala tipografica (px). Piso de 11 so para rotulo mono; nada abaixo disso
 * sobrevive ao Dynamic Type.
 */
export const typeScale = {
  display: { size: 40, weight: '700', tracking: -1.2, family: 'display' },
  largeTitle: { size: 30, weight: '700', tracking: -0.6, family: 'display' },
  title: { size: 22, weight: '700', tracking: -0.2, family: 'display' },
  headline: { size: 17, weight: '600', tracking: 0, family: 'sans' },
  body: { size: 15, weight: '400', tracking: 0, family: 'sans' },
  callout: { size: 14, weight: '400', tracking: 0, family: 'sans' },
  caption: { size: 12, weight: '500', tracking: 0, family: 'sans' },
  micro: { size: 11, weight: '600', tracking: 1.5, family: 'mono', uppercase: true },
} as const;

/** Espacamento em grade de 4. */
export const spacing = {
  /** Margem lateral da tela */
  gutter: 20,
  /** Respiro interno do card */
  card: 16,
  /** Entre itens de lista */
  listGap: 8,
  /** Entre blocos de secao */
  sectionGap: 28,
  /** Alvo minimo de toque (Apple HIG) */
  touchTarget: 44,
} as const;

/**
 * Pronto para `theme.extend.colors` do Tailwind / NativeWind.
 * O app nativo e dark-only, entao usa o tema escuro direto.
 * Mantem os nomes que o NativeWind ja usava (`primary`, `card`, `muted-foreground`...)
 * e adiciona os novos (`surface-1/2/3`, `success`, `warning`).
 */
export const tailwindColors = {
  primary: dark.primary,
  'primary-foreground': dark.primaryForeground,
  secondary: dark.secondary,
  'secondary-foreground': dark.secondaryForeground,
  background: dark.background,
  foreground: dark.foreground,
  card: dark.card,
  'card-foreground': dark.cardForeground,
  popover: dark.popover,
  'popover-foreground': dark.popoverForeground,
  muted: dark.muted,
  'muted-foreground': dark.mutedForeground,
  accent: dark.accent,
  'accent-foreground': dark.accentForeground,
  border: dark.border,
  input: dark.input,
  ring: dark.ring,
  destructive: dark.destructive,
  'destructive-foreground': dark.destructiveForeground,
  success: dark.success,
  'success-foreground': dark.successForeground,
  warning: dark.warning,
  'warning-foreground': dark.warningForeground,
  'surface-1': dark.surface1,
  'surface-2': dark.surface2,
  'surface-3': dark.surface3,
  'brand-orange': brand.orange,
  'brand-cyan': brand.cyan,
  'brand-dark': brand.dark,
  'brand-light': brand.light,
} as const;

export type BrandColors = typeof brand;
export type ThemeColors = typeof dark;
export type TailwindColors = typeof tailwindColors;
