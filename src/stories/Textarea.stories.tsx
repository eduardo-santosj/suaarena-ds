import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: () => <Textarea placeholder="Descrição do torneio..." />,
};

export const WithLabel: Story = {
  name: 'Com label',
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="desc">Descrição</Label>
      <Textarea id="desc" placeholder="Descreva as regras e informações do torneio..." rows={4} />
    </div>
  ),
};

export const Disabled: Story = {
  name: 'Desabilitado',
  render: () => (
    <Textarea disabled value="Torneio encerrado. Edição bloqueada." />
  ),
};
