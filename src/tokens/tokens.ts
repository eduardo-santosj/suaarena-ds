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
 * Uso no NativeWind (so escuro, cores fixas):
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

/** Tema escuro. Mesmos valores do bloco `.dark` em tokens.css (desenhos 08 a 11). */
export const dark = {
  background: '#1B1E22',
  foreground: '#F2F4F6',

  surface1: '#23262C',
  surface2: '#2A2E35',
  surface3: '#343941',
  /** Palco: bloco do evento ao vivo. */
  stage: '#262A31',
  /** Cromo: tab bar, action bar, sidebar. */
  chrome: '#16181C',

  card: '#23262C',
  cardForeground: '#F2F4F6',
  popover: '#2A2E35',
  popoverForeground: '#F2F4F6',

  primary: '#FF7E29',
  primaryForeground: '#17120D',
  secondary: '#29E7FF',
  secondaryForeground: '#17120D',

  /** Ciano "voce": sua linha, seu time, votacao. */
  you: '#29E7FF',
  /** Amarelo de estrela e resultado. */
  star: '#FFD60A',

  muted: '#343941',
  mutedForeground: '#A3ABB4',
  subtleForeground: '#727B85',
  accent: '#29E7FF',
  accentForeground: '#17120D',

  destructive: '#FF5A4E',
  destructiveForeground: '#FFFFFF',
  success: '#30D158',
  successForeground: '#062A10',
  warning: '#FFD60A',
  warningForeground: '#17120D',

  offline: '#3A2E1B',
  offlineForeground: '#FFD58A',

  border: '#36393D',
  input: '#36393D',
  ring: '#FF7E29',
} as const;

/** Tema claro. Mesmos valores do bloco `:root` em tokens.css (bloco .lt do 08). */
export const light = {
  background: '#F5F7FA',
  foreground: '#1F242A',

  surface1: '#FFFFFF',
  surface2: '#EEF2F6',
  surface3: '#E9EDF2',
  stage: '#FFFFFF',
  chrome: '#FFFFFF',

  card: '#FFFFFF',
  cardForeground: '#1F242A',
  popover: '#EEF2F6',
  popoverForeground: '#1F242A',

  primary: '#FF7E29',
  primaryForeground: '#17120D',
  secondary: '#29E7FF',
  secondaryForeground: '#17120D',

  /** No claro o ciano escurece, senao some no branco. */
  you: '#0A8FA3',
  star: '#FFD60A',

  muted: '#E9EDF2',
  mutedForeground: '#5C646E',
  subtleForeground: '#8A939C',
  accent: '#29E7FF',
  accentForeground: '#17120D',

  destructive: '#E5352B',
  destructiveForeground: '#FFFFFF',
  success: '#1E9E45',
  successForeground: '#FFFFFF',
  warning: '#FFCC00',
  warningForeground: '#17120D',

  offline: '#3A2E1B',
  offlineForeground: '#FFD58A',

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
 * Cores fixas do tema escuro (app que nao troca de tema).
 * Para claro + escuro use `tailwindVarColors` + `themeVars`.
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
  stage: dark.stage,
  chrome: dark.chrome,
  you: dark.you,
  star: dark.star,
  'subtle-foreground': dark.subtleForeground,
  offline: dark.offline,
  'offline-foreground': dark.offlineForeground,
  'brand-orange': brand.orange,
  'brand-cyan': brand.cyan,
  'brand-dark': brand.dark,
  'brand-light': brand.light,
} as const;

/** Nome do token (kebab) -> chave do objeto de tema. */
const TOKEN_KEYS = {
  background: 'background', foreground: 'foreground',
  'surface-1': 'surface1', 'surface-2': 'surface2', 'surface-3': 'surface3',
  stage: 'stage', chrome: 'chrome',
  card: 'card', 'card-foreground': 'cardForeground',
  popover: 'popover', 'popover-foreground': 'popoverForeground',
  primary: 'primary', 'primary-foreground': 'primaryForeground',
  secondary: 'secondary', 'secondary-foreground': 'secondaryForeground',
  you: 'you', star: 'star',
  muted: 'muted', 'muted-foreground': 'mutedForeground', 'subtle-foreground': 'subtleForeground',
  accent: 'accent', 'accent-foreground': 'accentForeground',
  destructive: 'destructive', 'destructive-foreground': 'destructiveForeground',
  success: 'success', 'success-foreground': 'successForeground',
  warning: 'warning', 'warning-foreground': 'warningForeground',
  offline: 'offline', 'offline-foreground': 'offlineForeground',
  border: 'border', input: 'input', ring: 'ring',
} as const satisfies Record<string, keyof typeof dark>;

export type TokenName = keyof typeof TOKEN_KEYS;

function channels(hex: string): string {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(' ');
}

function buildVars(theme: typeof dark | typeof light): Record<`--${TokenName}`, string> {
  const out = {} as Record<`--${TokenName}`, string>;
  (Object.keys(TOKEN_KEYS) as TokenName[]).forEach((name) => {
    out[`--${name}`] = channels(theme[TOKEN_KEYS[name]]);
  });
  return out;
}

/**
 * Variaveis por tema em canais RGB ("27 30 34"), para o tema claro/escuro no
 * React Native: `vars(themeVars[scheme])` do NativeWind na raiz do app.
 */
export const themeVars = {
  light: buildVars(light),
  dark: buildVars(dark),
} as const;

/**
 * `theme.extend.colors` do NativeWind quando o app troca de tema: cada cor le
 * a variavel de `themeVars` e aceita opacidade (`bg-primary/10`). Marca fica fixa.
 */
export const tailwindVarColors = {
  ...(Object.fromEntries(
    (Object.keys(TOKEN_KEYS) as TokenName[]).map((name) => [name, `rgb(var(--${name}) / <alpha-value>)`]),
  ) as Record<TokenName, string>),
  'brand-orange': brand.orange,
  'brand-cyan': brand.cyan,
  'brand-dark': brand.dark,
  'brand-light': brand.light,
};

export type BrandColors = typeof brand;
export type ThemeColors = { [K in keyof typeof dark]: string };
export type TailwindColors = typeof tailwindColors;
