import type { Meta, StoryObj } from '@storybook/react';
import {
  ChampionshipCardSkeleton,
  ChampionshipGridSkeleton,
  TorneioPageSkeleton,
  RankingSkeleton,
  MatchListSkeleton,
} from '../components/domain/Skeletons';

const meta: Meta = {
  title: 'Domain/Skeletons',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const CardSimples: Story = {
  render: () => (
    <div className="w-80">
      <ChampionshipCardSkeleton />
    </div>
  ),
};

export const Grid: Story = {
  render: () => <ChampionshipGridSkeleton count={6} />,
};

export const GridCompacto: Story = {
  render: () => <ChampionshipGridSkeleton count={3} />,
};

export const PaginaTorneio: Story = {
  render: () => <TorneioPageSkeleton />,
};

export const Ranking: Story = {
  render: () => <RankingSkeleton />,
};

export const ListaDePartidas: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <MatchListSkeleton count={4} />
    </div>
  ),
};
