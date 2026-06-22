import type { Meta, StoryObj } from '@storybook/react';
import { ChevronsUpDown, Trophy } from 'lucide-react';
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from '../components/ui/collapsible';
import { Button } from '../components/ui/button';

const meta: Meta<typeof Collapsible> = {
  title: 'UI/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-72 space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <Trophy className="h-4 w-4 text-brand-primary" />
          Torneio Verão 2025 — Grupo A
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        Eduardo / Carlos
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          Roberto / Felipe
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          Marcos / João
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          Pedro / Lucas
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
