import type { Meta, StoryObj } from '@storybook/react';
import {
  Sheet, SheetContent, SheetDescription, SheetHeader,
  SheetTitle, SheetTrigger, SheetFooter, SheetClose,
} from '../components/ui/sheet';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const meta: Meta<typeof Sheet> = {
  title: 'UI/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Right: Story = {
  name: 'Lateral direita',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Editar placar</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar placar</SheetTitle>
          <SheetDescription>Eduardo/Carlos × Roberto/Felipe — Quartas de final</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-6">
          <div className="space-y-2">
            <Label>Eduardo / Carlos</Label>
            <Input type="number" placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label>Roberto / Felipe</Label>
            <Input type="number" placeholder="0" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancelar</Button>
          </SheetClose>
          <Button>Salvar placar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  name: 'Inferior',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filtros</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Filtrar torneios</SheetTitle>
          <SheetDescription>Selecione os filtros para refinar a lista.</SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">Beach Tennis</Button>
            <Button variant="outline" className="w-full">Futevôlei</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};
