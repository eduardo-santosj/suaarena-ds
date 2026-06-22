import type { Meta, StoryObj } from '@storybook/react';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Button } from '../components/ui/button';

const meta: Meta<typeof Popover> = {
  title: 'UI/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline"><CalendarIcon className="mr-2 h-4 w-4" />Selecionar data</Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Data do torneio</h4>
          <p className="text-sm text-muted-foreground">Escolha a data de início do evento.</p>
          <Button size="sm" className="w-full">Confirmar</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
