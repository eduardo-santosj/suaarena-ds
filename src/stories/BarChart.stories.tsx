import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from '../components/custom/BarChart';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof BarChart> = {
  title: 'Layout/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof BarChart>;

const MESES = [
  { key: 'mai', label: 'mai', value: 9 },
  { key: 'jun', label: 'jun', value: 16 },
  { key: 'jul', label: 'jul', value: 6 },
  { key: 'ago', label: 'ago', value: 13 },
  { key: 'set', label: 'set', value: 22 },
  { key: 'out', label: 'out', value: 30, active: true },
];

export const PontosPorMes: Story = { name: 'Pontos por mês', args: { bars: MESES } };

export const Alto: Story = { args: { bars: MESES, height: 120 } };

export const PoucosDados: Story = {
  name: 'Poucos dados',
  args: { bars: [{ key: 'set', label: 'set', value: 0 }, { key: 'out', label: 'out', value: 10, active: true }] },
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  args: { bars: MESES },
  render: () => (
    <TemasLado>
      <div className="rounded-2xl bg-surface-1 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle-foreground">Pontos por mês</span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-primary">+8 vs set</span>
        </div>
        <BarChart bars={MESES} />
      </div>
    </TemasLado>
  ),
};
