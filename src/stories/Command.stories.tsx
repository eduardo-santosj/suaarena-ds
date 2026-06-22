import type { Meta, StoryObj } from '@storybook/react';
import { Search, Trophy, Users, Calendar, Settings } from 'lucide-react';
import {
  Command, CommandEmpty, CommandGroup,
  CommandInput, CommandItem, CommandList, CommandSeparator,
  CommandShortcut,
} from '../components/ui/command';

const meta: Meta<typeof Command> = {
  title: 'UI/Command',
  component: Command,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Command>;

export const Default: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[400px]">
      <CommandInput placeholder="Buscar torneios, atletas, categorias..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup heading="Torneios">
          <CommandItem>
            <Trophy className="mr-2 h-4 w-4" />
            <span>Torneio Verão 2025</span>
          </CommandItem>
          <CommandItem>
            <Trophy className="mr-2 h-4 w-4" />
            <span>Open de Beach Tennis SP</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Atletas">
          <CommandItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Eduardo / Carlos</span>
          </CommandItem>
          <CommandItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Roberto / Felipe</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Ações">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Criar torneio</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithSearch: Story = {
  name: 'Busca isolada',
  render: () => (
    <Command className="rounded-lg border shadow-md w-[350px]">
      <CommandInput placeholder="Digite para buscar..." />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-4 text-muted-foreground">
            <Search className="h-8 w-8" />
            <p className="text-sm">Nenhum torneio encontrado.</p>
          </div>
        </CommandEmpty>
        <CommandGroup heading="Resultados">
          {['Beach Tennis A', 'Beach Tennis B', 'Futevôlei Open'].map((t) => (
            <CommandItem key={t}>
              <Trophy className="mr-2 h-4 w-4" />
              {t}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
