import type { Meta, StoryObj } from '@storybook/react';
import { ChevronLeft, Plus, Settings } from 'lucide-react';
import { PageHeader } from '../components/domain/PageHeader';
import { Button } from '../components/ui/button';

const meta: Meta<typeof PageHeader> = {
  title: 'Domain/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Header padrao de pagina com titulo, descricao e slot de acoes. ' +
          'Mantém layout identico entre torneio (admin) e suaArena (player area).',
      },
    },
  },
  decorators: [(Story) => <div className="w-full max-w-3xl"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Simples: Story = {
  args: {
    title: 'Meus torneios',
    description: 'Gerencie todos os seus campeonatos',
  },
};

export const ComAcoes: Story = {
  name: 'Com ações',
  args: {
    title: 'Categorias',
    description: 'Configure as categorias do campeonato',
    actions: (
      <>
        <Button variant="outline" size="sm"><Settings className="h-4 w-4 mr-2" />Configurar</Button>
        <Button size="sm"><Plus className="h-4 w-4 mr-2" />Nova categoria</Button>
      </>
    ),
  },
};

export const ComBreadcrumb: Story = {
  name: 'Com breadcrumb',
  args: {
    title: 'Open Verao 2026',
    description: 'Beach Tennis - Dupla Eliminacao',
    breadcrumb: (
      <button className="flex items-center gap-1 hover:text-foreground transition-colors">
        <ChevronLeft className="h-4 w-4" />
        Voltar para torneios
      </button>
    ),
    actions: <Button size="sm">Gerenciar</Button>,
  },
};

export const SemSeparador: Story = {
  name: 'Sem separador',
  args: {
    title: 'Painel do jogador',
    description: 'Acompanhe suas inscrições e resultados',
    withSeparator: false,
  },
};
