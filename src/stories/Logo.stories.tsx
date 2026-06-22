import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '../components/brand/Logo';

/**
 * Regra de uso:
 * - variantes `*-dark`  → logo com texto escuro → usar sobre **fundo claro/branco**
 * - variantes `*-white` → logo com texto branco → usar sobre **fundo escuro/preto**
 *
 * Os decorators abaixo fixam o background correto para cada variante.
 * Alternar o tema do Storybook (light/dark) NÃO deve afetar o fundo — ele é sempre explícito.
 */

const DARK_BG = '#1A1D21';
const LIGHT_BG = '#FFFFFF';

const meta: Meta<typeof Logo> = {
  title: 'Brand/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    // Desabilita o background padrão do Storybook para não conflitar com os decorators
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'Logotipo SuaArena em 6 variantes. Variantes `*-dark` usam texto escuro (fundo claro). Variantes `*-white` usam texto branco (fundo escuro). Recebe `height` em px e calcula o width proporcionalmente.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'horizontal-dark',
        'horizontal-white',
        'icon-orange',
        'icon-white',
        'vertical-dark',
        'vertical-white',
      ],
    },
    height: { control: { type: 'range', min: 24, max: 120, step: 4 } },
  },
  // Decorator dinâmico: lê o variant do args e aplica o fundo correto automaticamente
  decorators: [
    (Story, context) => {
      const variant = (context.args.variant as string) ?? '';
      const isWhiteVariant = variant.includes('white');
      return (
        <div
          style={{ backgroundColor: isWhiteVariant ? DARK_BG : LIGHT_BG }}
          className="p-8 rounded-lg inline-flex"
        >
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const HorizontalDark: Story = {
  name: 'Horizontal — texto escuro (fundo claro)',
  args: { variant: 'horizontal-dark', height: 40 },
};

export const HorizontalWhite: Story = {
  name: 'Horizontal — texto branco (fundo escuro)',
  args: { variant: 'horizontal-white', height: 40 },
};

export const IconOrange: Story = {
  name: 'Ícone laranja (fundo claro)',
  args: { variant: 'icon-orange', height: 64 },
};

export const IconWhite: Story = {
  name: 'Ícone branco (fundo escuro)',
  args: { variant: 'icon-white', height: 64 },
};

export const VerticalDark: Story = {
  name: 'Vertical — texto escuro (fundo claro)',
  args: { variant: 'vertical-dark', height: 96 },
};

export const VerticalWhite: Story = {
  name: 'Vertical — texto branco (fundo escuro)',
  args: { variant: 'vertical-white', height: 96 },
};

export const AllVariants: Story = {
  name: 'Todas as variantes',
  parameters: { controls: { disable: true }, backgrounds: { disable: true } },
  // Override o decorator do meta para renderizar ambas as seções
  decorators: [(Story) => <Story />],
  render: () => (
    <div className="space-y-4">
      <div
        style={{ backgroundColor: LIGHT_BG }}
        className="p-6 rounded-lg flex flex-wrap gap-8 items-center"
      >
        <Logo variant="horizontal-dark" height={36} />
        <Logo variant="icon-orange" height={48} />
        <Logo variant="vertical-dark" height={72} />
      </div>
      <div
        style={{ backgroundColor: DARK_BG }}
        className="p-6 rounded-lg flex flex-wrap gap-8 items-center"
      >
        <Logo variant="horizontal-white" height={36} />
        <Logo variant="icon-white" height={48} />
        <Logo variant="vertical-white" height={72} />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  name: 'Tamanhos',
  parameters: { controls: { disable: true }, backgrounds: { disable: true } },
  decorators: [(Story) => <Story />],
  render: () => (
    <div className="space-y-3 p-6 rounded-lg" style={{ backgroundColor: LIGHT_BG }}>
      {[24, 32, 40, 56, 80].map((h) => (
        <div key={h} className="flex items-center gap-4">
          <span className="text-xs text-gray-400 w-8">{h}px</span>
          <Logo variant="horizontal-dark" height={h} />
        </div>
      ))}
    </div>
  ),
};
