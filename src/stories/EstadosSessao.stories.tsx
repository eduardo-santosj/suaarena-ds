import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Fingerprint } from 'lucide-react';
import { OfflineBanner, QueueItem, StaleTag } from '../components/custom/Offline';
import { PasskeySheet, SessionExpiredSheet } from '../components/custom/AuthSheets';
import { DateRowSkeleton, ListRowSkeleton, ScreenSkeleton, StageSkeleton } from '../components/custom/ScreenSkeletons';
import { Stage, StageLabel } from '../components/custom/Stage';
import { ScoreBoard } from '../components/domain/ScoreBoard';
import { TemasLado } from './_TemasLado';

const meta: Meta = {
  title: 'Layout/Estados e sessão',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj;

export const Faixa: Story = {
  name: 'Faixa de offline',
  render: () => (
    <div className="max-w-sm space-y-3">
      <OfflineBanner />
      <OfflineBanner message="Sem conexão. Seus gols ficam guardados." actionLabel="Tentar de novo" onAction={() => {}} />
    </div>
  ),
};

function PlacarVelho() {
  return (
    <div className="max-w-sm space-y-3">
      <OfflineBanner />
      <Stage stale tone="live">
        <div className="flex items-center justify-between"><StageLabel>Jogo 3 de 6</StageLabel><StaleTag minutes={2} /></div>
        <ScoreBoard a={{ name: 'Laranja', color: 'hsl(var(--primary))', score: 3, scorers: 'Rafa 2 · Mateus 1' }} b={{ name: 'Preto', color: 'hsl(var(--foreground))', score: 2, scorers: 'Bruno 2' }} />
      </Stage>
      <div className="flex flex-wrap items-center gap-2"><StaleTag minutes={0} /><StaleTag minutes={2} /><StaleTag minutes={75} /></div>
    </div>
  );
}

export const PlacarApagado: Story = { name: 'Placar apagado com "há N min"', render: () => <PlacarVelho /> };

export const Fila: Story = {
  name: 'Item na fila',
  render: () => (
    <div className="max-w-sm space-y-2.5">
      <QueueItem title="Gol do Rafa · Laranja" description="Vai sozinho quando a internet voltar. Pode continuar marcando." />
      <QueueItem title="Gol do Caio · Preto" status="sending" />
      <QueueItem title="Gol do Caio · Preto" status="failed" description="O jogo já foi encerrado por outro admin." onRetry={() => {}} />
    </div>
  ),
};

function Folhas() {
  const [a, setA] = React.useState(false);
  const [b, setB] = React.useState(false);
  const [c, setC] = React.useState(false);
  const [d, setD] = React.useState(false);
  const btn = 'rounded-lg bg-surface-3 px-3 py-2 text-sm font-medium text-foreground';
  return (
    <div className="flex flex-wrap gap-2">
      <button className={btn} onClick={() => setA(true)}>Criar passkey (P1b)</button>
      <button className={btn} onClick={() => setB(true)}>Entrar com passkey</button>
      <button className={btn} onClick={() => setC(true)}>Sessão vencida com passkey (T4)</button>
      <button className={btn} onClick={() => setD(true)}>Sessão vencida com senha</button>
      <PasskeySheet open={a} onOpenChange={setA} mode="create" methodLabel="Face ID" onConfirm={() => setA(false)} onDismiss={() => setA(false)} />
      <PasskeySheet open={b} onOpenChange={setB} mode="signin" methodLabel="digital" icon={<Fingerprint />} name="Edu" onConfirm={() => setB(false)} onDismiss={() => setB(false)} />
      <SessionExpiredSheet open={c} onOpenChange={setC} name="Edu" email="edu@email.com" passkeyLabel="Face ID" onPasskey={() => setC(false)} onOtherAccount={() => setC(false)} />
      <SessionExpiredSheet open={d} onOpenChange={setD} name="Edu" email="edu@email.com" onPassword={() => setD(false)} onOtherAccount={() => setD(false)} />
    </div>
  );
}

export const FolhasDeSessao: Story = { name: 'Folhas de passkey e sessão (clique para abrir)', render: () => <Folhas /> };

export const Esqueletos: Story = {
  name: 'Esqueletos por tela',
  render: () => (
    <div className="grid max-w-3xl gap-6 md:grid-cols-2">
      <ScreenSkeleton variant="events" delay={0} />
      <ScreenSkeleton variant="list" rows={5} delay={0} />
    </div>
  ),
};

export const ClaroEEscuro: Story = {
  name: 'Claro e escuro',
  render: () => (
    <TemasLado>
      <div className="space-y-3">
        <OfflineBanner actionLabel="Tentar de novo" onAction={() => {}} />
        <div className="flex items-center gap-2"><StaleTag minutes={2} /></div>
        <QueueItem title="Gol do Rafa · Laranja" description="Vai sozinho quando a internet voltar." />
        <StageSkeleton />
        <DateRowSkeleton />
        <ListRowSkeleton />
      </div>
    </TemasLado>
  ),
};
