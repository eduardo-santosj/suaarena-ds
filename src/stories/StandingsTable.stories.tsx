import type { Meta, StoryObj } from '@storybook/react';
import { StandingsTable, type StandingsRow } from '../components/domain/StandingsTable';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof StandingsTable> = {
  title: 'Domain/StandingsTable',
  component: StandingsTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof StandingsTable>;

const ROWS: StandingsRow[] = [
  { key: '1', name: 'Bruno e Caio', played: 3, wins: 3, losses: 0, pointsFor: 63, pointsAgainst: 52, points: 9 },
  { key: '2', name: 'Diego e Rafa', played: 3, wins: 2, losses: 1, pointsFor: 60, pointsAgainst: 49, points: 6, me: true },
  { key: '3', name: 'Mateus e Gu', played: 3, wins: 1, losses: 2, pointsFor: 51, pointsAgainst: 58, points: 3 },
  { key: '4', name: 'Eduardo Santos e Lucas Pereira da Silva', played: 3, wins: 0, losses: 3, pointsFor: 42, pointsAgainst: 59, points: 0, note: 'eliminados' },
];

export const Dupla: Story = { args: { rows: ROWS, qualifyCount: 2 } };

export const ReiDaPraia: Story = {
  name: 'Rei da Praia (Jogador)',
  args: { rows: ROWS.map((r) => ({ ...r, name: r.name.split(' e ')[0] })), nameLabel: 'Jogador', qualifyCount: 1 },
};

export const Clicavel: Story = {
  name: 'Linha clicavel',
  args: { rows: ROWS, qualifyCount: 2, onRowClick: () => {} },
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  args: { rows: ROWS },
  render: () => (
    <TemasLado>
      <StandingsTable rows={ROWS} qualifyCount={2} />
    </TemasLado>
  ),
};
