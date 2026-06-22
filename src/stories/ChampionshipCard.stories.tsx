import type { Meta, StoryObj } from '@storybook/react';
import { ChampionshipCard } from '../components/domain/ChampionshipCard';

const meta: Meta<typeof ChampionshipCard> = {
  title: 'Domain/ChampionshipCard',
  component: ChampionshipCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card de torneio usado na listagem de campeonatos em torneio e suaArena. ' +
          'Suporta favoritar (controlado ou nao), clique, imagem de capa e todos os status do sistema.',
      },
    },
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  argTypes: {
    onClick: { action: 'clicked' },
    onFavoriteToggle: { action: 'favorite toggled' },
  },
};

export default meta;
type Story = StoryObj<typeof ChampionshipCard>;

export const InscricoesAbertas: Story = {
  name: 'Inscricoes abertas',
  args: {
    showFavorite: true,
    championship: {
      id: '1',
      name: 'Ftv Alto Parana',
      format: 'double',
      city: 'Alto Parana',
      state: 'PR',
      eventDate: '11/07/2026',
      status: 'active',
      registrationOpen: true,
    },
  },
};

export const EmAndamento: Story = {
  name: 'Em andamento',
  args: {
    championship: {
      id: '2',
      name: 'Open Verao 2025 Beach Tennis',
      format: 'double',
      city: 'Sao Paulo',
      state: 'SP',
      eventDate: '15/03/2025',
      maxPlayers: 64,
      status: 'in_progress',
      registrationOpen: false,
    },
  },
};

export const Finalizado: Story = {
  name: 'Finalizado',
  args: {
    championship: {
      id: '3',
      name: 'Copa Inverno de Futevolei',
      format: 'groups',
      city: 'Curitiba',
      state: 'PR',
      eventDate: '20/06/2025',
      status: 'finished',
      registrationOpen: false,
    },
  },
};

export const NomeLongo: Story = {
  name: 'Nome longo (line-clamp)',
  args: {
    showFavorite: true,
    championship: {
      id: '4',
      name: 'Campeonato Estadual de Beach Tennis Categoria Open Masculino e Feminino 2026',
      format: 'single',
      city: 'Londrina',
      state: 'PR',
      eventDate: '30/08/2026',
      maxPlayers: 128,
      status: 'active',
      registrationOpen: true,
    },
  },
};

export const SemLocalidade: Story = {
  name: 'Sem localidade (online/virtual)',
  args: {
    championship: {
      id: '5',
      name: 'Liga Digital Futevolei',
      format: 'swiss',
      eventDate: '01/09/2026',
      status: 'active',
      registrationOpen: true,
    },
  },
};

export const Grid: Story = {
  name: 'Grid (3 cards)',
  parameters: { controls: { disable: true } },
  decorators: [(Story) => <Story />],
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
      <ChampionshipCard
        showFavorite
        championship={{ id: '1', name: 'Ftv Alto Parana', format: 'double', city: 'Alto Parana', state: 'PR', eventDate: '11/07/2026', status: 'active', registrationOpen: true }}
      />
      <ChampionshipCard
        championship={{ id: '2', name: 'Open Verao Beach Tennis', format: 'double', city: 'Sao Paulo', state: 'SP', eventDate: '15/03/2025', maxPlayers: 64, status: 'in_progress', registrationOpen: false }}
      />
      <ChampionshipCard
        championship={{ id: '3', name: 'Copa Inverno Futevolei', format: 'groups', city: 'Curitiba', state: 'PR', eventDate: '20/06/2025', status: 'finished', registrationOpen: false }}
      />
    </div>
  ),
};
