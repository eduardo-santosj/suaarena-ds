import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Aceito os termos de participação</Label>
    </div>
  ),
};

export const Checked: Story = {
  name: 'Marcado',
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked">Inscrição confirmada</Label>
    </div>
  ),
};

export const Disabled: Story = {
  name: 'Desabilitado',
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Checkbox id="d1" disabled />
        <Label htmlFor="d1" className="text-muted-foreground">Opção indisponível</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="d2" disabled defaultChecked />
        <Label htmlFor="d2" className="text-muted-foreground">Já selecionado</Label>
      </div>
    </div>
  ),
};

export const List: Story = {
  name: 'Lista de categorias',
  render: () => (
    <div className="space-y-3">
      {['Beach Tennis C', 'Beach Tennis B', 'Beach Tennis A', 'Beach Tennis Open'].map((cat) => (
        <div key={cat} className="flex items-center gap-2">
          <Checkbox id={cat} />
          <Label htmlFor={cat}>{cat}</Label>
        </div>
      ))}
    </div>
  ),
};
