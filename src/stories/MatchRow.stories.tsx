import type { Meta, StoryObj } from '@storybook/react';
import { MatchRow } from '../components/domain/MatchRow';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof MatchRow> = {
  title: 'Domain/MatchRow',
  component: MatchRow,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof MatchRow>;

export const Encerrado: Story = {
  args: {
    label: 'Semi 2',
    tag: 'fim',
    tagTone: 'success',
    a: { name: 'Bruno e Caio', score: 21 },
    b: { name: 'Diego e Rafa', score: 17 },
    winner: 'a',
  },
};

export const AoVivo: Story = {
  name: 'Ao vivo',
  args: { label: 'Semi 1', tag: 'ao vivo', tagTone: 'live', a: { name: 'Mateus e Gu', score: 12 }, b: { name: 'Eduardo e Lucas', score: 10 } },
};

export const AJogar: Story = {
  name: 'A jogar (sem placar)',
  args: { label: 'Grupo A', tag: 'a jogar', tagTone: 'primary', a: { name: 'Bruno e Caio' }, b: { name: 'Mateus e Gu' }, onClick: () => {} },
};

export const SeuProximoJogo: Story = {
  name: 'Seu próximo jogo',
  args: {
    label: 'Q1',
    tag: 'a jogar',
    tagTone: 'primary',
    a: { name: 'Diego e Rafa' },
    b: { name: 'Vini e Gu' },
    note: 'contra Vini e Gu',
    you: true,
    onClick: () => {},
  },
};

export const Eliminado: Story = {
  args: {
    label: 'P · R2 · jogo 9',
    tag: 'fim',
    a: { name: 'Lucas e Théo', score: 9 },
    b: { name: 'Caio e Vini', score: 21 },
    winner: 'b',
    dim: 'a',
    note: 'eliminados',
  },
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  args: Encerrado.args,
  render: () => (
    <TemasLado>
      <div className="space-y-2">
        <MatchRow {...(Encerrado.args as React.ComponentProps<typeof MatchRow>)} />
        <MatchRow {...(AoVivo.args as React.ComponentProps<typeof MatchRow>)} />
        <MatchRow {...(SeuProximoJogo.args as React.ComponentProps<typeof MatchRow>)} />
      </div>
    </TemasLado>
  ),
};
