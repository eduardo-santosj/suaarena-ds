import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../components/domain/FormField';
import { Input } from '../components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';

const meta: Meta<typeof FormField> = {
  title: 'Domain/FormField',
  component: FormField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FormField>;

export const Simples: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <FormField label="Nome completo" required>
        <Input placeholder="Eduardo Jacinto" />
      </FormField>
    </div>
  ),
};

export const ComErro: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <FormField label="E-mail" required error={{ message: 'E-mail invalido' }}>
        <Input placeholder="email@exemplo.com" defaultValue="nao-e-email" />
      </FormField>
    </div>
  ),
};

export const ComHint: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <FormField label="Senha" required hint="Minimo 8 caracteres, letra maiuscula e numero">
        <Input type="password" placeholder="Sua senha" />
      </FormField>
    </div>
  ),
};

export const FormCompleto: Story = {
  render: () => (
    <div className="w-80 space-y-4 p-6 border rounded-lg bg-card">
      <h3 className="font-semibold text-lg">Criar conta</h3>
      <FormField label="Nome completo" required>
        <Input placeholder="Eduardo Jacinto" />
      </FormField>
      <FormField label="E-mail" required>
        <Input type="email" placeholder="email@exemplo.com" />
      </FormField>
      <FormField label="Esporte favorito">
        <Select>
          <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
          <SelectContent>
            <SelectItem value="bt">Beach Tennis</SelectItem>
            <SelectItem value="ftv">Futevolei</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
      <FormField label="Bio" hint="Maximo 200 caracteres">
        <Textarea placeholder="Fale um pouco sobre voce..." />
      </FormField>
    </div>
  ),
};
