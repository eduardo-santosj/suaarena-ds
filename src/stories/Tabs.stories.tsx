import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-[480px]"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="bracket">
      <TabsList className="w-full">
        <TabsTrigger value="bracket" className="flex-1">Bracket</TabsTrigger>
        <TabsTrigger value="grupos" className="flex-1">Grupos</TabsTrigger>
        <TabsTrigger value="inscricoes" className="flex-1">Inscrições</TabsTrigger>
      </TabsList>
      <TabsContent value="bracket">
        <Card>
          <CardHeader><CardTitle>Chave do torneio</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Visualização do bracket aqui.</p></CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="grupos">
        <Card>
          <CardHeader><CardTitle>Fase de grupos</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Tabela de grupos aqui.</p></CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="inscricoes">
        <Card>
          <CardHeader><CardTitle>Duplas inscritas</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Lista de inscrições aqui.</p></CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};
