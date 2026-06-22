import type { Meta, StoryObj } from '@storybook/react';
import { Terminal, AlertCircle, CheckCircle2, Info as InfoIcon } from 'lucide-react';
import { AlertBlock, AlertBlockTitle, AlertBlockDescription } from '../components/ui/alert-shadcn';

const meta: Meta<typeof AlertBlock> = {
  title: 'UI/AlertBlock',
  component: AlertBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Alerta inline (shadcn). Para toasts com auto-dismiss, use o componente Alert customizado.',
      },
    },
  },
  decorators: [(Story) => <div className="w-[480px]"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof AlertBlock>;

export const Default: Story = {
  render: () => (
    <AlertBlock>
      <Terminal className="h-4 w-4" />
      <AlertBlockTitle>Atencao</AlertBlockTitle>
      <AlertBlockDescription>Voce tem inscricoes pendentes de pagamento.</AlertBlockDescription>
    </AlertBlock>
  ),
};

export const Destructive: Story = {
  name: 'Destrutivo',
  render: () => (
    <AlertBlock variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertBlockTitle>Erro ao salvar</AlertBlockTitle>
      <AlertBlockDescription>
        Nao foi possivel salvar o placar. Tente novamente ou entre em contato com o suporte.
      </AlertBlockDescription>
    </AlertBlock>
  ),
};

export const Success: Story = {
  name: 'Sucesso (customizado)',
  render: () => (
    <AlertBlock className="border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-600">
      <CheckCircle2 className="h-4 w-4" />
      <AlertBlockTitle>Inscricao confirmada</AlertBlockTitle>
      <AlertBlockDescription>Sua dupla esta inscrita no torneio.</AlertBlockDescription>
    </AlertBlock>
  ),
};

export const Info: Story = {
  name: 'Informativo (customizado)',
  render: () => (
    <AlertBlock className="border-blue-500/50 text-blue-700 dark:text-blue-400 [&>svg]:text-blue-600">
      <InfoIcon className="h-4 w-4" />
      <AlertBlockTitle>Novo formato disponivel</AlertBlockTitle>
      <AlertBlockDescription>O Swiss System ja esta disponivel para torneios com mais de 8 equipes.</AlertBlockDescription>
    </AlertBlock>
  ),
};
