import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConfirmDialog } from '../components/domain/ConfirmDialog';
import { Button } from '../components/ui/button';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Domain/ConfirmDialog',
  component: ConfirmDialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

function Demo({ variant = 'destructive', title = 'Confirmar exclusao', description = 'Esta acao nao pode ser desfeita.' }: { variant?: 'destructive' | 'default'; title?: string; description?: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setOpen(false); }, 1500);
  };
  return (
    <>
      <Button variant={variant} onClick={() => setOpen(true)}>Abrir dialogo</Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        description={description}
        onConfirm={handleConfirm}
        loading={loading}
        variant={variant}
      />
    </>
  );
}

export const Destrutivo: Story = {
  render: () => <Demo />,
};

export const Confirmacao: Story = {
  render: () => (
    <Demo
      variant="default"
      title="Publicar campeonato"
      description="O campeonato ficara visivel para todos os usuarios. Deseja continuar?"
    />
  ),
};

export const ComLoading: Story = {
  render: () => (
    <ConfirmDialog
      open={true}
      onOpenChange={() => {}}
      title="Excluir conta"
      description="Todos os dados serao removidos permanentemente."
      onConfirm={() => {}}
      loading={true}
    />
  ),
};
