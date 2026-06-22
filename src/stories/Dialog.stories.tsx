import type { Meta, StoryObj } from '@storybook/react';
import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const meta: Meta = {
  title: 'UI/Dialog',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Modal acessível via Radix UI. Suporta foco automático, fechar com Esc e click fora. Compose com `DialogHeader`, `DialogFooter`, `DialogTitle` e `DialogDescription`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Confirm: Story = {
  name: 'Confirmação de ação',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 /> Excluir torneio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Excluir torneio?</DialogTitle>
          <DialogDescription>
            Esta ação é irreversível. Todos os brackets, resultados e inscrições
            deste torneio serão permanentemente removidos.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button variant="destructive">Sim, excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const FormDialog: Story = {
  name: 'Dialog com formulário',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Editar arena</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar informações</DialogTitle>
          <DialogDescription>
            Atualize os dados da arena. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Nome da arena</Label>
            <Input id="name" defaultValue="Arena do Vale" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="city">Cidade</Label>
            <Input id="city" defaultValue="São Paulo" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input id="slug" defaultValue="arena-do-vale" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
