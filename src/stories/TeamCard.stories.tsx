import type { Meta, StoryObj } from '@storybook/react';
import { TeamCard } from '../components/domain/TeamCard';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof TeamCard> = {
  title: 'Domain/TeamCard',
  component: TeamCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof TeamCard>;

// A cor do time vem do dado; nas stories usamos tokens do tema como cor de time.
const LARANJA = 'hsl(var(--primary))';
const AZUL = 'hsl(var(--you))';

export const EmQuadra: Story = {
  name: 'Em quadra',
  args: {
    name: 'Laranja',
    color: LARANJA,
    status: 'em quadra',
    statusTone: 'live',
    players: [
      { name: 'Rafa', goalkeeper: true, stat: '3 gols' },
      { name: 'Eduardo', stat: 'sem gol' },
      { name: 'Mateus', stat: '1 gol · 1 ass.' },
    ],
  },
};

export const VoceNoTime: Story = {
  name: 'Seu time',
  args: {
    ...EmQuadra.args,
    highlight: true,
    players: [
      { name: 'Rafa', goalkeeper: true, stat: '3 gols' },
      { name: 'Eduardo', stat: 'sem gol', you: true },
      { name: 'Mateus', stat: '1 gol · 1 ass.' },
    ],
  },
};

export const NoBanco: Story = {
  name: 'No banco (compacto)',
  args: {
    name: 'Azul',
    color: AZUL,
    status: 'no banco · entra a seguir',
    compact: true,
    players: [{ name: 'Diego' }, { name: 'Gu' }, { name: 'João P.' }, { name: 'Caio' }],
  },
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  args: EmQuadra.args,
  render: () => (
    <TemasLado>
      <div className="space-y-2">
        <TeamCard {...(VoceNoTime.args as React.ComponentProps<typeof TeamCard>)} />
        <TeamCard {...(NoBanco.args as React.ComponentProps<typeof TeamCard>)} />
      </div>
    </TemasLado>
  ),
};
