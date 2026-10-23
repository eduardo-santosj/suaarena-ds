import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScoreBoard } from '../components/domain/ScoreBoard';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof ScoreBoard> = {
  title: 'Domain/ScoreBoard',
  component: ScoreBoard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ScoreBoard>;

// Cores de time sao dado do Ferino, nao token.
const LARANJA = '#FF7E29';
const AZUL = '#3B82F6';

function Interativo() {
  const [s, setS] = useState({ a: 0, b: 0 });
  return (
    <ScoreBoard
      a={{ name: 'Laranja', color: LARANJA, score: s.a, scorers: 'ficou · venceu o anterior' }}
      b={{ name: 'Azul', color: AZUL, score: s.b, scorers: 'entrou do banco' }}
      onGoal={(side) => setS((p) => ({ ...p, [side]: p[side] + 1 }))}
    />
  );
}

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro (futebol)',
  render: () => (
    <TemasLado>
      <Interativo />
    </TemasLado>
  ),
};

export const Futevolei: Story = {
  name: 'Futevôlei (+1, sem cor de time)',
  render: () => (
    <TemasLado>
      <ScoreBoard
        a={{ name: 'Bruno e Caio', score: 17 }}
        b={{ name: 'Diego e Rafa', score: 15 }}
        goalLabel="+1"
        onGoal={() => {}}
      />
    </TemasLado>
  ),
};
