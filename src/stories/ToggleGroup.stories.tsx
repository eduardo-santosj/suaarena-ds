import type { Meta, StoryObj } from '@storybook/react';
import { LayoutGrid, List, Trophy, Layers } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';

const meta: Meta<typeof ToggleGroup> = {
  title: 'UI/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="grid">
      <ToggleGroupItem value="grid" aria-label="Grade">
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="Lista">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const TournamentFormat: Story = {
  name: 'Formato do torneio',
  render: () => (
    <ToggleGroup type="single" defaultValue="double" variant="outline">
      <ToggleGroupItem value="single">
        <Trophy className="h-4 w-4 mr-1" />Simples
      </ToggleGroupItem>
      <ToggleGroupItem value="double">
        <Layers className="h-4 w-4 mr-1" />Dupla
      </ToggleGroupItem>
      <ToggleGroupItem value="groups">
        <LayoutGrid className="h-4 w-4 mr-1" />Grupos
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  name: 'Seleção múltipla',
  render: () => (
    <ToggleGroup type="multiple" variant="outline" defaultValue={['beach', 'futevolei']}>
      <ToggleGroupItem value="beach">Beach Tennis</ToggleGroupItem>
      <ToggleGroupItem value="futevolei">Futevôlei</ToggleGroupItem>
      <ToggleGroupItem value="padel">Padel</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Sizes: Story = {
  name: 'Tamanhos',
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <ToggleGroup type="single" size="sm" defaultValue="a">
        <ToggleGroupItem value="a">SM</ToggleGroupItem>
        <ToggleGroupItem value="b">SM</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" defaultValue="a">
        <ToggleGroupItem value="a">Default</ToggleGroupItem>
        <ToggleGroupItem value="b">Default</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="lg" defaultValue="a">
        <ToggleGroupItem value="a">LG</ToggleGroupItem>
        <ToggleGroupItem value="b">LG</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};
