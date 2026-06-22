import type { Meta, StoryObj } from '@storybook/react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Button } from '../components/ui/button';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <TooltipProvider><Story /></TooltipProvider>],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <Info className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Dupla eliminação: você só é eliminado após 2 derrotas.</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const OnText: Story = {
  name: 'Em texto',
  render: () => (
    <Tooltip>
      <TooltipTrigger className="underline decoration-dotted cursor-help">
        Grand Final Reset
      </TooltipTrigger>
      <TooltipContent>
        <p>Se o finalista do lower bracket vencer a Grande Final, uma partida decisiva é criada.</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Positions: Story = {
  name: 'Posições',
  render: () => (
    <div className="flex gap-4">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>Tooltip {side}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};
