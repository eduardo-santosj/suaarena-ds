import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PillTabs } from '../components/custom/PillTabs';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof PillTabs> = {
  title: 'Layout/PillTabs',
  component: PillTabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof PillTabs>;

const JOGOS = [
  { key: 'jogos', label: 'Jogos' },
  { key: 'times', label: 'Times' },
  { key: 'tabela', label: 'Tabela' },
];
const MESES = [
  { key: 'out', label: 'Out' }, { key: 'set', label: 'Set' }, { key: 'ago', label: 'Ago' },
  { key: 'jul', label: 'Jul' }, { key: 'geral', label: 'Geral' },
];

function Demo({ options, size }: { options: { key: string; label: string; badge?: number }[]; size?: 'md' | 'sm' }) {
  const [v, setV] = React.useState(options[0].key);
  return <PillTabs options={options} value={v} onChange={setV} size={size} />;
}

export const Padrao: Story = { render: () => <Demo options={JOGOS} /> };

export const ComContagem: Story = {
  name: 'Com contagem',
  render: () => (
    <Demo options={[{ key: 'jogos', label: 'Jogos', badge: 6 }, { key: 'times', label: 'Times', badge: 4 }, { key: 'tabela', label: 'Tabela' }]} />
  ),
};

export const Pequeno: Story = { name: 'Pequeno (meses)', render: () => <Demo options={MESES} size="sm" /> };

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  render: () => (
    <TemasLado>
      <div className="space-y-4">
        <Demo options={JOGOS} />
        <Demo options={MESES} size="sm" />
      </div>
    </TemasLado>
  ),
};
