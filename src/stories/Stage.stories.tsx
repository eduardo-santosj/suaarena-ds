import type { Meta, StoryObj } from '@storybook/react';
import { Stage, StageLabel, LiveTag } from '../components/custom/Stage';
import { ScoreBoard } from '../components/domain/ScoreBoard';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof Stage> = {
  title: 'Layout/Stage',
  component: Stage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Stage>;

// Cores de time sao dado do Ferino (vem do banco), nao token.
const LARANJA = '#FF7E29';
const PRETO = '#0B0D10';

function AoVivo({ stale = false }: { stale?: boolean }) {
  return (
    <Stage tone="live" stale={stale}>
      <div className="flex items-center justify-between gap-2.5">
        <StageLabel>Jogo 3 de 6 · 09:40</StageLabel>
        <LiveTag stale={stale} label={stale ? 'há 2 min' : undefined} />
      </div>
      <ScoreBoard
        a={{ name: 'Laranja', color: LARANJA, score: 3, scorers: 'Rafa 2 · Mateus 1' }}
        b={{ name: 'Preto', color: PRETO, score: 2, scorers: 'Bruno 2' }}
        onGoal={stale ? undefined : () => {}}
      />
    </Stage>
  );
}

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro (K1, H5)',
  render: () => (
    <TemasLado>
      <div className="flex flex-col gap-3">
        <AoVivo />
        <Stage tone="default">
          <StageLabel>Semifinal 2 · Quadra 1</StageLabel>
          <span className="font-display text-lg font-bold">Léo e Thiago × Vini e Gu</span>
        </Stage>
        <Stage tone="vote">
          <StageLabel>Votação aberta · fecha 23:00</StageLabel>
          <span className="font-display text-lg font-bold">Quem foi o craque?</span>
        </Stage>
        <Stage tone="win">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] opacity-70">Craque da rodada</span>
          <span className="font-display text-2xl font-extrabold">Rafa</span>
        </Stage>
      </div>
    </TemasLado>
  ),
};

export const SemConexao: Story = {
  name: 'Sem conexão (T2)',
  render: () => (
    <TemasLado>
      <AoVivo stale />
    </TemasLado>
  ),
};
