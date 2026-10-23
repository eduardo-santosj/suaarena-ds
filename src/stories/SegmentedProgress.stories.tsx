import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedProgress } from '../components/custom/SegmentedProgress';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof SegmentedProgress> = {
  title: 'Layout/SegmentedProgress',
  component: SegmentedProgress,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof SegmentedProgress>;

export const Rodada: Story = { args: { total: 6, current: 3, label: 'Rodada 3 de 6' } };

export const ComConcluidosExplicitos: Story = {
  name: 'Concluidos explicitos',
  args: { total: 5, current: 4, done: 2, label: 'Fase 4 de 5' },
};

export const SemRotulo: Story = { args: { total: 4, current: 1 } };

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  args: Rodada.args,
  render: () => (
    <TemasLado>
      <div className="space-y-4">
        <SegmentedProgress total={6} current={3} label="Rodada 3 de 6" />
        <SegmentedProgress total={6} current={6} label="Rodada 6 de 6" />
      </div>
    </TemasLado>
  ),
};
