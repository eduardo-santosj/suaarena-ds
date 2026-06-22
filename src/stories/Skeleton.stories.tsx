import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../components/ui/skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-full" />,
};

export const CardSkeleton: Story = {
  name: 'Card de torneio (loading)',
  render: () => (
    <div className="rounded-xl border p-4 space-y-4">
      <Skeleton className="h-36 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  ),
};

export const TableSkeleton: Story = {
  name: 'Tabela (loading)',
  render: () => (
    <div className="space-y-2">
      <Skeleton className="h-9 w-full rounded-md" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-md" />
      ))}
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  name: 'Perfil de jogador (loading)',
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  ),
};
