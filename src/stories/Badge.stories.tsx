import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Etiqueta inline para status, categorias e contadores. Variantes extras: `success` e `warning`.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'destructive', 'success', 'warning'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: 'Ativo', variant: 'default' },
};

export const Secondary: Story = {
  args: { children: 'Pendente', variant: 'secondary' },
};

export const Outline: Story = {
  args: { children: 'Rascunho', variant: 'outline' },
};

export const Destructive: Story = {
  args: { children: 'Cancelado', variant: 'destructive' },
};

export const Success: Story = {
  args: { children: 'Confirmado', variant: 'success' },
};

export const Warning: Story = {
  args: { children: 'Aguardando', variant: 'warning' },
};

export const AllVariants: Story = {
  name: 'Todas as variantes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      <Badge variant="default">Ativo</Badge>
      <Badge variant="secondary">Pendente</Badge>
      <Badge variant="outline">Rascunho</Badge>
      <Badge variant="destructive">Cancelado</Badge>
      <Badge variant="success">Confirmado</Badge>
      <Badge variant="warning">Aguardando</Badge>
    </div>
  ),
};

export const UseCases: Story = {
  name: 'Casos de uso reais',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="space-y-3 p-4">
      <div className="flex items-center gap-2 text-sm text-foreground">
        Torneio Beach Tennis 100 <Badge variant="default">BT100</Badge>
      </div>
      <div className="flex items-center gap-2 text-sm text-foreground">
        Inscrição <Badge variant="warning">Aguardando pagamento</Badge>
      </div>
      <div className="flex items-center gap-2 text-sm text-foreground">
        Aluno <Badge variant="success">Check-in confirmado</Badge>
      </div>
      <div className="flex items-center gap-2 text-sm text-foreground">
        Comanda <Badge variant="destructive">Cancelada</Badge>
      </div>
      <div className="flex items-center gap-2 text-sm text-foreground">
        Categoria <Badge variant="outline">Duplas Feminino</Badge>
      </div>
    </div>
  ),
};
