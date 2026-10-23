import type { Meta, StoryObj } from '@storybook/react';
import { StandingsTable, type StandingsRow } from '../components/domain/StandingsTable';
import { TemasLado } from './_TemasLado';

// A StandingsTable com `columns` e `cells` vira a tabela de ranking.
const meta: Meta<typeof StandingsTable> = {
  title: 'Domain/StandingsTable/Ranking',
  component: StandingsTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof StandingsTable>;

const COLS = ['Torneios', 'Títulos', '1º', '2º', '3º', 'Últ.', 'Pts'];
const ROWS: StandingsRow[] = [
  { key: 'bruno', name: 'Bruno', cells: [3, 2, 2, 1, 0, 0, 30], selected: true },
  { key: 'diego', name: 'Diego', cells: [3, 1, 1, 2, 2, 0, 22] },
  { key: 'caio', name: 'Caio', cells: [3, 1, 1, 1, 3, 0, 18] },
  { key: 'edu', name: 'Edu Santos', cells: [3, 1, 1, 1, 0, 0, 15], me: true },
  { key: 'rafa', name: 'Rafa', cells: [3, 0, 0, 2, 1, 0, 11] },
  { key: 'mateus', name: 'Mateus', cells: [2, 0, 0, 0, 0, 1, -1] },
];

export const RankingFutevolei: Story = {
  name: 'Ranking (futevôlei, tela cheia)',
  render: () => (
    <div className="max-w-3xl">
      <StandingsTable rows={ROWS} columns={COLS} nameLabel="Atleta" qualifyCount={3} wide onRowClick={() => {}} />
    </div>
  ),
};

export const RankingFutebol: Story = {
  name: 'Ranking (futebol, celular)',
  render: () => (
    <div className="max-w-sm">
      <StandingsTable
        rows={[
          { key: '1', name: 'Rafa', cells: [9, 24, 19, 4, 5, 48] },
          { key: '2', name: 'Bruno', cells: [9, 20, 21, 3, 1, 44] },
          { key: '3', name: 'Eduardo', cells: [9, 17, 8, 7, 1, 35], me: true },
        ]}
        columns={['R', 'V', 'G', 'A', 'Cr', 'P']}
        nameLabel="Jogador"
        qualifyCount={3}
      />
    </div>
  ),
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  render: () => (
    <TemasLado>
      <StandingsTable rows={ROWS.slice(0, 5)} columns={COLS} nameLabel="Atleta" qualifyCount={3} />
    </TemasLado>
  ),
};
