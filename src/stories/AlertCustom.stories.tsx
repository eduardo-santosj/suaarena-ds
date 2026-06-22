import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertProvider, useAlert } from '../components/custom';
import { Button } from '../components/ui/button';

const meta: Meta = {
  title: 'Custom/Alert (Toast)',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toast customizado com auto-dismiss (4s). Use `<AlertProvider>` uma vez na raiz do app e o hook `useAlert()` para disparar.',
      },
    },
  },
};

export default meta;

function AlertDemo() {
  const alert = useAlert();
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => alert.show('success', 'Placar salvo com sucesso!')}>
        Sucesso
      </Button>
      <Button variant="outline" onClick={() => alert.show('error', 'Erro ao conectar com o servidor.')}>
        Erro
      </Button>
      <Button variant="outline" onClick={() => alert.show('warning', 'Sua sessão expira em 5 minutos.')}>
        Aviso
      </Button>
      <Button variant="outline" onClick={() => alert.show('info', 'Nova versão disponível.')}>
        Info
      </Button>
    </div>
  );
}

export const Interactive: StoryObj = {
  name: 'Interativo',
  render: () => (
    <AlertProvider>
      <AlertDemo />
    </AlertProvider>
  ),
};

export const SuccessStatic: StoryObj = {
  name: 'Sucesso (estático)',
  render: () => (
    <div className="relative h-24 w-[420px]">
      <Alert type="success" text="Inscrição confirmada com sucesso!" onClose={() => {}} />
    </div>
  ),
};

export const ErrorStatic: StoryObj = {
  name: 'Erro (estático)',
  render: () => (
    <div className="relative h-24 w-[420px]">
      <Alert type="error" text="Não foi possível salvar o placar." onClose={() => {}} />
    </div>
  ),
};

export const WarningStatic: StoryObj = {
  name: 'Aviso (estático)',
  render: () => (
    <div className="relative h-24 w-[420px]">
      <Alert type="warning" text="Sessão expirando em breve." onClose={() => {}} />
    </div>
  ),
};

export const InfoStatic: StoryObj = {
  name: 'Info (estático)',
  render: () => (
    <div className="relative h-24 w-[420px]">
      <Alert type="info" text="Nova atualização disponível." onClose={() => {}} />
    </div>
  ),
};
