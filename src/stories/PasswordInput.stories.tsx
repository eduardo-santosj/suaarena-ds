import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PasswordInput } from '../components/domain/PasswordInput';
import { FormField } from '../components/domain/FormField';
import { Button } from '../components/ui/button';

const meta: Meta<typeof PasswordInput> = {
  title: 'Domain/PasswordInput',
  component: PasswordInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PasswordInput>;

function Controlled({ showRules = false }: { showRules?: boolean }) {
  const [value, setValue] = useState('');
  return (
    <div className="w-80">
      <FormField label="Senha" required>
        <PasswordInput value={value} onChange={setValue} showRules={showRules} />
      </FormField>
    </div>
  );
}

export const Default: Story = {
  render: () => <Controlled />,
};

export const ComRegras: Story = {
  render: () => <Controlled showRules />,
};

export const Desabilitado: Story = {
  render: () => (
    <div className="w-80">
      <PasswordInput value="senha123" onChange={() => {}} disabled />
    </div>
  ),
};

export const NoFormulario: Story = {
  render: () => {
    const [senha, setSenha] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const match = senha === confirmar && senha.length > 0;
    return (
      <div className="w-80 space-y-4 p-6 border rounded-lg bg-card">
        <h3 className="font-semibold">Alterar senha</h3>
        <FormField label="Nova senha" required>
          <PasswordInput value={senha} onChange={setSenha} showRules />
        </FormField>
        <FormField
          label="Confirmar senha"
          required
          error={confirmar && !match ? { message: 'Senhas nao coincidem' } : undefined}
        >
          <PasswordInput value={confirmar} onChange={setConfirmar} />
        </FormField>
        <Button className="w-full" disabled={!match}>Salvar</Button>
      </div>
    );
  },
};
