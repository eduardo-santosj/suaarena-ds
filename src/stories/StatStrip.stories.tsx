import type { Meta, StoryObj } from '@storybook/react';
import { StatStrip } from '../components/domain/StatStrip';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof StatStrip> = {
  title: 'Domain/StatStrip',
  component: StatStrip,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof StatStrip>;

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  render: () => (
    <TemasLado>
      <div className="flex flex-col gap-3">
        <StatStrip items={[
          { label: 'outubro', value: '1º', accent: true },
          { label: 'pontos', value: 30 },
          { label: 'títulos', value: 4 },
          { label: 'torneios', value: 12 },
        ]} />
        <StatStrip items={[{ label: 'pagos', value: '18/24' }, { label: 'recebido', value: 'R$ 900', accent: true }]} />
      </div>
    </TemasLado>
  ),
};
