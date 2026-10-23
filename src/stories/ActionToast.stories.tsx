import type { Meta, StoryObj } from '@storybook/react';
import { ActionToast, ActionToastProvider, useActionToast } from '../components/custom/ActionToast';
import { Button } from '../components/ui/button';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof ActionToast> = {
  title: 'Layout/ActionToast',
  component: ActionToast,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ActionToast>;

// Cor do time e dado do Ferino, nao token.
const LARANJA = '#FF7E29';

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro (H5 desfazer, T3 erro)',
  render: () => (
    <TemasLado>
      <div className="flex flex-col gap-3">
        <ActionToast
          title="Laranja venceu 4 × 2"
          description="Laranja × Azul já começou"
          leading={<span className="block w-6 h-6 rounded-lg" style={{ background: LARANJA }} />}
          action={{ label: 'Desfazer', onClick: () => {} }}
        />
        <ActionToast
          tone="error"
          title="Gol do Caio não foi salvo"
          description="O placar voltou pra 3 × 2."
          action={{ label: 'Tentar de novo', onClick: () => {} }}
        />
        <ActionToast tone="success" title="Presença confirmada" />
      </div>
    </TemasLado>
  ),
};

function Disparar() {
  const { show } = useActionToast();
  return (
    <div className="flex gap-2">
      <Button onClick={() => show({ title: 'Laranja venceu 4 × 2', description: 'Laranja × Azul já começou', action: { label: 'Desfazer', onClick: () => {} } })}>
        Desfazer
      </Button>
      <Button variant="destructive" onClick={() => show({ tone: 'error', title: 'Gol do Caio não foi salvo', description: 'O placar voltou pra 3 × 2.', action: { label: 'Tentar de novo', onClick: () => {} } })}>
        Erro
      </Button>
    </div>
  );
}

export const ComProvider: Story = {
  name: 'Com provider (um por vez, no topo)',
  render: () => (
    <ActionToastProvider>
      <Disparar />
    </ActionToastProvider>
  ),
};
