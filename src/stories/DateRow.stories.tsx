import type { Meta, StoryObj } from '@storybook/react';
import { DateRow } from '../components/custom/DateRow';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof DateRow> = {
  title: 'Layout/DateRow',
  component: DateRow,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DateRow>;

const Aberto = <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-success">aberto</span>;
const Seta = <span className="font-mono text-[11px] text-muted-foreground">›</span>;

export const Torneio: Story = {
  args: { weekday: 'sáb', day: '01', month: 'nov', title: 'Ferino de Novembro', subtitle: 'Praia Brava · inscrições abertas · 14 duplas', right: Aberto },
};

export const ComCampeao: Story = {
  name: 'Anterior com campeão',
  args: { weekday: 'sáb', day: '11', month: 'out', title: 'Torneio Ferino Outubro', subtitle: 'Campeões: Bruno e Caio', right: Seta, onClick: () => {} },
};

export const Rodada: Story = {
  args: { weekday: 'qui', day: '16', month: 'out', title: '6 jogos · 16 jogadores', subtitle: 'Craque Rafa · artilheiro Bruno (4)', right: Seta, onClick: () => {} },
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  args: Torneio.args,
  render: () => (
    <TemasLado>
      <div className="space-y-2">
        <DateRow weekday="sáb" day="01" month="nov" title="Ferino de Novembro" subtitle="Praia Brava · inscrições abertas · 14 duplas" right={Aberto} />
        <DateRow weekday="sáb" day="11" month="out" title="Torneio Ferino Outubro" subtitle="Campeões: Bruno e Caio" right={Seta} onClick={() => {}} />
      </div>
    </TemasLado>
  ),
};
