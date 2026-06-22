import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from '../components/domain/StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Domain/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Mapeia os status do sistema (torneio e inscricao) para Badge com variante e label corretos. ' +
          'Zero configuracao: passe o status e o componente cuida do resto.',
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['registration_open', 'active', 'in_progress', 'finished', 'cancelled', 'confirmed', 'awaiting_payment', 'pending'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Default: Story = {
  args: { status: 'registration_open' },
};

export const TodosStatusTorneio: Story = {
  name: 'Status de torneio',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Torneio</p>
      <div className="flex flex-wrap gap-2">
        <StatusBadge status="registration_open" />
        <StatusBadge status="active" />
        <StatusBadge status="in_progress" />
        <StatusBadge status="finished" />
        <StatusBadge status="cancelled" />
      </div>
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mt-2">Inscricao</p>
      <div className="flex flex-wrap gap-2">
        <StatusBadge status="confirmed" />
        <StatusBadge status="awaiting_payment" />
        <StatusBadge status="pending" />
        <StatusBadge status="cancelled" />
      </div>
    </div>
  ),
};
