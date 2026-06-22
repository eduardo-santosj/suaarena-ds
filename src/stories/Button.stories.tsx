import type { Meta, StoryObj } from '@storybook/react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Botão base do DS. Suporta 6 variantes e 4 tamanhos. Usa `asChild` para composição com `<Link>` ou qualquer elemento.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'destructive', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Stories individuais ───────────────────────────────────────

export const Default: Story = {
  args: {
    children: 'Salvar',
    variant: 'default',
    size: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Cancelar',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Ver detalhes',
    variant: 'outline',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Excluir',
    variant: 'destructive',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ignorar',
    variant: 'ghost',
  },
};

export const LinkVariant: Story = {
  name: 'Link',
  args: {
    children: 'Ver mais',
    variant: 'link',
  },
};

export const WithIconLeft: Story = {
  args: {
    children: (
      <>
        <Plus /> Novo torneio
      </>
    ),
    variant: 'default',
  },
};

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Excluir <Trash2 />
      </>
    ),
    variant: 'destructive',
  },
};

export const Loading: Story = {
  args: {
    children: (
      <>
        <Loader2 className="animate-spin" /> Salvando…
      </>
    ),
    disabled: true,
  },
};

export const IconOnly: Story = {
  args: {
    children: <Plus />,
    size: 'icon',
    variant: 'outline',
    'aria-label': 'Adicionar',
  },
};

export const Small: Story = {
  args: { children: 'Filtrar', size: 'sm' },
};

export const Large: Story = {
  args: { children: 'Criar conta', size: 'lg' },
};

// ── Galeria de todas as variantes ─────────────────────────────
export const AllVariants: Story = {
  name: 'Todas as variantes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
