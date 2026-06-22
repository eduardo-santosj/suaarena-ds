import type { Meta, StoryObj } from '@storybook/react';
import { Trophy, Users, Search, FileX } from 'lucide-react';
import { EmptyState } from '../components/domain/EmptyState';
import { Button } from '../components/ui/button';

const meta: Meta<typeof EmptyState> = {
  title: 'Domain/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Placeholder para listas e tabelas vazias. Usado em: lista de torneios, bracket sem inscritos, ranking sem dados, resultados de busca vazios.',
      },
    },
  },
  decorators: [(Story) => <div className="w-[420px] border border-border rounded-lg"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const SemTorneios: Story = {
  name: 'Sem torneios',
  args: {
    icon: Trophy,
    title: 'Nenhum torneio encontrado',
    description: 'Quando novos torneios forem cadastrados, eles aparecerao aqui.',
  },
};

export const SemInscritos: Story = {
  name: 'Sem inscritos',
  args: {
    icon: Users,
    title: 'Nenhuma dupla inscrita',
    description: 'As inscricoes ainda nao foram abertas ou nenhuma dupla se inscreveu.',
  },
};

export const SemResultados: Story = {
  name: 'Busca sem resultados',
  args: {
    icon: Search,
    title: 'Nenhum resultado',
    description: 'Tente buscar com outros termos ou remova os filtros aplicados.',
  },
};

export const ComAcao: Story = {
  name: 'Com acao (botao)',
  args: {
    icon: FileX,
    title: 'Voce ainda nao tem torneios',
    description: 'Crie seu primeiro campeonato e comece a gerenciar seus jogadores.',
    action: <Button>Criar torneio</Button>,
  },
};
