import type { Meta, StoryObj } from '@storybook/react';
import { MatchCard, MatchCardWithBadge } from '../components/domain/MatchCard';
import type { BracketMatch } from '../types/bracket';

const meta: Meta<typeof MatchCard> = {
  title: 'Domain/MatchCard',
  component: MatchCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof MatchCard>;

// -- Mock data ---------------------------------------------------------------

const teamA = { id: 'a1', name: 'Silva / Santos', seed: 1 };
const teamB = { id: 'b1', name: 'Costa / Oliveira', seed: 2 };

const pendingMatch: BracketMatch = {
  id: 'm1', position: 0, round: 1,
  teamA, teamB,
  scoreA: null, scoreB: null, sets: [],
  winner: null, status: 'pending',
  matchNumber: 1,
};

const liveMatch: BracketMatch = {
  ...pendingMatch, id: 'm2',
  status: 'live', live: true,
  scoreA: 1, scoreB: 0,
  court: 'Quadra 3',
};

const finishedMatch: BracketMatch = {
  ...pendingMatch, id: 'm3',
  status: 'finished',
  scoreA: 2, scoreB: 1,
  winner: teamA,
  sets: [
    { scoreA: 6, scoreB: 3 },
    { scoreA: 4, scoreB: 6 },
    { scoreA: 10, scoreB: 6 },
  ],
  matchNumber: 5,
};

const finishedFtv: BracketMatch = {
  ...pendingMatch, id: 'm4',
  status: 'finished',
  scoreA: 12, scoreB: 8,
  winner: teamA,
  sets: [],
};

const walkoverMatch: BracketMatch = {
  ...pendingMatch, id: 'm5',
  status: 'finished',
  scoreA: 0, scoreB: 0,
  winner: teamB,
  walkover: true,
  sets: [],
};

const scheduledMatch: BracketMatch = {
  ...pendingMatch, id: 'm6',
  court: 'Quadra 1',
  scheduledAt: new Date(Date.now() + 3600000).toISOString(),
};

// -- Stories -----------------------------------------------------------------

export const Pendente: Story = {
  render: () => <MatchCard match={pendingMatch} />,
};

export const AoVivo: Story = {
  render: () => <MatchCard match={liveMatch} />,
};

export const FinalizadoSets: Story = {
  render: () => <MatchCard match={finishedMatch} maxSets={3} hasSuperTiebreak />,
};

export const FinalizadoPlacarUnico: Story = {
  render: () => <MatchCard match={finishedFtv} />,
};

export const Walkover: Story = {
  render: () => <MatchCard match={walkoverMatch} maxSets={3} />,
};

export const Agendado: Story = {
  render: () => <MatchCard match={scheduledMatch} comfortable />,
};

export const ModoAdmin: Story = {
  render: () => (
    <MatchCard
      match={pendingMatch}
      isAdmin
      comfortable
      onSaveScore={(_id, sA, sB, winnerId) => alert('Salvo: ' + sA + 'x' + sB + ' winner=' + winnerId)}
      onWalkover={(_id, winnerId) => alert('WO: ' + winnerId)}
      onToggleLive={(_id, live) => alert('Live: ' + live)}
    />
  ),
};

export const ModoAdminEditando: Story = {
  render: () => (
    <MatchCard
      match={{ ...pendingMatch, court: 'Quadra Central' }}
      isAdmin
      comfortable
      onSaveScore={() => {}}
    />
  ),
};

export const ModoAdminSets: Story = {
  render: () => (
    <MatchCard
      match={pendingMatch}
      isAdmin
      comfortable
      maxSets={3}
      hasSuperTiebreak
      onSaveScore={() => {}}
    />
  ),
};

export const GrandFinal: Story = {
  render: () => (
    <MatchCardWithBadge
      match={{ ...finishedMatch, matchNumber: 15 }}
      maxSets={3}
      hasSuperTiebreak
    />
  ),
};

export const GradeDePartidas: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      <MatchCard match={pendingMatch} />
      <MatchCard match={liveMatch} />
      <MatchCard match={finishedMatch} maxSets={3} hasSuperTiebreak />
      <MatchCard match={walkoverMatch} maxSets={3} />
      <MatchCard match={{ ...pendingMatch, id: 'm7', teamA: null, teamB: null }} />
    </div>
  ),
};
