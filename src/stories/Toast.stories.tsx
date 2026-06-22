import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Toaster } from '../components/ui/toaster';
import { useToast } from '../components/ui/use-toast';
import { Button } from '../components/ui/button';
import { ToastAction } from '../components/ui/toast';

const meta: Meta = {
  title: 'UI/Toast',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        onClick={() =>
          toast({ title: 'Placar salvo', description: 'Eduardo/Carlos 6×4 Roberto/Felipe' })
        }
      >
        Mostrar toast
      </Button>
    );
  },
};

export const Success: Story = {
  name: 'Sucesso',
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        onClick={() =>
          toast({
            title: (
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Inscrição confirmada!
              </span>
            ) as React.ReactNode,
            description: 'Eduardo / Carlos — Categoria A, Beach Tennis.',
          })
        }
      >
        Toast de sucesso
      </Button>
    );
  },
};

export const Destructive: Story = {
  name: 'Erro / Destrutivo',
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            variant: 'destructive',
            title: (
              <span className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Erro ao salvar placar
              </span>
            ) as React.ReactNode,
            description: 'Verifique sua conexão e tente novamente.',
            action: <ToastAction altText="Tentar novamente">Tentar novamente</ToastAction>,
          })
        }
      >
        Toast de erro
      </Button>
    );
  },
};

export const WithAction: Story = {
  name: 'Com ação',
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: (
              <span className="flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-500" />
                Sorteio gerado
              </span>
            ) as React.ReactNode,
            description: 'O bracket foi sorteado com 16 duplas.',
            action: <ToastAction altText="Ver bracket">Ver bracket</ToastAction>,
          })
        }
      >
        Toast com ação
      </Button>
    );
  },
};
