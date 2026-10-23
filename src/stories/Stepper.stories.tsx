import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from '../components/custom/Stepper';
import { GroupedList, Row } from '../components/custom/GroupedList';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof Stepper> = {
  title: 'Layout/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

function Demo({ start = 4, ...rest }: { start?: number; min?: number; max?: number; step?: number; format?: (v: number) => string; label?: string }) {
  const [v, setV] = React.useState(start);
  return <Stepper value={v} onChange={setV} {...rest} />;
}

export const Padrao: Story = { render: () => <Demo min={2} max={8} label="times" /> };

export const ComFormato: Story = {
  name: 'Com formato (minutos)',
  render: () => <Demo start={7} min={5} max={30} step={1} format={(v) => `${v} min`} label="duração do jogo" />,
};

export const NosLimites: Story = {
  name: 'Nos limites',
  render: () => (
    <div className="flex gap-8">
      <Demo start={2} min={2} max={8} label="mínimo" />
      <Demo start={8} min={2} max={8} label="máximo" />
    </div>
  ),
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  render: () => (
    <div className="w-[640px] max-w-full">
      <TemasLado>
        <GroupedList>
          <Row label="Times por rodada" right={<Demo min={2} max={8} label="times" />} />
          <Row label="Duração do jogo" right={<Demo start={7} min={5} max={30} format={(v) => `${v} min`} label="duração" />} />
        </GroupedList>
      </TemasLado>
    </div>
  ),
};
