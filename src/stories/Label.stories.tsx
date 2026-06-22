import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="email">E-mail</Label>
      <Input id="email" type="email" placeholder="jogador@arena.com" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  name: 'Com checkbox',
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Aceito os termos e condições do torneio</Label>
    </div>
  ),
};

export const Required: Story = {
  name: 'Campo obrigatório',
  render: () => (
    <div className="space-y-4 w-64">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">
          Nome completo <span className="text-destructive">*</span>
        </Label>
        <Input id="name" placeholder="Eduardo Jacinto" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="cpf">
          CPF <span className="text-destructive">*</span>
        </Label>
        <Input id="cpf" placeholder="000.000.000-00" />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  name: 'Desabilitado',
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="locked" className="text-muted-foreground">
        Nível (validado pelo admin)
      </Label>
      <Input id="locked" defaultValue="Categoria A" disabled />
    </div>
  ),
};
