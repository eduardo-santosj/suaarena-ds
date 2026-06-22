import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ChampionshipCard } from '../components/domain/ChampionshipCard';
import { ChampionshipGridSkeleton } from '../components/domain/Skeletons';
import { EmptyState } from '../components/domain/EmptyState';
import { PageHeader } from '../components/domain/PageHeader';
import { StatusBadge } from '../components/domain/StatusBadge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Trophy, Search, Plus, SlidersHorizontal } from 'lucide-react';
import type { ChampionshipCardData } from '../components/domain/ChampionshipCard';

const meta: Meta = {
  title: 'Composed/TournamentListPage',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

// -- Mock data ---------------------------------------------------------------

const CHAMPIONSHIPS: ChampionshipCardData[] = [
  {
    id: '1',
    name: 'Campeonato Estadual Beach Tennis SP 2024',
    format: 'double',
    city: 'Sao Paulo',
    state: 'SP',
    eventDate: '15/03/2024',
    maxPlayers: 64,
    status: 'registration_open',
    registrationOpen: true,
  },
  {
    id: '2',
    name: 'Copa Verao Futevolei RJ',
    format: 'groups',
    city: 'Rio de Janeiro',
    state: 'RJ',
    eventDate: '22/03/2024',
    maxPlayers: 32,
    status: 'active',
  },
  {
    id: '3',
    name: 'Torneio Interno Arena Central',
    format: 'single',
    city: 'Campinas',
    state: 'SP',
    eventDate: '10/03/2024',
    maxPlayers: 16,
    status: 'finished',
  },
  {
    id: '4',
    name: 'Circuito Nacional BT100 - Etapa Sul',
    format: 'double',
    city: 'Porto Alegre',
    state: 'RS',
    eventDate: '05/04/2024',
    maxPlayers: 128,
    status: 'registration_open',
    registrationOpen: true,
  },
  {
    id: '5',
    name: 'Open BT Feminino - Categoria A',
    format: 'single',
    city: 'Florianopolis',
    state: 'SC',
    eventDate: '18/03/2024',
    maxPlayers: 32,
    status: 'in_progress',
  },
  {
    id: '6',
    name: 'Campeonato Municipal Futevolei - Edicao Especial Verao',
    format: 'groups',
    city: 'Salvador',
    state: 'BA',
    eventDate: '12/04/2024',
    maxPlayers: 48,
    status: 'registration_open',
    registrationOpen: true,
  },
];

// -- Page Component ----------------------------------------------------------

function TournamentListPage({ loading = false, empty = false }: { loading?: boolean; empty?: boolean }) {
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['1']));

  const filtered = CHAMPIONSHIPS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.city?.toLowerCase().includes(search.toLowerCase()),
  );

  const displayed = empty ? [] : filtered;

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">SuaArena</span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="hidden sm:flex">
            {CHAMPIONSHIPS.filter(c => c.status === 'registration_open').length} com inscricoes abertas
          </Badge>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Criar torneio</span>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <PageHeader
          title="Campeonatos"
          description="Encontre e inscreva-se nos melhores torneios de Beach Tennis e Futevolei"
          actions={
            <Button variant="outline" size="sm" className="gap-1.5">
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </Button>
          }
        />

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar campeonatos..."
            className="pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="todos">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="abertos">
              Abertos
              <Badge variant="secondary" className="ml-1.5 text-[10px] h-4 px-1">
                {CHAMPIONSHIPS.filter(c => c.status === 'registration_open').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="andamento">Em andamento</TabsTrigger>
            <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="mt-6">
            {loading ? (
              <ChampionshipGridSkeleton count={6} />
            ) : displayed.length === 0 ? (
              <EmptyState
                icon={Trophy}
                title="Nenhum campeonato encontrado"
                description={search ? 'Tente buscar com outras palavras.' : 'Ainda nao ha campeonatos cadastrados.'}
                action={
                  <Button size="sm" className="gap-1.5">
                    <Plus className="h-4 w-4" />
                    Criar campeonato
                  </Button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayed.map(c => (
                  <ChampionshipCard
                    key={c.id}
                    championship={c}
                    showFavorite
                    isFavorite={favorites.has(c.id)}
                    onFavoriteToggle={isFav => {
                      setFavorites(prev => {
                        const next = new Set(prev);
                        if (isFav) next.add(c.id); else next.delete(c.id);
                        return next;
                      });
                    }}
                    onClick={() => alert('Abrir campeonato: ' + c.name)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="abertos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CHAMPIONSHIPS.filter(c => c.status === 'registration_open').map(c => (
                <ChampionshipCard key={c.id} championship={c} showFavorite onClick={() => {}} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="andamento" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CHAMPIONSHIPS.filter(c => c.status === 'in_progress' || c.status === 'active').map(c => (
                <ChampionshipCard key={c.id} championship={c} onClick={() => {}} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favoritos" className="mt-6">
            {favorites.size === 0 ? (
              <EmptyState
                icon={Trophy}
                title="Nenhum favorito ainda"
                description="Clique na estrela em qualquer campeonato para favoritar."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CHAMPIONSHIPS.filter(c => favorites.has(c.id)).map(c => (
                  <ChampionshipCard key={c.id} championship={c} showFavorite isFavorite onClick={() => {}} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Status Legend */}
        <div className="border-t pt-6">
          <p className="text-xs text-muted-foreground mb-3 font-medium">Legenda de status:</p>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="registration_open" />
            <StatusBadge status="in_progress" />
            <StatusBadge status="finished" />
            <StatusBadge status="cancelled" />
          </div>
        </div>
      </main>
    </div>
  );
}

// -- Stories -----------------------------------------------------------------

export const PaginaCompleta: Story = {
  name: 'Pagina Completa',
  render: () => <TournamentListPage />,
};

export const Loading: Story = {
  render: () => <TournamentListPage loading />,
};

export const Vazia: Story = {
  render: () => <TournamentListPage empty />,
};
