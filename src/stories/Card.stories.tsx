import type { Meta, StoryObj } from '@storybook/react';
import { Trophy, Users, Calendar } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/card';
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
        component:
          'Container de conteúdo com borda e sombra. Composto por `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` e `CardFooter`.',
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
        <CardDescription>Arena do Vale — 15 de março de 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          32 duplas inscritas. Fase de grupos em andamento.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">Ver bracket</Button>
        <Button size="sm" variant="outline">Editar</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatCard: Story = {
  name: 'Card de estatística',
  render: () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Alunos ativos
        </CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">142</div>
        <p className="text-xs text-muted-foreground mt-1">
          +8 este mês
        </p>
      </CardContent>
    </Card>
  ),
};

export const TournamentCard: Story = {
  name: 'Card de torneio',
  render: () => (
    <Card className="overflow-hidden">
      <div className="h-24 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <Trophy className="h-10 w-10 text-primary" />
      </div>
      <CardHeader className="pt-4 pb-2">
        <div className="flex items-start justify-between">
          <CardTitle>Open Verão 2025</CardTitle>
          <Badge variant="success">Ativo</Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          15 Mar — 17 Mar 2025
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 text-sm">
          <div>
            <p className="font-semibold">32</p>
            <p className="text-xs text-muted-foreground">Duplas</p>
          </div>
          <div>
            <p className="font-semibold">4</p>
            <p className="text-xs text-muted-foreground">Categorias</p>
          </div>
          <div>
            <p className="font-semibold">BT100</p>
            <p className="text-xs text-muted-foreground">Nível</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="sm">Abrir torneio</Button>
      </CardFooter>
    </Card>
  ),
};
