import type { Meta, StoryObj } from '@storybook/react';
import { ActionBar } from '../components/custom/ActionBar';
import { Button } from '../components/ui/button';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof ActionBar> = {
  title: 'Layout/ActionBar',
  component: ActionBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ActionBar>;

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro (H5, T3)',
  render: () => (
    <TemasLado>
      <div className="flex flex-col gap-4">
        <ActionBar sticky={false} className="-mx-4">
          <Button className="flex-1 h-11 rounded-xl">Encerrar jogo</Button>
        </ActionBar>
        <ActionBar sticky={false} className="-mx-4">
          <Button className="flex-1 h-11 rounded-xl">+ Gol</Button>
          <Button variant="ghost" className="flex-1 h-11 rounded-xl bg-surface-3 text-foreground">Encerrar jogo</Button>
        </ActionBar>
      </div>
    </TemasLado>
  ),
};
