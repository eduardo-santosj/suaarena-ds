import type { Meta, StoryObj } from '@storybook/react';
import { Trophy, Users, Calendar, MapPin, Star } from 'lucide-react';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Container de conteudo com borda e sombra. O ChampionshipCard e o layout principal utilizado na listagem de torneios.',
      },
    },
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Torneio Beach Tennis</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">32 duplas inscritas. Fase de grupos em andamento.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">Ver bracket</Button>
        <Button size="sm" variant="outline">Editar</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatCard: Story = {
  name: 'Card de estatistica',
  render: () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Duplas inscritas</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">32</div>
        <p className="text-xs text-muted-foreground mt-1">+4 esta semana</p>
      </CardContent>
    </Card>
  ),
};

interface MockChampionship {
  id: string;
  name: string;
  format: 'single' | 'double' | 'groups';
  city?: string;
  state?: string;
  event_date?: string;
  max_players?: number;
  status: 'active' | 'in_progress' | 'finished';
  registration_open: boolean;
}

function ChampionshipCardMock({ championship, showFavorite = false }: { championship: MockChampionship; showFavorite?: boolean }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const getStatusBadge = () => {
    if (championship.status === 'finished') return <Badge variant="outline">Finalizado</Badge>;
    if (championship.registration_open) return <Badge variant="secondary">Inscricoes Abertas</Badge>;
    return <Badge>Em Andamento</Badge>;
  };

  const getFormatLabel = () => {
    if (championship.format === 'single') return 'Eliminacao Simples';
    if (championship.format === 'double') return 'Dupla Eliminacao';
    return 'Grupos + Eliminacao';
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative h-48 w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        <Trophy className="h-12 w-12 text-primary/40" />
        {showFavorite && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background"
            onClick={(e) => { e.stopPropagation(); setIsFavorite((v) => !v); }}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Star className={`h-5 w-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
          </Button>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl line-clamp-2">{championship.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{getFormatLabel()}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {championship.city && (
          <div className="flex items-center gap-2 text-sm min-w-0">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="truncate">{championship.city}, {championship.state}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm min-w-0">
          <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="truncate">{championship.event_date}</span>
        </div>
        {championship.max_players && (
          <div className="flex items-center gap-2 text-sm min-w-0">
            <Users className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="truncate">Maximo: {championship.max_players} jogadores</span>
          </div>
        )}
      </CardContent>
      <CardFooter>{getStatusBadge()}</CardFooter>
    </Card>
  );
}

export const TournamentCard: Story = {
  name: 'Card de torneio — Inscricoes Abertas',
  render: () => (
    <ChampionshipCardMock
      showFavorite
      championship={{ id: '1', name: 'Ftv Alto Parana', format: 'double', city: 'Alto Parana', state: 'PR', event_date: '11/07/2026', status: 'active', registration_open: true }}
    />
  ),
};

export const TournamentCardInProgress: Story = {
  name: 'Card de torneio — Em Andamento',
  render: () => (
    <ChampionshipCardMock
      championship={{ id: '2', name: 'Open Verao 2025 — Beach Tennis', format: 'double', city: 'Sao Paulo', state: 'SP', event_date: '15/03/2025', max_players: 64, status: 'in_progress', registration_open: false }}
    />
  ),
};

export const TournamentCardFinished: Story = {
  name: 'Card de torneio — Finalizado',
  render: () => (
    <ChampionshipCardMock
      championship={{ id: '3', name: 'Copa Inverno de Futevolei', format: 'groups', city: 'Curitiba', state: 'PR', event_date: '20/06/2025', status: 'finished', registration_open: false }}
    />
  ),
};
