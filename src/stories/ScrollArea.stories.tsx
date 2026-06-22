import type { Meta, StoryObj } from '@storybook/react';
import { Trophy } from 'lucide-react';
import { ScrollArea } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';

const meta: Meta<typeof ScrollArea> = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const teams = [
  'Eduardo / Carlos', 'Roberto / Felipe', 'Marcos / João',
  'Pedro / Lucas', 'André / Thiago', 'Rafael / Bruno',
  'Diego / Mateus', 'Victor / Henrique', 'Gustavo / Rodrigo',
  'Gabriel / Leonardo', 'Caio / Murilo', 'Daniel / Vinícius',
];

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-64 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none flex items-center gap-2">
          <Trophy className="h-4 w-4 text-brand-primary" />
          Duplas inscritas
        </h4>
        {teams.map((team) => (
          <div key={team}>
            <div className="text-sm py-2">{team}</div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  name: 'Scroll horizontal',
  render: () => (
    <ScrollArea className="w-72 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="w-36 shrink-0 rounded-md border p-3 text-sm"
          >
            <p className="font-medium text-brand-primary">Rodada {i + 1}</p>
            <p className="text-muted-foreground text-xs mt-1">8 partidas</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
