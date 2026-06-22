import type { Meta, StoryObj } from '@storybook/react';
import { CalendarDays, Trophy, Users } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/hover-card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';

const meta: Meta<typeof HoverCard> = {
  title: 'UI/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@eduardocarloss</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarFallback className="bg-brand-primary text-white">EC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Eduardo / Carlos</h4>
            <p className="text-sm text-muted-foreground">
              Dupla categoria A — Ranking nacional #12
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Trophy className="h-3 w-3" />3 torneios
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarDays className="h-3 w-3" />
                Desde jun 2024
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const TournamentCard: Story = {
  name: 'Card de torneio',
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">Torneio Verão 2025</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Torneio Verão 2025</h4>
          <p className="text-xs text-muted-foreground">Beach Tennis • Dupla Eliminação</p>
          <div className="flex items-center gap-4 pt-1">
            <span className="flex items-center gap-1 text-xs">
              <Users className="h-3 w-3" />16 duplas
            </span>
            <span className="flex items-center gap-1 text-xs">
              <CalendarDays className="h-3 w-3" />15 mar 2025
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
