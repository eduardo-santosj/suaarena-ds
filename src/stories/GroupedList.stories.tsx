import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Bell, Palette, Trash2, Trophy } from 'lucide-react';
import { GroupedList, Row } from '../components/custom/GroupedList';
import { Switch } from '../components/ui/switch';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof GroupedList> = {
  title: 'Layout/GroupedList',
  component: GroupedList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof GroupedList>;

function Exemplo() {
  const [on, setOn] = React.useState(true);
  return (
    <div className="space-y-4">
      <GroupedList>
        <Row icon={<Trophy />} label="Pontuação" hint="1º 10 · 2º 5 · 3º 1 · último −1" chevron onClick={() => {}} />
        <Row icon={<Palette />} label="Tema" right={<span className="font-mono text-[11px] text-muted-foreground">Automático</span>} chevron onClick={() => {}} />
        <Row icon={<Bell />} label="Avisos de cobrança" hint="No vencimento e 3 dias depois" right={<Switch checked={on} onCheckedChange={setOn} />} />
      </GroupedList>
      <GroupedList>
        <Row icon={<Trash2 />} label="Excluir conta" danger chevron onClick={() => {}} />
      </GroupedList>
    </div>
  );
}

export const Ajustes: Story = { render: () => <Exemplo /> };

export const SemIcone: Story = {
  name: 'Sem ícone',
  render: () => (
    <GroupedList>
      <Row label="Membros" right={<span className="font-mono text-[11px] text-muted-foreground">31</span>} chevron onClick={() => {}} />
      <Row label="Atletas" chevron onClick={() => {}} />
    </GroupedList>
  ),
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  render: () => <TemasLado><Exemplo /></TemasLado>,
};
