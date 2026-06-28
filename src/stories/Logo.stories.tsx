import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '../components/brand/Logo';

const DARK_BG   = '#1A1D21';
const ORANGE_BG = '#FF7E29';
const GELO_BG   = '#F1EEE7';
const LIGHT_BG  = '#FFFFFF';

const meta: Meta<typeof Logo> = {
  title: 'Brand/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'Logotipo SuaArena — 8 variantes base + variantes de produto (Torneios / Ferinos).\n\n' +
          '**Ícone:** `icon-orange` · `icon-dark` · `icon-light` · `icon-gelo`\n\n' +
          '**Horizontal:** `horizontal-dark` (fundo escuro) · `horizontal-light` (fundo claro)\n\n' +
          '**Vertical:** `vertical-dark` (fundo escuro) · `vertical-orange` (fundo laranja)\n\n' +
          '**Produto:** `product="torneio"` ou `product="ferinos"` — layout herdado do `variant`.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'icon-orange', 'icon-dark', 'icon-light', 'icon-gelo',
        'horizontal-dark', 'horizontal-light',
        'vertical-dark', 'vertical-orange',
      ],
    },
    product: {
      control: 'select',
      options: [undefined, 'torneio', 'ferinos'],
    },
    height: { control: { type: 'range', min: 24, max: 120, step: 4 } },
  },
  decorators: [
    (Story, context) => {
      const variant = (context.args.variant as string) ?? '';
      let bg = LIGHT_BG;
      if (variant.includes('-dark'))   bg = DARK_BG;
      if (variant.includes('-orange')) bg = ORANGE_BG;
      if (variant.includes('-gelo'))   bg = GELO_BG;
      if (context.args.product)        bg = DARK_BG;
      return (
        <div style={{ backgroundColor: bg }} className="p-8 rounded-lg inline-flex">
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Logo>;

/* ── Ícones ─────────────────────────────────────────────────────────────────── */

export const IconOrange: Story = {
  name: 'Ícone — fundo laranja',
  args: { variant: 'icon-orange', height: 64 },
};
export const IconDark: Story = {
  name: 'Ícone — fundo escuro',
  args: { variant: 'icon-dark', height: 64 },
};
export const IconLight: Story = {
  name: 'Ícone — fundo claro',
  args: { variant: 'icon-light', height: 64 },
};
export const IconGelo: Story = {
  name: 'Ícone — fundo gelo',
  args: { variant: 'icon-gelo', height: 64 },
};

/* ── Horizontal ─────────────────────────────────────────────────────────────── */

export const HorizontalDark: Story = {
  name: 'Horizontal — fundo escuro',
  args: { variant: 'horizontal-dark', height: 40 },
};
export const HorizontalLight: Story = {
  name: 'Horizontal — fundo claro',
  args: { variant: 'horizontal-light', height: 40 },
};

/* ── Vertical ───────────────────────────────────────────────────────────────── */

export const VerticalDark: Story = {
  name: 'Vertical — fundo escuro',
  args: { variant: 'vertical-dark', height: 96 },
};
export const VerticalOrange: Story = {
  name: 'Vertical — fundo laranja',
  args: { variant: 'vertical-orange', height: 96 },
};

/* ── Produto: Torneios ──────────────────────────────────────────────────────── */

export const TorneiosHorizontalStory: Story = {
  name: 'Torneios — horizontal',
  args: { product: 'torneio', variant: 'horizontal-dark', height: 56 },
};
export const TorneiosVerticalStory: Story = {
  name: 'Torneios — vertical',
  args: { product: 'torneio', variant: 'vertical-dark', height: 96 },
};
export const TorneiosIconStory: Story = {
  name: 'Torneios — ícone',
  args: { product: 'torneio', variant: 'icon-dark', height: 80 },
};

/* ── Produto: Ferinos ───────────────────────────────────────────────────────── */

export const FerinosHorizontalStory: Story = {
  name: 'Ferinos — horizontal',
  args: { product: 'ferinos', variant: 'horizontal-dark', height: 56 },
};
export const FerinosVerticalStory: Story = {
  name: 'Ferinos — vertical',
  args: { product: 'ferinos', variant: 'vertical-dark', height: 96 },
};
export const FerinosIconStory: Story = {
  name: 'Ferinos — ícone',
  args: { product: 'ferinos', variant: 'icon-dark', height: 80 },
};

/* ── Showcases ──────────────────────────────────────────────────────────────── */

export const AllVariants: Story = {
  name: 'Todas as variantes base',
  parameters: { controls: { disable: true }, backgrounds: { disable: true } },
  decorators: [(Story) => <Story />],
  render: () => (
    <div className="space-y-4">
      <div style={{ backgroundColor: DARK_BG }} className="p-6 rounded-lg flex flex-wrap gap-8 items-center">
        <Logo variant="horizontal-dark" height={36} />
        <Logo variant="vertical-dark"   height={72} />
        <Logo variant="icon-dark"       height={48} />
      </div>
      <div style={{ backgroundColor: LIGHT_BG }} className="p-6 rounded-lg flex flex-wrap gap-8 items-center">
        <Logo variant="horizontal-light" height={36} />
        <Logo variant="icon-light"       height={48} />
      </div>
      <div style={{ backgroundColor: ORANGE_BG }} className="p-6 rounded-lg flex flex-wrap gap-8 items-center">
        <Logo variant="vertical-orange" height={72} />
        <Logo variant="icon-orange"     height={48} />
      </div>
      <div style={{ backgroundColor: GELO_BG }} className="p-6 rounded-lg flex flex-wrap gap-8 items-center">
        <Logo variant="icon-gelo" height={48} />
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
      <div style={{ backgroundColor: DARK_BG }} className="p-6 rounded-lg flex flex-wrap gap-12 items-center">
        <Logo product="torneio" variant="horizontal-dark" height={52} />
        <Logo product="ferinos" variant="horizontal-dark" height={52} />
      </div>
      <div style={{ backgroundColor: DARK_BG }} className="p-6 rounded-lg flex flex-wrap gap-12 items-end">
        <Logo product="torneio" variant="vertical-dark" height={80} />
        <Logo product="ferinos" variant="vertical-dark" height={80} />
      </div>
      <div style={{ backgroundColor: DARK_BG }} className="p-6 rounded-lg flex flex-wrap gap-8 items-center">
        <Logo product="torneio" variant="icon-dark" height={72} />
        <Logo product="ferinos" variant="icon-dark" height={72} />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  name: 'Tamanhos',
  parameters: { controls: { disable: true }, backgrounds: { disable: true } },
  decorators: [(Story) => <Story />],
  render: () => (
    <div className="space-y-3 p-6 rounded-lg" style={{ backgroundColor: DARK_BG }}>
      {[24, 32, 40, 56, 80].map((h) => (
        <div key={h} className="flex items-center gap-4">
          <span className="text-xs text-gray-400 w-8">{h}px</span>
          <Logo variant="horizontal-dark" height={h} />
        </div>
      ))}
    </div>
  ),
};
