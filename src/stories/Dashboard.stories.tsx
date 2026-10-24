import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KpiTile, LineAreaChart, DonutChart, DataTable, PillTabs } from '../index';
import { TemasLado } from './_TemasLado';

const meta: Meta = {
  title: 'Painel/Dashboard',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const brl = (n: number) => `R$ ${n.toLocaleString('pt-BR')}`;
const MESES = ['mai', 'jun', 'jul', 'ago', 'set', 'out'];
const SERIES = [
  { key: 'asaas', label: 'Asaas', tone: 'primary' as const, values: [120, 190, 240, 310, 380, 450] },
  { key: 'apple', label: 'Apple', tone: 'you' as const, values: [0, 40, 90, 150, 210, 260] },
  { key: 'google', label: 'Google', tone: 'series-3' as const, values: [0, 20, 60, 110, 140, 200] },
];
const SLICES = [
  { key: 'asaas', label: 'Asaas', value: 64, tone: 'primary' as const },
  { key: 'apple', label: 'Apple', value: 38, tone: 'you' as const },
  { key: 'google', label: 'Google', value: 26, tone: 'series-3' as const },
];

const Kpis = () => (
  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
    <KpiTile label="Assinantes ativos" value="128" delta={12.5} deltaLabel="vs set" accent />
    <KpiTile label="Receita do mês" value="R$ 1.980" delta={-3.2} deltaLabel="vs set" />
    <KpiTile label="Cancelamentos" value="7" delta={40} invertDelta deltaLabel="vs set" />
    <KpiTile label="Em atraso" value="3" hint="2 no Asaas" />
  </div>
);

export const Kpi: Story = { render: () => <Kpis /> };

export const LinhaPorOrigem: Story = {
  name: 'Linha e área por mês',
  render: () => <LineAreaChart labels={MESES} series={SERIES} formatValue={brl} aria-label="Receita por mês e origem" />,
};

export const UmaSerie: Story = {
  name: 'Uma série',
  render: () => <LineAreaChart labels={MESES} series={[SERIES[0]]} height={140} formatValue={brl} />,
};

export const Rosca: Story = {
  render: () => <DonutChart slices={SLICES} centerValue={128} centerLabel="Premium" />,
};

type Pay = { id: string; who: string; origin: string; status: string; value: string; date: string };
const ALL: Pay[] = Array.from({ length: 27 }, (_, i) => ({
  id: String(i),
  who: `Ferino ${i + 1}`,
  origin: ['Asaas', 'Apple', 'Google'][i % 3],
  status: ['Pago', 'Pendente', 'Atrasado'][i % 3],
  value: 'R$ 9,90',
  date: `${String((i % 28) + 1).padStart(2, '0')}/10`,
}));

function TableDemo() {
  const [page, setPage] = React.useState(1);
  const [status, setStatus] = React.useState('all');
  const filtered = ALL.filter((p) => status === 'all' || p.status === status);
  return (
    <DataTable
      caption="Pagamentos"
      columns={[
        { key: 'who', header: 'Conta' },
        { key: 'origin', header: 'Origem', hideOnMobile: true },
        { key: 'status', header: 'Status' },
        { key: 'date', header: 'Data', hideOnMobile: true },
        { key: 'value', header: 'Valor', align: 'right' },
      ]}
      rows={filtered.slice((page - 1) * 10, page * 10)}
      rowKey={(p) => p.id}
      total={filtered.length}
      page={page}
      onPageChange={setPage}
      filters={
        <PillTabs
          size="sm"
          value={status}
          onChange={(k) => { setStatus(k); setPage(1); }}
          options={[
            { key: 'all', label: 'Todos' },
            { key: 'Pago', label: 'Pagos' },
            { key: 'Pendente', label: 'Pendentes' },
            { key: 'Atrasado', label: 'Atrasados' },
          ]}
        />
      }
    />
  );
}

export const Tabela: Story = { render: () => <TableDemo /> };

export const TabelaVazia: Story = {
  name: 'Tabela vazia',
  render: () => (
    <DataTable columns={[{ key: 'who', header: 'Conta' }]} rows={[]} rowKey={() => ''} emptyText="Nenhum pagamento nesse filtro." />
  ),
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  render: () => (
    <TemasLado>
      <div className="flex flex-col gap-4">
        <Kpis />
        <div className="rounded-2xl bg-surface-1 p-4">
          <LineAreaChart labels={MESES} series={SERIES} formatValue={brl} />
        </div>
        <div className="rounded-2xl bg-surface-1 p-4">
          <DonutChart slices={SLICES} centerValue={128} centerLabel="Premium" />
        </div>
        <TableDemo />
      </div>
    </TemasLado>
  ),
};
