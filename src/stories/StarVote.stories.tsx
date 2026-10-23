import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StarVote } from '../components/custom/StarVote';
import { TemasLado } from './_TemasLado';

const meta: Meta<typeof StarVote> = {
  title: 'Layout/StarVote',
  component: StarVote,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof StarVote>;

function Demo({ start = 3, ...rest }: { start?: number } & Partial<React.ComponentProps<typeof StarVote>>) {
  const [v, setV] = React.useState(start);
  return <StarVote value={v} onChange={setV} {...rest} />;
}

export const Votando: Story = {
  name: 'Votando (ciano)',
  render: () => <Demo tone="vote" size="lg" aria-label="Nota para o Rafa" />,
};

export const Resultado: Story = {
  name: 'Resultado (amarelo, so leitura)',
  render: () => <StarVote value={4} size="lg" />,
};

export const Tamanhos: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <StarVote value={4} size="sm" />
      <StarVote value={4} size="md" />
      <StarVote value={4} size="lg" />
    </div>
  ),
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  render: () => (
    <div className="w-[560px] max-w-full">
      <TemasLado>
        <div className="space-y-3">
          {[['Rafa', 4], ['Mateus', 3], ['João P.', 0]].map(([n, v]) => (
            <div key={n as string} className="flex items-center justify-between rounded-[14px] bg-surface-1 px-3.5 py-2.5">
              <span className="text-sm font-semibold text-foreground">{n}</span>
              <Demo start={v as number} tone="vote" />
            </div>
          ))}
          <div className="flex items-center justify-between rounded-[14px] bg-surface-1 px-3.5 py-2.5">
            <span className="text-sm font-semibold text-foreground">Média da noite</span>
            <StarVote value={5} />
          </div>
        </div>
      </TemasLado>
    </div>
  ),
};
