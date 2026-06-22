import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '../components/ui/separator';

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  name: 'Horizontal',
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <h4 className="text-sm font-medium">Beach Tennis</h4>
        <p className="text-sm text-muted-foreground">Categoria B — Feminino</p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Futevôlei</h4>
        <p className="text-sm text-muted-foreground">Masculino Open</p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  name: 'Vertical',
  render: () => (
    <div className="flex items-center gap-4 h-8">
      <span className="text-sm">Partidas</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Grupos</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Ranking</span>
    </div>
  ),
};
