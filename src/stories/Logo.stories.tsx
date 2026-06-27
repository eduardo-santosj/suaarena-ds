import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '../components/brand/Logo';

const DARK_BG = '#1A1D21';
const LIGHT_BG = '#FFFFFF';

const meta: Meta<typeof Logo> = {
  title: 'Brand/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'Logotipo SuaArena em 6 variantes base + variantes de produto (Torneios / Ferinos).\n\n' +
          'Passe `product="torneio"` ou `product="ferinos"` para exibir o wordmark empilhado do sub-produto.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['horizontal-dark', 'horizontal-white', 'icon-orange', 'icon-white', 'vertical-dark', 'vertical-white'],
    },
    product: {
      control: 'select',
      options: [undefined, 'torneio', 'ferinos'],
      description: 'Sub-produto. Quando definido, exibe o logo de produto com wordmark empilhado.',
    },
    height: { control: { type: 'range', min: 24, max: 120, step: 4 } },
  },
  decorators: [
    (Story, context) => {
      const variant = (context.args.variant as string) ?? '';
      const isWhiteVariant = variant.includes('white');
      return (
        <div style={{ backgroundColor: isWhiteVariant ? DARK_BG : LIGHT_BG }} className="p-8 rounded-lg inline-flex">
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Logo>;

/* ── Base variants ─────────────────────────────────────────────────────────── */

export const HorizontalDark: Story = {
  name: 'Horizontal - texto escuro (fundo claro)',
  args: { variant: 'horizontal-dark', height: 40 },
};

export const HorizontalWhite: Story = {
  name: 'Horizontal - texto branco (fundo escuro)',
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
  name: 'Vertical - texto escuro (fundo claro)',
  args: { variant: 'vertical-dark', height: 96 },
};

export const VerticalWhite: Story = {
  name: 'Vertical - texto branco (fundo escuro)',
  args: { variant: 'vertical-white', height: 96 },
};

/* ── Product variants ──────────────────────────────────────────────────────── */

export const TorneiosLight: Story = {
  name: 'Torneios - fundo claro',
  args: { variant: 'horizontal-dark', product: 'torneio', height: 56 },
};

export const TorneiosDark: Story = {
  name: 'Torneios - fundo escuro',
  args: { variant: 'horizontal-white', product: 'torneio', height: 56 },
};

export const FerinosLight: Story = {
  name: 'Ferinos - fundo claro',
  args: { variant: 'horizontal-dark', product: 'ferinos', height: 56 },
};

export const FerinosDark: Story = {
  name: 'Ferinos - fundo escuro',
  args: { variant: 'horizontal-white', product: 'ferinos', height: 56 },
};

/* ── Showcase grids ────────────────────────────────────────────────────────── */

export const AllVariants: Story = {
  name: 'Todas as variantes base',
  parameters: { controls: { disable: true }, backgrounds: { disable: true } },
  decorators: [(Story) => <Story />],
  render: () => (
    <div className="space-y-4">
      <div style={{ backgroundColor: LIGHT_BG }} className="p-6 rounded-lg flex flex-wrap gap-8 items-center">
        <Logo variant="horizontal-dark" height={36} />
        <Logo variant="icon-orange" height={48} />
        <Logo variant="vertical-dark" height={72} />
      </div>
      <div style={{ backgroundColor: DARK_BG }} className="p-6 rounded-lg flex flex-wrap gap-8 items-center">
        <Logo variant="horizontal-white" height={36} />
        <Logo variant="icon-white" height={48} />
        <Logo variant="vertical-white" height={72} />
      </div>
    </div>
  ),
};

export const AllProducts: Story = {
  name: 'Variantes de produto',
  parameters: { controls: { disable: true }, backgrounds: { disable: true } },
  decorators: [(Story) => <Story />],
  render: () => (
    <div className="space-y-4">
      <div style={{ backgroundColor: LIGHT_BG }} className="p-6 rounded-lg flex flex-wrap gap-12 items-center">
        <Logo product="torneio" variant="horizontal-dark" height={52} />
        <Logo product="ferinos" variant="horizontal-dark" height={52} />
      </div>
      <div style={{ backgroundColor: DARK_BG }} className="p-6 rounded-lg flex flex-wrap gap-12 items-center">
        <Logo product="torneio" variant="horizontal-white" height={52} />
        <Logo product="ferinos" variant="horizontal-white" height={52} />
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

export const ProductSizes: Story = {
  name: 'Tamanhos - Produto',
  parameters: { controls: { disable: true }, backgrounds: { disable: true } },
  decorators: [(Story) => <Story />],
  render: () => (
    <div className="space-y-3 p-6 rounded-lg" style={{ backgroundColor: LIGHT_BG }}>
      {[32, 40, 52, 64, 80].map((h) => (
        <div key={h} className="flex items-center gap-4">
          <span className="text-xs text-gray-400 w-8">{h}px</span>
          <Logo product="torneio" variant="horizontal-dark" height={h} />
        </div>
      ))}
    </div>
  ),
};
