import type { Meta, StoryObj } from '@storybook/react';
import { Search, Eye, EyeOff, Mail } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Campo de entrada base. Suporta ícone à esquerda, elemento à direita e mensagem de erro integrada.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Digite aqui…',
  },
};

export const WithLabel: Story = {
  name: 'Com label',
  render: () => (
    <div className="space-y-1.5">
      <Label htmlFor="email">E-mail</Label>
      <Input id="email" type="email" placeholder="seu@email.com" />
    </div>
  ),
};

export const WithLeftIcon: Story = {
  name: 'Com ícone à esquerda',
  args: {
    placeholder: 'Buscar aluno…',
    leftIcon: <Search />,
  },
};

export const WithError: Story = {
  name: 'Com erro',
  args: {
    placeholder: 'Digite o CPF',
    error: 'CPF inválido. Tente novamente.',
    defaultValue: '000.000.000-00',
  },
};

export const Disabled: Story = {
  name: 'Desabilitado',
  args: {
    placeholder: 'Campo desabilitado',
    disabled: true,
    defaultValue: 'Valor bloqueado',
  },
};

export const EmailField: Story = {
  name: 'Campo e-mail',
  render: () => (
    <div className="space-y-1.5">
      <Label htmlFor="email-ex">E-mail</Label>
      <Input
        id="email-ex"
        type="email"
        placeholder="seu@email.com"
        leftIcon={<Mail />}
      />
    </div>
  ),
};

export const PasswordToggle: Story = {
  name: 'Senha com toggle',
  render: function PasswordStory() {
    const [show, setShow] = useState(false);
    return (
      <div className="space-y-1.5">
        <Label htmlFor="pw">Senha</Label>
        <Input
          id="pw"
          type={show ? 'text' : 'password'}
          placeholder="••••••••"
          rightElement={
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />
      </div>
    );
  },
};
