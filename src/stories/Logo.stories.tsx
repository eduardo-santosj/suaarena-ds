import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '../components/brand/Logo';

const meta: Meta<typeof Logo> = {
  title: 'Brand/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Logotipo SuaArena em 6 variantes. Recebe `height` em px e calcula o width proporcionalmente. Use `aria-label` para acessibilidade.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'icon-orange',
        'icon-white',
        'horizontal-dark',
        'horizontal-white',
        'vertical-dark',
        'vertical-white',
      ],
    },
    height: { control: { type: 'range', min: 24, max: 120, step: 4 } },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const HorizontalDark: Story = {
  name: 'Horizontal (fundo escuro)',
  args: { variant: 'horizontal-dark', height: 40 },
  parameters: { backgrounds: { default: 'dark' } },
  decorators: [
    (Story) => (
      <div className="bg-background dark p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const HorizontalWhite: Story = {
  name: 'Horizontal (fundo claro)',
  args: { variant: 'horizontal-white', height: 40 },
  decorators: [
    (Story) => (
      <div className="bg-[#1A1D21] p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const IconOrange: Story = {
  name: 'Ícone laranja',
  args: { variant: 'icon-orange', height: 64 },
  decorators: [
    (Story) => (
      <div className="bg-background dark p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const IconWhite: Story = {
  name: 'Ícone branco',
  args: { variant: 'icon-white', height: 64 },
  decorators: [
    (Story) => (
      <div className="bg-[#1A1D21] p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const VerticalDark: Story = {
  name: 'Vertical (texto escuro)',
  args: { variant: 'vertical-dark', height: 96 },
  decorators: [
    (Story) => (
      <div className="bg-background p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  name: 'Todas as variantes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="space-y-6 p-6">
      <div className="bg-[#F5F7FA] p-6 rounded-lg flex flex-wrap gap-8 items-center">
        <Logo variant="horizontal-dark" height={36} />
        <Logo variant="icon-orange" height={48} />
        <Logo variant="vertical-dark" height={72} />
      </div>
      <div className="bg-[#1A1D21] p-6 rounded-lg flex flex-wrap gap-8 items-center">
        <Logo variant="horizontal-white" height={36} />
        <Logo variant="icon-white" height={48} />
        <Logo variant="vertical-white" height={72} />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  name: 'Tamanhos',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4 p-6 bg-background dark rounded-lg">
      {[24, 32, 40, 56, 80].map((h) => (
        <div key={h} className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground w-8">{h}px</span>
          <Logo variant="horizontal-dark" height={h} />
        </div>
      ))}
    </div>
  ),
};
