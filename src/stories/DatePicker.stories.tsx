import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from '../components/domain/DatePicker';
import { FormField } from '../components/domain/FormField';

const meta: Meta<typeof DatePicker> = {
  title: 'Domain/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

function Controlled({ placeholder }: { placeholder?: string }) {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <div className="w-64">
      <DatePicker value={date} onChange={setDate} placeholder={placeholder} />
      {date && <p className="text-xs text-muted-foreground mt-2">Selecionado: {date.toLocaleDateString('pt-BR')}</p>}
    </div>
  );
}

export const Default: Story = { render: () => <Controlled /> };

export const ComValorInicial: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="w-64">
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

export const Desabilitado: Story = {
  render: () => (
    <div className="w-64">
      <DatePicker value={new Date()} onChange={() => {}} disabled />
    </div>
  ),
};

export const NoFormulario: Story = {
  render: () => {
    const [inicio, setInicio] = useState<Date | undefined>();
    const [fim, setFim] = useState<Date | undefined>();
    return (
      <div className="w-72 space-y-4 p-6 border rounded-lg bg-card">
        <h3 className="font-semibold">Periodo do campeonato</h3>
        <FormField label="Data de inicio" required>
          <DatePicker value={inicio} onChange={setInicio} placeholder="Inicio" />
        </FormField>
        <FormField label="Data de fim" required>
          <DatePicker value={fim} onChange={setFim} placeholder="Fim" />
        </FormField>
      </div>
    );
  },
};
